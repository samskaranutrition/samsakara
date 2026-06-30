import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { ProgrammeIcon, PROGRAMME_ICON_ORDER } from "@/components/site/ProgrammeIcon";
import { ProgrammePayment } from "@/components/site/ProgrammePayment";
import { useReveal } from "@/hooks/useReveal";
import { tap } from "@/lib/haptics";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Programmes — Three Ways to Work Together · Samskara Nutrition" },
      { name: "description", content: "Samskara Signature Journey, Clarity and Setu — three functional nutrition programmes for gut health and lasting wellbeing." },
      { property: "og:title", content: "Programmes — Samskara Nutrition" },
      { property: "og:description", content: "Three paths to rebuild gut health — from gentle clarity to a full ten-week transformation." },
      { property: "og:url", content: absoluteUrl("/programmes") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/programmes") }],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  const { t } = useTranslation();
  const p = t("programmes", { returnObjects: true }) as any;
  const heroRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-[color:var(--color-forest)] md:text-6xl">{p.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">{p.intro}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
          <div ref={gridRef} className="reveal grid gap-10 md:grid-cols-3">
            {p.items.map((it: any, i: number) => {
              const featured = i === 0;
              const iconVariant = PROGRAMME_ICON_ORDER[i] ?? "signature";
              return (
                <article
                  key={it.name}
                  data-reveal-child
                  className={
                    "relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 " +
                    (featured
                      ? "md:order-2 md:-mt-6 bg-[color:var(--color-cream-deep)] p-8 md:p-12 shadow-[0_20px_60px_-30px_rgba(44,74,59,0.35)]"
                      : (i === 1 ? "md:order-1" : "md:order-3") +
                        " bg-background p-8 border border-[color:var(--color-gold)]/40 md:p-12")
                  }
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-terracotta)]/40 bg-[color:var(--color-cream)] text-[color:var(--color-terracotta)]"
                    >
                      <ProgrammeIcon variant={iconVariant} size={22} />
                    </span>
                    <p className="eyebrow !mt-0">{it.tag}</p>
                  </div>
                  <h2 className={"mt-6 font-serif text-[color:var(--color-forest)] " + (featured ? "text-4xl md:text-[2.5rem]" : "text-3xl")}>{it.name}</h2>
                  <div className="mt-4 h-px w-10 bg-[color:var(--color-gold)]/45" aria-hidden />
                  <p className="mt-5 text-[color:var(--color-ink)]/80">{it.intro}</p>
                  <ul className="mt-8 space-y-3 text-sm text-[color:var(--color-ink)]/85">
                    {it.includes.map((item: string) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 shrink-0 bg-[color:var(--color-terracotta)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/work-with-me" onClick={() => tap(8)} className={(featured ? "btn-primary" : "btn-outline") + " mt-10"}>
                    {p.cta} <span className="cta-arrow ml-2">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProgrammePayment />

      <ClosingCTA />
    </SiteLayout>
  );
}
