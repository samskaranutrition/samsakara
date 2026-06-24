import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BrandMark } from "@/components/site/BrandMark";
import { RippleOrnament } from "@/components/site/Ornaments";

export function Footer() {
  const { t } = useTranslation();
  const links = [
    { to: "/about", label: t("nav.about") },
    { to: "/programmes", label: t("nav.programmes") },
    { to: "/work-with-me", label: t("nav.work") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/work-with-me", label: t("nav.cta") },
  ] as const;
  return (
    <footer className="relative overflow-hidden bg-[color:var(--color-forest)] text-[color:var(--color-cream)]">
      <RippleOrnament
        className="ornament-cream pointer-events-none absolute -bottom-10 left-1/2 h-40 w-[120%] -translate-x-1/2 opacity-20"
        strokeOpacity={0.6}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 lg:px-10">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <BrandMark size={48} tone="cream" />
            <p className="font-serif text-3xl text-[color:var(--color-cream)]">Samskara Nutrition</p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-cream)]/80">{t("footer.tagline")}</p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-cream)]/70">{t("footer.serving")}</p>
        </div>
        <div>
          <p className="eyebrow text-[color:var(--color-cream)]/70">{t("footer.explore")}</p>
          <ul className="mt-5 space-y-3">
            {links.map((l, i) => (
              <li key={i}>
                <Link to={l.to} className="text-sm text-[color:var(--color-cream)]/90 transition-colors hover:text-[color:var(--color-cream)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-[color:var(--color-cream)]/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-[color:var(--color-cream)]/60 md:flex-row md:justify-between lg:px-10">
          <p>{t("footer.copyright")}</p>
          <p>hello@samskaranutrition.com</p>
        </div>
      </div>
    </footer>
  );
}
