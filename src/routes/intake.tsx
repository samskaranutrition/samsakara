import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HealthIntakeForm } from "@/components/site/HealthIntakeForm";
import { SiteLayout } from "@/components/site/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { absoluteUrl, getHreflangLinks } from "@/lib/site";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title: "Health Questionnaire | Samskara Nutrition" },
      {
        name: "description",
        content: "Secure pre-consultation health questionnaire for Samskara Nutrition clients.",
      },
      { property: "og:url", content: absoluteUrl("/intake") },
    ],
    links: getHreflangLinks("/intake"),
  }),
  component: IntakePage,
});

function IntakePage() {
  usePageMeta("intake");
  const { t } = useTranslation();
  const copy = t("intake", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    intro: string;
    deadlineNote: string;
  };

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl text-[color:var(--color-forest)]">{copy.title}</h1>
          <p className="text-body mt-5 text-lg">{copy.intro}</p>
          <p className="mt-4 rounded border border-[color:var(--color-gold)]/40 bg-[color:var(--color-cream-deep)] px-4 py-3 text-sm leading-relaxed text-[color:var(--color-ink)]/80">
            {copy.deadlineNote}
          </p>
          <div className="mt-10">
            <HealthIntakeForm />
          </div>
          <p className="mt-8 text-center text-sm text-[color:var(--color-ink)]/65">
            <Link to="/programmes" hash="book" className="booking-consent-link">
              {t("intake.bookDiscovery")}
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
