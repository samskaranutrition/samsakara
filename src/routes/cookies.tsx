import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { LegalDocument } from "@/components/site/LegalDocument";
import { CookiePreferences } from "@/components/site/CookiePreferences";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Samskara Nutrition" },
      { name: "description", content: "How Samskara Nutrition uses cookies and similar technologies." },
      { property: "og:url", content: absoluteUrl("/cookies") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/cookies") }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <SiteLayout>
      <section className="legal-page">
        <LegalDocument docKey="cookies" />
        <CookiePreferences />
      </section>
    </SiteLayout>
  );
}
