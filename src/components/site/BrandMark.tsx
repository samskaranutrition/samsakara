import logoAsset from "@/assets/samskara-logo.png.asset.json";

type Props = {
  size?: number;
  className?: string;
  tone?: "forest" | "cream";
};

/** Tight-cropped Samskara monogram. Image is wider than tall (~1.38:1). */
export function BrandMark({ size = 40, className = "", tone = "forest" }: Props) {
  const filter =
    tone === "cream"
      ? "brightness(0) saturate(100%) invert(96%) sepia(7%) saturate(469%) hue-rotate(354deg) brightness(101%) contrast(94%)"
      : undefined;
  // Maintain aspect by setting height = size, width auto.
  return (
    <img
      src={logoAsset.url}
      alt=""
      aria-hidden="true"
      height={size}
      className={className}
      style={{ height: size, width: "auto", objectFit: "contain", display: "block", filter }}
    />
  );
}
