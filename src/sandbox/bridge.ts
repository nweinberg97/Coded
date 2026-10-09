// The "bridge" is a small trusted script injected at the top of every preview
// document. It runs INSIDE the sandboxed iframe (opaque origin, scripts only),
// never in the app. It:
//   • captures console output and runtime errors
//   • records an event trace (listeners registered, events fired, DOM changes,
//     simulated network calls) so "Under the hood" can explain what really ran
//   • provides a simulated `fetch` + `mockServer` (no real network — CSP blocks it)
//   • executes declarative completion checks requested by the parent
// It talks to the parent ONLY through postMessage with a per-run random id.
//
// This function is serialized with .toString(), so it must be self-contained:
// no imports, no references to outer variables.

/* eslint-disable */
export function bridge(config: { runId: string; fault: number | null; lineOffset: number }) {
  var RUN = config.runId;
  var OFFSET = config.lineOffset;
  var send = function (type: string, payload: unknown) {
    try {
      window.parent.postMessage({ channel: 'coded-preview', runId: RUN, type: type, payload: payload }, '*');
    } catch (e) {
      /* ignore */
    }
  };
  var me = document.currentScript;
  if (me && me.parentNode) me.parentNode.removeChild(me);

  /* ---------- helpers ---------- */
  var clip = function (s: unknown, n?: number) {
    var str = String(s);
    var max = n || 400;
    return str.length > max ? str.slice(0, max) + '…' : str;
  };
  var safe = function (v: unknown, depth?: number): string {
    var d = depth || 0;
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return d === 0 ? v : JSON.stringify(v);
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (typeof v === 'function') return 'ƒ ' + ((v as Function).name || 'anonymous') + '()';
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (typeof Element !== 'undefined' && v instanceof Element) return '<' + v.tagName.toLowerCase() + '>';
    if (d > 2) return Array.isArray(v) ? '[…]' : '{…}';
    try {
      if (Array.isArray(v)) return '[' + v.slice(0, 20).map(function (x) { return safe(x, d + 1); }).join(', ') + (v.length > 20 ? ', …' : '') + ']';
      var keys = Object.keys(v as object).slice(0, 20);
      return '{ ' + keys.map(function (k) { return k + ': ' + safe((v as any)[k], d + 1); }).join(', ') + ' }';
    } catch (e) {
      return '[object]';
    }
  };
  var describe = function (el: any): string {
    if (!el) return 'unknown';
    if (el === window) return 'window';
    if (el === document) return 'document';
    if (!el.tagName) return el.nodeName ? el.nodeName.toLowerCase() : 'node';
    var s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    else if (el.classList && el.classList.length) s += '.' + Array.prototype.slice.call(el.classList, 0, 2).join('.');
    return s;
  };
  var traceCount = 0;
  var trace = function (kind: string, data: Record<string, unknown>) {
    if (traceCount++ > 400) return;
    data.kind = kind;
    data.t = Math.round(performance.now());
    send('trace', data);
  };

  /* ---------- console ---------- */
  ['log', 'info', 'warn', 'error'].forEach(function (level) {
    var orig = (console as any)[level];
    (console as any)[level] = function () {
      var args = Array.prototype.slice.call(arguments);
      send('console', { level: level, text: clip(args.map(function (a: unknown) { return safe(a); }).join(' '), 1000) });
      try { orig.apply(console, args); } catch (e) { /* ignore */ }
    };
  });

  /* ---------- errors ---------- */
  window.addEventListener('error', function (e) {
    send('error', {
      message: clip(e.message || 'Unknown error', 500),
      line: typeof e.lineno === 'number' && e.lineno > 0 ? Math.max(1, e.lineno - OFFSET) : null,
    });
  });
  window.addEventListener('unhandledrejection', function (e: PromiseRejectionEvent) {
    var r = e.reason;
    send('error', { message: clip('Unhandled promise rejection: ' + (r && r.message ? r.message : safe(r)), 500), line: null });
  });

  /* ---------- event tracing ---------- */
  var wrapped = new WeakMap();
  var origAdd = EventTarget.prototype.addEventListener;
  var origRemove = EventTarget.prototype.removeEventListener;
  var USER_EVENTS: Record<string, 1> = { click: 1, input: 1, change: 1, keydown: 1, submit: 1, dblclick: 1, mouseenter: 1 };
  EventTarget.prototype.addEventListener = function (this: EventTarget, type: string, fn: any, opts?: any) {
    if (typeof fn === 'function' && USER_EVENTS[type]) {
      var target = this;
      trace('listen', { event: type, target: describe(target) });
      var w = wrapped.get(fn);
      if (!w) {
        w = function (this: unknown, ev: Event) {
          trace('handler', { event: type, target: describe(target), name: fn.name || '' });
          return fn.apply(this, arguments as any);
        };
        wrapped.set(fn, w);
      }
      return origAdd.call(this, type, w, opts);
    }
    return origAdd.call(this, type, fn, opts);
  } as any;
  EventTarget.prototype.removeEventListener = function (this: EventTarget, type: string, fn: any, opts?: any) {
    return origRemove.call(this, type, (fn && wrapped.get(fn)) || fn, opts);
  } as any;
  Object.keys(USER_EVENTS).forEach(function (type) {
    origAdd.call(window, type, function (ev: Event) {
      if (type === 'mouseenter') return;
      trace('event', { event: type, target: describe(ev.target), synthetic: !ev.isTrusted });
    }, true);
  });

  /* ---------- DOM change tracing ---------- */
  var startObserver = function () {
    if (!document.body) return;
    var mo = new MutationObserver(function (records) {
      var textChanges: Record<string, { el: string; from: string; to: string }> = {};
      var added: string[] = [];
      var removed = 0;
      records.forEach(function (r) {
        var el: any = r.type === 'characterData' ? r.target.parentElement : r.target;
        if (r.type === 'childList') {
          r.addedNodes.forEach(function (n: any) {
            if (n.nodeType === 1) added.push(describe(n));
          });
          removed += Array.prototype.filter.call(r.removedNodes, function (n: any) { return n.nodeType === 1; }).length;
        }
        if (el && (r.type === 'characterData' || r.type === 'childList')) {
          var key = describe(el);
          var to = clip((el.textContent || '').trim(), 80);
          if (!textChanges[key]) {
            var from = r.type === 'characterData' ? clip(String(r.oldValue || '').trim(), 80) : '';
            textChanges[key] = { el: key, from: from, to: to };
          } else textChanges[key].to = to;
        }
        if (r.type === 'attributes') {
          trace('attr', { target: describe(el), attr: r.attributeName });
        }
      });
      Object.keys(textChanges).slice(0, 6).forEach(function (k) {
        var c = textChanges[k];
        trace('dom', { target: c.el, from: c.from, to: c.to, added: added.slice(0, 6), removed: removed });
      });
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true, characterDataOldValue: true, attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
  };

  /* ---------- simulated network: mockServer + fetch ---------- */
  var routes: Array<{ method: string; path: string; handler: Function }> = [];
  (window as any).mockServer = {
    route: function (method: string, path: string, handler: Function) {
      routes.push({ method: String(method).toUpperCase(), path: String(path), handler: handler });
    },
  };
  var makeResponse = function (status: number, body: unknown) {
    var text = typeof body === 'string' ? body : JSON.stringify(body === undefined ? null : body);
    var reasons: Record<number, string> = { 200: 'OK', 201: 'Created', 204: 'No Content', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 429: 'Too Many Requests', 500: 'Internal Server Error', 503: 'Service Unavailable' };
    return {
      status: status,
      ok: status >= 200 && status < 300,
      statusText: reasons[status] || '',
      headers: { get: function (h: string) { return String(h).toLowerCase() === 'content-type' ? 'application/json' : null; } },
      json: function () {
        return new Promise(function (resolve, reject) {
          try {
            var parsed = JSON.parse(text);
            trace('json', { summary: Array.isArray(parsed) ? 'an array of ' + parsed.length + ' item(s)' : parsed && typeof parsed === 'object' ? 'an object with keys ' + Object.keys(parsed).slice(0, 6).join(', ') : typeof parsed });
            resolve(parsed);
          } catch (e) {
            trace('json', { summary: 'invalid JSON', error: true });
            reject(new SyntaxError('The response was not valid JSON'));
          }
        });
      },
      text: function () { return Promise.resolve(text); },
    };
  };
  (window as any).fetch = function (input: unknown, init?: { method?: string; body?: unknown }) {
    var url = String(input);
    var method = String((init && init.method) || 'GET').toUpperCase();
    var qIndex = url.indexOf('?');
    var path = qIndex === -1 ? url : url.slice(0, qIndex);
    var query: Record<string, string> = {};
    if (qIndex !== -1) {
      url.slice(qIndex + 1).split('&').forEach(function (pair) {
        var kv = pair.split('=');
        if (kv[0]) query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
      });
    }
    var body: unknown = init && init.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { /* keep string */ } }
    trace('request', { method: method, url: url, body: body === undefined ? null : clip(safe(body, 1), 200) });
    return new Promise(function (resolve) {
      setTimeout(function () {
        var status = 404;
        var resBody: unknown = { error: 'No route for ' + method + ' ' + path };
        if (/^https?:\/\//i.test(url)) {
          status = 503;
          resBody = { error: 'Real internet requests are disabled in the sandbox. Use mockServer.route to simulate a server.' };
        } else {
          var route = routes.filter(function (r) { return r.path === path && r.method === method; })[0];
          if (route) {
            try {
              var out = route.handler({ method: method, path: path, query: query, body: body }) || {};
              status = typeof out.status === 'number' ? out.status : 200;
              resBody = out.body;
            } catch (e: any) {
              status = 500;
              resBody = { error: 'The mock server crashed: ' + (e && e.message) };
            }
          } else if (routes.some(function (r) { return r.path === path; })) {
            status = 405;
            resBody = { error: method + ' is not allowed on ' + path };
          }
        }
        if (config.fault) {
          status = config.fault;
          resBody = { error: config.fault === 404 ? 'Not found' : 'Server error' };
        }
        trace('response', { status: status, url: url, body: clip(JSON.stringify(resBody === undefined ? null : resBody), 220) });
        resolve(makeResponse(status, resBody));
      }, 220);
    });
  };

  /* ---------- page summary for the explainer ---------- */
  var summarize = function () {
    var counts: Record<string, number> = {};
    var outline: Array<{ tag: string; text: string; depth: number }> = [];
    var walk = function (el: Element, depth: number) {
      for (var i = 0; i < el.children.length; i++) {
        var c = el.children[i];
        var tag = c.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style') continue;
        counts[tag] = (counts[tag] || 0) + 1;
        if (outline.length < 40) {
          var own = '';
          c.childNodes.forEach(function (n) { if (n.nodeType === 3) own += n.textContent; });
          outline.push({ tag: tag + (c.id ? '#' + c.id : ''), text: clip(own.trim(), 60), depth: depth });
        }
        walk(c, depth + 1);
      }
    };
    if (document.body) walk(document.body, 0);
    var rules: Array<{ selector: string; declarations: string; matches: number }> = [];
    try {
      for (var s = 0; s < document.styleSheets.length; s++) {
        var sheet = document.styleSheets[s] as CSSStyleSheet;
        if (sheet.ownerNode && (sheet.ownerNode as Element).hasAttribute && (sheet.ownerNode as Element).hasAttribute('data-coded-base')) continue;
        var list = sheet.cssRules;
        for (var r = 0; r < list.length && rules.length < 30; r++) {
          var rule = list[r] as CSSStyleRule;
          if (!rule.selectorText) continue;
          var n = 0;
          try { n = document.querySelectorAll(rule.selectorText).length; } catch (e) { n = 0; }
          rules.push({ selector: rule.selectorText, declarations: clip(rule.style.cssText, 200), matches: n });
        }
      }
    } catch (e) { /* ignore */ }
    return { counts: counts, outline: outline, rules: rules, title: document.title || '' };
  };

  /* ---------- declarative checks (run on request from parent) ---------- */
  var sleep = function (ms: number) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var q = function (sel: string) { return Array.prototype.slice.call(document.querySelectorAll(sel)) as HTMLElement[]; };
  var text = function (el: Element | undefined) { return el ? (el.textContent || '').replace(/\s+/g, ' ').trim() : ''; };
  var snapshots: Record<string, string> = {};
  var px = function (v: string) { var n = parseFloat(v); return isNaN(n) ? 0 : n; };

  var runStep = function (step: any): Promise<{ ok: boolean; detail: string }> {
    return new Promise(function (resolve) {
      try {
        var els: HTMLElement[] = step.sel ? q(step.sel) : [];
        var first = els[0];
        switch (step.op) {
          case 'exists':
            return resolve({ ok: els.length >= (step.min || 1), detail: 'found ' + els.length + ' × ' + step.sel });
          case 'count': {
            var n = els.length;
            var ok = step.cmp === '==' ? n === step.n : step.cmp === '>' ? n > step.n : n >= step.n;
            return resolve({ ok: ok, detail: 'found ' + n + ' × ' + step.sel });
          }
          case 'text': {
            var t = step.all ? els.map(text).join(' | ') : text(first);
            var re = new RegExp(step.re, step.flags || 'i');
            var ok2 = !!first && re.test(t);
            return resolve({ ok: step.negate ? !!first && !ok2 : ok2, detail: first ? '“' + clip(t, 80) + '”' : step.sel + ' not found' });
          }
          case 'everyText': {
            var reE = new RegExp(step.re, step.flags || 'i');
            var bad = els.filter(function (e) { return !reE.test(text(e)); });
            return resolve({ ok: els.length > 0 && bad.length === 0, detail: bad.length ? 'not matching: “' + clip(text(bad[0]), 60) + '”' : els.length + ' item(s) checked' });
          }
          case 'numbers': {
            var nums: number[] = [];
            els.forEach(function (e) {
              var m = text(e).match(/\$\s?(\d+(?:\.\d+)?)/);
              if (m) nums.push(parseFloat(m[1]));
            });
            var okN = nums.length > 0 && nums.length === els.length && nums.every(function (x) { return step.max === undefined || x < step.max; });
            return resolve({ ok: okN, detail: nums.length ? 'prices shown: ' + nums.join(', ') : 'no $ prices found in ' + step.sel });
          }
          case 'style': {
            if (!first) return resolve({ ok: false, detail: step.sel + ' not found' });
            var v = getComputedStyle(first).getPropertyValue(step.prop).trim();
            var okS = true;
            if (step.notEquals !== undefined) okS = v !== step.notEquals;
            if (step.equals !== undefined) okS = v === step.equals;
            if (step.minPx !== undefined) okS = px(v) >= step.minPx;
            return resolve({ ok: okS, detail: step.prop + ': ' + v });
          }
          case 'click': {
            if (!first) return resolve({ ok: false, detail: step.sel + ' not found' });
            var times = step.times || 1;
            var i = 0;
            var tick = function () {
              if (i >= times) return resolve({ ok: true, detail: 'clicked ' + step.sel + ' ×' + times });
              i++;
              first.click();
              setTimeout(tick, 60);
            };
            return tick();
          }
          case 'input': {
            if (!first) return resolve({ ok: false, detail: step.sel + ' not found' });
            (first as HTMLInputElement).value = step.value;
            first.dispatchEvent(new Event('input', { bubbles: true }));
            return resolve({ ok: true, detail: 'typed “' + step.value + '”' });
          }
          case 'value': {
            if (!first) return resolve({ ok: false, detail: step.sel + ' not found' });
            var val = (first as HTMLInputElement).value;
            return resolve({ ok: val === step.equals, detail: 'value is “' + clip(val, 40) + '”' });
          }
          case 'key': {
            if (!first) return resolve({ ok: false, detail: step.sel + ' not found' });
            first.dispatchEvent(new KeyboardEvent('keydown', { key: step.key, bubbles: true }));
            return resolve({ ok: true, detail: 'pressed ' + step.key });
          }
          case 'snapshot':
            snapshots[step.as] = step.count ? String(els.length) : text(first);
            return resolve({ ok: true, detail: 'remembered ' + step.sel });
          case 'unchanged': {
            var now = step.count ? String(els.length) : text(first);
            return resolve({ ok: now === snapshots[step.as], detail: 'before: ' + snapshots[step.as] + ', after: ' + now });
          }
          case 'wait':
            return void setTimeout(function () { resolve({ ok: true, detail: 'waited' }); }, step.ms || 300);
          default:
            return resolve({ ok: false, detail: 'unknown check' });
        }
      } catch (e: any) {
        resolve({ ok: false, detail: 'check failed: ' + (e && e.message) });
      }
    });
  };

  window.addEventListener('message', function (ev: MessageEvent) {
    if (ev.source !== window.parent) return;
    var m = ev.data;
    if (!m || m.channel !== 'coded-parent' || m.runId !== RUN || m.type !== 'check' || !Array.isArray(m.steps)) return;
    var detail = '';
    var i = 0;
    var go = function (): any {
      if (i >= m.steps.length) return send('check-result', { checkId: String(m.checkId), ok: true, detail: detail });
      var step = m.steps[i++];
      return runStep(step).then(function (r) {
        detail = r.detail;
        if (!r.ok) return send('check-result', { checkId: String(m.checkId), ok: false, detail: r.detail });
        return sleep(30).then(go);
      });
    };
    go();
  });

  var onReady = function () {
    startObserver();
    setTimeout(function () { send('ready', summarize()); }, 30);
  };
  if (document.readyState === 'complete') onReady();
  else window.addEventListener('load', onReady);
}
