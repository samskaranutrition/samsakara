import { useEffect, useRef } from "react";

/** Gentle parallax (hero only). Desktop ≥1024px, respects reduced-motion. */
export function useParallax<T extends HTMLElement = HTMLElement>(strength = 0.12) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -strength;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength]);
  return ref;
}
