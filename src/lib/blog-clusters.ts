// Per-blog topical-cluster cross-links. Each blog slug points to related
// guides, related products, and (where relevant) the dedicated comparison
// landing page. Builds entity-based internal linking so Google can map
// the topical authority cluster around silica gel + container desiccant
// + industrial PPE.

export type ClusterLink = { label: string; href: string };

export type BlogCluster = {
  guides: ClusterLink[];
  products: ClusterLink[];
  compare?: ClusterLink;
  industry?: ClusterLink;
};

const PRODUCT_RETAIL: ClusterLink = { label: "Retail silica gel sachets", href: "/products/retail-sachets" };
const PRODUCT_PAPER: ClusterLink = { label: "Paper silica gel sachets", href: "/products/paper-sachets" };
const PRODUCT_BULK: ClusterLink = { label: "Bulk silica gel beads", href: "/products/bulk-industrial" };
const PRODUCT_CONTAINER: ClusterLink = { label: "Container desiccant strips", href: "/products/container-strips" };
const PRODUCT_CLAY: ClusterLink = { label: "Dry clay desiccant", href: "/products/dry-clay-desiccant" };
const PRODUCT_HAIRNET: ClusterLink = { label: "Bouffant hair nets", href: "/products/hair-nets" };
const PRODUCT_BEARD: ClusterLink = { label: "Beard covers", href: "/products/beard-covers" };

const COMPARE_CLAY: ClusterLink = { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" };
const COMPARE_SIEVE: ClusterLink = { label: "Silica gel vs molecular sieve", href: "/compare/silica-gel-vs-molecular-sieve" };
const COMPARE_O2: ClusterLink = { label: "Silica gel vs oxygen absorber", href: "/compare/silica-gel-vs-oxygen-absorber" };

const IND_PHARMA: ClusterLink = { label: "Pharma packaging", href: "/industries/pharma-packaging" };
const IND_ELECTRONICS: ClusterLink = { label: "Electronics packaging", href: "/industries/electronics-packaging" };
const IND_LEATHER: ClusterLink = { label: "Leather and footwear export", href: "/industries/leather-footwear-export" };
const IND_FOOD: ClusterLink = { label: "Food packaging", href: "/industries/food-packaging" };
const IND_TEXTILE: ClusterLink = { label: "Textile and garment export", href: "/industries/textile-garment-export" };
const IND_SHIPPING: ClusterLink = { label: "Container shipping", href: "/industries/container-shipping" };

const guide = (slug: string, label: string): ClusterLink => ({ label, href: `/blog/${slug}` });

export const blogClusters: Record<string, BlogCluster> = {
  "how-to-choose-silica-gel-packet-size": {
    guides: [
      guide("what-is-silica-gel-and-how-does-it-work", "What is silica gel and how it works"),
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
      guide("desiccant-for-electronics-packaging", "Desiccant for electronics packaging"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER, PRODUCT_BULK],
  },
  "silica-gel-vs-clay-desiccant": {
    guides: [
      guide("silica-gel-vs-molecular-sieve-vs-activated-alumina", "Silica gel vs molecular sieve vs activated alumina"),
      guide("container-desiccant-vs-silica-gel", "Container desiccant vs silica gel"),
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
    ],
    products: [PRODUCT_CLAY, PRODUCT_BULK],
    compare: COMPARE_CLAY,
  },
  "container-rain-prevention": {
    guides: [
      guide("best-desiccant-for-shipping-containers", "Best desiccant for shipping containers"),
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
      guide("moisture-protection-for-international-shipping", "Moisture protection for international shipping"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    industry: IND_SHIPPING,
  },
  "desiccant-for-electronics-packaging": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER],
    industry: IND_ELECTRONICS,
  },
  "can-you-reuse-silica-gel": {
    guides: [
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
      guide("reusable-vs-disposable-desiccants", "Reusable vs disposable desiccants"),
    ],
    products: [PRODUCT_BULK],
  },
  "what-is-silica-gel-and-how-does-it-work": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant"),
      guide("how-silica-gel-is-made-manufacturing-process", "How silica gel is made"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER, PRODUCT_BULK],
  },
  "silica-gel-vs-molecular-sieve-vs-activated-alumina": {
    guides: [
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant"),
      guide("oxygen-absorber-vs-silica-gel-when-to-use-each", "Oxygen absorber vs silica gel"),
    ],
    products: [PRODUCT_BULK],
    compare: COMPARE_SIEVE,
  },
  "how-to-prevent-moisture-in-export-cartons": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("container-rain-prevention", "Container rain prevention"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_CONTAINER],
  },
  "silica-gel-sds-coa-requirements-for-buyers": {
    guides: [
      guide("silica-gel-for-pharma-packaging-buyer-guide", "Silica gel for pharma packaging"),
      guide("food-grade-silica-gel-procurement-guide", "Food-grade silica gel procurement"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_BULK],
  },
  "private-label-silica-gel-packets-guide": {
    guides: [
      guide("bulk-silica-gel-supplier-checklist", "Bulk silica gel supplier checklist"),
      guide("silica-gel-bulk-pricing-factors-for-exporters", "What drives silica gel bulk pricing"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_RETAIL],
  },
  "bulk-silica-gel-supplier-checklist": {
    guides: [
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("silica-gel-bulk-pricing-factors-for-exporters", "What drives silica gel bulk pricing"),
      guide("silica-gel-import-customs-hs-code-guide", "Silica gel HS code and import customs guide"),
    ],
    products: [PRODUCT_BULK, PRODUCT_CONTAINER],
  },
  "why-hair-nets-matter-in-food-export": {
    guides: [
      guide("ppe-products-for-factories", "PPE products for factories"),
      guide("importance-of-beard-covers-in-manufacturing", "Importance of beard covers in manufacturing"),
    ],
    products: [PRODUCT_HAIRNET, PRODUCT_BEARD],
    industry: IND_FOOD,
  },
  "best-desiccant-for-shipping-containers": {
    guides: [
      guide("container-rain-prevention", "Container rain prevention"),
      guide("container-desiccant-vs-silica-gel", "Container desiccant vs silica gel"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    industry: IND_SHIPPING,
  },
  "ppe-products-for-factories": {
    guides: [
      guide("why-hair-nets-matter-in-food-export", "Why hair nets matter in food export"),
      guide("importance-of-beard-covers-in-manufacturing", "Importance of beard covers in manufacturing"),
    ],
    products: [PRODUCT_HAIRNET, PRODUCT_BEARD],
    industry: IND_FOOD,
  },
  "importance-of-beard-covers-in-manufacturing": {
    guides: [
      guide("why-hair-nets-matter-in-food-export", "Why hair nets matter in food export"),
      guide("ppe-products-for-factories", "PPE products for factories"),
    ],
    products: [PRODUCT_BEARD, PRODUCT_HAIRNET],
  },
  "moisture-protection-for-international-shipping": {
    guides: [
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
      guide("container-rain-prevention", "Container rain prevention"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
  },
  "industrial-packaging-protection-solutions": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER, PRODUCT_BULK],
    industry: IND_TEXTILE,
  },
  "container-desiccant-vs-silica-gel": {
    guides: [
      guide("best-desiccant-for-shipping-containers", "Best desiccant for shipping containers"),
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
  },
  "reusable-vs-disposable-desiccants": {
    guides: [
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel"),
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
    ],
    products: [PRODUCT_BULK],
  },
  "how-long-does-silica-gel-last": {
    guides: [
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel"),
      guide("reusable-vs-disposable-desiccants", "Reusable vs disposable desiccants"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_BULK],
  },
  "how-exporters-protect-cargo-from-humidity": {
    guides: [
      guide("moisture-protection-for-international-shipping", "Moisture protection for international shipping"),
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_PAPER],
  },
  "silica-gel-for-pharma-packaging-buyer-guide": {
    guides: [
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("food-grade-silica-gel-procurement-guide", "Food-grade silica gel procurement"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_BULK],
    industry: IND_PHARMA,
  },
  "indicating-silica-gel-orange-blue-color-change-guide": {
    guides: [
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel"),
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
    ],
    products: [PRODUCT_BULK],
  },
  "oxygen-absorber-vs-silica-gel-when-to-use-each": {
    guides: [
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant"),
      guide("silica-gel-vs-molecular-sieve-vs-activated-alumina", "Silica gel vs molecular sieve vs activated alumina"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER],
    compare: COMPARE_O2,
  },
  "food-grade-silica-gel-procurement-guide": {
    guides: [
      guide("why-hair-nets-matter-in-food-export", "Why hair nets matter in food export"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_RETAIL],
    industry: IND_FOOD,
  },
  "silica-gel-bulk-pricing-factors-for-exporters": {
    guides: [
      guide("bulk-silica-gel-supplier-checklist", "Bulk silica gel supplier checklist"),
      guide("private-label-silica-gel-packets-guide", "Private-label silica gel packets guide"),
    ],
    products: [PRODUCT_BULK, PRODUCT_PAPER],
  },
  "silica-gel-for-leather-and-footwear-export": {
    guides: [
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
      guide("container-rain-prevention", "Container rain prevention"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_CONTAINER],
    industry: IND_LEATHER,
  },
  "silica-gel-import-customs-hs-code-guide": {
    guides: [
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
      guide("bulk-silica-gel-supplier-checklist", "Bulk silica gel supplier checklist"),
    ],
    products: [PRODUCT_BULK, PRODUCT_PAPER, PRODUCT_CONTAINER],
  },
  "how-silica-gel-is-made-manufacturing-process": {
    guides: [
      guide("what-is-silica-gel-and-how-does-it-work", "What is silica gel and how it works"),
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant"),
      guide("indicating-silica-gel-orange-blue-color-change-guide", "Indicating silica gel color change guide"),
    ],
    products: [PRODUCT_BULK, PRODUCT_PAPER],
  },
};

export function getBlogCluster(slug: string): BlogCluster {
  return (
    blogClusters[slug] ?? {
      guides: [
        guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
        guide("what-is-silica-gel-and-how-does-it-work", "What is silica gel and how it works"),
      ],
      products: [PRODUCT_RETAIL, PRODUCT_BULK, PRODUCT_CONTAINER],
    }
  );
}
