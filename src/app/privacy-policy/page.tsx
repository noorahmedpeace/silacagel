import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { companyAddressFull, mainEmail } from "@/lib/product-data";
import styles from "../strategy-pages.module.css";

// Written 9 Oct 2026 against what the code actually does - every data flow
// named here exists in this repo (GA4 + Clarity + Vercel Analytics in
// layout.tsx, the inquiry pipeline in actions/submit-inquiry.ts and
// lib/rfq-store.ts, DryBot in api/chat, the diagnostic beacon in
// api/visit-log, the storage keys in quote-cart.ts / rfq-form.tsx). If a
// flow is added or removed, this page changes with it; it is not a template.

export const metadata: Metadata = {
  title: "Privacy Policy | DryGelWorld",
  description:
    "What DryGelWorld collects when you visit the site, send a quote request, or use the chat assistant - and how to ask us about your data.",
  alternates: { canonical: "/privacy-policy" },
};

const EFFECTIVE = "9 October 2026";

const sections: { title: string; body: string[]; bullets?: string[] }[] = [
  {
    title: "Who we are",
    body: [
      `This website, www.drygelworld.com, is operated by Kamran Enterprises, trading as DryGelWorld, a silica gel desiccant manufacturer at ${companyAddressFull}. For anything in this policy, write to ${mainEmail}.`,
    ],
  },
  {
    title: "What we collect when you simply visit",
    body: [
      "Like most websites we use analytics to understand which pages are read and whether the site works. Three services run on the public site:",
    ],
    bullets: [
      "Google Analytics 4 - page views and interactions, with IP anonymisation enabled.",
      "Microsoft Clarity - page interaction recordings and heatmaps, used to find broken or confusing parts of the site. Clarity masks text typed into form fields.",
      "Vercel Analytics and Speed Insights - page views and performance timings.",
      "Our hosting (Vercel) and network layer (Cloudflare) process request data such as IP address and browser type to serve and protect the site, as all hosting does.",
      "On a small number of pages, a diagnostic beacon records basic request details (IP address, browser, headers) for visits that arrive without a referrer. It exists to identify automated traffic and is removed once that work is done.",
    ],
  },
  {
    title: "What we collect when you contact us",
    body: [
      "When you send a quote request, sample request, or contact form, we collect what you type: company name, contact person, email, phone, country, product and quantity details, your message, and any files you attach. Alongside it we record technical details - IP address, browser, screen size, time zone, language, the page you came from, and campaign tags in the link you clicked - which we use to filter automated spam and to understand which pages lead to real enquiries.",
      "Submissions are stored on our hosting provider's storage service and emailed to our export desk so a human can reply. Attachments you upload are stored the same way. Submissions our spam filter flags are held separately for human review rather than deleted, so that a genuine enquiry caught by mistake is never lost.",
    ],
  },
  {
    title: "The chat assistant (DryBot)",
    body: [
      "Questions you type into the chat assistant are sent, together with relevant text from this website, to a third-party AI model provider to generate the reply. Depending on availability this is Groq, Google (Gemini), or Cerebras. Do not type passwords, payment details, or anything confidential into the chat. Conversations (question, answer, and a session identifier) are logged so we can review answer quality and correct mistakes.",
      "The assistant answers only from this website's own content and can still be wrong. Pricing, lead time, and documentation are confirmed by the export desk, never by the chat.",
    ],
  },
  {
    title: "Cookies and browser storage",
    body: [
      "Google Analytics and Microsoft Clarity set their own cookies. The site itself stores a few items in your browser, not on our servers:",
    ],
    bullets: [
      "A quote-cart list of products you have added, so the request form can be prefilled.",
      "The landing page and campaign tags of your visit, kept for the browser session, so an enquiry can be attributed to how you found us.",
      "A session identifier for the same purpose.",
      "An internal-traffic flag used only on our own devices so our own visits are excluded from analytics.",
    ],
  },
  {
    title: "What we do not do",
    bullets: [
      "We do not sell personal data.",
      "We do not run advertising networks on this site.",
      "We do not share your enquiry with anyone except the service providers needed to store it, email it, and reply to it.",
    ],
    body: [],
  },
  {
    title: "How long we keep it",
    body: [
      "Enquiries are kept while a quotation or business relationship is open and for a reasonable period afterwards for our records. Analytics data is kept according to each provider's retention settings. You can ask us to delete your enquiry data at any time.",
    ],
  },
  {
    title: "Your rights",
    body: [
      `You can ask what we hold about you, ask us to correct or delete it, or object to how we use it, by writing to ${mainEmail}. If you are in the EU, UK, or another jurisdiction with data-protection law, you have the rights those laws give you, and we will honour reasonable requests regardless of where you are.`,
    ],
  },
  {
    title: "Links to other services",
    body: [
      "WhatsApp, phone, and email links hand you over to those services, which have their own privacy terms. Links to third-party websites (customs tariff finders, standards bodies, and so on) are provided for reference; we are not responsible for their content or data practices.",
    ],
  },
  {
    title: "Changes",
    body: [
      `This policy is effective from ${EFFECTIVE}. If our data practices change, this page changes with them and the effective date is updated.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ]);

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={styles.hero}>
        <span className={styles.kicker}>Privacy</span>
        <h1>Privacy Policy.</h1>
        <p>
          A plain statement of what this site collects and why - written against what the site
          actually does, not a template. Effective {EFFECTIVE}.
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
              <Link href="/terms-of-use">Terms of Use</Link> ·{" "}
              <Link href="/documentation">Product documents (SDS, COA)</Link> ·{" "}
              <Link href="/contact">Contact the export desk</Link>
            </p>
            <p>Canonical URL: {absoluteUrl("/privacy-policy")}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
