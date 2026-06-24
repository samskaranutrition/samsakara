import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { fr } from "./fr";

export const SUPPORTED = ["en", "fr"] as const;
export type Lang = (typeof SUPPORTED)[number];

const STORAGE_KEY = "samskara.lang";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, fr: { translation: fr } },
    fallbackLng: "en",
    lng: "en", // always boot in EN so SSR and first client render match
    supportedLngs: SUPPORTED as unknown as string[],
    interpolation: { escapeValue: false },
    returnObjects: true,
  });
}

export function setLang(lng: Lang) {
  void i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(STORAGE_KEY, lng); } catch { /* ignore */ }
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng === "fr" ? "fr-FR" : "en-GB";
  }
}

/** Read the persisted language; safe to call on the client after mount only. */
export function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "fr") return v;
  } catch { /* ignore */ }
  return null;
}

export default i18n;
