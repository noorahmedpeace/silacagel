import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drygelworld.com"),
  title: "Dry Gel World | Industrial Silica Gel & Desiccant Export Supplier",
  description:
    "Factory-direct silica gel desiccant packets, bulk packs, cargo strips, private-label sachets, SDS/COA support, and worldwide export delivery for industrial packaging buyers.",
  keywords: [
    "silica gel manufacturer",
    "silica gel manufacturer exporter",
    "bulk desiccant supplier",
    "bulk desiccant packets",
    "silica gel packets",
    "non indicating silica gel",
    "indicating silica gel",
    "container desiccant strips",
    "private label desiccant packets",
    "pharma grade silica gel",
    "food grade desiccant",
    "silica gel",
    "desiccant bags manufacturer",
    "moisture control for export",
    "silica gel delivered worldwide",
    "ISO 9001 silica gel supplier",
  ],
  openGraph: {
    title: "Dry Gel World | Global Silica Gel Manufacturer Exporter",
    description:
      "Industrial desiccant supply for packaging, logistics, warehouse stock, private-label sachets, and export shipments with SDS, COA, and compliance documentation available on request.",
    url: "https://www.drygelworld.com",
    siteName: "Dry Gel World",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dry Gel World industrial silica gel desiccant export supply",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "DF-Lv79GdccoyRnUPdGDn3Lgp521O_gBJ-ejnmtCDBk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dry Gel World | Silica Gel Manufacturer Exporter",
    description:
      "Export-ready moisture protection for cartons, bulk packaging, private label packets, and container cargo.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Dry Gel World",
                  alternateName: ["Dry Gel World", "Silica Gel Export Supply"],
                  url: "https://www.drygelworld.com",
                  description:
                    "Silica gel desiccant manufacturer and exporter for industrial packaging, logistics, warehousing, private-label sachets, and bulk procurement.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+923330223337",
                    contactType: "sales",
                    areaServed: "Worldwide",
                    availableLanguage: ["en"],
                  },
                  makesOffer: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Product",
                        name: "Silica gel desiccant sachets",
                        category: "Industrial desiccants",
                        material: "Silicon dioxide",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Product",
                        name: "Silica gel cargo strips",
                        category: "Export moisture control",
                        material: "Silicon dioxide",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Product",
                        name: "Private label desiccant packets",
                        category: "OEM packaging",
                        material: "Silicon dioxide",
                      },
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Dry Gel World",
                  url: "https://www.drygelworld.com",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://www.drygelworld.com/products?query={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Can Dry Gel World provide SDS and COA documents?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "SDS and COA support is available on request and should be confirmed against the exact product format and destination market.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Does Dry Gel World support private-label desiccant packets?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Private-label sachet printing, carton labeling, and distributor supply can be discussed through the RFQ form.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
