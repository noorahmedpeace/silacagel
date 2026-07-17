import { seoImages } from "@/lib/seo-images";

export type ProductItem = {
  slug: string;
  name: string;
  shortName: string;
  // Optional keyword-rich meta <title> override. Falls back to
  // `${shortName} | DryGelWorld` when unset.
  metaTitle?: string;
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
  colorOptions?: string[];
  sizeOptions?: string[];
  categoryPath?: string[];
  attributes?: Record<string, string>;
  /** Fill the hero frame edge-to-edge with a wide photo (cover) instead of the
      default padded, contained product render. For real lifestyle photography. */
  heroLandscape?: boolean;
  galleryImages?: {
    src: string;
    alt: string;
    label: string;
  }[];
  imageConceptPrompts?: {
    label: string;
    prompt: string;
  }[];
};

export type PriceItem = {
  label: string;
  /** Domestic Pakistan reference price, in PKR per piece. */
  unitPrice: number;
  /**
   * Fixed export reference price, in USD per piece. De-linked from PKR so
   * rupee depreciation does not silently discount international quotes.
   */
  exportUsd: number;
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
export const mainEmail = process.env.NEXT_PUBLIC_MAIN_EMAIL?.trim() || "noorahmedkhan@drygelworld.com";
export const infoEmail = process.env.NEXT_PUBLIC_INFO_EMAIL?.trim() || "info@drygelworld.com";
export const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL?.trim() || "sales@drygelworld.com";
export const exportEmail = process.env.NEXT_PUBLIC_EXPORT_EMAIL?.trim() || "export@drygelworld.com";
export const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@drygelworld.com";
export const companyCity = process.env.NEXT_PUBLIC_COMPANY_CITY?.trim() || "Karachi";
export const companyCountry = process.env.NEXT_PUBLIC_COMPANY_COUNTRY?.trim() || "Pakistan";
export const serviceArea = process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || "Worldwide";

// ── Physical location / NAP - single source of truth ────────────────────────
// PRIMARY NAP = the public HEAD OFFICE in Gulshan-e-Iqbal. This is the address
// VERIFIED on the Google Business Profile (with reviews + interactions), so
// schema, contact, footer, about, media-kit, every directory citation AND the
// GBP must all show THIS, identically. Do not let it drift - NAP consistency is
// the local-ranking signal. The manufacturing factory in North Karachi is a
// separate, clearly-labeled secondary location (factoryAddressFull below);
// never substitute it for the primary NAP in citations.
export const companyStreet = "A-488, Block 1, Gulshan-e-Iqbal";
export const companyAddressLocality = "Karachi";
export const companyAddressRegion = "Sindh";
export const companyPostalCode = "74000";
export const companyAddressFull = `${companyStreet}, ${companyAddressLocality}, ${companyAddressRegion} ${companyPostalCode}, ${companyCountry}`;
// = "A-488, Block 1, Gulshan-e-Iqbal, Karachi, Sindh 74000, Pakistan"
// Approximate coordinates for Gulshan-e-Iqbal Block 1. REPLACE with the EXACT
// lat/long from the verified Google Business Profile pin (open the GBP location
// on Google Maps → right-click the pin → the top row is the coordinates) so the
// LocalBusiness geo matches the GBP exactly.
export const companyGeo = { latitude: 24.9215, longitude: 67.095 };
export const googleMapsUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyAddressFull)}`;
export const mapEmbedUrl =
  `https://www.google.com/maps?q=${encodeURIComponent(companyAddressFull)}&output=embed`;
export const openingHoursDisplay = "Mon-Sat, 8:00 AM - 5:00 PM (PKT)";
export const openingHoursDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const openingHoursOpen = "08:00";
export const openingHoursClose = "17:00";
// Secondary, clearly-labeled MANUFACTURING FACTORY (NOT the GBP/primary NAP).
export const factoryAddressFull =
  "1 St. 13, North Karachi Industrial Area Sector 6B, New Karachi Town, Karachi, Sindh 75950, Pakistan";
export const factoryMapEmbedUrl =
  `https://www.google.com/maps?q=${encodeURIComponent(factoryAddressFull)}&output=embed`;

export type ContactDepartment = "general" | "sales" | "export" | "support";

export const contactEmailChannels: Array<{
  id: ContactDepartment;
  label: string;
  shortLabel: string;
  email: string;
  purpose: string;
  schemaContactType: string;
  defaultSubject: string;
}> = [
  {
    id: "general",
    label: "General Contact",
    shortLabel: "General",
    email: infoEmail,
    purpose: "Company questions, introductions, and non-urgent requests.",
    schemaContactType: "customer service",
    defaultSubject: "DryGelWorld general inquiry",
  },
  {
    id: "sales",
    label: "Sales Inquiries / Quotations",
    shortLabel: "Sales",
    email: salesEmail,
    purpose: "MOQ, prices, product selection, samples, and repeat orders.",
    schemaContactType: "sales",
    defaultSubject: "DryGelWorld quotation request",
  },
  {
    id: "export",
    label: "Export / International Buyers",
    shortLabel: "Export",
    email: exportEmail,
    purpose: "FOB / CIF / EXW quotes, destinations, documents, and logistics.",
    schemaContactType: "export sales",
    defaultSubject: "DryGelWorld export inquiry",
  },
  {
    id: "support",
    label: "Customer Support / Issues",
    shortLabel: "Support",
    email: supportEmail,
    purpose: "Order follow-up, quality concerns, document updates, and claims.",
    schemaContactType: "customer support",
    defaultSubject: "DryGelWorld customer support request",
  },
];

export function getContactEmailChannel(department?: ContactDepartment | string) {
  return contactEmailChannels.find((channel) => channel.id === department) ?? contactEmailChannels[1];
}

export function createMailtoHref(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

export const productCatalog: ProductItem[] = [
  {
    slug: "retail-sachets",
    name: "Precision Grade Silica Gel",
    shortName: "Precision Units",
    metaTitle: "Silica Gel Sachets | Retail & Unit-Pack Desiccant",
    eyebrow: "Unit-Level Protection",
    summary:
      "Engineered for sub-package moisture control in electronics, precision engineering, and elite consumer goods.",
    useCaseLine: "Optimal for high-precision components and unit-level packaging.",
    description:
      "Our precision-grade units are designed for integration directly within technical packaging. They are critical for high-end electronics, precision apertures, and luxury leather exports where unit-level integrity is non-negotiable.",
    heroImage: seoImages.silicaGelSachets.src,
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
    metaTitle: "Paper Silica Gel Sachets | Breathable B2B Packs",
    eyebrow: "Scale Applications",
    summary:
      "High-efficiency adsorption packs for general industrial cartons and volume inventory management.",
    useCaseLine: "Standard protection for industrial warehousing and scale logistics.",
    description:
      "Technical Bond sachets provide a high-performance balance for general industrial cargo. These are the workhorse of global trade, protecting everything from heavy machinery parts to large-scale textile shipments.",
    heroImage: seoImages.silicaGelSachets.src,
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
    metaTitle: "Bulk Silica Gel Beads | Drums, Sacks & Jumbo Bags",
    eyebrow: "Infrastructure Scale",
    summary:
      "High-capacity desiccant formats for warehouse stabilization, industrial lines, and regional distribution hub supply.",
    useCaseLine: "Heavy-duty coverage for expansive industrial and logistics environments.",
    description:
      "Our enterprise bulk range is designed for facility-scale moisture control programs. These high-capacity units are essential for maintaining dry-state integrity in large-scale warehouses and heavy industrial manufacturing zones.",
    heroImage: seoImages.industrialBulk.src,
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
    name: "CargoDry Container Strips",
    shortName: "CargoDry Strips",
    metaTitle: "CargoDry Container Strips | 1-5 kg Hanging Cargo Desiccant",
    eyebrow: "CargoDry System",
    summary:
      "High-adsorption maritime hanging strips for international container loads, long-haul shipping, and extreme humidity transit.",
    useCaseLine: "Ultimate protection for maritime export and international logistics.",
    description:
      "CargoDry Container Strips are the hanging-strip format of our CargoDry container desiccant system, engineered for the extreme humidity shifts of maritime transit. They hang inside the container and protect high-value export loads over long-haul oceanic routes — pair them with CargoDry Bulk Bags when a cargo needs both hanging and floor-level moisture control.",
    heroImage: seoImages.containerDesiccant.src,
    useCases: [
      "International ocean freight containers",
      "Extreme-humidity logistics routes",
      "Long-haul intermodal cargo transport",
      "High-value export consignment stabilization",
    ],
    packingOptions: [
      "Sizes: 1 kg, 2 kg, 3 kg & 5 kg multi-chamber cargo strips",
      "Seal: Double-welded high-integrity seams",
      "Transit: 60+ Day Adsorption Protection",
    ],
    leadTime: "Aligned with international shipping windows",
    priceBand: "Quoted by route, container volume, and dispatch schedule",
    featuredSizes: ["1 kg strip", "2 kg strip", "3 kg strip", "5 kg strip"],
  },
  {
    slug: "calcium-chloride-container-strip",
    name: "CargoDry Calcium Chloride Container Strip",
    shortName: "CargoDry CaCl₂ Strip",
    metaTitle: "Calcium Chloride Container Strip | CargoDry High-Capacity Cargo Desiccant",
    eyebrow: "CargoDry System",
    summary:
      "High-capacity calcium chloride hanging strips for sea-freight containers, humid routes, and container-rain risk.",
    useCaseLine: "High-uptake hanging strip format for long ocean freight and humid container lanes.",
    description:
      "The high-uptake calcium chloride option in the CargoDry container desiccant system. These deliquescent cargo strips are built for high-humidity sea freight: the strip hangs inside the container and converts absorbed moisture into contained brine/gel inside the pouch, making pouch integrity and correct installation important for cargo safety. Choose the calcium chloride strip when the moisture load is heavy; choose CargoDry Container Strips (silica gel) for cleaner, dust-free cargo.",
    heroImage: "/products/calcium-chloride-container-strip.webp",
    useCases: [
      "Long-haul ocean freight containers",
      "Humid export routes with container-rain risk",
      "Textiles, furniture, wood, paper, and general cargo",
      "High-moisture-load 20ft and 40ft container programs",
    ],
    packingOptions: [
      "Material: calcium chloride moisture absorber in leak-resistant hanging strip format",
      "Format: multi-chamber strip with hanging tabs / hooks",
      "Application: hang inside shipping container walls before doors are sealed",
      "Document support: SDS and COA on request; certifications confirmed by supplied lot",
    ],
    leadTime: "Quoted by strip weight, route, container size, and dispatch schedule",
    priceBand: "Quote-only cargo item. Pricing depends on strip weight, container plan, destination, and order volume.",
    featuredSizes: ["1 kg strip", "2 kg strip", "3 kg strip", "5 kg strip", "Custom"],
    categoryPath: ["Calcium Chloride", "Container Desiccant", "Hanging Strip"],
    attributes: {
      "Product Type": "Calcium Chloride Container Desiccant Strip",
      Material: "Calcium chloride moisture absorber",
      Format: "Hanging strip / multi-chamber pouch",
      Application: "Shipping container moisture control",
      "Typical Sizes": "1 kg, 2 kg, 3 kg, 5 kg, custom",
      "Use Environment": "Closed sea-freight containers",
      "Document Support": "SDS and COA on request",
    },
  },
  {
    slug: "calcium-chloride-container-bulk",
    name: "CargoDry Calcium Chloride Bulk Bags",
    shortName: "CargoDry CaCl₂ Bags",
    metaTitle: "Calcium Chloride Bulk Desiccant Bags | CargoDry Container Moisture Absorber",
    eyebrow: "CargoDry System",
    summary:
      "Bulk calcium chloride desiccant bags for container cargo, storage, pallets, and high-humidity export shipments.",
    useCaseLine: "Bulk bag format for cargo-level moisture absorption in containers and storage zones.",
    description:
      "The floor- and pallet-level format of the CargoDry container desiccant system. These bulk calcium chloride bags give high moisture uptake in container cargo, warehouse staging, and palletized export loads. They are quote-only because bag size, pouch construction, carton packing, destination, and documentation vary by shipment — use them alongside CargoDry hanging strips for full-container coverage.",
    heroImage: "/products/calcium-chloride-container-bulk.webp",
    useCases: [
      "Container cargo moisture absorption",
      "Pallet and warehouse humidity control",
      "Furniture, textiles, wood, paper, and general cargo",
      "High-humidity export lanes and seasonal shipments",
    ],
    packingOptions: [
      "Material: calcium chloride moisture absorber",
      "Format: non-woven / pouch bag format by requirement",
      "Packaging: export cartons or pallet quantities by order",
      "Document support: SDS and COA on request; certifications confirmed by supplied lot",
    ],
    leadTime: "Quoted by bag size, carton volume, route, and dispatch schedule",
    priceBand: "Quote-only B2B item. Pricing depends on bag weight, carton packing, destination, and volume.",
    featuredSizes: ["500 g bag", "1 kg bag", "2 kg bag", "Custom"],
    categoryPath: ["Calcium Chloride", "Container Desiccant", "Bulk Bags"],
    attributes: {
      "Product Type": "Calcium Chloride Bulk Desiccant Bag",
      Material: "Calcium chloride moisture absorber",
      Format: "Bulk bag / pouch",
      Application: "Container cargo and warehouse moisture control",
      "Typical Sizes": "500 g, 1 kg, 2 kg, custom",
      "Use Environment": "Containers, pallets, warehouse staging",
      "Document Support": "SDS and COA on request",
    },
  },
  {
    slug: "powder-free-blue-nitrile-gloves",
    name: "Powder-Free Nitrile Examination Gloves",
    shortName: "Powder-Free Nitrile Gloves",
    metaTitle: "Powder-Free Nitrile Examination Gloves | DryGelWorld",
    eyebrow: "Nitrile Gloves",
    summary:
      "Powder-free nitrile examination gloves in blue and black for medical, laboratory, food-handling, and industrial hand protection.",
    useCaseLine: "Medical and industrial grade hand protection for hygiene-critical workflows.",
    description:
      "Powder-free nitrile examination gloves provide latex-free hand protection for buyers who need a clean, durable glove for medical examination, laboratory handling, food processing, cleaning, and factory use. The nitrile material supports better puncture resistance than vinyl, textured fingertips improve grip, and the beaded cuff supports fast donning on high-volume lines.",
    heroImage: "/products/powder-free-nitrile-examination-gloves.webp",
    useCases: [
      "Medical examination and clinic use",
      "Laboratory sampling and inspection work",
      "Food processing and hygiene-control zones",
      "Industrial assembly, cleaning, and maintenance",
    ],
    packingOptions: [
      "Material: nitrile synthetic rubber, latex-free, powder-free",
      "Available colors: blue and black",
      "Surface: textured fingertips for improved wet/dry grip",
      "Cuff: beaded cuff, standard examination length",
      "Packaging: 100 gloves per box; export cartons quoted by volume",
      "Compliance: ISO support; CE/FDA or EN 455 documentation only if confirmed for the selected lot",
    ],
    leadTime: "Quoted by size mix, carton volume, and dispatch schedule",
    priceBand: "Quote-only B2B PPE item. Pricing depends on grade, certifications, size mix, and carton volume.",
    featuredSizes: ["XS", "Small", "Medium", "Large", "X-Large"],
    colorOptions: ["Blue", "Black"],
    sizeOptions: ["XS", "Small", "Medium", "Large", "X-Large"],
    categoryPath: ["Disposable Gloves", "Nitrile Gloves", "Powder-Free"],
    attributes: {
      "Product Type": "Examination / Industrial Gloves",
      Material: "Nitrile",
      "Powder Type": "Powder-Free",
      Color: "Blue, Black",
      Sterility: "Non-Sterile",
      Grade: "Medical & Industrial Grade",
      Surface: "Textured Fingertips",
      Cuff: "Beaded Cuff, Standard Length",
      "Sizes Available": "XS, Small, Medium, Large, X-Large",
      Packaging: "100 gloves per box",
    },
  },
  {
    slug: "powdered-nitrile-examination-gloves",
    name: "Powdered Nitrile Examination Gloves",
    shortName: "Powdered Nitrile Gloves",
    metaTitle: "Powdered Nitrile Examination Gloves | DryGelWorld",
    eyebrow: "Nitrile Gloves",
    summary:
      "Powdered nitrile examination gloves in blue and black for medical, laboratory, food-handling, and industrial hand protection.",
    useCaseLine: "Medical and industrial grade hand protection for fast donning workflows.",
    description:
      "Powdered nitrile examination gloves are designed for buyers who need latex-free disposable hand protection with easier donning in busy medical, laboratory, food handling, cleaning, and light industrial environments. Textured fingertips improve grip, the beaded cuff supports secure wear, and carton-based supply keeps recurring PPE programs easy to quote.",
    heroImage: "/products/powdered-nitrile-examination-gloves.webp",
    useCases: [
      "Medical examination and clinic use where powdered gloves are accepted",
      "Laboratory sampling and inspection work",
      "Food handling, cleaning, and hygiene-controlled workflows",
      "Industrial assembly, maintenance, and general PPE programs",
    ],
    packingOptions: [
      "Material: nitrile synthetic rubber, latex-free, powdered",
      "Available colors: blue and black",
      "Surface: textured fingertips for improved wet/dry grip",
      "Cuff: beaded cuff, standard examination length",
      "Packaging: 100 gloves per box; export cartons quoted by volume",
      "Compliance: ISO support; CE/FDA or EN 455 documentation only if confirmed for the selected lot",
    ],
    leadTime: "Quoted by size mix, carton volume, and dispatch schedule",
    priceBand: "Quote-only B2B PPE item. Pricing depends on grade, certifications, size mix, and carton volume.",
    featuredSizes: ["XS", "Small", "Medium", "Large", "X-Large"],
    colorOptions: ["Blue", "Black"],
    sizeOptions: ["XS", "Small", "Medium", "Large", "X-Large"],
    categoryPath: ["Disposable Gloves", "Nitrile Gloves", "Powdered"],
    attributes: {
      "Product Type": "Examination / Industrial Gloves",
      Material: "Nitrile",
      "Powder Type": "Powdered",
      Color: "Blue, Black",
      Sterility: "Non-Sterile",
      Grade: "Medical & Industrial Grade",
      Surface: "Textured Fingertips",
      Cuff: "Beaded Cuff, Standard Length",
      "Sizes Available": "XS, Small, Medium, Large, X-Large",
      Packaging: "100 gloves per box",
    },
  },
  {
    slug: "hair-nets",
    name: "Bouffant Hair Nets for Safety and PPE",
    shortName: "Hair Nets",
    metaTitle: "Bouffant Hair Nets | Food & Factory PPE Supplier",
    eyebrow: "Industrial Safety PPE",
    summary:
      "Disposable bouffant hair nets in green and white for food processing, manufacturing, healthcare, and industrial PPE programs.",
    useCaseLine: "Standard hair-containment PPE for safety-critical workspaces.",
    description:
      "Bouffant hair nets keep loose hair contained during food handling, manufacturing, healthcare, and cleanroom operations. DryGelWorld supplies non-woven polypropylene bouffant nets in 18, 20, 21, and 22 inch diameters, with green for designated zones and white for general use.",
    heroImage: "/products/simple-bouffant-hair-nets.webp",
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
    priceBand: "Export reference from ~USD 0.055 / piece (B2B) · tiered by carton volume",
    featuredSizes: ["18 inch", "20 inch", "21 inch", "22 inch"],
  },
  {
    slug: "beard-covers",
    name: "Disposable Beard Covers for Safety and PPE",
    shortName: "Beard Covers",
    metaTitle: "Disposable Beard Covers | Food-Industry PPE",
    eyebrow: "Industrial Safety PPE",
    summary:
      "Disposable beard covers (beard nets) for food handling, manufacturing, healthcare, and other safety-critical workspaces where facial-hair containment is required.",
    useCaseLine: "PPE compliance for facial-hair containment in safety-critical operations.",
    description:
      "Beard covers, also called beard nets or beard guards, contain facial hair during food preparation, manufacturing operations, and healthcare procedures where contamination control matters. DryGelWorld supplies non-woven polypropylene beard covers in standard production sizes, packed by the carton.",
    heroImage: "/products/simple-disposable-beard-covers.webp",
    useCases: [
      "Food processing and bakery handling",
      "Manufacturing and assembly safety programs",
      "Healthcare, pharma, and laboratory hygiene",
      "Foodservice and catering compliance",
    ],
    packingOptions: [
      "Material: non-woven polypropylene with elasticated edge",
      "Carton packs: typical 100 or 1000 pieces per carton",
      // TODO: confirm real certifications. Same caveat as hair nets - do not
      // advertise certs not formally held.
      "Document support: discuss compliance per buyer market",
    ],
    leadTime: "Quoted by carton volume and dispatch schedule",
    priceBand: "Export reference from ~USD 0.04 / piece (B2B) · tiered by carton volume",
    featuredSizes: ["Standard", "Custom"],
  },
  {
    slug: "dry-clay-desiccant",
    name: "Industrial Dry Clay Desiccant",
    shortName: "Dry Clay",
    metaTitle: "Dry Clay Desiccant | Industrial Clay Moisture Absorber",
    eyebrow: "Industrial Clay",
    summary:
      "Activated clay desiccant packs for industrial packaging, durable-goods storage, and cost-sensitive moisture control programs.",
    useCaseLine: "Cost-effective humidity control for less precision-critical industrial cargo.",
    description:
      "Dry clay desiccant uses activated bentonite or montmorillonite to adsorb humidity in industrial packaging, durable goods, and storage applications. It is often supplied alongside silica gel for buyers who need a tiered moisture-protection portfolio across export cartons: clay for cost-sensitive bulk packaging and silica gel for precision or pharma-style packs.",
    heroImage: "/products/industrial-dry-clay-desiccant-packs.webp",
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
    priceBand: "Export reference from ~USD 2.00 / kg packed · tiered by format & volume",
    featuredSizes: ["1 g", "5 g", "10 g", "25 g", "50 g", "Custom"],
  },
  {
    slug: "humidity-indicator-cards",
    name: "Humidity Indicator Cards (HIC)",
    shortName: "Humidity Indicator Cards",
    metaTitle: "Humidity Indicator Cards (HIC) Supplier | MSD Packaging",
    eyebrow: "Humidity Indicator",
    summary:
      "Reversible humidity indicator cards that change colour at set relative-humidity thresholds, for moisture-sensitive electronics, dry-pack, and export QC. Sourced and private-labelled to your specification.",
    useCaseLine: "A visual moisture check that pairs with desiccant inside sealed moisture-barrier packaging.",
    description:
      "Humidity indicator cards are the visual half of a dry pack: the desiccant controls the moisture, the card reports it. A QC operator reads a sealed pack's moisture state from the colour-changing spots without opening it. DryGelWorld sources and private-labels these cards to your specification, in cobalt or cobalt-free (REACH-friendly) chemistry and any spot layout, with compliance confirmed per supplied lot.",
    heroImage: "/products/humidity-indicator-cards-photo.webp",
    heroLandscape: true,
    useCases: [
      "Moisture-sensitive electronics and PCB dry-pack (with desiccant + barrier bag)",
      "Incoming and outgoing QC checks without opening the sealed pack",
      "Export cartons where a visual humidity record supports damage claims",
      "Pharma, optics, and precision goods needing a documented dry state",
    ],
    packingOptions: [
      "Format: reversible spot card; common layouts are single-spot and 3-, 4-, or 6-spot",
      "Thresholds: typical spot points 5, 10, 20, 30, 40, 50, 60% RH, configured to your spec",
      "Chemistry: cobalt-dichloride (blue-to-pink) or cobalt-free (REACH-friendly) on request",
      "Packing: sealed moisture-barrier can or foil bag; count per pack quoted by volume",
      "Standards: MIL-STD-3464 / JEDEC J-STD-033-style cards available if specified; test reports and compliance confirmed against the supplied lot, not held by DryGelWorld",
      "Pairs with: silica gel or clay desiccant and moisture-barrier (MBB) bags for a full dry pack",
    ],
    leadTime: "Quoted by spot layout, chemistry, pack count, and dispatch schedule",
    priceBand: "Quote-only sourced item. Pricing depends on spot layout, chemistry, pack count, and any standard/compliance requirement.",
    featuredSizes: ["Single-spot", "3-spot", "4-spot", "6-spot", "Custom layout"],
    colorOptions: ["Cobalt (blue-to-pink)", "Cobalt-free (REACH-friendly)"],
    sizeOptions: ["Single-spot", "3-spot", "4-spot", "6-spot", "Custom layout"],
    categoryPath: ["Moisture Control", "Humidity Indicator", "MSD Dry Pack"],
    attributes: {
      "Product Type": "Humidity Indicator Card (reversible)",
      "Reads": "Relative humidity inside a sealed pack",
      "Spot Layouts": "Single-spot, 3-spot, 4-spot, 6-spot, custom",
      "Threshold Points": "5–60% RH, configured to spec",
      Chemistry: "Cobalt-dichloride or cobalt-free (REACH-friendly)",
      Reversible: "Yes, colour returns as humidity falls",
      Packaging: "Sealed moisture-barrier can or foil bag",
      Sourcing: "Sourced / private-label; not manufactured by DryGelWorld",
      Standards: "MIL-STD-3464 / JEDEC J-STD-033-style available if specified; confirmed per lot",
      "Pairs With": "Desiccant + moisture-barrier bag",
    },
    galleryImages: [
      {
        src: "/products/humidity-indicator-cards-2.webp",
        alt: "Humidity indicator cards fanned beside foil moisture-barrier bags and loose silica gel beads",
        label: "Cards ship alongside desiccant and moisture-barrier bags for a complete dry pack",
      },
    ],
  },
];

// Pricing basis (reviewed 2026-05): domestic = PKR per piece (kept at market
// for Pakistan), export = fixed USD per piece set against India/China/UAE B2B
// ranges so the brand reads premium internationally without rupee erosion.
export const priceGroups: PriceGroup[] = [
  {
    title: "Small Sizes",
    note: "Compact retail and light packing",
    items: [
      { label: "0.5 gm", unitPrice: 0.75, exportUsd: 0.0035, grams: 0.5 },
      { label: "1 gm", unitPrice: 1.0, exportUsd: 0.0045, grams: 1 },
      { label: "1 gm XL", unitPrice: 1.15, exportUsd: 0.0052, grams: 1 },
      { label: "2 gm", unitPrice: 1.65, exportUsd: 0.0072, grams: 2 },
      { label: "3 gm", unitPrice: 1.9, exportUsd: 0.009, grams: 3 },
      { label: "4 gm", unitPrice: 2.7, exportUsd: 0.011, grams: 4 },
      { label: "5 gm", unitPrice: 3.25, exportUsd: 0.014, grams: 5 },
    ],
  },
  {
    title: "Paper Sachet",
    note: "Popular sachet range",
    items: [
      { label: "1 gm", unitPrice: 1.1, exportUsd: 0.0045, grams: 1 },
      { label: "2 gm", unitPrice: 1.95, exportUsd: 0.0072, grams: 2 },
      { label: "3 gm", unitPrice: 2.2, exportUsd: 0.0095, grams: 3 },
      { label: "10 gm", unitPrice: 7, exportUsd: 0.029, grams: 10 },
      { label: "15 gm", unitPrice: 13, exportUsd: 0.052, grams: 15 },
      { label: "20 gm", unitPrice: 18, exportUsd: 0.068, grams: 20 },
    ],
  },
  {
    title: "Bulk & Strip",
    note: "Industrial and shipment formats",
    items: [
      { label: "25 grams", unitPrice: 20, exportUsd: 0.078, grams: 25 },
      { label: "50 grams", unitPrice: 40, exportUsd: 0.155, grams: 50 },
      { label: "100 grams", unitPrice: 100, exportUsd: 0.39, grams: 100 },
      { label: "200 grams", unitPrice: 200, exportUsd: 0.78, grams: 200 },
      { label: "250 grams", unitPrice: 250, exportUsd: 0.95, grams: 250 },
      { label: "500 grams", unitPrice: 500, exportUsd: 1.85, grams: 500 },
      { label: "1 kg strip", unitPrice: 950, exportUsd: 4.2, grams: 1000 },
      { label: "2 kg strip", unitPrice: 1850, exportUsd: 8.1, grams: 2000 },
      { label: "3 kg strip", unitPrice: 2700, exportUsd: 11.9, grams: 3000 },
      { label: "5 kg strip", unitPrice: 4400, exportUsd: 19.4, grams: 5000 },
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
