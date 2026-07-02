import type { Metadata } from "next";
import Link from "next/link";
import { ContainerDosageCalculator } from "@/components/container-dosage-calculator";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import styles from "../../strategy-pages.module.css";

const pageTitle = "Container Desiccant Dosage Calculator | How Much Desiccant Per Container";
const metaTitle = "Container Desiccant Dosage Calculator | DryGelWorld";
const pageDescription =
  "Free container desiccant calculator. Estimate how many cargo desiccant strips a 20ft or 40ft container needs by voyage length, route humidity, and cargo type - then request an export quote.";

export const metadata: Metadata = {
  title: metaTitle,
  description: pageDescription,
  keywords: [
    "container desiccant calculator",
    "how much desiccant per container",
    "container desiccant dosage",
    "desiccant strips per 20ft container",
    "desiccant strips per 40ft container",
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
    a: "As a planning baseline, a 20ft container typically uses 6-10 cargo desiccant strips (about 7.5-12.5 kg), with the upper end for long-haul, tropical, or moisture-sensitive cargo. Confirm the exact figure against your route and cargo with the export desk.",
  },
  {
    q: "How much desiccant for a 40ft container?",
    a: "A 40ft container generally uses 10-16 strips (about 12.5-20 kg). A 40ft high-cube and long tropical voyages sit at the higher end. The calculator adjusts for voyage length, route humidity, and cargo sensitivity.",
  },
  {
    q: "Where should container desiccant strips be placed?",
    a: "Hang strips evenly along the container ceiling and upper corrugations so the desiccant sits above the cargo where condensation forms. Even distribution outperforms concentrated placement.",
  },
  {
    q: "Is this calculator a guaranteed dosage?",
    a: "No - it is an estimate for planning. Final allocation depends on exact cargo, packaging barrier, loading density, and seasonal conditions. DryGelWorld confirms your dosage when preparing the quote.",
  },
];

export default function ContainerDosageCalculatorPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools/container-desiccant-calculator" },
    { name: "Container Desiccant Dosage Calculator", href: "/tools/container-desiccant-calculator" },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Container Desiccant Dosage Calculator",
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
          "Estimate cargo desiccant strips for a shipping container by size, voyage length, route humidity, and cargo sensitivity.",
        step: [
          { "@type": "HowToStep", name: "Select container size", text: "Choose 20ft, 40ft, or 40ft high-cube." },
          { "@type": "HowToStep", name: "Set voyage length", text: "Pick the transit duration band for your route." },
          { "@type": "HowToStep", name: "Set route humidity", text: "Choose temperate, subtropical, or tropical." },
          { "@type": "HowToStep", name: "Set cargo sensitivity", text: "Standard goods or sensitive cargo." },
          { "@type": "HowToStep", name: "Read the strip count", text: "Use the recommended strip count and kg to plan your RFQ." },
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
        <h1>Container desiccant dosage calculator.</h1>
        <p>
          Work out roughly how many cargo desiccant strips your shipment needs before you request a
          quote. Adjust for container size, voyage length, route humidity, and cargo sensitivity.
        </p>
      </section>

      <section className={styles.section}>
        <ContainerDosageCalculator />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>How the dosage is estimated.</h2>
          <p>
            The calculator starts from a base strip count per container size, then adjusts for
            voyage length, route humidity, and cargo sensitivity - the same factors our export desk
            uses to right-size a container desiccant program.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>Container</span>
            <h3>Size sets the baseline</h3>
            <p>20ft, 40ft, and 40ft high-cube hold different air and cargo volumes, so each has a different base strip count.</p>
          </article>
          <article className={styles.card}>
            <span>Route</span>
            <h3>Humidity and voyage length</h3>
            <p>Longer, tropical, cross-equator routes cycle through more condensation events and need more desiccant.</p>
          </article>
          <article className={styles.card}>
            <span>Cargo</span>
            <h3>Sensitivity matters</h3>
            <p>Electronics, pharma, and leather justify a higher allocation than durable standard goods.</p>
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
            <p>How condensation forms inside containers and how to stop it.</p>
          </Link>
          <Link className={styles.card} href="/contact">
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
