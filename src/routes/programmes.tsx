import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CalendlyEmbed } from "@/components/site/CalendlyEmbed";
import { BlurImage } from "@/components/site/BlurImage";
import {
  DiscoverySection,
  ProgrammeDetailSection,
  ProgrammeOverview,
} from "@/components/site/ProgrammeDetail";
import { SiteLayout } from "@/components/site/Layout";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { mergeProgrammePrices, useProgrammePrices } from "@/hooks/useProgrammePrices";
import { tap } from "@/lib/haptics";
import type { ProgrammesPageContent } from "@/lib/i18n/programmes-types";
import { photos } from "@/lib/photos";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Work With Me | Samskara Nutrition" },
      {
        name: "description",
        content: "Artha, Setu and Samskara nutrition programmes with Samantha. Book a complimentary discovery call.",
      },
      { property: "og:title", content: "Programmes | Samskara Nutrition" },
      { property: "og:image", content: absoluteUrl(photos.programmesHero.src) },
      { property: "og:url", content: absoluteUrl("/programmes") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/programmes") }],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  usePageMeta("programmes");
  const { t } = useTranslation();
  const p = t("programmesPage", { returnObjects: true }) as ProgrammesPageContent;
  const heroRef = useReveal<HTMLDivElement>();
  const priceFallback = Object.fromEntries(p.items.map((item) => [item.id, item.price]));
  const { data: livePrices } = useProgrammePrices(priceFallback);
  const items = mergeProgrammePrices(p.items, livePrices);

  return (
    <SiteLayout>
      <section className="programme-hero bg-background">
        <div
          ref={heroRef}
          className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-16"
        >
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-[color:var(--color-forest)] sm:text-5xl md:text-6xl">
              {p.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)] lg:mx-0">
              {p.intro}
            </p>
            <div className="programme-hero-actions mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to="/programmes"
                hash="overview"
                preload="intent"
                onClick={() => tap(6)}
                className="btn-primary"
              >
                {p.labels.overviewTitle} <span className="cta-arrow ml-2">→</span>
              </Link>
              <Link
                to="/programmes"
                hash="book"
                preload="intent"
                onClick={() => tap(8)}
                className="btn-outline"
              >
                {p.discovery.cta}
              </Link>
            </div>
          </div>
          <figure className="order-1 lg:order-2 lg:col-span-5">
            <div className="page-photo-frame page-photo-frame--landscape">
              <BlurImage
                src={photos.programmesHero.src}
                alt="Samantha during an online nutrition consultation"
                width={1600}
                height={1280}
                loading="eager"
                fetchPriority="high"
                instant
                objectPosition={photos.programmesHero.objectPosition}
              />
            </div>
          </figure>
        </div>
      </section>

      <ProgrammeOverview items={items} labels={p.labels} id="overview" />

      <section className="programme-detail-stack">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          {items.map((item, i) => (
            <ProgrammeDetailSection
              key={item.id}
              programme={item}
              labels={p.labels}
              featured={i === items.length - 1}
            />
          ))}
        </div>
      </section>

      <DiscoverySection discovery={p.discovery} />

      <section id="book" className="programme-booking scroll-mt-24 bg-background">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          <h2 className="text-center font-serif text-3xl text-[color:var(--color-forest)]">
            {p.discovery.bookingTitle}
          </h2>
          <div className="mt-8">
            <CalendlyEmbed />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
