import type { IndustrySolution } from "./site-types";

export const industrySolutions: IndustrySolution[] = [
  {
    slug: "electronics",
    sector: "Electronics",
    heroTitle: "Moisture control for semiconductors, instrumentation, and export electronics",
    summary: "Support corrosion-sensitive electronics with low-dust packet formats, RoHS-oriented documentation, and short-list guidance by package risk and transit window.",
    marketFocus: "High-growth packaging demand tied to semiconductors, batteries, 5G components, and export assemblies.",
    painPoints: [
      "Corrosion and short-circuit risk during storage and transit",
      "Restricted-substance expectations from global OEM supply chains",
      "Need for compact desiccants that do not contaminate precision assemblies",
    ],
    recommendedProducts: ["retail-sachets", "bulk-industrial"],
    requiredCertifications: ["rohs", "reach", "iso-9001"],
    technicalNotes: [
      "Type A silica is preferred where low- to medium-humidity control and compact placement are critical.",
      "Procurement teams typically require rapid access to RoHS and REACH-oriented document packs.",
      "Low-dust packet materials reduce contamination risk around sensors, boards, and connectors.",
    ],
    cta: {
      title: "Build an electronics moisture-control RFQ",
      description: "Qualify packaging size, shipment mode, and document requirements for a faster technical quotation.",
    },
  },
  {
    slug: "pharmaceuticals",
    sector: "Pharmaceuticals",
    heroTitle: "Validated moisture-control options for regulated pharma packaging",
    summary: "Pair cobalt-free indicating sachets with FDA-oriented packet materials and requestable documentation for APIs, diagnostics, and high-scrutiny regulated packaging lines.",
    marketFocus: "Demand led by API stability, diagnostic packaging, and audit-driven supplier qualification.",
    painPoints: [
      "Maintaining API and diagnostic stability under moisture exposure",
      "Supplier qualification requiring document traceability and material clarity",
      "Need for visual saturation control without legacy indicator chemistry concerns",
    ],
    recommendedProducts: ["paper-sachets"],
    requiredCertifications: ["fda-food", "fda-paper", "dmf-free", "cobalt-free"],
    technicalNotes: [
      "Cobalt-free orange indicators support visibility without relying on older cobalt chloride systems.",
      "Structured SDS and TDS access is often required before RFQ approval in regulated buying cycles.",
      "Packet material selection should align with both product sensitivity and reconditioning policy.",
    ],
    cta: {
      title: "Request a pharma documentation pack",
      description: "Start with your audit requirements, formats, and annual demand so the RFQ is qualification-ready.",
    },
  },
  {
    slug: "food-beverage",
    sector: "Food & Beverage",
    heroTitle: "Food-safe moisture protection for shelf-life extension and export readiness",
    summary: "Use food-oriented packet and strip formats to control moisture across snacks, nutraceuticals, dry ingredients, and export packaging without adding friction to buyer audits.",
    marketFocus: "Growing demand for non-toxic desiccants, shelf-life extension, and food-safe export packaging systems.",
    painPoints: [
      "Shelf-life loss from humidity exposure in primary and secondary packaging",
      "Audit pressure for FDA-oriented materials and DMF-free declarations",
      "Different moisture-control needs for line-side packaging versus export containers",
    ],
    recommendedProducts: ["paper-sachets", "container-strips"],
    requiredCertifications: ["fda-food", "dmf-free", "iso-9001"],
    technicalNotes: [
      "Short-format packets suit primary cartons while container strips address long-haul logistics moisture.",
      "Food buyers often require a simple path to FDA-oriented material declarations and technical summaries.",
      "Saturation visibility may be useful during validation, but stable non-indicating formats remain common in production.",
    ],
    cta: {
      title: "Configure a food-packaging inquiry",
      description: "Share product type, carton size, and route duration to align the desiccant format with shelf-life goals.",
    },
  },
  {
    slug: "industrial-refining",
    sector: "Industrial / Refining",
    heroTitle: "High-capacity desiccant supply for warehouses, process rooms, and refining support",
    summary: "Support large-format industrial programs with bulk beads and cargo protection formats designed for warehouses, process environments, and heavy logistics.",
    marketFocus: "Project-led demand driven by plant storage, logistics risk, and process-support moisture management.",
    painPoints: [
      "Large moisture loads in warehouses, cabinets, and transit packaging",
      "Need for high-capacity formats and regeneration-aware planning",
      "Project procurement requiring staged delivery and document support",
    ],
    recommendedProducts: ["bulk-industrial", "container-strips"],
    requiredCertifications: ["iso-9001", "iso-14001", "reach"],
    technicalNotes: [
      "Bulk formats are suitable where refill, regeneration, or large-footprint adsorption programs are needed.",
      "Container strips complement industrial supply chains exposed to long transit and condensation cycles.",
      "RFQs should capture project scale, storage conditions, and dispatch rhythm to produce a useful recommendation.",
    ],
    cta: {
      title: "Start an industrial project RFQ",
      description: "Share process environment, footprint, and annual requirement for project-scale desiccant planning.",
    },
  },
];

export function getSolutionBySlug(slug: string) {
  return industrySolutions.find((solution) => solution.slug === slug);
}
