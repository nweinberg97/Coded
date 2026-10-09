import type { ReactNode } from 'react';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { levelDef, nextLevelDef, xpProgress } from '../engine/levels';
import { streak } from '../engine/progress';
import { Icon } from './Icon';
import { useInstallPrompt } from '../app/pwa';
import { LevelBadge, ProgressBar } from './ui';

const NAV = [
  { to: '/', label: 'Home', icon: 'home', match: (p: string) => p === '/' },
  { to: '/learn', label: 'Learn', icon: 'cards', match: (p: string) => p.startsWith('/learn') },
  { to: '/vault', label: 'Vault', icon: 'vault', match: (p: string) => p.startsWith('/vault') || p.startsWith('/card') || p.startsWith('/set') },
  { to: '/build', label: 'Build', icon: 'code', match: (p: string) => p.startsWith('/build') },
  { to: '/demo', label: 'Demo', icon: 'play', match: (p: string) => p.startsWith('/demo') },
  { to: '/me', label: 'You', icon: 'user', match: (p: string) => p.startsWith('/me') },
];

export function Logo({ small }: { small?: boolean }) {
  return (
    <span className={`logo${small ? ' logo-sm' : ''}`} aria-label="Coded">
      <span className="logo-mark" aria-hidden>
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" rx="8" fill="var(--accent)" />
          <path d="M13 10 7 16l6 6M19 10l6 6-6 6" stroke="#0B0B0C" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="logo-word">CODED</span>
    </span>
  );
}

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  const p = useProgress();
  const next = nextLevelDef(p.level);
  const cur = levelDef(p.level);
  const days = streak(p.state);
  const install = useInstallPrompt();
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <aside className="sidebar" aria-label="Main navigation">
        <Link to="/" className="sidebar-logo">
          <Logo />
        </Link>
        <nav>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`nav-item${n.match(path) ? ' is-active' : ''}`} aria-current={n.match(path) ? 'page' : undefined}>
              <Icon name={n.icon} />
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        {install && (
          <button className="btn btn-ghost btn-sm install-btn" onClick={install}>
            <Icon name="download" size={16} /> Install app
          </button>
        )}
        <Link to="/me" className="sidebar-level">
          <div className="sidebar-level-row">
            <LevelBadge level={p.level} size="sm" />
            <div>
              <div className="sidebar-level-name">{cur.name}</div>
              <div className="sidebar-level-xp mono">{p.xp} XP</div>
            </div>
          </div>
          <ProgressBar value={xpProgress(p.xp, p.level)} label="Progress to next level" thin />
          <div className="sidebar-level-next">{next ? `${Math.max(0, next.xp - p.xp)} XP to ${next.name}` : 'Max level'}</div>
        </Link>
      </aside>

      <header className="topbar">
        <Link to="/" className="topbar-logo">
          <Logo small />
        </Link>
        <div className="topbar-stats">
          {install && (
            <button className="icon-btn" onClick={install} aria-label="Install app">
              <Icon name="download" size={18} />
            </button>
          )}
          {days > 0 && (
            <span className="stat-pill" title={`${days}-day streak`}>
              <Icon name="flame" size={16} /> {days}
            </span>
          )}
          <span className="stat-pill mono" title="Total XP">
            <Icon name="bolt" size={16} /> {p.xp}
          </span>
          <Link to="/me" className="topbar-level">
            <LevelBadge level={p.level} size="sm" />
          </Link>
        </div>
      </header>

      <main id="main" className="main" tabIndex={-1}>
        {p.saveError && (
          <div className="banner banner-warn" role="alert">
            <Icon name="info" size={18} /> {p.saveError}
          </div>
        )}
        {children}
      </main>

      <nav className="tabbar" aria-label="Main navigation">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className={`tab${n.match(path) ? ' is-active' : ''}`} aria-current={n.match(path) ? 'page' : undefined}>
            <Icon name={n.icon} size={22} />
            <span>{n.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
