const STORAGE_KEY = "samskara.booking-consent";

export type BookingConsentRecord = {
  serviceConsent: true;
  healthConsent: true;
  recordedAt: string;
};

export function readBookingConsent(): BookingConsentRecord | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BookingConsentRecord;
    if (parsed.serviceConsent && parsed.healthConsent && parsed.recordedAt) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function writeBookingConsent(): BookingConsentRecord {
  const record: BookingConsentRecord = {
    serviceConsent: true,
    healthConsent: true,
    recordedAt: new Date().toISOString(),
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  return record;
}

export function clearBookingConsent(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
