// Lightweight, explainable spaced repetition (Leitner boxes).
//
// box 0  = never answered (New)
// box 1–2 = Learning, box 3 = Reviewing, box ≥4 = Mastered
// A correct first-try answer on a DUE card moves it up one box; the next
// review is scheduled after that box's interval. A correct answer that needed
// a hint or a second try keeps the card in the low boxes. A miss sends it back
// to box 1 so it returns soon. Answering a card that is NOT due is "practice":
// it can only demote (on a miss), never promote — so cramming can't fake mastery.

export type CardStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

export type ReviewState = {
  box: number;
  /** epoch ms when the card is next due (0 = due now) */
  due: number;
  /** total graded answers (correct or not) */
  attempts: number;
  /** number of correct answers (any attempt) */
  correct: number;
  /** number of times the learner missed or revealed it */
  lapses: number;
  /** spaced reviews completed while due (used to key review XP) */
  reviews: number;
  lastAnswered: number;
  lastResult?: 'correct' | 'assisted' | 'missed';
};

export const MINUTE = 60_000;
export const DAY = 24 * 60 * MINUTE;

/** Interval after reaching each box. */
export const INTERVALS = [0, 10 * MINUTE, 1 * DAY, 3 * DAY, 7 * DAY, 21 * DAY];
export const MAX_BOX = INTERVALS.length - 1;
export const MASTERED_BOX = 4;

export function newReview(): ReviewState {
  return { box: 0, due: 0, attempts: 0, correct: 0, lapses: 0, reviews: 0, lastAnswered: 0 };
}

export function statusOf(r: ReviewState | undefined): CardStatus {
  if (!r || (r.attempts === 0 && r.box === 0)) return 'new';
  if (r.box >= MASTERED_BOX) return 'mastered';
  if (r.box === 3) return 'reviewing';
  return 'learning';
}

export function isDue(r: ReviewState | undefined, now: number): boolean {
  if (!r) return false; // new cards are "new", not "due"
  if (r.attempts === 0) return false;
  return r.due <= now;
}

/** Has the learner ever produced a correct answer for this card? */
export function isLearned(r: ReviewState | undefined): boolean {
  return !!r && r.correct > 0;
}

export type Outcome = 'correct' | 'assisted' | 'missed';

export function schedule(prev: ReviewState | undefined, outcome: Outcome, now: number): ReviewState {
  const r = prev ? { ...prev } : newReview();
  const wasNew = r.attempts === 0;
  const due = wasNew || r.due <= now;
  r.attempts += 1;
  r.lastAnswered = now;
  r.lastResult = outcome;

  if (outcome === 'missed') {
    r.lapses += 1;
    r.box = 1;
    r.due = now + INTERVALS[1];
    return r;
  }

  r.correct += 1;
  if (!due) {
    // Practice on a card that isn't due: no promotion, schedule unchanged.
    return r;
  }
  if (!wasNew) r.reviews += 1;
  if (outcome === 'correct') {
    r.box = Math.min(MAX_BOX, r.box + 1);
  } else {
    // assisted: counts as learned, but stays low so it comes back soon
    r.box = Math.max(1, Math.min(r.box, 2));
  }
  r.due = now + INTERVALS[r.box];
  return r;
}

export function describeDue(r: ReviewState | undefined, now: number): string {
  if (!r || r.attempts === 0) return 'New';
  const ms = r.due - now;
  if (ms <= 0) return 'Due now';
  if (ms < 60 * MINUTE) return `Due in ${Math.ceil(ms / MINUTE)} min`;
  if (ms < DAY) return `Due in ${Math.ceil(ms / (60 * MINUTE))} h`;
  return `Due in ${Math.ceil(ms / DAY)} d`;
}
