import { CHALLENGE_BY_ID, CHALLENGES } from '../content/challenges';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { Workspace } from '../build/Workspace';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/ui';

export function BuildPage() {
  const p = useProgress();
  const shipped = CHALLENGES.filter((c) => p.state.shipped[c.id]).length;
  return (
    <div className="page">
      <header className="build-hero">
        <div className="eyebrow">Build</div>
        <h1 className="h-display">Drops</h1>
        <p className="lede">
          Eight hands-on experiments. Real code, a real browser sandbox, and an automated checker that only lets you ship when it actually works.
        </p>
        <div className="build-meta mono">{shipped}/{CHALLENGES.length} SHIPPED</div>
      </header>
      <div className="drops">
        {CHALLENGES.map((c) => {
          const isShipped = !!p.state.shipped[c.id];
          const locked = !p.isChallengeUnlocked(c.id);
          const attempt = p.state.attempts[c.id];
          return (
            <Link key={c.id} to={`/build/${c.id}`} className={`drop${locked ? ' is-locked' : ''}${isShipped ? ' is-shipped' : ''}`} style={{ ['--c1' as string]: c.colorway[0], ['--c2' as string]: c.colorway[1] }} data-testid={`drop-${c.id}`}>
              <div className="drop-box">
                <span className="drop-number">{String(c.number).padStart(2, '0')}</span>
                <span className="drop-mode mono">{c.mode === 'sql' ? '.SQL' : '.HTML'}</span>
                {isShipped && <span className="drop-stamp">SHIPPED</span>}
              </div>
              <div className="drop-info">
                <div className="drop-row">
                  <span className="mono drop-label">DROP {String(c.number).padStart(2, '0')}</span>
                  <span className="drop-xp">+{c.xp} XP</span>
                </div>
                <h2 className="drop-title">{c.title}</h2>
                <p className="drop-tagline">{c.tagline}</p>
                <div className="drop-foot">
                  {locked ? (
                    <span className="drop-status"><Icon name="lock" size={14} /> XP from Lv {c.unlockLevel} · practice open</span>
                  ) : isShipped ? (
                    <span className="drop-status ok"><Icon name="check" size={14} /> Shipped</span>
                  ) : attempt ? (
                    <span className="drop-status">{attempt.bestPassed}/{attempt.total} checks best</span>
                  ) : (
                    <span className="drop-status new">Available now</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <aside className="sandbox-note">
        <Icon name="info" size={18} />
        <p>
          <strong>About the sandbox.</strong> Your code runs inside an isolated, script-only iframe with a strict security policy: it can’t read Coded’s data, reach the internet, open popups or submit forms. That’s strong browser isolation — but it isn’t an operating-system container, and an endless loop can still slow the page down until you press Stop.
        </p>
      </aside>
    </div>
  );
}

export function ChallengePage({ id }: { id: string }) {
  const ch = CHALLENGE_BY_ID[id];
  if (!ch) return <div className="page"><EmptyState title="Drop not found" action={<Link className="btn btn-primary" to="/build">All drops</Link>} /></div>;
  const idx = ch.number;
  const next = Object.values(CHALLENGE_BY_ID).find((c) => c.number === idx + 1);
  return (
    <div className="page page-wide">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/build">Drops</Link> <span>/</span> <span aria-current="page">Drop {String(ch.number).padStart(2, '0')} · {ch.title}</span>
        {next && (
          <Link className="crumbs-next" to={`/build/${next.id}`}>
            Next: {next.title} <Icon name="right" size={14} />
          </Link>
        )}
      </nav>
      <Workspace key={ch.id} challenge={ch} />
    </div>
  );
}
