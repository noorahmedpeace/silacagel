"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./blog-hero-slider.module.css";
import type { SeoImage } from "@/lib/seo-images";

interface BlogHeroSliderProps {
  heroImage: SeoImage;
}

export function BlogHeroSlider({ heroImage }: BlogHeroSliderProps) {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  const hasSecondary = Boolean(heroImage.secondary);

  const toggleSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className={styles.sliderWrapper}>
      <figure className={styles.sliderContainer}>
        {/* Slide 0: Clean Real Photography */}
        <div
          className={`${styles.slide} ${
            activeSlide === 0 ? styles.slideActive : styles.slideHidden
          }`}
          aria-hidden={activeSlide !== 0}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            title={heroImage.title}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 920px"
            priority
          />
        </div>

        {/* Slide 1: Technical Diagram / Original Indexed Image */}
        {hasSecondary && heroImage.secondary && (
          <div
            className={`${styles.slide} ${
              activeSlide === 1 ? styles.slideActive : styles.slideHidden
            }`}
            aria-hidden={activeSlide !== 1}
          >
            <Image
              src={heroImage.secondary.src}
              alt={heroImage.secondary.alt}
              title={heroImage.secondary.title}
              fill
              className={styles.image}
              sizes="(max-width: 900px) 100vw, 920px"
              loading="lazy"
            />
          </div>
        )}

        {/* Floating Mode Badge (Top-Right) */}
        {hasSecondary && (
          <div className={styles.modeBadge}>
            {activeSlide === 0 ? "Product Photo" : "Technical Diagram"}
          </div>
        )}

        {/* Arrow Navigation (Shown only if 2 slides) */}
        {hasSecondary && (
          <>
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.arrowLeft}`}
              onClick={toggleSlide}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.arrowRight}`}
              onClick={toggleSlide}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Pill Switcher Controls (Bottom-Center) */}
        {hasSecondary && (
          <div className={styles.controlsBar} role="tablist" aria-label="Visual view switcher">
            <button
              type="button"
              role="tab"
              aria-selected={activeSlide === 0}
              className={`${styles.tabBtn} ${activeSlide === 0 ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveSlide(0)}
            >
              <Camera size={14} />
              <span>Real Photo</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSlide === 1}
              className={`${styles.tabBtn} ${activeSlide === 1 ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveSlide(1)}
            >
              <Layers size={14} />
              <span>Technical Diagram</span>
            </button>
          </div>
        )}
      </figure>
    </div>
  );
}
