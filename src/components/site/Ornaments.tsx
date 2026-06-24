/** Decorative SVG ornaments inspired by the Samskara ripple mark. */

export function RippleOrnament({ className = "", strokeOpacity = 0.5 }: { className?: string; strokeOpacity?: number }) {
  return (
    <svg viewBox="0 0 400 120" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeOpacity={strokeOpacity} strokeLinecap="round">
        {[...Array(7)].map((_, i) => {
          const rx = 30 + i * 22;
          const ry = 6 + i * 3;
          return <ellipse key={i} cx="200" cy="60" rx={rx} ry={ry} />;
        })}
      </g>
    </svg>
  );
}

export function ArcsOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeOpacity="0.4" strokeLinecap="round">
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M ${30 + i * 6} 130 C ${30 + i * 6} ${30 - i * 4}, ${210 - i * 6} ${30 - i * 4}, ${210 - i * 6} 130`}
          />
        ))}
      </g>
    </svg>
  );
}

export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={className} aria-hidden="true" fill="none">
      <line x1="0" y1="12" x2="86" y2="12" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="114" y1="12" x2="200" y2="12" stroke="currentColor" strokeOpacity="0.5" />
      <path
        d="M100 4 C 106 8, 106 16, 100 20 C 94 16, 94 8, 100 4 Z"
        stroke="currentColor"
        strokeOpacity="0.8"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M12 2 L13 11 L22 12 L13 13 L12 22 L11 13 L2 12 L11 11 Z" fill="currentColor" />
    </svg>
  );
}
