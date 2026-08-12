import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, authorJsonLd, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { seoImages } from "@/lib/seo-images";
import styles from "../../strategy-pages.module.css";
import st from "../../stickers.module.css";

const GUIDE_PATH = "/guides/desiccant-quantity-guide";
const GUIDE_TITLE = "Desiccant Quantity Guide: How Much Does Your Shipment Need?";
const META_TITLE = "Desiccant Quantity Guide: How Much Per Container & Box";
const META_DESCRIPTION =
  "How much desiccant a shipment needs: container rain causes, sizing factors, strip vs bag vs sachet formats, placement, and what an export quote requires.";

const GUIDE_IMAGE = seoImages.containerHumidityDamage;

const PUBLISHED = "2026-08-12";
const UPDATED = "2026-08-12";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: GUIDE_PATH },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
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
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [GUIDE_IMAGE.src],
  },
};

// The one claim this page must never make is a universal quantity. Every
// number below is the published planning band from the calculator model and
// the DIN 55473 article - bands, not guarantees.
const quantityFactors: { factor: string; effect: string }[] = [
  {
    factor: "Container volume",
    effect:
      "A 40ft high-cube holds ~76 m³ of air against ~33 m³ in a 20ft box - more than double the water vapor sealed in at loading.",
  },
  {
    factor: "Cargo type",
    effect:
      "Hygroscopic cargo (textiles, leather, paper, wood, food) carries and releases its own moisture as temperature cycles; metal, plastic, and glass do not.",
  },
  {
    factor: "Wood and pallets",
    effect:
      "Undried pallets and dunnage are the classic hidden moisture source - wood can hold well above 20% moisture content and release it into a sealed box.",
  },
  {
    factor: "Route climate",
    effect:
      "Tropical and cross-equator lanes load more water into the air and cycle through more condensation events than dry or temperate lanes.",
  },
  {
    factor: "Voyage duration",
    effect:
      "Humid air leaks through door gaskets every day at sea (~0.6% of container volume per day), so a 45-day voyage carries roughly twice the ingress of a 21-day one.",
  },
  {
    factor: "Packaging condition",
    effect:
      "Shrink-wrapped pallets expose less free air than loose stow; cartons sit in between. Packaging sets how much of the container's air the desiccant must dry.",
  },
  {
    factor: "Desiccant working capacity",
    effect:
      "Container-grade silica gel adsorbs up to one-third of its weight in water vapor; sizing at a 300 g/kg working value keeps a safety margin.",
  },
];

const formats: { format: string; whatItIs: string; whenToUse: string }[] = [
  {
    format: "Hanging strips (1-2 kg)",
    whatItIs:
      "High-capacity desiccant in a hangable sleeve, hooked into the container's upper lashing points.",
    whenToUse:
      "The default for container-level protection - condensation forms at the ceiling, so the desiccant belongs above the cargo. Sized in kg per container.",
  },
  {
    format: "Desiccant bags",
    whatItIs: "Bulk desiccant in breathable bags placed on the floor or between pallets.",
    whenToUse:
      "Doses above ~10 kg, part-loaded containers, or stows where nothing can hang. Often combined with strips on high-dose loads.",
  },
  {
    format: "Carton-level sachets",
    whatItIs: "Small silica gel packets (0.5 g - 500 g) inside individual boxes or poly bags.",
    whenToUse:
      "An addition, not a substitute: they protect the goods inside each carton while strips handle the container air. Standard for leather, electronics, and pharma cargo.",
  },
];

const rfqChecklist: string[] = [
  "Container type and count - 20ft, 40ft, or 40ft high-cube, and how many per month",
  "Cargo description - what it is, and whether it is hygroscopic (textiles, leather, paper, food, wood)",
  "Packaging - cartons on pallets, shrink-wrapped, or loose; carton count if sachets are in scope",
  "Pallets and dunnage - plastic, verified kiln-dried wood, or air-dried/HT-only/unknown wood (an ISPM 15 HT stamp certifies pest treatment, not dryness)",
  "Route and season - origin port, destination port, and sailing months",
  "Expected transit duration door-to-door, including inland legs and port dwell",
  "Any buyer specification - DIN 55473 units, a named desiccant type, or a documentation requirement (SDS, COA, DMF-free statement)",
  "Target protection level - container-level only, or container plus carton-level",
];

const mistakes: { title: string; detail: string }[] = [
  {
    title: "Copying last shipment's quantity onto a different route",
    detail:
      "A dose sized for Karachi-Jebel Ali in winter under-protects the same cargo to Rotterdam in monsoon season. Re-estimate whenever route, season, or duration changes.",
  },
  {
    title: "Ignoring the pallets",
    detail:
      "The cargo was dry, the container still rained - because the air-dried pallets carried litres of water in with them. Specify verified kiln-dried wood (an ISPM 15 HT stamp alone certifies pest treatment, not dryness) or dose for the wood you actually use.",
  },
  {
    title: "Placing all desiccant in one spot",
    detail:
      "One heavy cluster by the door leaves the far end unprotected. Distribute strips evenly along the ceiling line and upper corrugations.",
  },
  {
    title: "Using carton sachets to protect the container",
    detail:
      "Sachets inside boxes cannot dry the container's free air - they saturate first and the ceiling still drips. Container air needs container-grade strips or bags.",
  },
  {
    title: "Rounding the estimate down",
    detail:
      "Under-dosing fails completely once the desiccant saturates mid-voyage. Round up, and on voyages beyond ~50 days pair desiccant with sealed liners.",
  },
  {
    title: "Treating an estimate as a guarantee",
    detail:
      "Every calculator - ours included - is a planning model. Final quantity must be validated against product specifications, actual cargo moisture, and shipment conditions.",
  },
];

const faqs = [
  {
    q: "Is there one standard desiccant quantity per container?",
    a: "No. The correct quantity depends on container volume, cargo type, wood and pallet moisture, route climate, voyage duration, packaging condition, and the desiccant's working capacity. Two 40ft containers on the same vessel can need different doses. Use a per-shipment estimate, then have the supplier confirm it at quote stage.",
  },
  {
    q: "How much desiccant does a 20ft or 40ft container need as a starting point?",
    a: "As a planning band - not a guarantee - DryGelWorld's published guidance runs roughly 1.5-3 kg for a 20ft container and 3-6 kg for a 40ft, with the low end for short, dry routes and inert cargo and the high end for long tropical routes and hygroscopic cargo. Undried pallet wood or voyages near the 50-day mark can push the estimate past the top of the band; when the calculator says more, order more.",
  },
  {
    q: "What is the difference between hanging strips, bags, and sachets?",
    a: "Hanging strips protect the container itself from the ceiling down, where condensation forms. Bags do the same job from the floor for high doses or part loads. Carton-level sachets protect the goods inside each box and are an addition to container-level protection, not a replacement for it.",
  },
  {
    q: "How do I size desiccant for cartons instead of containers?",
    a: "Carton-level sizing works from the carton's volume and the packet count per box rather than container air. Use the silica gel calculator for sachet sizing, and the how-many-packets-per-box guide for the arithmetic.",
  },
  {
    q: "When should I ask for technical validation instead of using an estimate?",
    a: "Whenever the cargo is high-value or moisture-critical (pharma, electronics, leather), when a buyer's specification names DIN 55473 units or a specific desiccant standard, when the voyage exceeds ~50 days, or when a previous shipment arrived with moisture damage. In those cases send the full shipment profile and have the dosage confirmed against the actual product specification before ordering.",
  },
  {
    q: "What does a supplier need for an accurate export quotation?",
    a: "Container type and monthly volume, cargo description, packaging and pallet detail, route and season, transit duration, any buyer specification, and the documentation you need (SDS, COA, DMF-free statement). With those eight points a quote can state a confirmed dosage rather than a guess.",
  },
];

const sources = [
  {
    label: "DIN 55473:2021-07, Auxiliary means of packaging: desiccant in bag",
    href: "https://www.dinmedia.de/en/standard/din-55473/339665057",
    publisher: "DIN Media (German Institute for Standardization)",
  },
  {
    label: "Transport Information Service: cargo loss prevention information",
    href: "https://www.tis-gdv.de/",
    publisher: "German Insurance Association (GDV)",
  },
];

export default function DesiccantQuantityGuidePage() {
  const author = getAuthor(defaultAuthorSlug);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Desiccant Quantity Guide", href: GUIDE_PATH },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${absoluteUrl(GUIDE_PATH)}#article`,
        headline: GUIDE_TITLE,
        description: META_DESCRIPTION,
        datePublished: PUBLISHED,
        dateModified: UPDATED,
        inLanguage: "en",
        articleSection: "Buyer Guide",
        image: absoluteUrl(GUIDE_IMAGE.src),
        // authorJsonLd emits the canonical Person node for noor-ahmed-khan
        // (isPerson: true) - a hand-rolled Organization here would contradict
        // the same #author @id emitted by /authors, /blog, and /compare.
        author: author ? authorJsonLd(author) : undefined,
        publisher: {
          "@type": "Organization",
          name: siteName,
          url: absoluteUrl(),
          logo: { "@type": "ImageObject", url: absoluteUrl("/favicon-192x192.png") },
        },
        citation: sources.map((s) => ({
          "@type": "CreativeWork",
          name: s.label,
          url: s.href,
          publisher: s.publisher,
        })),
        mainEntityOfPage: absoluteUrl(GUIDE_PATH),
        url: absoluteUrl(GUIDE_PATH),
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(GUIDE_PATH)}#faq`,
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
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Buyer Guide</span>
        <h1>Desiccant quantity guide: how much does your shipment need?</h1>
        <p>
          There is no universal desiccant quantity - the right dose depends on container volume,
          cargo, wood moisture, route, duration, packaging, and the desiccant&apos;s own capacity.
          This guide walks through each factor, the format choices, placement, and exactly what an
          export quotation needs, so the number you order is the number your cargo actually
          requires.
        </p>
        <div className={st.row} aria-hidden="true">
          <span className={`${st.sticker} ${st.tiltL}`}>No universal dose</span>
          <span className={`${st.sticker} ${st.brand} ${st.tiltR}`}>7 sizing factors</span>
          <span className={`${st.sticker} ${st.accent} ${st.tiltL}`}>Free calculator inside</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What causes container rain.</h2>
          <p>
            A loaded container seals in warm, humid air - at 30°C and 80% relative humidity, a 40ft
            box holds close to 1.5 kg of water as vapor. At sea the steel shell cools faster than
            the air inside it each night; when the roof drops below the dew point, that vapor
            condenses on the ceiling and drips back onto the cargo like rain. The cycle repeats
            daily, and door gaskets leak in a little more humid air every day of the voyage. The
            water comes from three places: the air sealed in at loading, the daily leakage, and the
            cargo itself - including its pallets. Wet cartons, mold, mildew, rust, and label damage
            discovered at destination are the usual result. The{" "}
            <Link className={styles.textLink} href="/blog/container-rain-prevention">
              container rain prevention guide
            </Link>{" "}
            covers the mechanism in depth.
          </p>
        </div>
        <figure className={styles.articleVisual}>
          <Image
            src={GUIDE_IMAGE.src}
            alt={GUIDE_IMAGE.alt}
            title={GUIDE_IMAGE.title}
            width={GUIDE_IMAGE.width}
            height={GUIDE_IMAGE.height}
            className={styles.articleVisualImage}
            sizes="(max-width: 900px) 100vw, 1080px"
          />
          <figcaption>{GUIDE_IMAGE.caption}</figcaption>
        </figure>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>The seven factors that set the quantity.</h2>
          <p>
            Every serious dosage estimate weighs the same inputs. If a supplier quotes you a
            quantity without asking about most of these, treat the number with suspicion.
          </p>
        </div>
        <div className={styles.tableWrap} tabIndex={0} role="group" aria-label="Quantity factors table, scrollable">
          <table className={styles.dataTable} aria-label="Factors that determine desiccant quantity">
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Why it changes the dose</th>
              </tr>
            </thead>
            <tbody>
              {quantityFactors.map((row) => (
                <tr key={row.factor}>
                  <th scope="row">{row.factor}</th>
                  <td>{row.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>How to estimate your requirement.</h2>
          <p>
            The estimation logic is: work out the grams of water the container must control (trapped
            air + daily leakage + cargo and wood moisture), then divide by the desiccant&apos;s
            working capacity (~300 g of water per kg for container-grade silica gel) and round up.
            As planning bands, that lands at roughly 1.5-3 kg for a 20ft container and 3-6 kg for a
            40ft - low end for short dry routes with inert cargo, high end for long tropical routes
            with hygroscopic cargo, and above the band when undried wood or a near-50-day voyage
            stacks the load. The{" "}
            <Link className={styles.textLink} href="/tools/container-desiccant-calculator">
              container desiccant calculator
            </Link>{" "}
            runs this exact math from your own inputs and shows every step. For carton-level
            sachets, use the{" "}
            <Link className={styles.textLink} href="/tools/silica-gel-calculator">
              silica gel calculator
            </Link>{" "}
            and the{" "}
            <Link
              className={styles.textLink}
              href="/blog/how-many-desiccant-packets-per-box-calculation-guide"
            >
              packets-per-box guide
            </Link>
            . If your buyer&apos;s specification is written in DIN 55473 units, convert at ~33 g of
            silica gel per unit - the{" "}
            <Link
              className={styles.textLink}
              href="/blog/desiccant-units-explained-din-55473-and-unit-sizing"
            >
              DIN 55473 units guide
            </Link>{" "}
            shows how.
          </p>
          <span className={st.stamp}>Planning bands, not guarantees</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Hanging strips vs bags vs sachets.</h2>
          <p>Three formats, three different jobs - most protected shipments combine two of them.</p>
        </div>
        <div className={styles.tableWrap} tabIndex={0} role="group" aria-label="Format comparison table, scrollable">
          <table className={styles.dataTable} aria-label="Desiccant format comparison">
            <thead>
              <tr>
                <th scope="col">Format</th>
                <th scope="col">What it is</th>
                <th scope="col">When to use it</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((row) => (
                <tr key={row.format}>
                  <th scope="row">{row.format}</th>
                  <td>{row.whatItIs}</td>
                  <td>{row.whenToUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Strip formats and export supply are covered on the{" "}
          <Link className={styles.textLink} href="/shipping-container-desiccant-supplier">
            shipping container desiccant supplier
          </Link>{" "}
          page; sachet sizes and packet options are on the{" "}
          <Link className={styles.textLink} href="/silica-gel-packets">
            silica gel packets
          </Link>{" "}
          page.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Placement inside the container.</h2>
        </div>
        <ul className={styles.bulletList}>
          <li>
            Hang strips evenly along the ceiling line and upper corrugations - condensation forms at
            the roof, so the desiccant belongs above the cargo, distributed rather than clustered.
          </li>
          <li>
            Use the lashing rings and top rails; never lay strips flat on top of cartons where
            dripping condensation can saturate the sleeve.
          </li>
          <li>
            Place floor bags between pallet rows and at the door end - the door is the leakiest
            point of the box.
          </li>
          <li>
            Keep desiccant out of direct contact with the cargo, and load it last, just before the
            doors close - every hour the box stands open, the desiccant works on the port&apos;s air
            instead of the voyage&apos;s.
          </li>
          <li>
            On voyages beyond ~50 days, pair desiccant with sealed liners - no practical desiccant
            load outruns two months of daily leakage on a tropical lane.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>When to request technical validation.</h2>
          <p>
            A calculator estimate is the right starting point for general cargo. Ask the supplier to
            validate the dosage against product specifications and your actual shipment conditions
            when any of these apply:
          </p>
        </div>
        <ul className={styles.bulletList}>
          <li>High-value or moisture-critical cargo: pharma, electronics, leather, precision instruments.</li>
          <li>A buyer specification that names DIN 55473 units, MIL-D-3464, or a specific desiccant grade.</li>
          <li>Voyage duration beyond ~50 days, or multi-leg routings with long port dwell.</li>
          <li>A previous shipment on the lane arrived with moisture damage.</li>
          <li>Unusual stows: part-loaded containers, drummed or bagged hygroscopic bulk, mixed consolidations.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>The pre-quote checklist.</h2>
          <p>
            Send these eight points with your enquiry and the quotation can state a confirmed
            dosage instead of a guess. Copy the list into your RFQ email.
          </p>
        </div>
        <ul className={st.checkList}>
          {rfqChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Common mistakes.</h2>
        </div>
        <div className={styles.grid}>
          {mistakes.map((m) => (
            <article className={styles.card} key={m.title}>
              <h3>{m.title}</h3>
              <p>{m.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Desiccant quantity FAQ.</h2>
        </div>
        <div className={styles.grid}>
          {faqs.map((f) => (
            <article className={styles.card} key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Next steps.</h2>
          <p>Turn the estimate into a confirmed export quotation.</p>
        </div>
        <div className={styles.grid}>
          <Link className={styles.card} href="/tools/container-desiccant-calculator">
            <span>Tool</span>
            <h3>Container desiccant calculator</h3>
            <p>Run the estimate for your own container, cargo, route, and duration.</p>
          </Link>
          <Link className={styles.card} href="/shipping-container-desiccant-supplier">
            <span>Supply</span>
            <h3>Container desiccant supplier</h3>
            <p>Strip formats, bag options, and export supply from Karachi.</p>
          </Link>
          <Link className={styles.card} href="/silica-gel-packets">
            <span>Sachets</span>
            <h3>Silica gel packets</h3>
            <p>Carton-level sachet sizes for the goods inside each box.</p>
          </Link>
          <Link className={styles.card} href="/contact">
            <span>RFQ</span>
            <h3>Request a quote</h3>
            <p>Send the checklist above for a confirmed dosage and price - samples are free.</p>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>References.</h2>
        </div>
        <ul className={styles.bulletList}>
          {sources.map((s) => (
            <li key={s.href}>
              <a className={styles.textLink} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>{" "}
              - {s.publisher}
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
