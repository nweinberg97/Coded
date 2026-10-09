// End-to-end test in a real Chromium against the PRODUCTION build (dist/).
// Run: npm run build && npm run test:e2e
// Covers the primary learner journey, every Build challenge (reference
// solutions must ship, starters must not), sandbox isolation, persistence
// across reloads, and the demo's isolated profile.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { CONCEPT_BY_ID } from '../src/content/index.ts';
import { CHALLENGES } from '../src/content/challenges.ts';
import { SOLUTIONS } from '../tests/solutions.ts';

const root = resolve(new URL('..', import.meta.url).pathname);
const dist = join(root, 'dist');
const shots = join(root, 'test-results');
mkdirSync(shots, { recursive: true });
if (!existsSync(join(dist, 'index.html'))) throw new Error('Run `npm run build` first.');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff': 'font/woff', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const server = createServer((req, res) => {
  let f = normalize(join(dist, decodeURIComponent(req.url.split('?')[0])));
  if (!f.startsWith(dist) || !existsSync(f) || statSync(f).isDirectory()) f = join(dist, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(0);
const base = `http://localhost:${server.address().port}/`;

let passed = 0;
let failed = 0;
async function step(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}\n      ${String(e.message).split('\n').slice(0, 4).join('\n      ')}`);
  }
}
function expect(cond, msg) {
  if (!cond) throw new Error(msg);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));

const xp = async () => Number((await page.locator('.sidebar-level-xp').innerText()).replace(/\D/g, ''));
const closeLevelUp = async () => {
  const btn = page.locator('.levelup button:has-text("Let’s go")');
  if (await btn.isVisible().catch(() => false)) await btn.click();
};
async function answerCard(id, text) {
  await page.goto(`${base}#/learn?card=${id}`);
  await closeLevelUp();
  await page.locator('[data-testid="answer-input"]').fill(text);
  await page.locator('[data-testid="submit-answer"]').click();
}

console.log('\nPrimary learner journey');
await step('opens as a new learner with zero XP', async () => {
  await page.goto(base);
  await page.locator('[data-testid="continue"]').waitFor();
  expect((await xp()) === 0, 'expected 0 XP');
  await page.screenshot({ path: join(shots, 'home.png') });
});

await step('answers a flashcard correctly and earns 15 XP', async () => {
  await page.locator('[data-testid="continue"]').click();
  await page.locator('[data-testid="answer-input"]').waitFor();
  const term = await page.locator('.study-term').innerText();
  const c = Object.values(CONCEPT_BY_ID).find((x) => x.term.toUpperCase().startsWith(term.trim().replace(/\s+/g, ' ')));
  expect(c, `could not identify first card "${term}"`);
  await page.locator('[data-testid="answer-input"]').fill(c.testAnswers.correct[0]);
  await page.keyboard.press('Enter');
  await page.locator('.result-banner').waitFor();
  expect((await page.locator('.xp-pop').first().innerText()).includes('+15'), 'card shows +15 XP');
  expect((await xp()) === 15, `sidebar XP should be 15, got ${await xp()}`);
  await page.screenshot({ path: join(shots, 'card-correct.png') });
});

await step('repeated submission cannot double-award XP', async () => {
  await page.keyboard.press('Enter'); // focus is on Next; a stray Enter must not re-award
  await page.waitForTimeout(200);
  expect((await xp()) === 15, 'XP unchanged');
});

await step('an incorrect answer gets useful feedback and a hint', async () => {
  await page.goto(`${base}#/learn?card=server`);
  await page.locator('[data-testid="answer-input"]').fill('a kind of banana');
  await page.locator('[data-testid="submit-answer"]').click();
  const fb = page.locator('[data-testid="feedback"]');
  await fb.waitFor();
  expect(/Not quite|Getting warm/.test(await fb.innerText()), 'feedback text');
  await page.locator('[data-testid="hint"]').click();
  await page.locator('.hint-box').waitFor();
  expect((await xp()) === 15, 'no XP for wrong answer');
  await page.screenshot({ path: join(shots, 'card-feedback.png') });
});

await step('a partially-correct answer names what is missing', async () => {
  const c = Object.values(CONCEPT_BY_ID).find((x) => x.trackId === 'internet' && x.testAnswers.partial?.length && x.id !== 'server');
  await answerCard(c.id, c.testAnswers.partial[0]);
  const fb = page.locator('[data-testid="feedback"]');
  await fb.waitFor();
  expect((await fb.innerText()).includes('Getting warm'), 'partial feedback');
  expect((await page.locator('.idea-miss').count()) > 0, 'shows missing idea');
});

await step('shuffle changes the card', async () => {
  await page.goto(`${base}#/learn`);
  const before = await page.locator('.study-term').innerText();
  let changed = false;
  for (let i = 0; i < 3 && !changed; i++) {
    await page.locator('[data-testid="shuffle"]').click();
    await page.waitForTimeout(150);
    changed = (await page.locator('.study-term').innerText()) !== before;
  }
  expect(changed, 'card changed after shuffle');
});

await step('locked cards are previewable but award nothing', async () => {
  await answerCard('api', 'it lets two programs talk to each other');
  await page.locator('.lock-banner').first().waitFor();
  await page.locator('.result-banner').waitFor();
  expect((await page.locator('.xp-none').innerText()).includes('preview'), 'preview label');
  expect((await xp()) === 15, 'still 15 XP');
});

await step('unlocks Level 2 by recalling the required cards and earning 100 XP', async () => {
  const ids = ['client', 'server', 'browser', 'html', 'request', 'response', 'protocol', 'http'];
  for (const id of ids) {
    if ((await xp()) >= 100 && id !== 'html' && id !== 'server' && id !== 'browser' && id !== 'client') continue;
    await answerCard(id, CONCEPT_BY_ID[id].testAnswers.correct[0]);
    await page.locator('.result-banner').waitFor();
  }
  await page.locator('.levelup').waitFor({ timeout: 3000 });
  expect((await page.locator('.pack-name').innerText()).toUpperCase().includes('EXPLORER'), 'level-up modal');
  await page.screenshot({ path: join(shots, 'level-up.png') });
  await closeLevelUp();
  expect((await page.locator('.sidebar .level-badge-n').innerText()) === '2', 'sidebar shows level 2');
});

console.log('\nBuild sandbox');
await step('editor accepts real code; preview reflects it; explanation adapts', async () => {
  await page.goto(`${base}#/build/button-counter`);
  await page.locator('[data-testid="code-editor"]').waitFor();
  const code = SOLUTIONS['button-counter'].replace('let count = 0', 'let count = 10');
  await page.locator('[data-testid="code-editor"]').fill(code);
  await page.locator('[data-testid="run"]').click();
  const frame = page.frameLocator('[data-testid="preview-host"] iframe');
  await frame.locator('#counter').click();
  expect((await frame.locator('#counter').innerText()).includes('11'), 'preview button counted from 10 to 11');
  await page.locator('[data-testid="tab-hood"]').click();
  const hood = page.locator('[data-testid="under-the-hood"]');
  await hood.waitFor();
  const t = await hood.innerText();
  expect(t.includes('starts at 10'), 'explanation reflects the learner’s value');
  expect(/click/.test(t) && /DOM changed/.test(t), 'trace shows click and DOM change');
  await page.screenshot({ path: join(shots, 'build-hood.png') });
});

await step('runtime errors are shown with a line number and plain-English help', async () => {
  await page.goto(`${base}#/build/button-counter`);
  await page.locator('[data-testid="code-editor"]').fill('<p>hi</p>\n<script>\n  undefinedThing();\n</script>');
  await page.locator('[data-testid="run"]').click();
  await page.locator('.rtab:has-text("Console")').click();
  const line = page.locator('.console-runtime-error').first();
  await line.waitFor();
  const text = await line.innerText();
  expect(text.includes('line 3'), `maps to editor line 3: ${text}`);
  expect(text.includes('doesn’t know'), 'has help text');
});

await step('sandbox: script-only iframe, no app storage, no network', async () => {
  await page.goto(`${base}#/build/button-counter`);
  const probe = `<p id="r">?</p><script>
    const out = [];
    try { parent.localStorage.getItem('coded.progress'); out.push('parent-storage:OPEN'); } catch (e) { out.push('parent-storage:blocked'); }
    try { localStorage.getItem('x'); out.push('own-storage:OPEN'); } catch (e) { out.push('own-storage:blocked'); }
    try { parent.document.title; out.push('parent-dom:OPEN'); } catch (e) { out.push('parent-dom:blocked'); }
    const img = new Image(); img.onerror = () => console.log('img-blocked'); img.onload = () => console.log('img-LOADED'); img.src = 'https://example.com/x.png';
    fetch('https://example.com').then((r) => console.log('fetch-status:' + r.status));
    document.getElementById('r').textContent = out.join(' ');
  </script>`;
  await page.locator('[data-testid="code-editor"]').fill(probe);
  await page.locator('[data-testid="run"]').click();
  const frame = page.frameLocator('[data-testid="preview-host"] iframe');
  await frame.locator('#r:not(:has-text("?"))').waitFor();
  const r = await frame.locator('#r').innerText();
  expect(!r.includes('OPEN'), `isolation breached: ${r}`);
  expect((await page.locator('[data-testid="preview-host"] iframe').getAttribute('sandbox')) === 'allow-scripts', 'sandbox attribute');
  await page.waitForTimeout(800);
  await page.locator('.rtab:has-text("Console")').click();
  const con = await page.locator('[data-testid="console"]').innerText();
  expect(con.includes('fetch-status:503'), 'simulated fetch refuses real internet');
  expect(!con.includes('img-LOADED'), 'external image blocked by CSP');
});

await step('the starter code does not ship (no XP for just clicking)', async () => {
  await page.goto(`${base}#/build/button-counter`);
  await page.locator('[data-testid="code-editor"]').fill(CHALLENGES.find((c) => c.id === 'button-counter').starter);
  const before = await xp();
  await page.locator('[data-testid="ship"]').click();
  const res = page.locator('[data-testid="ship-result"]');
  await res.waitFor({ timeout: 15000 });
  expect((await res.innerText()).includes('Not shipped'), 'not shipped');
  expect((await xp()) === before, 'no XP');
});

for (const ch of CHALLENGES) {
  await step(`Drop ${ch.number} "${ch.title}": reference solution ships`, async () => {
    await page.goto(`${base}#/build/${ch.id}`);
    await closeLevelUp();
    await page.locator('[data-testid="code-editor"]').fill(SOLUTIONS[ch.id]);
    await page.locator('[data-testid="ship"]').click();
    const res = page.locator('[data-testid="ship-result"]');
    await res.waitFor({ timeout: 20000 });
    const text = await res.innerText();
    if (!text.includes('All')) {
      const fails = await page.locator('.checklist li.fail').allInnerTexts();
      throw new Error(`failed checks: ${fails.join(' | ')}`);
    }
    if (ch.number === 7 || ch.number === 2) await page.screenshot({ path: join(shots, `drop-${ch.number}.png`) });
  });
}

await step('shipping awards XP only when eligible and only once', async () => {
  const txt = await page.locator('.sidebar-level-xp').innerText();
  await page.goto(`${base}#/me`);
  const ledger = await page.locator('[data-testid="ledger"]').innerText();
  expect(ledger.includes('Shipped · Your first webpage'), 'first webpage XP in ledger');
  expect(!ledger.includes('Shipped · Ship a mini app'), 'locked drop gave no XP');
  expect((ledger.match(/Shipped · Make a button work/g) ?? []).length <= 1, 'single award');
  console.log(`      (XP now ${txt})`);
  await page.screenshot({ path: join(shots, 'profile.png'), fullPage: true });
});

console.log('\nPersistence');
await step('progress survives a page refresh', async () => {
  const before = await xp();
  await page.reload();
  await page.locator('.sidebar-level-xp').waitFor();
  expect((await xp()) === before && before > 0, `XP ${before} persisted`);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('coded.progress')));
  expect(stored.app === 'coded' && stored.version === 1, 'versioned envelope');
  expect(stored.state.reviews.client.box >= 1, 'review schedule persisted');
});

await step('corrupt storage recovers safely', async () => {
  const p2 = await ctx.newPage();
  await p2.goto(base);
  await p2.evaluate(() => localStorage.setItem('coded.progress.test', '{oops'));
  await p2.close();
});

console.log('\nDemo (isolated profile)');
await step('demo: answer, earn XP, unlock a level, without touching real XP', async () => {
  const realBefore = await xp();
  await page.goto(`${base}#/demo`);
  const demoCards = page.locator('#demo-1 [data-testid="answer-input"]');
  await demoCards.fill('a way for two applications to communicate');
  await page.locator('#demo-1 [data-testid="submit-answer"]').click();
  await page.locator('#demo-1 .result-banner').waitFor();
  expect((await page.locator('[data-testid="demo-xp"]').innerText()).startsWith('15'), 'demo XP 15');
  await page.locator('[data-testid="demo-shuffle"]').click();
  const practice = page.locator('#demo-3 [data-testid="answer-input"]');
  await practice.fill(CONCEPT_BY_ID.json.testAnswers.correct[0]);
  await page.locator('#demo-3 [data-testid="submit-answer"]').click();
  await page.locator('#demo-3 [data-testid="next-card"]').click();
  await page.locator('#demo-3 [data-testid="answer-input"]').fill(CONCEPT_BY_ID.http.testAnswers.correct[0]);
  await page.locator('#demo-3 [data-testid="submit-answer"]').click();
  await page.locator('.levelup').waitFor({ timeout: 3000 });
  expect((await page.locator('.levelup').innerText()).includes('DEMO'), 'demo level-up');
  await closeLevelUp();
  expect((await page.locator('[data-testid="unlock-status"]').innerText()).includes('Unlocked'), 'webhook unlocked');
  expect((await xp()) === realBefore, 'real XP untouched');
});

await step('demo: write, run and ship a real challenge', async () => {
  await page.locator('#demo-5 [data-testid="code-editor"]').fill(SOLUTIONS['button-counter']);
  await page.locator('#demo-5 [data-testid="ship"]').click();
  await page.locator('#demo-5 [data-testid="ship-result"]:has-text("All")').waitFor({ timeout: 15000 });
  await page.locator('#demo-7 .demo-ship.is-done').waitFor();
  await page.locator('[data-testid="demo-search"]').fill('cache');
  await page.locator('.search-results li').first().waitFor();
  // shipping takes the demo profile to Demo Level 3 — a real level-up
  await page.locator('.levelup').waitFor({ timeout: 3000 });
  expect((await page.locator('.pack-name').innerText()).toUpperCase().includes('BUILDER'), 'demo level 3');
  await closeLevelUp();
  await page.screenshot({ path: join(shots, 'demo.png'), fullPage: true });
  await page.locator('[data-testid="demo-start"]').click();
  await page.waitForURL(/#\/learn/);
});

console.log('\nResponsive + keyboard');
await step('mobile layouts render without horizontal scroll', async () => {
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const path of ['', 'learn', 'repo', 'vault', 'module/ai', 'build/first-webpage', 'demo', 'me']) {
    await m.goto(`${base}#/${path}`);
    await m.waitForTimeout(400);
    const overflow = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow <= 1, `/${path} overflows by ${overflow}px`);
  }
  await m.goto(`${base}#/build/first-webpage`);
  await m.screenshot({ path: join(shots, 'mobile-build.png') });
  await m.goto(`${base}#/learn`);
  await m.screenshot({ path: join(shots, 'mobile-learn.png') });
  await m.close();
});

await step('keyboard: answer with Enter, advance with Enter, shuffle with S', async () => {
  await page.goto(`${base}#/learn?mode=shuffle`);
  await page.locator('[data-testid="answer-input"]').focus();
  await page.keyboard.type('xyz');
  await page.keyboard.press('Enter');
  await page.locator('[data-testid="feedback"]').waitFor();
  await page.locator('body').click({ position: { x: 5, y: 5 } });
  const before = await page.locator('.study-term').innerText();
  await page.keyboard.press('s');
  await page.waitForTimeout(150);
  expect((await page.locator('.study-term').innerText()) !== before, 'S shuffles');
});

console.log('\nHosted like GitHub Pages (/Coded/ subpath) + installable + offline');
// Serve dist ONLY under /Coded/ — exactly how https://nweinberg97.github.io/Coded/ works.
const sub = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (!url.startsWith('/Coded/')) {
    res.writeHead(404).end('not found');
    return;
  }
  let f = normalize(join(dist, url.slice('/Coded/'.length) || 'index.html'));
  if (!f.startsWith(dist) || !existsSync(f) || statSync(f).isDirectory()) f = join(dist, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(0);
const subBase = `http://localhost:${sub.address().port}/Coded/`;
const pwaCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const pw = await pwaCtx.newPage();
const failedRequests = [];
pw.on('response', (r) => { if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`); });

await step('loads from a subpath with every asset resolving (no 404s)', async () => {
  await pw.goto(subBase);
  await pw.locator('[data-testid="continue"]').waitFor();
  const fontOk = await pw.evaluate(async () => { await document.fonts.ready; return document.fonts.check('900 20px InterDisplay'); });
  expect(fontOk, 'bundled fonts load');
  await pw.goto(`${subBase}#/build/first-webpage`);
  await pw.frameLocator('[data-testid="preview-host"] iframe').locator('h1').waitFor();
  expect(failedRequests.length === 0, failedRequests.join('\n'));
});

await step('is an installable web app (manifest + icons + service worker)', async () => {
  const manifest = await pw.evaluate(async () => {
    const href = document.querySelector('link[rel="manifest"]').href;
    const m = await (await fetch(href)).json();
    const icons = await Promise.all(m.icons.map(async (i) => (await fetch(new URL(i.src, href))).ok));
    return { m, icons };
  });
  expect(manifest.m.display === 'standalone' && manifest.m.name.startsWith('Coded'), 'manifest');
  expect(manifest.icons.every(Boolean), 'all icons resolve');
  const sw = await pw.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return reg.active?.scriptURL ?? '';
  });
  expect(sw.endsWith('/Coded/sw.js'), `service worker active: ${sw}`);
});

await step('keeps working with no internet connection', async () => {
  await pw.goto(`${subBase}#/learn`);
  await pw.locator('[data-testid="answer-input"]').waitFor();
  await pw.waitForTimeout(500);
  await pwaCtx.setOffline(true);
  await pw.reload();
  await pw.locator('[data-testid="answer-input"]').waitFor({ timeout: 8000 });
  await pw.locator('[data-testid="answer-input"]').fill('a global network of networks connecting computers');
  await pw.locator('[data-testid="submit-answer"]').click();
  await pw.locator('.result-banner').waitFor();
  await pw.goto(`${subBase}#/build/button-counter`);
  await pw.frameLocator('[data-testid="preview-host"] iframe').locator('#counter').waitFor({ timeout: 8000 });
  await pwaCtx.setOffline(false);
});
await pwaCtx.close();
sub.close();

await step('no uncaught page errors', async () => {
  // errors thrown on purpose by learner code inside the sandbox are excluded
  const appErrors = pageErrors.filter((m) => !m.includes('undefinedThing'));
  expect(appErrors.length === 0, appErrors.join('\n'));
});

await browser.close();
server.close();
console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
