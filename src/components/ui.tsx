import { useEffect, useRef, type ReactNode } from 'react';
import { rarityOf, tierDescription } from '../content';
import type { CardStatus } from '../engine/srs';
import { Icon } from './Icon';

export function ProgressBar({ value, label, tone = 'accent', thin }: { value: number; label?: string; tone?: 'accent' | 'success' | 'mono'; thin?: boolean }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div
      className={`progress progress-${tone}${thin ? ' progress-thin' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
    >
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function LevelBadge({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`level-badge level-badge-${size}`} aria-label={`Level ${level}`}>
      <span className="level-badge-lv">LV</span>
      <span className="level-badge-n">{level}</span>
    </span>
  );
}

export function RarityTag({ difficulty }: { difficulty: number }) {
  const r = rarityOf(difficulty);
  return (
    <span className="rarity-tag" style={{ ['--rarity' as string]: r.color }} title={tierDescription(r)}>
      <span className="rarity-dot" />
      {r.label}
    </span>
  );
}

export function DifficultyPips({ difficulty }: { difficulty: number }) {
  return (
    <span className="pips" aria-label={`Difficulty ${difficulty} of 5`} title={`Difficulty ${difficulty}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= difficulty ? 'pip on' : 'pip'} />
      ))}
    </span>
  );
}

const STATUS_LABEL: Record<CardStatus, string> = {
  new: 'Untracked',
  learning: 'Committed',
  reviewing: 'In review',
  mastered: 'Merged',
};

export function StatusTag({ status }: { status: CardStatus }) {
  return <span className={`status-tag status-${status}`}>{STATUS_LABEL[status]}</span>;
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="kbd">{children}</kbd>;
}

export function Modal({
  title, children, onClose, labelledBy, className,
}: { title?: string; children: ReactNode; onClose: () => void; labelledBy?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('button, [href], input, textarea, select');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const els = Array.from(ref.current.querySelectorAll<HTMLElement>('button, [href], input, textarea, select')).filter((x) => !x.hasAttribute('disabled'));
        if (els.length === 0) return;
        const a = els[0];
        const z = els[els.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${className ?? ''}`} role="dialog" aria-modal="true" aria-label={labelledBy ? undefined : title} aria-labelledby={labelledBy} ref={ref}>
        {title && (
          <div className="modal-head">
            <h2>{title}</h2>
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <Icon name="x" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function EmptyState({ icon = 'sparkle', title, body, action }: { icon?: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <Icon name={icon} size={26} />
      </div>
      <h3>{title}</h3>
      {body && <p>{body}</p>}
      {action}
    </div>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
