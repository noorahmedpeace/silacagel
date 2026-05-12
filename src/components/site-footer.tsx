import Link from "next/link";
import {
  contactEmailChannels,
  createMailtoHref,
  displayPhone,
  phoneHref,
  whatsappNumber,
} from "@/lib/product-data";
import styles from "./site-footer.module.css";

const footerGroups = [
  {
    title: "Products",
    links: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Packets manufacturer", href: "/silica-gel-packets-manufacturer" },
      { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
      { label: "White silica gel", href: "/white-silica-gel" },
      { label: "Non-indicating silica gel", href: "/non-indicating-silica-gel" },
      { label: "Indicating silica gel", href: "/indicating-silica-gel" },
      { label: "Food grade silica gel", href: "/food-grade-silica-gel-supplier" },
      { label: "Blue silica gel", href: "/blue-silica-gel-manufacturer" },
      { label: "Orange silica gel", href: "/orange-silica-gel-supplier" },
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
  },
  {
    title: "Buyer Resources",
    links: [
      { label: "DryGelWorld official site", href: "/drygelworld" },
      { label: "Desiccant manufacturer", href: "/desiccant-manufacturer" },
      { label: "Industrial desiccant supplier", href: "/industrial-desiccant-supplier" },
      { label: "Desiccant bags supplier", href: "/desiccant-bags-supplier" },
      { label: "Moisture absorber supplier", href: "/moisture-absorber-supplier" },
      { label: "Shipping container desiccant", href: "/shipping-container-desiccant-supplier" },
      { label: "Container desiccant supplier", href: "/container-desiccant-supplier" },
      { label: "Container moisture control", href: "/shipping-container-moisture-control" },
      { label: "How silica gel works", href: "/blog/what-is-silica-gel-and-how-does-it-work" },
      { label: "Export carton moisture guide", href: "/blog/how-to-prevent-moisture-in-export-cartons" },
      { label: "SDS and COA guide", href: "/blog/silica-gel-sds-coa-requirements-for-buyers" },
      { label: "Technical FAQ", href: "/faq" },
    ],
  },
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
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>{link.label}</Link>
                ))}
              </nav>
            </section>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span><strong>DryGelWorld.com</strong> official Dry Gel World website for industrial silica gel and desiccant export supply.</span>
        <a href={`tel:${phoneHref}`}>{displayPhone}</a>
      </div>
    </footer>
  );
}
