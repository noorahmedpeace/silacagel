"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Display string, e.g. "40+", "10M+", "10,000+", "190+". The numeric
   *  run is animated; any prefix/suffix is preserved verbatim. */
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
  // A bare 4-digit year (e.g. "Since 1983") should render verbatim - counting
  // up to it reads oddly and the thousands separator would mangle it ("1,983").
  const isYear = match[2].length === 4 && !match[2].includes(",") && target >= 1900 && target <= 2099;
  if (isYear) return { prefix: value, target, suffix: "", hasNumber: false };
  return { prefix: match[1], target, suffix: match[3], hasNumber: true };
}

// Deliberately dependency-free: a number counter does not justify pulling an
// animation library into the home page's initial bundle. A single rAF loop +
// IntersectionObserver (the same primitives deferred-home-widgets already uses)
// gives the identical effect at ~zero JS cost. SSR / no-JS / reduced-motion all
// keep rendering the final number, so the page is never wrong without scripts.
export function CountUp({ value, durationMs = 1600, className }: CountUpProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(parsed.target);

  useEffect(() => {
    if (!parsed.hasNumber || started.current) return;
    const node = ref.current;
    if (!node || typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let raf = 0;
    let cancelled = false;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const startTime = performance.now();
        const tick = (now: number) => {
          if (cancelled) return;
          // Clamp at 0 too: the first rAF timestamp can precede the
          // performance.now() captured above, and a negative t drives the
          // ease past zero - users saw "-1+" flash before the count started.
          const t = Math.min(1, Math.max(0, (now - startTime) / durationMs));
          setDisplay(Math.round(parsed.target * easeOutCubic(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-80px 0px" },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed.hasNumber, parsed.target, durationMs]);

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
