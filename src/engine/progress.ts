// The learner's progress: a single serializable object updated only through
// a pure reducer. The same reducer powers the real profile and the isolated
// demo profile, so the demo genuinely exercises the production engine.

import { CONCEPTS, CONCEPT_BY_ID, conceptsInTrack, TRACKS } from '../content';
import type { TrackId } from '../content/types';
import { computeLevel, LEVELS, type LevelDef } from './levels';
import { isDue, isLearned, schedule, type Outcome, type ReviewState } from './srs';

export const STATE_VERSION = 1;

export const XP_RULES = {
  firstTry: 15,
  assisted: 8,
  reviewFirstTry: 5,
  reviewAssisted: 2,
  sessionBonus: 10,
  trackComplete: 100,
} as const;

/** A session earns its bonus after this many distinct cards with enough correct. */
export const SESSION_GOAL = 8;
export const SESSION_MIN_CORRECT = 5;

export type XpReason = 'learn' | 'review' | 'session' | 'challenge' | 'track';

export type XpTxn = {
  /** Stable, unique — the key that prevents double awards. */
  id: string;
  amount: number;
  reason: XpReason;
  label: string;
  at: number;
};

export type SessionRecord = {
  id: string;
  startedAt: number;
  cards: string[];
  correct: number;
  bonus: boolean;
};

export type ShipRecord = { at: number; xpAwarded: boolean };
export type ChallengeAttempt = { runs: number; bestPassed: number; total: number; lastRunAt: number };

export type ProgressState = {
  version: number;
  createdAt: number;
  ledger: XpTxn[];
  reviews: Record<string, ReviewState>;
  bookmarks: string[];
  /** cards whose most recent answer was a miss — the "review incorrect" pile */
  missed: string[];
  shipped: Record<string, ShipRecord>;
  attempts: Record<string, ChallengeAttempt>;
  code: Record<string, string>;
  activityDays: string[];
  sessions: SessionRecord[];
  /** most recently learned concept ids, newest first */
  recent: string[];
  /** highest level the learner has already celebrated */
  seenLevel: number;
};

export function initialState(now = Date.now()): ProgressState {
  return {
    version: STATE_VERSION,
    createdAt: now,
    ledger: [],
    reviews: {},
    bookmarks: [],
    missed: [],
    shipped: {},
    attempts: {},
    code: {},
    activityDays: [],
    sessions: [],
    recent: [],
    seenLevel: 1,
  };
}

// ---------- derived values ----------

export function totalXp(s: ProgressState): number {
  return s.ledger.reduce((sum, t) => sum + t.amount, 0);
}

export function learnedFn(s: ProgressState) {
  return (id: string) => isLearned(s.reviews[id]);
}

export function levelOf(s: ProgressState, levels: LevelDef[] = LEVELS): number {
  return computeLevel(
    { xp: totalXp(s), learned: learnedFn(s), shipped: (id) => !!s.shipped[id] },
    levels,
  );
}

export function trackUnlockLevel(trackId: TrackId): number {
  return TRACKS.find((t) => t.id === trackId)?.unlockLevel ?? 1;
}

export function isConceptUnlocked(conceptId: string, level: number): boolean {
  const c = CONCEPT_BY_ID[conceptId];
  return !!c && trackUnlockLevel(c.trackId) <= level;
}

export function learnedCount(s: ProgressState): number {
  return CONCEPTS.filter((c) => isLearned(s.reviews[c.id])).length;
}

export function dayKey(ms: number): string {
  const d = new Date(ms);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Consecutive days with activity, ending today or yesterday. */
export function streak(s: ProgressState, now = Date.now()): number {
  const days = new Set(s.activityDays);
  let cursor = now;
  if (!days.has(dayKey(cursor))) {
    cursor -= 86_400_000;
    if (!days.has(dayKey(cursor))) return 0;
  }
  let count = 0;
  while (days.has(dayKey(cursor))) {
    count += 1;
    cursor -= 86_400_000;
  }
  return count;
}

// ---------- actions ----------

export type Action =
  | {
      type: 'answer';
      conceptId: string;
      outcome: Outcome;
      sessionId: string;
      now: number;
      /** true when the card is locked: progress is shown but no XP and no scheduling */
      preview?: boolean;
    }
  | { type: 'bookmark'; conceptId: string }
  | { type: 'challengeRun'; challengeId: string; passed: number; total: number; now: number }
  | {
      type: 'ship';
      challengeId: string;
      title: string;
      xp: number;
      /** false when the challenge is above the learner's level: recorded, but no XP */
      eligible: boolean;
      now: number;
    }
  | { type: 'saveCode'; challengeId: string; code: string }
  | { type: 'ackLevel'; level: number }
  | { type: 'replace'; state: ProgressState };

function addXp(s: ProgressState, txn: XpTxn): ProgressState {
  if (txn.amount <= 0) return s;
  if (s.ledger.some((t) => t.id === txn.id)) return s; // idempotent
  return { ...s, ledger: [...s.ledger, txn] };
}

function touchDay(s: ProgressState, now: number): ProgressState {
  const k = dayKey(now);
  if (s.activityDays.includes(k)) return s;
  return { ...s, activityDays: [...s.activityDays, k].slice(-400) };
}

function termOf(id: string) {
  return CONCEPT_BY_ID[id]?.term ?? id;
}

export function reduce(s: ProgressState, a: Action): ProgressState {
  switch (a.type) {
    case 'answer': {
      if (a.preview) return s;
      const prev = s.reviews[a.conceptId];
      const wasLearned = isLearned(prev);
      const due = isDue(prev, a.now);
      const next = schedule(prev, a.outcome, a.now);
      let out: ProgressState = { ...s, reviews: { ...s.reviews, [a.conceptId]: next } };
      out = touchDay(out, a.now);
      const correct = a.outcome !== 'missed';

      out.missed = correct
        ? out.missed.filter((id) => id !== a.conceptId)
        : [a.conceptId, ...out.missed.filter((id) => id !== a.conceptId)].slice(0, 100);

      if (correct && !wasLearned) {
        out.recent = [a.conceptId, ...out.recent.filter((id) => id !== a.conceptId)].slice(0, 12);
        out = addXp(out, {
          id: `learn:${a.conceptId}`,
          amount: a.outcome === 'correct' ? XP_RULES.firstTry : XP_RULES.assisted,
          reason: 'learn',
          label: `${a.outcome === 'correct' ? 'First-try recall' : 'Recall with help'} · ${termOf(a.conceptId)}`,
          at: a.now,
        });
      } else if (correct && due) {
        out = addXp(out, {
          id: `review:${a.conceptId}:${next.reviews}`,
          amount: a.outcome === 'correct' ? XP_RULES.reviewFirstTry : XP_RULES.reviewAssisted,
          reason: 'review',
          label: `Spaced review · ${termOf(a.conceptId)}`,
          at: a.now,
        });
      }

      // Track completion bonus
      const c = CONCEPT_BY_ID[a.conceptId];
      if (correct && c) {
        const all = conceptsInTrack(c.trackId);
        if (all.every((x) => isLearned(out.reviews[x.id]))) {
          const track = TRACKS.find((t) => t.id === c.trackId);
          out = addXp(out, {
            id: `track:${c.trackId}`,
            amount: XP_RULES.trackComplete,
            reason: 'track',
            label: `Set complete · ${track?.name ?? c.trackId}`,
            at: a.now,
          });
        }
      }

      // Session tracking + bonus (distinct cards only; empty sessions earn nothing)
      const sessions = [...out.sessions];
      let idx = sessions.findIndex((x) => x.id === a.sessionId);
      if (idx === -1) {
        sessions.push({ id: a.sessionId, startedAt: a.now, cards: [], correct: 0, bonus: false });
        idx = sessions.length - 1;
      }
      const sess = { ...sessions[idx] };
      if (!sess.cards.includes(a.conceptId)) {
        sess.cards = [...sess.cards, a.conceptId];
        if (correct) sess.correct += 1;
      }
      if (!sess.bonus && sess.cards.length >= SESSION_GOAL && sess.correct >= SESSION_MIN_CORRECT) {
        sess.bonus = true;
        out = addXp(out, {
          id: `session:${sess.id}`,
          amount: XP_RULES.sessionBonus,
          reason: 'session',
          label: `Session complete · ${sess.correct}/${sess.cards.length} correct`,
          at: a.now,
        });
      }
      sessions[idx] = sess;
      out.sessions = sessions.slice(-60);
      return out;
    }

    case 'bookmark': {
      const has = s.bookmarks.includes(a.conceptId);
      return {
        ...s,
        bookmarks: has ? s.bookmarks.filter((b) => b !== a.conceptId) : [a.conceptId, ...s.bookmarks],
      };
    }

    case 'challengeRun': {
      const prev = s.attempts[a.challengeId];
      return touchDay(
        {
          ...s,
          attempts: {
            ...s.attempts,
            [a.challengeId]: {
              runs: (prev?.runs ?? 0) + 1,
              bestPassed: Math.max(prev?.bestPassed ?? 0, a.passed),
              total: a.total,
              lastRunAt: a.now,
            },
          },
        },
        a.now,
      );
    }

    case 'ship': {
      const already = s.shipped[a.challengeId];
      let out: ProgressState = {
        ...s,
        shipped: {
          ...s.shipped,
          [a.challengeId]: {
            at: already?.at ?? a.now,
            xpAwarded: (already?.xpAwarded ?? false) || a.eligible,
          },
        },
      };
      if (a.eligible) {
        out = addXp(out, {
          id: `challenge:${a.challengeId}`,
          amount: a.xp,
          reason: 'challenge',
          label: `Shipped · ${a.title}`,
          at: a.now,
        });
      }
      return touchDay(out, a.now);
    }

    case 'saveCode':
      return { ...s, code: { ...s.code, [a.challengeId]: a.code } };

    case 'ackLevel':
      return a.level > s.seenLevel ? { ...s, seenLevel: a.level } : s;

    case 'replace':
      return a.state;
  }
}

/** XP a correct answer WOULD earn right now — used to preview rewards on the card. */
export function potentialXp(s: ProgressState, conceptId: string, now: number, firstTry: boolean): number {
  const r = s.reviews[conceptId];
  if (!isLearned(r)) return firstTry ? XP_RULES.firstTry : XP_RULES.assisted;
  if (isDue(r, now)) return firstTry ? XP_RULES.reviewFirstTry : XP_RULES.reviewAssisted;
  return 0;
}
