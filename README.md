# CODED

**Understand how software actually works — and build something.**

Coded is a free, no-account learning app for smart people who aren't engineers. You collect **170 concept cards** (API, DNS, JSON, Git, RAG…) by answering questions in your own words, earn XP for real understanding, level up, and ship working code in a **real browser sandbox** with an automated checker and an "Under the hood" explainer that shows exactly what your code did.

The brand borrows from collectible drops (NBA Top Shot), shelves and play buttons (Spotify), and sneaker-release editorial (GOAT): every concept is a numbered card with a rarity tier, every learning track is a "set" with album art, every coding challenge is a "Drop".

## What's inside

| Area | What it does |
| --- | --- |
| **Learn** | Keyboard-first flashcards. Type an answer → offline evaluator grades correct / partial / incorrect and explains why. Hints, reveal, related cards, save-for-later. Modes: For you, Shuffle, Due, Missed, Saved. Filters: set, rarity, status, search. |
| **Spaced repetition** | Leitner boxes (New → Learning → Reviewing → Mastered). Due first-try answers promote; misses come back in 10 minutes; answering a card that isn't due is practice (no promotion, no XP). |
| **XP & levels** | Ledger of individually-keyed XP transactions (no double awards). 7 levels (Curious → Systems Thinker), each gated by XP **and** specific recalled cards **and** shipped drops. Locked cards stay readable as previews with a path to their prerequisites. |
| **Vault** | Collection grid of all 170 cards, set pages with a tracklist, card pages with the knowledge graph (builds on / connects to / referenced by). |
| **Build** | 8 Drops: first webpage, CSS, button counter, score tracker, data transform, API (simulated server), mini database (TinySQL), and a full mini app. Mission · Editor · Result panels; tabs on mobile. |
| **Under the hood** | Built only from what really happened: line diff vs. the starter, recorded event trace (listener → event → handler → DOM change, request → response → JSON), matched code patterns with line numbers, CSS rule matches, SQL step-by-step. |
| **Demo** | `#/demo` — an 8-section guided tour on a separate in-memory profile using the same engine and components: answer, shuffle, earn XP, unlock a (demo) level, write/understand/ship code, explore the curriculum. |
| **You** | "Wrapped"-style stats, level ladder with "why it's locked", XP history, export / import / reset. |

## Run it

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173 — rebuilds on save
npm test           # unit + curriculum tests (node:test via tsx)
npm run build      # production build → dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run test:e2e   # real-browser end-to-end test against dist/ (needs `npx playwright install chromium` once)
npm run typecheck
```

## Deploy (free, static)

`dist/` is a fully static site with **hash routing** (`#/learn`), so it works on any static host without rewrite rules.

- **GitHub Pages:** the included workflow (`.github/workflows/deploy.yml`) tests, builds and deploys on every push to `main`. Turn it on once under *Settings → Pages → Source: GitHub Actions*. All asset paths are relative, so it works from `https://<user>.github.io/coded/`.
- **Cloudflare Pages / Netlify:** build command `npm run build`, output directory `dist`.

## Architecture

```
src/
  content/        curriculum as data — 8 tracks, 170 concepts, 8 challenges (no UI text in components)
  engine/         pure, tested logic: evaluate · srs · levels · progress (reducer + XP ledger) · storage · deck · tinysql · explain
  sandbox/        bridge (runs inside the iframe) · protocol (CSP, srcdoc builder, message validation) · frame controller
  build/          code editor, highlighter, workspace, under-the-hood
  components/     card face, study card, shell, level-up, ui primitives
  pages/          Home, Learn, Vault, Card, Set, Build, Challenge, Demo, Profile
  app/            hash router, progress store (real + demo profiles), toasts
tests/            engine.test.ts, content.test.ts (grades every card's sample answers), solutions.ts
scripts/          build.mjs (esbuild), e2e.mjs (Playwright)
```

**Stack:** React 19 + TypeScript, bundled with esbuild. Runtime dependencies are only `react` and `react-dom`. Fonts (Inter, OFL) are bundled locally; no CDNs, no analytics.

### Answer evaluation (offline, deterministic)
Each card defines **key ideas** (each a set of synonym terms), accepted phrasings, and known **wrong ideas**. The evaluator normalizes text, drops stop words, matches with a light stemmer, ignores negated hits ("it does *not* store data"), checks misconceptions first, then counts ideas: all required → correct, some → partial (naming what's missing), none → incorrect. There's no fuzzy similarity score, so every verdict is explainable. `npm test` grades every card's sample correct / partial / incorrect answers to keep the content and grader honest.

### The sandbox
- Learner HTML/CSS/JS runs in an `<iframe sandbox="allow-scripts">` built from `srcdoc` — **never** `allow-same-origin`, so the code runs in an opaque origin with no access to Coded's DOM, storage or cookies (verified by the e2e test).
- Each preview document carries its own CSP: inline code only, `connect-src 'none'`, no external scripts/styles/fonts/frames, no form posts.
- A small trusted **bridge** script inside the frame captures console output and errors (mapped to editor line numbers), records an event trace, provides a **simulated `fetch` + `mockServer`** for the API drop, and runs **declarative completion checks** (click this, read that, compare computed style…).
- Parent ↔ frame messages use `postMessage` with an unguessable per-run id, a source-window check (origins are `"null"`) and strict schema validation.
- Shipping runs the checks in a fresh **hidden** sandbox, including fault-injection scenarios (e.g. the server returns 404). XP is awarded only when every check passes.
- A 5-second watchdog detects code that never finishes loading; **Stop** destroys the frame.

**Honest limits:** a sandboxed iframe is strong browser isolation, not an OS container. In browsers that run sandboxed frames in the same process, an endless loop can freeze the tab until the frame is stopped. Learner code shares a JS realm with the bridge, so a determined learner could forge their own check results — acceptable for a self-paced learning tool with local-only XP.

**TinySQL** (Drop 07) is an in-memory interpreter for a real subset of SQL (CREATE, INSERT, SELECT with WHERE/ORDER BY/LIMIT/COUNT, UPDATE, DELETE, LIKE, primary-key uniqueness, type checks, typo suggestions). The UI labels it as a teaching simulator — it has no joins, indexes, transactions or durability.

### Persistence
Progress lives in `localStorage` under `coded.progress` in a versioned envelope `{ app, version, savedAt, state }`. Loading validates and repairs every field, de-duplicates the XP ledger, runs migrations, and on corrupt data keeps a backup and starts fresh with a message. Tabs stay in sync via the `storage` event. Export/import is a JSON file; reset requires typing RESET. Nothing is sent anywhere — and progress does not follow you to another browser or device unless you export it.

### AI
Coded deliberately ships **no AI dependency**: the deterministic evaluator and explainer are faster, offline and can't invent what your code did. An optional, user-initiated local model (e.g. Transformers.js) could later add flexible grading or conversational hints, clearly separated from deterministic results.

## Adding content
See [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md). Add a concept to `src/content/ids.ts` and the matching track file, then run `npm test` — it checks the schema, the knowledge-graph links and that the grader agrees with your sample answers.

## License
Code: MIT. Fonts: Inter, SIL Open Font License 1.1 (`public/fonts/LICENSE.txt`).
