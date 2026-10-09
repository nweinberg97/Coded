// Tiny syntax highlighter for HTML (with embedded CSS/JS) and SQL.
// Output is HTML-escaped, so it is safe to render with innerHTML.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const span = (cls: string, s: string) => `<span class="tk-${cls}">${esc(s)}</span>`;

const JS_KW = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'of', 'in', 'new', 'true', 'false',
  'null', 'undefined', 'this', 'async', 'await', 'try', 'catch', 'throw', 'class', 'import', 'export', 'break',
  'continue', 'typeof', 'switch', 'case', 'default',
]);

export function highlightJs(src: string): string {
  let out = '';
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|([\s\S])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[1]) out += span('comment', m[1]);
    else if (m[2]) out += span('string', m[2]);
    else if (m[3]) out += span('number', m[3]);
    else if (m[4]) {
      const next = src.slice(re.lastIndex).match(/^\s*\(/);
      out += JS_KW.has(m[4]) ? span('keyword', m[4]) : next ? span('fn', m[4]) : esc(m[4]);
    } else out += /[{}()[\];,.=+\-*/<>!&|?:]/.test(m[5]) ? span('punct', m[5]) : esc(m[5]);
  }
  return out;
}

export function highlightCss(src: string): string {
  let out = '';
  const re = /(\/\*[\s\S]*?\*\/)|([^{}]+)(\{)|([\w-]+)(\s*:)([^;}]*)|([\s\S])/g;
  let m: RegExpExecArray | null;
  let inBlock = false;
  while ((m = re.exec(src))) {
    if (m[1]) out += span('comment', m[1]);
    else if (m[2] !== undefined && m[3] && !inBlock) {
      out += span('selector', m[2]) + span('punct', m[3]);
      inBlock = true;
    } else if (m[4] && inBlock) {
      out += span('prop', m[4]) + span('punct', m[5]) + span('value', m[6]);
    } else if (m[7] === '}') {
      out += span('punct', '}');
      inBlock = false;
    } else if (m[2] !== undefined) {
      out += esc(m[2]) + esc(m[3] ?? '');
    } else out += esc(m[0]);
  }
  return out;
}

function highlightTag(tag: string): string {
  // <name attr="v" ...>
  const m = tag.match(/^(<\/?)([\w-]*)([\s\S]*?)(\/?>)$/);
  if (!m) return esc(tag);
  let attrs = '';
  const re = /([\w-:@]+)(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+)?|([\s\S])/g;
  let a: RegExpExecArray | null;
  while ((a = re.exec(m[3]))) {
    if (a[1]) attrs += span('attr', a[1]) + (a[2] ? esc(a[2]) : '') + (a[3] ? span('string', a[3]) : '');
    else attrs += esc(a[4]);
  }
  return span('punct', m[1]) + span('tag', m[2]) + attrs + span('punct', m[4]);
}

export function highlightHtml(src: string): string {
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src.startsWith('<!--', i)) {
      const end = src.indexOf('-->', i + 4);
      const j = end === -1 ? src.length : end + 3;
      out += span('comment', src.slice(i, j));
      i = j;
      continue;
    }
    if (src[i] === '<' && /[A-Za-z/!]/.test(src[i + 1] ?? '')) {
      const end = src.indexOf('>', i);
      if (end === -1) {
        out += esc(src.slice(i));
        break;
      }
      const tag = src.slice(i, end + 1);
      out += highlightTag(tag);
      i = end + 1;
      const name = (tag.match(/^<([\w-]+)/)?.[1] ?? '').toLowerCase();
      if (name === 'script' || name === 'style') {
        const close = src.toLowerCase().indexOf(`</${name}`, i);
        const j = close === -1 ? src.length : close;
        const body = src.slice(i, j);
        out += name === 'script' ? highlightJs(body) : highlightCss(body);
        i = j;
      }
      continue;
    }
    const next = src.indexOf('<', i + 1);
    const j = next === -1 ? src.length : next;
    out += esc(src.slice(i, j));
    i = j;
  }
  return out;
}

const SQL_KW = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE',
  'PRIMARY', 'KEY', 'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'LIKE',
  'TRUE', 'FALSE', 'COUNT', 'INTEGER', 'REAL', 'TEXT', 'BOOLEAN',
]);

export function highlightSql(src: string): string {
  let out = '';
  const re = /(--[^\n]*)|('(?:''|[^'])*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|([\s\S])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[1]) out += span('comment', m[1]);
    else if (m[2]) out += span('string', m[2]);
    else if (m[3]) out += span('number', m[3]);
    else if (m[4]) out += SQL_KW.has(m[4].toUpperCase()) ? span('keyword', m[4]) : esc(m[4]);
    else out += /[(),;*=<>]/.test(m[5]) ? span('punct', m[5]) : esc(m[5]);
  }
  return out;
}
