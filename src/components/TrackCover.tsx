import type { Track } from '../content/types';

// Generative "album art" for each learning set.
export function TrackCover({ track, size = 160, showTitle = true }: { track: Track; size?: number; showTitle?: boolean }) {
  const [a, b] = track.cover;
  const id = `g-${track.id}`;
  const shapes = (() => {
    switch (track.pattern) {
      case 'orbit':
        return (
          <>
            {[22, 36, 50, 64].map((r, i) => (
              <circle key={r} cx="78" cy="30" r={r} fill="none" stroke="#000" strokeOpacity={0.18 + i * 0.04} strokeWidth="2" />
            ))}
            <circle cx="78" cy="30" r="9" fill="#000" fillOpacity=".5" />
            <circle cx="40" cy="58" r="4" fill="#fff" />
          </>
        );
      case 'grid':
        return Array.from({ length: 36 }, (_, i) => (
          <rect key={i} x={6 + (i % 6) * 16} y={6 + Math.floor(i / 6) * 16} width="10" height="10" rx="2" fill="#000" fillOpacity={((i * 7) % 5) / 10 + 0.05} />
        ));
      case 'stripes':
        return Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x="-20" y={i * 13} width="140" height="6" fill="#000" fillOpacity={0.08 + (i % 3) * 0.08} transform="rotate(-18 50 50)" />
        ));
      case 'waves':
        return Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M-5 ${30 + i * 11} Q 25 ${18 + i * 11} 50 ${30 + i * 11} T 105 ${30 + i * 11}`} fill="none" stroke="#000" strokeOpacity={0.12 + i * 0.04} strokeWidth="3" />
        ));
      case 'rings':
        return (
          <>
            <circle cx="50" cy="50" r="34" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="10" />
            <circle cx="50" cy="50" r="16" fill="#000" fillOpacity=".35" />
            <circle cx="50" cy="50" r="4" fill="#fff" />
          </>
        );
      case 'blocks':
        return (
          <>
            <rect x="8" y="10" width="40" height="22" rx="3" fill="#000" fillOpacity=".25" />
            <rect x="52" y="10" width="40" height="22" rx="3" fill="#000" fillOpacity=".12" />
            <rect x="8" y="36" width="40" height="22" rx="3" fill="#000" fillOpacity=".12" />
            <rect x="52" y="36" width="40" height="22" rx="3" fill="#000" fillOpacity=".3" />
            <rect x="8" y="62" width="84" height="4" rx="2" fill="#000" fillOpacity=".25" />
          </>
        );
      case 'diagonal':
        return (
          <>
            <path d="M0 100 L100 0 L100 40 L40 100Z" fill="#000" fillOpacity=".22" />
            <path d="M0 60 L60 0 L75 0 L0 75Z" fill="#000" fillOpacity=".14" />
          </>
        );
      case 'dots':
      default:
        return Array.from({ length: 49 }, (_, i) => (
          <circle key={i} cx={10 + (i % 7) * 13.3} cy={10 + Math.floor(i / 7) * 9} r={1 + ((i * 3) % 4)} fill="#000" fillOpacity=".3" />
        ));
    }
  })();
  return (
    <svg className="track-cover" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`${track.name} cover art`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id})`} />
      {shapes}
      {showTitle && (
        <text fill="#0B0B0C" fontFamily="InterDisplay, Inter, sans-serif" fontWeight="900" fontSize="10" letterSpacing="-0.4">
          {wrap(track.name.toUpperCase(), 13).map((line, i, all) => (
            <tspan key={i} x="7" y={93 - (all.length - 1 - i) * 10.5}>
              {line}
            </tspan>
          ))}
        </text>
      )}
    </svg>
  );
}

function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let cur = '';
  for (const w of text.split(' ')) {
    if (cur && (cur + ' ' + w).length > max) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) lines.push(cur);
  return lines;
}
