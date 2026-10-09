import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode,
} from 'react';
import { CHALLENGE_BY_ID } from '../content/challenges';
import { CONCEPT_BY_ID } from '../content';
import { LEVELS, levelDef, type LevelDef } from '../engine/levels';
import {
  initialState, levelOf, reduce, totalXp, trackUnlockLevel, type Action, type ProgressState, type XpTxn,
} from '../engine/progress';
import { isLearned } from '../engine/srs';
import { load, save, STORAGE_KEY } from '../engine/storage';
import { useToast } from './toast';
import { LevelUpModal } from '../components/LevelUpModal';

export type ProgressApi = {
  state: ProgressState;
  /** Applies an action and returns the XP transactions it created. */
  dispatch: (a: Action) => XpTxn[];
  xp: number;
  level: number;
  levels: LevelDef[];
  current: LevelDef;
  isDemo: boolean;
  learned: (conceptId: string) => boolean;
  conceptUnlockLevel: (conceptId: string) => number;
  isUnlocked: (conceptId: string) => boolean;
  challengeUnlockLevel: (challengeId: string) => number;
  isChallengeUnlocked: (challengeId: string) => boolean;
  saveError?: string;
};

const Ctx = createContext<ProgressApi | null>(null);

type Props = {
  children: ReactNode;
  /** localStorage key; omit for an in-memory (demo) profile */
  storageKey?: string;
  levels?: LevelDef[];
  conceptUnlockLevel?: (conceptId: string) => number;
  challengeUnlockLevel?: (challengeId: string) => number;
  isDemo?: boolean;
};

function safeStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function ProgressProvider({
  children, storageKey, levels = LEVELS, conceptUnlockLevel, challengeUnlockLevel, isDemo = false,
}: Props) {
  const toast = useToast();
  const [boot] = useState(() =>
    storageKey ? load(safeStorage(), storageKey) : { state: initialState(), error: undefined },
  );
  const [state, setState] = useState<ProgressState>(boot.state);
  const [saveError, setSaveError] = useState<string | undefined>(boot.error);
  const stateRef = useRef(state);

  useEffect(() => {
    if (boot.error) toast.push({ kind: 'error', title: 'Progress', body: boot.error });
  }, [boot.error, toast]);

  // Persist (debounced) — local only.
  useEffect(() => {
    if (!storageKey) return;
    const t = setTimeout(() => setSaveError(save(safeStorage(), state, storageKey)), 120);
    return () => clearTimeout(t);
  }, [state, storageKey]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    if (!storageKey) return;
    const on = (e: StorageEvent) => {
      if (e.key !== storageKey || !e.newValue) return;
      const next = load(safeStorage(), storageKey).state;
      stateRef.current = next;
      setState(next);
    };
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  }, [storageKey]);

  const dispatch = useCallback(
    (a: Action) => {
      const prev = stateRef.current;
      const next = reduce(prev, a);
      if (next === prev) return [];
      stateRef.current = next;
      setState(next);
      const fresh = next.ledger.slice(prev.ledger.length);
      for (const t of fresh) {
        toast.push({ kind: 'xp', title: `+${t.amount} XP`, body: t.label });
      }
      return fresh;
    },
    [toast],
  );

  const api = useMemo<ProgressApi>(() => {
    const xp = totalXp(state);
    const level = levelOf(state, levels);
    const cul = conceptUnlockLevel ?? ((id: string) => trackUnlockLevel(CONCEPT_BY_ID[id]?.trackId ?? 'internet'));
    const chul = challengeUnlockLevel ?? ((id: string) => CHALLENGE_BY_ID[id]?.unlockLevel ?? 1);
    return {
      state,
      dispatch,
      xp,
      level,
      levels,
      current: levelDef(level, levels),
      isDemo,
      learned: (id) => isLearned(state.reviews[id]),
      conceptUnlockLevel: cul,
      isUnlocked: (id) => cul(id) <= level,
      challengeUnlockLevel: chul,
      isChallengeUnlocked: (id) => chul(id) <= level,
      saveError,
    };
  }, [state, dispatch, levels, conceptUnlockLevel, challengeUnlockLevel, isDemo, saveError]);

  const celebrate = api.level > state.seenLevel ? levelDef(api.level, levels) : null;

  return (
    <Ctx.Provider value={api}>
      {children}
      {celebrate && (
        <LevelUpModal
          def={celebrate}
          isDemo={isDemo}
          onClose={() => dispatch({ type: 'ackLevel', level: celebrate.level })}
        />
      )}
    </Ctx.Provider>
  );
}

export function useProgress(): ProgressApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useProgress must be used inside ProgressProvider');
  return v;
}

export { STORAGE_KEY };
