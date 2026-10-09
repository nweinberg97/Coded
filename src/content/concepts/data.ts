import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'database',
    term: 'Database (DB)',
    trackId: 'data',
    difficulty: 1,
    definition:
      'A database is an organised collection of data stored so that software can save, find and update it quickly and reliably.',
    plainEnglish:
      'Every app needs to remember things after you close it — your account, your orders, your messages. That information lives in a database: a structured store designed so programs can look up exactly what they need in milliseconds, even among millions of records, without losing anything.',
    analogy:
      'A library’s catalogued shelves rather than a pile of books on the floor: everything has a place, so finding one book among a million is fast.',
    example:
      'When you log in to Spotify, the app asks its database for the row where email = "you@example.com", checks your password hash, then loads your playlists — all stored data that survives server restarts.',
    whyItMatters:
      'The database is usually the most valuable and most fragile part of a product: code can be rewritten, but lost or corrupted customer data often can’t be recovered. Backups, migrations and access rules all revolve around it.',
    misconception:
      'Database vs DBMS: the database is the data itself (your tables of users and orders). The DBMS is the software — PostgreSQL, MySQL, SQLite — that stores it and answers queries. People often say “database” for both.',
    question: 'What is a database for?',
    canonicalAnswer:
      'Storing an app’s data in an organised way so it can be saved, found and updated reliably later.',
    acceptedAnswers: ['storing data', 'keeps data organized', 'saves information so it can be found later'],
    keyIdeas: [
      {
        id: 'store',
        label: 'storing / persisting data',
        terms: ['store', 'storage', 'save', 'keep', 'hold', 'persist', 'remember', 'record',
          'organize data', 'organized data', 'collection of data', 'retrieve', 'manage data'],
      },
    ],
    wrongIdeas: [
      { terms: ['programming language', 'website design', 'make websites look'],
        feedback: 'A database doesn’t build or style anything — it stores data so programs can find and update it.' },
    ],
    hint: 'When you close an app and reopen it, where did your account details stay?',
    relatedConceptIds: ['dbms', 'table', 'sql', 'query', 'nosql', 'cache', 'backend'],
    prerequisiteIds: ['server'],
    deepDive:
      'Most business apps use relational databases (tables with rows and columns, queried with SQL). Others use document, key-value or graph databases. Databases guarantee things a plain file can’t: many users writing at once safely, crash recovery, and fast lookups via indexes.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['to store data', 'it keeps all the app information saved', 'an organized place to hold data you can look up later'],
      incorrect: ['a programming language', 'it makes websites look nice'],
    },
  },
  {
    id: 'dbms',
    term: 'DBMS (Database Management System)',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A DBMS is the software that stores a database on disk and handles every request to read, write and protect its data.',
    plainEnglish:
      'Data doesn’t organise itself. A DBMS — such as PostgreSQL, MySQL, SQLite or MongoDB — is the program that manages the files, answers queries, enforces rules, handles many users at once and recovers after crashes. Your app talks to the DBMS; the DBMS talks to the disk.',
    analogy:
      'The librarian, not the books. The books are the data; the librarian files them, fetches what you ask for, and stops two people grabbing the same book at once.',
    example:
      'Your app sends the text SELECT * FROM orders WHERE customer_id = 7; to PostgreSQL (the DBMS) over a network connection. PostgreSQL figures out the fastest way to find those rows, reads them from disk and sends back the results.',
    whyItMatters:
      'Choosing a DBMS is one of the longest-lasting technical decisions a team makes — it affects cost, scaling, hosting, hiring and what queries are easy. “We’re on Postgres” tells an engineer a lot about a company.',
    misconception:
      'Database vs DBMS: the database is the data (your customers table); the DBMS is the software managing it (PostgreSQL). One PostgreSQL server can host many separate databases.',
    question: 'What is the job of a DBMS like PostgreSQL or MySQL?',
    canonicalAnswer:
      'It’s the software that manages a database — storing the data and handling queries to read and change it.',
    acceptedAnswers: ['software that manages the database', 'the program that runs the database', 'software for managing data'],
    keyIdeas: [
      {
        id: 'software',
        label: 'it is software / a program',
        terms: ['software', 'program', 'system', 'application', 'engine', 'tool', 'server', 'app'],
      },
      {
        id: 'manages',
        label: 'manages / runs the data',
        terms: ['manage', 'manages', 'run', 'runs', 'control', 'handle', 'store', 'organize', 'query',
          'queries', 'read and write', 'access', 'maintain', 'operate'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['data itself', 'a spreadsheet'],
        feedback: 'That’s the database. The DBMS is the software that stores and manages that data.' },
    ],
    hint: 'If the database is the books, the DBMS is the…?',
    relatedConceptIds: ['database', 'postgresql', 'sqlite', 'sql', 'transaction', 'server'],
    prerequisiteIds: ['database'],
    deepDive:
      'Inside a DBMS: a query planner chooses how to execute each query, a storage engine lays data out on disk, a write-ahead log makes crashes recoverable, and a concurrency system (locks or MVCC) keeps simultaneous users from corrupting each other’s work.',
    testAnswers: {
      correct: ['software that manages the database', 'the program that stores and handles queries', 'the system that runs the data'],
      partial: ['some kind of software'],
      incorrect: ['just the data itself', 'a spreadsheet'],
    },
  },
  {
    id: 'table',
    term: 'Table',
    trackId: 'data',
    difficulty: 1,
    definition:
      'A table is a named grid in a relational database that holds one kind of thing, with each row being one record and each column one attribute.',
    plainEnglish:
      'A relational database is split into tables, one per kind of thing: users, orders, products. Each table looks like a spreadsheet — columns define what’s recorded (name, email, created_at) and every row is one actual user or order.',
    analogy:
      'One tab in a spreadsheet file. The file is the database; each tab (“Customers”, “Invoices”) is a table.',
    example:
      'users\n| id | name  | email           |\n| 1  | Ana   | ana@example.com |\n| 2  | Kofi  | kofi@example.com|\nCreated with: CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE);',
    whyItMatters:
      'How data is split into tables decides what questions are easy to answer. A product with “orders” and “customers” as separate tables can easily ask “which customers ordered twice this month?”.',
    misconception:
      'A table is not a spreadsheet. Every row must follow the same column types (no stray notes in the price column), and tables are linked by keys rather than by copying data around.',
    question: 'What does a table in a database hold?',
    canonicalAnswer:
      'Records of one kind of thing — like users — arranged in rows (one per record) and columns (one per attribute).',
    acceptedAnswers: ['rows and columns of data', 'records of one type', 'data organized in rows and columns'],
    keyIdeas: [
      {
        id: 'grid',
        label: 'rows and columns / records',
        terms: ['rows', 'row', 'columns', 'column', 'records', 'record', 'entries', 'grid',
          'spreadsheet', 'fields', 'items'],
      },
      {
        id: 'kind',
        label: 'one kind of thing',
        terms: ['one kind', 'one type', 'same kind', 'same type', 'single type', 'category', 'users',
          'customers', 'orders', 'products', 'data', 'information', 'entity'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['furniture', 'desk'],
        feedback: 'Not that kind of table! A database table is a grid of rows (records) and columns (attributes).' },
    ],
    hint: 'Picture one tab in a spreadsheet called “Users”.',
    relatedConceptIds: ['row', 'column', 'schema', 'primary-key', 'database', 'sql'],
    prerequisiteIds: ['database'],
    deepDive:
      'Table design follows normalisation: store each fact once. Instead of typing the customer’s address on every order, orders store a customer_id that points to the customers table. Wide tables with repeated data become hard to keep consistent.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['rows and columns of data', 'records of one type like users', 'a grid of entries for customers'],
      partial: ['rows'],
      incorrect: ['a piece of furniture', 'a list of web pages'],
    },
  },
  {
    id: 'row',
    term: 'Row (record)',
    trackId: 'data',
    difficulty: 1,
    definition:
      'A row is a single entry in a database table — one complete record, such as one user or one order.',
    plainEnglish:
      'If a table is “all our customers”, a row is one customer. It holds a value for every column in the table: this customer’s ID, name, email and signup date. Adding a customer means inserting a row.',
    analogy:
      'One filled-in index card in a box of cards. The box is the table; every card has the same fields.',
    example:
      'INSERT INTO users (id, name, email) VALUES (42, \'Ana\', \'ana@example.com\');\nThat creates one row: | 42 | Ana | ana@example.com |',
    whyItMatters:
      'Row counts are how teams talk about scale (“the events table has 2 billion rows”) and often how databases are priced. Understanding a row = one record helps when reading any dashboard or data export.',
    misconception:
      'Row vs column: a row is one record (one user, running horizontally). A column is one attribute across all records (every user’s email, running vertically).',
    question: 'What does a single row in a database table represent?',
    canonicalAnswer: 'One record — one individual item, like a single user or a single order.',
    acceptedAnswers: ['one record', 'a single entry', 'one item in the table'],
    keyIdeas: [
      {
        id: 'one',
        label: 'one single record / item',
        terms: ['one record', 'single record', 'a record', 'one entry', 'single entry', 'an entry', 'one item',
          'single item', 'one user', 'one customer', 'one order', 'one thing', 'individual', 'instance',
          'one person', 'one object'],
      },
    ],
    wrongIdeas: [
      { terms: ['attribute', 'one field', 'every user', 'all the', 'category', 'vertical'],
        feedback: 'That describes a column (one attribute across every record). A row is a single record.' },
    ],
    hint: 'In a “users” table, what does one horizontal line describe?',
    relatedConceptIds: ['table', 'column', 'primary-key', 'crud', 'object'],
    prerequisiteIds: ['table'],
    deepDive:
      'Database people also call rows “records” or “tuples”. Each row should be uniquely identifiable — that’s the job of the primary key — so you can update or delete exactly one row without touching its look-alikes.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['one record', 'a single entry like one user', 'an individual item in the table'],
      incorrect: ['one attribute like email for every user', 'the whole table'],
    },
  },
  {
    id: 'column',
    term: 'Column (field)',
    trackId: 'data',
    difficulty: 1,
    definition:
      'A column is one named attribute in a database table, with a fixed data type, that every row has a value for.',
    plainEnglish:
      'Columns define what a table records about each thing. A users table might have columns id, name, email and created_at. Each column has a type — number, text, date, true/false — so the database can reject nonsense like “banana” in a price column.',
    analogy:
      'A labelled field on a paper form (“Date of birth: ___”). Every copy of the form has that field; each person fills in their own value.',
    example:
      'CREATE TABLE products (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  price_cents INTEGER,\n  in_stock BOOLEAN DEFAULT true\n);\nFour columns, each with a type and optional rules.',
    whyItMatters:
      'Adding a column is how product features get new data (“we need to store a phone number”). Column types and rules (NOT NULL, UNIQUE) are the first line of defence against bad data.',
    misconception:
      'Column vs row: a column is an attribute shared by all records (everyone’s email); a row is one record (Ana’s name, email and ID together).',
    question: 'What does a column in a database table represent?',
    canonicalAnswer:
      'One attribute or field — like email — that every row in the table has a value for.',
    acceptedAnswers: ['one attribute', 'a field', 'a property of each record'],
    keyIdeas: [
      {
        id: 'attribute',
        label: 'an attribute / field',
        terms: ['attribute', 'field', 'property', 'characteristic', 'category', 'detail', 'piece of information',
          'type of information', 'kind of information', 'type of data', 'kind of data', 'email', 'name', 'label', 'heading'],
      },
    ],
    wrongIdeas: [
      { terms: ['one record', 'single record', 'one user', 'one entry', 'one person'],
        feedback: 'That’s a row (one record). A column is one attribute, like email, across all rows.' },
    ],
    hint: 'In a “users” table, “email” is one of these.',
    relatedConceptIds: ['row', 'table', 'schema', 'data-type', 'index'],
    prerequisiteIds: ['table', 'data-type'],
    deepDive:
      'A column can allow NULL (meaning “unknown/missing”, not zero or empty text). Columns that are searched often get an index; a column holding another table’s ID is a foreign key.',
    testAnswers: {
      correct: ['one attribute like email', 'a field every record has', 'a type of information about each item'],
      incorrect: ['one record for a single user', 'a separate database'],
    },
  },
  {
    id: 'schema',
    term: 'Schema',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A schema is the formal blueprint of a database: which tables exist, what columns and types they have, and the rules and relationships between them.',
    plainEnglish:
      'The schema describes the shape of the data, not the data itself. It says “there’s a users table with an integer id, a required text email that must be unique, and an orders table whose user_id must match a real user”. The database enforces it on every write.',
    analogy:
      'An architect’s floor plan. It defines rooms, doors and sizes — not the furniture or people that later fill the building.',
    example:
      'CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INTEGER NOT NULL REFERENCES users(id),\n  total_cents INTEGER CHECK (total_cents >= 0),\n  created_at TIMESTAMP DEFAULT now()\n);\nThis statement is part of the schema.',
    whyItMatters:
      'The schema is a shared contract between every part of a system. Changing it — renaming a column, splitting a table — can break code across the company, which is why schema changes go through migrations and review.',
    misconception:
      'Schema vs data: the schema is the structure (columns and rules); the data is the actual rows. NoSQL databases are often called “schemaless”, but the app still assumes a shape — it’s just enforced in code instead of by the database.',
    question: 'What does a database schema describe?',
    canonicalAnswer:
      'The structure of the database — its tables, columns, data types and the rules and relationships between them.',
    acceptedAnswers: ['the structure of the database', 'the blueprint of the data', 'how the data is organized'],
    keyIdeas: [
      {
        id: 'structure',
        label: 'the structure / blueprint',
        terms: ['structure', 'blueprint', 'layout', 'shape', 'design', 'plan', 'organized', 'organization',
          'tables and columns', 'columns', 'tables', 'data types', 'rules', 'format', 'definition', 'outline'],
      },
    ],
    wrongIdeas: [
      { terms: ['the actual data', 'actual rows', 'the values', 'a scheme to', 'scam'],
        feedback: 'The schema is the structure (tables, columns, rules), not the data that fills it.' },
    ],
    hint: 'Floor plan vs furniture — which is the schema?',
    relatedConceptIds: ['table', 'column', 'migration', 'data-model', 'relationship', 'data-type'],
    prerequisiteIds: ['table', 'column'],
    deepDive:
      'In PostgreSQL “schema” also means a namespace inside a database (public.users vs billing.users) — the same word for a related idea. Tools can draw the schema as an ER diagram showing tables as boxes and relationships as lines.',
    testAnswers: {
      correct: ['the structure of the database', 'what tables and columns exist and their rules', 'the blueprint for how data is organized'],
      incorrect: ['the actual data in the rows', 'a sneaky plan or scheme'],
    },
  },
  {
    id: 'sql',
    term: 'SQL (Structured Query Language)',
    trackId: 'data',
    difficulty: 2,
    definition:
      'SQL is the standard language for asking relational databases questions and changing their data, using statements like SELECT, INSERT, UPDATE and DELETE.',
    plainEnglish:
      'SQL (said “S-Q-L” or “sequel”) is how people and programs talk to most databases. You describe what you want — “names of users in Canada, newest first” — and the database figures out how to get it. It reads almost like English.',
    analogy:
      'A precise request form for a librarian: “all books by Le Guin, published before 1975, sorted by title.” You say what, not how.',
    example:
      'SELECT name, email\nFROM users\nWHERE country = \'CA\'\nORDER BY created_at DESC\nLIMIT 10;\n\nUPDATE users SET plan = \'pro\' WHERE id = 42;',
    whyItMatters:
      'SQL is one of the most useful technical skills outside engineering — analysts, PMs and marketers use it to answer their own questions instead of waiting on a data team. It has been the standard for 50 years and is everywhere.',
    misconception:
      'SQL vs NoSQL: SQL is a language for relational (table-based) databases like PostgreSQL. “NoSQL” refers to databases (MongoDB, Redis) organised differently — documents, key-value pairs — and usually queried another way. SQL isn’t a database itself.',
    question: 'What is SQL used for?',
    canonicalAnswer:
      'It’s a language for querying and changing data in relational databases — like SELECT to read rows or UPDATE to change them.',
    acceptedAnswers: ['querying databases', 'talking to a database', 'language for databases'],
    keyIdeas: [
      {
        id: 'query',
        label: 'querying / managing database data',
        terms: ['query', 'queries', 'ask the database', 'talk to the database', 'talk to databases',
          'retrieve data', 'get data', 'read data', 'manipulate data', 'manage data', 'database',
          'databases', 'select', 'insert', 'update', 'tables', 'pull data'],
      },
    ],
    wrongIdeas: [
      { terms: ['style web pages', 'styling', 'build websites', 'design websites'],
        feedback: 'That sounds like HTML or CSS. SQL is for asking databases questions and changing their data.' },
    ],
    hint: 'The Q in the name stands for…?',
    relatedConceptIds: ['query', 'database', 'crud', 'table', 'nosql', 'postgresql', 'orm'],
    prerequisiteIds: ['database', 'table'],
    deepDive:
      'SQL is declarative: you state the result you want and the DBMS’s query planner decides how to fetch it (which index, which join order). Each DBMS has its own dialect (PostgreSQL, MySQL, SQLite differ in details), but the core — SELECT, JOIN, WHERE, GROUP BY — is shared.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['to query databases', 'a language to get data out of a database', 'talking to the database to read and update tables'],
      incorrect: ['styling web pages', 'a programming language for building websites'],
    },
  },
  {
    id: 'query',
    term: 'Query',
    trackId: 'data',
    difficulty: 2,
    definition:
      'A query is a single request sent to a database to retrieve or change data, usually written in SQL.',
    plainEnglish:
      'A query is one specific question or command for the database: “give me this user’s last five orders”, or “mark order 5012 as shipped”. Apps send thousands of queries a second; every screen you load is backed by a few of them.',
    analogy:
      'One question to a librarian. SQL is the language you speak; a query is the particular sentence you say.',
    example:
      'SELECT id, total_cents, created_at\nFROM orders\nWHERE user_id = 42\nORDER BY created_at DESC\nLIMIT 5;\nReturns five rows — this user’s most recent orders.',
    whyItMatters:
      'Slow pages are very often caused by slow or too many queries. “This query takes 4 seconds” or “we have an N+1 query problem” are some of the most common performance diagnoses.',
    misconception:
      'Query vs SQL: SQL is the language; a query is one statement written in it. And “query” isn’t only reading — UPDATE and DELETE statements are queries too.',
    question: 'What is a database query?',
    canonicalAnswer:
      'A request sent to the database to retrieve or change specific data — for example a SQL SELECT statement.',
    acceptedAnswers: ['a request to the database', 'a question you ask the database', 'asking the database for data'],
    keyIdeas: [
      {
        id: 'request',
        label: 'a request / question',
        terms: ['request', 'question', 'ask', 'asking', 'command', 'instruction', 'statement', 'lookup',
          'look up', 'search', 'call'],
      },
      {
        id: 'data',
        label: 'for data in the database',
        terms: ['data', 'database', 'information', 'records', 'rows', 'retrieve', 'get', 'fetch', 'find',
          'change', 'update', 'table'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['database itself', 'where data is stored', 'where the data lives'],
        feedback: 'A query is not where data lives — it’s a request you send to the database.' },
    ],
    hint: 'It’s a single thing you send to the database — what kind of thing?',
    relatedConceptIds: ['sql', 'database', 'crud', 'index', 'orm', 'request'],
    prerequisiteIds: ['sql'],
    deepDive:
      'Most DBMSs let you prefix a query with EXPLAIN to see the plan — whether it scans every row or uses an index. Apps should use parameterised queries (WHERE id = $1) rather than pasting user input into SQL, which prevents SQL injection attacks.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['a request to the database for data', 'asking the database a question to get information', 'a command to fetch or change rows'],
      partial: ['a question'],
      incorrect: ['the database itself', 'the place where the data lives'],
    },
  },
  {
    id: 'primary-key',
    term: 'Primary key',
    trackId: 'data',
    difficulty: 2,
    definition:
      'A primary key is a column (or set of columns) whose value uniquely identifies each row in a table and can never be empty or duplicated.',
    plainEnglish:
      'Two customers can share a name, but they can’t share an ID. The primary key is that guaranteed-unique identifier — usually a number like 42 or a random ID — so the database (and other tables) can point at exactly one row.',
    analogy:
      'A passport number: many people are called “Maria Garcia”, but only one person has passport X1234567.',
    example:
      'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);\nSELECT name FROM users WHERE id = 42;  -- always returns at most one row\nInserting a second row with id 42 fails with a “duplicate key” error.',
    whyItMatters:
      'Every update, delete and link between tables relies on primary keys. Using something that can change or repeat (like an email or a name) as the identifier causes painful bugs when it does.',
    misconception:
      'Primary key vs foreign key: a primary key identifies rows in its own table (users.id). A foreign key is a column in another table that stores that ID to point back (orders.user_id → users.id).',
    question: 'What is special about a primary key?',
    canonicalAnswer:
      'It uniquely identifies each row in a table — no two rows can share the same value, and it can’t be empty.',
    acceptedAnswers: ['uniquely identifies each row', 'unique id for each record', 'unique identifier'],
    keyIdeas: [
      {
        id: 'unique',
        label: 'unique',
        terms: ['unique', 'uniquely', 'distinct', 'only one', 'one of a kind', 'different for every',
          'different for each', 'its own', 'one per'],
      },
      {
        id: 'identify',
        label: 'identifies each row',
        terms: ['identify', 'identifies', 'identifier', 'id', 'row', 'record', 'entry', 'each', 'every'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['password', 'encrypt', 'points to another table', 'links to another table', 'other table'],
        feedback: 'A primary key isn’t a password or a link to another table (that’s a foreign key). It uniquely identifies rows in its own table.' },
    ],
    hint: 'Two users can have the same name. What can’t they share?',
    relatedConceptIds: ['foreign-key', 'row', 'table', 'index', 'relationship'],
    prerequisiteIds: ['table', 'row'],
    deepDive:
      'Primary keys are commonly auto-incrementing integers (1, 2, 3…) or UUIDs (random 128-bit IDs like 3f2b…). The DBMS automatically indexes the primary key, which is why looking up by ID is so fast.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['it uniquely identifies each row', 'a unique id for every record', 'each row gets its own unique id'],
      partial: ['it has to be unique'],
      incorrect: ['it is the password to the database', 'it links to another table'],
    },
  },
  {
    id: 'foreign-key',
    term: 'Foreign key',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A foreign key is a column in one table that stores the primary key of a row in another table, linking the two and preventing links to rows that don’t exist.',
    plainEnglish:
      'Instead of copying a customer’s details onto every order, the orders table stores just the customer’s ID in a user_id column. That column is a foreign key: it points to a row in the users table, and the database refuses an order for a user who doesn’t exist.',
    analogy:
      'A library loan slip with a member number on it. The slip doesn’t repeat your name and address; it points to your record in the members list.',
    example:
      'CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INTEGER REFERENCES users(id),\n  total_cents INTEGER\n);\nINSERT INTO orders (user_id, total_cents) VALUES (9999, 500);  -- fails if no user 9999',
    whyItMatters:
      'Foreign keys keep data consistent: no orphaned orders, no comments on deleted posts. They’re also how you answer cross-table questions (“total spent per customer”) with a JOIN.',
    misconception:
      'Foreign key vs primary key: the primary key is a row’s own unique ID (users.id). A foreign key is a reference to someone else’s primary key (orders.user_id). A foreign key value can repeat — one user can have many orders.',
    question: 'What does a foreign key do?',
    canonicalAnswer:
      'It links a row in one table to a row in another table by storing that other row’s primary key.',
    acceptedAnswers: ['links two tables', 'points to a row in another table', 'references another table'],
    keyIdeas: [
      {
        id: 'link',
        label: 'links / references',
        terms: ['link', 'links', 'point', 'points', 'reference', 'references', 'connect', 'relate',
          'relationship', 'refer', 'ties', 'join'],
      },
      {
        id: 'other',
        label: 'to another table',
        terms: ['another table', 'other table', 'different table', 'two tables', 'tables', 'primary key',
          'other row', 'another row', 'parent'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['foreign language', 'another country', 'international', 'outside company'],
        feedback: '“Foreign” here just means “belongs to another table” — it links to that table’s primary key.' },
    ],
    hint: 'orders.user_id holds a number. Whose number is it?',
    relatedConceptIds: ['primary-key', 'relationship', 'table', 'schema', 'data-model'],
    prerequisiteIds: ['primary-key'],
    deepDive:
      'Foreign keys can define what happens on delete: ON DELETE CASCADE removes a user’s orders too, ON DELETE RESTRICT blocks deleting a user who still has orders. Some large systems skip database-enforced foreign keys for speed and check in code instead.',
    testAnswers: {
      correct: ['it links to a row in another table', 'connects two tables by referencing the primary key', 'points to another table'],
      partial: ['it links things'],
      incorrect: ['a key for foreign languages', 'a key from another country'],
    },
  },
  {
    id: 'relationship',
    term: 'Relationship',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A relationship is a defined connection between records in different tables — one-to-one, one-to-many or many-to-many — usually implemented with foreign keys.',
    plainEnglish:
      'Real things are connected: a customer has many orders, an order has many products, a product appears in many orders. Relationships describe these connections so the database can store each fact once and still combine them on demand.',
    analogy:
      'A family tree. Each person is listed once, and the lines between them show who is related to whom and how.',
    example:
      'One-to-many: one user → many orders (orders.user_id).\nMany-to-many: orders ↔ products via a join table order_items(order_id, product_id, quantity).\nSELECT u.name, o.id FROM users u JOIN orders o ON o.user_id = u.id;',
    whyItMatters:
      'Getting relationships right early saves pain later. If you assume “one address per customer” and the business needs several, you face a costly migration. Product questions like “can a user belong to multiple teams?” are relationship questions.',
    misconception:
      'Relationships are not stored as lines or pointers between tables. They are just matching values — the same ID in two columns — which the database can join and enforce with foreign keys.',
    question: 'In a database, what does a relationship describe?',
    canonicalAnswer:
      'How records in different tables are connected — for example one user has many orders (one-to-many).',
    acceptedAnswers: ['how tables are connected', 'how records relate to each other', 'connection between tables'],
    keyIdeas: [
      {
        id: 'connection',
        label: 'a connection between records / tables',
        terms: ['connect', 'connected', 'connection', 'link', 'linked', 'relate', 'related', 'association',
          'one to many', 'many to many', 'one to one', 'tied', 'between tables', 'between records'],
      },
    ],
    hint: 'One customer has many ___.',
    relatedConceptIds: ['foreign-key', 'primary-key', 'data-model', 'table', 'schema'],
    prerequisiteIds: ['foreign-key'],
    deepDive:
      'Many-to-many relationships always need a third “join table” (order_items, team_memberships) because one column can only hold one value. That join table often grows its own useful columns, like quantity or role.',
    testAnswers: {
      correct: ['how tables are connected', 'the link between records, like one user to many orders', 'how data in different tables relates'],
      incorrect: ['a dating feature in the app', 'the speed of the database'],
    },
  },
  {
    id: 'crud',
    term: 'CRUD operations',
    trackId: 'data',
    difficulty: 1,
    definition:
      'CRUD stands for Create, Read, Update, Delete — the four basic operations almost every app performs on its stored data.',
    plainEnglish:
      'Strip away the design and most software is CRUD: make a new thing, look at things, change a thing, remove a thing. A notes app, a CRM, a to-do list — each screen maps to one of those four actions on the database.',
    analogy:
      'A contacts book: add a contact, look someone up, change their number, cross them out.',
    example:
      'Create — POST /tasks → INSERT INTO tasks …\nRead — GET /tasks/7 → SELECT * FROM tasks WHERE id = 7\nUpdate — PATCH /tasks/7 → UPDATE tasks SET done = true WHERE id = 7\nDelete — DELETE /tasks/7 → DELETE FROM tasks WHERE id = 7',
    whyItMatters:
      '“It’s just a CRUD app” means the work is mostly standard and predictable. Thinking in CRUD helps scope features: for each kind of data, who can create, read, update and delete it?',
    misconception:
      'CRUD is not a tool or technology — it’s a way of naming the four basic data operations. They map neatly to SQL (INSERT, SELECT, UPDATE, DELETE) and REST methods (POST, GET, PUT/PATCH, DELETE).',
    question: 'What four operations does CRUD stand for?',
    canonicalAnswer: 'Create, Read, Update and Delete.',
    acceptedAnswers: ['create read update delete', 'create read update and delete'],
    keyIdeas: [
      { id: 'create', label: 'Create', terms: ['create', 'add', 'insert', 'make', 'new'] },
      { id: 'read', label: 'Read', terms: ['read', 'retrieve', 'view', 'get', 'fetch', 'select', 'look up'] },
      { id: 'update', label: 'Update', terms: ['update', 'edit', 'change', 'modify'] },
      { id: 'delete', label: 'Delete', terms: ['delete', 'remove', 'destroy', 'erase'] },
    ],
    minKeyIdeas: 4,
    hint: 'Each letter is a verb you could do to a contact in your phone.',
    relatedConceptIds: ['http-method', 'sql', 'rest', 'database', 'query'],
    prerequisiteIds: ['database'],
    deepDive:
      'Permissions are often designed per CRUD action: a viewer can only Read, an editor can Create/Read/Update, and only an admin can Delete. Many apps never truly Delete, instead soft-deleting so data can be restored.',
    challengeId: 'mini-database',
    testAnswers: {
      correct: ['create read update delete', 'add, view, edit and remove', 'create, retrieve, update, delete'],
      partial: ['create and delete'],
      incorrect: ['a kind of programming language', 'cache, render, upload, download'],
    },
  },
  {
    id: 'index',
    term: 'Index',
    trackId: 'data',
    difficulty: 4,
    definition:
      'An index is an extra, sorted data structure a database keeps for one or more columns so it can find matching rows quickly without scanning the whole table.',
    plainEnglish:
      'Without an index, finding users with a certain email means checking every row — fine for 100 rows, painful for 100 million. An index keeps those emails sorted with pointers to their rows, so the database jumps straight to the match. The cost: extra storage, and slightly slower writes because the index must be updated too.',
    analogy:
      'The index at the back of a textbook: instead of reading every page to find “photosynthesis”, you look it up alphabetically and jump to page 212.',
    example:
      'CREATE INDEX idx_users_email ON users (email);\nNow SELECT * FROM users WHERE email = \'ana@example.com\'; goes from scanning 5 million rows (~2 s) to a few lookups (~1 ms).',
    whyItMatters:
      'A missing index is one of the most common causes of a slow app, and adding one is often the cheapest big speedup available. But indexing everything slows down every insert and update.',
    misconception:
      'Index vs table: a table holds the actual data; an index is a separate lookup structure pointing into the table. Deleting an index loses no data — queries just get slower.',
    question: 'What does adding a database index do?',
    canonicalAnswer:
      'It makes lookups on a column much faster, by letting the database find matching rows without scanning the whole table.',
    acceptedAnswers: ['makes queries faster', 'speeds up lookups', 'speeds up searching'],
    keyIdeas: [
      {
        id: 'faster',
        label: 'faster lookups',
        terms: ['faster', 'speed up', 'speeds up', 'quicker', 'quickly', 'fast', 'performance',
          'efficient', 'skip scanning', 'jump straight', 'less time', 'speed', 'find rows quickly'],
      },
    ],
    wrongIdeas: [
      { terms: ['backup', 'back up', 'list of tables'],
        feedback: 'An index doesn’t hold the data or back it up — it’s a sorted lookup structure that makes finding rows faster.' },
    ],
    hint: 'Think of the alphabetical list at the back of a textbook. What does it save you?',
    relatedConceptIds: ['table', 'query', 'primary-key', 'column', 'database'],
    prerequisiteIds: ['table', 'query'],
    deepDive:
      'Most indexes are B-trees, which keep values sorted so lookups take a handful of steps even for billions of rows. A UNIQUE index also enforces uniqueness. Composite indexes on (country, created_at) help queries that filter on country and sort by date — order matters.',
    testAnswers: {
      correct: ['makes queries faster', 'helps the database find rows quickly', 'speeds up searching a column'],
      incorrect: ['makes a backup of the table', 'stores the data'],
    },
  },
  {
    id: 'transaction',
    term: 'Transaction',
    trackId: 'data',
    difficulty: 4,
    definition:
      'A transaction is a group of database operations that succeed or fail together as a single unit, so the data is never left half-changed.',
    plainEnglish:
      'Some changes only make sense together. Moving $100 from Ana to Kofi means subtracting from one account and adding to another; if the server crashes in between, money would vanish. Wrapping both steps in a transaction guarantees all-or-nothing: either both happen, or neither does.',
    analogy:
      'A handshake deal where goods and payment swap at the same moment — if either side backs out, everything goes back to how it was.',
    example:
      'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\nIf anything fails before COMMIT, ROLLBACK undoes both updates.',
    whyItMatters:
      'Transactions are why banks, checkouts and inventory systems can be trusted. Bugs like double-booked seats or negative stock often come from multi-step changes that weren’t in a transaction.',
    misconception:
      'A database transaction isn’t a payment. It’s any group of changes that must succeed or fail together — creating a user and their default settings is a transaction too.',
    question: 'What does a database transaction guarantee?',
    canonicalAnswer:
      'That a group of operations happens all together or not at all — if any step fails, every change is rolled back.',
    acceptedAnswers: ['all or nothing', 'either all changes happen or none', 'all succeed or all fail'],
    keyIdeas: [
      {
        id: 'atomic',
        label: 'all-or-nothing',
        terms: ['all or nothing', 'all or none', 'together', 'single unit', 'one unit', 'atomic',
          'all of them', 'roll back', 'rolled back', 'rollback', 'undo', 'reverted', 'fail together',
          'succeed together', 'every step', 'all the steps', 'all happen'],
      },
    ],
    wrongIdeas: [
      { terms: ['payment', 'buying', 'purchase', 'credit card'],
        feedback: 'A database transaction isn’t a purchase — it’s a group of changes that succeed or fail together.' },
    ],
    hint: 'Moving money between two accounts takes two steps. What must never happen in between?',
    relatedConceptIds: ['database', 'dbms', 'crud', 'rollback', 'postgresql'],
    prerequisiteIds: ['crud', 'sql'],
    deepDive:
      'Transactions provide ACID guarantees: Atomic (all or nothing), Consistent (rules always hold), Isolated (concurrent transactions don’t see each other’s half-done work), Durable (once committed, it survives a crash). Isolation levels trade strictness for speed.',
    testAnswers: {
      correct: ['all or nothing', 'either every step happens or none of them do', 'the changes happen together or get rolled back'],
      incorrect: ['a payment made by a customer', 'it makes the database faster'],
    },
  },
  {
    id: 'migration',
    term: 'Migration',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A migration is a versioned script that changes a database’s schema (or data) in a controlled, repeatable way, such as adding a column or creating a table.',
    plainEnglish:
      'As a product grows, its database structure has to change. Instead of someone editing the production database by hand, engineers write migrations: small numbered files saying “add a phone column to users”. Every environment runs them in order, so all copies of the database end up identical.',
    analogy:
      'Numbered renovation instructions for a house. Every builder follows step 1, 2, 3 in order, so every copy of the house ends up with the same rooms.',
    example:
      'File: 2026_10_09_001_add_phone_to_users.sql\nALTER TABLE users ADD COLUMN phone TEXT;\nRun with a tool like `npx prisma migrate deploy` or `rails db:migrate`; the database records that migration 001 has been applied.',
    whyItMatters:
      'Migrations are where databases most often break in production: a migration that locks a huge table can take a site down. They are reviewed like code, and often run in careful steps (add new column, backfill, then switch code over).',
    misconception:
      'A migration isn’t moving to a different database provider (though that’s also called “migrating”). In everyday engineering it usually means one versioned schema change.',
    question: 'What is a database migration?',
    canonicalAnswer:
      'A versioned script that changes the database’s structure — like adding a column — in a controlled, repeatable way.',
    acceptedAnswers: ['a script that changes the schema', 'versioned database changes', 'changes to the database structure'],
    keyIdeas: [
      {
        id: 'change',
        label: 'changes the schema / structure',
        terms: ['change', 'changes', 'modify', 'alter', 'update', 'add a column', 'add column', 'adding a column',
          'new table', 'create a table', 'evolve'],
      },
      {
        id: 'structure',
        label: 'to the database structure, tracked as a script',
        terms: ['schema', 'structure', 'database', 'tables', 'columns', 'script', 'file', 'version',
          'versioned', 'repeatable', 'step'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['birds', 'animals', 'moving country'],
        feedback: 'Different migration! In databases it means a versioned script that changes the schema.' },
    ],
    hint: 'You need to add a “phone” column to every copy of the database. How do you do it reliably?',
    relatedConceptIds: ['schema', 'database', 'deployment', 'version-control', 'orm', 'rollback'],
    prerequisiteIds: ['schema'],
    deepDive:
      'Migration tools (Prisma, Rails, Alembic, Flyway) keep a table such as schema_migrations listing which scripts have run. Many migrations include a “down” step to reverse them, though reversing a dropped column can’t bring its data back.',
    testAnswers: {
      correct: ['a script that changes the database schema', 'a versioned change to the tables, like adding a column', 'a file that modifies the database structure'],
      partial: ['a change'],
      incorrect: ['when birds fly south', 'a backup copy'],
    },
  },
  {
    id: 'sqlite',
    term: 'SQLite (embedded database)',
    trackId: 'data',
    difficulty: 3,
    definition:
      'SQLite is a small relational database engine that runs inside the application itself and stores the entire database in a single file, with no separate server.',
    plainEnglish:
      'Most databases are separate programs your app connects to over a network. SQLite is different: it’s a library built into the app, and the whole database is one file on disk. It’s in every iPhone, Android phone and web browser — your messages and browser history are probably in SQLite files right now.',
    analogy:
      'A notebook you carry in your bag versus a filing office across town. The notebook is always with you and needs no staff, but only one person writes in it comfortably at a time.',
    example:
      'import Database from "better-sqlite3";\nconst db = new Database("app.db");  // one file\ndb.prepare("SELECT name FROM users WHERE id = ?").get(42);\nNo server to install, no password, no network.',
    whyItMatters:
      'SQLite is perfect for mobile apps, desktop apps, prototypes and small sites — zero setup and very fast for one machine. Knowing when it’s enough (and when you need PostgreSQL) saves cost and complexity.',
    misconception:
      'SQLite vs PostgreSQL: SQLite is embedded in your app and stores everything in one local file — great for one device or modest traffic. PostgreSQL is a separate database server that many app servers and users connect to at once over a network.',
    question: 'What makes SQLite different from databases like PostgreSQL?',
    canonicalAnswer:
      'It runs inside the app itself with no separate server, storing the whole database in a single file.',
    acceptedAnswers: ['single file database', 'embedded in the app', 'database in a file'],
    keyIdeas: [
      {
        id: 'embedded',
        label: 'embedded / serverless, single file',
        terms: ['single file', 'one file', 'file', 'serverless', 'embedded', 'inside the app', 'built into',
          'built in', 'local', 'on the device', 'library', 'lightweight', 'same process', 'runs in the app'],
      },
    ],
    wrongIdeas: [
      { terms: ['nosql', 'document database', 'key value store'],
        feedback: 'SQLite is a full SQL, relational database. What sets it apart is that it’s embedded in the app as a single file, with no server.' },
    ],
    hint: 'Where does a SQLite database physically live, and what’s missing compared to Postgres?',
    relatedConceptIds: ['postgresql', 'dbms', 'database', 'sql', 'server'],
    prerequisiteIds: ['dbms', 'sql'],
    deepDive:
      'SQLite handles many readers but one writer at a time, which limits busy multi-user websites. Newer tools (Litestream, Turso, Cloudflare D1) replicate SQLite files to the cloud, stretching it further into web apps.',
    testAnswers: {
      correct: ['it is just one file and needs no server', 'it is embedded inside the app', 'the database lives in a local file, no separate server'],
      incorrect: ['it is a NoSQL database', 'it only works in the cloud'],
    },
  },
  {
    id: 'postgresql',
    term: 'PostgreSQL',
    trackId: 'data',
    difficulty: 3,
    definition:
      'PostgreSQL (“Postgres”) is a powerful, free and open-source relational database server widely used as the main database for web applications.',
    plainEnglish:
      'Postgres is a database program that runs as its own server; your app connects to it over the network and sends SQL. It’s known for reliability, strict data rules and lots of features — JSON columns, full-text search, even vector search for AI — and costs nothing to use.',
    analogy:
      'A professional records office with staff, locks and many service windows: lots of people can file and look things up at once, safely.',
    example:
      'Connection string: postgres://app:secret@db.example.com:5432/shop\nSELECT name FROM users WHERE id = 42;\nHosted by Supabase, Neon, AWS RDS, Google Cloud SQL and others.',
    whyItMatters:
      'Postgres is one of the most popular databases in the world and a safe default for new products. Many hosted platforms (Supabase, Neon) are Postgres underneath, so learning it pays off widely.',
    misconception:
      'PostgreSQL vs SQLite: Postgres is a separate server many clients connect to concurrently over a network; SQLite is a library inside one app storing data in a local file. And Postgres is not owned by a company — it’s community-run open source.',
    question: 'What kind of software is PostgreSQL?',
    canonicalAnswer:
      'A relational database server — open-source software that stores data in tables and answers SQL queries from apps that connect to it.',
    acceptedAnswers: ['a relational database', 'an open source database', 'a sql database'],
    keyIdeas: [
      {
        id: 'db',
        label: 'a (relational/SQL) database',
        terms: ['database', 'dbms', 'relational', 'sql', 'data store', 'stores data', 'db'],
      },
    ],
    wrongIdeas: [
      { terms: ['programming language', 'web browser', 'nosql', 'email'],
        feedback: 'PostgreSQL is a relational (SQL) database server — not a language, browser or NoSQL store.' },
    ],
    hint: 'The name ends in “SQL” for a reason.',
    relatedConceptIds: ['sqlite', 'dbms', 'sql', 'database', 'vector-database', 'nosql'],
    prerequisiteIds: ['dbms', 'sql'],
    deepDive:
      'Postgres uses MVCC so readers never block writers, supports transactions with strict ACID guarantees, and is extensible: PostGIS adds maps and geography, pgvector adds embeddings for AI search. It began at UC Berkeley in the 1980s.',
    testAnswers: {
      correct: ['a relational database', 'an open source SQL database server', 'database software'],
      incorrect: ['a programming language', 'a NoSQL document store'],
    },
  },
  {
    id: 'nosql',
    term: 'NoSQL database',
    trackId: 'data',
    difficulty: 3,
    definition:
      'NoSQL is a family of databases that store data in forms other than relational tables — such as documents, key-value pairs or graphs — usually with a more flexible structure.',
    plainEnglish:
      'Relational databases put everything into strict tables. NoSQL databases take other shapes: MongoDB stores JSON-like documents, Redis stores simple key → value pairs, Neo4j stores networks of connected nodes. They trade some of SQL’s structure and joins for flexibility or speed at huge scale.',
    analogy:
      'A relational database is a set of strict spreadsheets; a document database is a filing cabinet of folders where each folder can hold whatever papers it needs.',
    example:
      'MongoDB document:\n{ "_id": "u42", "name": "Ana", "addresses": [{ "city": "Lima" }, { "city": "Quito" }] }\nQuery: db.users.find({ "addresses.city": "Lima" })\nRedis: SET session:abc123 "user42" EX 3600',
    whyItMatters:
      'Choosing between SQL and NoSQL shapes what’s easy later. NoSQL suits fast-changing or massively scaled data; relational databases suit data with lots of relationships and strict consistency, like billing.',
    misconception:
      'SQL vs NoSQL: NoSQL doesn’t mean “no structure” or “better/faster”. It means “not only relational tables”. Data still has a shape — you’re just enforcing it in your code — and many NoSQL databases now support SQL-like queries.',
    question: 'How does a NoSQL database differ from a relational (SQL) database?',
    canonicalAnswer:
      'It stores data in formats other than tables with rows and columns — like documents or key-value pairs — usually with a more flexible structure.',
    acceptedAnswers: ['stores documents instead of tables', 'uses documents instead of tables', 'non relational database'],
    keyIdeas: [
      {
        id: 'nontabular',
        label: 'not tables — documents, key-value, etc.',
        terms: ['document', 'documents', 'key value', 'key-value', 'graph', 'json',
          'instead of tables', 'other than tables', 'non relational', 'non-relational',
          'flexible', 'schemaless', 'graphs', 'collections', 'mongodb', 'redis'],
      },
    ],
    wrongIdeas: [
      { terms: ['always faster', 'random data', 'unorganized', 'messy data'],
        feedback: 'NoSQL databases still store structured data — they just use documents, key-value pairs or graphs instead of relational tables.' },
    ],
    hint: 'Think MongoDB storing JSON documents. What’s missing compared to Postgres?',
    relatedConceptIds: ['sql', 'database', 'json', 'postgresql', 'schema', 'cache'],
    prerequisiteIds: ['database', 'sql'],
    deepDive:
      'Main families: document (MongoDB, Firestore), key-value (Redis, DynamoDB), wide-column (Cassandra) and graph (Neo4j). Many give up joins and multi-record transactions to spread data across many machines easily. Meanwhile, Postgres’s JSON columns blur the line.',
    testAnswers: {
      correct: ['it stores documents instead of tables', 'not relational, more flexible like json', 'uses key value pairs rather than rows and columns'],
      incorrect: ['it stores no data', 'it is always faster than SQL'],
    },
  },
  {
    id: 'cache',
    term: 'Cache (caching)',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A cache is a fast, temporary store that keeps copies of frequently used data so future requests can be answered without redoing slow work.',
    plainEnglish:
      'Fetching from a database or calling a slow API takes time. A cache keeps a recent copy close at hand — in memory, in the browser, at a CDN — so the next request is nearly instant. The trade-off: the copy can go stale, so caches expire or get cleared.',
    analogy:
      'Keeping your most-used spices on the counter instead of walking to the pantry each time. Faster, but someone has to restock when the pantry changes.',
    example:
      'Without cache: product page → database query (80 ms).\nWith Redis: GET product:88 → hit (1 ms). On a miss, query the database, then SET product:88 <json> EX 300 (expires in 5 minutes).\nBrowsers cache too: Cache-Control: max-age=86400.',
    whyItMatters:
      'Caching is often the biggest single speed and cost win in a system. It also causes classic bugs: “I updated the price but customers still see the old one” is usually a stale cache.',
    misconception:
      'Cache vs database: a database is the source of truth and keeps data permanently. A cache holds temporary copies for speed and can be wiped at any time without losing anything important.',
    question: 'Why do systems use a cache?',
    canonicalAnswer:
      'To make things faster by keeping copies of frequently used data in a quick, temporary store instead of fetching or computing it again.',
    acceptedAnswers: ['to speed things up', 'store copies for faster access', 'make loading faster'],
    keyIdeas: [
      {
        id: 'speed',
        label: 'speed / avoiding repeated work',
        terms: ['faster', 'speed', 'quick', 'quicker', 'fast', 'performance', 'less load', 'reduce load',
          'avoid', 'instead of fetching', 'save time', 'reuse', 'again'],
      },
      {
        id: 'copy',
        label: 'temporary copies of data',
        terms: ['copy', 'copies', 'temporary', 'store', 'stored', 'keep', 'save', 'saved', 'memory',
          'recent', 'frequently', 'commonly', 'often used', 'data'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      { terms: ['permanent', 'source of truth', 'backup', 'long term storage'],
        feedback: 'A cache isn’t permanent storage or a backup — it holds temporary copies so things load faster.' },
      { terms: ['money', 'cash'],
        feedback: 'Cache (pronounced “cash”) is about speed, not money: a fast store of temporary copies.' },
    ],
    hint: 'Spices on the counter vs in the pantry. What do you gain?',
    relatedConceptIds: ['database', 'cdn', 'latency', 'headers', 'http-get', 'nosql'],
    prerequisiteIds: ['database', 'latency'],
    deepDive:
      '“There are only two hard things in computer science: cache invalidation and naming things.” Strategies include time-based expiry (TTL), clearing on write, and stale-while-revalidate. Caches live at every layer: CPU, browser, CDN, app memory, Redis.',
    testAnswers: {
      correct: ['to make things faster', 'keep copies of data so you dont have to fetch it again', 'store frequently used stuff in memory for speed'],
      incorrect: ['permanent long term storage', 'a backup in case the database dies'],
    },
  },
  {
    id: 'data-model',
    term: 'Data model',
    trackId: 'data',
    difficulty: 3,
    definition:
      'A data model is a description of the kinds of things a system stores, their attributes, and how they relate to each other.',
    plainEnglish:
      'Before building, a team decides what “things” the product is about — users, workspaces, projects, tasks — what facts to keep about each, and how they connect. That map is the data model. The database schema is one concrete implementation of it.',
    analogy:
      'The cast list and family tree for a novel: who exists, what each is like, and how they’re connected — before any scenes are written.',
    example:
      'A task app’s data model:\nUser (id, name, email)\nWorkspace (id, name) — has many Projects\nProject (id, workspace_id, title) — has many Tasks\nTask (id, project_id, assignee_id → User, done)\nUser ↔ Workspace: many-to-many via Membership (role)',
    whyItMatters:
      'The data model is the skeleton of a product. It decides what features are easy (“tasks can have one assignee”) and which require a rebuild (“tasks can have many assignees”). Product and engineering should agree on it early.',
    misconception:
      'Data model vs schema: the data model is the conceptual design (entities and relationships), and can be drawn on a whiteboard. The schema is the exact database definition (tables, column types, constraints) that implements it.',
    question: 'What does a data model describe?',
    canonicalAnswer:
      'The kinds of things a system stores, what information is kept about each, and how they relate to one another.',
    acceptedAnswers: ['what data exists and how it relates', 'the entities and relationships', 'how data is structured and connected'],
    keyIdeas: [
      {
        id: 'entities',
        label: 'the kinds of things / entities and attributes',
        terms: ['entities', 'entity', 'objects', 'kinds of data', 'types of data', 'what data',
          'structure', 'attributes', 'fields', 'information', 'stored', 'stores', 'organized'],
      },
      {
        id: 'relations',
        label: 'how they relate',
        terms: ['relate', 'relates', 'relationships', 'relationship', 'connected', 'connect', 'connections',
          'link', 'linked', 'associations', 'fit together'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['ai model', 'machine learning', 'trained', 'fashion'],
        feedback: 'A data model isn’t an AI or machine-learning model — it’s a map of what data a system stores and how it connects.' },
    ],
    hint: 'Users, projects, tasks… and the lines between them.',
    relatedConceptIds: ['schema', 'relationship', 'table', 'orm', 'object', 'foreign-key'],
    prerequisiteIds: ['table', 'relationship'],
    deepDive:
      'Data models are often drawn as entity–relationship (ER) diagrams. They come in levels: conceptual (business terms), logical (attributes and keys) and physical (actual tables, types and indexes in one DBMS).',
    testAnswers: {
      correct: ['what things the system stores and how they relate', 'the entities and the relationships between them', 'how data is structured and connected'],
      partial: ['what kinds of data you store'],
      incorrect: ['a trained machine learning model', 'a fashion model for the app'],
    },
  },
  {
    id: 'orm',
    term: 'ORM (Object-Relational Mapper)',
    trackId: 'data',
    difficulty: 4,
    definition:
      'An ORM is a library that lets programmers read and write database rows as ordinary objects in their programming language, generating the SQL for them.',
    plainEnglish:
      'Databases speak SQL and store tables; application code works with objects. An ORM translates between the two: you write user = User.find(42) or prisma.user.findUnique(…) and it writes and runs the SQL, handing back a normal object.',
    analogy:
      'A translator at a meeting: each side speaks its own language, and the translator turns one into the other so nobody has to learn both.',
    example:
      'With Prisma (JavaScript):\nconst user = await prisma.user.findUnique({ where: { id: 42 } });\nUnder the hood it runs:\nSELECT "id", "name", "email" FROM "User" WHERE "id" = 42 LIMIT 1;\nOther ORMs: Django ORM, ActiveRecord (Rails), SQLAlchemy, Drizzle.',
    whyItMatters:
      'ORMs speed up everyday development and protect against SQL injection by default. But they can hide expensive queries — the infamous “N+1 problem” where loading 100 posts quietly fires 101 queries.',
    misconception:
      'An ORM is not a database and doesn’t replace SQL — it generates SQL for a real database underneath. When performance matters, engineers still read and sometimes hand-write the SQL.',
    question: 'What does an ORM let developers do?',
    canonicalAnswer:
      'Work with database rows as objects in their programming language, with the ORM generating the SQL for them.',
    acceptedAnswers: ['use objects instead of writing sql', 'query the database with code instead of sql', 'map tables to objects'],
    keyIdeas: [
      {
        id: 'objects',
        label: 'work with objects / their language',
        terms: ['object', 'objects', 'classes', 'code', 'programming language', 'javascript', 'python',
          'their language', 'map', 'maps', 'mapping', 'translate'],
      },
      {
        id: 'nosql',
        label: 'without hand-writing SQL',
        terms: ['instead of sql', 'instead of writing sql', 'generates sql', 'generating the sql',
          'writes the sql', 'writes sql', 'sql for you', 'database', 'tables', 'rows'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      { terms: ['type of database', 'kind of database', 'stores the data', 'replaces the database'],
        feedback: 'An ORM isn’t a database — it’s a library that turns code objects into SQL for a real database.' },
    ],
    hint: 'Objects on one side, tables on the other. What sits in between?',
    relatedConceptIds: ['sql', 'object', 'library', 'query', 'data-model', 'migration'],
    prerequisiteIds: ['sql', 'object', 'library'],
    deepDive:
      'Many ORMs also define the schema in code and generate migrations from it. Query builders (Knex, Kysely) sit between raw SQL and full ORMs: you write SQL-shaped code without the object mapping.',
    testAnswers: {
      correct: ['use objects in code instead of writing sql', 'it maps database tables to objects', 'lets you query the database in python without writing sql'],
      partial: ['work with objects'],
      incorrect: ['it is a type of database', 'it stores the data'],
    },
  },
];

export default concepts;
