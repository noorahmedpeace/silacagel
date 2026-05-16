import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Request Silica Gel Quote — 24-Hour Response | DryGelWorld RFQ",
  description:
    "Send a structured export RFQ — silica gel packets, bulk beads, container desiccants, private-label sachets, SDS, COA, MOQ, Incoterms. ISO 9001 manufacturer. 24-hour quote response target.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
