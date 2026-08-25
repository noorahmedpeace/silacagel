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
  // Sizing tool or calculator matching the article's topic
  tool?: ClusterLink;
  // Commercial "supplier" landing page for the blog's topic. Renders in the
  // buyer-decision column so informational articles hand the reader a
  // converting page (RFQ/quote) without changing the article body.
  commercial?: ClusterLink;
  // Region-specific supplier page, for the one article whose crawl weight is
  // worth pointing at a country query. Kept separate from `commercial` on
  // purpose: that slot was deliberately given a page that reads
  // internationally, and this one deliberately does not.
  regional?: ClusterLink;
};

const PRODUCT_RETAIL: ClusterLink = { label: "Retail silica gel sachets", href: "/products/retail-sachets" };
const PRODUCT_PAPER: ClusterLink = { label: "Paper silica gel sachets", href: "/products/paper-sachets" };
const PRODUCT_BULK: ClusterLink = { label: "Bulk silica gel beads", href: "/products/bulk-industrial" };
const PRODUCT_CONTAINER: ClusterLink = { label: "Container strips (product)", href: "/products/container-strips" };
const PRODUCT_CLAY: ClusterLink = { label: "Dry clay desiccant", href: "/products/dry-clay-desiccant" };
const PRODUCT_HAIRNET: ClusterLink = { label: "Bouffant hair nets", href: "/products/hair-nets" };
const PRODUCT_BEARD: ClusterLink = { label: "Beard covers", href: "/products/beard-covers" };

const COMPARE_CLAY: ClusterLink = { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" };
const COMPARE_SIEVE: ClusterLink = { label: "Silica gel vs molecular sieve", href: "/compare/silica-gel-vs-molecular-sieve" };
const COMPARE_O2: ClusterLink = { label: "Silica gel vs oxygen absorber", href: "/compare/silica-gel-vs-oxygen-absorber" };
const COMPARE_3WAY: ClusterLink = { label: "Silica gel vs clay vs molecular sieve", href: "/compare/silica-gel-vs-clay-vs-molecular-sieve" };

// Standalone guide (not a /blog/ slug): the container/carton quantity walkthrough.
const GUIDE_QUANTITY: ClusterLink = { label: "Desiccant quantity guide", href: "/guides/desiccant-quantity-guide" };

// Interactive sizing calculators
const TOOL_CONTAINER: ClusterLink = { label: "Container desiccant calculator", href: "/tools/container-desiccant-calculator" };
const TOOL_SACHET: ClusterLink = { label: "Silica gel calculator", href: "/tools/silica-gel-calculator" };
const TOOL_DIN: ClusterLink = { label: "DIN 55473 unit calculator", href: "/tools/desiccant-unit-calculator" };

const IND_PHARMA: ClusterLink = { label: "Pharma packaging", href: "/industries/pharma-packaging" };
const IND_ELECTRONICS: ClusterLink = { label: "Electronics packaging", href: "/industries/electronics-packaging" };
const IND_LEATHER: ClusterLink = { label: "Leather and footwear export", href: "/industries/leather-footwear-export" };
const IND_FOOD: ClusterLink = { label: "Food packaging", href: "/industries/food-packaging" };
const IND_TEXTILE: ClusterLink = { label: "Textile and garment export", href: "/industries/textile-garment-export" };
const IND_SHIPPING: ClusterLink = { label: "Container shipping", href: "/industries/container-shipping" };

// Commercial supplier landing pages (converting RFQ pages), linked from the
// topically-matched informational blogs that previously had no path to them.
const COMMERCIAL_CONTAINER: ClusterLink = { label: "Shipping container desiccant supplier", href: "/shipping-container-desiccant-supplier" };
const COMMERCIAL_CLAY: ClusterLink = { label: "Activated clay desiccant supplier", href: "/clay-desiccant-supplier" };
// Deliberately NOT a packet-specific slug. /silica-gel-packets is written for
// the domestic market (Karachi pickup, PKR pricing) while these articles are
// read worldwide, and every packet-named alternative - packets-wholesale,
// packets-manufacturer - 301s straight to it (next.config.ts:185-192). This is
// the nearest destination that both resolves directly and reads internationally.
const COMMERCIAL_BUY: ClusterLink = { label: "Buy silica gel", href: "/buy-silica-gel" };
const COMMERCIAL_PACKETS: ClusterLink = { label: "Silica gel supplier", href: "/silica-gel-supplier" };
const COMMERCIAL_EXPORT: ClusterLink = { label: "Industrial desiccant supplier", href: "/industrial-desiccant-supplier" };

const guide = (slug: string, label: string): ClusterLink => ({ label, href: `/blog/${slug}` });

export const blogClusters: Record<string, BlogCluster> = {
  "how-to-choose-silica-gel-packet-size": {
    guides: [
      guide("what-is-silica-gel-and-how-does-it-work", "What is silica gel and how it works"),
      guide("how-many-desiccant-packets-per-box-calculation-guide", "How many desiccant packets per box"),
      guide("desiccant-units-explained-din-55473-and-unit-sizing", "Desiccant units explained (DIN 55473)"),
      guide("desiccant-for-electronics-packaging", "Desiccant for electronics packaging"),
      // Both of these guides answer "how much gel" for a specific enclosure,
      // which is the same question this page asks in the general case.
      guide("silica-gel-for-3d-printer-filament-storage", "Silica gel for 3D printer filament"),
      guide("silica-gel-for-gun-safe-moisture-control", "Silica gel for gun safe moisture control"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER, PRODUCT_BULK],
    tool: TOOL_SACHET,
    commercial: COMMERCIAL_BUY,
  },
  "silica-gel-vs-clay-desiccant": {
    guides: [
      guide("silica-gel-vs-molecular-sieve-vs-activated-alumina", "Silica gel vs molecular sieve vs activated alumina"),
      guide("container-desiccant-vs-silica-gel", "Container desiccant vs silica gel"),
      guide("calcium-chloride-vs-silica-gel-desiccant", "Calcium chloride vs silica gel"),
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
    ],
    products: [PRODUCT_CLAY, PRODUCT_BULK],
    compare: COMPARE_CLAY,
    tool: TOOL_DIN,
    commercial: COMMERCIAL_CLAY,
  },
  "calcium-chloride-vs-silica-gel-desiccant": {
    guides: [
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant"),
      guide("container-desiccant-vs-silica-gel", "Container desiccant vs silica gel"),
      guide("best-desiccant-for-shipping-containers", "Best desiccant for shipping containers"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    compare: COMPARE_CLAY,
    industry: IND_SHIPPING,
    tool: TOOL_CONTAINER,
    commercial: COMMERCIAL_CONTAINER,
  },
  "container-rain-prevention": {
    guides: [
      GUIDE_QUANTITY,
      guide("best-desiccant-for-shipping-containers", "Best desiccant for shipping containers"),
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
      guide("moisture-protection-for-international-shipping", "Moisture protection for international shipping"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    industry: IND_SHIPPING,
    tool: TOOL_CONTAINER,
    commercial: COMMERCIAL_CONTAINER,
  },
  "desiccant-for-electronics-packaging": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("paper-vs-tyvek-vs-film-desiccant-sachet-materials", "Paper vs Tyvek vs film sachet materials"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER],
    industry: IND_ELECTRONICS,
    tool: TOOL_DIN,
  },
  "can-you-reuse-silica-gel": {
    guides: [
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
      guide("reusable-vs-disposable-desiccants", "Reusable vs disposable desiccants"),
      guide("how-to-regenerate-silica-gel-oven-temperature-guide", "How to regenerate silica gel (oven guide)"),
      // The two applications where the same gel is dried out and used again on a
      // cycle, which is exactly what this reader is asking about.
      guide("how-to-dry-flowers-with-silica-gel", "Drying flowers with silica gel"),
      guide("silica-gel-for-3d-printer-filament-storage", "Silica gel for 3D printer filament"),
    ],
    products: [PRODUCT_BULK],
    commercial: COMMERCIAL_BUY,
  },
  "what-is-silica-gel-and-how-does-it-work": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant guide"),
      guide("how-silica-gel-is-made-manufacturing-process", "How silica gel is made"),
      guide("relative-humidity-and-adsorption-isotherms-explained", "Relative humidity and adsorption isotherms"),
      guide("is-silica-gel-toxic-safety-guide", "Is silica gel toxic? Safety guide"),
      // Someone who searched "what is a silica gel packet" has just learned what
      // the object is; the next question is what to do with it. Two everyday
      // uses, not all four - this list is fundamentals first.
      guide("how-to-dry-flowers-with-silica-gel", "Drying flowers with silica gel"),
      guide("silica-gel-for-camera-gear-and-lenses", "Silica gel for camera gear and lenses"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER, PRODUCT_BULK],
    // Highest-impression page on the site and the only one of its size with no
    // commercial destination at all. The audience is mostly curiosity, so this
    // is a quiet "if you actually buy these" path rather than a hard sell.
    commercial: COMMERCIAL_PACKETS,
    // This article carries roughly 72% of the site's impressions - the only
    // page with real crawl weight to pass on. Until now the Pakistan supplier
    // page's 211 inbound links were all the same footer entry, which Google
    // discounts as boilerplate; this is its first link from inside content.
    regional: { label: "Silica gel supplier in Pakistan", href: "/silica-gel-manufacturer-pakistan" },
  },
  // Consumer application guides. The reader arrived with a packet in a shoebox
  // or a spool in a bag, not a purchase order, so these point at the retail and
  // bulk product pages and at the reuse guide they will want next - not at an
  // export supplier page, which would be a mismatch of intent.
  "how-to-dry-flowers-with-silica-gel": {
    guides: [
      guide("how-to-regenerate-silica-gel-oven-temperature-guide", "How to regenerate silica gel"),
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel?"),
      guide("is-silica-gel-toxic-safety-guide", "Is silica gel toxic? Safety guide"),
    ],
    products: [PRODUCT_BULK, PRODUCT_RETAIL],
  },
  "silica-gel-for-3d-printer-filament-storage": {
    guides: [
      guide("how-to-regenerate-silica-gel-oven-temperature-guide", "How to regenerate silica gel"),
      guide("cobalt-free-orange-vs-blue-indicating-silica-gel-safety", "Orange vs blue indicating gel"),
      guide("what-is-silica-gel-and-how-does-it-work", "What is a silica gel packet?"),
    ],
    products: [PRODUCT_BULK, PRODUCT_RETAIL],
  },
  "silica-gel-for-camera-gear-and-lenses": {
    guides: [
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel?"),
      guide("cobalt-free-orange-vs-blue-indicating-silica-gel-safety", "Orange vs blue indicating gel"),
      guide("how-to-regenerate-silica-gel-oven-temperature-guide", "How to regenerate silica gel"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_BULK],
  },
  "silica-gel-for-gun-safe-moisture-control": {
    guides: [
      guide("how-to-regenerate-silica-gel-oven-temperature-guide", "How to regenerate silica gel"),
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel?"),
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
    ],
    products: [PRODUCT_BULK, PRODUCT_RETAIL],
  },
  "silica-gel-vs-molecular-sieve-vs-activated-alumina": {
    guides: [
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant guide"),
      guide("oxygen-absorber-vs-silica-gel-when-to-use-each", "Oxygen absorber vs silica gel"),
    ],
    products: [PRODUCT_BULK],
    // The three-way compare page is the exact commercial twin of this
    // three-way article; the two-way sieve page keeps its inlink from
    // the clay/calcium clusters.
    compare: COMPARE_3WAY,
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
      GUIDE_QUANTITY,
      guide("container-rain-prevention", "Container rain prevention"),
      guide("container-desiccant-vs-silica-gel", "Container desiccant vs silica gel"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    industry: IND_SHIPPING,
    commercial: COMMERCIAL_CONTAINER,
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
      GUIDE_QUANTITY,
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
      guide("container-rain-prevention", "Container rain prevention"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    commercial: COMMERCIAL_CONTAINER,
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
      GUIDE_QUANTITY,
      guide("best-desiccant-for-shipping-containers", "Best desiccant for shipping containers"),
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant guide"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_BULK],
    commercial: COMMERCIAL_CONTAINER,
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
      GUIDE_QUANTITY,
      guide("moisture-protection-for-international-shipping", "Moisture protection for international shipping"),
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
    ],
    products: [PRODUCT_CONTAINER, PRODUCT_PAPER],
    commercial: COMMERCIAL_CONTAINER,
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
      guide("cobalt-free-orange-vs-blue-indicating-silica-gel-safety", "Cobalt-free orange vs blue: the REACH safety question"),
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel"),
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
    ],
    products: [PRODUCT_BULK],
  },
  "oxygen-absorber-vs-silica-gel-when-to-use-each": {
    guides: [
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant guide"),
      guide("silica-gel-vs-molecular-sieve-vs-activated-alumina", "Silica gel vs molecular sieve vs activated alumina"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER],
    compare: COMPARE_O2,
  },
  "food-grade-silica-gel-procurement-guide": {
    guides: [
      guide("why-hair-nets-matter-in-food-export", "Why hair nets matter in food export"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("is-silica-gel-toxic-safety-guide", "Is silica gel toxic? Safety guide"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_RETAIL],
    industry: IND_FOOD,
  },
  "is-silica-gel-toxic-safety-guide": {
    guides: [
      guide("food-grade-silica-gel-procurement-guide", "Food-grade silica gel procurement guide"),
      guide("cobalt-free-orange-vs-blue-indicating-silica-gel-safety", "Orange vs blue: the safety question"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_RETAIL],
    commercial: COMMERCIAL_BUY,
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
      guide("silica-gel-export-documentation-coo-coa-packing-list", "Export documentation: COO, COA, packing list"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
    ],
    products: [PRODUCT_BULK, PRODUCT_PAPER, PRODUCT_CONTAINER],
    // Anyone reading a customs and HS-code guide is importing for a business,
    // which makes this the highest-intent informational audience on the site.
    commercial: COMMERCIAL_EXPORT,
  },
  "how-silica-gel-is-made-manufacturing-process": {
    guides: [
      guide("what-is-silica-gel-and-how-does-it-work", "What is silica gel and how it works"),
      guide("silica-gel-vs-clay-desiccant", "Silica gel vs clay desiccant guide"),
      guide("indicating-silica-gel-orange-blue-color-change-guide", "Indicating silica gel color change guide"),
    ],
    products: [PRODUCT_BULK, PRODUCT_PAPER],
  },
  "relative-humidity-and-adsorption-isotherms-explained": {
    guides: [
      guide("what-is-silica-gel-and-how-does-it-work", "What is silica gel and how it works"),
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("desiccant-units-explained-din-55473-and-unit-sizing", "Desiccant units explained (DIN 55473)"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_BULK],
    // Equilibrium-RH endpoints are exactly what this article explains, and
    // exactly what separates sieve from gel - the natural home for the
    // two-way sieve inlink the alumina cluster handed to the three-way page.
    compare: COMPARE_SIEVE,
  },
  "desiccant-units-explained-din-55473-and-unit-sizing": {
    guides: [
      GUIDE_QUANTITY,
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("how-many-desiccant-packets-per-box-calculation-guide", "How many desiccant packets per box"),
      guide("relative-humidity-and-adsorption-isotherms-explained", "Relative humidity and adsorption isotherms"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_CONTAINER],
  },
  "how-many-desiccant-packets-per-box-calculation-guide": {
    guides: [
      GUIDE_QUANTITY,
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("desiccant-placement-best-practices-in-packaging", "Desiccant placement best practices"),
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER],
    commercial: COMMERCIAL_BUY,
  },
  "desiccant-placement-best-practices-in-packaging": {
    guides: [
      guide("how-many-desiccant-packets-per-box-calculation-guide", "How many desiccant packets per box"),
      guide("best-desiccant-for-shipping-containers", "Best desiccant for shipping containers"),
      guide("how-to-prevent-moisture-in-export-cartons", "Preventing moisture in export cartons"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_CONTAINER],
    industry: IND_SHIPPING,
  },
  "how-to-regenerate-silica-gel-oven-temperature-guide": {
    guides: [
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel"),
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
      guide("reusable-vs-disposable-desiccants", "Reusable vs disposable desiccants"),
      // Long-term storage cases: the gel sits in place for months and gets baked
      // when it saturates, which is why this reader is here.
      guide("silica-gel-for-camera-gear-and-lenses", "Silica gel for camera gear and lenses"),
      guide("silica-gel-for-gun-safe-moisture-control", "Silica gel for gun safe moisture control"),
    ],
    products: [PRODUCT_BULK],
    commercial: COMMERCIAL_BUY,
  },
  "cobalt-free-orange-vs-blue-indicating-silica-gel-safety": {
    guides: [
      guide("indicating-silica-gel-orange-blue-color-change-guide", "Indicating silica gel color change guide"),
      guide("silica-gel-colors-white-blue-orange-explained", "Silica gel colors explained"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
    ],
    products: [PRODUCT_BULK, PRODUCT_PAPER],
    compare: { label: "Indicating vs non-indicating silica gel", href: "/compare/indicating-vs-non-indicating-silica-gel" },
  },
  "paper-vs-tyvek-vs-film-desiccant-sachet-materials": {
    guides: [
      guide("how-to-choose-silica-gel-packet-size", "How to choose silica gel packet size"),
      guide("desiccant-for-electronics-packaging", "Desiccant for electronics packaging"),
      guide("silica-gel-for-pharma-packaging-buyer-guide", "Silica gel for pharma packaging"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_RETAIL],
  },
  "silica-gel-export-documentation-coo-coa-packing-list": {
    guides: [
      guide("silica-gel-import-customs-hs-code-guide", "Silica gel HS code and import customs guide"),
      guide("silica-gel-sds-coa-requirements-for-buyers", "SDS and COA requirements for buyers"),
      guide("how-exporters-protect-cargo-from-humidity", "How exporters protect cargo from humidity"),
    ],
    products: [PRODUCT_BULK, PRODUCT_CONTAINER, PRODUCT_PAPER],
  },
  // PRIORITY.md #44: these 4 articles had no cluster entry and fell through
  // to the generic two-link fallback regardless of topic. Added below with
  // topically-matched cross-links (verified against existing blog slugs).
  "top-10-silica-gel-suppliers-world-pakistan": {
    guides: [
      guide("how-silica-gel-is-made-manufacturing-process", "How silica gel is made"),
      guide("silica-gel-bulk-pricing-factors-for-exporters", "Silica gel bulk pricing factors"),
      guide("bulk-silica-gel-supplier-checklist", "Bulk silica gel supplier checklist"),
    ],
    products: [PRODUCT_BULK, PRODUCT_RETAIL],
  },
  "silica-gel-colors-white-blue-orange-explained": {
    guides: [
      guide("indicating-silica-gel-orange-blue-color-change-guide", "Indicating silica gel color-change guide"),
      guide("cobalt-free-orange-vs-blue-indicating-silica-gel-safety", "Cobalt-free orange vs blue indicating gel"),
    ],
    products: [PRODUCT_RETAIL, PRODUCT_PAPER],
    compare: { label: "Indicating vs non-indicating silica gel", href: "/compare/indicating-vs-non-indicating-silica-gel" },
  },
  "silica-gel-shelf-life-and-storage-guide": {
    guides: [
      guide("how-long-does-silica-gel-last", "How long does silica gel last"),
      guide("can-you-reuse-silica-gel", "Can you reuse silica gel"),
      guide("how-to-regenerate-silica-gel-oven-temperature-guide", "How to regenerate silica gel"),
    ],
    products: [PRODUCT_BULK, PRODUCT_RETAIL],
  },
  "silica-gel-for-rice-grain-spice-export": {
    guides: [
      guide("food-grade-silica-gel-procurement-guide", "Food-grade silica gel procurement guide"),
      guide("how-to-prevent-moisture-in-export-cartons", "How to prevent moisture in export cartons"),
    ],
    products: [PRODUCT_PAPER, PRODUCT_RETAIL],
    compare: COMPARE_O2,
    industry: IND_FOOD,
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
