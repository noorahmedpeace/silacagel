import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
  title: "SilacaGEL | Industrial Moisture-Control Solutions Portal",
  description:
    "SilacaGEL helps procurement and packaging teams source silica gel products, technical documentation, and desiccant-planning tools for electronics, pharma, food, and industrial supply chains.",
  keywords: [
    "silica gel manufacturer",
    "industrial moisture control",
    "technical data sheet silica gel",
    "desiccant calculator",
    "pharma grade silica gel",
    "container strip desiccants",
    "cobalt-free silica gel",
  ],
  openGraph: {
    title: "SilacaGEL | Corporate Portal for Industrial Moisture Control",
    description:
      "A solution-led portal for silica gel products, industry applications, RFQs, compliance documents, and desiccant-planning tools.",
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
    title: "SilacaGEL | Industrial Moisture-Control Solutions Portal",
    description:
      "Source silica gel products, technical library access, RFQs, and engineering tools from a corporate solution portal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
