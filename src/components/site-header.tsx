"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Apple,
  Award,
  BadgeCheck,
  BookOpen,
  Boxes,
  Building2,
  Calculator,
  Car,
  CircleDollarSign,
  ChevronDown,
  Container,
  Cpu,
  Factory,
  FileText,
  Footprints,
  Globe,
  HardHat,
  Home,
  Info,
  Layers,
  Library,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Package,
  Pill,
  Scale,
  Shield,
  Ship,
  ShoppingBag,
  Shirt,
  Tag,
  Target,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { CartBadge } from "./cart-badge";
import styles from "./site-header.module.css";

type NavLink = { label: string; href: string; icon: LucideIcon; desc?: string };
type NavGroup = { label: string; icon: LucideIcon; accent: string; href?: string; children: NavLink[] };

const navGroups: NavGroup[] = [
  {
    label: "Products",
    icon: Boxes,
    accent: "#0067c5",
    href: "/products",
    children: [
      { label: "All products", href: "/products", icon: Boxes, desc: "Full silica gel & desiccant range" },
      { label: "Paper sachets", href: "/products/paper-sachets", icon: Package, desc: "Breathable B2B default sachets" },
      { label: "Retail sachets", href: "/products/retail-sachets", icon: ShoppingBag, desc: "Printed consumer-ready packets" },
      { label: "Bulk silica gel (by kg)", href: "/products/bulk-industrial", icon: Layers, desc: "By kg, drums & jumbo bags" },
      { label: "Cargo container strips", href: "/products/container-strips", icon: Container, desc: "1-5 kg cargo hanging strips" },
      { label: "Dry clay desiccant", href: "/products/dry-clay-desiccant", icon: Shield, desc: "Cost-tier container moisture control" },
      { label: "Bouffant hair nets", href: "/products/hair-nets", icon: HardHat, desc: "Food & factory PPE hair nets" },
      { label: "Beard covers", href: "/products/beard-covers", icon: HardHat, desc: "Disposable PPE beard covers" },
    ],
  },
  {
    label: "Industries",
    icon: Factory,
    accent: "#0d9488",
    href: "/industries",
    children: [
      { label: "All industries", href: "/industries", icon: Factory, desc: "Desiccants by application" },
      { label: "Electronics", href: "/industries/electronics-packaging", icon: Cpu, desc: "PCBs, devices, MSL components" },
      { label: "Pharma", href: "/industries/pharma-packaging", icon: Pill, desc: "Bottles, blisters, secondary packs" },
      { label: "Food packaging", href: "/industries/food-packaging", icon: Apple, desc: "Dry goods & food cartons" },
      { label: "Leather & footwear", href: "/industries/leather-footwear-export", icon: Footprints, desc: "Mould risk on long hauls" },
      { label: "Textile & garment", href: "/industries/textile-garment-export", icon: Shirt, desc: "Mildew & dye-migration control" },
      { label: "Container shipping", href: "/industries/container-shipping", icon: Ship, desc: "Container rain & condensation" },
      { label: "Automotive parts", href: "/industries/automotive-parts", icon: Car, desc: "Rust on exported metal parts" },
      { label: "Defense & ammunition", href: "/industries/defense-and-ammunition-packaging", icon: Target, desc: "Corrosion control to MIL/DIN spec" },
    ],
  },
  {
    label: "Export",
    icon: Globe,
    accent: "#16a34a",
    href: "/export",
    children: [
      { label: "Export hub", href: "/export", icon: Globe, desc: "Incoterms, MOQ & markets" },
      { label: "USA", href: "/export/usa", icon: MapPin },
      { label: "United Kingdom", href: "/export/uk", icon: MapPin },
      { label: "Germany", href: "/export/germany", icon: MapPin },
      { label: "UAE", href: "/export/uae", icon: MapPin },
      { label: "Saudi Arabia", href: "/export/saudi-arabia", icon: MapPin },
      { label: "India", href: "/export/india", icon: MapPin },
      { label: "Canada", href: "/export/canada", icon: MapPin },
      { label: "Australia", href: "/export/australia", icon: MapPin },
    ],
  },
  {
    label: "Resources",
    icon: BookOpen,
    accent: "#7c3aed",
    children: [
      { label: "Indicative pricing", href: "/pricing", icon: CircleDollarSign, desc: "USD ranges, MOQ & Incoterms" },
      { label: "All buyer resources", href: "/guides", icon: BookOpen, desc: "Guides, glossary, comparisons & tools" },
      { label: "Silica gel buyer guide", href: "/guides/silica-gel-buyer-guide", icon: BookOpen, desc: "Definitive procurement reference" },
      { label: "Desiccant glossary", href: "/guides/desiccant-glossary", icon: Library, desc: "Desiccant terms A-Z" },
      { label: "Compare desiccants", href: "/compare", icon: Scale, desc: "Silica gel vs other desiccants" },
      { label: "Blog", href: "/blog", icon: Newspaper, desc: "Buyer guides & how-tos" },
      { label: "Videos", href: "/videos", icon: Video, desc: "Product & manufacturer footage" },
      { label: "Documents", href: "/documentation", icon: FileText, desc: "SDS, COA, DMF-free statement" },
      { label: "All calculators & tools", href: "/tools", icon: Calculator, desc: "Every sizing tool in one place" },
      { label: "Requirement calculator", href: "/tools/container-desiccant-calculator", icon: Calculator, desc: "Size desiccant per container" },
      { label: "Moisture load calculator", href: "/tools/moisture-load-calculator", icon: Calculator, desc: "Grams needed by carton L x W x H" },
    ],
  },
  {
    label: "Company",
    icon: Building2,
    accent: "#d97706",
    children: [
      { label: "About", href: "/about", icon: Info, desc: "Since 1983, Karachi manufacturer" },
      { label: "Certifications", href: "/certifications", icon: BadgeCheck, desc: "ISO 9001:2015 & documents" },
      { label: "Case studies", href: "/case-studies", icon: Award, desc: "Real export references" },
      { label: "Private label", href: "/private-label", icon: Tag, desc: "OEM sachet branding" },
      { label: "Contact", href: "/contact", icon: Mail, desc: "Talk to the export desk" },
    ],
  },
];

function tint(accent: string, amount: number) {
  return `color-mix(in srgb, ${accent} ${amount}%, white)`;
}

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

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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

  const homeActive = pathname === "/";

  return (
    <header className={`${styles.headerWrap} ${isScrolled ? styles.headerWrapScrolled : ""}`}>
      <div className={styles.navShell}>
        <div className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="Dry Gel World home">
            <Image
              src="/drygelworld-logo.svg"
              alt="Dry Gel World Professional Gel Solutions"
              width={930}
              height={245}
              className={styles.brandLogo}
              priority
              fetchPriority="high"
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <Link
              href="/"
              className={`${styles.navItem} ${styles.navTrigger} ${homeActive ? styles.navItemActive : ""}`}
            >
              <Home size={16} strokeWidth={2.2} className={styles.triggerIcon} aria-hidden="true" />
              Home
            </Link>

            {navGroups.map((group, index) => {
              const open = openMenu === group.label;
              const active = isGroupActive(group, pathname);
              const GroupIcon = group.icon;
              const alignRight = index >= navGroups.length - 2;
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
                    style={active ? { color: group.accent } : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setOpenMenu((current) => (current === group.label ? null : group.label))}
                  >
                    <GroupIcon
                      size={16}
                      strokeWidth={2.2}
                      className={styles.triggerIcon}
                      style={{ color: group.accent }}
                      aria-hidden="true"
                    />
                    {group.label}
                    <ChevronDown
                      size={13}
                      className={`${styles.triggerChevron} ${open ? styles.triggerChevronOpen : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""} ${alignRight ? styles.dropdownRight : ""}`}
                    role="menu"
                    aria-label={group.label}
                    style={{ borderTopColor: group.accent }}
                  >
                    <div className={styles.dropdownHead}>
                      <span
                        className={styles.dropdownHeadIcon}
                        style={{ color: group.accent, background: tint(group.accent, 14) }}
                      >
                        <GroupIcon size={15} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      {group.label}
                    </div>
                    <div className={styles.dropdownGrid}>
                      {group.children.map((child) => {
                        const ItemIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={styles.dropdownCard}
                            onClick={() => setOpenMenu(null)}
                          >
                            <span
                              className={styles.cardIcon}
                              style={{ color: group.accent, background: tint(group.accent, 12) }}
                            >
                              <ItemIcon size={18} strokeWidth={2} aria-hidden="true" />
                            </span>
                            <span className={styles.cardText}>
                              <span className={styles.cardTitle}>{child.label}</span>
                              {child.desc ? <span className={styles.cardDesc}>{child.desc}</span> : null}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
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

            <CartBadge />

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
            <Link href="/" className={styles.mobileHome} onClick={() => setMobileOpen(false)}>
              <Home size={18} strokeWidth={2.2} aria-hidden="true" />
              Home
            </Link>

            {navGroups.map((group) => {
              const expanded = mobileExpanded === group.label;
              const GroupIcon = group.icon;
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
                    <span className={styles.mobileGroupLabel}>
                      <span
                        className={styles.dropdownHeadIcon}
                        style={{ color: group.accent, background: tint(group.accent, 14) }}
                      >
                        <GroupIcon size={15} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      {group.label}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`${styles.triggerChevron} ${expanded ? styles.triggerChevronOpen : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded ? (
                    <div className={styles.mobileCardList}>
                      {group.children.map((child) => {
                        const ItemIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={styles.dropdownCard}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileExpanded(null);
                            }}
                          >
                            <span
                              className={styles.cardIcon}
                              style={{ color: group.accent, background: tint(group.accent, 12) }}
                            >
                              <ItemIcon size={18} strokeWidth={2} aria-hidden="true" />
                            </span>
                            <span className={styles.cardText}>
                              <span className={styles.cardTitle}>{child.label}</span>
                              {child.desc ? <span className={styles.cardDesc}>{child.desc}</span> : null}
                            </span>
                          </Link>
                        );
                      })}
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
