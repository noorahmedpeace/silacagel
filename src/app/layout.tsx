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
  title: "SilacaGEL | Premium Silica Gel Manufacturer Pakistan & India",
  description:
    "Industrial leader in desiccant manufacturing. Factory-direct pharma-grade silica gel, bulk desiccant packets, and cargo container strips. US FDA & ISO 9001 compliant moisture control solutions.",
  keywords: [
    "silica gel manufacturer",
    "bulk desiccant packets",
    "pharma grade silica gel",
    "food grade desiccant",
    "silica gel pakistan",
    "silica gel india",
    "silaca gel", // Typo variant
    "desiccant bags manufacturer",
    "moisture control for export",
  ],
  openGraph: {
    title: "SilacaGEL | Zero-Fail Moisture Protection for Global Industrial Chains",
    description:
      "Factory-direct industrial desiccant supply. FDA & ISO certified protection for pharmaceutical, textile, and electronic exports.",
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
    title: "SilacaGEL | Industrial Silica Gel Leader",
    description:
      "Elite moisture protection for world-class cargo. FDA & ISO 9001 certified desiccant manufacturing.",
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
