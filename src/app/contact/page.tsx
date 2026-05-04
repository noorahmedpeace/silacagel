import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Request Silica Gel Quote | Bulk Desiccant Export RFQ",
  description:
    "Send a structured export RFQ for silica gel packets, bulk desiccant, private-label sachets, SDS, COA, MOQ, Incoterms, and worldwide delivery planning.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
