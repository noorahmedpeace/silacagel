/**
 * Companies DryGelWorld (legal entity: Kamran Enterprises) has supplied
 * desiccant products to. Source: the company's own buyer list.
 *
 * `href` is OPTIONAL and that is deliberate. Five of these have no official
 * website we could confirm, and they previously linked to a Google search for
 * the company name. On a section that invites the reader to verify, a search
 * link is the opposite of verification - it advertises that the company could
 * not be confirmed, and it puts the entries that DO resolve under the same
 * doubt. An entry without a confirmed site now renders as plain text: the name
 * still stands, it just does not pretend to link anywhere.
 *
 * Nothing here asserts endorsement. These are supply references, not
 * testimonials, and no quantities, dates or quotes are published.
 */
export type CustomerReference = {
  name: string;
  initials: string;
  logo?: string;
  industry: string;
  /** Official company website. Omitted where no official site was confirmed. */
  href?: string;
};

export const customerReferences: CustomerReference[] = [
  { name: "GSK", initials: "GSK", logo: "/customer-logos/gsk.png", industry: "Pharma & biopharma", href: "https://www.gsk.com/en-gb/" },
  { name: "Trious Pharma", initials: "TP", logo: "/customer-logos/trious.svg", industry: "Pharmaceutical supply", href: "https://www.triouspharma.com/" },
  { name: "Al Rahim Textile", initials: "AR", logo: "/customer-logos/al-rahim.png", industry: "Textile manufacturing", href: "https://www.alrahimtextile.com/" },
  { name: "Lucky Textile Mills", initials: "LTM", logo: "/customer-logos/lucky.ico", industry: "Textile export packaging", href: "https://luckytextilemills.biz/" },
  { name: "JSK Medica", initials: "JM", industry: "Medical & pharma supply", href: "https://jskmedica.com/" },
  { name: "IC Pharma", initials: "ICP", logo: "/customer-logos/ic-pharma.png", industry: "Pharmaceutical supply", href: "https://www.icpharma.be/en/" },
  { name: "Intex Pakistan", initials: "IP", logo: "/customer-logos/intex.png", industry: "Industrial supply", href: "https://intexinpakistan.com/" },
  { name: "L.C.I. Pakistan", initials: "LCI", logo: "/customer-logos/lci.png", industry: "Leather manufacturing", href: "https://www.lci.com.pk/" },
  { name: "Barrett Hodgson Pakistan", initials: "BHP", logo: "/customer-logos/barrett-hodgson.png", industry: "Pharmaceutical manufacturing", href: "https://www.barretthodgson.com/" },
  { name: "Tabros Pharma", initials: "TBP", logo: "/customer-logos/tabros.png", industry: "Pharmaceutical manufacturing", href: "https://tabrospharma.com/" },
  { name: "Hilton Pharma", initials: "HP", logo: "/customer-logos/hilton.png", industry: "Pharmaceutical manufacturing", href: "https://hiltonpharma.com.pk/" },
  { name: "PharmEvo", initials: "PE", logo: "/customer-logos/pharmevo.png", industry: "Pharmaceutical manufacturing", href: "https://pharmevo.biz/" },
  { name: "Schazoo Zaka Pharma", initials: "SZ", logo: "/customer-logos/schazoo.png", industry: "Pharmaceutical manufacturing", href: "https://schazoo-spl.com/home" },
  { name: "Zafa Pharma", initials: "ZP", industry: "Pharmaceutical manufacturing", href: "https://zafa.com.pk/" },
  { name: "Davis Pharma", initials: "DP", logo: "/customer-logos/davis.png", industry: "Pharmaceutical manufacturing", href: "https://davispharma.com/" },
  { name: "AGP Pakistan", initials: "AGP", logo: "/customer-logos/agp.png", industry: "Pharmaceutical manufacturing", href: "https://agp.com.pk/" },
  { name: "Genetics Pharma", initials: "GP", logo: "/customer-logos/genetics.png", industry: "Pharmaceutical manufacturing", href: "https://genetics-pharmaceuticals.com/" },
  { name: "High-Q Pharma", initials: "HQ", logo: "/customer-logos/highq.png", industry: "Pharmaceutical manufacturing", href: "https://highq.pk/" },
  { name: "Hinucon Pharma", initials: "HC", logo: "/customer-logos/hinucon.png", industry: "Healthcare products", href: "https://www.hinucon.com/" },
  { name: "Neutro Pharma", initials: "NP", logo: "/customer-logos/neutro.png", industry: "Pharmaceutical & nutraceutical", href: "https://neutropharma.com/" },
  { name: "Hi Nutrition", initials: "HN", logo: "/customer-logos/hinutrition.png", industry: "Nutraceutical products", href: "https://www.hinutrition.com.pk/" },
  { name: "Vision Pharma Islamabad", initials: "VP", industry: "Pharmaceutical supply" },
  { name: "Utopia Industries", initials: "UI", logo: "/customer-logos/utopia.png", industry: "Textile and home products", href: "https://www.utopia.pk/" },
  { name: "D.L. Nash", initials: "DLN", logo: "/customer-logos/dlnash.png", industry: "Textile manufacturing", href: "https://www.dlnash.com/" },
  { name: "Matco Rice", initials: "MR", logo: "/customer-logos/matco.png", industry: "Rice and food products", href: "https://www.matcofoods.com/" },
  { name: "Irfan Numan Rice Mill", initials: "INR", logo: "/customer-logos/inbrice.png", industry: "Rice and food products", href: "https://www.inbrice.com/" },
  { name: "Premier Cables", initials: "PC", logo: "/customer-logos/premier-cables.png", industry: "Cable manufacturing", href: "https://premiercables.net/" },
  { name: "A.C.E. Sialkot", initials: "ACE", industry: "Sialkot manufacturing" },
  { name: "J.K. Spinning Mills", initials: "JK", logo: "/customer-logos/jk-group.png", industry: "Textile spinning", href: "https://jkgroup.net/" },
  { name: "Mecca Tanneries", initials: "MCT", industry: "Leather manufacturing" },
  { name: "Victoria Apparel", initials: "VA", industry: "Apparel manufacturing" },
  { name: "Mustaqim Textile", initials: "MST", industry: "Textile dyeing and printing" },
];
