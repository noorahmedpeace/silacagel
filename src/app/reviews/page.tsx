import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { customerReferences, totalCustomersSupplied } from "@/lib/customer-references";
import { SupplyWall } from "@/components/supply-wall";
import { CustomerExplorer } from "@/components/customer-explorer";
import { googleMapsUrl } from "@/lib/product-data";
import styles from "../strategy-pages.module.css";
import local from "./reviews.module.css";

export const metadata: Metadata = {
  title: "DryGelWorld Reviews | Customer Supply References",
  description:
    "Who DryGelWorld supplies: named pharmaceutical, textile, rice and industrial customers, with company sites linked where confirmed. No written testimonials, no self-issued ratings.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
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
        <Link className={styles.cta} href="/request-a-quote">Request a Quote</Link>
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

      {/* Wall first, then the searchable grid. The wall is the impression — it
          shows scale in one glance without asking the reader to do anything.
          The grid is the reference they work with once that lands, so it reads
          as answer-then-detail rather than detail-then-decoration. Both exist
          because motion alone would have made 32 companies harder to find. */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>The supply wall.</h2>
          <p>
            {total} of them, moving. Hover any column to stop it and read a card; every card with a
            confirmed website links straight to it.
          </p>
        </div>
        <SupplyWall />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Supplied by sector.</h2>
          <p>
            The same list, searchable. Filter by your own sector or search a name, then open a card
            to see what we supply into that industry and to visit the company&rsquo;s own site.
          </p>
        </div>
        <CustomerExplorer />
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
