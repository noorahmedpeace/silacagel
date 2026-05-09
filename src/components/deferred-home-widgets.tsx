"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
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
  textTransform: "uppercase",
} as const;

function WidgetFallback({ label }: { label: string }) {
  return <div style={fallbackStyle}>{label}</div>;
}

export const DeferredPriceCalculator = dynamic(
  () => import("@/components/price-calculator").then((mod) => mod.PriceCalculator),
  {
    ssr: false,
    loading: () => <WidgetFallback label="Loading procurement calculator" />,
  },
);

export const DeferredIndustrySlider = dynamic<{ industries: IndustryData[] }>(
  () => import("@/components/industry-slider").then((mod) => mod.IndustrySlider),
  {
    ssr: false,
    loading: () => <WidgetFallback label="Loading industry slider" />,
  },
);

export const DeferredMoistureCalculator = dynamic(
  () => import("@/components/moisture-calculator").then((mod) => mod.MoistureCalculator),
  {
    ssr: false,
    loading: () => <WidgetFallback label="Loading moisture calculator" />,
  },
);

export const DeferredQuoteForm = dynamic<{
  title?: string;
  compact?: boolean;
  defaultProduct?: string;
}>(
  () => import("@/components/quote-form").then((mod) => mod.QuoteForm),
  {
    ssr: false,
    loading: () => <WidgetFallback label="Loading RFQ form" />,
  },
);

export const DeferredEmblaCarousel = dynamic<{
  children: ReactNode;
  options?: { align?: "start" | "center" | "end"; loop?: boolean };
}>(
  () => import("@/components/embla-carousel").then((mod) => mod.EmblaCarousel),
  {
    ssr: false,
    loading: () => <WidgetFallback label="Loading buyer proof carousel" />,
  },
);
