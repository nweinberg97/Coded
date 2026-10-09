import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CONCEPT_BY_ID, CONCEPTS, TRACKS } from '../content';
import type { TrackId } from '../content/types';
import { continueOrder, filterConcepts, shuffleDeck, type DeckFilters } from '../engine/deck';
import { SESSION_GOAL, SESSION_MIN_CORRECT, XP_RULES } from '../engine/progress';
import { isDue, type CardStatus } from '../engine/srs';
import { navigate, type Route } from '../app/router';
import { useProgress } from '../app/store';
import { StudyCard } from '../components/StudyCard';
import { Icon } from '../components/Icon';
import { EmptyState, Kbd, Modal, ProgressBar } from '../components/ui';

type Mode = 'foryou' | 'shuffle' | 'due' | 'missed' | 'saved';
const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: 'foryou', label: 'For you', icon: 'sparkle' },
  { id: 'shuffle', label: 'Shuffle', icon: 'shuffle' },
  { id: 'due', label: 'Due', icon: 'reset' },
  { id: 'missed', label: 'Missed', icon: 'x' },
  { id: 'saved', label: 'Saved', icon: 'bookmark' },
];

function newSessionId() {
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function LearnPage({ route }: { route: Route }) {
  const p = useProgress();
  const q = route.query;
  const mode = (MODES.find((m) => m.id === q.get('mode'))?.id ?? 'foryou') as Mode;
  const track = (TRACKS.find((t) => t.id === q.get('track'))?.id ?? '') as TrackId | '';
  const startCard = q.get('card') ?? '';
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [status, setStatus] = useState<CardStatus | ''>('');
  const [search, setSearch] = useState('');
  const [includeLocked, setIncludeLocked] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [deck, setDeck] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionId] = useState(newSessionId);
  const served = useRef<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(p);
  stateRef.current = p;

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(q);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete('card');
      const s = next.toString();
      navigate(`/learn${s ? `?${s}` : ''}`, { replace: true });
    },
    [q],
  );

  // Build the deck when filters change (not on every answer — the deck stays stable while you study).
  useEffect(() => {
    const api = stateRef.current;
    const now = Date.now();
    const ctx = { reviews: api.state.reviews, bookmarks: api.state.bookmarks, missed: api.state.missed, isUnlocked: api.isUnlocked, now };
    const f: DeckFilters = {
      query: search,
      trackIds: track ? [track] : undefined,
      difficulties: difficulty ? [difficulty] : undefined,
      statuses: status ? [status] : undefined,
      dueOnly: mode === 'due',
      missedOnly: mode === 'missed',
      bookmarkedOnly: mode === 'saved',
      // A specifically chosen set is always browsable (locked cards become previews).
      unlockedOnly: !track && !includeLocked && !search,
    };
    let cards = filterConcepts(CONCEPTS, f, ctx);
    if (mode === 'shuffle') {
      cards = shuffleDeck(cards, served.current.slice(-12), Math.random, deck[index]);
    } else if (mode === 'foryou') {
      cards = continueOrder(cards, ctx);
    }
    let ids = cards.map((c) => c.id);
    if (startCard && CONCEPT_BY_ID[startCard]) ids = [startCard, ...ids.filter((id) => id !== startCard)];
    setDeck(ids);
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, track, difficulty, status, search, includeLocked, nonce, startCard]);

  const currentId = deck[index];
  const concept = currentId ? CONCEPT_BY_ID[currentId] : undefined;

  useEffect(() => {
    if (currentId) served.current = [...served.current.filter((x) => x !== currentId), currentId].slice(-40);
  }, [currentId]);

  const next = useCallback(() => setIndex((i) => Math.min(deck.length - 1, i + 1)), [deck.length]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const reshuffle = useCallback(() => {
    if (mode !== 'shuffle') setParam('mode', 'shuffle');
    else setNonce((n) => n + 1);
  }, [mode, setParam]);

  // Keyboard shortcuts (ignored while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('.modal-backdrop') && e.key !== '?') return;
      switch (e.key) {
        case 'ArrowRight':
        case 'j':
          if (index < deck.length - 1) next();
          break;
        case 'ArrowLeft':
        case 'k':
          prev();
          break;
        case 's':
          reshuffle();
          break;
        case 'b':
          if (currentId) p.dispatch({ type: 'bookmark', conceptId: currentId });
          break;
        case 'h':
          document.querySelector<HTMLButtonElement>('[data-testid="hint"]')?.click();
          break;
        case '/':
          e.preventDefault();
          searchRef.current?.focus();
          break;
        case '?':
          setShowHelp((s) => !s);
          break;
        default:
          return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, reshuffle, currentId, index, deck.length, p]);

  const session = p.state.sessions.find((s) => s.id === sessionId);
  const sessionCount = session?.cards.length ?? 0;
  const dueCount = useMemo(
    () => CONCEPTS.filter((c) => p.isUnlocked(c.id) && isDue(p.state.reviews[c.id], Date.now())).length,
    [p],
  );

  return (
    <div className="page learn-page">
      <div className="learn-head">
        <div>
          <div className="eyebrow">Learn</div>
          <h1 className="h-display">Flashcards</h1>
        </div>
        <div className="session-meter" aria-label="Session progress">
          <div className="session-meter-top">
            <span>
              Session <strong>{Math.min(sessionCount, SESSION_GOAL)}</strong>/{SESSION_GOAL}
            </span>
            <span className={session?.bonus ? 'bonus-done' : 'bonus-todo'}>
              {session?.bonus ? `✓ +${XP_RULES.sessionBonus} XP bonus earned` : `+${XP_RULES.sessionBonus} XP at ${SESSION_GOAL} cards (${SESSION_MIN_CORRECT}+ right)`}
            </span>
          </div>
          <ProgressBar value={sessionCount / SESSION_GOAL} label="Session progress" tone={session?.bonus ? 'success' : 'accent'} thin />
        </div>
      </div>

      <div className="mode-tabs" role="tablist" aria-label="Study mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            className={`mode-tab${mode === m.id ? ' is-active' : ''}`}
            onClick={() => (m.id === 'shuffle' && mode === 'shuffle' ? setNonce((n) => n + 1) : setParam('mode', m.id === 'foryou' ? '' : m.id))}
          >
            <Icon name={m.icon} size={16} />
            {m.label}
            {m.id === 'due' && dueCount > 0 && <span className="count-badge">{dueCount}</span>}
            {m.id === 'missed' && p.state.missed.length > 0 && <span className="count-badge">{p.state.missed.length}</span>}
          </button>
        ))}
      </div>

      <div className="filters">
        <label className="search">
          <Icon name="search" size={16} />
          <span className="sr-only">Search cards</span>
          <input ref={searchRef} type="search" placeholder="Search cards…  /" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <select aria-label="Filter by set" value={track} onChange={(e) => setParam('track', e.target.value)}>
          <option value="">All sets</option>
          {TRACKS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
              {!p.isUnlocked(CONCEPTS.find((c) => c.trackId === t.id)!.id) ? ` · 🔒 Lv ${t.unlockLevel}` : ''}
            </option>
          ))}
        </select>
        <select aria-label="Filter by difficulty" value={difficulty ?? ''} onChange={(e) => setDifficulty(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Any rarity</option>
          <option value="1">Common · 1</option>
          <option value="2">Uncommon · 2</option>
          <option value="3">Rare · 3</option>
          <option value="4">Legendary · 4</option>
          <option value="5">Ultimate · 5</option>
        </select>
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value as CardStatus | '')}>
          <option value="">Any status</option>
          <option value="new">New</option>
          <option value="learning">Learning</option>
          <option value="reviewing">Reviewing</option>
          <option value="mastered">Mastered</option>
        </select>
        <label className="toggle">
          <input type="checkbox" checked={includeLocked} onChange={(e) => setIncludeLocked(e.target.checked)} />
          <span>Include locked previews</span>
        </label>
        <button className="btn btn-ghost btn-sm" onClick={reshuffle} title="Shuffle (S)" data-testid="shuffle">
          <Icon name="shuffle" size={16} /> Shuffle
        </button>
        <button className="icon-btn" onClick={() => setShowHelp(true)} aria-label="Keyboard shortcuts">
          <Icon name="keyboard" />
        </button>
      </div>

      <div className="learn-stage">
        {concept ? (
          <StudyCard
            key={`${concept.id}-${nonce}-${deck.length}`}
            concept={concept}
            sessionId={sessionId}
            onNext={index < deck.length - 1 ? next : undefined}
            onPrev={index > 0 ? prev : undefined}
            position={{ index, total: deck.length }}
          />
        ) : (
          <EmptyState
            icon={mode === 'due' ? 'check' : 'search'}
            title={mode === 'due' ? 'Nothing due right now' : mode === 'missed' ? 'No missed cards' : mode === 'saved' ? 'No saved cards yet' : 'No cards match'}
            body={
              mode === 'due'
                ? 'Spaced repetition brings cards back right before you’d forget them. Learn something new meanwhile.'
                : mode === 'saved'
                  ? 'Use “Save for later” on any card to build your own stack.'
                  : 'Try clearing a filter.'
            }
            action={
              <button className="btn btn-primary" onClick={() => setParam('mode', '')}>
                Learn new cards
              </button>
            }
          />
        )}
        {concept && index === deck.length - 1 && (
          <p className="deck-end">
            Last card in this stack. <button className="link-btn" onClick={reshuffle}>Shuffle again</button>
          </p>
        )}
      </div>

      {showHelp && (
        <Modal title="Keyboard shortcuts" onClose={() => setShowHelp(false)}>
          <ul className="shortcuts">
            <li><Kbd>↵</Kbd> Check answer / next card</li>
            <li><Kbd>Shift</Kbd>+<Kbd>↵</Kbd> New line in your answer</li>
            <li><Kbd>→</Kbd> / <Kbd>←</Kbd> Next / previous card</li>
            <li><Kbd>S</Kbd> Shuffle</li>
            <li><Kbd>H</Kbd> Hint</li>
            <li><Kbd>B</Kbd> Save for later</li>
            <li><Kbd>/</Kbd> Search</li>
            <li><Kbd>?</Kbd> This help</li>
          </ul>
        </Modal>
      )}
    </div>
  );
}
