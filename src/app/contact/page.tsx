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

export default function ContactPage() {
  return <ContactContent />;
}
