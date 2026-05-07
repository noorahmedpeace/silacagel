import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("blue-silica-gel-manufacturer");

export const metadata = landingPageMetadata("blue-silica-gel-manufacturer");

export default function BlueSilicaGelManufacturerPage() {
  return <SeoLandingPage page={page} />;
}
