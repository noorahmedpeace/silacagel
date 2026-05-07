"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calculator, ChevronDown } from "lucide-react";
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
        <Link className={styles.brand} href="/" aria-label="Dry Gel World home">
          <Image
            src="/drygelworld-logo.svg"
            alt="Dry Gel World Professional Gel Solutions"
            width={930}
            height={245}
            className={styles.brandLogo}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} className={styles.navItem} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link
            href="/#purchase-calculator"
            className={styles.calcCta}
            aria-label="Calculate silica gel requirement"
          >
            <span className={styles.calcIcon} aria-hidden="true">
              <Calculator size={17} strokeWidth={2.35} />
            </span>
            <span className={styles.calcText}>
              <span>Requirement</span>
              <strong>Calculator</strong>
            </span>
          </Link>

          <Link href="/contact" className={styles.navCta}>
            Request Quote
            <ChevronDown size={14} className={styles.navCtaIcon} />
          </Link>
        </div>
      </div>
    </header>
  );
}
