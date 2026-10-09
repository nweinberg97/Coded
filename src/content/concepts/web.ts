import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'frontend',
    term: 'Frontend (front end)',
    trackId: 'web',
    difficulty: 1,
    definition:
      'The frontend is the part of an application that runs on the user’s device and that they see and interact with — the screens, buttons, text and layout.',
    plainEnglish:
      'When you use a website or app, everything you can look at and click is the frontend. On the web it is built with HTML (content), CSS (looks) and JavaScript (behaviour), and it runs inside your browser. It shows data and collects your input, then talks to the backend for anything it cannot do alone.',
    analogy:
      'The dining room of a restaurant: the menu, the décor, the waiter taking your order. You never see the kitchen, but everything you experience happens here.',
    example:
      'On Airbnb, the search bar, the photo carousel, the map and the “Reserve” button are frontend. When you click “Reserve”, the frontend sends your dates to Airbnb’s backend, which checks availability and charges your card.',
    whyItMatters:
      'Frontend work is what users judge your product by: speed, clarity, accessibility. Knowing what is frontend helps you route feedback (“the button is misaligned” → frontend; “my payment didn’t go through” → probably backend).',
    misconception:
      'Frontend is not “just design”. Designers decide how it should look; frontend engineers build it in code — handling state, data loading, errors and accessibility. And frontend code is visible to users, so secrets and trust decisions must live on the backend.',
    question: 'What is the frontend of an app?',
    canonicalAnswer:
      'The part users see and interact with — the interface running on their device, like screens and buttons.',
    acceptedAnswers: ['the part users see', 'what the user sees and interacts with', 'user interface'],
    keyIdeas: [
      {
        id: 'visible',
        label: 'the part users see and interact with',
        terms: ['see', 'sees', 'visible', 'interact', 'click', 'user interface', 'ui', 'interface', 'screens',
          'buttons', 'looks', 'display', 'what users', 'user facing'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['database', 'behind the scenes', 'on the server', 'server side', 'stores data'],
        feedback: 'That describes the backend. The frontend is the part users see and interact with on their own device.',
      },
    ],
    hint: 'Restaurant dining room or kitchen?',
    relatedConceptIds: ['backend', 'full-stack', 'html', 'css', 'javascript', 'client'],
    prerequisiteIds: ['client', 'browser'],
    deepDive:
      'Modern frontends are often whole applications in their own right, built with frameworks like React, Vue or Svelte. They manage state, routing and caching in the browser and talk to the backend through HTTP APIs that return JSON.',
    testAnswers: {
      correct: [
        'the part of the app you can see and click on',
        'the user interface',
        'what users interact with, the screens and buttons',
      ],
      incorrect: ['the database behind the scenes', 'the server side code that processes payments'],
    },
  },
  {
    id: 'backend',
    term: 'Backend (back end)',
    trackId: 'web',
    difficulty: 1,
    definition:
      'The backend is the part of an application that runs on servers, out of the user’s sight, handling data, business rules, security and communication with other services.',
    plainEnglish:
      'The backend is the engine room. It stores and fetches data from databases, checks who you are, enforces rules (“you can’t book a room that is already taken”), takes payments and sends emails. The frontend asks it for things over the network and shows the results.',
    analogy:
      'The restaurant kitchen and storeroom: hidden from diners, it holds the ingredients (data), follows the recipes (rules) and prepares what was ordered.',
    example:
      'When you tap “Send” on a Venmo payment, the backend verifies your login token, checks your balance in a database, records the transaction, notifies the recipient and responds { "status": "completed" } to the app.',
    whyItMatters:
      'Anything that must be trusted — prices, permissions, account balances — has to be enforced on the backend, because users can modify anything that runs on their own device. Backend choices also drive hosting costs and scalability.',
    misconception:
      'The backend is not the same as the database. The database is one part the backend uses to store data; the backend is the code that decides what to read, write and allow. Also, “backend” is not one machine — it can be many services.',
    question: 'What does the backend of an app do?',
    canonicalAnswer:
      'It runs on servers behind the scenes — storing and processing data, enforcing rules and security, and answering the frontend’s requests.',
    acceptedAnswers: ['runs on the server', 'behind the scenes logic', 'server side logic'],
    keyIdeas: [
      {
        id: 'hidden-server',
        label: 'runs on servers behind the scenes',
        terms: ['server', 'behind the scenes', 'hidden', 'cant see', 'out of sight', 'invisible', 'under the hood',
          'engine', 'cloud', 'not visible'],
      },
      {
        id: 'data-logic',
        label: 'handles data, logic and security',
        terms: ['data', 'database', 'logic', 'rules', 'process', 'store', 'security', 'authentication', 'login',
          'payments', 'calculations', 'business'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['buttons', 'layout', 'what the user sees', 'what users see', 'colors', 'user interface'],
        feedback: 'That is the frontend. The backend is the hidden part on the servers that handles data, rules and security.',
      },
    ],
    hint: 'If the frontend is the dining room, what happens in the kitchen?',
    relatedConceptIds: ['frontend', 'full-stack', 'server', 'database', 'api', 'authentication'],
    prerequisiteIds: ['server', 'frontend'],
    deepDive:
      'Backends are written in many languages (Python, JavaScript/Node, Go, Java, Ruby) and usually expose an API — a set of endpoints like POST /api/orders — that frontends and mobile apps call. Behind it sit databases, caches, queues and third-party services.',
    testAnswers: {
      correct: [
        'the server side stuff that handles the data',
        'behind the scenes logic and the database',
        'it processes payments and stores data on the server',
      ],
      incorrect: ['the buttons and layout the user sees', 'the colors and fonts of the site'],
    },
  },
  {
    id: 'full-stack',
    term: 'Full-stack development',
    trackId: 'web',
    difficulty: 2,
    definition:
      'Full-stack means working across both the frontend (what users see) and the backend (servers, data and logic) of an application.',
    plainEnglish:
      'A “stack” is the set of layers a product is built from — interface, server code, database, hosting. A full-stack developer can build a feature end to end: the form on the page, the API that receives it, and the database table that stores it.',
    analogy:
      'A chef-owner who can cook in the kitchen and also run the dining room — not necessarily the best at each, but able to deliver the whole meal.',
    example:
      'Adding a “Save to favourites” heart: a full-stack developer builds the heart button in React, writes a POST /api/favorites endpoint in Node.js, and adds a favorites table in PostgreSQL linking user IDs to product IDs.',
    whyItMatters:
      'Small teams and startups lean on full-stack developers because one person can ship a whole feature. Frameworks like Next.js, Rails and Django are popular partly because they make full-stack work easier.',
    misconception:
      'Full-stack does not mean “expert at everything”. It means comfortable across layers; deep specialists in frontend performance, databases or infrastructure are still essential as products grow.',
    question: 'What does “full-stack” mean?',
    canonicalAnswer: 'Working on both the frontend and the backend of an application.',
    acceptedAnswers: ['frontend and backend', 'front end and back end', 'both front and back end'],
    keyIdeas: [
      {
        id: 'front',
        label: 'the frontend',
        terms: ['frontend', 'front end', 'front-end', 'front', 'user interface', 'ui', 'client side', 'what users see'],
      },
      {
        id: 'back',
        label: 'the backend',
        terms: ['backend', 'back end', 'back-end', 'back', 'server', 'database', 'server side'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['only the frontend', 'only frontend', 'only the backend', 'only backend', 'type of database', 'kind of database'],
        feedback: 'Full-stack covers both layers — the frontend users see and the backend servers and data.',
      },
    ],
    hint: 'A stack has layers. Which ones does “full” cover?',
    relatedConceptIds: ['frontend', 'backend', 'framework', 'database', 'api'],
    prerequisiteIds: ['frontend', 'backend'],
    deepDive:
      'Common stack acronyms: MERN (MongoDB, Express, React, Node), LAMP (Linux, Apache, MySQL, PHP). Today “full-stack” often also includes deploying and hosting the app, though large companies split that into DevOps or platform teams.',
    testAnswers: {
      correct: [
        'you work on both the front end and the back end',
        'doing frontend and backend',
        'building the ui and also the server and database',
      ],
      partial: ['you build the frontend'],
      incorrect: ['someone who only does the frontend', 'a type of database'],
    },
  },
  {
    id: 'html',
    term: 'HTML (HyperText Markup Language)',
    trackId: 'web',
    difficulty: 1,
    definition:
      'HTML is the markup language that describes the structure and content of a web page — headings, paragraphs, links, images, buttons — using tags.',
    plainEnglish:
      'HTML is the skeleton of every web page. You wrap content in tags that say what it is: <h1> for a main heading, <p> for a paragraph, <a> for a link, <img> for an image. The browser reads these tags to know what is on the page; CSS then decides how it looks.',
    analogy:
      'The labelled frame of a house: this is a door, this is a window, this is a room. It says what each part is, not what colour it is painted.',
    example:
      '<h1>Spring Sale</h1>\n<p>Everything is <strong>30% off</strong> until Sunday.</p>\n<a href="https://shop.example.com/sale">Shop now</a>\n<img src="hero.jpg" alt="Woman in a linen jacket">',
    whyItMatters:
      'Every website is HTML underneath. Good HTML — using the right tags for headings, buttons and forms — makes pages accessible to screen readers, understandable to search engines, and easier to style.',
    misconception:
      'HTML is not a programming language — it cannot make decisions or do calculations. It only describes content and structure. Styling is CSS’s job, and behaviour (reacting to clicks) is JavaScript’s.',
    question: 'What is HTML responsible for on a web page?',
    canonicalAnswer: 'The structure and content of the page — headings, paragraphs, links, images — described with tags.',
    acceptedAnswers: ['structure of a web page', 'structure and content', 'skeleton of the page'],
    keyIdeas: [
      {
        id: 'structure',
        label: 'structure and content',
        terms: ['structure', 'content', 'skeleton', 'layout of elements', 'headings', 'paragraphs', 'elements',
          'tags', 'markup', 'what is on the page', 'text and images', 'bones', 'organizes'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['colors', 'colours', 'styling', 'style', 'fonts', 'how it looks', 'looks pretty'],
        feedback: 'Styling is CSS’s job. HTML describes what is on the page — its structure and content.',
      },
      {
        terms: ['programming language', 'interactive', 'logic', 'clicks'],
        feedback: 'Behaviour and logic belong to JavaScript. HTML only describes the page’s structure and content.',
      },
    ],
    hint: 'If CSS is the paint and JavaScript is the wiring, what is HTML?',
    relatedConceptIds: ['css', 'javascript', 'dom', 'browser', 'accessibility', 'rendering'],
    prerequisiteIds: ['browser'],
    deepDive:
      '“Semantic” HTML uses tags that carry meaning — <nav>, <main>, <button>, <label> — rather than generic <div>s everywhere. Browsers, screen readers and search engines all rely on that meaning. HTML5 also added native video, audio and form validation.',
    challengeId: 'first-webpage',
    testAnswers: {
      correct: [
        'the structure of the page',
        'the content like headings and paragraphs',
        'its the skeleton, the tags that say whats on the page',
      ],
      incorrect: ['it makes the page look pretty with colors', 'it is the programming language that handles clicks'],
    },
  },
  {
    id: 'css',
    term: 'CSS (Cascading Style Sheets)',
    trackId: 'web',
    difficulty: 1,
    definition:
      'CSS is the language that controls how HTML elements look — colours, fonts, spacing, sizes and layout — through rules that target elements.',
    plainEnglish:
      'If HTML says “this is a heading and this is a button”, CSS says “headings are dark blue and 32 pixels; buttons are rounded with a green background”. A CSS rule picks which elements to style (a selector) and then lists the visual properties to apply.',
    analogy:
      'Paint, furniture and interior design for the house that HTML built. Same rooms, completely different feel.',
    example:
      'h1 { font-family: Georgia, serif; color: #1a2b4c; }\n.buy-button { background: #22a06b; color: white; padding: 12px 24px; border-radius: 8px; }\n@media (max-width: 600px) { .sidebar { display: none; } }',
    whyItMatters:
      'CSS turns plain structured documents into branded, usable products. It also controls layout across screen sizes, so it is central to responsive design and a big part of how “polished” a product feels.',
    misconception:
      'CSS does not change what is on the page or make it interactive — it changes how existing content looks. Content is HTML; reacting to clicks or loading data is JavaScript.',
    question: 'What does CSS control on a web page?',
    canonicalAnswer: 'How the page looks — colours, fonts, spacing and layout of the HTML elements.',
    acceptedAnswers: ['how the page looks', 'style of the page', 'styling'],
    keyIdeas: [
      {
        id: 'appearance',
        label: 'the look / styling',
        terms: ['look', 'looks', 'style', 'styling', 'appearance', 'design', 'colors', 'colours', 'fonts', 'spacing',
          'layout', 'visual', 'pretty', 'presentation', 'sizes'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['structure', 'content', 'database', 'logic', 'behavior', 'behaviour'],
        feedback: 'CSS does not define content or behaviour — HTML gives structure, JavaScript gives behaviour. CSS controls how it all looks.',
      },
    ],
    hint: 'HTML says what something is. What does CSS say about it?',
    relatedConceptIds: ['html', 'responsive-design', 'rendering', 'frontend', 'developer-tools'],
    prerequisiteIds: ['html'],
    deepDive:
      '“Cascading” means several rules can apply to the same element, and the browser resolves conflicts by specificity and order. Modern layout tools — Flexbox and Grid — replaced old hacks. Many teams use utility frameworks like Tailwind or component-scoped styles.',
    challengeId: 'make-it-beautiful',
    testAnswers: {
      correct: [
        'how the website looks',
        'colors fonts and layout',
        'the styling and design of the page',
      ],
      incorrect: ['the content and structure of the page', 'the logic that runs when you click'],
    },
  },
  {
    id: 'javascript',
    term: 'JavaScript',
    trackId: 'web',
    difficulty: 2,
    definition:
      'JavaScript is the programming language that runs in web browsers to make pages interactive — responding to clicks, updating content and fetching data without reloading.',
    plainEnglish:
      'HTML and CSS make a page that just sits there. JavaScript adds behaviour: open a menu when you tap it, check a form before sending, load more posts as you scroll, show a live price total. It is a full programming language, and it also runs on servers via Node.js.',
    analogy:
      'The electrical wiring and appliances of the house: flip a switch and a light comes on, press a button and the garage door opens.',
    example:
      'const button = document.querySelector("#like");\nlet likes = 0;\nbutton.addEventListener("click", () => {\n  likes = likes + 1;\n  button.textContent = `❤️ ${likes}`;\n});',
    whyItMatters:
      'JavaScript is the only language every browser runs natively, which makes it the most widely used programming language in the world. Almost every interactive web feature — and frameworks like React — are built on it.',
    misconception:
      'JavaScript has nothing to do with Java apart from the name (a 1990s marketing decision). And it is not only for browsers — Node.js runs JavaScript on servers, which is why “JavaScript developer” can mean frontend or backend.',
    question: 'What does JavaScript add to a web page that HTML and CSS can’t?',
    canonicalAnswer:
      'Interactivity and behaviour — it is a programming language that reacts to user actions and updates the page.',
    acceptedAnswers: ['makes it interactive', 'interactivity', 'adds behavior'],
    keyIdeas: [
      {
        id: 'interactive',
        label: 'interactivity / behaviour',
        terms: ['interactive', 'interactivity', 'interaction', 'behavior', 'behaviour', 'logic', 'react to', 'respond',
          'clicks', 'dynamic', 'functionality', 'do things', 'actions', 'update the page', 'programming', 'events'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['same as java', 'version of java', 'colors', 'how it looks'],
        feedback: 'JavaScript is unrelated to Java and does not handle styling (that is CSS). It adds behaviour and interactivity.',
      },
    ],
    hint: 'What happens when you click a “like” button and the number goes up without reloading?',
    relatedConceptIds: ['html', 'css', 'dom', 'event', 'event-handler', 'programming-language'],
    prerequisiteIds: ['html', 'css'],
    deepDive:
      'Browsers run JavaScript in a single main thread with an event loop: your code reacts to events (clicks, timers, network replies) one at a time. Heavy work blocks that thread and makes the page feel frozen. TypeScript is JavaScript with type annotations, compiled down to plain JavaScript.',
    testAnswers: {
      correct: [
        'it makes the page interactive',
        'behavior, like doing stuff when you click',
        'logic so the page can respond to the user',
      ],
      incorrect: ['its basically java for the web', 'it decides the colors and fonts'],
    },
  },
  {
    id: 'dom',
    term: 'DOM (Document Object Model)',
    trackId: 'web',
    difficulty: 3,
    definition:
      'The DOM is the browser’s live, in-memory tree of objects representing a loaded page, which JavaScript can read and change to update what is shown.',
    plainEnglish:
      'When a browser reads HTML, it builds a tree of “nodes” — the page, then the body, then each heading, paragraph and button inside it. That tree is the DOM. JavaScript changes the page by changing the DOM: adding a node, editing text, hiding an element. The screen updates to match.',
    analogy:
      'HTML is the architect’s blueprint; the DOM is the actual building you can walk into and rearrange. Move a wall in the building and the blueprint on paper stays the same.',
    example:
      'HTML: <ul id="cart"></ul>\nJavaScript:\nconst item = document.createElement("li");\nitem.textContent = "Linen shirt – $49";\ndocument.getElementById("cart").appendChild(item);\nThe cart now shows the item — the DOM changed, the original HTML file did not.',
    whyItMatters:
      'Every interactive web feature works by changing the DOM. Frameworks like React exist largely to manage DOM updates efficiently, and the Elements panel in developer tools shows you the live DOM, not the original HTML.',
    misconception:
      'The DOM is not the same as the HTML source. The HTML is the text file the server sent; the DOM is the live structure built from it, which JavaScript may have changed. “View source” shows HTML; the Elements panel shows the DOM.',
    question: 'What is the DOM, and how does JavaScript use it?',
    canonicalAnswer:
      'It is the browser’s live tree of objects representing the page; JavaScript reads and changes it to update what you see.',
    acceptedAnswers: ['live tree of the page', 'tree of elements javascript can change'],
    keyIdeas: [
      {
        id: 'representation',
        label: 'a live tree/model of the page',
        terms: ['tree', 'model', 'representation', 'structure', 'objects', 'nodes', 'live version', 'in memory',
          'elements', 'page'],
      },
      {
        id: 'js-changes',
        label: 'which JavaScript reads and changes',
        terms: ['change', 'modify', 'update', 'manipulate', 'edit', 'add', 'remove', 'javascript', 'js', 'code',
          'access', 'read'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['same as the html file', 'just the html', 'the source code', 'database'],
        feedback: 'Not quite — the DOM is built from the HTML but is a separate, live structure in the browser that JavaScript can change without touching the file.',
      },
    ],
    hint: 'The browser turns HTML into something JavaScript can grab and rearrange. What shape is it?',
    relatedConceptIds: ['html', 'javascript', 'rendering', 'event', 'browser-console', 'developer-tools'],
    prerequisiteIds: ['html', 'javascript'],
    deepDive:
      'DOM APIs include document.querySelector, element.classList, element.addEventListener and element.remove(). Each change can trigger the browser to recalculate layout and repaint, which is why frameworks batch updates — React’s “virtual DOM” compares versions and applies only the minimum changes.',
    challengeId: 'button-counter',
    testAnswers: {
      correct: [
        'a tree of the page that javascript can change',
        'the live model of the page elements, js updates it',
        'browsers structure of objects for the page that code can modify',
      ],
      partial: ['a tree of the page'],
      incorrect: ['its just the html file', 'a database for websites'],
    },
  },
  {
    id: 'rendering',
    term: 'Rendering (in the browser)',
    trackId: 'web',
    difficulty: 3,
    definition:
      'Rendering is the process of turning code and data — HTML, CSS, JavaScript and content — into the actual pixels you see on screen.',
    plainEnglish:
      'Code is just text; the screen needs pixels. Rendering is the work of getting from one to the other. The browser parses HTML into the DOM, applies CSS to work out each element’s size and position (layout), then draws everything (paint). In app frameworks, “render” also means producing the HTML/DOM from data.',
    analogy:
      'A printer turning a document file into ink on paper — or an architect’s plans being turned into a finished, furnished room.',
    example:
      'Your browser receives <h1 class="title">Hello</h1> and the CSS .title { font-size: 48px; color: navy }. It builds the DOM, calculates that the heading is 1,200 × 58 pixels at the top, and paints navy letters there. In React, `function Greeting() { return <h1>Hello, {name}</h1>; }` “renders” to that heading.',
    whyItMatters:
      'Slow rendering means janky scrolling, layout shifts and poor Core Web Vitals scores, which hurt both users and SEO. Teams also debate where rendering should happen — in the browser (CSR) or on the server (SSR).',
    misconception:
      'Rendering is not the same as downloading. A page can arrive fully and still render slowly because of heavy CSS or JavaScript. And “render” in web apps is different from 3D/video rendering, though both mean producing visuals from data.',
    question: 'What does “rendering” mean for a web page?',
    canonicalAnswer: 'Turning the page’s code and data into the visual output — the pixels you see on screen.',
    acceptedAnswers: ['turning code into what you see', 'drawing the page on screen', 'code into pixels'],
    keyIdeas: [
      {
        id: 'turn-into',
        label: 'turning code/data into',
        terms: ['turn', 'turning', 'convert', 'transform', 'process', 'translate', 'build', 'produce', 'generate',
          'draw', 'drawing', 'paint', 'painting', 'from code', 'from html'],
      },
      {
        id: 'visual',
        label: 'what you see on screen',
        terms: ['see', 'screen', 'pixels', 'visual', 'display', 'show', 'page', 'image', 'view', 'visible'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['download', 'downloading', 'hosting', 'saving'],
        feedback: 'Downloading just gets the code. Rendering is turning that code into what you actually see on screen.',
      },
    ],
    hint: 'The browser has a pile of HTML and CSS text. What must happen before you can see anything?',
    relatedConceptIds: ['dom', 'html', 'css', 'client-side-rendering', 'server-side-rendering', 'browser'],
    prerequisiteIds: ['html', 'css', 'dom'],
    deepDive:
      'The browser’s pipeline: parse HTML → DOM, parse CSS → CSSOM, combine into a render tree, layout (geometry), paint, composite layers on the GPU. Changing an element’s width forces layout again (expensive); changing its transform or opacity can skip straight to compositing (cheap).',
    testAnswers: {
      correct: [
        'turning the code into what you see on the screen',
        'drawing the page so its visible',
        'converting html and css into pixels',
      ],
      partial: ['processing the code'],
      incorrect: ['downloading the website files', 'saving the page to the server'],
    },
  },
  {
    id: 'event',
    term: 'Event (in the browser)',
    trackId: 'web',
    difficulty: 2,
    definition:
      'An event is a signal that something happened — a click, a key press, a scroll, a form submission, a page finishing loading — that code can respond to.',
    plainEnglish:
      'Browsers constantly announce things that happen: “the user clicked this button”, “a key was pressed in this box”, “the window was resized”. Each announcement is an event. Your code can choose to listen for specific events and run something when they occur.',
    analogy:
      'A doorbell ringing. The ring is the event; deciding to go open the door is your response to it.',
    example:
      'Typing “a” in a search box fires keydown, input and keyup events. Pressing Enter in a form fires a submit event. Common event names: click, input, change, submit, keydown, scroll, load.',
    whyItMatters:
      'Interactive software is event-driven: nothing happens until an event occurs. Product analytics (“track when users click Upgrade”) is literally built on capturing events.',
    misconception:
      'An event is not the code that runs — that is the event handler. The event is the “something happened”; the handler is “what to do about it”. Also, “event” in analytics tools (Mixpanel, Amplitude) is a related but separate idea: a logged record of a user action.',
    question: 'In web development, what is an event?',
    canonicalAnswer: 'A signal that something happened — like a click or key press — that code can respond to.',
    acceptedAnswers: ['something that happens like a click', 'a user action like a click'],
    keyIdeas: [
      {
        id: 'happened',
        label: 'something happening (a click, key press…)',
        terms: ['happens', 'happened', 'occurs', 'occurred', 'action', 'click', 'key press', 'keypress', 'scroll',
          'submit', 'signal', 'trigger', 'interaction', 'user does', 'hover', 'tap'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['calendar', 'meeting', 'conference', 'party'],
        feedback: 'Not that kind of event! In code, an event is a signal that something happened — like a click or a key press.',
      },
      {
        terms: ['function that runs', 'code that runs', 'the handler'],
        feedback: 'That is the event handler. The event itself is the signal that something happened, like a click.',
      },
    ],
    hint: 'Think of a doorbell ringing. What is the ring?',
    relatedConceptIds: ['event-handler', 'javascript', 'dom', 'state', 'form-validation'],
    prerequisiteIds: ['javascript'],
    deepDive:
      'Events “bubble” up the DOM tree: a click on a button inside a card also reaches the card and the page. This lets one listener on a parent handle clicks for many children (event delegation). Code can call event.preventDefault() to stop the browser’s default behaviour, like submitting a form.',
    challengeId: 'button-counter',
    testAnswers: {
      correct: [
        'something that happens like a click',
        'when the user does an action like pressing a key',
        'a signal that a button was clicked',
      ],
      incorrect: ['a calendar meeting', 'the code that runs after a click'],
    },
  },
  {
    id: 'event-handler',
    term: 'Event handler',
    trackId: 'web',
    difficulty: 2,
    definition:
      'An event handler is a function that is attached to an element and runs automatically whenever a particular event, like a click, happens on it.',
    plainEnglish:
      'An event handler is your answer to “when this happens, do that”. You attach a function to a button (or any element) for a specific event; the browser calls that function every time the event fires.',
    analogy:
      'Instructions taped next to the doorbell: “When the bell rings, check the camera, then open the door.” The bell is the event; the instructions are the handler.',
    example:
      'document.querySelector("#add-to-cart").addEventListener("click", () => {\n  cartCount += 1;\n  badge.textContent = cartCount;\n});\nIn React the same idea is written <button onClick={addToCart}>Add to cart</button>.',
    whyItMatters:
      'Handlers are where interactive behaviour actually lives. A “button does nothing” bug often means the handler was never attached, is attached to the wrong element, or throws an error.',
    misconception:
      'The handler is not the event. The event is the click; the handler is the function that responds. Also, you pass the function itself (onClick={save}) — calling it (onClick={save()}) runs it immediately on render, a classic beginner bug.',
    question: 'What does an event handler do?',
    canonicalAnswer: 'It is a function that runs automatically when a specific event (like a click) happens.',
    acceptedAnswers: ['runs code when an event happens', 'function that runs on click', 'responds to events'],
    keyIdeas: [
      {
        id: 'runs-code',
        label: 'runs code / a function',
        terms: ['runs', 'run', 'function', 'code', 'executes', 'execute', 'responds', 'response', 'reacts', 'handles',
          'does something', 'callback', 'triggered', 'called'],
      },
      {
        id: 'when-event',
        label: 'when an event happens',
        terms: ['event', 'click', 'clicked', 'happens', 'occurs', 'key press', 'submit', 'when', 'user action', 'fires'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['click itself', 'calendar'],
        feedback: 'The click is the event. The handler is the function that runs in response to it.',
      },
    ],
    hint: 'When the doorbell rings, who decides what to do?',
    relatedConceptIds: ['event', 'function', 'javascript', 'state', 'dom'],
    prerequisiteIds: ['event', 'function'],
    deepDive:
      'A handler receives an event object with details: which element was clicked (event.target), which key was pressed (event.key), mouse coordinates and more. Handlers can be removed with removeEventListener — forgetting to clean them up is a common source of memory leaks in single-page apps.',
    challengeId: 'button-counter',
    testAnswers: {
      correct: [
        'runs a function when you click something',
        'code that responds when an event happens',
        'it reacts to the user clicking',
      ],
      partial: ['it runs some code'],
      incorrect: ['it is the click itself', 'stores data in a database'],
    },
  },
  {
    id: 'state',
    term: 'State (UI state)',
    trackId: 'web',
    difficulty: 3,
    definition:
      'State is the data an app remembers at a given moment — like what is in the cart, which tab is open or what someone has typed — that determines what the interface shows.',
    plainEnglish:
      'An app has to remember things while you use it: is the menu open? how many likes? is the user logged in? That remembered, changeable data is state. When state changes (you click “like”), the interface updates to reflect it. UI = what state looks like right now.',
    analogy:
      'The scoreboard at a game. The score changes as things happen, and the display always shows the current score.',
    example:
      'In React:\nconst [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>Clicked {count} times</button>\nEach click updates the count state, and React re-renders the button with the new number.',
    whyItMatters:
      'Most frontend bugs are state bugs: the screen shows stale data, two parts of the page disagree, or a refresh loses what you typed. Deciding where state lives (component, URL, server, local storage) is a core design decision.',
    misconception:
      'State is not the same as a component’s inputs (props). Props are data passed in from outside and treated as read-only; state is data a component owns and changes itself. Also, UI state is not automatically saved — refresh the page and it is gone unless stored somewhere.',
    question: 'What is “state” in a web app?',
    canonicalAnswer:
      'The data the app is currently remembering — like a counter value or what is in the cart — which changes over time and determines what the UI shows.',
    acceptedAnswers: ['data the app remembers', 'current data that can change', 'current condition of the app'],
    keyIdeas: [
      {
        id: 'data-remembered',
        label: 'data the app remembers right now',
        terms: ['data', 'remember', 'remembers', 'stored', 'store', 'keeps track', 'track', 'current', 'right now',
          'value', 'values', 'information', 'memory', 'condition', 'situation'],
      },
      {
        id: 'changes-ui',
        label: 'changes over time and drives what is shown',
        terms: ['change', 'changes', 'update', 'updates', 'over time', 'shows', 'displays', 'ui', 'screen', 'what you see',
          're-render', 'interface'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['california', 'texas', 'government', 'us state', 'american state'],
        feedback: 'Not that kind of state! In apps, state is the data the app is currently remembering, like a counter or cart contents.',
      },
    ],
    hint: 'Think of a scoreboard. What does it hold, and when does it change?',
    relatedConceptIds: ['component', 'event-handler', 'variable', 'rendering', 'client-side-rendering', 'session'],
    prerequisiteIds: ['variable', 'event-handler'],
    deepDive:
      'State can live in many places: inside a component (useState), in a shared store (Redux, Zustand), in the URL (?tab=billing — great for shareable views), in browser storage, or on the server. A good rule: keep each piece of state in one place, and derive everything else from it.',
    challengeId: 'score-tracker',
    testAnswers: {
      correct: [
        'the data the app is remembering right now',
        'current values like whats in the cart',
        'info the app keeps track of that can change',
      ],
      incorrect: ['a us state like california', 'the colors of the website'],
    },
  },
  {
    id: 'component',
    term: 'Component',
    trackId: 'web',
    difficulty: 3,
    definition:
      'A component is a self-contained, reusable piece of user interface — like a button, a product card or a navigation bar — that bundles its own structure, style and behaviour.',
    plainEnglish:
      'Instead of building each page as one giant blob, modern apps are assembled from building blocks. You build a <ProductCard> once and reuse it a hundred times with different data. Components can contain other components, so a page is a tree of them.',
    analogy:
      'LEGO bricks. Each brick is designed once, then snapped together in different combinations to build anything.',
    example:
      'function ProductCard({ name, price, image }) {\n  return (\n    <div className="card">\n      <img src={image} alt={name} />\n      <h3>{name}</h3>\n      <p>${price}</p>\n    </div>\n  );\n}\n// Used as: <ProductCard name="Linen shirt" price={49} image="/shirt.jpg" />',
    whyItMatters:
      'Components let teams build consistent interfaces quickly: fix a bug in the Button component and every button is fixed. Design systems (like Material UI or a company’s own library) are collections of shared components.',
    misconception:
      'A component is not a whole page or app, and it is not tied to one framework — React, Vue, Svelte and native Web Components all use the idea. Components receive inputs (props) from their parent and may also hold their own state.',
    question: 'What is a component in frontend development?',
    canonicalAnswer: 'A reusable, self-contained piece of the user interface, like a button or a card, that you combine to build pages.',
    acceptedAnswers: ['reusable piece of ui', 'reusable building block', 'reusable part of the interface'],
    keyIdeas: [
      {
        id: 'reusable',
        label: 'reusable / self-contained',
        terms: ['reusable', 'reuse', 'reused', 'self contained', 'self-contained', 'building block', 'modular', 'lego',
          'over and over', 'again and again', 'multiple times', 'many places', 'independent'],
      },
      {
        id: 'ui-piece',
        label: 'a piece of the interface',
        terms: ['piece', 'part', 'chunk', 'section', 'ui', 'interface', 'button', 'card', 'element', 'block', 'page'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['hardware', 'computer part', 'cpu', 'motherboard'],
        feedback: 'In frontend development, a component is not hardware — it is a reusable piece of the user interface.',
      },
    ],
    hint: 'Think LEGO. What do you build once and snap together many times?',
    relatedConceptIds: ['state', 'framework', 'html', 'frontend', 'module', 'abstraction'],
    prerequisiteIds: ['html', 'function'],
    deepDive:
      'Good components are like good functions: they do one job, take clear inputs (props), and avoid hidden side effects. Data flows down from parents via props; events flow up via callbacks like onClick. Splitting a page into components also lets frameworks re-render only the parts that changed.',
    testAnswers: {
      correct: [
        'a reusable piece of the ui',
        'a building block like a button you can use in many places',
        'self contained part of the interface you reuse',
      ],
      partial: ['a part of the page'],
      incorrect: ['a piece of computer hardware', 'the whole website'],
    },
  },
  {
    id: 'responsive-design',
    term: 'Responsive design',
    trackId: 'web',
    difficulty: 2,
    definition:
      'Responsive design is building a page so its layout automatically adapts to fit different screen sizes, from phones to large monitors.',
    plainEnglish:
      'People open the same site on a 6-inch phone, a tablet and a 27-inch monitor. A responsive page rearranges itself to suit each: three columns on desktop might stack into one on mobile, menus collapse into a “hamburger” icon, and images shrink to fit.',
    analogy:
      'Water taking the shape of whatever glass you pour it into — same content, reshaped to the container.',
    example:
      '.products { display: grid; grid-template-columns: repeat(3, 1fr); }\n@media (max-width: 640px) {\n  .products { grid-template-columns: 1fr; }\n}\nOn screens narrower than 640px, the three-column product grid becomes a single column.',
    whyItMatters:
      'Well over half of web traffic is mobile. A site that requires pinching and sideways scrolling loses users, and Google ranks mobile-friendly pages higher. “Mobile-first” design starts from the smallest screen and expands.',
    misconception:
      'Responsive design is not the same as accessibility. Responsive is about adapting to screen sizes; accessibility is about making the site usable by people with disabilities (screen readers, keyboard-only, low vision). A site can be one without the other. It also does not mean building a separate mobile site.',
    question: 'What does responsive design make a website do?',
    canonicalAnswer: 'Adapt its layout automatically to different screen sizes, like phones, tablets and desktops.',
    acceptedAnswers: ['adapts to different screen sizes', 'works on any screen size', 'fits phones and desktops'],
    keyIdeas: [
      {
        id: 'adapts',
        label: 'adapts / adjusts its layout',
        terms: ['adapt', 'adjust', 'resize', 'rearrange', 'fit', 'fits', 'change', 'changes', 'reshape', 'scale',
          'reflow', 'looks good', 'works'],
      },
      {
        id: 'screens',
        label: 'to different screen sizes / devices',
        terms: ['screen', 'screens', 'device', 'devices', 'phone', 'phones', 'mobile', 'tablet', 'desktop', 'size',
          'sizes', 'width', 'window'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['loads fast', 'loads quickly', 'responds quickly', 'fast response', 'screen reader', 'disabilities'],
        feedback: '“Responsive” here is not about speed or accessibility — it means the layout adapts to different screen sizes.',
      },
    ],
    hint: 'Open the same site on your phone and your laptop. What should happen?',
    relatedConceptIds: ['css', 'accessibility', 'frontend', 'rendering', 'developer-tools'],
    prerequisiteIds: ['css'],
    deepDive:
      'Key ingredients: the viewport meta tag (<meta name="viewport" content="width=device-width, initial-scale=1">), fluid units (%, rem, vw), flexible layouts (Flexbox, Grid), media queries, and responsive images (srcset) so phones don’t download desktop-sized photos. Developer tools have a device mode to preview sizes.',
    testAnswers: {
      correct: [
        'it adjusts to fit any screen size',
        'looks good on phones and desktops',
        'the layout changes depending on the device',
      ],
      partial: ['it changes the layout'],
      incorrect: ['it makes the site load really fast', 'it works with screen readers for blind users'],
    },
  },
  {
    id: 'accessibility',
    term: 'Accessibility (a11y)',
    trackId: 'web',
    difficulty: 3,
    definition:
      'Accessibility is designing and building software so that people with disabilities — visual, hearing, motor or cognitive — can perceive, navigate and use it.',
    plainEnglish:
      'Some users browse with a screen reader that speaks the page aloud, some use only a keyboard, some need high contrast or captions. Accessibility means making sure they can all use your product: images have text descriptions, buttons are reachable by keyboard, colours have enough contrast, videos have captions.',
    analogy:
      'A building with ramps, lifts, braille signs and wide doors — usable by everyone, and often nicer for everyone too (think of pushing a stroller up a ramp).',
    example:
      '<img src="chart.png" alt="Revenue grew from $2M in 2024 to $5M in 2025">\n<button aria-label="Close dialog">✕</button>\n<label for="email">Email</label> <input id="email" type="email">\nA screen reader can now describe the chart, announce the close button, and tell users what the input is for.',
    whyItMatters:
      'Around 1 in 6 people live with a disability. Accessibility is often a legal requirement (ADA in the US, the European Accessibility Act, WCAG standards), and accessible products are usually clearer and easier for everyone.',
    misconception:
      'Accessibility is not the same as responsive design. Responsive is about screen sizes; accessibility is about people with different abilities and assistive technology. It is also not a final “polish” step — retrofitting it is far harder than building it in.',
    question: 'What is web accessibility about?',
    canonicalAnswer: 'Making sure people with disabilities — like blind users with screen readers or keyboard-only users — can use the site.',
    acceptedAnswers: ['usable by people with disabilities', 'people with disabilities can use it'],
    keyIdeas: [
      {
        id: 'disabilities',
        label: 'people with disabilities / assistive tech',
        terms: ['disability', 'disabilities', 'disabled', 'blind', 'deaf', 'impaired', 'impairment', 'screen reader',
          'keyboard only', 'assistive', 'low vision', 'colorblind', 'everyone', 'all users', 'all people', 'any ability'],
      },
      {
        id: 'can-use',
        label: 'being able to use it',
        terms: ['use', 'usable', 'access', 'accessible', 'navigate', 'able', 'works for', 'inclusive', 'perceive'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['screen size', 'screen sizes', 'mobile', 'phones', 'available online', 'uptime', 'password'],
        feedback: 'Accessibility is not about screen sizes, uptime or logins — it is about making the product usable for people with disabilities.',
      },
    ],
    hint: 'How would someone who cannot see the screen, or cannot use a mouse, use your site?',
    relatedConceptIds: ['html', 'responsive-design', 'frontend', 'css', 'form-validation'],
    prerequisiteIds: ['html'],
    deepDive:
      'WCAG (Web Content Accessibility Guidelines) defines levels A, AA and AAA; most laws target AA. Quick wins: semantic HTML (<button> not <div onclick>), visible focus outlines, text contrast of at least 4.5:1, alt text, labelled form fields. Tools like Lighthouse and axe catch many issues automatically.',
    testAnswers: {
      correct: [
        'making sure disabled people can use the site',
        'so blind people with screen readers can navigate it',
        'making it usable for everyone including people with disabilities',
      ],
      incorrect: ['making the site work on phones and tablets', 'making sure the site is always online'],
    },
  },
  {
    id: 'routing',
    term: 'Routing (URL routing)',
    trackId: 'web',
    difficulty: 3,
    definition:
      'Routing is the logic that decides which page, screen or code should handle a given URL path, such as showing the profile page for /users/42.',
    plainEnglish:
      'Every URL path needs a matching destination: /pricing shows the pricing page, /blog/my-post shows that post. A router maps paths to the right content. On the backend it picks which code answers the request; in a single-page app the browser-side router swaps the screen without reloading the page.',
    analogy:
      'A building directory in a lobby: “Suite 400 → Accounting, Suite 410 → Legal.” You give it an address; it tells you where to go.',
    example:
      'Express (backend):\napp.get("/users/:id", (req, res) => res.json(getUser(req.params.id)));\nReact Router (frontend):\n<Route path="/settings/billing" element={<BillingPage />} />\nVisiting /users/42 runs the first handler with id = 42.',
    whyItMatters:
      'Routing determines your app’s URLs — whether a link can be shared, bookmarked, tracked in analytics or indexed by Google. “Deep linking” to a specific screen only works if routing is designed for it.',
    misconception:
      'Web routing is not network routing. Network routers move packets between networks; a web router maps URL paths to pages or handlers inside an app. A 404 page is what you get when no route matches.',
    question: 'In a web app, what does routing do?',
    canonicalAnswer: 'It maps each URL path to the page or code that should handle it.',
    acceptedAnswers: ['maps urls to pages', 'decides which page to show for a url', 'matches the url to a page'],
    keyIdeas: [
      {
        id: 'url',
        label: 'URL path',
        terms: ['url', 'urls', 'path', 'paths', 'address', 'link', 'route', 'routes', 'web address'],
      },
      {
        id: 'maps-to',
        label: 'mapped to the right page or code',
        terms: ['page', 'pages', 'screen', 'view', 'code', 'handler', 'component', 'content', 'which', 'decide',
          'decides', 'map', 'maps', 'match', 'matches', 'show', 'destination'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['wifi router', 'router box', 'packets', 'internet connection'],
        feedback: 'That is network routing — moving packets between networks. In a web app, routing maps URL paths to the page or code that should handle them.',
      },
    ],
    hint: 'You visit /settings/billing. Something has to decide what to show. What is it matching on?',
    relatedConceptIds: ['url', 'api-endpoint', 'client-side-rendering', 'server-side-rendering', 'backend', 'frontend'],
    prerequisiteIds: ['url'],
    deepDive:
      'Routes can have parameters (/users/:id), query strings (?page=2) and nesting (/settings/billing inside a /settings layout). Frameworks like Next.js use file-based routing: a file at app/blog/[slug]/page.tsx automatically handles /blog/anything.',
    testAnswers: {
      correct: [
        'decides which page to show based on the url',
        'matches the path to the right code',
        'maps urls to screens',
      ],
      partial: ['it looks at the url'],
      incorrect: ['it sends packets through your wifi router', 'it stores user data'],
    },
  },
  {
    id: 'form-validation',
    term: 'Form validation',
    trackId: 'web',
    difficulty: 3,
    definition:
      'Form validation is checking that what a user entered into a form is complete and in the right format — and telling them what to fix — before the data is accepted.',
    plainEnglish:
      'Is the email field actually an email? Is the password long enough? Did they leave a required field blank? Validation catches these problems. It is done in the browser for instant feedback, and again on the server, because browser checks can be bypassed.',
    analogy:
      'A clerk who glances over your paperwork before accepting it: “You forgot to sign here, and this date is in the wrong format.”',
    example:
      '<input type="email" required minlength="5">\nJavaScript: if (password.length < 8) showError("Password must be at least 8 characters");\nServer: if (!isValidEmail(body.email)) return res.status(400).json({ error: "Invalid email" });',
    whyItMatters:
      'Good validation reduces frustration and support tickets (clear, inline messages) and protects data quality. Server-side validation is also a security requirement — never trust input just because the frontend checked it.',
    misconception:
      'Frontend validation is not security. Anyone can skip the browser and send a request directly with curl or developer tools. Browser checks are for user experience; the server must validate again before saving anything.',
    question: 'What is form validation, and where should it happen?',
    canonicalAnswer:
      'Checking that user input is complete and correctly formatted before accepting it — in the browser for quick feedback, and always again on the server.',
    acceptedAnswers: ['checking user input is valid', 'checking the form input is correct'],
    keyIdeas: [
      {
        id: 'check-input',
        label: 'checking user input is valid',
        terms: ['check', 'checking', 'checks', 'verify', 'validate', 'make sure', 'ensure', 'correct', 'valid',
          'right format', 'required', 'filled in', 'catches mistakes', 'errors'],
      },
      {
        id: 'server-too',
        label: 'also on the server, not only the browser',
        terms: ['server', 'backend', 'back end', 'both', 'twice', 'again', 'client and server', 'browser and server'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['only in the browser', 'only on the frontend', 'only frontend', 'just the frontend'],
        feedback: 'Browser checks help users, but they can be bypassed — validation must also happen on the server.',
      },
    ],
    hint: 'What happens if someone types “bob@” in an email field? And could they skip your page’s check?',
    relatedConceptIds: ['input-sanitization', 'event', 'backend', 'frontend', 'accessibility', 'status-code'],
    prerequisiteIds: ['html', 'event'],
    deepDive:
      'Validation checks shape and rules (is this an email? is quantity ≤ 10?); sanitization cleans input to make it safe (escaping HTML, using parameterised SQL). Servers typically answer invalid input with 400 Bad Request or 422 Unprocessable Entity and a message the frontend can display.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'checking the user typed valid stuff, on the client and the server',
        'making sure inputs are correct before submitting',
        'verifying the email is in the right format',
      ],
      incorrect: ['styling the form to look nice', 'its only needed in the browser'],
    },
  },
  {
    id: 'client-side-rendering',
    term: 'Client-side rendering (CSR)',
    trackId: 'web',
    difficulty: 4,
    definition:
      'Client-side rendering is when the server sends a mostly empty HTML page plus JavaScript, and the browser runs that JavaScript to build the page content on the user’s device.',
    plainEnglish:
      'With CSR, the first response is basically a shell: “<div id="root"></div> and here is a big JavaScript file”. The browser downloads and runs the script, which fetches data and creates the page. After that, navigating feels instant because the app updates the screen itself instead of loading new pages.',
    analogy:
      'Flat-pack furniture: you receive the parts and instructions, and assemble it yourself at home. Slower to get started, but easy to rearrange afterwards.',
    example:
      'A classic Create React App or Vite site sends:\n<body><div id="root"></div><script src="/assets/index-8f3a.js"></script></body>\nThe script then calls fetch("/api/projects") and renders the dashboard in the browser.',
    whyItMatters:
      'CSR suits highly interactive apps behind a login (dashboards, editors like Figma). The trade-offs: a slower first load, a blank screen on slow devices, and weaker SEO because crawlers may see an empty page.',
    misconception:
      'CSR vs SSR is about where the HTML is built: on the user’s device (CSR) or on the server (SSR). CSR doesn’t mean “no server” — a server still sends the files and the data APIs. Many modern apps mix both.',
    question: 'In client-side rendering, where is the page content built?',
    canonicalAnswer: 'In the user’s browser — JavaScript running on their device builds the page after it loads.',
    acceptedAnswers: ['in the browser', 'on the users device', 'on the client'],
    keyIdeas: [
      {
        id: 'browser',
        label: 'in the browser / on the user’s device',
        terms: ['browser', 'client', 'users device', 'user device', 'your device', 'your computer', 'users computer',
          'on the device', 'locally', 'frontend', 'front end', 'phone', 'laptop'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['on the server', 'server builds', 'server side', 'server renders', 'backend builds'],
        feedback: 'That is server-side rendering. In client-side rendering, JavaScript in the user’s browser builds the page.',
      },
    ],
    hint: 'The “client” in client-side is which machine?',
    relatedConceptIds: ['server-side-rendering', 'rendering', 'javascript', 'routing', 'state', 'dom'],
    prerequisiteIds: ['rendering', 'javascript', 'client'],
    deepDive:
      'CSR apps are usually “single-page applications” (SPAs): one HTML page, with a client-side router swapping views via the History API. Techniques like code-splitting (loading only the JavaScript for the current screen) and skeleton screens soften the slow initial load.',
    testAnswers: {
      correct: [
        'in the browser using javascript',
        'on the users computer',
        'the client builds it on your device',
      ],
      incorrect: ['on the server before it is sent', 'in the database'],
    },
  },
  {
    id: 'server-side-rendering',
    term: 'Server-side rendering (SSR)',
    trackId: 'web',
    difficulty: 4,
    definition:
      'Server-side rendering is when the server builds the complete HTML for a page — with the real content already in it — and sends that finished page to the browser.',
    plainEnglish:
      'With SSR, the server fetches the data, fills in the template and sends HTML that is ready to display. The user sees content as soon as it arrives, even before any JavaScript runs. JavaScript can then “hydrate” the page to make it interactive.',
    analogy:
      'Furniture delivered fully assembled. It takes the shop a bit more work, but you can sit on it the moment it arrives.',
    example:
      'Requesting https://news.example.com/articles/42 returns:\n<article><h1>City council approves new bike lanes</h1><p>The vote passed 7–2…</p></article>\nThe headline is in the HTML itself. Frameworks like Next.js, Remix, Rails and Django render pages this way.',
    whyItMatters:
      'SSR gives faster first paint and reliable SEO — important for marketing sites, e-commerce and content. The cost is more work on your servers per request, which is why some pages are pre-rendered at build time instead (static site generation).',
    misconception:
      'SSR is not the opposite of interactivity, and it is not old-fashioned. Modern SSR frameworks send ready-made HTML and then add JavaScript for interactivity. The CSR/SSR difference is only about where the first HTML is built.',
    question: 'In server-side rendering, what does the browser receive?',
    canonicalAnswer: 'Fully built HTML with the content already in it, generated by the server before sending.',
    acceptedAnswers: ['ready made html', 'finished page from the server', 'fully built html'],
    keyIdeas: [
      {
        id: 'ready-html',
        label: 'a ready-made page / full HTML',
        terms: ['full html', 'complete html', 'finished', 'ready', 'fully built', 'fully rendered', 'already built',
          'pre built', 'prebuilt', 'complete page', 'whole page', 'content already', 'ready to display', 'built page',
          'rendered page', 'html with the content', 'already rendered', 'everything in it', 'all the content'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['empty page', 'empty shell', 'blank page', 'browser builds', 'javascript builds'],
        feedback: 'That describes client-side rendering. With SSR, the server sends HTML that already contains the content.',
      },
    ],
    hint: 'Assembled furniture or flat-pack? Who did the assembly?',
    relatedConceptIds: ['client-side-rendering', 'rendering', 'server', 'html', 'backend', 'framework'],
    prerequisiteIds: ['rendering', 'server', 'html'],
    deepDive:
      '“Hydration” is the step where the browser runs the page’s JavaScript and attaches event handlers to the server-rendered HTML. Variants include static site generation (render once at build time), incremental regeneration, and streaming SSR, which sends the page in chunks as data becomes ready.',
    testAnswers: {
      correct: [
        'a fully built html page from the server',
        'the page already rendered with everything in it',
        'the finished page with all the content already in it',
        'complete html that the server made',
      ],
      incorrect: ['an empty page that javascript fills in', 'just the css'],
    },
  },
  {
    id: 'browser-console',
    term: 'Browser console',
    trackId: 'web',
    difficulty: 2,
    definition:
      'The browser console is a panel in the browser’s developer tools that shows messages and errors from a page’s JavaScript and lets you type and run JavaScript directly.',
    plainEnglish:
      'Open it with F12 (or Cmd+Option+J on a Mac in Chrome). It shows what the page’s code has logged, plus red error messages when something breaks. You can also type commands — like document.title — and see the result immediately, which makes it a handy place to investigate.',
    analogy:
      'The diagnostic port on a car: plug in and see error codes, and even send test commands, without opening the engine.',
    example:
      'Code writes console.log("cart total:", total) → the console shows “cart total: 129.5”.\nA bug shows in red: “Uncaught TypeError: Cannot read properties of undefined (reading \'price\') at checkout.js:42”.\nTyping document.querySelectorAll("img").length returns 37.',
    whyItMatters:
      'When something “doesn’t work” on a website, the console is the first place to look. Pasting the red error text into a bug report saves engineers huge amounts of time.',
    misconception:
      'The console is not the same as the computer’s terminal/command line. The console runs JavaScript inside one web page; a terminal runs commands on your whole operating system. Also, never paste code into the console because a stranger told you to — it runs with your logged-in access to that site.',
    question: 'What can you use the browser console for?',
    canonicalAnswer: 'To see a page’s JavaScript errors and log messages, and to run JavaScript commands directly on the page.',
    acceptedAnswers: ['see errors and run javascript', 'view errors and logs'],
    keyIdeas: [
      {
        id: 'errors-logs',
        label: 'seeing errors and logged messages',
        terms: ['errors', 'error', 'logs', 'log', 'messages', 'warnings', 'console.log', 'debug', 'debugging',
          'see what went wrong', 'bugs', 'output'],
      },
      {
        id: 'run-js',
        label: 'running JavaScript directly',
        terms: ['run javascript', 'run js', 'run code', 'type code', 'execute', 'commands', 'test code', 'try code',
          'type javascript', 'run commands'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['video game', 'playstation', 'xbox', 'change the server', 'edit the database'],
        feedback: 'The browser console is a developer tool for seeing a page’s errors and logs and running JavaScript — it cannot change the server or its database.',
      },
    ],
    hint: 'Where do JavaScript errors show up in red?',
    relatedConceptIds: ['developer-tools', 'javascript', 'debugging', 'error', 'dom'],
    prerequisiteIds: ['javascript'],
    deepDive:
      'Beyond console.log there are console.error, console.warn, console.table (prints arrays as a table) and console.time/timeEnd for quick timing. The console runs in the context of the current page, so it can read and change the DOM and any global variables.',
    testAnswers: {
      correct: [
        'seeing error messages from the page',
        'run javascript commands and see logs',
        'debugging, it shows the errors',
      ],
      incorrect: ['playing video games', 'editing the servers database directly'],
    },
  },
  {
    id: 'developer-tools',
    term: 'Browser developer tools',
    trackId: 'web',
    difficulty: 2,
    definition:
      'Developer tools are a set of panels built into browsers that let you inspect and temporarily edit a page’s HTML and CSS, watch its network requests, read console errors and measure performance.',
    plainEnglish:
      'Right-click anything on a web page and choose “Inspect”. You will see the live structure of the page, the styles applied, every request the page made, and much more. You can tweak things to experiment — changes only affect your own screen and disappear on refresh.',
    analogy:
      'An X-ray machine plus a mechanic’s toolbox for web pages: see inside, test changes, find what is broken.',
    example:
      'In Chrome DevTools: the Elements panel lets you change a button’s colour live; the Network panel shows GET /api/orders → 500 Internal Server Error taking 2.3s; the Lighthouse panel scores the page for performance and accessibility; device mode previews it at iPhone size.',
    whyItMatters:
      'DevTools is the main way engineers debug the frontend, and they are useful for non-engineers too: checking which request failed, testing copy changes, or previewing mobile layouts before filing a ticket.',
    misconception:
      'Editing a page in DevTools does not change the real website. You are only changing the copy in your own browser — refresh and it is gone. (Which is also why “screenshots” of edited pages prove nothing.)',
    question: 'What are browser developer tools used for?',
    canonicalAnswer: 'Inspecting and debugging a web page — looking at its HTML/CSS, network requests, errors and performance, and testing temporary changes.',
    acceptedAnswers: ['inspect and debug web pages', 'inspecting the page', 'debugging websites'],
    keyIdeas: [
      {
        id: 'inspect-debug',
        label: 'inspecting and debugging a page',
        terms: ['inspect', 'inspecting', 'debug', 'debugging', 'look inside', 'see the code', 'examine', 'analyze',
          'investigate', 'troubleshoot', 'find bugs', 'fix bugs', 'test', 'network requests', 'elements', 'see the html',
          'see the css', 'performance'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['permanently change', 'change the real website', 'edit the live site', 'hack'],
        feedback: 'Changes in developer tools only affect your own browser and vanish on refresh. They are for inspecting and debugging, not editing the real site.',
      },
    ],
    hint: 'Right-click a page and choose “Inspect”. What can you do there?',
    relatedConceptIds: ['browser-console', 'dom', 'debugging', 'request', 'css', 'html'],
    prerequisiteIds: ['browser', 'html'],
    deepDive:
      'Key panels: Elements (live DOM and CSS), Console, Network (every request with timing, headers and responses), Sources (set breakpoints and step through JavaScript), Application (cookies, local storage), Performance and Lighthouse. Network throttling simulates a slow 3G connection.',
    testAnswers: {
      correct: [
        'inspecting a page to debug it',
        'looking at the html and css and network requests',
        'finding bugs on a website',
      ],
      incorrect: ['permanently changing the real website', 'building the database'],
    },
  },
];

export default concepts;
