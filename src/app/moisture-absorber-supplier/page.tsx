import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("moisture-absorber-supplier");

export const metadata = landingPageMetadata("moisture-absorber-supplier");

export default function MoistureAbsorberSupplierPage() {
  return <SeoLandingPage page={page} />;
}
