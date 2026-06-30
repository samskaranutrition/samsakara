import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import { LangToggle } from "@/components/site/LangToggle";
import { tap } from "@/lib/haptics";

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/programmes", label: t("nav.programmes") },
    { to: "/work-with-me", label: t("nav.work") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = false;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 60;
        if (next !== last) {
          last = next;
          setScrolled(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const recalcIndicator = () => {
    const navEl = navRef.current;
    if (!navEl) return;
    const active =
      navEl.querySelector<HTMLElement>("a[data-status='active']") ??
      navEl.querySelector<HTMLElement>("a[data-active='true']");
    if (!active) {
      setIndicator((p) => ({ ...p, visible: false }));
      return;
    }
    const navRect = navEl.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    setIndicator({ left: r.left - navRect.left, width: r.width, visible: true });
  };
  useEffect(() => {
    recalcIndicator();
    const r = () => recalcIndicator();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, [pathname, i18n.language]);

  const mobileMenu =
    mounted && open ? (
      <div
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menu")}
      >
        <div className="mobile-menu-bar">
          <BrandWordmark markSize={36} tone="dark" markTone="gold" />
          <button
            type="button"
            className="menu-btn is-active"
            aria-label={t("nav.close")}
            onClick={() => {
              setOpen(false);
              tap(6);
            }}
          >
            <span className="menu-icon is-open" aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav className="mobile-menu-nav" aria-label="Mobile">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              onClick={() => setOpen(false)}
              className={"mobile-menu-row" + (isActive(item.to) ? " is-active" : "")}
              style={{ ["--stagger" as string]: `${60 + i * 40}ms` }}
            >
              <span className="mobile-menu-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="mobile-menu-label">{item.label}</span>
              <span className="mobile-menu-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
          <div
            className="mobile-menu-row mobile-menu-row--utility"
            style={{ ["--stagger" as string]: `${60 + nav.length * 40}ms` }}
          >
            <span className="mobile-menu-index">{String(nav.length + 1).padStart(2, "0")}</span>
            <span className="mobile-menu-label">{t("nav.language")}</span>
            <LangToggle onDark compact />
          </div>
          <a
            href="mailto:hello@samskaranutrition.com"
            className="mobile-menu-row mobile-menu-row--email"
            style={{ ["--stagger" as string]: `${60 + (nav.length + 1) * 40}ms` }}
          >
            <span className="mobile-menu-index">{String(nav.length + 2).padStart(2, "0")}</span>
            <span className="mobile-menu-meta">
              <span className="mobile-menu-meta-title">{t("nav.email")}</span>
              <span className="mobile-menu-meta-value">hello@samskaranutrition.com</span>
            </span>
            <span className="mobile-menu-arrow" aria-hidden>
              →
            </span>
          </a>
        </nav>

        <div className="mobile-menu-cta-wrap">
          <Link
            to="/work-with-me"
            hash="book"
            preload="intent"
            onClick={() => {
              setOpen(false);
              tap(8);
            }}
            className="mobile-menu-cta"
            style={{ ["--stagger" as string]: `${60 + (nav.length + 2) * 40}ms` }}
          >
            <span className="mobile-menu-cta-label">{t("nav.cta")}</span>
            <span className="mobile-menu-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    ) : null;

  return (
    <>
      <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
        <div className="header-inner mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-center" aria-label="Samskara Nutrition — Home">
            <BrandWordmark markSize={scrolled ? 36 : 44} tone="light" />
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <div ref={navRef} className="nav-links relative flex items-center gap-8">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  preload="intent"
                  activeOptions={{ exact: item.to === "/" }}
                  className="text-sm text-[color:var(--color-forest)] transition-colors hover:text-[color:var(--color-terracotta)]"
                  activeProps={
                    {
                      className: "text-[color:var(--color-terracotta)]",
                      "data-active": "true",
                    } as any
                  }
                  onMouseEnter={(e) => {
                    const navEl = navRef.current;
                    if (!navEl) return;
                    const navRect = navEl.getBoundingClientRect();
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
            <LangToggle />
            <Link
              to="/work-with-me"
              hash="book"
              preload="intent"
              className="btn-primary text-xs"
              onClick={() => tap(8)}
            >
              {t("nav.cta")} <span className="cta-arrow ml-2">→</span>
            </Link>
          </div>

          <div className="header-mobile-actions">
            {!open && <LangToggle compact />}
            <button
              type="button"
              className={"menu-btn" + (open ? " is-active" : "")}
              aria-label={open ? t("nav.close") : t("nav.menu")}
              aria-expanded={open}
              onClick={() => {
                setOpen((o) => !o);
                tap(6);
              }}
            >
              <span className={"menu-icon" + (open ? " is-open" : "")} aria-hidden>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden className="h-[76px]" />

      {mounted && mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
