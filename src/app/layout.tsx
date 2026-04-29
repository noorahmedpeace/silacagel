import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Montserrat } from "next/font/google";
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
  metadataBase: new URL("https://silacagel.vercel.app"),
  title: "SilacaGEL | Premium Silica Gel Desiccants Delivered Worldwide",
  description:
    "Premium silica gel desiccant sachets, bulk packs, cargo strips, SDS/COA support, and worldwide delivery for industrial packaging and export procurement teams.",
  keywords: [
    "silica gel manufacturer",
    "bulk desiccant packets",
    "pharma grade silica gel",
    "food grade desiccant",
    "silaca gel", // Typo variant
    "desiccant bags manufacturer",
    "moisture control for export",
    "silica gel delivered worldwide",
    "ISO 9001 silica gel supplier",
  ],
  openGraph: {
    title: "SilacaGEL | Premium Silica Gel Delivered Worldwide",
    description:
      "Industrial desiccant supply for packaging, logistics, warehouse stock, and export shipments with SDS, COA, and compliance documentation available on request.",
    url: "https://silacagel.vercel.app",
    siteName: "SilacaGEL",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "SilacaGEL | Global Silica Gel Desiccant Supplier",
    description:
      "Export-ready moisture protection for cartons, bulk packaging, and container cargo.",
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SilacaGEL",
              url: "https://silacagel.vercel.app",
              description:
                "Premium silica gel desiccant supplier for industrial packaging, logistics, warehousing, and export procurement.",
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
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
