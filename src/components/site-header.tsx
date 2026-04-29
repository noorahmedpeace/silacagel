"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./site-header.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Science", href: "/#science" },
  { label: "Industries", href: "/#industries" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
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
          <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.brandLogo}>
            <text x="0" y="30" fontFamily="var(--font-display), system-ui, sans-serif" fontSize="28" fontWeight="900" fill="currentColor" letterSpacing="-0.03em">
              Silaca<tspan className={styles.brandAccent}>GEL</tspan>
            </text>
            <circle cx="140" cy="10" r="3.5" fill="currentColor" opacity="0.7" />
            <circle cx="152" cy="10" r="2" fill="currentColor" opacity="0.45" />
            <circle cx="161" cy="10" r="1" fill="currentColor" opacity="0.25" />
          </svg>
          <span>Premium Silica Gel, Delivered Worldwide</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} className={styles.navItem} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.navCta}>
          Get a Quote
          <ChevronDown size={14} className={styles.navCtaIcon} />
        </Link>
      </div>
    </header>
  );
}
