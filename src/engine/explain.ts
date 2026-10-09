// Deterministic explanations built from the learner's actual code and the
// actual events recorded while it ran. Nothing here is invented: every line
// points at a real line of code or a real trace event.

import type { CodePattern } from '../content/challenges';
import type { TraceEvent } from '../sandbox/protocol';

export type DiffLine = { kind: 'added' | 'removed'; line: number; text: string };

/** Line-level LCS diff between starter and current code. */
export function lineDiff(before: string, after: string): DiffLine[] {
  const a = before.split('\n');
  const b = after.split('\n');
  // Guard against pathological sizes
  if (a.length * b.length > 400_000) {
    return [{ kind: 'added', line: 1, text: `(${b.length} lines — too large to diff)` }];
  }
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ kind: 'removed', line: i + 1, text: a[i] });
      i++;
    } else {
      out.push({ kind: 'added', line: j + 1, text: b[j] });
      j++;
    }
  }
  while (i < a.length) out.push({ kind: 'removed', line: i + 1, text: a[i++] });
  while (j < b.length) out.push({ kind: 'added', line: j + 1, text: b[j++] });
  return out.filter((d) => d.text.trim() !== '');
}

export type PatternHit = { line: number; snippet: string; text: string; conceptId?: string };

export function lineOf(code: string, index: number): number {
  let n = 1;
  for (let i = 0; i < index && i < code.length; i++) if (code[i] === '\n') n++;
  return n;
}

/** Find each explanation pattern in the code (comments excluded), in source order. */
export function matchPatterns(code: string, patterns: CodePattern[], mode: 'web' | 'sql' = 'web', max = 14): PatternHit[] {
  // Blank out comments but keep offsets so line numbers stay correct.
  const blank = (m: string) => m.replace(/[^\n]/g, ' ');
  const masked =
    mode === 'sql'
      ? code.replace(/--.*$/gm, blank)
      : code
          .replace(/<!--[\s\S]*?-->/g, blank)
          .replace(/\/\*[\s\S]*?\*\//g, blank)
          .replace(/(^|[^:])(\/\/.*$)/gm, (_m, p1: string, p2: string) => p1 + blank(p2));
  const hits: (PatternHit & { index: number })[] = [];
  const seen = new Set<string>();
  for (const p of patterns) {
    const re = new RegExp(p.re.source, p.re.flags.includes('g') ? p.re.flags : p.re.flags + 'g');
    let m: RegExpExecArray | null;
    let guard = 0;
    while ((m = re.exec(masked)) && guard++ < 50) {
      if (m[0].length === 0) {
        re.lastIndex++;
        continue;
      }
      const line = lineOf(code, m.index);
      const key = `${line}:${p.re.source}`;
      if (seen.has(key)) continue;
      seen.add(key);
      let text: string;
      try {
        text = p.explain(m);
      } catch {
        continue;
      }
      hits.push({ index: m.index, line, snippet: m[0].trim().slice(0, 80), text, conceptId: p.conceptId });
    }
  }
  hits.sort((x, y) => x.index - y.index);
  return hits.slice(0, max).map(({ index: _i, ...h }) => h);
}

/** Turn raw trace events into plain-English steps. */
export function describeTrace(events: TraceEvent[]): { icon: string; text: string; kind: TraceEvent['kind'] }[] {
  const out: { icon: string; text: string; kind: TraceEvent['kind'] }[] = [];
  for (const e of events) {
    switch (e.kind) {
      case 'listen':
        out.push({ kind: e.kind, icon: '👂', text: `Your code registered a “${e.event}” listener on ${e.target}.` });
        break;
      case 'event':
        out.push({ kind: e.kind, icon: '⚡', text: `The browser fired a “${e.event}” event on ${e.target}${e.synthetic ? ' (from the checker)' : ''}.` });
        break;
      case 'handler':
        out.push({ kind: e.kind, icon: '▶', text: `Your ${e.event} handler${e.name ? ` ${e.name}()` : ''} ran.` });
        break;
      case 'dom':
        out.push({
          kind: e.kind,
          icon: '✎',
          text: e.from
            ? `The DOM changed: ${e.target} text went from “${e.from}” to “${e.to}”.`
            : Array.isArray(e.added) && e.added.length
              ? `The DOM changed: added ${(e.added as string[]).join(', ')} inside ${e.target}.`
              : `The DOM changed: ${e.target} now reads “${e.to}”.`,
        });
        break;
      case 'attr':
        out.push({ kind: e.kind, icon: '🎨', text: `The ${e.attr} attribute of ${e.target} changed.` });
        break;
      case 'request':
        out.push({ kind: e.kind, icon: '↗', text: `Request sent: ${e.method} ${e.url}${e.body && e.body !== 'null' ? ` with body ${e.body}` : ''}.` });
        break;
      case 'response':
        out.push({ kind: e.kind, icon: '↙', text: `Response received: status ${e.status} with body ${e.body}.` });
        break;
      case 'json':
        out.push({ kind: e.kind, icon: '{ }', text: e.error ? 'Parsing the JSON failed — the body wasn’t valid JSON.' : `response.json() parsed the body into ${e.summary}.` });
        break;
    }
  }
  // Collapse runs of identical lines (e.g. 5 clicks) into "×N"
  const collapsed: typeof out = [];
  for (const step of out) {
    const prev = collapsed[collapsed.length - 1];
    const m = prev?.text.match(/^(.*?)(?: ×(\d+))?$/);
    if (prev && m && m[1] === step.text) {
      prev.text = `${step.text} ×${Number(m[2] ?? 1) + 1}`;
    } else collapsed.push({ ...step });
  }
  return collapsed.slice(0, 40);
}
