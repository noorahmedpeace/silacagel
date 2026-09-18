import type { Metadata } from "next";
import { breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import styles from "./dispensers.module.css";

// Rewritten 18 Sep 2026 (11-Sep audit P0-5). The previous page sold two
// invented machines ("DT-1200", "DT-1500") with fabricated specs, an "ROI in
// 6 months" claim attributed to non-existent "average clients", a placement
// guarantee, and a cleanroom-standards claim. DryGelWorld does not
// manufacture dispensing machinery. What the factory actually supplies to
// buyers who run dispensers is the CONSUMABLE: sachets in formats matched to
// third-party dispensing equipment. This page now says exactly that and
// nothing more.

export const metadata: Metadata = {
  title: "Desiccant Packets for Dispenser Lines | DryGelWorld",
  description:
    "Silica gel sachets supplied in formats for automated dispensing and insertion equipment - size, material, and packaging matched to your machine's specification. Factory-direct from Karachi.",
  alternates: {
    canonical: "/dispensers",
  },
};

const fitPoints = [
  {
    title: "Sachet sizes matched to your feeder",
    desc: "Sachets from 0.5 g to 20 g and packets to 500 g, produced to consistent dimensions so a mechanical feeder or manual insertion station handles them predictably.",
  },
  {
    title: "Materials to your machine's spec",
    desc: "Paper and non-woven sachet materials selected against your equipment and application - send the machine make/model or its packet specification with the RFQ.",
  },
  {
    title: "Packaging for line-side use",
    desc: "Cartons and inner bags organised for line-side replenishment, with counts per carton agreed up front so floor stock stays countable.",
  },
  {
    title: "Documents with every shipment",
    desc: "SDS, COA, and a DMF-free statement, backed by ISO 9001:2015 manufacturing - the paperwork your QA asks for before a consumable goes on the line.",
  },
];

export default function DispensersPage() {
  return (
    <main className={styles.page}>
      {/* Hub pages carried no BreadcrumbList while every leaf page under them
          did - the site told Google the tree everywhere except at the branch. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Dispensers", href: "/dispensers" },
            ]),
          ),
        }}
      />
      <section className={styles.hero}>
        <span className={styles.kicker}>Desiccant supply for automated lines</span>
        <h1>Sachets built for your dispensing equipment.</h1>
        <p>
          DryGelWorld manufactures the consumable, not the machine: silica gel sachets and
          packets produced to the size, material, and packaging your dispensing or insertion
          equipment expects. If your line inserts desiccant automatically - or you are
          specifying a line that will - send the machine&apos;s packet specification and we
          quote against it.
        </p>
      </section>

      <section className={styles.whyAutomate}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>What we supply</span>
          <h2>Matching the sachet to the machine.</h2>
        </div>
        <div className={styles.reasonsGrid}>
          {fitPoints.map((r) => (
            <article key={r.title} className={styles.reasonCard}>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.hero}>
        <h2>Send your machine&apos;s packet spec.</h2>
        <p>
          Dimensions, material, unit weight, and count per carton - or simply the equipment
          make and model, and our export desk works from its documentation. No minimum order
          quantity on standard formats; printed private-label sachets are the only exception.
        </p>
        <p>
          <Link href="/request-a-quote" className={styles.ctaBtn}>
            Request a Dispenser-Format Quote →
          </Link>
        </p>
      </section>
    </main>
  );
}
