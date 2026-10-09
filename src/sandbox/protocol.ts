// Parent-side half of the preview protocol: builds the sandboxed document and
// validates every message that comes back out of it.

import { bridge } from './bridge';

/**
 * The iframe gets ONLY `allow-scripts`. No allow-same-origin (so learner code
 * runs in an opaque origin and can't touch the app, its storage or cookies),
 * no forms, popups, downloads, top-navigation or modals.
 */
export const SANDBOX_ATTR = 'allow-scripts';

/**
 * Content-Security-Policy for learner documents: inline code only, no network
 * of any kind, no external scripts/styles/fonts/frames, no form posts.
 */
export const PREVIEW_CSP = [
  "default-src 'none'",
  "script-src 'unsafe-inline'",
  "style-src 'unsafe-inline'",
  'img-src data: blob:',
  'font-src data:',
  "connect-src 'none'",
  "media-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join('; ');

const BASE_STYLE = `body{margin:0;padding:16px;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#111;background:#fff;line-height:1.5}`;

export function newRunId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function buildPreviewDoc(code: string, opts: { runId: string; fault?: number | null }): string {
  // Everything before the learner's code sits on line 1 so error line numbers
  // map straight onto the editor (lineOffset = 0 lines before the body).
  const cfg = JSON.stringify({ runId: opts.runId, fault: opts.fault ?? null, lineOffset: 0 });
  const bridgeSrc = `(${bridge.toString()})(${cfg});`.replace(/\n\s*/g, ' ').replace(/<\/script/gi, '<\\/script');
  const head =
    `<!doctype html><html><head><meta charset="utf-8">` +
    `<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<style data-coded-base>${BASE_STYLE}</style>` +
    `<script>${bridgeSrc}</script></head><body>`;
  return `${head}${code}\n</body></html>`;
}

// ---------- incoming message validation ----------

export type ConsoleMsg = { level: 'log' | 'info' | 'warn' | 'error'; text: string };
export type ErrorMsg = { message: string; line: number | null };
export type TraceEvent = {
  kind: 'listen' | 'handler' | 'event' | 'dom' | 'attr' | 'request' | 'response' | 'json';
  t: number;
  [k: string]: unknown;
};
export type PageSummary = {
  counts: Record<string, number>;
  outline: { tag: string; text: string; depth: number }[];
  rules: { selector: string; declarations: string; matches: number }[];
  title: string;
};
export type CheckResultMsg = { checkId: string; ok: boolean; detail: string };

export type PreviewMessage =
  | { type: 'console'; payload: ConsoleMsg }
  | { type: 'error'; payload: ErrorMsg }
  | { type: 'trace'; payload: TraceEvent }
  | { type: 'ready'; payload: PageSummary }
  | { type: 'check-result'; payload: CheckResultMsg };

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown, max = 1000) => (typeof v === 'string' ? v.slice(0, max) : '');

const TRACE_KINDS = new Set(['listen', 'handler', 'event', 'dom', 'attr', 'request', 'response', 'json']);

/**
 * Validate a message from the preview. Returns null for anything that isn't a
 * well-formed message from the CURRENT run of THIS iframe. Callers must also
 * check event.source === iframe.contentWindow (origins are opaque, "null").
 */
export function parsePreviewMessage(data: unknown, runId: string): PreviewMessage | null {
  if (!isObj(data) || data.channel !== 'coded-preview' || data.runId !== runId) return null;
  const p = data.payload;
  switch (data.type) {
    case 'console': {
      if (!isObj(p)) return null;
      const level = ['log', 'info', 'warn', 'error'].includes(String(p.level)) ? (p.level as ConsoleMsg['level']) : 'log';
      return { type: 'console', payload: { level, text: str(p.text, 1000) } };
    }
    case 'error': {
      if (!isObj(p)) return null;
      const line = typeof p.line === 'number' && Number.isFinite(p.line) ? Math.max(1, Math.round(p.line)) : null;
      return { type: 'error', payload: { message: str(p.message, 500) || 'Unknown error', line } };
    }
    case 'trace': {
      if (!isObj(p) || !TRACE_KINDS.has(String(p.kind))) return null;
      const clean: TraceEvent = { kind: p.kind as TraceEvent['kind'], t: typeof p.t === 'number' ? p.t : 0 };
      for (const [k, v] of Object.entries(p)) {
        if (k === 'kind' || k === 't') continue;
        if (typeof v === 'string') clean[k] = v.slice(0, 300);
        else if (typeof v === 'number' || typeof v === 'boolean' || v === null) clean[k] = v;
        else if (Array.isArray(v)) clean[k] = v.slice(0, 10).map((x) => str(x, 60));
      }
      return { type: 'trace', payload: clean };
    }
    case 'ready': {
      if (!isObj(p)) return null;
      const counts: Record<string, number> = {};
      if (isObj(p.counts))
        for (const [k, v] of Object.entries(p.counts)) if (typeof v === 'number' && /^[a-z0-9-]{1,20}$/.test(k)) counts[k] = v;
      const outline = Array.isArray(p.outline)
        ? p.outline.filter(isObj).slice(0, 40).map((o) => ({
            tag: str(o.tag, 40),
            text: str(o.text, 80),
            depth: typeof o.depth === 'number' ? Math.min(10, Math.max(0, o.depth)) : 0,
          }))
        : [];
      const rules = Array.isArray(p.rules)
        ? p.rules.filter(isObj).slice(0, 30).map((r) => ({
            selector: str(r.selector, 120),
            declarations: str(r.declarations, 240),
            matches: typeof r.matches === 'number' ? r.matches : 0,
          }))
        : [];
      return { type: 'ready', payload: { counts, outline, rules, title: str(p.title, 100) } };
    }
    case 'check-result': {
      if (!isObj(p) || typeof p.ok !== 'boolean') return null;
      return { type: 'check-result', payload: { checkId: str(p.checkId, 60), ok: p.ok, detail: str(p.detail, 300) } };
    }
    default:
      return null;
  }
}
