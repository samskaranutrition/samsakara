import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { BlurImage } from "@/components/site/BlurImage";
import { ProgrammeIcon, PROGRAMME_ICON_ORDER } from "@/components/site/ProgrammeIcon";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { tap } from "@/lib/haptics";
import { photos } from "@/lib/photos";
import { absoluteUrl, getHreflangLinks } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samskara Nutrition | Functional Nutrition for Gut Health & Wellbeing" },
      { name: "description", content: "Supporting gut healing, digestive balance, and lasting vitality through nourishment rather than restriction." },
      { property: "og:title", content: "Samskara Nutrition | Functional Nutrition for Gut Health" },
      { property: "og:description", content: "Functional nutrition rooted in food wisdom, for gut health and lasting wellbeing." },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: absoluteUrl(photos.homeHero.src) },
    ],
    links: [
      ...getHreflangLinks("/"),
      { rel: "preload", href: photos.homeHero.src, as: "image", fetchPriority: "high" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  usePageMeta("home");
  const { t } = useTranslation();
  const home = t("home", { returnObjects: true }) as any;
  const heroRef = useReveal<HTMLDivElement>();
  const philosophyRef = useReveal<HTMLDivElement>();
  const fnRef = useReveal<HTMLDivElement>();
  const programmesRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="hero-unified">
        <div ref={heroRef} className="reveal mx-auto grid max-w-6xl items-center gap-10 px-5 pb-6 pt-14 sm:px-6 sm:pb-8 sm:pt-20 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:pb-10 lg:pt-28">
          <div className="lg:col-span-7">
            <p className="eyebrow">{home.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-[color:var(--color-forest)] sm:text-5xl md:text-6xl lg:text-[4.25rem]">{home.title}</h1>
            <div className="mt-7 h-px w-12 bg-[color:var(--color-gold)]/50" aria-hidden />
            <p className="mt-5 max-w-xl text-body text-lg font-medium sm:text-xl">{home.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/programmes" hash="book" preload="intent" onClick={() => tap(8)} className="btn-primary">
                {t("nav.cta")} <span className="cta-arrow ml-2">→</span>
              </Link>
              <Link to="/programmes" preload="intent" className="btn-outline">{home.explore}</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="hero-portrait">
              <BlurImage
                src={photos.homeHero.src}
                alt={home.portraitAlt}
                width={1024}
                height={1280}
                loading="eager"
                fetchPriority="high"
                instant
                objectPosition={photos.homeHero.objectPosition}
              />
            </div>
          </div>
        </div>

        <div className="hero-unified-quote mx-auto max-w-3xl px-5 pb-12 text-center sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
          <blockquote className="hero-quote-text hero-quote-text--solo">{home.quote}</blockquote>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-24 lg:px-10">
          <div ref={philosophyRef} className="reveal lg:grid lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-20">
            <header className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="eyebrow">{home.approachEyebrow}</p>
              <h2 className="mt-4 font-serif text-[1.85rem] leading-[1.12] text-[color:var(--color-forest)] sm:text-4xl lg:text-[2.65rem]">
                {home.approachTitle}
              </h2>
              <div className="mt-6 hidden h-px w-16 bg-[color:var(--color-gold)]/50 lg:block" aria-hidden />
            </header>
            <div className="approach-grid mt-10 lg:col-span-8 lg:mt-0">
              {home.pillars.map((p: any, i: number) => (
                <article key={i} data-reveal-child className="approach-pillar">
                  <span className="approach-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="approach-pillar-title">{p.title}</h3>
                  <p className="approach-pillar-body">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div ref={fnRef} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="eyebrow">{home.fnEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl md:text-5xl">{home.fnTitle}</h2>
              <p className="mt-6 max-w-2xl text-body text-lg sm:text-xl">{home.fnBody}</p>
            </div>
            <figure className="lg:col-span-5">
              <div className="page-photo-frame page-photo-frame--landscape">
                <BlurImage
                  src={photos.aboutLifestyle.src}
                  alt="Samantha at home with a warm drink, taking a mindful pause"
                  width={1600}
                  height={1280}
                  loading="lazy"
                  objectPosition={photos.aboutLifestyle.objectPosition}
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
            <div className="max-w-xl">
              <p className="eyebrow">{home.waysEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl md:text-5xl">{home.waysTitle}</h2>
            </div>
            <Link to="/programmes" className="text-sm uppercase tracking-[0.18em] text-[color:var(--color-terracotta)] hover:text-[color:var(--color-forest)] transition-colors">
              {home.seeAll} <span className="cta-arrow ml-1">→</span>
            </Link>
          </div>
          <div ref={programmesRef} className="reveal mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
            {home.programmes.map((p: any, i: number) => {
              const iconVariant = PROGRAMME_ICON_ORDER[i] ?? "signature";
              return (
                <Link key={p.name} to="/programmes" data-reveal-child
                  className="group relative flex flex-col gap-5 rounded-2xl bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-[color:var(--color-gold)]/20 sm:p-10">
                  <div className="mb-2 transition-transform duration-300 group-hover:scale-105">
                    <ProgrammeIcon variant={iconVariant} context="home" />
                  </div>
                  <span className="eyebrow opacity-80">{p.tag}</span>
                  <h3 className="font-serif text-2xl text-[color:var(--color-forest)]">{p.name}</h3>
                  <p className="text-body text-[0.98rem] leading-relaxed">{p.body}</p>
                  <span className="mt-auto pt-6 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-terracotta)] transition-colors group-hover:text-[color:var(--color-forest)]">
                    {home.learnMore} <span className="cta-arrow ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </SiteLayout>
  );
}
