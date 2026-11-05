import type { Metadata } from "next";
import { absoluteUrl, brandName, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { SampleRequestForm } from "@/components/sample-request-form";
import styles from "../strategy-pages.module.css";

const pageTitle = "Free Desiccant Samples (Courier Extra) | DryGelWorld Export Desk";
const pageDescription =
  "Request free 200-300 g samples of silica gel sachets, bulk beads, or container desiccant for evaluation before a bulk order. The material is free; the buyer pays the courier.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/samples" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/samples",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function SamplesPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Samples", href: "/samples" },
  ]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Samples</span>
        <h1>See the product before you commit to a bulk order.</h1>
        <p>
          Tell us the product and destination - the export desk follows up by email to confirm
          sample availability, format, and dispatch. For pricing and full documentation on a
          specific order, use the full export quote form instead.
        </p>
        <p>Sample material is free (200 to 300 g). You cover the courier.</p>
      </section>

      <section className={styles.section}>
        <SampleRequestForm />
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: pageTitle,
                description: pageDescription,
                url: absoluteUrl("/samples"),
                isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl()}#website`, name: brandName || siteName },
              },
              { "@type": breadcrumb["@type"], itemListElement: breadcrumb.itemListElement },
            ],
          }),
        }}
      />
    </main>
  );
}
