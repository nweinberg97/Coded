import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { CONCEPT_BY_ID, CONCEPTS, rarityOf, serialOf, splitTerm, TRACK_BY_ID } from '../content';
import type { Concept } from '../content/types';
import { CHALLENGE_BY_ID } from '../content/challenges';
import { evaluateAnswer, type Evaluation } from '../engine/evaluate';
import { potentialXp } from '../engine/progress';
import { describeDue, statusOf, type Outcome } from '../engine/srs';
import { useProgress } from '../app/store';
import { Link } from '../app/router';
import { Icon } from './Icon';
import { DifficultyPips, Kbd, StatusTag } from './ui';

export const MAX_TRIES_BEFORE_REVEAL = 3;

type Phase = 'question' | 'done';

export function StudyCard({
  concept, sessionId, onNext, onPrev, position, compact, autoFocus = true, onResult, linkTo = true,
}: {
  concept: Concept;
  sessionId: string;
  onNext?: () => void;
  onPrev?: () => void;
  position?: { index: number; total: number };
  compact?: boolean;
  autoFocus?: boolean;
  onResult?: (outcome: Outcome, xp: number) => void;
  /** whether related chips/links navigate (false in tightly-scoped demo steps) */
  linkTo?: boolean;
}) {
  const p = useProgress();
  const [answer, setAnswer] = useState('');
  const [tries, setTries] = useState(0);
  const [hint, setHint] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [phase, setPhase] = useState<Phase>('question');
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [earned, setEarned] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [deeper, setDeeper] = useState(false);
  const committed = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const locked = !p.isUnlocked(concept.id);
  const review = p.state.reviews[concept.id];
  const status = statusOf(review);
  const rarity = rarityOf(concept.difficulty);
  const track = TRACK_BY_ID[concept.trackId];
  const { title, subtitle } = splitTerm(concept.term);
  const now = Date.now();
  const reward = locked ? 0 : potentialXp(p.state, concept.id, now, tries === 0 && !hint);
  const bookmarked = p.state.bookmarks.includes(concept.id);

  useEffect(() => {
    if (autoFocus && !compact) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus, compact]);

  useEffect(() => {
    if (phase === 'done') nextRef.current?.focus({ preventScroll: true });
  }, [phase]);

  function commit(o: Outcome) {
    if (committed.current) return; // guards double submits / key repeat
    committed.current = true;
    const txns = p.dispatch({ type: 'answer', conceptId: concept.id, outcome: o, sessionId, now: Date.now(), preview: locked });
    const xp = txns.filter((t) => t.reason === 'learn' || t.reason === 'review').reduce((s, t) => s + t.amount, 0);
    setEarned(xp);
    setOutcome(o);
    setFlipping(true);
    window.setTimeout(() => setPhase('done'), 170);
    window.setTimeout(() => setFlipping(false), 420);
    onResult?.(o, xp);
  }

  function submit(e?: FormEvent) {
    e?.preventDefault();
    if (phase !== 'question' || committed.current) return;
    const r = evaluateAnswer(concept, answer);
    setEvaluation(r);
    if (r.verdict === 'correct') {
      commit(tries === 0 && !hint ? 'correct' : 'assisted');
    } else if (answer.trim()) {
      setTries((t) => t + 1);
    }
  }

  function reveal() {
    if (phase !== 'question') return;
    commit('missed');
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  const prereqs = (concept.prerequisiteIds ?? []).map((id) => CONCEPT_BY_ID[id]).filter(Boolean);
  const related = concept.relatedConceptIds.map((id) => CONCEPT_BY_ID[id]).filter(Boolean).slice(0, 6);
  const challenge = concept.challengeId ? CHALLENGE_BY_ID[concept.challengeId] : undefined;

  return (
    <article
      className={`study${compact ? ' study-compact' : ''}`}
      style={{ ['--rarity' as string]: rarity.color, ['--set-a' as string]: track.cover[0], ['--set-b' as string]: track.cover[1] }}
      aria-label={`Flashcard: ${concept.term}`}
    >
      {locked && (
        <div className="lock-banner" role="note">
          <Icon name="lock" size={18} />
          <div>
            <strong>Preview · unlocks at Level {p.conceptUnlockLevel(concept.id)}</strong>
            <span>
              You can read and try this card, but it won’t save or earn XP yet.
              {prereqs.length > 0 && ' Start with: '}
              {prereqs.slice(0, 3).map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ', '}
                  {linkTo ? <Link to={`/learn?card=${c.id}`}>{splitTerm(c.term).title}</Link> : splitTerm(c.term).title}
                </span>
              ))}
            </span>
          </div>
        </div>
      )}

      <div className={`study-card rarity-${rarity.id}${flipping ? ' is-flipping' : ''}${phase === 'done' ? ' is-back' : ''}`}>
        <div className="study-card-glow" aria-hidden />
        <header className="study-top">
          <span className="study-set">
            <span className="set-swatch" aria-hidden />
            {track.name}
          </span>
          <span className="mono study-serial">
            #{String(serialOf(concept.id)).padStart(3, '0')}/{CONCEPTS.length}
          </span>
        </header>

        {phase === 'question' ? (
          <div className="study-front">
            <div className="study-term">{title}</div>
            {subtitle && <div className="study-subtitle">{subtitle}</div>}
            <p className="study-question">{concept.question}</p>
          </div>
        ) : (
          <div className="study-back">
            <div className={`result-banner result-${outcome}`}>
              {outcome === 'missed' ? (
                <>
                  <Icon name="eye" size={18} /> Answer revealed — this card will come back soon.
                </>
              ) : (
                <>
                  <Icon name="check" size={18} />
                  {outcome === 'correct' ? 'Collected first try' : 'Collected'}
                  {earned > 0 ? (
                    <span className="xp-pop">+{earned} XP</span>
                  ) : (
                    <span className="xp-none">{locked ? 'preview · not saved' : 'practice · no XP until due'}</span>
                  )}
                </>
              )}
            </div>
            <div className="study-term study-term-sm">{title}</div>
            <p className="canonical">{concept.canonicalAnswer}</p>
            {outcome !== 'missed' && evaluation && evaluation.hit.length > 0 && (
              <p className="why-correct">
                <strong>Why your answer counts:</strong> you captured {evaluation.hit.map((h) => h.label).join(' and ')}.
              </p>
            )}
            <dl className="facts">
              <div>
                <dt>In plain English</dt>
                <dd>{concept.plainEnglish}</dd>
              </div>
              {concept.analogy && (
                <div>
                  <dt>Think of it like</dt>
                  <dd>{concept.analogy}</dd>
                </div>
              )}
              <div>
                <dt>Example</dt>
                <dd>{concept.example}</dd>
              </div>
              {!compact && (
                <div>
                  <dt>Why it matters</dt>
                  <dd>{concept.whyItMatters}</dd>
                </div>
              )}
              {concept.misconception && !compact && (
                <div className="fact-warn">
                  <dt>Don’t mix it up</dt>
                  <dd>{concept.misconception}</dd>
                </div>
              )}
            </dl>
            {concept.deepDive && !compact && (
              <div className="deeper">
                <button className="link-btn" onClick={() => setDeeper((d) => !d)} aria-expanded={deeper}>
                  <Icon name="layers" size={16} /> {deeper ? 'Hide' : 'Go deeper'}
                </button>
                {deeper && <p>{concept.deepDive}</p>}
              </div>
            )}
          </div>
        )}

        <footer className="study-bottom">
          <span className="study-rarity">{rarity.label}</span>
          <DifficultyPips difficulty={concept.difficulty} />
          <StatusTag status={status} />
          {phase === 'question' && reward > 0 && <span className="xp-chip">+{reward} XP</span>}
          {phase === 'question' && !locked && reward === 0 && status !== 'new' && (
            <span className="due-chip">{describeDue(review, now)} · practice</span>
          )}
        </footer>
      </div>

      {phase === 'question' ? (
        <form className="answer" onSubmit={submit}>
          <label className="sr-only" htmlFor={`ans-${concept.id}`}>
            Your answer
          </label>
          <textarea
            id={`ans-${concept.id}`}
            ref={inputRef}
            className="answer-input"
            rows={compact ? 2 : 2}
            placeholder="Type your answer in your own words…"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            spellCheck
            data-testid="answer-input"
          />
          <div className="answer-actions">
            <button type="submit" className="btn btn-primary" disabled={!answer.trim()} data-testid="submit-answer">
              Check <Kbd>↵</Kbd>
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setHint(true)} disabled={hint} data-testid="hint">
              <Icon name="hint" size={16} /> Hint
            </button>
            {(tries > 0 || hint) && (
              <button type="button" className="btn btn-ghost" onClick={reveal} data-testid="reveal">
                <Icon name="eye" size={16} /> Show answer
              </button>
            )}
            <span className="answer-meta">
              {tries > 0 ? `Attempt ${tries + 1}` : hint ? 'Hint used · reduced XP' : 'First try = full XP'}
            </span>
          </div>
          {hint && (
            <div className="hint-box" role="note">
              <Icon name="hint" size={16} /> {concept.hint}
            </div>
          )}
          {evaluation && evaluation.verdict !== 'correct' && (
            <div className={`feedback feedback-${evaluation.verdict}`} role="alert" data-testid="feedback">
              <strong>{evaluation.verdict === 'partial' ? 'Getting warm.' : 'Not quite.'}</strong> {evaluation.message}
              {(evaluation.hit.length > 0 || evaluation.missed.length > 0) && !evaluation.wrongFeedback && (
                <div className="idea-chips">
                  {evaluation.hit.map((h) => (
                    <span key={h.id} className="idea idea-hit">
                      <Icon name="check" size={12} /> {h.label}
                    </span>
                  ))}
                  {evaluation.verdict === 'partial' &&
                    evaluation.missed.map((h) => (
                      <span key={h.id} className="idea idea-miss">
                        missing: {h.label}
                      </span>
                    ))}
                </div>
              )}
              {tries >= MAX_TRIES_BEFORE_REVEAL && (
                <div className="feedback-more">
                  Stuck? That’s normal — <button type="button" className="link-btn" onClick={reveal}>reveal the answer</button> and this card will come back soon.
                </div>
              )}
            </div>
          )}
        </form>
      ) : (
        <div className="after">
          <div className="after-actions">
            {onNext && (
              <button ref={nextRef} className="btn btn-primary" onClick={onNext} data-testid="next-card">
                Next card <Kbd>↵</Kbd>
              </button>
            )}
            <button
              className={`btn btn-ghost${bookmarked ? ' is-on' : ''}`}
              onClick={() => p.dispatch({ type: 'bookmark', conceptId: concept.id })}
              aria-pressed={bookmarked}
            >
              <Icon name="bookmark" size={16} /> {bookmarked ? 'Saved' : 'Save for later'}
            </button>
            {challenge && linkTo && (
              <Link className="btn btn-ghost" to={`/build/${challenge.id}`}>
                <Icon name="code" size={16} /> Try it: Drop {String(challenge.number).padStart(2, '0')}
              </Link>
            )}
          </div>
          {related.length > 0 && (
            <div className="related">
              <span className="eyebrow">Connected cards</span>
              <div className="chip-row">
                {related.map((c) =>
                  linkTo ? (
                    <Link key={c.id} className="chip" to={`/card/${c.id}`}>
                      {splitTerm(c.term).title}
                    </Link>
                  ) : (
                    <span key={c.id} className="chip chip-static">
                      {splitTerm(c.term).title}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {position && (
        <nav className="study-nav" aria-label="Card navigation">
          <button className="icon-btn" onClick={onPrev} disabled={!onPrev} aria-label="Previous card">
            <Icon name="left" />
          </button>
          <span className="mono">
            {position.index + 1} / {position.total}
          </span>
          <button className="icon-btn" onClick={onNext} disabled={!onNext} aria-label="Next card">
            <Icon name="right" />
          </button>
        </nav>
      )}
    </article>
  );
}
