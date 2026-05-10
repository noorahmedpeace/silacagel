export type ProductItem = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  useCaseLine?: string;
  description: string;
  heroImage: string;
  useCases: string[];
  packingOptions: string[];
  leadTime: string;
  priceBand: string;
  featuredSizes: string[];
};

export type PriceItem = {
  label: string;
  unitPrice: number;
  grams: number;
};

export type PriceGroup = {
  title: string;
  note: string;
  items: PriceItem[];
};

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "923330223337";
export const displayPhone = process.env.NEXT_PUBLIC_SALES_PHONE_DISPLAY?.trim() || "+92 333 022 3337";
export const phoneHref = process.env.NEXT_PUBLIC_SALES_PHONE_HREF?.trim() || "+923330223337";
export const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL?.trim() || "";
export const companyCity = process.env.NEXT_PUBLIC_COMPANY_CITY?.trim() || "Karachi";
export const companyCountry = process.env.NEXT_PUBLIC_COMPANY_COUNTRY?.trim() || "Pakistan";
export const serviceArea = process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || "Worldwide";

export const productCatalog: ProductItem[] = [
  {
    slug: "retail-sachets",
    name: "Precision Grade Silica Gel",
    shortName: "Precision Units",
    eyebrow: "Unit-Level Protection",
    summary:
      "Engineered for sub-package moisture control in electronics, precision engineering, and elite consumer goods.",
    useCaseLine: "Optimal for high-precision components and unit-level packaging.",
    description:
      "Our precision-grade units are designed for integration directly within technical packaging. They are critical for high-end electronics, precision apertures, and luxury leather exports where unit-level integrity is non-negotiable.",
    heroImage: "/silicagel_hero_elite.webp",
    useCases: [
      "Aerospace and semiconductor shielding",
      "High-end footwear and luxury leather",
      "Precision medical instrumentation",
      "Retail-ready electronic sub-assemblies",
    ],
    packingOptions: [
      "Material: breathable paper / technical fiber options",
      "Adsorption Capacity: >32% at 90% RH",
      "Document support: ISO 9001:2015, SDS, COA, DMF-free statement on request",
    ],
    leadTime: "Standard stock for recurring global contracts",
    priceBand: "Tiered industrial reference rates available",
    featuredSizes: ["0.5 gm", "1 gm", "2 gm", "3 gm", "5 gm", "10 gm", "20 gm"],
  },
  {
    slug: "paper-sachets",
    name: "Technical Bond Moisture Control",
    shortName: "Technical Bond",
    eyebrow: "Scale Applications",
    summary:
      "High-efficiency adsorption packs for general industrial cartons and volume inventory management.",
    useCaseLine: "Standard protection for industrial warehousing and scale logistics.",
    description:
      "Technical Bond sachets provide a high-performance balance for general industrial cargo. These are the workhorse of global trade, protecting everything from heavy machinery parts to large-scale textile shipments.",
    heroImage: "/silicagel_paper_technical.webp",
    useCases: [
      "Standard export carton stabilization",
      "Industrial spare parts inventory",
      "Bulk commodity moisture shielding",
      "Distributor and reseller supply chains",
    ],
    packingOptions: [
      "Material: Technical Bond Porous Paper",
      "Pore Size: Optimized for rapid adsorption",
      "Packaging: Dust-free industrial integrity",
    ],
    leadTime: "Optimized for large-scale procurement cycles",
    priceBand: "Tiered wholesale procurement rates",
    featuredSizes: ["1 gm", "2 gm", "3 gm", "10 gm", "15 gm", "20 gm"],
  },
  {
    slug: "bulk-industrial",
    name: "Enterprise Bulk Logistics Supply",
    shortName: "Enterprise Bulk",
    eyebrow: "Infrastructure Scale",
    summary:
      "High-capacity desiccant formats for warehouse stabilization, industrial lines, and regional distribution hub supply.",
    useCaseLine: "Heavy-duty coverage for expansive industrial and logistics environments.",
    description:
      "Our enterprise bulk range is designed for facility-scale moisture control programs. These high-capacity units are essential for maintaining dry-state integrity in large-scale warehouses and heavy industrial manufacturing zones.",
    heroImage: "/silicagel_bulk_enterprise.webp",
    useCases: [
      "Facility-wide moisture management",
      "Continuous industrial assembly lines",
      "Regional distribution and hub inventory",
      "Large-bore machinery and infrastructure parts",
    ],
    packingOptions: [
      "Capacities: 25g to 500g high-bore units",
      "Standard: backed by ISO 9001:2015 manufacturing process",
      "Config: Customizable industrial density",
    ],
    leadTime: "Quoted per project and logistical requirement",
    priceBand: "Elite procurement rates for high-volume contracts",
    featuredSizes: ["25 grams", "50 grams", "100 grams", "200 grams", "250 grams", "500 grams"],
  },
  {
    slug: "container-strips",
    name: "Maritime Export Cargo Protection",
    shortName: "Cargo Strips",
    eyebrow: "Global Logistics",
    summary:
      "High-adsorption maritime strips for international container loads, long-haul shipping, and extreme humidity transit.",
    useCaseLine: "Ultimate protection for maritime export and international logistics.",
    description:
      "Our cargo strips are specifically engineered for the extreme humidity shifts of maritime transit. They are the global standard for protecting high-value export containers over long-haul oceanic routes.",
    heroImage: "/silicagel_cargo_strips.webp",
    useCases: [
      "International ocean freight containers",
      "Extreme-humidity logistics routes",
      "Long-haul intermodal cargo transport",
      "High-value export consignment stabilization",
    ],
    packingOptions: [
      "Type: 1kg Multi-chamber Cargo Strips",
      "Seal: Double-welded high-integrity seams",
      "Transit: 60+ Day Adsorption Protection",
    ],
    leadTime: "Aligned with international shipping windows",
    priceBand: "Quoted by route, container volume, and dispatch schedule",
    featuredSizes: ["1 kg maritime strip"],
  },
  {
    slug: "hair-nets",
    name: "Bouffant Hair Nets — Safety & PPE",
    shortName: "Hair Nets",
    eyebrow: "Industrial Safety PPE",
    summary:
      "Disposable bouffant hair nets in green and white for food processing, manufacturing, healthcare, and industrial PPE programs.",
    useCaseLine: "Standard hair-containment PPE for safety-critical workspaces.",
    description:
      "Bouffant hair nets keep loose hair contained during food handling, manufacturing, healthcare, and cleanroom operations. DryGelWorld supplies non-woven polypropylene bouffant nets in 18, 20, 21, and 22 inch diameters and in both green and white — green is commonly used to mark designated zones and white is the general-use default.",
    heroImage: "/products/hair-nets.jpg",
    useCases: [
      "Food processing and packaging line PPE",
      "Manufacturing and assembly hairshed prevention",
      "Healthcare, pharma, and laboratory hygiene",
      "Foodservice, catering, and hospitality compliance",
    ],
    packingOptions: [
      "Material: non-woven polypropylene (PP) with elasticated edge",
      "Standard sizes: 18\", 20\", 21\", 22\" diameter",
      "Colors stocked: green and white",
      // TODO: confirm real certifications held by the supply source.
      // Food-grade PPE often expects FDA / FSSC 22000 / EU 1935/2004 alignment;
      // do not advertise certs that are not formally held.
      "Document support: discuss compliance requirements per buyer market",
    ],
    leadTime: "Quoted by carton volume and dispatch schedule",
    priceBand: "B2B reference rates available on request",
    featuredSizes: ["18 inch", "20 inch", "21 inch", "22 inch"],
  },
  {
    slug: "beard-covers",
    name: "Disposable Beard Covers — Safety & PPE",
    shortName: "Beard Covers",
    eyebrow: "Industrial Safety PPE",
    summary:
      "Disposable beard covers (beard nets) for food handling, manufacturing, healthcare, and other safety-critical workspaces where facial-hair containment is required.",
    useCaseLine: "PPE compliance for facial-hair containment in safety-critical operations.",
    description:
      "Beard covers — also called beard nets or beard guards — contain facial hair during food preparation, manufacturing operations, and healthcare procedures where contamination control matters. DryGelWorld supplies non-woven polypropylene beard covers in standard production sizes, packed by the carton.",
    heroImage: "/products/beard-covers.jpg",
    useCases: [
      "Food processing and bakery handling",
      "Manufacturing and assembly safety programs",
      "Healthcare, pharma, and laboratory hygiene",
      "Foodservice and catering compliance",
    ],
    packingOptions: [
      "Material: non-woven polypropylene with elasticated edge",
      "Carton packs: typical 100 or 1000 pieces per carton",
      // TODO: confirm real certifications. Same caveat as hair nets — do not
      // advertise certs not formally held.
      "Document support: discuss compliance per buyer market",
    ],
    leadTime: "Quoted by carton volume and dispatch schedule",
    priceBand: "B2B reference rates available on request",
    featuredSizes: ["Standard", "Custom"],
  },
  {
    slug: "dry-clay-desiccant",
    name: "Industrial Dry Clay Desiccant",
    shortName: "Dry Clay",
    eyebrow: "Industrial Clay",
    summary:
      "Activated clay desiccant packs for industrial packaging, durable-goods storage, and cost-sensitive moisture-control programs.",
    useCaseLine: "Cost-effective humidity control for less precision-critical industrial cargo.",
    description:
      "Dry clay desiccant uses activated bentonite or montmorillonite to adsorb humidity in industrial packaging, durable goods, and storage applications. Often supplied alongside silica gel programs for buyers who want a tiered moisture-protection portfolio across their export cartons — clay for cost-sensitive bulk packaging, silica gel for precision and pharma-style packs.",
    heroImage: "/products/dry-clay-desiccant.jpg",
    useCases: [
      "Durable industrial goods packaging",
      "Heavy-machinery and parts storage",
      "Bulk export cartons for cost-sensitive cargo",
      "Tiered moisture programs alongside silica gel",
    ],
    packingOptions: [
      "Material: activated bentonite or montmorillonite clay",
      "Format: sachets, bags, or industrial cartons by requirement",
      "Document support: ISO 9001:2015, SDS, COA, DMF-free statement on request",
    ],
    leadTime: "Quoted by format, volume, and dispatch schedule",
    priceBand: "Cost-sensitive industrial reference rates available",
    featuredSizes: ["1 g", "5 g", "10 g", "25 g", "50 g", "Custom"],
  },
];

export const priceGroups: PriceGroup[] = [
  {
    title: "Small Sizes",
    note: "Compact retail and light packing",
    items: [
      { label: "0.5 gm", unitPrice: 0.65, grams: 0.5 },
      { label: "1 gm", unitPrice: 0.85, grams: 1 },
      { label: "1 gm XL", unitPrice: 1.0, grams: 1 },
      { label: "2 gm", unitPrice: 1.45, grams: 2 },
      { label: "3 gm", unitPrice: 1.9, grams: 3 },
      { label: "4 gm", unitPrice: 2.7, grams: 4 },
      { label: "5 gm", unitPrice: 3.25, grams: 5 },
    ],
  },
  {
    title: "Paper Sachet",
    note: "Popular sachet range",
    items: [
      { label: "1 gm", unitPrice: 0.95, grams: 1 },
      { label: "2 gm", unitPrice: 1.75, grams: 2 },
      { label: "3 gm", unitPrice: 2.2, grams: 3 },
      { label: "10 gm", unitPrice: 7, grams: 10 },
      { label: "15 gm", unitPrice: 13, grams: 15 },
      { label: "20 gm", unitPrice: 18, grams: 20 },
    ],
  },
  {
    title: "Bulk & Strip",
    note: "Industrial and shipment formats",
    items: [
      { label: "25 grams", unitPrice: 20, grams: 25 },
      { label: "50 grams", unitPrice: 40, grams: 50 },
      { label: "100 grams", unitPrice: 100, grams: 100 },
      { label: "200 grams", unitPrice: 200, grams: 200 },
      { label: "250 grams", unitPrice: 250, grams: 250 },
      { label: "500 grams", unitPrice: 500, grams: 500 },
      { label: "1 kg strip", unitPrice: 950, grams: 1000 },
    ],
  },
];

export const priceOptions = priceGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    key: `${group.title}-${item.label}`,
    groupTitle: group.title,
    groupNote: group.note,
  })),
);

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}
