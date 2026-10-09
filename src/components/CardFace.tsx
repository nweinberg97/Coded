import { CONCEPTS, hexId, rarityOf, serialOf, splitTerm, tierDescription, TRACK_BY_ID } from '../content';
import type { Concept } from '../content/types';
import type { CardStatus } from '../engine/srs';
import { Icon } from './Icon';
import { DifficultyPips } from './ui';

// A concept rendered as a numbered card with a Big-O complexity tier.
export function CardFace({
  concept, status, locked, compact, showQuestion,
}: { concept: Concept; status?: CardStatus; locked?: boolean; compact?: boolean; showQuestion?: boolean }) {
  const rarity = rarityOf(concept.difficulty);
  const track = TRACK_BY_ID[concept.trackId];
  const { title, subtitle } = splitTerm(concept.term);
  const collected = status && status !== 'new';
  return (
    <div
      className={[
        'cardface',
        `rarity-${rarity.id}`,
        compact ? 'cardface-compact' : '',
        locked ? 'is-locked' : '',
        status === 'new' || !status ? '' : 'is-collected',
        status === 'mastered' ? 'is-mastered' : '',
      ].join(' ')}
      style={{ ['--rarity' as string]: rarity.color, ['--set-a' as string]: track.cover[0], ['--set-b' as string]: track.cover[1] }}
    >
      <div className="cardface-sheen" aria-hidden />
      <div className="cardface-top">
        <span className="cardface-set">{track.name}</span>
        <span className="cardface-serial mono">
          {hexId(serialOf(concept.id))}/{hexId(CONCEPTS.length)}
        </span>
      </div>
      <div className="cardface-body">
        <div className="cardface-title" data-len={title.length > 14 ? 'long' : title.length > 9 ? 'mid' : 'short'}>
          {title}
        </div>
        {subtitle && <div className="cardface-subtitle">{subtitle}</div>}
        {showQuestion && <p className="cardface-question">{concept.question}</p>}
      </div>
      <div className="cardface-bottom">
        <span className="cardface-rarity" title={tierDescription(rarity)}>
          {rarity.label}
          <span className="tier-side">{rarity.name}</span>
        </span>
        <DifficultyPips difficulty={concept.difficulty} />
      </div>
      {locked && (
        <div className="cardface-lock" aria-label="Locked">
          <Icon name="lock" size={compact ? 16 : 20} />
        </div>
      )}
      {collected && !locked && (
        <div className="cardface-stamp" aria-label={status === 'mastered' ? 'Merged' : 'Committed'}>
          {status === 'mastered' ? '★' : <Icon name="check" size={14} />}
        </div>
      )}
    </div>
  );
}
