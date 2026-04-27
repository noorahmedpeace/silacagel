import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silacagel.vercel.app"),
  title: "SilacaGEL | Export-Ready Silica Gel Desiccant Supply",
  description:
    "Export-ready silica gel desiccant sachets, bulk packs, and cargo strips for packaging, logistics, warehousing, and industrial procurement teams.",
  keywords: [
    "silica gel manufacturer",
    "bulk desiccant packets",
    "pharma grade silica gel",
    "food grade desiccant",
    "silaca gel", // Typo variant
    "desiccant bags manufacturer",
    "moisture control for export",
  ],
  openGraph: {
    title: "SilacaGEL | Export-Ready Moisture Protection for Global Supply Chains",
    description:
      "Industrial desiccant supply for packaging, logistics, warehouse stock, and export shipments with documentation available on request.",
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
    title: "SilacaGEL | Industrial Silica Gel Desiccant Supply",
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
