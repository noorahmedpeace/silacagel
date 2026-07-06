import type { Metadata } from "next";
import Link from "next/link";
import { ContainerDosageCalculator } from "@/components/container-dosage-calculator";
import {
  AIR_EXCHANGE_PER_DAY,
  CARGO_TYPES,
  CLIMATES,
  CONTAINERS,
  PACKAGING_TYPES,
  WORKING_CAPACITY_G_PER_KG,
} from "@/components/container-dosage-model";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import styles from "../../strategy-pages.module.css";

const metaTitle = "Container Desiccant Calculator | kg per 20ft & 40ft";
const pageDescription =
  "Free container desiccant calculator. Get the desiccant kg a 20ft or 40ft container needs from cargo type, packaging, transit days, and route humidity - with the full moisture-load formula shown, plus a printable dosage plan.";

export const metadata: Metadata = {
  title: metaTitle,
  description: pageDescription,
  keywords: [
    "container desiccant calculator",
    "how much desiccant per container",
    "container desiccant dosage",
    "desiccant kg per 20ft container",
    "desiccant kg per 40ft container",
    "container moisture load calculator",
  ],
  alternates: { canonical: "/tools/container-desiccant-calculator" },
  openGraph: {
    title: metaTitle,
    description: pageDescription,
    url: "/tools/container-desiccant-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: pageDescription,
  },
};

const faqs = [
  {
    q: "How much desiccant do I need for a 20ft container?",
    a: "As a planning baseline, a 20ft container needs roughly 1.5-2 kg of container-grade desiccant for low-risk industrial cargo on a ~20-day route, rising to about 3 kg plus carton-level sachets for high-risk cargo such as leather or electronics on humid routes. The calculator adjusts within that band using transit days, route humidity, cargo type, and packaging.",
  },
  {
    q: "How much desiccant for a 40ft container?",
    a: "Around 3-4 kg for low-risk cargo on a 25-30 day route, and 5-6 kg for high-risk or hygroscopic cargo on 30+ day tropical routes. A 40ft high-cube sits slightly higher because of its extra air volume (~76 m3 versus ~68 m3). Voyages beyond about 50 days need sealed liners on top of desiccant.",
  },
  {
    q: "How does this calculator estimate the moisture load?",
    a: "It computes the water vapor sealed into the container's free air at loading (volume x packaging air factor x absolute humidity from temperature and RH), adds daily humid-air leakage through the door seals over the voyage (~0.6% of container volume per day), applies a cargo factor for moisture-releasing goods, and divides the total grams of water by silica gel's ~300 g/kg working capacity to get desiccant kg.",
  },
  {
    q: "Where should container desiccant strips be placed?",
    a: "Hang strips evenly along the container ceiling and upper corrugations so the desiccant sits above the cargo where condensation forms. Even distribution outperforms concentrated placement.",
  },
  {
    q: "How do desiccant kilograms convert to DIN 55473 units?",
    a: "One DIN 55473 unit corresponds to roughly 33 g of silica gel, so 1 kg is about 30 units and a 4 kg container dose is about 120 units. If your buyer's specification is written in units, convert to grams at ~33 g per unit first, then size the strip count - and confirm the quoted units are true DIN 55473 units.",
  },
  {
    q: "Is this calculator a guaranteed dosage?",
    a: "No - it is an estimate for planning. Final allocation depends on exact cargo moisture content, packaging barrier, container condition, and seasonal conditions. DryGelWorld confirms your dosage when preparing the quote.",
  },
];

const assumptions: { parameter: string; value: string; basis: string }[] = [
  {
    parameter: "Container air volumes",
    value: CONTAINERS.map((c) => `${c.label} ~${c.volumeM3} m³`).join(" · "),
    basis: "Standard internal capacities for ISO dry boxes.",
  },
  {
    parameter: "Free-air fraction by packaging",
    value: PACKAGING_TYPES.map((p) => `${p.label} ${Math.round(p.airFraction * 100)}%`).join(" · "),
    basis: "Share of container volume behaving as exchangeable air around the stow.",
  },
  {
    parameter: "Route climate presets",
    value: CLIMATES.map((c) => `${c.shortLabel} ${c.rh}% RH / ${c.tempC}°C`).join(" · "),
    basis: "Typical loading-season conditions; both values are user-adjustable.",
  },
  {
    parameter: "Absolute humidity",
    value: "Magnus saturation formula × RH",
    basis: "Air at 30°C / 80% RH holds ~24 g of water per m³ - a loaded 40ft box seals in close to 1.5 kg.",
  },
  {
    parameter: "Daily air exchange",
    value: `${(AIR_EXCHANGE_PER_DAY * 100).toFixed(1)}% of container volume per day`,
    basis: "Effective leakage of a sound, sealed dry box through door gaskets; scales the load with transit days.",
  },
  {
    parameter: "Cargo moisture factor",
    value: CARGO_TYPES.map((c) => `${c.label.split(" (")[0]} ×${c.factor}`).join(" · "),
    basis: "Hygroscopic cargo (textiles, leather, paper, wood, food) releases moisture as temperature cycles.",
  },
  {
    parameter: "Silica gel working capacity",
    value: `${WORKING_CAPACITY_G_PER_KG} g of water per kg`,
    basis: "Container-grade silica gel adsorbs up to one-third of its weight; 30% is the design value for safety margin.",
  },
  {
    parameter: "Rounding",
    value: "Rounded up to the nearest 0.5 kg, minimum 1 kg",
    basis: "Under-rounding a dosage under-protects the cargo; always round up.",
  },
];

export default function ContainerDosageCalculatorPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools/container-desiccant-calculator" },
    { name: "Container Desiccant Calculator", href: "/tools/container-desiccant-calculator" },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Container Desiccant Calculator",
        url: absoluteUrl("/tools/container-desiccant-calculator"),
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        description: pageDescription,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${absoluteUrl()}#organization`, name: brandName },
      },
      {
        "@type": "HowTo",
        name: "How to calculate container desiccant dosage",
        description:
          "Estimate the desiccant kg for a shipping container from its size, cargo type, packaging, transit duration, and route humidity.",
        step: [
          { "@type": "HowToStep", name: "Select container type", text: "Choose 20ft standard, 40ft standard, or 40ft high-cube." },
          { "@type": "HowToStep", name: "Set cargo type", text: "Non-hygroscopic (metal, plastic, glass), mixed, or hygroscopic (textiles, leather, paper, wood, food)." },
          { "@type": "HowToStep", name: "Set packaging", text: "Cartons on pallets, shrink-wrapped, or loose - this sets the exposed air volume." },
          { "@type": "HowToStep", name: "Set transit duration", text: "Slide between 7 and 90 days for your route." },
          { "@type": "HowToStep", name: "Set route climate", text: "Dry/temperate, mixed/seasonal, or tropical/humid - then fine-tune the loading RH and temperature." },
          { "@type": "HowToStep", name: "Read the dosage", text: "Use the recommended kg, strip count, moisture load in litres, and risk level to plan your RFQ - and expand 'Show the math' to see every step." },
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
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Buyer Tool</span>
        <h1>Container desiccant calculator.</h1>
        <p>
          Work out the desiccant kg your shipment needs before you request a quote. Adjust for
          container size, cargo type, packaging, transit days, and route humidity - and see the
          full moisture-load math behind every number.
        </p>
      </section>

      <section className={styles.section}>
        <ContainerDosageCalculator />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>How this calculator works.</h2>
          <p>
            The calculator estimates the grams of water your container must control, then sizes the
            desiccant against silica gel&apos;s working capacity. Three moisture sources are added
            together: the water vapor sealed into the container&apos;s free air at loading (container
            volume × packaging air factor × absolute humidity), humid air leaking through the door
            seals over the voyage (about 0.6% of the container volume per day), and moisture released
            by hygroscopic cargo (a multiplier of up to 1.2×). The total is divided by 300 g of water
            per kg of silica gel - a working capacity below the &quot;one-third of its own
            weight&quot; maximum, so the recommendation keeps a safety margin - and rounded up to the
            next half kilogram.
          </p>
          <p>
            The output is calibrated to DryGelWorld&apos;s published loading guidance: roughly 1.5-3
            kg per 20ft container and 3-6 kg per 40ft container depending on route length, humidity,
            and cargo risk, delivered as 1 kg or 2 kg strips hung at the ceiling line.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable} aria-label="Assumptions used by the container desiccant calculator">
            <thead>
              <tr>
                <th scope="col">Parameter</th>
                <th scope="col">Value used</th>
                <th scope="col">Basis</th>
              </tr>
            </thead>
            <tbody>
              {assumptions.map((row) => (
                <tr key={row.parameter}>
                  <th scope="row">{row.parameter}</th>
                  <td>{row.value}</td>
                  <td>{row.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What moves the dosage.</h2>
          <p>
            The same factors our export desk uses to right-size a container desiccant program.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>Container &amp; packaging</span>
            <h3>Air volume sets the baseline</h3>
            <p>
              20ft, 40ft, and 40ft high-cube hold different air volumes, and cartons, shrink wrap, or
              loose stow change how much of that air the desiccant must dry.
            </p>
          </article>
          <article className={styles.card}>
            <span>Route &amp; duration</span>
            <h3>Humidity and days at sea</h3>
            <p>
              Longer, tropical, cross-equator routes cycle through more condensation events and admit
              more humid air through the door seals - both scale the load.
            </p>
          </article>
          <article className={styles.card}>
            <span>Cargo</span>
            <h3>Hygroscopic cargo adds moisture</h3>
            <p>
              Textiles, leather, paper, wood, and food carry their own moisture and release it as
              temperature cycles, so they need a higher allocation than metal or plastic goods.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Container desiccant FAQ.</h2>
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
          <p>Move from estimate to a confirmed export quote.</p>
        </div>
        <div className={styles.grid}>
          <Link className={styles.card} href="/shipping-container-desiccant-supplier">
            <span>Supply</span>
            <h3>Shipping container desiccant supplier</h3>
            <p>Formats, strip options, and export supply for sealed ocean freight.</p>
          </Link>
          <Link className={styles.card} href="/blog/container-rain-prevention">
            <span>Guide</span>
            <h3>Container rain prevention</h3>
            <p>How condensation forms inside containers and how to stop it - with the sizing bands this calculator is anchored to.</p>
          </Link>
          <Link className={styles.card} href="/blog/desiccant-units-explained-din-55473-and-unit-sizing">
            <span>Guide</span>
            <h3>DIN 55473 desiccant units</h3>
            <p>Converting unit-based container specs into silica gel grams and strip counts.</p>
          </Link>
          <Link className={styles.card} href="/contact?product=container-strips">
            <span>RFQ</span>
            <h3>Request an export quote</h3>
            <p>Send your container size, route, and cargo for a confirmed dosage and price.</p>
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
