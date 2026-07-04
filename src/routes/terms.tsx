import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { LegalDocument } from "@/components/site/LegalDocument";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Samskara Nutrition" },
      { name: "description", content: "Terms governing use of the Samskara Nutrition website and services." },
      { property: "og:url", content: absoluteUrl("/terms") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/terms") }],
  }),
  component: () => (
    <SiteLayout>
      <section className="legal-page">
        <LegalDocument docKey="terms" />
      </section>
    </SiteLayout>
  ),
});
