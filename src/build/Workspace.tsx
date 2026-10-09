import { useState } from 'react';
import type { Challenge } from '../content/challenges';
import { CONCEPT_BY_ID, splitTerm } from '../content';
import { useProgress } from '../app/store';
import { Link } from '../app/router';
import { useToast } from '../app/toast';
import { Icon } from '../components/Icon';
import { Kbd } from '../components/ui';
import { CodeEditor } from './CodeEditor';
import { UnderTheHood } from './UnderTheHood';
import { useWorkspace, type Workspace as WS } from './useWorkspace';
import type { Value } from '../engine/tinysql';

type Tab = 'mission' | 'code' | 'result';
type ResultTab = 'preview' | 'console' | 'hood';

export function Workspace({ challenge, embedded = false }: { challenge: Challenge; embedded?: boolean }) {
  const ws = useWorkspace(challenge);
  const [tab, setTab] = useState<Tab>('code');
  const [rtab, setRtab] = useState<ResultTab>('preview');
  const errors = ws.consoleLines.filter((l) => l.level === 'runtime-error' || l.level === 'error').length;

  return (
    <div className={`workspace${embedded ? ' workspace-embedded' : ''}`} data-mode={challenge.mode}>
      <div className="ws-tabs" role="tablist" aria-label="Workspace panels">
        {(['mission', 'code', 'result'] as Tab[]).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={`ws-tab${tab === t ? ' is-active' : ''}`} onClick={() => setTab(t)}>
            {t === 'mission' ? 'Mission' : t === 'code' ? 'Code' : 'Result'}
            {t === 'result' && errors > 0 && <span className="count-badge count-badge-err">{errors}</span>}
          </button>
        ))}
      </div>

      <section className={`ws-panel ws-mission${tab === 'mission' ? ' is-shown' : ''}`} aria-label="Mission">
        <Mission challenge={challenge} ws={ws} embedded={embedded} />
      </section>

      <section className={`ws-panel ws-editor${tab === 'code' ? ' is-shown' : ''}`} aria-label="Code editor">
        <EditorPanel challenge={challenge} ws={ws} onRunMobile={() => { setTab('result'); setRtab('preview'); }} onShipMobile={() => { setTab('mission'); }} />
      </section>

      <section className={`ws-panel ws-result${tab === 'result' ? ' is-shown' : ''}`} aria-label="Result">
        <div className="rtabs" role="tablist" aria-label="Result views">
          <button role="tab" aria-selected={rtab === 'preview'} className={`rtab${rtab === 'preview' ? ' is-active' : ''}`} onClick={() => setRtab('preview')}>
            {challenge.mode === 'sql' ? 'Output' : 'Preview'}
          </button>
          <button role="tab" aria-selected={rtab === 'console'} className={`rtab${rtab === 'console' ? ' is-active' : ''}`} onClick={() => setRtab('console')}>
            Console {errors > 0 && <span className="count-badge count-badge-err">{errors}</span>}
          </button>
          <button role="tab" aria-selected={rtab === 'hood'} className={`rtab${rtab === 'hood' ? ' is-active' : ''}`} onClick={() => setRtab('hood')} data-testid="tab-hood">
            <Icon name="layers" size={14} /> Under the hood
          </button>
          <span className={`run-status run-${ws.status}`} aria-live="polite">
            {ws.status === 'running' ? 'Running…' : ws.status === 'ready' ? 'Live' : ws.status === 'stuck' ? 'Stuck' : ws.status === 'stopped' ? 'Stopped' : ''}
          </span>
        </div>
        <div className={`rpane${rtab === 'preview' ? ' is-shown' : ''}`}>
          {challenge.mode === 'sql' ? <SqlOutput ws={ws} /> : <div className="preview-host" ref={ws.attachPreview} data-testid="preview-host" />}
          {ws.status === 'stuck' && (
            <div className="stuck">
              <strong>Your code seems stuck.</strong> An endless loop (like <code>while (true)</code>) never lets the page finish. We stopped the preview — fix the loop and run again.
            </div>
          )}
        </div>
        <div className={`rpane${rtab === 'console' ? ' is-shown' : ''}`}>
          <ConsolePane ws={ws} sql={challenge.mode === 'sql'} />
        </div>
        <div className={`rpane rpane-scroll${rtab === 'hood' ? ' is-shown' : ''}`}>
          <UnderTheHood challenge={challenge} ws={ws} linkConcepts={!embedded} />
        </div>
      </section>
      {/* The hidden checker frame: runs completion checks in a fresh sandbox */}
      <div className="checker-host" ref={ws.attachChecker} aria-hidden />
    </div>
  );
}

function Mission({ challenge, ws, embedded }: { challenge: Challenge; ws: WS; embedded: boolean }) {
  const p = useProgress();
  const [hints, setHints] = useState(0);
  const shipped = !!p.state.shipped[challenge.id];
  const locked = !p.isChallengeUnlocked(challenge.id);
  const results = ws.ship.phase === 'done' ? ws.ship.results : null;
  return (
    <div className="mission">
      <div className="mission-drop" style={{ ['--c1' as string]: challenge.colorway[0], ['--c2' as string]: challenge.colorway[1] }}>
        <span className="mono">DROP {String(challenge.number).padStart(2, '0')}</span>
        <span className="mission-xp">+{challenge.xp} XP</span>
      </div>
      <h1 className="mission-title">{challenge.title}</h1>
      <p className="mission-goal">{challenge.goal}</p>
      {locked && !embedded && (
        <div className="lock-banner lock-banner-sm">
          <Icon name="lock" size={16} />
          <span>Practice mode — shipping earns XP from Level {p.challengeUnlockLevel(challenge.id)}. Everything else works.</span>
        </div>
      )}
      {shipped && <div className="shipped-tag"><Icon name="check" size={14} /> Shipped</div>}
      <div className="chip-row">
        {challenge.conceptIds.map((id) => CONCEPT_BY_ID[id] && (
          embedded ? <span key={id} className="chip chip-static">{splitTerm(CONCEPT_BY_ID[id].term).title}</span> : <Link key={id} to={`/card/${id}`} className="chip">{splitTerm(CONCEPT_BY_ID[id].term).title}</Link>
        ))}
      </div>
      <p className="mission-why">{challenge.why}</p>
      <h2 className="h-mini">Steps</h2>
      <ol className="mission-steps">
        {challenge.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <h2 className="h-mini">Done when</h2>
      <ul className="checklist" data-testid="checklist">
        {challenge.checks.map((c) => {
          const r = results?.find((x) => x.id === c.id);
          return (
            <li key={c.id} className={r ? (r.ok ? 'ok' : 'fail') : ''}>
              <span className="check-dot" aria-hidden>{r ? (r.ok ? <Icon name="check" size={12} /> : <Icon name="x" size={12} />) : null}</span>
              <div>
                <span>{c.label}</span>
                {r && !r.ok && <span className="check-hint">{c.hint}{r.detail ? ` (${r.detail})` : ''}</span>}
              </div>
              <span className="sr-only">{r ? (r.ok ? 'passed' : 'not yet') : 'not checked'}</span>
            </li>
          );
        })}
      </ul>
      <div className="hints">
        {challenge.hints.slice(0, hints).map((h, i) => (
          <pre key={i} className="hint-box hint-pre">{h}</pre>
        ))}
        {hints < challenge.hints.length && (
          <button className="btn btn-ghost btn-sm" onClick={() => setHints((h) => h + 1)}>
            <Icon name="hint" size={16} /> {hints === 0 ? 'Show a hint' : 'Another hint'}
          </button>
        )}
      </div>
      {challenge.simulationNote && (
        <p className="sim-note"><Icon name="info" size={16} /> {challenge.simulationNote}</p>
      )}
    </div>
  );
}

function EditorPanel({ challenge, ws, onRunMobile, onShipMobile }: { challenge: Challenge; ws: WS; onRunMobile: () => void; onShipMobile: () => void }) {
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);
  const checking = ws.ship.phase === 'checking';
  return (
    <div className="editor-panel">
      <div className="editor-bar">
        <span className="file-tab mono">
          <span className="file-dot" /> {challenge.fileName}
        </span>
        <div className="editor-actions">
          {challenge.mode === 'web' && (
            <label className="toggle toggle-sm" title="Re-run automatically as you type">
              <input type="checkbox" checked={ws.liveRun} onChange={(e) => ws.setLiveRun(e.target.checked)} />
              <span>Live</span>
            </label>
          )}
          <button
            className="icon-btn"
            title="Copy code"
            aria-label="Copy code"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(ws.code);
                toast.push({ kind: 'success', title: 'Copied' });
              } catch {
                toast.push({ kind: 'error', title: 'Couldn’t copy', body: 'Your browser blocked clipboard access.' });
              }
            }}
          >
            <Icon name="copy" size={18} />
          </button>
          {confirmReset ? (
            <span className="confirm-inline">
              Reset to starter?
              <button className="btn btn-danger btn-xs" onClick={() => { ws.reset(); setConfirmReset(false); }}>Reset</button>
              <button className="btn btn-ghost btn-xs" onClick={() => setConfirmReset(false)}>Keep</button>
            </span>
          ) : (
            <button className="icon-btn" title="Reset to starter code" aria-label="Reset to starter code" onClick={() => setConfirmReset(true)}>
              <Icon name="reset" size={18} />
            </button>
          )}
          {challenge.mode === 'web' && (
            <button className="icon-btn" title="Stop the preview" aria-label="Stop the preview" onClick={ws.stop}>
              <Icon name="stop" size={16} />
            </button>
          )}
        </div>
      </div>
      <CodeEditor
        value={ws.code}
        onChange={ws.setCode}
        language={challenge.mode === 'sql' ? 'sql' : 'html'}
        errorLine={ws.errorLine}
        label={`Edit ${challenge.fileName}`}
        onRun={() => ws.run()}
      />
      <div className="editor-foot">
        <button className="btn btn-secondary" onClick={() => { ws.run(); onRunMobile(); }} data-testid="run">
          <Icon name="play" size={14} /> Run <Kbd>⌘↵</Kbd>
        </button>
        <button className="btn btn-primary btn-ship" onClick={() => { ws.shipIt(); onShipMobile(); }} disabled={checking} data-testid="ship">
          <Icon name="rocket" size={16} />
          {checking && ws.ship.phase === 'checking' ? `Checking ${ws.ship.done}/${ws.ship.total}…` : 'Ship it'}
        </button>
      </div>
      <ShipResult challenge={challenge} ws={ws} />
    </div>
  );
}

function ShipResult({ challenge, ws }: { challenge: Challenge; ws: WS }) {
  if (ws.ship.phase !== 'done') return null;
  const { results, passed, xp, eligible } = ws.ship;
  const n = results.filter((r) => r.ok).length;
  return (
    <div className={`ship-result ${passed ? 'is-pass' : 'is-fail'}`} role="status" data-testid="ship-result">
      {passed ? (
        <>
          <div className="ship-stamp">SHIPPED</div>
          <div>
            <strong>All {results.length} checks passed.</strong>{' '}
            {xp > 0 ? <span className="xp-pop">+{xp} XP</span> : eligible ? <span className="muted">XP already collected for this drop.</span> : <span className="muted">Practice run — XP unlocks at Level {challenge.unlockLevel}.</span>}
            <p className="muted">Open “Under the hood” to see exactly what your code did.</p>
          </div>
        </>
      ) : (
        <div>
          <strong>{n}/{results.length} checks passing.</strong> Not shipped yet — see the checklist in Mission for what’s missing. No XP is awarded until every check passes.
        </div>
      )}
    </div>
  );
}

function ConsolePane({ ws, sql }: { ws: WS; sql: boolean }) {
  if (sql) {
    return (
      <div className="console" data-testid="console">
        {ws.sql?.error ? (
          <div className="console-line console-runtime-error">
            <span className="console-loc">line {ws.sql.error.line}</span> {ws.sql.error.message}
          </div>
        ) : (
          <div className="console-empty">{ws.sql ? `${ws.sql.results.length} statement(s) ran without errors.` : 'Run your SQL to see messages.'}</div>
        )}
      </div>
    );
  }
  return (
    <div className="console" data-testid="console">
      {ws.consoleLines.length === 0 ? (
        <div className="console-empty">Nothing logged. Try <code>console.log("hi")</code> in a script.</div>
      ) : (
        ws.consoleLines.map((l) => (
          <div key={l.n} className={`console-line console-${l.level}`}>
            {'message' in l ? (
              <>
                {l.line && <span className="console-loc">line {l.line}</span>} {l.message}
                <span className="console-help">{explainError(l.message)}</span>
              </>
            ) : (
              l.text
            )}
          </div>
        ))
      )}
    </div>
  );
}

export function explainError(msg: string): string {
  if (/is not defined/.test(msg)) return 'You used a name the browser doesn’t know — check spelling and capital letters, or define it first.';
  if (/Unexpected token|Unexpected end of input|missing \)/i.test(msg)) return 'A syntax error: something is missing or extra — often a bracket, quote or comma.';
  if (/Cannot read propert|null/.test(msg)) return 'Something was null — usually getElementById found no element with that id.';
  if (/is not a function/.test(msg)) return 'You called something that isn’t a function — check the name and the brackets.';
  if (/is not iterable/.test(msg)) return 'You looped over something that isn’t a list — maybe the server sent an error object instead of an array.';
  if (/Assignment to constant/.test(msg)) return 'const values can’t change. Use let for values that change.';
  if (/JSON/.test(msg)) return 'The text wasn’t valid JSON — check quotes and commas.';
  return '';
}

function fmt(v: Value) {
  if (v === null) return <span className="muted">NULL</span>;
  if (typeof v === 'boolean') return <span className="tk-keyword">{v ? 'TRUE' : 'FALSE'}</span>;
  return String(v);
}

function SqlOutput({ ws }: { ws: WS }) {
  const r = ws.sql;
  if (!r) return <div className="console-empty">Press Run to execute your SQL.</div>;
  const tables = Object.values(r.db.tables);
  return (
    <div className="sql-out" data-testid="sql-output">
      {r.results.filter((x) => x.kind === 'select').map((x, i) => (
        <div key={i} className="sql-block">
          <div className="sql-caption"><code>{x.sql.replace(/\s+/g, ' ').slice(0, 90)}</code> <span className="muted">· {x.message}</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr>{x.columns!.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {x.rows!.length === 0 ? <tr><td colSpan={x.columns!.length} className="muted">No rows matched.</td></tr> : x.rows!.map((row, j) => <tr key={j}>{row.map((v, k) => <td key={k}>{fmt(v)}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {r.error && (
        <div className="sql-error" role="alert">
          <strong>Error on line {r.error.line}:</strong> {r.error.message}
        </div>
      )}
      {tables.map((t) => (
        <div key={t.name} className="sql-block">
          <div className="sql-caption"><Icon name="layers" size={14} /> Table <strong>{t.name}</strong> after your script · {t.rows.length} rows</div>
          <div className="table-wrap">
            <table>
              <thead><tr>{t.columns.map((c) => <th key={c.name}>{c.name}{c.pk && <span className="pk">PK</span>}<span className="coltype">{c.type}</span></th>)}</tr></thead>
              <tbody>{t.rows.map((row, j) => <tr key={j}>{t.columns.map((c) => <td key={c.name}>{fmt(row[c.name])}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="sim-note"><Icon name="info" size={14} /> TinySQL runs in your browser’s memory and resets every run — a teaching simulator, not a real database server.</p>
    </div>
  );
}
