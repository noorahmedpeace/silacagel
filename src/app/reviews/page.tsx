import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { customerReferences, totalCustomersSupplied } from "@/lib/customer-references";
import { SupplyWall } from "@/components/supply-wall";
import { googleMapsUrl } from "@/lib/product-data";
import styles from "../strategy-pages.module.css";
import local from "./reviews.module.css";

export const metadata: Metadata = {
  title: "DryGelWorld Reviews | Customer Supply References",
  description:
    "Who DryGelWorld supplies: named pharmaceutical, textile, rice and industrial customers, with company sites linked where confirmed. No written testimonials, no self-issued ratings.",
  alternates: { canonical: "/reviews" },
};

// Sectors, not an alphabetical run of 32 names. A buyer arrives asking "do they
// supply anyone like me", and the sector heading answers that before they read
// a single company name. Pharma leads because it is both the largest group and
// the hardest sector to be accepted into.
const SECTORS = [
  { id: "pharma", label: "Pharmaceutical and nutraceutical" },
  { id: "textile", label: "Textile, apparel and leather" },
  { id: "food", label: "Food and rice export" },
  { id: "medical", label: "Medical and healthcare" },
  { id: "industrial", label: "Industrial and other" },
] as const;

/**
 * Logo files too small to render as a logo.
 *
 * Six entries started here as 16x16 to 32x32 favicons, which came out soft when
 * upscaled into the 46px stage. Five have since been replaced with real marks
 * pulled from each company's own site: utopia 16 to 157x64, hinucon 32 to
 * 107x111, hinutrition 32 to 256x141, pharmevo 32 to 256x123, neutro 32 to
 * 1026x540.
 *
 * Intex is the one that stayed. Its site serves no logo file at all, so 24x24
 * is still the best available and the initials mark is sharper than it. Drop
 * this entry the moment a real file exists.
 */
const LOW_RES_LOGOS = new Set(["/customer-logos/intex.png"]);

// Order matters. "Medical & pharma supply" contains both words, and the medical
// test has to run first or JSK Medica lands in Pharmaceutical, where a medical
// buyer scanning the Medical section would never find it.
function sectorFor(industry: string): (typeof SECTORS)[number]["id"] {
  const i = industry.toLowerCase();
  if (i.includes("medical") || i.includes("healthcare")) return "medical";
  if (i.includes("pharma") || i.includes("nutraceutical") || i.includes("biopharma")) return "pharma";
  if (i.includes("textile") || i.includes("apparel") || i.includes("spinning") || i.includes("leather")) return "textile";
  if (i.includes("rice") || i.includes("food")) return "food";
  return "industrial";
}

export default function ReviewsPage() {
  const grouped = SECTORS.map((sector) => ({
    ...sector,
    members: customerReferences.filter((c) => sectorFor(c.industry) === sector.id),
  })).filter((group) => group.members.length > 0);

  const total = customerReferences.length;
  const linked = customerReferences.filter((c) => c.href).length;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
  ]);

  // Deliberately no Review or AggregateRating node. Google does not accept
  // self-serving review markup, an organisation rating itself on its own site,
  // and publishing it risks a manual action in exchange for a rich result that
  // would never have rendered. Real reviews sit on the Google Business Profile,
  // which Google reads directly and which this page links to instead.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "DryGelWorld customer supply references",
        description: "Named companies supplied with silica gel and desiccant products, grouped by sector.",
        url: absoluteUrl("/reviews"),
        isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl()}#website`, name: brandName },
      },
      { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero}>
        <span className={styles.kicker}>Customer Supply References</span>
        <h1>Who DryGelWorld supplies.</h1>
        {/* The claim and the evidence are stated in the same breath. A grid of
            32 cards under a bare claim of 50 gets counted in one glance; saying
            which 32 are named turns that from a contradiction into a selection. */}
        <p>
          Checking whether this supplier is real before you send an enquiry? We supply
          {" "}{totalCustomersSupplied}+ companies. {total} of them are named below, grouped by
          sector, with {linked} company websites linked so you can look them up yourself.
        </p>
        <Link className={styles.cta} href="/contact">Request a Quote</Link>
      </section>

      {/* Statement plus a short ledger. Deliberately not another three-card row:
          the page already uses that family further down for verification routes. */}
      <section className={local.stance}>
        <div className={local.stanceLead}>
          <h2>Names, not praise.</h2>
          <p>
            A testimonial on a supplier&rsquo;s own website cannot be checked by the person reading it.
            A company name that resolves to a real business can be. So this page lists who bought,
            and leaves the opinions to the people who have them.
          </p>
        </div>
        <dl className={local.ledger}>
          <div>
            <dt>Written testimonials</dt>
            <dd>None published. Nobody here has been asked to say anything about us.</dd>
          </div>
          <div>
            <dt>Star ratings on this page</dt>
            <dd>None. A rating a company issues about itself is worth nothing to a buyer.</dd>
          </div>
          <div>
            <dt>Order quantities, prices, dates</dt>
            <dd>Not published. What a customer buys is their commercial information.</dd>
          </div>
        </dl>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Supplied by sector.</h2>
          <p>
            A selection of the {totalCustomersSupplied}+ companies we supply, grouped so you can find
            your own industry first. Companies without a confirmed website are listed by name only.
          </p>
        </div>

        {grouped.map((group) => (
          <div className={local.group} key={group.id}>
            <h3 className={local.groupHead}>
              {group.label}
              <span className={local.count}>{group.members.length}</span>
            </h3>
            <ul className={local.grid}>
              {group.members.map((customer) => {
                const showLogo = customer.logo && !LOW_RES_LOGOS.has(customer.logo);
                const inner = (
                  <>
                    <span className={local.mark} aria-hidden="true">
                      {showLogo ? (
                        <Image src={customer.logo as string} alt="" width={46} height={30} />
                      ) : (
                        customer.initials
                      )}
                    </span>
                    <strong className={local.name}>{customer.name}</strong>
                    {/* Stated, not shown on hover. A touch user has no hover, so
                        a hover-only affordance would leave the five unlinked
                        companies indistinguishable from the twenty-seven linked
                        ones. */}
                    <span className={local.state}>
                      {customer.href ? "Official site" : "No public website"}
                    </span>
                  </>
                );
                return (
                  <li key={customer.name}>
                    {customer.href ? (
                      <a className={local.cardLink} href={customer.href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <div className={local.cardPlain}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      {/* The scrolling wall sits after the sector grid, not instead of it. The
          grid is the reference a buyer scans for their own industry; the wall is
          the impression. Replacing the grid with motion would have made 33
          companies harder to find, not easier. */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>The supply wall.</h2>
          <p>
            The same {total} companies, moving. Hover or focus any card to stop the column and read
            it; every card with a confirmed website links straight to it.
          </p>
        </div>
        <SupplyWall />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Other ways to check us.</h2>
          <p>
            A customer list is one signal. These are the rest, and none of them needs you to take our
            word for anything.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.articleCard}>
            <span>Public reviews</span>
            <h3>Google Business Profile</h3>
            <p>
              Reviews there are dated, attached to real Google accounts, and outside our control. If
              you have bought from us, that is where a review actually counts.
            </p>
            <a className={styles.textLink} href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Open our Google profile
            </a>
          </article>
          <article className={styles.articleCard}>
            <span>Documents</span>
            <h3>Certificates and data sheets</h3>
            <p>
              ISO 9001:2015 registration, safety data sheets, and batch certificates of analysis from
              the source mill. All downloadable without asking us first.
            </p>
            <Link className={styles.textLink} href="/documentation">View documentation</Link>
          </article>
          <article className={styles.articleCard}>
            <span>How we work</span>
            <h3>Anonymous case studies</h3>
            <p>
              What the requirement was, what was supplied, and what changed. Written without naming
              the customer or inventing numbers.
            </p>
            <Link className={styles.textLink} href="/case-studies">Read the case studies</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
