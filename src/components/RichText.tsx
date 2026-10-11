import { Fragment, type ReactNode } from 'react';

// Renders card text where `backticks` mark code (``double backticks`` may wrap
// code that itself contains a backtick). Consecutive lines that are entirely
// code are grouped into a code block; everything else stays readable prose.

type Seg = { code: boolean; text: string };

export function parseInline(line: string): Seg[] {
  const out: Seg[] = [];
  const re = /``(.+?)``|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ code: false, text: line.slice(last, m.index) });
    out.push({ code: true, text: m[1] ?? m[2] });
    last = re.lastIndex;
  }
  if (last < line.length) out.push({ code: false, text: line.slice(last) });
  return out;
}

/** A line that is only code (plus indentation / trailing punctuation). */
function codeOnly(segs: Seg[]): string | null {
  const prose = segs.filter((s) => !s.code).map((s) => s.text).join('');
  if (!segs.some((s) => s.code) || /[^\s.,;:]/.test(prose)) return null;
  const lead = segs[0] && !segs[0].code ? segs[0].text.match(/^\s*/)?.[0] ?? '' : '';
  return lead + segs.filter((s) => s.code).map((s) => s.text).join(' ');
}

function Inline({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) => (s.code ? <code key={i} className="ic">{s.text}</code> : <Fragment key={i}>{s.text}</Fragment>))}
    </>
  );
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n');
  const blocks: ReactNode[] = [];
  let codeBuf: string[] = [];
  let proseBuf: Seg[][] = [];
  const flushCode = () => {
    while (codeBuf.length && codeBuf[codeBuf.length - 1] === '') codeBuf.pop();
    if (codeBuf.length) blocks.push(<pre key={`c${blocks.length}`} className="code-block"><code>{codeBuf.join('\n')}</code></pre>);
    codeBuf = [];
  };
  const flushProse = () => {
    if (proseBuf.length)
      blocks.push(
        <span key={`p${blocks.length}`} className="rt-line">
          {proseBuf.map((segs, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              <Inline segs={segs} />
            </Fragment>
          ))}
        </span>,
      );
    proseBuf = [];
  };
  for (const line of lines) {
    if (line.trim() === '' && codeBuf.length) {
      codeBuf.push(''); // blank line inside a code snippet
      continue;
    }
    const segs = parseInline(line);
    const code = lines.length > 1 ? codeOnly(segs) : null;
    if (code !== null) {
      flushProse();
      codeBuf.push(code);
    } else {
      flushCode();
      proseBuf.push(segs);
    }
  }
  flushCode();
  flushProse();
  return <span className={`rich${className ? ' ' + className : ''}`}>{blocks}</span>;
}
