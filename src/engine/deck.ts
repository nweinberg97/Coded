// Building study decks: filtering, the "continue" ordering, and shuffling that
// genuinely randomizes while avoiding cards you just saw.

import type { Concept, TrackId } from '../content/types';
import { isDue, statusOf, type CardStatus, type ReviewState } from './srs';

export type DeckFilters = {
  query?: string;
  trackIds?: TrackId[];
  difficulties?: number[];
  statuses?: CardStatus[];
  dueOnly?: boolean;
  bookmarkedOnly?: boolean;
  missedOnly?: boolean;
  /** limit to concepts whose track is unlocked */
  unlockedOnly?: boolean;
};

export type DeckContext = {
  reviews: Record<string, ReviewState>;
  bookmarks: string[];
  missed: string[];
  isUnlocked: (id: string) => boolean;
  now: number;
};

export function matchesQuery(c: Concept, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    c.term.toLowerCase().includes(q) ||
    c.id.replace(/-/g, ' ').includes(q) ||
    c.definition.toLowerCase().includes(q)
  );
}

export function filterConcepts(all: Concept[], f: DeckFilters, ctx: DeckContext): Concept[] {
  return all.filter((c) => {
    if (f.query && !matchesQuery(c, f.query)) return false;
    if (f.trackIds?.length && !f.trackIds.includes(c.trackId)) return false;
    if (f.difficulties?.length && !f.difficulties.includes(c.difficulty)) return false;
    if (f.statuses?.length && !f.statuses.includes(statusOf(ctx.reviews[c.id]))) return false;
    if (f.dueOnly && !isDue(ctx.reviews[c.id], ctx.now)) return false;
    if (f.bookmarkedOnly && !ctx.bookmarks.includes(c.id)) return false;
    if (f.missedOnly && !ctx.missed.includes(c.id)) return false;
    if (f.unlockedOnly && !ctx.isUnlocked(c.id)) return false;
    return true;
  });
}

/**
 * "Continue learning" order: cards due for review first (most overdue first),
 * then new cards in curriculum order, then everything else by soonest due.
 */
export function continueOrder(cards: Concept[], ctx: DeckContext): Concept[] {
  const due: Concept[] = [];
  const fresh: Concept[] = [];
  const rest: Concept[] = [];
  for (const c of cards) {
    const r = ctx.reviews[c.id];
    if (isDue(r, ctx.now)) due.push(c);
    else if (statusOf(r) === 'new') fresh.push(c);
    else rest.push(c);
  }
  due.sort((a, b) => (ctx.reviews[a.id]?.due ?? 0) - (ctx.reviews[b.id]?.due ?? 0));
  rest.sort((a, b) => (ctx.reviews[a.id]?.due ?? 0) - (ctx.reviews[b.id]?.due ?? 0));
  return [...due, ...fresh, ...rest];
}

/** Small seeded PRNG so shuffles are testable. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function fisherYates<T>(items: T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Shuffle, but push recently-served cards to the back so a short session
 * doesn't keep repeating the same few cards. If the current card is in the
 * deck it never ends up first (so pressing shuffle always changes the card).
 */
export function shuffleDeck<T extends { id: string }>(
  items: T[],
  recentIds: string[],
  rand: () => number = Math.random,
  currentId?: string,
): T[] {
  const recent = new Set(recentIds);
  const fresh = fisherYates(items.filter((i) => !recent.has(i.id)), rand);
  const stale = fisherYates(items.filter((i) => recent.has(i.id)), rand);
  const out = [...fresh, ...stale];
  if (currentId && out.length > 1 && out[0].id === currentId) {
    const swapWith = 1 + Math.floor(rand() * (out.length - 1));
    [out[0], out[swapWith]] = [out[swapWith], out[0]];
  }
  return out;
}

/** Deterministic "card of the day" among unlocked cards. */
export function dailyPick<T extends { id: string }>(items: T[], dayKey: string): T | undefined {
  if (items.length === 0) return undefined;
  let h = 0;
  for (const ch of dayKey) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return items[h % items.length];
}
