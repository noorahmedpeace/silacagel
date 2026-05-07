import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("bulk-silica-gel-desiccant");

export const metadata = landingPageMetadata("bulk-silica-gel-desiccant");

export default function BulkSilicaGelDesiccantPage() {
  return <SeoLandingPage page={page} />;
}
