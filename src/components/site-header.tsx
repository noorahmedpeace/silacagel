"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./site-header.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Industry Solutions" },
  { href: "/technical-library", label: "Technical Library" },
  { href: "/tools", label: "Interactive Tools" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}>SiO2</span>
          <span className={styles.brandText}>
            <strong>SilacaGEL</strong>
            <span>Industrial moisture-control portal</span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.cta} onClick={() => setOpen(false)}>
            Start RFQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
