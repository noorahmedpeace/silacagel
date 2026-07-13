import Link from "next/link";
import { Factory, Globe2, ShieldCheck } from "lucide-react";
import {
  companyAddressFull,
  contactEmailChannels,
  createMailtoHref,
  displayPhone,
  mainEmail,
  phoneHref,
  whatsappNumber,
} from "@/lib/product-data";
import styles from "./site-footer.module.css";
import { SocialLinks } from "./social-links";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Silica gel (overview)", href: "/silica-gel" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
      { label: "White silica gel", href: "/white-silica-gel" },
      { label: "Indicating silica gel", href: "/indicating-silica-gel" },
      { label: "Non-indicating silica gel", href: "/non-indicating-silica-gel" },
      { label: "Food grade silica gel", href: "/food-grade-silica-gel-supplier" },
      { label: "Blue silica gel", href: "/blue-silica-gel-manufacturer" },
      { label: "Orange silica gel", href: "/orange-silica-gel-supplier" },
      { label: "Silica gel beads", href: "/silica-gel-beads" },
    ],
    viewAll: { label: "View all products", href: "/products" },
  },
  {
    title: "Desiccant Range",
    links: [
      { label: "Bentonite clay desiccant", href: "/clay-desiccant-supplier" },
      { label: "Desiccant manufacturer", href: "/desiccant-manufacturer" },
      { label: "Industrial desiccant supplier", href: "/industrial-desiccant-supplier" },
      { label: "Desiccant bags supplier", href: "/desiccant-bags-supplier" },
      { label: "Moisture absorber supplier", href: "/moisture-absorber-supplier" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
      { label: "Shipping container desiccant", href: "/shipping-container-desiccant-supplier" },
      { label: "Container desiccant supplier", href: "/container-desiccant-supplier" },
      { label: "Container moisture control", href: "/shipping-container-moisture-control" },
      { label: "Dry clay exporter Europe", href: "/dry-clay-exporter-europe" },
    ],
    viewAll: { label: "View all formats", href: "/products" },
  },
  {
    title: "Export Markets",
    links: [
      { label: "UAE silica gel supplier", href: "/export/uae" },
      { label: "Saudi Arabia supplier", href: "/export/saudi-arabia" },
      { label: "Qatar supplier", href: "/export/qatar" },
      { label: "USA export", href: "/export/usa" },
      { label: "UK supplier", href: "/export/uk" },
      { label: "Germany supplier", href: "/export/germany" },
      { label: "India supplier", href: "/export/india" },
      { label: "Silica gel supplier UK", href: "/silica-gel-supplier-uk" },
      { label: "Silica gel supplier Karachi", href: "/silica-gel-supplier-karachi" },
    ],
    viewAll: { label: "All export markets", href: "/export" },
  },
  {
    title: "Industries",
    links: [
      { label: "Pharmaceutical desiccant", href: "/pharmaceutical-desiccant" },
      { label: "Electronic packaging desiccant", href: "/electronic-packaging-desiccant" },
      { label: "Electronics packaging", href: "/industries/electronics-packaging" },
      { label: "Pharma packaging", href: "/industries/pharma-packaging" },
      { label: "Leather and footwear export", href: "/industries/leather-footwear-export" },
      { label: "Food packaging", href: "/industries/food-packaging" },
      { label: "Packaging desiccant", href: "/packaging-desiccant-manufacturer" },
      { label: "Case studies", href: "/case-studies" },
    ],
    viewAll: { label: "All industries", href: "/industries" },
  },
  {
    title: "Resources",
    links: [
      { label: "Request a sample", href: "/samples" },
      { label: "Indicative pricing", href: "/pricing" },
      { label: "All buyer resources", href: "/guides" },
      { label: "All calculators & tools", href: "/tools" },
      { label: "Container dosage calculator", href: "/tools/container-desiccant-calculator" },
      { label: "Moisture load calculator", href: "/tools/moisture-load-calculator" },
      { label: "Silica gel buyer guide", href: "/guides/silica-gel-buyer-guide" },
      { label: "Desiccant comparisons", href: "/compare" },
      { label: "Documents (SDS, COA)", href: "/documentation" },
      { label: "How silica gel works", href: "/blog/what-is-silica-gel-and-how-does-it-work" },
      { label: "Export carton moisture guide", href: "/blog/how-to-prevent-moisture-in-export-cartons" },
      { label: "SDS and COA guide", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
      { label: "Technical FAQ", href: "/faq" },
      { label: "Media kit", href: "/media-kit" },
    ],
    viewAll: { label: "Visit the buyer blog", href: "/blog" },
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Certifications", href: "/certifications" },
      { label: "DryGelWorld official site", href: "/drygelworld" },
      { label: "Silica gel manufacturer", href: "/silica-gel-manufacturer" },
      { label: "Silica gel supplier", href: "/silica-gel-supplier" },
      { label: "Export markets", href: "/export" },
      { label: "Manufacturer in Pakistan", href: "/silica-gel-manufacturer-pakistan" },
      { label: "OEM silica gel", href: "/oem-silica-gel-manufacturer" },
      { label: "Private label packets", href: "/private-label-desiccant-packets" },
      { label: "Private label program", href: "/private-label" },
      { label: "Bulk & wholesale sales", href: "/bulk-sales" },
    ],
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: "ISO 9001:2015 certified" },
  { icon: Factory, label: "Manufacturing since 1983" },
  { icon: Globe2, label: "Exporting to 190+ countries" },
];

export function SiteFooter() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I'm requesting a Dry Gel World silica gel export quote. Please advise MOQ, lead time, documentation, and shipping terms.",
  );

  return (
    <footer className={styles.footer} aria-label="Dry Gel World footer navigation">
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <span className={styles.kicker}>Global buyer navigation</span>
          <h2>Find the right silica gel supply path.</h2>
          <p>
            Compare product formats, export support, private-label options, and technical
            documentation, or go straight to the industry guide that matches your business.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/contact">Request Export Quote</Link>
            <Link className={styles.secondary} href="/products">View Products</Link>
            <a className={styles.whatsapp} href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <SocialLinks label="Follow DryGelWorld" />
        </div>

        <div className={styles.emailDesk}>
          <span className={styles.emailDeskLabel}>Email us directly</span>
          <a
            className={styles.mainEmailRoute}
            href={createMailtoHref(mainEmail, "DryGelWorld primary inquiry")}
            rel="nofollow"
          >
            <span>Main email</span>
            <strong>{mainEmail}</strong>
            <small>Primary owner inbox for important business, partnerships, and direct follow-up.</small>
          </a>
          <div className={styles.emailDirectory} aria-label="Department email directory">
            {contactEmailChannels.map((channel) => (
              <a
                className={styles.emailRoute}
                href={createMailtoHref(channel.email, channel.defaultSubject)}
                key={channel.id}
                rel="nofollow"
              >
                <span>{channel.shortLabel}</span>
                <strong>{channel.email}</strong>
                <small>{channel.purpose}</small>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.linkGrid}>
        {footerColumns.map((column) => (
          <nav aria-label={`${column.title} footer links`} className={styles.column} key={column.title}>
            <h3>{column.title}</h3>
            <ul className={styles.linkList}>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              {column.viewAll ? (
                <li>
                  <Link className={styles.viewAll} href={column.viewAll.href}>
                    {column.viewAll.label} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.trustRow}>
        {trustBadges.map((badge) => (
          <span className={styles.trustBadge} key={badge.label}>
            <badge.icon aria-hidden="true" size={15} strokeWidth={1.8} />
            {badge.label}
          </span>
        ))}
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>© 2026 DryGelWorld. All rights reserved.</span>
        <div className={styles.bottomMeta}>
          {/* No human-facing /sitemap.xml link: it renders as raw XML (poor UX)
              and Google already discovers it via robots.txt (see robots.ts). */}
          <address>{companyAddressFull}</address>
          <a href={`tel:${phoneHref}`}>{displayPhone}</a>
        </div>
      </div>
    </footer>
  );
}
