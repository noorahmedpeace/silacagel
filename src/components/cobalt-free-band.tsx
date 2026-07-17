import Link from "next/link";
import styles from "./cobalt-free-band.module.css";

// The cobalt-free / REACH wedge — the site's real differentiation against
// commodity suppliers who still ship cobalt-blue indicating gel.
//
// HONESTY: cobalt-free is a factual product property, not a certification, and
// it is NOT true of every product. Blue indicating gel uses cobalt(II) chloride
// (an EU REACH SVHC). So the claim is scoped exactly:
//   - orange indicating gel  -> cobalt-free organic indicator (REACH-friendly)
//   - white non-indicating   -> no cobalt
//   - clay / calcium chloride -> no cobalt
//   - blue indicating gel    -> contains cobalt chloride; supplied only on
//                                request and labelled as such, never hidden.
// We say "REACH-friendly", never "REACH registered/certified" (REACH is a
// regulation, not a mark we hold). Keep this wording; do not inflate it.
const points = [
  {
    title: "Orange indicating gel — cobalt-free",
    text: "Our indicating desiccant ships in cobalt-free orange: an organic indicator with the same colour-change behaviour, the REACH-friendly alternative to cobalt-blue.",
  },
  {
    title: "White gel & clay — no cobalt at all",
    text: "White non-indicating silica gel, activated clay, and calcium chloride contain no cobalt. The default across most of the catalogue is already cobalt-free.",
  },
  {
    title: "Blue cobalt gel — only if you ask",
    text: "Traditional blue gel uses cobalt(II) chloride, an EU REACH substance of very high concern. We still supply it on request, clearly labelled — we never slip it into a cobalt-free order.",
  },
];

export function CobaltFreeBand() {
  return (
    <section className={styles.band} aria-labelledby="cobalt-free-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>REACH-friendly by default</p>
          <h2 id="cobalt-free-heading" className={styles.heading}>
            Cobalt-free desiccants, without the guesswork.
          </h2>
          <p className={styles.lead}>
            EU and cobalt-sensitive buyers should not have to interrogate a supplier
            about cobalt chloride. Across our range the default is cobalt-free — and
            where blue cobalt gel is involved, we say so up front.
          </p>
        </div>

        <ul className={styles.grid}>
          {points.map((p) => (
            <li key={p.title} className={styles.point}>
              <span className={styles.dot} aria-hidden="true" />
              <div>
                <h3 className={styles.pointTitle}>{p.title}</h3>
                <p className={styles.pointText}>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className={styles.footnote}>
          Composition statement, SDS and COA supplied on request.{" "}
          <Link href="/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety" className={styles.link}>
            Orange vs blue: the REACH question
          </Link>
        </p>
      </div>
    </section>
  );
}
