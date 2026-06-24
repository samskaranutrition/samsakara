/** Subtle haptic tap for primary CTAs. iOS Safari has no Vibration API → silent no-op. */
export function tap(pattern: number | number[] = 8) {
  if (typeof navigator === "undefined") return;
  const n = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  try {
    n.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}
