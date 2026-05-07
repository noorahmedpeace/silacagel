import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("orange-silica-gel-supplier");

export const metadata = landingPageMetadata("orange-silica-gel-supplier");

export default function OrangeSilicaGelSupplierPage() {
  return <SeoLandingPage page={page} />;
}
