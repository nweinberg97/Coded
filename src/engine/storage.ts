// Local-only persistence. Nothing leaves the browser.
// - Versioned envelope { app, version, savedAt, state }
// - Validation + repair on load (bad fields fall back to safe defaults)
// - Migrations keyed by version
// - Errors (quota, private mode, corrupt JSON) never crash the app

import { initialState, STATE_VERSION, type ProgressState } from './progress';

export const STORAGE_KEY = 'coded.progress';
const APP_ID = 'coded';

type Envelope = { app: string; version: number; savedAt: number; state: unknown };

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}
function num(v: unknown, d = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : d;
}

/** Migrations from older versions: version N → N+1. */
const MIGRATIONS: Record<number, (s: Record<string, unknown>) => Record<string, unknown>> = {
  // Version 0 was an early prototype shape that stored `xp` as a number and no ledger.
  0: (s) => ({
    ...s,
    ledger:
      typeof s.xp === 'number' && s.xp > 0
        ? [{ id: 'migrated:v0', amount: s.xp, reason: 'learn', label: 'Imported progress', at: Date.now() }]
        : [],
  }),
};

/** Repair a possibly-partial object into a valid ProgressState. */
export function validateState(raw: unknown): ProgressState {
  const base = initialState();
  if (!isObj(raw)) return base;

  const ledger = Array.isArray(raw.ledger)
    ? raw.ledger
        .filter(isObj)
        .filter((t) => typeof t.id === 'string' && typeof t.amount === 'number' && t.amount > 0)
        .map((t) => ({
          id: String(t.id),
          amount: Math.min(1000, num(t.amount)),
          reason: (['learn', 'review', 'session', 'challenge', 'track'].includes(String(t.reason))
            ? t.reason
            : 'learn') as ProgressState['ledger'][number]['reason'],
          label: typeof t.label === 'string' ? t.label.slice(0, 200) : '',
          at: num(t.at),
        }))
    : [];
  // de-duplicate by id (protects against tampered or doubly-imported files)
  const seen = new Set<string>();
  const uniqueLedger = ledger.filter((t) => (seen.has(t.id) ? false : (seen.add(t.id), true)));

  const reviews: ProgressState['reviews'] = {};
  if (isObj(raw.reviews)) {
    for (const [id, r] of Object.entries(raw.reviews)) {
      if (!isObj(r)) continue;
      reviews[id] = {
        box: Math.max(0, Math.min(5, Math.round(num(r.box)))),
        due: num(r.due),
        attempts: Math.max(0, num(r.attempts)),
        correct: Math.max(0, num(r.correct)),
        lapses: Math.max(0, num(r.lapses)),
        reviews: Math.max(0, num(r.reviews)),
        lastAnswered: num(r.lastAnswered),
        lastResult: ['correct', 'assisted', 'missed'].includes(String(r.lastResult))
          ? (r.lastResult as 'correct')
          : undefined,
      };
    }
  }

  const shipped: ProgressState['shipped'] = {};
  if (isObj(raw.shipped)) {
    for (const [id, v] of Object.entries(raw.shipped)) {
      if (isObj(v)) shipped[id] = { at: num(v.at), xpAwarded: !!v.xpAwarded };
    }
  }
  const attempts: ProgressState['attempts'] = {};
  if (isObj(raw.attempts)) {
    for (const [id, v] of Object.entries(raw.attempts)) {
      if (isObj(v))
        attempts[id] = {
          runs: num(v.runs),
          bestPassed: num(v.bestPassed),
          total: num(v.total),
          lastRunAt: num(v.lastRunAt),
        };
    }
  }
  const code: Record<string, string> = {};
  if (isObj(raw.code)) {
    for (const [id, v] of Object.entries(raw.code)) {
      if (typeof v === 'string' && v.length < 200_000) code[id] = v;
    }
  }
  const sessions = Array.isArray(raw.sessions)
    ? raw.sessions.filter(isObj).map((x) => ({
        id: String(x.id ?? ''),
        startedAt: num(x.startedAt),
        cards: strArr(x.cards),
        correct: num(x.correct),
        bonus: !!x.bonus,
      }))
    : [];

  return {
    version: STATE_VERSION,
    createdAt: num(raw.createdAt, base.createdAt),
    ledger: uniqueLedger,
    reviews,
    bookmarks: strArr(raw.bookmarks),
    missed: strArr(raw.missed),
    shipped,
    attempts,
    code,
    activityDays: strArr(raw.activityDays).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)),
    sessions,
    recent: strArr(raw.recent),
    seenLevel: Math.max(1, num(raw.seenLevel, 1)),
  };
}

/** Parse an envelope (or a bare state from older exports), migrating as needed. */
export function parseSaved(json: string): ProgressState {
  const data: unknown = JSON.parse(json);
  let version = 0;
  let state: unknown = data;
  if (isObj(data) && data.app === APP_ID && 'state' in data) {
    version = num(data.version, 0);
    state = data.state;
  } else if (isObj(data) && typeof data.version === 'number') {
    version = data.version;
  }
  if (version > STATE_VERSION) {
    throw new Error('This progress file was made by a newer version of Coded.');
  }
  let s = isObj(state) ? state : {};
  for (let v = version; v < STATE_VERSION; v++) {
    const m = MIGRATIONS[v];
    if (m) s = m(s);
  }
  return validateState(s);
}

export function serialize(state: ProgressState): string {
  const env: Envelope = { app: APP_ID, version: STATE_VERSION, savedAt: Date.now(), state };
  return JSON.stringify(env);
}

export type LoadResult = { state: ProgressState; error?: string };

export function load(storage: StorageLike | undefined, key = STORAGE_KEY): LoadResult {
  if (!storage) return { state: initialState(), error: 'Storage unavailable' };
  let raw: string | null = null;
  try {
    raw = storage.getItem(key);
  } catch {
    return { state: initialState(), error: 'Your browser blocked local storage. Progress will not be saved.' };
  }
  if (!raw) return { state: initialState() };
  try {
    return { state: parseSaved(raw) };
  } catch (e) {
    // keep a backup of the unreadable data rather than silently destroying it
    try {
      storage.setItem(`${key}.corrupt-${Date.now()}`, raw);
    } catch {
      /* ignore */
    }
    return {
      state: initialState(),
      error: `Saved progress couldn’t be read (${(e as Error).message}). A backup was kept and you’re starting fresh.`,
    };
  }
}

export function save(storage: StorageLike | undefined, state: ProgressState, key = STORAGE_KEY): string | undefined {
  if (!storage) return 'Storage unavailable';
  try {
    storage.setItem(key, serialize(state));
    return undefined;
  } catch {
    return 'Couldn’t save progress — your browser storage may be full or disabled.';
  }
}
