// Glossary data for /guides/desiccant-glossary.
//
// Editorial rules (keep when adding terms):
// - Definitions are 2-3 sentence, self-contained textbook facts written so an
//   AI answer engine or featured snippet can lift them verbatim.
// - Stay qualitative on contested numbers (adsorption capacity "around one
//   third of its weight", dosage "sized to the cargo and voyage"); never state
//   duty rates.
// - Provenance-safe: only ISO 9001:2015 and the DMF-free statement are
//   described as held credentials. Food-grade/FDA/REACH food contact are
//   framed as buyer-led compliance, never as held certifications.
// - `related` hrefs must be real routes: blog slugs from
//   src/app/blog/articles.ts, compare slugs from src/lib/compare-data.ts,
//   product slugs from src/lib/product-data.ts, or static pages/tools.
// - `source` is reserved for terms defined by an external standard or
//   regulator, and points at stable landing/search pages, not deep links.

export type GlossaryLink = {
  label: string;
  href: string;
};

export type GlossaryTerm = {
  /** Anchor id on the glossary page and the #fragment used in JSON-LD. */
  slug: string;
  term: string;
  definition: string;
  related?: GlossaryLink[];
  /** External standard/regulator that defines the term. */
  source?: GlossaryLink;
};

export type GlossaryCategory = {
  id: string;
  title: string;
  intro: string;
  terms: GlossaryTerm[];
};

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "desiccant-types",
    title: "Desiccant types",
    intro: "The materials used to control moisture, and how they differ.",
    terms: [
      {
        slug: "silica-gel",
        term: "Silica gel",
        definition:
          "A porous, granular form of amorphous silicon dioxide (SiO₂) used as a desiccant. Its internal pore network gives it a very large surface area, letting it adsorb typically around one third of its own weight in water vapor at high humidity. It is inert, non-flammable, and non-toxic in its pure white form, which is why it is the default desiccant for packaging and export cargo.",
        related: [
          { label: "What is silica gel and how does it work", href: "/blog/what-is-silica-gel-and-how-does-it-work" },
          { label: "Bulk industrial silica gel", href: "/products/bulk-industrial" },
        ],
      },
      {
        slug: "indicating-silica-gel",
        term: "Indicating silica gel",
        definition:
          "Silica gel impregnated with a moisture-sensitive dye that changes color as the beads take up water, giving a visual signal of remaining capacity. Orange indicating gel (methyl violet or similar cobalt-free indicators) turns green or colorless when saturated; legacy blue gel uses cobalt chloride and turns pink. It is used where inspection matters, such as breathers, instrument cases, and reusable systems.",
        related: [
          { label: "Orange vs blue color-change guide", href: "/blog/indicating-silica-gel-orange-blue-color-change-guide" },
          { label: "Indicating vs non-indicating silica gel", href: "/compare/indicating-vs-non-indicating-silica-gel" },
        ],
      },
      {
        slug: "non-indicating-silica-gel",
        term: "Non-indicating (white) silica gel",
        definition:
          "Pure silica gel with no color-change dye, appearing as translucent white beads or granules. It has the same adsorption behavior as indicating gel but contains no indicator chemistry, making it the standard choice for food, pharmaceutical, and general export packaging. Saturation can only be confirmed by weighing or by a separate humidity indicator card.",
        related: [
          { label: "White vs orange silica gel", href: "/compare/white-silica-gel-vs-orange-silica-gel" },
          { label: "Silica gel colors explained", href: "/blog/silica-gel-colors-white-blue-orange-explained" },
        ],
      },
      {
        slug: "clay-desiccant",
        term: "Clay (bentonite) desiccant",
        definition:
          "A natural desiccant made from activated bentonite or montmorillonite clay. It adsorbs less moisture per gram than silica gel and performs best at moderate temperatures, but its lower cost per kilogram makes it common for container and warehouse duty where space is not constrained. Unlike silica gel it is a mined mineral rather than a synthesized material.",
        related: [
          { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" },
          { label: "Dry clay desiccant product", href: "/products/dry-clay-desiccant" },
        ],
      },
      {
        slug: "molecular-sieve",
        term: "Molecular sieve",
        definition:
          "A synthetic zeolite desiccant with uniform, precisely sized pores that adsorb water molecules selectively and hold them strongly even at very low humidity and elevated temperature. It can dry air to lower dew points than silica gel but costs several times more and needs higher regeneration temperatures. Typical uses are insulated glass units, refrigerant drying, and gas processing rather than general cargo protection.",
        related: [
          { label: "Silica gel vs molecular sieve", href: "/compare/silica-gel-vs-molecular-sieve" },
          { label: "Silica gel vs molecular sieve vs activated alumina", href: "/blog/silica-gel-vs-molecular-sieve-vs-activated-alumina" },
        ],
      },
      {
        slug: "activated-alumina",
        term: "Activated alumina",
        definition:
          "A porous form of aluminum oxide (Al₂O₃) used as a desiccant and adsorbent, most often in compressed-air dryers and water treatment. It withstands crushing and repeated thermal regeneration better than silica gel, which suits continuous industrial drying loops. For one-way packaging and shipping protection it is generally not cost-effective compared with silica gel or clay.",
        related: [
          { label: "Silica gel vs molecular sieve vs activated alumina", href: "/blog/silica-gel-vs-molecular-sieve-vs-activated-alumina" },
        ],
      },
      {
        slug: "calcium-chloride-desiccant",
        term: "Calcium chloride desiccant",
        definition:
          "A salt-based desiccant that absorbs water vapor chemically and can take up more than its own weight in moisture, turning it into a brine that is held in a gel or a leak-resistant reservoir. Its high capacity at high humidity makes it popular for long ocean voyages in container poles and strips. The trade-off is that it creates a contained liquid, so pouch integrity matters near sensitive cargo.",
        related: [
          { label: "Silica gel vs calcium chloride container desiccant", href: "/compare/silica-gel-vs-calcium-chloride-container-desiccant" },
          { label: "Container desiccant strips", href: "/products/container-strips" },
        ],
      },
      {
        slug: "deliquescent-desiccant",
        term: "Deliquescent desiccant",
        definition:
          "Any desiccant, such as calcium chloride, that absorbs so much water it dissolves into a liquid solution. Deliquescent materials offer very high moisture capacity but must be packaged so the resulting brine cannot escape onto cargo. Silica gel is not deliquescent: it stays a dry solid even when fully saturated.",
        related: [
          { label: "Silica gel vs calcium chloride container desiccant", href: "/compare/silica-gel-vs-calcium-chloride-container-desiccant" },
        ],
      },
    ],
  },
  {
    id: "moisture-physics",
    title: "Moisture physics",
    intro: "The science behind humidity damage and how desiccants stop it.",
    terms: [
      {
        slug: "adsorption",
        term: "Adsorption",
        definition:
          "The process by which molecules of a gas or liquid attach to the surface of a solid. Silica gel works by adsorption: water vapor bonds to the internal surfaces of its pores rather than soaking into the material itself. Because the water is only surface-bound, heating the gel drives it off again, which is what makes regeneration possible.",
        related: [
          { label: "What is silica gel and how does it work", href: "/blog/what-is-silica-gel-and-how-does-it-work" },
        ],
      },
      {
        slug: "absorption",
        term: "Absorption",
        definition:
          "The uptake of a substance into the bulk volume of a material, as opposed to onto its surface. Deliquescent desiccants such as calcium chloride absorb water and change state as they do so, while silica gel adsorbs it onto pore surfaces and remains a dry solid. The distinction matters for handling: absorbed water can become free liquid, adsorbed water cannot.",
        related: [
          { label: "Silica gel vs calcium chloride container desiccant", href: "/compare/silica-gel-vs-calcium-chloride-container-desiccant" },
        ],
      },
      {
        slug: "adsorption-isotherm",
        term: "Adsorption isotherm",
        definition:
          "A curve showing how much water a desiccant holds at equilibrium, as a percentage of its own weight, across the range of relative humidity at a fixed temperature. It shows that capacity is not a single number: silica gel approaches its maximum only near saturation and holds far less in dry air. Buyers use isotherms to size desiccant for the actual humidity a shipment will see.",
        related: [
          { label: "Relative humidity and adsorption isotherms explained", href: "/blog/relative-humidity-and-adsorption-isotherms-explained" },
        ],
      },
      {
        slug: "relative-humidity",
        term: "Relative humidity (RH)",
        definition:
          "The amount of water vapor in air expressed as a percentage of the maximum that air could hold at its current temperature. Because warm air holds more vapor, RH rises as air cools even when no water is added, which is the mechanism behind condensation in transit. Most cargo damage thresholds are specified as an RH level inside the package rather than an absolute amount of water.",
        related: [
          { label: "Relative humidity and adsorption isotherms explained", href: "/blog/relative-humidity-and-adsorption-isotherms-explained" },
          { label: "Moisture load calculator", href: "/tools/moisture-load-calculator" },
        ],
      },
      {
        slug: "equilibrium-relative-humidity",
        term: "Equilibrium relative humidity (ERH)",
        definition:
          "The relative humidity that a sealed package settles at once the desiccant, the air, and the goods have exchanged moisture and reached balance. Desiccant sizing works backwards from a target ERH set by the cargo's damage threshold. The lower the target ERH, the more desiccant capacity is required, because the gel holds less water at low humidity.",
        related: [
          { label: "Relative humidity and adsorption isotherms explained", href: "/blog/relative-humidity-and-adsorption-isotherms-explained" },
        ],
      },
      {
        slug: "dew-point",
        term: "Dew point",
        definition:
          "The temperature at which air becomes saturated with water vapor (100% RH) and condensation begins to form. When any surface inside a container or package is colder than the dew point of the surrounding air, liquid water appears on it. Desiccants prevent condensation by removing vapor so the dew point of the enclosed air falls below the coldest surface temperature it will meet.",
        related: [
          { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
        ],
      },
      {
        slug: "hygroscopic",
        term: "Hygroscopic",
        definition:
          "Describes a material that naturally attracts and holds moisture from the surrounding air. Hygroscopic cargo such as grain, rice, spices, wood, leather, and paper carries its own water into a container and releases it as temperatures change, feeding condensation cycles. Shipments of hygroscopic goods generally need more desiccant capacity than the container air alone would suggest.",
        related: [
          { label: "Silica gel for rice, grain, and spice export", href: "/blog/silica-gel-for-rice-grain-spice-export" },
        ],
      },
      {
        slug: "water-activity",
        term: "Water activity (aw)",
        definition:
          "A measure of the free, biologically available water in a product, expressed on a scale from 0 to 1, where the water activity of a food equals the relative humidity (divided by 100) of air in equilibrium with it. Microbial growth generally requires elevated water activity, which is why keeping packaged food at low humidity extends shelf life. It is a standard specification in food and pharmaceutical quality control.",
        related: [
          { label: "Food-grade silica gel procurement guide", href: "/blog/food-grade-silica-gel-procurement-guide" },
        ],
      },
      {
        slug: "bound-vs-free-moisture",
        term: "Bound vs free moisture",
        definition:
          "Free moisture is water vapor in the package or container air, which a desiccant can adsorb quickly. Bound moisture is water held inside the goods and packaging materials themselves, released slowly as conditions change. Long voyages and hygroscopic cargo shift the sizing question from the air volume to the total bound moisture that will emerge over time.",
        related: [
          { label: "Moisture load calculator", href: "/tools/moisture-load-calculator" },
        ],
      },
      {
        slug: "regeneration",
        term: "Regeneration (reactivation)",
        definition:
          "Heating saturated silica gel to drive off adsorbed water and restore most of its drying capacity, typically in an oven at moderate temperatures for a few hours. Regeneration is practical for loose beads in reusable systems such as breathers and equipment cases. Finished sachets are usually treated as single-use because their paper or film wrapping is not designed for repeated heating.",
        related: [
          { label: "How to regenerate silica gel", href: "/blog/how-to-regenerate-silica-gel-oven-temperature-guide" },
          { label: "Can you reuse silica gel?", href: "/blog/can-you-reuse-silica-gel" },
        ],
      },
      {
        slug: "mvtr",
        term: "MVTR (moisture vapor transmission rate)",
        definition:
          "The rate at which water vapor passes through a packaging material, usually stated in grams per square meter per day under defined conditions. A low-MVTR barrier such as foil laminate admits very little new moisture, so a small desiccant charge lasts the whole journey. A high-MVTR material such as paper or breathable film admits humidity continuously, and the desiccant must be sized for that ongoing ingress.",
        related: [
          { label: "How many desiccant packets per box", href: "/blog/how-many-desiccant-packets-per-box-calculation-guide" },
        ],
      },
    ],
  },
  {
    id: "standards-compliance",
    title: "Standards, compliance, and documentation",
    intro: "The specifications, regulations, and paperwork behind desiccant purchasing.",
    terms: [
      {
        slug: "din-55473",
        term: "DIN 55473",
        definition:
          "The German industrial standard for desiccant bags, defining the desiccant unit, adsorption performance requirements, dust behavior, and bag classes used in packaging specifications. Many export packing specs worldwide reference DIN 55473 units rather than desiccant weight, so quantities stay comparable across materials. The standard is published by DIN and distributed through DIN Media.",
        related: [
          { label: "Desiccant units explained (DIN 55473)", href: "/blog/desiccant-units-explained-din-55473-and-unit-sizing" },
        ],
        source: { label: "DIN Media (DIN standards catalogue)", href: "https://www.dinmedia.de/en" },
      },
      {
        slug: "desiccant-unit",
        term: "Desiccant unit",
        definition:
          "A standardized quantity of desiccant defined by its water-vapor adsorption performance under test conditions rather than by weight, so specifications are independent of the desiccant material. One unit of silica gel weighs more than one unit of a higher-capacity material, but both adsorb the same defined amount of water in the test. Packing specifications and calculators state dosage in units for this reason.",
        related: [
          { label: "Desiccant units explained (DIN 55473)", href: "/blog/desiccant-units-explained-din-55473-and-unit-sizing" },
          { label: "Container desiccant calculator", href: "/tools/container-desiccant-calculator" },
        ],
        source: { label: "DIN Media (DIN 55473)", href: "https://www.dinmedia.de/en" },
      },
      {
        slug: "mil-d-3464",
        term: "MIL-D-3464",
        definition:
          "The United States military specification for activated desiccant bags, defining performance grades, unit sizes, and dusting requirements for packaging use. Type I covers general packaging and Type II adds low-dusting requirements for critical equipment. It remains a common reference in aerospace, defense, and electronics purchasing specifications; the document is accessible through the US DLA ASSIST database.",
        related: [
          { label: "Desiccant units explained", href: "/blog/desiccant-units-explained-din-55473-and-unit-sizing" },
        ],
        source: { label: "DLA ASSIST Quick Search", href: "https://quicksearch.dla.mil/" },
      },
      {
        slug: "reach",
        term: "REACH",
        definition:
          "The European Union regulation on the Registration, Evaluation, Authorisation and Restriction of Chemicals, administered by the European Chemicals Agency (ECHA). It governs which substances may be placed on the EU market and requires suppliers to communicate hazards down the supply chain. For desiccant buyers its main practical effect is the restriction of cobalt chloride indicating gel in favor of cobalt-free alternatives.",
        related: [
          { label: "Cobalt-free orange vs blue indicating silica gel", href: "/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety" },
        ],
        source: { label: "ECHA: Understanding REACH", href: "https://echa.europa.eu/regulations/reach/understanding-reach" },
      },
      {
        slug: "svhc",
        term: "SVHC (Substance of Very High Concern)",
        definition:
          "A REACH designation for substances with serious hazard properties, such as carcinogenicity or reproductive toxicity, placed on the ECHA Candidate List. Once listed, suppliers must notify customers when an article contains the substance above a threshold concentration. Cobalt dichloride, the indicator in legacy blue silica gel, is on the Candidate List, which is why blue indicating gel has fallen out of use in Europe.",
        related: [
          { label: "Cobalt-free orange vs blue indicating silica gel", href: "/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety" },
        ],
        source: { label: "ECHA Candidate List", href: "https://echa.europa.eu/candidate-list-table" },
      },
      {
        slug: "cobalt-chloride",
        term: "Cobalt chloride",
        definition:
          "The moisture-indicating dye used in traditional blue silica gel, turning from blue to pink as the gel saturates. It is classified in the EU as a carcinogen and listed as a Substance of Very High Concern under REACH, so cobalt-containing indicating gel is restricted or avoided in many markets. Cobalt-free orange indicating gel provides the same visual function without the classification.",
        related: [
          { label: "Cobalt-free orange vs blue safety guide", href: "/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety" },
          { label: "Indicating silica gel color-change guide", href: "/blog/indicating-silica-gel-orange-blue-color-change-guide" },
        ],
        source: { label: "ECHA Candidate List", href: "https://echa.europa.eu/candidate-list-table" },
      },
      {
        slug: "dmf-free-statement",
        term: "DMF-free statement",
        definition:
          "A manufacturer's declaration that a desiccant contains no dimethyl fumarate (DMF), an anti-mould biocide banned in EU consumer products after it caused skin sensitization from treated leather goods. Buyers of desiccant for footwear, leather, furniture, and consumer packaging routinely require this statement, and it is essential for EU-bound leather cargo. It is unrelated to the FDA Drug Master File, which shares the abbreviation; DryGelWorld holds and provides a DMF-free statement on request.",
        related: [
          { label: "Silica gel for pharma packaging buyer guide", href: "/blog/silica-gel-for-pharma-packaging-buyer-guide" },
          { label: "Certifications", href: "/certifications" },
        ],
      },
      {
        slug: "fda-food-contact",
        term: "FDA food contact (21 CFR)",
        definition:
          "In the United States, materials intended to contact food are regulated under Title 21 of the Code of Federal Regulations, which includes provisions covering silicon dioxide and packaging components. For desiccants used inside food packaging, buyers typically verify that both the silica gel and the sachet material are made from substances permitted for food contact. This verification is a buyer-led compliance step documented through supplier declarations rather than a certificate the desiccant itself carries.",
        related: [
          { label: "Food-grade silica gel procurement guide", href: "/blog/food-grade-silica-gel-procurement-guide" },
        ],
        source: { label: "eCFR Title 21 (FDA)", href: "https://www.ecfr.gov/current/title-21" },
      },
      {
        slug: "usp-670",
        term: "USP <670> Auxiliary Packaging Components",
        definition:
          "A United States Pharmacopeia general chapter covering auxiliary packaging components such as desiccants used in pharmaceutical containers, including test methods for adsorption capacity. Pharmaceutical buyers reference it when qualifying desiccant canisters and sachets that ship inside drug packaging. Meeting the chapter's tests is demonstrated through supplier test data reviewed during qualification.",
        related: [
          { label: "Silica gel for pharma packaging buyer guide", href: "/blog/silica-gel-for-pharma-packaging-buyer-guide" },
        ],
        source: { label: "United States Pharmacopeia", href: "https://www.usp.org/" },
      },
      {
        slug: "hs-code-2811-22",
        term: "HS code 2811.22",
        definition:
          "The Harmonized System classification for silicon dioxide, the six-digit heading under which silica gel is normally declared at customs, within Chapter 28 (inorganic chemicals). The six-digit root is consistent across countries; each importing country appends its own suffix digits and sets its own tariff treatment. Importers confirm the full national code and applicable rates with their customs broker.",
        related: [
          { label: "Silica gel HS code and import customs guide", href: "/blog/silica-gel-import-customs-hs-code-guide" },
        ],
        source: { label: "US Harmonized Tariff Schedule (USITC)", href: "https://hts.usitc.gov/" },
      },
      {
        slug: "certificate-of-analysis",
        term: "Certificate of Analysis (COA)",
        definition:
          "A lot-specific document reporting the tested properties of a shipment, typically adsorption capacity, moisture content, bead or granule size, and purity. It lets the buyer's quality team verify that the delivered material matches the agreed specification before release into production. A COA is standard practice for industrial desiccant supply and should accompany each production lot.",
        related: [
          { label: "SDS and COA requirements for buyers", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
        ],
      },
      {
        slug: "certificate-of-origin",
        term: "Certificate of Origin (COO)",
        definition:
          "A trade document certifying the country in which goods were manufactured, usually issued or attested by a chamber of commerce. Customs authorities use it to apply the correct tariff treatment and trade-agreement preferences, and some letters of credit require it. For desiccant shipments it travels with the commercial invoice, packing list, and bill of lading.",
        related: [
          { label: "Export documentation: COO, COA, packing list", href: "/blog/silica-gel-export-documentation-coo-coa-packing-list" },
        ],
      },
      {
        slug: "safety-data-sheet",
        term: "Safety Data Sheet (SDS)",
        definition:
          "A standardized document, structured in sixteen sections under the Globally Harmonized System, describing a product's composition, hazards, safe handling, and transport classification. Silica gel's SDS confirms it is a non-hazardous, inert solid, which simplifies storage, air freight, and customs clearance. Importers keep the SDS on file for workplace-safety and border requirements.",
        related: [
          { label: "SDS and COA requirements for buyers", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
          { label: "Export documentation guide", href: "/blog/silica-gel-export-documentation-coo-coa-packing-list" },
        ],
      },
      {
        slug: "iso-9001",
        term: "ISO 9001:2015",
        definition:
          "The international standard for quality management systems, certifying that a manufacturer operates documented, audited processes for consistent output and continual improvement. It is the baseline credential buyers screen for when qualifying an industrial desiccant supplier. DryGelWorld manufactures under ISO 9001:2015 certification.",
        related: [
          { label: "Certifications", href: "/certifications" },
        ],
        source: { label: "ISO 9001 (iso.org)", href: "https://www.iso.org/iso-9001-quality-management.html" },
      },
    ],
  },
  {
    id: "logistics-shipping",
    title: "Logistics and shipping",
    intro: "Terms from the container, freight, and customs side of desiccant use.",
    terms: [
      {
        slug: "container-rain",
        term: "Container rain",
        definition:
          "Condensation that forms on the ceiling and walls of a shipping container when humid air inside cools against cold steel, then drips onto the cargo below. It is the primary moisture-damage mechanism in ocean freight, driven by day-night temperature swings and climate changes along the route. It is controlled by loading dry cargo, ventilating or sealing appropriately, and installing container desiccants sized to the voyage.",
        related: [
          { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
          { label: "Container desiccant calculator", href: "/tools/container-desiccant-calculator" },
        ],
      },
      {
        slug: "cargo-sweat",
        term: "Cargo sweat",
        definition:
          "Condensation that forms directly on the surface of the cargo itself, when goods that are colder than the surrounding air meet warm humid air, typically as a ship moves from a cold to a warm climate. It is the counterpart of container rain, where water condenses on the container instead. Both are prevented the same way: keeping the dew point of the container air below the temperature of every surface inside.",
        related: [
          { label: "Best desiccant for shipping containers", href: "/blog/best-desiccant-for-shipping-containers" },
        ],
      },
      {
        slug: "dunnage",
        term: "Dunnage",
        definition:
          "Material used to support, brace, and separate cargo inside a container or hold, such as timber, airbags, mats, and kraft paper. Wet or green dunnage is a common hidden moisture source: freshly cut wood can carry a substantial amount of water into a sealed container. Moisture-conscious loading specifies dried dunnage and accounts for it when sizing desiccant.",
        related: [
          { label: "How exporters protect cargo from humidity", href: "/blog/how-exporters-protect-cargo-from-humidity" },
        ],
      },
      {
        slug: "incoterms",
        term: "Incoterms (EXW, FOB, CIF, DAP)",
        definition:
          "Standardized trade terms published by the International Chamber of Commerce that define where cost and risk pass from seller to buyer. In desiccant quotations the common terms are EXW (buyer collects at the factory), FOB (seller delivers loaded on the vessel at the origin port), CIF (seller also pays freight and insurance to the destination port), and DAP (seller delivers to the named destination place). Comparing supplier prices requires putting them on the same Incoterm first.",
        related: [
          { label: "Silica gel bulk pricing factors for exporters", href: "/blog/silica-gel-bulk-pricing-factors-for-exporters" },
        ],
        source: { label: "International Chamber of Commerce", href: "https://iccwbo.org/" },
      },
      {
        slug: "isf-filing",
        term: "ISF filing (Importer Security Filing)",
        definition:
          "A US Customs and Border Protection requirement, often called 10+2, under which importers must electronically file shipment data before ocean cargo is loaded for the United States. The filing includes seller, buyer, manufacturer, and HS classification details, so the desiccant's HS code and supplier information must be accurate and available early. Late or inaccurate filings can trigger penalties and holds, which is why brokers request documents well before sailing.",
        related: [
          { label: "Silica gel import customs guide", href: "/blog/silica-gel-import-customs-hs-code-guide" },
        ],
        source: { label: "US Customs and Border Protection", href: "https://www.cbp.gov/" },
      },
    ],
  },
  {
    id: "packaging-procurement",
    title: "Packaging and procurement",
    intro: "Sachet materials, indicators, and the commercial terms of buying desiccant.",
    terms: [
      {
        slug: "tyvek",
        term: "Tyvek",
        definition:
          "A DuPont-branded nonwoven material of flash-spun high-density polyethylene fibers, used as a premium desiccant sachet wall. It is highly permeable to water vapor yet exceptionally tear-resistant, low-dusting, and resistant to liquid water, which suits electronics, medical, and pharmaceutical packaging. It costs more than paper or perforated film, so it is specified where cleanliness and strength justify the premium.",
        related: [
          { label: "Paper vs Tyvek vs film sachet materials", href: "/blog/paper-vs-tyvek-vs-film-desiccant-sachet-materials" },
        ],
      },
      {
        slug: "sachet",
        term: "Sachet (desiccant packet)",
        definition:
          "A small sealed pouch of desiccant, with walls of paper, nonwoven fabric, or perforated film that let water vapor in while keeping the beads contained. Sachets are specified by fill weight (commonly from under a gram to hundreds of grams), wall material, and any printing such as warnings or branding. They are the standard format for in-box and in-bag moisture protection.",
        related: [
          { label: "Paper desiccant sachets", href: "/products/paper-sachets" },
          { label: "Retail silica gel sachets", href: "/products/retail-sachets" },
        ],
      },
      {
        slug: "humidity-indicator-card",
        term: "Humidity indicator card (HIC)",
        definition:
          "A printed card with chemical spots that change color at defined relative-humidity levels, placed inside a package to show the humidity history at a glance. Electronics packaging commonly pairs an HIC with desiccant inside a moisture barrier bag so receiving inspection can confirm the parts stayed dry. Cobalt-free indicator chemistries are now standard for the same REACH reasons as indicating silica gel.",
        related: [
          { label: "Desiccant for electronics packaging", href: "/blog/desiccant-for-electronics-packaging" },
        ],
      },
      {
        slug: "moisture-barrier-bag",
        term: "Moisture barrier bag (MBB)",
        definition:
          "A laminated bag, usually including a foil layer, that forms a near-hermetic barrier against water vapor around sensitive goods such as electronic components. Because almost no new moisture enters through the walls, the desiccant inside only has to handle the air sealed in at closing plus moisture released by the contents. This sharply reduces the desiccant quantity compared with breathable packaging.",
        related: [
          { label: "Desiccant for electronics packaging", href: "/blog/desiccant-for-electronics-packaging" },
        ],
      },
      {
        slug: "moq",
        term: "MOQ (minimum order quantity)",
        definition:
          "The smallest order a supplier will accept for a given product, driven by production batch sizes, printing plate setup, and freight economics. For desiccants, custom-printed sachets typically carry higher MOQs than stock items because each artwork requires a dedicated production run. Buyers comparing quotes should check the MOQ alongside the unit price, since a low price at an unusable MOQ is not a real offer.",
        related: [
          { label: "Bulk silica gel supplier checklist", href: "/blog/bulk-silica-gel-supplier-checklist" },
          { label: "Bulk silica gel vs packets", href: "/compare/bulk-silica-gel-vs-packets" },
        ],
      },
      {
        slug: "private-label-oem",
        term: "Private label / OEM",
        definition:
          "A supply arrangement in which the manufacturer produces desiccant sachets printed with the buyer's brand, warnings, and languages instead of the maker's own. It lets distributors and packaging companies sell under their own name while the factory handles production and compliance documents. Typical variables are sachet size, wall material, artwork, language requirements, and MOQ per printed design.",
        related: [
          { label: "Private label silica gel packets guide", href: "/blog/private-label-silica-gel-packets-guide" },
        ],
      },
      {
        slug: "vci",
        term: "VCI (volatile corrosion inhibitor)",
        definition:
          "A chemistry, usually carried in paper or film, that slowly releases vapor-phase molecules which deposit an invisible protective layer on metal surfaces and interrupt the corrosion reaction. VCI protects metal even when humidity cannot be fully controlled, so it complements rather than replaces desiccant in metal-goods export. Desiccant lowers the humidity; VCI protects the surface against whatever humidity remains.",
        related: [
          { label: "Desiccant vs VCI for corrosion protection", href: "/compare/desiccant-vs-vci-corrosion-protection" },
        ],
      },
    ],
  },
];

export const glossaryTerms: GlossaryTerm[] = glossaryCategories.flatMap(
  (category) => category.terms,
);
