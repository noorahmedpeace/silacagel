/*
 * "Global silica gel supplier" hub page.
 *
 * This is the top node of the site's topical map: it states the entity in one
 * sentence, then routes buyers down to the manufacturer page, the product
 * layer, industries, country/market pages, and resources. It exists because
 * "global silica gel supplier" / "silica gel suppliers worldwide" is a distinct
 * search intent (a buyer comparing international sources) from the plain
 * "silica gel supplier" page (a buyer who wants a quote).
 *
 * HONESTY DISCIPLINE: only ISO 9001:2015 (cert. 9101225), the DMF-free
 * statement and FSC packaging for dry clay are claimed. FDA, food-contact,
 * pharma GMP, Halal and REACH are NOT held. The "190+ countries" figure is the
 * company's stated figure (owner-confirmed 2026-09-02) and is labelled as such.
 */

import type { KeywordClusterInput } from "./seo-landing-pages";

export const globalSupplierLandingInput = {
  slug: "global-silica-gel-supplier",
  title: "Global Silica Gel Supplier | Manufacturer-Direct Export Worldwide",
  metaDescription:
    "DryGelWorld is a Pakistan-based silica gel manufacturer and global exporter operating since 1983. Sachets, bulk beads, and container desiccants shipped worldwide with ISO 9001:2015, SDS, COA, and DMF-free documentation.",
  kicker: "Global silica gel supplier",
  h1: "Global silica gel supplier: manufacturer-direct desiccants exported from Karachi worldwide.",
  lead:
    "DryGelWorld is a Pakistan-based silica gel manufacturer and global exporter, manufacturing since 1983 as Kamran Enterprises in Karachi. It supplies silica gel sachets, loose beads, bulk desiccants, and container desiccants to importers, distributors, and packagers across the Gulf, Europe, the UK, North America, Asia, Africa, and Australia. This page is the map: what is made, who it is for, where it ships, and how to buy.",
  searchIntent:
    "Commercial and B2B: global silica gel supplier, silica gel suppliers worldwide, international silica gel supplier, silica gel exporter, where to source silica gel internationally",
  primaryCta: "Request Export Quote",
  secondaryCta: "See country pages",
  secondaryHref: "/export",
  proofPoints: [
    "Manufacturer since 1983, Karachi",
    "ISO 9001:2015 (cert. 9101225)",
    "Shipped to 190+ countries (company figure)",
    "EXW, FOB Karachi, CIF, DAP",
  ],
  image: "/products/product-range-export-showcase.webp",
  imageAlt: "DryGelWorld silica gel sachets, beads, and container desiccants prepared for worldwide export from Karachi",
  imageCaption:
    "One factory, four formats: sachets, loose beads, bulk packs, and container strips, quoted in USD on FOB Karachi, CIF, or DAP terms.",
  chips: ["Worldwide export", "Manufacturer-direct", "USD quotes", "Documents included"],
  fitTitle: "Who sources silica gel from DryGelWorld internationally",
  useCases: [
    {
      label: "Importers & distributors",
      title: "Recurring container or pallet programs",
      text: "Distributors in the UAE, Saudi Arabia, the UK, Germany, and Australia buy sachets and 25kg bead bags on monthly schedules, quoted per format with SDS, COA, and origin documents for customs.",
    },
    {
      label: "Packagers & OEMs",
      title: "Private-label and printed sachets",
      text: "Packaging houses and brand owners order custom-printed 1g to 10g sachets with their own warning text and lot codes, produced in Karachi and shipped to their packing line.",
    },
    {
      label: "Exporters",
      title: "Container and carton protection",
      text: "Leather, footwear, textile, rice, and electronics exporters in South Asia and the Gulf use sachets inside cartons and 1-5kg strips in the container, sized with the free calculators.",
    },
  ],
  targetKeywords:
    "global silica gel supplier, silica gel suppliers worldwide, international silica gel supplier, silica gel exporter, silica gel supplier by country",
  formats:
    "Silica gel sachets 0.5g-500g (paper, technical fibre, non-woven), loose beads in 25kg bags, cobalt-free orange indicating gel, silica / clay / calcium chloride container strips, activated clay packs, private-label printed sachets",
  buyerTypes: "Importers, distributors, packagers, OEM and private-label brands, exporters, freight forwarders, procurement teams",
  documents: "ISO 9001:2015 certificate reference, SDS (local-language on request), batch COA, DMF-free statement, Certificate of Origin or REX statement, packing list, commercial invoice",
  buyerRisk:
    "Assuming every regulated lane is covered. DryGelWorld holds ISO 9001:2015 and issues a DMF-free statement; it does not hold FDA, food-contact, pharma GMP, Halal, or REACH registration. Confirm those requirements before ordering for regulated applications.",
  quoteBasis: "Format and size, quantity per order and per month, destination port, Incoterm, language and labeling needs, and document set",
  buyerGuide: {
    title: "DryGelWorld as a global silica gel supplier: the facts a buyer can verify",
    intro:
      "Every claim below is checkable: the certificate number with its registrar, the two Karachi addresses, the product formats on the pricing page, and the documents on the documentation hub. Where a figure is self-reported, it says so.",
    sections: [
      {
        label: "Identity",
        title: "Brand, legal entity, and location",
        text: "DryGelWorld is the export brand of Kamran Enterprises, a silica gel desiccant manufacturer in Karachi, Pakistan, operating since 1983. Head office: A-488, Block 1, Gulshan-e-Iqbal, Karachi 74000. Production: North Karachi Industrial Area, Sector 6B. Family-led, second generation.",
      },
      {
        label: "Quality system",
        title: "ISO 9001:2015, verifiable by number",
        text: "Certificate 9101225 for packaging and supply of silica desiccant, issued by QMEC Group Intl (Essex, UK), valid to 09 December 2028. Every shipment can carry a safety data sheet and a batch certificate of analysis. Dry clay ships in FSC-certified kraft and corrugated packaging.",
      },
      {
        label: "Scope",
        title: "What is not held, stated plainly",
        text: "FDA DMF or food-contact registration, EU 1935/2004 declarations, REACH registration, pharma GMP, Halal, FSSC 22000, JEDEC and MIL-spec classifications are not held. Buyers who need them are pointed to the top-10 supplier guide, which names who does.",
      },
      {
        label: "Products",
        title: "Four formats from one factory",
        text: "Silica gel sachets from 0.5g to 500g in paper, technical-fibre, or non-woven outers; loose beads in 25kg bags (1-3mm, 2-5mm); cobalt-free orange indicating gel; container desiccant strips in silica gel, clay, and calcium chloride; activated clay packs; and custom-printed private-label sachets.",
      },
      {
        label: "Reach",
        title: "Where it ships, and on what terms",
        text: "Quoted in USD on EXW, FOB Karachi, CIF, or DAP terms from Karachi Port and Port Qasim. The company reports shipments to 190+ countries since 1983 (self-reported). Dedicated country pages cover the UAE, Saudi Arabia, Qatar, USA, UK, Germany, France, Europe, India, Bangladesh, Vietnam, Malaysia, Indonesia, Turkey, Russia, Brazil, Mexico, Canada, Australia, and Africa.",
      },
      {
        label: "How to verify",
        title: "Four checks before your first order",
        text: "Verify certificate 9101225 with QMEC; request the SDS and a recent COA; ask for a plant visit or a video walk-through of the Karachi facility; and read the certifications page, which lists what is not held. A trading company cannot pass all four.",
      },
    ],
  },
  contentBlock: {
    heading: "The DryGelWorld topic map: from this page to a quote",
    parts: [
      { text: "Start with the " },
      { href: "/silica-gel-manufacturer", label: "silica gel manufacturer page" },
      { text: " for how the product is made and documented, then pick a format: " },
      { href: "/silica-gel-packets", label: "sachets and packets" },
      { text: " (with dedicated " },
      { href: "/1g-silica-gel-sachets", label: "1g" },
      { text: ", " },
      { href: "/5g-silica-gel-sachets", label: "5g" },
      { text: " and " },
      { href: "/10g-silica-gel-sachets", label: "10g pages" },
      { text: "), " },
      { href: "/silica-gel-beads", label: "loose beads" },
      { text: ", " },
      { href: "/bulk-silica-gel-desiccant", label: "bulk desiccant" },
      { text: ", or " },
      { href: "/container-desiccant-strips", label: "container strips" },
      { text: ". Match it to your industry on the " },
      { href: "/industries", label: "industries hub" },
      { text: ", check your destination on the " },
      { href: "/export", label: "export hub" },
      { text: ", size the order with the " },
      { href: "/tools/silica-gel-calculator", label: "silica gel calculator" },
      { text: " or " },
      { href: "/tools/container-desiccant-calculator", label: "container desiccant calculator" },
      { text: ", and pull documents from the " },
      { href: "/documentation", label: "documentation hub" },
      { text: ". For the wider market, read the " },
      { href: "/blog/top-10-silica-gel-suppliers-world-pakistan", label: "guide to the top silica gel suppliers and manufacturers worldwide" },
      { text: "." },
    ],
  },
  comparison: {
    title: "Sourcing silica gel internationally: manufacturer-direct vs trader vs domestic converter",
    intro:
      "Three ways to buy silica gel across borders. Each fits a different buyer; the point is to know which one you are talking to.",
    columns: ["Manufacturer-direct (e.g. DryGelWorld)", "Trading company", "Domestic converter"],
    rows: [
      { label: "Price basis", values: ["Ex-factory, one margin", "Factory price plus trader margin", "Local price, local freight"] },
      { label: "Documents", values: ["Own SDS, COA, ISO number", "Sourced from the factory on request", "Own documents; local registrations likelier"] },
      { label: "Lead time", values: ["7-15 days production plus sea transit", "Depends on stock and factory", "Days from stock"] },
      { label: "Best for", values: ["Recurring volume, private label, export cartons", "One-off mixed orders", "Regulated lanes needing FDA/REACH holders"] },
    ],
  },
  quoteChecklist: {
    title: "Send these details for an international quote",
    formTitle: "Quote for export silica gel supply",
    intro: "The export desk replies to a complete RFQ with a firm USD quote instead of a list of questions.",
    defaultProduct: "Silica gel (export)",
    items: [
      "Format: sachets (size and material), beads, bulk packs, container strips, or private label",
      "Quantity per order and expected monthly or annual volume",
      "Destination country and port, and preferred Incoterm (EXW, FOB Karachi, CIF, DAP)",
      "Language needs for SDS and carton labels",
      "Application, so dosage and format can be sanity-checked",
      "Documents required: ISO 9001:2015 reference, SDS, COA, DMF-free statement, origin certificate, or buyer-specific paperwork",
    ],
  },
  relatedLinks: [
    { label: "Silica gel manufacturer", href: "/silica-gel-manufacturer" },
    { label: "Silica gel supplier (quote page)", href: "/silica-gel-supplier" },
    { label: "Export hub: all country pages", href: "/export" },
    { label: "Silica gel supplier UAE", href: "/export/uae" },
    { label: "Silica gel supplier USA", href: "/export/usa" },
    { label: "Silica gel supplier UK", href: "/export/uk" },
    { label: "Silica gel supplier Europe", href: "/export/europe" },
    { label: "Silica gel supplier Africa", href: "/export/africa" },
    { label: "Top silica gel suppliers worldwide (guide)", href: "/blog/top-10-silica-gel-suppliers-world-pakistan" },
    { label: "Certifications held and not held", href: "/certifications" },
    { label: "About DryGelWorld", href: "/about" },
    { label: "Indicative pricing", href: "/pricing" },
  ],
  faqs: [
    {
      question: "Is DryGelWorld a global silica gel supplier?",
      answer:
        "Yes. DryGelWorld is a Pakistan-based silica gel manufacturer and exporter, operating in Karachi since 1983 as Kamran Enterprises. It ships sachets, loose beads, bulk desiccants, and container desiccants to importers and packagers worldwide on EXW, FOB Karachi, CIF, and DAP terms, and reports shipments to 190+ countries.",
    },
    {
      question: "Who are the leading silica gel manufacturers in the world?",
      answer:
        "At chemical-major scale: W. R. Grace, Evonik, BASF, and Fuji Silysia produce raw silica. Clariant, Multisorb, Desiccare, WiseSorbent, and Sorbchem India lead converted desiccant formats. DryGelWorld is a regional manufacturer serving mid-size and private-label export programs; the site's top-10 guide compares them transparently.",
    },
    {
      question: "What should I check before choosing a silica gel supplier internationally?",
      answer:
        "The ISO certificate number and registrar (verify it), an SDS and batch COA before ordering, a named production address and Incoterm, a stated list of certifications not held, and per-size pricing in the same format you will buy. A manufacturer answers all five directly.",
    },
    {
      question: "Who supplies silica gel in bulk for export?",
      answer:
        "DryGelWorld supplies loose silica gel beads in 25kg bags and 25g-500g packs from Karachi, quoted per kg or per pallet in USD. Chemical majors supply raw silica by the tonne through distributors; converters like DryGelWorld are the usual source for repackers and distributors buying under container loads.",
    },
    {
      question: "What is the difference between a silica gel manufacturer and a reseller?",
      answer:
        "A manufacturer fills and packs the product at its own facility, issues its own SDS and COA, names its plant address, and states what it does not supply. A reseller sources product and documents from a third party. Ask for a plant visit; the answer settles it.",
    },
    {
      question: "Where can I source silica gel internationally from DryGelWorld?",
      answer:
        "Anywhere reachable from Karachi Port or Port Qasim. Dedicated country pages cover the UAE, Saudi Arabia, Qatar, USA, UK, Germany, France, Europe, India, Bangladesh, Vietnam, Malaysia, Indonesia, Turkey, Russia, Brazil, Mexico, Canada, Australia, and Africa, each with ports, customs codes, MOQ, lead time, and Incoterms.",
    },
    {
      question: "What documents should a silica gel supplier provide?",
      answer:
        "A safety data sheet, a batch certificate of analysis, the ISO 9001 certificate number with registrar, a Certificate of Origin or REX statement for preferential duty, packing list, and commercial invoice. For EU and UK leather programs, a DMF-free statement on manufacturer letterhead. DryGelWorld supplies all of these.",
    },
    {
      question: "What is the MOQ for international orders?",
      answer:
        "Typically from around 100 kg or 100,000 sachets per format, with dry clay from 500 kg. Trial and sample quantities are available before a bulk commitment, and the exact figure is confirmed at quote based on format, print, and destination.",
    },
    {
      question: "Can silica gel be private labelled for export?",
      answer:
        "Yes. Custom-printed sachets with the buyer's logo, warning text in the required languages, and lot codes are produced in Karachi. Printed runs add roughly 5-10 days after artwork approval and carry a higher minimum than plain sachets.",
    },
    {
      question: "Which silica gel is suitable for export packaging?",
      answer:
        "White non-indicating silica gel in breathable sachets is the standard for export cartons; 1g-2g inside unit packs, 5g-10g at carton level, and 1-5kg strips in the container. Use cobalt-free orange indicating gel where a visual saturation check is needed. Avoid cobalt-chloride blue gel for EU and UK destinations.",
    },
    {
      question: "How do I calculate the silica gel quantity I need?",
      answer:
        "Use the Silica Gel Calculator for cartons (volume, target humidity, transit days) and the Container Desiccant Calculator for 20ft/40ft containers (route, season, cargo). Both are free, ungated, and based on the DIN 55474 method; the export desk checks the result before quoting.",
    },
    {
      question: "Does DryGelWorld hold FDA, REACH, or food-contact certification?",
      answer:
        "No. DryGelWorld holds ISO 9001:2015 (certificate 9101225) and issues a DMF-free statement; dry clay ships in FSC-certified packaging. FDA, food-contact, pharma GMP, Halal, and REACH registration are not held, and the certifications page says so. Buyers in those regulated lanes should confirm the requirement before ordering.",
    },
  ],
} satisfies KeywordClusterInput;
