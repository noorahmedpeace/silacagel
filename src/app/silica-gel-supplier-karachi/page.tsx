import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("silica-gel-supplier-karachi");

export const metadata = landingPageMetadata("silica-gel-supplier-karachi");

export default function SilicaGelSupplierKarachiPage() {
  return <SeoLandingPage page={page} />;
}
