import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { setLang, type Lang } from "@/lib/i18n";
import { tap } from "@/lib/haptics";
import { BrandMark } from "@/components/site/BrandMark";

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/programmes", label: t("nav.programmes") },
    { to: "/work-with-me", label: t("nav.work") },
    { to: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const recalcIndicator = () => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>("a[data-status='active']") ??
      nav.querySelector<HTMLElement>("a[data-active='true']");
    if (!active) { setIndicator((p) => ({ ...p, visible: false })); return; }
    const navRect = nav.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    setIndicator({ left: r.left - navRect.left, width: r.width, visible: true });
  };
  useEffect(() => {
    recalcIndicator();
    const r = () => recalcIndicator();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, [pathname, i18n.language]);

  const switchLang = (lng: Lang) => { setLang(lng); tap(6); };

  return (
    <>
      <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
        <div className="header-inner mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="Samskara Nutrition — Home">
            <BrandMark size={scrolled ? 36 : 44} className="transition-all duration-300" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl text-[color:var(--color-forest)] md:text-2xl">Samskara</span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[color:var(--color-terracotta)]">
                Nutrition
              </span>
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <div ref={navRef} className="nav-links relative flex items-center gap-8">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="text-sm text-[color:var(--color-forest)] transition-colors hover:text-[color:var(--color-terracotta)]"
                  activeProps={{ className: "text-[color:var(--color-terracotta)]", "data-active": "true" } as any}
                  onMouseEnter={(e) => {
                    const nav = navRef.current; if (!nav) return;
                    const navRect = nav.getBoundingClientRect();
                    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setIndicator({ left: r.left - navRect.left, width: r.width, visible: true });
                  }}
                  onMouseLeave={recalcIndicator}
                >
                  {item.label}
                </Link>
              ))}
              <span
                className="nav-indicator"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.visible ? 1 : 0,
                }}
                aria-hidden
              />
            </div>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LangPill current={i18n.language} onChange={switchLang} />
            <Link to="/work-with-me" className="btn-primary text-xs" onClick={() => tap(8)}>
              {t("nav.cta")} <span className="cta-arrow ml-2">→</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LangPill current={i18n.language} onChange={switchLang} compact />
            <button
              type="button"
              className="menu-btn"
              aria-label={open ? t("nav.close") : t("nav.menu")}
              aria-expanded={open}
              onClick={() => { setOpen((o) => !o); tap(6); }}
            >
              <span className={"menu-icon" + (open ? " is-open" : "")} aria-hidden>
                <span /><span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden className="h-[76px]" />

      {open && (
        <div className="mobile-menu lg:hidden" role="dialog" aria-modal="true" aria-label={t("nav.menu")}>
          <div className="flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-3">
              <BrandMark size={36} tone="cream" />
              <span className="font-serif text-xl text-[color:var(--color-cream)]">Samskara</span>
            </span>
            <button
              type="button"
              className="menu-btn menu-btn-dark"
              aria-label={t("nav.close")}
              onClick={() => { setOpen(false); tap(6); }}
            >
              <span className="menu-icon is-open" aria-hidden><span /><span /></span>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-6 px-8" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="mobile-menu-link"
                style={{ ["--stagger" as any]: `${80 + i * 55}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/work-with-me"
              onClick={() => { setOpen(false); tap(8); }}
              className="mobile-menu-link"
              style={{ ["--stagger" as any]: `${80 + nav.length * 55}ms`, color: "var(--color-terracotta)" }}
            >
              {t("nav.cta")} <span className="cta-arrow ml-2">→</span>
            </Link>
          </nav>
          <div
            className="border-t border-[color:var(--color-cream)]/15 px-8 py-6 text-sm text-[color:var(--color-cream)]/80"
            style={{ ["--stagger" as any]: `${80 + (nav.length + 1) * 55}ms`, opacity: 0, animation: "samskara-reveal 520ms cubic-bezier(.2,.7,.2,1) both", animationDelay: `${80 + (nav.length + 1) * 55}ms` }}
          >
            <div className="flex items-center justify-between">
              <LangPill current={i18n.language} onChange={switchLang} dark />
              <a href="mailto:hello@samskaranutrition.com" className="underline-offset-4 hover:underline">
                hello@samskaranutrition.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LangPill({
  current,
  onChange,
  dark = false,
  compact = false,
}: { current: string; onChange: (l: Lang) => void; dark?: boolean; compact?: boolean }) {
  const active: Lang = (current ?? "en").startsWith("fr") ? "fr" : "en";
  return (
    <div
      role="group"
      aria-label="Language"
      className={"lang-pill" + (dark ? " is-dark" : "") + (compact ? " is-compact" : "")}
    >
      <span className="lang-pill-thumb" data-pos={active} aria-hidden />
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={active === "en"}
        className={"lang-pill-opt" + (active === "en" ? " is-active" : "")}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("fr")}
        aria-pressed={active === "fr"}
        className={"lang-pill-opt" + (active === "fr" ? " is-active" : "")}
      >
        FR
      </button>
    </div>
  );
}
