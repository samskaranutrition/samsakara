import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useReveal } from "@/hooks/useReveal";
import { tap } from "@/lib/haptics";

export function ClosingCTA() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-forest)] text-[color:var(--color-cream)]">
      <div ref={ref} className="reveal relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-24 lg:px-10">
        <p className="eyebrow text-[color:var(--color-cream)]/70">{t("closing.eyebrow")}</p>
        <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-cream)] sm:text-4xl md:text-5xl">
          {t("closing.title")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--color-cream)]/85">
          {t("closing.body")}
        </p>
        <Link
          to="/work-with-me"
          onClick={() => tap(8)}
          className="mt-8 inline-flex items-center justify-center bg-[color:var(--color-cream)] px-7 py-4 text-xs uppercase tracking-[0.18em] text-[color:var(--color-forest)] transition-colors hover:bg-[color:var(--color-terracotta)] hover:text-[color:var(--color-cream)]"
          style={{ borderRadius: 3 }}
        >
          {t("closing.cta")} <span className="cta-arrow ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
