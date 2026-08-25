import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("silica-gel-bags-0-5kg");

export const metadata = landingPageMetadata("silica-gel-bags-0-5kg");

export default function SilicaGelBags05KgPage() {
  return <SeoLandingPage page={page} />;
}
