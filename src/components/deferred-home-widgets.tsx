"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { IndustryData } from "@/components/industry-slider";

const fallbackStyle = {
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
  minHeight: "180px",
  textAlign: "center",
  textTransform: "uppercase",
} as const;

function WidgetFallback({ label }: { label: string }) {
  return <div style={fallbackStyle}>{label}</div>;
}

function LoadWhenVisible<P extends object>({
  label,
  loader,
  props,
}: {
  label: string;
  loader: () => Promise<ComponentType<P>>;
  props: P;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || Component) return;

    let cancelled = false;
    const load = () => {
      loader().then((LoadedComponent) => {
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
  }, [Component, loader]);

  return (
    <div ref={frameRef}>
      {Component ? <Component {...props} /> : <WidgetFallback label={label} />}
    </div>
  );
}

export function DeferredPriceCalculator() {
  return (
    <LoadWhenVisible
      label="Loading procurement calculator"
      loader={() => import("@/components/price-calculator").then((mod) => mod.PriceCalculator)}
      props={{}}
    />
  );
}

export function DeferredIndustrySlider({ industries }: { industries: IndustryData[] }) {
  return (
    <LoadWhenVisible
      label="Loading industry slider"
      loader={() => import("@/components/industry-slider").then((mod) => mod.IndustrySlider)}
      props={{ industries }}
    />
  );
}

export function DeferredMoistureCalculator() {
  return (
    <LoadWhenVisible
      label="Loading moisture calculator"
      loader={() => import("@/components/moisture-calculator").then((mod) => mod.MoistureCalculator)}
      props={{}}
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
    />
  );
}
