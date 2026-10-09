import { CONCEPT_BY_ID, conceptsInTrack, splitTerm, TRACK_BY_ID } from '../content';
import { CHALLENGE_BY_ID } from '../content/challenges';
import { describeDue, statusOf } from '../engine/srs';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { CardFace } from '../components/CardFace';
import { Icon } from '../components/Icon';
import { EmptyState, StatusTag } from '../components/ui';

export function CardPage({ id }: { id: string }) {
  const p = useProgress();
  const c = CONCEPT_BY_ID[id];
  if (!c) {
    return (
      <div className="page">
        <EmptyState icon="search" title="Card not found" action={<Link className="btn btn-primary" to="/repo">Back to your repo</Link>} />
      </div>
    );
  }
  const track = TRACK_BY_ID[c.trackId];
  const r = p.state.reviews[c.id];
  const status = statusOf(r);
  const locked = !p.isUnlocked(c.id);
  const learned = p.learned(c.id);
  const challenge = c.challengeId ? CHALLENGE_BY_ID[c.challengeId] : undefined;
  const siblings = conceptsInTrack(c.trackId);
  const i = siblings.findIndex((x) => x.id === c.id);
  const connectedFrom = Object.values(CONCEPT_BY_ID).filter((x) => x.relatedConceptIds.includes(c.id) && !c.relatedConceptIds.includes(x.id)).slice(0, 6);

  return (
    <div className="page card-page" style={{ ['--set-a' as string]: track.cover[0], ['--set-b' as string]: track.cover[1] }}>
      <div className="card-page-glow" aria-hidden />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/repo">Repo</Link> <span>/</span> <Link to={`/module/${track.id}`}>{track.name}</Link> <span>/</span>{' '}
        <span aria-current="page">{splitTerm(c.term).title}</span>
      </nav>
      <div className="card-page-grid">
        <div className="card-page-face">
          <CardFace concept={c} status={status} locked={locked} />
          <div className="card-page-meta">
            <StatusTag status={status} />
            <span className="muted">{describeDue(r, Date.now())}</span>
          </div>
          <Link className="btn btn-primary btn-block" to={`/learn?card=${c.id}`} data-testid="study-this">
            <Icon name="play" size={16} /> {learned ? 'Review this card' : locked ? 'Preview this card' : 'Commit this card'}
          </Link>
          <div className="card-page-pager">
            {i > 0 ? <Link className="btn btn-ghost btn-sm" to={`/card/${siblings[i - 1].id}`}><Icon name="left" size={16} /> {splitTerm(siblings[i - 1].term).title}</Link> : <span />}
            {i < siblings.length - 1 && <Link className="btn btn-ghost btn-sm" to={`/card/${siblings[i + 1].id}`}>{splitTerm(siblings[i + 1].term).title} <Icon name="right" size={16} /></Link>}
          </div>
        </div>
        <article className="card-page-body">
          {locked && (
            <div className="lock-banner">
              <Icon name="lock" size={18} />
              <div>
                <strong>Unlocks at Level {p.conceptUnlockLevel(c.id)}.</strong>
                <span> Reading is always free. Committing it (and earning XP) opens when you reach that level — see <Link to="/me">what’s next</Link>.</span>
              </div>
            </div>
          )}
          <h1 className="h-display h-card">{c.term}</h1>
          <p className="lede">{c.definition}</p>
          <section>
            <h2 className="h-sub">In plain English</h2>
            <p>{c.plainEnglish}</p>
          </section>
          {c.analogy && (
            <section>
              <h2 className="h-sub">Think of it like</h2>
              <p>{c.analogy}</p>
            </section>
          )}
          <section>
            <h2 className="h-sub">Example</h2>
            <p className="example">{c.example}</p>
          </section>
          <section>
            <h2 className="h-sub">Why it matters</h2>
            <p>{c.whyItMatters}</p>
          </section>
          {c.misconception && (
            <section className="fact-warn-block">
              <h2 className="h-sub">Don’t mix it up</h2>
              <p>{c.misconception}</p>
            </section>
          )}
          {c.deepDive && (
            <details className="deeper-details">
              <summary>Go deeper</summary>
              <p>{c.deepDive}</p>
            </details>
          )}
          {challenge && (
            <Link to={`/build/${challenge.id}`} className="callout-build">
              <Icon name="code" size={20} />
              <div>
                <strong>Use it for real · Drop {String(challenge.number).padStart(2, '0')}: {challenge.title}</strong>
                <span>{challenge.tagline}</span>
              </div>
              <Icon name="arrow" size={18} />
            </Link>
          )}
          <section>
            <h2 className="h-sub">Knowledge graph</h2>
            {(c.prerequisiteIds?.length ?? 0) > 0 && (
              <div className="graph-row">
                <span className="graph-label">Builds on</span>
                <div className="chip-row">
                  {c.prerequisiteIds!.map((x) => (
                    <Link key={x} className={`chip${p.learned(x) ? ' chip-done' : ''}`} to={`/card/${x}`}>
                      {p.learned(x) && <Icon name="check" size={12} />} {splitTerm(CONCEPT_BY_ID[x].term).title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="graph-row">
              <span className="graph-label">Connects to</span>
              <div className="chip-row">
                {c.relatedConceptIds.map((x) => (
                  <Link key={x} className={`chip${p.learned(x) ? ' chip-done' : ''}`} to={`/card/${x}`}>
                    {p.learned(x) && <Icon name="check" size={12} />} {splitTerm(CONCEPT_BY_ID[x].term).title}
                  </Link>
                ))}
              </div>
            </div>
            {connectedFrom.length > 0 && (
              <div className="graph-row">
                <span className="graph-label">Referenced by</span>
                <div className="chip-row">
                  {connectedFrom.map((x) => (
                    <Link key={x.id} className="chip" to={`/card/${x.id}`}>
                      {splitTerm(x.term).title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
