import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { FAQContent, type FaqItem } from "./faq-content";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "Silica Gel FAQ | Desiccant Buying & Technical Questions",
  description:
    "Answers to common silica gel desiccant questions about indicating vs non-indicating gel, reactivation, documents, MOQ, private label, and bulk export supply.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs: FaqItem[] = [
  {
    q: "How does Dry Gel World compare to standard desiccants?",
    a: "Our silica gel is prepared for higher adsorption performance and packed in low-dust, high-porosity materials. Unlike clay desiccants, silica gel does not swell, cake, or change physical state when saturated.",
  },
  {
    q: "What is the difference between indicating and non-indicating silica gel?",
    a: "Indicating silica gel contains a moisture-sensitive dye that changes color when saturated. Non-indicating gel is white and requires a humidity meter or process control check to confirm saturation.",
  },
  {
    q: "How do I reactivate silica gel packets?",
    a: "Reactivation depends on packet material and buyer specification. Many compatible formats can be dried with controlled oven heat, but the exact temperature and time should be confirmed against the sachet material before reuse.",
  },
  {
    q: "Which compliance documents can you provide?",
    a: "ISO 9001:2015, SDS, COA, and DMF-free support can be discussed against the exact product format and buyer requirement. FDA, REACH, Halal, GMP, or food-grade claims should only be used when valid documentation is available for that specific order.",
  },
  {
    q: "Do you offer custom sachet sizes or private labeling?",
    a: "Yes. We support private-label manufacturing and custom gram sizing from 0.5g to 1kg+ for high-volume recurring B2B orders. Minimum quantities apply.",
  },
  {
    q: "How do I determine the right desiccant quantity for my package?",
    a: "Use the calculator to estimate by format and quantity, then confirm the final requirement against carton size, product sensitivity, transit time, packaging material, and destination humidity.",
  },
  {
    q: "What is your minimum order for bulk industrial supply?",
    a: "Bulk orders can be quoted for sachets, 25kg loose bags, 250g/500g formats, and 1kg to 5kg container strips. MOQ depends on format, packaging, private-label work, and destination.",
  },
  {
    q: "What materials are your packets made from?",
    a: "Core formats include breathable paper sachets, woven silica gel bead bags, non-woven silica gel bead bags, and custom sizes on request. Material selection should match the product, market, and document requirement.",
  },
  {
    q: "Do your dispensers integrate with existing packaging lines?",
    a: "Desiccant dispensers can be discussed for existing conveyor packaging lines, with configuration depending on packet format, target speed, controls, and production environment.",
  },
  {
    q: "Do you offer technical support post-purchase?",
    a: "Yes. B2B buyers can request technical documentation, quote support, and WhatsApp follow-up for repeat procurement and high-volume packaging discussions.",
  },
];

export default function FAQPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Technical FAQ</span>
        <h1>Answers to every procurement question.</h1>
        <p>
          Straight answers on chemistry, sizing, documents, and ordering.
        </p>
      </section>

      <FAQContent faqs={faqs} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
            url: absoluteUrl("/faq"),
          }),
        }}
      />
    </main>
  );
}
