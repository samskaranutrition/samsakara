import { useEffect, useRef } from "react";

/**
 * Adds `.is-revealed` to the element when it enters the viewport, once.
 * Children with `[data-reveal-child]` are staggered by ~90ms each.
 * Respects prefers-reduced-motion (CSS handles the no-op).
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-revealed");
          const kids = e.target.querySelectorAll<HTMLElement>("[data-reveal-child]");
          kids.forEach((k, i) => {
            k.style.setProperty("--reveal-delay", `${i * 90}ms`);
          });
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
