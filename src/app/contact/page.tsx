import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Request Silica Gel Quote | DryGelWorld RFQ",
  description:
    "Send an export RFQ for silica gel packets, bulk beads, container desiccants, private-label sachets, SDS, COA, MOQ, and Incoterms.",
  alternates: {
    canonical: "/contact",
  },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, 120) : undefined;

// The container calculator links here with its computed plan
// (?product=…&qty=…&container=…&route=…&days=…) so the RFQ form opens
// pre-filled instead of dropping the highest-intent context on the floor.
export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const product = first(params.product);
  const qty = first(params.qty);
  const container = first(params.container);
  const route = first(params.route);
  const days = first(params.days);

  const message =
    qty && container
      ? `Dosage plan from the container calculator: ${qty} kg of container desiccant for a ${container} container${route ? `, ${route} route` : ""}${days ? `, ~${days} day transit` : ""}. Please quote this plan.`
      : undefined;

  return (
    <ContactContent
      prefill={{
        product,
        quantity: qty ? `${qty} kg` : undefined,
        message,
      }}
    />
  );
}
