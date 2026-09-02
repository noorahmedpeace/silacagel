"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { IndustryData } from "@/components/industry-slider";
import type { PriceCalculatorProps } from "@/components/price-calculator";

// Base fallback styling for deferred-widget placeholders. The min-height
// is set per-widget by the caller so the placeholder matches the loaded
// widget's expected height - preventing Cumulative Layout Shift when
// the real component swaps in. This is the largest CLS source on the
// home page (Vercel Speed Insights showed CLS 0.13 on mobile before).
const baseFallbackStyle = {
  alignItems: "center",
  border: "1px solid rgba(0, 103, 197, 0.14)",
  borderRadius: "12px",
  color: "#24507d",
  display: "flex",
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  fontWeight: 800,
  justifyContent: "center",
  letterSpacing: "0.08em",
  textAlign: "center",
  textTransform: "uppercase",
  width: "100%",
} as const;

function WidgetFallback({ label, minHeight }: { label: string; minHeight: number }) {
  return <div style={{ ...baseFallbackStyle, minHeight: `${minHeight}px` }}>{label}</div>;
}

function LoadWhenVisible<P extends object>({
  label,
  loader,
  props,
  minHeight,
}: {
  label: string;
  loader: () => Promise<ComponentType<P>>;
  props: P;
  minHeight: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);

  // Held in a ref and kept OUT of the effect deps. Callers pass an inline
  // arrow, so `loader` is a new function on every render of the parent. With it
  // in the deps, any unrelated re-render tore down the effect, the cleanup set
  // cancelled = true, and an already in-flight dynamic import resolved into a
  // discarded result - leaving the widget stuck on its placeholder forever.
  // Harmless while every caller was a server component rendering once; the
  // moment a client parent re-rendered (PricingFormatPicker holding the shared
  // format state) the widget stopped loading on mobile entirely.
  // Captured once and never reassigned: every caller passes the same import,
  // only re-wrapped in a fresh arrow each render, so the first value is always
  // the right one.
  const loaderRef = useRef(loader);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || Component) return;

    let cancelled = false;
    const load = () => {
      loaderRef.current().then((LoadedComponent) => {
        if (!cancelled) {
          setComponent(() => LoadedComponent);
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      const idle = globalThis.setTimeout(load, 1200);
      return () => {
        cancelled = true;
        globalThis.clearTimeout(idle);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [Component]);

  // The wrapper holds the same min-height as the fallback so even before
  // the inner component renders, the slot in the layout is reserved.
  return (
    <div ref={frameRef} style={{ minHeight: Component ? undefined : `${minHeight}px` }}>
      {Component ? <Component {...props} /> : <WidgetFallback label={label} minHeight={minHeight} />}
    </div>
  );
}

// Per-widget min-heights match the approximate rendered height of the
// real component on mobile widths. Conservative estimates - if the real
// component renders taller, the browser handles the extra naturally; if
// shorter, the small extra whitespace is preferable to a CLS spike.
const WIDGET_MIN_HEIGHTS = {
  priceCalculator: 600,
  industrySlider: 640,
  quoteForm: 760,
  quoteFormCompact: 520,
  emblaCarousel: 360,
} as const;

// Forwarded whole rather than destructured and rebuilt: PriceCalculatorProps is
// a union that requires formatKey and onFormatChange to travel together, and
// splitting them into separate optional fields discards that guarantee.
export function DeferredPriceCalculator(props: PriceCalculatorProps = {}) {
  return (
    <LoadWhenVisible
      label="Loading procurement calculator"
      loader={() => import("@/components/price-calculator").then((mod) => mod.PriceCalculator)}
      props={props}
      minHeight={WIDGET_MIN_HEIGHTS.priceCalculator}
    />
  );
}

export function DeferredIndustrySlider({ industries }: { industries: IndustryData[] }) {
  return (
    <LoadWhenVisible
      label="Loading industry slider"
      loader={() => import("@/components/industry-slider").then((mod) => mod.IndustrySlider)}
      props={{ industries }}
      minHeight={WIDGET_MIN_HEIGHTS.industrySlider}
    />
  );
}


export function DeferredQuoteForm({
  title,
  compact,
  defaultProduct,
}: {
  title?: string;
  compact?: boolean;
  defaultProduct?: string;
}) {
  return (
    <LoadWhenVisible
      label="Loading RFQ form"
      loader={() => import("@/components/quote-form").then((mod) => mod.QuoteForm)}
      props={{ title, compact, defaultProduct }}
      minHeight={compact ? WIDGET_MIN_HEIGHTS.quoteFormCompact : WIDGET_MIN_HEIGHTS.quoteForm}
    />
  );
}

export function DeferredEmblaCarousel({
  children,
  options,
}: {
  children: ReactNode;
  options?: { align?: "start" | "center" | "end"; loop?: boolean };
}) {
  return (
    <LoadWhenVisible
      label="Loading buyer proof carousel"
      loader={() => import("@/components/embla-carousel").then((mod) => mod.EmblaCarousel)}
      props={{ children, options }}
      minHeight={WIDGET_MIN_HEIGHTS.emblaCarousel}
    />
  );
}
