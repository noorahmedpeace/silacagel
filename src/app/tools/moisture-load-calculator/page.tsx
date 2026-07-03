import type { Metadata } from "next";
import Link from "next/link";
import { MoistureCalculator } from "@/components/moisture-calculator";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import styles from "../../strategy-pages.module.css";

const metaTitle = "Moisture Load Calculator | Silica Gel Grams by Carton Size";
const pageDescription =
  "Free moisture load calculator. Enter carton length, width, and height in cm or inches to get the silica gel grams your packaging needs, based on the 56 g per cubic foot planning standard.";

export const metadata: Metadata = {
  title: metaTitle,
  description: pageDescription,
  keywords: [
    "moisture load calculator",
    "silica gel calculator",
    "how much silica gel per box",
    "desiccant calculator by carton size",
    "silica gel grams per cubic foot",
  ],
  alternates: { canonical: "/tools/moisture-load-calculator" },
  openGraph: {
    title: metaTitle,
    description: pageDescription,
    url: "/tools/moisture-load-calculator",
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
    q: "How much silica gel do I need for a box?",
    a: "Measure the internal length, width, and height of the box, convert to cubic feet, and allow roughly 56 grams of silica gel per cubic foot as a planning baseline. The calculator on this page does the conversion for you in cm or inches.",
  },
  {
    q: "Does the 56 g per cubic foot rule work for sea freight?",
    a: "It is a solid starting point for sealed cartons. For long ocean voyages, tropical routes, or monsoon-season dispatch, increase the result by about 20 percent, and confirm the final allocation with the export desk at quote stage.",
  },
  {
    q: "Should I measure in centimeters or inches?",
    a: "Either works. The calculator has a metric and imperial toggle, and both convert to the same cubic-foot basis before applying the grams-per-cubic-foot standard.",
  },
  {
    q: "Is this calculator a guaranteed dosage?",
    a: "No, it is an estimate for planning. Final dosage depends on packaging barrier, cargo type, route humidity, and storage time. DryGelWorld confirms the sachet size and count when preparing your quote.",
  },
];

export default function MoistureLoadCalculatorPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools/moisture-load-calculator" },
    { name: "Moisture Load Calculator", href: "/tools/moisture-load-calculator" },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Moisture Load Calculator",
        url: absoluteUrl("/tools/moisture-load-calculator"),
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        description: pageDescription,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${absoluteUrl()}#organization`, name: brandName },
      },
      {
        "@type": "HowTo",
        name: "How to calculate silica gel grams by carton size",
        description:
          "Work out the silica gel weight a carton needs from its internal length, width, and height.",
        step: [
          { "@type": "HowToStep", name: "Pick your unit", text: "Choose metric (cm) or imperial (inches)." },
          { "@type": "HowToStep", name: "Enter length", text: "Type the internal length of the carton." },
          { "@type": "HowToStep", name: "Enter width", text: "Type the internal width of the carton." },
          { "@type": "HowToStep", name: "Enter height", text: "Type the internal height of the carton." },
          { "@type": "HowToStep", name: "Read the grams", text: "Use the recommended silica gel weight to pick a sachet size, adding 20 percent for humid sea routes." },
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
        <h1>Moisture load calculator.</h1>
        <p>
          Enter your carton&apos;s length, width, and height in centimeters or inches and get
          the silica gel grams it needs, based on the 56 g per cubic foot planning standard.
          Then match the result to a sachet size and request a quote.
        </p>
      </section>

      <section className={styles.section}>
        <MoistureCalculator />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>How the weight is estimated.</h2>
          <p>
            The calculator multiplies your three dimensions into a volume, converts it to
            cubic feet, and applies the industry planning standard of 56 grams of silica gel
            per cubic foot of sealed packaging space.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>Volume</span>
            <h3>Dimensions set the baseline</h3>
            <p>Length x width x height gives the sealed air volume your desiccant has to dry. Always measure the internal dimensions.</p>
          </article>
          <article className={styles.card}>
            <span>Standard</span>
            <h3>56 g per cubic foot</h3>
            <p>A widely used industrial planning figure for sealed cartons at average export humidity. It errs on the protective side for short hauls.</p>
          </article>
          <article className={styles.card}>
            <span>Route</span>
            <h3>Add margin for humid routes</h3>
            <p>For long tropical or cross-equator sea freight, add about 20 percent to the result, or step up to the next sachet size.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Moisture load FAQ.</h2>
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
          <p>Turn the gram figure into the right sachet size and a confirmed quote.</p>
        </div>
        <div className={styles.grid}>
          <Link className={styles.card} href="/tools/container-desiccant-calculator">
            <span>Tool</span>
            <h3>Container desiccant calculator</h3>
            <p>Shipping a full container? Size cargo strips by container, voyage, and route instead.</p>
          </Link>
          <Link className={styles.card} href="/silica-gel-packets">
            <span>Product</span>
            <h3>Silica gel packets</h3>
            <p>Match your grams to a sachet size, from 0.5 g retail packets to 500 g bags.</p>
          </Link>
          <Link className={styles.card} href="/contact">
            <span>RFQ</span>
            <h3>Request an export quote</h3>
            <p>Send your carton size, quantity, and destination for a confirmed sachet plan and price.</p>
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
