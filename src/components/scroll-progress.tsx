import styles from "./scroll-progress.module.css";

/**
 * Fixed, GPU-composited reading-progress indicator anchored to the top edge.
 * Server component - the animation is expressed entirely in CSS via the
 * scroll-timeline API, so it ships no JavaScript.
 */
export function ScrollProgress() {
  return <div className={styles.bar} aria-hidden="true" />;
}
