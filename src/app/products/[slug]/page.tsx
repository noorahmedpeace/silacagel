import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { IsoBadge } from "@/components/iso-badge";
import { QuoteForm } from "@/components/quote-form";
import { ProductSpecTable } from "@/components/product-spec-table";
import { ProductCrossSell } from "@/components/product-cross-sell";
import { StickyQuoteBar } from "@/components/sticky-quote-bar";
import { getProductSpec } from "@/lib/product-spec";
import { Reveal } from "@/components/reveal";
import {
  absoluteUrl,
  brandName,
  breadcrumbJsonLd,
  compactMetaDescription,
  siteName,
} from "@/lib/seo";
import {
  displayPhone,
  getProductBySlug,
  phoneHref,
  productCatalog,
  whatsappNumber,
} from "@/lib/product-data";
import styles from "./product.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const procurementDetails = {
  "retail-sachets": {
    moq: "Quoted from carton quantities; recurring 0.5g-10g programs preferred",
    sample: "Sample packs available before bulk confirmation",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "0.5g", material: "Breathable paper / technical fiber", fit: "Pharma bottles, small electronics, precision packs", pack: "Carton-packed by requirement" },
      { size: "1g-3g", material: "Breathable paper sachet", fit: "Unit packaging, accessories, retail cartons", pack: "Bulk cartons / private label discussion" },
      { size: "5g-10g", material: "Low-dust sachet format", fit: "Larger cartons, leather, electronics, tools", pack: "Repeat procurement packs" },
    ],
    packaging: ["Plain sachet", "Warning text review", "Carton labeling", "Private-label discussion"],
    related: [
      { label: "Electronics case study", href: "/case-studies" },
      { label: "USA export page", href: "/export/usa" },
      { label: "Document hub", href: "/documents" },
    ],
  },
  "paper-sachets": {
    moq: "Best quoted by monthly carton volume and recurring dispatch schedule",
    sample: "Request samples by gram size and packaging material",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "1g-3g", material: "Technical bond porous paper", fit: "General cartons, light packaging, stock protection", pack: "Carton quantities" },
      { size: "10g-20g", material: "Porous paper sachet", fit: "Industrial cartons, textiles, warehouse stock", pack: "Bulk cartons / buyer label" },
      { size: "Custom", material: "Paper or non-woven option", fit: "Distributor and OEM packaging", pack: "Private-label program" },
    ],
    packaging: ["Technical bond paper", "Non-woven option", "Bulk carton supply", "Distributor labeling"],
    related: [
      { label: "Leather export case", href: "/case-studies" },
      { label: "UAE export page", href: "/export/uae" },
      { label: "Private label", href: "/private-label" },
    ],
  },
  "bulk-industrial": {
    moq: "Quoted by kg, pallet, or recurring monthly tonnage",
    sample: "Bulk bead and bag samples can be discussed before contract supply",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "25g-100g", material: "Woven / non-woven bead bag", fit: "Carton and warehouse moisture control", pack: "Bulk cartons" },
      { size: "250g-500g", material: "Larger desiccant bag", fit: "Export cartons, storage, industrial packs", pack: "Carton / pallet planning" },
      { size: "25kg loose", material: "Bulk silica gel beads", fit: "Repackers, distributors, industrial users", pack: "Bagged bulk supply" },
    ],
    packaging: ["25kg loose bags", "250g / 500g packs", "Pallet planning", "Recurring distributor supply"],
    related: [
      { label: "FOB Karachi", href: "/export/fob-karachi" },
      { label: "Documents", href: "/documents" },
      { label: "Bulk sales", href: "/bulk-sales" },
    ],
  },
  "container-strips": {
    moq: "Quoted by strip count, container size, route, and dispatch schedule",
    sample: "Route and container details recommended before sample planning",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "1kg", material: "Multi-chamber cargo strip", fit: "Cartons, smaller loads, shorter routes", pack: "Pallet / carton supply" },
      { size: "2kg-3kg", material: "Cargo strip format", fit: "20ft / 40ft planning by route risk", pack: "Shipment-based quote" },
      { size: "5kg", material: "High-capacity strip", fit: "Long-haul sea freight and humid routes", pack: "Container program" },
    ],
    packaging: ["1kg-5kg strips", "Hanging / strip layout", "Pallet quantities", "FOB / CIF route support"],
    related: [
      { label: "Maritime case study", href: "/case-studies" },
      { label: "Saudi export page", href: "/export/saudi-arabia" },
      { label: "Qatar export page", href: "/export/qatar" },
    ],
  },
  "dry-clay-desiccant": {
    moq: "Discuss MOQ by sachet size, monthly volume, and dispatch program",
    sample: "Sample packs available; confirm size and packaging format before bulk planning",
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    skuRows: [
      { size: "1g-5g", material: "Activated clay sachet", fit: "Industrial cartons, durable goods, cost-tier packaging", pack: "Carton quantities" },
      { size: "10g-25g", material: "Activated clay bag", fit: "Industrial parts, storage, larger cargo", pack: "Bulk cartons" },
      { size: "50g+ / custom", material: "Industrial clay desiccant pack", fit: "Heavy machinery, durable goods, oversized cargo", pack: "Custom packaging by requirement" },
    ],
    packaging: ["Sachet format", "Industrial bag", "Bulk cartons", "Custom format on request"],
    related: [
      { label: "Silica gel vs clay comparison", href: "/blog/silica-gel-vs-clay-desiccant" },
      { label: "Bulk silica gel", href: "/bulk-silica-gel-desiccant" },
      { label: "Document hub", href: "/documents" },
    ],
  },
  "hair-nets": {
    moq: "Discuss MOQ by carton size and monthly volume",
    sample: "Sample packs available; confirm size, color, and material on request",
    documents: ["ISO 9001:2015"],
    skuRows: [
      { size: "18\" diameter", material: "Non-woven polypropylene with elasticated edge", fit: "Standard production line PPE", pack: "Cartons of 100 or 1000" },
      { size: "20\"-22\" diameter", material: "Non-woven polypropylene with elasticated edge", fit: "General industrial / food / healthcare PPE", pack: "Cartons of 100 or 1000" },
      { size: "Custom diameter / color", material: "Non-woven polypropylene", fit: "Brand-specific or zone-coded production", pack: "Custom packaging by requirement" },
    ],
    packaging: ["Standard carton 100 ct", "Bulk carton 1000 ct", "Color-coded by zone (white/blue/green/red)", "Private label discussion"],
    related: [
      { label: "Beard covers", href: "/products/beard-covers" },
      { label: "Food industry PPE blog", href: "/blog/why-hair-nets-matter-in-food-export" },
      { label: "Document hub", href: "/documents" },
    ],
  },
  "powder-free-blue-nitrile-gloves": {
    moq: "Quoted by size mix, carton volume, certification requirement, and recurring supply plan",
    sample: "Sample box available on request; confirm size, grade, and document requirement first",
    documents: ["ISO support", "CE / FDA if lot-confirmed", "EN 455 / ASTM D6319 if lot-confirmed", "COA / inspection certificate on request"],
    skuRows: [
      { size: "XS / Small", material: "Blue or black powder-free nitrile", fit: "Clinics, labs, food handling, and small-hand users", pack: "100 gloves per box; export cartons by order" },
      { size: "Medium / Large", material: "Powder-free nitrile with textured fingertips", fit: "General medical, lab, factory, cleaning, and inspection workflows", pack: "100 gloves per box; carton volume quoted" },
      { size: "X-Large", material: "Blue or black powder-free nitrile, beaded cuff", fit: "Industrial users and larger-hand PPE programs", pack: "100 gloves per box; bulk cartons on request" },
    ],
    packaging: ["Blue / black color options", "100 gloves per box", "Ambidextrous single-use gloves", "Carton-packed for B2B supply", "Private-label box/carton discussion"],
    related: [
      { label: "Powdered nitrile gloves", href: "/products/powdered-nitrile-examination-gloves" },
      { label: "Latex gloves (on request)", href: "/contact?product=latex-gloves" },
      { label: "Vinyl gloves (on request)", href: "/contact?product=vinyl-gloves" },
    ],
  },
  "powdered-nitrile-examination-gloves": {
    moq: "Quoted by size mix, carton volume, certification requirement, and recurring supply plan",
    sample: "Sample box available on request; confirm size, grade, powder preference, and document requirement first",
    documents: ["ISO support", "CE / FDA if lot-confirmed", "EN 455 / ASTM D6319 if lot-confirmed", "COA / inspection certificate on request"],
    skuRows: [
      { size: "XS / Small", material: "Blue or black powdered nitrile", fit: "Clinics, labs, cleaning, and small-hand users where powdered gloves are accepted", pack: "100 gloves per box; export cartons by order" },
      { size: "Medium / Large", material: "Powdered nitrile with textured fingertips", fit: "General medical, lab, factory, cleaning, and inspection workflows", pack: "100 gloves per box; carton volume quoted" },
      { size: "X-Large", material: "Blue or black powdered nitrile, beaded cuff", fit: "Industrial users and larger-hand PPE programs", pack: "100 gloves per box; bulk cartons on request" },
    ],
    packaging: ["Blue / black color options", "100 gloves per box", "Ambidextrous single-use gloves", "Carton-packed for B2B supply", "Private-label box/carton discussion"],
    related: [
      { label: "Powder-free nitrile gloves", href: "/products/powder-free-blue-nitrile-gloves" },
      { label: "Latex gloves (on request)", href: "/contact?product=latex-gloves" },
      { label: "Vinyl gloves (on request)", href: "/contact?product=vinyl-gloves" },
    ],
  },
  "beard-covers": {
    moq: "Discuss MOQ by carton size and monthly volume",
    sample: "Sample packs available on request",
    documents: ["ISO 9001:2015"],
    skuRows: [
      { size: "Standard", material: "Non-woven polypropylene with elasticated edge", fit: "Food handling, healthcare, manufacturing", pack: "Cartons of 100 or 1000" },
      { size: "Custom", material: "Non-woven polypropylene", fit: "Brand-specific production", pack: "Custom packaging by requirement" },
    ],
    packaging: ["Standard carton 100 ct", "Bulk carton 1000 ct", "Color options on request", "Private label discussion"],
    related: [
      { label: "Hair nets", href: "/products/hair-nets" },
      { label: "Document hub", href: "/documents" },
    ],
  },
} as const;

// Related-content map for each product slug. Builds entity-based
// internal linking from products → blogs/comparison/industry so the
// topical authority cluster around each product slug is connected
// from both ends (products linking out; blogs linking in via clusters).
type ProductClusterLink = { label: string; href: string };
type ProductCluster = {
  guides: ProductClusterLink[];
  compare?: ProductClusterLink;
  industry?: ProductClusterLink;
};
const productClusters: Record<string, ProductCluster> = {
  "retail-sachets": {
    guides: [
      { label: "How to choose silica gel packet size", href: "/blog/how-to-choose-silica-gel-packet-size" },
      { label: "Desiccant for electronics packaging", href: "/blog/desiccant-for-electronics-packaging" },
      { label: "Private-label silica gel packets guide", href: "/blog/private-label-silica-gel-packets-guide" },
    ],
    compare: { label: "Silica gel vs oxygen absorber", href: "/compare/silica-gel-vs-oxygen-absorber" },
    industry: { label: "Electronics packaging", href: "/industries/electronics-packaging" },
  },
  "paper-sachets": {
    guides: [
      { label: "How to prevent moisture in export cartons", href: "/blog/how-to-prevent-moisture-in-export-cartons" },
      { label: "Silica gel for leather and footwear export", href: "/blog/silica-gel-for-leather-and-footwear-export" },
      { label: "Silica gel SDS and COA requirements", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
    ],
    compare: { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" },
    industry: { label: "Leather and footwear export", href: "/industries/leather-footwear-export" },
  },
  "bulk-industrial": {
    guides: [
      { label: "Silica gel bulk pricing factors", href: "/blog/silica-gel-bulk-pricing-factors-for-exporters" },
      { label: "Bulk silica gel supplier checklist", href: "/blog/bulk-silica-gel-supplier-checklist" },
      { label: "Can you reuse silica gel?", href: "/blog/can-you-reuse-silica-gel" },
    ],
    compare: { label: "Silica gel vs molecular sieve", href: "/compare/silica-gel-vs-molecular-sieve" },
  },
  "container-strips": {
    guides: [
      { label: "Best desiccant for shipping containers", href: "/blog/best-desiccant-for-shipping-containers" },
      { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
      { label: "How exporters protect cargo from humidity", href: "/blog/how-exporters-protect-cargo-from-humidity" },
    ],
    compare: { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" },
    industry: { label: "Container shipping", href: "/industries/container-shipping" },
  },
  "dry-clay-desiccant": {
    guides: [
      { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" },
      { label: "Container desiccant vs silica gel", href: "/blog/container-desiccant-vs-silica-gel" },
      { label: "Industrial packaging protection solutions", href: "/blog/industrial-packaging-protection-solutions" },
    ],
    compare: { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" },
  },
  "powder-free-blue-nitrile-gloves": {
    guides: [
      { label: "PPE products for factories", href: "/blog/ppe-products-for-factories" },
      { label: "Why hair nets matter in food export", href: "/blog/why-hair-nets-matter-in-food-export" },
      { label: "Importance of beard covers in manufacturing", href: "/blog/importance-of-beard-covers-in-manufacturing" },
    ],
    industry: { label: "Food packaging hygiene", href: "/industries/food-packaging" },
  },
  "powdered-nitrile-examination-gloves": {
    guides: [
      { label: "PPE products for factories", href: "/blog/ppe-products-for-factories" },
      { label: "Why hair nets matter in food export", href: "/blog/why-hair-nets-matter-in-food-export" },
      { label: "Importance of beard covers in manufacturing", href: "/blog/importance-of-beard-covers-in-manufacturing" },
    ],
    industry: { label: "Food packaging hygiene", href: "/industries/food-packaging" },
  },
  "hair-nets": {
    guides: [
      { label: "Why hair nets matter in food export", href: "/blog/why-hair-nets-matter-in-food-export" },
      { label: "PPE products for factories", href: "/blog/ppe-products-for-factories" },
    ],
    industry: { label: "Food packaging", href: "/industries/food-packaging" },
  },
  "beard-covers": {
    guides: [
      { label: "Importance of beard covers in manufacturing", href: "/blog/importance-of-beard-covers-in-manufacturing" },
      { label: "PPE products for factories", href: "/blog/ppe-products-for-factories" },
    ],
    industry: { label: "Food packaging", href: "/industries/food-packaging" },
  },
};

// FAQs per product slug. Visible on the page AND emitted as FAQPage
// JSON-LD so Google can render the FAQ rich result on commercial-intent
// queries (e.g. "silica gel sachet MOQ", "container desiccant lead time").
const productFaqs = {
  "retail-sachets": [
    {
      q: "What is the minimum order quantity for retail silica gel sachets?",
      a: "Retail silica gel sachets are quoted in carton quantities - typical recurring buyers start at 50,000 to 100,000 sachets per month across 0.5g, 1g, 2g, and 3g sizes. Smaller pilot orders are reviewed case-by-case for export buyers with a clear ramp plan.",
    },
    {
      q: "Which compliance documents are provided with retail sachets?",
      a: "Each export shipment ships with ISO 9001:2015 manufacturer certification, a Safety Data Sheet (SDS) per shipment, a Certificate of Analysis (COA) where required, and a DMF-free statement on request. FDA, JEDEC, and food-contact certifications are not currently held.",
    },
    {
      q: "Can sachets be printed with our private label?",
      a: "Yes - non-woven and Tyvek-style sachets accept private-label print for distributor branding, multilingual warning text, and SKU codes. Minimum print runs are agreed with the export desk to fit the buyer's monthly volume.",
    },
    {
      q: "How long is the lead time for retail silica gel sachet orders?",
      a: "Standard sizes (0.5g-3g) typically ship in 3-7 days from confirmation. Private-label print runs add 5-10 days for plate set-up and approval. Final dispatch is confirmed at quote stage with the buyer's Incoterm.",
    },
  ],
  "paper-sachets": [
    {
      q: "What sizes of paper silica gel sachets are available?",
      a: "Paper silica gel sachets are produced in 1g, 2g, 3g, 5g, 10g, 20g, and custom sizes up to 100g. The material is technical bond porous paper with a non-woven option for larger formats. Size depends on carton volume and target moisture load.",
    },
    {
      q: "What is the shelf life of a sealed paper silica gel sachet?",
      a: "Sealed paper sachets in their factory outer pouch retain full adsorption capacity for 24-36 months at standard warehouse temperature and humidity. Once removed from the outer pouch, exposure should be limited to a few hours before insertion into the buyer's final packaging.",
    },
    {
      q: "Can paper sachets be regenerated or reused?",
      a: "Silica gel itself is regenerable by heating at 120-150 degrees Celsius, but the breathable paper outer is single-use. In packaging applications, paper sachets are treated as consumables and replaced with each shipment cycle.",
    },
    {
      q: "Do paper sachets meet pharmaceutical packaging requirements?",
      a: "Paper sachets ship with ISO 9001:2015 manufacturer certification, SDS, COA, and a DMF-free statement on request. Buyers requiring FDA Drug Master File, REACH, or specific pharmacopoeia compliance should confirm regional requirements with the export desk before order placement.",
    },
  ],
  "bulk-industrial": [
    {
      q: "What is the typical MOQ for bulk industrial silica gel?",
      a: "Bulk silica gel beads and bulk-bagged desiccant are quoted by metric tonnage. Export-grade buyers typically start at 1-5 metric tons per shipment with recurring monthly tonnage agreements. Drum, paper bag, and jumbo bag packaging are available.",
    },
    {
      q: "How is bulk silica gel packaged for ocean freight?",
      a: "Standard export packaging is 25kg or 50kg paper bags inside cartons, 200kg drums, or 1000kg jumbo bags depending on warehouse handling. All packaging is sealed for ocean freight and labelled per the destination port's customs requirement.",
    },
    {
      q: "Can bulk silica gel be regenerated after use?",
      a: "Yes - industrial silica gel beads are fully regenerable by heating at 120-150 degrees Celsius for 2-4 hours, depending on bead size. Reactivation restores most adsorption capacity, making bulk silica gel suitable for closed-system industrial applications that reuse the desiccant.",
    },
    {
      q: "What pore sizes and bead grades are available in bulk?",
      a: "Bulk silica gel ships in standard Type A (medium pore, 2-5mm beads) for general moisture protection and Type B options for specific industrial uses. Indicating silica gel (orange or blue) is also available for visual saturation tracking. Confirm grade requirement at quote stage.",
    },
  ],
  "container-strips": [
    {
      q: "How many container desiccant strips are needed per shipping container?",
      a: "Typical loading is 6-10 strips per 20-foot container and 10-16 strips per 40-foot container, depending on cargo type and route humidity. Higher-humidity routes (transpacific, equatorial) and moisture-sensitive cargo (leather, electronics, pharma) need the upper end of the range.",
    },
    {
      q: "How are container desiccant strips installed?",
      a: "Strips are hung from the inside corrugations of the container or attached to vertical posts using built-in hooks or adhesive. Installation takes 5-10 minutes per container and should be done immediately before doors are sealed. The strips begin absorbing moisture as soon as they're hung.",
    },
    {
      q: "What is the active absorption capacity of one container strip?",
      a: "A standard 1kg silica gel container strip adsorbs up to roughly one-third of its weight in moisture under typical ocean freight humidity (RH 75-90%). Specific gel formulations and routes affect total uptake - performance data sheets are available at quote stage.",
    },
    {
      q: "Are container strips reusable after a single voyage?",
      a: "Container desiccant strips are designed as single-voyage consumables. Strips reach near-saturation by the end of a 25-35 day ocean voyage and are removed and disposed of with the cargo. Regenerable bulk silica gel is the right product for closed-loop reuse.",
    },
  ],
  "dry-clay-desiccant": [
    {
      q: "What is the difference between dry clay desiccant and silica gel?",
      a: "Dry clay desiccant (montmorillonite/bentonite) is a naturally occurring mineral that adsorbs moisture at a lower cost per kg than silica gel, but has a lower total capacity (around 25% by weight versus silica gel's 30-40%). Clay is preferred for cost-sensitive bulk shipments and applications under 50 degrees Celsius.",
    },
    {
      q: "When should buyers choose clay desiccant over silica gel?",
      a: "Clay desiccant is the right choice for high-volume export cargo, container loadings, and warehouse stock protection where unit cost matters more than peak capacity. Silica gel remains the standard for pharma, electronics, and high-value precision packaging where maximum adsorption per gram is required.",
    },
    {
      q: "Is dry clay desiccant FDA or food-grade certified?",
      a: "DryGelWorld's clay desiccant ships with ISO 9001:2015 manufacturer certification, SDS, and COA. FDA food-contact and pharma-grade certifications are not currently held. Buyers needing those certifications for direct food or pharmaceutical contact should specify the requirement at quote stage.",
    },
    {
      q: "What packaging is available for dry clay desiccant?",
      a: "Clay desiccant is supplied in Tyvek and non-woven sachets from 1g to 500g, plus container strips. Bulk paper-bag and jumbo-bag formats are available for high-volume buyers. Private-label and multi-language printing are supported on the same minimum-run basis as silica gel sachets.",
    },
  ],
  "powder-free-blue-nitrile-gloves": [
    {
      q: "Are these nitrile gloves powder-free and latex-free?",
      a: "Yes. The product is specified as powder-free nitrile and latex-free, with blue and black color options. Buyers should confirm the final material declaration and test documents for the selected lot before regulated use.",
    },
    {
      q: "Are the gloves medical grade?",
      a: "The product is positioned for medical examination and industrial use, but formal CE, FDA, EN 455, ASTM D6319, or AQL documentation must be confirmed against the exact supplied lot before advertising a medical certification claim.",
    },
    {
      q: "What sizes and packaging are available?",
      a: "Standard sizes are XS, Small, Medium, Large, and X-Large. Packaging is typically 100 gloves per box, with export cartons quoted by size mix, destination, and recurring volume.",
    },
    {
      q: "Can DryGelWorld supply related gloves?",
      a: "Powdered nitrile gloves, latex gloves, and vinyl gloves can be discussed as related PPE sourcing requests. Availability, documents, packaging, and MOQ are confirmed at quote stage.",
    },
  ],
  "powdered-nitrile-examination-gloves": [
    {
      q: "Are these nitrile gloves powdered and latex-free?",
      a: "Yes. The product is specified as powdered nitrile and latex-free, with blue and black color options. Buyers should confirm whether powdered gloves are accepted in their target market and workflow before ordering.",
    },
    {
      q: "Are the gloves medical grade?",
      a: "The product is positioned for medical examination and industrial use, but formal CE, FDA, EN 455, ASTM D6319, or AQL documentation must be confirmed against the exact supplied lot before advertising a medical certification claim.",
    },
    {
      q: "What sizes and packaging are available?",
      a: "Standard sizes are XS, Small, Medium, Large, and X-Large. Packaging is typically 100 gloves per box, with export cartons quoted by size mix, destination, and recurring volume.",
    },
    {
      q: "Can DryGelWorld supply powder-free gloves too?",
      a: "Yes. Powder-free nitrile examination gloves are listed separately and can be quoted alongside latex gloves, vinyl gloves, and other PPE sourcing requests.",
    },
  ],
  "hair-nets": [
    {
      q: "What sizes of bouffant hair nets are available?",
      a: "Standard sizes are 18-inch, 20-inch, 21-inch, and 22-inch diameter, with custom diameters available for specific production environments. All sizes use non-woven polypropylene with an elasticated edge designed for full hair containment.",
    },
    {
      q: "What is the minimum order quantity for hair nets?",
      a: "Hair nets are quoted by carton (100 count or 1000 count) with monthly volume agreements for recurring industrial buyers. Standard MOQs start at 50 cartons; private-label and color-coded runs are agreed at quote stage.",
    },
    {
      q: "Are color-coded hair nets available for zone-based hygiene compliance?",
      a: "Yes - white, blue, green, and red hair nets are supplied for zone-based production hygiene (food, pharma, electronics). Custom colors and private-label printing are supported above a minimum run agreed with the export desk.",
    },
    {
      q: "Which industries use bouffant hair nets from DryGelWorld?",
      a: "Hair nets are supplied to food processing, pharmaceutical manufacturing, electronics assembly, healthcare, and general industrial production where personnel hair containment is required. ISO 9001:2015 manufacturer certification applies; FDA food-contact certification is not currently held.",
    },
  ],
  "beard-covers": [
    {
      q: "What size of disposable beard cover does DryGelWorld supply?",
      a: "Standard disposable beard covers fit most production environments, with custom sizing available for specific industries. The material is non-woven polypropylene with an elasticated edge to fully contain facial hair during food, pharma, electronics, or industrial production.",
    },
    {
      q: "How are beard covers packaged for export?",
      a: "Beard covers ship in cartons of 100 or 1000, with bulk monthly carton agreements for recurring industrial buyers. Color options and private-label printing are supported above a minimum run that's agreed at quote stage.",
    },
    {
      q: "Are beard covers required for food production environments?",
      a: "Many food safety standards (BRC, HACCP, regional food production codes) require facial hair containment in production zones. Beard covers meet that requirement in combination with bouffant hair nets. Specific national or buyer-side compliance requirements should be confirmed with the export desk.",
    },
    {
      q: "Can beard covers be supplied in matching colors with hair nets?",
      a: "Yes - beard covers can be supplied in white, blue, green, and red to match hair net zone-coding systems for food, pharma, electronics, and general industrial production. Color matching is agreed at quote stage and shipped together to simplify zone enforcement.",
    },
  ],
} as const;

// Indicative USD price ranges per silica gel product, taken from the SAME
// published export prices already shown on the homepage/buy pages
// (src/lib/product-data.ts priceGroups). Used to emit a valid Product +
// AggregateOffer node so price/availability is citable by Google and AI engines.
// Only products with a real published price appear here; PPE/clay (quote-only)
// are intentionally omitted rather than carrying invented prices.
const productOfferPricing: Record<string, { lowPrice: number; highPrice: number; offerCount: number }> = {
  "retail-sachets": { lowPrice: 0.0035, highPrice: 0.014, offerCount: 7 },
  "paper-sachets": { lowPrice: 0.0045, highPrice: 0.068, offerCount: 6 },
  "bulk-industrial": { lowPrice: 0.078, highPrice: 1.85, offerCount: 6 },
  "container-strips": { lowPrice: 4.2, highPrice: 19.4, offerCount: 4 },
};

export async function generateStaticParams() {
  return productCatalog.map((product) => ({
    slug: product.slug,
  }));
}

function compactProductDescription(product: { summary: string; priceBand: string }) {
  const base = `${product.summary} ${product.priceBand}.`;

  if (base.length <= 155) return base;
  if (product.summary.length <= 155) return product.summary;

  return compactMetaDescription(product.summary, 155);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Dry Gel World",
    };
  }

  const title = product.metaTitle ?? `${product.shortName} | DryGelWorld`;
  const description = compactProductDescription(product);

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.heroImage,
          width: 1600,
          height: 900,
          alt: `${product.name} - ${product.summary}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.heroImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const procurement = procurementDetails[product.slug as keyof typeof procurementDetails];
  const faqs = productFaqs[product.slug as keyof typeof productFaqs] ?? [];
  const cluster = productClusters[product.slug];
  const offerPricing = productOfferPricing[product.slug];
  const productSpec = getProductSpec(product.slug);

  const purchaseMessage = [
    "Hello, I want to purchase Dry Gel World.",
    `Product: ${product.name}`,
    `Sizes: ${product.featuredSizes.join(", ")}`,
    `Reference: ${product.priceBand}`,
  ].join("\n");

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Reveal>
          <header className={styles.topbar}>
            <Link href="/" className={styles.backLink}>
              Back to Homepage
            </Link>
            <a href={`tel:${phoneHref}`} className={styles.phoneLink}>
              {displayPhone}
            </a>
          </header>
        </Reveal>

        <main className={styles.main}>
          <Reveal>
            <section className={styles.hero}>
              <div className={styles.copy}>
                <p className={styles.eyebrow}>{product.eyebrow}</p>
                {product.categoryPath?.length ? (
                  <p className={styles.categoryTrail}>{product.categoryPath.join(" > ")}</p>
                ) : null}
                <h1>{product.name}</h1>
                <p className={styles.summary}>{product.summary}</p>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.heroActions}>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(purchaseMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Request Export Quote
                  </a>
                  <a href="#quote-form" className={styles.secondaryAction}>
                    Send Requirement
                  </a>
                </div>

                <div className={styles.docProof}>
                  <IsoBadge />
                  <Link href="/documentation" className={styles.docProofLink}>
                    <FileText size={15} strokeWidth={2} aria-hidden="true" />
                    SDS · COA · TDS · ISO — open documents
                  </Link>
                </div>

                {(product.colorOptions?.length || product.sizeOptions?.length) ? (
                  <div className={styles.optionGroups} aria-label="Available product options">
                    {product.colorOptions?.length ? (
                      <div className={styles.optionGroup}>
                        <span className={styles.optionLabel}>Available colors</span>
                        <div className={styles.optionChips}>
                          {product.colorOptions.map((color, index) => (
                            <label className={styles.optionChip} key={color}>
                              <input
                                className={styles.optionInput}
                                type="radio"
                                name={`${product.slug}-color`}
                                defaultChecked={index === 0}
                              />
                              <span className={styles.optionChipText}>
                                <span className={styles.colorDot} data-color={color.toLowerCase()} />
                                {color}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {product.sizeOptions?.length ? (
                      <div className={styles.optionGroup}>
                        <span className={styles.optionLabel}>Available sizes</span>
                        <div className={styles.optionChips}>
                          {product.sizeOptions.map((size, index) => (
                            <label className={styles.optionChip} key={size}>
                              <input
                                className={styles.optionInput}
                                type="radio"
                                name={`${product.slug}-size`}
                                defaultChecked={index === 0}
                              />
                              <span className={styles.optionChipText}>{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className={styles.statRow}>
                  <article>
                    <span>Quote basis</span>
                    <strong>{product.priceBand}</strong>
                  </article>
                  <article>
                    <span>Lead time</span>
                    <strong>{product.leadTime}</strong>
                  </article>
                </div>
              </div>

              <div className={styles.visual}>
                <div className={styles.imageWrap}>
                  <Image
                    src={product.heroImage}
                    alt={`${product.name} - ${product.summary}`}
                    title={`${product.name} | ${siteName} product supply`}
                    fill
                    className={`${styles.image} ${product.colorOptions?.length ? styles.imageContain : ""}`}
                    sizes="(max-width: 960px) 100vw, 70vw"
                    priority
                  />
                </div>
              </div>
            </section>
          </Reveal>

          {product.galleryImages?.length ? (
            <Reveal>
              <section className={styles.gallerySection} aria-labelledby="product-gallery-heading">
                <div className={styles.sectionHead}>
                  <p className={styles.eyebrow}>Product Image Concept</p>
                  <h2 id="product-gallery-heading">Image gallery direction for this product.</h2>
                  <p>
                    Concept visuals for the product page. Replace with real product photography
                    when final box artwork and supplier images are approved.
                  </p>
                </div>
                <div className={styles.galleryGrid}>
                  {product.galleryImages.map((image) => (
                    <figure className={styles.galleryCard} key={image.src}>
                      <div className={styles.galleryImageWrap}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className={styles.image}
                          sizes="(max-width: 760px) 100vw, 20vw"
                        />
                      </div>
                      <figcaption>{image.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </Reveal>
          ) : null}

          <section className={styles.gridSection}>
            <Reveal>
              <article className={styles.panel}>
                <p className={styles.eyebrow}>Featured Sizes</p>
                <h2>Available size direction</h2>
                <ul className={styles.list}>
                  {product.featuredSizes.map((size) => (
                    <li key={size}>{size}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article className={styles.panel}>
                <p className={styles.eyebrow}>Use Cases</p>
                <h2>Where it fits best</h2>
                <ul className={styles.list}>
                  {product.useCases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article className={styles.panel}>
                <p className={styles.eyebrow}>Packing Options</p>
                <h2>How it can be supplied</h2>
                <ul className={styles.list}>
                  {product.packingOptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </section>

          {productSpec ? (
            <Reveal>
              <ProductSpecTable
                productName={product.name}
                spec={productSpec}
                productUrl={absoluteUrl(`/products/${product.slug}`)}
              />
            </Reveal>
          ) : null}

          <Reveal>
            <section className={styles.procurementSection}>
              <div className={styles.sectionHead}>
                <p className={styles.eyebrow}>Procurement Details</p>
                <h2>Specifications buyers need before quote.</h2>
                <p>
                  Use this product page to align size, material, MOQ, documents, packaging,
                  and export route before final pricing.
                </p>
              </div>

              <div className={styles.procurementLayout}>
                <div className={styles.tableWrap}>
                  <table className={styles.skuTable}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Material</th>
                        <th>Buyer Fit</th>
                        <th>Packing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {procurement.skuRows.map((row) => (
                        <tr key={`${row.size}-${row.fit}`}>
                          <td>{row.size}</td>
                          <td>{row.material}</td>
                          <td>{row.fit}</td>
                          <td>{row.pack}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside className={styles.buyingPanel}>
                  <div>
                    <span>MOQ Guidance</span>
                    <strong>{procurement.moq}</strong>
                  </div>
                  <div>
                    <span>Sample Path</span>
                    <strong>{procurement.sample}</strong>
                  </div>
                </aside>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.supportSection}>
              <article className={styles.supportCard}>
                <p className={styles.eyebrow}>Document Status</p>
                <h2>Request documents early.</h2>
                <ul className={styles.badgeList}>
                  {procurement.documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
                <Link href="/documents" className={styles.textAction}>Open document hub</Link>
              </article>

              <article className={styles.supportCard}>
                <p className={styles.eyebrow}>Packaging Options</p>
                <h2>Match supply format to the buyer.</h2>
                <ul className={styles.badgeList}>
                  {procurement.packaging.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href="/private-label" className={styles.textAction}>Plan private label</Link>
              </article>

              <article className={styles.supportCard}>
                <p className={styles.eyebrow}>Related Buyer Paths</p>
                <h2>Continue the buying journey.</h2>
                <ul className={styles.linkList}>
                  {procurement.related.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          </Reveal>

          {faqs.length > 0 ? (
            <Reveal>
              <section className={styles.faqSection} aria-labelledby="product-faq-heading">
                <div className={styles.sectionHead}>
                  <p className={styles.eyebrow}>Buyer FAQ</p>
                  <h2 id="product-faq-heading">{product.shortName} questions buyers ask before quote.</h2>
                </div>
                <div className={styles.faqList}>
                  {faqs.map((item) => (
                    <details key={item.q} className={styles.faqItem}>
                      <summary>{item.q}</summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>
          ) : null}

          {cluster ? (
            <Reveal>
              <section className={styles.clusterSection} aria-labelledby="product-cluster-heading">
                <div className={styles.sectionHead}>
                  <p className={styles.eyebrow}>Continue Exploring</p>
                  <h2 id="product-cluster-heading">Related guides, comparison, and industry pages.</h2>
                </div>
                <div className={styles.clusterGrid}>
                  <div className={styles.clusterColumn}>
                    <h3>Buyer guides</h3>
                    <ul>
                      {cluster.guides.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {(cluster.compare || cluster.industry) ? (
                    <div className={styles.clusterColumn}>
                      <h3>Buyer decision</h3>
                      <ul>
                        {cluster.compare ? (
                          <li>
                            <Link href={cluster.compare.href}>{cluster.compare.label}</Link>
                          </li>
                        ) : null}
                        {cluster.industry ? (
                          <li>
                            <Link href={cluster.industry.href}>{cluster.industry.label}</Link>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </section>
            </Reveal>
          ) : null}

          <Reveal>
            <ProductCrossSell slug={product.slug} />
          </Reveal>

          <Reveal>
            <section id="quote-form" className={styles.quoteSection}>
              <div className={styles.quoteCopy}>
                <p className={styles.eyebrow}>Direct Quote Flow</p>
                <h2>Send your requirement straight to WhatsApp.</h2>
                <p>
                  Use the form to send your product type, quantity, and buying
                  requirement directly for a faster quote conversation.
                </p>
              </div>

              <QuoteForm title={`Quote for ${product.shortName}`} defaultProduct={product.name} compact />
            </section>
          </Reveal>
          <StickyQuoteBar productName={product.shortName} />
        </main>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                // Product + Offer using the SAME indicative export prices
                // already published on the homepage/buy pages. A single Offer
                // with a concrete `price` (the indicative "from"/low unit price)
                // is emitted instead of an AggregateOffer: Google's merchant-
                // listing validator requires `price`/`priceSpecification.price`
                // and rejects an AggregateOffer's lowPrice/highPrice with
                // "Either 'price' or 'priceSpecification.price' should be
                // specified (in 'offers')". priceValidUntil is included so the
                // offer is not flagged as stale. review & aggregateRating are
                // intentionally omitted (none exist yet). Only products with a
                // real published price get a node; quote-only PPE/clay are
                // skipped so no invented price is ever emitted.
                ...(offerPricing
                  ? [
                      {
                        "@type": "Product",
                        "@id": `${absoluteUrl(`/products/${product.slug}`)}#product`,
                        name: product.name,
                        description: product.summary,
                        image: absoluteUrl(product.heroImage),
                        category: "Industrial silica gel desiccant",
                        material: "Amorphous silicon dioxide (silica gel)",
                        brand: { "@type": "Brand", name: brandName },
                        manufacturer: { "@id": `${absoluteUrl()}#organization` },
                        offers: {
                          "@type": "Offer",
                          price: offerPricing.lowPrice,
                          priceCurrency: "USD",
                          priceValidUntil: "2026-12-31",
                          availability: "https://schema.org/InStock",
                          seller: { "@id": `${absoluteUrl()}#organization` },
                        },
                      },
                    ]
                  : []),
                ...(faqs.length > 0
                  ? [
                      {
                        "@type": "FAQPage",
                        "@id": `${absoluteUrl(`/products/${product.slug}`)}#faq`,
                        mainEntity: faqs.map((item) => ({
                          "@type": "Question",
                          name: item.q,
                          acceptedAnswer: {
                            "@type": "Answer",
                            text: item.a,
                          },
                        })),
                      },
                    ]
                  : []),
                breadcrumbJsonLd([
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: product.name, href: `/products/${product.slug}` },
                ]),
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}
