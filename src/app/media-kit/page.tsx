import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  brandDomain,
  breadcrumbJsonLd,
  siteName,
} from "@/lib/seo";
import {
  companyAddressFull,
  companyCity,
  companyCountry,
  displayPhone,
  mainEmail,
  phoneHref,
} from "@/lib/product-data";
import { seoImages } from "@/lib/seo-images";
import styles from "./media-kit.module.css";

export const metadata: Metadata = {
  title: `Press & Media Kit | ${siteName}`,
  description:
    "DryGelWorld press kit with boilerplate, brand assets, fact sheet, certifications, company profile, and press contact for silica gel coverage.",
  alternates: {
    canonical: "/media-kit",
  },
  openGraph: {
    title: `${siteName} Press & Media Kit`,
    description:
      "Boilerplate text, brand assets, fact sheet, leadership and certifications for media coverage of DryGelWorld.",
    url: "/media-kit",
    type: "website",
    images: [
      {
        url: seoImages.defaultOg.src,
        width: seoImages.defaultOg.width,
        height: seoImages.defaultOg.height,
        alt: `${siteName} press kit — silica gel manufacturer-exporter since 1983, fact sheet and brand assets for editorial coverage`,
      },
    ],
  },
};

const factSheet = [
  { label: "Brand", value: "DryGelWorld" },
  { label: "Registered legal entity", value: "Kamran Enterprises" },
  { label: "Founded", value: "1983" },
  { label: "Ownership", value: "Family-led, second generation" },
  { label: "Headquarters", value: `${companyCity}, ${companyCountry}` },
  {
    label: "Full address",
    value: companyAddressFull,
  },
  { label: "Manufacturer certification", value: "ISO 9001:2015" },
  {
    label: "Documentation per shipment",
    value: "Safety Data Sheet (SDS) · Certificate of Analysis (COA) · DMF-free statement",
  },
  { label: "Export markets", value: "60+ countries across Middle East, EU, USA, Africa, and Asia-Pacific" },
  {
    label: "Product lines",
    value: "Silica gel sachets · container desiccants · dry clay desiccant · industrial PPE (hair nets, beard covers)",
  },
  { label: "Press contact email", value: mainEmail },
  { label: "Direct phone", value: displayPhone },
  { label: "Domain", value: brandDomain },
];

const boilerplate100 =
  "DryGelWorld is a Karachi-based silica gel desiccant manufacturer-exporter operating since 1983. ISO 9001:2015 certified. Supplies industrial silica gel sachets, container desiccants, bulk silica gel beads, dry clay desiccant, and industrial PPE to importers in 60+ countries.";

const boilerplate250 =
  "DryGelWorld is a Karachi-based silica gel desiccant manufacturer-exporter operating continuously since 1983. The company manufactures industrial silica gel sachets (0.5g to 100g), container desiccant strips for ocean freight, bulk silica gel beads, dry clay desiccant, and disposable industrial PPE including bouffant hair nets and beard covers. DryGelWorld is ISO 9001:2015 certified at the manufacturer level, and ships every export consignment with a Safety Data Sheet (SDS), Certificate of Analysis (COA), and DMF-free statement. The company serves industrial procurement teams in over 60 countries across the Middle East, European Union, North America, and Asia-Pacific. Press inquiries are handled by the DryGelWorld Export Desk at press@drygelworld.com.";

const honestScope = [
  "FDA Drug Master File (DMF) — required for direct-contact pharmaceutical silica gel.",
  "FDA food-contact certification (FCN or GRAS) — required for direct food-contact silica gel.",
  "EU Regulation 1935/2004 Declaration of Compliance — required for direct food-contact in EU markets.",
  "REACH-specific food-contact registration.",
  "JEDEC moisture-sensitivity classification — required for certain semiconductor packaging.",
  "MIL-spec, Halal, and FSSC food-grade — required by specific buyer audit programs.",
];

const brandAssets = [
  {
    title: "Primary brand logo",
    file: "/drygelworld-logo.svg",
    note: "SVG, transparent background. Use for digital editorial and web embeds.",
  },
  {
    title: "Brand mark (icon only)",
    file: "/drygelworld-mark.svg",
    note: "SVG, transparent background. Use for compact contexts where the wordmark is unnecessary.",
  },
  {
    title: "Favicon / square logo",
    file: "/favicon-192x192.png",
    note: "192×192 PNG with brand colors. Use where SVG is unsupported.",
  },
  {
    title: "Banner / OG image",
    file: "/dry-gel-world-banner.jpg",
    note: "1200×630 banner image. Use for editorial article headers and social embeds.",
  },
  {
    title: "Manufacturing facility photo",
    file: "/dry-gel-world-factory.jpg",
    note: "Karachi manufacturing facility — silica gel production line context.",
  },
  {
    title: "Fulfillment / export operation photo",
    file: "/dry-gel-world-fulfillment.jpg",
    note: "Export packaging and dispatch context.",
  },
  {
    title: "Product display photo",
    file: "/dry-gel-world-product-display.jpg",
    note: "Catalog product display — sachets, container strips, bulk format options.",
  },
];

const leadership = [
  {
    role: "Export Desk",
    name: `${siteName} Export Desk`,
    description:
      "Buyer-facing team at DryGelWorld handling RFQ qualification, format and MOQ sizing, and documentation routing for international buyers. Primary press contact for editorial questions on product, packaging, and export logistics.",
    href: "/authors/dry-gel-world-export-desk",
  },
];

export default function MediaKitPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.kicker}>Press &amp; Media Kit</span>
        <h1>Editorial resources for {siteName}</h1>
        <p className={styles.subtitle}>
          Boilerplate text, fact sheet, brand assets, leadership, and direct press
          contact for journalists, editors, and trade publications covering the silica
          gel desiccant industry or Pakistani export manufacturing.
        </p>
        <div className={styles.heroActions}>
          <a href={`mailto:${mainEmail}?subject=Press%20inquiry%20-%20${encodeURIComponent(siteName)}`} className={styles.primaryAction}>
            Press contact: {mainEmail}
          </a>
          <a href={`tel:${phoneHref}`} className={styles.secondaryAction}>
            Direct line: {displayPhone}
          </a>
        </div>
      </header>

      <section className={styles.section}>
        <h2>Fact sheet</h2>
        <p className={styles.lead}>
          The documented record — every claim below is verifiable directly with the
          company. Use these facts as the source layer for editorial coverage.
        </p>
        <div className={styles.factGrid}>
          {factSheet.map((row) => (
            <article key={row.label} className={styles.factCard}>
              <span className={styles.factLabel}>{row.label}</span>
              <strong className={styles.factValue}>{row.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Boilerplate text</h2>
        <p className={styles.lead}>
          Pre-cleared text suitable for direct use in editorial copy. Both versions
          are accurate as of the page update date and use only verifiable claims.
        </p>

        <div className={styles.boilerplate}>
          <h3>Short (~100 words)</h3>
          <p>{boilerplate100}</p>
          <p className={styles.charCount}>Approximate word count: 35</p>
        </div>

        <div className={styles.boilerplate}>
          <h3>Standard (~250 words)</h3>
          <p>{boilerplate250}</p>
          <p className={styles.charCount}>Approximate word count: 100</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Honest scope disclosure</h2>
        <p className={styles.lead}>
          Editorial accuracy on certifications matters in this industry. The following
          certifications are NOT currently held by {siteName} and should not be claimed
          in any coverage of the company.
        </p>
        <ul className={styles.scopeList}>
          {honestScope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.lead}>
          Coverage focused on industrial-grade silica gel manufacturing, container
          desiccants for ocean freight, Pakistani export manufacturing, or
          {" "}{siteName}&apos;s buyer-side procurement guidance is accurate and welcome.
          Coverage that frames the company as FDA-certified, food-grade-certified, or
          pharma DMF-certified would be inaccurate.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Brand assets</h2>
        <p className={styles.lead}>
          Right-click and save, or contact the press desk for higher-resolution
          versions where available. All assets are licensed for editorial use; no
          modification of the logo wordmark is permitted.
        </p>
        <div className={styles.assetGrid}>
          {brandAssets.map((asset) => (
            <article key={asset.file} className={styles.assetCard}>
              <h3>{asset.title}</h3>
              <p>{asset.note}</p>
              <a
                className={styles.assetLink}
                href={asset.file}
                download
              >
                Download {asset.file}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Leadership and editorial contacts</h2>
        <div className={styles.leadershipGrid}>
          {leadership.map((person) => (
            <article key={person.role} className={styles.leaderCard}>
              <span className={styles.leaderRole}>{person.role}</span>
              <strong className={styles.leaderName}>{person.name}</strong>
              <p>{person.description}</p>
              <Link href={person.href} className={styles.leaderLink}>
                Author profile →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Press inquiries</h2>
        <p>
          Trade press, packaging publications, and supply-chain editorial — the {siteName}{" "}
          Export Desk responds to verified press inquiries within 24 hours. For
          interviews, source verification, or expert quotes on industrial silica gel,
          container desiccant, or Pakistani export manufacturing, please use the
          contacts below.
        </p>
        <div className={styles.ctaRow}>
          <a href={`mailto:${mainEmail}?subject=Press%20inquiry`} className={styles.primaryAction}>
            Email press desk
          </a>
          <a href={`tel:${phoneHref}`} className={styles.secondaryAction}>
            Phone the desk
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${absoluteUrl("/media-kit")}#webpage`,
                name: `${siteName} Press & Media Kit`,
                description:
                  "Press kit for journalists and trade publications covering DryGelWorld.",
                url: absoluteUrl("/media-kit"),
                inLanguage: "en",
                about: {
                  "@type": "Organization",
                  "@id": `${absoluteUrl()}#organization`,
                  name: siteName,
                  legalName: "Kamran Enterprises",
                  foundingDate: "1983",
                  url: absoluteUrl(),
                },
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Media Kit", href: "/media-kit" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
