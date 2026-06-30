import { BRAND } from "./brand";

export const SITE_URL = "https://samskaranutrition.com";

export const SITE_NAME = "Samskara Nutrition";

export const SITE_DESCRIPTION =
  "Functional nutrition coaching across the UK and Europe. Rebuild gut health and wellbeing through real food, with Samantha at Samskara Nutrition.";

/** Calendly scheduling page — override with VITE_CALENDLY_URL if needed */
export const CALENDLY_URL =
  (import.meta.env.VITE_CALENDLY_URL as string | undefined)?.trim() ||
  "https://calendly.com/samskaranutrition";

/** Optional Stripe Payment Link for programme fees (no backend required) */
export const STRIPE_PAYMENT_URL =
  (import.meta.env.VITE_STRIPE_PAYMENT_URL as string | undefined)?.trim() || "";

/** Optional Calendly event for paid programme booking (Stripe enabled in Calendly) */
export const CALENDLY_PROGRAMME_URL =
  (import.meta.env.VITE_CALENDLY_PROGRAMME_URL as string | undefined)?.trim() || "";

export function programmePaymentUrl(): string {
  if (STRIPE_PAYMENT_URL) return STRIPE_PAYMENT_URL;
  if (CALENDLY_PROGRAMME_URL) return calendlyBookingUrl(CALENDLY_PROGRAMME_URL);
  return calendlyBookingUrl(CALENDLY_URL);
}

/** Inline widget URL — Sage Green brand palette */
export function calendlyBookingUrl(pageUrl: string = CALENDLY_URL): string {
  const base = pageUrl.split("?")[0].replace(/\/$/, "");
  const bg = BRAND.cream.replace("#", "");
  const text = BRAND.ink.replace("#", "");
  const primary = BRAND.sageDeep.replace("#", "");
  return `${base}?background_color=${bg}&text_color=${text}&primary_color=${primary}&hide_gdpr_banner=1`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
