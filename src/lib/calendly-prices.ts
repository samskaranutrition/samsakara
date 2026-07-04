import { CALENDLY_URL } from "./site";

export type ProgrammePriceMap = Record<string, string>;

type CalendlyProfilePackage = {
  id: string;
  name: string;
  offering_type?: string;
  price?: {
    amount: number;
    currency: string;
  };
};

type CalendlyPackageResource = {
  resource?: {
    name?: string;
    variants?: Array<{
      price?: {
        amount_cents?: number;
        currency?: string;
      };
    }>;
  };
};

const UUID_RE =
  /\/payments\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

export function calendlyProfileSlug(pageUrl: string = CALENDLY_URL): string {
  const base = pageUrl.split("?")[0].replace(/\/$/, "");
  return base.split("/").pop() || "samskaranutrition";
}

export function paymentLinkUuid(pageUrl: string): string | null {
  return pageUrl.match(UUID_RE)?.[1] ?? null;
}

export function formatCalendlyPrice(amountCents: number, currency: string): string {
  const amount = amountCents / 100;
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function packageToPrice(entry: CalendlyProfilePackage): string | null {
  const cents = entry.price?.amount;
  const currency = entry.price?.currency;
  if (cents == null || !currency) return null;
  return formatCalendlyPrice(cents, currency);
}

async function fetchProfilePackages(slug: string): Promise<CalendlyProfilePackage[]> {
  const res = await fetch(
    `https://calendly.com/api/booking/profiles/${encodeURIComponent(slug)}/packages`,
    { headers: { Accept: "application/json" } },
  );
  if (!res.ok) return [];
  const data = (await res.json()) as CalendlyProfilePackage[];
  return Array.isArray(data) ? data : [];
}

async function fetchPackageByUuid(uuid: string): Promise<string | null> {
  const res = await fetch(`https://calendly.com/api/booking/packages/${uuid}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as CalendlyPackageResource;
  const price = data.resource?.variants?.[0]?.price;
  if (price?.amount_cents == null || !price.currency) return null;
  return formatCalendlyPrice(price.amount_cents, price.currency);
}

/** Live programme prices from Calendly payment links (keys: artha, setu, samskara). */
export async function fetchProgrammePricesFromCalendly(
  paymentLinks: Record<string, string>,
): Promise<ProgrammePriceMap> {
  const prices: ProgrammePriceMap = {};
  const slug = calendlyProfileSlug();

  const profilePackages = await fetchProfilePackages(slug);
  for (const entry of profilePackages) {
    if (entry.offering_type && entry.offering_type !== "PAYMENT_LINK") continue;
    const id = entry.name?.trim().toLowerCase();
    const formatted = packageToPrice(entry);
    if (id && formatted) prices[id] = formatted;
  }

  for (const [id, url] of Object.entries(paymentLinks)) {
    if (prices[id]) continue;
    const uuid = paymentLinkUuid(url);
    if (!uuid) continue;
    const formatted = await fetchPackageByUuid(uuid);
    if (formatted) prices[id] = formatted;
  }

  return prices;
}
