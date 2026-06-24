import { useState, type ImgHTMLAttributes } from "react";

type Props = {
  src: string;
  /** Optional tiny low-res preview. Only used when distinct from `src`. */
  placeholder?: string;
  alt: string;
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "placeholder" | "className">;

/** Image with gentle fade-in. No blur: a soft cream tint is shown until load. */
export function BlurImage({ src, placeholder, alt, className = "", ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const usePh = placeholder && placeholder !== src;
  return (
    <span className={"blur-img-wrap " + className}>
      {usePh && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="blur-img-ph"
          loading="eager"
        />
      )}
      <img
        {...rest}
        src={src}
        alt={alt}
        loading={rest.loading ?? "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={"blur-img-full" + (loaded ? " is-loaded" : "")}
      />
    </span>
  );
}
