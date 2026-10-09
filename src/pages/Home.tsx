import { CONCEPT_BY_ID, CONCEPTS, conceptsInTrack, splitTerm, TRACKS } from '../content';
import { CHALLENGES } from '../content/challenges';
import { continueOrder, dailyPick } from '../engine/deck';
import { levelDef, nextLevelDef, requirementStatus, xpProgress } from '../engine/levels';
import { dayKey, streak, totalXp } from '../engine/progress';
import { isDue, statusOf } from '../engine/srs';
import { Link, navigate } from '../app/router';
import { useProgress } from '../app/store';
import { CardFace } from '../components/CardFace';
import { Icon } from '../components/Icon';
import { TrackCover } from '../components/TrackCover';
import { LevelBadge, ProgressBar } from '../components/ui';

export function HomePage() {
  const p = useProgress();
  const now = Date.now();
  const isNew = p.state.ledger.length === 0 && Object.keys(p.state.reviews).length === 0;
  const unlocked = CONCEPTS.filter((c) => p.isUnlocked(c.id));
  const ctx = { reviews: p.state.reviews, bookmarks: p.state.bookmarks, missed: p.state.missed, isUnlocked: p.isUnlocked, now };
  const upNext = continueOrder(unlocked, ctx)[0];
  const due = unlocked.filter((c) => isDue(p.state.reviews[c.id], now)).length;
  const daily = dailyPick(unlocked, dayKey(now));
  const next = nextLevelDef(p.level);
  const req = next
    ? requirementStatus(next, { xp: totalXp(p.state), learned: p.learned, shipped: (id) => !!p.state.shipped[id] })
    : null;
  const days = streak(p.state, now);
  const collected = CONCEPTS.filter((c) => p.learned(c.id)).length;
  const nextDrop = CHALLENGES.find((c) => p.isChallengeUnlocked(c.id) && !p.state.shipped[c.id]);
  const fan = ['api', 'dns', 'rag'].map((id) => CONCEPT_BY_ID[id]);

  return (
    <div className="page home">
      <section className={`hero${isNew ? ' hero-new' : ''}`}>
        <div className="hero-text">
          <div className="eyebrow">{isNew ? 'Welcome to Coded' : `Level ${p.level} · ${levelDef(p.level).name}`}</div>
          <h1 className="h-hero">
            Understand how
            <br />
            software <span className="accent-word">actually</span> works.
          </h1>
          <p className="lede">
            Commit 170 concept cards to memory, earn XP for real understanding, and ship working code in a live sandbox. No account, no setup — your progress stays in this browser.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/learn')} data-testid="continue">
              <Icon name="play" size={18} /> {isNew ? 'Answer your first card' : 'Continue learning'}
            </button>
            <Link to="/demo" className="btn btn-secondary btn-lg">
              Try the demo
            </Link>
          </div>
          {isNew && <p className="hero-foot">Takes 30 seconds. Type an answer in your own words — no multiple choice.</p>}
        </div>
        <div className="hero-fan" aria-hidden>
          {fan.map((c, i) => (
            <div key={c.id} className={`fan-card fan-${i}`}>
              <CardFace concept={c} status={statusOf(p.state.reviews[c.id])} />
            </div>
          ))}
        </div>
      </section>

      {!isNew && (
        <section className="stats-row" aria-label="Your progress">
          <Link to="/me" className="stat-card stat-level">
            <LevelBadge level={p.level} size="lg" />
            <div className="stat-level-body">
              <div className="stat-k">{levelDef(p.level).name}</div>
              <ProgressBar value={xpProgress(p.xp, p.level)} label="XP toward next level" />
              <div className="stat-sub mono">{p.xp} XP{next ? ` · ${Math.max(0, next.xp - p.xp)} to Lv ${next.level}` : ''}</div>
            </div>
          </Link>
          <div className="stat-card">
            <div className="stat-n">{collected}</div>
            <div className="stat-k">cards committed</div>
          </div>
          <div className="stat-card">
            <div className="stat-n">{due}</div>
            <div className="stat-k">due for review</div>
          </div>
          <div className="stat-card">
            <div className="stat-n">
              {days}
              <Icon name="flame" size={22} className="flame" />
            </div>
            <div className="stat-k">day streak</div>
          </div>
        </section>
      )}

      <section className="home-grid">
        {upNext && (
          <Link to={`/learn`} className="up-next">
            <div className="up-next-text">
              <div className="eyebrow">{due > 0 ? `${due} due · up next` : 'Up next'}</div>
              <h2>{splitTerm(upNext.term).title}</h2>
              <p>{upNext.question}</p>
              <span className="btn btn-primary btn-sm">
                <Icon name="play" size={14} /> Study now
              </span>
            </div>
            <div className="up-next-card">
              <CardFace concept={upNext} compact status={statusOf(p.state.reviews[upNext.id])} />
            </div>
          </Link>
        )}
        {daily && (
          <Link to={`/learn?card=${daily.id}`} className="daily">
            <div className="eyebrow">Card of the day</div>
            <h3>{splitTerm(daily.term).title}</h3>
            <p>{daily.question}</p>
            <span className="daily-cta">
              Take it <Icon name="arrow" size={16} />
            </span>
          </Link>
        )}
        {next && req && (
          <div className="next-unlock" data-testid="next-unlock">
            <div className="eyebrow">Next unlock</div>
            <h3>
              Level {next.level} · {next.name}
            </h3>
            <p className="muted">{next.unlocks.join(' · ')}</p>
            <ul className="req-list">
              <li className={req.xpMet ? 'ok' : ''}>
                <span className="check-dot">{req.xpMet && <Icon name="check" size={12} />}</span> Reach {next.xp} XP <span className="muted">({p.xp}/{next.xp})</span>
              </li>
              {next.concepts.map((id) => (
                <li key={id} className={p.learned(id) ? 'ok' : ''}>
                  <span className="check-dot">{p.learned(id) && <Icon name="check" size={12} />}</span>
                  Recall <Link to={`/learn?card=${id}`}>{splitTerm(CONCEPT_BY_ID[id].term).title}</Link>
                </li>
              ))}
              {next.challenges.map((id) => (
                <li key={id} className={p.state.shipped[id] ? 'ok' : ''}>
                  <span className="check-dot">{p.state.shipped[id] && <Icon name="check" size={12} />}</span>
                  Ship <Link to={`/build/${id}`}>{CHALLENGES.find((c) => c.id === id)?.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <h2 className="h-section">Your modules</h2>
          <Link to="/repo" className="see-all">See all</Link>
        </div>
        <div className="shelf">
          {TRACKS.map((t) => {
            const all = conceptsInTrack(t.id);
            const got = all.filter((c) => p.learned(c.id)).length;
            const locked = t.unlockLevel > p.level;
            return (
              <Link key={t.id} to={`/module/${t.id}`} className="shelf-item">
                <div className="shelf-cover">
                  <TrackCover track={t} size={168} />
                  {locked ? (
                    <span className="shelf-lock"><Icon name="lock" size={14} /> Lv {t.unlockLevel}</span>
                  ) : (
                    <span className="shelf-play" aria-hidden><Icon name="play" size={18} /></span>
                  )}
                </div>
                <div className="shelf-title">{t.name}</div>
                <div className="shelf-sub">{t.tagline}</div>
                <ProgressBar value={got / all.length} label={`${t.name} progress`} thin tone="mono" />
              </Link>
            );
          })}
        </div>
      </section>

      {p.state.recent.length > 0 && (
        <section>
          <div className="section-head">
            <h2 className="h-section">Recent commits</h2>
            <Link to="/repo" className="see-all">Repo</Link>
          </div>
          <div className="recent-row">
            {p.state.recent.slice(0, 6).map((id) => (
              <Link key={id} to={`/card/${id}`} className="recent-item">
                <CardFace concept={CONCEPT_BY_ID[id]} status={statusOf(p.state.reviews[id])} compact />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="home-duo">
        {nextDrop && (
          <Link to={`/build/${nextDrop.id}`} className="promo promo-build" style={{ ['--c1' as string]: nextDrop.colorway[0], ['--c2' as string]: nextDrop.colorway[1] }}>
            <div className="eyebrow">Build · Drop {String(nextDrop.number).padStart(2, '0')}</div>
            <h3>{nextDrop.title}</h3>
            <p>{nextDrop.tagline} Edit real code, run it, ship it.</p>
            <span className="promo-cta">Open the sandbox <Icon name="arrow" size={16} /></span>
          </Link>
        )}
        <Link to="/demo" className="promo promo-demo">
          <div className="eyebrow">Interactive demo</div>
          <h3>See all of Coded in 5 minutes</h3>
          <p>A guided tour with its own demo profile — answer, earn, unlock and ship without touching your real progress.</p>
          <span className="promo-cta">Start the tour <Icon name="arrow" size={16} /></span>
        </Link>
      </section>
    </div>
  );
}
