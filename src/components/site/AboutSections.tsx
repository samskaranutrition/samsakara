import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BlurImage } from "@/components/site/BlurImage";
import { useReveal } from "@/hooks/useReveal";
import { photos } from "@/lib/photos";

export function AboutSamskaraMeaning() {
  const { t } = useTranslation();
  const copy = t("about.samskaraMeaning", { returnObjects: true }) as {
    title: string;
    partOfSpeech: string;
    paragraphs: string[];
    tagline: string;
    imageAlt: string;
  };
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-[color:var(--color-gold)]/30 bg-[color:var(--color-cream-deep)]">
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-24"
      >
        <figure className="lg:col-span-5">
          <div className="samskara-meaning-photo overflow-hidden border border-[color:var(--color-gold)]/35 bg-[color:var(--color-cream)]">
            <BlurImage
              src={photos.samskaraMeaning.src}
              alt={copy.imageAlt}
              width={1200}
              height={960}
              loading="lazy"
              objectPosition={photos.samskaraMeaning.objectPosition}
            />
          </div>
        </figure>
        <div className="lg:col-span-7">
          <h2 className="font-serif text-3xl leading-tight text-[color:var(--color-forest)] sm:text-4xl">
            {copy.title}{" "}
            <span className="block text-xl font-normal text-[color:var(--color-terracotta)] sm:text-2xl">
              {copy.partOfSpeech}
            </span>
          </h2>
          <div className="mt-6 space-y-4 text-[color:var(--color-ink)]/82">
            {copy.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-body leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 font-serif text-xl italic text-[color:var(--color-forest)]">{copy.tagline}</p>
        </div>
      </div>
    </section>
  );
}

type MailingCopy = {
  emailLabel: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  privacyPrefix: string;
  privacyLink: string;
  privacySuffix: string;
  errorBody: string;
};

export function MailingListBlock() {
  const { t } = useTranslation();
  const copy = t("about.mailing", { returnObjects: true }) as {
    title: string;
    body: string;
  } & MailingCopy;
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-[color:var(--color-gold)]/30 bg-background">
      <div ref={ref} className="reveal mx-auto max-w-2xl px-5 py-14 text-center sm:px-6 sm:py-20 lg:px-10">
        <h2 className="font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">{copy.title}</h2>
        <p className="text-body mx-auto mt-5 max-w-xl text-lg leading-relaxed">{copy.body}</p>
        <MailingListForm copy={copy} />
      </div>
    </section>
  );
}

function MailingListForm({ copy }: { copy: MailingCopy }) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="mt-8 rounded-sm border border-[color:var(--color-sage-deep)]/30 bg-[color:var(--color-cream-deep)] px-6 py-8">
        <p className="font-serif text-2xl text-[color:var(--color-forest)]">{copy.successTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]/75">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form
      name="mailing-list"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="mt-8 text-left"
    >
      <input type="hidden" name="form-name" value="mailing-list" />
      <p className="hidden" aria-hidden>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <label className="block text-left text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink)]/60">
        {copy.emailLabel}
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-[color:var(--color-gold)]/40 bg-[color:var(--color-cream)] px-4 py-3 text-base normal-case tracking-normal text-[color:var(--color-ink)] outline-none transition-colors focus:border-[color:var(--color-forest)]"
        />
      </label>
      <label className="mt-4 flex items-start gap-3 text-left text-sm leading-relaxed text-[color:var(--color-ink)]/75">
        <input type="checkbox" name="consent" required className="mt-1 shrink-0" value="yes" />
        <span>
          {copy.privacyPrefix}
          <Link to="/privacy" className="text-[color:var(--color-terracotta)] underline-offset-4 hover:underline">
            {copy.privacyLink}
          </Link>
          {copy.privacySuffix}
        </span>
      </label>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto" disabled={state === "submitting"}>
        {state === "submitting" ? copy.submitting : copy.submit}
      </button>
      {state === "error" && (
        <p className="mt-3 text-sm text-[color:var(--color-terracotta)]">{copy.errorBody}</p>
      )}
    </form>
  );
}

export function DiscoveryCallCTA({ eyebrowKey = "about.discoveryCta.eyebrow" }: { eyebrowKey?: string }) {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-forest)] text-[color:var(--color-cream)]">
      <div ref={ref} className="reveal relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10">
        <p className="eyebrow text-[color:var(--color-cream)]/70">{t(eyebrowKey)}</p>
        <h2 className="mt-5 font-serif text-3xl font-semibold sm:text-4xl">{t("about.discoveryCta.title")}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--color-cream)]/85">
          {t("about.discoveryCta.body")}
        </p>
        <Link
          to="/programmes"
          hash="book"
          className="mt-8 inline-flex items-center justify-center bg-[color:var(--color-cream)] px-7 py-4 text-xs uppercase tracking-[0.18em] text-[color:var(--color-forest)] transition-colors hover:bg-[color:var(--color-terracotta)] hover:text-[color:var(--color-cream)]"
          style={{ borderRadius: 3 }}
        >
          {t("about.discoveryCta.cta")} <span className="cta-arrow ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
