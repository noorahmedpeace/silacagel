"use client";

import { useSearchParams } from "next/navigation";
import { RfqForm } from "./rfq-form";

// Reads the calculator's prefill query on the CLIENT so the page itself can
// prerender as static HTML. As a server component reading searchParams, the
// route was forced dynamic: every visit paid a serverless round-trip (~1.5-2s
// TTFB from Pakistan/EU) on the single most conversion-critical page of the
// site. Static shell + client prefill keeps the same UX at edge-cache speed.
export function RfqFormFromQuery() {
  const params = useSearchParams();
  const read = (key: string, max: number) => (params.get(key) || "").trim().slice(0, max);

  const qty = read("qty", 50) || read("quantity", 50);
  const rawUnit = params.get("unit") || "";
  const unit =
    rawUnit === "pieces" || rawUnit === "cartons" || rawUnit === "pallets" || rawUnit === "containers"
      ? rawUnit
      : "kg";

  return (
    <RfqForm
      defaultProduct={read("product", 120)}
      defaultQuantity={qty}
      defaultUnit={unit}
      defaultApplication={read("application", 120)}
      defaultDestinationCountry={read("destination", 100)}
    />
  );
}
