import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { companyAddressFull, mainEmail } from "@/lib/product-data";
import styles from "../strategy-pages.module.css";

// Written 9 Oct 2026. Deliberately modest: it states what the site's
// information is and is not (indicative prices, estimating calculators, an
// AI assistant that can be wrong), which claims the company makes and which
// it does not, and where disputes go. No warranty language the business
// cannot stand behind.

export const metadata: Metadata = {
  title: "Terms of Use | DryGelWorld",
  description:
    "Terms for using www.drygelworld.com: what the published prices, calculators, documents, and chat assistant are - and are not - and how quotations and orders are agreed.",
  alternates: { canonical: "/terms-of-use" },
};

const EFFECTIVE = "9 October 2026";

const sections: { title: string; body: string[]; bullets?: string[] }[] = [
  {
    title: "Who you are dealing with",
    body: [
      `www.drygelworld.com is published by Kamran Enterprises, trading as DryGelWorld, ${companyAddressFull}. Using the site means you accept these terms. Questions: ${mainEmail}.`,
    ],
  },
  {
    title: "Prices and quotations",
    body: [
      "Prices shown on this site are indicative. They are published to help you plan and compare, and they move with raw material, packaging, and currency costs. The price that applies to an order is the one in the written quotation issued by our export desk for your quantity, format, packaging, destination, and Incoterm. No contract exists until a quotation is accepted in writing by both sides.",
      "There is no minimum order quantity on standard formats; printed private-label runs carry a practical minimum stated in the quotation.",
    ],
  },
  {
    title: "Calculators and guides",
    body: [
      "The desiccant calculators, dosage guides, and comparison pages are planning tools built on published standards and our own experience. They produce estimates from the inputs you give them. They do not know your cargo, your route's weather, or your packaging, and they are not a guarantee that a shipment will arrive dry. Confirm sizing with the export desk for any shipment that matters, and treat the output as a starting point, not a specification.",
    ],
  },
  {
    title: "The chat assistant",
    body: [
      "DryBot answers from this website's own content using a third-party AI model and can be wrong, incomplete, or out of date. Nothing it says is a quotation, a technical specification, or a compliance statement. Where it conflicts with a page on this site or with the export desk, the page and the desk are right.",
    ],
  },
  {
    title: "Documents and claims",
    body: [
      "We publish and supply a safety data sheet (SDS), a certificate of analysis (COA) per batch, and a DMF-free statement, and our manufacturing is certified to ISO 9001:2015. We do not claim certifications we do not hold, and this site says so plainly where a buyer might expect one. Any suitability claim for a specific regulated use - food contact, pharmaceutical primary packaging, or similar - is only made in writing for a specific product and document set, never implied by a general page.",
    ],
  },
  {
    title: "Using the site",
    bullets: [
      "You may read, print, and share pages from this site for evaluating and buying our products.",
      "Text, images, calculators, and documents on this site belong to Kamran Enterprises unless stated otherwise. Do not republish them as your own.",
      "Do not use the site, its forms, or the chat assistant to send spam, probe for vulnerabilities, or submit false enquiries.",
      "Links to other websites are provided for reference. We do not control them and are not responsible for their content.",
    ],
    body: [],
  },
  {
    title: "Liability",
    body: [
      "The site and its tools are provided as-is for information. To the extent the law allows, Kamran Enterprises is not liable for loss arising from reliance on indicative prices, calculator estimates, chat answers, or general guidance on this site. Liability for products you buy is governed by the quotation, the order, and the documents issued with the shipment.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of Pakistan. Disputes about the use of this website are subject to the courts of Karachi. Contracts for products are governed by the terms in the accepted quotation, which may provide otherwise.",
    ],
  },
  {
    title: "Changes",
    body: [`These terms are effective from ${EFFECTIVE} and may be updated; the current version is always at this address.`],
  },
];

export default function TermsOfUsePage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Terms of Use", href: "/terms-of-use" },
  ]);

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={styles.hero}>
        <span className={styles.kicker}>Terms</span>
        <h1>Terms of Use.</h1>
        <p>
          What the information on this site is and is not, and how an enquiry becomes an order.
          Effective {EFFECTIVE}.
        </p>
      </section>

      {sections.map((s) => (
        <section className={styles.section} key={s.title}>
          <div className={styles.sectionHead}>
            <h2>{s.title}</h2>
          </div>
          <div className={styles.grid}>
            <article className={styles.card}>
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
            </article>
          </div>
        </section>
      ))}

      <section className={styles.section}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Related</h3>
            <p>
              <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
              <Link href="/pricing">Indicative price list</Link> ·{" "}
              <Link href="/request-a-quote">Request a quotation</Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
