import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { seoImages } from "@/lib/seo-images";
import styles from "./guide.module.css";

const GUIDE_PATH = "/guides/silica-gel-buyer-guide";
const GUIDE_TITLE =
  "The Industrial Silica Gel Buyer Guide: Selection, Sizing, Container Desiccants, and Export Packaging Protection";
const GUIDE_DESCRIPTION =
  "The definitive long-form buyer guide for industrial silica gel and desiccant procurement — selection criteria, sizing math, container desiccant deployment, route-humidity adjustments, regulatory documentation, and export packaging discipline. Written by the DryGelWorld Export Desk for B2B procurement teams.";
const GUIDE_META_TITLE = "Industrial Silica Gel Buyer Guide";
const GUIDE_META_DESCRIPTION =
  "Industrial silica gel buyer guide covering selection, sizing, container desiccants, route humidity, export packaging, and document checks.";

const GUIDE_IMAGE = seoImages.buyerGuideProcess;

export const metadata: Metadata = {
  title: GUIDE_META_TITLE,
  description: GUIDE_META_DESCRIPTION,
  alternates: {
    canonical: GUIDE_PATH,
  },
  openGraph: {
    title: GUIDE_META_TITLE,
    description: GUIDE_META_DESCRIPTION,
    url: GUIDE_PATH,
    type: "article",
    images: [
      {
        url: GUIDE_IMAGE.src,
        width: GUIDE_IMAGE.width,
        height: GUIDE_IMAGE.height,
        alt: GUIDE_IMAGE.alt,
      },
    ],
  },
};

const PUBLISHED = "2026-05-13";
const UPDATED = "2026-05-13";

const sections = [
  { id: "selection", label: "1. Silica gel selection criteria" },
  { id: "sizing", label: "2. Sachet sizing math" },
  { id: "container", label: "3. Container desiccant usage" },
  { id: "routes", label: "4. Route and humidity adjustments" },
  { id: "industrial", label: "5. Industrial moisture prevention" },
  { id: "export", label: "6. Export packaging protection" },
  { id: "documentation", label: "7. Documentation and compliance" },
  { id: "checklist", label: "8. Pre-quote buyer checklist" },
];

export default function SilicaGelBuyerGuide() {
  const author = getAuthor(defaultAuthorSlug);

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.hero}>
          <span className={styles.kicker}>Authority Guide · 30 min read</span>
          <h1>The Industrial Silica Gel Buyer Guide</h1>
          <p className={styles.subtitle}>
            Selection, sizing, container desiccants, route adjustments, regulatory
            documentation, and export packaging discipline — written for B2B procurement
            teams importing from Karachi, India, China, and adjacent origin markets.
          </p>
          <div className={styles.meta}>
            {author ? (
              <span>
                By{" "}
                <Link href={`/authors/${author.slug}`} rel="author">
                  {author.name}
                </Link>
              </span>
            ) : null}
            <span>Published {new Date(PUBLISHED).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>Updated {new Date(UPDATED).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.printAction}
              data-print-trigger
              aria-label="Save this guide as a PDF using your browser's print dialog"
            >
              Save as PDF
            </button>
            <Link href="/contact" className={styles.ctaAction}>
              Request Buyer Consultation
            </Link>
          </div>
        </header>

        <figure className={styles.guideVisual}>
          <Image
            src={GUIDE_IMAGE.src}
            alt={GUIDE_IMAGE.alt}
            title={GUIDE_IMAGE.title}
            fill
            className={styles.guideImage}
            sizes="(max-width: 900px) 100vw, 880px"
            priority
          />
          <figcaption>{GUIDE_IMAGE.caption}</figcaption>
        </figure>

        <aside className={styles.execSummary} aria-label="Executive summary">
          <h2>Executive summary — 60 second read</h2>
          <ul>
            <li>
              Industrial silica gel procurement is <strong>five connected decisions</strong> —
              format, sizing math, container deployment, packaging discipline, and
              documentation scope. Get them right at shortlist stage; retrofitting
              mid-program is materially more expensive.
            </li>
            <li>
              Sachet sizing math: silica gel adsorbs <strong>~33% of its weight</strong>{" "}
              in water vapor. A sealed carton at average export humidity holds ~V × 20g
              of vapor; allocate ~V × 60g of silica gel as the base.
            </li>
            <li>
              Container desiccant deployment: <strong>6-10 strips per 20ft, 10-16 per 40ft</strong>{" "}
              on long-haul tropical routes. Distribute evenly; concentrated placement
              doesn&apos;t protect the opposite end of a 40ft container.
            </li>
            <li>
              Route multipliers matter: trans-Pacific and trans-equatorial routes need{" "}
              <strong>1.5-2.0× base sizing</strong> over intra-region short-haul.
            </li>
            <li>
              Documentation: ISO 9001:2015 + SDS + COA + DMF-free is the B2B baseline.
              FDA DMF, food-contact, and pharma DMF are separate regulatory categories
              that need specifically-certified manufacturers.
            </li>
          </ul>
        </aside>

        <nav className={styles.toc} aria-label="Guide contents">
          <h2>What this guide covers</h2>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── 1. Selection ─────────────────────────────────────────────── */}
        <section id="selection" className={styles.section}>
          <h2>1. Silica gel selection criteria</h2>
          <p>
            The first procurement decision is not how much silica gel you need — it&apos;s
            which silica gel. For industrial moisture control there are five practical
            decision axes that determine product fit: <strong>bead format</strong>{" "}
            (sachet, strip, bulk), <strong>format material</strong> (paper, non-woven,
            Tyvek), <strong>indicator option</strong> (non-indicating, orange-indicating,
            blue-indicating), <strong>bead grade</strong> (Type A general, Type B high-
            capacity, indicating, special-pore), and <strong>regulatory scope</strong>{" "}
            (ISO + COA baseline, food-grade, pharma DMF). Get the five axes right at
            shortlist stage and the rest of the procurement conversation becomes
            mechanical.
          </p>

          <h3>Format decision: sachet, strip, or bulk</h3>
          <p>
            Sachets are the right format for per-carton placement inside packaging. They
            ship clean, store well, and adapt to almost any product packaging context.
            Container desiccant strips are the right format for container-ceiling
            deployment on long-haul ocean freight — they handle large air volumes that
            per-carton sachets can&apos;t reach. Bulk silica gel beads are the right
            format for buyers who package their own desiccant in-house, run reusable
            closed-loop industrial systems, or supply downstream sachet makers.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Format</th>
                  <th>Best For</th>
                  <th>Per-kg Cost (relative)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paper sachet, 1g-10g</td>
                  <td>Standard B2B packaging, electronics, leather, textile</td>
                  <td>Reference</td>
                </tr>
                <tr>
                  <td>Paper sachet, 25g-100g</td>
                  <td>Master cartons, pallet supplementary</td>
                  <td>Slightly below reference (bulk format efficiency)</td>
                </tr>
                <tr>
                  <td>Non-woven sachet</td>
                  <td>Bottle headspace inserts, larger sachets</td>
                  <td>+20-40% over paper</td>
                </tr>
                <tr>
                  <td>Container strip 1-2 kg</td>
                  <td>Container ceiling on 20ft/40ft ocean freight</td>
                  <td>Engineered format, premium</td>
                </tr>
                <tr>
                  <td>Bulk beads (paper bag 25-50 kg)</td>
                  <td>In-house sachet packing, closed-loop systems</td>
                  <td>20-30% below packed sachet</td>
                </tr>
                <tr>
                  <td>Bulk beads (jumbo bag 1000 kg)</td>
                  <td>High-volume programs, downstream sachet makers</td>
                  <td>Cheapest per-kg of material</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Indicator decision: orange vs blue vs non-indicating</h3>
          <p>
            Indicating silica gel costs 30-60% more than equivalent non-indicating
            material. Worth the premium when warehouse QC verification is required, the
            program is reusable / closed-loop, or the buyer&apos;s end customer requires
            visible saturation verification. Not worth it for single-use export
            shipments sized correctly upfront — non-indicating gel does identical work
            at lower cost. <strong>Orange indicating gel is the modern standard</strong>{" "}
            because it uses non-cobalt-chloride dye and is REACH-compliant. Blue
            indicating gel uses cobalt chloride which is restricted in EU/UK/AU/CA and
            is migrating out of use globally.
          </p>
        </section>

        {/* ── 2. Sizing ────────────────────────────────────────────────── */}
        <section id="sizing" className={styles.section}>
          <h2>2. Sachet sizing math</h2>
          <p>
            Packet sizing is math, not habit. The base calculation: silica gel adsorbs
            approximately one-third of its weight in water vapor. A sealed carton of
            internal volume V (cubic meters) at average export humidity holds
            approximately V × 20 grams of water vapor. To control that, allocate
            silica gel weighing at least 3× the vapor mass — V × 60 grams. Adjust upward
            for long voyages, high-humidity routes, and weak packaging barriers; adjust
            downward for short routes and tight packaging. Once you have the
            calculation, sizing becomes mechanical.
          </p>

          <h3>Working sizing table by carton volume</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Carton internal volume</th>
                  <th>Sachet size (base sizing)</th>
                  <th>Example contents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.001-0.01 m³ (small unit pack)</td>
                  <td>0.5g-1g sachet</td>
                  <td>Consumer electronics box, small device pack</td>
                </tr>
                <tr>
                  <td>0.01-0.05 m³ (standard product carton)</td>
                  <td>2g-5g sachet</td>
                  <td>Retail SKU box, accessory pack</td>
                </tr>
                <tr>
                  <td>0.05-0.1 m³ (medium product carton)</td>
                  <td>5g-10g sachet</td>
                  <td>Typical export carton, footwear pair</td>
                </tr>
                <tr>
                  <td>0.1-0.5 m³ (master carton)</td>
                  <td>25g-50g sachet</td>
                  <td>Master carton consolidating multiple SKUs</td>
                </tr>
                <tr>
                  <td>0.5-1 m³ (large export carton)</td>
                  <td>50g-100g sachet</td>
                  <td>Large machinery part, bulk garment pack</td>
                </tr>
                <tr>
                  <td>Pallet level (supplementary)</td>
                  <td>250g-500g bag at pallet base</td>
                  <td>Supplementary humidity buffer on pallet</td>
                </tr>
                <tr>
                  <td>Container level (ceiling)</td>
                  <td>1kg-5kg multi-chamber strips, 4-12 per 40ft</td>
                  <td>Long-haul container desiccant program</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            For most B2B applications, allocate sachets at per-carton level AND
            supplementary container strips at container-ceiling level on long-haul
            routes. Don&apos;t rely on container strips alone (sachets protect the
            cargo locally) and don&apos;t rely on sachets alone for trans-equatorial
            long-haul routes (the air volume is too large for sachet-only protection).
          </p>
        </section>

        {/* ── 3. Container desiccant ───────────────────────────────────── */}
        <section id="container" className={styles.section}>
          <h2>3. Container desiccant usage</h2>
          <p>
            Container desiccant is a single-voyage consumable engineered specifically
            for the air volume of a 20ft or 40ft sealed shipping container. The strips
            hang from the inside corrugations of the container or attach to vertical
            posts using built-in hooks or adhesive. Installation takes 5-10 minutes per
            container and should be done immediately before doors are sealed.
          </p>

          <h3>Loading reference per container size and route</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Container</th>
                  <th>Short-haul (≤14 days)</th>
                  <th>Medium-haul (15-25 days)</th>
                  <th>Long-haul (25+ days)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20ft container</td>
                  <td>4-6 strips × 1 kg</td>
                  <td>6-8 strips × 1-2 kg</td>
                  <td>8-12 strips × 1-2 kg</td>
                </tr>
                <tr>
                  <td>40ft container</td>
                  <td>6-8 strips × 1-2 kg</td>
                  <td>8-12 strips × 1-2 kg</td>
                  <td>10-16 strips × 1-2 kg</td>
                </tr>
                <tr>
                  <td>40ft HC (high-cube)</td>
                  <td>8-10 strips × 1-2 kg</td>
                  <td>10-14 strips × 1-2 kg</td>
                  <td>12-18 strips × 1-2 kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Distribution matters as much as quantity.</strong> Spread strips
            evenly through the container — across the ceiling, along both side walls,
            and ideally inside the cargo block itself if the cargo configuration allows.
            Concentrated placement in one corner doesn&apos;t protect cargo at the
            opposite end of a 40ft container during a 25-day voyage, because moisture
            doesn&apos;t equilibrate fast enough across that air volume.
          </p>
        </section>

        {/* ── 4. Route humidity ────────────────────────────────────────── */}
        <section id="routes" className={styles.section}>
          <h2>4. Route and humidity adjustments</h2>
          <p>
            Base sizing assumes standard conditions. Real-world routes deviate. The
            multipliers below scale base sachet and strip sizing by route severity:
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Route pattern</th>
                  <th>Voyage duration</th>
                  <th>Sizing multiplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Intra-region short routes (PK → UAE, IN → SG)</td>
                  <td>3-10 days</td>
                  <td>0.8-1.0× base</td>
                </tr>
                <tr>
                  <td>Cross-equator (PK/IN → AU, EU → SA)</td>
                  <td>15-25 days</td>
                  <td>1.3-1.5× base</td>
                </tr>
                <tr>
                  <td>Tropical-to-temperate long-haul (KHI/MUM → HAM, FEL)</td>
                  <td>25-35 days</td>
                  <td>1.5-2.0× base</td>
                </tr>
                <tr>
                  <td>Trans-Pacific (KHI/SHA → US west/east coast)</td>
                  <td>28-40 days with storm cycling</td>
                  <td>1.75-2.0× base</td>
                </tr>
                <tr>
                  <td>Trans-shipment via hub (e.g. PK → JEA → US)</td>
                  <td>30-50 days total</td>
                  <td>1.5-2.0× base with extra container strips</td>
                </tr>
                <tr>
                  <td>Multi-month destination warehouse storage</td>
                  <td>2-6 months</td>
                  <td>+30-50% over voyage sizing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            High-risk routes also benefit from indicating silica gel deployment so the
            destination buyer can verify desiccant condition on arrival without lab
            testing. Mark the indicator condition during loading photos and compare on
            container open.
          </p>
        </section>

        {/* ── 5. Industrial moisture prevention ────────────────────────── */}
        <section id="industrial" className={styles.section}>
          <h2>5. Industrial moisture prevention</h2>
          <p>
            Sachets and strips reduce moisture levels but don&apos;t fix moisture
            sources. The four upstream disciplines that matter more than desiccant
            allocation:
          </p>

          <ol className={styles.steps}>
            <li>
              <strong>Pre-load cargo conditioning.</strong> Kiln-dry leather goods, dry
              textile fabrics, and stabilize electronics in low-humidity staging for
              24-48 hours before final packaging. Cargo that enters the carton with
              elevated moisture content forces the desiccant to fight the cargo first
              before it can protect against voyage humidity — typically 2-3× the
              desiccant is needed to compensate.
            </li>
            <li>
              <strong>Kiln-dried pallets.</strong> Green-wood pallets, wet pallets, or
              pallets stored in humid yards are one of the biggest avoidable sources of
              container humidity. ISPM 15 heat-treated kiln-dried wood OR polymer-skid
              pallets are the right choice for moisture-sensitive cargo. Verify the
              pallet condition at packing stage; don&apos;t assume the warehouse has it
              right.
            </li>
            <li>
              <strong>Loading-area climate control.</strong> If the cargo passes
              through a tropical loading bay before container doors close, the
              container starts the voyage with elevated humidity baked in.
              Climate-controlled staging — even temporary tented dehumidified loading
              — reduces baseline container humidity by 20-40% on tropical-origin
              routes.
            </li>
            <li>
              <strong>Packaging discipline.</strong> Cardboard absorbs moisture and
              releases it slowly inside the container. Cartons stored 48+ hours in dry
              warehouse conditions before pack reduce baseline moisture load. Don&apos;t
              pack moisture-sensitive cargo inside sealed plastic bags — desiccant
              needs vapor access to the cargo space.
            </li>
          </ol>
        </section>

        {/* ── 6. Export packaging ──────────────────────────────────────── */}
        <section id="export" className={styles.section}>
          <h2>6. Export packaging protection</h2>
          <p>
            A practical export packaging protection program combines the right
            desiccant program with the right packaging structure and loading
            documentation. The five-layer reference structure for high-value export
            cargo:
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Component</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Product-level</td>
                  <td>Tissue paper, breathable cotton bag, or VCI film</td>
                  <td>Direct cargo protection from condensation and surface moisture</td>
                </tr>
                <tr>
                  <td>2. Unit carton</td>
                  <td>2g-10g silica gel sachet per unit carton</td>
                  <td>Local humidity buffer inside individual SKU packaging</td>
                </tr>
                <tr>
                  <td>3. Master carton</td>
                  <td>25g-100g sachet per master carton</td>
                  <td>Aggregate humidity buffer at consolidation level</td>
                </tr>
                <tr>
                  <td>4. Pallet</td>
                  <td>250g-500g bag at pallet base; pallet-wrap discipline</td>
                  <td>Supplementary humidity buffer and physical protection</td>
                </tr>
                <tr>
                  <td>5. Container</td>
                  <td>6-16 container desiccant strips by container size and route</td>
                  <td>Whole-container air volume moisture control on long-haul ocean freight</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Not every cargo program needs all five layers. Short-haul intra-region
            cargo typically uses layers 2 and 3 only. Long-haul tropical-to-temperate
            cargo uses all five. Match the program to the cargo&apos;s damage cost — a
            container of high-value electronics deserves over-sizing; a container of
            low-value durable goods doesn&apos;t.
          </p>
        </section>

        {/* ── 7. Documentation ────────────────────────────────────────── */}
        <section id="documentation" className={styles.section}>
          <h2>7. Documentation and compliance</h2>
          <p>
            Documentation determines whether a buyer recovers in arbitration if there&apos;s
            a moisture-damage claim, and whether the desiccant program clears customs
            and end-buyer audits without friction. The standard documentation set for
            industrial silica gel:
          </p>

          <ul className={styles.list}>
            <li>
              <strong>ISO 9001:2015 manufacturer certificate</strong> — proves
              documented process control at the manufacturer. Standard baseline for B2B
              procurement.
            </li>
            <li>
              <strong>Safety Data Sheet (SDS)</strong> per shipment — material
              identification, hazard classification, handling, storage, and disposal.
              Required by most customs authorities and by destination buyer EHS audits.
            </li>
            <li>
              <strong>Certificate of Analysis (COA)</strong> per shipment — moisture
              content, adsorption capacity, particle size distribution (for bead
              format), and batch identifier. Required for pharma and electronics
              applications.
            </li>
            <li>
              <strong>DMF-free statement</strong> — manufacturer letterhead statement
              that the silica gel is not produced under or referenced to a regulatory
              Drug Master File. Required by pharma buyers in some markets when sourcing
              for non-direct-contact secondary packaging.
            </li>
          </ul>

          <p>
            <strong>Regulatory documentation NOT held by DryGelWorld currently:</strong>{" "}
            FDA Drug Master File (DMF), FDA food-contact certification, EU 1935/2004
            Declaration of Compliance, REACH-specific food-contact registration, JEDEC
            moisture sensitivity, MIL-spec, Halal, and FSSC food-grade. Buyers
            requiring those certifications for direct-contact pharma or food
            applications should source from specifically-certified manufacturers and
            treat DryGelWorld as a parallel option for non-direct, non-DMF lines.
            Honest scope conversations upfront save quarterly audit pain later.
          </p>
        </section>

        {/* ── 8. Checklist ────────────────────────────────────────────── */}
        <section id="checklist" className={styles.section}>
          <h2>8. Pre-quote buyer checklist</h2>
          <p>
            Before requesting a quote, B2B buyers should have these data points ready.
            Quoting accuracy improves materially when the desk has full context
            upfront:
          </p>

          <ol className={styles.steps}>
            <li>
              <strong>Cargo type and damage cost per failure.</strong> What goes wrong
              if moisture damages this cargo? What&apos;s the per-unit replacement
              cost? Higher damage cost = more aggressive desiccant sizing is
              economically justified.
            </li>
            <li>
              <strong>Carton volume(s) and master carton volume.</strong> Internal
              cubic-meter volume, not external dimensions. Sizing math depends on
              internal air volume.
            </li>
            <li>
              <strong>Monthly or one-time quantity.</strong> Carton count per month or
              per shipment. Determines MOQ economics and per-kg pricing tier.
            </li>
            <li>
              <strong>Origin and destination port/city.</strong> Drives route
              multiplier from section 4 above.
            </li>
            <li>
              <strong>Container size and load type (FCL/LCL/air).</strong> Affects
              container desiccant deployment recommendation.
            </li>
            <li>
              <strong>Incoterm preference.</strong> FOB, CIF, EXW, DAP, DDP. Affects
              delivered pricing and which logistics costs sit with whom.
            </li>
            <li>
              <strong>Documentation requirement scope.</strong> ISO + SDS + COA
              baseline (most B2B), or specific regulatory requirement (pharma DMF,
              FDA food-contact, REACH, etc).
            </li>
            <li>
              <strong>Private-label / printed sachet requirements.</strong> Yes/no on
              private label; if yes, multi-language label, brand color compliance, SKU
              codes, multi-region labeling.
            </li>
            <li>
              <strong>Sample requirement.</strong> Need sample before bulk, or repeat
              purchase / already tested. Affects sample dispatch timing.
            </li>
            <li>
              <strong>Target price or current supplier benchmark.</strong> Optional
              but useful — clarifies the buyer&apos;s expected price band and lets the
              desk confirm or clarify the gap.
            </li>
          </ol>

          <p>
            Buyers who arrive at quote stage with these ten data points get a usable
            quote in 24-48 hours. Buyers who arrive with &quot;I need silica gel&quot;
            spend 1-2 weeks in back-and-forth before pricing emerges.
          </p>
        </section>

        <section className={styles.summarySection}>
          <h2>Summary</h2>
          <p>
            Industrial silica gel procurement is five connected decisions: pick the
            format and material for your cargo; size sachets and strips against the
            carton-volume / route-multiplier math; deploy container desiccant strips
            on long-haul ocean routes; combine the desiccant program with upstream
            packaging discipline; and verify documentation scope matches the
            destination market&apos;s regulatory requirement. Honest disclosure of
            which certifications a supplier holds versus doesn&apos;t hold matters
            more than aggressive marketing claims — quarterly audit results favor
            transparent suppliers.
          </p>
        </section>

        <aside className={styles.citeBlock} aria-label="Cite this guide">
          <h2>Cite this guide</h2>
          <p>
            Editorial and academic references — please use the citation format below
            so corrections or updates can be tracked properly.
          </p>
          <div className={styles.citationVariants}>
            <div className={styles.citationCard}>
              <h3>Inline reference</h3>
              <p className={styles.citationBody}>
                {author ? `${author.name}, ` : ""}&quot;The Industrial Silica Gel Buyer Guide&quot;,{" "}
                {siteName}, {new Date(UPDATED).toLocaleDateString("en-US", { year: "numeric", month: "long" })}.
              </p>
            </div>
            <div className={styles.citationCard}>
              <h3>Bibliography (APA-style)</h3>
              <p className={styles.citationBody}>
                {author ? `${author.name}. ` : ""}({new Date(UPDATED).getFullYear()}).{" "}
                <em>The industrial silica gel buyer guide: Selection, sizing, container desiccants,
                and export packaging protection.</em> {siteName}. {absoluteUrl(GUIDE_PATH)}
              </p>
            </div>
            <div className={styles.citationCard}>
              <h3>URL only</h3>
              <p className={styles.citationBody}>
                <a href={absoluteUrl(GUIDE_PATH)}>{absoluteUrl(GUIDE_PATH)}</a>
              </p>
            </div>
          </div>
          <p className={styles.citationFooter}>
            For source verification, fact-checking, or interview requests on any data
            point in this guide, contact the {siteName} Export Desk at{" "}
            <a href="mailto:press@drygelworld.com">press@drygelworld.com</a>. Editorial
            scope, certifications held, and honest disclosure of certifications NOT
            held are documented in the{" "}
            <Link href="/media-kit">Press &amp; Media Kit</Link>.
          </p>
        </aside>

        <section className={styles.ctaSection}>
          <h2>Next step</h2>
          <p>
            The {siteName} export desk reviews buyer-specific cargo profiles and
            recommends format, sizing, container strip allocation, and documentation
            scope before quote stage. ISO 9001:2015 manufacturer certification and
            per-shipment SDS + COA are standard.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.primaryCta}>
              Request Buyer Consultation
            </Link>
            <Link href="/compare" className={styles.secondaryCta}>
              Compare desiccant types
            </Link>
            <Link href="/products" className={styles.secondaryCta}>
              Product catalog
            </Link>
          </div>
        </section>
      </article>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              var t = e.target;
              if (t && t.closest && t.closest('[data-print-trigger]')) {
                window.print();
              }
            });
          `,
        }}
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${absoluteUrl(GUIDE_PATH)}#article`,
                headline: GUIDE_TITLE,
                description: GUIDE_DESCRIPTION,
                datePublished: PUBLISHED,
                dateModified: UPDATED,
                inLanguage: "en",
                articleSection: "Authority Guide",
                image: absoluteUrl(GUIDE_IMAGE.src),
                author: author
                  ? {
                      "@type": "Organization",
                      "@id": `${absoluteUrl(`/authors/${author.slug}`)}#author`,
                      name: author.name,
                      url: absoluteUrl(`/authors/${author.slug}`),
                    }
                  : undefined,
                publisher: {
                  "@type": "Organization",
                  name: siteName,
                  url: absoluteUrl(),
                  logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/favicon-192x192.png"),
                  },
                },
                mainEntityOfPage: absoluteUrl(GUIDE_PATH),
                url: absoluteUrl(GUIDE_PATH),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Guides", href: "/guides/silica-gel-buyer-guide" },
                { name: GUIDE_TITLE, href: GUIDE_PATH },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
