import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/Layout";
import { useReveal } from "@/hooks/useReveal";
import { tap } from "@/lib/haptics";

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Join the Waitlist — Samskara Nutrition" },
      { name: "description", content: "Join the Samskara waitlist for the next Gut Transformation Journey for women." },
      { property: "og:title", content: "Join the Waitlist — Samskara Nutrition" },
      { property: "og:description", content: "Be the first to hear when the next Gut Transformation Journey opens." },
      { property: "og:url", content: "/waitlist" },
    ],
    links: [{ rel: "canonical", href: "/waitlist" }],
  }),
  component: WaitlistPage,
});

function WaitlistPage() {
  const { t } = useTranslation();
  const c = t("contact", { returnObjects: true }) as any;
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const heroRef = useReveal<HTMLDivElement>();

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

  return (
    <SiteLayout>
      <section className="bg-background">
        <div ref={heroRef} className="reveal mx-auto max-w-2xl px-6 py-28 text-center lg:px-10">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-5xl text-[color:var(--color-forest)] md:text-6xl">{c.title}</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">{c.intro}</p>

          {done ? (
            <div className="mt-12 border border-[color:var(--color-gold)]/60 bg-[color:var(--color-cream-deep)] p-10">
              <p className="font-serif text-2xl text-[color:var(--color-forest)]">{c.doneTitle}</p>
              <p className="mt-3 text-[color:var(--color-ink)]/80">{c.doneBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-12 space-y-4 text-left">
              <label htmlFor="email" className="block text-sm text-[color:var(--color-forest)]">{c.emailLabel}</label>
              <input id="email" name="email" type="email" required placeholder="you@email.com"
                className="w-full border border-[color:var(--color-gold)]/60 bg-background px-4 py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink)]/40 focus:border-[color:var(--color-forest)] focus:outline-none" />
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? c.joining : c.join}
              </button>
            </form>
          )}

          <p className="mt-12 text-sm text-[color:var(--color-ink)]/70">
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
