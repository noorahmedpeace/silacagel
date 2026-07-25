import Link from "next/link";
import { documents } from "@/lib/document-registry";
import styles from "./evidence-pack.module.css";

/*
 * Evidence pack handed over the moment an RFQ lands, instead of making the
 * buyer wait for a reply to get the paperwork. Procurement and QA reviewers
 * screen a new supplier on the SDS, COA and ISO certificate before they
 * engage on price, so these are published immediately rather than "on
 * request".
 *
 * Shared by both RFQ surfaces — QuoteForm (home, products, landing pages,
 * contact) and RfqForm (/request-a-quote, blog) — so the two never drift.
 *
 * Sourced from the document registry and filtered on `available`, so a
 * document whose file has not been uploaded yet can never render as a dead
 * download link.
 */
const EVIDENCE_PACK_IDS = [
  "sds-silica-gel",
  "coa-white-bead-2-4mm",
  "tds-silica-gel",
  "iso-9001-scan",
  "dmf-free-statement",
];

const evidencePack = EVIDENCE_PACK_IDS.map((id) =>
  documents.find((doc) => doc.id === id && doc.available),
).filter((doc): doc is NonNullable<typeof doc> => Boolean(doc));

export function EvidencePack({ className }: { className?: string }) {
  if (evidencePack.length === 0) return null;

  return (
    <div className={`${styles.pack}${className ? ` ${className}` : ""}`}>
      <strong>Your document pack — download now</strong>
      <ul>
        {evidencePack.map((doc) => (
          <li key={doc.id}>
            <a href={doc.fileHref} target="_blank" rel="noopener noreferrer">
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
      <Link href="/documentation">See all documents</Link>
    </div>
  );
}
