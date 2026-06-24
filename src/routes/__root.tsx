import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import i18n from "../lib/i18n";

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
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
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
      { title: "Samskara Nutrition — Functional Nutrition for Women's Gut Health" },
      {
        name: "description",
        content:
          "Functional nutrition coaching for women across the UK and Europe. Rebuild gut health and wellbeing through real food, with Samantha at Samskara Nutrition.",
      },
      { name: "author", content: "Samantha · Samskara Nutrition" },
      { property: "og:site_name", content: "Samskara Nutrition" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Samskara Nutrition" },
      {
        property: "og:description",
        content:
          "Functional nutrition rooted in food wisdom — for gut health and women's wellbeing.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.pexels.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "alternate", hrefLang: "en", href: "/" },
      { rel: "alternate", hrefLang: "fr", href: "/?lang=fr" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Samskara Nutrition",
          description:
            "Functional nutrition coaching for women's gut health and wellbeing — online across the UK and Europe.",
          areaServed: ["United Kingdom", "Europe"],
          email: "hello@samskaranutrition.com",
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    // Apply persisted language AFTER hydration so SSR (always EN) and the
    // first client render match — avoids the hydration mismatch warning.
    import("@/lib/i18n").then(({ readStoredLang, setLang }) => {
      const stored = readStoredLang();
      if (stored && stored !== i18n.language) setLang(stored);
    });
    const onChange = (l: string) => {
      document.documentElement.lang = l.startsWith("fr") ? "fr-FR" : "en-GB";
    };
    i18n.on("languageChanged", onChange);
    return () => { i18n.off("languageChanged", onChange); };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

