import Link from "next/link";
import styles from "./legal-document.module.css";

// Shared layout for /privacy-policy and /terms-of-use. A legal page is read
// to find one clause, not scrolled like a landing page, so it gets a document
// layout: one readable column, numbered sections (people cite "section 4"),
// and a sticky contents list on wide screens. The section numbers are real
// structure, not decoration.

export type LegalSection = { title: string; body: string[]; bullets?: string[] };

function slug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function LegalDocument({
  kicker,
  title,
  intro,
  effective,
  sections,
  related,
  footnote,
}: {
  kicker: string;
  title: string;
  intro: string;
  effective: string;
  sections: LegalSection[];
  related: { href: string; label: string }[];
  footnote?: string;
}) {
  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.meta}>
          Effective <time>{effective}</time>
        </p>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocLabel}>On this page</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#${slug(s.title)}`}>
                  <span className={styles.num}>{i + 1}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.doc}>
          {sections.map((s, i) => (
            <section key={s.title} id={slug(s.title)} className={styles.clause}>
              <h2>
                <span className={styles.num}>{i + 1}</span>
                {s.title}
              </h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {s.bullets ? (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <footer className={styles.related}>
            <h2>Related</h2>
            <ul>
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>{r.label}</Link>
                </li>
              ))}
            </ul>
            {footnote ? <p className={styles.footnote}>{footnote}</p> : null}
          </footer>
        </article>
      </div>
    </div>
  );
}
