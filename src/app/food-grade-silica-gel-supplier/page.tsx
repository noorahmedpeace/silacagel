import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("food-grade-silica-gel-supplier");

export const metadata = landingPageMetadata("food-grade-silica-gel-supplier");

export default function FoodGradeSilicaGelSupplierPage() {
  return <SeoLandingPage page={page} />;
}
