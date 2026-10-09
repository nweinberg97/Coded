import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'architecture',
    term: 'Software architecture',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'Software architecture is the high-level plan of a system: which major parts it has, what each part is responsible for, and how those parts connect and exchange data.',
    plainEnglish:
      'Before (and while) code gets written, someone decides how the system is laid out: a website here, a server there, a database behind it, a payment provider off to the side. Architecture is that big-picture map. It is less about individual lines of code and more about which boxes exist and which arrows join them.',
    analogy:
      'A building’s floor plan: it decides where the kitchen, plumbing and stairs go and how rooms connect. You can repaint a room easily; moving the stairs is a big job. Architecture decisions are the stairs.',
    example:
      'A typical web app architecture: a React frontend in the browser calls a Node.js backend at https://api.shop.example, which reads and writes a PostgreSQL database and calls Stripe’s API to take payments. Drawn on a whiteboard, that is four boxes and the arrows between them.',
    whyItMatters:
      'Architecture decides how hard everything else will be — how fast the team can add features, how the system copes with more users, and what breaks when one part fails. When engineers push back with "that would require re-architecting", they mean the change touches the boxes and arrows, not just one screen.',
    misconception:
      'Architecture is not the visual design of the app or the choice of programming language. Two apps written in different languages can share the same architecture, and two identical-looking apps can have completely different ones underneath.',
    question: 'What does a system’s architecture describe?',
    canonicalAnswer:
      'The main parts of the system and how those parts connect and work together.',
    acceptedAnswers: [
      'how the parts fit together',
      'how the pieces fit together',
      'how components connect',
      'how the system is structured',
    ],
    keyIdeas: [
      {
        id: 'parts',
        label: 'the major parts of the system',
        terms: ['parts', 'pieces', 'components', 'building blocks', 'boxes', 'modules', 'services',
          'layers', 'structure', 'blueprint', 'big picture', 'organized', 'organization'],
      },
      {
        id: 'connect',
        label: 'how those parts connect',
        terms: ['connect', 'fit together', 'work together', 'communicate', 'talk', 'interact',
          'relationship', 'link', 'flow', 'arrows', 'depend', 'together'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['how it looks', 'visual design', 'colors', 'fonts'],
        feedback: 'That is visual or UI design. Architecture is about the system’s parts behind the screen and how they connect.',
      },
    ],
    hint: 'Picture the whiteboard drawing engineers make: boxes and arrows. What do they stand for?',
    relatedConceptIds: ['monolith', 'microservices', 'service', 'module', 'separation-of-concerns',
      'frontend', 'backend', 'database', 'api'],
    prerequisiteIds: ['client', 'server', 'frontend', 'backend'],
    deepDive:
      'Common architectural styles include monoliths (one deployable app), microservices (many small services), serverless (functions run on demand by a cloud provider) and event-driven systems (parts react to messages on a queue). Good architecture is mostly about trade-offs: simplicity versus flexibility, speed of building versus ability to scale.',
    testAnswers: {
      correct: [
        'how all the parts of the app fit together',
        'the big picture of which components exist and how they talk to each other',
        'the structure of the system and how pieces connect',
      ],
      partial: ['the main pieces of the system'],
      incorrect: ['how the website looks', 'the programming language you pick'],
    },
  },
  {
    id: 'monolith',
    term: 'Monolith',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'A monolith is an application whose features all live in a single codebase and are built, deployed and run together as one unit.',
    plainEnglish:
      'In a monolith, login, checkout, search and email sending are all part of the same program. You change any part, you redeploy the whole thing. It is the default way most products start, and it is often the right choice for a small team.',
    analogy:
      'A department store under one roof: one building, one set of doors, one electricity bill. Easy to run — but renovating the shoe section means working inside the same building as everyone else.',
    example:
      'A Ruby on Rails app where `app/controllers/orders_controller.rb`, `users_controller.rb` and `payments_controller.rb` all ship together. Running `git push heroku main` deploys every feature at once, and all of them share one PostgreSQL database.',
    whyItMatters:
      'Monoliths are simpler to build, test, debug and deploy, which is why startups like Shopify and Basecamp ran on them for years. Knowing the term helps you follow debates about whether a team should "break up the monolith" — usually a costly move that only pays off at large scale.',
    misconception:
      'Monolith is not an insult or a synonym for "old and messy". A well-organized monolith is split into clean modules inside one codebase. The contrast with microservices is about deployment: one unit you ship together versus many small services shipped separately that talk over a network.',
    question: 'What is a monolith in software architecture?',
    canonicalAnswer:
      'A single application where all the features live in one codebase and are deployed together as one unit.',
    acceptedAnswers: ['one big app', 'one single app', 'everything in one codebase', 'one codebase'],
    keyIdeas: [
      {
        id: 'single',
        label: 'one single unit',
        terms: ['one', 'single', 'whole', 'entire', 'all in one', 'everything together', 'unified',
          'all together', 'together'],
      },
      {
        id: 'app',
        label: 'an application / codebase deployed as a whole',
        terms: ['codebase', 'application', 'app', 'program', 'deploy', 'deployed', 'project', 'code',
          'system', 'unit'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['many small services', 'lots of small services', 'separate services', 'microservice'],
        feedback: 'That describes microservices. A monolith is the opposite: everything in one application, deployed together.',
      },
    ],
    hint: 'The word comes from a single huge block of stone.',
    relatedConceptIds: ['microservices', 'architecture', 'module', 'deployment', 'service'],
    prerequisiteIds: ['architecture'],
    deepDive:
      'A "modular monolith" keeps one deployable app but enforces strict boundaries between modules (billing code may only call billing’s public functions). Many teams find this gets most of the organizational benefits of microservices without the network calls, distributed debugging and deployment overhead.',
    testAnswers: {
      correct: [
        'one big app where all the code is deployed together',
        'the whole application is a single codebase',
        'everything in one program',
      ],
      partial: ['everything is together'],
      incorrect: ['lots of small services that talk over the network', 'a type of database'],
    },
  },
  {
    id: 'microservices',
    term: 'Microservices',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'Microservices is an architecture where an application is split into many small, independently deployed services that each own one business capability and communicate over a network, usually via APIs.',
    plainEnglish:
      'Instead of one big program, the product is a fleet of small programs: one handles user accounts, one handles payments, one handles search. Each can be written, deployed and scaled by its own team, and they ask each other for things over the network.',
    analogy:
      'A food court instead of one restaurant: each stall has its own kitchen, staff and menu, and can close for renovation without shutting the others. But now you need signage, shared seating and a way to pay across stalls.',
    example:
      'When you buy something, the `checkout` service sends POST http://payments.internal/charges to the `payments` service, then publishes an "order placed" message that the `email` and `inventory` services react to. Each runs in its own container and can be deployed on its own schedule.',
    whyItMatters:
      'Microservices let big organizations (Netflix, Uber, Amazon) have hundreds of teams ship independently. The cost is real: network failures, harder debugging across services, and lots of infrastructure. Understanding the trade-off helps you judge when a team’s plan to adopt them is justified.',
    misconception:
      'Microservices are not automatically "better" than a monolith. A monolith deploys one unit; microservices deploy many units that must talk over an unreliable network. For a small team, microservices often add more complexity than they remove.',
    question: 'How is an application built with microservices split up?',
    canonicalAnswer:
      'Into many small, independent services, each doing one job, that communicate with each other over the network through APIs.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'services',
        label: 'many small independent services',
        terms: ['small services', 'separate services', 'independent services', 'many services',
          'multiple services', 'lots of services', 'separate pieces', 'small apps', 'separate apps',
          'independent', 'separately', 'own service', 'small programs', 'separate programs'],
      },
      {
        id: 'network',
        label: 'talking to each other over a network / APIs',
        terms: ['network', 'api', 'apis', 'talk', 'communicate', 'http', 'messages', 'call each other',
          'requests', 'internet'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['one big', 'single codebase', 'one codebase', 'all one app'],
        feedback: 'That describes a monolith. Microservices split the app into many small services.',
      },
    ],
    hint: 'Think "micro" + "services". How do those separate pieces cooperate?',
    relatedConceptIds: ['monolith', 'service', 'api', 'architecture', 'deployment', 'observability',
      'rest'],
    prerequisiteIds: ['service', 'monolith', 'api'],
    deepDive:
      'Services communicate synchronously (HTTP/REST or gRPC calls that wait for an answer) or asynchronously (messages on a queue like Kafka or SQS). Each service ideally owns its own database so teams don’t step on each other — which then makes cross-service transactions and reporting harder.',
    testAnswers: {
      correct: [
        'into many small services that talk to each other over APIs',
        'separate independent services communicating over the network',
        'lots of small apps that call each other with http',
      ],
      partial: ['into lots of small separate services'],
      incorrect: ['everything lives in one big codebase', 'by frontend and css'],
    },
  },
  {
    id: 'service',
    term: 'Service',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'A service is a separately running program that provides one specific capability — such as payments or email — to other programs, usually through an API over the network.',
    plainEnglish:
      'A service is a program that runs on its own and does one job for others. Other parts of the system don’t reach into its code; they send it requests ("charge this card", "send this email") and get answers back.',
    analogy:
      'A dry cleaner on your street: you hand over clothes and a ticket, and later collect them. You don’t know or care how their machines work — you only use the service they offer.',
    example:
      'An `email-service` runs on its own server and exposes POST /send. The main app calls it with {"to": "ana@example.com", "template": "receipt"}. Third-party services work the same way: Stripe is a payments service, Twilio a text-message service.',
    whyItMatters:
      'Products are increasingly assembled from services — your own and other companies’. When someone says "we’ll spin up a service for that", they mean a new independently running program with its own API, its own deployment and its own failure modes.',
    misconception:
      'A service is not the same as a module. A module is a chunk of code inside one program (a file or folder you import); a service is a separate running program you talk to over a network. Same idea of "one responsibility", very different operational cost.',
    question: 'What is a service in software architecture?',
    canonicalAnswer:
      'A separately running program that handles one specific job, like payments or email, and provides it to other parts of the system through an API.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'program',
        label: 'a separately running program',
        terms: ['running program', 'separate program', 'program', 'process', 'server', 'app',
          'application', 'runs on its own', 'runs separately', 'separately', 'standalone',
          'independent'],
      },
      {
        id: 'job',
        label: 'provides one specific job to others',
        terms: ['job', 'responsibility', 'task', 'capability', 'function', 'provides', 'handles',
          'offers', 'specific', 'feature', 'payments', 'email'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['file', 'folder', 'import'],
        feedback: 'That sounds like a module — code inside one program. A service is a separately running program you talk to over the network.',
      },
    ],
    hint: 'It runs on its own and does one job for other programs. What kind of thing is it?',
    relatedConceptIds: ['microservices', 'module', 'api', 'server', 'integration', 'monolith'],
    prerequisiteIds: ['server', 'api'],
    deepDive:
      'In operations, "service" also refers to a long-running background process (a systemd service on Linux, a Windows service). The shared meaning is: something that keeps running and responds when asked.',
    testAnswers: {
      correct: [
        'a separate program that handles one job like payments',
        'an app running on its own that provides a feature to other parts over an API',
        'a standalone server that does one specific task',
      ],
      partial: ['a program that runs separately'],
      incorrect: ['a file of code inside your app', 'a type of database table'],
    },
  },
  {
    id: 'dependency',
    term: 'Dependency',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'A dependency is a piece of code or software — usually a library or package written by someone else — that your project needs in order to work.',
    plainEnglish:
      'Almost no app is written from scratch. Teams pull in ready-made packages for dates, payments, charts and more. Each of those is a dependency: if it is missing or broken, your app breaks too. Dependencies often have their own dependencies, forming a long chain.',
    analogy:
      'Ingredients you buy instead of grow. Your bakery depends on the flour supplier; if they ship a bad batch, your bread suffers even though you did nothing wrong.',
    example:
      'A `package.json` listing `"dependencies": { "react": "^19.2.0", "stripe": "^17.0.0" }`. Running `npm install` downloads them (and hundreds of their own dependencies) into `node_modules`.',
    whyItMatters:
      'Dependencies speed teams up enormously but bring risk: security holes (the 2021 Log4j vulnerability hit millions of apps through one dependency), breaking updates, and abandoned packages. "We need to bump our dependencies" is a routine but important chore.',
    misconception:
      'A dependency is not a bug or a setting. Also, "dependency" is relative: a module inside your own codebase that another module relies on is a dependency of that module too — the word just means "something this needs to work".',
    question: 'What is a dependency in a software project?',
    canonicalAnswer:
      'Code your project relies on that you didn’t write yourself — usually a library or package — and that the project needs in order to work.',
    acceptedAnswers: ['code your project relies on', 'a package your app needs'],
    keyIdeas: [
      {
        id: 'external',
        label: 'a library / package / other code',
        terms: ['library', 'libraries', 'package', 'someone else', 'other people', 'third party',
          'third-party', 'external', 'outside', 'existing code', 'module', 'tool', 'software', 'code'],
      },
      {
        id: 'needs',
        label: 'that your project needs to work',
        terms: ['relies', 'rely', 'needs', 'need', 'depends', 'required', 'requires', 'breaks',
          'necessary', 'essential'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'If this thing disappeared, your app would stop working. What is it?',
    relatedConceptIds: ['library', 'package-manager', 'framework', 'module', 'dependency-injection',
      'build'],
    prerequisiteIds: ['library'],
    deepDive:
      'Version ranges like `^19.2.0` mean "any 19.x at or above 19.2.0". A lockfile (`package-lock.json`) records the exact versions installed so every machine gets the same tree. Tools like Dependabot open pull requests when a dependency has a security fix.',
    testAnswers: {
      correct: [
        'a package your app needs to work',
        'outside code your project relies on',
        'a library someone else wrote that the app requires',
      ],
      partial: ['a library'],
      incorrect: ['a bug in your app', 'a setting for the server'],
    },
  },
  {
    id: 'module',
    term: 'Module',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'A module is a self-contained unit of code — typically one file or folder — that groups related functionality and exposes only chosen parts for other code to import.',
    plainEnglish:
      'Instead of one enormous file, code is split into modules: one for dates, one for prices, one for sending email. Each module shares a few functions with the rest of the app and keeps its inner details private. That makes code easier to find, reuse and change safely.',
    analogy:
      'Chapters in a book: each covers one topic and can be read on its own, and the table of contents tells you where to go.',
    example:
      'A file `pricing.js` contains `export function totalWithTax(cents, rate) { … }` plus private helpers. Elsewhere, `import { totalWithTax } from "./pricing.js"` uses it without seeing or touching the helpers.',
    whyItMatters:
      'Modules are how large codebases stay understandable. When you hear "that logic lives in the billing module", it tells you where to look and who owns it — and whether a change is likely to ripple into other areas.',
    misconception:
      'A module is not a service. A module is code inside one program, called directly as a function; a service is a separate running program reached over a network. You can turn a module into a service later, but it adds network calls and deployment work.',
    question: 'What is a module in code?',
    canonicalAnswer:
      'A self-contained piece of code, usually a file, that groups related functionality and that other code can import and reuse.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'unit',
        label: 'a self-contained piece / file of code',
        terms: ['file', 'chunk', 'piece', 'section', 'part', 'unit', 'block', 'self-contained',
          'folder', 'bundle', 'component'],
      },
      {
        id: 'purpose',
        label: 'grouping related code you can import / reuse',
        terms: ['related', 'one job', 'one purpose', 'single purpose', 'import', 'export', 'reuse',
          'reusable', 'organize', 'group', 'specific', 'responsibility', 'one topic', 'one feature'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['own server', 'over the network', 'runs separately'],
        feedback: 'That describes a service. A module is a chunk of code inside the same program, imported directly.',
      },
    ],
    hint: 'Think of a single file that handles one area of the app and shares some of its functions.',
    relatedConceptIds: ['service', 'separation-of-concerns', 'abstraction', 'function', 'library',
      'dependency'],
    prerequisiteIds: ['function', 'source-code'],
    deepDive:
      'JavaScript has ES modules (`import`/`export`) and the older CommonJS (`require`). Python treats every `.py` file as a module and folders with them as packages. The key design skill is choosing a small public surface: export what callers need, hide everything else.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'a file grouping related code you can import elsewhere',
        'a self-contained piece of code that handles one job',
        'a chunk of code you can reuse',
      ],
      partial: ['a file of code'],
      incorrect: ['a separate program running on its own server', 'a kind of variable'],
    },
  },
  {
    id: 'abstraction',
    term: 'Abstraction',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'An abstraction hides complicated details behind a simpler interface, so you can use something by knowing what it does rather than how it does it.',
    plainEnglish:
      'Software is layers of abstractions. You call `sendEmail(to, subject)` and never think about mail servers and network packets. Each layer offers a simple handle and hides the messy machinery below it.',
    analogy:
      'A car’s pedals and steering wheel: you press "go" and "stop" without managing fuel injection or brake hydraulics. The pedals are the abstraction.',
    example:
      '`await stripe.charges.create({ amount: 2000, currency: "usd" })` hides HTTPS requests, retries, authentication headers and error codes. Likewise, SQL lets you write `SELECT * FROM orders` without knowing how the database lays bytes out on disk.',
    whyItMatters:
      'Abstractions let people build big things without holding every detail in their heads. They also leak: when the hidden layer misbehaves (a slow network behind a simple function call), you need to know it is there. "It’s a leaky abstraction" is a common engineering complaint.',
    misconception:
      'Abstraction does not mean vague or theoretical. In software it is concrete: a function, class or API that deliberately hides complexity. Too many layers can make code harder to follow, so more abstraction is not always better.',
    question: 'What does an abstraction do?',
    canonicalAnswer:
      'It hides complicated details behind a simpler interface, so you can use something without knowing how it works inside.',
    acceptedAnswers: ['hides complexity', 'hides the details', 'hides the complicated parts',
      'hides how it works'],
    keyIdeas: [
      {
        id: 'hide',
        label: 'hiding the complicated details',
        terms: ['hide', 'hidden', 'detail', 'complexity', 'complicated', 'messy', 'under the hood',
          'inner workings', 'behind the scenes', 'internals', 'low-level', 'cover up'],
      },
      {
        id: 'simple',
        label: 'behind a simpler interface',
        terms: ['simple', 'simpler', 'simplify', 'easy', 'easier', 'interface', 'surface', 'handle',
          'high-level', 'clean', 'button'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'Think of a car’s pedals. What do they spare you from dealing with?',
    relatedConceptIds: ['function', 'module', 'api', 'library', 'separation-of-concerns', 'sdk'],
    prerequisiteIds: ['function'],
    deepDive:
      'Computing is a tower of abstractions: transistors → machine code → programming languages → frameworks → your app. Each layer trusts the one below. A good abstraction has a small, stable interface; a bad one forces callers to know its internals anyway.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'hides the complicated details behind something simple',
        'it hides complexity',
        'gives you a simple interface and hides the messy internals',
      ],
      partial: ['makes things simpler to use'],
      incorrect: ['it makes the code run faster', 'it stores data in memory'],
    },
  },
  {
    id: 'separation-of-concerns',
    term: 'Separation of concerns',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'Separation of concerns is the design principle that each part of a system should handle one distinct responsibility, kept apart from code that handles other responsibilities.',
    plainEnglish:
      'Code that shows the screen, code that applies business rules and code that talks to the database should live in different places. When each part has one job, you can change one without breaking the others, and you know where to look when something goes wrong.',
    analogy:
      'A restaurant kitchen with stations: one cook on grill, one on salads, one washing dishes. Nobody fries steak at the sink, so a problem at one station doesn’t spill into the others.',
    example:
      'Web pages split structure (HTML), style (CSS) and behaviour (JavaScript). In a backend, `routes/orders.js` handles HTTP, `services/pricing.js` calculates totals, and `db/orders.js` runs SQL — the pricing code never builds HTTP responses.',
    whyItMatters:
      'Mixed-up code is why "a small change" can take weeks: changing a button breaks invoicing. Teams that separate concerns move faster and test more easily, because each piece can be checked on its own.',
    misconception:
      'It is not about splitting code into as many files as possible. Ten files that each mix database calls with screen logic are still poorly separated. The test is whether each part has one clear reason to change.',
    question: 'What does the principle of separation of concerns say?',
    canonicalAnswer:
      'Each part of the system should have one job or responsibility, kept separate from parts that handle other jobs.',
    acceptedAnswers: ['each part does one job', 'each part has one responsibility',
      'each piece handles one thing'],
    keyIdeas: [
      {
        id: 'one-job',
        label: 'each part has one job',
        terms: ['one job', 'single job', 'one responsibility', 'single responsibility',
          'own job', 'own responsibility', 'one task', 'specific job', 'focused', 'one purpose',
          'one concern'],
      },
      {
        id: 'apart',
        label: 'kept apart from other responsibilities',
        terms: ['separate', 'apart', 'split', 'divide', 'isolate', 'distinct', 'different parts',
          'own place', 'own file', 'own layer', 'different places'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'Kitchen stations: grill, salads, dishes. What rule are they following?',
    relatedConceptIds: ['module', 'abstraction', 'architecture', 'frontend', 'backend', 'middleware',
      'component'],
    prerequisiteIds: ['module'],
    deepDive:
      'Patterns like MVC (Model–View–Controller) are separation of concerns applied: models hold data and rules, views draw the screen, controllers route input. The related "single responsibility principle" says a module should have only one reason to change.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'each part of the code does one job and is kept separate',
        'split the code so each piece has a single responsibility',
        'each part does one job',
      ],
      partial: ['split the code up into files'],
      incorrect: ['put all the code in one file so it is easy to find', 'make the code faster'],
    },
  },
  {
    id: 'middleware',
    term: 'Middleware',
    trackId: 'architecture',
    difficulty: 4,
    definition:
      'Middleware is code that sits in the path between an incoming request and the code that finally handles it, running shared steps like logging, authentication checks or parsing on every request.',
    plainEnglish:
      'When a request reaches a web server, it often passes through a chain of small functions before reaching the code for that page. One logs it, one checks the user is logged in, one turns the JSON body into data. Each can pass the request on, change it, or stop it early.',
    analogy:
      'Airport checkpoints between the entrance and your gate: ticket check, security scan, passport control. Every traveller passes through, and any checkpoint can turn you away before you reach the plane.',
    example:
      'In Express: `app.use(express.json())` parses request bodies, `app.use(requireLogin)` rejects requests without a valid session with 401, then `app.get("/orders", listOrders)` runs. Every request flows through the first two before reaching `listOrders`.',
    whyItMatters:
      'Middleware is how teams apply rules everywhere at once — security, logging, rate limits, CORS headers — instead of copy-pasting checks into every route. A missing or misordered middleware is a classic cause of security bugs.',
    misconception:
      'Middleware is not a separate product or server you buy (although the term is used that way in older enterprise IT). In web frameworks it means small functions in the request pipeline inside your own backend.',
    question: 'Where does middleware sit, and what does it do?',
    canonicalAnswer:
      'It sits between an incoming request and the final handler, running shared steps like logging or authentication checks on every request.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'between',
        label: 'in between the request and the handler',
        terms: ['between', 'middle', 'before', 'intercept', 'pipeline', 'along the way', 'on the way',
          'checkpoint', 'chain', 'in front of'],
      },
      {
        id: 'shared',
        label: 'shared steps applied to requests',
        terms: ['logging', 'log', 'auth', 'authentication', 'check', 'parse', 'every request',
          'each request', 'all requests', 'shared', 'common', 'modify', 'transform', 'security',
          'process'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['database', 'stores data'],
        feedback: 'Middleware doesn’t store data. It is code that runs on requests on their way to the handler.',
      },
    ],
    hint: 'Airport checkpoints between the entrance and the gate.',
    relatedConceptIds: ['request', 'backend', 'authentication', 'cors', 'logs', 'routing',
      'separation-of-concerns'],
    prerequisiteIds: ['request', 'response', 'backend'],
    deepDive:
      'Order matters: body-parsing must run before code that reads the body, and authentication before authorization. Each middleware typically receives (request, response, next) and either calls `next()` to continue or sends a response to stop the chain.',
    testAnswers: {
      correct: [
        'it sits between the request and your route code and does things like logging or auth checks',
        'in the middle, checking every request before it reaches the handler',
        'before the main code, it processes each request',
      ],
      partial: ['in between the request and the app'],
      incorrect: ['it is the database the app saves to', 'the css for the page'],
    },
  },
  {
    id: 'environment-variable',
    term: 'Environment variable',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'An environment variable is a named value, such as a database address or API key, that is provided to a program by the system it runs on rather than written into its code.',
    plainEnglish:
      'Some values must differ between your laptop and the live site, and some (like passwords) must never be in the code at all. So the code reads them from the environment when it starts: "give me DATABASE_URL". Each machine sets its own value.',
    analogy:
      'A hotel key card programmed at the front desk: the door lock (the code) is identical in every room, but each guest’s card (the environment) decides which room it opens.',
    example:
      'A `.env` file on a developer’s laptop contains `DATABASE_URL=postgres://localhost:5432/shop_dev` and `STRIPE_SECRET_KEY=sk_test_51H…`. The code reads `process.env.DATABASE_URL`. On the production server the same variable points at the real database.',
    whyItMatters:
      'Leaked secrets are one of the most common security incidents — keys committed to GitHub get scraped by bots within minutes. Environment variables keep secrets out of the code and let one codebase run unchanged in development, staging and production.',
    misconception:
      'An environment variable is not the same as an environment. The environment is the whole place the app runs (e.g. staging or production); environment variables are individual named settings that environment hands to the app. Also, `.env` files should be listed in `.gitignore` so they never get committed.',
    question: 'What are environment variables typically used for?',
    canonicalAnswer:
      'Storing settings and secrets, like API keys or the database URL, outside the code so each environment or machine can provide its own values.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'config',
        label: 'settings and secrets',
        terms: ['setting', 'config', 'configuration', 'secret', 'password', 'api key', 'key',
          'credential', 'database url', 'url', 'token', 'values'],
      },
      {
        id: 'outside',
        label: 'kept outside the code, set per environment',
        terms: ['outside', 'separate', 'environment', 'machine', 'server', 'operating system',
          'hardcode', 'hard-coded', 'hard-code', 'production', 'per environment', 'each environment',
          'computer', 'instead of'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['inside a function', 'local variable', 'loop counter'],
        feedback: 'That is an ordinary variable in code. Environment variables are values the system provides to the program from outside its code.',
      },
    ],
    hint: 'Think DATABASE_URL and API keys. Why wouldn’t you type those into the code itself?',
    relatedConceptIds: ['configuration', 'environment', 'variable', 'api-key', 'deployment', 'hosting'],
    prerequisiteIds: ['variable', 'configuration'],
    deepDive:
      'Hosting platforms (Vercel, Render, Heroku, AWS) have a settings screen for environment variables. Frontend build tools only expose variables with a public prefix (e.g. `VITE_`, `NEXT_PUBLIC_`) to the browser — anything shipped to the browser is visible to users, so real secrets must stay on the server.',
    testAnswers: {
      correct: [
        'storing secrets like API keys outside the code',
        'config values set on the server, like DATABASE_URL',
        'passwords and settings that change per environment instead of hardcoding them',
      ],
      partial: ['storing api keys'],
      incorrect: ['a local variable inside a function', 'making the page load faster'],
    },
  },
  {
    id: 'configuration',
    term: 'Configuration',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'Configuration is the set of adjustable settings that control how a program behaves — such as which database to use, feature flags or timeouts — kept separate from its logic so they can change without rewriting code.',
    plainEnglish:
      'Code says what the app does; configuration fills in the specifics: which server, how many retries, is the new checkout turned on? Changing configuration changes behaviour without a programmer editing the logic.',
    analogy:
      'The settings menu on your phone. The phone’s software is the same for everyone, but your settings — brightness, language, ringtone — make it behave your way.',
    example:
      'A `config.json` like `{ "maxUploadMb": 25, "newCheckout": true, "logLevel": "warn" }`, plus environment variables such as `PORT=8080`. Flipping `newCheckout` to false turns the feature off for everyone without a code change.',
    whyItMatters:
      'Many outages come from config changes, not code changes — a wrong value pushed to production can take a site down instantly. Feature flags (a kind of config) let teams launch features gradually and turn them off fast if something goes wrong.',
    misconception:
      'Configuration is not the same as source code, though it often lives beside it. And config isn’t always harmless: a single wrong setting can do as much damage as a bug, which is why mature teams review config changes like code.',
    question: 'What is configuration in a software system?',
    canonicalAnswer:
      'The adjustable settings that control how the program behaves, which can be changed without rewriting its code.',
    acceptedAnswers: ['settings that control how the app behaves', 'the app settings'],
    keyIdeas: [
      {
        id: 'settings',
        label: 'adjustable settings',
        terms: ['setting', 'options', 'values', 'parameters', 'flags', 'preferences', 'knobs',
          'choices', 'config', 'toggles'],
      },
      {
        id: 'behavior',
        label: 'that control behaviour without code changes',
        terms: ['behave', 'behavior', 'behaviour', 'control', 'change', 'adjust', 'customize',
          'tweak', 'turn on', 'turn off', 'decide'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['the logic', 'business logic', 'source code itself'],
        feedback: 'That is the code itself. Configuration is the adjustable settings kept separate from the logic.',
      },
    ],
    hint: 'Think of the settings menu on your phone.',
    relatedConceptIds: ['environment-variable', 'environment', 'deployment', 'dependency-injection'],
    prerequisiteIds: ['source-code'],
    deepDive:
      'Common config formats: JSON, YAML (`config.yml`), TOML and `.env` files. The "twelve-factor app" guidelines recommend storing deployment-specific config in environment variables so the same build can be promoted from staging to production unchanged.',
    testAnswers: {
      correct: [
        'settings that control how the app behaves',
        'options you can change to adjust how it runs without new code',
        'values like flags that turn features on or off',
      ],
      partial: ['the settings'],
      incorrect: ['the business logic of the app', 'installing the app on a phone'],
    },
  },
  {
    id: 'authentication',
    term: 'Authentication',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'Authentication is the process of verifying a user’s identity — confirming that someone really is the person or system they claim to be.',
    plainEnglish:
      'When you log in, the app needs proof that you are you: a password, a code texted to your phone, a fingerprint, a "Sign in with Google" confirmation. Authentication answers one question only: who is this?',
    analogy:
      'Showing your passport at the airport. The officer checks the photo matches your face — that proves identity. Whether your ticket lets you into the business lounge is a separate question.',
    example:
      'You submit email + password. The server looks up your account, runs bcrypt on the password you typed and compares it with the stored hash. If they match (and your 6-digit 2FA code is right), it creates a session or issues a token saying "this is user 4821".',
    whyItMatters:
      'Weak authentication is the front door for most account takeovers. Knowing the term helps you discuss 2FA, passkeys, "Sign in with Google" and password policies — and to keep it distinct from permissions, which is a different system.',
    misconception:
      'Authentication is not authorization. Authentication verifies who you are (logging in). Authorization decides what you are allowed to do once identified (can you see the admin page?). A logged-in user can be fully authenticated and still forbidden from an action — that is a 403, versus a 401 for "we don’t know who you are".',
    question: 'What does authentication check?',
    canonicalAnswer:
      'It verifies your identity — proving that you really are the person you claim to be, for example by logging in with a password.',
    acceptedAnswers: ['verifies your identity', 'proves your identity', 'confirms your identity'],
    keyIdeas: [
      {
        id: 'identity',
        label: 'verifying who someone is (identity)',
        terms: ['identity', 'identify', 'verify', 'verification', 'prove', 'proof', 'confirm',
          'really you', 'claim', 'log in', 'login', 'logging in', 'sign in', 'password', 'credential',
          'genuine', 'make sure', 'real person', 'impostor'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['permission', 'allowed', 'access', 'privilege', 'rights', 'role', 'authorization',
          'authorized'],
        feedback: 'That is authorization — what you’re allowed to do. Authentication only checks who you are (your identity).',
      },
    ],
    hint: 'Think passport control. What is the officer actually checking?',
    relatedConceptIds: ['authorization', 'session', 'auth-token', 'hashing', 'oauth', 'https',
      'middleware'],
    prerequisiteIds: ['client', 'server'],
    deepDive:
      'Factors fall into three groups: something you know (password), something you have (phone, security key) and something you are (fingerprint). Multi-factor authentication combines two or more. Passkeys replace passwords with a cryptographic key pair stored on your device.',
    testAnswers: {
      correct: [
        'verifying you are who you say you are',
        'proving your identity, like logging in with a password',
        'making sure its really you',
      ],
      incorrect: [
        'what you are allowed to do in the app',
        'whether you have permission to see a page',
        'encrypting the data',
      ],
    },
  },
  {
    id: 'authorization',
    term: 'Authorization',
    trackId: 'architecture',
    difficulty: 2,
    definition:
      'Authorization is the process of deciding what an already-identified user or system is permitted to do or access.',
    plainEnglish:
      'Once the app knows who you are, it still has to decide what you may do. Can you edit this document, or only view it? Can you see the admin dashboard? Authorization is those rules, checked every time you try something.',
    analogy:
      'A hotel key card. Everyone at the desk proved who they are, but your card only opens your room, the gym and the pool — not other guests’ rooms or the staff office.',
    example:
      'User 4821 sends DELETE /projects/77. The server checks: is 4821 an owner or admin of project 77? If only a "viewer", it responds 403 Forbidden. In code: `if (user.role !== "admin") return res.status(403).send("Forbidden")`.',
    whyItMatters:
      'Broken authorization — letting users reach other people’s data by changing an ID in the URL — is the #1 risk on the OWASP Top 10 list of web security problems. Product decisions like "managers can approve expenses but not delete them" are authorization rules.',
    misconception:
      'Authorization is not authentication. Authentication proves who you are; authorization decides what you are allowed to do. HTTP status codes reflect this: 401 Unauthorized actually means "not authenticated", while 403 Forbidden means "we know who you are, and you can’t do this".',
    question: 'What does authorization decide?',
    canonicalAnswer:
      'What a user is allowed to do or access — their permissions — once the system knows who they are.',
    acceptedAnswers: ['what you are allowed to do', 'what you can access', 'your permissions'],
    keyIdeas: [
      {
        id: 'permissions',
        label: 'what someone is allowed to do or access',
        terms: ['allowed', 'permission', 'permit', 'access', 'rights', 'privilege', 'role', 'admin',
          'able', 'authorized', 'entitled', 'forbidden', 'restrict'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['identity', 'prove', 'log in', 'login', 'password', 'credential', 'authenticate',
          'authentication', 'sign in'],
        feedback: 'That is authentication — proving who you are. Authorization decides what you’re allowed to do after that.',
      },
    ],
    hint: 'Everyone checked in at the hotel — but which doors does each key card open?',
    relatedConceptIds: ['authentication', 'session', 'auth-token', 'oauth', 'status-code',
      'middleware'],
    prerequisiteIds: ['authentication'],
    deepDive:
      'Common models: role-based access control (RBAC: admins, editors, viewers), attribute-based (rules on properties: "managers in the same department"), and per-resource sharing (Google Docs style). Authorization must be enforced on the server — hiding a button in the UI is not protection.',
    testAnswers: {
      correct: [
        'what you’re allowed to do',
        'which things you have permission to access',
        'whether you can access something like the admin page',
      ],
      incorrect: [
        'it checks your identity when you log in',
        'proving who you are with a password',
        'it encrypts the database',
      ],
    },
  },
  {
    id: 'session',
    term: 'Session',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'A session is a server-side record of a logged-in user, identified by a random session ID that the browser stores in a cookie and sends with every request.',
    plainEnglish:
      'HTTP forgets you between requests, so after you log in, the server writes a note — "session abc123 belongs to user 4821" — and gives your browser just the ID. On every later request the browser sends that ID back, the server looks up the note, and knows it’s you.',
    analogy:
      'A coat check: you hand over your coat and get a numbered ticket. The ticket itself is worthless; the cloakroom keeps the real record and looks up your number when you return.',
    example:
      'After login the server responds with `Set-Cookie: sid=9f2c7e1a…; HttpOnly; Secure`. It stores `{ sid: "9f2c7e1a…", userId: 4821, expires: "2026-10-10T12:00Z" }` in Redis. Each later request carries `Cookie: sid=9f2c7e1a…`. Logging out deletes the server record.',
    whyItMatters:
      'Sessions are how most websites keep you logged in. Because the server holds the record, it can log you out everywhere instantly — useful when an account is compromised. Session theft (stealing the cookie) is why cookies get flags like HttpOnly and Secure.',
    misconception:
      'Session vs token: with a session, the server stores your login state and the browser only holds an opaque ID. With a self-contained token (like a JWT), the token itself carries signed info about you and the server doesn’t need to look anything up. Sessions are easy to revoke; tokens are easy to scale.',
    question: 'How does a server-side session keep you logged in?',
    canonicalAnswer:
      'The server stores a record of your login, and your browser sends back a session ID in a cookie with every request so the server can look you up.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'server-record',
        label: 'the server keeps a record of the login',
        terms: ['server', 'remember', 'record', 'store', 'database', 'keeps track', 'saves',
          'look up', 'lookup', 'redis', 'memory'],
      },
      {
        id: 'id-cookie',
        label: 'the browser sends back a session ID / cookie',
        terms: ['cookie', 'session id', 'id', 'identifier', 'random string', 'ticket',
          'every request', 'each request', 'sends back', 'number'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['password in browser', 'browser saves password', 'stores password'],
        feedback: 'Sessions never keep your password in the browser. The server keeps a login record; the browser only holds a random session ID.',
      },
      {
        terms: ['jwt', 'self-contained', 'contains your data'],
        feedback: 'That describes a self-contained token. With a session, the server holds the data and the browser only holds an ID.',
      },
    ],
    hint: 'Think of a coat-check ticket. Who holds the coat, and what do you carry?',
    relatedConceptIds: ['auth-token', 'authentication', 'headers', 'state', 'cache', 'server',
      'http'],
    prerequisiteIds: ['authentication', 'http', 'headers'],
    deepDive:
      'Session IDs must be long and random so they can’t be guessed. Cookie flags matter: HttpOnly hides the cookie from JavaScript (reducing theft via XSS), Secure sends it only over HTTPS, and SameSite limits cross-site sending to reduce request-forgery attacks.',
    testAnswers: {
      correct: [
        'the server keeps a record and your browser sends a session ID cookie each time',
        'server remembers you and the cookie holds an id',
        'it saves your login on the server and gives the browser a random string to send back',
      ],
      partial: ['the server remembers you'],
      incorrect: ['it saves your password in the browser', 'by keeping the page open'],
    },
  },
  {
    id: 'auth-token',
    term: 'Auth token',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'An auth token is a hard-to-forge string the server issues after you log in, which the client then attaches to each request to prove it is acting on your behalf.',
    plainEnglish:
      'Instead of sending your password every time, you log in once and get a token — a long string. Your app sends that token with every request, usually in a header. Tokens can expire and be limited to certain actions, so a leaked token is less dangerous than a leaked password.',
    analogy:
      'A festival wristband: you show ID once at the gate, get a wristband, and then just flash it at every stage. It expires when the festival ends.',
    example:
      'A request with `Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODIxIiwiZXhwIjoxNzYwMDAwMDAwfQ.k3x…`. That is a JWT: three base64 parts — a header, a payload saying `{"sub":"4821","exp":1760000000}` (user 4821, expiry time), and a signature the server checks to detect tampering.',
    whyItMatters:
      'Tokens power mobile apps, single-page apps and API access (including "Sign in with Google" via OAuth). Anyone holding a valid token can act as you, so tokens must be kept out of URLs, logs and screenshots.',
    misconception:
      'An auth token is not the same as an LLM token (a chunk of text an AI model reads). And token vs session: a session keeps your login state on the server, while a self-contained token like a JWT carries signed data itself — it is readable (just base64), not encrypted, so it must not hold secrets.',
    question: 'What is an auth token, and how does an app use it?',
    canonicalAnswer:
      'A string the server gives you after you log in; the app sends it with every request to prove it’s you, instead of sending your password again.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'issued',
        label: 'a credential/string issued after login',
        terms: ['after log', 'after login', 'after signing', 'issued', 'given', 'gives', 'receive',
          'get', 'credential', 'string', 'pass', 'ticket', 'key', 'proof', 'wristband', 'code'],
      },
      {
        id: 'sent',
        label: 'sent with each request',
        terms: ['every request', 'each request', 'send', 'sent', 'header', 'attach', 'include',
          'present', 'with requests', 'every call', 'each call'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['word', 'piece of text', 'llm', 'ai model', 'chatgpt'],
        feedback: 'That’s an LLM token (a chunk of text an AI reads). An auth token is a login credential sent with requests.',
      },
    ],
    hint: 'Festival wristband: when do you get it, and what do you do with it afterwards?',
    relatedConceptIds: ['session', 'authentication', 'authorization', 'headers', 'api-key', 'oauth',
      'llm-token'],
    prerequisiteIds: ['authentication', 'headers'],
    deepDive:
      'Systems often pair a short-lived access token (minutes) with a long-lived refresh token used only to get new access tokens. Because self-contained JWTs can’t easily be revoked before expiry, short lifetimes limit damage if one leaks.',
    testAnswers: {
      correct: [
        'a code you get after logging in that you send with every request',
        'something the server gives you which you attach to requests to prove its you',
        'a key issued at login and included in the header of each call',
      ],
      partial: ['a string you get after logging in'],
      incorrect: ['a piece of text an AI model reads', 'your password stored in a table'],
    },
  },
  {
    id: 'encryption',
    term: 'Encryption',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'Encryption transforms readable data into scrambled ciphertext that can only be turned back into the original by someone holding the right key.',
    plainEnglish:
      'Encryption locks data so that anyone who intercepts or steals it sees gibberish. The intended recipient has a key that unlocks it. It is designed to be reversible — that is the whole point — but only with the key.',
    analogy:
      'A locked safe. Anyone can see the safe, but only someone with the combination can open it and get the original contents back out.',
    example:
      'HTTPS encrypts traffic between your browser and https://bank.example, so the Wi‑Fi at a café sees only scrambled bytes. A database might store a credit card as AES-256 ciphertext like `u7Fq…==` and decrypt it with a key kept in a secrets manager when needed.',
    whyItMatters:
      'Encryption protects data "in transit" (moving over networks) and "at rest" (stored on disks and backups). Regulations like GDPR and PCI rely on it, and a stolen laptop or database dump is far less damaging if its contents are encrypted.',
    misconception:
      'Encryption is not hashing. Encryption is two-way: with the key you get the original back. Hashing is one-way: you can never recover the input, which is why passwords should be hashed, not encrypted. Also, encrypted data is only as safe as its key.',
    question: 'What does encryption do to data, and how do you get the original back?',
    canonicalAnswer:
      'It scrambles data so it’s unreadable to others, and someone with the right key can decrypt it back to the original.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'scramble',
        label: 'scrambles data so it’s unreadable',
        terms: ['scramble', 'unreadable', 'encode', 'lock', 'garble', 'gibberish', 'secret code',
          'protect', 'hide', 'cipher', 'secure', 'jumble', 'disguise'],
      },
      {
        id: 'key',
        label: 'reversible with the key',
        terms: ['key', 'decrypt', 'reverse', 'undo', 'unlock', 'unscramble', 'original back',
          'password to open', 'combination'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['one-way', 'irreversible', 'fingerprint'],
        feedback: 'That describes hashing. Encryption is two-way: with the key, you can get the original data back.',
      },
    ],
    hint: 'A locked safe. What makes the data unreadable, and what opens it again?',
    relatedConceptIds: ['hashing', 'https', 'auth-token', 'authentication', 'environment-variable'],
    prerequisiteIds: ['https'],
    deepDive:
      'Symmetric encryption (AES) uses one shared key to lock and unlock. Asymmetric encryption (RSA, elliptic curves) uses a public key anyone can use to lock and a private key only the owner holds to unlock — the basis of HTTPS certificates. "End-to-end encryption" means only the two endpoints, not the service in the middle, hold the keys.',
    testAnswers: {
      correct: [
        'scrambles data and you can unscramble it with the key',
        'locks data so only someone with the key can decrypt it',
        'turns it into gibberish, and the key reverses it',
      ],
      partial: ['scrambles data so others cant read it'],
      incorrect: [
        'turns it into a one-way fingerprint that can never be reversed',
        'compresses the file to make it smaller',
      ],
    },
  },
  {
    id: 'hashing',
    term: 'Hashing (password hashing)',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'Hashing runs data through a one-way function that produces a fixed-length fingerprint; the same input always gives the same hash, but the hash cannot be turned back into the input.',
    plainEnglish:
      'A hash is like a fingerprint of data. Apps store the hash of your password instead of the password. When you log in, they hash what you typed and compare fingerprints. If the database leaks, attackers get fingerprints, not passwords.',
    analogy:
      'A meat grinder: steak goes in, mince comes out, and nobody can turn the mince back into the steak. But the same steak always produces identical mince, so you can check whether two came from the same cut.',
    example:
      'bcrypt turns the password `hunter2` into something like `$2b$12$KIXQJ0w6r3O1…`. At login the server runs `bcrypt.compare("hunter2", storedHash)` → true. SHA-256 of the word "hello" is always `2cf24dba5fb0a30e…`, and changing one letter changes the whole hash.',
    whyItMatters:
      'Password storage is the classic use: a company that stores plain or encrypted passwords is one leak (or one stolen key) away from exposing everyone. Hashes also verify downloads haven’t been tampered with and power git’s commit IDs.',
    misconception:
      'Hashing is not encryption. Encryption is reversible with a key; hashing is one-way and has no key to "decrypt" it. For passwords, use slow, salted hashes like bcrypt or Argon2 — fast hashes like plain SHA-256 can be guessed billions of times per second.',
    question: 'What makes hashing different from encryption?',
    canonicalAnswer:
      'Hashing is one-way: it turns data into a fixed fingerprint that is impossible to reverse, while encryption can be undone with a key.',
    acceptedAnswers: ['hashing is one-way', 'it is one-way'],
    keyIdeas: [
      {
        id: 'one-way',
        label: 'it’s one-way (irreversible)',
        terms: ['one-way', 'irreversible', 'one direction', 'impossible to reverse',
          'impossible to undo', 'impossible to get back', 'permanent', 'unrecoverable', 'fingerprint',
          'only goes one'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['decrypt hash', 'hash decrypted', 'reverse hash', 'unhash'],
        feedback: 'That’s encryption. A hash can’t be decrypted or unlocked — it’s one-way.',
      },
    ],
    hint: 'Can you turn mince back into steak?',
    relatedConceptIds: ['encryption', 'authentication', 'git', 'commit', 'database'],
    prerequisiteIds: ['encryption'],
    deepDive:
      'A salt is random data added to each password before hashing, so two users with the same password get different hashes and precomputed "rainbow tables" don’t work. bcrypt’s cost factor (the `12` in `$2b$12$`) makes each hash deliberately slow, which barely affects one login but cripples mass guessing.',
    testAnswers: {
      correct: [
        'hashing is one-way, encryption can be undone',
        'a hash is a fingerprint you cant turn back into the password',
        'hashing is irreversible but encryption can be unlocked',
      ],
      incorrect: [
        'you can decrypt the hash with the right key',
        'hashing makes data smaller to save space',
      ],
    },
  },
  {
    id: 'input-sanitization',
    term: 'Input sanitization',
    trackId: 'architecture',
    difficulty: 3,
    definition:
      'Input sanitization is cleaning, validating or escaping data that comes from users before using it, so that malicious input can’t be executed as code or corrupt the system.',
    plainEnglish:
      'Anything a user types — a name, a comment, a search — might be an attack disguised as data. Sanitizing means treating input as untrusted: checking it’s the right shape and neutralizing characters that could be interpreted as commands by the database or browser.',
    analogy:
      'Airport security scanning luggage: most bags are fine, but every one gets checked, because one dangerous bag is enough.',
    example:
      'If code builds `"SELECT * FROM users WHERE name = \'" + name + "\'"` and someone types `\' OR 1=1 --`, the query returns every user — SQL injection. The fix is parameterized queries: `db.query("SELECT * FROM users WHERE name = $1", [name])`. Similarly, escaping a comment like `<script>stealCookies()</script>` stops XSS.',
    whyItMatters:
      'Injection attacks have been on the OWASP Top 10 for over two decades and caused huge breaches. When an engineer says "never trust user input", this is what they mean — and it applies to form fields, URLs, file uploads and API calls alike.',
    misconception:
      'Front-end form validation is not sanitization. Checks in the browser improve user experience but can be bypassed by anyone sending requests directly, so the server must validate and escape input too. And "sanitize" does not mean deleting everything unusual — the safest approach is usually escaping or parameterizing.',
    question: 'Why do apps sanitize user input?',
    canonicalAnswer:
      'To clean or validate what users type so attackers can’t sneak in malicious code, like SQL injection or XSS.',
    acceptedAnswers: ['prevent injection', 'stop attacks', 'prevent attacks', 'stop hackers',
      'prevent hacking', 'prevent sql injection', 'prevent xss'],
    keyIdeas: [
      {
        id: 'clean',
        label: 'cleaning/validating the input',
        terms: ['clean', 'escape', 'filter', 'strip', 'validate', 'check', 'remove', 'scrub',
          'neutralize', 'untrusted', 'treat as data'],
      },
      {
        id: 'attack',
        label: 'to block attacks like injection',
        terms: ['attack', 'injection', 'inject', 'hack', 'malicious', 'xss', 'security', 'exploit',
          'harm', 'dangerous', 'bad actors', 'evil', 'script'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['faster', 'speed', 'performance'],
        feedback: 'Sanitization isn’t about speed — it’s about stopping malicious input from being run as code.',
      },
    ],
    hint: 'What could someone type into a search box to trick the database?',
    relatedConceptIds: ['form-validation', 'sql', 'query', 'javascript', 'middleware', 'backend'],
    prerequisiteIds: ['form-validation', 'sql'],
    deepDive:
      'Rules of thumb: validate input on arrival (is this a valid email? a number between 1 and 100?), use parameterized queries or an ORM for databases, and escape output for the context it lands in (HTML, URL, shell). Modern frameworks like React escape text by default, which is why `dangerouslySetInnerHTML` has that name.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'clean user input so attackers cant do SQL injection',
        'to filter out dangerous stuff people type in, like script tags',
        'to prevent sql injection',
      ],
      partial: ['to clean up what users type'],
      incorrect: ['to make the database faster', 'to fix spelling mistakes'],
    },
  },
  {
    id: 'cors',
    term: 'CORS (Cross-Origin Resource Sharing)',
    trackId: 'architecture',
    difficulty: 4,
    definition:
      'CORS (Cross-Origin Resource Sharing) is a browser security mechanism in which a server uses HTTP headers to say which other websites’ pages are permitted to read its responses.',
    plainEnglish:
      'By default, JavaScript on one website can’t read responses from a different website — otherwise any page you visit could quietly read your email. CORS is how a server opts in: "pages from https://app.example may call me." The browser enforces it.',
    analogy:
      'A guest list at a private event: the venue (the server) gives the doorman (the browser) a list of approved guests (origins). Anyone not on the list can knock, but won’t be let in to see what’s inside.',
    example:
      'Your page at https://app.example runs `fetch("https://api.other.example/data")`. The browser sends `Origin: https://app.example`. Only if the API replies with `Access-Control-Allow-Origin: https://app.example` will your code see the data; otherwise the console shows "blocked by CORS policy".',
    whyItMatters:
      'CORS errors are one of the most common things that stop a frontend talking to a backend during development. Knowing the server must send the right header (not the frontend) saves hours of confusion.',
    misconception:
      'CORS is not a firewall and doesn’t protect your server from attackers — tools like curl ignore it completely. It protects users’ browsers from malicious sites reading data on their behalf. A CORS error is fixed on the server, not in the frontend code.',
    question: 'What does CORS control?',
    canonicalAnswer:
      'Whether JavaScript in a browser on one website can read responses from a server on a different domain (origin).',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'cross-origin',
        label: 'requests from a different website/origin',
        terms: ['other domain', 'different domain', 'another domain', 'other origin',
          'different origin', 'another origin', 'other site', 'different site', 'another site',
          'cross-origin', 'cross origin', 'other website', 'different website', 'another website',
          'other websites', 'other sites', 'cross-site', 'cross site'],
      },
      {
        id: 'browser-request',
        label: 'browser requests being permitted',
        terms: ['browser', 'request', 'fetch', 'call', 'javascript', 'header', 'read', 'permit',
          'allowed', 'access', 'block'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['firewall', 'password', 'login'],
        feedback: 'CORS isn’t a firewall or login system. It’s a browser rule about which other websites may read a server’s responses.',
      },
    ],
    hint: 'It’s about a page on one website calling a server on a different one.',
    relatedConceptIds: ['headers', 'browser', 'domain-name', 'api', 'middleware', 'browser-console'],
    prerequisiteIds: ['headers', 'domain-name', 'browser'],
    deepDive:
      'An origin is scheme + host + port, so http://localhost:3000 and http://localhost:8080 are different origins. For requests that could change data (e.g. PUT with JSON), the browser first sends an OPTIONS "preflight" request to ask permission. `Access-Control-Allow-Origin: *` allows everyone and can’t be combined with cookies.',
    testAnswers: {
      correct: [
        'whether a browser lets a site call an API on a different domain',
        'which other websites can make requests to your server from the browser',
        'if javascript can fetch from another origin',
      ],
      partial: ['something about different domains'],
      incorrect: ['it is a firewall that blocks hackers', 'how fast a page loads'],
    },
  },
  {
    id: 'dependency-injection',
    term: 'Dependency injection',
    trackId: 'architecture',
    difficulty: 5,
    definition:
      'Dependency injection is a design technique where a piece of code receives the things it depends on (like a database client or email sender) from outside, instead of creating them itself.',
    plainEnglish:
      'Instead of a function reaching out and building its own database connection, you hand it one. That makes the code easier to test (hand it a fake database) and easier to change (hand it a different email provider) without rewriting it.',
    analogy:
      'A chef who is handed ingredients by the kitchen versus one who drives to the farm for every dish. The handed-to chef can cook the same recipe with test ingredients, organic ones or whatever’s in stock.',
    example:
      'Instead of `class OrderService { db = new PostgresClient() }`, you write `class OrderService { constructor(db) { this.db = db } }` and call `new OrderService(realDb)` in production but `new OrderService(fakeDb)` in tests.',
    whyItMatters:
      'It’s a big reason some codebases are easy to test and others aren’t. Frameworks like Angular, NestJS and Spring are built around it, so you’ll hear "inject the service" in many teams.',
    misconception:
      'Dependency injection is not installing dependencies (that’s a package manager like npm) and not a security attack like SQL injection. "Injection" here just means passing in. Also, you don’t need a framework to do it — passing a parameter is dependency injection.',
    question: 'What is dependency injection?',
    canonicalAnswer:
      'Passing the things a piece of code needs into it from outside, instead of having it create them itself — which makes it easy to swap them, for example with fakes in tests.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'pass-in',
        label: 'dependencies passed in from outside',
        terms: ['pass', 'passed', 'give', 'giving', 'given', 'hand', 'handed', 'provide', 'supplied',
          'from outside', 'outside', 'plug in', 'receive', 'constructor', 'parameter', 'argument',
          'feed'],
      },
      {
        id: 'not-create',
        label: 'instead of creating them itself',
        terms: ['instead', 'creating', 'create', 'build', 'itself', 'swap', 'fake', 'mock', 'test',
          'replace', 'hardcod', 'hard-coded', 'new'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['install', 'npm', 'package manager', 'download'],
        feedback: 'That’s installing dependencies with a package manager. Dependency injection means passing a piece of code what it needs instead of it creating it.',
      },
      {
        terms: ['sql injection', 'attack', 'hack'],
        feedback: 'Different "injection"! Dependency injection is a design pattern — passing in what code needs — not a security attack.',
      },
    ],
    hint: 'Is the chef handed ingredients, or does the chef go and fetch them?',
    relatedConceptIds: ['dependency', 'module', 'unit-test', 'abstraction', 'parameter',
      'configuration'],
    prerequisiteIds: ['dependency', 'parameter', 'object'],
    deepDive:
      'DI containers (in Spring, NestJS, .NET) automatically build objects and wire their dependencies based on configuration or type annotations. The underlying principle is "inversion of control": the caller decides which concrete implementation is used, not the code that uses it.',
    testAnswers: {
      correct: [
        'you pass the things a piece of code needs into it instead of it creating them itself',
        'giving a class its database from outside so you can swap in a fake for testing',
        'handing code its dependencies through the constructor instead of building them inside',
      ],
      partial: ['you pass things in'],
      incorrect: ['installing packages with npm', 'a hacking attack on databases'],
    },
  },
];

export default concepts;
