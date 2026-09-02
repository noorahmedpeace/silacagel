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
 * flagship slot and rotates the next two into the column beside it.
 *
 * ALL SIX cards are rendered, not the three on screen, and the switch is a pure
 * opacity cross-fade between them. The first version mounted three cards and
 * swapped their contents, which looked abrupt for two compounding reasons: the
 * outgoing card vanished in a single frame because an unmount cannot animate,
 * and the incoming image had to be FETCHED at the moment of the click, so the
 * card sat on its own dark background until the download finished. Keeping
 * every card mounted removes both - nothing unmounts, and no image is ever
 * requested on selection because all six are already decoded.
 *
 * Hidden cards are stacked into the flagship's grid area rather than left to
 * flow, so they never create extra rows, and they are removed from the tab
 * order and the accessibility tree while hidden.
 *
 * The tabs are buttons; the cards remain links. That split is deliberate: the
 * SEO destinations the old tabs pointed at are still reached by a real anchor,
 * so no internal link is lost.
 */

const COUNT = formatCategories.length;

export function FormatShowcase() {
  const [active, setActive] = useState(0);
  // The slot each card held BEFORE this selection. A card that is leaving stays
  // in its old cell while it fades, instead of jumping to the parking cell the
  // instant it stops being visible. Without this the two small cards had
  // nothing to cross-fade against - the outgoing one left in a single frame and
  // the incoming one faded up from the page background, which is a flash, not a
  // cross-fade.
  const [leaving, setLeaving] = useState<number | null>(null);
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
    setActive(((i % COUNT) + COUNT) % COUNT);
  }, []);

  // WAI-ARIA tabs pattern: arrows move AND activate, Home/End jump to the ends.
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? active + 1
          : event.key === "ArrowLeft"
            ? active - 1
            : event.key === "Home"
              ? 0
              : COUNT - 1;
      const clamped = ((next % COUNT) + COUNT) % COUNT;
      setLeaving(active);
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

  // Park the leaver once its fade has run, so it stops holding a visible cell.
  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), 460);
    return () => window.clearTimeout(timer);
  }, [leaving, active]);

  /** 0 = flagship, 1 = top right, 2 = bottom right, -1 = held offstage. */
  const slotOf = (index: number, from: number) => {
    const offset = (index - from + COUNT) % COUNT;
    return offset < 3 ? offset : -1;
  };

  const onSelect = useCallback(
    (next: number) => {
      setLeaving(active);
      select(next);
    },
    [active, select],
  );

  const SLOT_CLASS = [styles.slotFlagship, styles.slotA, styles.slotB];

  return (
    <>
      <div
        className={`${page.formatGrid} ${styles.grid}`}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
      >
        {formatCategories.map((item, index) => {
          const slot = slotOf(index, active);
          const hidden = slot === -1;
          // A leaving card keeps its old cell for the length of the fade.
          const exitSlot = hidden && leaving !== null ? slotOf(index, leaving) : -1;
          const parkClass = exitSlot >= 0 ? SLOT_CLASS[exitSlot] : styles.slotPark;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${page.formatCard} ${styles.card} ${
                hidden ? `${styles.slotHidden} ${parkClass}` : SLOT_CLASS[slot]
              }`}
              // Offstage cards are not reachable by keyboard and are not
              // announced - they are a rendering device, not content.
              aria-hidden={hidden || undefined}
              tabIndex={hidden ? -1 : undefined}
            >
              <span className={page.formatMedia}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  title={`${item.title} visual`}
                  fill
                  className={page.formatImage}
                  sizes="(max-width: 900px) 100vw, 30vw"
                  // The first card is the LCP candidate and gets priority. The
                  // other five are eager rather than lazy on purpose: left
                  // lazy, the browser deferred the offstage ones and then
                  // fetched them at the moment of the click - which is exactly
                  // the pop this design removes. Six optimised webps is a
                  // cheap price for every switch being instant.
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
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
          );
        })}
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
            onClick={() => onSelect(i)}
          >
            {item.category}
          </button>
        ))}
      </div>
    </>
  );
}
