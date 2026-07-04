import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { LegalDocument } from "@/components/site/LegalDocument";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Samskara Nutrition" },
      { name: "description", content: "How Samskara Nutrition collects, uses, and protects your personal data." },
      { property: "og:url", content: absoluteUrl("/privacy") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/privacy") }],
  }),
  component: () => (
    <SiteLayout>
      <section className="legal-page">
        <LegalDocument docKey="privacy" />
      </section>
    </SiteLayout>
  ),
});
