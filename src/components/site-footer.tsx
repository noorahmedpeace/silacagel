import Link from "next/link";
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

const footerGroups = [
  {
    title: "Products",
    links: [
      { label: "Silica gel (overview)", href: "/silica-gel" },
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Packets manufacturer", href: "/silica-gel-packets-manufacturer" },
      { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
      { label: "White silica gel", href: "/white-silica-gel" },
      { label: "Non-indicating silica gel", href: "/non-indicating-silica-gel" },
      { label: "Indicating silica gel", href: "/indicating-silica-gel" },
      { label: "Food grade silica gel", href: "/food-grade-silica-gel-supplier" },
      { label: "Blue silica gel", href: "/blue-silica-gel-manufacturer" },
      { label: "Orange silica gel", href: "/orange-silica-gel-supplier" },
      { label: "Silica gel beads", href: "/silica-gel-beads" },
      { label: "Bentonite clay desiccant", href: "/bentonite-clay" },
    ],
  },
  {
    title: "Export / OEM",
    links: [
      { label: "Silica gel manufacturer", href: "/silica-gel-manufacturer" },
      { label: "Silica gel supplier", href: "/silica-gel-supplier" },
      { label: "Silica gel exporter", href: "/silica-gel-exporter" },
      { label: "Silica gel manufacturer exporter", href: "/silica-gel-manufacturer-exporter" },
      { label: "China alternative supplier", href: "/silica-gel-manufacturer-china-alternative" },
      { label: "Silica gel manufacturer Pakistan", href: "/silica-gel-manufacturer-pakistan" },
      { label: "Silica gel supplier Karachi", href: "/silica-gel-supplier-karachi" },
      { label: "OEM silica gel", href: "/oem-silica-gel-manufacturer" },
      { label: "Private label desiccant packets", href: "/private-label-desiccant-packets" },
    ],
  },
  {
    // NEW — export-country pages had NO footer link before; this surfaces the
    // export hub + priority market pages site-wide and de-orphans the
    // per-country exporter landing pages.
    title: "Export Markets",
    links: [
      { label: "Export support hub", href: "/export" },
      { label: "UAE silica gel supplier", href: "/export/uae" },
      { label: "Saudi Arabia supplier", href: "/export/saudi-arabia" },
      { label: "Qatar supplier", href: "/export/qatar" },
      { label: "USA export", href: "/export/usa" },
      { label: "UK supplier", href: "/export/uk" },
      { label: "Germany supplier", href: "/export/germany" },
      { label: "India supplier", href: "/export/india" },
      { label: "Silica gel exporter USA", href: "/silica-gel-exporter-usa" },
      { label: "Silica gel exporter Germany", href: "/silica-gel-exporter-germany" },
      { label: "Silica gel exporter Canada", href: "/silica-gel-exporter-canada" },
      { label: "Silica gel supplier UK", href: "/silica-gel-supplier-uk" },
    ],
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
      { label: "All industries", href: "/industries" },
      { label: "Packaging desiccant", href: "/packaging-desiccant-manufacturer" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Desiccant Range",
    links: [
      { label: "DryGelWorld official site", href: "/drygelworld" },
      { label: "Desiccant manufacturer", href: "/desiccant-manufacturer" },
      { label: "Industrial desiccant supplier", href: "/industrial-desiccant-supplier" },
      { label: "Desiccant bags supplier", href: "/desiccant-bags-supplier" },
      { label: "Moisture absorber supplier", href: "/moisture-absorber-supplier" },
      { label: "Shipping container desiccant", href: "/shipping-container-desiccant-supplier" },
      { label: "Container desiccant supplier", href: "/container-desiccant-supplier" },
      { label: "Container moisture control", href: "/shipping-container-moisture-control" },
      { label: "Dry clay exporter Europe", href: "/dry-clay-exporter-europe" },
      { label: "Dry clay supplier UAE", href: "/dry-clay-desiccant-supplier-uae" },
      { label: "Dry clay supplier Saudi Arabia", href: "/dry-clay-desiccant-supplier-saudi-arabia" },
    ],
  },
  {
    // NEW — knowledge/trust hub: guides, comparisons, documents, certifications.
    title: "Resources",
    links: [
      { label: "Container dosage calculator", href: "/tools/container-desiccant-calculator" },
      { label: "Silica gel buyer guide", href: "/guides/silica-gel-buyer-guide" },
      { label: "Desiccant comparisons", href: "/compare" },
      { label: "Documents (SDS, COA)", href: "/documents" },
      { label: "Certifications", href: "/certifications" },
      { label: "How silica gel works", href: "/blog/what-is-silica-gel-and-how-does-it-work" },
      { label: "Export carton moisture guide", href: "/blog/how-to-prevent-moisture-in-export-cartons" },
      { label: "SDS and COA guide", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
      { label: "Buyer blog", href: "/blog" },
      { label: "Media kit", href: "/media-kit" },
      { label: "Technical FAQ", href: "/faq" },
    ],
  },
];

const featuredLinkCounts: Record<string, number> = {
  Products: 5,
  "Export / OEM": 5,
  "Export Markets": 5,
  Industries: 5,
  "Desiccant Range": 5,
  Resources: 6,
};

export function SiteFooter() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I'm requesting a Dry Gel World silica gel export quote. Please advise MOQ, lead time, documentation, and shipping terms.",
  );

  return (
    <footer className={styles.footer} aria-label="Dry Gel World footer navigation">
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <span className={styles.kicker}>Global buyer navigation</span>
          <h2>Find the right silica gel supply path faster.</h2>
          <p>
            Use these buyer-focused pages to compare product formats, export support,
            private-label options, documents, industries, and technical guides before sending an RFQ.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/contact">Request Export Quote</Link>
            <Link className={styles.secondary} href="/products">View Products</Link>
            <a className={styles.whatsapp} href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <div className={styles.emailDesk}>
            <span className={styles.emailDeskLabel}>Official email desk</span>
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
          {footerGroups.map((group) => (
            <section className={styles.column} key={group.title}>
              <h3>{group.title}</h3>
              <nav aria-label={`${group.title} footer links`}>
                {group.links.slice(0, featuredLinkCounts[group.title]).map((link) => (
                  <Link className={styles.featuredLink} href={link.href} key={link.href}>{link.label}</Link>
                ))}
              </nav>
              {group.links.length > featuredLinkCounts[group.title] ? (
                <div className={styles.supportLinks} aria-label={`${group.title} supporting links`}>
                  {group.links.slice(featuredLinkCounts[group.title]).map((link) => (
                    <Link href={link.href} key={link.href}>{link.label}</Link>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span><strong>DryGelWorld.com</strong> official Dry Gel World website for industrial silica gel and desiccant export supply.</span>
        <address style={{ fontStyle: "normal" }}>{companyAddressFull}</address>
        <a href={`tel:${phoneHref}`}>{displayPhone}</a>
      </div>
    </footer>
  );
}
