import Link from "next/link";
import { FileStack, FlaskConical, Globe2, Leaf, PackageSearch, ShieldCheck } from "lucide-react";
import { ProductExplorer } from "@/components/product-explorer";
import { PriceCalculator } from "@/components/price-calculator";
import { QuoteForm } from "@/components/quote-form";
import { technicalDocuments } from "@/lib/documents";
import { industrySolutions } from "@/lib/industry-solutions";
import { complianceTags, productCatalog } from "@/lib/products";
import styles from "./page.module.css";

const heroHighlights = [
  "Corporate solution portal for industrial buyers",
  "Taxonomy-led product discovery",
  "Technical library with SDS, TDS, and certificate routing",
  "Hybrid RFQ plus WhatsApp conversion flow",
];

export default function Home() {
  return (
    <main className={`page-shell portal-page ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className="portal-kicker">Phase 1 modernization</span>
          <h1>Industrial moisture control, technical documentation, and buyer guidance in one portal.</h1>
          <p>
            SilacaGEL now leads with solutions instead of isolated product cards. The portal is
            structured for procurement teams, packaging engineers, QA reviewers, and export buyers
            who need product fit, compliance visibility, and fast RFQ movement.
          </p>
          <div className="portal-actions">
            <Link href="/contact" className="button-primary">Start a structured RFQ</Link>
            <Link href="/technical-library" className="button-secondary">Open technical library</Link>
          </div>
        </div>

        <div className={styles.heroPanel}>
          {heroHighlights.map((item) => (
            <article key={item} className={styles.heroCard}>
              <ShieldCheck size={18} />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="portal-section">
        <div className="portal-section-head">
          <span className="portal-kicker">Industry selector</span>
          <h2>Navigate by application risk, not just by SKU.</h2>
          <p>
            Each solution page is organized around sector pain points, required certificates,
            recommended products, and the documentation likely to matter during approval.
          </p>
        </div>
        <div className={styles.solutionGrid}>
          {industrySolutions.map((solution) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className={styles.solutionCard}>
              <strong>{solution.sector}</strong>
              <p>{solution.summary}</p>
              <span>Open solution page</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="portal-section">
        <div className="portal-section-head">
          <span className="portal-kicker">Product taxonomy overview</span>
          <h2>Filter the catalog by type, grade, packaging, indicator status, and packet material.</h2>
          <p>
            The catalog is now structured to reflect how industrial buyers actually compare
            moisture-control options across regulated and export-heavy supply chains.
          </p>
        </div>
        <ProductExplorer />
      </section>

      <section className={styles.complianceStrip}>
        <div className={styles.stripIntro}>
          <span className="portal-kicker">Compliance trust band</span>
          <h2>Show buyer-critical certifications early.</h2>
        </div>
        <div className={styles.complianceTags}>
          {complianceTags.map((tag) => (
            <article key={tag.id} className={styles.compliancePill}>
              <FileStack size={16} />
              <span>{tag.shortLabel}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.toolsGrid}>
        <article className="portal-section">
          <div className="portal-section-head">
            <span className="portal-kicker">Interactive tools</span>
            <h2>Engineer a starting point before you request a quote.</h2>
            <p>
              The BS1133 calculator gives packaging teams a planning-grade estimate with a nearest
              packet recommendation from the current product range.
            </p>
          </div>
          <PriceCalculator />
        </article>

        <article className="portal-section">
          <div className="portal-section-head">
            <span className="portal-kicker">Technical library</span>
            <h2>Request the right document pack without guessing.</h2>
            <p>
              Documents are indexed by product, industry, and compliance need so the library works
              for supplier onboarding as well as packaging selection.
            </p>
          </div>

          <div className={styles.libraryPreview}>
            {technicalDocuments.slice(0, 4).map((document) => (
              <div key={document.id} className={styles.libraryCard}>
                <div>
                  <span>{document.docType}</span>
                  <strong>{document.title}</strong>
                </div>
                <p>{document.summary}</p>
              </div>
            ))}
          </div>
          <div className="portal-actions">
            <Link href="/technical-library" className="button-primary">Browse the library</Link>
            <Link href="/documents" className="button-secondary">Legacy documents route</Link>
          </div>
        </article>
      </section>

      <section className={styles.utilityGrid}>
        <article className="portal-section">
          <div className="portal-section-head">
            <span className="portal-kicker">Sustainability proof</span>
            <h2>Position sustainability as a procurement differentiator.</h2>
          </div>
          <div className={styles.valueList}>
            <div><Leaf size={18} /><span>Promote cobalt-free and DMF-free options</span></div>
            <div><Globe2 size={18} /><span>Support export buyers with requestable declaration packs</span></div>
            <div><FlaskConical size={18} /><span>Teach regeneration and reuse pathways where product format allows</span></div>
          </div>
          <Link href="/sustainability" className="button-secondary">View sustainability page</Link>
        </article>

        <article className="portal-section">
          <div className="portal-section-head">
            <span className="portal-kicker">Portal scope</span>
            <h2>Phase 1 covers the core buyer journey.</h2>
          </div>
          <div className={styles.metricGrid}>
            <div><strong>{productCatalog.length}</strong><span>core product families</span></div>
            <div><strong>{industrySolutions.length}</strong><span>industry solution pages</span></div>
            <div><strong>{technicalDocuments.length}</strong><span>metadata-backed library entries</span></div>
            <div><strong>1</strong><span>hybrid RFQ workflow</span></div>
          </div>
          <Link href="/products" className="button-primary">Explore all products</Link>
        </article>
      </section>

      <section className={styles.rfqStage}>
        <div className={styles.rfqCopy}>
          <span className="portal-kicker">Structured inquiry</span>
          <h2>Move from browsing to a qualification-ready RFQ.</h2>
          <p>
            Capture company, industry, product interest, packaging format, annual demand, geography,
            and technical notes before switching into WhatsApp. That makes the conversation faster
            and far more useful for both sides.
          </p>
          <div className={styles.rfqNotes}>
            <div><PackageSearch size={16} /><span>Packaged for procurement and engineering review</span></div>
            <div><FileStack size={16} /><span>Designed to align with document-pack requests</span></div>
          </div>
        </div>

        <QuoteForm title="Start a SilacaGEL RFQ" compact />
      </section>
    </main>
  );
}
