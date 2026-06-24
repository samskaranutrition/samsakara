import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Leaf, HeartPulse, Flower2, Sprout, GitMerge, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { BlurImage } from "@/components/site/BlurImage";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";
import { tap } from "@/lib/haptics";
import { photos } from "@/lib/photos";
import { ArcsOrnament, LeafDivider, RippleOrnament } from "@/components/site/Ornaments";

const pillarIcons = [Leaf, HeartPulse, Flower2];
const programmeIconsHome = [Sprout, GitMerge, Sparkles];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samskara Nutrition — Functional Nutrition for Women's Gut Health" },
      { name: "description", content: "I help women across the UK and Europe rebuild gut health and feel like themselves again — through nourishing food, not restriction." },
      { property: "og:title", content: "Samskara Nutrition — Functional Nutrition for Women" },
      { property: "og:description", content: "Functional nutrition rooted in food wisdom — for gut health and women's wellbeing." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: photos.portrait.src },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const home = t("home", { returnObjects: true }) as any;
  const heroRef = useReveal<HTMLDivElement>();
  const philosophyRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();
  const programmesRef = useReveal<HTMLDivElement>();
  const parallaxRef = useParallax<HTMLDivElement>(0.1);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-background">
        <ArcsOrnament className="ornament-gold pointer-events-none absolute -top-10 right-[-80px] hidden h-[280px] w-[420px] opacity-40 float-anim lg:block" />
        <RippleOrnament className="ornament-gold pointer-events-none absolute -bottom-24 -left-24 h-48 w-80 opacity-25 md:hidden" />
        <div ref={heroRef} className="reveal relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow">{home.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-[color:var(--color-forest)] sm:text-5xl md:text-6xl lg:text-[4.25rem]">{home.title}</h1>
            <LeafDivider className="ornament-terracotta mt-7 h-4 w-40" />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--color-ink)]/80 sm:text-lg">{home.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/work-with-me" onClick={() => tap(8)} className="btn-primary">
                {t("nav.cta")} <span className="cta-arrow ml-2">→</span>
              </Link>
              <Link to="/programmes" className="btn-outline">{home.explore}</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full border border-[color:var(--color-gold)]/60 lg:block" aria-hidden />
              <RippleOrnament className="ornament-gold pointer-events-none absolute -bottom-12 left-1/2 hidden h-24 w-[110%] -translate-x-1/2 opacity-60 ripple-anim lg:block" />
              <div ref={parallaxRef} className="relative h-[380px] w-full sm:h-[460px] lg:h-[520px]">
                <BlurImage
                  src={photos.portrait.src}
                  alt={home.portraitAlt}
                  width={1024}
                  height={1024}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-[color:var(--color-gold)]/40 bg-[color:var(--color-cream-deep)]">
        <RippleOrnament className="ornament-gold pointer-events-none absolute inset-x-0 top-0 mx-auto h-20 w-[80%] opacity-35" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
          <blockquote className="font-serif text-3xl italic leading-snug text-[color:var(--color-forest)] md:text-4xl">
            "{home.quote}"
          </blockquote>
          <div className="section-rule mt-10" />
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div ref={philosophyRef} className="reveal grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">{home.approachEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">{home.approachTitle}</h2>
            </div>
            <div className="space-y-10 lg:col-span-8 lg:space-y-12">
              {home.pillars.map((p: any, i: number) => {
                const Icon = pillarIcons[i] ?? Leaf;
                return (
                  <div key={i} data-reveal-child className="grid grid-cols-[auto_1fr] gap-5 border-t border-[color:var(--color-gold)]/40 pt-8 first:border-0 first:pt-0 sm:gap-8 sm:pt-10">
                    <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-terracotta)]/40 bg-[color:var(--color-cream-deep)] text-[color:var(--color-terracotta)]">
                      <Icon size={22} strokeWidth={1.4} />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-sm text-[color:var(--color-terracotta)]/80">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-serif text-2xl text-[color:var(--color-forest)]">{p.title}</h3>
                      </div>
                      <p className="mt-3 max-w-xl text-[color:var(--color-ink)]/80">{p.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="eyebrow">{home.glimpseEyebrow}</p>
            <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl md:text-5xl">{home.glimpseTitle}</h2>
          </div>
          <div ref={galleryRef} className="reveal grid grid-cols-12 gap-3 md:gap-6">
            <figure data-reveal-child className="col-span-12 md:col-span-7">
              <div className="photo-hover h-[280px] sm:h-[420px] md:h-[520px]">
                <BlurImage src={photos.kerala.src} alt="Kerala backwaters lined with palm trees" width={1600} height={1000} />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]/60">{home.captionKerala}</figcaption>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-5">
              <div className="photo-hover h-[280px] sm:h-[420px] md:h-[520px]">
                <BlurImage src={photos.spices.src} alt="Spices at a market in India" width={1600} height={1000} />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]/60">{home.captionSpices}</figcaption>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-5">
              <div className="photo-hover h-[240px] sm:h-[360px] md:h-[440px]">
                <BlurImage src={photos.food.src} alt="A Kerala rice meal with curries" width={1600} height={1000} />
              </div>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-7">
              <div className="photo-hover h-[240px] sm:h-[360px] md:h-[440px]">
                <BlurImage src={photos.cooking.src} alt="Hands chopping fresh herbs" width={1600} height={1000} />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="relative bg-background">
        <LeafDivider className="ornament-gold mx-auto mt-2 h-4 w-48 opacity-60" />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
            <div className="max-w-xl">
              <p className="eyebrow">{home.waysEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl md:text-5xl">{home.waysTitle}</h2>
            </div>
            <Link to="/programmes" className="text-sm uppercase tracking-[0.18em] text-[color:var(--color-terracotta)] hover:text-[color:var(--color-forest)]">
              {home.seeAll} <span className="cta-arrow ml-1">→</span>
            </Link>
          </div>
          <div ref={programmesRef} className="reveal mt-10 grid gap-px bg-[color:var(--color-gold)]/40 sm:mt-14 md:grid-cols-3">
            {home.programmes.map((p: any, i: number) => {
              const Icon = programmeIconsHome[i] ?? Sparkles;
              return (
                <Link key={p.name} to="/programmes" data-reveal-child
                  className="group relative flex flex-col gap-4 bg-background p-7 transition-colors hover:bg-[color:var(--color-cream-deep)] sm:p-10">
                  <span aria-hidden className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-terracotta)]/40 bg-[color:var(--color-cream-deep)] text-[color:var(--color-terracotta)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
                    <Icon size={20} strokeWidth={1.4} />
                  </span>
                  <span className="eyebrow">{p.tag}</span>
                  <h3 className="font-serif text-2xl text-[color:var(--color-forest)]">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-[color:var(--color-ink)]/75">{p.body}</p>
                  <span className="mt-auto pt-6 text-xs uppercase tracking-[0.18em] text-[color:var(--color-terracotta)] group-hover:text-[color:var(--color-forest)]">
                    {home.learnMore} <span className="cta-arrow ml-1">→</span>
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
