import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ApproachSections } from "@/components/site/ApproachContent";
import { SiteLayout } from "@/components/site/Layout";
import { photos } from "@/lib/photos";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "The Approach | Samskara Nutrition" },
      {
        name: "description",
        content: "Functional nutrition focused on gut health. Personalised support for digestion, hormones, energy, and lasting wellbeing.",
      },
      { property: "og:title", content: "The Approach | Samskara Nutrition" },
      { property: "og:image", content: absoluteUrl(photos.approachGut.src) },
      { property: "og:url", content: absoluteUrl("/approach") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/approach") }],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <ApproachSections />
      <section className="border-t border-[color:var(--color-gold)]/30 bg-[color:var(--color-forest)] py-16 text-center">
        <div className="mx-auto max-w-xl px-5 sm:px-6 lg:px-10">
          <Link
            to="/programmes"
            hash="book"
            className="inline-flex items-center justify-center bg-[color:var(--color-cream)] px-7 py-4 text-xs uppercase tracking-[0.18em] text-[color:var(--color-forest)] transition-colors hover:bg-[color:var(--color-terracotta)] hover:text-[color:var(--color-cream)]"
            style={{ borderRadius: 3 }}
          >
            {t("approach.cta")} <span className="cta-arrow ml-2">→</span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
