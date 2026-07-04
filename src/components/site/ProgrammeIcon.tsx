import { BrandMark } from "@/components/site/BrandMark";
import { BridgeGlyph, LotusGlyph } from "@/components/site/ProgrammeGlyphs";

export type ProgrammeIconVariant = "signature" | "clarity" | "bridge";

export type ProgrammeIconTone = "forest" | "terracotta" | "cream" | "gold";

export type ProgrammeIconContext = "overview" | "detail" | "home";

type Props = {
  variant: ProgrammeIconVariant;
  tone?: ProgrammeIconTone;
  context?: ProgrammeIconContext;
  onDark?: boolean;
  className?: string;
};

const TONE_COLOR: Record<ProgrammeIconTone, string> = {
  forest: "var(--color-forest)",
  terracotta: "var(--color-terracotta)",
  cream: "var(--color-cream)",
  gold: "var(--color-gold)",
};

const BRAND_TONE: Record<ProgrammeIconTone, "forest" | "cream" | "gold" | "terracotta"> = {
  forest: "forest",
  terracotta: "terracotta",
  cream: "cream",
  gold: "gold",
};

export function programmeIconTone(onDark: boolean, variant: ProgrammeIconVariant): ProgrammeIconTone {
  if (onDark && variant === "signature") return "terracotta";
  return "forest";
}

/** Artha lotus & Setu bridge as SVG; Samskara uses the brand mark */
export function ProgrammeIcon({
  variant,
  tone,
  context = "overview",
  onDark = false,
  className = "",
}: Props) {
  const resolvedTone = tone ?? programmeIconTone(onDark, variant);
  const color = TONE_COLOR[resolvedTone];

  return (
    <span
      className={
        "programme-icon-well" +
        ` programme-icon-well--${context}` +
        (onDark ? " is-on-dark" : "") +
        (className ? " " + className : "")
      }
      data-variant={variant}
    >
      {variant === "signature" ? (
        <BrandMark
          tone={BRAND_TONE[resolvedTone]}
          className="programme-icon-brand"
        />
      ) : variant === "bridge" ? (
        <BridgeGlyph color={color} className="programme-glyph programme-glyph--bridge" />
      ) : (
        <LotusGlyph color={color} className="programme-glyph programme-glyph--lotus" />
      )}
    </span>
  );
}

export const PROGRAMME_ICON_ORDER: ProgrammeIconVariant[] = ["clarity", "bridge", "signature"];
