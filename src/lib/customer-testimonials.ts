/**
 * Draft testimonials, written by DryGelWorld for customer approval.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * READ THIS BEFORE SETTING approved: true
 *
 * These texts were DRAFTED on the customer's behalf. The owner confirmed the
 * listed companies permit DryGelWorld to prepare testimonial copy for them.
 * Permission to *draft* is not the same as approval of *specific wording*, and
 * a quotation published under a company's name is read by every visitor as that
 * company's own words.
 *
 * So the rule this file enforces: send the draft to the named contact, get
 * written sign-off on the exact text, and only then flip `approved` to true.
 * The page renders nothing that is not approved — an unapproved entry simply
 * does not appear, so shipping this file changes nothing on the live site until
 * a real person has agreed to the words.
 *
 * If a company edits the wording, paste their version in verbatim. Their words
 * beat ours every time, and an edited quote is a stronger one because it means
 * they actually read it.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Writing guide, if more are added later: name the specific thing that mattered
 * (documentation, lead time, a size, a route), not "great service". Procurement
 * readers discount praise and trust detail. Keep each under about 40 words —
 * a real buyer writes short.
 */

export type CustomerTestimonial = {
  /** Must match `name` in customer-references.ts exactly. */
  company: string;
  /** The draft quotation. Replace with the customer's own edit if they change it. */
  quote: string;
  /** Job title of the person quoted. Fill in from the sign-off. */
  role?: string;
  /** Person's name, only once they agree to be named. */
  person?: string;
  /** false until written sign-off exists. Nothing renders while this is false. */
  approved: boolean;
  /** Date the sign-off was received, YYYY-MM-DD. For your own records. */
  approvedOn?: string;
};

export const customerTestimonials: CustomerTestimonial[] = [
  {
    company: "GSK",
    quote:
      "Documentation was the deciding factor. The SDS, COA and DMF-free statement were available before we placed the first order rather than after, which is not the norm from regional suppliers.",
    approved: false,
  },
  {
    company: "Lucky Textile Mills",
    quote:
      "We move a lot of containers on long routes and condensation damage is a real cost. Since we started hanging their strips we have not filed a moisture claim on those lanes.",
    approved: false,
  },
  {
    company: "Al Rahim Textile",
    quote:
      "Being in Karachi means samples reach us the same day and a query is answered the same hour. For our packing schedule that responsiveness matters as much as the price.",
    approved: false,
  },
  {
    company: "IC Pharma",
    quote:
      "They were straightforward about what they hold and what they do not — ISO 9001 and DMF-free, nothing overclaimed. That made our qualification process shorter, not longer.",
    approved: false,
  },
  {
    company: "Trious Pharma",
    quote:
      "No minimum order let us trial a small quantity before committing. Once the material passed our incoming check, scaling up was straightforward.",
    approved: false,
  },
  {
    company: "JSK Medica",
    quote:
      "Stock dispatches within a day, which means we can order against actual demand instead of holding desiccant inventory we may not use.",
    approved: false,
  },
];

/** Only testimonials the customer has actually signed off on. */
export const approvedTestimonials = customerTestimonials.filter((t) => t.approved);

/** Look up an approved quote for a company; undefined until sign-off. */
export function testimonialFor(company: string) {
  return approvedTestimonials.find((t) => t.company === company);
}
