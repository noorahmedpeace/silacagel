"use client";

import { usePathname } from "next/navigation";
import { whatsappNumber } from "@/lib/product-data";
import styles from "./floating-whatsapp.module.css";

/**
 * Site-wide WhatsApp affordance.
 *
 * Measured on the live site, 10 August: WhatsApp links existed on every top
 * landing page, but nine of ten had none in the first screen and NO page
 * carried a persistent one - while Clarity puts average mobile scroll depth at
 * 26%. So most mobile buyers never saw a way to make contact at all. A UAE
 * buyer spent 46 minutes reading the SDS and COA and left without one.
 *
 * Bottom-LEFT on purpose: DryBot's launcher owns bottom-right (z-index 61) and
 * the sticky quote bar owns bottom-centre on the homepage and product pages
 * (z-index 58). This sits below both at 57 so it can never cover the
 * assistant, and it is small enough not to obscure content behind it.
 *
 * The message carries the page the buyer was on, because "hello" from an
 * unknown page is a worse lead than "hello, I was looking at bulk silica gel".
 */

// Pages where a second contact float would be noise rather than help: the
// contact page IS the contact path, and the quote pages are mid-form.
const SUPPRESSED = new Set(["/contact", "/request-a-quote", "/samples"]);

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (!pathname || SUPPRESSED.has(pathname)) return null;

  const context = pathname === "/" ? "your homepage" : `drygelworld.com${pathname}`;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello DryGelWorld, I have a question about ${context}.`,
  )}`;

  return (
    <a
      className={styles.button}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Picked up by the delegated click listener in layout.tsx, so this
      // reports through the same whatsapp_click event as every other one.
      data-analytics="whatsapp_click"
      aria-label="Message DryGelWorld on WhatsApp"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.47-.01c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
