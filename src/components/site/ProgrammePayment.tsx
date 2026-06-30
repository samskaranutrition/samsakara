import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { programmePaymentUrl } from "@/lib/site";

export function ProgrammePayment() {
  const { t } = useTranslation();
  const pay = t("payments", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    body: string;
    calendlyNote: string;
    bookCta: string;
    payCta: string;
    secureNote: string;
  };
  const paymentUrl = programmePaymentUrl();

  return (
    <section className="programme-payment">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 lg:px-10">
        <p className="eyebrow">{pay.eyebrow}</p>
        <h2 className="mt-4 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
          {pay.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body">{pay.body}</p>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[color:var(--color-ink)]/70">
          {pay.calendlyNote}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/work-with-me" hash="book" preload="intent" className="btn-primary">
            {pay.bookCta} <span className="cta-arrow ml-2">→</span>
          </Link>
          {paymentUrl && (
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              {pay.payCta} <span className="cta-arrow ml-2">→</span>
            </a>
          )}
        </div>
        <p className="mt-6 text-xs text-[color:var(--color-ink)]/55">{pay.secureNote}</p>
      </div>
    </section>
  );
}
