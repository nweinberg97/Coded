import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'large-language-model',
    term: 'Large Language Model (LLM)',
    trackId: 'ai',
    difficulty: 2,
    definition:
      'A large language model is a program trained on enormous amounts of text to predict which piece of text is most likely to come next, which lets it write, summarize, translate and answer questions.',
    plainEnglish:
      'An LLM reads the text you give it and generates a reply one small piece at a time, each time picking a likely next piece based on patterns it absorbed from billions of sentences. It has no lookup table of answers — everything it writes is produced on the fly. "Large" refers to how many learned numbers it contains and how much text it was trained on.',
    analogy:
      'Phone autocomplete with a vastly better sense of context: instead of suggesting the next word in a text message, it can keep going for pages and stay on topic.',
    example:
      'Given "The capital of France is", the model scores every possible next token and " Paris" comes out far ahead. It appends " Paris", then predicts what comes after "The capital of France is Paris" — maybe "." — and so on until it decides to stop.',
    whyItMatters:
      'ChatGPT-style assistants, writing tools, coding assistants and customer-support bots are all built on LLMs. Knowing that the core trick is "predict the next piece of text" explains both their fluency and their failure modes, like confidently stated errors.',
    misconception:
      'An LLM is not a search engine or a database of facts. Unless an app connects it to search or documents, it is not looking anything up — it is generating text from patterns learned in training, which is why it can be fluent and wrong at the same time.',
    question: 'At its core, what is a large language model doing when it writes a reply?',
    canonicalAnswer:
      'It is predicting the most likely next token (piece of text), over and over, based on patterns learned from huge amounts of text.',
    acceptedAnswers: ['predicting the next word', 'predicts the next token', 'guessing the next word'],
    keyIdeas: [
      {
        id: 'predict-next',
        label: 'predicting the next piece of text',
        terms: [
          'predict', 'next word', 'next token', 'guess next', 'guesses what comes next',
          'what comes next', 'next piece', 'autocomplete', 'complete the text', 'continue the text',
          'likely word', 'most likely', 'probable', 'probability',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['search the internet', 'searches the web', 'looks up the answer', 'database of answers', 'stored answers'],
        feedback:
          'An LLM on its own is not looking anything up. It generates text by predicting likely next tokens from patterns learned during training.',
      },
      {
        terms: ['understands like a human', 'thinks like a person', 'conscious'],
        feedback:
          'That gives it too much credit. Mechanically, it is predicting which piece of text is likely to come next.',
      },
    ],
    hint: 'Think of autocomplete on your phone. What is it doing, one step at a time?',
    relatedConceptIds: ['llm-token', 'prompt', 'training', 'inference', 'model-weights', 'hallucination', 'context-window'],
    prerequisiteIds: ['algorithm'],
    deepDive:
      'Most modern LLMs use the "transformer" architecture, which lets every token in the input weigh how relevant every other token is when predicting the next one. Chat assistants are LLMs that were further trained on example conversations and human feedback so they follow instructions instead of just continuing text.',
    testAnswers: {
      correct: [
        'guessing the next word over and over',
        'it predicts what word comes next',
        'basically super autocomplete',
        'picks the most likely next token each time',
      ],
      incorrect: ['it searches the internet for the answer', 'it has a database of answers it looks through'],
    },
  },
  {
    id: 'llm-token',
    term: 'Token (LLM)',
    trackId: 'ai',
    difficulty: 2,
    definition:
      'A token is the small chunk of text — a whole word, part of a word, a space-plus-word, or a punctuation mark — that a language model reads and writes as a single unit.',
    plainEnglish:
      'Language models do not see letters or whole sentences; they see text chopped into tokens, each mapped to an ID number. Common words are usually one token, while rare or long words get split into several pieces. Context limits, speed and pricing are all measured in tokens.',
    analogy:
      'Like LEGO bricks for text: the model builds every sentence out of a fixed set of a few tens of thousands of standard pieces, some big (a whole common word) and some small (a fragment).',
    example:
      '"I love pizza!" is roughly 4 tokens: "I", " love", " pizza", "!". A rarer word like "unbelievability" might split into "un", "belie", "v", "ability". A common rule of thumb for English: 1 token ≈ 4 characters, so 1,000 words ≈ 1,300 tokens.',
    whyItMatters:
      'AI APIs charge per token (input and output counted separately), context windows are sized in tokens, and responses are capped by token limits. Estimating tokens is how teams budget AI features and why long documents can be expensive or get cut off.',
    misconception:
      'An LLM token is unrelated to an auth token. An auth token is a credential that proves who you are to a server; an LLM token is just a piece of text. They share a word, nothing else. Also, tokens are not the same as words — one word can be several tokens.',
    question: 'What is a "token" to a language model?',
    canonicalAnswer:
      'A small chunk of text — a word or a piece of a word, or punctuation — that the model reads and generates as one unit.',
    acceptedAnswers: ['a piece of a word', 'a chunk of text', 'part of a word'],
    keyIdeas: [
      {
        id: 'text-chunk',
        label: 'a chunk of text (word or part of a word)',
        terms: [
          'piece of text', 'chunk of text', 'bit of text', 'part of word', 'piece of word', 'word piece',
          'subword', 'fragment', 'chunk', 'piece', 'few characters', 'syllable', 'word or part',
          'unit of text', 'small part of',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['password', 'login', 'credential', 'authenticat', 'proves who you are', 'access key', 'api key'],
        feedback:
          'That describes an auth token or key — a credential. An LLM token is just a chunk of text the model reads or writes.',
      },
      {
        terms: ['crypto', 'coin', 'cryptocurrency'],
        feedback: 'Not a crypto token. To a language model, a token is a small chunk of text.',
      },
    ],
    hint: 'The model never sees whole sentences or individual letters. What size of text does it work with?',
    relatedConceptIds: ['large-language-model', 'context-window', 'api-inference', 'auth-token', 'string', 'embedding'],
    prerequisiteIds: ['large-language-model', 'string'],
    deepDive:
      'Tokenizers are built with algorithms like byte-pair encoding, which start from bytes and repeatedly merge the most frequent pairs into new tokens. Because vocabularies are learned mostly from English-heavy data, the same sentence in other languages often costs more tokens — and models can struggle with letter-level tasks (like counting the r\'s in a word) because they never see individual letters.',
    testAnswers: {
      correct: [
        'a piece of a word',
        'a chunk of text the ai reads',
        'like a word or part of a word',
        'small bits of text, roughly a few characters each',
      ],
      incorrect: ['a password that proves who you are', 'a crypto coin you pay with'],
    },
  },
  {
    id: 'prompt',
    term: 'Prompt (AI)',
    trackId: 'ai',
    difficulty: 1,
    definition:
      'A prompt is the text you give a language model — instructions, a question, examples and any background material — which the model uses as the starting point for its reply.',
    plainEnglish:
      'Everything the model sees before it starts writing is the prompt. That includes what you type, and in most apps also hidden instructions the developer added (a "system prompt") and earlier messages in the conversation. Clearer, more specific prompts usually produce better results.',
    analogy:
      'A brief you hand to a capable freelancer who knows nothing about your company: the more context and the clearer the request, the closer the first draft lands.',
    example:
      'System prompt (hidden, from the app): "You are a support assistant for Acme. Answer in under 100 words." User prompt: "How do I reset my password?" The model receives both, plus the chat history, as one block of text.',
    whyItMatters:
      'Much of building an AI feature is designing prompts: what instructions, examples and data to include. "Prompt engineering" is cheap compared to retraining a model, and it is the first lever teams pull when output quality is off.',
    misconception:
      'A prompt is the input, not the model\'s output. It is also not the "command prompt" in a terminal. And a longer prompt is not automatically better — irrelevant text can distract the model and costs more tokens.',
    question: 'What is a prompt?',
    canonicalAnswer:
      'The text you give the model — your instructions, question and any context — that it uses to generate its reply.',
    acceptedAnswers: ['what you type to the ai', 'the input you give the model', 'instructions you give the ai'],
    keyIdeas: [
      {
        id: 'input',
        label: 'the input/instructions you give the model',
        terms: [
          'input', 'instruction', 'what you type', 'what you send', 'what you give', 'text you give',
          'message', 'question you ask', 'ask the', 'tell the', 'request', 'command', 'query', 'what you write',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['model output', 'ai output', 'answer it gives', 'response it gives', 'what the ai says back', 'what it replies'],
        feedback: 'That is the output. The prompt is what goes in — the text you give the model.',
      },
      {
        terms: ['command line', 'terminal'],
        feedback: 'Different "prompt". Here it means the text you send to an AI model.',
      },
    ],
    hint: 'It is what goes in, not what comes out.',
    relatedConceptIds: ['large-language-model', 'context-window', 'llm-token', 'rag', 'structured-output', 'request-body'],
    prerequisiteIds: ['large-language-model'],
    deepDive:
      'In chat APIs the prompt is a list of messages with roles — system, user, assistant — that the provider formats into one long token sequence. Techniques like giving examples ("few-shot"), asking for step-by-step reasoning, and specifying the output format reliably change results. "Prompt injection" is when untrusted text in the prompt (say, a web page) smuggles in instructions the developer never intended.',
    testAnswers: {
      correct: [
        'what you type into the ai',
        'the instructions you give it',
        'the question or request you send to the model',
      ],
      incorrect: ['the answer the ai gives you', 'the blinking cursor in the terminal'],
    },
  },
  {
    id: 'training',
    term: 'Training',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'Training is the process of building a model by showing it huge amounts of example data and repeatedly adjusting its internal numbers (weights) so its predictions get less wrong.',
    plainEnglish:
      'A model starts as billions of random numbers. During training it reads example text, guesses the next token, is told the right answer, and every weight is nudged slightly so that guess would have been better. Repeat this trillions of times and the numbers end up encoding grammar, facts and reasoning patterns.',
    analogy:
      'Like learning to throw darts blindfolded with a coach calling out "a bit left, a bit higher" after every throw — millions of tiny corrections add up to skill.',
    example:
      'Training snippet: "The cat sat on the ___". The model guesses " roof" with 30% and " mat" with 10%. The real text says " mat", so an algorithm calculates how each weight contributed to the miss and shifts them so " mat" gets a higher score next time. Then on to the next snippet.',
    whyItMatters:
      'Training large models takes weeks on thousands of specialized chips and is done by a small number of labs. Almost every company "using AI" is not training — they are running someone else\'s trained model. A model\'s knowledge also stops at its training cutoff date.',
    misconception:
      'Training is not the same as inference. Training changes the weights and happens once (or periodically) in a lab; inference is using the finished model to answer prompts and does not change it. Chatting with a model does not train it in real time — though a provider may later use logged conversations as future training data, depending on its policy.',
    question: 'What happens to a model during training?',
    canonicalAnswer:
      'It is shown huge amounts of example data, and its internal numbers (weights) are adjusted again and again to make its predictions less wrong.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'data',
        label: 'learning from lots of example data',
        terms: [
          'data', 'examples', 'example text', 'text', 'dataset', 'books', 'articles', 'documents',
          'internet', 'information', 'reads a lot', 'sentences',
        ],
      },
      {
        id: 'adjust',
        label: 'adjusting its internal numbers/weights',
        terms: [
          'adjust', 'weights', 'parameters', 'tweak', 'tune', 'nudge', 'update', 'learn', 'patterns',
          'correct its mistakes', 'errors', 'improve', 'get better',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['answers questions', 'answers your questions', 'responds to users', 'replies to prompts', 'chats with users'],
        feedback:
          'That is inference — using the finished model. Training is the earlier phase where the model learns from data and its weights get adjusted.',
      },
    ],
    hint: 'Two things are involved: what the model is shown, and what changes inside it.',
    relatedConceptIds: ['model-weights', 'inference', 'large-language-model', 'evaluation', 'algorithm'],
    prerequisiteIds: ['large-language-model'],
    deepDive:
      'Training an LLM usually has stages: pre-training (predict the next token on a vast text corpus), then fine-tuning on curated examples of good answers, then preference training where humans or AI judges rank responses. "Fine-tuning" can also mean a company taking an existing model and training it a bit more on its own examples — far cheaper than training from scratch.',
    testAnswers: {
      correct: [
        'it reads tons of text and adjusts its weights',
        'it learns patterns from lots of data',
        'feed it examples and tweak the numbers until it gets better',
      ],
      partial: ['it reads a ton of text', 'its parameters get adjusted'],
      incorrect: ['the model answers your questions', 'it chats with users'],
    },
  },
  {
    id: 'model-weights',
    term: 'Model Weights',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'Model weights (also called parameters) are the billions of numbers learned during training that determine how a model turns input into output — together they are the model.',
    plainEnglish:
      'Under the hood a model is a giant math formula, and the weights are the numbers plugged into it. Training is the process of finding good values for those numbers. Once trained, the weights are saved as files (often many gigabytes), and anyone with those files and the right software can run the model.',
    analogy:
      'Like the settings on a huge mixing desk with billions of knobs. Training is a sound engineer turning each knob until the output sounds right; the weights are the final positions of every knob, written down.',
    example:
      'A weights file is literally a long list of decimals like 0.0213, -1.442, 0.0007 … arranged in big grids (matrices). A model with 7 billion parameters stored at 2 bytes each is about 14 GB on disk. No sentence from the training data is stored there as readable text.',
    whyItMatters:
      'Weights are the valuable asset an AI lab produces. Whether a company releases them ("open weights") or keeps them on its servers decides whether you can run the model yourself or only through their API.',
    misconception:
      'The weights are not the chat app. ChatGPT-style products are apps — interface, history, safety filters, tools — wrapped around a model; the weights are just the learned numbers inside. Weights are also not a compressed copy of the internet you can search; knowledge is smeared across billions of numbers.',
    question: 'What are a model\'s weights?',
    canonicalAnswer:
      'The huge set of numbers (parameters) the model learned during training; they encode what it knows and determine its output.',
    acceptedAnswers: ['learned parameters', 'the numbers the model learned'],
    keyIdeas: [
      {
        id: 'numbers',
        label: 'a huge set of numbers/parameters',
        terms: ['numbers', 'numeric', 'values', 'parameters', 'billions', 'decimals', 'matrix', 'matrices', 'math'],
      },
      {
        id: 'learned',
        label: 'learned during training',
        terms: [
          'learned', 'training', 'trained', 'knowledge', 'what it knows', 'patterns', 'encode',
          'adjusted', 'tuned', 'captures',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['how heavy', 'kilograms', 'pounds', 'file size'],
        feedback: 'Not physical weight. Weights are the learned numbers inside the model.',
      },
      {
        terms: ['the app', 'chat interface', 'user interface', 'website'],
        feedback: 'That is the app wrapped around the model. The weights are the learned numbers inside the model itself.',
      },
      {
        terms: ['copy of the internet', 'stored text', 'saved sentences', 'database of text'],
        feedback: 'The training text is not stored as text. It shaped billions of numbers — the weights.',
      },
    ],
    hint: 'Training produces something. It is not text — what is it made of?',
    relatedConceptIds: ['training', 'inference', 'open-source-model', 'local-inference', 'large-language-model', 'number'],
    prerequisiteIds: ['training'],
    deepDive:
      'Each weight controls how strongly one artificial "neuron" influences another. "Quantization" stores weights with fewer bits (e.g. 4 instead of 16), shrinking the file and memory needed by roughly 4× at a small cost in quality — this is a big reason capable models can run on laptops.',
    testAnswers: {
      correct: [
        'the numbers the model learned during training',
        'billions of learned parameters',
        'the values it adjusted while training that hold its knowledge',
      ],
      partial: ['just a giant bunch of numbers', 'what it learned'],
      incorrect: ['how heavy the model file is in kilograms', 'the chat interface you type into'],
    },
  },
  {
    id: 'inference',
    term: 'Inference',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'Inference is running an already-trained model on new input to produce output — for example, sending a prompt and getting a reply.',
    plainEnglish:
      'Every time you ask an AI something, the model performs inference: it pushes your input through its fixed weights and generates a result. Nothing is learned in the process; the weights stay the same. Inference happens millions of times a day, so its speed and cost matter more to most products than training does.',
    analogy:
      'Training is a chef spending years in culinary school; inference is the chef cooking your dinner tonight. Cooking does not rewrite what they learned.',
    example:
      'You send "Summarize this email in one line" plus the email text. The provider\'s servers run the model token by token — maybe 50 tokens per second — and stream back "Client wants the launch moved to Friday." Its weights are identical before and after.',
    whyItMatters:
      'AI pricing, speed ("latency") and hardware needs are mostly inference concerns. When a team says "inference costs are too high", they mean running the model for users is expensive, and they might switch to a smaller model, cache results, or shorten prompts.',
    misconception:
      'Inference is not training. Training adjusts the weights using huge datasets; inference uses the frozen weights to answer. Any "memory" a chatbot seems to have comes from the app re-sending past text in the prompt, not from the model learning during your chat. It also has nothing to do with the everyday meaning of "inferring" a logical conclusion.',
    question: 'What is inference?',
    canonicalAnswer:
      'Running an already-trained model on new input to generate an output, like answering a prompt — the weights do not change.',
    acceptedAnswers: ['using a trained model', 'running the trained model', 'when the model answers a prompt'],
    keyIdeas: [
      {
        id: 'run-model',
        label: 'running the trained model to produce output',
        terms: [
          'run', 'running', 'runs', 'generate', 'produce', 'output', 'answer', 'respond', 'reply',
          'predict', 'apply the model', 'when you ask', 'trained model', 'new input',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['learns from data', 'learning from data', 'adjusts weights', 'adjusting weights', 'updates weights', 'updating weights', 'gets trained'],
        feedback:
          'That is training. Inference is using the finished model to produce outputs — its weights stay fixed.',
      },
      {
        terms: ['logical conclusion', 'deduction', 'deduce'],
        feedback: 'That is the everyday meaning. In AI, inference means running a trained model to get an output.',
      },
    ],
    hint: 'It is what happens after training is finished, every time someone uses the model.',
    relatedConceptIds: ['training', 'model-weights', 'api-inference', 'local-inference', 'latency', 'large-language-model'],
    prerequisiteIds: ['training', 'model-weights'],
    deepDive:
      'LLM inference has two phases: reading the whole prompt at once ("prefill"), then generating output one token at a time ("decode"). Output tokens are slower and usually priced higher than input tokens for this reason. Providers speed things up with batching many users together, caching repeated prompt prefixes, and specialized chips.',
    testAnswers: {
      correct: [
        'using the trained model to get an answer',
        'when the model runs on your prompt and generates a reply',
        'running the model on new input',
      ],
      incorrect: ['when the model learns from data', 'drawing a logical conclusion from evidence'],
    },
  },
  {
    id: 'context-window',
    term: 'Context Window',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'A context window is the maximum number of tokens a model can take into account at once — the prompt, the conversation so far and its own reply combined.',
    plainEnglish:
      'A model can only "see" a fixed amount of text per request. Everything it needs — instructions, documents, earlier messages — must fit inside that limit, measured in tokens. When a conversation outgrows it, the app has to drop or summarize older parts, and the model loses access to them.',
    analogy:
      'A desk of fixed size: you can spread out only so many pages at once. To add a new page when it is full, something else has to come off the desk.',
    example:
      'If a model has a 128,000-token window and you paste a 100,000-token contract, only about 28,000 tokens remain for instructions, chat history and the answer. Paste a second contract and the request is rejected or truncated.',
    whyItMatters:
      'Context limits decide whether you can hand a model a whole codebase or book, or must use tricks like RAG to feed in only the relevant bits. Bigger contexts also cost more per request, since you pay for every input token every time.',
    misconception:
      'A context window is not long-term memory. The model remembers nothing between requests; chat apps re-send the conversation each time, and "memory" features save notes that get inserted into future prompts. Fitting something in the window also does not guarantee the model pays equal attention to all of it — details in the middle of very long inputs can get overlooked.',
    question: 'What is a model\'s context window?',
    canonicalAnswer:
      'The maximum amount of text, measured in tokens, that the model can take in and consider at one time — prompt, history and reply together.',
    acceptedAnswers: ['how much text the model can see at once', 'max tokens it can handle at once'],
    keyIdeas: [
      {
        id: 'limit',
        label: 'a maximum/limit',
        terms: ['maximum', 'max', 'limit', 'much', 'amount', 'size', 'capacity', 'cap', 'most', 'fixed'],
      },
      {
        id: 'seen-at-once',
        label: 'the text/tokens it can consider at once',
        terms: [
          'tokens', 'text', 'at once', 'at one time', 'consider', 'see', 'read', 'conversation',
          'input', 'working memory', 'words', 'look at', 'handle', 'process',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['remembers forever', 'long term memory', 'long-term memory', 'permanent memory', 'remembers past conversations', 'remembers everything'],
        feedback:
          'That is a common mix-up. The context window is a per-request limit on how much text the model can consider — it is not lasting memory.',
      },
      {
        terms: ['browser window', 'pop up', 'popup', 'chat box'],
        feedback: 'Not a window on screen. It is the limit on how much text the model can consider at once.',
      },
    ],
    hint: 'It is measured in tokens, and everything has to fit inside it.',
    relatedConceptIds: ['llm-token', 'prompt', 'rag', 'large-language-model', 'session', 'cache'],
    prerequisiteIds: ['llm-token', 'prompt'],
    deepDive:
      'The underlying cost of attention grows quickly with input length, which is why long-context requests are slower and pricier. "Prompt caching" lets providers reuse the work for an identical prefix (like a long system prompt) across requests, cutting cost and latency.',
    testAnswers: {
      correct: [
        'how much text the ai can look at at once',
        'the max number of tokens it can handle',
        'the limit on how much of the conversation it can see',
      ],
      partial: ['its a limit', 'all the text it reads'],
      incorrect: ['it remembers all your past conversations', 'the pop up chat box on the site'],
    },
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    trackId: 'ai',
    difficulty: 2,
    definition:
      'A hallucination is when a model generates information that is false or made up — a fake fact, quote, citation or API — while presenting it as confidently as true information.',
    plainEnglish:
      'Because a language model writes whatever text is most plausible, it can produce something that sounds exactly right but is not. It does not "know" it is wrong; plausible and true just happen to diverge. Hallucinations are most likely on obscure topics, precise details (dates, numbers, names) and questions with no good answer.',
    analogy:
      'A very fluent person at a dinner party who never says "I don\'t know" — they fill gaps with a confident, reasonable-sounding guess.',
    example:
      'Asked for sources on a niche topic, a model returns "Smith & Lee (2019), Journal of Urban Data, 14(2): 45–61" — correctly formatted, plausible authors, and the paper does not exist. Or it suggests calling a function `stripe.refunds.reverseAll()` that no library has ever had.',
    whyItMatters:
      'Hallucinations are the main reason AI output needs verification in legal, medical, financial and coding work. Products reduce them by grounding answers in real documents (RAG), asking for citations that can be checked, and running evaluations.',
    misconception:
      'A hallucination is not a bug in the usual sense. A bug is code doing something its programmer did not intend, and it can be found and fixed in the source. Hallucination is a side effect of how the model generates text — the system is working as designed, producing plausible text that happens to be false. It can be reduced, not patched out.',
    question: 'What is an AI hallucination?',
    canonicalAnswer:
      'When the model produces false or made-up information but presents it confidently, as if it were true.',
    acceptedAnswers: ['makes stuff up', 'makes things up', 'confidently wrong'],
    keyIdeas: [
      {
        id: 'false',
        label: 'false or made-up information',
        terms: [
          'made up', 'makes up', 'make up', 'false', 'wrong', 'incorrect', 'fake', 'invent', 'fabricat',
          'untrue', 'inaccurate', 'nonexistent', 'doesnt exist', 'lie', 'lies', 'bogus',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['bug in the code', 'crash', 'crashes', 'glitch', 'virus'],
        feedback:
          'It is not a crash or code bug. A hallucination is the model generating plausible-sounding information that is false.',
      },
      {
        terms: ['sees things', 'seeing images', 'imagines pictures', 'visual'],
        feedback: 'Not literal visions. It means the model states made-up information as if it were true.',
      },
    ],
    hint: 'The answer sounds great. What is wrong with it?',
    relatedConceptIds: ['large-language-model', 'rag', 'evaluation', 'debugging', 'error'],
    prerequisiteIds: ['large-language-model'],
    deepDive:
      'Training rewards producing likely text, and confident-sounding answers are common in training data, so models learn to answer rather than abstain. Mitigations include grounding (RAG), letting models search, asking them to cite and then checking citations, lowering "temperature" (randomness), and training models to say "I\'m not sure".',
    testAnswers: {
      correct: [
        'when the ai makes stuff up',
        'it confidently gives you false info',
        'the model invents facts that sound real',
        'when it says something wrong like its true',
      ],
      incorrect: ['a bug in the code that crashes the app', 'when the ai sees images that are not there'],
    },
  },
  {
    id: 'embedding',
    term: 'Embedding',
    trackId: 'ai',
    difficulty: 4,
    definition:
      'An embedding is a list of numbers (a vector) that represents the meaning of a piece of text, image or other data, so that items with similar meanings get similar numbers.',
    plainEnglish:
      'An embedding model reads some text and outputs a fixed-length list of numbers — often hundreds or thousands long. Each list is like a point on a map of meaning: "puppy" and "young dog" land close together, "tax return" lands far away. Computers can then compare meaning by measuring distance between lists.',
    analogy:
      'Like GPS coordinates for ideas. Two cafés on the same street have nearly the same coordinates; two sentences that mean the same thing have nearly the same embedding.',
    example:
      '"How do I reset my password?" → [0.021, -0.183, 0.447, …, 0.090] (say 1,024 numbers). "I forgot my login" → [0.019, -0.170, 0.431, …] — very close. "Best pizza in town" → [-0.302, 0.255, -0.011, …] — far away.',
    whyItMatters:
      'Embeddings power semantic search ("find docs about refunds" even when they say "money back"), recommendations, duplicate detection, clustering of feedback, and RAG. They are cheap to compute compared to running a chat model.',
    misconception:
      'An embedding is not the text itself and is not a compressed copy you can read back — it is a numeric fingerprint of meaning, and you cannot reliably reconstruct the exact sentence from it. It is also unrelated to "embedding" a video or widget in a web page.',
    question: 'What is an embedding?',
    canonicalAnswer:
      'A list of numbers (a vector) that represents the meaning of some text, so that similar meanings end up close together.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'numbers',
        label: 'a list of numbers (vector)',
        terms: ['numbers', 'vector', 'numeric', 'coordinates', 'array', 'digits', 'list of values', 'point in space'],
      },
      {
        id: 'meaning',
        label: 'capturing meaning / similarity',
        terms: [
          'meaning', 'similar', 'semantic', 'close', 'closer', 'nearby', 'related', 'what it means',
          'sense', 'concept', 'compare',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['embed a video', 'iframe', 'embed code', 'paste into a website', 'put on a webpage'],
        feedback: 'That is embedding content in a web page. In AI, an embedding is a list of numbers representing meaning.',
      },
      {
        terms: ['compress', 'zip', 'encrypt'],
        feedback: 'It is not compression or encryption — you cannot get the original text back. It is a numeric representation of meaning.',
      },
    ],
    hint: 'It turns words into something a computer can measure distance between.',
    relatedConceptIds: ['vector-database', 'rag', 'llm-token', 'array', 'number', 'index'],
    prerequisiteIds: ['array', 'large-language-model'],
    deepDive:
      'Similarity is usually measured with "cosine similarity" — roughly the angle between two vectors. Embeddings from different models are not compatible: if you switch embedding models you must re-embed all your data. Multimodal models can embed images and text into the same space, so a text query can find matching photos.',
    testAnswers: {
      correct: [
        'turning text into numbers that capture its meaning',
        'a vector where similar things end up close together',
        'a list of numbers representing what the words mean',
      ],
      partial: ['a list of numbers', 'something about the meaning of words'],
      incorrect: ['when you embed a video on a website', 'a compressed version of the text'],
    },
  },
  {
    id: 'vector-database',
    term: 'Vector Database',
    trackId: 'ai',
    difficulty: 4,
    definition:
      'A vector database stores embeddings and quickly finds the ones closest to a query embedding, letting you search by similarity of meaning rather than by exact words.',
    plainEnglish:
      'You embed each of your documents (or chunks of them) and save the numbers along with the original text. To search, you embed the question too, and the database returns the stored items whose numbers are nearest — the ones most similar in meaning. Special indexes make this fast even across millions of items.',
    analogy:
      'A librarian who shelves books by what they are about, not by title — ask for "books like this one" and they point to the closest shelf, even if no words match.',
    example:
      'Store 50,000 help-center paragraphs as embeddings. User asks "can I get my money back?" → embed it → the database returns the top 5 nearest chunks, including one titled "Refund policy" that never uses the word "money".',
    whyItMatters:
      'Vector databases are the retrieval engine behind most RAG systems and semantic search features. Many teams do not need a separate product: regular databases like PostgreSQL can store and search vectors with an extension.',
    misconception:
      'A regular database query asks for exact matches ("WHERE status = \'paid\'"), and keyword search matches words. A vector database answers "what is most similar to this?" — results are ranked by closeness, and it will always return its nearest neighbors even when nothing is truly relevant. It is often used alongside a normal database, not instead of one.',
    question: 'What does a vector database let you search by?',
    canonicalAnswer:
      'By similarity of meaning — it finds the stored embeddings closest to your query\'s embedding, not exact keyword matches.',
    acceptedAnswers: ['similarity', 'meaning'],
    keyIdeas: [
      {
        id: 'similarity',
        label: 'similarity of meaning',
        terms: [
          'similar', 'meaning', 'semantic', 'closest', 'nearest', 'related', 'close', 'resembl',
          'concept', 'what it means', 'context', 'relevance',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['by exact keyword', 'by keyword', 'by exact match', 'by row id', 'by primary key', 'alphabetical'],
        feedback:
          'That is how regular database or keyword search works. A vector database finds items closest in meaning to your query.',
      },
    ],
    hint: 'It compares embeddings. What do embeddings capture?',
    relatedConceptIds: ['embedding', 'rag', 'database', 'index', 'query', 'postgresql', 'nosql'],
    prerequisiteIds: ['embedding', 'database'],
    deepDive:
      'Comparing a query against every stored vector is too slow at scale, so vector indexes (such as HNSW graphs) find "approximately nearest" neighbors very quickly, trading a little accuracy for big speed. Good systems often combine vector search with keyword search ("hybrid search") and filters like date or customer ID.',
    testAnswers: {
      correct: [
        'by meaning instead of exact words',
        'finds stuff that is similar to what you search',
        'searches for the closest embeddings to your question',
      ],
      incorrect: ['by exact keyword match', 'by the row id'],
    },
  },
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    trackId: 'ai',
    difficulty: 4,
    definition:
      'RAG is a technique where an app first retrieves relevant documents for a question and inserts them into the model\'s prompt, so the answer is based on that material rather than only on what the model learned in training.',
    plainEnglish:
      'Models do not know your company\'s documents or anything after their training cutoff. With RAG, the app searches your data for passages relevant to the question, pastes them into the prompt, and tells the model to answer using them. The model itself is unchanged; it just gets better source material each time.',
    analogy:
      'An open-book exam: instead of answering from memory, the student is handed the relevant pages first and answers from them.',
    example:
      '1) User asks "What\'s our parental leave policy?" 2) The app embeds the question and queries a vector database. 3) It gets back the 3 most relevant chunks of the HR handbook. 4) Prompt sent: "Answer using only these excerpts: [chunks]. Question: What\'s our parental leave policy?" 5) The model answers and cites "Handbook §4.2".',
    whyItMatters:
      'RAG is the standard way to build "chat with your documents", support bots and internal knowledge assistants. It keeps answers current (update the documents, not the model), allows citations, and reduces hallucinations.',
    misconception:
      'RAG is not fine-tuning. Fine-tuning changes the model\'s weights by training it on examples — slow, costly, and better for teaching style or format. RAG leaves the weights untouched and supplies facts in the prompt at question time. RAG also does not guarantee correctness: if retrieval finds the wrong passages, the answer will be wrong.',
    question: 'In RAG, what happens before the model writes its answer?',
    canonicalAnswer:
      'The app retrieves relevant documents or passages for the question and adds them to the prompt as context for the model.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'retrieve',
        label: 'searching/retrieving relevant information',
        terms: ['retriev', 'search', 'look up', 'looks up', 'fetch', 'find', 'pull', 'grab', 'query', 'gather', 'get relevant'],
      },
      {
        id: 'add-to-prompt',
        label: 'adding it to the prompt as context',
        terms: [
          'add to prompt', 'adds them', 'add them', 'into the prompt', 'in the prompt', 'context', 'prompt',
          'feed', 'paste', 'insert', 'include', 'give model', 'gives it to', 'passes', 'hand',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['retrain', 'fine tune', 'fine-tune', 'fine-tuned', 'fine tuned', 'update weights', 'change weights', 'adjust weights', 'changes its weights'],
        feedback:
          'That is fine-tuning. RAG does not change the model — it retrieves relevant text and puts it in the prompt.',
      },
    ],
    hint: 'R = retrieval, A = augmented. What is retrieved, and where does it go?',
    relatedConceptIds: ['vector-database', 'embedding', 'prompt', 'context-window', 'hallucination', 'query'],
    prerequisiteIds: ['embedding', 'vector-database', 'prompt'],
    deepDive:
      'Most RAG quality problems are retrieval problems: documents split into chunks that are too big or small, poor search, or missing data. Teams tune chunking, mix keyword and vector search, "rerank" results with a second model, and evaluate retrieval separately from answer quality. Retrieval does not have to use vectors at all — plain keyword search or a SQL query also counts.',
    testAnswers: {
      correct: [
        'it looks up relevant docs and adds them to the prompt',
        'finds the right info and feeds it to the model as context',
        'searches your documents and pastes the results into the prompt',
      ],
      partial: ['it searches your documents', 'extra context goes in the prompt'],
      incorrect: ['the model gets fine-tuned on your data', 'they retrain the model on your files'],
    },
  },
  {
    id: 'structured-output',
    term: 'Structured Output',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'Structured output is when a model is made to return data in a strict, machine-readable format — typically JSON matching a schema — instead of free-form prose.',
    plainEnglish:
      'Software cannot reliably read a chatty paragraph, but it can read JSON with known fields. With structured output, the developer supplies a schema ("give me name, email, and a priority of low, medium or high") and the model\'s reply is constrained to fit it. Code can then use the result directly.',
    analogy:
      'Like asking someone to fill in a form with labeled boxes instead of writing you a letter — far easier to file and process.',
    example:
      'Input: an angry support email. Schema: {"sentiment": "positive"|"neutral"|"negative", "product": string, "refund_requested": boolean}. Model output: {"sentiment": "negative", "product": "Pro plan", "refund_requested": true} — which code can route straight to the billing team.',
    whyItMatters:
      'Structured output is what turns an LLM from a chat toy into a component inside real software: extracting data from documents, classifying tickets, filling databases, and powering tool calls. Without it, code breaks whenever the model words things differently.',
    misconception:
      'Structured output is not about pretty formatting like bullet points or Markdown headings — those are for humans. It means a strict format that a program can parse. Asking nicely in the prompt ("reply in JSON") is weaker than a schema-enforced mode, which guarantees valid shape; even then, the values inside can still be wrong.',
    question: 'What does structured output force a model\'s response to follow?',
    canonicalAnswer:
      'A strict, machine-readable format — usually JSON matching a schema with defined fields — so code can parse it reliably.',
    acceptedAnswers: ['a json schema', 'a specific format'],
    keyIdeas: [
      {
        id: 'format',
        label: 'a strict machine-readable format/schema',
        terms: [
          'format', 'schema', 'structure', 'template', 'shape', 'fields', 'json', 'predictable',
          'machine readable', 'specific keys', 'parse', 'xml', 'form',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['bullet points', 'markdown', 'nicely formatted', 'pretty', 'grammar', 'paragraphs', 'headings', 'spelling'],
        feedback:
          'That is formatting for humans. Structured output means a strict machine-readable format, like JSON matching a schema.',
      },
    ],
    hint: 'Think about what a program, not a person, needs in order to read the reply.',
    relatedConceptIds: ['json', 'schema', 'tool-calling', 'api', 'response-body', 'data-type'],
    prerequisiteIds: ['json', 'prompt'],
    deepDive:
      'Schema-enforced modes work by "constrained decoding": at each step the system only lets the model pick tokens that keep the output valid against the schema. Good schemas use enums for fixed choices and keep field names descriptive, since the model reads them as instructions too.',
    challengeId: 'api-inspector',
    testAnswers: {
      correct: [
        'a set format like json',
        'a schema with specific fields',
        'a strict structure that code can read',
      ],
      incorrect: ['nice bullet points and headings', 'correct spelling and grammar'],
    },
  },
  {
    id: 'tool-calling',
    term: 'Tool Calling',
    trackId: 'ai',
    difficulty: 4,
    definition:
      'Tool calling (or function calling) lets a model request that the app run a specific function — by outputting the tool\'s name and arguments in a structured format — and then use the result in its answer.',
    plainEnglish:
      'A model can only produce text, so it cannot check the weather or send an email by itself. The developer describes available tools (name, purpose, parameters); when the model decides one is needed, it outputs a structured request. The app runs the real code, sends the result back to the model, and the model continues.',
    analogy:
      'A manager who cannot leave their desk: they fill in a request slip ("look up order 4821"), an assistant does the legwork and hands back the result, and the manager writes the reply to the customer.',
    example:
      'User: "Do I need an umbrella in Lisbon tomorrow?" Model outputs: {"tool": "get_forecast", "arguments": {"city": "Lisbon", "date": "2026-10-10"}}. The app calls a weather API, gets {"rain_chance": 0.8}, sends that back, and the model replies: "Yes — 80% chance of rain."',
    whyItMatters:
      'Tool calling connects models to real systems — databases, calendars, payment APIs, code execution — and is the foundation of AI agents. It is also where risk lives: an app that blindly runs whatever the model requests can be tricked into harmful actions, so permissions and confirmations matter.',
    misconception:
      'The model never runs anything itself. It only writes a request; the developer\'s code decides whether to execute it. That is also why the app can validate arguments, require user approval, or refuse. A model "having tools" is different from a model being an agent — agents use tools repeatedly in a loop.',
    question: 'In tool calling, what does the model actually produce, and who runs the tool?',
    canonicalAnswer:
      'The model outputs a structured request (which tool, with what arguments, usually as JSON); the app or developer\'s code actually runs the tool and sends the result back.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'request',
        label: 'the model outputs a structured request',
        terms: [
          'request', 'ask', 'asks', 'output', 'json', 'arguments', 'which tool', 'tool name', 'structured',
          'instructions', 'message', 'writes', 'says what', 'function name',
        ],
      },
      {
        id: 'app-runs',
        label: 'the app/code runs the tool',
        terms: [
          'app', 'apps', 'application', 'your code', 'developer', 'program', 'software', 'system',
          'backend', 'server', 'client', 'harness', 'platform',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['model runs', 'model executes', 'runs it itself', 'executes it itself', 'model does it itself', 'ai runs', 'ai executes'],
        feedback:
          'The model cannot run anything — it only outputs a request. The app\'s code decides whether to execute it.',
      },
    ],
    hint: 'A model can only produce text. So who has to do the actual work?',
    relatedConceptIds: ['structured-output', 'agent', 'api', 'function', 'json', 'integration', 'argument'],
    prerequisiteIds: ['structured-output', 'function', 'api'],
    deepDive:
      'Tools are described to the model with a name, a description and a JSON Schema for parameters; the description strongly affects when the model chooses the tool. A single turn may involve several tool calls, sometimes in parallel. Standard protocols now let one tool server be plugged into many different AI apps.',
    testAnswers: {
      correct: [
        'the model outputs json saying which tool to use and the app runs it',
        'it asks for a tool with arguments and your code actually executes it',
        'the ai writes a request, the software does the real work',
      ],
      partial: ['it outputs some json with arguments', 'the app does it'],
      incorrect: ['the model runs the code itself', 'the ai executes the function on its own'],
    },
  },
  {
    id: 'agent',
    term: 'Agent (AI)',
    trackId: 'ai',
    difficulty: 4,
    definition:
      'An AI agent is a system where a model works toward a goal in a loop — choosing actions, using tools, observing the results and deciding the next step — with little or no human input between steps.',
    plainEnglish:
      'A chatbot answers one message and waits. An agent is given a task ("fix this failing test", "book a meeting with Sam") and keeps going: it calls a tool, reads what happened, decides what to do next, and repeats until it thinks the job is done or it gets stuck. The loop, the tools and the autonomy are what make it an agent.',
    analogy:
      'The difference between a reference librarian (answers your question) and a research assistant you send off with an errand (goes, tries things, comes back with the result).',
    example:
      'Task: "Why is the signup test failing?" Loop: run the tests → read error "email undefined" → open signup.js → notice a renamed field → edit the file → run tests again → all pass → report back with a summary of the change.',
    whyItMatters:
      'Agents can take on multi-step work — coding, research, operations — not just answer questions. They also raise new concerns: cost (many model calls per task), reliability (errors compound across steps), and safety (an agent with access to email or production systems can do real damage), so permissions and human checkpoints matter.',
    misconception:
      'An agent is not just a smarter or bigger chatbot — the same model can power either. The difference is the surrounding system: tools, a loop, and permission to act. It is also not the same as tool calling; a chatbot can make one tool call, while an agent chains many calls, choosing each based on the last result.',
    question: 'What makes an AI agent different from a plain chatbot?',
    canonicalAnswer:
      'An agent takes actions using tools and works in a loop toward a goal — observing results and deciding its own next steps — instead of just replying once.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'actions',
        label: 'taking actions with tools',
        terms: [
          'action', 'act', 'tools', 'does things', 'do things', 'execute', 'carry out', 'perform',
          'clicks', 'runs code', 'tasks', 'changes things',
        ],
      },
      {
        id: 'loop',
        label: 'working in a loop / deciding its own next steps',
        terms: [
          'loop', 'multiple steps', 'many steps', 'steps', 'step by step', 'decide', 'own', 'autonom', 'plan',
          'goal', 'repeat', 'keeps going', 'itself', 'independent', 'iterat',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['smarter model', 'bigger model', 'conscious', 'sentient', 'human agent', 'real person', 'customer service rep', 'secret agent'],
        feedback:
          'The difference is not the model or a human — it is the system: an agent uses tools to act, in a loop, deciding its next steps.',
      },
    ],
    hint: 'A chatbot replies once and waits. What does an agent do instead?',
    relatedConceptIds: ['tool-calling', 'large-language-model', 'loop', 'evaluation', 'authorization', 'context-window'],
    prerequisiteIds: ['tool-calling'],
    deepDive:
      'A minimal agent is a while-loop: send the goal and history to the model; if it requests a tool, run it and append the result; repeat until it stops requesting tools. Hard parts include keeping the growing history within the context window, recovering from errors, knowing when to stop, and limiting what the agent is authorized to do.',
    testAnswers: {
      correct: [
        'it takes actions on its own in a loop until the goal is done',
        'an agent can use tools and decide its next steps by itself',
        'it does things with tools over multiple steps',
      ],
      partial: ['it can use tools', 'it works toward a goal'],
      incorrect: ['it is just a bigger smarter model', 'a real person helping you behind the scenes'],
    },
  },
  {
    id: 'open-source-model',
    term: 'Open-Weights / Open-Source Model',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'An open-weights model is one whose trained weights are published for anyone to download and run; it is fully "open-source" only if the code, training data and recipe are also released under an open license.',
    plainEnglish:
      'Some labs keep their models on their own servers and only let you use them through an API. Others publish the weights file so you can run the model on your own hardware, inspect it, or fine-tune it. Most "open" models are open-weights: you get the finished model, but usually not the data or full process used to create it, and licenses vary.',
    analogy:
      'Open-weights is like getting a finished cake you are allowed to serve and decorate. Open-source in the full sense is getting the cake plus the recipe and the list of where every ingredient came from.',
    example:
      'A team downloads an open-weights model from a model hub (several GB of weight files plus a config), runs it on their own GPU server with an open-source inference tool, and fine-tunes it on 5,000 of their support tickets — no data ever leaves their infrastructure.',
    whyItMatters:
      'Open-weights models give control: privacy (data stays in-house), no per-token API bills, the ability to customize, and no risk of a vendor changing or retiring the model. The trade-off is that you run and maintain the infrastructure, and the strongest models are often closed.',
    misconception:
      'Open-weights is not the same as open-source. Open-source software means the source code is available under a license allowing use, modification and sharing; for AI, the closest equivalent would include training data and code. Many "open" models release only weights, sometimes with licenses that restrict commercial use or large companies. "Open" also does not mean free to run — you still pay for hardware.',
    question: 'What do you actually get with an "open-weights" model?',
    canonicalAnswer:
      'The trained model weights themselves, which you can download and run on your own hardware (and often fine-tune) — though usually not the training data.',
    acceptedAnswers: ['download the weights', 'the weights file'],
    keyIdeas: [
      {
        id: 'download-run',
        label: 'the downloadable weights you can run yourself',
        terms: [
          'download', 'weights', 'model file', 'run yourself', 'run it yourself', 'locally', 'own computer',
          'own hardware', 'own machine', 'own server', 'self-host', 'self host', 'parameters', 'host it',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['training data', 'training dataset', 'all the data', 'everything used to build'],
        feedback:
          'Usually not — open-weights releases typically include only the trained weights, not the training data. That gap is why open-weights is not the same as fully open-source.',
      },
    ],
    hint: 'Think about what training produces, and where you can run it.',
    relatedConceptIds: ['model-weights', 'local-inference', 'api-inference', 'source-code', 'hosting', 'training'],
    prerequisiteIds: ['model-weights'],
    deepDive:
      'Model hubs host thousands of open-weights models and fine-tuned variants. Licenses range from permissive (Apache 2.0, MIT) to custom ones with usage restrictions; check before shipping a product. Smaller open models can be quantized to run on laptops and phones.',
    testAnswers: {
      correct: [
        'you can download the model weights and run it yourself',
        'the actual trained model file to run on your own hardware',
        'you get the weights but usually not the training data',
      ],
      incorrect: ['you get the full training dataset', 'a free chat website'],
    },
  },
  {
    id: 'local-inference',
    term: 'Local Inference',
    trackId: 'ai',
    difficulty: 3,
    definition:
      'Local inference means running a model on hardware you control — your laptop, phone or company servers — instead of sending requests to an AI provider over the internet.',
    plainEnglish:
      'If you have a model\'s weights and enough memory, software can load the model and generate answers right on your machine. Your prompts never go to an outside company, it can work offline, and there is no per-request bill. The catch: your hardware limits how big and fast a model you can run.',
    analogy:
      'Cooking at home instead of ordering delivery: more private and no delivery fee, but you need the kitchen, and you will not match every restaurant dish.',
    example:
      'A lawyer installs a desktop app, downloads a 4-bit quantized open-weights model (about 5 GB), and summarizes confidential contracts entirely on their laptop — Wi-Fi off — at maybe 20–40 tokens per second.',
    whyItMatters:
      'Local inference matters for privacy-sensitive data (health, legal, internal code), offline use, predictable costs at high volume, and features built into devices like phones. Many products mix both: a small local model for quick tasks and a big API model for hard ones.',
    misconception:
      'Local does not mean "a nearby data center" or "my cloud account" in the casual sense — it means the model runs on hardware you control. And local is not automatically faster or better: a big hosted model on specialized chips may be both quicker and smarter than what fits on a laptop.',
    question: 'What does running a model locally mean, and what is a main benefit?',
    canonicalAnswer:
      'The model runs on your own device or servers instead of a provider\'s cloud, so your data stays private (and it can work offline with no per-request cost).',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'own-hardware',
        label: 'running on your own device/hardware',
        terms: [
          'own computer', 'your computer', 'own device', 'your device', 'laptop', 'phone', 'own hardware',
          'own machine', 'your machine', 'own servers', 'locally', 'offline', 'desktop', 'on device',
        ],
      },
      {
        id: 'benefit',
        label: 'a benefit like privacy, offline use or cost',
        terms: [
          'privacy', 'private', 'data stays', 'stays on', 'offline', 'free', 'cost', 'cheaper', 'control',
          'secure', 'security', 'confidential', 'fees',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['in your city', 'nearby data center', 'local area', 'smarter', 'more powerful', 'always faster'],
        feedback:
          'Local means on hardware you control, and it is not automatically smarter or faster. The main benefits are privacy, offline use and cost control.',
      },
    ],
    hint: 'Where does the model run, and what never has to leave that place?',
    relatedConceptIds: ['inference', 'api-inference', 'open-source-model', 'model-weights', 'latency', 'encryption'],
    prerequisiteIds: ['inference', 'open-source-model'],
    deepDive:
      'The main limit is memory: the weights must fit in RAM or GPU memory, so model size and quantization level decide what is feasible. Local runners often expose an API in the same shape as cloud providers, so apps can switch between local and hosted models by changing one URL.',
    testAnswers: {
      correct: [
        'it runs on your own laptop so your data stays private',
        'the model is on your computer, so its more private and works offline',
        'running it on your own machine, which is cheaper and gives you control',
      ],
      partial: ['it runs on your own laptop', 'better privacy'],
      incorrect: ['it uses a data center in your city', 'the model gets smarter'],
    },
  },
  {
    id: 'api-inference',
    term: 'API Inference',
    trackId: 'ai',
    difficulty: 2,
    definition:
      'API inference means your app sends prompts over the internet to an AI provider\'s API, the model runs on the provider\'s servers, and the response is sent back.',
    plainEnglish:
      'Most apps do not run models themselves. They make an HTTP request with the prompt and an API key, the provider runs the model in its data centers, and the reply comes back as JSON — usually billed per token. You get powerful models with zero hardware, in exchange for sending your data to a third party and depending on their uptime and prices.',
    analogy:
      'Using a power company instead of running your own generator: plug in and pay for what you use, but you depend on the grid.',
    example:
      'POST https://api.ai-provider.example/v1/messages with header "Authorization: Bearer sk-…" and body {"model": "some-model", "messages": [{"role": "user", "content": "Write a tagline for a bakery"}]}. Response: {"content": "Fresh from our oven to your morning.", "usage": {"input_tokens": 14, "output_tokens": 9}}.',
    whyItMatters:
      'API inference is how most AI features ship: fast to start, always the latest models, scales automatically. Teams must manage API keys securely, handle rate limits and errors, watch per-token costs, and check the provider\'s data-retention policy.',
    misconception:
      'The app on your phone is not where the model lives — it is a client sending requests. And the API key in the request is a credential (like an auth token), separate from the LLM tokens you are billed for. Different trade-off from local inference: no hardware to manage, but your data leaves your control.',
    question: 'When an app uses a model through an API, where does the model actually run?',
    canonicalAnswer:
      'On the AI provider\'s servers in the cloud — the app sends the prompt over the internet and gets the response back.',
    acceptedAnswers: ['on the providers servers', 'in the cloud'],
    keyIdeas: [
      {
        id: 'provider-servers',
        label: 'on the provider\'s remote servers',
        terms: [
          'provider', 'their servers', 'servers', 'cloud', 'data center', 'datacenter', 'remote',
          'someone elses', 'ai company', 'vendor', 'hosted', 'their computers', 'company',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['own device', 'own computer', 'own phone', 'laptop', 'locally', 'browser', 'own machine', 'inside the app'],
        feedback:
          'With API inference the model does not run on your device — the app sends your prompt to the provider\'s servers, which run it and send back the reply.',
      },
    ],
    hint: 'The app makes a request over the internet. To whose machines?',
    relatedConceptIds: ['api', 'api-key', 'inference', 'local-inference', 'rate-limit', 'server', 'http-post', 'llm-token'],
    prerequisiteIds: ['api', 'inference'],
    deepDive:
      'Responses are usually "streamed" token by token so users see text appear immediately. Providers offer SDKs that wrap the HTTP calls, plus options like batch processing (cheaper, slower) and prompt caching. Because many providers use similar request shapes, apps often add a thin layer so they can switch models or vendors.',
    testAnswers: {
      correct: [
        'on the ai companys servers',
        'in the cloud somewhere',
        'on the providers computers in a data center',
      ],
      incorrect: ['it runs right on your laptop', 'inside the app on your phone'],
    },
  },
  {
    id: 'evaluation',
    term: 'Evaluation (Evals)',
    trackId: 'ai',
    difficulty: 4,
    definition:
      'An evaluation ("eval") is a repeatable test that runs a model or AI feature on a set of example inputs and scores the outputs, to measure quality objectively rather than by gut feel.',
    plainEnglish:
      'Because AI output varies and fails in subtle ways, trying a few prompts by hand is not enough. An eval is a collection of test cases — inputs plus what a good answer looks like — and a way to score each result: exact checks, rules in code, human ratings, or another model acting as judge. Rerun it whenever you change the prompt, model or data to see if things got better or worse.',
    analogy:
      'A standardized exam for your AI feature: same questions every time, scored the same way, so you can compare this term\'s results to last term\'s.',
    example:
      '200 real support questions, each with the facts a correct answer must include. Prompt v1 scores 71% (142/200); after adding RAG, v2 scores 88%. Switching to a cheaper model drops it to 84% — the team decides whether that trade is worth it.',
    whyItMatters:
      'Evals are how teams ship AI responsibly: catching regressions, comparing models and vendors, justifying cost cuts, and proving a feature works before launch. Teams without evals tend to argue about anecdotes.',
    misconception:
      'Evals are related to software tests but differ: a unit test expects one exact result and passes or fails, while AI outputs vary, so evals usually score many cases and track a percentage. Public benchmark leaderboards are evals too, but they rarely reflect your specific use case — your own eval set matters more. Unrelated to the JavaScript eval() function.',
    question: 'What is an eval (evaluation) for an AI feature?',
    canonicalAnswer:
      'A set of test cases you run the model on, scoring the outputs to measure how well it performs — repeatably, not by gut feel.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'test-cases',
        label: 'a set of test cases/examples',
        terms: [
          'test', 'test cases', 'examples', 'set of prompts', 'benchmark', 'dataset', 'questions',
          'scenarios', 'inputs', 'sample', 'cases',
        ],
      },
      {
        id: 'measure',
        label: 'scoring/measuring quality',
        terms: [
          'measure', 'score', 'grade', 'check', 'quality', 'accuracy', 'accurate', 'well', 'performance',
          'compare', 'correct', 'pass', 'expected', 'rate', 'good',
        ],
      },
    ],
    wrongIdeas: [
      {
        terms: ['eval function', 'javascript eval', 'execute a string', 'performance review', 'employee review', 'vibes'],
        feedback:
          'In AI, an eval is a set of test cases run against the model, with each output scored to measure quality.',
      },
    ],
    hint: 'How would you prove — with numbers — that a prompt change made the AI better?',
    relatedConceptIds: ['test', 'unit-test', 'hallucination', 'continuous-integration', 'monitoring', 'training'],
    prerequisiteIds: ['test', 'large-language-model'],
    deepDive:
      'Good eval sets come from real usage, including past failures and edge cases. "LLM-as-judge" scoring is fast but should itself be checked against human ratings. Many teams run evals automatically in CI on every prompt change, and keep monitoring live traffic because real users find new failure modes.',
    testAnswers: {
      correct: [
        'running a set of test prompts and scoring the answers',
        'testing the ai on examples to measure how good it is',
        'a benchmark of questions to check accuracy',
      ],
      partial: ['a bunch of test questions', 'measuring the quality'],
      incorrect: ['the javascript eval function', 'an employee performance review'],
    },
  },
];

export default concepts;
