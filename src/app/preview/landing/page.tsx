import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPreview } from "@/components/seo-landing-preview";
import { getSeoLandingPage } from "@/lib/seo-landing-pages";

export const metadata: Metadata = {
  title: "Landing (preview) | DryGelWorld",
  robots: { index: false, follow: false },
};

const PREVIEW_SLUG = "silica-gel-manufacturer-exporter" as const;

export default function PreviewLanding() {
  const page = getSeoLandingPage(PREVIEW_SLUG);
  if (!page) notFound();
  return <SeoLandingPreview page={page} />;
}
