"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./site-header.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Export", href: "/export" },
  { label: "Private Label", href: "/private-label" },
  { label: "Industries", href: "/industries/electronics-packaging" },
  { label: "Documents", href: "/documents" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <header className={styles.headerWrap}>
      <div className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <Link className={styles.brand} href="/" aria-label="SilacaGEL home">
          <span className={styles.brandMark} aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="38" height="38" rx="9" fill="#0E1620" />
              <path d="M4 28C13 21 25 19 34 21.5V31C23.5 28.5 14 30 4 35V28Z" fill="#0067C5" />
              <circle cx="26.5" cy="9.5" r="4.6" fill="#DCEEFF" />
              <circle cx="31.5" cy="14.5" r="3.2" fill="#7DB7F2" />
              <circle cx="31.5" cy="6.5" r="2.1" fill="#D80D2A" />
              <path d="M8 27H23" stroke="#D80D2A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>
              Silaca<span>GEL</span>
            </span>
            <span className={styles.brandTag}>Industrial Desiccant Exporter</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} className={styles.navItem} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.navCta}>
          Request Quote
          <ChevronDown size={14} className={styles.navCtaIcon} />
        </Link>
      </div>
    </header>
  );
}
