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
  title: "SilacaGEL | Premium Silica Gel Pakistan",
  description:
    "Premium silica gel packs, custom packing formats, PKR pricing, and factory-direct moisture control for storage, shipping, export, leather, electronics, and packaging.",
  keywords: [
    "silica gel pakistan",
    "silica gel packets",
    "desiccant bags",
    "moisture control",
    "container strip",
    "silica gel price in pakistan",
  ],
  openGraph: {
    title: "SilacaGEL | Premium Silica Gel Pakistan",
    description:
      "Factory-direct silica gel website with premium branding, PKR pricing, applications, and direct inquiry support.",
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
    title: "SilacaGEL | Premium Silica Gel Pakistan",
    description:
      "Factory-direct silica gel website with premium branding, PKR pricing, applications, and direct inquiry support.",
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
