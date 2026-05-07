import Link from "next/link";
import { displayPhone, phoneHref, whatsappNumber } from "@/lib/product-data";
import styles from "./site-footer.module.css";

const footerGroups = [
  {
    title: "Products",
    links: [
      { label: "Silica gel packets", href: "/silica-gel-packets" },
      { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
      { label: "Product catalog", href: "/products" },
      { label: "Bulk sales calculator", href: "/bulk-sales" },
    ],
  },
  {
    title: "Export / OEM",
    links: [
      { label: "Silica gel manufacturer exporter", href: "/silica-gel-manufacturer-exporter" },
      { label: "Private label desiccant packets", href: "/private-label-desiccant-packets" },
      { label: "Export support", href: "/export" },
      { label: "Documents hub", href: "/documents" },
      { label: "Request quote", href: "/contact" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Electronics packaging", href: "/industries/electronics-packaging" },
      { label: "Pharma packaging", href: "/industries/pharma-packaging" },
      { label: "Leather and footwear export", href: "/industries/leather-footwear-export" },
      { label: "Food packaging", href: "/industries/food-packaging" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Buyer Resources",
    links: [
      { label: "DryGelWorld official site", href: "/drygelworld" },
      { label: "Technical FAQ", href: "/faq" },
      { label: "Buyer guides", href: "/blog" },
      { label: "Container rain prevention", href: "/blog/container-rain-prevention" },
      { label: "Packet sizing guide", href: "/blog/how-to-choose-silica-gel-packet-size" },
      { label: "Product videos", href: "/videos" },
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
