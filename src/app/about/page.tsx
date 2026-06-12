import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import {
  companyAddressFull,
  companyAddressLocality,
  companyAddressRegion,
  companyPostalCode,
  companyStreet,
  factoryAddressFull,
} from "@/lib/product-data";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Dry Gel World | Silica Gel Manufacturer Since 1983",
  description:
    "DryGelWorld is a Karachi silica gel manufacturer since 1983, supplying export buyers with industrial desiccants, SDS, COA, and ISO support.",
  alternates: {
    canonical: "/about",
  },
};

const stats = [
  { value: "1983", label: "Manufacturing since" },
  { value: "60+", label: "Export markets" },
  { value: "ISO 9001:2015", label: "Manufacturer certified" },
  { value: "24h", label: "Quote response target" },
];

// Verifiable corporate claims. These are the documented facts; anything
// not in this list is either marketing language or honest scope rather
// than a verifiable claim.
const verifiableClaims = [
  {
    label: "Founded",
    value: "1983",
    note: "DryGelWorld has manufactured industrial silica gel desiccants in Karachi since 1983 (registered legal entity: Kamran Enterprises).",
  },
  {
    label: "Ownership",
    value: "Family-led, second generation",
    note: "Family-led manufacturer-exporter; the second-generation team currently leads the DryGelWorld export desk.",
  },
  {
    label: "Brand structure",
    value: "Two brands, one manufacturer",
    note: "SilicaGelPK is our Pakistan-facing brand; DryGelWorld is our global export brand — one manufacturer, operating since 1983.",
  },
  {
    label: "Head office",
    value: companyAddressFull,
    note: "Public head office and sales desk (Gulshan-e-Iqbal, Karachi) — primary point of contact for quotes, documentation, and buyer coordination.",
  },
  {
    label: "Manufacturing site",
    value: factoryAddressFull,
    note: "Production factory in North Karachi Industrial Area — silica gel desiccant sachets, strips, and industrial PPE lines converted and packed on-site.",
  },
  {
    label: "Manufacturer certification",
    value: "ISO 9001:2015",
    note: "Current certificate available on request; baseline for all export shipments.",
  },
  {
    label: "Documentation per shipment",
    value: "SDS · COA · DMF-free statement",
    note: "Standard across all silica gel and industrial PPE shipments. Translations available on request (5-10 day turnaround).",
  },
  {
    label: "Export markets",
    value: "60+ countries",
    note: "Active export to Middle East, EU, USA, Africa, Asia-Pacific. Country-specific landing pages at /export.",
  },
];

// Honest scope statement — what we DO NOT currently hold. This is the
// E-E-A-T differentiator: B2B buyers trust suppliers who clearly state
// their regulatory scope rather than vague universal compliance claims.
const honestScope = [
  "FDA Drug Master File (DMF) — required for direct-contact pharma silica gel",
  "FDA food-contact certification (FCN or GRAS) — required for direct food-contact silica gel",
  "EU Regulation 1935/2004 Declaration of Compliance — required for direct food-contact in EU markets",
  "REACH-specific food-contact registration — required for some EU food-contact applications",
  "JEDEC moisture sensitivity classification — required for certain semiconductor packaging",
  "MIL-spec, Halal, or FSSC food-grade — required by specific buyer audit programs",
];

const values = [
  {
    icon: "01",
    title: "Global Reach",
    desc: "Supplying maritime cargo, pharmaceutical packaging, precision electronics, and export cartons with dependable desiccant formats.",
  },
  {
    icon: "02",
    title: "Technical Discipline",
    desc: "Product conversations stay grounded in adsorption logic, documentation, MOQ planning, and packaging conditions.",
  },
  {
    icon: "03",
    title: "Procurement Partnership",
    desc: "We help buyers define size, volume, destination, and document requirements before final quote confirmation.",
  },
  {
    icon: "04",
    title: "Compliance Readiness",
    desc: "ISO 9001:2015, SDS, COA, DMF-free support, and specification language can be prepared for international review. Additional claims require valid proof.",
  },
];

export default function AboutPage() {
  const author = getAuthor(defaultAuthorSlug);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Reveal direction="up">
          <div className={styles.heroContent}>
            <span className={styles.kicker}>Industrial Profile</span>
            <h1>Built for global buyers who cannot risk moisture damage.</h1>
            <p>
              Dry Gel World supports manufacturers, exporters, warehouse teams, and packaging
              buyers with silica gel formats that protect stock, cartons, and container
              shipments across demanding supply chains.
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className={styles.heroImage}>
            <Image
              src="/macro-hero.webp"
              alt="Macro silica gel material for industrial moisture control"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 1100px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </section>

      <section className={styles.stats}>
        {stats.map((stat, idx) => (
          <Reveal key={stat.label} direction="up" delay={0.1 * idx}>
            <div className={styles.statCard}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </section>

      <section className={styles.values}>
        <Reveal direction="up">
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Operating Principles</span>
            <h2>A cleaner supply story for serious industrial procurement.</h2>
          </div>
        </Reveal>

        <div className={styles.valuesGrid}>
          {values.map((value, idx) => (
            <Reveal key={value.title} direction="up" delay={0.1 * idx}>
              <article className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal direction="up">
        <section className={styles.verifiable}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Verifiable Claims</span>
            <h2>The factual record buyers can audit before quote stage.</h2>
            <p>
              International procurement teams need to verify supplier claims. Below is the
              documented record — founded, certified, address, documentation scope. The
              second list below is the honest scope of what {siteName} does NOT currently
              hold, so buyers in those categories source from specialized suppliers in
              parallel rather than discover a gap mid-program.
            </p>
          </div>

          <div className={styles.verifiableList}>
            {verifiableClaims.map((claim) => (
              <article key={claim.label} className={styles.verifiableRow}>
                <span className={styles.verifiableLabel}>{claim.label}</span>
                <strong className={styles.verifiableValue}>{claim.value}</strong>
                <p className={styles.verifiableNote}>{claim.note}</p>
              </article>
            ))}
          </div>

          <div className={styles.honestScope}>
            <h3>Certifications NOT currently held</h3>
            <ul>
              {honestScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.honestScopeFooter}>
              These are real procurement categories that need specifically-certified
              suppliers. Buyers in those categories should not delay procurement waiting
              for {siteName} to expand certification scope — source from currently-
              certified manufacturers and treat {siteName} as a parallel option for
              non-regulated lines.
            </p>
          </div>

          {author ? (
            <div className={styles.editorial}>
              <h3>Editorial accountability</h3>
              <p>
                Buyer guides, comparison content, and procurement documentation on this
                site are edited by the{" "}
                <Link href={`/authors/${author.slug}`}>{author.name}</Link> — the
                buyer-facing team at DryGelWorld. Editorial scope is limited
                to product, packaging, and export logistics that the desk handles directly.
                Regulatory claims are limited to certifications actually held.
              </p>
            </div>
          ) : null}
        </section>
      </Reveal>

      <Reveal direction="up">
        <section className={styles.cta}>
          <h2>Ready to plan a desiccant supply requirement?</h2>
          <p>
            Share your product format, quantity, destination, and documents needed so the
            procurement response is clearer from the first message.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>Start Procurement Request</Link>
        </section>
      </Reveal>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": `${absoluteUrl("/about")}#aboutpage`,
                name: `About ${siteName}`,
                description:
                  "DryGelWorld is a Karachi-based silica gel desiccant manufacturer-exporter operating since 1983.",
                url: absoluteUrl("/about"),
                inLanguage: "en",
                mainEntity: {
                  "@type": "Organization",
                  "@id": `${absoluteUrl()}#organization`,
                  name: siteName,
                  legalName: "Kamran Enterprises",
                  foundingDate: "1983",
                  url: absoluteUrl(),
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: companyStreet,
                    addressLocality: companyAddressLocality,
                    addressRegion: companyAddressRegion,
                    postalCode: companyPostalCode,
                    addressCountry: "PK",
                  },
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    name: "ISO 9001:2015",
                    credentialCategory: "Quality Management System Certification",
                  },
                  sameAs: [
                    "https://www.facebook.com/drygelworld",
                    "https://www.linkedin.com/in/drygelworld/",
                    "https://silicagelpk.com",
                    "https://www.wikidata.org/wiki/Q140185858",
                  ],
                },
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
