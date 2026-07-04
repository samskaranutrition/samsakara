type Props = {
  size?: number;
  className?: string;
  tone?: "forest" | "cream" | "gold" | "terracotta";
};

const ICON_SRC = "/images/icon-base.png";

const TONE_COLOR: Record<NonNullable<Props["tone"]>, string> = {
  forest: "var(--color-forest)",
  cream: "var(--color-cream)",
  gold: "var(--color-gold)",
  terracotta: "var(--color-terracotta)",
};

/** Icon via CSS mask — no white/filter box on dark backgrounds */
export function BrandMark({ size = 40, className = "", tone = "forest" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={"brand-mark" + (className ? " " + className : "")}
      style={{
        width: size,
        height: size,
        backgroundColor: TONE_COLOR[tone],
        WebkitMaskImage: `url(${ICON_SRC})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${ICON_SRC})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
