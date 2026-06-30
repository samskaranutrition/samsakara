import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { CalendlyEmbed } from "@/components/site/CalendlyEmbed";
import { ProgrammePayment } from "@/components/site/ProgrammePayment";
import { useReveal } from "@/hooks/useReveal";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/work-with-me")({
  head: () => ({
    meta: [
      { title: "Book a Free Discovery Call — Samskara Nutrition" },
      { name: "description", content: "Pick a time that suits you — book a relaxed 20-minute discovery call with Samantha online." },
      { property: "og:title", content: "Book a Discovery Call — Samskara Nutrition" },
      { property: "og:description", content: "Choose an available slot and book instantly. You'll receive a confirmation email with the date and time." },
      { property: "og:url", content: absoluteUrl("/work-with-me") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/work-with-me") }],
  }),
  component: WorkWithMePage,
});

function WorkWithMePage() {
  const { t } = useTranslation();
  const w = t("work", { returnObjects: true }) as any;
  const heroRef = useReveal<HTMLDivElement>();
  const stepsRef = useReveal<HTMLOListElement>();

  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="eyebrow">{w.eyebrow}</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-[color:var(--color-forest)] md:text-6xl">{w.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">{w.intro}</p>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <ol ref={stepsRef} className="reveal grid gap-12 md:grid-cols-3">
            {w.steps.map((s: any) => (
              <li key={s.n} data-reveal-child className="border-t border-[color:var(--color-gold)]/60 pt-6">
                <p className="font-serif text-3xl text-[color:var(--color-terracotta)]">{s.n}</p>
                <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-forest)]">{s.t}</h2>
                <p className="mt-3 text-[color:var(--color-ink)]/80">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="book" className="bg-background scroll-mt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="eyebrow text-center">{w.bookingEyebrow}</p>
          <h2 className="mt-5 text-center font-serif text-4xl text-[color:var(--color-forest)]">{w.bookingTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[color:var(--color-ink)]/75">
            {w.bookingNote}
          </p>
          <div className="mt-10">
            <CalendlyEmbed />
          </div>
          <p className="mt-10 text-center text-sm text-[color:var(--color-ink)]/70">
            {w.altLink}{" "}
            <Link to="/programmes" preload="intent" className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline">
              {w.altLinkText}
            </Link>.
          </p>
        </div>
      </section>

      <ProgrammePayment />
    </SiteLayout>
  );
}
