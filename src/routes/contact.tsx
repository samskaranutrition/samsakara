import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { CalendlyEmbed } from "@/components/site/CalendlyEmbed";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { absoluteUrl, getHreflangLinks } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book | Samskara Nutrition" },
      {
        name: "description",
        content: "Book a complimentary discovery call with Samantha online via Calendly, or email hello@samskaranutrition.com.",
      },
      { property: "og:title", content: "Contact & Book | Samskara Nutrition" },
      {
        property: "og:description",
        content: "Pick a time that suits you and book a relaxed discovery call online.",
      },
      { property: "og:url", content: absoluteUrl("/contact") },
    ],
    links: getHreflangLinks("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  usePageMeta("contact");
  const { t } = useTranslation();
  const c = t("contact", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    intro: string;
    bookingEyebrow: string;
    bookingTitle: string;
    bookingNote: string;
    directEyebrow: string;
    directTitle: string;
    or: string;
    bookLink: string;
  };
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-5xl text-[color:var(--color-forest)] md:text-6xl">{c.title}</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">{c.intro}</p>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="eyebrow text-center">{c.bookingEyebrow}</p>
          <h2 className="mt-5 text-center font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
            {c.bookingTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[color:var(--color-ink)]/75">
            {c.bookingNote}
          </p>
          <div className="mt-10">
            <CalendlyEmbed />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
          <p className="eyebrow">{c.directEyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)]">{c.directTitle}</h2>
          <p className="mt-6 text-lg text-[color:var(--color-ink)]/80">
            <a
              href="mailto:hello@samskaranutrition.com"
              className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline"
            >
              hello@samskaranutrition.com
            </a>
          </p>
          <p className="mt-6 text-[color:var(--color-ink)]/70">
            {c.or}{" "}
            <Link
              to="/programmes"
              preload="intent"
              className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline"
            >
              {c.bookLink}
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
