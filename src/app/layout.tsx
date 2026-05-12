import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// GA4 measurement ID. Override via NEXT_PUBLIC_GA_ID in Vercel env if regenerated.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-BJS67Z0D0D";
import { MoistureCalcFloat } from "@/components/moisture-calc-float";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { phoneHref, salesEmail, serviceArea } from "@/lib/product-data";
import { absoluteUrl, brandDomain, brandName, googleSiteVerification, siteName, siteUrl } from "@/lib/seo";
import "./design-tokens.css";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drygelworld.com"),
  applicationName: brandName,
  title: "Silica Gel Manufacturer & Exporter | DryGelWorld",
  description:
    "DryGelWorld is a silica gel manufacturer, supplier, and exporter providing industrial desiccants, container desiccants, packaging desiccants, and moisture absorber solutions worldwide.",
  keywords: [
    "DryGelWorld",
    "silica gel manufacturer",
    "silica gel supplier",
    "silica gel exporter",
    "desiccant manufacturer",
    "industrial desiccant exporter",
    "container desiccant",
    "cargo desiccant supplier",
    "moisture absorber supplier",
    "silica gel packets bulk",
    "desiccant bags manufacturer",
    "private label desiccant packets",
    "food grade silica gel",
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
    <html lang="en" className={body.variable}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-macro-kraft-mobile.webp"
          media="(max-width: 760px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-macro-kraft.webp"
          media="(min-width: 761px)"
          fetchPriority="high"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <MoistureCalcFloat />
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
        <Script id="ga4-idle-loader" strategy="afterInteractive">
          {`
            (function () {
              var measurementId = ${JSON.stringify(GA_ID)};
              var loadAnalytics = function () {
                if (window.__drygelGaLoaded) return;
                window.__drygelGaLoaded = true;
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
                window.gtag('js', new Date());
                window.gtag('config', measurementId, { anonymize_ip: true });
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
                document.head.appendChild(script);
              };
              var scheduleAnalytics = function () {
                window.setTimeout(function () {
                  if ('requestIdleCallback' in window) {
                    window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
                  } else {
                    loadAnalytics();
                  }
                }, 8000);
              };
              if (document.readyState === 'complete') {
                scheduleAnalytics();
              } else {
                window.addEventListener('load', scheduleAnalytics, { once: true });
              }
            })();
          `}
        </Script>
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
                  legalName: "Kamran Enterprises",
                  alternateName: [siteName, "DryGelWorld.com", brandDomain],
                  url: absoluteUrl(),
                  logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/favicon-192x192.png"),
                    width: 192,
                    height: 192,
                  },
                  image: absoluteUrl("/dry-gel-world-banner.jpg"),
                  description:
                    "DryGelWorld is a silica gel desiccant manufacturer-exporter and industrial PPE supplier based in Karachi, Pakistan. Operating company Kamran Enterprises has manufactured silica gel sachets since 1983 and expanded into dry clay desiccant, bouffant hair nets, and beard covers for international B2B buyers.",
                  foundingDate: "1983",
                  founder: {
                    "@type": "Person",
                    name: "Kamran, Waseem & Sons",
                  },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "1 St. 13, North Karachi Industrial Area Sector 6 B",
                    addressLocality: "New Karachi Town",
                    addressRegion: "Karachi",
                    postalCode: "75950",
                    addressCountry: "PK",
                  },
                  contactPoint: salesContactPoint,
                  areaServed: [
                    "Worldwide",
                    "United Arab Emirates",
                    "Saudi Arabia",
                    "Qatar",
                    "United States",
                    "United Kingdom",
                    "Germany",
                    "Canada",
                    "Australia",
                    "European Union",
                    "Pakistan",
                  ],
                  knowsAbout: [
                    "Silica gel desiccant manufacturing",
                    "Industrial moisture control",
                    "Container desiccant for ocean freight",
                    "Dry clay desiccant",
                    "Bouffant hair nets",
                    "Disposable beard covers",
                    "Private-label desiccant sachets",
                    "Export packaging protection",
                    "Pharmaceutical packaging desiccants",
                    "Electronics packaging moisture control",
                    "Food packaging desiccants",
                    "Leather and footwear export protection",
                  ],
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    name: "ISO 9001:2015",
                    credentialCategory: "Quality Management System Certification",
                  },
                  slogan: "Industrial silica gel desiccants for global moisture protection",
                  sameAs: [
                    "https://silicagelpk.com",
                    "https://www.linkedin.com/in/drygelworld/",
                  ],
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
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
