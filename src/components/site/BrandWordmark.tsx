import { BrandMark } from "./BrandMark";

type Props = {
  /** Horizontal for header; stacked for footer / hero lockups */
  layout?: "horizontal" | "stacked";
  markSize?: number;
  tone?: "light" | "dark";
  /** Icon colour on dark backgrounds — defaults to cream */
  markTone?: "forest" | "cream" | "gold";
  /** Hide wordmark text in the fixed header below desktop width */
  compact?: boolean;
  align?: "center" | "start";
  className?: string;
};

/**
 * Samskara Nutrition wordmark — Cormorant Garamond, all caps in header and footer.
 */
export function BrandWordmark({
  layout = "horizontal",
  markSize = 44,
  tone = "light",
  markTone,
  compact = false,
  align = "center",
  className = "",
}: Props) {
  const iconTone = markTone ?? (tone === "dark" ? "cream" : "forest");
  const nameClass =
    tone === "dark"
      ? "brand-wordmark-text brand-wordmark-text--dark"
      : "brand-wordmark-text brand-wordmark-text--light";
  const alignClass = align === "start" ? "items-start text-left" : "items-center text-center";

  if (layout === "stacked") {
    return (
      <div className={`flex flex-col ${alignClass} ${className}`}>
        <BrandMark size={markSize} tone={iconTone} />
        <span className={`brand-wordmark-name mt-3 ${nameClass}`}>
          <span className="brand-wordmark-line">Samskara</span>
          <span className="brand-wordmark-line">Nutrition</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <BrandMark size={markSize} tone={iconTone} className="shrink-0" />
      <span
        className={
          "brand-wordmark-name brand-wordmark-name--horizontal whitespace-nowrap " +
          nameClass +
          (compact ? " brand-wordmark-name--compact" : "")
        }
      >
        Samskara Nutrition
      </span>
    </div>
  );
}
