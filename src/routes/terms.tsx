import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { LegalDocument } from "@/components/site/LegalDocument";
import { usePageMeta } from "@/hooks/usePageMeta";
import { absoluteUrl, getHreflangLinks } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Samskara Nutrition" },
      { name: "description", content: "Terms governing use of the Samskara Nutrition website and services." },
      { property: "og:url", content: absoluteUrl("/terms") },
    ],
    links: getHreflangLinks("/terms"),
  }),
  component: TermsPage,
});

function TermsPage() {
  usePageMeta("terms");

  return (
    <SiteLayout>
      <section className="legal-page">
        <LegalDocument docKey="terms" />
      </section>
    </SiteLayout>
  );
}
