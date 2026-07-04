import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import "../styles.css";
import appCss from "../styles.css?url";
import i18n, { normalizeLang } from "../lib/i18n";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/site";
import { BUSINESS_ADDRESS, GOOGLE_MAPS_URL } from "../lib/brand";
import { photos } from "../lib/photos";

function stylesheetHref(): string {
  return import.meta.env.DEV ? "/src/styles.css" : appCss;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-4xl text-[color:var(--color-forest)]">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has moved or no longer exists.
        </p>
        <a href="/" className="btn-primary mt-8">Return home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-[color:var(--color-forest)]">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Please try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Samskara Nutrition | Functional Nutrition for Gut Health & Wellbeing" },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Samantha · Samskara Nutrition" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#6B8F71" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: absoluteUrl(photos.homeHero.src) },
      { property: "og:image:alt", content: "Samantha, founder of Samskara Nutrition" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_NAME },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: absoluteUrl(photos.homeHero.src) },
    ],
    links: [
      { rel: "stylesheet", href: stylesheetHref() },
      { rel: "stylesheet", href: "/fonts/fonts.css" },
      { rel: "preload", href: "/fonts/cormorant-garamond-400.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/inter-400.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "canonical", href: SITE_URL },
      { rel: "alternate", hrefLang: "en", href: absoluteUrl("/") },
      { rel: "alternate", hrefLang: "fr", href: absoluteUrl("/?lang=fr") },
      { rel: "alternate", hrefLang: "x-default", href: absoluteUrl("/") },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          image: absoluteUrl(photos.homeHero.src),
          areaServed: ["United Kingdom", "Europe"],
          email: "hello@samskaranutrition.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "34a Thomas Rd",
            addressLocality: "London",
            postalCode: "E14 7YX",
            addressCountry: "GB",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 51.5129,
            longitude: -0.0234,
          },
          hasMap: GOOGLE_MAPS_URL,
          sameAs: [GOOGLE_MAPS_URL],
          founder: {
            "@type": "Person",
            name: "Samantha",
            jobTitle: "Functional Nutrition Practitioner",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const lng = normalizeLang(i18n.resolvedLanguage ?? i18n.language);
    document.documentElement.lang = lng === "fr" ? "fr-FR" : "en-GB";
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
