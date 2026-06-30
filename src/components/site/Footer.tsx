import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import { GoogleMap } from "@/components/site/GoogleMap";
import { BUSINESS_ADDRESS } from "@/lib/brand";

export function Footer() {
  const { t } = useTranslation();

  const explore = [
    { to: "/about", label: t("nav.about") },
    { to: "/programmes", label: t("nav.programmes") },
    { to: "/work-with-me", label: t("nav.work") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const legal = [
    { to: "/privacy", label: t("legal.footerPrivacy") },
    { to: "/terms", label: t("legal.footerTerms") },
    { to: "/cookies", label: t("legal.footerCookies") },
  ] as const;

  return (
    <footer className="site-footer">
      <div className="site-footer-main mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-10 lg:py-16">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link to="/" className="inline-flex" aria-label="Samskara Nutrition — Home">
              <BrandWordmark layout="stacked" markSize={48} tone="dark" align="start" markTone="gold" />
            </Link>
            <p className="site-footer-tagline">{t("footer.tagline")}</p>
            <p className="site-footer-serving">{t("footer.serving")}</p>
            <Link to="/work-with-me" hash="book" className="site-footer-cta">
              {t("nav.cta")} <span aria-hidden>→</span>
            </Link>
          </div>

          <nav className="site-footer-nav" aria-label="Footer">
            <p className="site-footer-label">{t("footer.explore")}</p>
            <ul className="site-footer-links">
              {explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-contact">
            <p className="site-footer-label">{t("legal.footerLegal")}</p>
            <ul className="site-footer-links">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className="site-footer-label mt-6">{t("footer.contactLabel")}</p>
            <a href="mailto:hello@samskaranutrition.com" className="site-footer-email">
              hello@samskaranutrition.com
            </a>
            <p className="site-footer-note">{t("footer.onlineNote")}</p>

            <div className="site-footer-clinic">
              <p className="site-footer-label">{t("footer.clinicHeading")}</p>
              <p className="site-footer-clinic-address">{BUSINESS_ADDRESS}</p>
              <p className="site-footer-clinic-hint">{t("footer.clinicHint")}</p>
              <GoogleMap footer className="site-footer-clinic-map" />
            </div>
          </div>
        </div>

        <p className="site-footer-disclaimer">{t("legal.disclaimer")}</p>
      </div>

      <div className="site-footer-bar">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>{t("footer.copyright")}</p>
          <p className="text-[color:var(--color-cream)]/50">samskaranutrition.com</p>
        </div>
      </div>
    </footer>
  );
}
