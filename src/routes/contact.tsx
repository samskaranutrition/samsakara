import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { useReveal } from "@/hooks/useReveal";
import { tap } from "@/lib/haptics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Waitlist — Samskara Nutrition" },
      { name: "description", content: "Join the waitlist for the next Samskara Gut Transformation Journey, or reach Samantha directly at hello@samskaranutrition.com." },
      { property: "og:title", content: "Contact & Waitlist — Samskara Nutrition" },
      { property: "og:description", content: "Spaces for one-to-one work are intentionally limited. Join the waitlist." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const c = t("contact", { returnObjects: true }) as any;
  const heroRef = useReveal<HTMLDivElement>();
  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-5xl text-[color:var(--color-forest)] md:text-6xl">{c.title}</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">{c.intro}</p>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-deep)]">
        <div className="mx-auto max-w-xl px-6 py-20 lg:px-10">
          <WaitlistForm c={c} />
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
          <p className="eyebrow">{c.directEyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl text-[color:var(--color-forest)]">{c.directTitle}</h2>
          <p className="mt-6 text-lg text-[color:var(--color-ink)]/80">
            <a href="mailto:hello@samskaranutrition.com" className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline">
              hello@samskaranutrition.com
            </a>
          </p>
          <p className="mt-6 text-[color:var(--color-ink)]/70">
            {c.or}{" "}
            <Link to="/work-with-me" className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline">
              {c.bookLink}
            </Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function WaitlistForm({ c }: { c: any }) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    tap(8);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
      setDone(true);
      form.reset();
    } finally { setSubmitting(false); }
  }

  if (done) {
    return (
      <div className="border border-[color:var(--color-gold)]/60 bg-background p-10 text-center">
        <p className="font-serif text-2xl text-[color:var(--color-forest)]">{c.doneTitle}</p>
        <p className="mt-3 text-[color:var(--color-ink)]/80">{c.doneBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label htmlFor="wl-email" className="block text-sm text-[color:var(--color-forest)]">{c.emailLabel}</label>
      <input id="wl-email" name="email" type="email" required placeholder="you@email.com"
        className="w-full border border-[color:var(--color-gold)]/60 bg-background px-4 py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink)]/40 focus:border-[color:var(--color-forest)] focus:outline-none" />
      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? c.joining : c.join}
      </button>
    </form>
  );
}
