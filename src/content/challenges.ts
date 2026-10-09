// The Build curriculum ("Drops"). Each challenge is data: starter code,
// deterministic completion checks, and an explanation model whose patterns
// are matched against the learner's ACTUAL code.

import type { RunResult, Value } from '../engine/tinysql';

export type RuntimeStep =
  | { op: 'exists'; sel: string; min?: number }
  | { op: 'count'; sel: string; cmp: '>=' | '==' | '>'; n: number }
  | { op: 'text'; sel: string; re: string; flags?: string; negate?: boolean; all?: boolean }
  | { op: 'everyText'; sel: string; re: string; flags?: string }
  | { op: 'numbers'; sel: string; max?: number }
  | { op: 'style'; sel: string; prop: string; notEquals?: string; equals?: string; minPx?: number }
  | { op: 'click'; sel: string; times?: number }
  | { op: 'input'; sel: string; value: string }
  | { op: 'value'; sel: string; equals: string }
  | { op: 'key'; sel: string; key: string }
  | { op: 'snapshot'; sel: string; as: string; count?: boolean }
  | { op: 'unchanged'; sel: string; as: string; count?: boolean }
  | { op: 'wait'; ms: number };

type CheckBase = { id: string; label: string; hint: string };
export type SourceCheck = CheckBase & { kind: 'source'; test: (code: string) => boolean };
export type RuntimeCheck = CheckBase & { kind: 'runtime'; steps: RuntimeStep[]; fault?: number };
export type SqlCheck = CheckBase & { kind: 'sql'; test: (r: RunResult) => boolean };
export type Check = SourceCheck | RuntimeCheck | SqlCheck;

export type CodePattern = {
  re: RegExp;
  explain: (m: RegExpExecArray) => string;
  conceptId?: string;
};

export type Challenge = {
  id: string;
  number: number;
  title: string;
  tagline: string;
  /** Colorway for the drop card, GOAT-style */
  colorway: [string, string];
  unlockLevel: number;
  xp: number;
  mode: 'web' | 'sql';
  fileName: string;
  conceptIds: string[];
  goal: string;
  why: string;
  steps: string[];
  hints: string[];
  starter: string;
  checks: Check[];
  flow: { title: string; steps: string[] };
  patterns: CodePattern[];
  tryNext: string[];
  /** Shown honestly next to simulated systems. */
  simulationNote?: string;
};

const count = (code: string, re: RegExp) => (code.match(re) ?? []).length;
const stripComments = (code: string) =>
  code.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

export const CHALLENGES: Challenge[] = [
  {
    id: 'first-webpage',
    number: 1,
    title: 'Your first webpage',
    tagline: 'Write HTML. Watch a page appear.',
    colorway: ['#FF5A1F', '#FFB800'],
    unlockLevel: 1,
    xp: 40,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['html', 'browser', 'dom', 'rendering'],
    goal: 'Turn a two-line page into your own page with a heading, two paragraphs and a list.',
    why: 'Every website you have ever visited is, underneath, a text file of HTML tags like these. The browser reads the tags and builds the page.',
    steps: [
      'Change the text inside <h1>…</h1> to your name or your brand.',
      'Add a second paragraph: <p>Something about you</p>.',
      'Add a list with at least three items: <ul> with three <li> inside.',
      'Press Run to see it, then Ship it to check your work.',
    ],
    hints: [
      'Tags come in pairs: <p> opens a paragraph and </p> closes it. The text goes between them.',
      'A list looks like:\n<ul>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ul>',
    ],
    starter: `<h1>Hello, world</h1>
<p>This is my first webpage.</p>

<!-- 👇 Your turn: add a second paragraph and a list below -->
`,
    checks: [
      { id: 'h1', kind: 'runtime', label: 'The heading says something new', hint: 'Edit the words between <h1> and </h1>.', steps: [{ op: 'text', sel: 'h1', re: '^Hello, world$', negate: true }] },
      { id: 'p2', kind: 'runtime', label: 'There are at least 2 paragraphs', hint: 'Add another <p>…</p> line.', steps: [{ op: 'count', sel: 'p', cmp: '>=', n: 2 }] },
      { id: 'ul', kind: 'runtime', label: 'A list with 3+ items exists', hint: 'Wrap three <li> items inside <ul> … </ul>.', steps: [{ op: 'count', sel: 'ul li', cmp: '>=', n: 3 }] },
    ],
    flow: {
      title: 'From text file to pixels',
      steps: ['You write tags in a text file', 'The browser parses the HTML', 'It builds the DOM — a tree of elements', 'It lays out and paints pixels'],
    },
    patterns: [
      { re: /<h1>(.*?)<\/h1>/g, explain: (m) => `<h1> makes the page’s main heading. The browser shows “${m[1].trim() || '(empty)'}” in big bold text.`, conceptId: 'html' },
      { re: /<p>(.*?)<\/p>/g, explain: (m) => `<p> makes a paragraph: “${m[1].trim().slice(0, 40)}”.`, conceptId: 'html' },
      { re: /<ul>/g, explain: () => '<ul> starts an unordered (bulleted) list — a parent element that holds <li> children.', conceptId: 'dom' },
      { re: /<li>(.*?)<\/li>/g, explain: (m) => `<li> is one list item: “${m[1].trim().slice(0, 40)}”. It becomes a child node of the list in the DOM.`, conceptId: 'dom' },
      { re: /<!--/g, explain: () => '<!-- … --> is a comment: notes for humans that the browser ignores.' },
    ],
    tryNext: [
      'Change <ul> to <ol> — what happens to the bullets?',
      'Add <a href="#">a link</a> or <strong>bold text</strong> inside a paragraph.',
      'Delete a closing tag like </p> and run it. Browsers are forgiving — see how it guesses.',
    ],
  },
  {
    id: 'make-it-beautiful',
    number: 2,
    title: 'Make it beautiful',
    tagline: 'CSS turns structure into style.',
    colorway: ['#3D8BFF', '#22D3EE'],
    unlockLevel: 1,
    xp: 40,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['css', 'html', 'rendering', 'responsive-design'],
    goal: 'Restyle a plain product card so it looks like a premium sneaker drop.',
    why: 'HTML says what things ARE; CSS says how they LOOK. Designers and engineers meet right here.',
    steps: [
      'Give the h1 heading a new color (try #ff5a1f or any color name).',
      'Give .card a padding of at least 24px so the content can breathe.',
      'Round the .btn corners with border-radius of 12px or more.',
      'Change the page background on body.',
    ],
    hints: [
      'A CSS rule is selector { property: value; }. The selector picks elements; the declarations style them.',
      'Try: .card { padding: 24px; }  and  .btn { border-radius: 999px; }',
    ],
    starter: `<style>
  body {
    background: #f4f4f4;
    font-family: system-ui, sans-serif;
  }
  .card {
    background: white;
    padding: 8px;
    border-radius: 4px;
    max-width: 320px;
  }
  h1 {
    color: black;
    font-size: 28px;
  }
  .btn {
    background: #333;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 0px;
  }
</style>

<div class="card">
  <h1>Air Byte 1 “Volt”</h1>
  <p>Limited drop · 500 pairs</p>
  <button class="btn">Add to cart</button>
</div>
`,
    checks: [
      { id: 'color', kind: 'runtime', label: 'The heading has a new color', hint: 'Change color: black inside the h1 rule.', steps: [{ op: 'style', sel: 'h1', prop: 'color', notEquals: 'rgb(0, 0, 0)' }] },
      { id: 'padding', kind: 'runtime', label: 'The card has 24px+ padding', hint: 'In .card, set padding: 24px;', steps: [{ op: 'style', sel: '.card', prop: 'padding-top', minPx: 24 }] },
      { id: 'radius', kind: 'runtime', label: 'The button corners are rounded (12px+)', hint: 'In .btn, set border-radius: 12px; or more.', steps: [{ op: 'style', sel: '.btn', prop: 'border-top-left-radius', minPx: 12 }] },
      { id: 'bg', kind: 'runtime', label: 'The page background changed', hint: 'In body, change background: #f4f4f4 to another color.', steps: [{ op: 'style', sel: 'body', prop: 'background-color', notEquals: 'rgb(244, 244, 244)' }] },
    ],
    flow: {
      title: 'How a style reaches the screen',
      steps: ['The browser reads each CSS rule', 'The selector finds matching elements', 'Declarations set properties on them', 'Layout + paint redraws the page'],
    },
    patterns: [
      { re: /^\s*([.#]?[a-zA-Z][\w-]*)\s*\{/gm, explain: (m) => `The selector ${m[1]} ${m[1].startsWith('.') ? `targets every element with class="${m[1].slice(1)}"` : m[1].startsWith('#') ? `targets the element with id="${m[1].slice(1)}"` : `targets every <${m[1]}> element`}.`, conceptId: 'css' },
      { re: /color:\s*([^;]+);/g, explain: (m) => `color: ${m[1].trim()} sets the text color.`, conceptId: 'css' },
      { re: /padding:\s*([^;]+);/g, explain: (m) => `padding: ${m[1].trim()} adds space INSIDE the element’s border.`, conceptId: 'css' },
      { re: /border-radius:\s*([^;]+);/g, explain: (m) => `border-radius: ${m[1].trim()} rounds the corners.`, conceptId: 'css' },
      { re: /background:\s*([^;]+);/g, explain: (m) => `background: ${m[1].trim()} paints behind the element’s content.`, conceptId: 'css' },
    ],
    tryNext: [
      'Add .card { box-shadow: 0 12px 32px rgba(0,0,0,.15); } for depth.',
      'Add .btn:hover { transform: scale(1.05); } and hover the button.',
      'Change max-width: 320px to 100% and resize your window — that’s the root of responsive design.',
    ],
  },
  {
    id: 'button-counter',
    number: 3,
    title: 'Make a button work',
    tagline: 'Events, variables and the DOM — together.',
    colorway: ['#2BD97C', '#0F766E'],
    unlockLevel: 2,
    xp: 50,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['javascript', 'event', 'event-handler', 'variable', 'function', 'dom', 'state'],
    goal: 'Make the button count how many times it has been clicked.',
    why: 'This tiny loop — event → code runs → data changes → screen updates — is how every interactive app works, from Spotify’s play button to checkout.',
    steps: [
      'Inside the click handler, add 1 to count: count = count + 1;',
      'Then update the button text: button.textContent = `Clicked ${count} times`;',
      'Run it and click the button in the preview.',
      'Ship it — the checker will click it 3 times and read the label.',
    ],
    hints: [
      'The handler is the arrow function () => { … }. Everything between its braces runs on every click.',
      'Full answer:\n  count = count + 1;\n  button.textContent = `Clicked ${count} times`;',
    ],
    starter: `<button id="counter">Clicked 0 times</button>

<script>
  let count = 0;
  const button = document.getElementById("counter");

  button.addEventListener("click", () => {
    // TODO: add 1 to count, then show the new count on the button.
  });
</script>
`,
    checks: [
      { id: 'listener', kind: 'source', label: 'A click listener is registered', hint: 'Keep the addEventListener("click", …) line.', test: (c) => /addEventListener\(\s*["'`]click["'`]/.test(stripComments(c)) },
      { id: 'counts', kind: 'runtime', label: 'Three clicks show “3”', hint: 'Increase count inside the handler, then set button.textContent.', steps: [{ op: 'click', sel: '#counter', times: 3 }, { op: 'text', sel: '#counter', re: '\\b3\\b' }] },
      { id: 'label', kind: 'runtime', label: 'The label still reads “… times”', hint: 'Use a template string like `Clicked ${count} times`.', steps: [{ op: 'text', sel: '#counter', re: 'times?' }] },
    ],
    flow: {
      title: 'What happens on a click',
      steps: ['You click the button', 'The browser dispatches a “click” event', 'Your handler function runs', 'count changes in memory', 'textContent updates the DOM', 'The browser repaints the new label'],
    },
    patterns: [
      { re: /let\s+(\w+)\s*=\s*([^;\n]+);?/g, explain: (m) => `let ${m[1]} = ${m[2].trim()} creates a variable named ${m[1]} that starts at ${m[2].trim()}. Variables made with let can change later.`, conceptId: 'variable' },
      { re: /const\s+(\w+)\s*=\s*document\.getElementById\(["'](.+?)["']\)/g, explain: (m) => `const ${m[1]} = document.getElementById("${m[2]}") finds the element with id="${m[2]}" in the DOM and keeps a reference to it.`, conceptId: 'dom' },
      { re: /addEventListener\(\s*["'](\w+)["']/g, explain: (m) => `addEventListener("${m[1]}", …) tells the browser: whenever a ${m[1]} happens here, run this function.`, conceptId: 'event-handler' },
      { re: /(\w+)\s*(?:=\s*\1\s*\+\s*(\d+)|\+=\s*(\d+)|\+\+)/g, explain: (m) => `${m[0].trim()} updates ${m[1]} — it adds ${m[2] ?? m[3] ?? 1} every time this line runs.`, conceptId: 'state' },
      { re: /\.textContent\s*=\s*([^;\n]+)/g, explain: (m) => `.textContent = ${m[1].trim().slice(0, 40)} replaces the element’s text, which updates what you see.`, conceptId: 'dom' },
    ],
    tryNext: [
      'Change let count = 0 to let count = 10 — does the label still start right?',
      'Make it count by 2. Then make it count down.',
      'Delete the addEventListener line and run it. Click. Why does nothing happen?',
    ],
  },
  {
    id: 'score-tracker',
    number: 4,
    title: 'Build a score tracker',
    tagline: 'State, conditions and a reset button.',
    colorway: ['#FFB800', '#FF5A1F'],
    unlockLevel: 3,
    xp: 50,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['state', 'conditional', 'variable', 'function', 'number'],
    goal: 'Finish a score tracker: celebrate when the score hits the target, and make Reset work.',
    why: 'Apps are mostly “if this, then that” rules on top of state. A checkout unlocks free shipping above $50 the same way.',
    steps: [
      'In the +1 handler, add an if: when score reaches TARGET, put “🏆 Target hit!” into #message.',
      'Make the Reset handler set score back to 0, clear #message and call render().',
      'Run it: click +1 five times, then Reset.',
      'Ship it to check.',
    ],
    hints: [
      'An if statement:\nif (score >= TARGET) {\n  document.getElementById("message").textContent = "🏆 Target hit!";\n}',
      'Reset needs three lines: score = 0; …message…textContent = ""; render();',
    ],
    starter: `<h2>Score: <span id="score">0</span></h2>
<p id="message"></p>
<button id="plus">+1 point</button>
<button id="reset">Reset</button>

<script>
  const TARGET = 5;
  let score = 0;

  function render() {
    document.getElementById("score").textContent = score;
  }

  document.getElementById("plus").addEventListener("click", () => {
    score = score + 1;
    render();
    // TODO: if score reaches TARGET, show "🏆 Target hit!" in #message
  });

  document.getElementById("reset").addEventListener("click", () => {
    // TODO: set score back to 0, clear the message and re-render
  });
</script>
`,
    checks: [
      { id: 'five', kind: 'runtime', label: 'Five clicks → score shows 5', hint: 'The +1 handler already works — keep it.', steps: [{ op: 'click', sel: '#plus', times: 5 }, { op: 'text', sel: '#score', re: '^5$' }] },
      { id: 'win', kind: 'runtime', label: 'Hitting the target shows a message', hint: 'Use if (score >= TARGET) { … } to set #message text.', steps: [{ op: 'text', sel: '#message', re: '\\S' }] },
      { id: 'reset', kind: 'runtime', label: 'Reset puts the score back to 0', hint: 'In the reset handler: score = 0; render();', steps: [{ op: 'click', sel: '#reset' }, { op: 'text', sel: '#score', re: '^0$' }] },
      { id: 'clear', kind: 'runtime', label: 'Reset clears the message', hint: 'Set the message’s textContent to "" in reset.', steps: [{ op: 'text', sel: '#message', re: '^$' }] },
      { id: 'if', kind: 'source', label: 'Uses an if statement', hint: 'The celebration should only happen when a condition is true.', test: (c) => /\bif\s*\(/.test(stripComments(c)) },
    ],
    flow: {
      title: 'State drives the screen',
      steps: ['Click +1', 'Handler updates score (state)', 'render() copies state into the DOM', 'if checks score against TARGET', 'Message appears when the condition is true'],
    },
    patterns: [
      { re: /const\s+(\w+)\s*=\s*(\d+)/g, explain: (m) => `const ${m[1]} = ${m[2]} is a constant — a named value (${m[2]}) that never changes.`, conceptId: 'constant' },
      { re: /let\s+(\w+)\s*=\s*(\d+)/g, explain: (m) => `let ${m[1]} = ${m[2]} is the app’s state: the one number everything else depends on.`, conceptId: 'state' },
      { re: /function\s+(\w+)\s*\(/g, explain: (m) => `function ${m[1]}() packages reusable steps. Calling ${m[1]}() runs them again whenever state changes.`, conceptId: 'function' },
      { re: /if\s*\(([^)]+)\)/g, explain: (m) => `if (${m[1].trim()}) only runs the block below when that condition is true.`, conceptId: 'conditional' },
      { re: /(\w+)\s*=\s*0\s*;/g, explain: (m) => `${m[1]} = 0 resets the state — then the screen must be re-rendered to match.`, conceptId: 'state' },
    ],
    tryNext: [
      'Change TARGET to 3. Notice you only had to change one line.',
      'Add a −1 button. What should happen below zero?',
      'Disable the +1 button once the target is hit (button.disabled = true).',
    ],
  },
  {
    id: 'data-transform',
    number: 5,
    title: 'Transform a list of data',
    tagline: 'Arrays, objects, loops and filter.',
    colorway: ['#B57BFF', '#FF5AA8'],
    unlockLevel: 3,
    xp: 60,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['array', 'object', 'loop', 'iteration', 'function', 'number'],
    goal: 'Show only the sneakers under $200, plus a live summary of how many there are.',
    why: 'Most screens in most apps are a list of data run through a filter and a loop — search results, your inbox, a playlist.',
    steps: [
      'Add one more sneaker object to the array — copy a line and change the values.',
      'Replace `const affordable = sneakers;` with a filter: sneakers.filter((s) => s.price < 200)',
      'Set the summary text to something like `${affordable.length} drops`.',
      'Run, then Ship.',
    ],
    hints: [
      'filter keeps the items for which your function returns true:\nconst affordable = sneakers.filter((shoe) => shoe.price < 200);',
      'The array has a .length property: affordable.length is how many items it holds.',
    ],
    starter: `<h2>Drops under $200</h2>
<ul id="list"></ul>
<p id="summary"></p>

<script>
  const sneakers = [
    { name: "Air Byte 1", price: 120, brand: "Byteline" },
    { name: "Async Runner", price: 240, brand: "Stackwear" },
    { name: "Boolean Low", price: 95, brand: "Byteline" },
    { name: "Callback Hi", price: 310, brand: "Loopco" },
    { name: "Loop Racer", price: 180, brand: "Stackwear" },
  ];

  // TODO 1: add one more sneaker object to the array above.

  // TODO 2: keep only sneakers cheaper than 200.
  const affordable = sneakers; // ← use sneakers.filter(...)

  // Turn each object into a list item.
  for (const shoe of affordable) {
    const li = document.createElement("li");
    li.textContent = shoe.name + " — $" + shoe.price;
    document.getElementById("list").appendChild(li);
  }

  // TODO 3: show how many there are, e.g. "3 drops"
  document.getElementById("summary").textContent = "";
</script>
`,
    checks: [
      { id: 'six', kind: 'source', label: 'The array has 6+ sneakers', hint: 'Add another { name: …, price: …, brand: … }, line.', test: (c) => count(stripComments(c), /\bname\s*:/g) >= 6 },
      { id: 'filter', kind: 'source', label: 'Uses .filter()', hint: 'sneakers.filter((s) => s.price < 200)', test: (c) => /\.filter\s*\(/.test(stripComments(c)) },
      { id: 'under', kind: 'runtime', label: 'Every listed price is under $200', hint: 'Your filter should keep only price < 200.', steps: [{ op: 'numbers', sel: '#list li', max: 200 }] },
      { id: 'some', kind: 'runtime', label: 'At least 3 drops are listed', hint: 'Make sure the loop uses the filtered array.', steps: [{ op: 'count', sel: '#list li', cmp: '>=', n: 3 }] },
      { id: 'summary', kind: 'runtime', label: 'Summary says how many', hint: 'Set #summary text to `${affordable.length} drops`.', steps: [{ op: 'text', sel: '#summary', re: '\\d+\\s*(drops?|sneakers?|items?|pairs?)' }] },
    ],
    flow: {
      title: 'Data in, interface out',
      steps: ['An array holds objects', 'filter() keeps the ones that pass a test', 'A loop visits each remaining object', 'Each one becomes an <li> in the DOM', '.length summarizes the result'],
    },
    patterns: [
      { re: /const\s+(\w+)\s*=\s*\[/g, explain: (m) => `const ${m[1]} = [ … ] is an array — an ordered list of values.`, conceptId: 'array' },
      { re: /\{\s*name:\s*"([^"]+)",\s*price:\s*(\d+)/g, explain: (m) => `{ name: "${m[1]}", price: ${m[2]} } is an object: labeled values that describe one sneaker.`, conceptId: 'object' },
      { re: /\.filter\s*\(\s*\(?(\w+)\)?\s*=>\s*([^)]+)\)/g, explain: (m) => `.filter(${m[1]} => ${m[2].trim()}) runs that test on every item and keeps only the ones where it’s true.`, conceptId: 'function' },
      { re: /for\s*\(\s*const\s+(\w+)\s+of\s+(\w+)\s*\)/g, explain: (m) => `for (const ${m[1]} of ${m[2]}) is a loop: the code inside runs once per item in ${m[2]}.`, conceptId: 'loop' },
      { re: /(\w+)\.length/g, explain: (m) => `${m[1]}.length is how many items ${m[1]} holds right now.`, conceptId: 'array' },
    ],
    tryNext: [
      'Sort cheapest first: affordable.sort((a, b) => a.price - b.price)',
      'Filter by brand instead: s.brand === "Byteline"',
      'Use .map() to build the text for each item, then join them.',
    ],
  },
  {
    id: 'api-inspector',
    number: 6,
    title: 'Understand an API',
    tagline: 'Request → response → JSON → screen.',
    colorway: ['#FF4D6A', '#B57BFF'],
    unlockLevel: 4,
    xp: 70,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['api', 'http-get', 'status-code', 'json', 'request', 'response', 'promise', 'asynchronous-programming'],
    goal: 'Fetch drops from a (simulated) API, show prices, and handle an error response gracefully.',
    why: 'Almost every app screen is loaded this way: ask a server for JSON, wait, then render. And servers fail — good apps handle it.',
    steps: [
      'Server side: add a 4th drop object to the JSON body.',
      'Client side: show the price too — e.g. drop.name + " — $" + drop.price.',
      'Handle failure: if (!response.ok), show “Couldn’t load drops” in #status and stop.',
      'Try it: change status: 200 to 404 on the server and Run. Then change it back and Ship.',
    ],
    hints: [
      'response.ok is true for 2xx statuses. Inside the first .then:\nif (!response.ok) {\n  document.getElementById("status").textContent = "Couldn’t load drops";\n  return [];\n}',
      'Returning [] (an empty array) means the next .then loops over nothing instead of crashing.',
    ],
    starter: `<h2>Today's Drops</h2>
<p id="status">Loading…</p>
<ul id="drops"></ul>

<script>
  // ── THE SERVER (simulated inside this sandbox — no real internet) ──
  mockServer.route("GET", "/api/drops", () => ({
    status: 200,
    body: [
      { "id": 1, "name": "Air Byte 1", "price": 120 },
      { "id": 2, "name": "Async Runner", "price": 240 },
      { "id": 3, "name": "Boolean Low", "price": 95 }
    ]
  }));

  // ── THE CLIENT (your app) ──
  fetch("/api/drops")
    .then((response) => {
      document.getElementById("status").textContent =
        "Status " + response.status;
      // TODO 3: if (!response.ok) show "Couldn't load drops" and stop
      return response.json();
    })
    .then((drops) => {
      for (const drop of drops) {
        const li = document.createElement("li");
        li.textContent = drop.name; // TODO 2: also show the price
        document.getElementById("drops").appendChild(li);
      }
    });
</script>
`,
    checks: [
      { id: 'four', kind: 'runtime', label: 'The API returns 4+ drops', hint: 'Add another object inside the body: [ … ] array.', steps: [{ op: 'wait', ms: 450 }, { op: 'count', sel: '#drops li', cmp: '>=', n: 4 }] },
      { id: 'price', kind: 'runtime', label: 'Each drop shows its price', hint: 'li.textContent = drop.name + " — $" + drop.price;', steps: [{ op: 'wait', ms: 450 }, { op: 'everyText', sel: '#drops li', re: '\\$\\s?\\d+' }] },
      { id: 'ok', kind: 'source', label: 'Checks response.ok (or the status)', hint: 'if (!response.ok) { … }', test: (c) => /response\.(ok|status\s*(!==?|===?|>=?|<=?))/.test(stripComments(c).replace(/"Status " \+ response\.status/g, '')) },
      { id: 'fault', kind: 'runtime', fault: 404, label: 'A 404 shows a friendly error', hint: 'When !response.ok, put a message like “Couldn’t load drops” in #status.', steps: [{ op: 'wait', ms: 450 }, { op: 'text', sel: '#status', re: "couldn|could not|can.?t|error|fail|wrong|unavailable|not found|oops|try again" }] },
    ],
    flow: {
      title: 'The life of an API call',
      steps: ['fetch() sends a GET request to /api/drops', 'The server matches the route and builds a response', 'A status code + JSON body travel back', 'response.json() parses JSON into real objects', 'Your loop turns them into list items'],
    },
    patterns: [
      { re: /mockServer\.route\(\s*"(\w+)",\s*"([^"]+)"/g, explain: (m) => `The (simulated) server answers ${m[1]} requests to ${m[2]} — this is an API endpoint.`, conceptId: 'api-endpoint' },
      { re: /status:\s*(\d{3})/g, explain: (m) => `status: ${m[1]} is the status code. ${Number(m[1]) < 300 ? '2xx means success.' : Number(m[1]) < 500 ? '4xx means the request was the problem (404 = not found).' : '5xx means the server failed.'}`, conceptId: 'status-code' },
      { re: /fetch\(\s*"([^"]+)"/g, explain: (m) => `fetch("${m[1]}") sends an HTTP request and returns a Promise — a placeholder for a response that arrives later.`, conceptId: 'promise' },
      { re: /response\.json\(\)/g, explain: () => 'response.json() reads the body text and parses the JSON into JavaScript objects.', conceptId: 'json' },
      { re: /!response\.ok/g, explain: () => '!response.ok catches any non-2xx status so the app can show an error instead of crashing.', conceptId: 'status-code' },
    ],
    tryNext: [
      'Change status to 500 — what should a user see?',
      'Add a second route: mockServer.route("GET", "/api/drops/1", …) and fetch one drop.',
      'Make the JSON invalid (delete a comma) and watch where it breaks.',
    ],
    simulationNote:
      'The “server” here is simulated inside the sandbox by mockServer. Real requests are blocked by the sandbox’s security policy, so this works offline and never touches the internet. A real API would run on another computer.',
  },
  {
    id: 'mini-database',
    number: 7,
    title: 'Build a mini database',
    tagline: 'Real SQL. Create, read, update, delete.',
    colorway: ['#22D3EE', '#3D8BFF'],
    unlockLevel: 5,
    xp: 70,
    mode: 'sql',
    fileName: 'store.sql',
    conceptIds: ['database', 'table', 'row', 'sql', 'query', 'primary-key', 'crud'],
    goal: 'Run all four CRUD operations on a sneaker store table with real SQL syntax.',
    why: 'Behind every “Saved!” message is usually one of these four statements. Reading SQL lets you understand — and question — what an app does with data.',
    steps: [
      'Create: INSERT a 5th sneaker with id 5.',
      'Read: SELECT name, price of sneakers with price < 200, ORDER BY price.',
      'Update: set in_stock = TRUE for the sneaker with id 3.',
      'Delete: remove the sneaker with id 4.',
    ],
    hints: [
      "INSERT INTO sneakers (id, name, brand, price, in_stock) VALUES (5, 'Loop Racer', 'Stackwear', 180, TRUE);",
      'SELECT name, price FROM sneakers WHERE price < 200 ORDER BY price;\nUPDATE sneakers SET in_stock = TRUE WHERE id = 3;\nDELETE FROM sneakers WHERE id = 4;',
    ],
    starter: `-- 👟 A tiny sneaker store (TinySQL — an in-browser teaching simulator)
CREATE TABLE sneakers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  brand TEXT,
  price INTEGER,
  in_stock BOOLEAN
);

INSERT INTO sneakers (id, name, brand, price, in_stock) VALUES
  (1, 'Air Byte 1', 'Byteline', 120, TRUE),
  (2, 'Async Runner', 'Stackwear', 240, TRUE),
  (3, 'Boolean Low', 'Byteline', 95, FALSE),
  (4, 'Callback Hi', 'Loopco', 310, TRUE);

-- TODO 1 (Create): add a 5th sneaker with id 5

-- TODO 2 (Read): name + price of sneakers under 200, cheapest first
SELECT * FROM sneakers;

-- TODO 3 (Update): mark Boolean Low (id 3) as back in stock

-- TODO 4 (Delete): remove the sneaker with id 4
`,
    checks: [
      { id: 'noerr', kind: 'sql', label: 'Every statement runs without errors', hint: 'Read the red error message — it names the line and often suggests a fix.', test: (r) => !r.error },
      { id: 'create', kind: 'sql', label: 'Create: a row with id 5 exists', hint: 'INSERT INTO sneakers (…) VALUES (5, …);', test: (r) => !!sneakersRows(r).find((x) => x.id === 5) },
      { id: 'read', kind: 'sql', label: 'Read: name + price under 200, cheapest first', hint: 'SELECT name, price FROM sneakers WHERE price < 200 ORDER BY price;', test: (r) => r.results.some(isGoodRead) },
      { id: 'update', kind: 'sql', label: 'Update: id 3 is in stock', hint: 'UPDATE sneakers SET in_stock = TRUE WHERE id = 3;', test: (r) => sneakersRows(r).find((x) => x.id === 3)?.in_stock === true },
      { id: 'delete', kind: 'sql', label: 'Delete: id 4 is gone (and nothing else)', hint: 'DELETE FROM sneakers WHERE id = 4;  — without WHERE it deletes everything!', test: (r) => { const rows = sneakersRows(r); return rows.length >= 3 && !rows.find((x) => x.id === 4) && !!rows.find((x) => x.id === 1); } },
    ],
    flow: {
      title: 'What a query does',
      steps: ['The database parses your SQL', 'It finds the table', 'It checks each row against WHERE', 'It sorts and limits', 'It returns (or changes) the matching rows'],
    },
    patterns: [
      { re: /CREATE TABLE (\w+)/gi, explain: (m) => `CREATE TABLE ${m[1]} defines a table: named columns, each with a type.`, conceptId: 'table' },
      { re: /PRIMARY KEY/gi, explain: () => 'PRIMARY KEY marks the column that uniquely identifies each row — two rows can’t share an id.', conceptId: 'primary-key' },
      { re: /INSERT INTO (\w+)/gi, explain: (m) => `INSERT INTO ${m[1]} is the C in CRUD — it creates new rows.`, conceptId: 'crud' },
      { re: /SELECT (.+?) FROM (\w+)/gi, explain: (m) => `SELECT ${m[1]} FROM ${m[2]} is the R in CRUD — it reads data without changing it.`, conceptId: 'query' },
      { re: /UPDATE (\w+) SET/gi, explain: (m) => `UPDATE ${m[1]} SET … is the U in CRUD — it changes existing rows that match WHERE.`, conceptId: 'crud' },
      { re: /DELETE FROM (\w+)/gi, explain: (m) => `DELETE FROM ${m[1]} is the D in CRUD — it removes the rows that match WHERE.`, conceptId: 'crud' },
      { re: /WHERE ([^;\n]+)/gi, explain: (m) => `WHERE ${m[1].trim()} is the filter: only rows where this is true are affected.`, conceptId: 'query' },
    ],
    tryNext: [
      'Insert a row with id 1 again. Read the error — that’s the primary key protecting you.',
      'Try SELECT COUNT(*) FROM sneakers WHERE in_stock = TRUE;',
      'Run DELETE FROM sneakers; with no WHERE (then Reset). Now you know why engineers fear it.',
    ],
    simulationNote:
      'TinySQL is a small teaching interpreter that runs in your browser’s memory. It speaks a real subset of SQL, but it is not a production database: no joins, indexes, transactions, concurrency or durability, and the data resets each run. Real databases like PostgreSQL or SQLite store data on disk and guarantee much more.',
  },
  {
    id: 'ship-app',
    number: 8,
    title: 'Ship a mini app',
    tagline: 'State, render, events, validation. Shipped.',
    colorway: ['#E5E5E0', '#FF5A1F'],
    unlockLevel: 6,
    xp: 100,
    mode: 'web',
    fileName: 'index.html',
    conceptIds: ['state', 'event-handler', 'form-validation', 'function', 'array', 'input-sanitization', 'separation-of-concerns'],
    goal: 'Finish a “grail list” app: add items, validate empty input, show a live count, and clear the box.',
    why: 'This is the architecture of real apps in miniature: state holds the truth, render() draws it, events change it, and validation protects it.',
    steps: [
      'In addItem: if value is empty, put “Type something first” in #error and return.',
      'In render: update #count, e.g. `${items.length} items`.',
      'After adding: clear the input (input.value = "") and the error text.',
      'Run it, use it, then Ship — the checker will use your app like a real user.',
    ],
    hints: [
      'Validation:\nif (value === "") {\n  document.getElementById("error").textContent = "Type something first";\n  return;\n}',
      'Count: document.getElementById("count").textContent = items.length + " items";\nClear: input.value = ""; document.getElementById("error").textContent = "";',
    ],
    starter: `<style>
  body { font-family: system-ui, sans-serif; max-width: 360px; }
  .row { display: flex; gap: 8px; }
  input { flex: 1; padding: 8px; }
  #error { color: #d33; min-height: 1.2em; }
  li { padding: 4px 0; }
</style>

<h2>My Grail List</h2>
<div class="row">
  <input id="item" placeholder="e.g. Air Byte 1 Volt" />
  <button id="add">Add</button>
</div>
<p id="error"></p>
<ul id="list"></ul>
<p id="count">0 items</p>

<script>
  // STATE: the single source of truth
  const items = [];

  // RENDER: turn state into what's on screen
  function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    for (const item of items) {
      const li = document.createElement("li");
      li.textContent = item; // textContent (not innerHTML) = safe from injected HTML
      list.appendChild(li);
    }
    // TODO 2: update #count, e.g. "3 items"
  }

  // EVENT → update state → render
  function addItem() {
    const input = document.getElementById("item");
    const value = input.value.trim();
    // TODO 1: if value is empty, show "Type something first" in #error and stop (return)
    items.push(value);
    // TODO 3: clear the input and the error message
    render();
  }

  document.getElementById("add").addEventListener("click", addItem);
  document.getElementById("item").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
  });
</script>
`,
    checks: [
      { id: 'add', kind: 'runtime', label: 'Adding an item shows it in the list', hint: 'items.push(value) then render() — already in the starter.', steps: [{ op: 'input', sel: '#item', value: 'Air Byte 1' }, { op: 'click', sel: '#add' }, { op: 'count', sel: '#list li', cmp: '==', n: 1 }, { op: 'text', sel: '#list li', re: 'Air Byte 1' }] },
      { id: 'count', kind: 'runtime', label: 'The count updates (“1 item”)', hint: 'Set #count text in render() using items.length.', steps: [{ op: 'text', sel: '#count', re: '^1 items?$' }] },
      { id: 'clear', kind: 'runtime', label: 'The input clears after adding', hint: 'input.value = "";', steps: [{ op: 'value', sel: '#item', equals: '' }] },
      { id: 'empty', kind: 'runtime', label: 'Empty input is rejected with a message', hint: 'Check if value === "" → show #error text and return before pushing.', steps: [{ op: 'snapshot', sel: '#list li', as: 'n', count: true }, { op: 'input', sel: '#item', value: '   ' }, { op: 'click', sel: '#add' }, { op: 'unchanged', sel: '#list li', as: 'n', count: true }, { op: 'text', sel: '#error', re: '\\S' }] },
      { id: 'enter', kind: 'runtime', label: 'Pressing Enter adds too', hint: 'The keydown listener calls addItem when e.key === "Enter".', steps: [{ op: 'input', sel: '#item', value: 'Loop Racer' }, { op: 'key', sel: '#item', key: 'Enter' }, { op: 'count', sel: '#list li', cmp: '==', n: 2 }] },
      { id: 'errclear', kind: 'runtime', label: 'The error clears after a valid add', hint: 'Set #error textContent to "" after a successful add.', steps: [{ op: 'text', sel: '#error', re: '^$' }] },
    ],
    flow: {
      title: 'The architecture of every app',
      steps: ['User types and presses Add (event)', 'Validation checks the input', 'State changes: items.push(value)', 'render() redraws from state', 'The screen always matches the data'],
    },
    patterns: [
      { re: /const\s+(\w+)\s*=\s*\[\s*\]/g, explain: (m) => `const ${m[1]} = [] is the app’s state — the single source of truth for what’s in the list.`, conceptId: 'state' },
      { re: /function\s+render\s*\(/g, explain: () => 'render() rebuilds the screen from state. Because everything is drawn from items, the UI can’t drift out of sync.', conceptId: 'component' },
      { re: /if\s*\(\s*(value\s*===?\s*""|!value|value\.length\s*===?\s*0)[^)]*\)/g, explain: (m) => `${m[0]} is validation: it rejects bad input before it ever reaches your state.`, conceptId: 'form-validation' },
      { re: /\.textContent\s*=\s*item/g, explain: () => 'textContent = item inserts user text as plain text, so typed HTML like <img onerror=…> can’t run — basic input sanitization.', conceptId: 'input-sanitization' },
      { re: /(\w+)\.push\(/g, explain: (m) => `${m[1]}.push(…) adds an item to the end of the array — the state change.`, conceptId: 'array' },
    ],
    tryNext: [
      'Add a ✕ button on each item that removes it (items.splice).',
      'Prevent duplicates: if (items.includes(value)) show an error.',
      'Type <b>bold</b> as an item. It shows the tags as text — try changing textContent to innerHTML and see why that’s risky.',
    ],
  },
];

export const CHALLENGE_BY_ID: Record<string, Challenge> = Object.fromEntries(CHALLENGES.map((c) => [c.id, c]));

// ---- SQL check helpers ----
type SneakerRow = { id?: Value; name?: Value; price?: Value; in_stock?: Value };
function sneakersRows(r: RunResult): SneakerRow[] {
  return (r.db.tables['sneakers']?.rows ?? []) as SneakerRow[];
}
function isGoodRead(res: RunResult['results'][number]): boolean {
  if (res.kind !== 'select' || !res.columns || !res.rows) return false;
  const cols = res.columns.map((c) => c.toLowerCase());
  const pi = cols.indexOf('price');
  if (pi === -1 || !cols.includes('name')) return false;
  if (res.rows.length < 2) return false;
  const prices = res.rows.map((r) => Number(r[pi]));
  return prices.every((p) => p < 200) && prices.every((p, i) => i === 0 || prices[i - 1] <= p);
}
