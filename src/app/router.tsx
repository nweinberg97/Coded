// A tiny hash router. Hash URLs (#/learn) work on any static host —
// GitHub Pages, Cloudflare Pages, a USB stick — with no server rewrites.
import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

export type Route = { path: string; parts: string[]; query: URLSearchParams };

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, '') || '/';
  const [p, q = ''] = raw.split('?');
  const path = '/' + p.split('/').filter(Boolean).join('/');
  return { path, parts: path.split('/').filter(Boolean), query: new URLSearchParams(q) };
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  const hash = '#' + (to.startsWith('/') ? to : '/' + to);
  if (opts.replace) window.history.replaceState(null, '', hash);
  if (opts.replace) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else window.location.hash = hash;
}

export function href(to: string): string {
  return '#' + (to.startsWith('/') ? to : '/' + to);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children: ReactNode };

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={href(to)}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
