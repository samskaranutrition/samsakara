import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { DiscoveryCallCTA } from "@/components/site/AboutSections";
import { FaqAccordion, FaqTerms } from "@/components/site/FaqContent";
import { SiteLayout } from "@/components/site/Layout";
import { useReveal } from "@/hooks/useReveal";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Samskara Nutrition" },
      {
        name: "description",
        content:
          "Answers to common questions about Samskara Nutrition: consultations, approach, appointments, and what to expect.",
      },
      { property: "og:title", content: "FAQ | Samskara Nutrition" },
      {
        property: "og:description",
        content: "Frequently asked questions about functional nutrition consultations with Samskara Nutrition.",
      },
      { property: "og:url", content: absoluteUrl("/faq") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/faq") }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useTranslation();
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="border-b border-[color:var(--color-gold)]/30 bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 sm:py-20 lg:px-10">
          <p className="eyebrow">{t("faq.eyebrow")}</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-forest)] sm:text-5xl">
            {t("faq.title")}
          </h1>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          <FaqAccordion />
        </div>
      </section>

      <DiscoveryCallCTA eyebrowKey="faq.ctaEyebrow" />

      <section className="border-t border-[color:var(--color-gold)]/30 bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
          <FaqTerms />
        </div>
      </section>
    </SiteLayout>
  );
}
