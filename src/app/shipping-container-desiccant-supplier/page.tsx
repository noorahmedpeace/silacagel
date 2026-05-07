import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("shipping-container-desiccant-supplier");

export const metadata = landingPageMetadata("shipping-container-desiccant-supplier");

export default function ShippingContainerDesiccantSupplierPage() {
  return <SeoLandingPage page={page} />;
}
