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

/** Serial number like a collectible: position within the whole library. */
export function serialOf(id: string): number {
  return CONCEPTS.findIndex((c) => c.id === id) + 1;
}

/** "HTTP (HyperText Transfer Protocol)" → { title: "HTTP", subtitle: "HyperText Transfer Protocol" } */
export function splitTerm(term: string): { title: string; subtitle?: string } {
  const m = term.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (!m) return { title: term };
  return { title: m[1], subtitle: m[2] };
}

export const RARITY = [
  { id: 'common', label: 'Common', color: '#B8B8BE' },
  { id: 'uncommon', label: 'Uncommon', color: '#2BD97C' },
  { id: 'rare', label: 'Rare', color: '#3D8BFF' },
  { id: 'legendary', label: 'Legendary', color: '#FFB800' },
  { id: 'ultimate', label: 'Ultimate', color: '#B57BFF' },
] as const;

/** Difficulty 1–5 maps to a collectible rarity tier. */
export function rarityOf(difficulty: number) {
  return RARITY[Math.min(5, Math.max(1, difficulty)) - 1];
}
