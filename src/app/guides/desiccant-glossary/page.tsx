import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { glossaryCategories, glossaryTerms } from "@/lib/glossary-data";
import styles from "../../strategy-pages.module.css";
import glossary from "./glossary.module.css";

const GLOSSARY_PATH = "/guides/desiccant-glossary";
// 55 chars - front-loads the primary query "Desiccant Glossary".
const GLOSSARY_TITLE = "Desiccant Glossary: Silica Gel & Moisture Control Terms";
// 154 chars, ends on a complete sentence.
const GLOSSARY_DESCRIPTION =
  "Definitions of 45 silica gel and desiccant terms buyers meet in specs and compliance documents — adsorption, DIN 55473, REACH, HS code 2811.22, and more.";

export const metadata: Metadata = {
  title: GLOSSARY_TITLE,
  description: GLOSSARY_DESCRIPTION,
  alternates: { canonical: GLOSSARY_PATH },
  openGraph: {
    title: GLOSSARY_TITLE,
    description: GLOSSARY_DESCRIPTION,
    url: GLOSSARY_PATH,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: GLOSSARY_TITLE,
    description: GLOSSARY_DESCRIPTION,
  },
};

export default function DesiccantGlossaryPage() {
  return (
    <main className={styles.page}>
      <article>
        <section className={styles.hero}>
          <span className={styles.kicker}>Reference</span>
          <h1>Desiccant &amp; Silica Gel Glossary</h1>
          <p>
            Plain-language definitions of the {glossaryTerms.length} terms procurement teams meet
            in desiccant specs, quotes, and compliance documents - from adsorption and relative
            humidity to DIN 55473 units, REACH, HS codes, and Incoterms. Every term is anchored,
            linked to the guide that covers it in depth, and cited to the standard that defines it.
          </p>
          <nav className={glossary.tocNav} aria-label="Glossary categories">
            {glossaryCategories.map((category) => (
              <a key={category.id} href={`#${category.id}`}>
                {category.title}
              </a>
            ))}
          </nav>
        </section>

        {glossaryCategories.map((category) => (
          <section
            className={styles.section}
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
          >
            <div className={styles.sectionHead}>
              <h2 id={`${category.id}-heading`}>{category.title}</h2>
              <p>{category.intro}</p>
            </div>
            <div className={styles.grid}>
              {category.terms.map((entry) => (
                <div
                  className={`${styles.card} ${glossary.entry}`}
                  key={entry.slug}
                  id={entry.slug}
                >
                  <h3>
                    {entry.term}
                    <a
                      className={glossary.anchor}
                      href={`#${entry.slug}`}
                      aria-label={`Permalink to ${entry.term}`}
                    >
                      §
                    </a>
                  </h3>
                  <p>{entry.definition}</p>
                  {entry.related && entry.related.length > 0 ? (
                    <p className={glossary.entryLinks}>
                      {entry.related.map((link) => (
                        <Link key={link.href} href={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </p>
                  ) : null}
                  {entry.source ? (
                    <p className={glossary.sourceRow}>
                      Defined by:{" "}
                      <a
                        href={entry.source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.source.label}
                      </a>
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.section} aria-label="Related references">
          <div className={styles.sectionHead}>
            <h2>Go deeper</h2>
            <p>The pillar guides, comparisons, and tools these terms come from.</p>
          </div>
          <div className={styles.relatedGrid}>
            <div className={styles.relatedColumn}>
              <h3>Pillar guides</h3>
              <ul>
                <li><Link href="/guides/silica-gel-buyer-guide">Industrial silica gel buyer guide</Link></li>
                <li><Link href="/blog/what-is-silica-gel-and-how-does-it-work">What is silica gel and how it works</Link></li>
                <li><Link href="/blog/relative-humidity-and-adsorption-isotherms-explained">Relative humidity and adsorption isotherms</Link></li>
              </ul>
            </div>
            <div className={styles.relatedColumn}>
              <h3>Comparisons</h3>
              <ul>
                <li><Link href="/compare">All desiccant comparisons</Link></li>
                <li><Link href="/compare/silica-gel-vs-clay-desiccant">Silica gel vs clay desiccant</Link></li>
                <li><Link href="/compare/silica-gel-vs-calcium-chloride-container-desiccant">Silica gel vs calcium chloride</Link></li>
              </ul>
            </div>
            <div className={styles.relatedColumn}>
              <h3>Sizing tools</h3>
              <ul>
                <li><Link href="/tools/container-desiccant-calculator">Container desiccant calculator</Link></li>
                <li><Link href="/tools/moisture-load-calculator">Moisture load calculator</Link></li>
              </ul>
            </div>
          </div>
          <Link className={styles.cta} href="/contact">
            Request export quote
          </Link>
        </section>
      </article>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "DefinedTermSet",
                "@id": `${absoluteUrl(GLOSSARY_PATH)}#termset`,
                name: GLOSSARY_TITLE,
                description: GLOSSARY_DESCRIPTION,
                url: absoluteUrl(GLOSSARY_PATH),
                publisher: {
                  "@type": "Organization",
                  name: siteName,
                  url: absoluteUrl(),
                },
                hasDefinedTerm: glossaryTerms.map((entry) => ({
                  "@type": "DefinedTerm",
                  "@id": `${absoluteUrl(GLOSSARY_PATH)}#${entry.slug}`,
                  name: entry.term,
                  description: entry.definition,
                  url: `${absoluteUrl(GLOSSARY_PATH)}#${entry.slug}`,
                  inDefinedTermSet: `${absoluteUrl(GLOSSARY_PATH)}#termset`,
                })),
              },
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Guides", href: "/guides/silica-gel-buyer-guide" },
                { name: "Desiccant Glossary", href: GLOSSARY_PATH },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
