// Offline, deterministic, explainable answer evaluation.
//
// Strategy (in order):
//  1. Normalize text (case, punctuation, contractions, stop words).
//  2. Check known misconceptions ("wrong ideas") — these fail fast with feedback.
//  3. Check accepted answer variants as phrases inside the answer.
//  4. Check key ideas: each idea is a set of synonym terms; count ideas hit.
//  5. Negated hits ("it does NOT store data") don't count.
// There is deliberately no fuzzy similarity score — every verdict can be
// explained by pointing at which ideas were found or missing.

import type { Concept, KeyIdea } from '../content/types';

export type Verdict = 'correct' | 'partial' | 'incorrect';

export type Evaluation = {
  verdict: Verdict;
  hit: KeyIdea[];
  missed: KeyIdea[];
  matchedAccepted: boolean;
  wrongFeedback?: string;
  /** Human-readable explanation of the verdict. */
  message: string;
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'its', 'this', 'that',
  'these', 'those', 'of', 'to', 'for', 'and', 'or', 'in', 'on', 'at', 'by', 'with', 'as', 'so',
  'some', 'any', 'basically', 'like', 'just', 'thing', 'things', 'something',
  'you', 'your', 'we', 'our', 'they', 'their', 'them', 'i', 'my', 'me', 'can', 'could', 'would',
  'will', 'lets', 'let', 'which', 'who', 'what', 'when', 'where', 'how', 'do', 'does', 'did',
  'has', 'have', 'had', 'there', 'then', 'than', 'very', 'really', 'also', 'into', 'from', 'about',
  'thats', 'whats', 'way', 'used', 'use', 'uses', 'using', 'allows', 'allow', 'lets',
]);

const NEGATORS = new Set([
  'not', 'no', 'never', 'dont', 'doesnt', 'isnt', 'arent', 'cant', 'cannot', 'without', 'wont',
  'neither', 'nor', 'nothing', 'none', 'wasnt', 'werent', 'shouldnt', 'didnt',
]);

/** Words that are kept even though some look like stop words. */
const KEEP = new Set(['not', 'no', 'never', 'without']);

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/(\w)[.-](?=\s|$)/g, '$1 ')
    .replace(/\s[.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const SUFFIXES = [
  'izations', 'ization', 'ations', 'ation', 'ments', 'ment', 'ings', 'ing', 'ions', 'ion',
  'ities', 'ity', 'ers', 'er', 'ies', 'ied', 'es', 'ed', 'ly', 's', 'e', 'y',
];

/** A tiny, predictable stemmer: repeatedly strips common English endings. */
export function stem(word: string): string {
  let w = word;
  for (let pass = 0; pass < 2; pass++) {
    for (const suf of SUFFIXES) {
      if (w.length - suf.length >= 3 && w.endsWith(suf)) {
        w = w.slice(0, -suf.length);
        break;
      }
    }
  }
  return w;
}

function wordsMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const sa = stem(a);
  const sb = stem(b);
  if (sa === sb) return true;
  const [short, long] = sa.length <= sb.length ? [sa, sb] : [sb, sa];
  return short.length >= 5 && long.startsWith(short);
}

type Token = { word: string; index: number };

export function tokenize(text: string): Token[] {
  return normalize(text)
    .split(' ')
    .filter(Boolean)
    .map((word, index) => ({ word, index }))
    .filter((t) => KEEP.has(t.word) || NEGATORS.has(t.word) || !STOP_WORDS.has(t.word));
}

function contentWords(text: string): string[] {
  return tokenize(text)
    .map((t) => t.word)
    .filter((w) => !NEGATORS.has(w));
}

/**
 * Find a phrase (sequence of content words) inside the token stream.
 * Allows at most one extra word between phrase words.
 * Returns the start token index of the first non-negated match, or -1.
 */
export function findPhrase(tokens: Token[], phrase: string): number {
  const words = contentWords(phrase);
  if (words.length === 0) return -1;
  for (let i = 0; i < tokens.length; i++) {
    if (!wordsMatch(tokens[i].word, words[0])) continue;
    let ti = i;
    let ok = true;
    for (let w = 1; w < words.length; w++) {
      if (ti + 1 < tokens.length && wordsMatch(tokens[ti + 1].word, words[w])) {
        ti += 1;
      } else if (ti + 2 < tokens.length && wordsMatch(tokens[ti + 2].word, words[w])) {
        ti += 2;
      } else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (isNegated(tokens, i)) continue;
    return i;
  }
  return -1;
}

function isNegated(tokens: Token[], i: number): boolean {
  // Look back up to 3 tokens for a negator.
  for (let k = Math.max(0, i - 3); k < i; k++) {
    if (NEGATORS.has(tokens[k].word)) return true;
  }
  return false;
}

export function hitsAnyTerm(tokens: Token[], terms: string[]): boolean {
  return terms.some((t) => findPhrase(tokens, t) >= 0);
}

export function requiredIdeas(concept: Pick<Concept, 'keyIdeas' | 'minKeyIdeas'>): number {
  return Math.min(concept.keyIdeas.length, concept.minKeyIdeas ?? concept.keyIdeas.length);
}

function list(labels: string[]): string {
  if (labels.length <= 1) return labels.join('');
  return labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
}

export function evaluateAnswer(
  concept: Pick<Concept, 'keyIdeas' | 'minKeyIdeas' | 'acceptedAnswers' | 'wrongIdeas'>,
  rawAnswer: string,
): Evaluation {
  const tokens = tokenize(rawAnswer);
  const meaningful = tokens.filter((t) => !NEGATORS.has(t.word));

  if (meaningful.length === 0) {
    return {
      verdict: 'incorrect',
      hit: [],
      missed: concept.keyIdeas,
      matchedAccepted: false,
      message: 'Type an answer in your own words — a short phrase is fine.',
    };
  }

  for (const wrong of concept.wrongIdeas ?? []) {
    if (hitsAnyTerm(tokens, wrong.terms)) {
      return {
        verdict: 'incorrect',
        hit: [],
        missed: concept.keyIdeas,
        matchedAccepted: false,
        wrongFeedback: wrong.feedback,
        message: wrong.feedback,
      };
    }
  }

  const hit: KeyIdea[] = [];
  const missed: KeyIdea[] = [];
  for (const idea of concept.keyIdeas) {
    (hitsAnyTerm(tokens, idea.terms) ? hit : missed).push(idea);
  }

  const matchedAccepted = concept.acceptedAnswers.some((a) => findPhrase(tokens, a) >= 0);
  const needed = requiredIdeas(concept);

  if (matchedAccepted || hit.length >= needed) {
    return {
      verdict: 'correct',
      hit,
      missed: [],
      matchedAccepted,
      message:
        hit.length > 0
          ? `Nailed it — you captured ${list(hit.map((h) => h.label))}.`
          : 'Nailed it — that matches an accepted answer.',
    };
  }

  if (hit.length > 0) {
    return {
      verdict: 'partial',
      hit,
      missed,
      matchedAccepted: false,
      message: `Close. You got ${list(hit.map((h) => h.label))}, but the answer also needs ${list(
        missed.slice(0, needed - hit.length + 1).map((m) => m.label),
      )}.`,
    };
  }

  return {
    verdict: 'incorrect',
    hit: [],
    missed,
    matchedAccepted: false,
    message: 'Not quite yet — that answer doesn’t touch the core idea. Try the hint.',
  };
}
