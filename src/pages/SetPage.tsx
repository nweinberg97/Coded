import { conceptsInTrack, rarityOf, splitTerm, TRACK_BY_ID } from '../content';
import type { TrackId } from '../content/types';
import { describeDue, statusOf } from '../engine/srs';
import { Link, navigate } from '../app/router';
import { useProgress } from '../app/store';
import { Icon } from '../components/Icon';
import { TrackCover } from '../components/TrackCover';
import { EmptyState, StatusTag } from '../components/ui';
import { XP_RULES } from '../engine/progress';

export function SetPage({ id }: { id: string }) {
  const p = useProgress();
  const track = TRACK_BY_ID[id as TrackId];
  if (!track) return <div className="page"><EmptyState title="Set not found" action={<Link className="btn btn-primary" to="/vault">Back to the Vault</Link>} /></div>;
  const cards = conceptsInTrack(track.id);
  const got = cards.filter((c) => p.learned(c.id)).length;
  const locked = track.unlockLevel > p.level;
  const now = Date.now();
  return (
    <div className="page set-page" style={{ ['--set-a' as string]: track.cover[0], ['--set-b' as string]: track.cover[1] }}>
      <header className="set-hero">
        <div className="set-hero-bg" aria-hidden />
        <TrackCover track={track} size={220} />
        <div className="set-hero-text">
          <div className="eyebrow">Set · {cards.length} cards</div>
          <h1 className="h-display h-set">{track.name}</h1>
          <p className="lede">{track.description}</p>
          <div className="set-meta">
            <span>{got}/{cards.length} collected</span>
            <span>·</span>
            <span>{locked ? `🔒 XP unlocks at Level ${track.unlockLevel}` : 'Unlocked'}</span>
            <span>·</span>
            <span>+{XP_RULES.trackComplete} XP for completing the set</span>
          </div>
        </div>
      </header>
      <div className="set-actions">
        <button className="play-btn" onClick={() => navigate(`/learn?track=${track.id}`)} aria-label={`Study ${track.name}`} data-testid="play-set">
          <Icon name="play" size={26} />
        </button>
        <button className="btn btn-ghost" onClick={() => navigate(`/learn?track=${track.id}&mode=shuffle`)}>
          <Icon name="shuffle" size={16} /> Shuffle set
        </button>
      </div>
      <ol className="tracklist">
        <li className="tracklist-head" aria-hidden>
          <span>#</span>
          <span>Card</span>
          <span className="hide-sm">Rarity</span>
          <span className="hide-sm">Status</span>
          <span className="hide-sm">Review</span>
        </li>
        {cards.map((c, i) => {
          const r = p.state.reviews[c.id];
          const { title, subtitle } = splitTerm(c.term);
          const rar = rarityOf(c.difficulty);
          return (
            <li key={c.id}>
              <Link to={`/card/${c.id}`} className="tracklist-row">
                <span className="tl-n mono">{p.learned(c.id) ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="tl-title">
                  <strong>{title}</strong>
                  <span>{subtitle ?? c.definition.slice(0, 70) + (c.definition.length > 70 ? '…' : '')}</span>
                </span>
                <span className="tl-rarity hide-sm" style={{ color: rar.color }}>{rar.label}</span>
                <span className="hide-sm"><StatusTag status={statusOf(r)} /></span>
                <span className="tl-due hide-sm mono">{describeDue(r, now)}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
