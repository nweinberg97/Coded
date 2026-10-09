# Writing Coded concept cards

Every concept lives in `src/content/concepts/<track>.ts` as plain data (`Concept`
in `src/content/types.ts`). UI components never contain concept text.

## Voice

- The reader is a smart adult with zero programming background (a founder, PM,
  designer, marketer). Never condescend; never assume jargon.
- Plain English first, precision second. No circular definitions
  ("authentication is the process of authenticating").
- Use concrete, technically accurate examples (real-looking URLs, real HTTP
  methods, real status codes, real-looking code snippets).
- Distinguish confusable pairs in `misconception` (internet vs web, auth vs
  authorization, language vs framework, database vs DBMS, git vs GitHub…).
- Keep `definition` to one sentence; `plainEnglish` 2–4 sentences.

## Recall questions & grading

The evaluator (`src/engine/evaluate.ts`) is offline and deterministic:

1. Normalizes text (lowercase, punctuation, contractions), drops stop words.
2. If any `wrongIdeas` term appears → incorrect with that feedback.
3. If any `acceptedAnswers` phrase appears in the answer → correct.
4. Counts `keyIdeas` hit (an idea is hit when ANY of its `terms` appears).
   ≥ `minKeyIdeas` (default: all) → correct; ≥1 → partial; 0 → incorrect.
5. Words match on a light stem / shared prefix ≥5 chars, so `communicate`
   also catches `communication`, `communicating`. Multi‑word terms are phrases
   (one extra word allowed between phrase words). Hits preceded by a negator
   (not, no, never, doesn't…) within 3 words are ignored.

Write questions that have a gradeable core idea — "What does an API let two
programs do?" not "Tell me about APIs." Give each key idea many synonyms (5–12
terms), because learners phrase things in wildly different ways. Prefer 1–3 key
ideas; use `minKeyIdeas` to accept answers that capture most of them.

`testAnswers` are run by `npm test`. Include ≥2 `correct` paraphrases a real
learner would type (casual, short, imperfect), ≥1 `incorrect` (a plausible
misunderstanding), and a `partial` when the card has ≥2 key ideas.

## Gold-standard example

```ts
{
  id: 'api',
  term: 'API',
  trackId: 'apis',
  difficulty: 2,
  definition:
    'An API (Application Programming Interface) is a defined set of requests one program can send to another, and the responses it promises to give back.',
  plainEnglish:
    'An API is how two pieces of software talk to each other without needing to know how the other works inside. One program asks for something in an agreed format, and the other answers in an agreed format.',
  analogy:
    'A restaurant menu: you order from a fixed list in a known format, the kitchen does the work out of sight, and a dish comes back. You never walk into the kitchen.',
  example:
    'A weather app sends GET https://api.weather.example/v1/forecast?city=Vancouver and gets back JSON like {"temp": 14, "sky": "rain"}. The app never touches the weather service’s database directly.',
  whyItMatters:
    'Almost every modern product is stitched together with APIs — payments (Stripe), maps, login with Google, AI models. When engineers say "we can integrate with that", they usually mean "it has an API".',
  misconception:
    'An API is not a website or a database. It is the contract (what you can ask for and what you will get back) — the thing behind it could be anything.',
  question: 'What does an API allow two pieces of software to do?',
  canonicalAnswer:
    'It lets two programs communicate — one sends a request in an agreed format and the other sends back a response.',
  acceptedAnswers: [
    'two applications communicate',
    'programs talk to each other',
    'software communicate with other software',
  ],
  keyIdeas: [
    {
      id: 'communicate',
      label: 'two programs communicating',
      terms: ['communicate', 'talk', 'interact', 'exchange data', 'exchange information',
        'send requests', 'request', 'share data', 'connect', 'integrate', 'interface between'],
    },
  ],
  wrongIdeas: [
    { terms: ['store data', 'stores data', 'database'],
      feedback: 'That sounds more like a database. An API is the way programs ask each other for things — the data may live elsewhere.' },
  ],
  hint: 'Think about a menu between a customer and a kitchen. What happens across it?',
  relatedConceptIds: ['api-endpoint', 'http', 'json', 'request', 'response', 'sdk'],
  prerequisiteIds: ['request', 'response'],
  deepDive:
    'Most web APIs are HTTP APIs: you call an endpoint (a URL) with a method (GET, POST…), maybe a body, and receive a status code and usually JSON. Libraries, operating systems and hardware also have APIs — the same idea, a published contract between components.',
  challengeId: 'api-inspector',
  testAnswers: {
    correct: [
      'A way for two applications to communicate',
      'lets programs talk to each other',
      'exchange data between two apps',
    ],
    incorrect: ['it stores the data for an app', 'a programming language'],
  },
}
```

`challengeId` must be one of the Build challenges: `first-webpage`,
`make-it-beautiful`, `button-counter`, `score-tracker`, `data-transform`,
`api-inspector`, `mini-database`, `ship-app` (only where it truly fits).
