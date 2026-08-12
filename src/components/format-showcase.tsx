"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCategories } from "@/lib/format-categories";
import page from "@/app/page.module.css";
import styles from "./format-showcase.module.css";

/**
 * The homepage format showcase, driven by a tab strip instead of six links that
 * each left the page.
 *
 * The bento composition is unchanged - one tall flagship card beside two
 * stacked cards - because that layout is the design, not an accident of having
 * exactly three formats. Selecting a tab promotes that category into the
 * flagship slot and rotates the next two into the column beside it. Every
 * category can therefore be the flagship, nothing is ever shown twice, and the
 * grid never changes shape, so there is no layout shift on selection.
 *
 * The tabs are buttons; the cards remain links. That split is deliberate: the
 * SEO destinations the old tabs pointed at are still reached by a real anchor
 * (the flagship CTA and both side cards), so no internal link is lost.
 */

// Only the flagship's image is worth prioritising - the other two are below it
// on mobile and beside it on desktop, and all three are small product shots.
const VISIBLE = 3;

export function FormatShowcase() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Set once the user actually picks a tab. Without it the rail would scroll
  // itself into view on first paint, yanking the page on mobile.
  const interacted = useRef(false);
  const baseId = useId();

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  const select = useCallback((i: number) => {
    interacted.current = true;
    setActive(((i % formatCategories.length) + formatCategories.length) % formatCategories.length);
  }, []);

  // WAI-ARIA tabs pattern: arrows move AND activate, Home/End jump to the ends.
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const last = formatCategories.length - 1;
      const next =
        event.key === "ArrowRight"
          ? active + 1
          : event.key === "ArrowLeft"
            ? active - 1
            : event.key === "Home"
              ? 0
              : last;
      const clamped = ((next % formatCategories.length) + formatCategories.length) % formatCategories.length;
      select(clamped);
      tabRefs.current[clamped]?.focus();
    },
    [active, select],
  );

  // Keep the chosen tab on screen when the rail scrolls horizontally on a phone.
  useEffect(() => {
    if (!interacted.current) return;
    const rail = railRef.current;
    const tab = tabRefs.current[active];
    if (!rail || !tab) return;
    if (rail.scrollWidth <= rail.clientWidth) return;
    const left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, left),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [active]);

  // Flagship first, then the next two in order, wrapping. Same three slots
  // every time, so the grid geometry never moves.
  const shown = Array.from(
    { length: VISIBLE },
    (_, offset) => formatCategories[(active + offset) % formatCategories.length],
  );

  return (
    <>
      <div
        className={page.formatGrid}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
      >
        {shown.map((item, slot) => (
          <Link
            // Keyed by slug AND slot so React swaps the contents rather than
            // reusing a node, which is what lets the enter animation replay.
            key={`${item.href}-${slot}`}
            href={item.href}
            className={`${page.formatCard} ${styles.card}`}
          >
            <span className={page.formatMedia}>
              <Image
                src={item.image}
                alt={item.imageAlt}
                title={`${item.title} visual`}
                fill
                className={`${page.formatImage} ${styles.media}`}
                sizes="(max-width: 900px) 100vw, 30vw"
                priority={slot === 0 && active === 0}
              />
              <span className={page.formatStat}>{item.badge}</span>
            </span>
            <span className={page.formatBody}>
              <span className={page.formatLabel}>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <span className={page.formatReveal}>
                <span className={page.formatRevealInner}>
                  <p>{item.description}</p>
                  <span className={page.formatLink}>
                    {slot === 0 ? item.cta : "Explore"}
                    <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div
        ref={railRef}
        className={`${page.categoryRail} ${styles.rail}`}
        role="tablist"
        aria-label="Product formats"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        {formatCategories.map((item, i) => (
          <button
            key={item.category}
            ref={(node) => {
              tabRefs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={tabId(i)}
            aria-selected={i === active}
            aria-controls={panelId}
            // Roving tabindex: one stop for the whole strip, arrows move within.
            tabIndex={i === active ? 0 : -1}
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => select(i)}
          >
            {item.category}
          </button>
        ))}
      </div>
    </>
  );
}
