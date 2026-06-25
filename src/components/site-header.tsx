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
      { label: "Bulk silica gel", href: "/products/bulk-industrial", icon: Layers, desc: "By kg, drums & jumbo bags" },
      { label: "Container strips", href: "/products/container-strips", icon: Container, desc: "1–5 kg cargo hanging strips" },
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
      { label: "Silica gel buyer guide", href: "/guides/silica-gel-buyer-guide", icon: BookOpen, desc: "Definitive procurement reference" },
      { label: "Desiccant glossary", href: "/guides/desiccant-glossary", icon: Library, desc: "Desiccant terms A–Z" },
      { label: "Compare desiccants", href: "/compare", icon: Scale, desc: "Silica gel vs other desiccants" },
      { label: "Blog", href: "/blog", icon: Newspaper, desc: "Buyer guides & how-tos" },
      { label: "Videos", href: "/videos", icon: Video, desc: "Product & manufacturer footage" },
      { label: "Documents", href: "/documents", icon: FileText, desc: "SDS, COA, DMF-free statement" },
      { label: "Requirement calculator", href: "/tools/container-desiccant-calculator", icon: Calculator, desc: "Size desiccant per container" },
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

const announcementStats = [
  { value: "Serving since 1983", label: "Industrial moisture control" },
  { value: "10+ million", label: "Silica gel packets supplied" },
  { value: "10,000+", label: "Happy customers supported" },
  { value: "40+", label: "Custom categories" },
  { value: "Worldwide", label: "Delivery support available" },
];

const criticalHeaderCss = `
body > header[class*="headerWrap"]{position:fixed;inset:0 0 auto 0;z-index:200;width:100%;color:#101923;pointer-events:none}
body > header[class*="headerWrap"] *{box-sizing:border-box}
body > header[class*="headerWrap"] [class*="announcementBar"]{position:relative;display:flex;width:100%;min-height:38px;max-height:38px;align-items:center;overflow:hidden;background:linear-gradient(135deg,#064a91 0%,#0067c5 54%,#0b75d1 100%)}
body > header[class*="headerWrap"] [class*="announcementTrack"]{display:flex;width:max-content;min-width:max-content;align-items:center;gap:58px;padding:0 32px}
body > header[class*="headerWrap"] [class*="announcementItem"]{display:inline-flex;min-width:max-content;align-items:center;gap:10px;color:#fff}
body > header[class*="headerWrap"] [class*="announcementItem"] strong,body > header[class*="headerWrap"] [class*="announcementItem"] span{white-space:nowrap;font-size:.78rem;line-height:1.1}
body > header[class*="headerWrap"] [class*="navShell"]{position:relative;pointer-events:auto;padding:10px 16px;background:rgba(255,255,255,.82);border-bottom:1px solid rgba(0,103,197,.12);backdrop-filter:blur(16px)}
body > header[class*="headerWrap"] [class*="header"]{display:grid;width:min(1200px,calc(100% - 32px));min-height:56px;margin:0 auto;grid-template-columns:150px minmax(0,1fr) auto;align-items:center;gap:10px;padding:6px 10px 6px 14px;border:1px solid rgba(0,103,197,.14);border-radius:16px;background:rgba(255,255,255,.72)}
body > header[class*="headerWrap"] [class*="brand"]{display:inline-flex;width:150px;min-width:0;align-items:center;overflow:hidden}
body > header[class*="headerWrap"] [class*="brandLogo"]{display:block;width:132px;height:36px;max-height:36px;object-fit:contain;object-position:left center}
body > header[class*="headerWrap"] nav[class*="nav"]{display:flex;min-width:0;align-items:center;justify-content:center;gap:2px;overflow:hidden}
body > header[class*="headerWrap"] [class*="navItem"],body > header[class*="headerWrap"] [class*="navTrigger"]{display:inline-flex;min-height:36px;align-items:center;justify-content:center;gap:4px;padding:0 8px;border:0;border-radius:9px;background:transparent;color:inherit;font:inherit;font-size:.76rem;font-weight:800;line-height:1;white-space:nowrap;text-decoration:none}
body > header[class*="headerWrap"] [class*="navItemWrap"]{position:relative;display:inline-flex}
body > header[class*="headerWrap"] [class*="dropdown"]{position:absolute;top:calc(100% + 14px);left:0;z-index:50;min-width:260px;max-width:min(540px,calc(100vw - 32px));opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px)}
body > header[class*="headerWrap"] [class*="dropdownOpen"]{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}
body > header[class*="headerWrap"] [class*="headerActions"]{display:flex;justify-self:end;align-items:center;gap:8px}
body > header[class*="headerWrap"] [class*="calcCta"],body > header[class*="headerWrap"] [class*="navCta"]{display:inline-flex;min-height:40px;align-items:center;justify-content:center;border-radius:10px;text-decoration:none;white-space:nowrap}
body > header[class*="headerWrap"] [class*="calcCta"]{min-width:166px;gap:7px;padding:0 9px;background:linear-gradient(135deg,#0075d8 0%,#005aa9 53%,#063c76 100%);color:#fff;font-size:.68rem;font-weight:950;text-transform:uppercase}
body > header[class*="headerWrap"] [class*="calcText"]>span{display:none}
body > header[class*="headerWrap"] [class*="navCta"]{min-width:118px;padding:0 12px;background:#d80d2a;color:#fff;font-size:.74rem;font-weight:900}
body > header[class*="headerWrap"] [class*="menuToggle"]{display:none}
@media(max-width:1024px){body > header[class*="headerWrap"] [class*="header"]{grid-template-columns:1fr auto}body > header[class*="headerWrap"] nav[class*="nav"]{display:none}body > header[class*="headerWrap"] [class*="menuToggle"]{display:inline-flex}}
`;

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
      <style dangerouslySetInnerHTML={{ __html: criticalHeaderCss }} />
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
