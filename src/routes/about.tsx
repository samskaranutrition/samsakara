import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AboutSamskaraMeaning, DiscoveryCallCTA } from "@/components/site/AboutSections";
import { AboutStory } from "@/components/site/AboutStory";
import { SiteLayout } from "@/components/site/Layout";
import { BlurImage } from "@/components/site/BlurImage";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { photos } from "@/lib/photos";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Samantha | Samskara Nutrition" },
      {
        name: "description",
        content: "Certified nutritionist Samantha supports gut health, PCOS/PMOS, and weight management through traditional and functional nutrition across the UK and Europe.",
      },
      { property: "og:title", content: "About Samantha | Samskara Nutrition" },
      { property: "og:description", content: "The founder story of Samskara Nutrition: food as a language between you and your body." },
      { property: "og:url", content: absoluteUrl("/about") },
      { property: "og:image", content: absoluteUrl(photos.aboutHero.src) },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: AboutPage,
});

function AboutPage() {
  usePageMeta("about");
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    subtitle: string;
    intro: string;
  };
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="border-b border-[color:var(--color-gold)]/30 bg-background">
        <div
          ref={heroRef}
          className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-16"
        >
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-forest)] sm:text-5xl lg:text-[3.25rem]">
              {about.title}
            </h1>
            <p className="about-hero-credential">{about.subtitle}</p>
            <p className="text-body mt-6 max-w-xl text-lg">{about.intro}</p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <figure className="about-hero-portrait">
              <BlurImage
                src={photos.aboutHero.src}
                alt={t("about.imageCaptions.portrait")}
                width={1600}
                height={900}
                loading="eager"
                fetchPriority="high"
                instant
                objectPosition={photos.aboutHero.objectPosition}
              />
            </figure>
          </div>
        </div>
      </section>

      <AboutStory />

      <AboutSamskaraMeaning />
      <DiscoveryCallCTA />
    </SiteLayout>
  );
}
