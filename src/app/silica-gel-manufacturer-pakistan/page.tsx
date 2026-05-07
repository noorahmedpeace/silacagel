import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("silica-gel-manufacturer-pakistan");

export const metadata = landingPageMetadata("silica-gel-manufacturer-pakistan");

export default function SilicaGelManufacturerPakistanPage() {
  return <SeoLandingPage page={page} />;
}
