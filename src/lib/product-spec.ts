/*
 * Standardised B2B product spec sheet — the ~25 attributes every product page
 * exposes for importers/distributors, rendered by <ProductSpecTable> and mirrored
 * into Product JSON-LD (additionalProperty).
 *
 * HONESTY DISCIPLINE (matches /llms.txt and the certifications page): DryGelWorld
 * holds ONLY ISO 9001:2015 (QMEC/IAS-CB, cert. 9101225) + a DMF-free statement.
 * FDA, food-grade (FSSC 22000 / EU 1935), pharma GMP, Halal, and REACH are NOT
 * held and must never be listed as certifications. Commercial values (MOQ, exact
 * lead time/price) are quoted per order, so they read "on request", not invented.
 */

export const SPEC_BRAND = "DryGelWorld";

export type ProductSpec = {
  productType: string;
  material: string;
  color: string;
  indicating: string;
  sizes: string;
  weight: string;
  packaging: string;
  application: string;
  industries: string;
  adsorptionCapacity: string;
  shelfLife: string;
  moq: string;
  certifications: string;
  sds: string;
  coa: string;
  countryOfOrigin: string;
  hsCode: string;
  leadTime: string;
  incoterms: string;
  privateLabel: string;
  exportMarkets: string;
};

// Shared silica-gel defaults. Per-product entries override only what differs.
const SILICA_BASE: ProductSpec = {
  productType: "Silica gel desiccant",
  material: "Amorphous silicon dioxide (SiO₂), CAS 7631-86-9",
  color: "Translucent white",
  indicating: "Non-indicating",
  sizes: "0.5 g – 500 g",
  weight: "Per unit, see sizes",
  packaging: "Breathable paper / non-woven sachets; bulk cartons",
  application: "Moisture control inside packaging, cartons, and containers",
  industries: "Electronics, pharma packaging, leather & footwear, food packaging, logistics",
  adsorptionCapacity: "Up to ~33% of own weight in water vapour (25 °C, 90% RH)",
  shelfLife: "24–36 months in the sealed factory pouch",
  moq: "Negotiable — trial orders supported, scaled pricing at volume (on request)",
  certifications:
    "ISO 9001:2015 (QMEC/IAS-CB, cert. 9101225). SDS, COA & DMF-free statement on request. Food-grade / pharma certification not held — buyer-driven compliance discussion.",
  sds: "Available on request",
  coa: "Batch-level, on request",
  countryOfOrigin: "Pakistan (Karachi)",
  hsCode: "2811.22.10 — silicon dioxide (confirm suffix with your customs broker)",
  leadTime: "~3–7 days from stock; +5–10 days for printed private label (confirmed at quote)",
  incoterms: "EXW, FOB Karachi, CIF, DAP",
  privateLabel: "Yes — custom-printed sachets and buyer branding",
  exportMarkets: "Worldwide B2B export (see the Export hub)",
};

const OVERRIDES: Record<string, Partial<ProductSpec>> = {
  "retail-sachets": {
    productType: "Silica gel desiccant sachet (unit pack)",
    sizes: "0.5 g, 1 g, 2 g, 3 g, 5 g, 10 g, 20 g",
    weight: "0.5 g – 20 g per sachet",
    packaging: "Breathable paper / technical-fibre sachets; bulk cartons",
    application: "Sub-package moisture control for electronics, precision parts, and premium goods",
    industries: "Electronics, precision engineering, leather & footwear, consumer goods",
  },
  "paper-sachets": {
    productType: "Breathable paper silica gel sachet",
    sizes: "1 g, 2 g, 3 g, 10 g, 15 g, 20 g",
    weight: "1 g – 20 g per sachet",
    packaging: "Porous paper sachets; dust-free industrial cartons",
    application: "General export-carton and warehouse moisture control",
    industries: "General manufacturing, textiles, spare parts, distribution",
  },
  "bulk-industrial": {
    productType: "Bulk silica gel beads",
    sizes: "25 g – 500 g units; 1 / 5 / 10 / 25 kg bags; jumbo bags",
    weight: "25 g – 25 kg; jumbo bags on request",
    packaging: "Drums, 25 kg sacks, and jumbo bags",
    application: "Facility- and warehouse-scale moisture-control programmes",
    industries: "Warehousing, industrial lines, regional distribution hubs",
  },
  "container-strips": {
    productType: "Container cargo desiccant strip (hanging)",
    sizes: "500 g & 1 kg container packs; 1 / 2 / 3 / 5 kg hanging strips",
    weight: "500 g – 5 kg per unit",
    packaging: "Multi-chamber hanging strips with hooks",
    application: "Ocean-freight container rain and condensation control",
    industries: "Export logistics, ocean freight, project cargo",
    adsorptionCapacity: "Up to ~33% (silica gel strips); clay variants up to ~25%",
  },
  "dry-clay-desiccant": {
    productType: "Activated clay (bentonite/montmorillonite) desiccant",
    material: "Activated bentonite / montmorillonite clay",
    color: "Grey / brown granules",
    sizes: "1 g, 5 g, 10 g, 25 g, 50 g; custom",
    weight: "1 g – 50 g; bulk on request",
    packaging: "Sachets, bags, or industrial cartons by requirement",
    application: "Cost-tier industrial and container moisture control",
    industries: "Durable goods, machinery, bulk export cargo",
    adsorptionCapacity: "Up to ~25% of own weight in water vapour",
    hsCode: "2508.10 / 3802.90 — activated clay (confirm with your customs broker)",
  },
  "hair-nets": {
    productType: "Bouffant hair net (disposable PPE)",
    material: "Non-woven polypropylene (PP) with elasticated edge",
    color: "Green, white (stocked)",
    indicating: "N/A",
    sizes: '18", 20", 21", 22" diameter',
    weight: "By piece",
    packaging: "Cartons of 100 or 1000 pieces",
    application: "Hair-containment PPE for hygiene-critical zones",
    industries: "Food processing, manufacturing, healthcare, hospitality",
    adsorptionCapacity: "N/A (not a desiccant)",
    shelfLife: "N/A (non-perishable PPE)",
    certifications:
      "Industrial-grade PPE. Food-grade certification (FDA / FSSC 22000 / EU 1935) NOT held — buyer-driven compliance discussion.",
    sds: "N/A",
    coa: "N/A",
    hsCode: "6505.00 — hair nets (confirm with your customs broker)",
    privateLabel: "Yes — carton and print branding",
  },
  "beard-covers": {
    productType: "Disposable beard cover / beard net (PPE)",
    material: "Non-woven polypropylene (PP) with elasticated edge",
    color: "Standard (white); others on request",
    indicating: "N/A",
    sizes: "Standard; custom on request",
    weight: "By piece",
    packaging: "Cartons of 100 or 1000 pieces",
    application: "Facial-hair containment PPE",
    industries: "Food processing, manufacturing, healthcare, catering",
    adsorptionCapacity: "N/A (not a desiccant)",
    shelfLife: "N/A (non-perishable PPE)",
    certifications:
      "Industrial-grade PPE. Food-grade certification (FDA / FSSC 22000 / EU 1935) NOT held — buyer-driven compliance discussion.",
    sds: "N/A",
    coa: "N/A",
    hsCode: "6307.90 — non-woven articles (confirm with your customs broker)",
    privateLabel: "Yes — carton and print branding",
  },
};

/** Ordered attribute labels for both the visible table and JSON-LD. */
export const SPEC_LABELS: Array<{ key: keyof ProductSpec; label: string }> = [
  { key: "productType", label: "Product type" },
  { key: "material", label: "Material" },
  { key: "color", label: "Color" },
  { key: "indicating", label: "Indicating / non-indicating" },
  { key: "sizes", label: "Size" },
  { key: "weight", label: "Weight (g / kg)" },
  { key: "packaging", label: "Packaging" },
  { key: "application", label: "Application" },
  { key: "industries", label: "Industries" },
  { key: "adsorptionCapacity", label: "Adsorption capacity" },
  { key: "shelfLife", label: "Shelf life" },
  { key: "moq", label: "MOQ" },
  { key: "certifications", label: "Certifications" },
  { key: "sds", label: "SDS" },
  { key: "coa", label: "COA" },
  { key: "countryOfOrigin", label: "Country of origin" },
  { key: "hsCode", label: "HS code" },
  { key: "leadTime", label: "Lead time" },
  { key: "incoterms", label: "Incoterms" },
  { key: "privateLabel", label: "Private label available" },
  { key: "exportMarkets", label: "Export markets" },
];

/** Resolve the full spec for a product slug (base + overrides), or null if none. */
export function getProductSpec(slug: string): ProductSpec | null {
  const override = OVERRIDES[slug];
  if (!override) return null;
  return { ...SILICA_BASE, ...override };
}

/** Build a silica-gel spec from partial overrides — for category landing pages. */
export function buildSpec(override: Partial<ProductSpec>): ProductSpec {
  return { ...SILICA_BASE, ...override };
}
