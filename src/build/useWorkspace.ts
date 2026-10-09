import { useCallback, useEffect, useRef, useState } from 'react';
import type { Challenge, RuntimeCheck } from '../content/challenges';
import { runSql, type RunResult } from '../engine/tinysql';
import { SandboxFrame, StuckError } from '../sandbox/frame';
import type { ConsoleMsg, ErrorMsg, PageSummary, TraceEvent } from '../sandbox/protocol';
import { useProgress } from '../app/store';

export type RunStatus = 'idle' | 'running' | 'ready' | 'stuck' | 'stopped';
export type CheckOutcome = { id: string; ok: boolean; detail: string };
export type ShipState =
  | { phase: 'idle' }
  | { phase: 'checking'; done: number; total: number }
  | { phase: 'done'; results: CheckOutcome[]; passed: boolean; xp: number; eligible: boolean };

export type ConsoleLine = (ConsoleMsg | (ErrorMsg & { level: 'runtime-error' })) & { n: number };

export function useWorkspace(challenge: Challenge) {
  const p = useProgress();
  const [code, setCodeState] = useState(() => p.state.code[challenge.id] ?? challenge.starter);
  const [status, setStatus] = useState<RunStatus>('idle');
  const [consoleLines, setConsole] = useState<ConsoleLine[]>([]);
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [checkerTrace, setCheckerTrace] = useState<TraceEvent[]>([]);
  const [summary, setSummary] = useState<PageSummary | null>(null);
  const [sql, setSql] = useState<RunResult | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [ship, setShip] = useState<ShipState>({ phase: 'idle' });
  const [ranCode, setRanCode] = useState<string | null>(null);
  const [liveRun, setLiveRun] = useState(() => challenge.mode === 'web' && !/<script/i.test(challenge.starter));
  const previewEl = useRef<HTMLDivElement | null>(null);
  const checkerEl = useRef<HTMLDivElement | null>(null);
  const preview = useRef<SandboxFrame | null>(null);
  const checker = useRef<SandboxFrame | null>(null);
  const lineN = useRef(0);
  const pRef = useRef(p);
  pRef.current = p;

  // Create frame controllers once their containers mount.
  const attachPreview = useCallback((el: HTMLDivElement | null) => {
    previewEl.current = el;
    if (el && !preview.current) {
      preview.current = new SandboxFrame(el, {}, `Preview of your ${challenge.fileName}`);
    }
  }, [challenge.fileName]);
  const attachChecker = useCallback((el: HTMLDivElement | null) => {
    checkerEl.current = el;
    if (el && !checker.current) checker.current = new SandboxFrame(el, {}, 'Automated checker (hidden)');
  }, []);
  useEffect(
    () => () => {
      preview.current?.dispose();
      checker.current?.dispose();
      preview.current = null;
      checker.current = null;
    },
    [],
  );

  // Persist code (debounced) to whichever profile is active (real or demo).
  useEffect(() => {
    const t = setTimeout(() => {
      if ((pRef.current.state.code[challenge.id] ?? challenge.starter) !== code) {
        pRef.current.dispatch({ type: 'saveCode', challengeId: challenge.id, code });
      }
    }, 400);
    return () => clearTimeout(t);
  }, [code, challenge.id, challenge.starter]);

  const pushConsole = useCallback((l: ConsoleMsg | (ErrorMsg & { level: 'runtime-error' })) => {
    lineN.current += 1;
    const n = lineN.current;
    setConsole((c) => [...c.slice(-199), { ...l, n }]);
  }, []);

  const run = useCallback(
    async (src?: string) => {
      const source = src ?? code;
      setErrorLine(null);
      setConsole([]);
      setTrace([]);
      setRanCode(source);
      if (challenge.mode === 'sql') {
        const r = runSql(source);
        setSql(r);
        setStatus('ready');
        if (r.error) setErrorLine(r.error.line);
        return;
      }
      const f = preview.current;
      if (!f) return;
      f.setListener({
        onConsole: (m) => pushConsole(m),
        onError: (m) => {
          pushConsole({ ...m, level: 'runtime-error' });
          if (m.line) setErrorLine(m.line);
        },
        onTrace: (t) => setTrace((all) => [...all.slice(-299), t]),
      });
      setStatus('running');
      try {
        const s = await f.load(source);
        setSummary(s);
        setStatus('ready');
      } catch (e) {
        if (e instanceof StuckError) {
          setStatus('stuck');
          f.stop();
          pushConsole({ level: 'runtime-error', message: e.message, line: null });
        }
      }
    },
    [code, challenge.mode, pushConsole],
  );

  const stop = useCallback(() => {
    preview.current?.stop();
    checker.current?.stop();
    setStatus('stopped');
  }, []);

  // Live preview for markup-only challenges (debounced)
  useEffect(() => {
    if (!liveRun || challenge.mode !== 'web') return;
    const t = setTimeout(() => run(code), 500);
    return () => clearTimeout(t);
  }, [code, liveRun, challenge.mode, run]);

  // Run once on mount so the preview isn't empty.
  useEffect(() => {
    const t = setTimeout(() => run(), 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCode = useCallback((v: string) => {
    setCodeState(v);
    setShip((s) => (s.phase === 'done' ? { phase: 'idle' } : s));
  }, []);

  const reset = useCallback(() => {
    setCodeState(challenge.starter);
    setShip({ phase: 'idle' });
    setTimeout(() => run(challenge.starter), 0);
  }, [challenge.starter, run]);

  const shipIt = useCallback(async () => {
    const source = code;
    const checks = challenge.checks;
    const results: CheckOutcome[] = [];
    setShip({ phase: 'checking', done: 0, total: checks.length });
    await run(source); // the visible preview reflects exactly what is being shipped

    if (challenge.mode === 'sql') {
      const r = runSql(source);
      for (const c of checks) {
        if (c.kind === 'sql') {
          let ok = false;
          try {
            ok = c.test(r);
          } catch {
            ok = false;
          }
          results.push({ id: c.id, ok, detail: ok ? '' : c.id === 'noerr' && r.error ? r.error.message : '' });
        }
      }
    } else {
      for (const c of checks) if (c.kind === 'source') results.push({ id: c.id, ok: c.test(source), detail: '' });
      // Group runtime checks by scenario (normal vs. injected server fault); each scenario gets a fresh sandbox.
      const runtime = checks.filter((c): c is RuntimeCheck => c.kind === 'runtime');
      const groups = new Map<number, RuntimeCheck[]>();
      for (const c of runtime) {
        const k = c.fault ?? 0;
        groups.set(k, [...(groups.get(k) ?? []), c]);
      }
      const f = checker.current;
      for (const [fault, group] of groups) {
        const captured: TraceEvent[] = [];
        if (f) f.setListener({ onTrace: (t) => captured.push(t) });
        let loaded = !!f;
        try {
          if (f) await f.load(source, { fault: fault || null });
        } catch {
          loaded = false;
        }
        for (const c of group) {
          if (!loaded || !f) {
            results.push({ id: c.id, ok: false, detail: 'The page didn’t load — check the console for errors or an endless loop.' });
          } else {
            const r = await f.check(c.steps);
            results.push({ id: c.id, ok: r.ok, detail: r.detail });
          }
          setShip({ phase: 'checking', done: results.length, total: checks.length });
        }
        if (!fault) setCheckerTrace(captured);
        f?.stop();
      }
    }

    // keep original check order
    const ordered = checks.map((c) => results.find((r) => r.id === c.id) ?? { id: c.id, ok: false, detail: '' });
    const passedN = ordered.filter((r) => r.ok).length;
    const passed = passedN === checks.length;
    const api = pRef.current;
    const now = Date.now();
    api.dispatch({ type: 'challengeRun', challengeId: challenge.id, passed: passedN, total: checks.length, now });
    let xp = 0;
    const eligible = api.isChallengeUnlocked(challenge.id);
    if (passed) {
      const txns = api.dispatch({ type: 'ship', challengeId: challenge.id, title: challenge.title, xp: challenge.xp, eligible, now });
      xp = txns.filter((t) => t.reason === 'challenge').reduce((s, t) => s + t.amount, 0);
    }
    setShip({ phase: 'done', results: ordered, passed, xp, eligible });
  }, [code, challenge, run]);

  return {
    code, setCode, run, stop, reset, shipIt, status, consoleLines, trace, checkerTrace, summary, sql,
    errorLine, ship, ranCode, liveRun, setLiveRun, attachPreview, attachChecker,
  };
}

export type Workspace = ReturnType<typeof useWorkspace>;
