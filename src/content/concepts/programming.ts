import type { Concept } from '../types';

const concepts: Concept[] = [
  // ───────────────────────────────────────────── source-code
  {
    id: 'source-code',
    term: 'Source code',
    trackId: 'programming',
    difficulty: 1,
    definition:
      'Source code is the human-readable text, written in a programming language, that spells out the instructions a program will follow.',
    plainEnglish:
      'Every app you use started as files full of text that people typed. That text is the source code: precise instructions like “when the button is clicked, add one to the counter.” Tools then turn it into something the computer can actually run.',
    analogy:
      'Sheet music. It is written for people to read and edit, but its whole purpose is to tell a performer exactly what to play.',
    example:
      'A file called counter.js containing `let count = 0; function addOne() { count = count + 1; }` is source code. A developer can open it, read it, and change `+ 1` to `+ 2`.',
    whyItMatters:
      'When someone says “the code”, “the repo” or “open source”, they mean these text files. Owning the source code means you can change how the product behaves; without it you can only use the finished app.',
    misconception:
      'Source code is not the same as the program a user downloads. Browsers read JavaScript source more or less directly, but many languages are first compiled into machine code — ones and zeros people can’t comfortably read or edit.',
    question: 'What is source code?',
    canonicalAnswer:
      'The human-readable text that programmers write, containing the instructions that tell a computer what to do.',
    acceptedAnswers: ['instructions programmers write', 'code developers write', 'code people write'],
    keyIdeas: [
      {
        id: 'written-text',
        label: 'text written by people',
        terms: ['text', 'written', 'write', 'human readable', 'readable', 'typed', 'type out',
          'programmers', 'developers', 'people', 'files', 'authored'],
      },
      {
        id: 'instructions',
        label: 'instructions for the computer',
        terms: ['instruction', 'command', 'tells the computer', 'tell computer', 'steps', 'directions',
          'what to do', 'recipe', 'rules', 'program', 'logic', 'how app works'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['ones and zeros', 'zeros and ones', 'binary code'],
        feedback:
          'That describes machine code — what source code is often turned into. Source code is the readable text people write.',
      },
    ],
    hint: 'Think about what developers actually type into their editor all day — and what it is for.',
    relatedConceptIds: ['programming-language', 'syntax', 'compiler', 'repository', 'version-control', 'build'],
    prerequisiteIds: [],
    deepDive:
      'Source code is usually stored in a Git repository so every change is tracked. A compiler or interpreter (part of the runtime) translates it into machine instructions. “Open source” means the source code is published and others may read, modify and reuse it under a licence.',
    testAnswers: {
      correct: [
        'the text programmers write that tells the computer what to do',
        'the instructions developers type out for a program',
        'human readable code with the commands for the computer',
      ],
      partial: ['the files that developers write'],
      incorrect: ['the ones and zeros the computer runs', 'the design of the website'],
    },
  },

  // ───────────────────────────────────────────── programming-language
  {
    id: 'programming-language',
    term: 'Programming language',
    trackId: 'programming',
    difficulty: 1,
    definition:
      'A programming language is a formal vocabulary and set of grammar rules for writing instructions precisely enough that a computer can carry them out.',
    plainEnglish:
      'Computers can’t understand everyday English, which is vague. A programming language is a strict, unambiguous way of writing instructions that software tools can translate into actions. JavaScript, Python, Java and Swift are all programming languages.',
    analogy:
      'Like legal language or musical notation: a specialised way of writing where every symbol has one exact meaning, so there is no room for interpretation.',
    example:
      'The same idea in two languages — JavaScript: `if (age >= 18) { console.log("Welcome"); }`; Python: `if age >= 18: print("Welcome")`. Different grammar, same instruction.',
    whyItMatters:
      'Choosing a language shapes who you can hire, what tools you get and where the code can run. JavaScript runs in every browser; Swift is for Apple apps; Python dominates data and AI work.',
    misconception:
      'A language is not a framework. JavaScript is the language; React is a framework written in JavaScript. A framework is a big kit of pre-written code in a language, not a new language. (HTML and CSS are also not programming languages — they describe content and styling, not step-by-step logic.)',
    question: 'What is a programming language for?',
    canonicalAnswer:
      'It is a precise, rule-based way for people to write instructions that a computer can understand and carry out.',
    acceptedAnswers: ['give instructions to a computer', 'tell a computer what to do', 'talk to computers'],
    keyIdeas: [
      {
        id: 'instructions',
        label: 'writing instructions for a computer',
        terms: ['instruction', 'tell the computer', 'tell computers', 'tells computer', 'command',
          'communicate with', 'talk to computer', 'write code', 'write programs', 'writing software',
          'build software', 'build apps', 'what to do'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['framework', 'react', 'library'],
        feedback:
          'That is a framework or library — pre-written code built in a language. The language itself is the vocabulary and grammar you write in.',
      },
    ],
    hint: 'English is too vague for a computer. What do we need instead, and what do we write with it?',
    relatedConceptIds: ['source-code', 'syntax', 'javascript', 'compiler', 'runtime', 'framework', 'library'],
    prerequisiteIds: ['source-code'],
    deepDive:
      'Some languages are compiled ahead of time into machine code (C, Rust, Swift); others are run by an interpreter or just-in-time compiler inside a runtime (JavaScript in a browser or Node.js, Python). Languages also differ in typing: TypeScript checks data types before running, plain JavaScript checks them as it runs.',
    testAnswers: {
      correct: [
        'a way to tell a computer what to do',
        'writing instructions computers can follow',
        "it's how we write programs",
      ],
      incorrect: ['a framework like React', 'a kind of database'],
    },
  },

  // ───────────────────────────────────────────── syntax
  {
    id: 'syntax',
    term: 'Syntax',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'Syntax is the set of grammar rules that dictates exactly how code in a given language must be spelled, punctuated and arranged.',
    plainEnglish:
      'Every programming language has strict rules about where brackets go, which words are reserved and how lines end. Break one and the computer refuses to run the code at all. It is grammar, but enforced with zero tolerance.',
    analogy:
      'Like the format of a postal address: name, street, city, postcode in a set order. Scramble the order and the mail doesn’t arrive, even if every piece of information is there.',
    example:
      '`console.log("hi")` is valid JavaScript. `console.log("hi"` (missing the closing bracket) causes “SyntaxError: missing ) after argument list” before a single line runs.',
    whyItMatters:
      'Syntax errors are the most common beginner mistakes and the easiest to fix — the error message usually points to the exact line. Code editors highlight syntax as you type so problems show up immediately.',
    misconception:
      'Correct syntax doesn’t mean correct code. `let total = price - tax;` is perfectly valid syntax but wrong logic if you meant to add tax. Syntax is form; what the code means and does is a separate question (semantics).',
    question: 'What is syntax in programming?',
    canonicalAnswer:
      'The grammar rules of a language — how code must be spelled, punctuated and structured so the computer accepts it.',
    acceptedAnswers: ['grammar of a programming language', 'grammar of code', 'rules for writing code'],
    keyIdeas: [
      {
        id: 'rules',
        label: 'the grammar rules for writing code',
        terms: ['rules', 'grammar', 'spelling', 'punctuation', 'structure', 'structured', 'format',
          'correct way to write', 'how code is written', 'symbols', 'brackets', 'arrangement',
          'order of words'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['meaning', 'semantics', 'logic'],
        feedback:
          'That is closer to semantics — what code means and does. Syntax is only about the form: spelling, punctuation and structure.',
      },
    ],
    hint: 'Every human language has these too — they decide whether a sentence is “well formed”.',
    relatedConceptIds: ['programming-language', 'source-code', 'error', 'debugging', 'compiler'],
    prerequisiteIds: ['programming-language'],
    deepDive:
      'Before running code, the language engine parses it — breaking the text into tokens and checking it against the grammar. If parsing fails you get a SyntaxError and nothing runs. Tools like Prettier (formatting) and ESLint (style and suspicious patterns) go further than the language’s own syntax rules.',
    testAnswers: {
      correct: [
        'the grammar rules of a programming language',
        'how you have to write code, like where brackets go',
        'the structure and punctuation rules for code',
      ],
      incorrect: ['what the code means', 'the logic of the program'],
    },
  },

  // ───────────────────────────────────────────── variable
  {
    id: 'variable',
    term: 'Variable (let)',
    trackId: 'programming',
    difficulty: 1,
    definition:
      'A variable is a name that refers to a stored value, so the program can read that value later and replace it with a new one.',
    plainEnglish:
      'Programs need to remember things: a score, a username, items in a cart. A variable gives a piece of data a name so the code can refer to it. Because it is variable, the value can be updated as the program runs.',
    analogy:
      'A labelled jar in a kitchen. The label (“sugar”) stays the same, but you can empty it and refill it with a different amount whenever you like.',
    example:
      '`let score = 0;` creates a variable named score holding 0. Later, `score = score + 10;` updates it to 10. Anywhere the code says `score`, it means “whatever is in the jar right now”.',
    whyItMatters:
      'Almost every line of code reads or changes a variable. Good variable names (`cartTotal` rather than `x`) make code readable, which is a big part of what makes software maintainable.',
    misconception:
      'A variable is not the value itself — it is the name pointing at it. And variables differ from constants: in JavaScript `let` declares a variable you can reassign, while `const` declares a constant whose binding can’t be reassigned.',
    question: 'What is a variable?',
    canonicalAnswer: 'A named container that stores a value the program can read and change later.',
    acceptedAnswers: ['named container', 'named box', 'named storage', 'name for a value'],
    keyIdeas: [
      {
        id: 'name',
        label: 'a name or label',
        terms: ['name', 'named', 'label', 'labeled', 'labelled', 'identifier', 'tag', 'called', 'refer to'],
      },
      {
        id: 'stores',
        label: 'storing a value',
        terms: ['store', 'hold', 'keep', 'contain', 'container', 'value', 'data', 'information',
          'remember', 'save', 'box', 'jar'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['fixed value', 'stays the same', 'permanent'],
        feedback:
          'That describes a constant. A variable’s value can be replaced as the program runs.',
      },
    ],
    hint: 'Think of a labelled jar. What are the two parts — and what goes inside?',
    relatedConceptIds: ['constant', 'data-type', 'scope', 'state', 'number', 'string'],
    prerequisiteIds: ['source-code'],
    deepDive:
      'JavaScript has three keywords: `let` (reassignable, block-scoped), `const` (not reassignable, block-scoped) and the older `var` (function-scoped, with surprising behaviour). Modern style uses `const` by default and `let` only when the value must change.',
    challengeId: 'score-tracker',
    testAnswers: {
      correct: [
        'a named box that holds a value',
        'a label for some data you store',
        'a name that points to information the program remembers',
      ],
      partial: ['something that holds data'],
      incorrect: ['a fixed value that stays the same', 'a type of loop'],
    },
  },

  // ───────────────────────────────────────────── constant
  {
    id: 'constant',
    term: 'Constant (const)',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'A constant is a named value that is assigned once and cannot be reassigned for the rest of the program.',
    plainEnglish:
      'Some values should never change while the program runs: a tax rate, the maximum number of login attempts, an API address. Declaring them as constants means the language itself stops anyone from accidentally overwriting them.',
    analogy:
      'A name engraved on a trophy rather than written on a whiteboard — once it’s set, it stays.',
    example:
      '`const MAX_ATTEMPTS = 3;` Later, `MAX_ATTEMPTS = 5;` throws “TypeError: Assignment to constant variable.” Compare `let attempts = 0;` which can go up as the user retries.',
    whyItMatters:
      'Constants make code safer and easier to read: you know at a glance that a value won’t change underneath you. Many teams use `const` for nearly everything and reach for `let` only when they truly need change.',
    misconception:
      'Variable vs constant: a variable (`let`) can be pointed at a new value; a constant (`const`) can’t. But in JavaScript `const` locks the name, not the contents — `const cart = []; cart.push("apple");` is allowed, because the same array is being modified, not replaced.',
    question: 'What makes a constant different from a variable?',
    canonicalAnswer:
      'A constant is fixed: it is assigned once and stays the same, whereas a variable can be given a new value later.',
    acceptedAnswers: ['assigned once', 'set once', 'value is fixed'],
    keyIdeas: [
      {
        id: 'fixed',
        label: 'its value stays fixed',
        terms: ['fixed', 'stays the same', 'stay the same', 'remains the same', 'same value', 'permanent',
          'unchangeable', 'locked', 'read only', 'set once', 'assigned once', 'forever', 'immutable',
          'final', 'set in stone'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['changeable', 'change later', 'changed later', 'updated', 'changes over time',
          'change over time', 'reassigned later'],
        feedback:
          'That describes a variable. A constant is set once and keeps that value.',
      },
    ],
    hint: 'The word itself is a clue — think “constant temperature”.',
    relatedConceptIds: ['variable', 'scope', 'configuration', 'environment-variable', 'data-type'],
    prerequisiteIds: ['variable'],
    deepDive:
      'By convention, true “magic numbers” and settings are written in SCREAMING_SNAKE_CASE (`const TAX_RATE = 0.2;`). Values that change between environments — like API keys — usually come from environment variables or configuration instead of being hard-coded constants.',
    challengeId: 'score-tracker',
    testAnswers: {
      correct: [
        "it's fixed, you can't change it",
        'the value stays the same once you set it',
        'set once and locked',
      ],
      incorrect: ['it can be updated whenever you want', 'a constant is a kind of loop'],
    },
  },

  // ───────────────────────────────────────────── data-type
  {
    id: 'data-type',
    term: 'Data type',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'A data type is the category a value belongs to — such as text, number, true/false or list — which determines how it is stored and what operations work on it.',
    plainEnglish:
      'Computers treat different kinds of data differently. You can multiply numbers but not names; you can make text uppercase but not a number. The data type tells the program which kind of value it is holding, and therefore what makes sense to do with it.',
    analogy:
      'Containers in a kitchen: you pour liquids, slice solids, and weigh flour. Knowing what kind of ingredient you have tells you which tools apply.',
    example:
      'In JavaScript, `typeof 42` is "number", `typeof "42"` is "string", `typeof true` is "boolean", and `typeof [1, 2]` is "object" (arrays are a kind of object). `"42" * 2` gives 84 but `"42" + 2` gives "422".',
    whyItMatters:
      'Many real bugs are type mix-ups: a price read from a form arrives as text, so adding to it glues digits together instead of doing math. Languages like TypeScript exist largely to catch these mistakes before users do.',
    misconception:
      'A data type is not a file type (like .jpg or .pdf). It describes a single value inside a program — the number 5, the string "5", the boolean true.',
    question: 'What does a value’s data type tell the program?',
    canonicalAnswer:
      'What kind of value it is — text, number, true/false, list — and therefore what operations make sense on it.',
    acceptedAnswers: ['what kind of data', 'what kind of value', 'what sort of data'],
    keyIdeas: [
      {
        id: 'kind',
        label: 'what kind of value it is',
        terms: ['kind', 'category', 'sort of', 'type of value', 'type of data', 'text or number',
          'number or text', 'whether text', 'whether number', 'classification', 'form of data'],
      },
      {
        id: 'operations',
        label: 'what you can do with it',
        terms: ['operations', 'treat', 'handle', 'behave', 'allowed', 'math', 'stored', 'possible actions',
          'works on'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['file type', 'file format', 'jpg', 'pdf'],
        feedback:
          'That is a file type. A data type describes a single value inside a program, like a number or a piece of text.',
      },
    ],
    hint: 'Is it text? A number? A yes/no? That question has a name.',
    relatedConceptIds: ['string', 'number', 'boolean', 'array', 'object', 'variable', 'schema'],
    prerequisiteIds: ['variable'],
    deepDive:
      'JavaScript’s primitive types are string, number, bigint, boolean, undefined, null and symbol; everything else (arrays, functions, dates) is an object. JavaScript is dynamically typed — a variable can hold a number now and a string later — which is flexible but lets type bugs slip through. TypeScript adds static types checked before the code runs.',
    testAnswers: {
      correct: [
        'what kind of data it is, like text or a number',
        'whether its a number or text and how to handle it',
        'the category of the value',
      ],
      incorrect: ['whether the file is a jpg or pdf', 'how fast the program runs'],
    },
  },

  // ───────────────────────────────────────────── string
  {
    id: 'string',
    term: 'String (text)',
    trackId: 'programming',
    difficulty: 1,
    definition:
      'A string is a data type for text: an ordered sequence of characters, written in code between quotation marks.',
    plainEnglish:
      'Names, email addresses, messages, even a phone number — whenever a program handles text, it is working with strings. The quotes tell the computer “treat this as text, not as code or as a number”.',
    analogy:
      'Beads on a string: individual characters threaded together in a fixed order. That is literally where the name comes from.',
    example:
      '`let greeting = "Hello, " + "Ada";` produces "Hello, Ada". `greeting.length` is 10, and `greeting.toUpperCase()` gives "HELLO, ADA".',
    whyItMatters:
      'Most of what users type arrives as strings — form fields, search boxes, URLs. Knowing that "5" in a form is text, not a number, explains a whole family of bugs.',
    misconception:
      'The string "5" is not the number 5. In JavaScript `"5" + 5` gives "55" (text glued together), while `5 + 5` gives 10. Digits inside quotes are just characters.',
    question: 'What kind of data does a string hold?',
    canonicalAnswer: 'Text — a sequence of characters such as letters, digits and symbols, written in quotes.',
    acceptedAnswers: ['text', 'sequence of characters'],
    keyIdeas: [
      {
        id: 'text',
        label: 'text / characters',
        terms: ['text', 'characters', 'letters', 'words', 'sentence', 'quotes', 'chars', 'textual',
          'writing', 'message'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['true or false', 'list of items', 'array', 'only numbers'],
        feedback:
          'Not quite — a string holds text. True/false is a boolean, and a list of items is an array.',
      },
    ],
    hint: 'Think of what you type into a name field. What kind of data is that?',
    relatedConceptIds: ['data-type', 'number', 'json', 'variable', 'form-validation', 'input-sanitization'],
    prerequisiteIds: ['data-type'],
    deepDive:
      'JavaScript accepts single quotes, double quotes, or backticks. Backticks create template literals that can embed values: `Hello, ${name}!`. Strings are immutable — methods like `.toUpperCase()` return a new string rather than changing the original.',
    testAnswers: {
      correct: ['text', 'letters and characters, like a name', 'words in quotes'],
      incorrect: ['true or false', 'a list of items'],
    },
  },

  // ───────────────────────────────────────────── number
  {
    id: 'number',
    term: 'Number',
    trackId: 'programming',
    difficulty: 1,
    definition:
      'A number is a data type for numeric values — integers and decimals — that a program can do arithmetic and comparisons with.',
    plainEnglish:
      'Prices, quantities, scores, coordinates: when you need to add, subtract, compare or count, you use numbers. Written without quotes, they are values the computer can calculate with.',
    analogy:
      'The difference between a calculator display and a label printer: both show “42”, but only the calculator can do math with it.',
    example:
      '`let price = 19.99; let qty = 3; let total = price * qty;` gives 59.97. Compare `"19.99" * 3` — JavaScript converts it here, but `"19.99" + 3` gives "19.993".',
    whyItMatters:
      'Getting numbers right is serious business: money, measurements and limits all depend on it. Many shops store money as whole cents (`1999`) because decimal math in computers can produce tiny rounding errors.',
    misconception:
      'The number 5 and the string "5" look the same on screen but behave differently: `5 + 5` is 10, `"5" + 5` is "55". Also, not everything made of digits is a number — phone numbers and zip codes are stored as strings because you never do math on them and leading zeros matter.',
    question: 'What is the number data type for?',
    canonicalAnswer:
      'Numeric values like 42 or 3.14 that the program can do math with — adding, comparing, counting.',
    acceptedAnswers: ['doing math', 'values you can do math with', 'calculations'],
    keyIdeas: [
      {
        id: 'math',
        label: 'values you can do math with',
        terms: ['math', 'arithmetic', 'calculate', 'calculation', 'add', 'subtract', 'multiply',
          'counting', 'count', 'quantities', 'amounts', 'compare', 'compute', 'measure'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['phone number', 'zip code', 'postal code'],
        feedback:
          'Careful — phone numbers and zip codes are usually stored as strings, because you never do math on them.',
      },
    ],
    hint: 'What can you do with 19.99 and 3 that you can’t do with “Ada” and “Lovelace”?',
    relatedConceptIds: ['data-type', 'string', 'boolean', 'variable'],
    prerequisiteIds: ['data-type'],
    deepDive:
      'JavaScript has a single `number` type for both integers and decimals (64-bit floating point), which is why `0.1 + 0.2` gives 0.30000000000000004. For very large integers there is `bigint` (`9007199254740993n`). Converting text to numbers uses `Number("42")` or `parseInt("42", 10)`; a failed conversion gives `NaN` (“not a number”).',
    challengeId: 'score-tracker',
    testAnswers: {
      correct: ['for doing math', 'numeric values you can calculate with', 'counting and adding stuff'],
      incorrect: ['storing phone numbers', 'storing text like names'],
    },
  },

  // ───────────────────────────────────────────── boolean
  {
    id: 'boolean',
    term: 'Boolean (true/false)',
    trackId: 'programming',
    difficulty: 1,
    definition:
      'A boolean is a data type with exactly two possible values, true and false, used to represent yes/no facts and the results of comparisons.',
    plainEnglish:
      'Is the user logged in? Is the cart empty? Has the email been verified? Each of these is a yes/no question, and booleans are how code stores the answer. Every comparison, like `age >= 18`, produces a boolean.',
    analogy: 'A light switch: on or off, nothing in between.',
    example:
      '`let isLoggedIn = false;` After login, `isLoggedIn = true;`. Comparisons produce booleans too: `5 > 3` is true, `"a" === "b"` is false.',
    whyItMatters:
      'Booleans drive every decision in software — show the admin menu or not, enable the Buy button or not. Feature flags, permissions and toggles in settings screens are booleans underneath.',
    misconception:
      'The boolean true is not the string "true". `"false"` (in quotes) is a non-empty string, and JavaScript treats any non-empty string as truthy — so `if ("false")` actually runs.',
    question: 'What values can a boolean hold?',
    canonicalAnswer: 'Only two: true or false.',
    acceptedAnswers: ['true or false', 'true false', 'true and false'],
    keyIdeas: [
      {
        id: 'true-false',
        label: 'true or false',
        terms: ['true', 'false', 'yes', 'two values', 'two options', 'two states', 'two possible',
          'binary', 'off', 'one or zero', '1 or 0'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['any number', 'any text', 'decimal'],
        feedback: 'A boolean has only two possible values — true and false.',
      },
    ],
    hint: 'Think of a light switch, or a yes/no question.',
    relatedConceptIds: ['data-type', 'conditional', 'number', 'string', 'state'],
    prerequisiteIds: ['data-type'],
    deepDive:
      'Booleans are named after mathematician George Boole. Combine them with `&&` (and), `||` (or) and `!` (not): `isLoggedIn && isAdmin`. JavaScript also has “truthy” and “falsy” values — `0`, `""`, `null`, `undefined` and `NaN` behave like false in an if statement.',
    testAnswers: {
      correct: ['true or false', 'just true and false', 'yes or no basically, two values'],
      incorrect: ['any number', 'text like a name'],
    },
  },

  // ───────────────────────────────────────────── array
  {
    id: 'array',
    term: 'Array (list)',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'An array is an ordered list of values stored under one name, where each item is found by its numbered position (index), starting at 0.',
    plainEnglish:
      'When you have many of the same kind of thing — products, messages, high scores — you put them in an array. The items stay in order, and you can grab any one by its position, add new ones, or go through them all.',
    analogy:
      'A numbered row of lockers: one corridor, many lockers, and you find each by its number. Except in code the first locker is number 0.',
    example:
      '`let fruits = ["apple", "banana", "cherry"];` `fruits[0]` is "apple", `fruits.length` is 3, and `fruits.push("date")` adds a fourth item to the end.',
    whyItMatters:
      'Lists are everywhere: search results, a feed, rows from a database, items in a cart. Most data coming back from an API is an array of objects you loop through to display.',
    misconception:
      'An array is not an object in the everyday sense: array items are found by position (`fruits[1]`), whereas an object’s values are found by name (`user.email`). Use an array for “many of the same thing”, an object for “one thing with several properties”.',
    question: 'What is an array?',
    canonicalAnswer: 'An ordered list of values stored under one name, each with a numbered position starting at 0.',
    acceptedAnswers: ['ordered list', 'list of values', 'list of items'],
    keyIdeas: [
      {
        id: 'list',
        label: 'an ordered list of values',
        terms: ['list', 'ordered', 'sequence', 'collection', 'multiple values', 'several values',
          'many values', 'group of', 'series', 'items', 'bunch of values', 'set of values'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['key value', 'key-value', 'named properties', 'labeled fields', 'labelled fields'],
        feedback:
          'That describes an object. An array stores items in order and finds them by numbered position.',
      },
    ],
    hint: 'Think of a shopping list — what is special about how the items are arranged?',
    relatedConceptIds: ['object', 'loop', 'iteration', 'data-type', 'json', 'string'],
    prerequisiteIds: ['variable', 'data-type'],
    deepDive:
      'Arrays come with powerful methods: `.map()` transforms every item, `.filter()` keeps items that pass a test, `.find()` returns the first match, and `.reduce()` combines everything into one value. Example: `prices.filter(p => p > 10).map(p => p * 1.2)`.',
    challengeId: 'data-transform',
    testAnswers: {
      correct: ['a list of values in order', 'a collection of items', 'basically a list'],
      incorrect: ['a set of key value pairs', 'a single number'],
    },
  },

  // ───────────────────────────────────────────── object
  {
    id: 'object',
    term: 'Object (key–value)',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'In JavaScript, an object is a collection of related values stored as named properties (key–value pairs), so each value is looked up by its name.',
    plainEnglish:
      'An object bundles together everything about one thing. A user has a name, an email and an age — rather than three loose variables, you keep them in one object and ask for `user.email` when you need it.',
    analogy:
      'A contact card: one card per person, with labelled fields — Name, Phone, Email — each holding a value.',
    example:
      '`let user = { name: "Ada", email: "ada@example.com", age: 36 };` `user.name` is "Ada". `user.age = 37;` updates a property; `user.city = "London";` adds a new one.',
    whyItMatters:
      'Objects are how programs model real things — users, orders, products. Data from APIs and databases almost always arrives as objects (often inside arrays), so reading `order.items[0].price` is a daily skill.',
    misconception:
      'A JavaScript object is not JSON. JSON is a text format whose syntax was borrowed from objects; an object is a live value in a running program. `JSON.stringify(user)` turns an object into JSON text, and `JSON.parse(text)` turns it back.',
    question: 'What is an object in JavaScript?',
    canonicalAnswer:
      'A collection of related data stored as named properties — key–value pairs — so you look up each value by its name.',
    acceptedAnswers: ['key value pairs', 'key-value pairs', 'named properties'],
    keyIdeas: [
      {
        id: 'named',
        label: 'values looked up by name (keys / properties)',
        terms: ['key', 'keys', 'property', 'properties', 'label', 'labeled', 'labelled', 'named',
          'name', 'field', 'attribute'],
      },
      {
        id: 'grouped',
        label: 'related data grouped together',
        terms: ['group', 'collection', 'bundle', 'together', 'values', 'data', 'information', 'related',
          'container', 'store', 'hold', 'details'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['ordered list', 'numbered list', 'by position', 'index'],
        feedback:
          'That describes an array. An object finds its values by name, not by numbered position.',
      },
    ],
    hint: 'Think of a contact card. How do you find the phone number on it?',
    relatedConceptIds: ['array', 'json', 'data-type', 'variable', 'data-model', 'function'],
    prerequisiteIds: ['variable', 'data-type'],
    deepDive:
      'Property values can be anything — strings, numbers, arrays, other objects, even functions (then called methods: `user.greet()`). You can access a property with dot notation (`user.email`) or brackets (`user["email"]`), which is useful when the key is in a variable.',
    challengeId: 'data-transform',
    testAnswers: {
      correct: [
        'a bunch of key value pairs',
        'groups related data together with names for each value',
        'a collection of properties about one thing',
      ],
      partial: ['a bunch of related data together'],
      incorrect: ['an ordered list of items', 'a function that runs code'],
    },
  },

  // ───────────────────────────────────────────── function
  {
    id: 'function',
    term: 'Function (reusable code)',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'A function is a named, reusable block of code that performs a specific task; it runs whenever it is called and can take inputs and return a result.',
    plainEnglish:
      'Instead of writing the same steps over and over, you wrap them in a function, give it a name, and call it whenever you need it. Functions can take inputs (like two numbers) and hand back an output (their sum).',
    analogy:
      'A coffee machine: put in beans and water (inputs), press the button (call it), get coffee (output). You don’t rebuild the machine each morning.',
    example:
      '`function add(a, b) { return a + b; }` defines it. `add(2, 3)` calls it and gives 5; `add(10, 20)` reuses the same code to give 30.',
    whyItMatters:
      'Functions are the main way code is organised. A large app is thousands of small functions calling each other. Fixing a bug in one function fixes it everywhere that function is used.',
    misconception:
      'Defining a function doesn’t run it. `function greet() {...}` only describes the steps; nothing happens until something calls `greet()` — for example a click handler.',
    question: 'What is a function?',
    canonicalAnswer:
      'A named, reusable block of code that performs a task — you call it whenever you need it, optionally with inputs, and it can return a result.',
    acceptedAnswers: ['reusable block of code', 'reusable piece of code', 'reusable code'],
    keyIdeas: [
      {
        id: 'code-block',
        label: 'a block of code / set of instructions',
        terms: ['block of code', 'chunk of code', 'piece of code', 'bit of code', 'section of code',
          'set of instructions', 'instructions', 'steps', 'recipe', 'mini program', 'code'],
      },
      {
        id: 'reuse',
        label: 'that you can call and reuse to do a task',
        terms: ['reuse', 'reusable', 'call', 'run', 'invoke', 'again', 'whenever', 'multiple times',
          'execute', 'over and over', 'task', 'specific job', 'performs', 'inputs', 'returns'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['holds a value', 'stores a value', 'stores data'],
        feedback:
          'That describes a variable. A function is a block of code that does something when it is called.',
      },
    ],
    hint: 'Think of a coffee machine: something you build once, then press a button to use again and again.',
    relatedConceptIds: ['parameter', 'argument', 'return-value', 'scope', 'event-handler', 'library', 'abstraction'],
    prerequisiteIds: ['variable'],
    deepDive:
      'JavaScript has several ways to write functions: declarations (`function add(a, b) {...}`), function expressions, and arrow functions (`const add = (a, b) => a + b;`). Functions are values, so you can pass them to other functions — that is how event handlers and `.map()` work: `button.addEventListener("click", handleClick)`.',
    challengeId: 'button-counter',
    testAnswers: {
      correct: [
        'a reusable piece of code',
        'a set of instructions you can call whenever you want',
        'a block of code that does a specific task',
      ],
      partial: ['some instructions'],
      incorrect: ['a box that stores a value', 'a type of data like a number'],
    },
  },

  // ───────────────────────────────────────────── parameter
  {
    id: 'parameter',
    term: 'Parameter',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'A parameter is a named placeholder listed in a function’s definition that stands for an input the function expects to receive when it is called.',
    plainEnglish:
      'When you write a function, you don’t yet know the exact values it will work with. Parameters are the blanks you leave — named slots like `a` and `b` — that get filled in with real values each time the function is called.',
    analogy:
      'The blanks in a form letter: “Dear ____, your order #____ has shipped.” The blanks are parameters; the actual name and number written in are arguments.',
    example:
      'In `function greet(name) { return "Hi, " + name; }`, `name` is the parameter. Inside the function it acts like a variable holding whatever value was passed in.',
    whyItMatters:
      'Parameters are what make a function reusable. One `calculateShipping(weight, country)` function can price every parcel instead of writing a separate one per country.',
    misconception:
      'Parameter vs argument: the parameter is the placeholder name in the definition (`name` in `function greet(name)`); the argument is the actual value supplied in a call (`"Ada"` in `greet("Ada")`). People often use the words loosely, but they are different ends of the same handoff.',
    question: 'What is a parameter in a function?',
    canonicalAnswer:
      'A named placeholder in the function’s definition that stands for an input the function expects to receive.',
    acceptedAnswers: ['placeholder for an input', 'placeholder for a value', 'named input in the definition'],
    keyIdeas: [
      {
        id: 'placeholder',
        label: 'a named placeholder in the definition',
        terms: ['placeholder', 'place holder', 'stand in', 'stands for', 'slot', 'blank', 'variable name',
          'name for', 'definition', 'defined', 'declared', 'listed'],
      },
      {
        id: 'input',
        label: 'for an input the function receives',
        terms: ['input', 'receive', 'accept', 'expects', 'takes', 'passed in', 'gets', 'value'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['returns', 'output', 'result'],
        feedback:
          'That is the return value — what comes out. A parameter is about what goes in: a placeholder for an input.',
      },
    ],
    hint: 'Think of the blanks in a form letter, written before you know who it is for.',
    relatedConceptIds: ['argument', 'function', 'return-value', 'variable', 'scope', 'query-parameter'],
    prerequisiteIds: ['function', 'variable'],
    deepDive:
      'Parameters can have defaults: `function greet(name = "friend")` uses "friend" if no argument is passed. If a function is called with fewer arguments than parameters, the missing ones are `undefined` in JavaScript. Parameters are scoped to the function — they don’t exist outside it.',
    testAnswers: {
      correct: [
        'a placeholder for the input a function takes',
        'the variable name in the function definition that receives a value',
        'like a blank slot for an input',
      ],
      partial: ['an input to a function'],
      incorrect: ['the result the function returns', 'a type of loop'],
    },
  },

  // ───────────────────────────────────────────── argument
  {
    id: 'argument',
    term: 'Argument (passed value)',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'An argument is the actual value passed into a function when it is called, which fills the matching parameter for that run.',
    plainEnglish:
      'If parameters are the blanks in a function, arguments are what you write in them. Each time you call the function you can supply different arguments, and the same code produces different results.',
    analogy:
      'Ordering at a coffee shop: the menu says “size” and “milk” (parameters); you say “large, oat” (arguments).',
    example:
      'With `function add(a, b) { return a + b; }`, the call `add(2, 3)` passes the arguments 2 and 3, so `a` becomes 2 and `b` becomes 3 for that call. `add(10, 5)` passes different arguments to the same function.',
    whyItMatters:
      'Most bugs around functions are argument mistakes: passing them in the wrong order, the wrong type (`"5"` instead of `5`), or forgetting one. Reading error messages often means checking what was actually passed in.',
    misconception:
      'Argument vs parameter: the argument is the real value at call time (`"Ada"` in `greet("Ada")`); the parameter is the placeholder name in the definition (`name`). And it has nothing to do with disagreeing — it comes from the mathematical sense of “input to a function”.',
    question: 'What is an argument when you call a function?',
    canonicalAnswer:
      'The actual value you pass into the function when you call it, which fills in one of its parameters.',
    acceptedAnswers: ['value passed to a function', 'value you pass in', 'actual value passed'],
    keyIdeas: [
      {
        id: 'value',
        label: 'the actual value',
        terms: ['actual value', 'real value', 'value', 'data', 'input', 'information', 'number',
          'specific value'],
      },
      {
        id: 'passed',
        label: 'passed in when calling the function',
        terms: ['pass', 'passed', 'give', 'hand', 'send', 'supply', 'provide', 'call', 'calling',
          'plug in', 'feed', 'put in'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['placeholder', 'disagreement', 'fight', 'debate'],
        feedback:
          'Not quite. A placeholder in the definition is a parameter; an argument is the real value you pass in when calling.',
      },
    ],
    hint: 'In `add(2, 3)`, what are the 2 and the 3?',
    relatedConceptIds: ['parameter', 'function', 'return-value', 'data-type', 'request-body'],
    prerequisiteIds: ['function', 'parameter'],
    deepDive:
      'In JavaScript, arguments are matched to parameters by position, so `makeUser("Ada", 36)` and `makeUser(36, "Ada")` mean different things. To avoid order mistakes, many APIs take a single object argument: `makeUser({ name: "Ada", age: 36 })`.',
    challengeId: 'button-counter',
    testAnswers: {
      correct: [
        'the actual value you pass into the function',
        'the data you give a function when you call it',
        'the numbers you plug in when calling it, like the 2 and 3',
      ],
      partial: ['a value'],
      incorrect: ['a placeholder in the function definition', 'when two programs disagree'],
    },
  },

  // ───────────────────────────────────────────── return-value
  {
    id: 'return-value',
    term: 'Return value',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'A return value is the result a function hands back to the code that called it, using the `return` keyword.',
    plainEnglish:
      'Some functions do a job and then report back with an answer. That answer is the return value: the calling code can store it, display it, or feed it into another function. Once a function returns, it stops running.',
    analogy:
      'Asking a colleague to total up an invoice: they go away, do the math, and come back with a number. The number they hand you is the return value.',
    example:
      '`function add(a, b) { return a + b; }` `let total = add(2, 3);` — the call returns 5, which is stored in `total`. A function without a `return` statement gives back `undefined`.',
    whyItMatters:
      'Return values let you build big results from small functions: `formatPrice(addTax(subtotal(cart)))`. Forgetting to `return` is one of the most common beginner bugs — the function runs, but its result vanishes.',
    misconception:
      'Returning is not printing. `console.log(5)` shows 5 in the console for a human but gives nothing back to the code; `return 5` hands 5 to the caller but shows nothing on screen.',
    question: 'What is a function’s return value?',
    canonicalAnswer: 'The result the function hands back to the code that called it.',
    acceptedAnswers: ['result of the function', 'output of a function', 'what a function gives back'],
    keyIdeas: [
      {
        id: 'result-back',
        label: 'the result handed back',
        terms: ['result', 'output', 'answer', 'outcome', 'gives back', 'sends back', 'hands back',
          'passes back', 'spits out', 'comes back', 'produces', 'returned'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['print', 'prints', 'console.log', 'displays on screen', 'shows on screen'],
        feedback:
          'Printing shows something to a human; returning hands a value back to the code that called the function. They’re different.',
      },
    ],
    hint: 'You ask a function a question. What do you get back?',
    relatedConceptIds: ['function', 'argument', 'parameter', 'promise', 'response'],
    prerequisiteIds: ['function'],
    deepDive:
      'A function can only return one value, but that value can be an array or object containing many things: `return { min, max };`. `return` also ends the function immediately, which is often used for early exits: `if (!user) return null;`.',
    testAnswers: {
      correct: ['the output of the function', 'what the function gives back', 'the result it sends back to you'],
      incorrect: ['what the function prints on screen', 'the name of the function'],
    },
  },

  // ───────────────────────────────────────────── conditional
  {
    id: 'conditional',
    term: 'Conditional',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'A conditional is a statement that checks whether a condition is true and runs different code depending on the answer.',
    plainEnglish:
      'Conditionals are how programs make decisions. “If the password is correct, log them in; otherwise, show an error.” The code checks a yes/no question and takes one path or another.',
    analogy:
      'A fork in the road with a sign: if it’s raining, take the covered path; else take the park.',
    example:
      '`if (score >= 100) { message = "You win!"; } else { message = "Keep going"; }` Only one of the two blocks runs, depending on the value of `score`.',
    whyItMatters:
      'Every rule in a product — free shipping over $50, hide the admin page from regular users, show a badge for new messages — is a conditional somewhere in the code.',
    misconception:
      'A conditional runs its block once (or not at all) — it doesn’t repeat. Repeating code while something is true is the job of a loop (`while`), not an `if`.',
    question: 'What does a conditional (an if statement) do?',
    canonicalAnswer:
      'It checks whether a condition is true and runs different code depending on the result.',
    acceptedAnswers: ['runs code only if something is true', 'runs code if a condition is true'],
    keyIdeas: [
      {
        id: 'check',
        label: 'checking a condition',
        terms: ['check', 'condition', 'test', 'true', 'whether', 'evaluate', 'compare', 'decide',
          'decision', 'if something', 'question'],
      },
      {
        id: 'branch',
        label: 'running different code depending on it',
        terms: ['different code', 'depending', 'depends', 'only runs', 'only run', 'choose', 'branch',
          'otherwise', 'else', 'path', 'runs code', 'run code', 'which code', 'executes'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['repeat', 'over and over', 'loops'],
        feedback:
          'That is a loop. A conditional checks a condition once and picks which code to run.',
      },
    ],
    hint: 'Think “if it’s raining, take an umbrella; otherwise don’t”. What two things happen?',
    relatedConceptIds: ['boolean', 'loop', 'function', 'form-validation', 'algorithm'],
    prerequisiteIds: ['boolean', 'variable'],
    deepDive:
      'Beyond `if / else if / else`, JavaScript has the ternary operator for short choices (`const label = isMember ? "Member" : "Guest";`) and `switch` for comparing one value against many cases. Conditions use comparison operators: `===` (equal), `!==`, `>`, `<=`.',
    challengeId: 'score-tracker',
    testAnswers: {
      correct: [
        'checks if something is true and runs different code',
        'runs code only if a condition is true',
        'tests a condition then picks which path to take',
      ],
      partial: ['it makes a decision'],
      incorrect: ['repeats code over and over', 'stores a value'],
    },
  },

  // ───────────────────────────────────────────── loop
  {
    id: 'loop',
    term: 'Loop (for / while)',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'A loop is a structure that repeats a block of code — a set number of times, once per item in a list, or for as long as a condition stays true.',
    plainEnglish:
      'Computers are great at doing the same thing many times without getting bored. A loop says “do this for every item” or “keep doing this until…”, so you write the steps once and the computer repeats them.',
    analogy:
      'Dealing cards: “give one card to each player, go around again, stop when the deck is empty.” One instruction, repeated.',
    example:
      '`for (const price of prices) { total = total + price; }` adds up every price in the array. `while (lives > 0) { playRound(); }` keeps playing until lives run out.',
    whyItMatters:
      'Showing 50 search results, emailing 10,000 customers, or totalling a cart all use loops. A loop that never stops (an infinite loop) is a classic bug that freezes a page.',
    misconception:
      'Loop vs iteration: the loop is the whole repeating structure; an iteration is one single pass through it. A loop over 3 items has 3 iterations.',
    question: 'What does a loop do?',
    canonicalAnswer:
      'It repeats a block of code — for each item in a list, a set number of times, or until a condition is no longer true.',
    acceptedAnswers: ['repeats code', 'repeats instructions', 'runs code over and over'],
    keyIdeas: [
      {
        id: 'repeat',
        label: 'repeating code',
        terms: ['repeat', 'again and again', 'over and over', 'multiple times', 'many times', 'each item',
          'every item', 'cycle', 'iterate', 'until', 'while', 'same code', 'keeps running', 'repetition'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['decide', 'decision', 'choose between'],
        feedback:
          'Choosing between paths is a conditional. A loop repeats the same code multiple times.',
      },
    ],
    hint: 'Think of laps around a track.',
    relatedConceptIds: ['iteration', 'array', 'conditional', 'algorithm', 'boolean'],
    prerequisiteIds: ['conditional', 'array'],
    deepDive:
      'JavaScript offers `for (let i = 0; i < 10; i++)` (counting), `for...of` (each item of an array), `while` (as long as a condition holds) and array methods like `.forEach()` and `.map()` that loop for you. `break` exits a loop early; `continue` skips to the next pass.',
    challengeId: 'data-transform',
    testAnswers: {
      correct: ['repeats code over and over', 'runs the same code for every item in a list', 'does something multiple times until a condition'],
      incorrect: ['decides between two options', 'stores a list of items'],
    },
  },

  // ───────────────────────────────────────────── iteration
  {
    id: 'iteration',
    term: 'Iteration',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'An iteration is one single pass through the body of a loop; “iterating” over a list means stepping through its items one at a time.',
    plainEnglish:
      'If a loop is the whole lap race, an iteration is one lap. A loop over five products runs five iterations, and in each one a variable holds the current product.',
    analogy:
      'Doing reps at the gym: the set is the loop; each individual lift is an iteration.',
    example:
      'In `for (const name of ["Ada", "Grace", "Linus"]) { console.log(name); }` there are three iterations: in the first `name` is "Ada", in the second "Grace", in the third "Linus".',
    whyItMatters:
      'Debugging loops is mostly about asking “what happened on this iteration?” — for example, which item made the 37th pass crash. Developers also say “iterate over the results” to mean go through them one by one.',
    misconception:
      'Iteration is not the loop itself: the loop is the structure, an iteration is one run of it. (In product teams “iteration” also means a new improved version of something — a different, everyday meaning.)',
    question: 'What is one iteration of a loop?',
    canonicalAnswer: 'One single pass through the loop’s body — one run of the repeated code.',
    acceptedAnswers: ['one pass through the loop', 'one time through the loop', 'single run of the loop'],
    keyIdeas: [
      {
        id: 'single-pass',
        label: 'one single pass / run',
        terms: ['one pass', 'single pass', 'one time', 'one run', 'single run', 'one cycle', 'one round',
          'one repetition', 'each time', 'once through', 'one go', 'one lap', 'one loop', 'single time',
          'single cycle', 'one step'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['all repetitions', 'every repetition', 'whole process', 'new version'],
        feedback:
          'An iteration is just one pass through the loop, not the whole loop (and not a product version).',
      },
    ],
    hint: 'If the loop is the whole race, what is one lap?',
    relatedConceptIds: ['loop', 'array', 'algorithm', 'debugging'],
    prerequisiteIds: ['loop'],
    deepDive:
      'Classic `for (let i = 0; i < 3; i++)` loops use a counter: `i` is 0, 1, then 2 across the three iterations, and the loop checks `i < 3` before each one. Data structures that can be stepped through with `for...of` (arrays, strings, Maps) are called “iterable”.',
    challengeId: 'data-transform',
    testAnswers: {
      correct: ['one pass through the loop', 'each time the loop runs once', 'a single run of the code inside the loop'],
      incorrect: ['all the repetitions of the loop together', 'a new version of the product'],
    },
  },

  // ───────────────────────────────────────────── scope
  {
    id: 'scope',
    term: 'Scope',
    trackId: 'programming',
    difficulty: 4,
    definition:
      'Scope is the region of a program in which a variable exists and can be accessed by name.',
    plainEnglish:
      'Not every variable is visible everywhere. A variable created inside a function only exists inside that function; code outside can’t see it. Scope is the set of rules deciding which parts of the code can reach which variables.',
    analogy:
      'Rooms in a house with one-way windows: from inside a room you can see into the hallway (the outer scope), but people in the hallway can’t see into the room.',
    example:
      '`let total = 0; function add(x) { let temp = x * 2; total = total + temp; }` Inside `add`, both `temp` and `total` are accessible. Outside it, `console.log(temp)` throws “ReferenceError: temp is not defined”.',
    whyItMatters:
      'Scope prevents chaos: two functions can each have their own `count` without stepping on each other. Many confusing bugs — a value that is “undefined” or unexpectedly changed — come down to scope.',
    misconception:
      'Scope is not about how long the program runs or what type a variable is; it is about where in the code a name is visible. Also, a global variable is visible everywhere — handy, but risky because any code can change it.',
    question: 'What does a variable’s scope determine?',
    canonicalAnswer:
      'Which parts of the code can access the variable — the region of the program where it exists and is visible.',
    acceptedAnswers: ['where it can be accessed', 'where its visible', 'where it is accessible'],
    keyIdeas: [
      {
        id: 'visibility',
        label: 'which parts of the code can access it',
        terms: ['access', 'accessible', 'visible', 'visibility', 'available', 'seen', 'see it', 'reach',
          'region', 'part of the code', 'parts of the code', 'part of the program', 'section', 'block',
          'inside', 'exists'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['data type', 'how big', 'how much memory', 'what type'],
        feedback:
          'That is about the data type or size. Scope is about where in the code a variable can be accessed.',
      },
    ],
    hint: 'If you create a variable inside a function, can code outside that function see it?',
    relatedConceptIds: ['variable', 'constant', 'function', 'module', 'state'],
    prerequisiteIds: ['variable', 'function'],
    deepDive:
      'JavaScript has global scope, function scope and block scope (`let` and `const` inside `{ }` — like an if block — stay there). Inner functions can read variables from the scopes around them; when a function “remembers” those variables after the outer code finishes, that is called a closure.',
    testAnswers: {
      correct: [
        'where the variable can be accessed',
        'which parts of the code can see it',
        'the region of the program where its available',
      ],
      incorrect: ['what data type it is', 'how big the variable is'],
    },
  },

  // ───────────────────────────────────────────── error
  {
    id: 'error',
    term: 'Error',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'An error is a problem that stops a piece of code from doing what it was asked — either because the code is malformed, or because something goes wrong while it runs.',
    plainEnglish:
      'Errors are the computer saying “I can’t do this.” Some are caught before running (a typo in the syntax); others happen mid-run (asking for a property of something that doesn’t exist). Either way, that operation fails and you usually get a message explaining why.',
    analogy:
      'A satnav saying “route not possible”: the instruction couldn’t be carried out, and it tells you roughly why.',
    example:
      '`let user; console.log(user.name);` fails with “TypeError: Cannot read properties of undefined (reading \'name\')”, shown in red in the browser console.',
    whyItMatters:
      'Errors are normal and expected — reading them is a core skill. The error type, message and line number usually point straight at the problem. Production apps log errors so the team finds out before customers complain.',
    misconception:
      'Error vs exception: an error is the general idea of “something went wrong”; an exception is the mechanism many languages use to report it at runtime — it is thrown and can be caught. In JavaScript, thrown errors are usually `Error` objects. A bug is the underlying mistake in the code; the error is the symptom you see.',
    question: 'What is an error in programming?',
    canonicalAnswer:
      'A problem that means the code couldn’t do what it was asked — something went wrong, so that operation fails, usually with a message saying why.',
    acceptedAnswers: ['something went wrong', 'something goes wrong', 'a problem in the code'],
    keyIdeas: [
      {
        id: 'went-wrong',
        label: 'something went wrong and the code failed',
        terms: ['wrong', 'problem', 'mistake', 'fail', 'failure', 'broken', 'breaks', 'bug', 'issue',
          'crash', 'unexpected', 'stops', 'invalid', 'cant run', 'unable'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['warning', 'feature', 'virus'],
        feedback:
          'Not quite — an error means an operation actually failed: the code couldn’t do what it was asked.',
      },
    ],
    hint: 'What is the computer telling you when the console turns red?',
    relatedConceptIds: ['exception', 'debugging', 'syntax', 'browser-console', 'logs', 'monitoring', 'status-code'],
    prerequisiteIds: ['source-code'],
    deepDive:
      'JavaScript’s built-in error types include SyntaxError (malformed code), ReferenceError (unknown variable name), TypeError (wrong kind of value, e.g. calling something that isn’t a function) and RangeError. Each error carries a message and a stack trace listing the chain of function calls that led to it.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'when something goes wrong in the code',
        'a problem that makes the program fail',
        'a mistake that stops the code from running',
      ],
      incorrect: ['a warning you can ignore', 'a new feature in the app'],
    },
  },

  // ───────────────────────────────────────────── exception
  {
    id: 'exception',
    term: 'Exception',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'An exception is an error signal that is “thrown” when something goes wrong at runtime and travels up through the calling code until a handler catches it — or, if none does, crashes the program.',
    plainEnglish:
      'When code hits a problem it can’t solve itself, it throws an exception — like raising a hand to say “I can’t continue.” Code further up can wrap risky work in try…catch to catch that exception and recover gracefully, for example showing a friendly message instead of a broken page.',
    analogy:
      'A circus safety net: the performer (the code) might fall (throw), and the net (catch) lets the show go on. With no net, the act is over.',
    example:
      '`try { const data = JSON.parse(text); } catch (err) { showMessage("Could not read the file"); }` If `text` isn’t valid JSON, `JSON.parse` throws a SyntaxError, and the catch block handles it instead of crashing. You can throw your own: `throw new Error("Cart is empty");`.',
    whyItMatters:
      'Networks fail, users type nonsense, files go missing. Exception handling is the difference between an app that says “Couldn’t load, try again” and one that shows a blank white screen.',
    misconception:
      'Error vs exception: “error” is the broad idea that something went wrong; an exception is the specific runtime mechanism for reporting it — thrown, then caught or not. A syntax error, for instance, stops code before it runs, so there is nothing to catch. And it has nothing to do with the everyday “exception to the rule”.',
    question: 'What can code do with an exception that makes it different from simply crashing?',
    canonicalAnswer:
      'It can catch and handle it (with try…catch), so the program can recover and keep running instead of crashing.',
    acceptedAnswers: ['catch it', 'handle it', 'try catch'],
    keyIdeas: [
      {
        id: 'catch',
        label: 'it can be caught and handled to recover',
        terms: ['catch', 'caught', 'handle', 'handled', 'try', 'recover', 'deal with', 'intercept',
          'respond to', 'keep running', 'continue', 'carry on', 'gracefully', 'fallback'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['exception to the rule', 'special case', 'ignored forever'],
        feedback:
          'In code, an exception isn’t a special case — it’s an error signal that is thrown and can be caught and handled.',
      },
    ],
    hint: 'Think of a safety net under a trapeze. What does the net do?',
    relatedConceptIds: ['error', 'debugging', 'promise', 'logs', 'asynchronous-programming'],
    prerequisiteIds: ['error', 'function'],
    deepDive:
      'An uncaught exception climbs the call stack: if function A calls B calls C, and C throws, JavaScript checks C, then B, then A for a catch. `finally` blocks run either way (good for cleanup). With promises, a failure becomes a rejection, handled with `.catch()` or `try/catch` around `await`.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'you can catch it and handle it',
        'try catch it so the program can keep running',
        'the code can recover from it',
      ],
      incorrect: ['an exception to the rule', 'it makes the code run faster'],
    },
  },

  // ───────────────────────────────────────────── debugging
  {
    id: 'debugging',
    term: 'Debugging',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'Debugging is the process of investigating why software misbehaves, pinpointing the cause, and fixing it.',
    plainEnglish:
      'When code does the wrong thing, a developer becomes a detective: reproduce the problem, gather clues (error messages, logs), narrow down where it goes wrong, then fix the cause. Usually the finding takes far longer than the fixing.',
    analogy:
      'A doctor diagnosing a patient: observe symptoms, run tests, rule things out, identify the cause — and only then prescribe a treatment.',
    example:
      'A cart shows “$1020” instead of “$30”. Adding `console.log(typeof price)` reveals the price is the string "10", so `"10" + 20` concatenates. Fix: `Number(price) + 20`. Developers can also pause code with a `debugger;` statement or a breakpoint in DevTools.',
    whyItMatters:
      'Developers spend a large share of their time debugging. Clear bug reports — steps to reproduce, expected vs actual result, screenshots, console errors — make debugging dramatically faster, and anyone on a team can write them.',
    misconception:
      'Debugging is not testing. Tests check whether code works and can reveal that something is broken; debugging is the detective work after you know something is wrong. And software bugs are mistakes in the code, not viruses.',
    question: 'What does debugging involve?',
    canonicalAnswer:
      'Finding out what is causing a problem in the code — tracking down the root cause — and then fixing it.',
    acceptedAnswers: ['finding and fixing bugs', 'find and fix problems', 'finding and fixing errors'],
    keyIdeas: [
      {
        id: 'find',
        label: 'finding the cause',
        terms: ['find', 'locate', 'track down', 'identify', 'figure out', 'investigate', 'diagnose',
          'cause', 'why', 'root cause', 'pinpoint', 'detective', 'narrow down', 'search for'],
      },
      {
        id: 'fix',
        label: 'fixing it',
        terms: ['fix', 'remove', 'solve', 'resolve', 'correct', 'repair', 'patch', 'get rid of'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['virus', 'antivirus', 'rewrite everything', 'delete the code'],
        feedback:
          'Debugging is detective work: find what is causing a problem in the code, then fix that cause.',
      },
    ],
    hint: 'There are two halves: one is detective work, the other is the repair.',
    relatedConceptIds: ['error', 'exception', 'browser-console', 'developer-tools', 'logs', 'test', 'observability'],
    prerequisiteIds: ['error'],
    deepDive:
      'Common techniques: reproduce reliably first; read the full error and stack trace; add `console.log` to check assumptions; use breakpoints to pause and inspect variables; bisect (undo half the recent changes to see which one caused it — `git bisect` automates this); and “rubber-duck” it by explaining the code out loud.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'finding and fixing bugs',
        'figuring out why the code is broken and fixing it',
        'track down the cause of a problem and solve it',
      ],
      partial: ['fixing the code'],
      incorrect: ['removing viruses from a computer', 'writing a new feature'],
    },
  },

  // ───────────────────────────────────────────── algorithm
  {
    id: 'algorithm',
    term: 'Algorithm',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'An algorithm is a finite, precise sequence of steps for solving a problem or completing a task.',
    plainEnglish:
      'An algorithm is a recipe for getting something done, written so exactly that anyone — or any computer — following it gets the same result. Sorting a list, finding the fastest route, and checking a password are all algorithms.',
    analogy:
      'Looking up a word in a paper dictionary: open near the middle, decide if your word is before or after, jump halfway again, repeat. That method is an algorithm (called binary search).',
    example:
      'Finding the largest number in a list: `let max = nums[0]; for (const n of nums) { if (n > max) max = n; }` — start with the first, compare each number, keep the bigger one.',
    whyItMatters:
      'The choice of algorithm decides whether a feature takes milliseconds or minutes as data grows. Searching 1,000,000 sorted items takes about 20 steps with binary search, versus up to 1,000,000 checking one by one.',
    misconception:
      'An algorithm isn’t necessarily AI or a social media feed. People say “the algorithm” to mean a recommendation system, but any precise step-by-step method — even long division — is an algorithm. It is also not the code itself: the same algorithm can be written in any language.',
    question: 'What is an algorithm?',
    canonicalAnswer: 'A precise, step-by-step set of instructions for solving a problem or completing a task.',
    acceptedAnswers: ['steps to solve a problem', 'step by step instructions to solve a problem'],
    keyIdeas: [
      {
        id: 'steps',
        label: 'a precise sequence of steps',
        terms: ['steps', 'step by step', 'sequence', 'procedure', 'instructions', 'recipe', 'process',
          'method', 'rules', 'series of'],
      },
      {
        id: 'goal',
        label: 'to solve a problem or complete a task',
        terms: ['solve', 'problem', 'task', 'accomplish', 'achieve', 'goal', 'result', 'job', 'complete',
          'get something done', 'outcome', 'answer'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['ai', 'artificial intelligence', 'social media', 'machine learning'],
        feedback:
          'That is how the word is used in the news, but in programming an algorithm is any precise step-by-step method for solving a problem.',
      },
    ],
    hint: 'A cooking recipe is a good mental model. What is it, and what is it for?',
    relatedConceptIds: ['loop', 'conditional', 'function', 'iteration', 'source-code'],
    prerequisiteIds: ['loop', 'conditional'],
    deepDive:
      'Computer scientists compare algorithms with “Big O” notation, describing how work grows with input size: O(n) means work grows in step with the data (checking each item), O(log n) grows very slowly (binary search), O(n²) blows up quickly (comparing every item with every other).',
    testAnswers: {
      correct: [
        'step by step instructions to solve a problem',
        'a recipe for completing a task',
        'a set of steps to get something done',
      ],
      partial: ['a set of steps'],
      incorrect: ['the AI that picks your social media feed', 'a type of variable'],
    },
  },

  // ───────────────────────────────────────────── asynchronous-programming
  {
    id: 'asynchronous-programming',
    term: 'Asynchronous programming',
    trackId: 'programming',
    difficulty: 4,
    definition:
      'Asynchronous programming is a way of writing code so that slow operations — like network requests or timers — are started and finished later, while the program carries on with other work instead of freezing.',
    plainEnglish:
      'Some tasks take a while: fetching data from a server might take a second. Rather than stopping everything to wait, asynchronous code says “start this, tell me when it’s done,” and the page stays responsive in the meantime. When the result arrives, the code that needed it runs.',
    analogy:
      'Ordering at a busy café with a buzzer: you don’t stand frozen at the counter — you sit down, chat, and come back when the buzzer goes off.',
    example:
      '`console.log("1"); setTimeout(() => console.log("2"), 1000); console.log("3");` prints 1, 3, then 2 a second later. Fetching data works the same way: `const res = await fetch("https://api.example.com/items");` pauses only this function, not the whole page.',
    whyItMatters:
      'Every modern app waits on networks, databases and files. Without asynchronous code, a page would lock up every time it loaded data. Loading spinners, “skeleton” screens and race-condition bugs all come from this world.',
    misconception:
      'Asynchronous doesn’t mean “faster” or “in parallel on several CPUs”. JavaScript in the browser runs one piece of code at a time; async just lets it do other work while it waits for something slow happening elsewhere (on a server, in a timer).',
    question: 'What does asynchronous code let a program do while it waits for something slow?',
    canonicalAnswer:
      'Keep doing other work instead of freezing — the slow task finishes in the background and its result is handled later.',
    acceptedAnswers: ['keep doing other things', 'do other work while waiting', 'keep running while waiting'],
    keyIdeas: [
      {
        id: 'other-work',
        label: 'carry on with other work instead of freezing',
        terms: ['other', 'keep going', 'keep running', 'keeps running', 'continue', 'carry on',
          'meanwhile', 'in the meantime', 'at the same time', 'background', 'responsive', 'multitask',
          'move on'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['runs faster', 'makes code faster', 'speed up', 'multiple cpus', 'multiple cores'],
        feedback:
          'Async doesn’t make code faster or use more processors — it lets the program do other things while it waits instead of freezing.',
      },
    ],
    hint: 'Think of the café buzzer. What can you do while your coffee is being made?',
    relatedConceptIds: ['promise', 'request', 'response', 'api', 'event', 'latency', 'json'],
    prerequisiteIds: ['function', 'request'],
    deepDive:
      'JavaScript uses an event loop: async work (network, timers) is handed off to the browser or Node.js, and when it completes, a callback is queued to run. Over the years the style evolved from callbacks, to promises (`.then()`), to `async/await`, which reads like normal top-to-bottom code but doesn’t block.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'keep doing other stuff while it waits',
        'carry on with other tasks instead of freezing',
        'it keeps running in the background',
      ],
      incorrect: ['it makes the code run faster', 'it uses multiple cores'],
    },
  },

  // ───────────────────────────────────────────── promise
  {
    id: 'promise',
    term: 'Promise',
    trackId: 'programming',
    difficulty: 4,
    definition:
      'A Promise is a JavaScript object that acts as a placeholder for the eventual result of an asynchronous operation, which will either succeed with a value or fail with an error.',
    plainEnglish:
      'When you start something slow, like fetching data, you immediately get back a Promise — an IOU saying “a result is coming.” It starts out pending, then later becomes fulfilled (here is your data) or rejected (something went wrong). You attach code to run when it settles.',
    analogy:
      'A coat-check ticket: you don’t have your coat yet, but the ticket stands for it. Later you swap the ticket for the coat — or learn it was lost.',
    example:
      '`fetch("https://api.example.com/user/42")` returns a Promise immediately. `fetch(url).then(res => res.json()).then(user => show(user)).catch(err => showError(err));` — or with await: `const res = await fetch(url); const user = await res.json();`.',
    whyItMatters:
      'Nearly every network call, database query and file read in modern JavaScript returns a Promise. Forgetting to `await` one is a classic bug: you log “Promise { <pending> }” instead of the data you wanted.',
    misconception:
      'A promise is not the value itself. `const user = fetch(url);` gives you a Promise for a response, not the user — you must `await` it (or use `.then`) to get the actual data once it arrives.',
    question: 'What is a JavaScript Promise?',
    canonicalAnswer:
      'A placeholder object for a future result of an asynchronous operation — later it either succeeds with a value or fails with an error.',
    acceptedAnswers: ['placeholder for a future value', 'placeholder for a future result', 'iou for a value'],
    keyIdeas: [
      {
        id: 'placeholder',
        label: 'a placeholder for something that arrives later',
        terms: ['placeholder', 'place holder', 'future', 'later', 'eventually', 'eventual', 'iou',
          'stand in', 'stands for', 'pending', 'will arrive', 'will have', 'coming'],
      },
      {
        id: 'async-result',
        label: 'the result of an async operation (succeed or fail)',
        terms: ['result', 'value', 'outcome', 'succeed', 'success', 'fail', 'resolve', 'reject',
          'finish', 'completes', 'async', 'asynchronous', 'operation', 'data', 'response'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['the value itself', 'the actual data', 'guaranteed to succeed'],
        feedback:
          'A promise isn’t the value itself — it’s a placeholder for a result that arrives later (and might fail).',
      },
    ],
    hint: 'Think of a coat-check ticket: you hold it now; what does it stand for?',
    relatedConceptIds: ['asynchronous-programming', 'return-value', 'exception', 'api', 'response', 'json'],
    prerequisiteIds: ['asynchronous-programming', 'object', 'function'],
    deepDive:
      'A promise has three states: pending, fulfilled and rejected; once settled it never changes. `Promise.all([a, b])` waits for several at once. `async` functions always return a promise, and `await` unwraps it — throwing if it rejects, so you handle failures with try/catch.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        "a placeholder for a value you'll get later",
        'an object for a future result that might succeed or fail',
        'like an IOU for data that will arrive eventually',
      ],
      partial: ['something that comes later'],
      incorrect: ['the actual data from the server', 'a type of loop'],
    },
  },

  // ───────────────────────────────────────────── json
  {
    id: 'json',
    term: 'JSON',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'JSON (JavaScript Object Notation) is a lightweight text format for representing structured data — objects, arrays, strings, numbers, booleans and null — so it can be stored or sent between systems.',
    plainEnglish:
      'When two programs need to exchange data — say, a server sending your profile to an app — they need a shared format. JSON is the most common one: plain text that looks like JavaScript objects, easy for humans to read and for nearly every language to parse.',
    analogy:
      'A standard shipping form: whatever is in the parcel, everyone fills in the same labelled boxes, so any post office in the world can read it.',
    example:
      'An API might respond with `{"id": 42, "name": "Ada", "isAdmin": false, "tags": ["math", "poetry"]}`. In JavaScript, `JSON.parse(text)` turns that text into an object; `JSON.stringify(obj)` turns an object back into JSON text.',
    whyItMatters:
      'Almost every web API sends and receives JSON, and many config files (like package.json) use it. If you can read JSON, you can read most of the data flowing through modern software.',
    misconception:
      'JSON vs a JavaScript object: JSON is text — a string with strict rules (keys in double quotes, no functions, no trailing commas, no comments). A JavaScript object is a live value in a running program. They look alike, but you must parse JSON text to get an object. JSON is also not a programming language — it has no logic, only data.',
    question: 'What is JSON?',
    canonicalAnswer:
      'A text format for structured data — it looks like JavaScript objects and is used to store and send data between programs, especially in APIs.',
    acceptedAnswers: ['text format for data', 'data format', 'format for sending data'],
    keyIdeas: [
      {
        id: 'text-format',
        label: 'a text format',
        terms: ['text', 'format', 'string', 'plain text', 'notation', 'syntax', 'standard', 'written'],
      },
      {
        id: 'data-exchange',
        label: 'for storing or sending data',
        terms: ['data', 'send', 'exchange', 'transfer', 'store', 'share', 'between', 'apis', 'api',
          'transmit', 'information', 'communicate'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['programming language', 'javascript code', 'a database'],
        feedback:
          'JSON isn’t a language or a database — it’s a text format for representing data so programs can store or exchange it.',
      },
    ],
    hint: 'What does an API usually send back, and what form is it in?',
    relatedConceptIds: ['object', 'array', 'api', 'response-body', 'request-body', 'string', 'structured-output', 'nosql'],
    prerequisiteIds: ['object', 'array', 'string'],
    deepDive:
      'JSON supports only six kinds of values: object, array, string, number, boolean and null — no dates, functions or undefined (dates are usually sent as ISO strings like "2026-10-09T12:00:00Z"). APIs label it with the header `Content-Type: application/json`.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'a text format for sending data between apps',
        'a way to write data as text so APIs can share it',
        'a data format that looks like javascript objects, used to exchange information',
      ],
      partial: ['some kind of text format'],
      incorrect: ['a programming language', 'a database'],
    },
  },

  // ───────────────────────────────────────────── library
  {
    id: 'library',
    term: 'Library',
    trackId: 'programming',
    difficulty: 2,
    definition:
      'A library is a collection of pre-written, reusable code — usually functions — that you pull into your own program to handle a common task without writing it yourself.',
    plainEnglish:
      'Someone has already solved formatting dates, drawing charts and validating email addresses. A library packages that solution so you can drop it into your project and call its functions. You stay in charge of your app; you just borrow the tools.',
    analogy:
      'A toolbox you borrow from a neighbour: you decide what to build and when to pick up the drill.',
    example:
      'Installing date-fns with `npm install date-fns`, then `import { format } from "date-fns"; format(new Date(), "d MMM yyyy");` gives "9 Oct 2026" — no date math written by you.',
    whyItMatters:
      'Libraries save enormous time; a typical app pulls in hundreds through a package manager. But each one is a dependency: code you didn’t write, that must be updated, can break, and can carry security holes.',
    misconception:
      'Library vs framework: you call a library when you need it (you’re in control); a framework calls your code and dictates the app’s structure (it’s in control). Lodash and date-fns are libraries; Angular and Next.js are frameworks. (React calls itself a library, though many treat it like a framework.)',
    question: 'What is a code library?',
    canonicalAnswer:
      'A collection of pre-written, reusable code — like ready-made functions — that you import and call from your own program.',
    acceptedAnswers: ['prewritten code', 'pre-written code', 'reusable code written by someone else'],
    keyIdeas: [
      {
        id: 'prewritten',
        label: 'pre-written, reusable code you call from your app',
        terms: ['prewritten', 'pre-written', 'pre written', 'already written', 'written by someone else',
          'someone else', 'others wrote', 'ready made', 'ready-made', 'existing code', 'reusable',
          'collection of code', 'collection of functions', 'functions', 'package', 'import', 'borrow',
          'tools'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['books', 'calls your code', 'controls your app', 'structure for your app'],
        feedback:
          'Not quite. A library is pre-written code you choose to call. Software that calls your code and sets the app’s structure is a framework.',
      },
    ],
    hint: 'Why write a date formatter when someone already has? What would you borrow?',
    relatedConceptIds: ['framework', 'package-manager', 'dependency', 'module', 'sdk', 'function', 'abstraction'],
    prerequisiteIds: ['function'],
    deepDive:
      'In JavaScript, libraries are published as packages on the npm registry and installed with a package manager (npm, pnpm, yarn). Your package.json lists them with version ranges, and a lockfile pins exact versions so every machine installs the same code.',
    testAnswers: {
      correct: [
        'prewritten code you can reuse',
        'a collection of functions someone else wrote that you import',
        'ready-made code tools you can borrow',
      ],
      incorrect: ['a place with lots of books', 'it calls your code and controls your app'],
    },
  },

  // ───────────────────────────────────────────── framework
  {
    id: 'framework',
    term: 'Framework',
    trackId: 'programming',
    difficulty: 3,
    definition:
      'A framework is a pre-built foundation for an application that provides its structure and conventions, and calls the code you write at the right moments.',
    plainEnglish:
      'Instead of starting from a blank page, a framework hands you the skeleton of an app — how pages are organised, how data flows, where things go. You fill in the specific parts, and the framework decides when to run them.',
    analogy:
      'A house frame from a builder: walls and rooms are already laid out; you choose the paint, fixtures and furniture. Versus a library, which is like a toolbox — you build however you like.',
    example:
      'In Next.js, a file at `app/about/page.tsx` that exports a component automatically becomes the /about page. You never write the routing code — the framework finds your file and calls it.',
    whyItMatters:
      'Frameworks (Next.js, Django, Ruby on Rails, Laravel, Angular) let small teams build big apps quickly and consistently, because everyone follows the same conventions. The trade-off: you work within its rules, and switching frameworks later is costly.',
    misconception:
      'A framework is not a programming language. Next.js is written in and used with JavaScript/TypeScript; Django uses Python. And framework vs library comes down to control: you call a library, but a framework calls you (“inversion of control”).',
    question: 'What is the key difference between a framework and a library?',
    canonicalAnswer:
      'A framework provides the structure of your app and calls your code (it is in control), whereas you call a library when you need it.',
    acceptedAnswers: ['framework calls your code', 'framework calls you', 'inversion of control'],
    keyIdeas: [
      {
        id: 'in-control',
        label: 'the framework is in control and calls your code',
        terms: ['calls your code', 'calls you', 'call your code', 'in control', 'controls', 'in charge',
          'structure', 'skeleton', 'dictates', 'conventions', 'foundation', 'scaffold', 'fill in',
          'decides when', 'rules', 'blueprint', 'inversion of control'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['programming language', 'same thing', 'no difference'],
        feedback:
          'They are different: a framework gives your app its structure and calls your code; you call a library when you need it. Neither is a language.',
      },
    ],
    hint: 'Think about who is in charge: do you call it, or does it call you?',
    relatedConceptIds: ['library', 'programming-language', 'component', 'routing', 'architecture', 'dependency', 'frontend', 'backend'],
    prerequisiteIds: ['library', 'function'],
    deepDive:
      'Frameworks often bundle routing, data fetching, rendering, testing setup and build tooling, and many follow “convention over configuration” (Rails’ motto): if you name and place files the expected way, things just work. Meta-frameworks like Next.js build on React to add routing and server-side rendering.',
    testAnswers: {
      correct: [
        'a framework calls your code, you call a library',
        'the framework gives you the structure and is in control',
        'framework is like a skeleton you fill in',
      ],
      incorrect: ['a framework is a programming language', "they're the same thing"],
    },
  },
];

export default concepts;
