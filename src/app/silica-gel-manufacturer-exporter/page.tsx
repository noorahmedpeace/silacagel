import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("silica-gel-manufacturer-exporter");

export const metadata = landingPageMetadata("silica-gel-manufacturer-exporter");

export default function SilicaGelManufacturerExporterPage() {
  return <SeoLandingPage page={page} />;
}
