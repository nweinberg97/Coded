// Content model for Coded. Educational content lives here as plain data —
// UI components never hardcode concept text.

export type Difficulty = 1 | 2 | 3 | 4 | 5;

/**
 * A key idea the learner's answer should express. An idea is "hit" when the
 * normalized answer contains ANY of its terms. Terms are matched on word
 * boundaries after normalization + light stemming, so "communicate",
 * "communicates" and "communication" can all be covered by "communicat".
 * Multi-word terms ("talk to each other") are matched as phrases.
 */
export type KeyIdea = {
  id: string;
  /** Short human label used in feedback: "two programs talking" */
  label: string;
  terms: string[];
};

/** A common wrong idea. If the answer hits it, the answer is marked wrong with this feedback. */
export type WrongIdea = {
  terms: string[];
  feedback: string;
};

export type Concept = {
  id: string;
  term: string;
  trackId: TrackId;
  difficulty: Difficulty;
  /** One crisp sentence. */
  definition: string;
  /** 2–4 sentences, no jargon that hasn't been introduced. */
  plainEnglish: string;
  analogy?: string;
  /** A concrete, technically accurate example. */
  example: string;
  whyItMatters: string;
  /** A common misconception, or how this differs from a confusable concept. */
  misconception?: string;
  /** Recall question shown on the card. */
  question: string;
  /** The model answer shown after the learner answers. */
  canonicalAnswer: string;
  /** Short accepted phrasings. Matching one of these (normalized) is a pass. */
  acceptedAnswers: string[];
  /** Ideas the answer should contain. */
  keyIdeas: KeyIdea[];
  /** How many key ideas must be hit to pass. Defaults to all of them. */
  minKeyIdeas?: number;
  wrongIdeas?: WrongIdea[];
  /** A nudge that does not give the answer away. */
  hint: string;
  relatedConceptIds: string[];
  /** Concepts worth knowing first. Shown as the path when this is locked. */
  prerequisiteIds?: string[];
  /** Optional deeper detail, revealed progressively. */
  deepDive?: string;
  challengeId?: string;
  /** Used by the automated content test-suite to keep the evaluator honest. */
  testAnswers: {
    correct: string[];
    partial?: string[];
    incorrect: string[];
  };
};

export type TrackId =
  | 'internet'
  | 'web'
  | 'programming'
  | 'apis'
  | 'data'
  | 'architecture'
  | 'workflow'
  | 'ai';

export type Track = {
  id: TrackId;
  /** Shown like an album / set title */
  name: string;
  tagline: string;
  description: string;
  /** Learner level required to earn XP on this track. Lower tracks are always open. */
  unlockLevel: number;
  /** Cover art palette (two colors) */
  cover: [string, string];
  /** Cover pattern variant used by the generative cover art */
  pattern: 'rings' | 'grid' | 'stripes' | 'dots' | 'waves' | 'blocks' | 'diagonal' | 'orbit';
};
