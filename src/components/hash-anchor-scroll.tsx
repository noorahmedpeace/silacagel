"use client";

import { useEffect } from "react";

const MOBILE_QUERY = "(max-width: 760px)";
const SCROLL_RETRIES = [90, 220, 420];

function getHeaderOffset() {
  const header = document.querySelector("body > header") ?? document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const extraOffset = window.matchMedia(MOBILE_QUERY).matches ? 12 : 16;

  return headerHeight + extraOffset;
}

function scrollToHash(hash: string, behavior: ScrollBehavior = "auto", attempt = 0) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);

  if (!target) {
    if (attempt < 8) {
      window.setTimeout(() => scrollToHash(hash, behavior, attempt + 1), 120);
    }
    return;
  }

  const alignTarget = (scrollBehavior: ScrollBehavior) => {
    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: scrollBehavior,
    });
  };

  alignTarget(behavior);
  SCROLL_RETRIES.forEach((delay) => {
    window.setTimeout(() => alignTarget("auto"), delay);
  });
}

export function HashAnchorScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleHashClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      const isSamePage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;

      if (!isSamePage || !url.hash) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToHash(url.hash, prefersReducedMotion.matches ? "auto" : "smooth");
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      }
    };

    document.addEventListener("click", handleHashClick);
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      window.setTimeout(() => scrollToHash(window.location.hash), 0);
    }

    return () => {
      document.removeEventListener("click", handleHashClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
