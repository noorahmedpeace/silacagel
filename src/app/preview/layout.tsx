import type { Metadata } from "next";
import "./preview-tokens.css";

export const metadata: Metadata = {
  title: "Design Preview | DryGelWorld",
  description: "Internal mood-board for redesign review. Not a public page.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="preview-root">{children}</div>;
}
