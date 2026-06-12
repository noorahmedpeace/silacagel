// Author / byline registry for E-E-A-T signals on blog posts.
//
// We use a corporate-byline pattern (not invented personas) — each
// author is a real organisational role at Kamran Enterprises /
// DryGelWorld. This is the honest, audit-defensible alternative to
// inventing "John Smith, Senior Silica Gel Engineer" personas.

export type Author = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  bio: string;
  credentials: string[];
  topics: string[];
  contactEmail: string;
};

export const authors: Author[] = [
  {
    slug: "dry-gel-world-export-desk",
    name: "DryGelWorld Export Desk",
    role: "B2B Export Procurement Team — DryGelWorld",
    shortBio:
      "DryGelWorld's export procurement team handles RFQ qualification, format/MOQ sizing, and documentation for industrial silica gel buyers across 60+ markets.",
    bio:
      "The DryGelWorld Export Desk is the buyer-facing team at DryGelWorld, the Karachi-based silica gel and desiccant manufacturer operating since 1983. The team handles RFQ qualification, format and MOQ sizing for international buyers, documentation routing (ISO 9001:2015, SDS, COA, DMF-free statements), and shipment planning across silica gel sachets, container desiccants, bulk silica gel beads, dry clay desiccant, and industrial PPE lines. The desk publishes buyer-intent guides for procurement teams in 60+ countries that import from Karachi. Editorial scope is strictly limited to product, packaging, and export logistics that the desk handles directly — regulatory claims are limited to certifications actually held (currently ISO 9001:2015 + DMF-free statement). FDA, REACH-specific food-contact, JEDEC, and pharma DMF certifications are explicitly NOT held and never claimed.",
    credentials: [
      "ISO 9001:2015 certified manufacturer",
      "Manufacturing since 1983 — over four decades of silica gel production",
      "Active export to 60+ countries across Middle East, EU, USA, Africa, and Asia-Pacific",
      "DMF-free statement available per shipment",
      "SDS and COA documentation per export shipment",
    ],
    topics: [
      "Silica gel sachet and bulk procurement",
      "Container desiccant for ocean freight",
      "Dry clay desiccant",
      "Private-label packet supply",
      "Export documentation and Incoterms",
      "Industrial PPE (hair nets, beard covers)",
    ],
    contactEmail: "export@drygelworld.com",
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export const defaultAuthorSlug = "dry-gel-world-export-desk";
