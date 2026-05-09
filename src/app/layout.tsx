import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { companyCity, companyCountry, phoneHref, salesEmail, serviceArea } from "@/lib/product-data";
import { absoluteUrl, brandDomain, brandName, googleSiteVerification, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
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
    url: siteUrl,
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: googleSiteVerification,
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
  const salesContactPoint = {
    "@type": "ContactPoint",
    telephone: phoneHref,
    contactType: "sales",
    areaServed: serviceArea,
    availableLanguage: ["en"],
    ...(salesEmail ? { email: salesEmail } : {}),
  };

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
                  logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/favicon-192x192.png"),
                    width: 192,
                    height: 192,
                  },
                  image: absoluteUrl("/opengraph-image"),
                  description:
                    "DryGelWorld is a silica gel desiccant manufacturer and exporter for industrial packaging, logistics, warehousing, private-label sachets, and bulk procurement.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: companyCity,
                    addressCountry: companyCountry,
                  },
                  contactPoint: salesContactPoint,
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Industrial silica gel and desiccant supply programs",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Silica gel desiccant sachet supply",
                          serviceType: "Industrial desiccant procurement",
                          category: "Industrial desiccants",
                          material: "Silicon dioxide",
                          areaServed: "Worldwide",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Silica gel cargo strip supply",
                          serviceType: "Export moisture-control procurement",
                          category: "Container and cargo desiccants",
                          material: "Silicon dioxide",
                          areaServed: "Worldwide",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Private label desiccant packet supply",
                          serviceType: "OEM desiccant packaging",
                          category: "Private-label industrial packaging",
                          material: "Silicon dioxide",
                          areaServed: "Worldwide",
                        },
                      },
                    ],
                  },
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
