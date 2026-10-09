// Imperative controller around ONE sandboxed iframe. Used for the visible
// preview and for the hidden "checker" frame that runs completion checks.

import type { RuntimeStep } from '../content/challenges';
import {
  buildPreviewDoc, newRunId, parsePreviewMessage, SANDBOX_ATTR,
  type CheckResultMsg, type ConsoleMsg, type ErrorMsg, type PageSummary, type TraceEvent,
} from './protocol';

export type FrameListener = {
  onConsole?: (m: ConsoleMsg) => void;
  onError?: (m: ErrorMsg) => void;
  onTrace?: (t: TraceEvent) => void;
};

export const READY_TIMEOUT_MS = 5000;
export const CHECK_TIMEOUT_MS = 5000;

export class StuckError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'StuckError';
  }
}

/** Thrown when a newer run replaced this one before it finished loading. */
export class SupersededError extends Error {
  constructor() {
    super('Superseded by a newer run');
    this.name = 'SupersededError';
  }
}

export class SandboxFrame {
  private iframe: HTMLIFrameElement | null = null;
  private runId = '';
  private readyResolve: ((s: PageSummary) => void) | null = null;
  private readyReject: ((e: Error) => void) | null = null;
  private pendingChecks = new Map<string, (r: CheckResultMsg) => void>();
  private onMessage = (ev: MessageEvent) => this.handle(ev);

  constructor(
    private container: HTMLElement,
    private listener: FrameListener = {},
    private title = 'Code preview',
  ) {
    window.addEventListener('message', this.onMessage);
  }

  setListener(l: FrameListener) {
    this.listener = l;
  }

  private handle(ev: MessageEvent) {
    // Opaque-origin frames report origin "null", so we authenticate by the
    // exact source window plus the unguessable per-run id.
    if (!this.iframe || ev.source !== this.iframe.contentWindow) return;
    const msg = parsePreviewMessage(ev.data, this.runId);
    if (!msg) return;
    switch (msg.type) {
      case 'console':
        this.listener.onConsole?.(msg.payload);
        break;
      case 'error':
        this.listener.onError?.(msg.payload);
        break;
      case 'trace':
        this.listener.onTrace?.(msg.payload);
        break;
      case 'ready':
        this.readyResolve?.(msg.payload);
        this.readyResolve = null;
        this.readyReject = null;
        break;
      case 'check-result': {
        const r = this.pendingChecks.get(msg.payload.checkId);
        if (r) {
          this.pendingChecks.delete(msg.payload.checkId);
          r(msg.payload);
        }
        break;
      }
    }
  }

  /** Destroy the current frame (this also halts any code running in it). */
  stop() {
    // A load that is still waiting must never hang forever: reject it.
    this.readyReject?.(new SupersededError());
    this.readyReject = null;
    this.readyResolve = null;
    for (const r of this.pendingChecks.values()) r({ checkId: '', ok: false, detail: 'The preview was restarted.' });
    this.pendingChecks.clear();
    this.runId = '';
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }

  /** Load code into a brand-new sandboxed frame; resolves when the page has loaded. */
  load(code: string, opts: { fault?: number | null } = {}): Promise<PageSummary> {
    this.stop();
    this.runId = newRunId();
    const f = document.createElement('iframe');
    f.setAttribute('sandbox', SANDBOX_ATTR);
    f.setAttribute('referrerpolicy', 'no-referrer');
    f.setAttribute('allow', "camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'; usb 'none'");
    f.setAttribute('title', this.title);
    f.setAttribute('loading', 'eager');
    f.className = 'sandbox-frame';
    const runId = this.runId;
    const p = new Promise<PageSummary>((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
      setTimeout(() => {
        if (this.runId === runId && this.readyResolve === resolve) {
          this.readyResolve = null;
          this.readyReject = null;
          reject(new StuckError('The preview didn’t finish loading within 5 seconds. Your code may be stuck in an endless loop.'));
        }
      }, READY_TIMEOUT_MS);
    });
    f.srcdoc = buildPreviewDoc(code, { runId, fault: opts.fault ?? null });
    this.iframe = f;
    this.container.appendChild(f);
    return p;
  }

  check(steps: RuntimeStep[]): Promise<CheckResultMsg> {
    const win = this.iframe?.contentWindow;
    if (!win) return Promise.resolve({ checkId: '', ok: false, detail: 'Preview is not running' });
    const checkId = newRunId().slice(0, 12);
    const runId = this.runId;
    return new Promise((resolve) => {
      this.pendingChecks.set(checkId, resolve);
      setTimeout(() => {
        if (this.pendingChecks.has(checkId)) {
          this.pendingChecks.delete(checkId);
          resolve({ checkId, ok: false, detail: 'Timed out — the page may be stuck in a loop.' });
        }
      }, CHECK_TIMEOUT_MS);
      // targetOrigin must be '*' for an opaque-origin frame; the payload
      // carries no secrets and the frame only accepts messages from its parent.
      win.postMessage({ channel: 'coded-parent', runId, type: 'check', checkId, steps }, '*');
    });
  }

  dispose() {
    this.stop();
    window.removeEventListener('message', this.onMessage);
  }
}
