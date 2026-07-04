import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurImage } from "@/components/site/BlurImage";
import type { ApproachPageContent } from "@/lib/i18n/programmes-types";
import { photos } from "@/lib/photos";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";

export function ApproachSections() {
  const { t } = useTranslation();
  const copy = t("approach", { returnObjects: true }) as ApproachPageContent;
  const heroRef = useReveal<HTMLDivElement>();
  const howRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section className="approach-gut bg-background">
        <div
          ref={heroRef}
          className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20"
        >
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="eyebrow">{copy.gut.eyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-forest)] sm:text-5xl">
              {copy.gut.title}
            </h1>
            <p className="mt-4 font-serif text-xl text-[color:var(--color-terracotta)] sm:text-2xl">
              {copy.gut.subtitle}
            </p>
            <div className="approach-prose mt-8 space-y-4">
              {copy.gut.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <figure className="order-1 lg:order-2 lg:col-span-5">
            <div className="page-photo-frame page-photo-frame--landscape">
              <BlurImage
                src={photos.approachGut.src}
                alt="Samantha reading about the mind-gut connection"
                width={1600}
                height={1280}
                loading="eager"
                fetchPriority="high"
                instant
                objectPosition={photos.approachGut.objectPosition}
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-gold)]/30 bg-[color:var(--color-cream-deep)]">
        <div
          ref={howRef}
          className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <figure className="lg:col-span-5">
              <div className="page-photo-frame page-photo-frame--landscape">
                <BlurImage
                  src={photos.approachHow.src}
                  alt="Samantha at home with a warm drink, taking a mindful pause"
                  width={1600}
                  height={1280}
                  loading="lazy"
                  objectPosition={photos.approachHow.objectPosition}
                />
              </div>
            </figure>
            <div className="lg:col-span-7">
              <h2 className="font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
                {copy.how.title}
              </h2>
              <div className="approach-prose mt-8 space-y-4">
                {copy.how.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/programmes" hash="book" className="btn-primary">
                  {copy.cta} <span className="cta-arrow ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-10">
          <h2 className="text-center font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
            {copy.areas.title}
          </h2>
          <Accordion type="single" collapsible className="approach-accordion mt-10 w-full">
            {copy.areas.items.map((area, i) => (
              <AccordionItem key={i} value={`area-${i}`} className="border-[color:var(--color-gold)]/35">
                <AccordionTrigger className="py-5 text-left font-serif text-lg text-[color:var(--color-forest)] hover:no-underline sm:text-xl">
                  <span>
                    {area.title}
                    <span className="mt-1 block font-sans text-xs uppercase tracking-[0.16em] text-[color:var(--color-terracotta)]">
                      {area.subtitle}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="approach-points-list">
                    {area.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
