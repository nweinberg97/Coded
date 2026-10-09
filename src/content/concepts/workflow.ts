import type { Concept } from '../types';

const concepts: Concept[] = [
  {
    id: 'version-control',
    term: 'Version control',
    trackId: 'workflow',
    difficulty: 1,
    definition:
      'Version control is a system that records every change made to a set of files over time, so you can see who changed what, compare versions and go back to any earlier state.',
    plainEnglish:
      'Instead of files named `final_v2_REALLY_final.doc`, version control keeps one copy of the project plus a complete history of every change. Several people can work on the same files at once, and if something breaks you can rewind to yesterday’s working version.',
    analogy:
      'Google Docs’ version history, but for a whole folder of code — with named save points, notes on why each change was made, and the ability to try ideas in parallel copies.',
    example:
      'Running `git log` on a project shows entries like `a1b9f3c  Maya  Oct 8  Fix checkout total rounding`. Running `git diff a1b9f3c~1 a1b9f3c` shows exactly which lines Maya changed.',
    whyItMatters:
      'Every professional software team uses version control. It is the safety net that makes it safe to change code, the record that explains why code looks the way it does, and the basis for code review and automated deployment.',
    misconception:
      'Version control is not the same as backup. A backup copies files; version control records meaningful, labelled changes and lets many people combine their work. Git is the most popular version control system, but the idea is older and broader than Git.',
    question: 'What does version control keep track of?',
    canonicalAnswer:
      'Every change made to the project’s files over time — who made it and when — so you can compare versions or go back to an earlier one.',
    acceptedAnswers: ['history of changes', 'changes to the code', 'changes to files over time'],
    keyIdeas: [
      {
        id: 'changes',
        label: 'changes / history of files',
        terms: ['changes', 'history', 'versions', 'edits', 'modifications', 'revisions',
          'who changed', 'what changed', 'every change', 'over time', 'snapshots'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['website hosting', 'hosts the website', 'runs the app'],
        feedback: 'Version control doesn’t run or host anything. It records the history of changes to files.',
      },
    ],
    hint: 'Think of a document’s full history of edits. What’s being tracked?',
    relatedConceptIds: ['git', 'repository', 'commit', 'branch', 'rollback'],
    prerequisiteIds: ['source-code'],
    deepDive:
      'Older centralized systems (Subversion, Perforce) keep the history on one server. Distributed systems like Git give every developer a full copy of the history, so they can work offline and the project survives any single machine dying.',
    testAnswers: {
      correct: [
        'all the changes to the code over time',
        'the history of who changed what',
        'different versions of your files',
      ],
      incorrect: ['it hosts the website for users', 'how fast the app runs'],
    },
  },
  {
    id: 'git',
    term: 'Git (version control tool)',
    trackId: 'workflow',
    difficulty: 1,
    definition:
      'Git is a free, open-source version control tool that runs on your own computer and records the history of a project as a series of snapshots called commits.',
    plainEnglish:
      'Git is the program almost every developer uses to track changes to code. You tell it "save a snapshot now, with this note", and it keeps every snapshot, lets you branch off to try things and merge work back together. It works entirely on your machine; sharing happens when you sync with a server.',
    analogy:
      'A camera that photographs your whole project folder whenever you ask, writes a caption under each photo and keeps the album forever.',
    example:
      '`git add checkout.js` then `git commit -m "Fix checkout total"` records a snapshot. `git push origin main` sends it to a shared copy on GitHub; `git pull` brings in teammates’ changes.',
    whyItMatters:
      'Git is the industry standard, created by Linus Torvalds in 2005 to manage the Linux kernel. Knowing its vocabulary — commit, branch, merge, push, pull — lets you follow nearly any engineering conversation about code changes.',
    misconception:
      'Git is not GitHub. Git is the tool on your computer that tracks history; GitHub (like GitLab or Bitbucket) is a website that hosts Git repositories online and adds collaboration features like pull requests and issues. You can use Git without GitHub.',
    question: 'What is the difference between Git and GitHub?',
    canonicalAnswer:
      'Git is the version control tool that tracks changes on your computer; GitHub is a website that hosts Git repositories online so people can share and collaborate.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'tool',
        label: 'Git is the tool that tracks changes',
        terms: ['tool', 'program', 'software', 'version control', 'tracks changes', 'track changes',
          'tracks', 'history', 'local', 'your computer', 'command line', 'saves versions'],
      },
      {
        id: 'host',
        label: 'GitHub is a website/service that hosts repos online',
        terms: ['website', 'site', 'online', 'hosts', 'hosting', 'cloud', 'service', 'platform',
          'share', 'collaborate', 'stores repos', 'remote', 'internet'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['same thing', 'no difference'],
        feedback: 'They’re different: Git is the tool on your computer, GitHub is a website that hosts Git repositories.',
      },
    ],
    hint: 'One runs on your computer; the other is a website. Which is which?',
    relatedConceptIds: ['version-control', 'repository', 'commit', 'branch', 'pull-request', 'merge'],
    prerequisiteIds: ['version-control'],
    deepDive:
      'Every commit in Git is identified by a hash (like `a1b9f3c…`) computed from its contents and its parent commit, so history can’t be altered silently. Git stores full snapshots efficiently by reusing unchanged files.',
    testAnswers: {
      correct: [
        'git is the tool that tracks changes, github is the website that hosts it online',
        'git is local version control software and github is a cloud service to share repos',
        'git saves versions on your computer, github is a site where you share them',
      ],
      partial: ['github is a website'],
      incorrect: ['they are the same thing', 'there is no difference really'],
    },
  },
  {
    id: 'repository',
    term: 'Repository (repo)',
    trackId: 'workflow',
    difficulty: 1,
    definition:
      'A repository is a project folder tracked by version control, containing the project’s files together with the full history of every change made to them.',
    plainEnglish:
      'A repo is "the project" as far as Git is concerned: all the code, plus a hidden `.git` folder holding every past version. There’s usually a copy on each developer’s laptop and a shared copy on a server like GitHub.',
    analogy:
      'A library archive for one project: the current editions on the shelves, plus every previous edition stored in the back room with notes on what changed.',
    example:
      '`git clone https://github.com/acme/storefront.git` downloads the `storefront` repository — its folders like `src/` and `tests/`, and its full history — so you can run `git log` offline.',
    whyItMatters:
      'Engineers talk in repos: "it’s in the payments repo", "open an issue on the repo", "give her access to the repo". Access to a repo is effectively access to the product’s source code.',
    misconception:
      'A repository is not just a folder of files and not the same as GitHub. What makes it a repo is the tracked history. GitHub hosts copies of repos; the same repo also lives on each developer’s computer.',
    question: 'What does a Git repository contain?',
    canonicalAnswer:
      'The project’s files plus the complete history of all the changes made to them.',
    acceptedAnswers: ['files and their history', 'the code and its history'],
    keyIdeas: [
      {
        id: 'files',
        label: 'the project’s files / code',
        terms: ['files', 'code', 'project', 'folder', 'source', 'codebase'],
      },
      {
        id: 'history',
        label: 'the history of changes',
        terms: ['history', 'changes', 'versions', 'commits', 'past', 'previous', 'revisions',
          'snapshots', 'every change'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'It’s more than the current files — what else does Git keep in that hidden .git folder?',
    relatedConceptIds: ['git', 'commit', 'branch', 'version-control', 'pull-request'],
    prerequisiteIds: ['git'],
    deepDive:
      'A "remote" is another copy of the repo you sync with (by convention named `origin`). A "monorepo" holds many projects in one repository, as Google does; others keep one repo per service.',
    testAnswers: {
      correct: [
        'all the project files plus the history of changes',
        'the code and every previous version',
        'a project folder with all the commits',
      ],
      partial: ['the project files'],
      incorrect: ['a server that runs the website', 'a database of users'],
    },
  },
  {
    id: 'commit',
    term: 'Commit (git commit)',
    trackId: 'workflow',
    difficulty: 1,
    definition:
      'A commit is a saved snapshot of a repository’s files at a point in time, with a message describing the change, an author and a unique ID.',
    plainEnglish:
      'When you’ve made a meaningful change, you commit it: Git records exactly what the files look like now, who did it and a short note explaining why. The project’s history is a chain of these commits, and you can return to any one.',
    analogy:
      'A save point in a video game, with a label you write yourself: "beat the castle boss". You can always reload from there.',
    example:
      '`git commit -m "Fix checkout total rounding for discounts"` creates commit `3f9e2b1`, recording the changed lines in `cart.js` and `cart.test.js`, the author, and the time.',
    whyItMatters:
      'Commits are the unit of history. Good commit messages explain why code changed months later; small focused commits make bugs easy to trace (`git bisect` can even find which commit broke something) and easy to undo.',
    misconception:
      'Commit is not push. A commit saves a snapshot in your local repository only; nobody else sees it until you push it to a shared remote like GitHub. You can make many commits offline and push them together.',
    question: 'What is a commit in Git?',
    canonicalAnswer:
      'A saved snapshot of the project’s changes at a point in time, with a message describing what changed.',
    acceptedAnswers: ['a save point', 'a saved snapshot'],
    keyIdeas: [
      {
        id: 'snapshot',
        label: 'a saved snapshot / save point of changes',
        terms: ['snapshot', 'save', 'saved', 'record', 'checkpoint', 'save point', 'version',
          'point in time', 'set of changes', 'changes'],
      },
      {
        id: 'message',
        label: 'with a message describing it',
        terms: ['message', 'description', 'note', 'label', 'explain', 'comment', 'describe', 'author',
          'caption'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['upload', 'send to github', 'sends to github', 'push to github', 'share with team',
          'teammates see'],
        feedback: 'That’s pushing. A commit saves a snapshot locally; pushing sends commits to a shared remote like GitHub.',
      },
    ],
    hint: 'Think of a labelled save point in a game.',
    relatedConceptIds: ['git', 'repository', 'branch', 'merge', 'pull-request', 'hashing'],
    prerequisiteIds: ['git', 'repository'],
    deepDive:
      'Before committing, you "stage" changes with `git add`, choosing exactly which edits go into the snapshot. A commit’s ID is a hash of its content and its parent, which is why rewriting old commits changes all later IDs.',
    testAnswers: {
      correct: [
        'a snapshot of your changes with a message',
        'saving your work as a version in git',
        'a save point',
      ],
      incorrect: ['uploading your code to github', 'deleting a file from the project'],
    },
  },
  {
    id: 'branch',
    term: 'Branch (git branch)',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'A branch is an independent line of development in a repository, letting you make commits on a separate copy of the code without affecting the main version until you merge.',
    plainEnglish:
      'Branches let you work on a new feature or fix in isolation. The main branch keeps working for everyone; your branch collects your experimental commits. When the work is ready and reviewed, it gets merged back into main.',
    analogy:
      'A parallel universe for your project: you try out changes there, and only if they work out do you bring them back into the real timeline.',
    example:
      '`git switch -c fix/checkout-total` creates and moves to a new branch. You commit there while `main` stays untouched, then open a pull request to merge `fix/checkout-total` into `main`.',
    whyItMatters:
      'Branches let a whole team work at the same time without overwriting each other, and keep the main branch always deployable. Branch names often show up in tickets and deploy previews ("check it on the feature/new-pricing preview").',
    misconception:
      'A branch is not a full copy of all the files (Git makes branches almost free — a branch is just a pointer to a commit). And creating a branch doesn’t publish anything; it stays local until you push it.',
    question: 'Why do developers create a branch?',
    canonicalAnswer:
      'To work on changes separately from the main code, without affecting it, and merge them back in when they’re ready.',
    acceptedAnswers: ['work on a feature separately', 'work without affecting main',
      'work without breaking main'],
    keyIdeas: [
      {
        id: 'separate',
        label: 'working separately / in isolation',
        terms: ['separate', 'separately', 'isolation', 'isolated', 'parallel', 'own copy',
          'without affecting', 'without breaking', 'safely', 'side', 'independent', 'apart',
          'experiment', 'try out'],
      },
      {
        id: 'main',
        label: 'away from the main code (until merged)',
        terms: ['main', 'master', 'merge', 'production', 'everyone else', 'others', 'stable',
          'original'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['backup', 'back up'],
        feedback: 'A branch isn’t a backup — it’s a separate line of work you can later merge back into main.',
      },
    ],
    hint: 'A parallel timeline for your code. What does it protect?',
    relatedConceptIds: ['merge', 'pull-request', 'commit', 'git', 'continuous-integration'],
    prerequisiteIds: ['commit'],
    deepDive:
      'Common strategies: trunk-based development (short-lived branches merged into main within a day or two) and Git Flow (long-lived develop and release branches). Most modern teams prefer short-lived branches to reduce painful merges.',
    testAnswers: {
      correct: [
        'to work on a feature separately without breaking main',
        'so you can experiment on your own copy',
        'try out changes in parallel then merge them back',
      ],
      incorrect: ['to make a backup of the project', 'to speed up the website'],
    },
  },
  {
    id: 'merge',
    term: 'Merge (git merge)',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'Merging combines the commits from one branch into another, so that the target branch includes both lines of work.',
    plainEnglish:
      'When your feature branch is done, merging brings its changes into main. Git automatically combines edits to different parts of files; if two branches changed the same lines differently, it stops and asks a human to resolve the "merge conflict".',
    analogy:
      'Two editors each revise different chapters of a manuscript, then the changes are combined into one book. If both rewrote the same paragraph, someone has to decide which version wins.',
    example:
      'On `main`, running `git merge fix/checkout-total` adds the fix. If both branches edited line 42 of `cart.js`, Git marks the file with `<<<<<<<`, `=======` and `>>>>>>>` sections showing both versions for you to choose between.',
    whyItMatters:
      'Merging is how separate work becomes the product. Merge conflicts are a normal part of team development; long-lived branches make them worse, which is why teams merge small changes often.',
    misconception:
      'Merge vs rebase: both bring changes together. Merge keeps both histories and adds a merge commit joining them; rebase replays your commits on top of the other branch to create a straight-line history. Also, merging isn’t deploying — merged code still has to be built and deployed.',
    question: 'What does merging do in Git?',
    canonicalAnswer:
      'It combines the changes from one branch into another branch.',
    acceptedAnswers: ['combines branches', 'combines two branches', 'joins branches together',
      'brings changes from one branch into another'],
    keyIdeas: [
      {
        id: 'combine',
        label: 'combining changes',
        terms: ['combine', 'join', 'bring together', 'brings in', 'bring in', 'integrate', 'unite',
          'put together', 'mix', 'add changes', 'apply changes', 'fold'],
      },
      {
        id: 'branches',
        label: 'from one branch into another',
        terms: ['branch', 'branches', 'main', 'master', 'another', 'other', 'two', 'feature'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['delete', 'deploy', 'publish'],
        feedback: 'Merging doesn’t delete or deploy anything — it combines one branch’s changes into another.',
      },
    ],
    hint: 'Your feature branch is finished. How does its work get into main?',
    relatedConceptIds: ['branch', 'pull-request', 'commit', 'git', 'continuous-integration'],
    prerequisiteIds: ['branch'],
    deepDive:
      'A "fast-forward" merge happens when main hasn’t moved since you branched: Git simply moves main’s pointer forward, no merge commit needed. "Squash merge" collapses all a branch’s commits into one tidy commit on main.',
    testAnswers: {
      correct: [
        'combines changes from my branch into main',
        'joins two branches together',
        'brings the feature branch into the main one',
      ],
      partial: ['combines changes'],
      incorrect: ['deploys the code to the server', 'deletes the old branch'],
    },
  },
  {
    id: 'pull-request',
    term: 'Pull request (PR)',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'A pull request is a proposal, made on a platform like GitHub, to merge one branch’s changes into another, where teammates can review, discuss and approve the code before it is merged.',
    plainEnglish:
      'Instead of merging straight into main, you open a pull request: "here are my changes, please review." Teammates read the diff, leave comments, automated tests run, and once approved, the changes are merged.',
    analogy:
      'Submitting an article to an editor: you hand it in, they mark it up, you revise, and only when they approve does it go to print.',
    example:
      'PR #482 "Fix checkout total rounding" proposes merging `fix/checkout-total` into `main`. GitHub shows the changed lines, a reviewer comments "add a test for 0% tax", CI shows a green check, and after approval someone clicks "Squash and merge".',
    whyItMatters:
      'Pull requests are where code quality, knowledge sharing and much team communication happen. As a PM or designer, a PR link is often the best place to see exactly what changed and preview it.',
    misconception:
      'A pull request is not a Git command — it’s a feature of hosting platforms like GitHub (GitLab calls it a "merge request"). And despite the name, you’re asking others to pull your changes in, not pulling something yourself.',
    question: 'What is the purpose of a pull request?',
    canonicalAnswer:
      'To propose merging your branch’s changes so teammates can review and approve the code before it goes into the main branch.',
    acceptedAnswers: ['get code reviewed before merging', 'ask to merge your changes',
      'request a code review'],
    keyIdeas: [
      {
        id: 'review',
        label: 'others review the code',
        terms: ['review', 'feedback', 'approve', 'approval', 'check', 'look over', 'comment',
          'discuss', 'teammates', 'others', 'inspect'],
      },
      {
        id: 'merge',
        label: 'proposing to merge changes',
        terms: ['merge', 'propose', 'proposal', 'request', 'ask', 'main', 'add changes',
          'into main', 'combine'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['download', 'git pull', 'get latest', 'pull latest'],
        feedback: 'That’s `git pull` (downloading changes). A pull request asks teammates to review and merge your changes.',
      },
    ],
    hint: 'Before your branch joins main, who looks at it?',
    relatedConceptIds: ['merge', 'branch', 'git', 'continuous-integration', 'test', 'repository'],
    prerequisiteIds: ['branch', 'merge'],
    deepDive:
      'Teams often protect `main` so changes can only arrive via approved PRs with passing CI checks. Many hosts create preview deployments per PR, so reviewers can click a URL and try the change.',
    testAnswers: {
      correct: [
        'ask teammates to review your code before merging it into main',
        'propose your changes so others can approve them',
        'get feedback on my branch and then merge it',
      ],
      partial: ['so others can review the code'],
      incorrect: ['download the latest code from github', 'to delete a branch'],
    },
  },
  {
    id: 'package-manager',
    term: 'Package manager',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'A package manager is a tool that downloads, installs, updates and tracks the external libraries (packages) a project depends on, including the specific versions required.',
    plainEnglish:
      'Instead of hunting down libraries by hand, you tell the package manager what you need and it fetches them — plus everything they need — from a public registry. It writes the list into a file so every teammate and server installs exactly the same set.',
    analogy:
      'An app store for code: search, click install, get updates — and a shopping list so anyone can reinstall the exact same apps.',
    example:
      '`npm install stripe` downloads the Stripe library from the npm registry into `node_modules/` and adds `"stripe": "^17.0.0"` to `package.json`. Python uses `pip install requests`; Ruby uses `bundle install`.',
    whyItMatters:
      'A modern app can have hundreds or thousands of packages. The package manager makes that manageable — and is also a security front line: malicious or hijacked packages on registries have caused real breaches.',
    misconception:
      'A package manager is not the package itself, and not the app store you install phone apps from. npm (the tool) is different from the npm registry (the website hosting packages), though people use one name for both.',
    question: 'What does a package manager do?',
    canonicalAnswer:
      'It installs and updates the libraries (packages) your project depends on, and keeps track of which versions you need.',
    acceptedAnswers: ['installs packages', 'installs libraries', 'installs dependencies',
      'manages dependencies'],
    keyIdeas: [
      {
        id: 'install',
        label: 'installs / updates',
        terms: ['install', 'download', 'fetch', 'update', 'add', 'manage', 'keep track', 'track',
          'get', 'pull in'],
      },
      {
        id: 'libraries',
        label: 'the libraries/packages a project depends on',
        terms: ['library', 'libraries', 'package', 'dependencies', 'dependency', 'modules',
          'third-party code', 'other peoples code', 'tools'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'npm, pip, and Homebrew are examples. What do you type `install` to get?',
    relatedConceptIds: ['dependency', 'library', 'framework', 'build', 'module'],
    prerequisiteIds: ['library', 'dependency'],
    deepDive:
      'Lockfiles (`package-lock.json`, `poetry.lock`) pin exact versions so a build tomorrow gets the same code as today. `npm audit` checks installed packages against known vulnerabilities.',
    testAnswers: {
      correct: [
        'installs the libraries your project needs',
        'downloads and updates packages',
        'manages dependencies',
      ],
      partial: ['downloads stuff'],
      incorrect: ['it organizes the team’s tasks and deadlines', 'it compiles code into an app'],
    },
  },
  {
    id: 'build',
    term: 'Build (build step)',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'A build is the automated process that transforms source code into the finished files that can actually run — compiling, bundling and optimizing them — producing an output often called a build artifact.',
    plainEnglish:
      'The code developers write is rarely what users receive. A build step converts it: TypeScript becomes JavaScript, hundreds of files become a few bundled ones, images are compressed. The result is a ready-to-ship package.',
    analogy:
      'Turning a manuscript into a printed book: typesetting, binding and printing. The words are the same, but the result is a form people can actually use.',
    example:
      '`npm run build` runs esbuild or Vite, turning `src/App.tsx` and its imports into `dist/assets/index-4f8a2c.js` (minified, about 120 KB) plus `dist/index.html`. The `dist/` folder is what gets deployed.',
    whyItMatters:
      'Builds catch some errors early (type errors, missing files) and make apps fast to load. "The build is broken" means nobody can ship until it’s fixed — a top-priority problem for any team.',
    misconception:
      'Build is not deploy. Building produces the runnable files; deploying puts those files onto servers where users can reach them. A build can succeed while the deploy fails, and vice versa.',
    question: 'What does a build step produce from source code?',
    canonicalAnswer:
      'It transforms source code into the final, runnable files (compiled and bundled) that can be deployed.',
    acceptedAnswers: ['runnable files', 'files ready to deploy', 'a deployable version'],
    keyIdeas: [
      {
        id: 'transform',
        label: 'transforms / compiles / bundles the code',
        terms: ['transform', 'compile', 'convert', 'bundle', 'package', 'turn into', 'turns into',
          'process', 'optimize', 'minify', 'translate', 'prepare'],
      },
      {
        id: 'output',
        label: 'into runnable, ready-to-ship output',
        terms: ['runnable', 'run', 'executable', 'final', 'ready', 'deploy', 'ship', 'output',
          'artifact', 'production', 'finished', 'machine'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['puts it on the server', 'put on server', 'goes live', 'make it live',
          'available to users'],
        feedback: 'That’s deploying. A build produces the runnable files; deployment puts them where users can reach them.',
      },
    ],
    hint: 'Developers write TypeScript; browsers get a minified bundle. What turns one into the other?',
    relatedConceptIds: ['compiler', 'deployment', 'continuous-integration', 'package-manager',
      'source-code', 'dependency'],
    prerequisiteIds: ['source-code', 'package-manager'],
    deepDive:
      'Builds should be reproducible: the same commit should always produce the same output. Build tools cache results so unchanged files aren’t rebuilt, and CI systems run the build on every pull request to catch problems before merge.',
    testAnswers: {
      correct: [
        'turns the source code into final files ready to deploy',
        'compiles and bundles the code so it can run',
        'converts code into an executable',
      ],
      partial: ['compiles the code'],
      incorrect: ['puts the app on the server so users can see it', 'writes the code for you'],
    },
  },
  {
    id: 'compiler',
    term: 'Compiler (code translator)',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'A compiler is a program that translates source code written in one language into another form — usually machine code or a lower-level language — before the program is run.',
    plainEnglish:
      'Computers don’t understand human-friendly languages like Swift or Rust directly. A compiler reads the whole program, checks it for certain mistakes, and translates it into instructions the machine (or another tool) can run.',
    analogy:
      'A translator who converts an entire book into another language before publication, catching grammar problems along the way — as opposed to an interpreter translating a speech line by line, live.',
    example:
      '`gcc main.c -o app` turns C code into a native executable called `app`. `tsc` compiles TypeScript to JavaScript and stops with `error TS2322: Type \'string\' is not assignable to type \'number\'` if types don’t match.',
    whyItMatters:
      'Compiled languages can catch whole categories of bugs before users ever see them, and usually run faster. "It doesn’t compile" means the code can’t even be turned into a runnable program yet.',
    misconception:
      'Compiler vs runtime: the compiler translates code before it runs (compile time); the runtime is the environment that executes the program while it runs (run time). Compile errors appear while building; runtime errors happen when users are using the app.',
    question: 'What does a compiler do?',
    canonicalAnswer:
      'It translates source code into machine code (or another lower-level form) before the program runs.',
    acceptedAnswers: ['translates code into machine code', 'converts code to machine code',
      'turns source code into machine code'],
    keyIdeas: [
      {
        id: 'translate',
        label: 'translates / converts code',
        terms: ['translate', 'convert', 'turn into', 'turns into', 'transform', 'compile',
          'rewrite', 'change into'],
      },
      {
        id: 'target',
        label: 'into machine code / something runnable',
        terms: ['machine code', 'machine', 'binary', 'executable', 'computer understands',
          'computer can run', 'lower-level', 'low-level', 'assembly', 'bytecode', 'zeros and ones',
          '1s and 0s', 'javascript', 'runnable', 'before'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['while it runs', 'executes', 'during runtime', 'runs the code'],
        feedback: 'Running the program is the runtime’s job. A compiler translates code before it runs.',
      },
    ],
    hint: 'A translator who works on the whole book before publication.',
    relatedConceptIds: ['runtime', 'build', 'programming-language', 'source-code', 'error', 'syntax'],
    prerequisiteIds: ['source-code', 'programming-language'],
    deepDive:
      'Languages like Python and JavaScript are usually interpreted or "just-in-time" compiled: the runtime translates them while running. Java and C# compile to bytecode, which a virtual machine runs. The line between compiled and interpreted is blurrier than it sounds.',
    testAnswers: {
      correct: [
        'translates your code into machine code',
        'converts source code into something the computer can run',
        'turns code into a binary before it runs',
      ],
      partial: ['translates code'],
      incorrect: ['executes the program while it runs', 'stores the code online'],
    },
  },
  {
    id: 'runtime',
    term: 'Runtime environment',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'A runtime is the software environment that executes a program while it is running, providing services like memory management and access to files, the network and other system features.',
    plainEnglish:
      'Code needs something to actually run it. For JavaScript, that’s the browser or Node.js; for Python, the Python interpreter. The runtime loads your program, carries out its instructions and supplies built-in abilities like timers or reading files. "Runtime" also means the period while the program is running.',
    analogy:
      'A stage with lights, sound and stagehands: the script (your code) is written in advance, but the performance only happens on a stage that provides everything the actors need.',
    example:
      '`node server.js` runs your code in the Node.js runtime, which provides `fs.readFile` and `http.createServer`. The same JavaScript in Chrome gets `document` and `window` instead — different runtime, different built-ins. A "runtime error" like `TypeError: Cannot read properties of undefined` happens only once the code is running.',
    whyItMatters:
      'Runtime version mismatches ("works on my machine with Node 22, breaks on the server with Node 18") are a classic cause of failed deploys. Hosting choices often come down to which runtimes are supported.',
    misconception:
      'Runtime vs compiler: a compiler translates code before it runs; a runtime executes it while it runs. Runtime errors only show up when the code actually executes, which is why tests that run the code matter even in compiled languages.',
    question: 'What is a runtime?',
    canonicalAnswer:
      'The environment that actually runs (executes) your program while it’s running, like Node.js or the browser for JavaScript.',
    acceptedAnswers: ['what runs your code', 'the thing that runs the code', 'executes the code'],
    keyIdeas: [
      {
        id: 'execute',
        label: 'executes the program as it runs',
        terms: ['execute', 'runs the code', 'runs your code', 'runs the program', 'runs it',
          'run code', 'while running', 'while it runs', 'when running', 'running', 'carries out',
          'node', 'browser', 'interpreter'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['translates', 'before it runs', 'machine code'],
        feedback: 'That’s the compiler’s job. The runtime is what executes the program while it runs.',
      },
    ],
    hint: 'JavaScript needs Node.js or a browser to do anything. What role are they playing?',
    relatedConceptIds: ['compiler', 'error', 'exception', 'hosting', 'environment', 'javascript'],
    prerequisiteIds: ['programming-language', 'source-code'],
    deepDive:
      'Runtimes like the JVM (Java), .NET and V8 (JavaScript in Chrome and Node) include garbage collection, which frees memory automatically, and JIT compilers that turn hot code paths into fast machine code on the fly. Newer JavaScript runtimes include Deno and Bun.',
    testAnswers: {
      correct: [
        'the environment that runs your code, like node',
        'what executes the program while it is running',
        'the thing that runs the code',
      ],
      incorrect: ['translates code into machine code before it runs', 'a deadline for a project'],
    },
  },
  {
    id: 'test',
    term: 'Test',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'An automated test is code that runs part of your application with known inputs and checks that it produces the expected result, failing loudly if it doesn’t.',
    plainEnglish:
      'Instead of clicking through the app by hand after every change, developers write small programs that do the checking: "if the cart has two $5 items, the total should be $10." Thousands of these run in seconds and flag anything that broke.',
    analogy:
      'A smoke alarm for your code: it constantly checks for a specific problem and goes off the moment something goes wrong, so you don’t have to sniff every room yourself.',
    example:
      '`test("adds tax", () => { expect(totalWithTax(1000, 0.1)).toBe(1100); })`. Running `npm test` prints `✓ adds tax` — or `✗ expected 1100, received 1010` if someone broke the function.',
    whyItMatters:
      'Tests let teams change code confidently and ship faster; without them, every change risks silently breaking something. A failing test in CI is far cheaper than a bug found by customers.',
    misconception:
      'Tests don’t prove code is bug-free — they only check the situations someone thought to write down. And automated testing doesn’t replace human QA or user testing; it catches regressions in known behaviour.',
    question: 'What does an automated test do?',
    canonicalAnswer:
      'It runs a piece of code automatically and checks that it gives the expected result, so you know if something broke.',
    acceptedAnswers: ['checks the code works', 'checks that code works correctly'],
    keyIdeas: [
      {
        id: 'check',
        label: 'checks the code gives the expected result',
        terms: ['check', 'verify', 'expected', 'confirm', 'make sure', 'ensure', 'works', 'correct',
          'catch bugs', 'catches bugs', 'find bugs', 'broke', 'broken', 'assert', 'prove'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['writes the code', 'fixes the bug', 'fixes bugs'],
        feedback: 'Tests don’t write or fix code — they check whether code behaves as expected and flag when it doesn’t.',
      },
    ],
    hint: 'If the cart has two $5 items, what should the total be — and who checks?',
    relatedConceptIds: ['unit-test', 'integration-test', 'continuous-integration', 'debugging',
      'pull-request'],
    prerequisiteIds: ['function'],
    deepDive:
      'The "testing pyramid" suggests many fast unit tests, fewer integration tests and a handful of slow end-to-end tests that drive a real browser (with tools like Playwright or Cypress). Test-driven development (TDD) writes the test first, watches it fail, then writes code to pass it.',
    challengeId: 'ship-app',
    testAnswers: {
      correct: [
        'checks that the code works the way you expect',
        'makes sure nothing broke automatically',
        'runs code and verifies the result is correct',
      ],
      incorrect: ['it fixes bugs in the code for you', 'a quiz for programmers'],
    },
  },
  {
    id: 'unit-test',
    term: 'Unit test',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'A unit test checks one small piece of code — typically a single function or class — in isolation from databases, networks and the rest of the system.',
    plainEnglish:
      'Unit tests zoom in on one tiny part: give this function these inputs, does it return the right output? Anything slow or external (databases, APIs) is swapped for a fake, so the test runs in milliseconds and points directly at the broken piece.',
    analogy:
      'Testing each light bulb on its own before installing it, rather than wiring up the whole house and seeing whether the lights come on.',
    example:
      '`expect(formatPrice(1999)).toBe("$19.99")` tests just `formatPrice`. A test for `sendReceipt` might pass in a fake email sender and check it was called with `to: "ana@example.com"`, without any real email going out.',
    whyItMatters:
      'Unit tests are fast and precise: when one fails, you know exactly which function broke. Teams run hundreds of them on every save or commit.',
    misconception:
      'Unit vs integration test: a unit test checks one piece alone with its dependencies faked; an integration test checks that several real pieces (your code plus a real database, say) work together. All unit tests passing doesn’t mean the pieces fit together.',
    question: 'What does a unit test check?',
    canonicalAnswer:
      'One small piece of code, like a single function, on its own — isolated from the rest of the system.',
    acceptedAnswers: ['a single function', 'one function', 'one small piece of code'],
    keyIdeas: [
      {
        id: 'small',
        label: 'one small piece (e.g. a function)',
        terms: ['function', 'small piece', 'single piece', 'one piece', 'small part', 'one part',
          'small unit', 'single unit', 'smallest', 'method', 'class', 'component', 'tiny',
          'one thing', 'individual'],
      },
      {
        id: 'isolated',
        label: 'in isolation',
        terms: ['isolation', 'isolated', 'on its own', 'by itself', 'alone', 'separately',
          'independently', 'mock', 'fake'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['whole app', 'entire app', 'whole system', 'together', 'end to end', 'end-to-end'],
        feedback: 'That’s an integration or end-to-end test. A unit test checks one small piece of code on its own.',
      },
    ],
    hint: 'How small is a "unit"?',
    relatedConceptIds: ['test', 'integration-test', 'function', 'dependency-injection',
      'continuous-integration'],
    prerequisiteIds: ['test', 'function'],
    deepDive:
      'Fakes come in flavours: stubs return canned answers, mocks also record how they were called. Dependency injection makes unit testing easier because you can pass fakes in. Over-mocking can produce tests that pass while the real system is broken.',
    testAnswers: {
      correct: [
        'one function on its own',
        'a single small piece of code in isolation',
        'checks an individual function works',
      ],
      incorrect: ['the whole app working together end to end', 'how many users visit'],
    },
  },
  {
    id: 'integration-test',
    term: 'Integration test',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'An integration test checks that multiple components work correctly together — for example your code with a real database or another service — rather than each in isolation.',
    plainEnglish:
      'Each piece can work perfectly alone and still fail when connected: the wrong field name, a mismatched date format. Integration tests wire real pieces together and check the combination behaves.',
    analogy:
      'After testing each light bulb, you wire up the room and flip the switch to see if the bulbs, wires and switch work as a system.',
    example:
      'A test starts the API against a temporary PostgreSQL database, sends POST /orders with `{"items": [42]}`, then queries the `orders` table and checks a row was saved with status `"pending"`.',
    whyItMatters:
      'Many real bugs live in the seams between components. Integration tests catch them before users do, at the cost of being slower and more complex to set up than unit tests.',
    misconception:
      'Integration vs unit test: unit tests check one piece alone with fakes; integration tests check real pieces working together. Integration is also different from "an integration" (connecting your product to Slack or Stripe), though integration tests often cover those connections.',
    question: 'What does an integration test check?',
    canonicalAnswer:
      'That several parts of the system — like your code and a real database — work correctly together.',
    acceptedAnswers: ['parts work together', 'pieces work together', 'components work together'],
    keyIdeas: [
      {
        id: 'together',
        label: 'multiple parts working together',
        terms: ['together', 'combined', 'combination', 'connected', 'interact', 'integrate',
          'multiple parts', 'several parts', 'different parts', 'multiple components',
          'with each other', 'between', 'whole', 'fit'],
      },
    ],
    wrongIdeas: [
      {
        terms: ['one function', 'single function', 'in isolation', 'on its own', 'by itself'],
        feedback: 'That’s a unit test. An integration test checks that several pieces work together.',
      },
    ],
    hint: 'The bulbs all work alone. What do you check next?',
    relatedConceptIds: ['unit-test', 'test', 'database', 'api', 'continuous-integration',
      'integration'],
    prerequisiteIds: ['unit-test'],
    deepDive:
      'Above integration tests sit end-to-end (E2E) tests, which drive the whole app through a real browser like a user would. Tools like Docker and Testcontainers make it easy to spin up real databases just for a test run.',
    testAnswers: {
      correct: [
        'that different parts of the app work together',
        'that the code and the database interact correctly',
        'multiple components working combined',
      ],
      incorrect: ['one function by itself', 'whether the site looks good'],
    },
  },
  {
    id: 'continuous-integration',
    term: 'Continuous integration (CI)',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'Continuous integration is the practice of merging code changes frequently into a shared branch, with an automated system that builds the code and runs the tests on every change.',
    plainEnglish:
      'Every time someone pushes code or opens a pull request, a robot server checks out the code, builds it and runs all the tests. Within minutes the team sees a green check (safe) or a red X (something broke) — before the change reaches main.',
    analogy:
      'A spell-checker that runs on every paragraph as you write, rather than one big proofread the night before the book goes to print.',
    example:
      'A `.github/workflows/ci.yml` file tells GitHub Actions: on every push, run `npm ci`, `npm run build` and `npm test`. PR #482 shows "All checks have passed" before the merge button turns green.',
    whyItMatters:
      'CI catches breakage within minutes of the change that caused it, while the author still remembers the code. It is the foundation for shipping quickly and safely, and the green check is often a merge requirement.',
    misconception:
      'CI vs CD: continuous integration automatically builds and tests every change; continuous deployment/delivery goes further and automatically releases changes that pass. You can have CI without CD. And CI is a practice, not a product — GitHub Actions, CircleCI and Jenkins are tools for it.',
    question: 'What happens in continuous integration (CI) every time code is pushed?',
    canonicalAnswer:
      'An automated system builds the code and runs the tests on every change, so problems are caught right away.',
    acceptedAnswers: ['tests run automatically', 'automatically runs the tests',
      'automated tests run', 'automatically builds and tests'],
    keyIdeas: [
      {
        id: 'auto',
        label: 'automatically',
        terms: ['automatic', 'automatically', 'automated', 'robot', 'bot', 'server', 'pipeline',
          'github actions', 'every push', 'every change', 'each change', 'each push', 'every time'],
      },
      {
        id: 'test',
        label: 'build and run the tests',
        terms: ['test', 'tests', 'build', 'check', 'checks', 'verify', 'lint', 'catch'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['released to users', 'goes live', 'live to users', 'deployed to production',
          'deploys to production'],
        feedback: 'Automatically releasing to users is continuous deployment (CD). CI is about automatically building and testing every change.',
      },
    ],
    hint: 'A robot checks every change. What does it run?',
    relatedConceptIds: ['continuous-deployment', 'test', 'build', 'pull-request', 'merge', 'branch'],
    prerequisiteIds: ['test', 'build', 'pull-request'],
    deepDive:
      'CI pipelines often also run linters (style checks), type checks, security scans and dependency audits. Keeping the pipeline fast — ideally under 10 minutes — matters, because slow CI encourages people to batch changes, which defeats the purpose.',
    testAnswers: {
      correct: [
        'the code is built and tested automatically',
        'a server runs all the tests on every change',
        'automated checks run to catch bugs',
      ],
      partial: ['the tests run'],
      incorrect: ['the code goes live to users immediately', 'someone emails the code to the boss'],
    },
  },
  {
    id: 'continuous-deployment',
    term: 'Continuous deployment (CD)',
    trackId: 'workflow',
    difficulty: 4,
    definition:
      'Continuous deployment is the practice of automatically releasing every code change that passes the automated build and tests to production, without a manual release step.',
    plainEnglish:
      'Once CI says a change is good, CD ships it — automatically. Merge a pull request at 2:05 and customers have it by 2:20. A close cousin, continuous delivery, keeps every change ready to ship but has a human press the final button.',
    analogy:
      'A conveyor belt from the factory’s quality-check station straight to store shelves, instead of stockpiling products for one big monthly shipment.',
    example:
      'A GitHub Actions workflow: on push to `main`, run tests; if green, run `npm run build` and deploy `dist/` to Vercel (or `fly deploy`). Companies like Etsy and Amazon ship to production dozens to thousands of times a day this way.',
    whyItMatters:
      'Small, frequent releases are less risky than big ones: each change is easy to understand, and a bad one is easy to spot and roll back. CD shortens the time from idea to customer feedback.',
    misconception:
      'CD vs CI: CI automatically builds and tests changes; CD automatically releases the ones that pass. "CD" can mean continuous deployment (automatic to production) or continuous delivery (always releasable, human approves) — worth asking which one a team means.',
    question: 'What does continuous deployment do with changes that pass the tests?',
    canonicalAnswer:
      'It automatically releases them to production, so users get them without a manual release step.',
    acceptedAnswers: ['automatically deploys them', 'automatically releases them',
      'ships them automatically', 'deploys them automatically'],
    keyIdeas: [
      {
        id: 'auto',
        label: 'automatically',
        terms: ['automatic', 'automatically', 'automated', 'without manual', 'no human', 'by itself',
          'immediately', 'right away', 'straight'],
      },
      {
        id: 'release',
        label: 'releases to production / users',
        terms: ['deploy', 'release', 'ship', 'production', 'live', 'users', 'customers', 'publish',
          'push out'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['only runs tests', 'just tests'],
        feedback: 'Running tests is CI. CD takes changes that passed and releases them to production automatically.',
      },
    ],
    hint: 'CI checked it and it’s green. What happens next, without a human?',
    relatedConceptIds: ['continuous-integration', 'deployment', 'rollback', 'build', 'monitoring',
      'environment'],
    prerequisiteIds: ['continuous-integration', 'deployment'],
    deepDive:
      'Safe CD relies on feature flags (ship code turned off), canary releases (send 1% of traffic to the new version first), good monitoring and fast automatic rollback when error rates spike.',
    testAnswers: {
      correct: [
        'automatically deploys them to production',
        'ships them to users right away without a manual step',
        'releases them live automatically',
      ],
      partial: ['puts them in production'],
      incorrect: ['it only runs the tests on them', 'saves them to a branch'],
    },
  },
  {
    id: 'deployment',
    term: 'Deployment (deploy)',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'Deployment is the process of taking a built version of an application and putting it onto the servers or platform where it runs, making it available to users.',
    plainEnglish:
      'Code on a laptop helps no one. Deploying copies the built app onto servers (or a cloud platform), starts it up, and switches traffic to it so real users get the new version.',
    analogy:
      'Opening night for a play: rehearsals (development) and dress rehearsal (staging) are done; now the show goes on in front of a real audience.',
    example:
      '`git push heroku main`, `vercel --prod` or a CI job that uploads a Docker image and restarts containers. Afterwards https://shop.example serves version `v2.14.0` instead of `v2.13.2`.',
    whyItMatters:
      'Deploys are when changes become real — and when many incidents start. Teams track how often they deploy and how often deploys cause problems as key measures of engineering health.',
    misconception:
      'Deploy vs build: a build turns source code into runnable files; a deploy puts those files on servers where users can reach them. Also, deploying is not the same as "releasing" a feature — code can be deployed but hidden behind a feature flag.',
    question: 'What does it mean to deploy an application?',
    canonicalAnswer:
      'To put a built version of the app onto the servers where it runs, so users can access it.',
    acceptedAnswers: ['make it live', 'put it live', 'push it live', 'put it on the server',
      'put it into production', 'release it to users'],
    keyIdeas: [
      {
        id: 'put-on-servers',
        label: 'putting it on servers / production',
        terms: ['server', 'servers', 'production', 'cloud', 'live', 'hosting', 'host', 'online',
          'internet', 'upload', 'publish', 'release', 'ship'],
      },
      {
        id: 'users',
        label: 'so users can access it',
        terms: ['users', 'customers', 'people', 'public', 'available', 'access', 'everyone', 'reach',
          'live'],
      },
    ],
    minKeyIdeas: 1,
    wrongIdeas: [
      {
        terms: ['compile', 'compiling', 'write the code', 'writing the code'],
        feedback: 'That’s building or writing code. Deploying puts the built app on servers so users can reach it.',
      },
    ],
    hint: 'Opening night: what changes for the audience?',
    relatedConceptIds: ['build', 'hosting', 'environment', 'continuous-deployment', 'rollback',
      'server'],
    prerequisiteIds: ['build', 'server'],
    deepDive:
      'Zero-downtime strategies include rolling deploys (replace servers one at a time), blue-green (run old and new side by side, flip traffic) and canary deploys (send a small percentage of users to the new version first).',
    testAnswers: {
      correct: [
        'putting the app on a server so people can use it',
        'making it live for users',
        'uploading the new version to production',
      ],
      incorrect: ['writing the code for a new feature', 'compiling code on your laptop'],
    },
  },
  {
    id: 'hosting',
    term: 'Hosting (web hosting)',
    trackId: 'workflow',
    difficulty: 1,
    definition:
      'Hosting is providing the always-on computers, storage and network connection where an application or website runs and can be reached over the internet.',
    plainEnglish:
      'Your app needs a computer that is on 24/7, connected to the internet, with an address people can reach. Hosting providers rent you that — anything from a slice of a server to a fully managed platform that runs your code for you.',
    analogy:
      'Renting a shop in a busy street: the landlord provides the building, power and address; you bring the stock and run the business.',
    example:
      'A static site hosted on Netlify, a Next.js app on Vercel, a backend API on Render or AWS EC2, and the database on a managed PostgreSQL service like Supabase. Each charges for compute, storage or bandwidth.',
    whyItMatters:
      'Hosting choices affect cost, speed, reliability and how much operations work the team does. "Where is this hosted?" is a key question for security reviews, compliance and outages.',
    misconception:
      'Hosting is not the same as a domain name. The domain (shop.example) is the address you buy from a registrar; hosting is the computer the address points to. And hosting is not deployment — deploying is the act of putting a new version onto the host.',
    question: 'What does a hosting provider give your app?',
    canonicalAnswer:
      'Always-on servers connected to the internet where the app runs, so people can reach it online.',
    acceptedAnswers: ['a server to run on', 'servers to run the app', 'a place to run it online'],
    keyIdeas: [
      {
        id: 'servers',
        label: 'servers / computers where it runs',
        terms: ['server', 'servers', 'computer', 'machine', 'infrastructure', 'cloud', 'place to run',
          'where it runs', 'somewhere to run', 'space', 'storage', 'compute'],
      },
      {
        id: 'online',
        label: 'reachable on the internet, always on',
        terms: ['internet', 'online', 'always on', '24/7', 'reach', 'access', 'available', 'people',
          'users', 'web', 'public'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['domain name', 'the address', 'web address', 'url'],
        feedback: 'That’s the domain name. Hosting is the always-on computer the address points to, where the app actually runs.',
      },
    ],
    hint: 'Your laptop gets closed at night. Where does the app live instead?',
    relatedConceptIds: ['deployment', 'server', 'domain-name', 'cdn', 'environment', 'runtime'],
    prerequisiteIds: ['server', 'internet'],
    deepDive:
      'Hosting models range from bare-metal servers and virtual machines (you manage everything) to containers, platform-as-a-service (Heroku, Render) and serverless functions (AWS Lambda), where you just upload code and pay per request.',
    testAnswers: {
      correct: [
        'a server where the app runs online',
        'computers that are always on so people can reach it',
        'somewhere to run it on the internet',
      ],
      incorrect: ['the domain name for the site', 'the editor where you write the code'],
    },
  },
  {
    id: 'environment',
    term: 'Environment (dev / staging / production)',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'An environment is a complete, separate place where a copy of an application runs — such as development, staging or production — each with its own servers, data and settings.',
    plainEnglish:
      'Teams run the same app in several places. Development is a developer’s laptop; staging is a realistic rehearsal copy for testing; production is the real thing customers use. Keeping them separate means experiments can’t break the live site or touch real customer data.',
    analogy:
      'A test kitchen, a dress rehearsal and opening night: the same recipe or play, run in different settings with different stakes.',
    example:
      'https://staging.shop.example uses a test Stripe key and a copy of the database with fake customers; https://shop.example uses the live key and real orders. The same build moves from staging to production once checked.',
    whyItMatters:
      '"Is that in staging or prod?" is one of the most common engineering questions. Mixing environments up — running a test script against production — is a classic way to cause an outage or data loss.',
    misconception:
      'Environment vs environment variable: an environment is the whole place the app runs (staging, production); environment variables are individual named settings (like DATABASE_URL) that each environment supplies to the app.',
    question: 'What is the difference between a staging and a production environment?',
    canonicalAnswer:
      'Production is the live version real users use; staging is a separate copy used to test changes safely before they go to production.',
    acceptedAnswers: [],
    keyIdeas: [
      {
        id: 'prod',
        label: 'production is the live one users use',
        terms: ['live', 'real users', 'customers', 'users', 'real one', 'public', 'real thing',
          'actual users', 'real data'],
      },
      {
        id: 'staging',
        label: 'staging is a test copy used before going live',
        terms: ['test', 'testing', 'practice', 'rehearsal', 'copy', 'before', 'preview', 'try out',
          'check', 'safe', 'fake data'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['same thing', 'no difference'],
        feedback: 'They’re separate: production serves real users, staging is a test copy for checking changes first.',
      },
    ],
    hint: 'Dress rehearsal versus opening night.',
    relatedConceptIds: ['environment-variable', 'deployment', 'configuration', 'hosting',
      'continuous-deployment'],
    prerequisiteIds: ['deployment'],
    deepDive:
      'Many teams also have preview environments: a temporary copy spun up for each pull request. The goal is "parity" — staging should match production closely, or bugs will hide in the differences.',
    testAnswers: {
      correct: [
        'production is the live site for real users, staging is a copy for testing',
        'staging is where you test before it goes live to customers',
        'prod is what users see, staging is a practice copy',
      ],
      partial: ['production is the live one'],
      incorrect: ['they are the same thing', 'there is no difference'],
    },
  },
  {
    id: 'logs',
    term: 'Logs (application logs)',
    trackId: 'workflow',
    difficulty: 2,
    definition:
      'Logs are time-stamped text records that a program writes as it runs, describing events like requests received, actions taken and errors encountered.',
    plainEnglish:
      'Apps keep a running diary. Each line says what happened and when: "user 4821 logged in", "payment failed: card declined". When something goes wrong, engineers read the logs to reconstruct what happened.',
    analogy:
      'A ship’s logbook: entries written as the voyage happens, so afterwards anyone can trace exactly when the storm hit and what the crew did.',
    example:
      '`2026-10-09T14:03:12Z ERROR checkout order=9132 user=4821 msg="Stripe charge failed" code=card_declined`. In Node, `console.error(...)` or a logger like pino writes lines like this to a service such as Datadog or CloudWatch.',
    whyItMatters:
      'Logs are often the first place to look when a user reports a bug. They also matter for security audits and legal compliance — and must never contain passwords or full card numbers.',
    misconception:
      'Logs vs monitoring vs observability: logs are the raw records of individual events. Monitoring watches summary numbers (error rate, response time) and alerts when they cross thresholds. Observability is the broader ability to understand any problem from logs, metrics and traces together.',
    question: 'What are logs?',
    canonicalAnswer:
      'Time-stamped records a program writes as it runs, describing what happened — events, actions and errors.',
    acceptedAnswers: ['a record of what happened', 'records of events', 'a diary of what the app did'],
    keyIdeas: [
      {
        id: 'records',
        label: 'records/messages written by the program',
        terms: ['record', 'records', 'messages', 'entries', 'lines', 'diary', 'history', 'written',
          'text', 'notes', 'journal'],
      },
      {
        id: 'events',
        label: 'of events/errors as it runs',
        terms: ['events', 'happened', 'happens', 'errors', 'actions', 'activity', 'as it runs',
          'while running', 'timestamp', 'time-stamped', 'what app did', 'requests'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['alert', 'dashboard', 'graph', 'chart'],
        feedback: 'Alerts and dashboards are monitoring. Logs are the raw, time-stamped records of individual events.',
      },
    ],
    hint: 'A ship’s logbook. What gets written in it, and when?',
    relatedConceptIds: ['monitoring', 'observability', 'debugging', 'error', 'browser-console'],
    prerequisiteIds: ['error'],
    deepDive:
      'Structured logs use key-value pairs or JSON (`{"level":"error","orderId":9132}`) so they can be searched and filtered by machines. Log levels (debug, info, warn, error) let teams control how much detail is recorded in each environment.',
    testAnswers: {
      correct: [
        'records of what happened in the app, like errors',
        'messages the program writes as it runs',
        'a diary of events with timestamps',
      ],
      partial: ['text records'],
      incorrect: ['a dashboard with charts and alerts', 'the code itself'],
    },
  },
  {
    id: 'monitoring',
    term: 'Monitoring (system monitoring)',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'Monitoring is continuously collecting key measurements about a running system — like error rate, response time and uptime — and alerting people when they cross a threshold.',
    plainEnglish:
      'Monitoring watches the vital signs of your app around the clock. Dashboards show graphs of traffic and errors, and if something looks wrong — the site is down or errors jump — it pages the on-call engineer before customers start complaining.',
    analogy:
      'A hospital heart monitor: it tracks a few vital numbers constantly and beeps when one goes out of the safe range.',
    example:
      'A Datadog alert: "error rate on POST /checkout above 2% for 5 minutes" → notifies the on-call engineer via PagerDuty. An uptime checker pings https://shop.example every minute and posts in Slack if it doesn’t get a 200 OK.',
    whyItMatters:
      'Without monitoring, you find out about outages from angry customers or social media. With it, teams spot and fix problems in minutes, and can prove they meet promised uptime (like 99.9%).',
    misconception:
      'Monitoring vs logs vs observability: logs record individual events; monitoring tracks summary numbers and alerts on known failure signs ("is it broken?"); observability is the ability to dig in and understand why, even for problems you didn’t anticipate.',
    question: 'What does monitoring do for a running app?',
    canonicalAnswer:
      'It continuously tracks key metrics like errors and response time, and alerts the team when something goes wrong.',
    acceptedAnswers: ['alerts you when something breaks', 'alerts when something goes wrong',
      'watches the app and alerts'],
    keyIdeas: [
      {
        id: 'watch',
        label: 'continuously tracks health metrics',
        terms: ['watch', 'track', 'measure', 'metrics', 'keep an eye', 'observe', 'continuously',
          'health', 'uptime', 'errors', 'performance', 'response time', 'dashboard', 'graphs'],
      },
      {
        id: 'alert',
        label: 'alerts people when something’s wrong',
        terms: ['alert', 'notify', 'warn', 'page', 'pages', 'tell', 'goes wrong', 'something wrong',
          'down', 'breaks', 'problem', 'threshold', 'beep'],
      },
    ],
    minKeyIdeas: 2,
    hint: 'A heart monitor in a hospital: what does it do, and when does it beep?',
    relatedConceptIds: ['logs', 'observability', 'rollback', 'latency', 'status-code', 'deployment'],
    prerequisiteIds: ['logs'],
    deepDive:
      'Google’s "four golden signals" for monitoring are latency, traffic, errors and saturation (how full resources are). Teams set SLOs (service level objectives) like "99.9% of requests succeed" and alert when they’re at risk.',
    testAnswers: {
      correct: [
        'watches the app health and alerts you if something breaks',
        'tracks metrics like errors and warns the team',
        'keeps an eye on uptime and pages someone when it goes down',
      ],
      partial: ['tracks the metrics of the app'],
      incorrect: ['it writes the code for the app', 'stores customer passwords'],
    },
  },
  {
    id: 'observability',
    term: 'Observability',
    trackId: 'workflow',
    difficulty: 4,
    definition:
      'Observability is how well a team can understand what is happening inside a running system — including problems nobody predicted — by examining the data it emits: logs, metrics and traces.',
    plainEnglish:
      'Monitoring tells you that something is wrong. Observability is about being able to ask why — "which users are slow, on which page, and what was the database doing?" — and get answers from the data, without shipping new code to investigate.',
    analogy:
      'Monitoring is the check-engine light. Observability is a mechanic’s full diagnostic computer that lets them examine any part of the engine’s behaviour after the fact.',
    example:
      'A trace for one slow checkout shows the request took 4.2s: 30ms in the API, 4.1s waiting on the `inventory` service, which was stuck on a database lock. Tools: OpenTelemetry to collect, Honeycomb, Datadog or Grafana to explore.',
    whyItMatters:
      'In complex systems, especially microservices, new kinds of failure appear constantly. Good observability turns a day-long investigation into a ten-minute one.',
    misconception:
      'Observability isn’t just a fancy word for monitoring, or a single tool. Logs are raw event records; monitoring alerts on known signals; observability is the property of being able to explain any behaviour — known or unknown — from logs, metrics and traces together.',
    question: 'What does observability let a team do?',
    canonicalAnswer:
      'Understand what’s happening inside a running system — and why problems happen — using its logs, metrics and traces.',
    acceptedAnswers: ['understand why something is broken', 'figure out why problems happen',
      'understand what is happening inside the system'],
    keyIdeas: [
      {
        id: 'understand',
        label: 'understand why / what’s happening inside',
        terms: ['understand', 'why', 'figure out', 'investigate', 'explain', 'diagnose', 'insight',
          'see inside', 'inside', 'root cause', 'debug', 'dig into', 'ask questions'],
      },
      {
        id: 'data',
        label: 'using logs, metrics and traces',
        terms: ['logs', 'metrics', 'traces', 'telemetry', 'signals'],
      },
    ],
    minKeyIdeas: 1,
    hint: 'Monitoring says "it’s broken". What does observability help you answer?',
    relatedConceptIds: ['monitoring', 'logs', 'microservices', 'debugging', 'latency'],
    prerequisiteIds: ['logs', 'monitoring'],
    deepDive:
      'The "three pillars": logs (events), metrics (numbers over time) and traces (the path of a single request across services, with timings for each step). High-cardinality data — being able to slice by user ID or order ID — is what makes unknown problems answerable.',
    testAnswers: {
      correct: [
        'understand why something is going wrong inside the system',
        'figure out what is happening using logs and traces',
        'dig into the root cause of problems',
      ],
      incorrect: ['make the website load faster', 'design the user interface'],
    },
  },
  {
    id: 'rollback',
    term: 'Rollback (deploy rollback)',
    trackId: 'workflow',
    difficulty: 3,
    definition:
      'A rollback is returning a system to a previous known-good version after a deployment causes problems.',
    plainEnglish:
      'Sometimes a new release breaks things. Rather than racing to fix it live, the team rolls back: puts the last working version back so users are safe, then investigates calmly.',
    analogy:
      'Hitting undo — or reloading the last save point in a game after walking into a trap.',
    example:
      'Errors spike after deploying `v2.14.0`, so the on-call engineer clicks "Redeploy" on `v2.13.2` in Vercel, or runs `kubectl rollout undo deployment/web`. Within two minutes the old version is serving traffic again.',
    whyItMatters:
      'Fast rollbacks make shipping less scary: if mistakes can be undone in minutes, teams can release more often. "Roll back first, debug second" is standard incident practice.',
    misconception:
      'Rolling back code doesn’t automatically undo data changes. If a release ran a database migration or sent emails, reverting the code won’t reverse those — which is why migrations are designed to be backward-compatible.',
    question: 'What is a rollback?',
    canonicalAnswer:
      'Going back to the previous working version of the app after a bad deployment.',
    acceptedAnswers: ['going back to the previous version', 'reverting to the last version',
      'undo a deploy', 'undoing a deployment'],
    keyIdeas: [
      {
        id: 'revert',
        label: 'going back / reverting',
        terms: ['go back', 'going back', 'revert', 'undo', 'restore', 'return', 'roll back',
          'switch back', 'put back', 'reinstate', 'redeploy'],
      },
      {
        id: 'previous',
        label: 'to the previous working version',
        terms: ['previous', 'earlier', 'old', 'older', 'last', 'prior', 'working', 'known good',
          'before', 'stable'],
      },
    ],
    minKeyIdeas: 2,
    wrongIdeas: [
      {
        terms: ['new version', 'newer version', 'latest version', 'release a new'],
        feedback: 'A rollback goes backwards — to the previous working version — not forward to a new one.',
      },
    ],
    hint: 'The new release is broken. How do you get users back to safety fast?',
    relatedConceptIds: ['deployment', 'continuous-deployment', 'monitoring', 'version-control',
      'migration'],
    prerequisiteIds: ['deployment'],
    deepDive:
      'The opposite approach is "roll forward": quickly ship a fix instead of reverting. Feature flags offer an even faster lever — turn the broken feature off without deploying anything.',
    testAnswers: {
      correct: [
        'going back to the old version after a bad deploy',
        'reverting to the last working release',
        'undo the deploy and restore the previous version',
      ],
      partial: ['undo something'],
      incorrect: ['releasing a new version with more features', 'deleting the database'],
    },
  },
];

export default concepts;
