import type { Metadata } from "next";
import { absoluteUrl, brandName, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { ContactContent } from "./contact-content";

/**
 * /contact and /request-a-quote both used to serve a quotation form, under
 * near-identical titles, splitting ~60 internal links and every "Request a
 * quote" anchor on the site between two URLs competing for one intent.
 *
 * They are now separated by job rather than by name:
 *   /request-a-quote - the RFQ engine, and the only page that carries the
 *                      prefill pipeline (product, quantity, unit, application,
 *                      destination) the calculators and landing pages feed.
 *   /contact         - how to reach the company: direct line, WhatsApp desk,
 *                      department email routing, hours, and both Karachi
 *                      addresses with maps.
 *
 * A ?product= on this URL is no longer rendered into a form here - it is
 * carried through to the RFQ link so an old bookmark still lands prefilled.
 */

const pageTitle = "Contact the Karachi Factory & Export Desk | DryGelWorld";
const pageDescription =
  "Reach DryGelWorld directly: Karachi factory and head-office addresses with maps, direct phone line, WhatsApp desk, department email routing, and opening hours.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: pageOpenGraph(pageTitle, pageDescription, "/contact"),
  alternates: { canonical: "/contact" },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, 120) : undefined;

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const product = first(params.product);

  const rfqHref = product
    ? `/request-a-quote?product=${encodeURIComponent(product)}`
    : "/request-a-quote";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact DryGelWorld - Karachi factory and export desk",
        description:
          "Direct phone, WhatsApp, department email routing, opening hours, and the head-office and manufacturing addresses for DryGelWorld in Karachi, Pakistan.",
        url: absoluteUrl("/contact"),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${absoluteUrl()}#website`,
          name: brandName,
          url: absoluteUrl(),
        },
        about: {
          "@type": "Organization",
          "@id": `${absoluteUrl()}#organization`,
          name: brandName,
        },
      },
      breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent rfqHref={rfqHref} />
    </>
  );
}
