import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { HashAnchorScroll } from "@/components/hash-anchor-scroll";
import { MoistureCalcFloat } from "@/components/moisture-calc-float";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  companyAddressLocality,
  companyAddressRegion,
  companyGeo,
  companyPostalCode,
  companyStreet,
  contactEmailChannels,
  googleMapsUrl,
  mainEmail,
  openingHoursClose,
  openingHoursDays,
  openingHoursOpen,
  phoneHref,
  serviceArea,
} from "@/lib/product-data";
import {
  absoluteUrl,
  brandDomain,
  brandName,
  defaultSeoImage,
  googleSiteVerification,
  siteName,
  siteUrl,
} from "@/lib/seo";
import "./design-tokens.css";
import "./globals.css";

// GA4 measurement ID. Override via NEXT_PUBLIC_GA_ID in Vercel env if regenerated.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-BJS67Z0D0D";

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
    "Silica gel desiccant manufacturer-exporter since 1983. Industrial sachets, bulk beads, container desiccants, and private-label packets with SDS and COA support.",
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
        url: defaultSeoImage,
        width: 1200,
        height: 630,
        alt: "Dry Gel World industrial silica gel desiccant export supply",
      },
    ],
    type: "website",
  },
  alternates: {
    // The home page is a single English page. It must NOT declare the
    // regional /export/[market] pages as its language alternates: those are
    // different-content pages with their own self-canonicals, so the cluster
    // was non-reciprocal and silently discarded by Google. The reciprocal
    // hreflang cluster now lives entirely on /export/[market] (see that
    // route's generateMetadata). Canonical is the slash-consistent absolute
    // URL so it byte-matches the sitemap and every JSON-LD @id.
    canonical: siteUrl,
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
    images: [defaultSeoImage],
  },
};

// Next 16 requires the viewport to be a dedicated export, separate from
// `metadata`. Without this there is no <meta name="viewport"> at all, which
// breaks mobile rendering and mobile-first ranking. Do NOT add maximum-scale
// or user-scalable=no (accessibility + Google mobile-usability penalty).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // respects iOS safe-area for the bottom floats
  themeColor: "#0067c5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactPoints = [
    {
      "@type": "ContactPoint",
      telephone: phoneHref,
      contactType: "primary business contact",
      areaServed: serviceArea,
      availableLanguage: ["en"],
      email: mainEmail,
    },
    ...contactEmailChannels.map((channel) => ({
      "@type": "ContactPoint",
      telephone: phoneHref,
      contactType: channel.schemaContactType,
      areaServed: serviceArea,
      availableLanguage: ["en"],
      email: channel.email,
    })),
  ];

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
        <HashAnchorScroll />
        {children}
        <MoistureCalcFloat />
        <WhatsAppFloat />
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
        <Script id="drygel-conversion-clicks" strategy="afterInteractive">
          {`
            (function () {
              if (window.__drygelClickTracking) return;
              window.__drygelClickTracking = true;
              window.__drygelEventQueue = window.__drygelEventQueue || [];
              window.__drygelTrackEvent = function (name, params) {
                var payload = params || {};
                if (window.__drygelGaLoaded && typeof window.gtag === 'function') {
                  window.gtag('event', name, payload);
                } else {
                  window.__drygelEventQueue.push({ name: name, params: payload });
                }
              };
              document.addEventListener('click', function (event) {
                var target = event.target && event.target.closest ? event.target.closest('a,button') : null;
                if (!target) return;
                var href = target.getAttribute('href') || '';
                var label = (target.innerText || target.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim().slice(0, 120);
                var base = { link_url: href || undefined, link_text: label || undefined };
                if (href.indexOf('mailto:') === 0) {
                  window.__drygelTrackEvent('email_click', Object.assign({}, base, { contact_method: 'email' }));
                  return;
                }
                if (href.indexOf('tel:') === 0) {
                  window.__drygelTrackEvent('phone_click', Object.assign({}, base, { contact_method: 'phone' }));
                  return;
                }
                if (href.indexOf('https://wa.me/') === 0 || href.indexOf('https://api.whatsapp.com/') === 0) {
                  window.__drygelTrackEvent('whatsapp_click', Object.assign({}, base, { contact_method: 'whatsapp' }));
                  return;
                }
                if (href === '/contact' || href.indexOf('/contact') === 0 || /quote|rfq/i.test(label)) {
                  window.__drygelTrackEvent('quote_cta_click', base);
                  return;
                }
                if (href.indexOf('#purchase-calculator') >= 0 || /calculator|requirement/i.test(label)) {
                  window.__drygelTrackEvent('calculator_click', base);
                  return;
                }
                if (href.indexOf('/documents') === 0 || /sds|coa|documents?/i.test(label)) {
                  window.__drygelTrackEvent('document_cta_click', base);
                }
              }, { passive: true });
            })();
          `}
        </Script>
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
                var queuedEvents = window.__drygelEventQueue || [];
                queuedEvents.forEach(function (item) {
                  window.gtag('event', item.name, item.params || {});
                });
                window.__drygelEventQueue = [];
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
                    "DryGelWorld is a silica gel desiccant manufacturer-exporter based in Karachi, Pakistan. Operating company Kamran Enterprises has manufactured silica gel sachets since 1983 and supplies industrial moisture-control products including silica gel packets, bulk silica gel, container desiccants, dry clay desiccants, and private-label desiccant sachets for international B2B buyers.",
                  foundingDate: "1983",
                  founder: {
                    "@type": "Person",
                    name: "Kamran, Waseem & Sons",
                  },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: companyStreet,
                    addressLocality: companyAddressLocality,
                    addressRegion: companyAddressRegion,
                    postalCode: companyPostalCode,
                    addressCountry: "PK",
                  },
                  contactPoint: contactPoints,
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
                    "Private-label desiccant sachets",
                    "Export packaging protection",
                    "Pharmaceutical packaging desiccants",
                    "Electronics packaging moisture control",
                    "Food packaging desiccants",
                    "Leather and footwear export protection",
                  ],
                  isicV4: "8292",
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    name: "ISO 9001:2015 — Packaging and Supply of Silica Desiccant",
                    credentialCategory: "Quality Management System Certification",
                    identifier: "9101225",
                    recognizedBy: {
                      "@type": "Organization",
                      name: "QMEC Group Intl",
                      url: "https://www.qmecgroup.org",
                    },
                  },
                  award: "ISO 9001:2015 certified (cert #9101225, valid to 2028)",
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
                          name: "Shipping container desiccant supply",
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
                  "@type": "LocalBusiness",
                  "@id": `${absoluteUrl()}#localbusiness`,
                  name: brandName,
                  parentOrganization: { "@id": `${absoluteUrl()}#organization` },
                  url: absoluteUrl(),
                  image: absoluteUrl(defaultSeoImage),
                  telephone: phoneHref,
                  email: mainEmail,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: companyStreet,
                    addressLocality: companyAddressLocality,
                    addressRegion: companyAddressRegion,
                    postalCode: companyPostalCode,
                    addressCountry: "PK",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: companyGeo.latitude,
                    longitude: companyGeo.longitude,
                  },
                  hasMap: googleMapsUrl,
                  areaServed: serviceArea,
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: openingHoursDays,
                    opens: openingHoursOpen,
                    closes: openingHoursClose,
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
