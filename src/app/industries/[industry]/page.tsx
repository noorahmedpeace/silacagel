import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { getIndustrySeoImage, withPageImageContext } from "@/lib/seo-images";
import styles from "../../strategy-pages.module.css";

type IndustryFormat = { label: string; text: string };
type IndustryBody = {
  heading: string;
  intro: string;
  formatsHeading: string;
  formats: IndustryFormat[];
  closingHeading: string;
  closing: string;
};
type IndustryFaq = { question: string; answer: string };
type IndustryPage = {
  title: string;
  h1: string;
  description: string;
  points: string[];
  // Required on-page SEO content. Every industry page MUST author a real body
  // (and should author faqs) — making `body` required means a missing page
  // fails the build instead of leaking the editorial scaffold to the public.
  metaTitle?: string;
  metaDescription?: string;
  body: IndustryBody;
  faqHeading?: string;
  faqs?: IndustryFaq[];
  relatedLinks?: Array<{ label: string; href: string }>;
};

const industryPages: Record<string, IndustryPage> = {
  "electronics-packaging": {
    title: "Silica Gel for Electronics Packaging",
    metaTitle: "Silica Gel Desiccant for Electronics Shipping & Packaging",
    metaDescription:
      "Anti-static & standard silica gel desiccant packets for PCBs, batteries & electronics export cartons. Prevent corrosion in ocean freight. Get an RFQ.",
    h1: "Silica gel desiccant for electronics shipping and packaging — protect boards, batteries, and assemblies.",
    description:
      "Silica gel desiccant packets for electronics packaging, circuit boards, batteries, precision assemblies, and export cartons.",
    points: [
      "Protect circuit boards, connectors, batteries, and device assemblies during storage and shipment.",
      "Use small sachets for unit packaging and larger formats for master cartons.",
      "Request SDS, COA, and RoHS/REACH support when electronics buyers require documentation.",
    ],
    body: {
      heading: "Moisture protection for electronics, PCBs, and batteries",
      intro:
        "Electronics and precision assemblies are highly sensitive to humidity during storage and ocean freight. DryGelWorld supplies anti-static and standard silica gel sachets sized for circuit boards, connectors, battery packs, and master export cartons — with the documentation electronics exporters require.",
      formatsHeading: "Product formats for electronics buyers",
      formats: [
        { label: "Unit-level sachets", text: "Small packets for individual PCBs and connectors." },
        { label: "Anti-static / ESD-safe options", text: "For sensitive electronic components." },
        { label: "Master-carton desiccants", text: "Larger formats for palletized export cartons." },
      ],
      closingHeading: "Why moisture control matters for electronics export",
      closing:
        "Condensation inside sealed cartons (“container rain”) causes corrosion on solder joints, contacts, and battery terminals. Correctly sized silica gel keeps relative humidity below the corrosion threshold.",
    },
    faqHeading: "Electronics desiccant — buyer FAQs",
    faqs: [
      {
        question: "What silica gel is best for packaging electronics and PCBs?",
        answer:
          "Standard or anti-static (ESD-safe) silica gel sachets are used for PCBs, connectors, and battery assemblies. Packet size is matched to sealed volume and transit duration.",
      },
      {
        question: "How much silica gel do I need per carton?",
        answer:
          "Dosage depends on enclosed air volume, barrier material, and transit time. Send carton dimensions and route details in an RFQ and we recommend packet size and quantity.",
      },
      {
        question: "Do you offer anti-static desiccant packets?",
        answer:
          "Yes. We supply ESD-safe desiccant packets for sensitive electronic components alongside standard sachets.",
      },
      {
        question: "Can silica gel prevent corrosion during ocean freight?",
        answer:
          "Yes. Correctly sized silica gel holds humidity below the corrosion threshold, preventing condensation damage during long-haul container shipping.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel packets for electronics", href: "/silica-gel-packets" },
    ],
  },
  "pharma-packaging": {
    title: "Desiccant for Pharma Packaging",
    metaTitle: "Pharma Desiccant Packets | SDS/COA-Ready Healthcare Packaging",
    metaDescription:
      "Pharma-grade silica gel desiccant packets and canisters for pill bottles, blister cartons & diagnostic kits. SDS, COA, batch docs. Export RFQ in 24h.",
    h1: "Documentation-ready desiccant supply for pharma and healthcare packaging.",
    description:
      "Desiccant packets for pharma packaging, healthcare cartons, pill bottles, diagnostic kits, and regulated export requirements.",
    points: [
      "Align packet material, size, warning text, and document requirements before quoting.",
      "Route buyers to SDS, COA, food/pharma support, and batch documentation discussions.",
      "Use clean product photography and compliance proof to build trust with regulated buyers.",
    ],
    body: {
      heading: "Desiccant requirements for pharmaceutical & healthcare packaging",
      intro:
        "Pharmaceutical and nutraceutical packaging needs desiccants that protect moisture-sensitive products while matching strict documentation and labeling requirements. DryGelWorld supplies silica gel packets and canisters for pill bottles, blister cartons, diagnostic kits, and regulated export shipments — with SDS, COA, and batch documentation available for every order.",
      formatsHeading: "Product formats for pharma buyers",
      formats: [
        { label: "Pharma-grade silica gel packets", text: "Tyvek and printed sachets for pill bottles, vials, and unit cartons." },
        { label: "Canister desiccants", text: "Rigid canisters for tablet and capsule bottles." },
        { label: "Master-carton desiccants", text: "Larger packs for export cartons and pallets." },
      ],
      closingHeading: "Documentation we provide",
      closing:
        "Every quote can include Safety Data Sheets (SDS), Certificates of Analysis (COA), “DO NOT EAT” warning compliance, and batch-level documentation for regulated supply chains.",
    },
    faqHeading: "Pharma desiccant — buyer FAQs",
    faqs: [
      {
        question: "What grade of silica gel is used for pharmaceutical packaging?",
        answer:
          "Pharmaceutical packaging typically uses high-purity, food/pharma-grade silica gel in Tyvek or printed sachets and rigid canisters, supplied with SDS and COA documentation.",
      },
      {
        question: "Do your pharma desiccants come with SDS and COA documentation?",
        answer:
          "Yes. Every pharma order can include Safety Data Sheets, Certificates of Analysis, and batch documentation for regulated and audited buyers.",
      },
      {
        question: "Can you supply desiccants for pill bottles and diagnostic kits?",
        answer:
          "Yes. We supply canister desiccants for tablet bottles, small sachets for diagnostic kits, and master-carton packs for export healthcare shipments.",
      },
      {
        question: "What is the minimum order quantity for pharma desiccants?",
        answer:
          "MOQs depend on format. Send your product type, packet size, and annual volume in an RFQ and we confirm MOQ, lead time, and Incoterms within 24 hours.",
      },
    ],
  },
  "leather-footwear-export": {
    title: "Silica Gel for Leather and Footwear Export",
    h1: "Reduce humidity risk in footwear, garments, leather goods, and export cartons.",
    description:
      "Silica gel sachets for leather export, footwear cartons, garments, textiles, mold prevention, and long-haul logistics.",
    metaTitle: "Silica Gel for Leather & Footwear Export | Mold Prevention",
    metaDescription:
      "Silica gel desiccant for leather goods, footwear & garment export cartons. Stop mold, mildew, odor & finish damage on humid sea routes. SDS/COA. Get an RFQ.",
    points: [
      "Target mold, odor, finish damage, and warehouse humidity risks in export cartons.",
      "Offer printed sachets and carton-level packing guidance for footwear brands and exporters.",
      "Match sachet size to carton volume, route humidity, and transit time before quoting.",
    ],
    body: {
      heading: "Moisture protection for leather, footwear, and garment exports",
      intro:
        "Leather and footwear lose value fast to humidity — mold blooms, white salt spew, musty odor, and adhesive failure are the top reasons buyers reject or claim against shipments. DryGelWorld supplies silica gel sachets sized for shoe boxes, leather goods, and master export cartons moving through humid storage and long-haul sea freight.",
      formatsHeading: "Product formats for leather & footwear buyers",
      formats: [
        { label: "5g-10g sachets", text: "Inside shoe boxes, handbags, and small leather goods cartons." },
        { label: "25g-50g bags", text: "Master cartons of footwear, garments, and bulk leather items." },
        { label: "Container strips", text: "Ceiling-hung strips for full 20ft/40ft loads on tropical routes." },
      ],
      closingHeading: "Why mold and odor happen in transit",
      closing:
        "Sealed cartons trap warm, moist air; as the container cools at night, that moisture condenses onto leather and fabric, feeding mold and mildew. Correctly sized silica gel holds humidity below the mold threshold for the whole voyage, protecting both the product and the brand’s claim record.",
    },
    faqHeading: "Leather & footwear desiccant — buyer FAQs",
    faqs: [
      {
        question: "How do I stop mold on leather and footwear during export?",
        answer:
          "Place correctly sized silica gel sachets inside each box and master carton, and add container strips for full sea-freight loads. Sized against route humidity and transit time, silica gel keeps relative humidity below the level where mold and mildew grow.",
      },
      {
        question: "What size silica gel sachet should go in a shoe box?",
        answer:
          "A 5g-10g sachet per shoe box is typical, with 25g-50g bags added at master-carton level. Final sizing depends on carton volume, packaging film, and how humid and long the route is — send carton details in an RFQ for an exact recommendation.",
      },
      {
        question: "Do you supply printed or private-label sachets for footwear brands?",
        answer:
          "Yes. We supply printed and private-label silica gel sachets with custom packet text and warning copy for footwear and leather-goods brands. Confirm size, material, artwork, and MOQ in your RFQ.",
      },
      {
        question: "Can silica gel prevent salt spew and odor on leather?",
        answer:
          "Silica gel controls the in-carton humidity that drives mold, mildew, and musty odor, and reduces the moisture cycling linked to leather finish problems. Pair it with dry packing and conditioned cartons for best results on long humid routes.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel for leather export", href: "/silica-gel-for-leather-export" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
    ],
  },
  "food-packaging": {
    title: "Desiccant for Food Packaging",
    h1: "Moisture-control support for food packaging and dry-goods exporters.",
    description:
      "Food packaging desiccant guidance for dry goods, snacks, spices, cartons, compliance support, and export moisture control.",
    metaTitle: "Food-Grade Silica Gel Desiccant for Food Packaging Export",
    metaDescription:
      "Food-safe silica gel desiccant for dry goods, snacks, spices & export cartons. Protect shelf life and prevent clumping & mold. SDS/COA and compliance docs. RFQ.",
    points: [
      "Focus on dry goods, carton protection, shelf stability, and buyer documentation.",
      "Match desiccant format to pack type — sachets in unit packs, larger bags for cartons.",
      "Provide SDS, COA, and food-contact compliance support per destination market.",
    ],
    body: {
      heading: "Moisture control for food packaging and dry-goods export",
      intro:
        "Dry foods, snacks, spices, and nutraceuticals lose crispness, clump, cake, and grow mold when humidity gets into the pack. DryGelWorld supplies silica gel desiccants for food-packaging and dry-goods exporters — with SDS, COA, and food-contact compliance documentation matched to the destination market.",
      formatsHeading: "Product formats for food-packaging buyers",
      formats: [
        { label: "Small food-safe sachets", text: "Inside snack, spice, and dry-mix unit packs (used outside direct ingestion)." },
        { label: "Master-carton desiccants", text: "Larger bags for export cartons of packaged food goods." },
        { label: "Container desiccants", text: "Strips for sealed sea-freight loads of dry foodstuffs." },
      ],
      closingHeading: "Compliance and documentation",
      closing:
        "Food applications require careful claims. We supply Safety Data Sheets (SDS), Certificates of Analysis (COA), and a DMF-free statement, and discuss FDA/REACH/Halal documentation per destination — confirmed against valid paperwork before any food-grade claim is made.",
    },
    faqHeading: "Food packaging desiccant — buyer FAQs",
    faqs: [
      {
        question: "Is silica gel safe to use in food packaging?",
        answer:
          "Silica gel (silicon dioxide) is chemically inert and is widely used as a desiccant in food packaging, placed in the pack rather than ingested and labeled 'do not eat'. For food-contact use we supply SDS, COA, and a DMF-free statement, and confirm market-specific documentation before any food-grade claim.",
      },
      {
        question: "Which silica gel format is best for snacks and spices?",
        answer:
          "Small sachets sit inside unit packs of snacks, spices, and dry mixes, while larger bags protect master export cartons. Sizing depends on pack volume, barrier film, and shelf-life target — send your pack details for a recommendation.",
      },
      {
        question: "Do you provide food-grade and compliance documentation?",
        answer:
          "Yes. We provide SDS, COA, and a DMF-free statement with orders, and discuss FDA, REACH, and Halal documentation per destination market, confirmed against valid documents before commercial terms.",
      },
      {
        question: "How does silica gel extend the shelf life of dry foods?",
        answer:
          "By holding the in-pack humidity low, silica gel prevents the moisture pickup that causes clumping, caking, loss of crispness, and mold growth — keeping dry foods stable through storage and long export transit.",
      },
    ],
    relatedLinks: [
      { label: "Food-grade silica gel supplier", href: "/food-grade-silica-gel-supplier" },
      { label: "Silica gel for rice, grain & spice export", href: "/blog/silica-gel-for-rice-grain-spice-export" },
    ],
  },
  "textile-garment-export": {
    title: "Silica Gel for Textile and Garment Export",
    h1: "Reduce mildew, dye-migration, and odor risk in textile and garment export cartons.",
    description:
      "Silica gel sachets and bulk desiccant for textile mills, garment exporters, fabric rolls, and long-haul humid routes from South Asia to USA, EU, and the Middle East.",
    metaTitle: "Silica Gel for Textile & Garment Export | Mildew Control",
    metaDescription:
      "Silica gel desiccant for textile mills & garment exporters. Stop mildew, dye migration & musty odor in fabric rolls and export cartons on humid routes. RFQ.",
    points: [
      "Mildew, dye migration, and musty-odor claims are the failure modes garment buyers reject for. Size desiccant against humidity exposure, not unit volume alone.",
      "Use 10g-50g sachets per carton on long-haul routes; container-ceiling cargo strips on trans-equatorial passages.",
      "Combine desiccant with kiln-dried pallets and 24-48h pre-pack moisture conditioning of the fabric itself.",
    ],
    body: {
      heading: "Moisture protection for textile and garment exports",
      intro:
        "Fabric is hygroscopic — it absorbs and releases moisture with the surrounding air, which is why textile and garment shipments fail through mildew, dye migration, and musty odor on long humid routes from South Asia to the USA, EU, and Middle East. DryGelWorld supplies silica gel sachets and bulk desiccant sized for fabric rolls, garment cartons, and full container loads.",
      formatsHeading: "Product formats for textile & garment buyers",
      formats: [
        { label: "10g-50g sachets", text: "Per garment carton and inside fabric-roll wrapping on long-haul routes." },
        { label: "Bulk desiccant bags", text: "For dense bale and roll shipments needing higher capacity." },
        { label: "Container cargo strips", text: "Ceiling-hung strips for trans-equatorial and tropical passages." },
      ],
      closingHeading: "Why fabric shipments grow mildew",
      closing:
        "Warm, damp fabric sealed in a cooling container releases moisture that condenses on cartons and cloth, feeding mildew and shifting dyes. Sizing desiccant against route humidity and transit time — not carton volume alone — keeps the load below the mildew threshold for the full voyage.",
    },
    faqHeading: "Textile & garment desiccant — buyer FAQs",
    faqs: [
      {
        question: "How do I prevent mildew on garment and textile exports?",
        answer:
          "Use 10g-50g silica gel sachets per carton and add container strips for full loads on long humid routes. Sized against route humidity and transit days, silica gel holds in-carton humidity below the level where mildew and musty odor develop.",
      },
      {
        question: "Does silica gel stop dye migration in fabrics?",
        answer:
          "Dye migration is driven by excess moisture and heat in transit. By keeping the in-carton humidity low and stable, silica gel reduces the moisture cycling that causes dyes to bleed or transfer between layers.",
      },
      {
        question: "How much silica gel per garment carton?",
        answer:
          "A common starting point is 10g-50g per carton depending on carton volume, fabric weight, packaging film, and route humidity. Send carton dimensions and the shipping lane in an RFQ for an exact dosage.",
      },
      {
        question: "Should I condition fabric before packing?",
        answer:
          "Yes. Pair desiccant with kiln-dried pallets and 24-48 hours of pre-pack moisture conditioning of the fabric itself — desiccant controls residual and ambient moisture, but packing already-damp fabric overwhelms any desiccant load.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
    ],
  },
  "container-shipping": {
    title: "Container Desiccant for Ocean Freight",
    h1: "Container desiccant supply for sealed ocean freight, transit humidity, and condensation cycling.",
    description:
      "Container desiccant strips, pole desiccants, and bulk silica gel for 20ft and 40ft containers on transpacific, trans-Atlantic, and trans-equatorial routes.",
    metaTitle: "Container Desiccant for Ocean Freight | Stop Container Rain",
    metaDescription:
      "Container desiccant strips & bulk silica gel for 20ft/40ft ocean freight. Stop container rain, condensation & mold on long-haul sea routes. SDS/COA. Get an RFQ.",
    points: [
      "Standard loading: 6-10 strips per 20ft container, 10-16 per 40ft. Long-haul tropical routes use the upper end.",
      "Container desiccant is single-voyage consumable. For reusable closed-loop applications, regenerable bulk silica gel beads are the right product.",
      "Match strip placement (ceiling, corrugations) to cargo geometry; even distribution beats concentrated placement.",
    ],
    body: {
      heading: "Container desiccant for sealed ocean freight",
      intro:
        "On long ocean voyages, day-night temperature swings make trapped moisture condense on the container ceiling and walls and drip onto cargo — 'container rain'. DryGelWorld supplies container desiccant strips, pole desiccants, and bulk silica gel for 20ft and 40ft containers on transpacific, trans-Atlantic, and trans-equatorial routes.",
      formatsHeading: "Product formats for container shipping",
      formats: [
        { label: "Ceiling-hung strips", text: "1kg-5kg multi-chamber strips hung at the container ceiling and along corrugations." },
        { label: "Pole / hanging desiccants", text: "For even distribution across the cargo space on humid lanes." },
        { label: "Bulk silica gel beads", text: "Regenerable beads for reusable closed-loop container applications." },
      ],
      closingHeading: "How much container desiccant you need",
      closing:
        "Standard loading is 6-10 strips per 20ft container and 10-16 per 40ft, with long-haul tropical routes using the upper end. Even distribution beats concentrated placement. Container desiccant is a single-voyage consumable; for reusable closed-loop systems, regenerable bulk silica gel beads are the right product.",
    },
    faqHeading: "Container desiccant — buyer FAQs",
    faqs: [
      {
        question: "How many desiccant strips do I need for a 40ft container?",
        answer:
          "Typically 10-16 strips of 1-2kg per 40ft container on long-haul tropical-to-temperate routes (25+ days), 8-12 for medium-haul, and 6-8 for short-haul. High-cube containers use the upper end. Send your route and cargo for an exact recommendation.",
      },
      {
        question: "What is container rain and how does desiccant prevent it?",
        answer:
          "Container rain is condensation that forms on the ceiling and walls when warm moist air cools at night, then drips onto cargo. Container desiccant adsorbs that moisture so humidity stays below the dew point, preventing the condensation cycle.",
      },
      {
        question: "Where should container desiccant strips be placed?",
        answer:
          "Hang strips at the container ceiling and along the corrugations, distributed evenly across the cargo space rather than concentrated in one area. Even placement protects the whole load against localized condensation.",
      },
      {
        question: "Can I reuse container desiccant?",
        answer:
          "Container strips are single-voyage consumables. For reusable closed-loop applications, regenerable bulk silica gel beads can be reactivated by heating and reused. Tell us your use case and we recommend the right format.",
      },
    ],
    relatedLinks: [
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
      { label: "Shipping container desiccant supplier", href: "/shipping-container-desiccant-supplier" },
      { label: "Container desiccant calculator", href: "/tools/container-desiccant-calculator" },
    ],
  },
  "automotive-parts": {
    title: "Silica Gel for Automotive Parts Export",
    h1: "Moisture and corrosion protection for exported automotive parts and components.",
    description:
      "Silica gel sachets and container desiccants for automotive parts exporters — protecting bearings, electronics, and metal components from rust and condensation during ocean freight and warehouse storage.",
    metaTitle: "Silica Gel for Automotive Parts Export | Rust Prevention",
    metaDescription:
      "Silica gel desiccant for automotive parts exporters — protect bearings, ECUs & metal components from rust and condensation in ocean freight & storage. RFQ.",
    points: [
      "Metal automotive components rust when container condensation forms on long-haul routes — sachets at the carton level plus container strips protect the part and the packaging.",
      "Match sachet dosage to carton volume and route humidity; add bulk desiccant for high-value bearings and electronic control units.",
      "Request SDS, COA, and DMF-free documentation for buyers who audit packaging in incoming-quality checks.",
    ],
    body: {
      heading: "Corrosion protection for exported automotive parts",
      intro:
        "Automotive parts are mostly bare or coated metal, and metal rusts wherever container condensation forms on long-haul routes. DryGelWorld supplies silica gel sachets and container desiccants that protect bearings, fasteners, castings, electronic control units, and spare parts from rust and condensation through ocean freight and warehouse storage.",
      formatsHeading: "Product formats for automotive buyers",
      formats: [
        { label: "Carton-level sachets", text: "Sized to carton air volume for boxed parts and components." },
        { label: "Bulk desiccant", text: "Higher capacity for high-value bearings and electronic control units." },
        { label: "Container strips", text: "For sealed full loads of metal parts on humid, long-haul lanes." },
      ],
      closingHeading: "Why automotive parts corrode in transit",
      closing:
        "Temperature swings inside a sealed container cause repeated condensation cycles onto cold metal surfaces — the start of rust, pitting, and contact corrosion on electronics. Carton-level sachets plus container strips hold humidity below the corrosion threshold and protect both the part and its packaging.",
    },
    faqHeading: "Automotive parts desiccant — buyer FAQs",
    faqs: [
      {
        question: "How do I prevent rust on automotive parts during ocean freight?",
        answer:
          "Combine silica gel sachets inside each carton with container strips for the full load. Sized to carton volume and route humidity, silica gel holds the sealed-pack humidity below the level where condensation and rust form on metal parts.",
      },
      {
        question: "What silica gel do I need for bearings and ECUs?",
        answer:
          "High-value bearings and electronic control units benefit from higher desiccant capacity — carton sachets plus bulk desiccant, and anti-static handling for electronics. Send the part type, packaging, and route for a dosage recommendation.",
      },
      {
        question: "Do you provide documentation for incoming-quality audits?",
        answer:
          "Yes. We supply SDS, COA, and a DMF-free statement for buyers who audit packaging in incoming-quality checks. ISO 9001:2015 quality-management support is available on request.",
      },
      {
        question: "How much silica gel per carton of automotive parts?",
        answer:
          "Dosage depends on enclosed air volume, metal mass, barrier material, and transit time. Send carton dimensions and the shipping lane in an RFQ and we recommend packet size and quantity.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
    ],
  },
  "defense-and-ammunition-packaging": {
    title: "Silica Gel for Defense and Ammunition Packaging",
    h1: "Moisture and corrosion control for defense components, ammunition, and military spare-parts packaging.",
    description:
      "Silica gel and clay desiccant for defense-sector packaging — protecting metal components, ammunition, optics, and spare parts from corrosion and condensation in sealed transit and long-term storage.",
    metaTitle: "Silica Gel for Defense & Ammunition Packaging | Desiccant",
    metaDescription:
      "Silica gel & clay desiccant for defense and ammunition packaging — corrosion control for metal parts, primers, optics & spares in sealed transit and storage. RFQ.",
    points: [
      "Defense and ammunition packaging fails through corrosion and condensation on metal parts, primers, and optics — desiccant holds the sealed-pack humidity below the point where that damage starts.",
      "Military specifications (such as MIL-D-3464) and desiccant 'unit' counts (DIN 55473) are buyer-supplied requirements: tell us the unit count and spec your contract calls for and we quote silica gel or clay to meet it.",
      "Pair carton-level sachets with container strips for sealed long-term storage; request SDS, COA, and unit-count documentation for incoming-quality audits.",
    ],
    body: {
      heading: "Corrosion and moisture control for defense packaging",
      intro:
        "Defense and ammunition packaging protects metal parts, primers, optics, and spares that must survive sealed transit and long-term storage without corrosion. DryGelWorld supplies silica gel and dry clay desiccant against buyer-supplied specifications and desiccant 'unit' counts, with the documentation procurement audits require.",
      formatsHeading: "Product formats for defense buyers",
      formats: [
        { label: "Unit-rated desiccant", text: "Silica gel or clay quoted to DIN 55473 unit counts your contract specifies." },
        { label: "Carton-level sachets", text: "Sized to enclosed volume for boxed components, primers, and optics." },
        { label: "Container strips", text: "For sealed long-term storage and full-load transit." },
      ],
      closingHeading: "Specifications and what we do and don't claim",
      closing:
        "Military specifications (such as MIL-D-3464) and DIN 55473 'unit' counts are buyer-supplied requirements — tell us the unit count and spec your contract calls for and we quote silica gel or clay to meet it. DryGelWorld holds ISO 9001:2015 and supplies a DMF-free statement, and does not claim a MIL-spec qualification itself.",
    },
    faqHeading: "Defense & ammunition desiccant — buyer FAQs",
    faqs: [
      {
        question: "Can you supply desiccant to MIL-D-3464 or DIN 55473 unit counts?",
        answer:
          "MIL-D-3464 and DIN 55473 unit counts are buyer-supplied requirements. Tell us the unit count and specification your contract calls for and we quote silica gel or clay desiccant to meet it. We hold ISO 9001:2015 and provide a DMF-free statement; we do not claim a MIL-spec qualification ourselves.",
      },
      {
        question: "Which desiccant is best for ammunition and primers?",
        answer:
          "Both silica gel and dry clay desiccant are used; the choice depends on the unit count, temperature range, and storage duration your spec defines. Pair unit-rated desiccant with carton sachets and container strips for sealed long-term storage.",
      },
      {
        question: "How does desiccant protect optics and metal defense parts?",
        answer:
          "By holding sealed-pack humidity below the corrosion and fogging threshold, desiccant prevents the condensation cycles that pit metal, degrade primers, and fog optics during transit and long-term storage.",
      },
      {
        question: "What documentation do you provide for procurement audits?",
        answer:
          "We provide SDS, COA, unit-count documentation, ISO 9001:2015 support, and a DMF-free statement for incoming-quality and procurement audits. Specify your required paperwork in the RFQ.",
      },
    ],
  },
};

type IndustrySlug = keyof typeof industryPages;
type IndustryPageProps = {
  params: Promise<{
    industry: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(industryPages).map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { industry } = await params;
  const page = industryPages[industry as IndustrySlug];

  if (!page) {
    return {};
  }

  const heroImage = withPageImageContext(getIndustrySeoImage(industry), page.title);
  const metaTitle = page.metaTitle ?? page.title;
  const metaDescription = page.metaDescription ?? page.description;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/industries/${industry}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/industries/${industry}`,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [heroImage.src],
    },
  };
}

export default async function IndustryPage({
  params,
}: IndustryPageProps) {
  const { industry } = await params;
  const page = industryPages[industry as IndustrySlug];

  if (!page) {
    notFound();
  }

  const heroImage = withPageImageContext(getIndustrySeoImage(industry), page.title);
  const pageUrl = absoluteUrl(`/industries/${industry}`);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: page.title, href: `/industries/${industry}` },
  ]);
  const industryJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: pageUrl,
        image: absoluteUrl(heroImage.src),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${absoluteUrl()}#website`,
          name: brandName,
        },
      },
      {
        "@type": "Service",
        name: page.title,
        serviceType: "Industrial desiccant application support",
        description: page.description,
        image: absoluteUrl(heroImage.src),
        provider: {
          "@type": "Organization",
          "@id": `${absoluteUrl()}#organization`,
          name: brandName,
        },
      },
      {
        "@type": breadcrumb["@type"],
        itemListElement: breadcrumb.itemListElement,
      },
      ...(page.faqs
        ? [
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
          ]
        : []),
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Industry Solution</span>
        <h1>{page.h1}</h1>
        <p>{page.description}</p>
        <Link href="/contact" className={styles.cta}>Request Industry Quote</Link>
      </section>

      <figure className={styles.articleVisual}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          title={heroImage.title}
          fill
          className={styles.articleVisualImage}
          sizes="(max-width: 900px) 100vw, 920px"
          priority
        />
        <figcaption>{heroImage.caption}</figcaption>
      </figure>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>{page.body.heading}</h2>
          <p>{page.body.intro}</p>
        </div>
        <div className={styles.sectionHead}>
          <h3>{page.body.formatsHeading}</h3>
        </div>
        <div className={styles.grid}>
          {page.body.formats.map((format) => (
            <article className={styles.card} key={format.label}>
              <h3>{format.label}</h3>
              <p>{format.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.sectionHead}>
          <h3>{page.body.closingHeading}</h3>
          <p>{page.body.closing}</p>
        </div>
      </section>

      {page.faqs ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.faqHeading ?? "Buyer FAQs"}</h2>
          </div>
          <div className={styles.grid}>
            {page.faqs.map((faq) => (
              <article className={styles.card} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.relatedLinks ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Related products &amp; guides</h2>
          </div>
          <div className={styles.grid}>
            {page.relatedLinks.map((link) => (
              <article className={styles.card} key={link.href}>
                <h3>
                  <Link href={link.href}>{link.label}</Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industryJsonLd),
        }}
      />
    </main>
  );
}
