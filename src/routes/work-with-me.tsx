import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { useReveal } from "@/hooks/useReveal";
import { tap } from "@/lib/haptics";

export const Route = createFileRoute("/work-with-me")({
  head: () => ({
    meta: [
      { title: "Book a Free Discovery Call — Samskara Nutrition" },
      { name: "description", content: "A relaxed 20-minute discovery call with Samantha. Online, across the UK and Europe." },
      { property: "og:title", content: "Book a Discovery Call — Samskara Nutrition" },
      { property: "og:description", content: "A warm, unhurried conversation. No pressure — just space to be heard." },
      { property: "og:url", content: "/work-with-me" },
    ],
    links: [{ rel: "canonical", href: "/work-with-me" }],
  }),
  component: WorkWithMePage,
});

function WorkWithMePage() {
  const { t } = useTranslation();
  const w = t("work", { returnObjects: true }) as any;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const heroRef = useReveal<HTMLDivElement>();
  const stepsRef = useReveal<HTMLOListElement>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    tap(8);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/discovery-call", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
      setSubmitted(true);
      form.reset();
    } finally { setSubmitting(false); }
  }

  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="eyebrow">{w.eyebrow}</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-[color:var(--color-forest)] md:text-6xl">{w.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">{w.intro}</p>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <ol ref={stepsRef} className="reveal grid gap-12 md:grid-cols-3">
            {w.steps.map((s: any) => (
              <li key={s.n} data-reveal-child className="border-t border-[color:var(--color-gold)]/60 pt-6">
                <p className="font-serif text-3xl text-[color:var(--color-terracotta)]">{s.n}</p>
                <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-forest)]">{s.t}</h2>
                <p className="mt-3 text-[color:var(--color-ink)]/80">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-24 lg:px-10">
          <p className="eyebrow text-center">{w.formEyebrow}</p>
          <h2 className="mt-5 text-center font-serif text-4xl text-[color:var(--color-forest)]">{w.formTitle}</h2>

          {submitted ? (
            <div className="mt-12 border border-[color:var(--color-gold)]/60 bg-[color:var(--color-cream-deep)] p-10 text-center">
              <p className="font-serif text-2xl text-[color:var(--color-forest)]">{w.thanksTitle}</p>
              <p className="mt-4 text-[color:var(--color-ink)]/80">{w.thanksBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-12 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-[color:var(--color-forest)]">{w.name}</label>
                <input id="name" name="name" type="text" required placeholder={w.namePh}
                  className="mt-2 w-full border border-[color:var(--color-gold)]/60 bg-background px-4 py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink)]/40 focus:border-[color:var(--color-forest)] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[color:var(--color-forest)]">{w.email}</label>
                <input id="email" name="email" type="email" required placeholder={w.emailPh}
                  className="mt-2 w-full border border-[color:var(--color-gold)]/60 bg-background px-4 py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink)]/40 focus:border-[color:var(--color-forest)] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-[color:var(--color-forest)]">
                  {w.message} <span className="text-[color:var(--color-ink)]/50">{w.optional}</span>
                </label>
                <textarea id="message" name="message" rows={5} placeholder={w.messagePh}
                  className="mt-2 w-full border border-[color:var(--color-gold)]/60 bg-background px-4 py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink)]/40 focus:border-[color:var(--color-forest)] focus:outline-none" />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? w.sending : w.send}
              </button>
            </form>
          )}

          <p className="mt-16 text-center text-sm text-[color:var(--color-ink)]/70">
            {w.altLink}{" "}
            <Link to="/contact" className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline">
              {w.altLinkText}
            </Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
