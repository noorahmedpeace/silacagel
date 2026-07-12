// Author / byline registry for E-E-A-T signals on blog posts.
//
// We use a corporate-byline pattern (not invented personas) - each
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
  /** Portrait under /public. Presence of a real person photo + isPerson
      switches the profile schema from Organization to Person/ProfilePage. */
  image?: string;
  isPerson?: boolean;
  sameAs?: string[];
};

export const authors: Author[] = [
  {
    slug: "noor-ahmed-khan",
    name: "Noor Ahmed Khan",
    role: "Owner & Export Director, DryGelWorld (Kamran Enterprises)",
    shortBio:
      "Noor Ahmed Khan owns and runs DryGelWorld, the Karachi silica gel and desiccant manufacturer operating as Kamran Enterprises since 1983, and personally leads its B2B export desk.",
    bio:
      "Noor Ahmed Khan is the owner and export director of DryGelWorld (legal entity: Kamran Enterprises), the Karachi-based silica gel and desiccant manufacturer operating since 1983. He personally handles international RFQs, MOQ and pricing decisions, documentation (ISO 9001:2015 references, SDS, COA, DMF-free statements), and dispatch planning for buyers across 190+ markets - and reviews the buyer guides published on this site against what actually happens in production and export shipments. Editorial scope is limited to products, packaging, and export logistics the company handles directly; regulatory claims are limited to certifications actually held (ISO 9001:2015 and a DMF-free statement).",
    credentials: [
      "Owner & Export Director, DryGelWorld / Kamran Enterprises (manufacturing since 1983)",
      "Runs the B2B export desk serving buyers in 190+ markets",
      "Operates an ISO 9001:2015-certified manufacturing programme",
      "Direct responsibility for SDS, COA, and DMF-free documentation on every shipment",
    ],
    topics: [
      "Silica gel sachet and bulk procurement",
      "Container desiccant for ocean freight",
      "Dry clay desiccant",
      "Private-label packet supply",
      "Export documentation and Incoterms",
    ],
    contactEmail: "noorahmedkhan@drygelworld.com",
    image: "/images/authors/noor-ahmed-khan.jpg",
    isPerson: true,
    sameAs: ["https://www.linkedin.com/in/drygelworld/"],
  },
  {
    slug: "dry-gel-world-export-desk",
    name: "DryGelWorld Export Desk",
    role: "B2B Export Procurement Team, DryGelWorld",
    shortBio:
      "DryGelWorld's export procurement team handles RFQ qualification, format/MOQ sizing, and documentation for industrial silica gel buyers across 190+ markets.",
    bio:
      "The DryGelWorld Export Desk is the buyer-facing team at DryGelWorld, the Karachi-based silica gel and desiccant manufacturer operating since 1983. The team handles RFQ qualification, format and MOQ sizing for international buyers, documentation routing (ISO 9001:2015, SDS, COA, DMF-free statements), and shipment planning across silica gel sachets, container desiccants, bulk silica gel beads, dry clay desiccant, and industrial PPE lines. The desk publishes buyer-intent guides for procurement teams in 190+ countries that import from Karachi. Editorial scope is strictly limited to product, packaging, and export logistics that the desk handles directly. Regulatory claims are limited to certifications actually held, currently ISO 9001:2015 and a DMF-free statement. FDA, REACH-specific food-contact, JEDEC, and pharma DMF certifications are not currently held and are never claimed.",
    credentials: [
      "ISO 9001:2015 certified manufacturer",
      "Manufacturing since 1983, with over four decades of silica gel production",
      "Active export to 190+ countries across Middle East, EU, USA, Africa, and Asia-Pacific",
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

export const defaultAuthorSlug = "noor-ahmed-khan";
