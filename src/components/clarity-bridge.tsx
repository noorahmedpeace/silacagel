"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ClarityCommand =
  | ["set", string, string | string[]]
  | ["event", string]
  | ["upgrade", string]
  | ["consentv2", { ad_Storage: "granted" | "denied"; analytics_Storage: "granted" | "denied" }];

declare global {
  interface Window {
    clarity?: (...args: ClarityCommand) => void;
    __drygelClarityQueue?: ClarityCommand[];
  }
}

function clarityCall(...command: ClarityCommand) {
  if (typeof window.clarity === "function") {
    window.clarity(...command);
    return;
  }
  window.__drygelClarityQueue = window.__drygelClarityQueue || [];
  window.__drygelClarityQueue.push(command);
}

function pageGroup(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/products")) return "products";
  if (pathname.startsWith("/industries")) return "industries";
  if (pathname.startsWith("/export")) return "export";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/pricing") || pathname.startsWith("/bulk-sales")) return "commercial";
  if (pathname.startsWith("/tools")) return "calculator";
  return pathname.split("/").filter(Boolean)[0] || "other";
}

export function ClarityBridge() {
  const pathname = usePathname();

  useEffect(() => {
    clarityCall("set", "page_path", pathname);
    clarityCall("set", "page_group", pageGroup(pathname));
    clarityCall("event", "page_view");
  }, [pathname]);

  useEffect(() => {
    const promoActivated = () => {
      clarityCall("set", "flash10_status", "active");
      clarityCall("event", "flash10_unlocked");
      clarityCall("upgrade", "FLASH10 purchase intent");
    };
    const formSubmitted = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const context = [
        form.id,
        form.getAttribute("name"),
        form.getAttribute("action"),
        form.getAttribute("aria-label"),
        form.textContent?.slice(0, 500),
      ]
        .filter(Boolean)
        .join(" ");
      if (!/quote|rfq|contact|calculator|bulk|inquiry|procurement/i.test(context)) return;

      clarityCall("set", "buyer_intent", "rfq_submit");
      clarityCall("event", "rfq_form_submit");
      clarityCall("upgrade", "RFQ form submission");
    };

    window.addEventListener("drygel:promo-activated", promoActivated);
    document.addEventListener("submit", formSubmitted, true);
    return () => {
      window.removeEventListener("drygel:promo-activated", promoActivated);
      document.removeEventListener("submit", formSubmitted, true);
    };
  }, []);

  return null;
}
