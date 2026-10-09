// Levels are gated by BOTH XP and demonstrated understanding: specific
// prerequisite concepts recalled correctly and specific challenges shipped.
// Grinding easy cards alone can never unlock advanced material.

export type LevelDef = {
  level: number;
  name: string;
  blurb: string;
  xp: number;
  /** concepts that must have been recalled correctly at least once */
  concepts: string[];
  /** challenges that must have been shipped */
  challenges: string[];
  /** what this level opens up, for "next unlock" previews */
  unlocks: string[];
};

export const LEVELS: LevelDef[] = [
  {
    level: 1,
    name: 'Curious',
    blurb: 'Learn the words: what code, a browser and a server actually are.',
    xp: 0,
    concepts: [],
    challenges: [],
    unlocks: ['The Internet module', 'How Websites Work module', 'Drops 01–02'],
  },
  {
    level: 2,
    name: 'Explorer',
    blurb: 'HTML, CSS, JavaScript and HTTP — the browser’s building blocks.',
    xp: 100,
    concepts: ['client', 'server', 'browser', 'html'],
    challenges: [],
    unlocks: ['Programming Fundamentals module', 'Drop 03 · Make a button work'],
  },
  {
    level: 3,
    name: 'Builder',
    blurb: 'Variables, functions, conditions and arrays — modify real code.',
    xp: 250,
    concepts: ['http', 'css', 'javascript', 'dom'],
    challenges: ['first-webpage'],
    unlocks: ['APIs & Integrations module', 'AI & Modern Software module', 'Drops 04–05'],
  },
  {
    level: 4,
    name: 'Integrator',
    blurb: 'APIs, JSON and async requests — make apps talk to each other.',
    xp: 450,
    concepts: ['variable', 'function', 'conditional', 'array'],
    challenges: ['button-counter'],
    unlocks: ['Databases & Data module', 'Drop 06 · Understand an API'],
  },
  {
    level: 5,
    name: 'Architect',
    blurb: 'Databases, backend logic and how systems are shaped.',
    xp: 700,
    concepts: ['api', 'json', 'http-get', 'status-code'],
    challenges: ['data-transform'],
    unlocks: ['Software Architecture module', 'Drop 07 · Build a mini database'],
  },
  {
    level: 6,
    name: 'Shipper',
    blurb: 'Git, testing, deployment and debugging — get code to users.',
    xp: 1000,
    concepts: ['database', 'sql', 'primary-key', 'authentication'],
    challenges: ['api-inspector'],
    unlocks: ['Developer Workflow module', 'Drop 08 · Ship a mini app'],
  },
  {
    level: 7,
    name: 'Systems Thinker',
    blurb: 'Security, performance, caching and architectural trade-offs.',
    xp: 1400,
    concepts: ['git', 'commit', 'deployment', 'test'],
    challenges: ['mini-database'],
    unlocks: ['Everything. You speak software now.'],
  },
];

export type LevelInputs = {
  xp: number;
  learned: (conceptId: string) => boolean;
  shipped: (challengeId: string) => boolean;
};

export type RequirementStatus = {
  def: LevelDef;
  xpMet: boolean;
  missingConcepts: string[];
  missingChallenges: string[];
  met: boolean;
};

export function requirementStatus(def: LevelDef, input: LevelInputs): RequirementStatus {
  const missingConcepts = def.concepts.filter((c) => !input.learned(c));
  const missingChallenges = def.challenges.filter((c) => !input.shipped(c));
  const xpMet = input.xp >= def.xp;
  return {
    def,
    xpMet,
    missingConcepts,
    missingChallenges,
    met: xpMet && missingConcepts.length === 0 && missingChallenges.length === 0,
  };
}

/** Highest level whose requirements (and all lower levels' requirements) are met. */
export function computeLevel(input: LevelInputs, levels: LevelDef[] = LEVELS): number {
  let current = levels[0].level;
  for (const def of levels.slice(1)) {
    if (requirementStatus(def, input).met) current = def.level;
    else break;
  }
  return current;
}

export function levelDef(level: number, levels: LevelDef[] = LEVELS): LevelDef {
  return levels.find((l) => l.level === level) ?? levels[0];
}

export function nextLevelDef(level: number, levels: LevelDef[] = LEVELS): LevelDef | undefined {
  return levels.find((l) => l.level === level + 1);
}

/** 0–1 progress toward next level's XP requirement. */
export function xpProgress(xp: number, level: number, levels: LevelDef[] = LEVELS): number {
  const cur = levelDef(level, levels);
  const next = nextLevelDef(level, levels);
  if (!next) return 1;
  const span = next.xp - cur.xp;
  return Math.max(0, Math.min(1, (xp - cur.xp) / span));
}
