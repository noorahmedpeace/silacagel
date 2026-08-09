import type { Metadata } from "next";
import Link from "next/link";
import { SilicaGelCalculator } from "@/components/silica-gel-calculator";
import {
  cartonCubicFeet,
  cartonGrams,
  GRAMS_PER_CUBIC_FOOT,
  piecesForTotalWeight,
  sachetsNeeded,
} from "@/lib/carton-dosage-model";
import { priceGroups } from "@/lib/product-data";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { seoImages } from "@/lib/seo-images";
import shell from "../../strategy-pages.module.css";
import styles from "./calculator-page.module.css";

/**
 * The canonical silica gel calculator.
 *
 * Why this URL exists at all: GSC (90 days to 8 Aug 2026) showed FOUR of this
 * site's own pages splitting the query "silica gel calculator" - the moisture
 * load tool at 15.6, the container calculator at 53.2, /tools at 44.7, and a
 * blog post at 61.5 - with zero clicks between them. "desiccant calculator"
 * split three ways. Adding a fifth page to that fight would have been the worst
 * available move, so this page instead ABSORBS the moisture load tool (301'd
 * here, its carton-volume function folded into the "By carton size" tab) and
 * leaves the container calculator alone, because container dosage is a
 * genuinely different job with genuinely different physics and it is the site's
 * best-performing tool at position 8.4.
 *
 * Everything below the calculator is server-rendered. The tool is the only
 * client island on the page, so every word Google needs is in the HTML.
 */

const pageTitle = "Silica Gel Calculator | How Much Desiccant Do You Need?";
const pageDescription =
  "Free silica gel calculator. Work out sachet quantity, total desiccant weight, and indicative cost by piece count, carton size, or total kilograms.";
const pagePath = "/tools/silica-gel-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "silica gel calculator",
    "silica gel quantity calculator",
    "desiccant calculator",
    "how much silica gel do i need",
    "silica gel sachet calculator",
    "silica gel weight calculator",
  ],
  alternates: { canonical: pagePath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pagePath,
    type: "website",
    images: [
      {
        url: seoImages.desiccantSizing.src,
        width: seoImages.desiccantSizing.width,
        height: seoImages.desiccantSizing.height,
        alt: seoImages.desiccantSizing.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [seoImages.desiccantSizing.src],
  },
};

/** Sample rows for the size guide - computed from the real price table, never
 *  typed, so the guide cannot quote a format the calculator does not offer. */
const SAMPLE_COUNTS = [100, 500, 1000] as const;

/**
 * The worked examples in the method section, computed at build time by the same
 * functions the tool calls. Typing "59 g" as prose would have been quicker and
 * would have silently gone stale the first time the planning rate changed - the
 * whole point of the section is that the reader can trust the arithmetic.
 */
const EX_PIECES = 1000;
const EX_SACHET_G = 0.5;
const EX_CARTON = { l: 40, w: 30, h: 25, unit: "cm" as const, sachet: 5 };
const EX_KG = 25;
const EX_PAPER_SACHET_G = 10;

const exQuantityGrams = EX_PIECES * EX_SACHET_G;
const exCartonFt3 = cartonCubicFeet(EX_CARTON.l, EX_CARTON.w, EX_CARTON.h, EX_CARTON.unit);
const exCartonGrams = cartonGrams(exCartonFt3);
const exCartonSachets = sachetsNeeded(exCartonGrams, EX_CARTON.sachet);
const exWeightPieces = piecesForTotalWeight(EX_KG * 1000, EX_PAPER_SACHET_G);

const n0 = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 0 });
const n2 = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 2 });

const SIZE_GUIDE_USE: Record<string, string> = {
  "Small Sizes": "Retail packs, cartons, instrument cases, electronics trays",
  "Paper Sachet": "Food-adjacent packing, pharmaceutical cartons, garment bags",
  "Bulk & Strip": "Master cartons, pallets, machinery crates, container loads",
};

const factors = [
  {
    label: "Package volume",
    text: "The air inside the pack is what holds the moisture. Volume is the single biggest driver, which is why the carton tab starts from length, width, and height.",
  },
  {
    label: "Barrier material",
    text: "A foil laminate lets in a fraction of what corrugated board does. The same product in a different bag can need several times the desiccant.",
  },
  {
    label: "Storage duration",
    text: "A two-week domestic move and a ten-week ocean voyage are not the same problem. Longer means more moisture ingress to absorb.",
  },
  {
    label: "Route and humidity",
    text: "Monsoon-season Karachi to Rotterdam behaves differently from a dry inland route. Tropical and maritime legs raise the requirement.",
  },
  {
    label: "Product sensitivity",
    text: "Precision electronics, leather, and pharmaceuticals tolerate far less humidity than hardware or plastics.",
  },
  {
    label: "Packing method",
    text: "Whether the desiccant sits loose in the carton, is stitched into a liner, or hangs as a container strip changes how effectively it works.",
  },
];

const applications = [
  {
    title: "How much silica gel for electronics packaging?",
    text: "Boards, connectors, and assemblies corrode long before they look wet. Unit-level sachets inside the ESD bag plus a larger pack in the master carton is the usual arrangement.",
    href: "/industries/electronics-packaging",
    anchor: "silica gel for electronics packaging",
  },
  {
    title: "How much silica gel for leather and footwear?",
    text: "Leather grows mould on humid ocean legs. Sachets go in the shoe box and larger packs in the export carton; this is one of Pakistan's highest-volume desiccant uses.",
    href: "/industries/leather-footwear-export",
    anchor: "desiccant for leather and footwear export",
  },
  {
    title: "How much silica gel for garments and textiles?",
    text: "Mildew and musty odour are the failure modes, and both show up on arrival rather than at dispatch. Poly-bagged garments take small sachets; bales take bulk packs.",
    href: "/industries/textile-garment-export",
    anchor: "garment export desiccant",
  },
  {
    title: "How much desiccant for pharmaceutical packaging?",
    text: "Dosage here is governed by the product's stability data, not by a rule of thumb. Use this calculator for procurement quantities and confirm the specification with your QA team.",
    href: "/industries/pharma-packaging",
    anchor: "pharmaceutical desiccant supply",
  },
  {
    title: "How much silica gel for machinery and spare parts?",
    text: "Machined surfaces rust in transit. Larger 100 g to 500 g packs sit alongside the part inside a sealed liner.",
    href: "/industries/automotive-parts",
    anchor: "desiccant for automotive and machined parts",
  },
  {
    title: "How much silica gel per export carton or pallet?",
    text: "Palletised freight is where per-carton sachets and container-level desiccants meet. Most exporters use both, sized separately.",
    href: "/bulk-silica-gel-desiccant",
    anchor: "bulk silica gel for export programs",
  },
];

const faqs = [
  {
    q: "How much silica gel do I need?",
    a: `It depends on the enclosed volume, the barrier material, how long the goods are stored, and the humidity on the route. As a planning starting point for cartons that are opened and closed, allow about ${GRAMS_PER_CUBIC_FOOT} grams of silica gel per cubic foot of internal volume - the carton tab above does that conversion for you. For sealed export packing or a full container, the requirement is calculated differently.`,
  },
  {
    q: "How many silica gel packets do I need?",
    a: "Work out the total grams first, then divide by the sachet size and round up. A carton needing 140 grams takes 28 x 5 gm sachets, or 47 x 3 gm sachets. The calculator does the rounding, because a part-sachet does not exist.",
  },
  {
    q: "What size silica gel sachet should I buy?",
    a: "Match the sachet to the pack, not to the price. Small 0.5 gm to 5 gm sachets suit retail packs and instrument cases; 10 gm to 20 gm paper sachets suit cartons; 25 gm to 500 gm packs suit master cartons and crates. The size guide table on this page lists every format we make - sachets, bulk packs, and container strips - with its total weight at 100, 500, and 1,000 pieces.",
  },
  {
    q: "How do I calculate silica gel quantity by carton size?",
    a: `Measure the carton's internal length, width, and height, convert to cubic feet, and multiply by ${GRAMS_PER_CUBIC_FOOT}. That gives grams of silica gel; dividing by your sachet size and rounding up gives the piece count. Use the "By carton size" tab to do all three steps at once.`,
  },
  {
    q: "What is the difference between sachet size and total desiccant weight?",
    a: "Sachet size is the grams inside one packet; total desiccant weight is sachet size multiplied by the number of packets. Buyers often quote one when they mean the other, which is the most common cause of a mis-priced quotation. Send both.",
  },
  {
    q: "Is this calculator accurate enough to specify a shipment?",
    a: "It is a planning tool, not a laboratory calculation. It sizes quantity, weight, and indicative cost accurately, and it is a sound basis for a purchase order. Where the moisture load is critical - regulated pharmaceutical packing, high-value electronics, unusually long voyages - ask us for an application-specific recommendation before you commit.",
  },
  {
    q: "How much desiccant does a shipping container need?",
    a: "A container is a different calculation: it depends on container size, cargo moisture content, packaging type, route climate, and voyage length rather than on a per-cubic-foot rule. Use the container desiccant calculator for that, which models air exchange and adsorption capacity properly.",
  },
  {
    q: "Can I order custom sachet sizes or printed sachets?",
    a: "Yes. Beyond the standard formats listed here we produce custom fills and buyer-branded printing under private label, with the artwork and packet specification approved before production.",
  },
  {
    q: "Can DryGelWorld provide COA and SDS documents?",
    a: "Yes. A certificate of analysis and a safety data sheet are issued with orders, and the current documents can be downloaded from the documentation page before you order.",
  },
  {
    q: "Do the prices shown include shipping and duties?",
    a: "No. Figures here are indicative ex-works values for comparison and budgeting. Final pricing depends on quantity, packing, artwork, destination, and Incoterm, and is confirmed on the quotation.",
  },
  {
    q: "Can you supply silica gel for export shipments?",
    a: "Yes. DryGelWorld manufactures in Karachi and has been supplying export programs since 1983, with ISO 9001:2015 certification and export documentation handled as part of the order.",
  },
];

export default function SilicaGelCalculatorPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Silica Gel Calculator", href: pagePath },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Silica Gel Calculator",
        url: absoluteUrl(pagePath),
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript",
        description: pageDescription,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${absoluteUrl()}#organization`, name: brandName },
      },
      {
        "@type": "HowTo",
        name: "How to calculate how much silica gel you need",
        description:
          "Convert a carton's dimensions into a desiccant weight, then into a sachet count you can order.",
        step: [
          {
            "@type": "HowToStep",
            name: "Measure the enclosed volume",
            text: "Take the internal length, width, and height of the carton and convert the volume to cubic feet.",
          },
          {
            "@type": "HowToStep",
            name: "Convert volume to desiccant weight",
            text: `Multiply the cubic feet by ${GRAMS_PER_CUBIC_FOOT} grams per cubic foot to get the planning weight of silica gel.`,
          },
          {
            "@type": "HowToStep",
            name: "Convert weight to a sachet count",
            text: "Divide the grams by your chosen sachet size and round up, because a partial sachet cannot be supplied.",
          },
          {
            "@type": "HowToStep",
            name: "Check the result against the application",
            text: "Increase the allowance for long ocean voyages, humid routes, or moisture-sensitive goods, or request an application-specific recommendation.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
    ],
  };

  return (
    <main className={shell.page}>
      <section className={shell.hero}>
        <span className={shell.kicker}>Calculator</span>
        <h1>Silica gel calculator: how much desiccant do you need?</h1>
        <p>
          Work out sachet quantity, total desiccant weight, and an indicative order value -
          from a piece count, a carton size, or a kilogram target. Built by a silica gel
          manufacturer, using the same formats and rates we quote from.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.heroPrimary} href="#calculator">
            Use the calculator
          </a>
          <Link className={styles.heroSecondary} href="/contact">
            Request a quotation
          </Link>
        </div>
      </section>

      <section className={styles.toolSection} aria-label="Silica gel calculator">
        <SilicaGelCalculator />
        <p className={styles.toolFootnote}>
          Sizing a full shipping container instead? The{" "}
          <Link href="/tools/container-desiccant-calculator">
            container desiccant calculator
          </Link>{" "}
          models air exchange, cargo moisture, and route climate, which a per-carton rule
          cannot do.
        </p>
      </section>

      <section className={shell.section} id="how-much">
        <div className={shell.sectionHead}>
          <h2>How much silica gel do I need?</h2>
          <p>
            There is no single number that is right for every pack, and any supplier who
            gives you one without asking about your packaging is guessing. Six things move
            the answer.
          </p>
        </div>
        <div className={shell.grid}>
          {factors.map((f) => (
            <article className={shell.card} key={f.label}>
              <span>{f.label}</span>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
        <p className={styles.prose}>
          The practical approach for most buyers: use the planning rate above to get a
          defensible starting quantity, then adjust for your route and barrier material. If
          the cargo is high-value or the voyage is long, ask us to review the specification
          before you commit to a production run - that review is free and it is faster than
          a claim.
        </p>
      </section>

      <section className={shell.section} id="method">
        <div className={shell.sectionHead}>
          <h2>How the calculation works</h2>
          <p>
            Nothing here is hidden. These are the exact formulas the tool runs, and the
            worked examples come from the same code that produces your result.
          </p>
        </div>

        <div className={styles.methodGrid}>
          <article className={styles.method}>
            <h3>From a piece count</h3>
            <p className={styles.formula}>pieces x sachet grams = total grams</p>
            <p>
              {n0(EX_PIECES)} x {EX_SACHET_G} gm ={" "}
              <strong>{n0(exQuantityGrams)} g</strong> of silica gel. Multiply the piece
              count by the unit rate for the indicative order value.
            </p>
          </article>
          <article className={styles.method}>
            <h3>From a carton size</h3>
            <p className={styles.formula}>
              (L x W x H) / 28,316.85 = ft&sup3; &nbsp;·&nbsp; ft&sup3; x{" "}
              {GRAMS_PER_CUBIC_FOOT} = grams
            </p>
            <p>
              A {EX_CARTON.l} x {EX_CARTON.w} x {EX_CARTON.h} cm carton is{" "}
              {n2(exCartonFt3)} ft&sup3;, so about{" "}
              <strong>{n0(exCartonGrams)} g</strong> of silica gel - which is{" "}
              {n0(exCartonSachets)} x {EX_CARTON.sachet} gm sachets once you round up. Use
              1,728 as the divisor when measuring in inches.
            </p>
          </article>
          <article className={styles.method}>
            <h3>From a weight target</h3>
            <p className={styles.formula}>total grams / sachet grams = pieces</p>
            <p>
              {EX_KG} kg of {EX_PAPER_SACHET_G} gm paper sachets is{" "}
              <strong>{n0(exWeightPieces)} pieces</strong>. This one rounds up, so you
              always reach the weight you asked for rather than falling just under it.
            </p>
          </article>
        </div>

        <p className={styles.caveat}>
          <strong>What the {GRAMS_PER_CUBIC_FOOT} g/ft&sup3; figure is, honestly.</strong> It
          is a long-standing packing rule of thumb for cartons that are opened and closed
          repeatedly - not a laboratory-derived constant, and not a substitute for a
          moisture-load calculation on a sealed pack. It is a good planning basis and a poor
          specification. Where the difference matters, ask for a technical recommendation.
        </p>
      </section>

      <section className={shell.section} id="size-guide">
        <div className={shell.sectionHead}>
          <h2>Silica gel sachet and pack size guide</h2>
          <p>
            Every format we manufacture, with the total desiccant weight at three common
            order quantities. These are the same formats the calculator offers. Note that
            the Bulk &amp; Strip group is not sachets: those are large packs and container
            strips, sized for master cartons and container loads rather than for dropping
            inside a retail box.
          </p>
        </div>

        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Sachet and pack size guide, scrollable">
          <table className={styles.table}>
            <caption className={styles.tableCaption}>
              Total desiccant weight by format and order quantity
            </caption>
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Format type</th>
                <th scope="col">Typical use</th>
                {SAMPLE_COUNTS.map((c) => (
                  <th scope="col" key={c} className={styles.numeric}>
                    {c.toLocaleString("en-US")} pcs
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {priceGroups.flatMap((group) =>
                group.items.map((item) => (
                  <tr key={`${group.title}-${item.label}`}>
                    <th scope="row">{item.label}</th>
                    <td>{group.title}</td>
                    <td className={styles.useCell}>{SIZE_GUIDE_USE[group.title] ?? group.note}</td>
                    {SAMPLE_COUNTS.map((count) => {
                      const grams = item.grams * count;
                      return (
                        <td key={count} className={styles.numeric}>
                          {grams >= 1000
                            ? `${(grams / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })} kg`
                            : `${grams.toLocaleString("en-US", { maximumFractionDigits: 1 })} g`}
                        </td>
                      );
                    })}
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
        <p className={styles.prose}>
          Weights are exact arithmetic on the fill size. We publish no moisture-capacity
          figure per sachet, because adsorption depends on temperature and relative humidity
          rather than on the packet alone - the{" "}
          <Link href="/silica-gel-packets">silica gel packets range</Link> and the{" "}
          <Link href="/documentation">technical documentation</Link> carry the material
          specifications.
        </p>
      </section>

      <section className={shell.section} id="applications">
        <div className={shell.sectionHead}>
          <h2>Desiccant quantities by application</h2>
          <p>
            How buyers in each sector actually approach the question. Silica gel is not the
            right answer everywhere - for very high moisture loads in containers, calcium
            chloride absorbs several times its own weight and is usually the better tool.
          </p>
        </div>
        <div className={shell.grid}>
          {applications.map((a) => (
            <article className={shell.card} key={a.title}>
              {/* A real h3, not a styled span. These are the long-tail
                  questions buyers actually type - "how much silica gel for
                  electronics" - so they belong in the heading outline where
                  both a reader scanning and a crawler parsing will find them. */}
              <h3 className={styles.appHeading}>{a.title}</h3>
              <p>{a.text}</p>
              <p className={styles.cardLink}>
                <Link href={a.href}>{a.anchor}</Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={shell.section} id="containers">
        <div className={shell.sectionHead}>
          <h2>How much desiccant does a shipping container need?</h2>
          <p>
            A different question with a different answer, and it deserves its own tool rather
            than a rule of thumb stretched past its limits.
          </p>
        </div>
        <p className={styles.prose}>
          A 20 ft or 40 ft container is not simply a very large carton. Its requirement is
          driven by the moisture the cargo itself carries (timber, agricultural goods, and
          textiles release a great deal), by daily air exchange through vents and door seals,
          by the temperature swing between day and night at sea, and by the length of the
          voyage. Those variables interact, which is why a per-cubic-foot rate gives the
          wrong answer at container scale.
        </p>
        <p className={styles.prose}>
          The{" "}
          <Link href="/tools/container-desiccant-calculator">
            container desiccant calculator
          </Link>{" "}
          models all four and returns a unit count for pole, strip, or blanket formats. If
          you already know your format, the{" "}
          <Link href="/shipping-container-desiccant-supplier">
            shipping container desiccant supplier
          </Link>{" "}
          page covers specifications and supply, and{" "}
          <Link href="/blog/container-rain-prevention">container rain and how to prevent it</Link>{" "}
          explains the failure this is all guarding against.
        </p>
      </section>

      <section className={shell.section} id="procurement">
        <div className={shell.sectionHead}>
          <h2>What to send a silica gel supplier</h2>
          <p>
            A quotation is only as good as the brief. Sending these eight things with the
            first email removes a round trip and gets you a firm price rather than a range.
          </p>
        </div>
        <ol className={styles.checklist}>
          <li>
            <strong>Sachet size and format</strong> - the fill weight and whether you need PP,
            paper, or non-woven. Your calculator result above answers this.
          </li>
          <li>
            <strong>Quantity</strong> - in pieces, and the total weight if you know it. Both,
            ideally: the mismatch between the two is the most common quoting error.
          </li>
          <li>
            <strong>Application and packaging</strong> - what the desiccant is protecting and
            what it sits inside.
          </li>
          <li>
            <strong>Destination and Incoterm</strong> - EXW Karachi, FOB Karachi, CIF to your
            port. This changes the price more than most buyers expect.
          </li>
          <li>
            <strong>Documentation</strong> - whether you need{" "}
            <Link href="/documentation">COA and SDS</Link>, and any customs paperwork your
            destination requires.
          </li>
          <li>
            <strong>Printing or private label</strong> - stock sachets or{" "}
            <Link href="/private-label">buyer-branded packets</Link> with your artwork.
          </li>
          <li>
            <strong>Repeat volume</strong> - a monthly or quarterly programme prices
            differently from a one-off.
          </li>
          <li>
            <strong>Timeline</strong> - your required dispatch date, so lead time is quoted
            against something real.
          </li>
        </ol>
        <p className={styles.prose}>
          Ready to send it? The{" "}
          <Link href="/contact">export quote request form</Link> asks for exactly these
          fields, or compare formats first on the{" "}
          <Link href="/pricing">silica gel price list</Link>. For volumes above a tonne, the{" "}
          <Link href="/bulk-silica-gel-desiccant">bulk silica gel desiccant</Link> page covers
          how repeat supply is structured.
        </p>
      </section>

      <section className={shell.section} id="faq">
        <div className={shell.sectionHead}>
          <h2>Silica gel calculation FAQs</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((f) => (
            <details className={styles.faq} key={f.q}>
              <summary>
                <h3>{f.q}</h3>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={shell.section} id="about-this-tool">
        <div className={shell.sectionHead}>
          <h2>Who built this, and what it does not do</h2>
        </div>
        <p className={styles.prose}>
          DryGelWorld (Kamran Enterprises) has manufactured silica gel in Karachi since 1983
          and is certified to ISO 9001:2015. The formats, fill weights, and reference rates in
          this calculator are the ones we quote from - it is not a generic tool built on
          borrowed numbers, which is why the arithmetic is shown rather than hidden.
        </p>
        <p className={styles.prose}>
          What it does: converts between piece counts, carton volumes, total weights, and
          indicative order values, using published formats and rates. What it does not do: it
          does not perform a moisture-load calculation on a sealed barrier pack, it does not
          model container atmospheres (the{" "}
          <Link href="/tools/container-desiccant-calculator">container calculator</Link> does
          that), and it is not a substitute for stability data where a regulator requires it.
          Prices are indicative ex-works and are confirmed on the quotation. When your
          application sits outside those limits, ask - a{" "}
          <Link href="/silica-gel-manufacturer-pakistan">manufacturer</Link> would rather
          size it properly than replace a damaged shipment.
        </p>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
