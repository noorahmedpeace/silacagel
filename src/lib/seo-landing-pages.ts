import type { Metadata } from "next";
import { absoluteUrl, brandDomain, brandName, defaultSeoImage, siteName } from "@/lib/seo";

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
    formTitle: string;
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
      formTitle: "Request Silica Gel Packet Quote",
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
    heroImage: {
      src: "/products/premium-bulk-supply.png",
      alt: "Bulk silica gel desiccant bags and clear beads in a warehouse supply setting",
      caption: "Bulk silica gel desiccant supply for repackers, distributors, warehouses, and repeat industrial procurement.",
      chips: ["25kg loose bags", "250g-500g packs", "Pallet-ready", "Repeat supply"],
    },
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
    sizeGuide: {
      title: "Bulk silica gel format guide",
      intro:
        "Use this guide to describe your order clearly. Bulk desiccant pricing changes by format, bag size, pallet plan, monthly volume, and destination route.",
      rows: [
        {
          size: "25kg loose",
          bestFor: "Distributors, repackers, warehouse stock, and industrial users buying by weight",
          buyerNote: "Best when the buyer handles downstream packing, internal use, or regional resale.",
        },
        {
          size: "25g-100g",
          bestFor: "Heavy cartons, instruments, machinery parts, and larger packaged goods",
          buyerNote: "Useful when standard small sachets are too light for the carton risk.",
        },
        {
          size: "250g-500g",
          bestFor: "Export cartons, palletized stock, warehousing, and high-humidity storage programs",
          buyerNote: "Good for carton-level or inventory-level moisture control before moving to cargo strips.",
        },
        {
          size: "Pallet / tonnage",
          bestFor: "Recurring industrial supply, importers, distributors, and quarterly procurement cycles",
          buyerNote: "Quote with destination, packing, Incoterms, and repeat volume so pricing is realistic.",
        },
      ],
    },
    comparison: {
      title: "Bulk silica gel vs packets vs container strips",
      intro:
        "Bulk buyers often need more than one format. Use this comparison to separate repacking supply, carton protection, and container-level moisture control.",
      columns: ["Bulk silica gel", "Silica gel packets", "Container strips"],
      rows: [
        {
          label: "Best use",
          values: [
            "Warehouse stock, repacking, distributors, large bag programs",
            "Inside product packaging, retail boxes, master cartons",
            "20ft/40ft containers and sea-freight condensation risk",
          ],
        },
        {
          label: "Quote unit",
          values: [
            "Kg, tons, pallet count, repeat monthly volume",
            "Packet size, unit count, carton packing, private-label text",
            "Strip count, strip weight, container size, route, transit days",
          ],
        },
        {
          label: "Procurement risk",
          values: [
            "Wrong pack format, unclear pallet plan, weak repeat-volume data",
            "Wrong gram size or missing warning/document requirements",
            "Underestimating container rain and route humidity exposure",
          ],
        },
        {
          label: "Best next page",
          values: [
            "/products/bulk-industrial",
            "/silica-gel-packets",
            "/container-desiccant-strips",
          ],
        },
      ],
    },
    quoteChecklist: {
      title: "Bulk quote checklist",
      formTitle: "Request Bulk Silica Gel Quote",
      intro:
        "A serious bulk silica gel RFQ should make the commercial unit clear: loose kg, finished packs, pallet count, destination, repeat schedule, and documents.",
      defaultProduct: "Bulk silica gel desiccant / industrial packs",
      items: [
        "Loose silica gel, finished bags, or both",
        "Required weight: kg, tons, pallet count, or monthly volume",
        "Pack size target: 25kg, 25g-100g, 250g, 500g, or custom",
        "Destination country, port, or city",
        "Incoterms preference: FOB, CIF, EXW, DAP, or buyer pickup",
        "SDS, COA, ISO, labeling, or private-pack requirements",
      ],
    },
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
  "silica-gel-manufacturer-pakistan": {
    slug: "silica-gel-manufacturer-pakistan",
    title: "Silica Gel Manufacturer in Pakistan | DryGelWorld",
    metaDescription:
      "DryGelWorld supports Pakistan and export buyers with silica gel packets, bulk desiccants, container desiccants, packaging desiccants, SDS, COA, and RFQ support.",
    kicker: "Pakistan silica gel manufacturer",
    h1: "Silica gel manufacturer in Pakistan for industrial and export buyers.",
    lead:
      "Source silica gel from Pakistan with clearer buying inputs: product format, gram size, bulk quantity, destination, Incoterms, and document requirements before final quotation.",
    searchIntent: "Local buyer intent: silica gel manufacturer in Pakistan, silica gel Pakistan, silica gel company",
    primaryCta: "Request Pakistan Quote",
    secondaryCta: "View Export Support",
    secondaryHref: "/export",
    proofPoints: ["Pakistan supplier positioning", "Bulk and packet formats", "Export RFQ support", "SDS / COA on request"],
    heroImage: {
      src: "/applications/export-logistics.webp",
      alt: "Silica gel export logistics from Pakistan for global buyers",
      caption: "Pakistan-based silica gel buying path for packets, bulk desiccants, private label, and export-ready RFQs.",
      chips: ["Pakistan supply", "Export support", "Bulk RFQ", "Documents"],
    },
    fitTitle: "Who this Pakistan silica gel page is for",
    fitItems: [
      {
        label: "Importers",
        title: "Buyers sourcing from Pakistan",
        text: "Use this page when you need a Pakistan supplier for packets, bulk bags, or cargo moisture-control products.",
      },
      {
        label: "Packagers",
        title: "Local and export packaging programs",
        text: "Align sachet size, carton quantity, labeling, and documentation before requesting a commercial quote.",
      },
      {
        label: "Distributors",
        title: "Repeat silica gel procurement",
        text: "Quote by kg, carton, pallet, or monthly volume when building a recurring supply program.",
      },
    ],
    specsTitle: "Pakistan silica gel RFQ inputs",
    specsIntro:
      "A strong Pakistan supplier inquiry should separate local stock needs from export shipment needs.",
    specs: [
      { label: "Target keywords", value: "Silica gel manufacturer in Pakistan, silica gel supplier Pakistan, silica gel company" },
      { label: "Product formats", value: "Silica gel packets, bulk silica gel, cargo strips, paper sachets, private-label packets" },
      { label: "Buyer types", value: "Importers, distributors, packagers, warehouses, exporters" },
      { label: "Documents", value: "SDS, COA, ISO support, labeling, and market-specific paperwork on request" },
      { label: "Quote basis", value: "Format, size, quantity, destination, Incoterms, and repeat volume" },
    ],
    buyingTitle: "How to request silica gel from Pakistan",
    buyingIntro:
      "Send enough commercial detail to avoid a weak quote and reduce back-and-forth with the export desk.",
    buyingSteps: [
      {
        title: "Choose the format",
        text: "Start with packets, bulk beads, cargo strips, food packaging, pharma packaging, or private-label sachets.",
      },
      {
        title: "Share quantity and route",
        text: "Send kg, packet count, pallet target, destination country, port, Incoterms, and required delivery timing.",
      },
      {
        title: "Confirm documents",
        text: "List SDS, COA, ISO, DMF-free, food packaging, pharma, or other compliance expectations before dispatch planning.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel exporter", href: "/silica-gel-manufacturer-exporter" },
      { label: "Bulk silica gel", href: "/bulk-silica-gel-desiccant" },
      { label: "Request quote", href: "/contact" },
    ],
    faqs: [
      {
        question: "Can DryGelWorld support silica gel buyers in Pakistan?",
        answer: "DryGelWorld is structured for local and export silica gel RFQs including packets, bulk desiccants, cargo strips, and private-label programs.",
      },
      {
        question: "What details are needed for Pakistan silica gel pricing?",
        answer: "Send product format, size, quantity, destination, packing needs, repeat volume, and required documents.",
      },
      {
        question: "Is this page for export buyers too?",
        answer: "Yes. International buyers can use this page when searching for a silica gel manufacturer or exporter from Pakistan.",
      },
    ],
  },
  "silica-gel-supplier-karachi": {
    slug: "silica-gel-supplier-karachi",
    title: "Silica Gel Supplier in Karachi | DryGelWorld",
    metaDescription:
      "Silica gel supplier in Karachi for packets, bulk desiccants, packaging moisture absorbers, container desiccant planning, SDS, COA, and export RFQs.",
    kicker: "Karachi silica gel supplier",
    h1: "Silica gel supplier in Karachi for packaging, warehouse, and export buyers.",
    lead:
      "Use this Karachi-focused page to plan silica gel packets, bulk orders, packaging desiccants, and export moisture-control RFQs with clearer local and international buying details.",
    searchIntent: "Local buyer intent: silica gel supplier in Karachi, silica gel Karachi, desiccant supplier Karachi",
    primaryCta: "Request Karachi Quote",
    secondaryCta: "View Products",
    secondaryHref: "/products",
    proofPoints: ["Karachi buyer path", "Packets and bulk supply", "Packaging desiccants", "Export support"],
    heroImage: {
      src: "/products/product-range-export-showcase.png",
      alt: "Silica gel product range for Karachi packaging and export buyers",
      caption: "Karachi buyer path for silica gel packets, bulk desiccants, packaging desiccants, and export RFQs.",
      chips: ["Karachi", "Silica gel", "Bulk supply", "Packaging"],
    },
    fitTitle: "Karachi silica gel buying use cases",
    fitItems: [
      {
        label: "Packaging",
        title: "Carton and product moisture control",
        text: "Select packet size, sachet material, and carton quantity for local packaging or export dispatch.",
      },
      {
        label: "Warehouse",
        title: "Bulk desiccant stock planning",
        text: "Quote kg, bag size, pallet targets, and repeat buying cycles for storage and repacking operations.",
      },
      {
        label: "Export",
        title: "Port and shipment planning",
        text: "Align Incoterms, destination, cargo type, and documents before final quotation.",
      },
    ],
    specsTitle: "Karachi supplier quote inputs",
    specsIntro:
      "Local supplier searches should still include proper RFQ data so pricing and stock planning are useful.",
    specs: [
      { label: "Target keywords", value: "Silica gel supplier in Karachi, silica gel Karachi, desiccant supplier Karachi" },
      { label: "Formats", value: "0.5g-20g packets, bulk bags, cargo strips, private-label sachets" },
      { label: "Use cases", value: "Packaging, warehousing, electronics, leather, food cartons, export logistics" },
      { label: "Documents", value: "SDS, COA, ISO and buyer-specific paperwork on request" },
      { label: "Quote basis", value: "Size, quantity, pickup/export path, packing, and repeat volume" },
    ],
    buyingTitle: "How Karachi buyers should request silica gel",
    buyingIntro:
      "A clean Karachi RFQ should say whether the order is local, export, private label, or recurring bulk supply.",
    buyingSteps: [
      {
        title: "Define local or export use",
        text: "Tell the sales desk whether the product is for Karachi packaging, warehouse stock, or export shipment.",
      },
      {
        title: "Send product and volume",
        text: "Share packet size, bulk weight, carton quantity, or monthly volume before asking for price.",
      },
      {
        title: "List documents and timing",
        text: "Mention SDS, COA, labeling, lead time, destination, and dispatch terms where relevant.",
      },
    ],
    relatedLinks: [
      { label: "Pakistan manufacturer page", href: "/silica-gel-manufacturer-pakistan" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Bulk sales calculator", href: "/bulk-sales" },
    ],
    faqs: [
      {
        question: "Can Karachi buyers request both packets and bulk silica gel?",
        answer: "Yes. Buyers can request small packets, bulk silica gel, cargo strips, and private-label packet programs depending on volume and use case.",
      },
      {
        question: "What makes a Karachi silica gel inquiry faster?",
        answer: "Share product format, size, quantity, destination or pickup path, packing requirements, and documents.",
      },
      {
        question: "Can export orders be quoted from Karachi?",
        answer: "Export terms can be discussed once quantity, destination, Incoterms, and document requirements are clear.",
      },
    ],
  },
  "food-grade-silica-gel-supplier": {
    slug: "food-grade-silica-gel-supplier",
    title: "Food Grade Silica Gel Supplier | Packaging Desiccant RFQ",
    metaDescription:
      "Food grade silica gel and food packaging desiccant RFQ page for moisture control in cartons, dry goods packaging, SDS, COA, labeling, and compliance review.",
    kicker: "Food packaging desiccant",
    h1: "Food grade silica gel supplier path for packaging buyers who need document-backed claims.",
    lead:
      "Plan silica gel for food packaging with careful document review, correct packet text, carton quantity, application context, and destination requirements before using food-grade claims.",
    searchIntent: "Food packaging intent: food grade silica gel supplier, food grade desiccant, desiccant for food packaging",
    primaryCta: "Request Food Packaging Quote",
    secondaryCta: "View Documents",
    secondaryHref: "/documents",
    proofPoints: ["Food packaging RFQs", "SDS / COA review", "Packet text planning", "Compliance claims checked"],
    heroImage: {
      src: "/products/white-nonindicating-clean-sachets.png",
      alt: "Clean white silica gel sachets for food packaging moisture control RFQs",
      caption: "Food packaging silica gel RFQs should confirm packet material, warning text, SDS, COA, and destination compliance before claims are used.",
      chips: ["Food packaging", "SDS / COA", "Clean sachets", "Compliance review"],
    },
    fitTitle: "Where food packaging desiccants fit",
    fitItems: [
      {
        label: "Dry goods",
        title: "Cartons and sealed packs",
        text: "Use moisture-control packets where humidity can affect dry ingredients, cartons, labels, or packed goods.",
      },
      {
        label: "Export",
        title: "Destination-specific documentation",
        text: "Food packaging claims should be reviewed against buyer documents and destination requirements before dispatch.",
      },
      {
        label: "Branding",
        title: "Clear warning text and labels",
        text: "Align packet wording, carton labels, and compliance language before repeat orders.",
      },
    ],
    specsTitle: "Food packaging silica gel quote inputs",
    specsIntro:
      "Use careful wording for food-grade searches. Claims should match the exact material, certificate, and destination requirements.",
    specs: [
      { label: "Target keywords", value: "Food grade silica gel supplier, food grade desiccant, desiccant for food packaging" },
      { label: "Typical formats", value: "Small white packets, carton sachets, private-label packaging programs" },
      { label: "Documents", value: "SDS, COA, material statement, labeling and compliance proof where valid" },
      { label: "Buyer risk", value: "Making unsupported food-grade or food-contact claims without matching documents" },
      { label: "Quote basis", value: "Packet size, product category, quantity, destination, document set, packaging text" },
    ],
    buyingTitle: "How to request food packaging desiccants",
    buyingIntro:
      "For food packaging programs, procurement should confirm documents and wording before price is treated as final.",
    buyingSteps: [
      {
        title: "Share food packaging context",
        text: "Explain whether the packet goes in a carton, pouch, master box, or secondary packaging environment.",
      },
      {
        title: "Request document review",
        text: "Ask for SDS, COA, and any specific material or destination statement needed before using food-grade wording.",
      },
      {
        title: "Confirm packet text",
        text: "Align warning text, packet material, label requirements, and carton quantity before ordering.",
      },
    ],
    relatedLinks: [
      { label: "Documents hub", href: "/documents" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Food packaging industry", href: "/industries/food-packaging" },
    ],
    faqs: [
      {
        question: "Can DryGelWorld quote food grade silica gel?",
        answer: "Food packaging RFQs can be discussed, but any food-grade or food-contact claim should be confirmed against valid product documents and destination requirements.",
      },
      {
        question: "What documents should food packaging buyers request?",
        answer: "Request SDS, COA, material statements, and any buyer-specific compliance documents before placing repeat orders.",
      },
      {
        question: "Are warning labels still needed for food packaging sachets?",
        answer: "Yes. Packet wording and warning copy should be reviewed for the market and packaging use case.",
      },
    ],
  },
  "blue-silica-gel-manufacturer": {
    slug: "blue-silica-gel-manufacturer",
    title: "Blue Silica Gel Manufacturer | Indicating Desiccant Supplier",
    metaDescription:
      "Blue silica gel manufacturer and indicating desiccant RFQ page for humidity indication, lab storage, packaging programs, compliance review, SDS, and COA support.",
    kicker: "Blue indicating silica gel",
    h1: "Blue silica gel manufacturer path for buyers who need moisture indication and compliance review.",
    lead:
      "Use blue indicating silica gel only after confirming composition, destination rules, SDS, COA, and whether the buyer needs alternative indicating colors for regulated markets.",
    searchIntent: "Indicating gel intent: blue silica gel manufacturer, blue silica gel supplier, indicating silica gel",
    primaryCta: "Request Blue Gel Quote",
    secondaryCta: "Compare Orange Gel",
    secondaryHref: "/orange-silica-gel-supplier",
    proofPoints: ["Indicating silica gel", "RH signal applications", "SDS / COA review", "Compliance notes"],
    heroImage: {
      src: "/macro_silica_beads_1775989669467.png",
      alt: "Macro silica gel beads for indicating desiccant buyer education",
      caption: "Indicating silica gel RFQs should confirm color system, use case, documents, and destination compliance before quotation.",
      chips: ["Blue silica gel", "Indicating", "RH signal", "Documents"],
    },
    fitTitle: "Where blue silica gel is requested",
    fitItems: [
      {
        label: "Labs",
        title: "Visual humidity indication",
        text: "Buyers use indicating gel where a visible moisture-state signal helps teams monitor storage conditions.",
      },
      {
        label: "Storage",
        title: "Reusable moisture-control checks",
        text: "Indicating beads can support controlled storage workflows when regeneration and handling rules are clear.",
      },
      {
        label: "Compliance",
        title: "Composition must be confirmed",
        text: "Blue indicating gel can have regulatory concerns in some markets, so documents and destination rules matter.",
      },
    ],
    specsTitle: "Blue silica gel quote inputs",
    specsIntro:
      "Blue gel inquiries should not be treated like generic white silica gel because color chemistry and market rules can matter.",
    specs: [
      { label: "Target keywords", value: "Blue silica gel manufacturer, blue silica gel supplier, indicating silica gel" },
      { label: "Use cases", value: "Lab storage, equipment cases, humidity signal packs, controlled storage" },
      { label: "Documents", value: "SDS, COA, composition notes, destination compliance review" },
      { label: "Buyer risk", value: "Ordering an indicating color that does not match buyer or market restrictions" },
      { label: "Quote basis", value: "Color, bead size, quantity, packing, destination, and document requirements" },
    ],
    buyingTitle: "How to request blue silica gel",
    buyingIntro:
      "The safest RFQ explains why the buyer needs blue gel and what destination rules apply.",
    buyingSteps: [
      {
        title: "Explain the indication need",
        text: "Share whether the product is for lab jars, storage packs, cases, or buyer education.",
      },
      {
        title: "Ask for composition documents",
        text: "Request SDS, COA, and any composition detail needed by the destination market.",
      },
      {
        title: "Confirm alternative colors",
        text: "If blue gel is restricted, ask whether orange indicating or non-indicating silica gel is a better route.",
      },
    ],
    relatedLinks: [
      { label: "Orange silica gel", href: "/orange-silica-gel-supplier" },
      { label: "Documents hub", href: "/documents" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
    ],
    faqs: [
      {
        question: "What is blue silica gel used for?",
        answer: "Blue silica gel is an indicating desiccant used where buyers need a visual moisture-state signal, subject to composition and market review.",
      },
      {
        question: "Should blue silica gel be used in all markets?",
        answer: "No. Buyers should confirm composition, SDS, COA, and destination restrictions before using blue indicating silica gel.",
      },
      {
        question: "Is orange silica gel an alternative?",
        answer: "Orange indicating silica gel may be requested as an alternative depending on buyer requirements and document review.",
      },
    ],
  },
  "orange-silica-gel-supplier": {
    slug: "orange-silica-gel-supplier",
    title: "Orange Silica Gel Supplier | Indicating Desiccant RFQ",
    metaDescription:
      "Orange silica gel supplier page for indicating desiccant RFQs, humidity signal applications, packaging support, SDS, COA, compliance review, and export buyers.",
    kicker: "Orange indicating silica gel",
    h1: "Orange silica gel supplier for buyers who need visible humidity indication.",
    lead:
      "Plan orange indicating silica gel orders around color-change requirements, bead or packet format, use case, documentation, quantity, and destination rules.",
    searchIntent: "Indicating gel intent: orange silica gel supplier, orange indicating silica gel, indicating desiccant supplier",
    primaryCta: "Request Orange Gel Quote",
    secondaryCta: "Compare Blue Gel",
    secondaryHref: "/blue-silica-gel-manufacturer",
    proofPoints: ["Orange indicating gel", "Humidity signal support", "Packet or bulk RFQ", "SDS / COA on request"],
    heroImage: {
      src: "/hero-macro-kraft.png",
      alt: "Silica gel desiccant beads and sachets for indicating gel applications",
      caption: "Orange indicating silica gel helps buyers add a visible moisture-state signal where product and market requirements allow.",
      chips: ["Orange gel", "Indicating", "Bulk or packets", "Export RFQ"],
    },
    fitTitle: "Where orange indicating gel fits",
    fitItems: [
      {
        label: "Storage",
        title: "Humidity-state monitoring",
        text: "Use orange indicating gel where a visual color signal supports controlled storage checks.",
      },
      {
        label: "Packaging",
        title: "Buyer education and inspection",
        text: "Indicating gel can help teams understand moisture exposure when packaging workflows require visible checks.",
      },
      {
        label: "Export",
        title: "Document-backed quotation",
        text: "Confirm SDS, COA, color system, and destination requirements before final export quote.",
      },
    ],
    specsTitle: "Orange silica gel RFQ inputs",
    specsIntro:
      "Indicating gel buyers should specify color-change expectations and document needs early.",
    specs: [
      { label: "Target keywords", value: "Orange silica gel supplier, orange indicating silica gel, indicating desiccant supplier" },
      { label: "Formats", value: "Bulk beads, jars, packets, carton packs by buyer requirement" },
      { label: "Use cases", value: "Storage monitoring, lab supplies, packaging checks, moisture-state education" },
      { label: "Documents", value: "SDS, COA, composition notes and destination review on request" },
      { label: "Quote basis", value: "Color, quantity, packing, destination, and required documents" },
    ],
    buyingTitle: "How to request orange silica gel",
    buyingIntro:
      "A strong RFQ should clarify whether the buyer needs orange color indication, bulk beads, or packet-ready supply.",
    buyingSteps: [
      {
        title: "Share the color-change use",
        text: "Explain the monitoring workflow and whether the product is used in jars, packs, cartons, or displays.",
      },
      {
        title: "Confirm format and quantity",
        text: "Send bead size, bag size, packet target, kg, cartons, or monthly volume before pricing.",
      },
      {
        title: "Request documents",
        text: "Ask for SDS, COA, and any destination-specific compliance statement needed for export.",
      },
    ],
    relatedLinks: [
      { label: "Blue silica gel", href: "/blue-silica-gel-manufacturer" },
      { label: "Documents hub", href: "/documents" },
      { label: "Request quote", href: "/contact" },
    ],
    faqs: [
      {
        question: "What is orange silica gel?",
        answer: "Orange silica gel is an indicating desiccant requested when buyers need a visible moisture-state signal.",
      },
      {
        question: "Can orange silica gel be quoted in bulk?",
        answer: "Bulk or packet-ready RFQs can be discussed when quantity, packing, destination, and documents are clear.",
      },
      {
        question: "Do indicating gels need special documents?",
        answer: "Yes. SDS, COA, composition notes, and destination review should be requested before final use.",
      },
    ],
  },
  "moisture-absorber-supplier": {
    slug: "moisture-absorber-supplier",
    title: "Moisture Absorber Supplier | Industrial Desiccant Manufacturer",
    metaDescription:
      "Moisture absorber supplier for industrial desiccants, silica gel packets, packaging desiccants, warehouse moisture control, cargo desiccants, SDS, COA, and export RFQs.",
    kicker: "Moisture absorber supplier",
    h1: "Moisture absorber supplier for packaging, warehouses, cartons, and export shipments.",
    lead:
      "Use this page when the buyer searches for moisture absorbers but actually needs a desiccant format: silica gel packets, bulk desiccant, cargo strips, or packaging moisture control.",
    searchIntent: "Buyer intent: moisture absorber supplier, desiccant supplier, packaging desiccant, moisture absorber for container",
    primaryCta: "Request Moisture Absorber Quote",
    secondaryCta: "View Product Range",
    secondaryHref: "/products",
    proofPoints: ["Desiccant supplier", "Packaging moisture control", "Cargo desiccants", "Bulk RFQ support"],
    heroImage: {
      src: "/backgrounds/bento-silica-panel.png",
      alt: "Silica gel moisture absorber visual for industrial desiccant buyers",
      caption: "Moisture absorber buyers should choose the desiccant format by product risk, package size, storage time, and shipment route.",
      chips: ["Moisture absorber", "Desiccant", "Packaging", "Cargo"],
    },
    fitTitle: "Moisture absorber buying paths",
    fitItems: [
      {
        label: "Packets",
        title: "Product and carton protection",
        text: "Small silica gel packets fit product boxes, cartons, accessories, pharma packs, and electronics packaging.",
      },
      {
        label: "Bulk",
        title: "Warehouse and repacking supply",
        text: "Bulk silica gel fits inventory, distributors, repackers, and industrial storage programs.",
      },
      {
        label: "Cargo",
        title: "Container moisture control",
        text: "Container desiccants and cargo strips fit long-haul shipments exposed to humidity and temperature swings.",
      },
    ],
    specsTitle: "Moisture absorber quote map",
    specsIntro:
      "The term moisture absorber is broad, so the page routes buyers into the right desiccant format.",
    specs: [
      { label: "Target keywords", value: "Moisture absorber supplier, desiccant supplier, packaging desiccant, moisture absorber for container" },
      { label: "Formats", value: "Silica gel packets, bulk beads, cargo strips, carton packs, private-label sachets" },
      { label: "Use cases", value: "Packaging, warehousing, electronics, pharma, leather, food cartons, shipping containers" },
      { label: "Documents", value: "SDS, COA, ISO and buyer-specific statements on request" },
      { label: "Quote basis", value: "Use case, product sensitivity, format, quantity, destination, and document needs" },
    ],
    buyingTitle: "How to request moisture absorber products",
    buyingIntro:
      "A better moisture absorber RFQ starts with the damage risk and ends with the correct desiccant format.",
    buyingSteps: [
      {
        title: "Describe the moisture risk",
        text: "Mention mold, corrosion, carton softening, odor, product clumping, electronics damage, or container rain.",
      },
      {
        title: "Choose the format",
        text: "Select packets, bulk silica gel, cargo strips, or private-label sachets based on where the desiccant will sit.",
      },
      {
        title: "Send quantity and destination",
        text: "Add order volume, destination, Incoterms, document needs, and repeat schedule before final quotation.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Bulk silica gel", href: "/bulk-silica-gel-desiccant" },
      { label: "Container desiccants", href: "/shipping-container-desiccant-supplier" },
    ],
    faqs: [
      {
        question: "Is silica gel a moisture absorber?",
        answer: "Yes. Silica gel is a desiccant moisture absorber used to reduce humidity inside packaging, cartons, storage spaces, and shipment environments.",
      },
      {
        question: "Which moisture absorber format should I request?",
        answer: "Use packets for product packaging, bulk silica gel for industrial or repacking supply, and cargo strips for container shipments.",
      },
      {
        question: "What details are needed for moisture absorber pricing?",
        answer: "Send use case, product sensitivity, package size, quantity, destination, and required documents.",
      },
    ],
  },
  "shipping-container-desiccant-supplier": {
    slug: "shipping-container-desiccant-supplier",
    title: "Shipping Container Desiccant Supplier | Cargo Moisture Control",
    metaDescription:
      "Shipping container desiccant supplier for cargo moisture control, container rain prevention, sea-freight desiccants, export packaging, route planning, SDS, and COA.",
    kicker: "Shipping container desiccant",
    h1: "Shipping container desiccant supplier for sea freight and container rain prevention.",
    lead:
      "Plan shipping container desiccants by container size, route humidity, transit time, commodity risk, pallet packing, and destination before final strip quantity or cargo desiccant pricing.",
    searchIntent: "Export logistics intent: shipping container desiccant supplier, container desiccant, cargo desiccant, silica gel for shipping containers",
    primaryCta: "Plan Container Desiccants",
    secondaryCta: "Read Container Rain Guide",
    secondaryHref: "/blog/container-rain-prevention",
    proofPoints: ["20ft / 40ft planning", "Cargo desiccant RFQs", "Container rain risk", "FOB / CIF support"],
    heroImage: {
      src: "/products/premium-cargo-strips.png",
      alt: "Container desiccant strips and cargo moisture control for shipping containers",
      caption: "Shipping container desiccant planning should start with route, container size, cargo type, humidity exposure, and transit days.",
      chips: ["Container desiccant", "Cargo", "20ft / 40ft", "Sea freight"],
    },
    fitTitle: "Where shipping container desiccants matter",
    fitItems: [
      {
        label: "Sea freight",
        title: "Long-haul container routes",
        text: "Use container desiccants where ocean transit and temperature swings can create condensation and carton damage.",
      },
      {
        label: "Cargo",
        title: "Pallet and carton protection",
        text: "Cargo strips support moisture control around leather, textiles, machinery, food cartons, and export goods.",
      },
      {
        label: "Claims",
        title: "Container rain prevention",
        text: "Plan desiccant quantity before shipment to reduce mold, corrosion, carton collapse, and moisture claims.",
      },
    ],
    specsTitle: "Container desiccant quote inputs",
    specsIntro:
      "Container desiccant pricing should be tied to route risk, container size, cargo type, transit days, and planned strip count.",
    specs: [
      { label: "Target keywords", value: "Shipping container desiccant supplier, container desiccant, cargo desiccant, silica gel for shipping containers" },
      { label: "Container sizes", value: "20ft and 40ft route planning by commodity risk and humidity exposure" },
      { label: "Use cases", value: "Leather, textiles, machinery, cartons, warehouse-to-port cargo, food packaging exports" },
      { label: "Planning inputs", value: "Origin, destination, transit days, cargo type, pallet density, container loading style" },
      { label: "Quote basis", value: "Strip count, strip weight, route, Incoterms, schedule, and documents" },
    ],
    buyingTitle: "How to request shipping container desiccants",
    buyingIntro:
      "A container desiccant RFQ should start with shipping risk, not only unit price.",
    buyingSteps: [
      {
        title: "Define the route",
        text: "Share origin, destination, transit days, season, and whether the route has high humidity or temperature swings.",
      },
      {
        title: "Share container and cargo",
        text: "Mention 20ft or 40ft container, cargo type, carton or pallet packing, and damage concerns.",
      },
      {
        title: "Request strip planning",
        text: "Ask for suggested desiccant format, strip quantity, documents, and Incoterms before final dispatch planning.",
      },
    ],
    relatedLinks: [
      { label: "Container strips", href: "/container-desiccant-strips" },
      { label: "Container rain guide", href: "/blog/container-rain-prevention" },
      { label: "Export support", href: "/export" },
    ],
    faqs: [
      {
        question: "What is a shipping container desiccant?",
        answer: "A shipping container desiccant is a moisture-control product used inside containers to reduce condensation, humidity damage, and container rain risk.",
      },
      {
        question: "How many desiccants are needed for a container?",
        answer: "Quantity depends on container size, cargo type, route humidity, transit days, loading density, and packaging style.",
      },
      {
        question: "Do container desiccants replace packet desiccants?",
        answer: "No. Container desiccants protect the container environment, while packets protect products or cartons directly.",
      },
    ],
  },
  drygelworld: {
    slug: "drygelworld",
    title: `${brandName} Official Website | Silica Gel Desiccant Supplier`,
    metaDescription:
      "Official DryGelWorld.com brand page for industrial silica gel packets, bulk desiccants, cargo strips, private-label sachets, export RFQs, SDS, COA, and worldwide buyer support.",
    kicker: `Official ${brandName}.com`,
    h1: "DryGelWorld is the official silica gel desiccant export brand for global B2B buyers.",
    lead:
      "DryGelWorld.com is the official website for Dry Gel World, built for procurement teams that need silica gel packets, bulk desiccant supply, container strips, private-label sachets, export documentation, and clear RFQ paths.",
    searchIntent: "Brand intent: DryGelWorld, drygelworld.com, Dry Gel World silica gel supplier",
    primaryCta: "Request DryGelWorld Quote",
    secondaryCta: "View Products",
    secondaryHref: "/products",
    proofPoints: ["Official domain: drygelworld.com", "Silica gel export supplier", "SDS / COA support", "Global B2B RFQ path"],
    heroImage: {
      src: "/products/product-range-export-showcase.png",
      alt: "DryGelWorld silica gel product range for export buyers",
      caption: "Official DryGelWorld.com product path for silica gel packets, bulk supply, cargo strips, and private-label buyer programs.",
      chips: ["DryGelWorld", "Official website", "B2B export", "Silica gel"],
    },
    fitTitle: "What DryGelWorld.com should be known for",
    fitItems: [
      {
        label: "Brand",
        title: "Exact-name official website",
        text: "This page confirms DryGelWorld, Dry Gel World, and drygelworld.com as the official brand and domain for silica gel desiccant supply.",
      },
      {
        label: "Products",
        title: "Silica gel formats for procurement",
        text: "Buyers can move from the brand page to packets, bulk silica gel, cargo strips, private label, documents, and export RFQ routes.",
      },
      {
        label: "Trust",
        title: "Clear buyer proof signals",
        text: "Brand, product, documentation, and destination signals are grouped so search engines and buyers can understand the business faster.",
      },
    ],
    specsTitle: "DryGelWorld brand and search signals",
    specsIntro:
      "New domains need clear entity signals. This page gives Google and procurement buyers an exact-match reference for the official brand name and website.",
    specs: [
      { label: "Official brand", value: brandName },
      { label: "Trading name", value: "Dry Gel World" },
      { label: "Official domain", value: brandDomain },
      { label: "Primary category", value: "Industrial silica gel desiccant supplier and exporter" },
      { label: "Core products", value: "Silica gel packets, bulk silica gel, container desiccant strips, private-label desiccant packets" },
      { label: "Buyer path", value: "Product pages, technical guides, documents hub, quote form, WhatsApp RFQ" },
    ],
    buyingTitle: "How buyers should use DryGelWorld.com",
    buyingIntro:
      "The brand page should route buyers from a name search into the correct commercial path quickly.",
    buyingSteps: [
      {
        title: "Start with product format",
        text: "Choose packets, bulk desiccant, cargo strips, paper sachets, or private-label supply based on your packaging workflow.",
      },
      {
        title: "Check document needs",
        text: "Review SDS, COA, ISO, labeling, and compliance expectations before requesting shipment pricing.",
      },
      {
        title: "Send a structured RFQ",
        text: "Share quantity, destination, Incoterms, pack size, documentation needs, and repeat volume so DryGelWorld can respond with useful quote data.",
      },
    ],
    relatedLinks: [
      { label: "Official homepage", href: "/" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Bulk silica gel", href: "/bulk-silica-gel-desiccant" },
      { label: "Manufacturer exporter", href: "/silica-gel-manufacturer-exporter" },
      { label: "Request quote", href: "/contact" },
    ],
    faqs: [
      {
        question: "Is DryGelWorld.com the official Dry Gel World website?",
        answer: "Yes. DryGelWorld.com is the official website for Dry Gel World and is used for silica gel desiccant product information, export RFQs, and buyer support.",
      },
      {
        question: "What does DryGelWorld supply?",
        answer: "DryGelWorld supplies silica gel packets, bulk silica gel desiccants, cargo/container desiccant strips, paper sachets, and private-label desiccant packets for B2B buyers.",
      },
      {
        question: "Why is the DryGelWorld brand page important for Google?",
        answer: "A new domain needs exact brand-name signals, internal links, structured data, and sitemap inclusion so search engines can distinguish the brand from similar names.",
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
          "@id": `${absoluteUrl()}#website`,
          name: brandName,
          alternateName: [siteName, "DryGelWorld.com", brandDomain],
          url: absoluteUrl(),
        },
      },
      {
        "@type": "Service",
        name: page.kicker,
        description: page.lead,
        provider: {
          "@type": "Organization",
          "@id": `${absoluteUrl()}#organization`,
          name: brandName,
          alternateName: [siteName, "DryGelWorld.com", brandDomain],
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
