import { useMemo, useState } from 'react';
import { CONCEPTS, conceptsInTrack, RARITY, TRACKS } from '../content';
import type { TrackId } from '../content/types';
import { filterConcepts } from '../engine/deck';
import { statusOf, type CardStatus } from '../engine/srs';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { CardFace } from '../components/CardFace';
import { Icon } from '../components/Icon';
import { TrackCover } from '../components/TrackCover';
import { EmptyState, ProgressBar } from '../components/ui';

export function VaultPage() {
  const p = useProgress();
  const [q, setQ] = useState('');
  const [track, setTrack] = useState<TrackId | ''>('');
  const [rarity, setRarity] = useState<number | null>(null);
  const [status, setStatus] = useState<CardStatus | ''>('');
  const collected = CONCEPTS.filter((c) => p.learned(c.id)).length;
  const mastered = CONCEPTS.filter((c) => statusOf(p.state.reviews[c.id]) === 'mastered').length;

  const cards = useMemo(
    () =>
      filterConcepts(
        CONCEPTS,
        { query: q, trackIds: track ? [track] : undefined, difficulties: rarity ? [rarity] : undefined, statuses: status ? [status] : undefined },
        { reviews: p.state.reviews, bookmarks: p.state.bookmarks, missed: p.state.missed, isUnlocked: p.isUnlocked, now: Date.now() },
      ),
    [q, track, rarity, status, p],
  );

  return (
    <div className="page">
      <header className="vault-hero">
        <div>
          <div className="eyebrow">~/coded</div>
          <h1 className="h-display">Your repo</h1>
          <p className="lede">Every concept is a card. Answer it correctly to <strong>commit</strong> it to memory; keep passing spaced reviews to get it <strong>merged</strong>.</p>
        </div>
        <div className="vault-stats">
          <div>
            <span className="stat-n">{collected}</span>
            <span className="stat-l">/ {CONCEPTS.length} committed</span>
          </div>
          <div>
            <span className="stat-n">{mastered}</span>
            <span className="stat-l">merged</span>
          </div>
          <ProgressBar value={collected / CONCEPTS.length} label="Repo progress" />
        </div>
      </header>

      <section className="complexity-legend" aria-labelledby="bigo-h">
        <h2 id="bigo-h" className="h-mini">Complexity tiers · how engineers say “how hard”</h2>
        <ul>
          {RARITY.map((r) => (
            <li key={r.id} style={{ ['--rarity' as string]: r.color }}>
              <span className="bigo">{r.label}</span>
              <span className="bigo-name">{r.name}</span>
              <span className="bigo-blurb">{r.blurb}</span>
            </li>
          ))}
        </ul>
        <p className="muted bigo-note">
          Big-O notation describes how much work grows as a problem gets bigger. Status follows Git: <strong>Untracked</strong> → <strong>Committed</strong> (answered right) → <strong>In review</strong> → <strong>Merged</strong> (mastered through spaced reviews).
        </p>
      </section>

      <section aria-labelledby="sets-h">
        <h2 id="sets-h" className="h-section">Modules</h2>
        <div className="shelf">
          {TRACKS.map((t) => {
            const all = conceptsInTrack(t.id);
            const got = all.filter((c) => p.learned(c.id)).length;
            const locked = t.unlockLevel > p.level;
            return (
              <Link key={t.id} to={`/module/${t.id}`} className="shelf-item">
                <div className="shelf-cover">
                  <TrackCover track={t} size={168} />
                  {locked && (
                    <span className="shelf-lock">
                      <Icon name="lock" size={14} /> Lv {t.unlockLevel}
                    </span>
                  )}
                </div>
                <div className="shelf-title">{t.name}</div>
                <div className="shelf-sub">
                  {got}/{all.length} committed
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="cards-h">
        <div className="vault-bar">
          <h2 id="cards-h" className="h-section">
            All cards <span className="muted">· {cards.length}</span>
          </h2>
          <div className="filters filters-tight">
            <label className="search">
              <Icon name="search" size={16} />
              <span className="sr-only">Search the repo</span>
              <input type="search" placeholder="grep 170 cards…" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <select aria-label="Module" value={track} onChange={(e) => setTrack(e.target.value as TrackId | '')}>
              <option value="">All modules</option>
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <select aria-label="Complexity" value={rarity ?? ''} onChange={(e) => setRarity(e.target.value ? Number(e.target.value) : null)}>
              <option value="">Any complexity</option>
              {RARITY.map((r, i) => (
                <option key={r.id} value={i + 1}>
                  {r.label} · {r.name.toLowerCase()}
                </option>
              ))}
            </select>
            <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as CardStatus | '')}>
              <option value="">Any status</option>
              <option value="new">Untracked</option>
              <option value="learning">Committed</option>
              <option value="reviewing">In review</option>
              <option value="mastered">Merged</option>
            </select>
          </div>
        </div>
        {cards.length === 0 ? (
          <EmptyState icon="search" title="No cards match" body="Try a different search or clear a filter." />
        ) : (
          <div className="card-grid">
            {cards.map((c) => (
              <Link key={c.id} to={`/card/${c.id}`} className="card-grid-item" aria-label={`${c.term}`}>
                <CardFace concept={c} status={statusOf(p.state.reviews[c.id])} locked={!p.isUnlocked(c.id)} compact />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
