// Comparison landing pages — buyer decision intent (different from the
// informational blog posts on the same subjects). These pages render a
// side-by-side specification table, a "when to choose which" decision
// matrix, and a routed CTA, so they target commercial-intent queries
// rather than the long-form educational angle the blog covers.

export type CompareCriterion = {
  label: string;
  a: string;
  b: string;
};

export type CompareDecision = {
  scenario: string;
  recommended: "a" | "b" | "both";
  note: string;
};

export type ComparePage = {
  slug: string;
  productA: string;
  productB: string;
  h1: string;
  description: string;
  introA: string;
  introB: string;
  criteria: CompareCriterion[];
  decisions: CompareDecision[];
  faqs: { q: string; a: string }[];
  relatedBlog: string;
  relatedProduct: string;
};

export const comparePages: ComparePage[] = [
  {
    slug: "silica-gel-vs-clay-desiccant",
    productA: "Silica Gel",
    productB: "Dry Clay Desiccant",
    h1: "Silica gel vs dry clay desiccant: buyer comparison for industrial moisture control",
    description:
      "Side-by-side comparison of silica gel and dry clay desiccant for industrial buyers — adsorption capacity, cost per kg, regulatory profile, regenerability, and the decision matrix for picking the right desiccant per cargo type.",
    introA:
      "Silica gel (silicon dioxide) is the global industrial standard for moisture control: ~30-35% adsorption capacity by weight, broad temperature range, regenerable, and the default choice for pharma, electronics, and high-value packaging.",
    introB:
      "Dry clay desiccant (montmorillonite/bentonite clay) is a naturally occurring mineral with ~25% adsorption capacity by weight, lower cost per kg, and a temperature ceiling around 50 degrees Celsius. It's the cost-leader for high-volume container loadings and warehouse stock.",
    criteria: [
      { label: "Adsorption capacity (by weight)", a: "30-35%", b: "Up to 25%" },
      { label: "Working temperature ceiling", a: "Up to 150°C", b: "~50°C" },
      { label: "Regenerable", a: "Yes (120-150°C, 2-4h)", b: "Limited — single-use is standard" },
      { label: "Cost per kg of material", a: "Reference", b: "20-35% lower than silica gel" },
      { label: "Regulatory profile", a: "Inert SiO₂; SDS + COA available", b: "Inert mineral; SDS + COA available" },
      { label: "Best-fit cargo", a: "Pharma, electronics, leather, precision goods", b: "Bulk container loadings, warehouse stock, cost-tier industrial" },
      { label: "Indicating-color option", a: "Orange (REACH) or blue (legacy)", b: "Not typically available" },
      { label: "Documentation held", a: "ISO 9001:2015 + DMF-free", b: "ISO 9001:2015" },
    ],
    decisions: [
      { scenario: "Pharma secondary packaging (non-DMF)", recommended: "a", note: "Silica gel — higher capacity per gram, sachet format flexibility, documentation alignment with pharma buyer audits." },
      { scenario: "Electronics packaging", recommended: "a", note: "Silica gel — precision moisture control, broad working temperature, indicating-gel option for QC verification." },
      { scenario: "Leather and footwear export", recommended: "a", note: "Silica gel at upper-end sizing — clay's lower capacity doesn't safely cover mold/mildew risk on long-haul humid routes." },
      { scenario: "Bulk container loadings (cost-sensitive)", recommended: "b", note: "Clay desiccant — material cost matters at container-strip scale, working temperature is well within range." },
      { scenario: "Warehouse stock protection", recommended: "b", note: "Clay desiccant — high-volume, lower-value-density cargo, cost differential matters more than peak capacity." },
      { scenario: "High-temperature industrial drying", recommended: "a", note: "Silica gel — clay's 50°C ceiling is the disqualifier here." },
      { scenario: "Reusable / closed-loop industrial systems", recommended: "a", note: "Silica gel — regenerability at 120-150°C is the standard for closed-loop reuse." },
      { scenario: "Combined moisture program", recommended: "both", note: "Bulk clay at container level + silica gel sachets at per-carton level can balance cost and protection on long-haul shipments." },
    ],
    faqs: [
      {
        q: "Is dry clay desiccant cheaper than silica gel?",
        a: "Per kg of material, dry clay desiccant is typically 20-35% cheaper than equivalent-grade silica gel. The total cost-per-cargo also depends on capacity differences (silica gel does more work per gram), so the sizing math matters when comparing.",
      },
      {
        q: "Can I substitute clay desiccant for silica gel in pharma packaging?",
        a: "Not for direct-contact or regulated pharma packaging. Clay desiccant is appropriate for non-pharma industrial applications. Pharma packaging desiccant requires specific regulatory documentation (region-specific) that silica gel suppliers typically support and clay typically does not.",
      },
      {
        q: "Does DryGelWorld supply both silica gel and dry clay desiccant?",
        a: "Yes — both are in the catalog with ISO 9001:2015 manufacturer certification. Format options for clay include sachets, strips, and bulk paper bags. Choice between the two is a per-cargo decision based on the criteria above.",
      },
      {
        q: "Which is REACH-compliant?",
        a: "Both materials are inert and REACH-compliant in their base form. The relevant REACH consideration is the indicator dye (if any) used on indicating silica gel — DryGelWorld's orange indicating gel uses a non-cobalt-chloride dye that's REACH-compliant.",
      },
    ],
    relatedBlog: "/blog/silica-gel-vs-clay-desiccant",
    relatedProduct: "/products/dry-clay-desiccant",
  },
  {
    slug: "silica-gel-vs-molecular-sieve",
    productA: "Silica Gel",
    productB: "Molecular Sieve",
    h1: "Silica gel vs molecular sieve: buyer comparison for moisture and selective adsorption",
    description:
      "Buyer comparison of silica gel and molecular sieve desiccants — water capacity, selective adsorption capability, working temperature, cost, and the decision matrix for picking the right desiccant per industrial application.",
    introA:
      "Silica gel adsorbs water vapor across a broad humidity range and is the standard choice for general moisture protection — packaging, container shipping, warehouse stock, and most industrial applications.",
    introB:
      "Molecular sieve is a synthetic zeolite (typically 3A, 4A, 5A, or 13X) with precisely calibrated pore size that selectively adsorbs water (and specific other small molecules) even at very low partial pressures. Used where silica gel can't reach low enough humidity levels.",
    criteria: [
      { label: "Water adsorption capacity", a: "30-35%", b: "Up to 22% (lower total, but to lower endpoint)" },
      { label: "Minimum achievable humidity", a: "~30% RH equilibrium", b: "<1% RH — selective at very dry conditions" },
      { label: "Selective adsorption", a: "Non-selective (water + some others)", b: "Selective by pore size — water-specific options" },
      { label: "Cost per kg", a: "Reference", b: "2-4× silica gel" },
      { label: "Regenerable", a: "Yes (120-150°C)", b: "Yes (200-300°C — higher temp)" },
      { label: "Best-fit application", a: "General moisture protection", b: "Insulated glass, refrigerants, deep-drying processes" },
      { label: "Documentation held by DryGelWorld", a: "ISO 9001:2015 + DMF-free + SDS + COA", b: "Not in DryGelWorld catalog" },
    ],
    decisions: [
      { scenario: "Packaging moisture protection", recommended: "a", note: "Silica gel — molecular sieve's low-RH endpoint isn't needed and cost differential isn't justified." },
      { scenario: "Container desiccant", recommended: "a", note: "Silica gel container strips — moisture range matches voyage humidity well." },
      { scenario: "Insulated glass spacer fill", recommended: "b", note: "Molecular sieve 3A — needs to reach very low RH to prevent fogging across decades of use." },
      { scenario: "Refrigerant drying (HVAC, A/C systems)", recommended: "b", note: "Molecular sieve — specific pore size selects water without interfering with refrigerant molecules." },
      { scenario: "Deep-drying industrial gases", recommended: "b", note: "Molecular sieve — silica gel can't reach low enough water content for many gas-drying applications." },
      { scenario: "Pharma packaging (standard)", recommended: "a", note: "Silica gel — RH endpoint is adequate, cost is appropriate, format options are broader." },
      { scenario: "Electronics packaging (standard)", recommended: "a", note: "Silica gel — protection range matches storage conditions; sieve is overkill." },
    ],
    faqs: [
      {
        q: "Why is molecular sieve more expensive than silica gel?",
        a: "Molecular sieve is a synthetic crystalline aluminosilicate with manufactured pore sizes — the synthesis process is more involved than silica gel production, hence the 2-4× per-kg cost premium. It also operates at lower water-vapor partial pressures, which is the engineering value buyers pay for.",
      },
      {
        q: "Can I use silica gel instead of molecular sieve in insulated glass?",
        a: "No. Insulated glass spacer fill needs to reach very low equilibrium RH to prevent fogging across the service life (often 20-30 years). Silica gel can't reach that endpoint. Use molecular sieve 3A for IG spacer applications.",
      },
      {
        q: "Does DryGelWorld supply molecular sieve?",
        a: "No — molecular sieve is not in the current DryGelWorld catalog. Buyers needing molecular sieve should source from specialized synthetic zeolite manufacturers. DryGelWorld can advise on silica gel sizing where buyers are comparing the two for a borderline application.",
      },
      {
        q: "Which is better for refrigerant drying in HVAC systems?",
        a: "Molecular sieve — specifically 3A or 4A grade depending on the refrigerant. Pore size selectivity prevents the desiccant from adsorbing the refrigerant molecule itself while still extracting trace water.",
      },
    ],
    relatedBlog: "/blog/silica-gel-vs-molecular-sieve-vs-activated-alumina",
    relatedProduct: "/products/bulk-industrial",
  },
  {
    slug: "silica-gel-vs-oxygen-absorber",
    productA: "Silica Gel",
    productB: "Oxygen Absorber",
    h1: "Silica gel vs oxygen absorber: buyer comparison for moisture vs oxidation protection",
    description:
      "Comparison of silica gel and oxygen absorbers — what each one protects against, when to use which, and the cases where buyers need both products in parallel inside the same package.",
    introA:
      "Silica gel adsorbs water vapor (humidity). It protects against moisture-driven damage: corrosion, mold, mildew, condensation on cold surfaces, leather damage, electronics short-circuit risk.",
    introB:
      "Oxygen absorbers consume atmospheric oxygen (typically via iron oxidation). They protect against oxidation-driven damage: rancidity in fatty foods, browning in dried foods, color loss in pigments, certain pharmaceutical oxidative degradation pathways.",
    criteria: [
      { label: "What it removes", a: "Water vapor", b: "Oxygen (O₂)" },
      { label: "Protects against", a: "Moisture damage", b: "Oxidation damage" },
      { label: "Reaction speed", a: "Gradual adsorption", b: "Begins immediately on air contact" },
      { label: "Reusable", a: "Yes — regenerable at 120-150°C", b: "No — single-use consumable" },
      { label: "Required enclosure", a: "Tolerates breathable packaging", b: "Requires near-airtight enclosure" },
      { label: "Typical applications", a: "Packaging, container desiccant, warehouse stock", b: "Long-shelf-life food, fatty foods, seeds, archival" },
      { label: "Documentation held by DryGelWorld", a: "ISO 9001:2015 + DMF-free + SDS + COA", b: "Not in DryGelWorld catalog" },
    ],
    decisions: [
      { scenario: "Container shipping (any cargo)", recommended: "a", note: "Silica gel — container damage is moisture/condensation driven; containers aren't airtight enough for O₂ absorbers." },
      { scenario: "Electronics packaging", recommended: "a", note: "Silica gel — moisture is the primary risk." },
      { scenario: "Leather and footwear export", recommended: "a", note: "Silica gel — mold/mildew is the failure mode." },
      { scenario: "Fatty food packaging (nuts, snacks)", recommended: "b", note: "Oxygen absorber — rancidity is the failure mode, not moisture." },
      { scenario: "Long-shelf-life dried food (coffee, dried fruit)", recommended: "both", note: "Both — humidity AND oxidation can degrade quality across long shelf life." },
      { scenario: "Seed packaging (germination preservation)", recommended: "b", note: "Oxygen absorber primary; sometimes plus silica gel for humidity in tropical destinations." },
      { scenario: "Pharma where oxidative degradation is the documented pathway", recommended: "b", note: "Oxygen absorber — moisture-stable but oxidation-sensitive actives need O₂ control." },
      { scenario: "Pharma where moisture is the documented degradation pathway", recommended: "a", note: "Silica gel — covered above in pharma packaging guidance." },
    ],
    faqs: [
      {
        q: "Can silica gel replace oxygen absorbers in fatty food packaging?",
        a: "No. Fatty foods go rancid through oxidation, not moisture. Silica gel won't prevent rancidity. Use oxygen absorbers; add silica gel separately if humidity is also a concern.",
      },
      {
        q: "Can oxygen absorbers replace silica gel in shipping containers?",
        a: "No. Container damage is dominated by humidity and condensation cycling; containers aren't airtight enough for O₂ absorbers to maintain low-O₂ atmosphere. Use silica gel container strips and bulk silica gel.",
      },
      {
        q: "Do silica gel and oxygen absorbers interfere with each other?",
        a: "No, they work on different chemistry. When using both in the same package, order matters: place silica gel sachets first, then oxygen absorbers last just before sealing — because O₂ absorbers start working immediately on air contact.",
      },
      {
        q: "Does DryGelWorld supply oxygen absorbers?",
        a: "No — oxygen absorbers are not in the current catalog. Buyers needing both should parallel-source from a specialized O₂ absorber manufacturer (Mitsubishi Ageless and similar) and source silica gel from DryGelWorld.",
      },
    ],
    relatedBlog: "/blog/oxygen-absorber-vs-silica-gel-when-to-use-each",
    relatedProduct: "/products/retail-sachets",
  },
  {
    slug: "white-silica-gel-vs-orange-silica-gel",
    productA: "White Silica Gel",
    productB: "Orange Silica Gel",
    h1: "White silica gel vs orange silica gel: which desiccant should buyers choose?",
    description:
      "Commercial comparison of white non-indicating silica gel and orange indicating silica gel for packaging, storage, bulk supply, documents, regeneration, and export RFQs.",
    introA:
      "White silica gel is the clean non-indicating choice for product packs, cartons, bulk bags, food/pharma review, electronics, leather, and private-label sachets where no color signal is required.",
    introB:
      "Orange silica gel is an indicating desiccant used when buyers need a visible humidity signal for inspection, storage checks, lab use, or reusable desiccant workflows after SDS and COA review.",
    criteria: [
      { label: "Main purpose", a: "Moisture adsorption without color change", b: "Moisture adsorption with visible humidity signal" },
      { label: "Typical color behavior", a: "Stays white / translucent", b: "Changes color as moisture exposure increases" },
      { label: "Best packaging fit", a: "Retail sachets, cartons, pharma/food review, private label", b: "Inspection packs, lab/storage jars, monitored environments" },
      { label: "Buyer risk", a: "Wrong packet size or unsupported compliance claim", b: "Indicator chemistry not approved for buyer/destination" },
      { label: "Common formats", a: "0.5g-50g sachets, bags, bulk beads, 25kg bags", b: "Bulk beads, jars, packets, carton packs" },
      { label: "Document priority", a: "SDS, COA, material statements", b: "SDS, COA, composition and color-system review" },
      { label: "Food/pharma discussion", a: "More common starting point for review", b: "Usually not first choice for direct food/pharma claims" },
    ],
    decisions: [
      { scenario: "Clean product packaging with no inspection color needed", recommended: "a", note: "White silica gel keeps the pack neutral and avoids unnecessary color chemistry." },
      { scenario: "Lab jar or storage system needing visual saturation checks", recommended: "b", note: "Orange indicating gel gives teams a simple visible humidity status signal." },
      { scenario: "Food packaging or pharma packaging review", recommended: "a", note: "Start with white non-indicating gel and verify documents before using regulated claims." },
      { scenario: "Distributor selling both standard and indicating gel", recommended: "both", note: "Carry white for general packaging and orange for monitoring-focused buyers." },
      { scenario: "Private-label sachets for customer-facing packaging", recommended: "a", note: "White gel is normally cleaner for brand packaging unless a color signal is explicitly required." },
      { scenario: "Reusable desiccant workflow with moisture checks", recommended: "b", note: "Orange gel can support visual checks, subject to SDS handling and regeneration guidance." },
    ],
    faqs: [
      { q: "Is white silica gel better than orange silica gel?", a: "Neither is universally better. White silica gel is better for clean non-indicating packaging, while orange silica gel is better when the buyer needs a visible humidity signal." },
      { q: "Which one is safer for packaging?", a: "Safety depends on the exact product and documents. White non-indicating gel is usually the cleaner starting point for food/pharma review; orange gel needs composition and destination review." },
      { q: "Can orange silica gel replace white silica gel?", a: "Only if the buyer actually needs an indicator. For standard cartons and sachets, orange gel may add cost and compliance questions without improving protection." },
      { q: "Can both be regenerated?", a: "Bulk silica gel beads can often be regenerated with controlled heat, but finished sachets are normally treated as single-use packaging. Always follow the exact SDS." },
      { q: "What should I include in a quote request?", a: "Send color choice, packet or bulk format, gram size or kg, monthly quantity, application, destination, Incoterms, and required SDS/COA documents." },
    ],
    relatedBlog: "/guides/silica-gel-buyer-guide",
    relatedProduct: "/white-silica-gel",
  },
  {
    slug: "indicating-vs-non-indicating-silica-gel",
    productA: "Indicating Silica Gel",
    productB: "Non-Indicating Silica Gel",
    h1: "Indicating vs non-indicating silica gel: buyer decision guide",
    description:
      "Buyer comparison of indicating silica gel and non-indicating silica gel for humidity signal needs, packaging fit, documents, bulk supply, and international procurement.",
    introA:
      "Indicating silica gel uses a color signal to show moisture exposure. It is useful for inspection, monitored storage, lab use, reusable workflows, and distributor ranges.",
    introB:
      "Non-indicating silica gel adsorbs moisture without changing color. It is usually preferred for clean packaging, cartons, food/pharma review, electronics, and private-label sachets.",
    criteria: [
      { label: "Color signal", a: "Yes - visible humidity indication", b: "No - adsorption only" },
      { label: "Best use", a: "Monitoring, labs, storage checks", b: "Product packs, cartons, bulk packaging" },
      { label: "Common colors", a: "Orange or blue", b: "White / translucent" },
      { label: "Compliance review", a: "Higher - indicator chemistry matters", b: "Lower - still document-dependent" },
      { label: "Best buyer type", a: "Labs, distributors, maintenance teams", b: "Manufacturers, exporters, packagers, warehouses" },
      { label: "Quote basis", a: "Color, bead size, quantity, documents", b: "Format, gram size, kg, application, destination" },
      { label: "Private label fit", a: "Only when indication is needed", b: "Strong fit for clean sachet programs" },
    ],
    decisions: [
      { scenario: "Electronics carton packaging", recommended: "b", note: "Non-indicating white sachets are normally enough unless inspection needs a visible signal." },
      { scenario: "Lab desiccator jar", recommended: "a", note: "Indicating gel helps teams see when moisture exposure has increased." },
      { scenario: "Private-label packet program", recommended: "b", note: "Clean white gel usually fits customer-facing sachets better." },
      { scenario: "Warehouse storage with periodic checks", recommended: "a", note: "Indicating gel can help staff verify moisture status visually." },
      { scenario: "Food/pharma packaging review", recommended: "b", note: "Non-indicating gel is the safer first discussion, with documents confirmed before claims." },
      { scenario: "Distributor catalog", recommended: "both", note: "Offer non-indicating gel for mainstream packaging and indicating gel for monitoring buyers." },
    ],
    faqs: [
      { q: "What is the difference between indicating and non-indicating silica gel?", a: "Indicating silica gel provides a visible color signal as moisture exposure increases. Non-indicating silica gel adsorbs moisture without changing color." },
      { q: "Which is better for product packaging?", a: "Non-indicating silica gel is usually better for standard product packaging because it is clean, neutral, and avoids unnecessary color chemistry." },
      { q: "When should I use indicating silica gel?", a: "Use it when inspection teams need visual moisture checks, such as lab jars, storage systems, reusable workflows, and monitored environments." },
      { q: "Is non-indicating silica gel the same as white silica gel?", a: "In most buyer RFQs, white silica gel means non-indicating silica gel, but exact grade and documents should still be confirmed." },
      { q: "Can DryGelWorld export both types?", a: "Yes. RFQs can be discussed for white non-indicating gel and indicating gel, subject to color, packing, quantity, destination, and document requirements." },
    ],
    relatedBlog: "/guides/silica-gel-buyer-guide",
    relatedProduct: "/indicating-silica-gel",
  },
  {
    slug: "container-desiccant-vs-silica-gel-packets",
    productA: "Container Desiccant",
    productB: "Silica Gel Packets",
    h1: "Container desiccant vs silica gel packets: export moisture protection comparison",
    description:
      "Comparison of container desiccant strips and silica gel packets for sea freight, cartons, product packaging, container rain risk, strip count, packet sizing, and RFQs.",
    introA:
      "Container desiccants protect the container airspace during sea freight. They are planned by route, container size, transit days, cargo sensitivity, and strip count.",
    introB:
      "Silica gel packets protect the product pack or carton. They are planned by gram size, carton volume, product sensitivity, packaging material, and monthly quantity.",
    criteria: [
      { label: "Protection zone", a: "Whole container environment", b: "Product pack, pouch, box, or carton" },
      { label: "Main risk", a: "Container rain, condensation, humid sea routes", b: "Product-level moisture, carton humidity, storage exposure" },
      { label: "Sizing input", a: "20ft/40ft, route, transit days, cargo", b: "Gram size, carton volume, product sensitivity" },
      { label: "Common format", a: "1kg-5kg hanging strips or cargo bags", b: "0.5g-50g sachets and carton bags" },
      { label: "Best buyer", a: "Exporters, logistics teams, freight planners", b: "Packagers, brands, manufacturers, distributors" },
      { label: "Can replace the other?", a: "No - container level only", b: "No - product/carton level only" },
      { label: "Best program", a: "Often used together", b: "Often used together" },
    ],
    decisions: [
      { scenario: "Long-haul ocean container with leather goods", recommended: "both", note: "Use container strips for cargo airspace and packets inside cartons or shoe boxes." },
      { scenario: "Small electronics product box", recommended: "b", note: "Packets protect the unit pack; container strips are unnecessary if not shipping full containers." },
      { scenario: "40ft container to humid destination", recommended: "a", note: "Container desiccants are the first line for container rain and airspace humidity." },
      { scenario: "Private-label retail packaging", recommended: "b", note: "Finished packets are the right product-level format." },
      { scenario: "Mixed pallet export with high claim risk", recommended: "both", note: "Combine carton packets with container strips for layered protection." },
      { scenario: "Warehouse stock not inside containers", recommended: "b", note: "Use packets, bags, or bulk desiccants depending on the stock environment." },
    ],
    faqs: [
      { q: "Do container desiccants replace silica gel packets?", a: "No. Container desiccants protect the container environment; silica gel packets protect the product or carton. Many export shipments use both." },
      { q: "Which is better for container rain?", a: "Container desiccant strips are better for container rain because they are sized for the container airspace, not just individual cartons." },
      { q: "Which is better for retail product packaging?", a: "Silica gel packets are better for retail product packaging because they sit inside the product box, pouch, bottle, or master carton." },
      { q: "How do I quote container desiccants?", a: "Send container size, route, transit days, cargo type, loading density, destination, strip count target, Incoterms, and documents." },
      { q: "How do I quote silica gel packets?", a: "Send packet gram size, carton volume, product type, monthly quantity, destination, packet material, private-label needs, and SDS/COA requirements." },
    ],
    relatedBlog: "/blog/container-rain-prevention",
    relatedProduct: "/container-desiccant-strips",
  },
  {
    slug: "bulk-silica-gel-vs-packets",
    productA: "Bulk Silica Gel",
    productB: "Silica Gel Packets",
    h1: "Bulk silica gel vs packets: which format should industrial buyers order?",
    description:
      "Buyer comparison of bulk silica gel and silica gel packets for repacking, warehouse use, product packaging, private label, MOQ, documents, and export supply.",
    introA:
      "Bulk silica gel is purchased by kg, pallet, or tonnage for repackers, distributors, warehouses, and industrial moisture-control systems.",
    introB:
      "Silica gel packets are finished sachets inserted into product packs, cartons, bottles, boxes, and private-label packaging programs.",
    criteria: [
      { label: "Buying unit", a: "Kg, pallet, metric ton, 25kg bags", b: "Sachet count, gram size, cartons" },
      { label: "Best fit", a: "Repacking, warehouse, industrial systems", b: "Product packs and cartons" },
      { label: "Production use", a: "Needs buyer-side packing or dosing", b: "Ready for insertion into packs" },
      { label: "Private label", a: "Usually outer bags/cartons", b: "Strong - sachet text and carton labels" },
      { label: "MOQ logic", a: "Weight and pallet volume", b: "Packet count and print/material run" },
      { label: "Documentation", a: "SDS, COA, grade, bead size", b: "SDS, COA, packet material, warning text" },
      { label: "Buyer risk", a: "Buying loose beads when finished sachets are needed", b: "Paying for sachets when repacking bulk would be cheaper" },
    ],
    decisions: [
      { scenario: "Distributor repacking into own sachets", recommended: "a", note: "Bulk gel gives lower unit cost and lets the buyer control final format." },
      { scenario: "Brand inserting desiccant into product boxes", recommended: "b", note: "Finished packets are production-ready and reduce handling." },
      { scenario: "Warehouse humidity control", recommended: "a", note: "Bulk beads or larger bags usually fit industrial environments better." },
      { scenario: "Retail packaging with warning text", recommended: "b", note: "Packets support warning copy, material selection, and private-label discussion." },
      { scenario: "High-volume mixed program", recommended: "both", note: "Use bulk for repacking or warehouse needs and packets for customer-facing cartons." },
      { scenario: "Trial shipment with uncertain size", recommended: "b", note: "Packet samples are easier to test against carton size and product sensitivity." },
    ],
    faqs: [
      { q: "Is bulk silica gel cheaper than packets?", a: "Bulk silica gel is usually cheaper per kg, but packets save packing labor and are ready for insertion into products or cartons." },
      { q: "When should I buy silica gel packets?", a: "Buy packets when the desiccant must go directly into product packs, cartons, bottles, boxes, or private-label customer packaging." },
      { q: "When should I buy bulk silica gel?", a: "Buy bulk silica gel for repacking, distributor stock, warehouse use, industrial systems, or when your team controls the final packaging format." },
      { q: "What sizes are available?", a: "Bulk gel is commonly quoted in kg, 25kg bags, drums, or pallet quantities. Packets are commonly 0.5g-50g or custom by MOQ." },
      { q: "What documents should I request?", a: "Request SDS, COA, ISO 9001:2015 support, bead grade or packet material details, packing list, and destination-specific documents." },
    ],
    relatedBlog: "/blog/bulk-silica-gel-supplier-checklist",
    relatedProduct: "/bulk-silica-gel-desiccant",
  },
];

export function getComparePage(slug: string): ComparePage | undefined {
  return comparePages.find((p) => p.slug === slug);
}
