import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, landingPageMetadata } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("container-desiccant-strips");

export const metadata = landingPageMetadata("container-desiccant-strips");

export default function ContainerDesiccantStripsPage() {
  return <SeoLandingPage page={page} />;
}
