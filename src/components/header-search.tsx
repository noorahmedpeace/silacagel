"use client";

// Normal, always-visible header search. Tapping it opens a frosted-glass
// suggestions dropdown (popular pages first, then live-filtered results as you
// type). Press "/" anywhere to focus it. Backed by a small curated index of the
// site's real pages — a fast finder, not a full search engine.
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import styles from "./header-search.module.css";

type Entry = { label: string; href: string; group: string; keywords?: string };

const SEARCH_INDEX: Entry[] = [
  { label: "Paper sachets", href: "/products/paper-sachets", group: "Product", keywords: "breathable b2b desiccant" },
  { label: "Retail sachets", href: "/products/retail-sachets", group: "Product", keywords: "printed consumer packets" },
  { label: "Bulk silica gel (by kg)", href: "/products/bulk-industrial", group: "Product", keywords: "beads drums jumbo bags" },
  { label: "Container desiccant strips", href: "/products/container-strips", group: "Product", keywords: "cargo hanging strips shipping" },
  { label: "Calcium chloride container strips", href: "/products/calcium-chloride-container-strip", group: "Product", keywords: "high uptake cargo" },
  { label: "Calcium chloride bulk", href: "/products/calcium-chloride-container-bulk", group: "Product", keywords: "bags cargo moisture" },
  { label: "Dry clay desiccant", href: "/products/dry-clay-desiccant", group: "Product", keywords: "bentonite cost tier" },
  { label: "Nitrile gloves", href: "/products/powder-free-blue-nitrile-gloves", group: "Product", keywords: "ppe examination" },
  { label: "Hair nets & beard covers", href: "/products/hair-nets", group: "Product", keywords: "ppe bouffant" },
  { label: "All products", href: "/products", group: "Product", keywords: "range catalogue" },
  { label: "Contract packaging services", href: "/contract-packaging-services", group: "Service", keywords: "co-packing toll packing sachet filling machine" },
  { label: "Soap packing & flow wrapping", href: "/soap-packing-services", group: "Service", keywords: "soap bars bopp wrapping" },
  { label: "Flow wrap packing services", href: "/flow-wrap-packing-services", group: "Service", keywords: "pillow pack hffs" },
  { label: "Private label desiccants", href: "/private-label", group: "Service", keywords: "oem branding" },
  { label: "Container desiccant calculator", href: "/tools/container-desiccant-calculator", group: "Tool", keywords: "dosage how much sizing" },
  { label: "Moisture load calculator", href: "/tools/moisture-load-calculator", group: "Tool", keywords: "grams carton" },
  { label: "All calculators & tools", href: "/tools", group: "Tool" },
  { label: "Silica gel buyer guide", href: "/guides/silica-gel-buyer-guide", group: "Guide", keywords: "procurement reference" },
  { label: "Desiccant glossary", href: "/guides/desiccant-glossary", group: "Guide", keywords: "terms definitions" },
  { label: "Compare desiccants", href: "/compare", group: "Guide", keywords: "silica gel vs clay calcium chloride" },
  { label: "Blog", href: "/blog", group: "Guide" },
  { label: "Documentation (SDS, COA, ISO)", href: "/documentation", group: "Doc", keywords: "sds coa certificate dmf-free" },
  { label: "Certifications", href: "/certifications", group: "Doc", keywords: "iso 9001" },
  { label: "Request a sample", href: "/samples", group: "Buy", keywords: "free trial" },
  { label: "Indicative pricing", href: "/pricing", group: "Buy", keywords: "usd moq incoterms cost" },
  { label: "Request a quote", href: "/request-a-quote", group: "Buy", keywords: "rfq bulk" },
  { label: "Export markets", href: "/export", group: "Export", keywords: "usa uk uae saudi countries" },
  { label: "Industries", href: "/industries", group: "Industry", keywords: "pharma electronics food leather" },
  { label: "About DryGelWorld", href: "/about", group: "Company", keywords: "since 1983 karachi manufacturer" },
  { label: "Contact", href: "/contact", group: "Company" },
];

const POPULAR_HREFS = [
  "/request-a-quote",
  "/contract-packaging-services",
  "/products/paper-sachets",
  "/products/container-strips",
  "/tools/container-desiccant-calculator",
  "/documentation",
];

export function HeaderSearch({ variant = "bar" }: { variant?: "bar" | "block" }) {
  const router = useRouter();
  const isBar = variant === "bar";
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const term = q.trim().toLowerCase();
  const isEmpty = !term;

  const results = useMemo(() => {
    if (!term) {
      return POPULAR_HREFS.map((h) => SEARCH_INDEX.find((e) => e.href === h)).filter(
        (e): e is Entry => Boolean(e),
      );
    }
    return SEARCH_INDEX.filter((e) =>
      `${e.label} ${e.group} ${e.keywords ?? ""}`.toLowerCase().includes(term),
    ).slice(0, 7);
  }, [term]);

  // "/" anywhere focuses the search (GitHub/Stripe pattern).
  useEffect(() => {
    if (!isBar) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const el = document.activeElement;
      const typing = el instanceof HTMLElement && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (typing) return;
      e.preventDefault();
      inputRef.current?.focus();
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isBar]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQ("");
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]?.href ?? results[0].href);
    }
  }

  return (
    <div className={`${styles.wrap} ${variant === "block" ? styles.block : ""}`} ref={wrapRef}>
      <div
        className={styles.field}
        onMouseDown={(e) => {
          // Tap again while open → close it (toggle).
          if (open && isBar) {
            e.preventDefault();
            setOpen(false);
            inputRef.current?.blur();
          }
        }}
      >
        <Search size={17} strokeWidth={2.2} aria-hidden="true" className={styles.icon} />
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder={variant === "block" ? "Search products, services, docs…" : "Search…"}
          value={q}
          aria-label="Search the site"
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {isBar ? <kbd className={styles.kbd} aria-hidden="true">/</kbd> : null}
      </div>

      {open && results.length ? (
        <ul className={styles.results} role="listbox">
          {isEmpty ? <li className={styles.resultsLabel}>Popular</li> : null}
          {results.map((r, i) => (
            <li key={r.href} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={`${styles.result} ${i === active ? styles.resultActive : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
              >
                <span className={styles.resultLabel}>{r.label}</span>
                <span className={styles.resultGroup}>{r.group}</span>
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" className={styles.resultArrow} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {open && term && !results.length ? (
        <div className={styles.noResults}>No matches — try “sachet”, “soap”, “calculator”, or “SDS”.</div>
      ) : null}
    </div>
  );
}
