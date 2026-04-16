import type {
  ComplianceTag,
  ComplianceTagId,
  DesiccantCalculationInput,
  DesiccantCalculationOutput,
  PacketMaterial,
  PackagingType,
  ProductFilterState,
  ProductGrade,
  ProductRecord,
  ProductType,
} from "./site-types";

export const whatsappNumber = "923330223337";
export const displayPhone = "03330223337";

export const complianceTags: ComplianceTag[] = [
  {
    id: "fda-food",
    label: "US FDA 21 CFR 177.1520",
    shortLabel: "FDA Food Contact",
    description: "Suitable for indirect food and pharmaceutical packaging applications.",
  },
  {
    id: "fda-paper",
    label: "US FDA 21 CFR 176.170",
    shortLabel: "FDA Paper Components",
    description: "Paper and porous packet materials aligned with food-contact paper requirements.",
  },
  {
    id: "reach",
    label: "REACH",
    shortLabel: "REACH",
    description: "Aligned for European chemical registration and restricted substance expectations.",
  },
  {
    id: "rohs",
    label: "RoHS",
    shortLabel: "RoHS",
    description: "Suitable for electronics supply chains requiring restricted-substance control.",
  },
  {
    id: "iso-9001",
    label: "ISO 9001",
    shortLabel: "ISO 9001",
    description: "Quality-management alignment for repeatable industrial manufacturing.",
  },
  {
    id: "iso-14001",
    label: "ISO 14001",
    shortLabel: "ISO 14001",
    description: "Environmental-management alignment for responsible operations.",
  },
  {
    id: "dmf-free",
    label: "DMF-Free",
    shortLabel: "DMF-Free",
    description: "No dimethyl fumarate for sensitive export and food-related supply chains.",
  },
  {
    id: "cobalt-free",
    label: "Cobalt-Free Indicator",
    shortLabel: "Cobalt-Free",
    description: "Safer indicating chemistry for modern procurement requirements.",
  },
];

export const productTypeOptions: Array<ProductType | "all"> = ["all", "white", "blue", "orange"];
export const productGradeOptions: Array<ProductGrade | "all"> = ["all", "pharma", "food", "industrial"];
export const packagingOptions: Array<PackagingType | "all"> = ["all", "packets", "canisters", "bulk beads", "labels", "container strips"];
export const packetMaterialOptions: Array<PacketMaterial | "all"> = ["all", "tyvek", "paper", "non-woven", "pet", "laminate"];

export const productCatalog: ProductRecord[] = [
  {
    slug: "retail-sachets",
    name: "Precision White Silica Gel Packets",
    shortName: "Precision White",
    eyebrow: "Electronics and premium carton protection",
    summary: "Low-dust white silica gel packets engineered for small-format electronics, instruments, leather goods, and export-ready consumer packaging.",
    description: "This range is built for buyers who need consistent adsorption in compact packages with fast document access, low particulate risk, and dependable replenishment for regional or export programs.",
    heroImage: "/silicagel_hero_elite.png",
    type: "white",
    packaging: ["packets", "labels"],
    grade: "industrial",
    indicatorType: "non-indicating",
    packetMaterial: ["tyvek", "paper"],
    poreProfile: "Type A micro-porous silica with high surface area for low- to medium-humidity control.",
    complianceTags: ["reach", "rohs", "iso-9001", "dmf-free"],
    industryTags: ["electronics", "industrial-refining"],
    documentIds: ["sds-white-packets", "tds-precision-white", "cert-reach-rohs"],
    featuredApplications: [
      "5G components and semiconductors",
      "Precision instruments and sensors",
      "Luxury leather accessories",
      "Retail export cartons",
    ],
    availableFormats: ["0.5 g", "1 g", "2 g", "3 g", "5 g", "10 g", "adhesive label inserts"],
    regenerationNotes: "Can be regenerated at 120°C to 150°C in controlled conditions when packet materials allow reheating.",
    leadTime: "Stock-supported for repeat monthly supply and export replenishment.",
    priceBand: "Reference pricing available with OEM and distribution tiers.",
    technicalHighlights: [
      { label: "Adsorption profile", value: ">32% by weight at high RH" },
      { label: "Primary materials", value: "Tyvek and porous paper" },
      { label: "Use mode", value: "Unit-level and carton-level protection" },
    ],
  },
  {
    slug: "paper-sachets",
    name: "Orange Indicating Technical Sachets",
    shortName: "Orange Indicating",
    eyebrow: "Visible saturation control for regulated packaging",
    summary: "Orange indicating silica gel sachets designed for pharma, food, and moisture-sensitive packaging lines that need quick visual verification.",
    description: "A cobalt-free indicating format that helps teams verify saturation behavior quickly while maintaining a structured documentation trail for compliance-heavy procurement.",
    heroImage: "/silicagel_paper_technical.png",
    type: "orange",
    packaging: ["packets", "canisters"],
    grade: "pharma",
    indicatorType: "indicating",
    packetMaterial: ["paper", "non-woven"],
    poreProfile: "Type A base silica with indicator chemistry suited for rapid visual status checks.",
    complianceTags: ["fda-food", "fda-paper", "reach", "iso-9001", "dmf-free", "cobalt-free"],
    industryTags: ["pharmaceuticals", "food-beverage"],
    documentIds: ["sds-orange-indicating", "tds-orange-sachets", "cert-fda-food"],
    featuredApplications: [
      "Active pharmaceutical ingredients",
      "Diagnostic kits and vial cartons",
      "Dry food packaging and nutraceuticals",
      "Export cartons requiring visible change indication",
    ],
    availableFormats: ["1 g", "2 g", "3 g", "5 g", "10 g", "20 g", "small canisters"],
    regenerationNotes: "Indicator chemistry changes color with saturation; reconditioning should follow validated temperature windows for the selected packet material.",
    leadTime: "Quoted for regulated industries with batch-linked documentation support.",
    priceBand: "Premium compliance-led pricing with repeat-order programs.",
    technicalHighlights: [
      { label: "Indicator chemistry", value: "Cobalt-free orange indicator" },
      { label: "Compliance fit", value: "FDA-oriented packet options" },
      { label: "Best use", value: "High-scrutiny packaging lines" },
    ],
  },
  {
    slug: "bulk-industrial",
    name: "Blue Bulk Beads and Drum Supply",
    shortName: "Blue Bulk",
    eyebrow: "Warehouse, refining, and line-side adsorption",
    summary: "Bulk bead supply for process rooms, industrial storage, dunnage control, and large-volume desiccant programs across warehouses and plant environments.",
    description: "This format supports buyers who need bulk handling, refill programs, and project-scale adsorption planning rather than retail-style packet purchasing.",
    heroImage: "/silicagel_bulk_enterprise.png",
    type: "blue",
    packaging: ["bulk beads"],
    grade: "industrial",
    indicatorType: "indicating",
    packetMaterial: ["laminate", "pet"],
    poreProfile: "Mixed pore profile for high-capacity industrial adsorption and support applications.",
    complianceTags: ["reach", "iso-9001", "iso-14001"],
    industryTags: ["industrial-refining", "electronics"],
    documentIds: ["sds-bulk-blue", "tds-bulk-beads", "cert-iso-systems"],
    featuredApplications: [
      "Warehouse moisture stabilization",
      "Bulk drum or bag replenishment programs",
      "Industrial cabinets and process spaces",
      "Refining and gas-drying support programs",
    ],
    availableFormats: ["25 g", "50 g", "100 g", "200 g", "250 g", "500 g", "25 kg bags"],
    regenerationNotes: "Bulk beads are suitable for controlled regeneration cycles when process contamination is managed.",
    leadTime: "Project-based planning with staged dispatch for high-volume industrial accounts.",
    priceBand: "Project quotation and annual-contract pricing.",
    technicalHighlights: [
      { label: "Supply mode", value: "Bag, drum, and project-scale formats" },
      { label: "Primary use", value: "Warehouse and process adsorption" },
      { label: "ESG angle", value: "Supports regeneration-focused reuse programs" },
    ],
  },
  {
    slug: "container-strips",
    name: "Container Strip Maritime Desiccants",
    shortName: "Container Strips",
    eyebrow: "Export logistics and long-haul transit",
    summary: "High-capacity container strips for long-haul shipments exposed to condensation, temperature swings, and container rain during ocean transit.",
    description: "Built for exporters and logistics teams who need high-capacity desiccants tied to transit duration, container geometry, and compliance-sensitive cargo protection.",
    heroImage: "/silicagel_cargo_strips.png",
    type: "white",
    packaging: ["container strips"],
    grade: "food",
    indicatorType: "non-indicating",
    packetMaterial: ["non-woven", "laminate"],
    poreProfile: "High-capacity cargo-strip media optimized for long-duration humidity absorption.",
    complianceTags: ["fda-food", "reach", "rohs", "iso-9001", "dmf-free"],
    industryTags: ["food-beverage", "industrial-refining"],
    documentIds: ["sds-container-strips", "tds-container-strips", "cert-export-compliance"],
    featuredApplications: [
      "20-foot and 40-foot containers",
      "Export food packaging",
      "Textile and leather shipments",
      "High-value machinery and spare parts",
    ],
    availableFormats: ["1 kg strip", "2 kg hanging assemblies", "custom strip layouts"],
    regenerationNotes: "Designed primarily for one-way logistics programs; reuse depends on validation and transport conditions.",
    leadTime: "Aligned with export windows and repeat container booking schedules.",
    priceBand: "Logistics quotation by route, transit duration, and container count.",
    technicalHighlights: [
      { label: "Transit window", value: "Suitable for 30 to 60+ day journeys" },
      { label: "Main risk", value: "Container rain and condensation control" },
      { label: "Procurement model", value: "Project and route-based planning" },
    ],
  },
];

export const standardPacketOptions = [
  { label: "1 g", grams: 1 },
  { label: "2 g", grams: 2 },
  { label: "3 g", grams: 3 },
  { label: "5 g", grams: 5 },
  { label: "10 g", grams: 10 },
  { label: "20 g", grams: 20 },
  { label: "25 g", grams: 25 },
  { label: "50 g", grams: 50 },
  { label: "100 g", grams: 100 },
  { label: "200 g", grams: 200 },
  { label: "250 g", grams: 250 },
  { label: "500 g", grams: 500 },
  { label: "1 kg strip", grams: 1000 },
];

export const defaultProductFilterState: ProductFilterState = {
  type: "all",
  grade: "all",
  packaging: "all",
  indicatorType: "all",
  packetMaterial: "all",
};

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function getComplianceTagById(id: ComplianceTagId) {
  return complianceTags.find((tag) => tag.id === id);
}

export function getComplianceTags(ids: ComplianceTagId[]) {
  return ids.map((id) => getComplianceTagById(id)).filter(Boolean) as ComplianceTag[];
}

export function filterProducts(products: ProductRecord[], filters: ProductFilterState) {
  return products.filter((product) => {
    if (filters.type !== "all" && product.type !== filters.type) return false;
    if (filters.grade !== "all" && product.grade !== filters.grade) return false;
    if (filters.packaging !== "all" && !product.packaging.includes(filters.packaging)) return false;
    if (filters.indicatorType !== "all" && product.indicatorType !== filters.indicatorType) return false;
    if (filters.packetMaterial !== "all" && !product.packetMaterial.includes(filters.packetMaterial)) return false;
    return true;
  });
}

export function calculateDesiccantRequirement(input: DesiccantCalculationInput): DesiccantCalculationOutput {
  const climateMultiplier = input.climate === "temperate" ? 11 : 40;
  const baseWeightGrams =
    climateMultiplier *
      Math.max(input.area, 0) *
      Math.max(input.waterVaporTransmissionRate, 0) *
      Math.max(input.months, 0) +
    Math.max(input.dunnageFactor, 0);

  const nearestPacket =
    standardPacketOptions.find((option) => option.grams >= baseWeightGrams) ??
    standardPacketOptions[standardPacketOptions.length - 1];

  const recommendedPacketCount = nearestPacket.grams > 0
    ? Math.max(1, Math.ceil(baseWeightGrams / nearestPacket.grams))
    : 0;

  return {
    climateMultiplier,
    baseWeightGrams,
    nearestPacketGrams: nearestPacket.grams,
    recommendedPacketLabel: nearestPacket.label,
    recommendedPacketCount,
  };
}
