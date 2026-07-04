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

/** Calendly payment collection links (defaults; override via env) */
const PROGRAMME_CALENDLY_DEFAULTS: Record<string, string> = {
  artha: "https://calendly.com/samskaranutrition/payments/7e33e37c-0e12-4fcd-9cfe-3dbf85126b57",
  setu: "https://calendly.com/samskaranutrition/payments/b27bf691-e237-4b65-b043-7abb1c8d8a1e",
  samskara: "https://calendly.com/samskaranutrition/payments/622b06f3-3e3c-45bd-8d33-a0876d9e62fe",
};

const PROGRAMME_CALENDLY_URLS: Record<string, string | undefined> = {
  artha: (import.meta.env.VITE_CALENDLY_ARTHA_URL as string | undefined)?.trim(),
  setu: (import.meta.env.VITE_CALENDLY_SETU_URL as string | undefined)?.trim(),
  samskara: (import.meta.env.VITE_CALENDLY_SAMSKARA_URL as string | undefined)?.trim(),
};

export const PROGRAMME_IDS = ["artha", "setu", "samskara"] as const;

export type ProgrammeId = (typeof PROGRAMME_IDS)[number];

export function programmePaymentLinks(): Record<string, string> {
  const links: Record<string, string> = {};
  for (const id of PROGRAMME_IDS) {
    const url = PROGRAMME_CALENDLY_URLS[id] || PROGRAMME_CALENDLY_DEFAULTS[id];
    if (url) links[id] = url;
  }
  return links;
}

export function programmeBookingUrl(id: string): string {
  const specific = PROGRAMME_CALENDLY_URLS[id] || PROGRAMME_CALENDLY_DEFAULTS[id];
  if (specific) return calendlyProgrammeUrl(specific);
  if (CALENDLY_PROGRAMME_URL) return calendlyProgrammeUrl(CALENDLY_PROGRAMME_URL);
  return calendlyBookingUrl(CALENDLY_URL);
}

export function programmePaymentUrl(): string {
  if (STRIPE_PAYMENT_URL) return STRIPE_PAYMENT_URL;
  return programmeBookingUrl("samskara");
}

/** Payment collection pages open as-is; scheduling pages get brand query params */
export function calendlyProgrammeUrl(pageUrl: string): string {
  if (pageUrl.includes("/payments/")) return pageUrl;
  return calendlyBookingUrl(pageUrl);
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
