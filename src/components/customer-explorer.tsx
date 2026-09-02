"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { customerReferences, type CustomerReference } from "@/lib/customer-references";
import styles from "./customer-explorer.module.css";

/*
 * Filterable, searchable customer directory. Tap a card to open its detail.
 *
 * On what a detail panel shows: this list stores a company's name, industry,
 * logo and official website — nothing else. There are no phone numbers or email
 * addresses for these companies and inventing them would publish fake contact
 * details for real businesses, so the panel shows what is actually known: the
 * sector, what DryGelWorld supplies into it, and a link to the company's own
 * site where a buyer can find real contact details themselves.
 *
 * The card is a button rather than a link. Making the whole card navigate away
 * would mean a buyer scanning the list keeps landing on third-party sites; the
 * outbound link lives inside the opened panel, where it is a deliberate choice.
 */

const SECTORS = [
  { id: "all", label: "All" },
  { id: "pharma", label: "Pharma & Nutraceutical" },
  { id: "textile", label: "Textile, Apparel & Leather" },
  { id: "food", label: "Food & Rice Export" },
  { id: "medical", label: "Medical & Healthcare" },
  { id: "industrial", label: "Industrial & Other" },
] as const;

type SectorId = (typeof SECTORS)[number]["id"];

const SUPPLY_DETAIL: Record<Exclude<SectorId, "all">, string> = {
  pharma: "Silica gel sachets and canisters for tablet, capsule and blister packaging, supplied DMF-free with SDS, TDS and COA.",
  textile: "Container desiccant strips and sachets for garment, fabric and leather export cartons, to control condensation on long sea routes.",
  food: "Container desiccant strips and bulk desiccant for rice, spice and dried-food export cargo, where moisture causes caking and mould claims.",
  medical: "Silica gel sachets for medical device, instrument and healthcare packaging, where humidity causes corrosion or degrades sterile packs.",
  industrial: "Bulk silica gel beads, sachets and container desiccants for industrial packing, warehousing and general export cargo.",
};

function sectorFor(industry: string): Exclude<SectorId, "all"> {
  const i = industry.toLowerCase();
  if (i.includes("medical") || i.includes("healthcare")) return "medical";
  if (i.includes("pharma") || i.includes("nutraceutical") || i.includes("biopharma")) return "pharma";
  if (i.includes("textile") || i.includes("apparel") || i.includes("spinning") || i.includes("leather")) return "textile";
  if (i.includes("rice") || i.includes("food")) return "food";
  return "industrial";
}

/** Logo files too small to render cleanly at the card's mark size. */
const LOW_RES_LOGOS = new Set(["/customer-logos/intex.png"]);

export function CustomerExplorer() {
  const [sector, setSector] = useState<SectorId>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: customerReferences.length };
    for (const customer of customerReferences) {
      const s = sectorFor(customer.industry);
      c[s] = (c[s] ?? 0) + 1;
    }
    return c;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customerReferences.filter((c) => {
      if (sector !== "all" && sectorFor(c.industry) !== sector) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
    });
  }, [sector, query]);

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        {/* Tabs are filters, so they are buttons in a tablist, not links. A
            sector with no companies is not rendered at all rather than shown
            as an empty tab a buyer can click into and find nothing — which is
            what `counts` is still for, now that the number is no longer shown
            on the pill itself. */}
        <div className={styles.tabs} role="tablist" aria-label="Filter customers by sector">
          {SECTORS.filter((s) => (counts[s.id] ?? 0) > 0).map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={sector === s.id}
              className={`${styles.tab}${sector === s.id ? ` ${styles.tabOn}` : ""}`}
              onClick={() => {
                setSector(s.id);
                setOpen(null);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <label className={styles.srOnly} htmlFor="customer-search">
            Search customers by name or industry
          </label>
          <Search className={styles.searchIcon} size={16} strokeWidth={2.2} aria-hidden="true" />
          <input
            id="customer-search"
            type="text"
            className={styles.search}
            placeholder="Search a company or industry…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(null);
            }}
          />
          {/* type="text" not "search": the native search clear button is
              unstyleable, differs per browser, and sits where this one does.
              One control, same in every browser, and labelled for screen
              readers instead of relying on a browser-supplied glyph. */}
          {query ? (
            <button
              type="button"
              className={styles.clear}
              onClick={() => {
                setQuery("");
                setOpen(null);
              }}
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Visually hidden, not removed. A sighted user sees the grid shrink when
          they filter, so the count is redundant to them — but a screen reader
          user typing in the search box gets no feedback at all without a live
          region, and would not know whether the query matched anything. */}
      <p className={styles.srOnly} role="status">
        {visible.length === customerReferences.length
          ? `${visible.length} companies`
          : `${visible.length} of ${customerReferences.length} companies`}
      </p>

      {visible.length === 0 ? (
        <p className={styles.empty}>
          No company matches “{query}”. Clear the search to see all{" "}
          {customerReferences.length}.
        </p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((customer) => (
            <Card
              key={customer.name}
              customer={customer}
              open={open === customer.name}
              onToggle={() => setOpen(open === customer.name ? null : customer.name)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function Card({
  customer,
  open,
  onToggle,
}: {
  customer: CustomerReference;
  open: boolean;
  onToggle: () => void;
}) {
  const showLogo = customer.logo && !LOW_RES_LOGOS.has(customer.logo);
  const panelId = `customer-panel-${customer.name.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <li className={`${styles.card}${open ? ` ${styles.cardOpen}` : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={styles.mark} aria-hidden="true">
          {showLogo ? (
            <Image src={customer.logo as string} alt="" width={46} height={30} />
          ) : (
            customer.initials
          )}
        </span>
        <span className={styles.name}>{customer.name}</span>
        <span className={styles.industry}>{customer.industry}</span>
      </button>

      <div className={styles.panel} id={panelId} hidden={!open}>
        <p className={styles.supply}>{SUPPLY_DETAIL[sectorFor(customer.industry)]}</p>
        {customer.href ? (
          <a
            className={styles.site}
            href={customer.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open {customer.name} official site
          </a>
        ) : (
          /* Stated plainly rather than left blank. Five of these companies have
             no official site we could confirm, and a buyer who opens the panel
             expecting a link deserves to know why there isn't one. */
          <p className={styles.noSite}>
            No official website confirmed for this company.
          </p>
        )}
      </div>
    </li>
  );
}
