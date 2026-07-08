import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { writeCookieConsent } from "@/lib/cookie-consent";
import { calendlyBookingUrl } from "@/lib/site";

type Props = {
  className?: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function loadCalendlyScript(): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="calendly.com/assets/external/widget.js"]',
  );
  if (existing?.dataset.loaded === "true") return Promise.resolve();
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.body.appendChild(script);
  });
}

/** Inline Calendly — loads only after functional cookie consent (UK/EU PECR). */
export function CalendlyEmbed({ className = "" }: Props) {
  const { t } = useTranslation();
  const w = t("work", { returnObjects: true }) as {
    bookingUnavailable: string;
    bookingUnavailableBody: string;
    emailSamantha: string;
    calendlyConsentTitle: string;
    calendlyConsentBody: string;
    calendlyEnable: string;
  };
  const { functionalAllowed } = useCookieConsent();
  const url = calendlyBookingUrl();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!functionalAllowed || !containerRef.current || !url) return;
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        window.Calendly?.initInlineWidget({ url, parentElement: containerRef.current });
      })
      .catch(() => {
        /* Widget script blocked or offline */
      });

    return () => {
      cancelled = true;
    };
  }, [url, functionalAllowed]);

  if (!url) {
    return (
      <div className={`rounded border border-[color:var(--color-gold)]/60 bg-[color:var(--color-cream-deep)] p-8 text-center ${className}`}>
        <p className="font-serif text-xl text-[color:var(--color-forest)]">{w.bookingUnavailable}</p>
        <p className="mt-3 text-sm text-[color:var(--color-ink)]/75">{w.bookingUnavailableBody}</p>
        <a href="mailto:hello@samskaranutrition.com" className="btn-primary mt-6 inline-flex">
          {w.emailSamantha}
        </a>
      </div>
    );
  }

  if (!functionalAllowed) {
    return (
      <div className={`calendly-consent-gate rounded border border-[color:var(--color-gold)]/60 bg-[color:var(--color-cream-deep)] p-8 text-center ${className}`}>
        <p className="font-serif text-xl text-[color:var(--color-forest)]">{w.calendlyConsentTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-ink)]/75">
          {w.calendlyConsentBody}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => writeCookieConsent("all")}
          >
            {w.calendlyEnable}
          </button>
          <Link to="/cookies" className="btn-outline">
            {t("legal.cookieBanner.manage")}
          </Link>
        </div>
        <a
          href="mailto:hello@samskaranutrition.com"
          className="mt-6 inline-block text-sm text-[color:var(--color-terracotta)] underline-offset-4 hover:underline"
        >
          {w.emailSamantha}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`calendly-inline-widget min-h-[700px] w-full overflow-hidden rounded border border-[color:var(--color-gold)]/40 bg-background ${className}`}
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
