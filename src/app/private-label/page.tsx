import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("private-label");

export const metadata = landingPageMetadata("private-label");

export default function PrivateLabelPage() {
  return <SeoLandingPage page={page} />;
}
