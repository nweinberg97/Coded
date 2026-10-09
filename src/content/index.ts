import type { Concept, TrackId } from './types';
import internet from './concepts/internet';
import web from './concepts/web';
import programming from './concepts/programming';
import apis from './concepts/apis';
import data from './concepts/data';
import architecture from './concepts/architecture';
import workflow from './concepts/workflow';
import ai from './concepts/ai';
import { TRACKS } from './tracks';

export { TRACKS, TRACK_BY_ID } from './tracks';
export type { Concept, Track, TrackId, Difficulty } from './types';

const BY_TRACK: Record<TrackId, Concept[]> = {
  internet,
  web,
  programming,
  apis,
  data,
  architecture,
  workflow,
  ai,
};

/** All concepts in curriculum order (track order, then suggested order). */
export const CONCEPTS: Concept[] = TRACKS.flatMap((t) => BY_TRACK[t.id]);

export const CONCEPT_BY_ID: Record<string, Concept> = Object.fromEntries(
  CONCEPTS.map((c) => [c.id, c]),
);

export function conceptsInTrack(trackId: TrackId): Concept[] {
  return BY_TRACK[trackId];
}

/** Position within the whole library (shown as a hex address). */
export function serialOf(id: string): number {
  return CONCEPTS.findIndex((c) => c.id === id) + 1;
}

/** "HTTP (HyperText Transfer Protocol)" → { title: "HTTP", subtitle: "HyperText Transfer Protocol" } */
export function splitTerm(term: string): { title: string; subtitle?: string } {
  const m = term.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (!m) return { title: term };
  return { title: m[1], subtitle: m[2] };
}

/**
 * Difficulty tiers, named in Big-O notation — how engineers describe how fast
 * work grows as a problem gets bigger. O(1) is effortless; O(2ⁿ) explodes.
 */
export const RARITY = [
  { id: 'common', label: 'O(1)', name: 'Constant', blurb: 'Everyday idea — instant to grasp', color: '#B8B8BE' },
  { id: 'uncommon', label: 'O(log n)', name: 'Logarithmic', blurb: 'Quick to learn once you see it', color: '#2BD97C' },
  { id: 'rare', label: 'O(n)', name: 'Linear', blurb: 'Takes real attention to work through', color: '#3D8BFF' },
  { id: 'legendary', label: 'O(n²)', name: 'Quadratic', blurb: 'Hard — ideas that build on other ideas', color: '#FFB800' },
  { id: 'ultimate', label: 'O(2ⁿ)', name: 'Exponential', blurb: 'Deep cut — senior-engineer territory', color: '#B57BFF' },
] as const;

/** Card id as a hex address, e.g. 14 → "0x00E". */
export function hexId(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(3, '0');
}

/** Difficulty 1–5 maps to a complexity tier. */
export function rarityOf(difficulty: number) {
  return RARITY[Math.min(5, Math.max(1, difficulty)) - 1];
}
