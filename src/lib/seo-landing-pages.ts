import type { Metadata } from "next";
import { absoluteUrl, defaultSeoImage, siteName } from "@/lib/seo";

export type SeoLandingPage = {
  slug: string;
  title: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  searchIntent: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  proofPoints: string[];
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
    chips: string[];
  };
  fitTitle: string;
  fitItems: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  specsTitle: string;
  specsIntro: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
  sizeGuide?: {
    title: string;
    intro: string;
    rows: Array<{
      size: string;
      bestFor: string;
      buyerNote: string;
    }>;
  };
  comparison?: {
    title: string;
    intro: string;
    columns: [string, string, string];
    rows: Array<{
      label: string;
      values: [string, string, string];
    }>;
  };
  quoteChecklist?: {
    title: string;
    intro: string;
    items: string[];
    defaultProduct: string;
  };
  buyingTitle: string;
  buyingIntro: string;
  buyingSteps: Array<{
    title: string;
    text: string;
  }>;
  relatedLinks: Array<{
    label: string;
    href: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const seoLandingPages = {
  "silica-gel-packets": {
    slug: "silica-gel-packets",
    title: "Silica Gel Packets Supplier | Bulk Desiccant Sachets",
    metaDescription:
      "Factory-direct silica gel packets and desiccant sachets for electronics, pharma, leather, food packaging, export cartons, private label, SDS, and COA support.",
    kicker: "Silica gel packets",
    h1: "Silica gel packets for export cartons, product packaging, and repeat bulk supply.",
    lead:
      "Source silica gel packets by gram size, sachet material, carton quantity, documentation needs, and destination market. Built for buyers who need clean RFQ inputs before price negotiation.",
    searchIntent: "Primary product intent: silica gel packets, desiccant sachets, bulk silica gel packets",
    primaryCta: "Request Packet Quote",
    secondaryCta: "View Product Range",
    secondaryHref: "/products",
    proofPoints: ["0.5g to 20g packet range", "SDS / COA on request", "Private-label discussion", "Worldwide export support"],
    heroImage: {
      src: "/products/white-nonindicating-clean-sachets.png",
      alt: "Clean white silica gel packets with clear beads for industrial packaging",
      caption: "Clean white non-indicating silica gel packets for cartons, unit packaging, and repeat export orders.",
      chips: ["White non-indicating", "Carton-ready", "0.5g-20g", "Private label"],
    },
    fitTitle: "Where silica gel packets fit best",
    fitItems: [
      {
        label: "Electronics",
        title: "PCBs, batteries, and precision packs",
        text: "Use small sachets inside unit packaging or master cartons where humidity can damage components during storage and shipment.",
      },
      {
        label: "Pharma",
        title: "Healthcare cartons and regulated packs",
        text: "Align packet material, warning text, SDS, COA, and destination documentation before quoting regulated applications.",
      },
      {
        label: "Leather",
        title: "Footwear, garments, and export cartons",
        text: "Reduce mold, odor, and finish-risk concerns during humid storage and long-haul shipping.",
      },
    ],
    specsTitle: "Common silica gel packet quote inputs",
    specsIntro:
      "The fastest quote starts with packet size, monthly quantity, packing method, destination, and document expectations.",
    specs: [
      { label: "Popular sizes", value: "0.5g, 1g, 2g, 3g, 5g, 10g, 20g" },
      { label: "Packet materials", value: "Breathable paper, technical fiber, non-woven options" },
      { label: "Use cases", value: "Electronics, pharma, leather, food cartons, warehouse stock" },
      { label: "Documents", value: "SDS, COA, ISO 9001:2015, DMF-free support on request" },
      { label: "Quote basis", value: "Size, quantity, carton packing, destination, and Incoterms" },
    ],
    sizeGuide: {
      title: "Silica gel packet size guide for buyers",
      intro:
        "Use this as a starting point for RFQs. Final sizing should still consider carton volume, product sensitivity, packaging film, storage time, and destination humidity.",
      rows: [
        {
          size: "0.5g-1g",
          bestFor: "Small electronic accessories, pill bottles, precision parts, compact unit packs",
          buyerNote: "Best when the packet sits directly inside small individual packaging.",
        },
        {
          size: "2g-3g",
          bestFor: "Medium retail boxes, accessories, small leather goods, tools, consumer electronics",
          buyerNote: "Common first quote range when carton risk is moderate and unit packs are not tiny.",
        },
        {
          size: "5g-10g",
          bestFor: "Export cartons, footwear boxes, garments, instruments, larger electronics packaging",
          buyerNote: "Good for buyers who need stronger carton-level protection without moving to bulk bags.",
        },
        {
          size: "20g+",
          bestFor: "Larger cartons, warehouse stock, mixed cartons, high-humidity logistics routes",
          buyerNote: "Use when product sensitivity or transit exposure is higher than standard unit packaging.",
        },
      ],
    },
    comparison: {
      title: "Silica gel packets vs bulk bags vs container strips",
      intro:
        "Buyers often search for packets but actually need a different format. This comparison routes them to the right quote path before sales starts.",
      columns: ["Silica gel packets", "Bulk silica gel", "Container strips"],
      rows: [
        {
          label: "Best use",
          values: [
            "Inside product packaging, retail boxes, master cartons",
            "Repacking, warehouse use, distributors, industrial stock",
            "20ft/40ft containers and long-haul sea freight",
          ],
        },
        {
          label: "Quote unit",
          values: [
            "Packet size and number of units",
            "Kg, pallet, or monthly tonnage",
            "Strip weight, strip count, route, and container size",
          ],
        },
        {
          label: "Main buyer risk",
          values: [
            "Moisture inside product/carton packaging",
            "Humidity across inventory or repacking operations",
            "Container rain, condensation, and route humidity",
          ],
        },
        {
          label: "Best next page",
          values: [
            "/products/retail-sachets",
            "/bulk-silica-gel-desiccant",
            "/container-desiccant-strips",
          ],
        },
      ],
    },
    quoteChecklist: {
      title: "Packet quote checklist",
      intro:
        "A serious silica gel packet RFQ should include these fields so the export desk can answer MOQ, lead time, documents, and dispatch path without guessing.",
      defaultProduct: "Silica gel packets / desiccant sachets",
      items: [
        "Packet size or expected gram range",
        "Monthly or shipment quantity",
        "Product category and packaging type",
        "Destination country, port, or city",
        "Incoterms preference: FOB, CIF, EXW, or DAP",
        "SDS, COA, ISO, DMF-free, or private-label requirements",
      ],
    },
    buyingTitle: "How procurement should request silica gel packets",
    buyingIntro:
      "Generic messages slow the quote. These inputs let the export desk recommend a realistic format and shipment path.",
    buyingSteps: [
      {
        title: "Define the packet size",
        text: "Share product type, carton size, expected exposure, and whether packets go inside unit packaging or master cartons.",
      },
      {
        title: "Confirm quantity and packing",
        text: "Send monthly or shipment quantity, carton labeling needs, and any private-label text requirements.",
      },
      {
        title: "Align documents and route",
        text: "Mention destination country, port, Incoterms, SDS/COA needs, and whether compliance claims require proof.",
      },
    ],
    relatedLinks: [
      { label: "Small sachet product page", href: "/products/retail-sachets" },
      { label: "Private label packets", href: "/private-label-desiccant-packets" },
      { label: "Request export quote", href: "/contact" },
    ],
    faqs: [
      {
        question: "What silica gel packet sizes can be quoted?",
        answer: "Common sizes include 0.5g, 1g, 2g, 3g, 5g, 10g, and 20g. Custom sizes can be discussed for repeat B2B programs.",
      },
      {
        question: "Can Dry Gel World provide printed silica gel packets?",
        answer: "Private-label text, warning copy, carton labeling, and buyer-specific packaging can be discussed against MOQ and target market requirements.",
      },
      {
        question: "What documents should I request with silica gel packets?",
        answer: "Most buyers ask for SDS and COA first. ISO 9001:2015 and DMF-free support can be discussed where relevant to the exact product format.",
      },
    ],
  },
  "bulk-silica-gel-desiccant": {
    slug: "bulk-silica-gel-desiccant",
    title: "Bulk Silica Gel Desiccant Supplier | Industrial Moisture Control",
    metaDescription:
      "Bulk silica gel desiccant supply for 25kg bags, large desiccant packs, warehouse stock, distributors, exporters, SDS/COA support, and recurring procurement.",
    kicker: "Bulk silica gel desiccant",
    h1: "Bulk silica gel desiccant for warehouses, distributors, and industrial buyers.",
    lead:
      "Plan bulk silica gel orders around kilograms, pallet volume, carton packing, product sensitivity, and repeat procurement schedules. Built for buyers who need commercial scale, not retail sachets.",
    searchIntent: "Bulk product intent: bulk silica gel desiccant, bulk desiccant supplier, industrial silica gel",
    primaryCta: "Request Bulk Quote",
    secondaryCta: "Use Calculator",
    secondaryHref: "/bulk-sales",
    proofPoints: ["25kg loose bags", "250g / 500g packs", "Pallet planning", "Recurring supply quotes"],
    fitTitle: "Best-fit bulk desiccant buyers",
    fitItems: [
      {
        label: "Distributors",
        title: "Repacking and regional resale",
        text: "Use loose beads or larger packs when the buyer handles downstream packing, resale, or regional supply.",
      },
      {
        label: "Warehouses",
        title: "Stock-room and inventory protection",
        text: "Support stored goods where humidity can affect cartons, metal parts, textiles, or long-held inventory.",
      },
      {
        label: "Exporters",
        title: "Heavy carton and pallet programs",
        text: "Align 25g to 500g packs around carton volume, transit exposure, and destination humidity.",
      },
    ],
    specsTitle: "Bulk quote specification table",
    specsIntro:
      "Bulk buying needs cleaner quantity language than retail packets. Quote by weight, pack format, and shipment schedule.",
    specs: [
      { label: "Formats", value: "25kg loose silica gel, 25g-500g bags, carton-packed desiccants" },
      { label: "Buyer types", value: "Distributors, warehouses, industrial exporters, repackers" },
      { label: "Packing", value: "Bagged bulk, carton quantities, pallet planning by shipment" },
      { label: "Documents", value: "SDS, COA, ISO 9001:2015 support on request" },
      { label: "Commercial basis", value: "Quoted by kg, pallet, route, MOQ, and repeat volume" },
    ],
    buyingTitle: "How to request a bulk silica gel quote",
    buyingIntro:
      "A proper bulk quote should include weight, packing, destination, and whether the order repeats monthly or quarterly.",
    buyingSteps: [
      {
        title: "Share required total weight",
        text: "Send kg, tons, pallet target, or monthly volume. If unknown, share carton use case and target shipment volume.",
      },
      {
        title: "Choose bag or loose format",
        text: "Confirm whether you need loose beads, 25g-500g bags, or carton-packed finished units.",
      },
      {
        title: "Send destination and dispatch terms",
        text: "Include country, port or city, Incoterms, and document requirements before final quotation.",
      },
    ],
    relatedLinks: [
      { label: "Bulk product page", href: "/products/bulk-industrial" },
      { label: "Bulk sales calculator", href: "/bulk-sales" },
      { label: "Export support", href: "/export" },
    ],
    faqs: [
      {
        question: "Can I buy silica gel in 25kg bulk bags?",
        answer: "Yes. Bulk silica gel can be discussed in loose bag formats and larger industrial packs depending on destination and volume.",
      },
      {
        question: "Is bulk silica gel better than packets?",
        answer: "Bulk loose gel is better for repacking or industrial use. Finished packets are better when the desiccant must go directly into cartons or product packaging.",
      },
      {
        question: "What details are needed for bulk pricing?",
        answer: "Send weight, format, packing requirement, destination country, port, repeat volume, and required documents.",
      },
    ],
  },
  "container-desiccant-strips": {
    slug: "container-desiccant-strips",
    title: "Container Desiccant Strips | Cargo Moisture Control Supplier",
    metaDescription:
      "Container desiccant strips for 20ft and 40ft export shipments, cargo moisture control, container rain risk, pallet protection, SDS/COA support, and route planning.",
    kicker: "Container desiccant strips",
    h1: "Container desiccant strips for long-haul cargo and export moisture risk.",
    lead:
      "Plan cargo strips by route, container size, transit time, commodity type, and humidity exposure before final freight and desiccant pricing.",
    searchIntent: "Export logistics intent: container desiccant strips, cargo desiccant, container rain prevention",
    primaryCta: "Plan Cargo Strips",
    secondaryCta: "Read Container Rain Guide",
    secondaryHref: "/blog/container-rain-prevention",
    proofPoints: ["1kg to 5kg strip direction", "20ft / 40ft planning", "FOB / CIF support", "SDS / COA on request"],
    fitTitle: "Where cargo desiccant strips matter most",
    fitItems: [
      {
        label: "Sea freight",
        title: "Long-haul humid routes",
        text: "Use strip planning where ocean transit, temperature swings, and container rain can damage cartons or pallets.",
      },
      {
        label: "Leather",
        title: "Mold-sensitive cargo",
        text: "Footwear, garments, and leather stock need carton-level and container-level moisture planning.",
      },
      {
        label: "Industrial",
        title: "High-value pallets and machinery",
        text: "Protect metal parts, tooling, and industrial goods where corrosion or carton weakening can create claims.",
      },
    ],
    specsTitle: "Cargo strip quote inputs",
    specsIntro:
      "Container desiccant pricing should be tied to route risk, container size, cargo type, and planned strip quantity.",
    specs: [
      { label: "Formats", value: "1kg, 2kg-3kg, and 5kg cargo strip direction" },
      { label: "Container sizes", value: "20ft and 40ft planning by route and commodity risk" },
      { label: "Use cases", value: "Leather, textiles, machinery, cartons, warehouse-to-port cargo" },
      { label: "Planning inputs", value: "Transit days, humidity exposure, container loading, destination port" },
      { label: "Commercial basis", value: "Quoted by strip count, shipment schedule, Incoterms, and route" },
    ],
    buyingTitle: "How to request container desiccant strips",
    buyingIntro:
      "A cargo desiccant quote should start with container and route details, not only product price.",
    buyingSteps: [
      {
        title: "Define container and route",
        text: "Share 20ft or 40ft container, origin, destination, transit days, and whether the route is humid or seasonal.",
      },
      {
        title: "Share commodity and packing",
        text: "Mention cargo type, carton or pallet packing, container loading style, and damage concerns.",
      },
      {
        title: "Confirm strip count and documents",
        text: "Request suggested strip quantity, SDS/COA support, and Incoterms before dispatch planning.",
      },
    ],
    relatedLinks: [
      { label: "Cargo strip product page", href: "/products/container-strips" },
      { label: "Container rain guide", href: "/blog/container-rain-prevention" },
      { label: "FOB Karachi quotes", href: "/export/fob-karachi" },
    ],
    faqs: [
      {
        question: "How many desiccant strips are needed for a container?",
        answer: "The quantity depends on container size, cargo type, route humidity, transit duration, and packing density. Share those inputs before final strip planning.",
      },
      {
        question: "Do cargo strips replace packet desiccants?",
        answer: "No. Cargo strips protect the container environment, while packets protect product cartons or unit packaging. Many export programs use both.",
      },
      {
        question: "Can Dry Gel World quote by Incoterms?",
        answer: "Yes. FOB, CIF, EXW, and other commercial paths can be discussed once destination, quantity, and dispatch schedule are clear.",
      },
    ],
  },
  "private-label-desiccant-packets": {
    slug: "private-label-desiccant-packets",
    title: "Private Label Desiccant Packets | OEM Silica Gel Sachets",
    metaDescription:
      "Private label desiccant packets and OEM silica gel sachets with buyer-specific text, carton labels, warning copy, SDS/COA support, and export supply.",
    kicker: "Private label desiccant packets",
    h1: "Private label desiccant packets for brands, distributors, and packaging buyers.",
    lead:
      "Turn silica gel sachets into a controlled OEM supply program with correct warning text, gram size, carton labeling, documentation, and repeat export planning.",
    searchIntent: "OEM intent: private label desiccant packets, OEM silica gel sachets, printed silica gel packets",
    primaryCta: "Get Private Label Quote",
    secondaryCta: "View OEM Page",
    secondaryHref: "/private-label",
    proofPoints: ["Buyer-specific sachet text", "Carton label support", "0.5g to 20g sachets", "Repeat OEM programs"],
    fitTitle: "Who needs private-label desiccant packets",
    fitItems: [
      {
        label: "Brands",
        title: "Cleaner packaging presentation",
        text: "Use controlled sachet text and carton labels when the packet is part of the final customer experience.",
      },
      {
        label: "Distributors",
        title: "Reseller-ready desiccant supply",
        text: "Align packet sizes, cartons, SKU names, and documentation for repeat regional sales.",
      },
      {
        label: "Packagers",
        title: "OEM insertion programs",
        text: "Support packaging lines that need consistent packet size, warning copy, and dispatch scheduling.",
      },
    ],
    specsTitle: "Private-label quote details",
    specsIntro:
      "Private label work depends on copy, format, quantity, and repeat schedule. These details reduce back-and-forth.",
    specs: [
      { label: "Packet text", value: "SILICA GEL, DESICCANT, DO NOT EAT, THROW AWAY, buyer text by review" },
      { label: "Sizes", value: "Common 0.5g-20g sachets plus custom formats by MOQ" },
      { label: "Cartons", value: "Buyer labels, SKU names, batch references, export packing" },
      { label: "Documents", value: "SDS, COA, ISO 9001:2015, DMF-free support on request" },
      { label: "Commercial basis", value: "Quoted by print scope, size, MOQ, packing, and destination" },
    ],
    buyingTitle: "How to request OEM desiccant packets",
    buyingIntro:
      "Private-label RFQs move faster when artwork, copy, sizing, and carton requirements are clear early.",
    buyingSteps: [
      {
        title: "Send sachet copy and size",
        text: "Share required text, gram size, material preference, and any market-specific warning copy.",
      },
      {
        title: "Confirm carton and SKU needs",
        text: "Include outer carton labels, SKU names, batch references, and packing quantity expectations.",
      },
      {
        title: "Align MOQ and documents",
        text: "Confirm target monthly volume, destination country, and SDS/COA or compliance document needs.",
      },
    ],
    relatedLinks: [
      { label: "Private label page", href: "/private-label" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Documents hub", href: "/documents" },
    ],
    faqs: [
      {
        question: "Can Dry Gel World print my brand on desiccant packets?",
        answer: "Buyer-specific sachet text and carton labeling can be discussed for repeat B2B orders. MOQ and print feasibility depend on size and material.",
      },
      {
        question: "What text should appear on silica gel packets?",
        answer: "Common packet text includes SILICA GEL, DESICCANT, DO NOT EAT, and THROW AWAY. Final wording should match buyer and destination requirements.",
      },
      {
        question: "Can private-label packets include documents?",
        answer: "SDS, COA, ISO 9001:2015, and DMF-free support can be discussed against the exact product format and market.",
      },
    ],
  },
  "silica-gel-manufacturer-exporter": {
    slug: "silica-gel-manufacturer-exporter",
    title: "Silica Gel Manufacturer Exporter | Dry Gel World",
    metaDescription:
      "Dry Gel World supplies silica gel desiccant packets, bulk desiccants, cargo strips, private label sachets, export documentation, and worldwide RFQ support.",
    kicker: "Manufacturer exporter",
    h1: "Silica gel manufacturer exporter for global B2B moisture-control buyers.",
    lead:
      "Work with a desiccant export partner that understands product format, MOQ, documentation, private label, Incoterms, and destination requirements before quoting.",
    searchIntent: "Supplier intent: silica gel manufacturer exporter, desiccant manufacturer, global silica gel supplier",
    primaryCta: "Request Export Quote",
    secondaryCta: "Explore Export Support",
    secondaryHref: "/export",
    proofPoints: ["Factory-direct positioning", "SDS / COA support", "Private label discussion", "Worldwide buyer support"],
    fitTitle: "Why importers use a manufacturer-exporter page",
    fitItems: [
      {
        label: "Procurement",
        title: "One supplier across formats",
        text: "Route sachets, bulk bags, cargo strips, and private-label requirements through one export inquiry path.",
      },
      {
        label: "Compliance",
        title: "Documents discussed before dispatch",
        text: "SDS, COA, ISO support, and destination-specific claims should be aligned before final commercial terms.",
      },
      {
        label: "Logistics",
        title: "Quotes built around destination",
        text: "Better RFQs include country, port, Incoterms, lead time, packing, and repeat volume.",
      },
    ],
    specsTitle: "Manufacturer-exporter capability signals",
    specsIntro:
      "This page should help importers understand whether Dry Gel World can support their buying path before they contact sales.",
    specs: [
      { label: "Core products", value: "Silica gel packets, paper sachets, bulk packs, cargo strips" },
      { label: "Buyer types", value: "Importers, distributors, packagers, exporters, warehouses" },
      { label: "Export support", value: "FOB, CIF, EXW, destination and document planning" },
      { label: "Documents", value: "SDS, COA, ISO 9001:2015 support on request" },
      { label: "Commercial basis", value: "MOQ, product format, destination, repeat volume, private label scope" },
    ],
    buyingTitle: "How to approach Dry Gel World for export supply",
    buyingIntro:
      "A manufacturer-exporter RFQ should be specific enough to quote and technical enough to prevent packaging mistakes.",
    buyingSteps: [
      {
        title: "Choose product direction",
        text: "Start with sachets, bulk gel, cargo strips, or private-label packets. If unsure, share the use case.",
      },
      {
        title: "Send commercial inputs",
        text: "Include quantity, destination country, port or city, Incoterms, target lead time, and repeat schedule.",
      },
      {
        title: "Confirm proof requirements",
        text: "List SDS, COA, ISO, DMF-free, labeling, or any market-specific compliance requirement before shipment planning.",
      },
    ],
    relatedLinks: [
      { label: "Export support", href: "/export" },
      { label: "Product catalog", href: "/products" },
      { label: "Request quote", href: "/contact" },
    ],
    faqs: [
      {
        question: "Does Dry Gel World export silica gel worldwide?",
        answer: "Dry Gel World is positioned for international B2B silica gel desiccant inquiries and can discuss product format, MOQ, documents, and destination support.",
      },
      {
        question: "What products can be included in one export inquiry?",
        answer: "Buyers can request silica gel packets, paper sachets, bulk desiccants, cargo strips, and private-label programs in one RFQ.",
      },
      {
        question: "What makes a manufacturer-exporter RFQ faster?",
        answer: "Send product type, size, quantity, destination, Incoterms, packing details, documentation needs, and repeat volume expectations.",
      },
    ],
  },
} satisfies Record<string, SeoLandingPage>;

export type SeoLandingSlug = keyof typeof seoLandingPages;

export function getSeoLandingPage(slug: SeoLandingSlug) {
  return seoLandingPages[slug];
}

export function landingPageMetadata(slug: SeoLandingSlug): Metadata {
  const page = getSeoLandingPage(slug);

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/${page.slug}`,
      siteName,
      images: [
        {
          url: defaultSeoImage,
          alt: `${siteName} ${page.kicker}`,
        },
      ],
      type: "website",
    },
  };
}

export function landingPageJsonLd(page: SeoLandingPage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.metaDescription,
        url: absoluteUrl(`/${page.slug}`),
        isPartOf: {
          "@type": "WebSite",
          name: siteName,
          url: absoluteUrl(),
        },
      },
      {
        "@type": "Service",
        name: page.kicker,
        description: page.lead,
        provider: {
          "@type": "Organization",
          name: siteName,
          url: absoluteUrl(),
        },
        areaServed: "Worldwide",
        serviceType: "Industrial silica gel desiccant supply",
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
