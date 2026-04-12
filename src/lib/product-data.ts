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

export const whatsappNumber = "923330223337";
export const displayPhone = "03330223337";

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
    heroImage:
      "https://images.pexels.com/photos/4464916/pexels-photo-4464916.jpeg?cs=srgb&dl=pexels-karola-g-4464916.jpg&fm=jpg",
    useCases: [
      "Aerospace and semiconductor shielding",
      "High-end footwear and luxury leather",
      "Precision medical instrumentation",
      "Retail-ready electronic sub-assemblies",
    ],
    packingOptions: [
      "Ultra-breathable non-woven formats",
      "Custom branded technical inserts",
      "Automated packaging line compatibility",
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
    heroImage:
      "https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg?cs=srgb&dl=pexels-web-buz-29454379.jpg&fm=jpg",
    useCases: [
      "Standard export carton stabilization",
      "Industrial spare parts inventory",
      "Bulk commodity moisture shielding",
      "Distributor and reseller supply chains",
    ],
    packingOptions: [
      "High-burst strength paper formats",
      "Scale-optimized industrial packing",
      "Multi-gram mixed specification orders",
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
    heroImage:
      "https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg?cs=srgb&dl=pexels-web-buz-29454379.jpg&fm=jpg",
    useCases: [
      "Facility-wide moisture management",
      "Continuous industrial assembly lines",
      "Regional distribution and hub inventory",
      "Large-bore machinery and infrastructure parts",
    ],
    packingOptions: [
      "25g to 500g high-capacity units",
      "Custom industrial volume configuration",
      "Direct factory management procurement",
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
    heroImage:
      "https://images.pexels.com/photos/34106182/pexels-photo-34106182.jpeg?cs=srgb&dl=pexels-aden-deutsch-2529743-34106182.jpg&fm=jpg",
    useCases: [
      "International ocean freight containers",
      "Extreme-humidity logistics routes",
      "Long-haul intermodal cargo transport",
      "High-value export consignment stabilization",
    ],
    packingOptions: [
      "1 kg high-capacity maritime formats",
      "Integrated logistics supply programs",
      "Custom cargo-load moisture auditing",
    ],
    leadTime: "Aligned with international shipping windows",
    priceBand: "Global logistics procurement reference: Rs. 950 per unit",
    featuredSizes: ["1 kg maritime strip"],
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
