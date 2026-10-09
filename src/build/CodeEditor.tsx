import { useMemo, useRef, type KeyboardEvent } from 'react';
import { highlightHtml, highlightSql } from './highlight';

// A lightweight code editor: a real <textarea> (so typing, selection, undo,
// IME, spellcheck-off and screen readers all behave natively) layered over a
// syntax-highlighted <pre>. Tab indents; Esc then Tab moves focus onward.
export function CodeEditor({
  value, onChange, language, errorLine, label, onRun,
}: {
  value: string;
  onChange: (v: string) => void;
  language: 'html' | 'sql';
  errorLine?: number | null;
  label: string;
  onRun?: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const escaped = useRef(false);
  const html = useMemo(() => (language === 'sql' ? highlightSql(value) : highlightHtml(value)) + '\n', [value, language]);
  const lines = value.split('\n').length;

  function insert(text: string, selStart: number, selEnd: number) {
    const el = ref.current!;
    el.focus();
    el.setSelectionRange(selStart, selEnd);
    // execCommand keeps the browser's native undo stack working.
    const ok =
      typeof document.execCommand === 'function' &&
      (text ? document.execCommand('insertText', false, text) : document.execCommand('delete', false));
    if (!ok) {
      el.setRangeText(text, selStart, selEnd, 'end');
      onChange(el.value);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    const { selectionStart: s, selectionEnd: t, value: v } = el;
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (e.key === 'Escape') {
      escaped.current = true;
      return;
    }
    if (e.key === 'Tab') {
      if (escaped.current) {
        escaped.current = false;
        return; // let focus move on
      }
      e.preventDefault();
      const lineStart = v.lastIndexOf('\n', s - 1) + 1;
      if (e.shiftKey) {
        const lineText = v.slice(lineStart);
        const remove = lineText.startsWith('  ') ? 2 : lineText.startsWith(' ') ? 1 : 0;
        if (remove) {
          el.setSelectionRange(lineStart, lineStart + remove);
          insert('', lineStart, lineStart + remove);
          el.setSelectionRange(Math.max(lineStart, s - remove), Math.max(lineStart, t - remove));
        }
      } else if (s !== t && v.slice(s, t).includes('\n')) {
        const block = v.slice(lineStart, t);
        const indented = block.replace(/^/gm, '  ');
        insert(indented, lineStart, t);
      } else {
        insert('  ', s, t);
      }
      return;
    }
    escaped.current = false;
    if (e.key === 'Enter' && !e.shiftKey) {
      const lineStart = v.lastIndexOf('\n', s - 1) + 1;
      const indent = v.slice(lineStart).match(/^[ \t]*/)?.[0] ?? '';
      const before = v.slice(0, s).trimEnd();
      const extra = /[{([>]$/.test(before) && !/<\/[\w-]+>$/.test(before) && !/\/>$/.test(before) ? '  ' : '';
      e.preventDefault();
      insert('\n' + indent + extra, s, t);
    }
  }

  return (
    <div className="editor" data-language={language}>
      <div className="editor-scroll">
        <div className="editor-gutter" aria-hidden>
          {Array.from({ length: lines }, (_, i) => (
            <div key={i} className={errorLine === i + 1 ? 'gutter-line is-error' : 'gutter-line'}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="editor-code">
          <pre className="editor-highlight" aria-hidden dangerouslySetInnerHTML={{ __html: html }} />
          <textarea
            ref={ref}
            className="editor-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            wrap="off"
            aria-label={label}
            aria-describedby="editor-help"
            data-testid="code-editor"
          />
        </div>
      </div>
      <p id="editor-help" className="sr-only">
        Code editor. Tab inserts spaces. Press Escape then Tab to leave the editor. Control or Command plus Enter runs the code.
      </p>
    </div>
  );
}
