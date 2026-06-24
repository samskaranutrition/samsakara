import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { tap } from "@/lib/haptics";

/**
 * Floating accessibility button: reads the current page's main content aloud.
 * Uses the browser SpeechSynthesis API (no backend, no key).
 * Prefers an Indian English voice when available and applies phonetic hints
 * for Sanskrit / Indian-origin words so Samskara, Ayurveda, Kerala etc.
 * sound natural rather than mangled by a Western-default voice.
 */

// Phonetic respellings — applied case-insensitively, word-boundaried.
const PRONUNCIATION: Array<[RegExp, string]> = [
  [/\bSamskara\b/gi, "Sumskaara"],
  [/\bAyurvedic\b/gi, "Aayur-vaydic"],
  [/\bAyurveda\b/gi, "Aayur-vayda"],
  [/\bKerala\b/gi, "Kay-ruh-luh"],
  [/\bdosha\b/gi, "doh-sha"],
  [/\bghee\b/gi, "ghee"],
  [/\bdal\b/gi, "daal"],
  [/\bkitchari\b/gi, "kich-uh-ree"],
  [/\bturmeric\b/gi, "turmeric"],
];

function applyPronunciation(text: string) {
  let out = text;
  for (const [re, rep] of PRONUNCIATION) out = out.replace(re, rep);
  return out;
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined") return undefined;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;
  const wantFr = lang.startsWith("fr");
  if (wantFr) {
    return (
      voices.find((v) => /fr[-_]FR/i.test(v.lang)) ??
      voices.find((v) => v.lang.toLowerCase().startsWith("fr"))
    );
  }
  // For English content, prefer Indian English so Sanskrit words sound right.
  return (
    voices.find((v) => /en[-_]IN/i.test(v.lang)) ??
    voices.find((v) => /hi[-_]IN/i.test(v.lang)) ??
    voices.find((v) => /en[-_]GB/i.test(v.lang)) ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en"))
  );
}

function collectMainText(): string {
  if (typeof document === "undefined") return "";
  const main = document.querySelector("main");
  if (!main) return "";
  const parts: string[] = [];
  main
    .querySelectorAll("h1, h2, h3, p, li, blockquote")
    .forEach((el) => {
      const t = (el.textContent ?? "").trim();
      if (t) parts.push(t);
    });
  return parts.join(". ");
}

export function ReadAloud() {
  const { t, i18n } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSupported("speechSynthesis" in window);
    // Voices load asynchronously in Chrome.
    const prime = () => window.speechSynthesis.getVoices();
    prime();
    window.speechSynthesis.onvoiceschanged = prime;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  const start = () => {
    const raw = collectMainText();
    if (!raw) return;
    const text = i18n.language.startsWith("fr") ? raw : applyPronunciation(raw);
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(i18n.language);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? (i18n.language.startsWith("fr") ? "fr-FR" : "en-IN");
    u.rate = 0.95;
    u.pitch = 1;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    utterRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setPlaying(true);
    tap(6);
  };

  if (!supported) return null;

  const label = playing
    ? i18n.language.startsWith("fr")
      ? "Arrêter la lecture"
      : "Stop reading"
    : i18n.language.startsWith("fr")
      ? "Écouter cette page"
      : "Listen to this page";

  return (
    <button
      type="button"
      onClick={playing ? stop : start}
      aria-pressed={playing}
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-forest)]/20 bg-[color:var(--color-cream)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-forest)] shadow-[0_6px_22px_-12px_rgba(0,0,0,0.25)] transition hover:bg-[color:var(--color-forest)] hover:text-[color:var(--color-cream)]"
    >
      <span aria-hidden className="inline-block">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="3" width="3" height="8" fill="currentColor" />
            <rect x="8" y="3" width="3" height="8" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2.5v9l8-4.5-8-4.5z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
