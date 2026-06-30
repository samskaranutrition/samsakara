import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

const PREFETCH_ROUTES = ["/about", "/programmes", "/work-with-me", "/contact", "/faq"] as const;

/** Warm route chunks after first paint so nav feels instant. */
export function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    const prefetch = () => {
      for (const to of PREFETCH_ROUTES) {
        void router.preloadRoute({ to }).catch(() => undefined);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(prefetch, 600);
    return () => window.clearTimeout(timer);
  }, [router]);

  return null;
}
