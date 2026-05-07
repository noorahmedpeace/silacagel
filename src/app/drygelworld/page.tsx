import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("drygelworld");

export const metadata = landingPageMetadata("drygelworld");

export default function DryGelWorldBrandPage() {
  return <SeoLandingPage page={page} />;
}
