import type { Metadata } from "next";
import { Suspense } from "react";
import { absoluteUrl, brandName, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { ContactContent, ContactContentFromQuery } from "./contact-content";

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

// Static page. Reading searchParams here made every visit a fresh server
// render (x-vercel-cache MISS, TTFB 0.8-1.7 s against 0.4 s for cached pages);
// the optional ?product= is now read in the browser by ContactContentFromQuery,
// and the prerendered fallback is the same page with the plain quote link.
export default function ContactPage() {
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
      <Suspense fallback={<ContactContent rfqHref="/request-a-quote" />}>
        <ContactContentFromQuery />
      </Suspense>
    </>
  );
}
