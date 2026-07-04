type GlyphProps = {
  color: string;
  className?: string;
};

const LOTUS_SRC = "/images/icons/artha-lotus.png";

/** Artha — brand lotus mark (PNG mask, recolours with programme tone) */
export function LotusGlyph({ color, className = "" }: GlyphProps) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${LOTUS_SRC})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${LOTUS_SRC})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}

/** Setu — cable-stayed bridge */
export function BridgeGlyph({ color, className = "" }: GlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="8" y1="46" x2="112" y2="46" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="60" y1="14" x2="60" y2="62" stroke={color} strokeWidth="3.8" strokeLinecap="round" />
      <rect x="54" y="62" width="12" height="6" rx="0.5" fill={color} />
      <line x1="60" y1="16" x2="14" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="18" x2="24" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="20" x2="34" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="22" x2="44" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="24" x2="52" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="16" x2="106" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="18" x2="96" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="20" x2="86" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="22" x2="76" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="24" x2="68" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
