import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'internet',
    term: 'The Internet',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'The internet is a worldwide network of networks: billions of computers and devices linked by cables, radio and routers so they can send data to one another.',
    plainEnglish:
      'The internet is the physical and logical plumbing that connects computers all over the world. Undersea fibre cables, cell towers, Wi‑Fi routers and huge switching centres pass little packets of data from one machine to another. Email, video calls, games and websites are all things that travel over it.',
    analogy:
      'The global road system. Roads, highways and bridges connect every town; trucks (data packets) carry all kinds of cargo along them. The roads do not care whether the cargo is a letter, a sofa or a pizza.',
    example:
      'When you send a WhatsApp message from Toronto to Lisbon, it is chopped into packets that hop through your home router, your ISP, an undersea cable under the Atlantic and several routers in Europe before reaching your friend’s phone — usually in under a quarter of a second.',
    whyItMatters:
      'Every online product depends on it. Knowing that the internet is a shared network of networks explains why things can be slow, why outages happen in one region and not another, and why “just put it online” always involves real infrastructure.',
    misconception:
      'The internet is not the same as the web. The internet is the network itself; the web (websites you open in a browser) is just one of many services that run on top of it, alongside email, streaming, online games and app traffic.',
    question: 'What is the internet, at its most basic?',
    canonicalAnswer:
      'A global network of networks — billions of computers and devices connected together so they can send data to each other.',
    acceptedAnswers: ['network of networks', 'global network of computers', 'worldwide network of computers'],
    keyIdeas: [
      {
        id: 'network',
        label: 'computers connected in a network',
        terms: ['network', 'connected computers', 'computers connected', 'connected devices', 'devices connected',
          'linked computers', 'computers linked', 'interconnected', 'connected together', 'cables', 'routers'],
      },
      {
        id: 'global',
        label: 'spanning the whole world',
        terms: ['global', 'worldwide', 'world', 'everywhere', 'billions', 'millions', 'giant', 'huge', 'massive',
          'all over', 'planet', 'across countries'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['websites', 'web pages', 'webpages', 'browser', 'google'],
        feedback: 'That describes the web — the pages you open in a browser. The internet is the underlying network of connected computers that the web (and email, games, video) runs on.',
      },
    ],
    hint: 'Forget websites for a moment. What physically links your laptop to a computer on another continent?',
    relatedConceptIds: ['web', 'network', 'ip-address', 'protocol', 'bandwidth', 'latency'],
    prerequisiteIds: ['network'],
    deepDive:
      'The internet is held together by a shared protocol suite, TCP/IP. IP gives every device an address and moves packets hop by hop; TCP reassembles them in order and re-sends lost ones. No single company owns it — thousands of networks (ISPs, universities, cloud providers) agree to carry each other’s traffic.',
    testAnswers: {
      correct: [
        'a giant network of computers all connected',
        'computers around the world connected together',
        'a worldwide network that links devices',
      ],
      partial: ['a bunch of computers connected together'],
      incorrect: ['all the websites you can visit in a browser', 'a program that shows you pages'],
    },
  },
  {
    id: 'web',
    term: 'The Web (World Wide Web)',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'The World Wide Web is a huge collection of pages and files, linked to each other by hyperlinks, that browsers fetch over the internet using HTTP.',
    plainEnglish:
      'The web is the part of the internet you experience as websites. Each page has an address (a URL), can link to other pages, and is delivered by a server when your browser asks for it. It was invented by Tim Berners-Lee in 1989, about twenty years after the internet itself began.',
    analogy:
      'If the internet is the road system, the web is one particular delivery service that uses those roads — a giant library courier that brings you any page you ask for, with each page pointing to others.',
    example:
      'Typing https://en.wikipedia.org/wiki/Octopus into a browser fetches one web page. Clicking the blue link “cephalopod” on it fetches another. That chain of linked pages is the web; the cables carrying them are the internet.',
    whyItMatters:
      'Most products people build — marketing sites, SaaS dashboards, online stores — are web products. Knowing the web is a layer on top of the internet helps you understand why a mobile app or an email can work while a website is down, and vice versa.',
    misconception:
      'The web and the internet are not synonyms. Email, Zoom calls, Spotify streams and online games use the internet without being “the web”. The web is specifically linked pages fetched over HTTP(S).',
    question: 'What is the World Wide Web, and how does it relate to the internet?',
    canonicalAnswer:
      'It is a collection of linked pages and websites that browsers load over the internet — a service that runs on top of the internet.',
    acceptedAnswers: ['runs on top of the internet', 'linked pages over the internet'],
    keyIdeas: [
      {
        id: 'pages',
        label: 'linked pages and websites',
        terms: ['pages', 'webpages', 'websites', 'sites', 'documents', 'hyperlinks', 'links', 'linked', 'html'],
      },
      {
        id: 'on-internet',
        label: 'runs on top of the internet',
        terms: ['internet', 'on top of', 'layer', 'service', 'uses the network', 'over the network', 'http'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['same as the internet', 'same thing as the internet', 'another name for the internet', 'another word for internet'],
        feedback: 'They are related but different. The internet is the network of connected computers; the web is one service — linked pages — that travels over it.',
      },
    ],
    hint: 'One is the roads; the other is one kind of traffic using those roads.',
    relatedConceptIds: ['internet', 'browser', 'http', 'url', 'html', 'server'],
    prerequisiteIds: ['internet'],
    deepDive:
      'Three inventions made the web: HTML (a format for pages with links), URLs (a way to name any page anywhere), and HTTP (the request/response protocol to fetch them). Everything since — CSS, JavaScript, web apps — builds on those three.',
    testAnswers: {
      correct: [
        'all the websites and pages linked together that you reach over the internet',
        'linked web pages, it sits on top of the internet',
        'websites, its a service that uses the internet',
      ],
      partial: ['a big collection of websites'],
      incorrect: ['its just another name for the internet', 'the cables connecting computers'],
    },
  },
  {
    id: 'client',
    term: 'Client',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A client is the program or device that starts a conversation by sending a request to a server and then uses the response it gets back.',
    plainEnglish:
      'In most online interactions there are two roles: one side asks, the other side answers. The client is the side that asks. Your browser, the Instagram app on your phone, or a script running on a laptop are all clients when they request something from a server.',
    analogy:
      'A customer at a coffee shop counter. The customer places the order; the barista (server) makes it and hands it back.',
    example:
      'When you open the Gmail app, it (the client) sends a request like GET https://mail.google.com/mail/feed to Google’s servers and then displays the list of emails that comes back.',
    whyItMatters:
      'Engineers constantly talk about “client-side” vs “server-side”. Knowing which side does what tells you where a bug lives, what users can see or tamper with, and what runs on their device vs your infrastructure.',
    misconception:
      'Client and server are roles, not types of machine. A server can act as a client when it calls another service (e.g. your backend requesting a payment from Stripe). And “client” here has nothing to do with a paying customer.',
    question: 'In the client–server model, what does the client do?',
    canonicalAnswer: 'The client sends requests to a server and uses the responses that come back.',
    acceptedAnswers: ['sends requests to the server', 'asks the server for'],
    keyIdeas: [
      {
        id: 'asks',
        label: 'it makes the request',
        terms: ['request', 'asks', 'ask for', 'asking', 'sends', 'fetch', 'initiates', 'starts', 'queries', 'orders', 'calls'],
      },
      {
        id: 'server',
        label: 'to a server',
        terms: ['server', 'another computer', 'remote computer', 'service', 'backend', 'back end', 'website'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['serves pages', 'hosts', 'stores the website', 'answers requests'],
        feedback: 'That is the server’s job. The client is the side that asks; the server answers.',
      },
      {
        terms: ['customer', 'paying'],
        feedback: 'In software, “client” is not a customer — it is the program (like a browser or app) that sends requests to a server.',
      },
    ],
    hint: 'Of the two sides of a conversation online, which one speaks first?',
    relatedConceptIds: ['server', 'request', 'response', 'browser', 'frontend'],
    prerequisiteIds: ['internet'],
    deepDive:
      'Clients are often called “thin” (does little besides display, like a basic web page) or “thick” (does lots of work itself, like a video-editing app that only syncs files to the cloud). Modern web apps sit in between: a lot of JavaScript runs on the client.',
    testAnswers: {
      correct: [
        'it asks the server for stuff',
        'sends a request to a server and gets data back',
        'requests information from the backend',
      ],
      partial: ['it sends requests'],
      incorrect: ['it hosts the website and answers requests', 'the customer paying for the software'],
    },
  },
  {
    id: 'server',
    term: 'Server',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A server is a program (and the computer running it) that waits for requests from clients and sends back responses such as web pages, data or files.',
    plainEnglish:
      'A server sits on a network, always on, listening for requests. When one arrives it does some work — looks something up, runs some code, reads a file — and replies. Most servers are ordinary computers in a data centre run by a company like Amazon Web Services or Google Cloud.',
    analogy:
      'The kitchen in a restaurant. It does not walk out to diners; it waits for orders to come in and sends plates back out.',
    example:
      'When a browser asks for https://shop.example.com/products/42, the shop’s server looks up product 42 in its database, builds a page with the name and price, and responds with HTML and status 200 OK.',
    whyItMatters:
      'Servers hold the things users must not control directly — the database, passwords, payment logic. Hosting costs, uptime and scaling (“can we handle Black Friday?”) are all questions about servers.',
    misconception:
      '“Server” refers to a role, not a special kind of hardware. Your own laptop becomes a server when you run a local development site at http://localhost:3000. Conversely, a big machine is not a server unless it is serving requests.',
    question: 'What does a server do?',
    canonicalAnswer:
      'It waits for requests from clients and responds to them by sending back data, pages or files.',
    acceptedAnswers: ['responds to requests', 'answers requests from clients', 'serves data to clients'],
    keyIdeas: [
      {
        id: 'responds',
        label: 'it responds / sends things back',
        terms: ['respond', 'answer', 'reply', 'serves', 'send back', 'sends back', 'returns', 'delivers', 'handles',
          'processes', 'provides', 'gives'],
      },
      {
        id: 'requests',
        label: 'to requests from clients',
        terms: ['request', 'client', 'browser', 'users', 'people', 'other computers', 'apps', 'visitors', 'asked'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['your laptop', 'your phone', 'device you use', 'computer you use'],
        feedback: 'The device you use to browse is usually the client. The server is the program on the other end that answers its requests.',
      },
    ],
    hint: 'If the client asks, what does the server do?',
    relatedConceptIds: ['client', 'request', 'response', 'backend', 'hosting', 'port'],
    prerequisiteIds: ['client'],
    deepDive:
      'One physical machine can run many server programs at once (a web server on port 443, a database on port 5432), and one website can be served by thousands of machines behind a load balancer. “Serverless” platforms still use servers — you just never manage them.',
    testAnswers: {
      correct: [
        'answers requests from clients',
        'it sends back web pages when people ask for them',
        'handles requests from browsers and returns data',
      ],
      partial: ['it sends stuff back'],
      incorrect: ['the computer you use to browse the web', 'a waiter in a restaurant'],
    },
  },
  {
    id: 'browser',
    term: 'Browser',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A web browser is an app that fetches web pages from servers using their URLs and turns the HTML, CSS and JavaScript it receives into an interactive page on screen.',
    plainEnglish:
      'Chrome, Safari, Firefox and Edge are browsers. You give one an address, it requests the page from a server, then reads the code that comes back and draws the result: text, images, buttons. It also runs the page’s JavaScript so things react when you click.',
    analogy:
      'A record player for the web: the record (code) holds the music in a format you cannot read by eye; the player reads it and turns it into something you can experience.',
    example:
      'Type https://www.bbc.com/news into Safari. Safari looks up the address, sends GET /news to BBC’s server, receives about 300 KB of HTML plus CSS, images and scripts, and paints the headlines on your screen in under a second.',
    whyItMatters:
      'The browser is the most common runtime for software today. Different browsers can show the same page slightly differently, which is why teams test “in Safari and Chrome”, and why browser developer tools are a key debugging aid.',
    misconception:
      'A browser is not a search engine. Chrome is a browser; Google is a search engine — a website you happen to open in a browser. You can use Chrome with Bing, or Safari with Google.',
    question: 'What two main jobs does a web browser do?',
    canonicalAnswer:
      'It fetches web pages from servers, and then renders (displays) them on screen as an interactive page.',
    acceptedAnswers: ['fetches and displays web pages', 'downloads and displays pages'],
    keyIdeas: [
      {
        id: 'fetch',
        label: 'fetching pages from servers',
        terms: ['fetch', 'request', 'download', 'get', 'gets', 'load', 'retrieve', 'grab', 'pull', 'access', 'go to'],
      },
      {
        id: 'display',
        label: 'displaying / rendering them',
        terms: ['display', 'show', 'render', 'draw', 'paint', 'view', 'present', 'visual', 'on screen', 'look at', 'read'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['search engine', 'searches the internet', 'searches the web'],
        feedback: 'That is a search engine like Google — which is itself a website. A browser is the app that fetches and displays any web page, including Google.',
      },
    ],
    hint: 'First it has to get the page. Then what does it do with all that code?',
    relatedConceptIds: ['web', 'client', 'url', 'rendering', 'html', 'developer-tools'],
    prerequisiteIds: ['web', 'client'],
    deepDive:
      'Under the hood a browser has a networking layer (DNS, HTTP, caching), a rendering engine (Blink in Chrome/Edge, WebKit in Safari, Gecko in Firefox) that turns HTML and CSS into pixels, and a JavaScript engine (V8, JavaScriptCore, SpiderMonkey). Each tab is usually a separate, sandboxed process.',
    testAnswers: {
      correct: [
        'gets websites from servers and shows them to you',
        'downloads the page code and draws it on screen',
        'it loads web pages and renders them',
      ],
      partial: ['it shows you websites'],
      incorrect: ['its a search engine like google', 'it stores websites for people'],
    },
  },
  {
    id: 'request',
    term: 'Request',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A request is a message a client sends to a server asking it to do something — typically to send back a resource or to accept some data.',
    plainEnglish:
      'Every time a page loads, an app refreshes, or you press “Pay”, your device sends one or more requests. A web request names what you want (a URL), how you want it (a method like GET or POST), and can include extra information like login details or form data.',
    analogy:
      'Filling in an order slip at a deli counter: what you want, how much, and your ticket number — handed over the counter for someone else to fulfil.',
    example:
      'A request to log in might look like:\nPOST /api/login HTTP/1.1\nHost: app.example.com\nContent-Type: application/json\n\n{"email": "sam@example.com", "password": "••••••"}',
    whyItMatters:
      'Requests are the basic unit of everything online. Page speed, API costs, rate limits and many bugs (“the request never left the browser”) are all discussed in terms of requests.',
    misconception:
      'A request is not the reply. The request goes from client to server; what comes back is the response. One page load often triggers dozens of separate requests (HTML, images, fonts, scripts).',
    question: 'What is a request, in client–server terms?',
    canonicalAnswer: 'A message the client sends to a server asking for something (or asking it to do something).',
    acceptedAnswers: ['message from the client to the server', 'client asking the server'],
    keyIdeas: [
      {
        id: 'message',
        label: 'a message asking for something',
        terms: ['message', 'ask', 'asking', 'asks', 'demand', 'order', 'call', 'want', 'wants', 'need'],
      },
      {
        id: 'to-server',
        label: 'sent to a server',
        terms: ['server', 'backend', 'back end', 'website', 'api', 'service', 'other computer'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['server sends back', 'reply from the server', 'answer from the server', 'what comes back'],
        feedback: 'That is the response. The request is the message going the other way — from the client to the server.',
      },
    ],
    hint: 'Which direction does it travel, and what is it trying to get?',
    relatedConceptIds: ['response', 'client', 'server', 'http', 'http-method', 'headers'],
    prerequisiteIds: ['client', 'server'],
    deepDive:
      'An HTTP request has four parts: a method (GET, POST, PUT, DELETE…), a target URL, headers (metadata like cookies, accepted formats, auth tokens) and an optional body (data such as JSON or form fields). Open the Network tab in developer tools to watch them fly.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'when your browser asks the server for something',
        'a message sent to a server asking for data',
        'the client asking a website for a page',
      ],
      partial: ['a message asking for something'],
      incorrect: ['the reply from the server', 'a web page'],
    },
  },
  {
    id: 'response',
    term: 'Response',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A response is the message a server sends back to a client after receiving a request, containing a status (did it work?) and usually some content.',
    plainEnglish:
      'Every request gets exactly one response. It tells the client whether things went well — via a status code like 200 (OK) or 404 (Not Found) — and often carries the thing that was asked for: a page, an image, or some data.',
    analogy:
      'The plate that comes back from the kitchen, with a note: “Here is your order” — or “Sorry, we are out of salmon.”',
    example:
      'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"id": 42, "name": "Linen shirt", "price": 49.00}\n\nIf the product did not exist, the server would instead reply 404 Not Found.',
    whyItMatters:
      'When something breaks, the response tells you why. Reading status codes (2xx success, 4xx your mistake, 5xx the server’s mistake) is one of the fastest ways to diagnose a problem.',
    misconception:
      'A response is not always a web page or “success”. An error is also a response — a 500 Internal Server Error is the server responding that it failed. No response at all (a timeout) is a different problem.',
    question: 'What is a response, in client–server terms?',
    canonicalAnswer: 'The reply a server sends back to a client after a request — a status plus any data asked for.',
    acceptedAnswers: ['what the server sends back', 'server reply to a request', 'the servers answer'],
    keyIdeas: [
      {
        id: 'reply',
        label: 'a reply / what comes back',
        terms: ['reply', 'answer', 'sends back', 'send back', 'returns', 'comes back', 'gives back', 'back',
          'result', 'responds', 'replies'],
      },
      {
        id: 'server',
        label: 'from the server',
        terms: ['server', 'backend', 'back end', 'website', 'api', 'service'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['client sends', 'browser sends', 'asking the server', 'asks the server'],
        feedback: 'That is the request. The response goes the other way: from the server back to the client.',
      },
    ],
    hint: 'The client spoke first. What comes next, and from whom?',
    relatedConceptIds: ['request', 'server', 'status-code', 'response-body', 'http', 'headers'],
    prerequisiteIds: ['request'],
    deepDive:
      'An HTTP response has a status line (e.g. 200 OK), headers (Content-Type, caching rules, cookies to set) and an optional body. The Content-Type header tells the client how to interpret the body — text/html for a page, application/json for API data, image/png for a picture.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'what the server gives back to you',
        'the servers reply with the data',
        'the answer that comes back from the backend',
      ],
      partial: ['the answer'],
      incorrect: ['when the browser sends a message asking for a page', 'a button you click'],
    },
  },
  {
    id: 'protocol',
    term: 'Protocol',
    trackId: 'internet',
    difficulty: 2,
    definition:
      'A protocol is an agreed set of rules for how computers format, send and interpret messages so that different machines can communicate reliably.',
    plainEnglish:
      'Two computers built by different companies can only understand each other if they agree on the rules in advance: who speaks first, what a message looks like, what each part means, and what to do if something goes wrong. That rulebook is a protocol. The internet runs on dozens of them stacked together.',
    analogy:
      'The etiquette of a phone call: you say “hello”, the other person answers, you take turns, you say “bye” before hanging up. Nobody has to invent the ritual each time.',
    example:
      'HTTP for web pages, SMTP for sending email, TCP for reliable delivery, IP for addressing packets, and TLS for encryption. A single page load uses all of them at once: HTTP inside TLS inside TCP inside IP.',
    whyItMatters:
      'Protocols are why anything interoperates — your iPhone can load a site hosted on Linux in Frankfurt. When you see “http://”, “wss://” or “ftp://” at the start of a URL, that is literally naming the protocol.',
    misconception:
      'A protocol is not a piece of software or a programming language. It is a written specification; many different programs (Chrome, Firefox, curl) implement the same protocol, which is why they can all talk to the same servers.',
    question: 'What is a protocol in networking?',
    canonicalAnswer:
      'An agreed set of rules for how computers format and exchange messages so they can communicate.',
    acceptedAnswers: ['rules for how computers communicate', 'agreed rules for communication', 'set of rules for communicating'],
    keyIdeas: [
      {
        id: 'rules',
        label: 'an agreed set of rules',
        terms: ['rules', 'standard', 'agreed', 'agreement', 'convention', 'specification', 'spec', 'etiquette',
          'common language', 'shared language', 'format', 'procedure'],
      },
      {
        id: 'communicate',
        label: 'for communicating',
        terms: ['communicate', 'talk', 'exchange', 'send data', 'send messages', 'messages', 'understand each other',
          'transfer', 'interact', 'between computers'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['programming language', 'piece of software', 'software program', 'an app'],
        feedback: 'A protocol is not software or a programming language — it is the rulebook that software follows so different machines can understand each other.',
      },
    ],
    hint: 'Think of phone-call etiquette. What do both sides have to agree on?',
    relatedConceptIds: ['http', 'https', 'websocket', 'ip-address', 'port', 'internet'],
    prerequisiteIds: ['network'],
    deepDive:
      'Protocols are layered. Low layers move bits (Ethernet, Wi‑Fi), middle layers route and deliver (IP, TCP, UDP), and top layers carry meaning (HTTP, SMTP, DNS). Each layer only relies on the one below, which is why you can swap Wi‑Fi for 5G without changing HTTP.',
    testAnswers: {
      correct: [
        'rules computers follow to talk to each other',
        'a standard format for sending messages between machines',
        'an agreement on how devices communicate',
      ],
      partial: ['a set of rules'],
      incorrect: ['a programming language for networks', 'the cable that connects computers'],
    },
  },
  {
    id: 'http',
    term: 'HTTP (HyperText Transfer Protocol)',
    trackId: 'internet',
    difficulty: 2,
    definition:
      'HTTP (HyperText Transfer Protocol) is the request/response protocol browsers and other clients use to ask servers for web pages and data and get them back.',
    plainEnglish:
      'HTTP is the language of the web. The client sends a request (“GET me /about”), the server sends a response (“200 OK, here is the page”). It is plain, structured text, which makes it easy for any program to speak — browsers, mobile apps, and APIs all use it.',
    analogy:
      'A standard order form used by every shop in a city: every customer fills it in the same way and every shop replies on the same kind of receipt.',
    example:
      'GET /about HTTP/1.1\nHost: www.example.com\n\n→ HTTP/1.1 200 OK\nContent-Type: text/html\n\n<html>…About us…</html>',
    whyItMatters:
      'Almost every app and API you will deal with talks HTTP. Terms like GET, POST, status codes (404, 500), headers and cookies all come from HTTP, so understanding it unlocks a lot of engineering conversations.',
    misconception:
      'HTTP is not the same as HTML. HTTP is how things are delivered; HTML is one kind of thing that gets delivered (a page). HTTP can just as happily carry JSON, images or video. Plain HTTP is also unencrypted — that is what HTTPS fixes.',
    question: 'What is HTTP used for?',
    canonicalAnswer:
      'It is the protocol clients like browsers use to request web pages and data from servers and receive responses.',
    acceptedAnswers: ['request web pages from servers', 'transfer web pages', 'communication between browser and server'],
    keyIdeas: [
      {
        id: 'transfer',
        label: 'requesting and transferring data',
        terms: ['request', 'response', 'transfer', 'send', 'fetch', 'communicate', 'exchange', 'load', 'deliver',
          'get', 'talk', 'move data'],
      },
      {
        id: 'web',
        label: 'between clients (browsers) and servers on the web',
        terms: ['web', 'websites', 'pages', 'browser', 'server', 'client', 'apps', 'api', 'online'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['encrypt', 'language web pages are written', 'write web pages', 'markup'],
        feedback: 'HTTP is the delivery protocol, not the page language (that is HTML) and not the encryption (that is the S in HTTPS).',
      },
    ],
    hint: 'The T stands for “Transfer”. Transfer what, between whom?',
    relatedConceptIds: ['https', 'request', 'response', 'protocol', 'http-method', 'status-code'],
    prerequisiteIds: ['protocol', 'request', 'response'],
    deepDive:
      'HTTP is “stateless”: each request stands alone and the server does not automatically remember previous ones — cookies and tokens are layered on top to create logged-in sessions. Versions HTTP/2 and HTTP/3 keep the same meaning but send it more efficiently.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'how browsers get web pages from servers',
        'sending requests and responses between client and server',
        'transferring websites over the internet',
      ],
      partial: ['sending stuff'],
      incorrect: ['the language you write web pages in', 'it encrypts your data'],
    },
  },
  {
    id: 'https',
    term: 'HTTPS (secure HTTP)',
    trackId: 'internet',
    difficulty: 2,
    definition:
      'HTTPS is HTTP sent through an encrypted TLS connection, so nobody between the browser and the server can read or alter the traffic, and the browser can verify it is talking to the real domain.',
    plainEnglish:
      'With plain HTTP, anyone on the same café Wi‑Fi or along the route could read what you send — passwords included. HTTPS wraps the same messages in encryption. The padlock in the address bar means the connection is encrypted and the site presented a valid certificate for that domain.',
    analogy:
      'HTTP is a postcard: every mail carrier can read it. HTTPS is the same letter in a locked box that only the recipient has the key to.',
    example:
      'Visiting https://bank.example.com: the browser and server do a TLS “handshake”, the server shows a certificate issued by a trusted authority (e.g. Let’s Encrypt) for bank.example.com, they agree on keys, and every request after that is scrambled on the wire.',
    whyItMatters:
      'Browsers now flag non-HTTPS sites as “Not secure”, search engines rank them lower, and many features (camera, location, service workers) only work over HTTPS. Free certificates mean there is no excuse to ship without it.',
    misconception:
      'HTTPS does not mean a site is trustworthy. A phishing site can have a perfectly valid padlock — HTTPS only guarantees the connection to that domain is private, not that the people behind the domain are honest.',
    question: 'What does the “S” in HTTPS add on top of HTTP?',
    canonicalAnswer:
      'Security: the traffic is encrypted so nobody in between can read or tamper with it.',
    acceptedAnswers: ['secure', 'encryption'],
    keyIdeas: [
      {
        id: 'encryption',
        label: 'encryption / security of the connection',
        terms: ['encrypt', 'secure', 'security', 'scrambled', 'private', 'privacy', 'tls', 'ssl', 'padlock',
          'protected', 'protection', 'safe', 'nobody can read'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['faster', 'speed', 'quicker'],
        feedback: 'HTTPS is about security, not speed. It encrypts traffic so others cannot read or change it.',
      },
      {
        terms: ['trustworthy', 'legit', 'legitimate', 'not a scam'],
        feedback: 'Careful — HTTPS encrypts the connection, but it does not prove the site’s owners are honest. Scam sites can use HTTPS too.',
      },
    ],
    hint: 'Look at the little icon next to the address bar. What does it protect against?',
    relatedConceptIds: ['http', 'encryption', 'protocol', 'domain-name', 'url'],
    prerequisiteIds: ['http'],
    deepDive:
      'TLS uses public-key cryptography during the handshake to agree on a shared secret, then fast symmetric encryption for the data. The certificate binds a domain to a public key and is signed by a Certificate Authority that your browser already trusts.',
    testAnswers: {
      correct: [
        'it makes it secure',
        'encrypts the data so people cant snoop',
        'the connection is encrypted with tls',
      ],
      incorrect: ['it makes the site faster', 'it means the website is legit and not a scam'],
    },
  },
  {
    id: 'url',
    term: 'URL (web address)',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A URL (Uniform Resource Locator) is the full address of one specific resource on the internet, including the protocol, the domain and the path to the exact page or file.',
    plainEnglish:
      'A URL tells a browser exactly where something lives and how to get it. It is made of parts: the protocol (https://), the domain (www.example.com), and a path to the specific thing (/blog/launch). It can also carry extras like search terms after a “?”.',
    analogy:
      'A full postal address: country and city (domain), street and house number (path), and even “attention: Accounts dept.” (the query string).',
    example:
      'https://shop.example.com:443/shoes/running?size=42&color=blue#reviews\n• https = protocol\n• shop.example.com = domain\n• 443 = port (usually hidden)\n• /shoes/running = path\n• ?size=42&color=blue = query parameters\n• #reviews = fragment (a spot on the page)',
    whyItMatters:
      'URLs are how you share, bookmark, track and route everything on the web. Good URL design affects SEO, analytics (UTM parameters), and whether a link pasted in Slack opens the exact view you meant.',
    misconception:
      'A URL is not the same as a domain name. The domain (example.com) is just one part of the URL; the URL points to one exact resource (https://example.com/pricing).',
    question: 'What is a URL?',
    canonicalAnswer: 'The full web address of a specific page or resource, like https://example.com/pricing.',
    acceptedAnswers: ['web address', 'website address', 'address of a page'],
    keyIdeas: [
      {
        id: 'address',
        label: 'an address / location',
        terms: ['address', 'location', 'where', 'link', 'points to', 'locator', 'path'],
      },
      {
        id: 'resource',
        label: 'of a specific page or resource',
        terms: ['page', 'resource', 'file', 'image', 'specific', 'website', 'site', 'document', 'online', 'content'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['ip address', 'just the domain', 'same as domain'],
        feedback: 'Close, but not quite. A domain (example.com) and an IP address (93.184.216.34) identify a server; a URL is the full address of one specific resource, including protocol and path.',
      },
      {
        terms: ['server that hosts', 'hosts the site', 'hosts a site', 'computer that stores'],
        feedback: 'That is the server. A URL is the address you use to reach a specific resource on it.',
      },
    ],
    hint: 'It is what you paste into the address bar to get one exact page.',
    relatedConceptIds: ['domain-name', 'http', 'query-parameter', 'routing', 'port', 'browser'],
    prerequisiteIds: ['web'],
    deepDive:
      'Technically a URL is one type of URI (Uniform Resource Identifier). Special characters must be percent-encoded — a space becomes %20. The fragment (#…) is never sent to the server; the browser uses it to scroll or for client-side routing.',
    testAnswers: {
      correct: [
        'the address of a website',
        'its a link that points to a specific page',
        'the web address you type in the bar',
      ],
      partial: ['an address'],
      incorrect: ['its the same as an ip address', 'the server that hosts a site'],
    },
  },
  {
    id: 'domain-name',
    term: 'Domain name',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A domain name is a human-readable name, like example.com, that people use instead of a numeric IP address to reach a website or service.',
    plainEnglish:
      'Computers find each other using numbers (IP addresses), which humans are bad at remembering. A domain name is the memorable label you rent from a registrar — such as Namecheap or GoDaddy — and point at your servers. Subdomains like shop.example.com let you split one name into many.',
    analogy:
      'A contact name in your phone. You tap “Mum”, not +44 7700 900123 — the phone looks up the number for you.',
    example:
      'notion.so, gov.uk and openai.com are domain names. Reading right to left: “.com” is the top-level domain, “openai” is the registered name, and “platform.openai.com” would be a subdomain.',
    whyItMatters:
      'Your domain is part of your brand and your security: email deliverability, HTTPS certificates and login cookies are all tied to it. Letting a domain expire can take a whole business offline.',
    misconception:
      'A domain name is not a URL and not a website. The domain is just the name part (example.com); the URL adds protocol and path (https://example.com/about); the website is the content served there. You can own a domain with no website at all.',
    question: 'What is a domain name for?',
    canonicalAnswer:
      'It is a human-readable name (like example.com) that stands in for a server’s numeric IP address so people can find a site easily.',
    acceptedAnswers: ['human readable name for an ip address', 'easy to remember name for a website'],
    keyIdeas: [
      {
        id: 'readable',
        label: 'a human-readable, memorable name',
        terms: ['name', 'readable', 'human', 'memorable', 'easy to remember', 'remember', 'words', 'nickname',
          'label', 'friendly'],
      },
      {
        id: 'stands-in',
        label: 'standing in for an IP address / pointing to a site',
        terms: ['ip', 'number', 'numbers', 'numeric', 'server', 'website', 'site', 'points', 'instead of', 'address'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['full address of a page', 'whole url', 'the path'],
        feedback: 'That is closer to a URL. The domain is only the name part (example.com), without the protocol or the path to a page.',
      },
      {
        terms: ['encrypt', 'secure the site'],
        feedback: 'Encryption is HTTPS’s job. A domain name is just a memorable name that points to a server’s IP address.',
      },
    ],
    hint: 'Why type google.com instead of 142.250.72.14?',
    relatedConceptIds: ['dns', 'ip-address', 'url', 'https', 'hosting'],
    prerequisiteIds: ['ip-address'],
    deepDive:
      'Domains are hierarchical. ICANN oversees top-level domains (.com, .org, .io, country codes like .ca); registries run each TLD; registrars sell you a name. Owning a domain mostly means you control its DNS records — where it points for web, email and verification.',
    testAnswers: {
      correct: [
        'a name for a website thats easy to remember instead of numbers',
        'human friendly name that points to a server',
        'a name you use instead of remembering the ip address',
      ],
      partial: ['an easy name to remember'],
      incorrect: ['its the full address of a page including https', 'it encrypts the website'],
    },
  },
  {
    id: 'ip-address',
    term: 'IP address',
    trackId: 'internet',
    difficulty: 2,
    definition:
      'An IP address is a numeric label assigned to each device on a network so that data packets can be routed to and from it.',
    plainEnglish:
      'Every device that talks on the internet needs an address so packets know where to go and where to reply. That address is a number, written like 93.184.216.34 (IPv4) or 2606:2800:220:1::248 (IPv6). Your home router usually has one public address and gives each device inside a private one like 192.168.1.20.',
    analogy:
      'A phone number for a machine. Routers along the way read the number to decide which direction to pass each packet, like telephone exchanges routing a call.',
    example:
      'Run `ping example.com` in a terminal and you will see a reply from an address such as 93.184.216.34 — that is the server the domain currently points to.',
    whyItMatters:
      'IP addresses show up in logs, security rules (“only allow traffic from our office IP”), rate limiting, fraud detection and rough geolocation. They are also why DNS exists — nobody wants to memorise them.',
    misconception:
      'An IP address is not permanent or personal. Mobile phones and home connections often get a different one regularly, many people can share one public IP, and one server can host thousands of websites behind a single IP.',
    question: 'What is an IP address?',
    canonicalAnswer: 'A unique number that identifies a device on a network so data can be sent to it.',
    acceptedAnswers: ['number that identifies a device', 'address of a computer on the internet'],
    keyIdeas: [
      {
        id: 'number',
        label: 'a numeric address',
        terms: ['number', 'numbers', 'numeric', 'digits', 'address'],
      },
      {
        id: 'identifies-device',
        label: 'identifying a device on a network',
        terms: ['identify', 'device', 'computer', 'machine', 'phone', 'server', 'unique', 'each', 'find', 'locate',
          'where to send', 'on the network', 'on the internet'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['website name', 'domain name', 'password', 'like google com'],
        feedback: 'That is a domain name. An IP address is the numeric address (like 93.184.216.34) that a domain name points to.',
      },
    ],
    hint: 'It looks like 192.168.1.20. What is it labelling?',
    relatedConceptIds: ['dns', 'domain-name', 'network', 'port', 'internet', 'protocol'],
    prerequisiteIds: ['network'],
    deepDive:
      'IPv4 has about 4.3 billion addresses — not enough — so most homes use NAT: one public IP shared by many private ones (10.x, 172.16–31.x, 192.168.x). IPv6 uses 128-bit addresses, enough for every grain of sand, and is gradually taking over.',
    testAnswers: {
      correct: [
        'a number that identifies your computer on the internet',
        'unique address for each device',
        'the numeric address of a machine so data can find it',
      ],
      partial: ['a bunch of numbers'],
      incorrect: ['the name of a website like google.com', 'your wifi password'],
    },
  },
  {
    id: 'dns',
    term: 'DNS (Domain Name System)',
    trackId: 'internet',
    difficulty: 2,
    definition:
      'DNS (Domain Name System) is the internet’s distributed directory that translates domain names like example.com into the IP addresses computers need to connect.',
    plainEnglish:
      'When you type a domain, your device first asks a DNS server, “What is the IP address for this name?” The answer comes back (often cached from a previous lookup) and only then does your browser connect to the server. It happens in milliseconds, before every new site you visit.',
    analogy:
      'The contacts app or an old phone book: you look up a name and get the number to dial.',
    example:
      'Run `nslookup github.com` and you get back something like “Address: 140.82.112.4”. Behind the scenes a resolver asked the root servers → the .com servers → GitHub’s own name servers, then cached the answer for a few minutes (its TTL).',
    whyItMatters:
      'DNS is how you point a domain at your hosting, set up company email (MX records) and verify ownership for tools like Google Workspace. Misconfigured DNS is a classic cause of “the site is down” — the servers are fine, nobody can find them.',
    misconception:
      'DNS does not host your website or store its content. It only answers “which address?” — the site itself lives on servers elsewhere. Changes also take time to spread because of caching, which is why people say DNS needs time to “propagate”.',
    question: 'What does DNS do?',
    canonicalAnswer: 'It translates domain names (like example.com) into IP addresses so computers can find each other.',
    acceptedAnswers: ['translates domain names into ip addresses', 'phonebook of the internet', 'turns names into ip addresses'],
    keyIdeas: [
      {
        id: 'translate',
        label: 'translating / looking up',
        terms: ['translate', 'convert', 'look up', 'lookup', 'map', 'maps', 'turn into', 'turns into', 'resolve',
          'match', 'phonebook', 'phone book', 'directory', 'find'],
      },
      {
        id: 'names-to-ips',
        label: 'domain names to IP addresses',
        terms: ['domain', 'name', 'names', 'ip', 'number', 'numbers', 'address', 'url'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['hosts the website', 'stores the website', 'stores websites', 'encrypts'],
        feedback: 'DNS does not hold the website or encrypt anything. It is a lookup service that turns a name into the IP address of the server that does.',
      },
    ],
    hint: 'Your browser knows “example.com” but needs a number to connect. What bridges the two?',
    relatedConceptIds: ['domain-name', 'ip-address', 'url', 'server', 'cache', 'latency'],
    prerequisiteIds: ['domain-name', 'ip-address'],
    deepDive:
      'DNS records have types: A (name → IPv4), AAAA (→ IPv6), CNAME (alias to another name), MX (mail servers), TXT (verification and email security like SPF). Each record has a TTL telling resolvers how long to cache it.',
    testAnswers: {
      correct: [
        'turns website names into ip addresses',
        'like a phone book that looks up the number for a domain',
        'converts the domain into the servers address',
      ],
      partial: ['its like a phonebook'],
      incorrect: ['it hosts the website files', 'it makes the connection secure and encrypts it'],
    },
  },
  {
    id: 'port',
    term: 'Port',
    trackId: 'internet',
    difficulty: 3,
    definition:
      'A port is a number from 0 to 65535 that, combined with an IP address, identifies which specific program or service on a machine should receive network traffic.',
    plainEnglish:
      'One server can run many programs at once — a website, a database, an email service. The IP address gets data to the right machine; the port number gets it to the right program on that machine. Well-known services have standard ports, so browsers know to use 443 for HTTPS without being told.',
    analogy:
      'An apartment building: the street address (IP) gets the parcel to the building, the apartment number (port) gets it to the right resident.',
    example:
      'https://example.com quietly means port 443; http:// means 80. A developer running a site locally visits http://localhost:3000, and a PostgreSQL database typically listens on port 5432.',
    whyItMatters:
      'Ports come up in deployment (“the app listens on port 8080”), firewall rules (“only open 443 to the public”), and local development errors like “EADDRINUSE: port 3000 already in use”.',
    misconception:
      'A network port is not a physical socket like a USB or HDMI port. It is just a number in the software — no hardware involved.',
    question: 'What does a port number identify?',
    canonicalAnswer:
      'Which specific program or service on a computer should receive the traffic — the IP gets you to the machine, the port to the program.',
    acceptedAnswers: ['which program on the computer', 'which service on the server', 'which app on the machine'],
    keyIdeas: [
      {
        id: 'program',
        label: 'which program or service',
        terms: ['program', 'service', 'app', 'application', 'process', 'software', 'door', 'channel', 'which one',
          'specific'],
      },
      {
        id: 'machine',
        label: 'on a machine (with the IP address)',
        terms: ['computer', 'machine', 'device', 'server', 'ip', 'host', 'system'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['usb', 'hdmi', 'plug', 'physical', 'cable', 'socket in the wall'],
        feedback: 'A network port is not a physical connector. It is a number that tells a machine which program should receive the traffic.',
      },
    ],
    hint: 'The IP address gets data to the right building. What gets it to the right apartment?',
    relatedConceptIds: ['ip-address', 'server', 'url', 'protocol', 'hosting'],
    prerequisiteIds: ['ip-address', 'server'],
    deepDive:
      'Ports 0–1023 are “well known” (22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS). The client side also uses a random high-numbered port for each connection so replies find their way back to the right browser tab.',
    testAnswers: {
      correct: [
        'which program on a computer should get the data',
        'the specific service running on the server',
        'like a door number for an app on the machine',
      ],
      partial: ['a specific program'],
      incorrect: ['the usb plug on your laptop', 'how fast the internet is'],
    },
  },
  {
    id: 'network',
    term: 'Network',
    trackId: 'internet',
    difficulty: 1,
    definition:
      'A network is a group of computers and devices connected by cables or wireless links so they can exchange data with each other.',
    plainEnglish:
      'Two or more devices that can send data to each other form a network. Your home Wi‑Fi with a laptop, phone and smart TV is a small network; your office is a bigger one; the internet is a network of all these networks joined together.',
    analogy:
      'A neighbourhood’s streets. Houses (devices) are connected by roads (links) so people and parcels can move between them.',
    example:
      'At home, your router creates a local network (LAN) where your laptop might be 192.168.1.12 and your printer 192.168.1.30. When you print, data goes laptop → router → printer without ever touching the internet.',
    whyItMatters:
      'Lots of practical issues — “works at home but not on the VPN”, “the office printer can’t be found”, slow video calls — are network problems. Knowing that devices communicate through routers and links helps you narrow them down.',
    misconception:
      'A network does not have to be connected to the internet. A home or factory network can work perfectly with the internet cable unplugged; the internet is just the biggest network of networks.',
    question: 'What makes a group of computers a “network”?',
    canonicalAnswer: 'They are connected — by cables or wirelessly — so they can exchange data with each other.',
    acceptedAnswers: ['connected so they can share data', 'linked together to communicate'],
    keyIdeas: [
      {
        id: 'connected',
        label: 'connected so they can exchange data',
        terms: ['connected', 'connect', 'linked', 'joined', 'hooked up', 'wired', 'wireless', 'communicate',
          'share data', 'exchange data', 'talk to each other', 'send data'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['same room', 'same brand', 'same software', 'social network'],
        feedback: 'Location or brand does not matter. Devices form a network when they are connected and can exchange data.',
      },
    ],
    hint: 'What has to be true for two devices to send each other a file?',
    relatedConceptIds: ['internet', 'ip-address', 'protocol', 'bandwidth', 'latency'],
    deepDive:
      'Networks are described by size: LAN (local, e.g. a home), WAN (wide area, e.g. offices across cities), and the internet. Switches connect devices within a LAN; routers forward packets between networks.',
    testAnswers: {
      correct: [
        'they are connected to each other',
        'computers linked together so they can share data',
        'they can talk to each other through cables or wifi',
      ],
      incorrect: ['they are all in the same room', 'they all run the same software'],
    },
  },
  {
    id: 'latency',
    term: 'Latency',
    trackId: 'internet',
    difficulty: 3,
    definition:
      'Latency is the time delay between sending a piece of data and it arriving (or getting a reply), usually measured in milliseconds.',
    plainEnglish:
      'Latency is how long a single message takes to make the trip. Even at light speed, data from London to Sydney takes time, and every router along the way adds a little more. High latency feels like lag: you click and there is a pause before anything happens.',
    analogy:
      'The time it takes a car to drive from one city to another. A wider highway (more bandwidth) lets more cars travel at once, but each car still takes the same time to make the trip.',
    example:
      '`ping example.com` → “time=12 ms” from a nearby server, but “time=280 ms” from a server on the other side of the world. A video call above ~150 ms starts to feel awkward, with people talking over each other.',
    whyItMatters:
      'Pages that make many round trips feel slow on high-latency connections even if the internet is “fast”. It is why companies use CDNs and put servers near users, and why games and video calls are so sensitive to it.',
    misconception:
      'Latency is not the same as bandwidth. Bandwidth is how much data can flow per second (the width of the pipe); latency is how long each bit takes to arrive (the length of the pipe). A connection can have huge bandwidth and still feel laggy.',
    question: 'What is latency?',
    canonicalAnswer: 'The delay — how long it takes data to travel from one point to another (or make a round trip).',
    acceptedAnswers: ['how long data takes to arrive', 'delay before data arrives', 'round trip time'],
    keyIdeas: [
      {
        id: 'delay',
        label: 'a delay / time taken',
        terms: ['delay', 'time', 'lag', 'wait', 'how long', 'milliseconds', 'ms', 'ping', 'pause', 'takes'],
      },
      {
        id: 'travel',
        label: 'for data to travel / arrive',
        terms: ['travel', 'arrive', 'reach', 'get there', 'trip', 'round trip', 'data', 'packet', 'signal',
          'response', 'message', 'from one point', 'send'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['how much data', 'amount of data', 'capacity', 'bandwidth', 'size of the pipe'],
        feedback: 'That is bandwidth — how much data can flow per second. Latency is how long each piece of data takes to arrive.',
      },
    ],
    hint: 'Think of a car on a highway. Not how many cars fit — how long does one take?',
    relatedConceptIds: ['bandwidth', 'cdn', 'network', 'websocket', 'request'],
    prerequisiteIds: ['network', 'request'],
    deepDive:
      'Latency adds up: DNS lookup + TCP handshake + TLS handshake + request + response can be four or five round trips before the first byte of a page arrives. HTTP/2, HTTP/3, connection reuse and edge servers all exist mainly to cut round trips.',
    testAnswers: {
      correct: [
        'the delay before data gets there',
        'how long it takes a message to travel to the server and back',
        'lag, the time data takes to arrive',
      ],
      partial: ['lag'],
      incorrect: ['how much data you can download at once', 'the capacity of your connection'],
    },
  },
  {
    id: 'bandwidth',
    term: 'Bandwidth',
    trackId: 'internet',
    difficulty: 3,
    definition:
      'Bandwidth is the maximum amount of data a connection can carry per second, usually measured in megabits per second (Mbps).',
    plainEnglish:
      'Bandwidth is the size of the pipe. More bandwidth means more data can flow at the same time — so a 4K movie, a big download, and three people on video calls can all happen without choking each other.',
    analogy:
      'The number of lanes on a highway. More lanes let more cars through per minute — but adding lanes does not make the drive itself any shorter.',
    example:
      'A 100 Mbps home plan can, in theory, move 12.5 megabytes per second, so a 1.25 GB game update takes about 100 seconds. A 4K Netflix stream needs roughly 15–25 Mbps of it.',
    whyItMatters:
      'Bandwidth decides how big your pages, images and videos can be before users suffer, and it is often what hosting providers bill you for (“egress”). Optimising images is mostly about saving bandwidth.',
    misconception:
      'Bandwidth is not latency. More bandwidth helps with large transfers, but it does not reduce the delay before each response starts. Note too: megabits (Mb) ≠ megabytes (MB) — there are 8 bits in a byte.',
    question: 'What does bandwidth measure?',
    canonicalAnswer: 'How much data a connection can carry per second — its capacity.',
    acceptedAnswers: ['how much data per second', 'amount of data per second', 'capacity of a connection'],
    keyIdeas: [
      {
        id: 'amount',
        label: 'the amount / capacity',
        terms: ['amount', 'how much', 'capacity', 'volume', 'maximum', 'max', 'size of the pipe', 'lanes',
          'quantity', 'throughput'],
      },
      {
        id: 'data-per-time',
        label: 'of data per second',
        terms: ['data', 'per second', 'at once', 'at a time', 'mbps', 'megabits', 'information', 'bits', 'traffic'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['delay', 'lag', 'how long', 'latency', 'ping'],
        feedback: 'That is latency — how long data takes to arrive. Bandwidth is how much data can flow per second.',
      },
    ],
    hint: 'Think of highway lanes, not trip time.',
    relatedConceptIds: ['latency', 'network', 'cdn', 'internet'],
    prerequisiteIds: ['network'],
    deepDive:
      'Advertised bandwidth is a ceiling; actual throughput is lower due to congestion, Wi‑Fi interference and protocol overhead. Upload bandwidth is often much smaller than download on home plans, which matters for video calls and cloud backups.',
    testAnswers: {
      correct: [
        'how much data you can send per second',
        'the capacity of your internet, like mbps',
        'the max amount of data that can flow at once',
      ],
      partial: ['the capacity'],
      incorrect: ['the delay before something loads', 'how long a ping takes'],
    },
  },
  {
    id: 'cdn',
    term: 'CDN (Content Delivery Network)',
    trackId: 'internet',
    difficulty: 3,
    definition:
      'A CDN (Content Delivery Network) is a network of servers spread around the world that keep copies of a site’s files so each user is served from a location close to them.',
    plainEnglish:
      'If your only server is in Virginia, a visitor in Tokyo waits for every image to cross the Pacific. A CDN stores copies (caches) of your images, scripts and pages in hundreds of cities, so the Tokyo visitor gets them from Tokyo. It is faster for users and takes load off your main server.',
    analogy:
      'A chain of local warehouses. Instead of shipping every order from one central factory, popular products are stocked near customers so delivery takes hours, not days.',
    example:
      'Your logo lives at https://cdn.example.com/logo.png served by Cloudflare. A user in Paris gets it from Cloudflare’s Paris data centre in 8 ms; only the first request in that region ever reaches your origin server in Oregon.',
    whyItMatters:
      'CDNs are a standard part of almost every serious website: they cut load times, absorb traffic spikes and DDoS attacks, and reduce hosting bills. Platforms like Vercel and Netlify put your site on a CDN automatically.',
    misconception:
      'A CDN does not replace your server or database. It mainly caches files that are the same for everyone; personalised data (your cart, your inbox) usually still comes from the origin. A stale CDN cache is also why a change sometimes “doesn’t show up” right away.',
    question: 'What does a CDN do, and why?',
    canonicalAnswer:
      'It keeps copies of a site’s files on servers around the world so users are served from somewhere nearby, making it load faster.',
    acceptedAnswers: ['servers around the world closer to users', 'caches content closer to users'],
    keyIdeas: [
      {
        id: 'distributed-copies',
        label: 'copies on servers around the world',
        terms: ['copies', 'copy', 'cache', 'caches', 'around the world', 'many locations', 'many servers',
          'lots of servers', 'distributed', 'close to users', 'closer', 'near', 'nearby', 'edge', 'different countries',
          'worldwide', 'globally'],
      },
      {
        id: 'faster',
        label: 'to load faster',
        terms: ['faster', 'fast', 'speed', 'quick', 'quicker', 'latency', 'less delay', 'performance', 'load',
          'less load', 'reduce'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['database', 'programming language', 'domain registrar'],
        feedback: 'A CDN is not a database or a language — it is a set of servers worldwide that hold copies of your files close to users.',
      },
    ],
    hint: 'Why would a site keep copies of its images in Tokyo, Paris and São Paulo?',
    relatedConceptIds: ['cache', 'latency', 'server', 'hosting', 'bandwidth'],
    prerequisiteIds: ['server', 'latency'],
    deepDive:
      'CDNs follow caching headers like Cache-Control: max-age=31536000 to decide how long to keep a file. That is why build tools add hashes to filenames (app.3f9a2c.js): a new deploy gets a new name, so the CDN can cache old ones forever without serving stale code.',
    testAnswers: {
      correct: [
        'stores copies of your files on servers around the world so it loads faster',
        'lots of servers near users to speed things up',
        'caches content closer to people so its quicker',
      ],
      partial: ['makes the website faster'],
      incorrect: ['a database for storing user accounts', 'a programming language for websites'],
    },
  },
  {
    id: 'websocket',
    term: 'WebSocket',
    trackId: 'internet',
    difficulty: 4,
    definition:
      'A WebSocket is a protocol that keeps a single connection open between a browser and a server so either side can send messages to the other at any time, in real time.',
    plainEnglish:
      'Normal HTTP is like sending letters: the client asks, the server answers, and the conversation ends. If the server has news, it has to wait to be asked. A WebSocket opens a line that stays connected, so the server can push updates the instant they happen — great for chat, live scores and collaborative editing.',
    analogy:
      'HTTP is a walkie-talkie exchange where you must ask each time; a WebSocket is a phone call left open, where either person can speak whenever they like.',
    example:
      'const socket = new WebSocket("wss://chat.example.com/room/42");\nsocket.onmessage = (e) => showMessage(e.data);\nsocket.send("Hi everyone!");\n\nWhen someone else posts, the server pushes the message down the same open connection instantly.',
    whyItMatters:
      'Real-time features — Slack messages, Google Docs cursors, live dashboards, multiplayer games — usually rely on WebSockets (or similar). They cost more to run because the server holds thousands of open connections.',
    misconception:
      'A WebSocket is not just “faster HTTP”. It starts as an HTTP request and then “upgrades” into a different, two-way protocol. For data that changes rarely, ordinary HTTP requests are simpler and perfectly fine.',
    question: 'What makes a WebSocket different from a normal HTTP request?',
    canonicalAnswer:
      'The connection stays open, and both sides can send messages at any time — so the server can push updates in real time.',
    acceptedAnswers: ['persistent two way connection', 'stays open so the server can push', 'connection stays open both ways'],
    keyIdeas: [
      {
        id: 'persistent',
        label: 'the connection stays open',
        terms: ['stays open', 'open connection', 'remains open', 'kept open', 'keeps the connection', 'persistent',
          'always connected', 'long lived', 'continuous', 'constant connection', 'stays connected', 'open line'],
      },
      {
        id: 'two-way',
        label: 'both sides can send at any time (server push)',
        terms: ['both ways', 'both directions', 'two way', 'two-way', 'bidirectional', 'either side', 'both sides',
          'server can send', 'push', 'real time', 'realtime', 'instantly', 'back and forth', 'any time'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['just faster http', 'encrypted http', 'more secure'],
        feedback: 'The key difference is not speed or security — it is that the connection stays open and both sides can send messages whenever they want.',
      },
    ],
    hint: 'Letters vs a phone call that never hangs up. Who can speak, and when?',
    relatedConceptIds: ['http', 'protocol', 'latency', 'client', 'server', 'webhook'],
    prerequisiteIds: ['http', 'client', 'server'],
    deepDive:
      'URLs use ws:// or the encrypted wss://. The browser sends an HTTP request with “Upgrade: websocket”; the server replies 101 Switching Protocols, and from then on both sides exchange small “frames”. Alternatives include Server-Sent Events (server → client only) and long polling.',
    testAnswers: {
      correct: [
        'the connection stays open so the server can push messages in real time',
        'its a persistent connection where both sides can talk',
        'it keeps the connection open and data goes both ways',
      ],
      partial: ['the connection stays open'],
      incorrect: ['its just more secure http', 'it is a type of database'],
    },
  },
];

export default concepts;
