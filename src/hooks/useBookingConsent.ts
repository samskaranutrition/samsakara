import { useCallback, useSyncExternalStore } from "react";
import { readBookingConsent, writeBookingConsent } from "@/lib/booking-consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("samskara:booking-consent", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("samskara:booking-consent", onStoreChange);
  };
}

/** Stable primitive snapshot — JSON.parse would return a new object every read and loop re-renders. */
function getSnapshot(): string {
  return readBookingConsent()?.recordedAt ?? "";
}

function getServerSnapshot(): string {
  return "";
}

export function useBookingConsent() {
  const recordedAt = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const grant = useCallback(() => {
    const next = writeBookingConsent();
    window.dispatchEvent(new Event("samskara:booking-consent"));
    return next;
  }, []);

  return { granted: recordedAt !== "", record: recordedAt ? readBookingConsent() : null, grant };
}
