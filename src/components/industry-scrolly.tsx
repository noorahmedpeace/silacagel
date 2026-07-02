"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./industry-scrolly.module.css";

export type ScrollyIndustry = {
  name: string;
  overline: string;
  description: string;
  image: string;
};

/**
 * Sticky scrollytelling for the homepage Industries section.
 *
 * Desktop (>=1000px): left column is a position:sticky image stage; the five
 * text blocks on the right scroll past it. An IntersectionObserver
 * ({ threshold: 0.6, rootMargin: "0px 0px -30% 0px" }) marks the active block;
 * its image slides in from the bottom when scrolling down and from the top
 * when scrolling up (transform 0.6s cubic-bezier(0.65,0,0.35,1)), layered by
 * z-index with the previous image removed after ~600ms. Plain React +
 * IntersectionObserver + CSS - no animation libraries.
 *
 * Mobile (<1000px): the effect is disabled entirely - the industries render
 * as normal stacked cards (image on top, text below) and the observer is
 * never attached. prefers-reduced-motion swaps the slide for a cross-fade.
 */
export function IndustryScrolly({ industries }: { industries: ScrollyIndustry[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"down" | "up">("down");
  const lastRef = useRef(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // <1000px: no sticky stage, no observer - plain stacked cards.
    if (!window.matchMedia("(min-width: 1000px)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index) || index === lastRef.current) continue;
          setDir(index > lastRef.current ? "down" : "up");
          lastRef.current = index;
          setActive(index);
        }
      },
      { threshold: 0.6, rootMargin: "0px 0px -30% 0px" },
    );

    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.scrolly} ${styles[`tint${active}`] ?? ""} ${
        dir === "down" ? styles.dirDown : styles.dirUp
      }`}
    >
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.stageInner}>
          {industries.map((industry, i) => (
            <div
              key={industry.name}
              className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
            >
              <Image
                src={industry.image}
                alt=""
                fill
                className={styles.slideImage}
                sizes="(max-width: 999px) 100vw, 44vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blocks}>
        {industries.map((industry, i) => (
          <div
            key={industry.name}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            data-index={i}
            className={`${styles.block} ${i === active ? styles.blockActive : ""}`}
          >
            <span className={styles.mobileMedia}>
              <Image
                src={industry.image}
                alt={`${industry.name} moisture protection`}
                fill
                className={styles.mobileImage}
                sizes="(max-width: 999px) 100vw, 44vw"
              />
            </span>
            <span className={styles.overline}>{industry.overline}</span>
            <h3>{industry.name}</h3>
            <p>{industry.description}</p>
            <Link href="/contact" className={styles.quoteBtn}>
              Request Quote
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
