"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Calculator, ChevronDown, Menu, X } from "lucide-react";
import styles from "./site-header.module.css";

type NavLink = { label: string; href: string };
type NavGroup = { label: string; href?: string; children: NavLink[] };

const navGroups: NavGroup[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All products", href: "/products" },
      { label: "Paper silica gel sachets", href: "/products/paper-sachets" },
      { label: "Retail sachets", href: "/products/retail-sachets" },
      { label: "Bulk silica gel beads", href: "/products/bulk-industrial" },
      { label: "Container desiccant strips", href: "/products/container-strips" },
      { label: "Dry clay desiccant", href: "/products/dry-clay-desiccant" },
      { label: "Bouffant hair nets", href: "/products/hair-nets" },
      { label: "Beard covers", href: "/products/beard-covers" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "All industries", href: "/industries" },
      { label: "Electronics packaging", href: "/industries/electronics-packaging" },
      { label: "Pharma packaging", href: "/industries/pharma-packaging" },
      { label: "Food packaging", href: "/industries/food-packaging" },
      { label: "Leather & footwear export", href: "/industries/leather-footwear-export" },
      { label: "Textile & garment export", href: "/industries/textile-garment-export" },
      { label: "Container shipping", href: "/industries/container-shipping" },
      { label: "Automotive parts", href: "/industries/automotive-parts" },
      { label: "Defense & ammunition", href: "/industries/defense-and-ammunition-packaging" },
    ],
  },
  {
    label: "Export",
    href: "/export",
    children: [
      { label: "Export hub", href: "/export" },
      { label: "USA", href: "/export/usa" },
      { label: "United Kingdom", href: "/export/uk" },
      { label: "Germany", href: "/export/germany" },
      { label: "UAE", href: "/export/uae" },
      { label: "Saudi Arabia", href: "/export/saudi-arabia" },
      { label: "India", href: "/export/india" },
      { label: "Canada", href: "/export/canada" },
      { label: "Australia", href: "/export/australia" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Silica gel buyer guide", href: "/guides/silica-gel-buyer-guide" },
      { label: "Desiccant glossary", href: "/guides/desiccant-glossary" },
      { label: "Compare desiccants", href: "/compare" },
      { label: "Blog", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "Documents (SDS / COA)", href: "/documents" },
      { label: "Requirement calculator", href: "/tools/container-desiccant-calculator" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", href: "/about" },
      { label: "Certifications", href: "/certifications" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Private label", href: "/private-label" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const announcementStats = [
  { value: "Serving since 1983", label: "Industrial moisture control" },
  { value: "10+ million", label: "Silica gel packets supplied" },
  { value: "10,000+", label: "Happy customers supported" },
  { value: "40+", label: "Custom categories" },
  { value: "Worldwide", label: "Delivery support available" },
];

function isGroupActive(group: NavGroup, pathname: string) {
  if (group.href && pathname === group.href) return true;
  return group.children.some(
    (child) => pathname === child.href || (child.href !== "/" && pathname.startsWith(`${child.href}/`)),
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  // Menus close from each link's onClick (below). We deliberately avoid a
  // pathname effect that calls setState synchronously, which the lint rule
  // (cascading-render guard) flags.

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes the open desktop dropdown and the mobile drawer.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`${styles.headerWrap} ${isScrolled ? styles.headerWrapScrolled : ""}`}>
      <section className={styles.announcementBar} aria-label="Dry Gel World supply highlights">
        <div className={styles.announcementTrack}>
          {[...announcementStats, ...announcementStats].map((item, index) => (
            <div className={styles.announcementItem} key={`${item.value}-${index}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.navShell}>
        <div className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="Dry Gel World home">
            <Image
              src="/drygelworld-logo.svg"
              alt="Dry Gel World Professional Gel Solutions"
              width={930}
              height={245}
              className={styles.brandLogo}
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary" ref={navRef}>
            {navGroups.map((group) => {
              const open = openMenu === group.label;
              const active = isGroupActive(group, pathname);
              return (
                <div
                  className={styles.navItemWrap}
                  key={group.label}
                  onMouseEnter={() => setOpenMenu(group.label)}
                  onMouseLeave={() => setOpenMenu((current) => (current === group.label ? null : current))}
                >
                  <button
                    type="button"
                    className={`${styles.navItem} ${styles.navTrigger} ${active ? styles.navItemActive : ""}`}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setOpenMenu((current) => (current === group.label ? null : group.label))}
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      className={`${styles.triggerChevron} ${open ? styles.triggerChevronOpen : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
                    role="menu"
                    aria-label={group.label}
                  >
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        className={styles.dropdownLink}
                        onClick={() => setOpenMenu(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
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
                <strong>Requirement Calculator</strong>
              </span>
            </Link>

            <Link href="/contact" className={styles.navCta}>
              Request Quote
            </Link>

            <button
              type="button"
              className={styles.menuToggle}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X size={22} strokeWidth={2.4} /> : <Menu size={22} strokeWidth={2.4} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className={styles.mobileDrawer} aria-label="Mobile navigation">
            {navGroups.map((group) => {
              const expanded = mobileExpanded === group.label;
              return (
                <div className={styles.mobileGroup} key={group.label}>
                  <button
                    type="button"
                    className={styles.mobileGroupBtn}
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileExpanded((current) => (current === group.label ? null : group.label))
                    }
                  >
                    {group.label}
                    <ChevronDown
                      size={18}
                      className={`${styles.triggerChevron} ${expanded ? styles.triggerChevronOpen : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded ? (
                    <div className={styles.mobileSubList}>
                      {group.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileExpanded(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <Link
              href="/contact"
              className={styles.mobileDrawerCta}
              onClick={() => setMobileOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
