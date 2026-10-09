import { useRef, useState } from 'react';
import { CONCEPT_BY_ID, CONCEPTS, conceptsInTrack, splitTerm, TRACKS } from '../content';
import { CHALLENGES } from '../content/challenges';
import { LEVELS, requirementStatus } from '../engine/levels';
import { initialState, streak } from '../engine/progress';
import { statusOf } from '../engine/srs';
import { parseSaved, serialize } from '../engine/storage';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { useToast } from '../app/toast';
import { Icon } from '../components/Icon';
import { LevelBadge, Modal } from '../components/ui';

export function ProfilePage() {
  const p = useProgress();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetText, setResetText] = useState('');
  const s = p.state;
  const collected = CONCEPTS.filter((c) => p.learned(c.id)).length;
  const mastered = CONCEPTS.filter((c) => statusOf(s.reviews[c.id]) === 'mastered').length;
  const attempts = Object.values(s.reviews).reduce((n, r) => n + r.attempts, 0);
  const correct = Object.values(s.reviews).reduce((n, r) => n + r.correct, 0);
  const bestTrack = TRACKS.map((t) => ({ t, n: conceptsInTrack(t.id).filter((c) => p.learned(c.id)).length })).sort((a, b) => b.n - a.n)[0];
  const shipped = CHALLENGES.filter((c) => s.shipped[c.id]).length;

  function exportProgress() {
    const blob = new Blob([serialize(s)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coded-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importProgress(file: File) {
    try {
      if (file.size > 2_000_000) throw new Error('File is too large to be a Coded progress file.');
      const next = parseSaved(await file.text());
      p.dispatch({ type: 'replace', state: next });
      toast.push({ kind: 'success', title: 'Progress imported', body: `${next.ledger.length} XP events restored.` });
    } catch (e) {
      toast.push({ kind: 'error', title: 'Import failed', body: (e as Error).message || 'That file isn’t valid Coded progress.' });
    }
  }

  return (
    <div className="page">
      <header className="wrapped">
        <div className="eyebrow">Your Coded, wrapped</div>
        <div className="wrapped-grid">
          <div className="wrapped-tile wt-a">
            <LevelBadge level={p.level} size="lg" />
            <div className="wt-big">{p.current.name}</div>
            <div className="wt-small mono">{p.xp} XP total</div>
          </div>
          <div className="wrapped-tile wt-b">
            <div className="wt-big">{collected}</div>
            <div className="wt-small">cards committed of {CONCEPTS.length}</div>
          </div>
          <div className="wrapped-tile wt-c">
            <div className="wt-big">{mastered}</div>
            <div className="wt-small">merged to main</div>
          </div>
          <div className="wrapped-tile wt-d">
            <div className="wt-big">{attempts ? Math.round((correct / attempts) * 100) : 0}%</div>
            <div className="wt-small">answers correct</div>
          </div>
          <div className="wrapped-tile wt-e">
            <div className="wt-big">{streak(s)}</div>
            <div className="wt-small">day streak · {s.activityDays.length} active days</div>
          </div>
          <div className="wrapped-tile wt-f">
            <div className="wt-big">{shipped}/{CHALLENGES.length}</div>
            <div className="wt-small">drops shipped</div>
          </div>
          {bestTrack && bestTrack.n > 0 && (
            <div className="wrapped-tile wt-g">
              <div className="wt-small">Top module</div>
              <div className="wt-mid">{bestTrack.t.name}</div>
            </div>
          )}
        </div>
      </header>

      <section aria-labelledby="ladder-h">
        <h2 id="ladder-h" className="h-section">Level ladder</h2>
        <p className="muted">Levels need XP <em>and</em> proof: specific cards recalled and drops shipped. Grinding easy cards alone won’t get you there.</p>
        <ol className="ladder">
          {LEVELS.map((def) => {
            const st = requirementStatus(def, { xp: p.xp, learned: p.learned, shipped: (id) => !!s.shipped[id] });
            const reached = def.level <= p.level;
            const isNext = def.level === p.level + 1;
            return (
              <li key={def.level} className={`rung${reached ? ' is-reached' : ''}${isNext ? ' is-next' : ''}`}>
                <LevelBadge level={def.level} size="sm" />
                <div className="rung-body">
                  <div className="rung-title">
                    <strong>{def.name}</strong> <span className="muted mono">{def.xp} XP</span>
                    {reached && <span className="rung-tag">Reached</span>}
                    {isNext && <span className="rung-tag rung-tag-next">Next</span>}
                  </div>
                  <p className="muted">{def.blurb}</p>
                  {(isNext || (!reached && def.level <= p.level + 2)) && (def.concepts.length > 0 || def.challenges.length > 0) && (
                    <div className="chip-row">
                      {def.concepts.map((id) => (
                        <Link key={id} to={`/learn?card=${id}`} className={`chip${p.learned(id) ? ' chip-done' : ''}`}>
                          {p.learned(id) ? <Icon name="check" size={12} /> : null} {splitTerm(CONCEPT_BY_ID[id].term).title}
                        </Link>
                      ))}
                      {def.challenges.map((id) => (
                        <Link key={id} to={`/build/${id}`} className={`chip chip-drop${s.shipped[id] ? ' chip-done' : ''}`}>
                          {s.shipped[id] ? <Icon name="check" size={12} /> : <Icon name="code" size={12} />} {CHALLENGES.find((c) => c.id === id)?.title}
                        </Link>
                      ))}
                    </div>
                  )}
                  {isNext && !st.met && (
                    <p className="rung-why">
                      Locked because: {[
                        !st.xpMet && `${def.xp - p.xp} more XP`,
                        st.missingConcepts.length > 0 && `${st.missingConcepts.length} card${st.missingConcepts.length > 1 ? 's' : ''} to recall`,
                        st.missingChallenges.length > 0 && `${st.missingChallenges.length} drop to ship`,
                      ].filter(Boolean).join(', ')}.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="ledger-h">
        <h2 id="ledger-h" className="h-section">XP history</h2>
        {s.ledger.length === 0 ? (
          <p className="muted">No XP yet. <Link to="/learn">Answer your first card →</Link></p>
        ) : (
          <ol className="ledger" data-testid="ledger">
            {[...s.ledger].reverse().slice(0, 60).map((t) => (
              <li key={t.id}>
                <span className={`ledger-amt reason-${t.reason}`}>+{t.amount}</span>
                <span className="ledger-label">{t.label}</span>
                <time className="muted mono" dateTime={new Date(t.at).toISOString()}>
                  {new Date(t.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </time>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section aria-labelledby="data-h" className="data-card">
        <h2 id="data-h" className="h-section">Your data</h2>
        <p>
          Coded has no accounts and no servers. Your progress lives only in this browser’s local storage — nothing is sent anywhere. That also means it won’t follow you to another browser or device, and clearing site data erases it. Export a backup to move it.
        </p>
        <div className="data-actions">
          <button className="btn btn-secondary" onClick={exportProgress}>
            <Icon name="download" size={16} /> Export progress
          </button>
          <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
            <Icon name="upload" size={16} /> Import progress
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importProgress(f);
              e.target.value = '';
            }}
          />
          <button className="btn btn-danger" onClick={() => setConfirmReset(true)}>
            <Icon name="trash" size={16} /> Reset everything
          </button>
        </div>
      </section>

      {confirmReset && (
        <Modal title="Reset all progress?" onClose={() => setConfirmReset(false)}>
          <p>This permanently erases your XP, committed cards, review schedule and saved code in this browser. Consider exporting a backup first.</p>
          <label className="field">
            <span>Type <strong>RESET</strong> to confirm</span>
            <input value={resetText} onChange={(e) => setResetText(e.target.value)} autoComplete="off" />
          </label>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
            <button
              className="btn btn-danger"
              disabled={resetText.trim().toUpperCase() !== 'RESET'}
              onClick={() => {
                p.dispatch({ type: 'replace', state: initialState() });
                setConfirmReset(false);
                setResetText('');
                toast.push({ kind: 'info', title: 'Progress reset', body: 'Fresh start. Welcome back to Level 1.' });
              }}
            >
              Erase progress
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
