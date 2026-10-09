// Small inline icon set (no icon-font dependency). 24×24, stroke-based.
const PATHS: Record<string, string> = {
  home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
  cards: 'M7 3h11a2 2 0 0 1 2 2v13M4 7h11a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z',
  vault: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  code: 'M8 7 3 12l5 5M16 7l5 5-5 5M13.5 4l-3 16',
  play: 'M7 4.5v15l13-7.5z',
  user: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM3.5 21a8.5 8.5 0 0 1 17 0',
  shuffle: 'M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3',
  search: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM16 16l5 5',
  bookmark: 'M6 3h12v18l-6-4.5L6 21z',
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  check: 'M4 12.5 9.5 18 20 6',
  x: 'M6 6l12 12M18 6 6 18',
  lock: 'M6 10h12v11H6zM8.5 10V7a3.5 3.5 0 0 1 7 0v3',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  flame: 'M12 21c4 0 7-2.7 7-6.8 0-4.5-4-6.7-4.6-11.2C11 5 9.6 7.6 9.8 10.4 8.5 9.8 8 8.6 8 7.3 5.9 9 5 11.6 5 14.2 5 18.3 8 21 12 21z',
  sparkle: 'M12 3l2.1 6.9L21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1z',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  reset: 'M4 4v6h6M4.5 15a8 8 0 1 0 1.8-8.3L4 10',
  stop: 'M6 6h12v12H6z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  hint: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3 8-8c2-1 5-1 6 0 1 1 1 4 0 6zM14.5 9.5a1 1 0 1 0 0-.01',
  download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
  upload: 'M12 21V9M7 14l5-5 5 5M4 3h16',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 11v6M12 7.5v.01',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  flask: 'M9 3h6M10 3v6L4.5 19a1.3 1.3 0 0 0 1.2 2h12.6a1.3 1.3 0 0 0 1.2-2L14 9V3',
  layers: 'M12 3 2 8l10 5 10-5zM2 13l10 5 10-5M2 17.5l10 5 10-5',
  keyboard: 'M3 6h18v12H3zM7 10h.01M11 10h.01M15 10h.01M7 14h10',
  menu: 'M4 6h16M4 12h16M4 18h16',
};

export function Icon({ name, size = 20, className, label }: { name: keyof typeof PATHS | string; size?: number; className?: string; label?: string }) {
  const d = PATHS[name] ?? PATHS.info;
  const filled = name === 'play' || name === 'stop';
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
