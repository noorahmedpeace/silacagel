import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import styles from "../../strategy-pages.module.css";

const GLOSSARY_PATH = "/guides/desiccant-glossary";
const GLOSSARY_TITLE = "Desiccant & Silica Gel Glossary";
const GLOSSARY_DESCRIPTION =
  "A buyer's glossary of silica gel and desiccant terms - adsorption, relative humidity, isotherms, DIN 55473 units, COA, SDS, MVTR, dew point, container rain, and more, defined for procurement teams.";

export const metadata: Metadata = {
  title: GLOSSARY_TITLE,
  description: GLOSSARY_DESCRIPTION,
  alternates: { canonical: GLOSSARY_PATH },
  openGraph: {
    title: GLOSSARY_TITLE,
    description: GLOSSARY_DESCRIPTION,
    url: GLOSSARY_PATH,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: GLOSSARY_TITLE,
    description: GLOSSARY_DESCRIPTION,
  },
};

type GlossaryTerm = {
  term: string;
  definition: string;
  related?: { label: string; href: string };
};

// Alphabetical. Definitions are buyer-facing and provenance-safe: only
// ISO 9001:2015 + DMF-free are described as held; food-grade/FDA/REACH-
// food-contact are described as buyer-led compliance, never as held credentials.
const terms: GlossaryTerm[] = [
  {
    term: "Adsorption",
    definition:
      "The process by which water vapor molecules attach to the internal surface of a porous solid such as silica gel. It is a physical surface process (distinct from absorption, where a substance is taken up into the bulk of a material) and is reversible by heating.",
    related: { label: "What is silica gel and how it works", href: "/blog/what-is-silica-gel-and-how-does-it-work" },
  },
  {
    term: "Absorption",
    definition:
      "The taking up of a substance into the bulk volume of a material, as opposed to onto its surface. Deliquescent desiccants such as calcium chloride absorb water (turning it into a liquid/gel); silica gel adsorbs it onto pore surfaces.",
    related: { label: "Silica gel vs calcium chloride container desiccant", href: "/compare/silica-gel-vs-calcium-chloride-container-desiccant" },
  },
  {
    term: "Adsorption isotherm",
    definition:
      "A curve showing how much water a desiccant holds (as a percentage of its own weight) at each equilibrium relative humidity, at a fixed temperature. It reveals that capacity is not a single number - silica gel approaches its ~33% figure only near high humidity.",
    related: { label: "Relative humidity and adsorption isotherms explained", href: "/blog/relative-humidity-and-adsorption-isotherms-explained" },
  },
  {
    term: "Bound vs free moisture",
    definition:
      "Free moisture is water vapor in the package air that a desiccant can readily adsorb. Bound moisture is held within the goods themselves (e.g. inside leather or grain) and is released slowly over time, which is why long-stored cargo can need extra desiccant capacity.",
  },
  {
    term: "Certificate of Analysis (COA)",
    definition:
      "A document reporting the tested properties of a supplied lot - typically purity, moisture content, bead size, and adsorption capacity - so a buyer's QC team can verify the material meets specification. DryGelWorld provides a COA on request.",
    related: { label: "SDS and COA requirements for buyers", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
  },
  {
    term: "Clay desiccant",
    definition:
      "A natural mineral desiccant (activated bentonite/montmorillonite) with up to ~25% adsorption capacity and a ~50°C working ceiling. Lower cost per kg than silica gel; used for cost-tier container loadings and warehouse stock.",
    related: { label: "Silica gel vs clay desiccant", href: "/compare/silica-gel-vs-clay-desiccant" },
  },
  {
    term: "Cobalt chloride",
    definition:
      "The indicator used in legacy blue indicating silica gel. Classified under EU REACH as a Category 1B carcinogen and a Substance of Very High Concern, so it is restricted in the EU, UK, Australia, and Canada. Orange (non-cobalt) indicating gel is the modern alternative.",
    related: { label: "Cobalt-free orange vs blue indicating silica gel", href: "/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety" },
  },
  {
    term: "Container rain",
    definition:
      "Condensation that forms inside a shipping container when warm humid air cools against the container roof and walls, then drips onto cargo. The primary moisture-damage mechanism in ocean freight, controlled with container desiccants and dry loading.",
    related: { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
  },
  {
    term: "Deliquescent desiccant",
    definition:
      "A desiccant (such as calcium chloride) that adsorbs so much water it dissolves into a liquid or gel, contained within a pouch. Offers very high capacity (150-300% of its weight) but introduces a contained-liquid rather than a solid.",
    related: { label: "Silica gel vs calcium chloride container desiccant", href: "/compare/silica-gel-vs-calcium-chloride-container-desiccant" },
  },
  {
    term: "Dew point",
    definition:
      "The temperature at which air becomes saturated (100% RH) and water begins to condense. Keeping package air below its dew point - by lowering humidity with desiccant - prevents condensation on cargo and container surfaces.",
  },
  {
    term: "DIN 55473 unit",
    definition:
      "A standardized 'desiccant unit' defined by the German standard DIN 55473 (echoed in MIL-D-3464): the quantity adsorbing a defined amount of water vapor under test conditions. For silica gel, one unit ≈ 33-34 grams. Used so specs are material-independent.",
    related: { label: "Desiccant units explained (DIN 55473)", href: "/blog/desiccant-units-explained-din-55473-and-unit-sizing" },
  },
  {
    term: "DMF-free statement",
    definition:
      "A manufacturer-letterhead declaration that the silica gel is not produced under or referenced to a regulatory Drug Master File. Requested by some pharma buyers for non-direct-contact secondary packaging. DryGelWorld holds and provides a DMF-free statement.",
    related: { label: "Silica gel for pharma packaging buyer guide", href: "/blog/silica-gel-for-pharma-packaging-buyer-guide" },
  },
  {
    term: "Equilibrium relative humidity (ERH)",
    definition:
      "The relative humidity a sealed package settles at once the desiccant and contents reach balance. The target ERH (set by the cargo's damage threshold) drives how much desiccant capacity is required at that point on the isotherm.",
    related: { label: "Relative humidity and adsorption isotherms explained", href: "/blog/relative-humidity-and-adsorption-isotherms-explained" },
  },
  {
    term: "HS code 2811.22",
    definition:
      "The Harmonized System classification for silica gel (silicon dioxide), within Chapter 28 (inorganic chemicals). The six-digit root is consistent internationally; each country adds its own tariff suffix, confirmed by the importer's customs broker.",
    related: { label: "Silica gel HS code and import customs guide", href: "/blog/silica-gel-import-customs-hs-code-guide" },
  },
  {
    term: "Indicating silica gel",
    definition:
      "Silica gel impregnated with a moisture-sensitive dye that changes color as it saturates, giving a visible QC signal. Orange (non-cobalt, REACH-compliant) is the modern standard; blue (cobalt chloride) is restricted in several markets.",
    related: { label: "Indicating silica gel orange/blue color-change guide", href: "/blog/indicating-silica-gel-orange-blue-color-change-guide" },
  },
  {
    term: "ISO 9001:2015",
    definition:
      "The international quality-management-system standard. DryGelWorld manufactures under ISO 9001:2015 certification - its core held credential alongside the DMF-free statement.",
    related: { label: "Certifications", href: "/certifications" },
  },
  {
    term: "Moisture barrier bag (MBB)",
    definition:
      "A laminated foil bag that forms a near-hermetic moisture barrier around goods (common for electronics). Because little new water enters, the desiccant inside an MBB only manages trapped air and goods moisture, sharply reducing the quantity needed.",
    related: { label: "Desiccant for electronics packaging", href: "/blog/desiccant-for-electronics-packaging" },
  },
  {
    term: "Molecular sieve",
    definition:
      "A synthetic zeolite with precisely calibrated pore size that selectively adsorbs water to very low humidity (<1% RH). Costs 2-4× silica gel and regenerates at higher temperatures; used for insulated glass, refrigerant drying, and deep-drying. Not in the DryGelWorld catalog.",
    related: { label: "Silica gel vs molecular sieve", href: "/compare/silica-gel-vs-molecular-sieve" },
  },
  {
    term: "MVTR (moisture vapor transmission rate)",
    definition:
      "The rate at which water vapor passes through a packaging material. A low-MVTR barrier (foil laminate) admits little moisture, so desiccant sizing stays near baseline; a high-MVTR barrier (breathable film, paper) admits humidity continuously and requires more desiccant.",
    related: { label: "How many desiccant packets per box", href: "/blog/how-many-desiccant-packets-per-box-calculation-guide" },
  },
  {
    term: "Regeneration (reactivation)",
    definition:
      "Driving adsorbed moisture back out of silica gel by heating (120-150°C for 2-4 hours), restoring most of its capacity. Practical for bulk beads in reusable systems; finished sachets are generally treated as single-use.",
    related: { label: "How to regenerate silica gel (oven guide)", href: "/blog/how-to-regenerate-silica-gel-oven-temperature-guide" },
  },
  {
    term: "Relative humidity (RH)",
    definition:
      "The amount of water vapor in the air as a percentage of the maximum the air can hold at that temperature. Cargo damage tracks RH inside the package rather than absolute water mass, and RH rises as temperature falls - which is what causes container rain.",
    related: { label: "Relative humidity and adsorption isotherms explained", href: "/blog/relative-humidity-and-adsorption-isotherms-explained" },
  },
  {
    term: "Safety Data Sheet (SDS)",
    definition:
      "A standardized document covering a product's identity, hazards, handling, and transport classification. Silica gel is inert/non-hazardous; the SDS also clears the inorganic-chemical border check at customs. DryGelWorld provides an SDS on request.",
    related: { label: "Export documentation: COO, COA, packing list, SDS", href: "/blog/silica-gel-export-documentation-coo-coa-packing-list" },
  },
  {
    term: "Silica gel",
    definition:
      "Amorphous silicon dioxide (SiO₂) manufactured into a porous granular desiccant that adsorbs up to ~33% of its weight in water vapor. Non-toxic, non-flammable, inert, and regenerable; the global industrial standard for moisture control.",
    related: { label: "How silica gel is made", href: "/blog/how-silica-gel-is-made-manufacturing-process" },
  },
  {
    term: "VCI (vapor corrosion inhibitor)",
    definition:
      "A chemistry that volatilizes and deposits a protective layer directly on metal surfaces to interrupt corrosion, even at higher humidity. Complements (rather than replaces) desiccant for metal export. Not in the DryGelWorld catalog.",
    related: { label: "Desiccant vs VCI for corrosion protection", href: "/compare/desiccant-vs-vci-corrosion-protection" },
  },
];

export default function DesiccantGlossaryPage() {
  return (
    <main className={styles.page}>
      <article>
        <section className={styles.hero}>
          <span className={styles.kicker}>Reference</span>
          <h1>Desiccant &amp; Silica Gel Glossary</h1>
          <p>
            Plain-language definitions of the silica gel and desiccant terms procurement teams
            meet in specs, quotes, and compliance documents - from adsorption and relative humidity
            to DIN 55473 units, COA, SDS, and MVTR. Each term links to the guide that covers it in depth.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Terms A-Z</h2>
            <p>Defined for buyers and export procurement teams comparing desiccant suppliers.</p>
          </div>
          <div className={styles.grid}>
            {terms.map((entry) => (
              <div className={styles.card} key={entry.term} id={entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}>
                <span>Term</span>
                <h3>{entry.term}</h3>
                <p>{entry.definition}</p>
                {entry.related ? (
                  <p>
                    <Link href={entry.related.href}>{entry.related.label}</Link>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <Link className={styles.cta} href="/contact">
            Request export quote
          </Link>
        </section>

        <section className={styles.section} aria-label="Related references">
          <div className={styles.sectionHead}>
            <h2>Go deeper</h2>
            <p>The pillar guides and comparisons these terms come from.</p>
          </div>
          <div className={styles.relatedGrid}>
            <div className={styles.relatedColumn}>
              <h3>Pillar guides</h3>
              <ul>
                <li><Link href="/guides/silica-gel-buyer-guide">Industrial silica gel buyer guide</Link></li>
                <li><Link href="/blog/what-is-silica-gel-and-how-does-it-work">What is silica gel and how it works</Link></li>
                <li><Link href="/blog/relative-humidity-and-adsorption-isotherms-explained">Relative humidity and adsorption isotherms</Link></li>
              </ul>
            </div>
            <div className={styles.relatedColumn}>
              <h3>Comparisons</h3>
              <ul>
                <li><Link href="/compare">All desiccant comparisons</Link></li>
                <li><Link href="/compare/silica-gel-vs-clay-desiccant">Silica gel vs clay desiccant</Link></li>
                <li><Link href="/compare/silica-gel-vs-calcium-chloride-container-desiccant">Silica gel vs calcium chloride</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "DefinedTermSet",
                "@id": `${absoluteUrl(GLOSSARY_PATH)}#termset`,
                name: GLOSSARY_TITLE,
                description: GLOSSARY_DESCRIPTION,
                url: absoluteUrl(GLOSSARY_PATH),
                publisher: {
                  "@type": "Organization",
                  name: siteName,
                  url: absoluteUrl(),
                },
                hasDefinedTerm: terms.map((entry) => ({
                  "@type": "DefinedTerm",
                  name: entry.term,
                  description: entry.definition,
                  inDefinedTermSet: `${absoluteUrl(GLOSSARY_PATH)}#termset`,
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Guides", href: "/guides/silica-gel-buyer-guide" },
                { name: "Desiccant Glossary", href: GLOSSARY_PATH },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
