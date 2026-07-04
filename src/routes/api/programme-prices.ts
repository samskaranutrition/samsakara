import { createFileRoute } from "@tanstack/react-router";
import { fetchProgrammePricesFromCalendly } from "@/lib/calendly-prices";
import { programmePaymentLinks } from "@/lib/site";

export const Route = createFileRoute("/api/programme-prices")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const prices = await fetchProgrammePricesFromCalendly(programmePaymentLinks());
          return new Response(JSON.stringify(prices), {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
            },
          });
        } catch (error) {
          console.error("Failed to fetch Calendly programme prices:", error);
          return new Response(JSON.stringify({}), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
