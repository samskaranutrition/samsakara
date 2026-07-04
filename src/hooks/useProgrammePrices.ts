import { useQuery } from "@tanstack/react-query";
import type { ProgrammePriceMap } from "@/lib/calendly-prices";

async function fetchProgrammePrices(): Promise<ProgrammePriceMap> {
  const res = await fetch("/api/programme-prices");
  if (!res.ok) throw new Error("Unable to load programme prices");
  return (await res.json()) as ProgrammePriceMap;
}

/** Calendly payment-link prices; falls back to static copy until loaded. */
export function useProgrammePrices(fallback: ProgrammePriceMap) {
  return useQuery({
    queryKey: ["programme-prices"],
    queryFn: fetchProgrammePrices,
    staleTime: 30 * 60 * 1000,
    placeholderData: fallback,
  });
}

export function mergeProgrammePrices<T extends { id: string; price: string }>(
  items: T[],
  livePrices: ProgrammePriceMap | undefined,
): T[] {
  if (!livePrices) return items;
  return items.map((item) => ({
    ...item,
    price: livePrices[item.id] ?? item.price,
  }));
}
