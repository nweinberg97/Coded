import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAnswer, normalize, stem } from '../src/engine/evaluate';
import { CONCEPT_BY_ID, CONCEPTS, conceptsInTrack, splitTerm } from '../src/content';
import { DAY, INTERVALS, MINUTE, schedule, statusOf, isDue } from '../src/engine/srs';
import {
  initialState, reduce, totalXp, levelOf, XP_RULES, SESSION_GOAL, streak, dayKey, potentialXp,
  isConceptUnlocked, type ProgressState,
} from '../src/engine/progress';
import { computeLevel, LEVELS, xpProgress } from '../src/engine/levels';
import { parseSaved, serialize, load, save, validateState, STORAGE_KEY } from '../src/engine/storage';
import { shuffleDeck, mulberry32, filterConcepts, continueOrder, dailyPick } from '../src/engine/deck';
import { runSql } from '../src/engine/tinysql';
import { CHALLENGES, CHALLENGE_BY_ID } from '../src/content/challenges';
import { lineDiff, matchPatterns, describeTrace } from '../src/engine/explain';
import { parsePreviewMessage, buildPreviewDoc, PREVIEW_CSP, SANDBOX_ATTR } from '../src/sandbox/protocol';
import { SOLUTIONS } from './solutions';

const T0 = new Date('2026-03-02T10:00:00').getTime();

// ---------------- evaluation ----------------
test('normalize + stem', () => {
  assert.equal(normalize("It's  an API!"), 'its an api');
  assert.equal(stem('communicates'), stem('communicate'));
});

test('API card: paraphrases pass, misconceptions fail', () => {
  const api = CONCEPT_BY_ID['api'];
  assert.equal(evaluateAnswer(api, 'A way for two applications to communicate').verdict, 'correct');
  assert.equal(evaluateAnswer(api, 'lets programs talk to each other').verdict, 'correct');
  assert.equal(evaluateAnswer(api, 'it stores data').verdict, 'incorrect');
  assert.equal(evaluateAnswer(api, '').verdict, 'incorrect');
  assert.equal(evaluateAnswer(api, 'banana').verdict, 'incorrect');
});

test('negation is not credited', () => {
  const concept = {
    keyIdeas: [{ id: 'a', label: 'stores data', terms: ['store data', 'saves data'] }],
    acceptedAnswers: [],
  };
  assert.equal(evaluateAnswer(concept, 'it stores data').verdict, 'correct');
  assert.equal(evaluateAnswer(concept, 'it does not store data').verdict, 'incorrect');
});

test('partial credit names what is missing', () => {
  const concept = {
    keyIdeas: [
      { id: 'who', label: 'verifying identity', terms: ['who you are', 'identity', 'verify'] },
      { id: 'how', label: 'a credential', terms: ['password', 'credential', 'login'] },
    ],
    acceptedAnswers: [],
  };
  const r = evaluateAnswer(concept, 'checking your identity');
  assert.equal(r.verdict, 'partial');
  assert.deepEqual(r.missed.map((m) => m.id), ['how']);
  assert.match(r.message, /a credential/);
});

test('curriculum size and shape', () => {
  assert.ok(CONCEPTS.length >= 120, `expected 120+ concepts, got ${CONCEPTS.length}`);
  assert.equal(new Set(CONCEPTS.map((c) => c.id)).size, CONCEPTS.length);
  assert.deepEqual(splitTerm('HTTP (HyperText Transfer Protocol)'), { title: 'HTTP', subtitle: 'HyperText Transfer Protocol' });
  for (const ch of CHALLENGES) for (const id of ch.conceptIds) assert.ok(CONCEPT_BY_ID[id], `${ch.id} → ${id}`);
  for (const c of CONCEPTS) if (c.challengeId) assert.ok(CHALLENGE_BY_ID[c.challengeId], `${c.id} → ${c.challengeId}`);
});

// ---------------- spaced repetition ----------------
test('SRS: promotes on due first-try answers, demotes on misses', () => {
  let r = schedule(undefined, 'correct', T0);
  assert.equal(r.box, 1);
  assert.equal(r.due, T0 + INTERVALS[1]);
  assert.equal(statusOf(r), 'learning');
  // not due yet → practice: no promotion
  const practice = schedule(r, 'correct', T0 + MINUTE);
  assert.equal(practice.box, 1);
  assert.equal(practice.due, r.due);
  // due → promote
  r = schedule(r, 'correct', T0 + 11 * MINUTE);
  assert.equal(r.box, 2);
  r = schedule(r, 'correct', r.due + 1);
  r = schedule(r, 'correct', r.due + 1);
  assert.equal(statusOf(r), 'mastered');
  const missed = schedule(r, 'missed', r.due + 1);
  assert.equal(missed.box, 1);
  assert.equal(missed.lapses, 1);
  assert.ok(isDue(missed, missed.due));
  assert.equal(schedule(undefined, 'assisted', T0).box, 1);
});

// ---------------- XP + progression ----------------
function answer(s: ProgressState, id: string, outcome: 'correct' | 'assisted' | 'missed', now = T0, sessionId = 's1') {
  return reduce(s, { type: 'answer', conceptId: id, outcome, sessionId, now });
}

test('XP: first try 15, assisted 8, no farming, idempotent', () => {
  let s = initialState(T0);
  s = answer(s, 'client', 'correct');
  assert.equal(totalXp(s), XP_RULES.firstTry);
  s = answer(s, 'server', 'assisted');
  assert.equal(totalXp(s), XP_RULES.firstTry + XP_RULES.assisted);
  // Repeating a learned, not-due card earns nothing
  for (let i = 0; i < 20; i++) s = answer(s, 'client', 'correct', T0 + 1000 + i);
  assert.equal(totalXp(s), XP_RULES.firstTry + XP_RULES.assisted);
  assert.equal(potentialXp(s, 'client', T0 + 2000, true), 0);
  // Once due, a spaced review earns review XP exactly once
  const due = s.reviews['client'].due + 1;
  s = answer(s, 'client', 'correct', due);
  s = answer(s, 'client', 'correct', due + 1);
  assert.equal(totalXp(s), XP_RULES.firstTry + XP_RULES.assisted + XP_RULES.reviewFirstTry);
  // Ledger ids are unique
  assert.equal(new Set(s.ledger.map((t) => t.id)).size, s.ledger.length);
});

test('XP: misses earn nothing; preview answers change nothing', () => {
  let s = initialState(T0);
  s = answer(s, 'client', 'missed');
  assert.equal(totalXp(s), 0);
  assert.deepEqual(s.missed, ['client']);
  const before = s;
  s = reduce(s, { type: 'answer', conceptId: 'api', outcome: 'correct', sessionId: 'x', now: T0, preview: true });
  assert.equal(s, before);
});

test('session bonus needs a real session', () => {
  let s = initialState(T0);
  const ids = conceptsInTrack('internet').slice(0, SESSION_GOAL).map((c) => c.id);
  ids.forEach((id, i) => (s = answer(s, id, i < 6 ? 'correct' : 'missed', T0 + i)));
  assert.ok(s.ledger.some((t) => t.reason === 'session'));
  // Answering the same card 8 times does not count
  let t = initialState(T0);
  for (let i = 0; i < 10; i++) t = answer(t, 'client', 'correct', T0 + i, 's2');
  assert.ok(!t.ledger.some((x) => x.reason === 'session'));
});

test('track completion bonus', () => {
  let s = initialState(T0);
  for (const c of conceptsInTrack('internet')) s = answer(s, c.id, 'correct');
  assert.ok(s.ledger.some((t) => t.id === 'track:internet' && t.amount === XP_RULES.trackComplete));
});

test('challenge XP: once, only when eligible', () => {
  let s = initialState(T0);
  s = reduce(s, { type: 'ship', challengeId: 'ship-app', title: 'x', xp: 100, eligible: false, now: T0 });
  assert.equal(totalXp(s), 0);
  assert.ok(s.shipped['ship-app']);
  s = reduce(s, { type: 'ship', challengeId: 'first-webpage', title: 'x', xp: 40, eligible: true, now: T0 });
  s = reduce(s, { type: 'ship', challengeId: 'first-webpage', title: 'x', xp: 40, eligible: true, now: T0 + 5 });
  assert.equal(totalXp(s), 40);
});

test('levels need XP AND prerequisites', () => {
  const learnedNone = () => false;
  assert.equal(computeLevel({ xp: 99999, learned: learnedNone, shipped: () => false }), 1);
  const lvl2 = new Set(LEVELS[1].concepts);
  assert.equal(computeLevel({ xp: 99, learned: (id) => lvl2.has(id), shipped: () => false }), 1);
  assert.equal(computeLevel({ xp: 100, learned: (id) => lvl2.has(id), shipped: () => false }), 2);
  // Level 3 additionally needs a shipped challenge
  const lvl3 = new Set([...LEVELS[1].concepts, ...LEVELS[2].concepts]);
  assert.equal(computeLevel({ xp: 300, learned: (id) => lvl3.has(id), shipped: () => false }), 2);
  assert.equal(computeLevel({ xp: 300, learned: (id) => lvl3.has(id), shipped: (c) => c === 'first-webpage' }), 3);
  assert.equal(xpProgress(50, 1), 0.5);
});

test('every level is reachable using only unlocked material', () => {
  // Simulate an ideal learner: at each level, learn what's required.
  let s = initialState(T0);
  let now = T0;
  for (const def of LEVELS.slice(1)) {
    const level = levelOf(s);
    for (const id of def.concepts) {
      assert.ok(isConceptUnlocked(id, level), `${id} must be unlocked at level ${level} to reach ${def.level}`);
      s = answer(s, id, 'correct', now++);
    }
    for (const ch of def.challenges) {
      assert.ok(CHALLENGE_BY_ID[ch].unlockLevel <= level, `${ch} must be unlocked at ${level}`);
      s = reduce(s, { type: 'ship', challengeId: ch, title: ch, xp: CHALLENGE_BY_ID[ch].xp, eligible: true, now: now++ });
    }
    // top up XP with other unlocked cards
    for (const c of CONCEPTS) {
      if (totalXp(s) >= def.xp) break;
      if (isConceptUnlocked(c.id, levelOf(s)) && !s.reviews[c.id]) s = answer(s, c.id, 'correct', now++);
    }
    assert.equal(levelOf(s), def.level, `should reach level ${def.level}`);
  }
});

test('streak counts consecutive days', () => {
  const s = { ...initialState(T0), activityDays: [dayKey(T0 - 2 * DAY), dayKey(T0 - DAY), dayKey(T0)] };
  assert.equal(streak(s, T0), 3);
  assert.equal(streak({ ...s, activityDays: [dayKey(T0 - 3 * DAY)] }, T0), 0);
});

// ---------------- persistence ----------------
test('storage round-trip, validation and migration', () => {
  let s = initialState(T0);
  s = answer(s, 'client', 'correct');
  const back = parseSaved(serialize(s));
  assert.deepEqual(back.reviews, s.reviews);
  assert.equal(totalXp(back), totalXp(s));
  // v0 migration: bare object with numeric xp
  const migrated = parseSaved(JSON.stringify({ xp: 42, bookmarks: ['api'] }));
  assert.equal(totalXp(migrated), 42);
  assert.deepEqual(migrated.bookmarks, ['api']);
  // tampered duplicates are removed, junk is dropped
  const dup = validateState({ ledger: [{ id: 'a', amount: 5 }, { id: 'a', amount: 5 }, { id: 'b', amount: -3 }, 'x'] });
  assert.equal(totalXp(dup), 5);
  assert.throws(() => parseSaved(JSON.stringify({ app: 'coded', version: 999, state: {} })));
});

test('load/save survive broken storage', () => {
  const mem = new Map<string, string>();
  const storage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k) };
  const s = answer(initialState(T0), 'client', 'correct');
  assert.equal(save(storage, s), undefined);
  assert.equal(totalXp(load(storage).state), 15);
  mem.set(STORAGE_KEY, '{not json');
  const r = load(storage);
  assert.ok(r.error);
  assert.equal(totalXp(r.state), 0);
  assert.ok([...mem.keys()].some((k) => k.includes('corrupt')), 'keeps a backup');
  const throwing = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('full'); }, removeItem: () => {} };
  assert.ok(load(throwing).error);
  assert.ok(save(throwing, s));
});

// ---------------- decks ----------------
test('shuffle randomizes, respects filters, avoids recent and current', () => {
  const items = CONCEPTS.slice(0, 20);
  const a = shuffleDeck(items, [], mulberry32(1)).map((c) => c.id);
  const b = shuffleDeck(items, [], mulberry32(2)).map((c) => c.id);
  assert.notDeepEqual(a, b);
  assert.equal(new Set(a).size, 20);
  const recent = items.slice(0, 5).map((c) => c.id);
  const c = shuffleDeck(items, recent, mulberry32(3)).map((x) => x.id);
  assert.deepEqual(new Set(c.slice(15)), new Set(recent));
  for (let seed = 0; seed < 30; seed++) {
    assert.notEqual(shuffleDeck(items, [], mulberry32(seed), items[0].id)[0].id, items[0].id);
  }
  const ctx = { reviews: {}, bookmarks: ['api'], missed: [], isUnlocked: () => true, now: T0 };
  assert.deepEqual(filterConcepts(CONCEPTS, { bookmarkedOnly: true }, ctx).map((x) => x.id), ['api']);
  assert.ok(filterConcepts(CONCEPTS, { trackIds: ['data'] }, ctx).every((x) => x.trackId === 'data'));
  assert.ok(filterConcepts(CONCEPTS, { query: 'dns' }, ctx).some((x) => x.id === 'dns'));
  assert.equal(dailyPick(items, '2026-01-01')?.id, dailyPick(items, '2026-01-01')?.id);
});

test('continue order puts due cards first', () => {
  const s = answer(initialState(T0), 'server', 'missed');
  const ctx = { reviews: s.reviews, bookmarks: [], missed: [], isUnlocked: () => true, now: T0 + DAY };
  const order = continueOrder(conceptsInTrack('internet'), ctx);
  assert.equal(order[0].id, 'server');
});

// ---------------- TinySQL ----------------
test('TinySQL CRUD, errors and suggestions', () => {
  const r = runSql(`CREATE TABLE t (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
    INSERT INTO t (id, name, price) VALUES (1, 'a', 50), (2, 'b', 300), (3, 'c', 20);
    SELECT name FROM t WHERE price < 100 ORDER BY price DESC;
    UPDATE t SET price = 10 WHERE id = 2;
    DELETE FROM t WHERE name = 'c';
    SELECT COUNT(*) FROM t;`);
  assert.equal(r.error, undefined);
  assert.deepEqual(r.results[2].rows, [['a'], ['c']]);
  assert.deepEqual(r.results[5].rows, [[2]]);
  assert.equal(r.db.tables.t.rows.find((x) => x.id === 2)?.price, 10);
  const dupe = runSql(`CREATE TABLE t (id INTEGER PRIMARY KEY); INSERT INTO t VALUES (1); INSERT INTO t VALUES (1);`);
  assert.match(dupe.error!.message, /UNIQUE/);
  const typo = runSql(`CREATE TABLE t (id INTEGER); SELECT * FORM t;`);
  assert.match(typo.error!.message, /Did you mean FROM/);
  const unq = runSql(`CREATE TABLE t (name TEXT); INSERT INTO t VALUES (hello);`);
  assert.match(unq.error!.message, /need quotes/);
  const like = runSql(`CREATE TABLE t (n TEXT); INSERT INTO t VALUES ('Air Byte'), ('Loop'); SELECT * FROM t WHERE n LIKE 'air%';`);
  assert.deepEqual(like.results[2].rows, [['Air Byte']]);
});

// ---------------- challenges ----------------
test('every challenge has a reference solution that passes source/SQL checks', () => {
  for (const ch of CHALLENGES) {
    const sol = SOLUTIONS[ch.id];
    assert.ok(sol && sol !== ch.starter, `${ch.id} solution differs from starter`);
    const sqlRun = ch.mode === 'sql' ? runSql(sol) : undefined;
    for (const check of ch.checks) {
      if (check.kind === 'source') assert.ok(check.test(sol), `${ch.id}/${check.id} passes`);
      if (check.kind === 'sql') assert.ok(check.test(sqlRun!), `${ch.id}/${check.id} passes (${sqlRun!.error?.message ?? ''})`);
    }
    // the starter must NOT already satisfy every check
    if (ch.mode === 'sql') {
      const sr = runSql(ch.starter);
      assert.ok(ch.checks.some((c) => c.kind === 'sql' && !c.test(sr)), `${ch.id} starter is not already solved`);
    }
  }
});

test('explainer reflects the actual code', () => {
  const ch = CHALLENGE_BY_ID['button-counter'];
  const code = SOLUTIONS['button-counter'].replace('let count = 0', 'let count = 10');
  const hits = matchPatterns(code, ch.patterns);
  assert.ok(hits.some((h) => /starts at 10/.test(h.text)), 'adapts to the learner’s value');
  assert.ok(hits.every((h) => h.line >= 1));
  const diff = lineDiff(ch.starter, code);
  assert.ok(diff.some((d) => d.kind === 'added' && d.text.includes('count + 1')));
  // comments are ignored
  assert.ok(!matchPatterns(ch.starter, ch.patterns).some((h) => h.snippet.includes('TODO')));
  const steps = describeTrace([
    { kind: 'event', t: 1, event: 'click', target: 'button#counter' },
    { kind: 'event', t: 2, event: 'click', target: 'button#counter' },
  ]);
  assert.equal(steps.length, 1);
  assert.match(steps[0].text, /×2/);
});

// ---------------- sandbox protocol ----------------
test('preview document is locked down', () => {
  assert.equal(SANDBOX_ATTR, 'allow-scripts');
  assert.ok(!SANDBOX_ATTR.includes('allow-same-origin'));
  assert.match(PREVIEW_CSP, /connect-src 'none'/);
  assert.match(PREVIEW_CSP, /default-src 'none'/);
  const doc = buildPreviewDoc('<p>hi</p></script><script>x()</script>', { runId: 'r1' });
  assert.ok(doc.indexOf('Content-Security-Policy') < doc.indexOf('<p>hi</p>'));
  // everything before learner code is on line 1, so error lines map directly
  assert.equal(doc.slice(0, doc.indexOf('<p>hi</p>')).split('\n').length, 1);
});

test('preview messages are validated strictly', () => {
  assert.equal(parsePreviewMessage({ channel: 'coded-preview', runId: 'other', type: 'console', payload: { level: 'log', text: 'x' } }, 'r1'), null);
  assert.equal(parsePreviewMessage({ channel: 'evil', runId: 'r1', type: 'console', payload: {} }, 'r1'), null);
  assert.equal(parsePreviewMessage({ channel: 'coded-preview', runId: 'r1', type: 'nope', payload: {} }, 'r1'), null);
  assert.equal(parsePreviewMessage({ channel: 'coded-preview', runId: 'r1', type: 'trace', payload: { kind: 'hack' } }, 'r1'), null);
  const ok = parsePreviewMessage({ channel: 'coded-preview', runId: 'r1', type: 'console', payload: { level: 'weird', text: 'a'.repeat(5000) } }, 'r1');
  assert.equal(ok?.type, 'console');
  assert.equal(ok?.type === 'console' && ok.payload.level, 'log');
  assert.equal(ok?.type === 'console' && ok.payload.text.length, 1000);
  const tr = parsePreviewMessage({ channel: 'coded-preview', runId: 'r1', type: 'trace', payload: { kind: 'dom', from: {}, to: 'x', fn: () => 1 } }, 'r1');
  assert.ok(tr && tr.type === 'trace' && !('from' in tr.payload) && tr.payload.to === 'x');
});
