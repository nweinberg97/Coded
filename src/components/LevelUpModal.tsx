import type { LevelDef } from '../engine/levels';
import { Icon } from './Icon';
import { Modal } from './ui';

// The level-up "release" — only ever shown when the engine's computed
// level actually rises above the last level the learner celebrated.
export function LevelUpModal({ def, onClose, isDemo }: { def: LevelDef; onClose: () => void; isDemo?: boolean }) {
  return (
    <Modal onClose={onClose} labelledBy="levelup-title" className="levelup">
      <div className="pack">
        <div className="pack-burst" aria-hidden />
        <div className="pack-card">
          <div className="pack-top">
            <span className="mono">{isDemo ? 'DEMO BUILD' : 'NEW RELEASE'}</span>
            <span className="mono">v{def.level}.0.0</span>
          </div>
          <div className="pack-level">
            <span>LV</span>
            {def.level}
          </div>
          <h2 id="levelup-title" className="pack-name">
            {def.name}
          </h2>
          <p className="pack-blurb">{def.blurb}</p>
        </div>
      </div>
      <div className="pack-unlocks">
        <div className="eyebrow">Changelog</div>
        <ul>
          {def.unlocks.map((u) => (
            <li key={u}>
              <Icon name="sparkle" size={16} /> {u}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary btn-lg btn-block" onClick={onClose}>
        Let’s go <Icon name="arrow" size={18} />
      </button>
    </Modal>
  );
}
