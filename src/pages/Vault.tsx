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
          <div className="eyebrow">The Vault</div>
          <h1 className="h-display">Your collection</h1>
          <p className="lede">Every concept is a card. Answer it correctly to collect it; keep reviewing to master it.</p>
        </div>
        <div className="vault-stats">
          <div>
            <span className="stat-n">{collected}</span>
            <span className="stat-l">/ {CONCEPTS.length} collected</span>
          </div>
          <div>
            <span className="stat-n">{mastered}</span>
            <span className="stat-l">mastered</span>
          </div>
          <ProgressBar value={collected / CONCEPTS.length} label="Collection progress" />
        </div>
      </header>

      <section aria-labelledby="sets-h">
        <h2 id="sets-h" className="h-section">Sets</h2>
        <div className="shelf">
          {TRACKS.map((t) => {
            const all = conceptsInTrack(t.id);
            const got = all.filter((c) => p.learned(c.id)).length;
            const locked = t.unlockLevel > p.level;
            return (
              <Link key={t.id} to={`/set/${t.id}`} className="shelf-item">
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
                  {got}/{all.length} collected
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
              <span className="sr-only">Search the vault</span>
              <input type="search" placeholder="Search 170 cards…" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <select aria-label="Set" value={track} onChange={(e) => setTrack(e.target.value as TrackId | '')}>
              <option value="">All sets</option>
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <select aria-label="Rarity" value={rarity ?? ''} onChange={(e) => setRarity(e.target.value ? Number(e.target.value) : null)}>
              <option value="">Any rarity</option>
              {RARITY.map((r, i) => (
                <option key={r.id} value={i + 1}>
                  {r.label}
                </option>
              ))}
            </select>
            <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as CardStatus | '')}>
              <option value="">Any status</option>
              <option value="new">Not collected</option>
              <option value="learning">Learning</option>
              <option value="reviewing">Reviewing</option>
              <option value="mastered">Mastered</option>
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
