export type SupplierComparisonRow = {
  criterion: string;
  competitor: string;
  drygelworld: string;
};

export type SupplierComparison = {
  slug: string;
  name: string;
  url: string;
  region: string;
  category: string;
  bestFor: string;
  summary: string;
  dryGelWorldStrengths: string[];
  competitorStrengths: string[];
  improvementPriorities: string[];
  confidence: "high" | "medium" | "limited";
  rows: SupplierComparisonRow[];
};

// Public-page comparison only. This is not an endorsement, market-share
// ranking, or claim that one supplier is universally better.
export const supplierComparisons: SupplierComparison[] = [
  {
    slug: "drygelworld-vs-clariant",
    name: "Clariant",
    url: "https://www.clariant.com/en/Corporate",
    region: "Switzerland / global",
    category: "Specialty chemicals and industrial moisture solutions",
    bestFor: "Large specialty-chemical procurement programs and industry-specific solutions",
    summary: "Clariant presents a broad specialty-chemicals portfolio, product and industry navigation, an SDS/document finder, and a public desiccants use case for automotive assembly shipments.",
    dryGelWorldStrengths: [
      "Finished silica gel sachets, beads, and container strips in one RFQ path",
      "Export-oriented quote support for packing, destination, Incoterms, SDS, and COA",
      "A more direct fit for smaller and mid-sized buyers who need a finished moisture-control format",
    ],
    competitorStrengths: [
      "Broader specialty-chemicals portfolio and industry segmentation",
      "More mature public product discovery and document-finder experience",
      "Stronger visible enterprise-scale R&D and sustainability storytelling",
    ],
    improvementPriorities: [
      "Build a searchable technical-document center with product, grade, and market filters",
      "Publish application test data instead of relying mainly on capability statements",
      "Add a clear sustainability and lifecycle page for each desiccant format",
    ],
    confidence: "high",
    rows: [
      { criterion: "Primary public positioning", competitor: "Specialty chemicals across many industries", drygelworld: "Silica gel and desiccant manufacturing/export" },
      { criterion: "Finished packet and strip buying path", competitor: "Not the main homepage buying path", drygelworld: "Visible sachet, bead, and container-strip RFQ path" },
      { criterion: "Technical-document discovery", competitor: "Public SDS and document finder", drygelworld: "Documents supplied through quote and documentation paths" },
      { criterion: "Best-fit advantage", competitor: "Enterprise chemistry and application breadth", drygelworld: "Direct format selection and export coordination" },
    ],
  },
  {
    slug: "drygelworld-vs-w-r-grace",
    name: "W. R. Grace",
    url: "https://grace.com/",
    region: "USA / global",
    category: "Adsorbents, catalysts, synthetic silicas, and fine chemicals",
    bestFor: "Advanced process chemistry, synthetic silica, and large industrial or pharmaceutical programs",
    summary: "Grace publicly highlights adsorbents, synthetic silicas, catalysts, fine chemicals, pharmaceutical solutions, and science-led industrial work. That is adjacent to, but not the same as, a finished sachet and container-strip supplier.",
    dryGelWorldStrengths: [
      "Finished desiccant formats for cartons, cargo, and export packaging",
      "A simpler route from application details to a commercial quotation",
      "More practical fit when the buyer needs packets, strips, packing, and freight support together",
    ],
    competitorStrengths: [
      "Deeper public R&D, product science, and process-chemistry positioning",
      "Broader adsorbent and synthetic-silica portfolio",
      "More visible pharmaceutical and nutraceutical solution architecture",
    ],
    improvementPriorities: [
      "Publish bead-grade technical sheets with adsorption curves and test conditions",
      "Separate packaging desiccant, industrial adsorbent, and process-media use cases",
      "Add more third-party test evidence and application notes",
    ],
    confidence: "high",
    rows: [
      { criterion: "Primary public positioning", competitor: "High-performance specialty chemicals and materials", drygelworld: "Finished silica gel and moisture-control formats" },
      { criterion: "Process chemistry depth", competitor: "Strong visible adsorbent, catalyst, and synthetic-silica focus", drygelworld: "Focused on moisture-control products and formats" },
      { criterion: "Packaging readiness", competitor: "Requires application/product qualification", drygelworld: "Packets, beads, strips, and export RFQ workflow" },
      { criterion: "Best-fit advantage", competitor: "Complex chemistry and industrial process programs", drygelworld: "Fast specification and finished packaging supply" },
    ],
  },
  {
    slug: "drygelworld-vs-multisorb",
    name: "Multisorb Technologies",
    url: "https://www.multisorb.com/",
    region: "USA / global",
    category: "Desiccants, oxygen absorbers, and active packaging",
    bestFor: "Active-packaging programs where oxygen and moisture control must be designed together",
    summary: "The public homepage positions Multisorb around desiccants, oxygen absorbers, and active-packaging products. The comparison is therefore about program breadth, not a claim that every listed product is directly interchangeable.",
    dryGelWorldStrengths: [
      "Straightforward silica gel and container-desiccant sourcing for export buyers",
      "Flexible packet, bead, and strip formats for practical packing workflows",
      "Direct communication around quantity, destination, documentation, and Incoterms",
    ],
    competitorStrengths: [
      "More visible active-packaging and oxygen-control breadth",
      "Likely stronger fit for integrated oxygen-plus-moisture programs",
      "More established public packaging-solution positioning",
    ],
    improvementPriorities: [
      "Publish a clear moisture-versus-oxygen decision guide",
      "Add product-family navigation for oxygen absorbers and combined programs without implying supply of products not in the catalog",
      "Create packaging-line compatibility notes for paper, nonwoven, Tyvek, and film sachets",
    ],
    confidence: "limited",
    rows: [
      { criterion: "Primary public positioning", competitor: "Desiccants, oxygen absorbers, and active packaging", drygelworld: "Silica gel, clay, and container moisture control" },
      { criterion: "Oxygen-control breadth", competitor: "Publicly positioned as a core category", drygelworld: "Not a core catalog category" },
      { criterion: "Finished moisture formats", competitor: "Requires product-level qualification", drygelworld: "Sachets, beads, and container strips" },
      { criterion: "Best-fit advantage", competitor: "Integrated active-packaging programs", drygelworld: "Focused export supply and moisture-control formats" },
    ],
  },
  {
    slug: "drygelworld-vs-absortech",
    name: "Absortech",
    url: "https://absortech.com/products/container-desiccants/",
    region: "Sweden / global",
    category: "Container and cargo desiccants",
    bestFor: "Container-rain prevention programs needing multiple calcium-chloride formats and installation choices",
    summary: "Absortech has the clearest public container-moisture information in this set: calcium-chloride products, gel or liquid collection, vertical or horizontal installation, product families, testing, and moisture-damage education.",
    dryGelWorldStrengths: [
      "Can combine container strips with carton sachets or bulk silica gel in one export quote",
      "Potentially simpler fit for buyers seeking Pakistan-origin supply and smaller trial quantities",
      "Direct RFQ support for route, cargo, packing, and documentation details",
    ],
    competitorStrengths: [
      "Much stronger public container product taxonomy and installation guidance",
      "Visible moisture-damage education, R&D, and testing content",
      "Clear calcium-chloride product family for long transit and container condensation",
    ],
    improvementPriorities: [
      "Publish a container-strip selection table by container size, route, cargo, and voyage duration",
      "Show hanging and horizontal installation diagrams plus safety and leakage handling guidance",
      "Add independent capacity and container-rain test reports where available",
    ],
    confidence: "high",
    rows: [
      { criterion: "Container product depth", competitor: "Multiple named container formats and installation modes", drygelworld: "Container strips plus broader silica formats" },
      { criterion: "Chemistry shown publicly", competitor: "Calcium chloride; gel-based and liquid-based options", drygelworld: "Silica gel and clay formats; confirm chemistry per quote" },
      { criterion: "Sizing education", competitor: "Strong visible moisture-damage and installation content", drygelworld: "Needs a deeper public sizing and test-data layer" },
      { criterion: "Best-fit advantage", competitor: "Dedicated container-moisture specialization", drygelworld: "One supplier for container and package-level formats" },
    ],
  },
  {
    slug: "drygelworld-vs-mitsubishi-gas-chemical",
    name: "Mitsubishi Gas Chemical",
    url: "https://www.mgc.co.jp/eng/",
    region: "Japan / global",
    category: "Diversified chemicals and oxygen absorbers",
    bestFor: "Large corporate programs, specialty chemistry, and oxygen-absorber applications",
    summary: "MGC is a diversified chemical company with public product, application, innovation, and R&D navigation. Its AGELESS oxygen absorber business is adjacent to moisture control, but this is not a like-for-like finished silica-gel comparison.",
    dryGelWorldStrengths: [
      "Specialized around silica gel and desiccant formats rather than a diversified chemical portfolio",
      "Faster path for a buyer who already knows the packet, bead, or strip format needed",
      "Export quote support for destination, packing, and documents",
    ],
    competitorStrengths: [
      "Far broader corporate R&D and product-category infrastructure",
      "Established oxygen-absorber technology and global corporate footprint",
      "Stronger public innovation and application-search experience",
    ],
    improvementPriorities: [
      "Add a better product/application search experience with filters by cargo and format",
      "Publish technical education separating moisture control from oxygen control",
      "Build a stronger public evidence layer for capacity, quality systems, and export markets",
    ],
    confidence: "high",
    rows: [
      { criterion: "Primary public positioning", competitor: "Diversified chemical group with multiple business sectors", drygelworld: "Focused silica gel and desiccant manufacturer/exporter" },
      { criterion: "Oxygen absorber capability", competitor: "AGELESS is publicly highlighted", drygelworld: "Not a core catalog product" },
      { criterion: "Finished silica formats", competitor: "Requires product-level qualification", drygelworld: "Visible packet, bead, and strip paths" },
      { criterion: "Best-fit advantage", competitor: "Corporate scale and R&D breadth", drygelworld: "Focused, direct moisture-control procurement" },
    ],
  },
  {
    slug: "drygelworld-vs-international-silica-gel",
    name: "International Silica Gel (ISG)",
    url: "https://www.isgco.cn/",
    region: "China / global",
    category: "Bulk silica gel, molecular sieve, and activated alumina",
    bestFor: "Large-volume adsorbent procurement across multiple industrial desiccant materials",
    summary: "ISG publicly presents silica gel, molecular sieve, activated alumina, multiple particle sizes, and large production/export figures. Those figures are site-published company claims and should be verified during procurement.",
    dryGelWorldStrengths: [
      "Finished sachet and container-strip formats alongside bulk material",
      "Practical export coordination for buyers who need packing, destination, and documents handled together",
      "More accessible fit for trial orders and mixed format requirements, subject to quotation",
    ],
    competitorStrengths: [
      "Broader industrial adsorbent portfolio including molecular sieve and activated alumina",
      "Large-volume positioning and published production/export scale claims",
      "More visible particle-size and material-family breadth",
    ],
    improvementPriorities: [
      "Publish verified annual capacity, plant, and export-market evidence instead of only headline claims",
      "Add a particle-size and grade selector for bulk buyers",
      "Create downloadable technical data sheets for each silica gel type and size",
    ],
    confidence: "high",
    rows: [
      { criterion: "Material breadth", competitor: "Silica gel, molecular sieve, activated alumina", drygelworld: "Silica gel, clay, and finished moisture-control formats" },
      { criterion: "Large-volume positioning", competitor: "Site publishes large production and export figures; verify independently", drygelworld: "Focused on quoted order requirements and export supply" },
      { criterion: "Finished sachet/strip path", competitor: "Available products need product-level confirmation", drygelworld: "Visible sachet and container-strip product paths" },
      { criterion: "Best-fit advantage", competitor: "Multi-material industrial adsorbent sourcing", drygelworld: "Finished packaging plus export coordination" },
    ],
  },
  {
    slug: "drygelworld-vs-bouling-desiccants",
    name: "Bouling Desiccants",
    url: "https://www.silicon-gel-china.com/",
    region: "China",
    category: "Silica gel and desiccant products",
    bestFor: "Buyers seeking a China-based silica-gel supplier; exact scope needs product-level verification",
    summary: "Compare Bouling Desiccants with DryGelWorld on origin, formats, documentation, and RFQ terms before shortlisting a China-based silica gel supplier. Bouling's public page was not reliably retrievable when this comparison was written, so nothing here states their capacity, certificates, pricing, or product breadth - verify those with them directly.",
    dryGelWorldStrengths: [
      "Publicly accessible product and RFQ paths for sachets, beads, and container moisture control",
      "Pakistan-origin export coordination and direct documentation discussion",
      "A practical option for mixed formats and buyer-specific packing questions",
    ],
    competitorStrengths: [
      "China-origin sourcing may suit buyers with an existing China freight or supplier network",
      "Publicly listed category suggests silica gel/desiccant relevance, but details need verification",
    ],
    improvementPriorities: [
      "Add a supplier-comparison checklist that makes certificates, plant evidence, MOQ, and lead time easy to verify",
      "Publish more product photos, TDS files, and standard packing details",
      "Create route-level freight and lead-time guidance for export buyers",
    ],
    confidence: "limited",
    rows: [
      { criterion: "Public evidence available", competitor: "Limited in this audit because the page did not load reliably", drygelworld: "Public product, quote, documentation, and export pages" },
      { criterion: "Origin advantage", competitor: "China sourcing option", drygelworld: "Pakistan sourcing option" },
      { criterion: "Comparability", competitor: "Verify grade, capacity, certificates, MOQ, and lead time", drygelworld: "Quote against the same specification and destination" },
      { criterion: "Best-fit advantage", competitor: "Potential China supply route", drygelworld: "Transparent RFQ qualification and format selection" },
    ],
  },
  {
    slug: "drygelworld-vs-aquablue",
    name: "Aquablue",
    url: "https://www.silicagelsuppliers.com/",
    region: "India",
    category: "Silica gel and desiccant supply",
    bestFor: "India-origin silica-gel sourcing; exact formats and documentation should be confirmed",
    summary: "Compare Aquablue with DryGelWorld on origin, formats, documentation, and RFQ terms before shortlisting an India-based silica gel supplier. Aquablue's public page was not reliably retrievable when this comparison was written, so nothing here states their pricing, capacity, certifications, or specifications - confirm those with them directly.",
    dryGelWorldStrengths: [
      "Pakistan-origin supply for buyers comparing Karachi and India freight lanes",
      "Finished sachet, bead, and container-strip formats with a direct quote workflow",
      "Documentation and destination details are handled as part of the RFQ",
    ],
    competitorStrengths: [
      "India-origin supply may be attractive for some South Asian routes",
      "The domain is topically aligned with silica-gel sourcing, but product-level evidence needs confirmation",
    ],
    improvementPriorities: [
      "Make country-of-origin, factory, MOQ, and packing evidence easier to verify on-page",
      "Add a clear format matrix for paper, cloth, nonwoven, and container strips",
      "Publish regional delivery comparisons for Pakistan, India, Gulf, and Africa lanes",
    ],
    confidence: "limited",
    rows: [
      { criterion: "Public evidence available", competitor: "Limited in this audit because the page did not load reliably", drygelworld: "Public product and export workflow" },
      { criterion: "Origin advantage", competitor: "India sourcing option", drygelworld: "Pakistan sourcing option" },
      { criterion: "Buyer verification", competitor: "Confirm product grade, certificate scope, MOQ, and lead time", drygelworld: "Confirm the same items in the quotation and documents" },
      { criterion: "Best-fit advantage", competitor: "Potential India freight route", drygelworld: "Direct multi-format desiccant quotation" },
    ],
  },
  {
    slug: "drygelworld-vs-trade-link-silica-gel",
    name: "Trade Link / Silica Gel Manufacturer",
    url: "https://www.silicagelmanufacturer.com/",
    region: "India",
    category: "Silica gel crystals, breather gel, bags, and pouches",
    bestFor: "Buyers comparing broad silica-gel product categories and India-origin supply",
    summary: "Trade Link publicly lists multiple silica-gel types and formats, including white, blue, orange, bags, pouches, breather gel, container bags, and related products. Public testimonials are not treated as independently verified customer proof.",
    dryGelWorldStrengths: [
      "Clear export-oriented path for container strips, sachets, bulk beads, and documents",
      "Pakistan-origin option for buyers comparing regional supply and freight",
      "A stronger single-RFQ path for combining package-level and container-level moisture control",
    ],
    competitorStrengths: [
      "Broader visible product taxonomy and product-category navigation",
      "India-origin supply and a long public category list",
      "More visible pages for some specialist silica-gel forms",
    ],
    improvementPriorities: [
      "Add a product catalog filter by color, particle size, sachet material, and application",
      "Create individual TDS and photo-backed pages for every major format",
      "Explain which products are stocked versus made to order and publish MOQ by format",
    ],
    confidence: "high",
    rows: [
      { criterion: "Visible product taxonomy", competitor: "Broad list of silica-gel types, bags, pouches, and breather products", drygelworld: "Focused catalog with sachets, beads, clay, and container strips" },
      { criterion: "Container moisture control", competitor: "Container bag and breather categories listed; verify exact product specs", drygelworld: "Dedicated container-strip and shipping-moisture pages" },
      { criterion: "Export workflow", competitor: "Worldwide supply is publicly claimed; verify per order", drygelworld: "Destination, packing, Incoterm, SDS, and COA in quote workflow" },
      { criterion: "Best-fit advantage", competitor: "Broad category browsing", drygelworld: "Buyer-specific specification and combined format sourcing" },
    ],
  },
];

export function getSupplierComparison(slug: string) {
  return supplierComparisons.find((comparison) => comparison.slug === slug);
}
