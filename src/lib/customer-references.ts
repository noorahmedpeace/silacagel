export type CustomerReference = {
  name: string;
  initials: string;
  logo?: string;
  industry: string;
  href: string;
};

export const customerReferences: CustomerReference[] = [
  { name: "GSK", initials: "GSK", logo: "/customer-logos/gsk.png", industry: "Pharma & biopharma", href: "https://www.gsk.com/en-gb/" },
  { name: "Trious Pharma", initials: "TP", logo: "/customer-logos/trious.svg", industry: "Pharmaceutical supply", href: "https://www.triouspharma.com/" },
  { name: "Al Rahim Textile", initials: "AR", logo: "/customer-logos/al-rahim.png", industry: "Textile manufacturing", href: "https://www.alrahimtextile.com/" },
  { name: "Lucky Textile Mills", initials: "LTM", logo: "/customer-logos/lucky.ico", industry: "Textile export packaging", href: "https://luckytextilemills.biz/" },
  { name: "JSK Medica", initials: "JM", industry: "Medical & pharma supply", href: "https://jskmedica.com/" },
  { name: "IC Pharma", initials: "ICP", logo: "/customer-logos/ic-pharma.png", industry: "Pharmaceutical supply", href: "https://www.icpharma.be/en/" },
  { name: "Intex Pakistan", initials: "IP", logo: "/customer-logos/intex.png", industry: "Industrial supply", href: "https://intexinpakistan.com/" },
];
