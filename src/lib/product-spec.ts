/*
 * Standardised B2B product spec sheet, the ~25 attributes every product page
 * exposes for importers/distributors, rendered by <ProductSpecTable> and mirrored
 * into non-Product specifications JSON-LD.
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
  moq: "Negotiable, with trial orders supported and scaled pricing at volume on request",
  certifications:
    "ISO 9001:2015 (QMEC/IAS-CB, cert. 9101225). SDS, COA, and DMF-free statement on request. Food-grade and pharma certifications are not held and must be confirmed against the buyer's application before commercial terms.",
  sds: "Available on request",
  coa: "Batch-level, on request",
  countryOfOrigin: "Pakistan (Karachi)",
  hsCode: "2811.22.10, silicon dioxide (confirm the suffix with your customs broker)",
  leadTime: "~3–7 days from stock; +5–10 days for printed private label (confirmed at quote)",
  incoterms: "EXW, FOB Karachi, CIF, DAP",
  privateLabel: "Yes, custom-printed sachets and buyer branding",
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
    application: "Facility and warehouse-scale moisture control programmes",
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
  "calcium-chloride-container-strip": {
    productType: "Calcium chloride container desiccant strip",
    material: "Calcium chloride moisture absorber in leak-resistant pouch / strip format",
    color: "White pouch; calcium chloride fill",
    indicating: "Non-indicating; deliquescent absorber",
    sizes: "1 kg, 2 kg, 3 kg, 5 kg, and custom hanging strips",
    weight: "1 kg - 5 kg per strip; custom on request",
    packaging: "Multi-chamber hanging strips in sealed export cartons",
    application: "High-capacity ocean-freight container moisture absorption",
    industries: "Export logistics, ocean freight, textiles, furniture, wood, paper, general cargo",
    adsorptionCapacity: "High moisture uptake in humid containers; exact capacity confirmed by lot and strip construction",
    shelfLife: "Typically 12-24 months in sealed factory packaging; confirm by supplied lot",
    moq: "Quoted by strip weight, strip count, route, and container plan",
    certifications:
      "SDS and COA on request. Certifications, REACH/RoHS, or market-specific test reports must be confirmed against the selected lot before commercial claims.",
    sds: "Available on request",
    coa: "Batch-level, on request",
    countryOfOrigin: "Confirmed per supplied lot",
    hsCode: "2827.20, calcium chloride (confirm suffix with your customs broker)",
    leadTime: "Quoted by strip weight, carton volume, and dispatch schedule",
    incoterms: "EXW, FOB Karachi, CIF, DAP",
    privateLabel: "Yes, carton and pouch-label discussion for volume buyers",
    exportMarkets: "Worldwide B2B export, subject to destination documentation requirements",
  },
  "calcium-chloride-container-bulk": {
    productType: "Calcium chloride bulk desiccant bag",
    material: "Calcium chloride moisture absorber in pouch / bag format",
    color: "White pouch; calcium chloride fill",
    indicating: "Non-indicating; deliquescent absorber",
    sizes: "500 g, 1 kg, 2 kg, and custom bags",
    weight: "500 g - 2 kg per bag; custom on request",
    packaging: "Non-woven / pouch bags in sealed export cartons",
    application: "Container cargo, pallet, and warehouse moisture absorption",
    industries: "Export logistics, warehousing, textiles, furniture, paper, wood, general cargo",
    adsorptionCapacity: "High moisture uptake in humid storage/container conditions; exact capacity confirmed by lot",
    shelfLife: "Typically 12-24 months in sealed factory packaging; confirm by supplied lot",
    moq: "Quoted by bag size, carton volume, and dispatch program",
    certifications:
      "SDS and COA on request. Certifications, REACH/RoHS, or market-specific test reports must be confirmed against the selected lot before commercial claims.",
    sds: "Available on request",
    coa: "Batch-level, on request",
    countryOfOrigin: "Confirmed per supplied lot",
    hsCode: "2827.20, calcium chloride (confirm suffix with your customs broker)",
    leadTime: "Quoted by bag size, carton volume, and dispatch schedule",
    incoterms: "EXW, FOB Karachi, CIF, DAP",
    privateLabel: "Yes, carton and bag-label discussion for volume buyers",
    exportMarkets: "Worldwide B2B export, subject to destination documentation requirements",
  },
  "humidity-indicator-cards": {
    productType: "Humidity indicator card (reversible spot card)",
    material: "Printed card stock with humidity-reactive spots (cobalt-dichloride or cobalt-free chemistry)",
    color: "Cobalt: blue (dry) to pink (humid). Cobalt-free: reversible colour shift, REACH-friendly",
    indicating: "Yes, reversible; spots change colour as relative humidity crosses marked thresholds",
    sizes: "Single-spot, 3-spot, 4-spot, 6-spot, and custom layouts",
    weight: "Per card, light; quoted by pack count",
    packaging: "Sealed moisture-barrier can or foil bag; count per pack by requirement",
    application: "Visual humidity check inside sealed dry-pack (electronics, pharma, optics, export QC)",
    industries: "Electronics/PCB, pharma, optics, precision goods, export logistics",
    adsorptionCapacity: "Not applicable; an indicator, not a desiccant; pair with silica gel or clay",
    shelfLife: "Typically 12-24 months in sealed factory packaging; confirm by supplied lot",
    moq: "Quoted by spot layout, chemistry, pack count, and dispatch program",
    certifications:
      "Sourced / private-label item. MIL-STD-3464, JEDEC J-STD-033, or REACH-related test reports must be confirmed against the selected lot before commercial claims. Not held by DryGelWorld.",
    sds: "Available on request",
    coa: "Batch-level, on request",
    countryOfOrigin: "Confirmed per supplied lot",
    hsCode: "3822.90 / 4823.90, confirm classification with your customs broker",
    leadTime: "Quoted by spot layout, chemistry, pack count, and dispatch schedule",
    incoterms: "EXW, FOB Karachi, CIF, DAP",
    privateLabel: "Yes, card print and pack-label discussion for volume buyers",
    exportMarkets: "Worldwide B2B export, subject to destination documentation requirements",
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
    hsCode: "2508.10 / 3802.90, activated clay (confirm with your customs broker)",
  },
  "powder-free-blue-nitrile-gloves": {
    productType: "Powder-free nitrile examination / industrial glove",
    material: "Nitrile synthetic rubber (latex-free)",
    color: "Blue, black",
    indicating: "N/A (PPE glove)",
    sizes: "XS, Small, Medium, Large, X-Large",
    weight: "By glove / box; confirmed per lot",
    packaging: "100 gloves per box; export carton quantity quoted by order",
    application: "Hand protection for medical, laboratory, food, cleaning, and industrial workflows",
    industries: "Medical, laboratory, food handling, industrial assembly, cleaning, inspection",
    adsorptionCapacity: "N/A (not a desiccant)",
    shelfLife: "Typically 3-5 years when stored cool and dry; confirm on the selected lot",
    moq: "Quoted by carton volume, size mix, and recurring supply program",
    certifications:
      "ISO support available. CE, FDA, EN 455, ASTM D6319, or other medical glove documents must be confirmed against the selected lot before advertising as held.",
    sds: "N/A for finished glove in normal use; material/spec sheet on request",
    coa: "Lot-level COA / inspection certificate on request where available",
    countryOfOrigin: "Confirmed per supplied lot",
    hsCode: "4015.19 - rubber/nitrile gloves (confirm suffix with your customs broker)",
    leadTime: "Quoted by size mix, carton volume, and dispatch schedule",
    incoterms: "EXW, FOB Karachi, CIF, DAP",
    privateLabel: "Yes - box/carton branding discussion for volume buyers",
    exportMarkets: "Worldwide B2B export, subject to destination medical/PPE documentation requirements",
  },
  "powdered-nitrile-examination-gloves": {
    productType: "Powdered nitrile examination / industrial glove",
    material: "Nitrile synthetic rubber (latex-free)",
    color: "Blue, black",
    indicating: "N/A (PPE glove)",
    sizes: "XS, Small, Medium, Large, X-Large",
    weight: "By glove / box; confirmed per lot",
    packaging: "100 gloves per box; export carton quantity quoted by order",
    application: "Hand protection for medical, laboratory, food, cleaning, and industrial workflows",
    industries: "Medical, laboratory, food handling, industrial assembly, cleaning, inspection",
    adsorptionCapacity: "N/A (not a desiccant)",
    shelfLife: "Typically 3-5 years when stored cool and dry; confirm on the selected lot",
    moq: "Quoted by carton volume, size mix, and recurring supply program",
    certifications:
      "ISO support available. CE, FDA, EN 455, ASTM D6319, or other medical glove documents must be confirmed against the selected lot before advertising as held.",
    sds: "N/A for finished glove in normal use; material/spec sheet on request",
    coa: "Lot-level COA / inspection certificate on request where available",
    countryOfOrigin: "Confirmed per supplied lot",
    hsCode: "4015.19 - rubber/nitrile gloves (confirm suffix with your customs broker)",
    leadTime: "Quoted by size mix, carton volume, and dispatch schedule",
    incoterms: "EXW, FOB Karachi, CIF, DAP",
    privateLabel: "Yes - box/carton branding discussion for volume buyers",
    exportMarkets: "Worldwide B2B export, subject to destination medical/PPE documentation requirements",
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
      "Industrial-grade PPE. Food-grade certifications such as FDA, FSSC 22000, and EU 1935 are not currently held. Confirm requirements before commercial terms.",
    sds: "N/A",
    coa: "N/A",
    hsCode: "6505.00, hair nets (confirm with your customs broker)",
    privateLabel: "Yes, carton and print branding",
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
      "Industrial-grade PPE. Food-grade certifications such as FDA, FSSC 22000, and EU 1935 are not currently held. Confirm requirements before commercial terms.",
    sds: "N/A",
    coa: "N/A",
    hsCode: "6307.90, non-woven articles (confirm with your customs broker)",
    privateLabel: "Yes, carton and print branding",
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

/** Build a silica-gel spec from partial overrides, for category landing pages. */
export function buildSpec(override: Partial<ProductSpec>): ProductSpec {
  return { ...SILICA_BASE, ...override };
}

// ── Category landing-page specs (keyed by SEO landing slug) ──────────────────
const LANDING_SPECS: Record<string, { name: string; spec: Partial<ProductSpec> }> = {
  "silica-gel-manufacturer": {
    name: "Manufacturer-direct silica gel supply",
    spec: {
      productType: "Manufacturer-direct silica gel desiccant supply",
      sizes: "0.5 g-500 g sachets and bags; 1-25 kg bulk formats; 1-5 kg cargo strips",
      packaging: "Paper and non-woven sachets, industrial bags, drums, sacks, cartons, and hanging strips",
      application: "B2B product packaging, warehousing, repacking, private label, and export cargo",
      industries: "Packaging, electronics, leather, textiles, logistics, food and pharma secondary packaging",
    },
  },
  "silica-gel-supplier": {
    name: "B2B silica gel supply program",
    spec: {
      productType: "Silica gel packets, bulk beads, bags, and cargo strips",
      sizes: "0.5 g-500 g finished formats; 1-25 kg bulk formats; 1-5 kg cargo strips",
      packaging: "Sachets, bags, sacks, drums, export cartons, and private-label packing",
      application: "Repeat B2B supply for packaging, warehousing, distribution, and export logistics",
      industries: "Distributors, packagers, importers, exporters, warehouses, and factories",
    },
  },
  "white-silica-gel": {
    name: "White (non-indicating) silica gel",
    spec: {
      productType: "White silica gel (non-indicating)",
      color: "Translucent white / clear",
      sizes: "Beads 1–3 mm & 2–5 mm; sachets 0.5 g–500 g; bulk bags",
      packaging: "Sachets, 25 kg bags, drums, jumbo bags",
      application: "General-purpose moisture control in packaging and containers",
    },
  },
  "non-indicating-silica-gel": {
    name: "Non-indicating silica gel",
    spec: {
      productType: "Non-indicating white silica gel",
      color: "Translucent white",
      application: "General moisture control where a colour indicator is not required",
    },
  },
  "indicating-silica-gel": {
    name: "Indicating silica gel",
    spec: {
      productType: "Indicating silica gel (orange or blue)",
      color: "Orange (cobalt-free) or blue (cobalt-chloride)",
      indicating: "Indicating, colour changes on saturation",
      application: "Visual moisture-saturation monitoring inside sealed packs",
    },
  },
  "orange-silica-gel-supplier": {
    name: "Orange indicating silica gel",
    spec: {
      productType: "Orange indicating silica gel (cobalt-free)",
      color: "Orange (dry) → colourless / pale green (saturated)",
      indicating: "Indicating, cobalt-free, no REACH-restricted cobalt dichloride (the modern default)",
      application: "Visual moisture monitoring without REACH-restricted cobalt dichloride",
    },
  },
  "blue-silica-gel-manufacturer": {
    name: "Blue indicating silica gel",
    spec: {
      productType: "Blue indicating silica gel (cobalt-chloride type)",
      color: "Blue (dry) → pink (saturated)",
      indicating: "Indicating, cobalt-chloride (restricted in EU/UK/AU/CA under REACH)",
      application: "Visual moisture monitoring for non-REACH markets only",
    },
  },
  "silica-gel-beads": {
    name: "Silica gel beads",
    spec: {
      productType: "Silica gel beads (loose)",
      sizes: "1–3 mm, 2–5 mm, 3–5 mm beads",
      packaging: "25 kg bags, drums, jumbo bags; sachets on request",
      application: "Loose-fill, repackaging, and industrial / lab moisture control",
    },
  },
  "silica-gel-packets": {
    name: "Silica gel packets",
    spec: {
      productType: "Silica gel packets / sachets",
      sizes: "0.5 g, 1 g, 2 g, 3 g, 5 g, 10 g, 20 g, 50 g, 100 g",
      weight: "0.5 g – 100 g per packet",
      packaging: "Paper / non-woven sachets; bulk cartons",
      application: "In-box moisture control across industries",
    },
  },
  "bulk-silica-gel-desiccant": {
    name: "Bulk silica gel",
    spec: {
      productType: "Bulk silica gel (beads / crystals)",
      sizes: "1 / 5 / 10 / 25 kg bags; jumbo bags",
      weight: "1 kg – 25 kg; jumbo bags on request",
      packaging: "25 kg bags, drums, jumbo bags",
      application: "Warehouse- and facility-scale moisture programmes; repackers",
      industries: "Warehousing, distribution, repackers, industrial lines",
    },
  },
  "container-desiccant-strips": {
    name: "Container desiccant strips",
    spec: {
      productType: "Container cargo desiccant strips (hanging)",
      sizes: "500 g & 1 kg container packs; 1 / 2 / 3 / 5 kg strips",
      weight: "500 g – 5 kg per unit",
      packaging: "Multi-chamber hanging strips with hooks",
      application: "Ocean-freight container rain and condensation control",
      industries: "Export logistics, ocean freight, project cargo",
      adsorptionCapacity: "Up to ~33% (silica gel strips); clay variants up to ~25%",
    },
  },
  "container-desiccant-supplier": {
    name: "Container cargo desiccants",
    spec: {
      productType: "Hanging container desiccant strips and cargo bags",
      sizes: "500 g, 1 kg, 2 kg, 3 kg, and 5 kg formats",
      packaging: "Multi-chamber hanging strips with hooks; export cartons",
      application: "Route-based condensation and container-rain control",
      industries: "Ocean freight, export logistics, textiles, leather, machinery",
    },
  },
  "shipping-container-desiccant-supplier": {
    name: "Shipping container desiccants",
    spec: {
      productType: "High-capacity cargo desiccant strips",
      sizes: "1 kg to 5 kg strips for 20ft and 40ft planning",
      packaging: "Hanging multi-chamber strips in sealed export packing",
      application: "Sea-freight humidity, condensation, and container-rain control",
      industries: "Export cargo, freight forwarding, warehousing, project shipments",
    },
  },
  "private-label": {
    name: "Private-label silica gel packets",
    spec: {
      productType: "Custom printed silica gel sachets",
      sizes: "0.5 g to 100 g standard packet range",
      packaging: "Paper or non-woven sachets; buyer-labeled inner and master cartons",
      application: "Branded product packs, distributor SKUs, and OEM insertion lines",
      industries: "Consumer goods, electronics, footwear, apparel, packaging",
    },
  },
  "private-label-silica-gel-supplier": {
    name: "OEM silica gel sachets",
    spec: {
      productType: "Printed and buyer-labeled desiccant packets",
      sizes: "0.5 g to 100 g, subject to material and print setup",
      packaging: "Custom sachets, inner bags, carton labels, and export cartons",
      application: "Repeat private-label and contract-packing programs",
      industries: "Brands, distributors, importers, and contract packers",
    },
  },
  "food-grade-silica-gel-supplier": {
    name: "Silica gel for food packaging",
    spec: {
      productType: "Silica gel for food packaging (industrial grade)",
      application: "Moisture control for dried-food and nutraceutical packaging (non-direct-contact)",
      industries: "Food packaging, dried goods, nutraceuticals",
    certifications:
        "ISO 9001:2015 (QMEC/IAS-CB). Industrial grade. FDA, FSSC 22000, and EU 1935 food-contact certifications are not currently held. Suited to incidental-contact packaging where the desiccant does not touch food directly.",
    },
  },
  "pharmaceutical-desiccant": {
    name: "Pharmaceutical packaging desiccant",
    spec: {
      productType: "Silica gel desiccant for pharma packaging (industrial grade)",
      application: "Moisture control for bottles, canisters, blisters, and secondary packaging",
      industries: "Pharmaceutical packaging (secondary), nutraceuticals",
    certifications:
        "ISO 9001:2015 (QMEC/IAS-CB) + DMF-free statement. FDA DMF, USP, and pharma-GMP are not currently held. Appropriate for non-DMF secondary packaging.",
    },
  },
  "electronic-packaging-desiccant": {
    name: "Electronics packaging desiccant",
    spec: {
      productType: "Silica gel desiccant for electronics packaging",
      application: "Moisture protection for MSD components, PCBs, and ICs in sealed packs",
      industries: "Electronics, semiconductors, PCB assembly",
    certifications:
        "ISO 9001:2015 (QMEC/IAS-CB) + SDS/COA/DMF-free on request. JEDEC J-STD-033 and MSL classification are not currently held.",
    },
  },
  "bentonite-clay": {
    name: "Bentonite clay desiccant",
    spec: {
      productType: "Activated bentonite clay desiccant",
      material: "Activated bentonite / montmorillonite clay",
      color: "Grey / brown granules",
      adsorptionCapacity: "Up to ~25% of own weight in water vapour",
      application: "Cost-tier industrial and container moisture control",
      industries: "Durable goods, machinery, bulk export cargo",
      hsCode: "2508.10 / 3802.90, activated clay (confirm with your customs broker)",
    },
  },
};

/** Resolve a full landing-page spec by slug (base + overrides), or null. */
export function getLandingSpec(slug: string): { name: string; spec: ProductSpec } | null {
  const entry = LANDING_SPECS[slug];
  if (!entry) return null;
  return { name: entry.name, spec: buildSpec(entry.spec) };
}
