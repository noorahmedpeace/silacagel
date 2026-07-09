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

// Brand glyphs (simple-icons paths) - lucide-react no longer ships brand logos.
const brandPaths = {
  facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
};

function BrandIcon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

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
  { value: "190+", label: "Export markets" },
  { value: "ISO 9001:2015", label: "Manufacturer certified" },
  { value: "24h", label: "Quote response target" },
];

// Real, unstaged photographs of our own Karachi factory and warehouse - never
// stock, never AI. Each caption/alt describes exactly what the frame shows; the
// bead-stock sacks are honestly labelled as raw stock, not implied as in-house
// bead manufacturing.
const facilityPhotos = [
  {
    src: "/facility/production-floor-sachet-line.webp",
    alt: "Sachet production floor at the DryGelWorld factory in Karachi with sachet-making machines and an operator",
    caption: "Sachet production floor, with an operator at the packing line.",
  },
  {
    src: "/facility/finished-sachet-inventory.webp",
    alt: "Shelves of bagged and labelled finished silica gel sachets in the DryGelWorld store room",
    caption: "Finished sachets — bagged, labelled, and shelved by size.",
  },
  {
    src: "/facility/warehouse-bulk-bags.webp",
    alt: "Store-room shelves stacked with white bulk silica gel bags",
    caption: "Store-room shelves of bagged bulk silica gel.",
  },
  {
    src: "/facility/nonwoven-fabric-rolls.webp",
    alt: "Wall of blue non-woven sachet fabric rolls in the DryGelWorld warehouse",
    caption: "Non-woven sachet fabric stock, feeding the sachet lines.",
  },
  {
    src: "/facility/bulk-stock-made-in-china.webp",
    alt: "Stacked sacks of 2 to 4 mm silica gel bead stock",
    caption: "Bulk silica gel bead stock (2–4 mm), sacked for processing.",
  },
  {
    src: "/facility/warehouse-aisle-rolls-bags.webp",
    alt: "Warehouse aisle lined with blue fabric rolls and white bagged stock",
    caption: "Warehouse aisle — fabric rolls alongside bagged stock.",
  },
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
    note: "A family-led manufacturer and exporter, with the second-generation team currently leading the DryGelWorld export desk.",
  },
  {
    label: "Brand structure",
    value: "Two brands, one manufacturer",
    note: "SilicaGelPK is our Pakistan-facing brand. DryGelWorld is our global export brand, backed by the same manufacturer operating since 1983.",
  },
  {
    label: "Head office",
    value: companyAddressFull,
    note: "Public head office and sales desk in Gulshan-e-Iqbal, Karachi, used for quotes, documentation, and buyer coordination.",
  },
  {
    label: "Manufacturing site",
    value: factoryAddressFull,
    note: "Production factory in North Karachi Industrial Area, where silica gel desiccant sachets, strips, and industrial PPE lines are converted and packed on-site.",
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
    value: "190+ countries",
    note: "Active export to Middle East, EU, USA, Africa, Asia-Pacific. Country-specific landing pages at /export.",
  },
];

// Honest scope statement - what we DO NOT currently hold. This is the
// E-E-A-T differentiator: B2B buyers trust suppliers who clearly state
// their regulatory scope rather than vague universal compliance claims.
const honestScope = [
  "FDA Drug Master File (DMF), required for direct-contact pharma silica gel",
  "FDA food-contact certification (FCN or GRAS), required for direct food-contact silica gel",
  "EU Regulation 1935/2004 Declaration of Compliance, required for direct food-contact in EU markets",
  "REACH-specific food-contact registration, required for some EU food-contact applications",
  "JEDEC moisture sensitivity classification, required for certain semiconductor packaging",
  "MIL-spec, Halal, or FSSC food-grade certification, required by specific buyer audit programs",
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
              DryGelWorld has manufactured silica gel in Karachi since 1983, helping buyers
              protect stock, cartons, and container shipments worldwide.
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
              <strong className={stat.value.length > 8 ? styles.statValueCompact : undefined}>
                {stat.value}
              </strong>
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

      <section className={styles.facility}>
        <Reveal direction="up">
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Inside the operation</span>
            <h2>Real photos from our Karachi factory and warehouse.</h2>
            <p>
              Unstaged photographs of our own production floor, sachet lines, and
              stock rooms — genuine facility imagery, never stock photos or AI renders.
            </p>
          </div>
        </Reveal>
        <div className={styles.facilityGrid}>
          {facilityPhotos.map((photo, idx) => (
            <Reveal key={photo.src} direction="up" delay={0.06 * idx}>
              <figure className={styles.facilityCard}>
                <div className={styles.facilityMedia}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
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
              documented record - founded, certified, address, documentation scope. The
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
            <h3>Certifications not currently held</h3>
            <ul>
              {honestScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.honestScopeFooter}>
              These are real procurement categories that require specifically certified
              suppliers. Buyers in those categories should source from manufacturers that
              already hold the required certificates and treat {siteName} as a parallel option for
              non-regulated lines.
            </p>
          </div>

          {author ? (
            <div className={styles.editorial}>
              <h3>Editorial accountability</h3>
              <p>
                Buyer guides, comparison content, and procurement documentation on this
                site are edited by the{" "}
                <Link href={`/authors/${author.slug}`}>{author.name}</Link>, the
                buyer-facing team at DryGelWorld. Editorial scope is limited
                to product, packaging, and export logistics that the desk handles directly.
                Regulatory claims are limited to certifications actually held.
              </p>
            </div>
          ) : null}

          <div className={styles.editorial}>
            <h3>Follow DryGelWorld</h3>
            <p>Product updates, factory and packaging videos, and export announcements:</p>
            <div className={styles.socialRow}>
              <Link
                href="https://www.facebook.com/drygelworld"
                className={`${styles.socialIcon} ${styles.socialFacebook}`}
                rel="me noopener noreferrer"
                target="_blank"
                aria-label="DryGelWorld on Facebook"
              >
                <BrandIcon d={brandPaths.facebook} />
              </Link>
              <Link
                href="https://www.instagram.com/drygelworld"
                className={`${styles.socialIcon} ${styles.socialInstagram}`}
                rel="me noopener noreferrer"
                target="_blank"
                aria-label="DryGelWorld on Instagram"
              >
                <BrandIcon d={brandPaths.instagram} />
              </Link>
              <Link
                href="https://www.youtube.com/@DryGelWorld"
                className={`${styles.socialIcon} ${styles.socialYoutube}`}
                rel="me noopener noreferrer"
                target="_blank"
                aria-label="DryGelWorld on YouTube"
              >
                <BrandIcon d={brandPaths.youtube} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/drygelworld/"
                className={`${styles.socialIcon} ${styles.socialLinkedin}`}
                rel="me noopener noreferrer"
                target="_blank"
                aria-label="DryGelWorld on LinkedIn"
              >
                <BrandIcon d={brandPaths.linkedin} />
              </Link>
            </div>
          </div>
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
                  "DryGelWorld is a Karachi-based silica gel desiccant manufacturer and exporter operating since 1983.",
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
                    "https://www.instagram.com/drygelworld",
                    "https://www.youtube.com/@DryGelWorld",
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
