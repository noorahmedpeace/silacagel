import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("silica-gel-packets");

export const metadata = landingPageMetadata("silica-gel-packets");

export default function SilicaGelPacketsPage() {
  return <SeoLandingPage page={page} />;
}
