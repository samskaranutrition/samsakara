import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqTranslations } from "@/lib/i18n/faq-types";
import { SITE_URL } from "@/lib/site";

const CONTACT_EMAIL = "hello@samskaranutrition.com";

export function FaqAccordion() {
  const { t } = useTranslation();
  const faq = t("faq", { returnObjects: true }) as FaqTranslations;

  return (
    <Accordion type="single" collapsible className="faq-accordion w-full">
      {faq.items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-[color:var(--color-gold)]/35">
          <AccordionTrigger className="py-5 font-serif text-lg text-[color:var(--color-forest)] hover:no-underline sm:text-xl">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 text-[color:var(--color-ink)]/80">
            {item.paragraphs.map((paragraph, j) => (
              <p key={j} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FaqTerms() {
  const { t } = useTranslation();
  const faq = t("faq", { returnObjects: true }) as FaqTranslations;

  return (
    <article className="legal-doc faq-terms">
      <header className="legal-doc-header">
        <h2 className="legal-doc-title">{faq.termsTitle}</h2>
        <p className="legal-doc-updated">
          {t("legal.lastUpdated")}: {faq.termsEffective}
        </p>
        <p className="legal-doc-intro">{faq.termsIntro}</p>
      </header>

      <div className="legal-doc-sections">
        {faq.termsSections.map((section) => (
          <section key={section.heading} className="legal-doc-section">
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="legal-doc-section">
          <h3>{faq.termsContactHeading}</h3>
          <p>{faq.termsContactIntro}</p>
          <p>
            <strong>{faq.termsContactName}</strong>
            <br />
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[color:var(--color-terracotta)] hover:underline">
              {CONTACT_EMAIL}
            </a>
            <br />
            Website:{" "}
            <a href={SITE_URL} className="text-[color:var(--color-terracotta)] hover:underline">
              {SITE_URL.replace(/^https:\/\//, "")}
            </a>
          </p>
          <p className="mt-6 italic">{faq.termsAcknowledgement}</p>
        </section>
      </div>
    </article>
  );
}
