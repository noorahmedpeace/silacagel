import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo-landing-page";
import {
  getSeoLandingPage,
  highIntentSeoLandingSlugs,
  isSeoLandingSlug,
  landingPageMetadata,
} from "@/lib/seo-landing-pages";

type SeoSlugPageProps = {
  params: Promise<{
    seoSlug: string;
  }>;
};

export function generateStaticParams() {
  return highIntentSeoLandingSlugs.map((seoSlug) => ({ seoSlug }));
}

export async function generateMetadata({ params }: SeoSlugPageProps): Promise<Metadata> {
  const { seoSlug } = await params;

  if (!isSeoLandingSlug(seoSlug)) {
    return {};
  }

  return landingPageMetadata(seoSlug);
}

export default async function DynamicSeoLandingPage({ params }: SeoSlugPageProps) {
  const { seoSlug } = await params;

  if (!isSeoLandingSlug(seoSlug)) {
    notFound();
  }

  return <SeoLandingPage page={getSeoLandingPage(seoSlug)} />;
}
