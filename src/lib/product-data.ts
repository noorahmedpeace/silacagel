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
    name: "Retail Silica Gel Sachets",
    shortName: "Retail Sachets",
    eyebrow: "Consumer Format",
    summary:
      "Compact sachets built for retail packs, cartons, footwear boxes, and product-level moisture protection.",
    useCaseLine: "Best for retail packs, footwear boxes, and compact cartons.",
    description:
      "Retail sachets are ideal when the desiccant needs to sit directly inside compact packaging. They work especially well for shoes, garments, leather products, electronics accessories, and boxed consumer goods.",
    heroImage:
      "https://images.pexels.com/photos/4464916/pexels-photo-4464916.jpeg?cs=srgb&dl=pexels-karola-g-4464916.jpg&fm=jpg",
    useCases: [
      "Footwear boxes and leather goods",
      "Textile and garment packaging",
      "Consumer electronics accessories",
      "Gift boxes and retail cartons",
    ],
    packingOptions: [
      "Paper sachets",
      "Compact printed retail packs",
      "Private-label packing on request",
    ],
    leadTime: "Fast-moving stock for regular supply",
    priceBand: "From Rs. 0.65 to Rs. 18.00",
    featuredSizes: ["0.5 gm", "1 gm", "2 gm", "3 gm", "5 gm", "10 gm", "20 gm"],
  },
  {
    slug: "paper-sachets",
    name: "Paper Sachet Moisture Control Packs",
    shortName: "Paper Sachets",
    eyebrow: "Flexible Packaging",
    summary:
      "A practical packaging format for product inserts, general cartons, and everyday dry-pack applications.",
    useCaseLine: "Everyday packaging inserts for cartons, tools, and dry goods.",
    description:
      "Paper sachets strike a strong balance between cost, usability, and product compatibility. They are suitable for standard cartons, tools, parts, dry-goods packaging, and light industrial moisture control.",
    heroImage:
      "https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg?cs=srgb&dl=pexels-web-buz-29454379.jpg&fm=jpg",
    useCases: [
      "General packaging cartons",
      "Warehouse inventory and spare parts",
      "Dry product inserts",
      "Reseller and distributor stock",
    ],
    packingOptions: [
      "Standard paper sachets",
      "Regular industrial packing",
      "Multiple gram sizes for mixed orders",
    ],
    leadTime: "Flexible for repeat wholesale buying",
    priceBand: "From Rs. 0.95 to Rs. 18.00",
    featuredSizes: ["1 gm", "2 gm", "3 gm", "10 gm", "15 gm", "20 gm"],
  },
  {
    slug: "bulk-industrial",
    name: "Bulk Industrial Silica Gel Supply",
    shortName: "Bulk Industrial",
    eyebrow: "Factory Supply",
    summary:
      "Larger gram sizes for resellers, industrial buyers, warehousing, and moisture control at operational scale.",
    useCaseLine: "Bulk coverage for factory lines, warehouses, and distributors.",
    description:
      "Bulk silica gel formats are best for factory requirements, regular moisture-control programs, inventory safety, and industrial packing where larger product volume needs stronger absorption support.",
    heroImage:
      "https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg?cs=srgb&dl=pexels-web-buz-29454379.jpg&fm=jpg",
    useCases: [
      "Warehouses and dispatch inventory",
      "Industrial packaging lines",
      "Reseller distribution supply",
      "Machine parts and boxed components",
    ],
    packingOptions: [
      "25 grams to 500 grams",
      "Custom volume combinations",
      "Factory-direct bulk ordering",
    ],
    leadTime: "Quoted according to quantity and packing mix",
    priceBand: "From Rs. 20 to Rs. 500",
    featuredSizes: ["25 grams", "50 grams", "100 grams", "200 grams", "250 grams", "500 grams"],
  },
  {
    slug: "container-strips",
    name: "Container Strip Export Protection",
    shortName: "Container Strips",
    eyebrow: "Export Logistics",
    summary:
      "Heavy-duty moisture control for containers, export loads, long-haul cargo, and humid shipment environments.",
    useCaseLine: "High-volume protection for export cargo and container loads.",
    description:
      "Container strips are designed for export and shipping situations where humidity can build up over long transit periods. They help reduce moisture risk in enclosed cargo spaces and logistics environments.",
    heroImage:
      "https://images.pexels.com/photos/34106182/pexels-photo-34106182.jpeg?cs=srgb&dl=pexels-aden-deutsch-2529743-34106182.jpg&fm=jpg",
    useCases: [
      "Container exports",
      "Shipment humidity control",
      "Long-haul cargo movement",
      "International dispatch programs",
    ],
    packingOptions: [
      "1 kg strip format",
      "Bulk export planning",
      "Supply for logistics-heavy buyers",
    ],
    leadTime: "Quoted with shipment planning and order volume",
    priceBand: "1 kg strip at Rs. 950",
    featuredSizes: ["1 kg strip"],
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
