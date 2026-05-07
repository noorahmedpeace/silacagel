import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("private-label-desiccant-packets");

export const metadata = landingPageMetadata("private-label-desiccant-packets");

export default function PrivateLabelDesiccantPacketsPage() {
  return <SeoLandingPage page={page} />;
}
