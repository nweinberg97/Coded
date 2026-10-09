import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'api',
    term: 'API (Application Programming Interface)',
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
  },
  {
    id: 'api-endpoint',
    term: 'API endpoint',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'An API endpoint is one specific URL on an API that you send requests to in order to reach one particular resource or action.',
    plainEnglish:
      'An API usually offers many different things — users, orders, payments. Each of those lives at its own address, called an endpoint. To get a list of orders you call the orders endpoint; to look up one user you call the user endpoint.',
    analogy:
      'Departments in a big office building: the building is the API, and each endpoint is a specific room number you go to for one kind of help — billing is room 204, returns are room 310.',
    example:
      'Stripe’s API has endpoints like POST https://api.stripe.com/v1/customers (create a customer) and GET https://api.stripe.com/v1/charges/ch_123 (look up one charge). Same API, different endpoints.',
    whyItMatters:
      'API documentation is basically a list of endpoints. When a developer says "there’s no endpoint for that", they mean the API simply doesn’t offer that action — no matter how much the data exists behind it.',
    misconception:
      'An endpoint is not the end of a process or the server itself. It is an address (URL plus method) on the server. The same URL can even act as two endpoints: GET /orders lists orders, POST /orders creates one.',
    question: 'What is an API endpoint?',
    canonicalAnswer:
      'A specific URL on an API where you send a request to reach one particular resource or action.',
    acceptedAnswers: ['specific url of an api', 'url you send requests to', 'address you call on an api'],
    keyIdeas: [
      {
        id: 'address',
        label: 'a URL / address',
        terms: ['url', 'address', 'path', 'route', 'link', 'location', 'web address', 'uri', 'spot'],
      },
      {
        id: 'target',
        label: 'where a specific request goes',
        terms: ['specific', 'particular', 'request', 'call', 'resource', 'action', 'function',
          'operation', 'feature', 'hit', 'access', 'send'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['end of the process', 'last step', 'final step', 'final result'],
        feedback: 'Despite the name, an endpoint isn’t the end of anything — it is an address on the API you send a request to.' },
    ],
    hint: 'If the API is a building, the endpoint is a room number. What do you do with it?',
    relatedConceptIds: ['api', 'url', 'http-method', 'rest', 'query-parameter', 'routing'],
    prerequisiteIds: ['api', 'url'],
    deepDive:
      'Endpoints often contain variables: /v1/users/{id} means you swap {id} for a real value, as in /v1/users/42. Versioning like /v1/ lets an API change without breaking older apps that still call the old endpoints.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'a specific URL you send requests to',
        'the address where you call the api for a particular thing',
        'the url for one resource like /users',
      ],
      partial: ['a url'],
      incorrect: ['the last step of the process', 'a kind of database'],
    },
  },
  {
    id: 'http-method',
    term: 'HTTP method',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'An HTTP method is the verb at the start of every HTTP request (GET, POST, PUT, PATCH, DELETE) that tells the server what kind of action you want performed.',
    plainEnglish:
      'Every request to a server says two things: where (the URL) and what to do there (the method). GET means "give me", POST means "here is something new", PUT and PATCH mean "change this", DELETE means "remove this". The same URL can do different jobs depending on the method.',
    analogy:
      'At a library desk, the book title is the URL and your verb is the method: "Can I borrow…", "I’m returning…", "Please reserve…". Same book, different action.',
    example:
      'GET /api/tasks/7 reads task 7.\nPATCH /api/tasks/7 with {"done": true} marks it done.\nDELETE /api/tasks/7 removes it.\nOnly the method changed; the URL stayed the same.',
    whyItMatters:
      'Methods make APIs predictable: if you know an API follows the conventions, you can guess how to use it. They also matter for safety — browsers, caches and proxies treat GET as harmless and may repeat it, so using GET to delete something can cause real damage.',
    misconception:
      'The method is not part of the URL and isn’t the same as the endpoint. GET /orders and POST /orders hit the same address but do completely different things.',
    question: 'What does the HTTP method in a request tell the server?',
    canonicalAnswer:
      'What kind of action you want — read, create, update or delete — for example GET to fetch or POST to create.',
    acceptedAnswers: ['what action you want', 'what you want to do with the resource', 'the type of action'],
    keyIdeas: [
      {
        id: 'action',
        label: 'what kind of action to perform',
        terms: ['action', 'operation', 'verb', 'intent', 'intention', 'purpose', 'kind of request',
          'type of request', 'crud', 'read or write', 'create', 'update', 'delete', 'fetch', 'get or post',
          'want to do'],
      },
    ],
    wrongIdeas: [
      { terms: ['which website', 'which address', 'the address'],
        feedback: 'The “where” is the URL. The method is the “what to do” part — GET, POST, PUT, PATCH, DELETE.' },
    ],
    hint: 'A request has a “where” (the URL) and a verb. What does the verb describe?',
    relatedConceptIds: ['http-get', 'http-post', 'http-put', 'http-patch', 'http-delete', 'crud', 'http'],
    prerequisiteIds: ['http', 'request'],
    deepDive:
      'Methods have formal properties. "Safe" methods (GET, HEAD) shouldn’t change anything. "Idempotent" methods (GET, PUT, DELETE) give the same end result if repeated — deleting twice still leaves the item deleted. POST is neither, which is why submitting a payment form twice can charge you twice.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'what action you want, like get or post',
        'the type of operation, read or update',
        'whether you want to create, read, update or delete something',
      ],
      incorrect: ['which website to send it to', 'how fast to respond'],
    },
  },
  {
    id: 'http-get',
    term: 'GET request',
    trackId: 'apis',
    difficulty: 1,
    definition:
      'GET is the HTTP method for retrieving data from a server without changing anything on it.',
    plainEnglish:
      'GET means "please give me this". Every time you open a web page or an app loads your feed, it is sending GET requests. A GET should only read: asking twice should never create, change or delete anything.',
    analogy:
      'Looking up a word in a dictionary. You can look as many times as you like and the dictionary never changes.',
    example:
      'GET https://api.github.com/users/octocat returns 200 OK with JSON like {"login": "octocat", "public_repos": 8}. Any extra options go in the URL as query parameters: GET /api/products?category=shoes&sort=price.',
    whyItMatters:
      'Because GETs are assumed harmless, browsers prefetch them, caches store them and crawlers follow them. A "delete" link built as a GET once let search-engine crawlers wipe out real data by simply visiting every link.',
    misconception:
      'GET is not for sending sensitive data: its parameters live in the URL, which ends up in browser history and server logs. Data you are submitting (like a password) belongs in a POST body.',
    question: 'What is a GET request used for?',
    canonicalAnswer:
      'To retrieve (read) data from a server — it should fetch information without changing anything.',
    acceptedAnswers: ['getting data from a server', 'reading data', 'fetching information'],
    keyIdeas: [
      {
        id: 'retrieve',
        label: 'retrieving / reading data',
        terms: ['retrieve', 'read', 'fetch', 'get data', 'get information', 'load', 'look up', 'view',
          'download', 'pull', 'ask for data', 'request data', 'receive', 'grab', 'getting'],
      },
    ],
    wrongIdeas: [
      { terms: ['create', 'submit', 'delete', 'send new data', 'save new'],
        feedback: 'That’s a job for POST (create) or DELETE. GET only reads — it should never change anything on the server.' },
    ],
    hint: 'It’s what your browser sends every time you open a page.',
    relatedConceptIds: ['http-method', 'http-post', 'query-parameter', 'response-body', 'cache', 'crud'],
    prerequisiteIds: ['http-method'],
    deepDive:
      'GET requests normally have no body. Because they are "safe" and "idempotent", caches and CDNs can store GET responses and serve them again — which is why GET is by far the most cacheable method.',
    testAnswers: {
      correct: ['fetching data', 'to retrieve information from the server', 'reading stuff without changing it'],
      incorrect: ['to create a new record', 'submitting a form'],
    },
  },
  {
    id: 'http-post',
    term: 'POST request',
    trackId: 'apis',
    difficulty: 1,
    definition:
      'POST is the HTTP method for sending data to a server, most often to create something new.',
    plainEnglish:
      'POST means "here’s something for you". Signing up, posting a comment, placing an order, uploading a photo — these all send a POST with the new data in the request body. The server usually creates a new record and replies with what it made.',
    analogy:
      'Dropping a filled-in form into an office’s inbox. You hand over new information, and they file it and give you a receipt number.',
    example:
      'POST https://api.example.com/v1/orders\nContent-Type: application/json\n{"productId": 88, "quantity": 2}\n→ 201 Created, body {"id": 5012, "status": "pending"}',
    whyItMatters:
      'POST is how users put information into a system. It is not idempotent: sending the same POST twice usually creates two things — the reason checkout pages warn "don’t refresh" and why payment APIs use idempotency keys.',
    misconception:
      'POST vs PUT: POST asks the server to create a new item and pick its ID (POST /orders). PUT sends a complete version of an item at a known address and replaces whatever was there (PUT /orders/5012).',
    question: 'What is a POST request typically used for?',
    canonicalAnswer:
      'Sending data to the server, usually to create something new — like submitting a sign-up form or placing an order.',
    acceptedAnswers: ['creating something new', 'sending data to the server', 'submitting a form'],
    keyIdeas: [
      {
        id: 'create',
        label: 'sending data to create something',
        terms: ['create', 'new', 'add', 'submit', 'send data', 'send information', 'sends data',
          'upload', 'post data', 'insert', 'make', 'save'],
      },
    ],
    wrongIdeas: [
      { terms: ['delete', 'remove'],
        feedback: 'Removing is DELETE’s job. POST sends new data to the server, usually to create something.' },
    ],
    hint: 'Think about what happens when you hit “Sign up” or “Place order”.',
    relatedConceptIds: ['http-method', 'http-get', 'http-put', 'request-body', 'status-code', 'crud'],
    prerequisiteIds: ['http-method'],
    deepDive:
      'A successful create typically returns 201 Created, often with a Location header pointing to the new item (Location: /v1/orders/5012). POST is also the catch-all for actions that don’t fit the other verbs, such as POST /v1/charges/ch_1/refund.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: ['to create a new thing', 'sending data to a server like a form', 'adding a new record'],
      incorrect: ['to get data from the server', 'removing a user'],
    },
  },
  {
    id: 'http-put',
    term: 'PUT request',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'PUT is the HTTP method that replaces the entire resource at a given URL with the complete version you send.',
    plainEnglish:
      'PUT means "make this item look exactly like this". You send the whole thing, every field, and the server swaps out the old version for yours. Any field you leave out may be wiped or reset.',
    analogy:
      'Replacing a document in a folder: you don’t mark up the old page, you pull it out and slot in a fresh, complete page.',
    example:
      'Current profile: {"name": "Ana", "email": "ana@x.com", "city": "Lima"}\nPUT /api/users/42 with {"name": "Ana", "email": "ana@new.com"}\nResult: {"name": "Ana", "email": "ana@new.com"} — city is gone, because PUT replaced the whole record.',
    whyItMatters:
      'Knowing PUT replaces everything prevents accidental data loss: two people editing the same record with PUT can silently overwrite each other’s changes. It also explains why many APIs prefer PATCH for edits.',
    misconception:
      'PUT vs PATCH: PUT replaces the whole resource with what you send; PATCH changes only the fields you send. Sending just {"email": …} with PUT can erase the other fields.',
    question: 'What does a PUT request do to an existing resource?',
    canonicalAnswer:
      'It replaces the whole resource with the complete new version you send.',
    acceptedAnswers: ['replaces the whole thing', 'overwrites the entire resource', 'replaces it completely'],
    keyIdeas: [
      {
        id: 'replace',
        label: 'replacing the whole resource',
        terms: ['replace', 'overwrite', 'swap', 'whole', 'entire', 'complete', 'full', 'all fields',
          'all the fields', 'everything', 'new version', 'substitute'],
      },
    ],
    wrongIdeas: [
      { terms: ['only some fields', 'partial update', 'only changes part', 'only part', 'only the changed fields'],
        feedback: 'That’s PATCH. PUT sends a complete version and replaces the whole resource.' },
      { terms: ['delete', 'remove'],
        feedback: 'PUT doesn’t remove the resource — it replaces it with the full version you send.' },
    ],
    hint: 'Does it edit part of the item, or swap in a whole new copy?',
    relatedConceptIds: ['http-patch', 'http-post', 'http-method', 'request-body', 'crud'],
    prerequisiteIds: ['http-method', 'http-post'],
    deepDive:
      'PUT is idempotent: sending the same PUT ten times leaves the item in exactly the same state as sending it once. Some APIs also let PUT create an item at a URL you choose (PUT /files/report.pdf) if nothing is there yet.',
    testAnswers: {
      correct: ['replaces the whole thing with what you send', 'it overwrites the entire record', 'updates everything at once with a full new copy'],
      incorrect: ['it updates only some fields', 'it deletes the item'],
    },
  },
  {
    id: 'http-patch',
    term: 'PATCH request',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'PATCH is the HTTP method for partially updating a resource — changing only the fields you send.',
    plainEnglish:
      'PATCH means "just change these bits". You send only what’s different, and everything else stays as it was. It’s the natural fit for edits like renaming a file or ticking a task as done.',
    analogy:
      'Correcting a typo with correction fluid instead of retyping the whole letter.',
    example:
      'Current task: {"id": 7, "title": "Call bank", "done": false, "due": "2026-10-12"}\nPATCH /api/tasks/7 with {"done": true}\nResult: {"id": 7, "title": "Call bank", "done": true, "due": "2026-10-12"} — only "done" changed.',
    whyItMatters:
      'PATCH lets several features edit the same record without stepping on each other — one updates the title while another ticks “done”. It also sends less data, which matters on slow mobile connections.',
    misconception:
      'PATCH vs PUT: PATCH changes only the fields you include; PUT replaces the entire resource. Both are “updates”, but sending a single field with PUT can wipe the rest.',
    question: 'What makes a PATCH request different from a PUT request?',
    canonicalAnswer:
      'PATCH changes only part of a resource — just the specific fields you send — while the rest stays the same.',
    acceptedAnswers: ['partial update', 'updates only part', 'changes only certain fields'],
    keyIdeas: [
      {
        id: 'partial',
        label: 'only part of the resource changes',
        terms: ['partial', 'part', 'parts', 'piece', 'bits', 'specific fields', 'certain fields',
          'changed fields', 'few fields', 'single field', 'one field', 'fields you send', 'fields you change',
          'just the changes', 'just what changed', 'only what changed', 'only the changes', 'selected fields'],
      },
    ],
    wrongIdeas: [
      { terms: ['delete', 'creates a new', 'create a new'],
        feedback: 'PATCH neither creates nor deletes — it edits part of an existing resource.' },
    ],
    hint: 'Think “patch on a pair of jeans” — do you replace the jeans?',
    relatedConceptIds: ['http-put', 'http-method', 'request-body', 'crud', 'json'],
    prerequisiteIds: ['http-method', 'http-put'],
    deepDive:
      'Unlike PUT, PATCH isn’t guaranteed to be idempotent: a patch like "add 1 to the counter" gives a different result each time. Formats such as JSON Merge Patch (send the changed fields) and JSON Patch (a list of operations like {"op": "replace", "path": "/done", "value": true}) standardise how patches are written.',
    testAnswers: {
      correct: ['it only updates part of the thing', 'you only send the fields you want to change', 'partial update instead of a full replace'],
      incorrect: ['it deletes the record', 'it creates a new item'],
    },
  },
  {
    id: 'http-delete',
    term: 'DELETE request',
    trackId: 'apis',
    difficulty: 1,
    definition:
      'DELETE is the HTTP method that asks the server to remove the resource at a given URL.',
    plainEnglish:
      'DELETE means "get rid of this". Removing a photo, cancelling a subscription or deleting a comment usually sends a DELETE request to that item’s address. The server removes it, or marks it as removed.',
    analogy:
      'Asking the librarian to take a specific book off the shelf and out of the catalogue.',
    example:
      'DELETE https://api.example.com/v1/comments/981\nAuthorization: Bearer eyJhb…\n→ 204 No Content (deleted, nothing to send back). Calling it again returns 404 Not Found.',
    whyItMatters:
      'Destructive actions need the strongest checks: the API must verify you are allowed to delete that specific item. Many products “soft delete” instead — hiding the row so it can be restored — which affects privacy promises like “we deleted your data”.',
    misconception:
      'A successful DELETE doesn’t always mean the data is physically erased. Many systems soft-delete (set deleted_at = now) and keep backups for weeks.',
    question: 'What does a DELETE request ask the server to do?',
    canonicalAnswer: 'Remove the resource at that URL — for example, delete comment 981.',
    acceptedAnswers: ['remove the resource', 'delete something', 'get rid of an item'],
    keyIdeas: [
      {
        id: 'remove',
        label: 'removing a resource',
        terms: ['remove', 'delete', 'erase', 'destroy', 'get rid', 'wipe', 'take away', 'eliminate',
          'drop', 'cancel', 'trash'],
      },
    ],
    wrongIdeas: [
      { terms: ['update', 'edit', 'change'],
        feedback: 'Editing is PUT or PATCH. DELETE removes the resource entirely.' },
    ],
    hint: 'The name gives it away — what happens to the item?',
    relatedConceptIds: ['http-method', 'crud', 'status-code', 'authorization'],
    prerequisiteIds: ['http-method'],
    deepDive:
      'DELETE is idempotent: deleting the same item twice leaves the same end state (gone), even though the second call may return 404. Typical success codes are 204 No Content or 200 OK with a confirmation body.',
    testAnswers: {
      correct: ['remove something', 'delete the item from the server', 'get rid of a record'],
      incorrect: ['edit the record', 'download a file'],
    },
  },
  {
    id: 'request-body',
    term: 'Request body',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'The request body is the data a client sends along with an HTTP request — usually with POST, PUT or PATCH — separate from the URL and headers.',
    plainEnglish:
      'Some requests need to carry information: a new user’s details, a message, a file. That content travels in the request body, typically as JSON. A GET request usually has no body because it is only asking for something.',
    analogy:
      'The letter inside an envelope. The address on the outside is the URL; the headers are the stamps and postmarks; the body is what you actually wrote.',
    example:
      'POST /api/signup\nContent-Type: application/json\n\n{"email": "sam@example.com", "password": "correct-horse-battery", "plan": "pro"}\n\nEverything inside the braces is the request body.',
    whyItMatters:
      'Most bugs in a form or integration come down to the body: a missing field, a wrong name ("e_mail" instead of "email") or the wrong format. The server will typically answer 400 Bad Request or 422 Unprocessable Entity.',
    misconception:
      'Request body vs response body: the request body is what you send to the server; the response body is what the server sends back to you.',
    question: 'What is the request body of an HTTP request?',
    canonicalAnswer:
      'The data you send along with the request to the server — for example JSON with the details of a new order.',
    acceptedAnswers: ['data you send with the request', 'the payload of the request', 'content sent to the server'],
    keyIdeas: [
      {
        id: 'data',
        label: 'the data / content',
        terms: ['data', 'content', 'payload', 'information', 'info', 'json', 'details', 'fields',
          'values', 'message', 'form'],
      },
      {
        id: 'sent',
        label: 'sent with the request',
        terms: ['send', 'sent', 'sending', 'submit', 'with the request', 'along with', 'attached',
          'included', 'carried', 'upload', 'post', 'goes with', 'inside the request', 'in the request'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['comes back', 'reply', 'response', 'returned', 'returns'],
        feedback: 'That’s the response body. The request body is what you send to the server.' },
      { terms: ['url', 'web address'],
        feedback: 'The URL is the address the request goes to. The body is the separate data carried with the request.' },
    ],
    hint: 'If the URL is the address on an envelope, what’s the body?',
    relatedConceptIds: ['response-body', 'http-post', 'json', 'headers', 'http-patch', 'form-validation'],
    prerequisiteIds: ['request', 'json'],
    deepDive:
      'The Content-Type header tells the server how to read the body: application/json for JSON, application/x-www-form-urlencoded for classic HTML forms, multipart/form-data for file uploads. Servers should validate the body and never trust it blindly.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: ['the data you send along with a POST', 'the json payload sent to the server', 'info included in the request'],
      partial: ['the json data'],
      incorrect: ['what the server returns', 'the url of the request'],
    },
  },
  {
    id: 'response-body',
    term: 'Response body',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'The response body is the content a server sends back after handling a request — usually JSON data or an HTML page.',
    plainEnglish:
      'When a server answers, it sends a status code, some headers, and usually a body: the actual stuff you asked for. For an API, that’s typically JSON your app reads and displays; for a website, it’s the HTML of the page.',
    analogy:
      'The dish that comes out of the kitchen. The waiter’s “here you go” is the status code; the plate itself is the body.',
    example:
      'GET /api/users/42 → 200 OK\nContent-Type: application/json\n\n{"id": 42, "name": "Priya", "plan": "pro", "joined": "2025-03-01"}\n\nOn failure, the body often explains why: {"error": "user_not_found"} with 404.',
    whyItMatters:
      'Everything an app shows from a server comes from a response body. When a screen shows the wrong thing, engineers open the network tab and check the body to see whether the server sent bad data or the app displayed it wrong.',
    misconception:
      'The response body is not the whole response. The status code and headers come with it and carry crucial information — a 500 error can still have a friendly-looking HTML body.',
    question: 'What is the response body?',
    canonicalAnswer:
      'The content the server sends back after a request — usually JSON data or an HTML page.',
    acceptedAnswers: ['what the server sends back', 'data returned by the server', 'the content that comes back'],
    keyIdeas: [
      {
        id: 'data',
        label: 'the data / content',
        terms: ['data', 'content', 'payload', 'information', 'info', 'json', 'html', 'page', 'result',
          'answer', 'stuff'],
      },
      {
        id: 'returned',
        label: 'sent back by the server',
        terms: ['back', 'return', 'returned', 'reply', 'replies', 'comes back', 'receive', 'get back',
          'server sends', 'responds', 'response from', 'gives you'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['submit', 'upload', 'you post'],
        feedback: 'That’s the request body. The response body is what the server sends back.' },
    ],
    hint: 'You asked; the server answered. What’s inside the answer?',
    relatedConceptIds: ['request-body', 'status-code', 'json', 'headers', 'response', 'http-get'],
    prerequisiteIds: ['response', 'json'],
    deepDive:
      'Not every response has a body — 204 No Content deliberately has none. Large bodies are often compressed (Content-Encoding: gzip) or split into pages, with a cursor like {"next": "/api/users?page=3"}.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: ['the data the server sends back', 'the json you get back from the api', 'whatever content is returned'],
      partial: ['the json data'],
      incorrect: ['what you upload to the server', 'the status code number'],
    },
  },
  {
    id: 'status-code',
    term: 'HTTP status code',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'An HTTP status code is a three-digit number at the start of every response that says whether the request succeeded and, if not, roughly why.',
    plainEnglish:
      'Before any data, the server replies with a number summarising what happened. Codes in the 200s mean success, 300s mean "go elsewhere", 400s mean the request was wrong, and 500s mean the server itself broke.',
    analogy:
      'A traffic light for every reply: green (2xx, all good), yellow (3xx, take a detour), red (4xx, you did something wrong; 5xx, the road is broken).',
    example:
      '200 OK — here’s your data.\n201 Created — your new order exists.\n301 Moved Permanently — it lives at a new URL.\n400 Bad Request — your input was malformed.\n401 Unauthorized — who are you?\n403 Forbidden — you can’t do that.\n404 Not Found — no such thing.\n429 Too Many Requests — slow down.\n500 Internal Server Error — the server crashed.',
    whyItMatters:
      'Status codes are the first thing to check when something breaks. 4xx means fix the request (wrong input, missing login); 5xx means the problem is on the server side. That one digit often tells you which team should look at the bug.',
    misconception:
      '401 vs 403: 401 means "we don’t know who you are" (missing or invalid credentials — log in). 403 means "we know who you are, and you’re not allowed" (logging in again won’t help).',
    question: 'What does an HTTP status code tell you about a request?',
    canonicalAnswer:
      'Whether it succeeded or failed and roughly why — for example 200 means OK, 404 means not found, 500 means a server error.',
    acceptedAnswers: ['whether the request worked', 'if it succeeded or failed', 'what happened to the request'],
    keyIdeas: [
      {
        id: 'outcome',
        label: 'whether it succeeded or failed',
        terms: ['success', 'succeeded', 'worked', 'failed', 'fail', 'error', 'result', 'outcome',
          'what happened', 'went wrong', 'ok', 'status', 'went well', '200', '404', '500'],
      },
    ],
    wrongIdeas: [
      { terms: ['speed', 'how fast', 'how long'],
        feedback: 'Status codes don’t measure speed — they report the outcome: success (2xx), client error (4xx), server error (5xx).' },
    ],
    hint: '200, 404, 500 — what is each number summarising?',
    relatedConceptIds: ['response', 'response-body', 'headers', 'error', 'rate-limit', 'authentication'],
    prerequisiteIds: ['response', 'http'],
    deepDive:
      'The first digit is the category; the rest refines it. Good APIs use specific codes (201 for created, 422 for validation errors, 429 for rate limits) and add a JSON body with details, rather than returning 200 for everything with {"error": …} inside.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: ['whether it worked or not', 'if there was an error, like 404', 'the result of the request, success or fail'],
      incorrect: ['how fast the server is', 'the size of the file'],
    },
  },
  {
    id: 'headers',
    term: 'HTTP headers',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'HTTP headers are key–value lines sent with every request and response that carry metadata — such as credentials, the data format and caching rules — separate from the body.',
    plainEnglish:
      'Headers are the labels on a request or response. They don’t hold the main content; they describe it and give instructions: “this is JSON”, “here’s my access token”, “you can cache this for an hour”.',
    analogy:
      'The writing on a parcel: sender, recipient, “fragile”, “keep upright”. It isn’t the contents, but it tells everyone how to handle them.',
    example:
      'GET /api/invoices\nAuthorization: Bearer sk_live_abc123\nAccept: application/json\nUser-Agent: Coded/1.0\n\nResponse:\nContent-Type: application/json\nCache-Control: max-age=3600\nX-RateLimit-Remaining: 57',
    whyItMatters:
      'Many “mysterious” API failures are header problems: a missing Authorization header gives 401, the wrong Content-Type makes the server misread the body, missing CORS headers make browsers block the response.',
    misconception:
      'Headers vs body: headers are metadata about the message; the body is the content. Your API key goes in a header, the new customer’s details go in the body.',
    question: 'What kind of information do HTTP headers carry?',
    canonicalAnswer:
      'Metadata about the request or response — like the auth token, the content type, or caching rules — that describes the message.',
    acceptedAnswers: ['metadata about the request', 'extra information about the message', 'information about the request'],
    keyIdeas: [
      {
        id: 'metadata',
        label: 'metadata / extra information',
        terms: ['metadata', 'meta data', 'extra information', 'extra info', 'additional information',
          'additional info', 'details about', 'info about', 'information about', 'settings', 'instructions',
          'context', 'labels', 'key value', 'content type', 'authorization', 'auth token', 'api key',
          'cookies', 'credentials'],
      },
    ],
    wrongIdeas: [
      { terms: ['main content', 'actual data', 'the body', 'page title', 'title of the page'],
        feedback: 'The main content is the body. Headers carry metadata about the message — auth tokens, content type, caching rules.' },
    ],
    hint: 'If the body is what’s inside the parcel, what’s written on the outside?',
    relatedConceptIds: ['request-body', 'response-body', 'api-key', 'auth-token', 'cors', 'cache'],
    prerequisiteIds: ['request', 'response'],
    deepDive:
      'Header names are case-insensitive. Some are standard (Content-Type, Authorization, Cache-Control, Set-Cookie); companies add their own, often prefixed X- (X-Request-Id). Browsers forbid web pages from setting some headers, like Cookie, directly.',
    testAnswers: {
      correct: ['metadata like the content type', 'extra info about the request such as the api key', 'auth token and other settings'],
      incorrect: ['the main content of the page', 'the title of the page'],
    },
  },
  {
    id: 'query-parameter',
    term: 'Query parameter',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'A query parameter is a key=value pair added to the end of a URL after a question mark, used to filter, sort or otherwise adjust what a request returns.',
    plainEnglish:
      'Query parameters let you add options to a URL without changing which endpoint you’re calling. Everything after the ? is a list of name=value settings joined by &. Search terms, page numbers and filters usually live here.',
    analogy:
      'Ordering “coffee” is the endpoint; “?size=large&milk=oat” are the options you add to the same order.',
    example:
      'https://shop.example.com/api/products?category=shoes&sort=price&page=2\n\nEndpoint: /api/products. Query parameters: category=shoes, sort=price, page=2. Google uses them too: google.com/search?q=what+is+an+api',
    whyItMatters:
      'Query parameters make URLs shareable and bookmarkable — a filtered search can be sent as a link. They also power marketing tracking (utm_source=newsletter) and pagination in almost every API.',
    misconception:
      'Query parameters vs request body: parameters are visible in the URL (and end up in logs and history), so they suit filters and options, not passwords or large data, which go in a POST body.',
    question: 'What is a query parameter?',
    canonicalAnswer:
      'A key=value option added to the end of a URL after the ?, used to filter or adjust the request — like ?page=2.',
    acceptedAnswers: ['options added to the url', 'filters in the url', 'key value pairs in the url'],
    keyIdeas: [
      {
        id: 'url',
        label: 'part of the URL',
        terms: ['url', 'link', 'address', 'question mark', 'end of the url', 'web address'],
      },
      {
        id: 'option',
        label: 'an option / filter',
        terms: ['filter', 'option', 'key value', 'setting', 'modify', 'adjust', 'customize', 'search',
          'sort', 'narrow', 'page', 'extra info', 'extra information', 'variable', 'value', 'parameter'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['body', 'header'],
        feedback: 'Query parameters live in the URL itself, after the ?. The body and headers are separate parts of a request.' },
    ],
    hint: 'Look at what follows the ? in a search URL.',
    relatedConceptIds: ['url', 'api-endpoint', 'http-get', 'request-body', 'routing'],
    prerequisiteIds: ['url', 'api-endpoint'],
    deepDive:
      'Special characters must be URL-encoded: a space becomes %20 or +, so q=red shoes is sent as q=red%20shoes. Path parameters are different — in /users/42 the 42 identifies the resource; in /users?role=admin the parameter filters the list.',
    testAnswers: {
      correct: ['extra options at the end of a url like ?page=2', 'something in the link that filters results', 'key value stuff after the question mark in the url'],
      partial: ['the part after the question mark in a url'],
      incorrect: ['the body of a POST request', 'a question you ask the server'],
    },
  },
  {
    id: 'rest',
    term: 'REST (Representational State Transfer)',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'REST (Representational State Transfer) is a widely used style for designing web APIs, where data is organised as resources at URLs and manipulated with standard HTTP methods.',
    plainEnglish:
      'REST is a set of conventions, not a technology. Things in the system — users, orders, invoices — each get a URL, and you use the normal HTTP verbs on them: GET to read, POST to create, PUT/PATCH to update, DELETE to remove. Each request carries everything needed to handle it.',
    analogy:
      'A well-organised filing cabinet with standard labels: once you know how one drawer works, you can guess how every drawer works.',
    example:
      'GET /orders — list orders\nPOST /orders — create an order\nGET /orders/5012 — read one order\nPATCH /orders/5012 — update it\nDELETE /orders/5012 — cancel it\nNouns in the URL, verbs from HTTP.',
    whyItMatters:
      '“REST API” is the default meaning of “API” in most companies. Following REST conventions makes an API guessable, cacheable and easy for other teams and partners to use without hand-holding.',
    misconception:
      'REST is not a protocol, library or language — it is a design style built on top of HTTP. Alternatives like GraphQL or gRPC also use HTTP but organise requests differently.',
    question: 'What is REST?',
    canonicalAnswer:
      'A style of designing APIs where things are resources at URLs and you act on them with standard HTTP methods like GET, POST and DELETE.',
    acceptedAnswers: ['a style for designing apis', 'conventions for building apis', 'an api design style'],
    keyIdeas: [
      {
        id: 'style',
        label: 'a design style / set of conventions',
        terms: ['style', 'convention', 'rules', 'pattern', 'approach', 'design', 'architecture',
          'guidelines', 'standard way', 'principles', 'standard', 'way of building', 'philosophy'],
      },
      {
        id: 'resources',
        label: 'resources at URLs, acted on with HTTP methods',
        terms: ['resource', 'url', 'http method', 'methods', 'verbs', 'get post', 'nouns', 'endpoints',
          'http', 'api', 'apis'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['programming language', 'protocol', 'library', 'database'],
        feedback: 'REST isn’t a language, protocol or library — it’s a style for designing APIs on top of HTTP.' },
    ],
    hint: 'It’s not software you install. It’s more like a set of agreed habits for…?',
    relatedConceptIds: ['api', 'http-method', 'api-endpoint', 'http', 'json', 'crud'],
    prerequisiteIds: ['api', 'http-method'],
    deepDive:
      'REST’s formal constraints include statelessness (each request stands alone — the server doesn’t remember previous calls), a uniform interface and cacheability. In practice “RESTful” is used loosely for any JSON-over-HTTP API with resource-style URLs.',
    testAnswers: {
      correct: ['a set of rules for building APIs using URLs and HTTP methods', 'an api design style where everything is a resource', 'a pattern for apis using get post put delete'],
      partial: ['some kind of style'],
      incorrect: ['a programming language for servers', 'taking a break'],
    },
  },
  {
    id: 'webhook',
    term: 'Webhook (event callback)',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'A webhook is an HTTP request a service automatically sends to a URL you provide whenever a specific event happens.',
    plainEnglish:
      'Normally your app asks another service for information. With a webhook, it flips around: you give the service a URL, and it calls you the moment something happens — a payment succeeds, a form is submitted, a file is uploaded.',
    analogy:
      'Polling is checking your mailbox every ten minutes. A webhook is the doorbell: the courier rings you when the parcel actually arrives.',
    example:
      'You register https://myshop.com/hooks/stripe with Stripe. When a customer pays, Stripe sends:\nPOST /hooks/stripe\n{"type": "payment_intent.succeeded", "data": {"amount": 4900, "currency": "usd"}}\nYour server marks the order paid and replies 200 OK.',
    whyItMatters:
      'Webhooks make automation possible — Zapier, Slack bots, payment confirmations and GitHub deploys all run on them. They’re faster and cheaper than asking “anything new?” over and over.',
    misconception:
      'Webhook vs polling: with polling, your app repeatedly asks the other service whether anything changed. With a webhook, the other service pushes a request to you when the event happens — but your server must be online and must verify the request is genuine.',
    question: 'What does a webhook do?',
    canonicalAnswer:
      'It automatically notifies your app — by sending an HTTP request to your URL — when a specific event happens in another service.',
    acceptedAnswers: ['notifies you when something happens', 'calls your url when an event occurs', 'pushes updates to your app'],
    keyIdeas: [
      {
        id: 'push',
        label: 'the service pushes / notifies you',
        terms: ['notify', 'notification', 'push', 'calls you', 'calls your', 'sends', 'tells', 'alert',
          'pings', 'message', 'automatically', 'callback', 'post to your'],
      },
      {
        id: 'event',
        label: 'when an event happens',
        terms: ['event', 'something happens', 'happens', 'occurs', 'changes', 'updates', 'real time',
          'instantly', 'right away', 'triggered', 'trigger', 'soon'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'Mailbox vs doorbell — which one is a webhook, and when does it ring?',
    relatedConceptIds: ['api', 'http-post', 'event', 'integration', 'api-endpoint', 'websocket'],
    prerequisiteIds: ['api', 'http-post', 'api-endpoint'],
    deepDive:
      'Because anyone could send a fake request to your webhook URL, providers sign each delivery (e.g. a Stripe-Signature header) and you verify it with a shared secret. Providers retry failed deliveries, so handlers should cope with receiving the same event twice.',
    testAnswers: {
      correct: ['it notifies you when something happens', 'the other service pushes updates to your server', 'it calls your url automatically when an event occurs'],
      partial: ['it sends you a message'],
      incorrect: ['a hook that catches bugs in a website', 'a type of database'],
    },
  },
  {
    id: 'api-key',
    term: 'API key (secret key)',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'An API key is a long secret string an API issues to a developer, sent with each request so the API can identify which app is calling and apply its permissions and limits.',
    plainEnglish:
      'An API key is like a membership card for software. You get one when you sign up for a service like OpenAI or Google Maps, and your code attaches it to every request. The service uses it to know who you are, what you’re allowed to do, and whom to bill.',
    analogy:
      'A hotel key card: it identifies your room and opens certain doors, and if someone copies it, they can get in too.',
    example:
      'curl https://api.openai.example/v1/models \\\n  -H "Authorization: Bearer sk-proj-4f9a…"\nA request without the key gets 401 Unauthorized; a key that’s used too heavily gets 429 Too Many Requests.',
    whyItMatters:
      'Leaked API keys are one of the most common security incidents — pushed to GitHub, pasted in screenshots, shipped inside mobile apps. Anyone with your key can run up your bill or access your data, so keys belong in environment variables on a server.',
    misconception:
      'API key vs OAuth: an API key identifies an app (usually your own account’s access). OAuth lets a user grant your app limited access to their account on another service — like “Sign in with Google” — without sharing their password.',
    question: 'What is an API key used for?',
    canonicalAnswer:
      'It identifies and authenticates the app making the request, so the API knows who is calling and can control access, limits and billing.',
    acceptedAnswers: ['identifies who is calling the api', 'proves who you are to the api', 'authenticates your app'],
    keyIdeas: [
      {
        id: 'identify',
        label: 'identifying / authenticating the caller',
        terms: ['identify', 'identifies', 'identification', 'authenticate', 'prove', 'whose',
          'who is calling', 'access', 'permission', 'authorize', 'verify', 'track usage', 'billing',
          'password for', 'credential', 'unlock'],
      },
    ],
    wrongIdeas: [
      { terms: ['encrypt', 'encryption', 'scramble'],
        feedback: 'An API key doesn’t encrypt anything (HTTPS does that). It identifies which app is calling.' },
    ],
    hint: 'When a request arrives, how does the API know whose it is?',
    relatedConceptIds: ['authentication', 'oauth', 'headers', 'rate-limit', 'environment-variable', 'auth-token'],
    prerequisiteIds: ['api', 'headers'],
    deepDive:
      'Keys are usually sent in a header (Authorization: Bearer … or X-API-Key: …) rather than the URL, which leaks into logs. Good practice: separate test and live keys (sk_test_ vs sk_live_), least-privilege scopes, and rotating a key immediately if it leaks.',
    testAnswers: {
      correct: ['to identify your app to the api', 'proves who you are so you get access', 'like a password for the api'],
      incorrect: ['it encrypts the data', 'it makes the api faster'],
    },
  },
  {
    id: 'rate-limit',
    term: 'Rate limit',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'A rate limit is a cap on how many requests a client may make to an API within a given time window.',
    plainEnglish:
      'APIs can’t let one customer flood them with requests, so they set a ceiling like “100 requests per minute”. Go over it and the API rejects extra requests until the window resets. It protects the service and keeps things fair for everyone.',
    analogy:
      'A ticket gate that lets through at most 60 people a minute. Arrive in a rush and you queue until the next minute starts.',
    example:
      'Response headers: X-RateLimit-Limit: 100, X-RateLimit-Remaining: 0, Retry-After: 30\nStatus: 429 Too Many Requests\nYour code should wait 30 seconds before trying again.',
    whyItMatters:
      'Rate limits shape what a product can do: syncing 50,000 contacts at 10 requests per second takes over an hour. They’re also a defence against abuse like password guessing and scraping.',
    misconception:
      'A rate limit isn’t a bandwidth or speed limit on your connection. It counts requests (or tokens, for AI APIs) per time window, regardless of how fast your internet is.',
    question: 'What is an API rate limit?',
    canonicalAnswer:
      'A cap on how many requests you can make within a certain time — like 100 requests per minute — after which the API returns 429.',
    acceptedAnswers: ['max requests per minute', 'limit on requests per time period', 'how many requests per second'],
    keyIdeas: [
      {
        id: 'cap',
        label: 'a cap on the number of requests',
        terms: ['limit', 'cap', 'maximum', 'max', 'how many', 'number of requests', 'too many',
          'restrict', 'throttle', 'quota', 'ceiling', 'amount of requests', 'certain number'],
      },
      {
        id: 'time',
        label: 'within a time window',
        terms: ['per minute', 'per second', 'per hour', 'per day', 'time', 'period', 'window', 'minute',
          'hour', 'second', 'within', 'timeframe', 'interval'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['bandwidth', 'internet speed', 'download speed', 'connection speed'],
        feedback: 'A rate limit counts requests per time window — it’s not about the speed of your connection.' },
    ],
    hint: 'Think “100 per …”. What two things does that phrase combine?',
    relatedConceptIds: ['status-code', 'api-key', 'headers', 'bandwidth', 'api'],
    prerequisiteIds: ['api', 'status-code'],
    deepDive:
      'Common algorithms include fixed windows, sliding windows and token buckets (you earn tokens steadily and spend one per request, allowing short bursts). Well-behaved clients respect Retry-After and back off exponentially: wait 1s, then 2s, then 4s.',
    testAnswers: {
      correct: ['max requests per minute', 'how many calls you can make in a certain time', 'a limit on requests within a time window'],
      partial: ['a limit on how many requests you can send'],
      incorrect: ['how fast your internet connection is', 'the price of the api'],
    },
  },
  {
    id: 'sdk',
    term: 'SDK (Software Development Kit)',
    trackId: 'apis',
    difficulty: 3,
    definition:
      'An SDK (Software Development Kit) is a package of ready-made code, tools and documentation that makes it easier to build on a particular platform or API from a specific programming language.',
    plainEnglish:
      'Calling an API by hand means building URLs, headers and JSON yourself. An SDK wraps all of that in friendly functions in your language, so instead of crafting an HTTP request you write one line like stripe.customers.create(…).',
    analogy:
      'The API is the restaurant’s menu; the SDK is a delivery app that already knows the menu and fills in the order form for you.',
    example:
      'Raw API: POST https://api.stripe.com/v1/customers with headers and form data.\nWith Stripe’s Node SDK:\nconst customer = await stripe.customers.create({ email: "ana@x.com" });\nThe SDK sends the same HTTP request underneath.',
    whyItMatters:
      'A good SDK can turn days of integration into an afternoon, and handles details like retries, pagination and auth. When choosing a vendor, “do they have an SDK for our language?” is a real factor in effort estimates.',
    misconception:
      'API vs SDK: the API is the contract the service exposes (endpoints, requests, responses). The SDK is client code that calls that API for you. You can use an API without its SDK, but an SDK is useless without the API.',
    question: 'What does an SDK give a developer?',
    canonicalAnswer:
      'Ready-made code and tools — usually a library in their language — that make it easier to use a platform or API without writing raw requests.',
    acceptedAnswers: ['prebuilt code for using an api', 'a library that wraps the api', 'tools to build on a platform'],
    keyIdeas: [
      {
        id: 'code',
        label: 'ready-made code / tools',
        terms: ['library', 'prebuilt', 'pre-built', 'ready made', 'ready-made', 'toolkit', 'tools',
          'package', 'code', 'functions', 'helpers', 'kit', 'methods', 'wrapper'],
      },
      {
        id: 'easier',
        label: 'makes a platform/API easier to use',
        terms: ['easier', 'simpler', 'wraps', 'convenient', 'faster', 'shortcut', 'api', 'platform',
          'service', 'build', 'integrate', 'handles'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['same as an api', 'same thing as an api', 'another name for an api'],
        feedback: 'They’re related but different: the API is the contract; the SDK is ready-made code that calls it for you.' },
    ],
    hint: 'Kit = a box of tools. Tools for doing what, more easily?',
    relatedConceptIds: ['api', 'library', 'framework', 'integration', 'package-manager'],
    prerequisiteIds: ['api', 'library'],
    deepDive:
      'Many SDKs are generated automatically from an API description (such as an OpenAPI spec), so every endpoint gets a matching function. Mobile SDKs (iOS, Android) can also include UI components, analytics and offline storage, not just API wrappers.',
    testAnswers: {
      correct: ['a library of code that makes using an api easier', 'prebuilt tools to build on a platform', 'ready made functions for the service'],
      partial: ['a bunch of tools'],
      incorrect: ['the same thing as an API', 'a type of database'],
    },
  },
  {
    id: 'integration',
    term: 'Integration',
    trackId: 'apis',
    difficulty: 2,
    definition:
      'An integration is a connection between two software products, usually built on their APIs, that lets them share data or trigger actions in each other.',
    plainEnglish:
      'When your calendar shows Zoom links automatically, or a new Shopify order appears in your accounting software, that’s an integration. Someone wrote code that listens to one product and talks to the other through their APIs.',
    analogy:
      'A plumber connecting two buildings’ water pipes: each building already had pipes (APIs); the integration is the joining work in between.',
    example:
      'A Slack–GitHub integration: GitHub sends a webhook when a pull request opens; the integration code calls Slack’s API (POST https://slack.com/api/chat.postMessage) to announce it in #engineering.',
    whyItMatters:
      '“Does it integrate with X?” is one of the most common sales questions. Integrations are a big part of a product’s value and a big source of maintenance: when either side changes its API, the integration can break.',
    misconception:
      'An integration is not the same as an API. The API is each product’s doorway; the integration is the specific code or configuration that connects two doorways to do a job.',
    question: 'What does a software integration do?',
    canonicalAnswer:
      'It connects two products or systems — usually via their APIs — so they can share data or trigger actions in each other.',
    acceptedAnswers: ['connects two apps', 'makes two systems work together', 'links two products so they share data'],
    keyIdeas: [
      {
        id: 'connect',
        label: 'connecting things',
        terms: ['connect', 'link', 'hook up', 'together', 'plug', 'combine', 'sync', 'talk to each other',
          'between', 'join', 'share data', 'bridge'],
      },
      {
        id: 'systems',
        label: 'two separate products / systems',
        terms: ['app', 'apps', 'product', 'system', 'service', 'tool', 'software', 'platform', 'program',
          'data', 'third party', 'slack', 'stripe', 'salesforce', 'api'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['calculus', 'math', 'area under'],
        feedback: 'Different “integration”! In software it means connecting two products so they share data or actions.' },
    ],
    hint: 'Your calendar and Zoom suddenly work together. What made that happen?',
    relatedConceptIds: ['api', 'webhook', 'sdk', 'oauth', 'api-key', 'service'],
    prerequisiteIds: ['api'],
    deepDive:
      'Integrations can be native (built by one of the vendors), third-party (Zapier, Make) or custom (your own code). Most involve OAuth for permission, webhooks for real-time events, and API calls for actions.',
    testAnswers: {
      correct: ['connects two apps so they share data', 'makes different systems work together', 'links your product with another service'],
      partial: ['connecting things together'],
      incorrect: ['a math calculation in calculus', 'a type of server'],
    },
  },
  {
    id: 'oauth',
    term: 'OAuth 2.0',
    trackId: 'apis',
    difficulty: 4,
    definition:
      'OAuth is a standard that lets a user grant an app limited access to their account on another service — via a token — without giving the app their password.',
    plainEnglish:
      'When an app says “Connect your Google Calendar” and you see a Google screen asking “Allow this app to view your events?”, that’s OAuth. You log in on Google’s own page, approve specific permissions, and Google hands the app a token that works only for what you approved.',
    analogy:
      'A hotel valet key: it starts the car and parks it, but doesn’t open the trunk or glovebox — and you can cancel it without changing your own key.',
    example:
      '1. App redirects you to https://accounts.google.com/o/oauth2/auth?client_id=…&scope=calendar.readonly\n2. You approve.\n3. Google redirects back with a one-time code.\n4. The app exchanges the code for an access token and calls GET /calendar/v3/events with Authorization: Bearer ya29.a0…',
    whyItMatters:
      'OAuth powers “Sign in with Google/Apple/GitHub” and nearly every “connect your account” button. It means apps never hold your password, permissions can be narrow, and you can revoke access any time from your account settings.',
    misconception:
      'OAuth vs API key: an API key identifies an app with its own fixed access. OAuth is about a user delegating access to their own account to an app, with scopes they approve and tokens that expire and can be revoked.',
    question: 'What does OAuth let a user give a third-party app?',
    canonicalAnswer:
      'Limited, revocable access to their account on another service — via a token and approved permissions — without handing over their password.',
    acceptedAnswers: ['access to their account without their password', 'limited access to their data', 'permission to use their account'],
    keyIdeas: [
      {
        id: 'access',
        label: 'limited access / permission',
        terms: ['access', 'permission', 'authorize', 'authorization', 'grant', 'approve', 'consent',
          'token', 'scoped', 'delegate', 'sign in with', 'log in with', 'login with', 'on your behalf'],
      },
    ],
    wrongIdeas: [
      { terms: ['give your password', 'share your password', 'hand over your password', 'gives the app your password',
        'their password to the app', 'your username and password'],
        feedback: 'The whole point of OAuth is that the app never sees your password — it gets a limited token instead.' },
    ],
    hint: 'Think of the “Allow this app to view your calendar?” screen. What are you granting?',
    relatedConceptIds: ['authorization', 'authentication', 'auth-token', 'api-key', 'integration', 'session'],
    prerequisiteIds: ['authentication', 'authorization', 'api-key'],
    deepDive:
      'OAuth 2.0 issues a short-lived access token (minutes to hours) plus a refresh token to get new ones. Scopes like calendar.readonly limit what the token can do. OpenID Connect is a layer on top of OAuth that adds identity — that’s what “Sign in with Google” actually uses.',
    testAnswers: {
      correct: ['permission to access your account without your password', 'limited access to my data on another site', 'a token that grants access'],
      incorrect: ['you give the app your password', 'a faster internet connection'],
    },
  },
];

export default concepts;
