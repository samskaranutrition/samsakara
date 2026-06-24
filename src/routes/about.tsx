import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { BlurImage } from "@/components/site/BlurImage";
import { useReveal } from "@/hooks/useReveal";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Samantha — Samskara Nutrition" },
      { name: "description", content: "From a Mediterranean French upbringing to medicine, luxury, and the food wisdom of Kerala — the story behind Samskara Nutrition." },
      { property: "og:title", content: "About Samantha — Samskara Nutrition" },
      { property: "og:description", content: "The founder story of Samskara Nutrition — food as a language between you and your body." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: photos.portrait.src },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true }) as any;
  const heroRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto grid max-w-6xl items-end gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="h-[560px] w-full">
              <BlurImage src={photos.portrait.src} placeholder={photos.portrait.placeholder}
                alt={about.title} width={1024} height={1024} loading="eager" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="mt-6 font-serif text-5xl leading-tight text-[color:var(--color-forest)] md:text-6xl">{about.title}</h1>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[color:var(--color-terracotta)]">{about.location}</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 pb-20 lg:px-0">
          <div ref={bodyRef} className="reveal space-y-6 text-[1.0625rem] leading-[1.85] text-[color:var(--color-ink)]/85">
            {about.paragraphs.map((p: string, i: number) => (
              <p key={i} className={i === 2 || i === 4 || i === 6 ? "font-serif text-2xl italic text-[color:var(--color-forest)]" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">{about.galleryEyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl text-[color:var(--color-forest)] md:text-5xl">{about.galleryTitle}</h2>
          </div>
          <div ref={galleryRef} className="reveal grid grid-cols-12 gap-4 md:gap-6">
            <figure data-reveal-child className="col-span-12 md:col-span-8">
              <div className="photo-hover h-[480px]">
                <BlurImage src={photos.kerala.src} placeholder={photos.kerala.placeholder} alt="Kerala backwaters" width={1600} height={1000} />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]/60">{about.captionKerala}</figcaption>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-4">
              <div className="photo-hover h-[480px]">
                <BlurImage src={photos.cooking.src} placeholder={photos.cooking.placeholder} alt="Hands chopping herbs" width={1600} height={1000} />
              </div>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-4">
              <div className="photo-hover h-[400px]">
                <BlurImage src={photos.food.src} placeholder={photos.food.placeholder} alt="South Indian thali meal" width={1600} height={1000} />
              </div>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-4">
              <div className="photo-hover h-[400px]">
                <BlurImage src={photos.spices.src} placeholder={photos.spices.placeholder} alt="Indian spices" width={1600} height={1000} />
              </div>
            </figure>
            <figure data-reveal-child className="col-span-12 md:col-span-4">
              <div className="photo-hover h-[400px]">
                <BlurImage src={photos.garden.src} placeholder={photos.garden.placeholder} alt="Sunlit banana leaves" width={1600} height={1000} />
              </div>
            </figure>
            <figure data-reveal-child className="col-span-12">
              <div className="photo-hover h-[460px]">
                <BlurImage src={photos.mediterranean.src} placeholder={photos.mediterranean.placeholder} alt="A Mediterranean lunch table" width={1600} height={1000} />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]/60">{about.captionFrance}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </SiteLayout>
  );
}
