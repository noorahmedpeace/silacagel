"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  /** Display string, e.g. "40+", "10M+", "10,000+", "190+". The numeric
   *  run is animated; any prefix/suffix is preserved verbatim. Values with
   *  no number (e.g. "ISO 9001:2015") render static — never pass those here. */
  value: string;
  durationMs?: number;
  className?: string;
};

type Parsed = { prefix: string; target: number; suffix: string; hasNumber: boolean };

// Pull the first integer run (allowing thousands separators) out of the label
// and keep whatever surrounds it so "10M+" animates 0→10 and re-appends "M+".
function parseValue(value: string): Parsed {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return { prefix: value, target: 0, suffix: "", hasNumber: false };
  const target = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(target)) return { prefix: value, target: 0, suffix: "", hasNumber: false };
  // A bare 4-digit year (e.g. "Since 1983") should render verbatim — counting
  // up to it reads oddly and the thousands separator would mangle it ("1,983").
  const isYear = match[2].length === 4 && !match[2].includes(",") && target >= 1900 && target <= 2099;
  if (isYear) return { prefix: value, target, suffix: "", hasNumber: false };
  return { prefix: match[1], target, suffix: match[3], hasNumber: true };
}

export function CountUp({ value, durationMs = 1600, className }: CountUpProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  const started = useRef(false);

  // SSR / no-JS / reduced-motion all render the final number, so the page is
  // never wrong without scripts. The climb-from-zero only happens once the
  // band scrolls into view on a motion-enabled client.
  const [display, setDisplay] = useState(parsed.target);

  useEffect(() => {
    if (!parsed.hasNumber || reduce || !inView || started.current) return;
    started.current = true;
    // animate() drives the first frame to ~0 itself, so there's no synchronous
    // setState here — SSR/no-JS keep rendering the final number until this runs.
    const controls = animate(0, parsed.target, {
      duration: durationMs / 1000,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, parsed.hasNumber, parsed.target, durationMs]);

  if (!parsed.hasNumber) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display.toLocaleString("en-US")}
      {parsed.suffix}
    </span>
  );
}
