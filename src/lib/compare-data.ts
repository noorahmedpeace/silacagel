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
];

export function getComparePage(slug: string): ComparePage | undefined {
  return comparePages.find((p) => p.slug === slug);
}
