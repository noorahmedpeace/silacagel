"use client";

import { Children, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import styles from "./embla-carousel.module.css";

type EmblaCarouselProps = {
  children: ReactNode;
  options?: EmblaOptionsType;
};

export function EmblaCarousel({ children, options }: EmblaCarouselProps) {
  const slides = Children.toArray(children);
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {slides.map((child, index) => (
          <div className={styles.embla__slide} key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
