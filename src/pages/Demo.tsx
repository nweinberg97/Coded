import { useMemo, useState, type ReactNode } from 'react';
import { CONCEPT_BY_ID, CONCEPTS, conceptsInTrack, splitTerm, TRACKS } from '../content';
import type { TrackId } from '../content/types';
import { CHALLENGE_BY_ID } from '../content/challenges';
import { filterConcepts, shuffleDeck } from '../engine/deck';
import { LEVELS, requirementStatus, xpProgress, type LevelDef } from '../engine/levels';
import { XP_RULES } from '../engine/progress';
import { statusOf } from '../engine/srs';
import { Link, navigate } from '../app/router';
import { ProgressProvider, useProgress } from '../app/store';
import { Workspace } from '../build/Workspace';
import { CardFace } from '../components/CardFace';
import { Icon } from '../components/Icon';
import { StudyCard } from '../components/StudyCard';
import { TrackCover } from '../components/TrackCover';
import { LevelBadge, ProgressBar } from '../components/ui';

// The demo runs the REAL engine, evaluator, components and sandbox — just
// against a separate in-memory profile with a compressed level table, so you
// can experience unlocking without touching your real progress.
export const DEMO_LEVELS: LevelDef[] = [
  { level: 1, name: 'Demo Rookie', blurb: 'Fresh demo profile.', xp: 0, concepts: [], challenges: [], unlocks: [] },
  {
    level: 2,
    name: 'Demo Explorer',
    blurb: 'You recalled your first cards and earned enough XP.',
    xp: 40,
    concepts: ['api', 'json'],
    challenges: [],
    unlocks: ['The “Webhook” card (Section 4)', 'Full XP on Drop 03 in the demo'],
  },
  {
    level: 3,
    name: 'Demo Builder',
    blurb: 'You wrote, ran and shipped real code.',
    xp: 90,
    concepts: [],
    challenges: ['button-counter'],
    unlocks: ['Everything in the real app — your journey starts at Level 1'],
  },
];

const DEMO_LOCKED: Record<string, number> = { webhook: 2 };
const demoConceptLevel = (id: string) => DEMO_LOCKED[id] ?? 1;
const demoChallengeLevel = () => 1;

export function DemoPage() {
  return (
    <ProgressProvider levels={DEMO_LEVELS} conceptUnlockLevel={demoConceptLevel} challengeUnlockLevel={demoChallengeLevel} isDemo>
      <DemoTour />
    </ProgressProvider>
  );
}

const SECTIONS = [
  'Learn a concept',
  'Shuffle the deck',
  'Earn XP',
  'Unlock a level',
  'Write code',
  'Understand the code',
  'Ship a challenge',
  'Explore the curriculum',
];

function DemoTour() {
  const d = useProgress();
  const [shuffled, setShuffled] = useState(false);
  const [explored, setExplored] = useState(false);
  const ch = CHALLENGE_BY_ID['button-counter'];
  const edited = (d.state.code[ch.id] ?? ch.starter) !== ch.starter;
  const shipped = !!d.state.shipped[ch.id];
  const done = [
    !!d.state.reviews['api'],
    shuffled,
    ['json', 'http', 'client'].some((id) => d.learned(id)),
    d.level >= 2,
    edited,
    shipped || (d.state.attempts[ch.id]?.runs ?? 0) > 0,
    shipped,
    explored,
  ];
  const count = done.filter(Boolean).length;

  return (
    <div className="page demo">
      <header className="demo-hero">
        <div className="eyebrow">Interactive demo</div>
        <h1 className="h-hero h-hero-sm">Coded in eight moves.</h1>
        <p className="lede">
          Everything here is the real product — the same cards, answer checker, XP engine and code sandbox. It runs on a separate <strong>demo profile</strong>, so nothing touches your real progress.
        </p>
      </header>

      <div className="demo-layout">
        <aside className="demo-rail" aria-label="Demo progress">
          <DemoHud />
          <ol className="demo-steps">
            {SECTIONS.map((s, i) => (
              <li key={s} className={done[i] ? 'is-done' : ''}>
                <a href={`#demo-${i + 1}`} onClick={(e) => { e.preventDefault(); document.getElementById(`demo-${i + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                  <span className="demo-step-n">{done[i] ? <Icon name="check" size={12} /> : i + 1}</span>
                  {s}
                </a>
              </li>
            ))}
          </ol>
          <div className="demo-rail-foot mono">{count}/8 COMPLETE</div>
        </aside>

        <div className="demo-sections">
          <DemoSection n={1} title="Learn a concept" lead="Every card asks a real question. Type an answer in your own words — the checker looks for the ideas, not exact wording. Try: “it lets two apps talk to each other”.">
            <StudyCard concept={CONCEPT_BY_ID['api']} sessionId="demo" autoFocus={false} linkTo={false} />
          </DemoSection>

          <DemoSection n={2} title="Shuffle the deck" lead="170 cards across 8 modules. Filter by module and shuffle — real randomization that avoids repeats.">
            <ShuffleDemo onShuffle={() => setShuffled(true)} />
          </DemoSection>

          <DemoSection n={3} title="Earn XP" lead={`A first-try answer earns +${XP_RULES.firstTry} XP. Using the hint or a second try still counts, for +${XP_RULES.assisted}. Repeating a card you already know earns nothing until it’s due for review — so XP always means learning.`}>
            <PracticeDeck ids={['json', 'http', 'client']} />
          </DemoSection>

          <DemoSection n={4} title="Unlock a level" lead="Levels need XP and proof. In the demo, Level 2 needs 40 XP plus the API and JSON cards. The Webhook card below is locked until then — watch it open.">
            <UnlockDemo />
          </DemoSection>

          <DemoSection n={5} title="Write code" lead="This is a real editor and a real browser sandbox. The button doesn’t count yet — inside the click handler, add the two lines below, then press Run and click the button.">
            <pre className="demo-snippet">{`count = count + 1;\nbutton.textContent = \`Clicked \${count} times\`;`}</pre>
            <p className="demo-sub">
              <Icon name="info" size={14} /> Sections 6 and 7 use this same workspace: open <strong>Under the hood</strong> in the Result panel, then press <strong>Ship it</strong>.
            </p>
            <Workspace challenge={ch} embedded />
          </DemoSection>

          <DemoSection n={6} title="Understand the code" lead="“Under the hood” is built from what actually happened: your diff, every event the browser fired, every DOM change, and the lines of your code that caused them. Change let count = 0 to 10 and run it — the explanation changes too.">
            <ul className="demo-bullets">
              <li><strong>What did I change?</strong> A line-by-line diff against the starter.</li>
              <li><strong>What happened?</strong> A step-through of recorded events: listener → click → handler → DOM text change.</li>
              <li><strong>Which code caused it?</strong> Each pattern found in your code, with its line number.</li>
            </ul>
          </DemoSection>

          <DemoSection n={7} title="Ship a challenge" lead="Ship runs your code in a fresh hidden sandbox and an automated checker clicks the button three times and reads the label. XP is awarded only if every check passes.">
            <div className={`demo-ship ${shipped ? 'is-done' : ''}`}>
              {shipped ? (
                <>
                  <Icon name="check" size={18} /> Shipped on the demo profile — +{ch.xp} demo XP. That’s the whole loop: learn, recall, unlock, build, understand, ship.
                </>
              ) : (
                <>
                  <Icon name="rocket" size={18} /> Scroll up to the workspace and press <strong>Ship it</strong> once your button counts.
                </>
              )}
            </div>
          </DemoSection>

          <DemoSection n={8} title="Explore the curriculum" lead="Browse the real library: eight modules, seven releases, eight drops.">
            <CurriculumDemo onExplore={() => setExplored(true)} />
          </DemoSection>

          <section className="demo-finish">
            <h2 className="h-display">Your turn.</h2>
            <p className="lede">Your real profile starts at Level 1 with zero XP. Everything you just did works the same way there — and it’s saved in this browser.</p>
            <div className="hero-ctas">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/learn')} data-testid="demo-start">
                <Icon name="play" size={18} /> Start learning for real
              </button>
              <Link to="/" className="btn btn-secondary btn-lg">Go to Home</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DemoSection({ n, title, lead, children }: { n: number; title: string; lead: string; children: ReactNode }) {
  return (
    <section className="demo-section" id={`demo-${n}`} aria-labelledby={`demo-h-${n}`}>
      <div className="demo-section-head">
        <span className="demo-num mono">{String(n).padStart(2, '0')}</span>
        <div>
          <h2 id={`demo-h-${n}`}>{title}</h2>
          <p>{lead}</p>
        </div>
      </div>
      <div className="demo-section-body">{children}</div>
    </section>
  );
}

function DemoHud() {
  const d = useProgress();
  return (
    <div className="demo-hud" data-testid="demo-hud">
      <div className="demo-hud-label mono">DEMO PROFILE</div>
      <div className="demo-hud-row">
        <LevelBadge level={d.level} size="sm" />
        <div>
          <div className="demo-hud-name">{d.current.name}</div>
          <div className="mono demo-hud-xp" data-testid="demo-xp">{d.xp} XP</div>
        </div>
      </div>
      <ProgressBar value={xpProgress(d.xp, d.level, DEMO_LEVELS)} label="Demo XP progress" thin />
    </div>
  );
}

function ShuffleDemo({ onShuffle }: { onShuffle: () => void }) {
  const d = useProgress();
  const [track, setTrack] = useState<TrackId | ''>('');
  const [seed, setSeed] = useState(0);
  const [i, setI] = useState(0);
  const deck = useMemo(() => {
    const cards = filterConcepts(CONCEPTS, { trackIds: track ? [track] : undefined }, { reviews: {}, bookmarks: [], missed: [], isUnlocked: () => true, now: 0 });
    return seed === 0 ? cards : shuffleDeck(cards, []);
  }, [track, seed]);
  const card = deck[Math.min(i, deck.length - 1)];
  return (
    <div className="shuffle-demo">
      <div className="chip-row" role="group" aria-label="Filter by module">
        <button className={`chip${track === '' ? ' chip-on' : ''}`} onClick={() => { setTrack(''); setI(0); }}>All modules</button>
        {TRACKS.map((t) => (
          <button key={t.id} className={`chip${track === t.id ? ' chip-on' : ''}`} onClick={() => { setTrack(t.id); setI(0); }}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="shuffle-stage">
        {card && (
          <div className="shuffle-card" key={card.id + seed} data-testid="shuffle-card">
            <CardFace concept={card} status={statusOf(d.state.reviews[card.id])} showQuestion />
          </div>
        )}
        <div className="shuffle-ctrl">
          <button className="btn btn-primary" onClick={() => { setSeed((s) => s + 1); setI(0); onShuffle(); }} data-testid="demo-shuffle">
            <Icon name="shuffle" size={16} /> Shuffle
          </button>
          <div className="shuffle-nav">
            <button className="icon-btn" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0} aria-label="Previous card"><Icon name="left" /></button>
            <span className="mono">{Math.min(i, deck.length - 1) + 1} / {deck.length}</span>
            <button className="icon-btn" onClick={() => setI((x) => Math.min(deck.length - 1, x + 1))} disabled={i >= deck.length - 1} aria-label="Next card"><Icon name="right" /></button>
          </div>
          <p className="muted">{seed === 0 ? 'In curriculum order. Press Shuffle to randomize this filtered deck.' : `Shuffled ${seed}×. Same filter, new order.`}</p>
        </div>
      </div>
    </div>
  );
}

function PracticeDeck({ ids }: { ids: string[] }) {
  const d = useProgress();
  const [i, setI] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const c = CONCEPT_BY_ID[ids[i]];
  return (
    <div className="practice">
      <div className="practice-head">
        <span className="mono">CARD {i + 1}/{ids.length}</span>
        <span className="practice-xp mono">DEMO XP · {d.xp}</span>
      </div>
      <StudyCard
        key={c.id}
        concept={c}
        sessionId="demo"
        autoFocus={false}
        linkTo={false}
        compact
        onNext={i < ids.length - 1 ? () => setI(i + 1) : undefined}
        onResult={(o, xp) => setLog((l) => [...l, `${splitTerm(c.term).title}: ${o === 'correct' ? 'first try' : o === 'assisted' ? 'with help' : 'revealed'} → +${xp} XP`])}
      />
      {log.length > 0 && (
        <ul className="practice-log">
          {log.map((l, k) => <li key={k} className="mono">{l}</li>)}
        </ul>
      )}
    </div>
  );
}

function UnlockDemo() {
  const d = useProgress();
  const def = DEMO_LEVELS[1];
  const st = requirementStatus(def, { xp: d.xp, learned: d.learned, shipped: (id) => !!d.state.shipped[id] });
  const unlocked = d.isUnlocked('webhook');
  return (
    <div className="unlock-demo">
      <div className={`unlock-req ${st.met ? 'is-met' : ''}`} data-testid="unlock-req">
        <div className="eyebrow">Demo Level 2 requirements</div>
        <ul className="req-list">
          <li className={st.xpMet ? 'ok' : ''}><span className="check-dot">{st.xpMet && <Icon name="check" size={12} />}</span> {def.xp} XP <span className="muted">({d.xp}/{def.xp})</span></li>
          {def.concepts.map((id) => (
            <li key={id} className={d.learned(id) ? 'ok' : ''}>
              <span className="check-dot">{d.learned(id) && <Icon name="check" size={12} />}</span> Recall “{splitTerm(CONCEPT_BY_ID[id].term).title}”
              {!d.learned(id) && <a href={id === 'api' ? '#demo-1' : '#demo-3'} className="req-jump" onClick={(e) => { e.preventDefault(); document.getElementById(id === 'api' ? 'demo-1' : 'demo-3')?.scrollIntoView({ behavior: 'smooth' }); }}>go →</a>}
            </li>
          ))}
        </ul>
        <div className={`unlock-status ${unlocked ? 'ok' : ''}`} data-testid="unlock-status">
          {unlocked ? <><Icon name="sparkle" size={16} /> Unlocked — the card below is now live and earns XP.</> : <><Icon name="lock" size={16} /> Webhook is locked (preview only).</>}
        </div>
      </div>
      <StudyCard key={`webhook-${unlocked}`} concept={CONCEPT_BY_ID['webhook']} sessionId="demo" autoFocus={false} linkTo={false} compact />
    </div>
  );
}

function CurriculumDemo({ onExplore }: { onExplore: () => void }) {
  const [q, setQ] = useState('');
  const results = q.trim() ? filterConcepts(CONCEPTS, { query: q }, { reviews: {}, bookmarks: [], missed: [], isUnlocked: () => true, now: 0 }).slice(0, 6) : [];
  return (
    <div className="curriculum">
      <div className="curriculum-sets">
        {TRACKS.map((t) => (
          <div key={t.id} className="curriculum-set">
            <TrackCover track={t} size={64} showTitle={false} />
            <div>
              <strong>{t.name}</strong>
              <span className="muted">{conceptsInTrack(t.id).length} cards · Lv {t.unlockLevel}</span>
            </div>
          </div>
        ))}
      </div>
      <label className="search search-lg">
        <Icon name="search" size={18} />
        <span className="sr-only">Search the library</span>
        <input type="search" placeholder="Search the real library — try “cache”, “token” or “git”" value={q} onChange={(e) => { setQ(e.target.value); onExplore(); }} data-testid="demo-search" />
      </label>
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((c) => (
            <li key={c.id}>
              <strong>{c.term}</strong>
              <span>{c.definition}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mini-ladder">
        {LEVELS.map((l) => (
          <div key={l.level} className="mini-rung">
            <LevelBadge level={l.level} size="sm" />
            <span>{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
