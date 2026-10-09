import { useEffect, useMemo, useState } from 'react';
import type { Challenge } from '../content/challenges';
import { CONCEPT_BY_ID, splitTerm } from '../content';
import { describeTrace, lineDiff, matchPatterns } from '../engine/explain';
import type { Workspace } from './useWorkspace';
import { Link } from '../app/router';
import { Icon } from '../components/Icon';

// "Under the hood": every statement here is derived from the learner's real
// code (diff + pattern matches) or the real execution (trace, DOM summary,
// SQL steps). Nothing is generated or guessed.
export function UnderTheHood({ challenge, ws, linkConcepts = true }: { challenge: Challenge; ws: Workspace; linkConcepts?: boolean }) {
  const source = ws.ranCode ?? ws.code;
  const diff = useMemo(() => lineDiff(challenge.starter, source), [challenge.starter, source]);
  const hits = useMemo(() => matchPatterns(source, challenge.patterns, challenge.mode), [source, challenge]);
  const usingChecker = ws.checkerTrace.length > ws.trace.length;
  const events = useMemo(() => describeTrace(usingChecker ? ws.checkerTrace : ws.trace), [usingChecker, ws.checkerTrace, ws.trace]);
  const [step, setStep] = useState(0);
  useEffect(() => setStep(0), [events.length]);

  const added = diff.filter((d) => d.kind === 'added').length;
  const removed = diff.filter((d) => d.kind === 'removed').length;
  const concepts = new Set([...challenge.conceptIds, ...hits.map((h) => h.conceptId).filter(Boolean) as string[]]);

  return (
    <div className="uth" data-testid="under-the-hood">
      <section className="uth-sec">
        <h3><span className="uth-n">1</span> What did I change?</h3>
        {diff.length === 0 ? (
          <p className="muted">Nothing yet — this is the starter code. Change something and run it.</p>
        ) : (
          <>
            <p>
              <span className="diff-add">+{added} line{added === 1 ? '' : 's'}</span>{' '}
              <span className="diff-del">−{removed} line{removed === 1 ? '' : 's'}</span> compared to the starter.
            </p>
            <pre className="diff">
              {diff.slice(0, 10).map((d, i) => (
                <div key={i} className={d.kind === 'added' ? 'd-add' : 'd-del'}>
                  <span className="d-ln">{d.kind === 'added' ? '+' : '−'}{d.line}</span>
                  {d.text}
                </div>
              ))}
              {diff.length > 10 && <div className="muted">…and {diff.length - 10} more</div>}
            </pre>
          </>
        )}
      </section>

      <section className="uth-sec">
        <h3><span className="uth-n">2</span> What happened when it ran?</h3>
        {challenge.mode === 'sql' ? (
          ws.sql ? (
            <ol className="trace">
              {ws.sql.results.map((r, i) => (
                <li key={i}>
                  <code className="trace-sql">line {r.line}: {r.sql.split('\n')[0].slice(0, 60)}{r.sql.includes('\n') ? ' …' : ''}</code>
                  <ul>
                    {r.trace.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                    <li className="trace-result">→ {r.message}</li>
                  </ul>
                </li>
              ))}
              {ws.sql.error && (
                <li className="trace-error">
                  Stopped at line {ws.sql.error.line}: {ws.sql.error.message}
                </li>
              )}
            </ol>
          ) : (
            <p className="muted">Run the query to see each step the database takes.</p>
          )
        ) : (
          <>
            {ws.summary && Object.keys(ws.summary.counts).length > 0 && (
              <p>
                The browser built <strong>{plural(Object.values(ws.summary.counts).reduce((a, b) => a + b, 0), 'element')}</strong>:{' '}
                {Object.entries(ws.summary.counts).slice(0, 8).map(([t, n], i) => (
                  <span key={t}>{i > 0 && ', '}<code>&lt;{t}&gt;</code>×{n}</span>
                ))}
                .
              </p>
            )}
            {ws.summary && ws.summary.rules.length > 0 && (
              <div className="css-rules">
                {ws.summary.rules.slice(0, 8).map((r, i) => (
                  <div key={i} className={`css-rule${r.matches === 0 ? ' is-dead' : ''}`}>
                    <code>{r.selector}</code>
                    <span>{r.matches === 0 ? 'matched nothing' : `matched ${r.matches} element${r.matches === 1 ? '' : 's'}`}</span>
                  </div>
                ))}
              </div>
            )}
            {events.length > 0 ? (
              <div className="stepper">
                <div className="stepper-head">
                  <span className="eyebrow">{usingChecker ? 'Recorded during the checker run' : 'Recorded from your run'}</span>
                  <div className="stepper-ctrl">
                    <button className="icon-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} aria-label="Previous step"><Icon name="left" size={18} /></button>
                    <span className="mono" aria-live="polite">{step + 1}/{events.length}</span>
                    <button className="icon-btn" onClick={() => setStep((s) => Math.min(events.length - 1, s + 1))} disabled={step >= events.length - 1} aria-label="Next step"><Icon name="right" size={18} /></button>
                  </div>
                </div>
                <ol className="trace">
                  {events.map((e, i) => (
                    <li key={i} className={`trace-${e.kind}${i === step ? ' is-current' : ''}${i > step ? ' is-future' : ''}`} onClick={() => setStep(i)}>
                      <span className="trace-icon" aria-hidden>{e.icon}</span>
                      {e.text}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="muted">
                {challenge.checks.some((c) => c.kind === 'runtime' && c.steps.some((s) => s.op === 'click' || s.op === 'input'))
                  ? 'Interact with the preview (click the buttons!) or press Ship — every event and DOM change will be recorded here.'
                  : 'This page has no scripts, so the browser just parsed the HTML and painted it.'}
              </p>
            )}
          </>
        )}
      </section>

      <section className="uth-sec">
        <h3><span className="uth-n">3</span> Which code caused it?</h3>
        {hits.length === 0 ? (
          <p className="muted">No familiar patterns found yet.</p>
        ) : (
          <ul className="hits">
            {hits.map((h, i) => (
              <li key={i}>
                <span className="hit-line mono">L{h.line}</span>
                <div>
                  <code className="hit-snippet">{h.snippet}</code>
                  <p>{h.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="uth-sec">
        <h3><span className="uth-n">4</span> What the {challenge.mode === 'sql' ? 'database' : 'browser'} did</h3>
        <ol className="flow">
          {challenge.flow.steps.map((s, i) => (
            <li key={i}>
              <span className="flow-n">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>

      <section className="uth-sec">
        <h3><span className="uth-n">5</span> Concepts you just used</h3>
        <div className="chip-row">
          {[...concepts].filter((id) => CONCEPT_BY_ID[id]).map((id) =>
            linkConcepts ? (
              <Link key={id} to={`/card/${id}`} className="chip">{splitTerm(CONCEPT_BY_ID[id].term).title}</Link>
            ) : (
              <span key={id} className="chip chip-static">{splitTerm(CONCEPT_BY_ID[id].term).title}</span>
            ),
          )}
        </div>
      </section>

      <section className="uth-sec">
        <h3><span className="uth-n">6</span> What if you change it?</h3>
        <ul className="try-next">
          {challenge.tryNext.map((t) => (
            <li key={t}><Icon name="flask" size={16} /> {t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}
