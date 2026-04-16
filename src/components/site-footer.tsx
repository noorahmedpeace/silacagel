import Link from "next/link";
import { displayPhone } from "@/lib/products";
import styles from "./site-footer.module.css";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Industry Solutions" },
  { href: "/technical-library", label: "Technical Library" },
  { href: "/tools", label: "Interactive Tools" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.kicker}>SilacaGEL</span>
          <h2>Built for procurement teams who need moisture control, documentation, and clarity in one place.</h2>
          <p>
            Phase 1 turns the site into a corporate solution portal with product taxonomy,
            technical-library access, RFQ capture, and engineering tools for packaging decisions.
          </p>
        </div>

        <div className={styles.columns}>
          <div>
            <h3>Portal</h3>
            <div className={styles.linkGroup}>
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>Procurement</h3>
            <div className={styles.linkGroup}>
              <a href={`tel:${displayPhone}`}>{displayPhone}</a>
              <span>Hybrid RFQ plus WhatsApp support</span>
              <span>Document packs on request</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
