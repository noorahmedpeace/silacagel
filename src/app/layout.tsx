import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, brandDomain, brandName, siteName } from "@/lib/seo";
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
  applicationName: brandName,
  title: "Silica Gel Manufacturer & Exporter | DryGelWorld",
  description:
    "DryGelWorld is a silica gel manufacturer, supplier, and exporter providing industrial desiccants, container desiccants, packaging desiccants, and moisture absorber solutions worldwide.",
  keywords: [
    "DryGelWorld",
    "DryGelWorld.com",
    "drygelworld.com",
    "Dry Gel World",
    "silica gel manufacturer",
    "silica gel supplier",
    "silica gel exporter",
    "silica gel manufacturer exporter",
    "silica gel manufacturer in pakistan",
    "silica gel supplier in karachi",
    "silica gel pakistan",
    "silica gel company",
    "silica gel wholesale",
    "silica gel bulk supplier",
    "industrial silica gel",
    "desiccant manufacturer",
    "desiccant supplier",
    "bulk desiccant supplier",
    "industrial desiccant manufacturer",
    "desiccant exporter",
    "bulk desiccant packets",
    "silica gel packets",
    "silica gel packets wholesale",
    "food grade silica gel supplier",
    "blue silica gel manufacturer",
    "orange silica gel supplier",
    "non indicating silica gel",
    "indicating silica gel",
    "moisture absorber supplier",
    "moisture absorber for container",
    "container desiccant",
    "cargo desiccant",
    "packaging desiccant",
    "container desiccant strips",
    "shipping container desiccant supplier",
    "silica gel for shipping containers",
    "silica gel for export packaging",
    "private label desiccant packets",
    "pharma silica gel supplier",
    "pharma grade silica gel",
    "food grade desiccant",
    "silica gel",
    "desiccant bags manufacturer",
    "moisture control for export",
    "silica gel delivered worldwide",
    "ISO 9001 silica gel supplier",
  ],
  openGraph: {
    title: "DryGelWorld | Official Silica Gel Manufacturer Exporter",
    description:
      "Official DryGelWorld.com industrial desiccant supply for packaging, logistics, warehouse stock, private-label sachets, and export shipments with SDS, COA, and compliance documentation available on request.",
    url: "https://www.drygelworld.com",
    siteName: brandName,
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
    title: "DryGelWorld | Silica Gel Manufacturer Exporter",
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
        <SpeedInsights />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${absoluteUrl()}#organization`,
                  name: brandName,
                  legalName: siteName,
                  alternateName: [siteName, "DryGelWorld.com", brandDomain, "Silica Gel Export Supply"],
                  url: absoluteUrl(),
                  description:
                    "DryGelWorld is a silica gel desiccant manufacturer and exporter for industrial packaging, logistics, warehousing, private-label sachets, and bulk procurement.",
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
                  "@id": `${absoluteUrl()}#website`,
                  name: brandName,
                  alternateName: [siteName, "DryGelWorld.com", brandDomain],
                  url: absoluteUrl(),
                  publisher: {
                    "@id": `${absoluteUrl()}#organization`,
                  },
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
