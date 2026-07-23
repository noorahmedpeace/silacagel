export type CaseStudy = {
  slug: string;
  label: string;
  industry: string;
  title: string;
  metaDescription: string;
  image: string;
  context: string;
  challenge: string;
  approach: string;
  proof: string;
  outcome: string;
  /** One measurable, quantified result, the headline number a buyer trusts.
   *  Optional so anonymous cases still render; fill with a real figure. */
  metric?: { value: string; label: string };
  /** Anonymized buyer descriptor, industry (+ region only where the case
   *  actually states it), never a real name. This is the current default until
   *  written permission lets us swap in a named `attribution`. */
  anonymizedRef?: string;
  /** Named attribution (no anonymous "Great supplier!" quotes). Only render
   *  when you have a real, permission-cleared reference. */
  attribution?: { name: string; title: string; company: string; quote?: string };
  products: Array<{ label: string; href: string }>;
  nextLinks: Array<{ label: string; href: string }>;
  faqs: Array<{ q: string; a: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "uae-container-rain-electronics",
    label: "GCC Case",
    industry: "UAE Container Export",
    title: "Sizing container desiccant for a Karachi-Jebel Ali electronics shipment.",
    metaDescription:
      "UAE container case study: sizing cargo desiccant strips for electronics moving Karachi to Jebel Ali, with route humidity, MOQ, Incoterms, SDS, and COA.",
    image: "/applications/export-logistics.webp",
    context:
      "A UAE importer moving boxed electronics on the Karachi-Jebel Ali route needed a defensible container desiccant plan before confirming CIF terms.",
    challenge:
      "The buyer asked only for a strip price, but container size, ~3-5 day transit plus warehouse dwell, Gulf humidity, and electronics sensitivity all changed the real requirement.",
    approach:
      "The RFQ was reframed around 40ft container size, voyage and dwell time, subtropical route humidity, and sensitive-cargo loading - the same inputs as the container desiccant dosage calculator - then matched to MOQ, Incoterms (FOB Karachi / CIF Jebel Ali / DAP UAE), SDS, and COA.",
    proof:
      "The buyer received a documented strip allocation, ceiling-placement guidance, and a clear UAE supply-terms summary (MOQ, lead time, currency) before pricing - the supporting metrics and dated loading photos are added from the buyer's own shipment records.",
    outcome:
      "The conversation moved from a bare strip price to a documented, repeatable UAE container program the importer could reorder against.",
    // Anonymized until written permission lets us name the buyer. No numeric
    // claims are published (the buyer's own records hold the figures).
    anonymizedRef: "Electronics importer · UAE",
    products: [
      { label: "UAE silica gel supplier", href: "/export/uae" },
      { label: "Shipping container desiccant", href: "/shipping-container-desiccant-supplier" },
      { label: "Dosage calculator", href: "/tools/container-desiccant-calculator" },
    ],
    nextLinks: [
      { label: "Container shipping industry", href: "/industries/container-shipping" },
      { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
      { label: "Request UAE container quote", href: "/contact" },
    ],
    faqs: [
      { q: "How was the UAE container dosage estimated?", a: "From container size, voyage and dwell time, Gulf route humidity, and electronics sensitivity - the same factors in the container desiccant dosage calculator - then confirmed by the export desk." },
      { q: "What UAE commercial terms were confirmed before pricing?", a: "MOQ, lead time, currency, and Incoterms (FOB Karachi, CIF Jebel Ali, DAP UAE), plus SDS and COA document support." },
      { q: "Does this case claim specific damage-reduction figures?", a: "No. It describes the planning and RFQ workflow. Quantified results, client names, and loading photos are supplied from the buyer's own shipment records." },
    ],
  },
  {
    slug: "saudi-bulk-silica-gel-supply",
    label: "GCC Case",
    industry: "Saudi Bulk Supply",
    title: "Structuring a recurring bulk silica gel program for a Saudi distributor.",
    metaDescription:
      "Saudi bulk silica gel case study: recurring distributor supply with MOQ, lead time, Jeddah/Dammam routing, Incoterms, SDS, and COA.",
    image: "/applications/warehouse-inventory.webp",
    context:
      "A Saudi distributor wanted predictable, repeatable bulk silica gel supply instead of re-quoting every shipment from scratch.",
    challenge:
      "Volume, destination city, packing format, and document needs shifted between orders, so the distributor needed a fixed MOQ, lead-time, and Incoterm baseline to plan against.",
    approach:
      "DryGelWorld set a recurring template: bulk-bead MOQ, production and Karachi → Jeddah/Dammam transit windows, Incoterms (FOB Karachi / CIF Jeddah / CIF Dammam / DAP Saudi Arabia), SDS, COA, and DMF-free support - so repeat orders only update volume and destination.",
    proof:
      "The distributor compared each new order against one consistent commercial and documentation baseline; pricing and quantity histories come from the buyer's own purchase records.",
    outcome:
      "Repeat RFQs became faster and more predictable, supporting a recurring Saudi distribution relationship rather than one-off transactions.",
    anonymizedRef: "Bulk silica gel distributor · Saudi Arabia",
    products: [
      { label: "Saudi Arabia silica gel supplier", href: "/export/saudi-arabia" },
      { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
      { label: "Silica gel manufacturer", href: "/silica-gel-manufacturer" },
    ],
    nextLinks: [
      { label: "Documents hub", href: "/documentation" },
      { label: "Silica gel SDS & COA guide", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
      { label: "Request Saudi bulk quote", href: "/contact" },
    ],
    faqs: [
      { q: "What is the bulk silica gel MOQ for Saudi Arabia?", a: "Bulk silica gel beads typically start from around 500 kg, with sachet formats from about 100 kg or 100,000 pieces. Trial quantities are available before a recurring commitment." },
      { q: "Which Saudi ports and Incoterms were used?", a: "Jeddah Islamic Port and King Abdulaziz Port Dammam, with FOB Karachi, CIF Jeddah, CIF Dammam, and DAP Saudi Arabia terms available." },
      { q: "How does a recurring supply template help?", a: "A fixed MOQ, lead-time, Incoterm, and document baseline means repeat orders only need volume and destination updates, making quotes faster and more predictable." },
    ],
  },
  {
    slug: "pharmaceutical-packaging-desiccants",
    label: "Case 01",
    industry: "Pharmaceutical Packaging",
    title: "Document-first silica gel planning for healthcare cartons.",
    metaDescription:
      "Anonymous pharma packaging desiccant case study covering silica gel sachets, SDS, COA, document review, packet sizing, and export quote planning.",
    image: "/hero-pharma.webp",
    context:
      "A healthcare packaging buyer needed desiccant support for moisture-sensitive secondary cartons and buyer-side document approval before shipment.",
    challenge:
      "The buying team needed a quote path that did not overclaim pharma compliance, while still giving procurement the SDS, COA, ISO support, packet size, and carton planning details needed for approval.",
    approach:
      "DryGelWorld routed the inquiry through application, packet size, carton exposure, destination, SDS, COA, ISO 9001:2015 support, and buyer-specific document requirements before final quotation.",
    proof:
      "The case used a document-first RFQ checklist: packaging context, moisture risk, packet size, order volume, destination, warning text, SDS, COA, and any buyer-side compliance requirements.",
    outcome:
      "The buyer could compare silica gel formats without unsupported claims and move the internal approval conversation from generic price to documented packaging fit.",
    anonymizedRef: "Pharmaceutical packaging buyer",
    products: [
      { label: "Pharmaceutical desiccant", href: "/pharmaceutical-desiccant" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Documents hub", href: "/documentation" },
    ],
    nextLinks: [
      { label: "Pharma packaging industry page", href: "/industries/pharma-packaging" },
      { label: "White silica gel", href: "/white-silica-gel" },
      { label: "Request pharma quote", href: "/contact" },
    ],
    faqs: [
      { q: "What documents did the pharma buyer request?", a: "The RFQ focused on SDS, COA, ISO 9001:2015 support, product specifications, warning text, and buyer-specific document requirements." },
      { q: "Does this case claim pharma certification?", a: "No. It is written as a document-reviewed packaging case study, not a claim of FDA, DMF, or pharmacopoeia certification." },
      { q: "Which silica gel format was considered?", a: "Small sachets and carton-level packets were considered based on packaging size, product sensitivity, and destination requirements." },
    ],
  },
  {
    slug: "container-export-moisture-protection",
    label: "Case 02",
    industry: "Container Export",
    title: "Planning container desiccant strips before freight pricing.",
    metaDescription:
      "Container export moisture case study covering desiccant strips, route humidity, container rain risk, SDS, COA, and RFQ planning.",
    image: "/applications/export-logistics.webp",
    context:
      "A cargo team needed to evaluate desiccant strips before confirming FOB/CIF terms for long-haul sea freight.",
    challenge:
      "Container size, route, dispatch window, commodity type, and humidity exposure were all affecting the final requirement, but the initial inquiry asked only for a unit price.",
    approach:
      "The RFQ was reframed around 20ft/40ft container size, transit days, cargo type, loading style, strip count direction, Incoterms, destination, SDS, and COA needs.",
    proof:
      "The buyer was guided to share route, port/city, recurring shipment schedule, cargo sensitivity, and documentation requirements before final quotation.",
    outcome:
      "The quote conversation became useful for both technical sizing and freight planning instead of only comparing strip price.",
    anonymizedRef: "Container cargo exporter",
    products: [
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
      { label: "Shipping moisture control", href: "/shipping-container-desiccant-supplier" },
      { label: "Container vs packets", href: "/compare/container-desiccant-vs-silica-gel-packets" },
    ],
    nextLinks: [
      { label: "Container rain guide", href: "/blog/container-rain-prevention" },
      { label: "Container shipping industry", href: "/industries/container-shipping" },
      { label: "Request cargo quote", href: "/contact" },
    ],
    faqs: [
      { q: "What details are needed before quoting container strips?", a: "Container size, route, transit days, cargo type, loading density, destination, strip count target, Incoterms, and document requirements." },
      { q: "Do container strips replace product sachets?", a: "No. Container strips protect the container environment; sachets protect the product or carton." },
      { q: "Why plan before freight pricing?", a: "Moisture protection changes strip count, loading steps, documents, and sometimes Incoterm discussions." },
    ],
  },
  {
    slug: "leather-footwear-export-moisture-control",
    label: "Case 03",
    industry: "Leather / Footwear Export",
    title: "Reducing mold-risk uncertainty before dispatch.",
    metaDescription:
      "Anonymous leather and footwear export case study covering silica gel sachets, container desiccants, route humidity, SDS, COA, and carton moisture planning.",
    image: "/applications/leather-footwear.webp",
    context:
      "A seasonal exporter needed a repeatable moisture control path for cartons moving through humid storage and sea freight.",
    challenge:
      "The team was choosing sachet sizes order by order, which made RFQs slower and created uncertainty around carton-level and container-level protection.",
    approach:
      "The request was structured around carton size, product sensitivity, destination climate, route humidity, packet size, container strip option, and document requirements.",
    proof:
      "The buyer request path emphasized SDS, COA, DMF-free support, MOQ, packing quantity, carton placement, and export route details before price negotiation.",
    outcome:
      "The buyer could send clearer RFQs with size, quantity, route, and document needs aligned before final quotation.",
    anonymizedRef: "Leather & footwear exporter",
    products: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
      { label: "Silica gel for leather export", href: "/blog/silica-gel-for-leather-and-footwear-export" },
    ],
    nextLinks: [
      { label: "Leather industry page", href: "/industries/leather-footwear-export" },
      { label: "Container desiccant vs packets", href: "/compare/container-desiccant-vs-silica-gel-packets" },
      { label: "Request leather export quote", href: "/contact" },
    ],
    faqs: [
      { q: "Why do leather exports need desiccants?", a: "Leather and footwear shipments can face mold, odor, carton softening, and adhesive risk when humidity rises during storage or sea freight." },
      { q: "Should leather exporters use packets or container strips?", a: "Many programs use both: packets for product cartons and strips for the container environment." },
      { q: "What should a leather export RFQ include?", a: "Cargo type, carton size, route, monthly volume, packet size target, destination, and SDS/COA needs." },
    ],
  },
  {
    slug: "electronics-storage-desiccants",
    label: "Case 04",
    industry: "Electronics Storage",
    title: "Moving from guessing to documented pack selection.",
    metaDescription:
      "Anonymous electronics storage desiccant case study covering silica gel packets, non-indicating gel, carton sizing, SDS, COA, and export packaging.",
    image: "/applications/electronics-packaging.webp",
    context:
      "An electronics packaging buyer needed desiccant guidance for boxed components, accessories, and PCB-adjacent shipments.",
    challenge:
      "The purchasing team wanted moisture control guidance without over-ordering or mixing unrelated product formats.",
    approach:
      "DryGelWorld separated unit-level sachets from carton-level protection and routed the buyer toward size, quantity, storage time, destination, and documentation fields.",
    proof:
      "The recommended request included product format, application, shipment destination, SDS/COA needs, sample requirement, and whether non-indicating white gel was preferred.",
    outcome:
      "The buyer had fewer back-and-forth questions before quote and a clearer document checklist for internal approval.",
    anonymizedRef: "Electronics packaging buyer",
    products: [
      { label: "Electronic packaging desiccant", href: "/electronic-packaging-desiccant" },
      { label: "Non-indicating silica gel", href: "/non-indicating-silica-gel" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
    ],
    nextLinks: [
      { label: "Electronics industry page", href: "/industries/electronics-packaging" },
      { label: "Indicating vs non-indicating", href: "/compare/indicating-vs-non-indicating-silica-gel" },
      { label: "Request electronics quote", href: "/contact" },
    ],
    faqs: [
      { q: "Which silica gel is common for electronics?", a: "White non-indicating silica gel packets are common, but the final format depends on product sensitivity, carton size, storage time, and destination." },
      { q: "Do electronics buyers need SDS and COA?", a: "Yes. SDS and COA are common document requests, with additional material statements depending on buyer requirements." },
      { q: "What RFQ details reduce back-and-forth?", a: "Product type, package size, carton volume, storage time, route, quantity, sample needs, and required documents." },
    ],
  },
  {
    slug: "food-packaging-desiccants",
    label: "Case 05",
    industry: "Food Packaging",
    title: "Keeping food-packaging claims tied to documents.",
    metaDescription:
      "Anonymous food packaging desiccant case study covering white silica gel, food-grade claim review, SDS, COA, warning text, and export RFQs.",
    image: "/seo-images/food-packaging-silica-gel-desiccant.webp",
    context:
      "A dry-goods packaging buyer needed a clean desiccant discussion without unsupported food-contact claims.",
    challenge:
      "The buyer wanted food packaging language, but the export desk needed the exact packet material, warning text, destination, and documents clarified before any claim was used.",
    approach:
      "The inquiry was framed around white non-indicating silica gel, packet size, package layer, direct vs indirect contact, SDS, COA, material statements, destination, and label wording.",
    proof:
      "The RFQ checklist separated real document support from marketing wording, reducing the risk of unsupported claims in buyer packaging.",
    outcome:
      "The buyer received a clearer path for packaging review, document approval, and final quote inputs.",
    anonymizedRef: "Food packaging buyer",
    products: [
      { label: "Food grade silica gel supplier", href: "/food-grade-silica-gel-supplier" },
      { label: "White silica gel", href: "/white-silica-gel" },
      { label: "Documents hub", href: "/documentation" },
    ],
    nextLinks: [
      { label: "Food packaging industry", href: "/industries/food-packaging" },
      { label: "White vs orange silica gel", href: "/compare/white-silica-gel-vs-orange-silica-gel" },
      { label: "Request food packaging quote", href: "/contact" },
    ],
    faqs: [
      { q: "Can silica gel be used in food packaging?", a: "Food packaging RFQs can be discussed, but claims must match exact product documents, packet material, contact layer, and destination requirements." },
      { q: "Which gel is usually discussed first?", a: "White non-indicating silica gel is usually the cleaner starting point for food packaging review." },
      { q: "What documents matter?", a: "SDS, COA, material statements, warning text review, and destination-specific requirements matter before claims are approved." },
    ],
  },
  {
    slug: "container-desiccant-success-story",
    label: "Case 06",
    industry: "Container Desiccant Program",
    title: "Building a repeatable cargo-strip RFQ for recurring shipments.",
    metaDescription:
      "Anonymous container desiccant success story covering recurring cargo strip RFQs, 20ft/40ft planning, route humidity, documentation, and export supply.",
    image: "/products/premium-cargo-strips.webp",
    context:
      "A recurring exporter wanted a repeatable desiccant planning process instead of re-quoting each container from scratch.",
    challenge:
      "Shipment volume, route seasonality, container size, cargo mix, and document requests changed often enough that the buyer needed a structured repeat-order framework.",
    approach:
      "DryGelWorld separated base strip planning from route-risk adjustments and documented the recurring RFQ fields: container size, cargo, route, schedule, strip count, Incoterms, SDS, and COA.",
    proof:
      "The repeat template helped the buyer compare new shipments against a consistent technical and commercial baseline.",
    outcome:
      "Future inquiries became faster because the buyer could update only route, volume, destination, and dispatch timing instead of rebuilding the full request.",
    anonymizedRef: "Recurring container exporter",
    products: [
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
      { label: "Shipping container desiccant", href: "/shipping-container-desiccant-supplier" },
      { label: "Container desiccant vs packets", href: "/compare/container-desiccant-vs-silica-gel-packets" },
    ],
    nextLinks: [
      { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
      { label: "Best desiccant for containers", href: "/blog/best-desiccant-for-shipping-containers" },
      { label: "Request repeat shipment quote", href: "/contact" },
    ],
    faqs: [
      { q: "What makes a repeat container RFQ faster?", a: "A stable template for container size, route, cargo type, strip count, Incoterms, destination, schedule, SDS, and COA makes repeat quotes faster." },
      { q: "Should strip count change by season?", a: "It can. Humid seasons, longer transit, dense loads, and tropical routes may require higher strip allocation." },
      { q: "Can one quote template cover multiple destinations?", a: "Yes, but each shipment still needs route, transit days, and destination humidity reviewed before dispatch." },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
