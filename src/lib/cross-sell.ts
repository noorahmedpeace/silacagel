/*
 * Cross-sell mapping - "Buyers also order" pairings per product slug.
 * Hand-curated on real procurement logic (a carton-sachet buyer usually
 * also needs container-level protection; a PPE buyer pairs hair nets with
 * beard covers), not auto-generated. Each list is rendered as up to 3
 * cards at the foot of a product page.
 */
import { getProductBySlug, type ProductItem } from "@/lib/product-data";

const CROSS_SELL: Record<string, string[]> = {
  "retail-sachets": ["container-strips", "dry-clay-desiccant", "bulk-industrial"],
  "paper-sachets": ["container-strips", "bulk-industrial", "dry-clay-desiccant"],
  "bulk-industrial": ["paper-sachets", "container-strips", "dry-clay-desiccant"],
  "container-strips": ["dry-clay-desiccant", "bulk-industrial", "paper-sachets"],
  "dry-clay-desiccant": ["container-strips", "bulk-industrial", "retail-sachets"],
  "hair-nets": ["beard-covers", "powder-free-blue-nitrile-gloves"],
  "beard-covers": ["hair-nets", "powder-free-blue-nitrile-gloves"],
  "powder-free-blue-nitrile-gloves": ["hair-nets", "beard-covers", "powdered-nitrile-examination-gloves"],
  "powdered-nitrile-examination-gloves": ["powder-free-blue-nitrile-gloves", "hair-nets", "beard-covers"],
};

/** Resolve up to 3 real catalog items buyers of `slug` also order. */
export function getCrossSell(slug: string): ProductItem[] {
  return (CROSS_SELL[slug] ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is ProductItem => Boolean(p))
    .slice(0, 3);
}
