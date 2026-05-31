import styles from "./animated-text.module.css";

type AnimatedTextProps = {
  as?: "h1" | "h2" | "p";
  text: string;
  className?: string;
  mode?: "rise" | "bubble";
  delay?: number;
};

export function AnimatedText({
  as = "h2",
  text,
  className,
  mode = "rise",
}: AnimatedTextProps) {
  const textClassName = [styles.text, mode === "bubble" ? styles.bubble : "", className]
    .filter(Boolean)
    .join(" ");

  if (as === "h1") {
    return <h1 className={textClassName}>{text}</h1>;
  }

  if (as === "p") {
    return <p className={textClassName}>{text}</p>;
  }

  return <h2 className={textClassName}>{text}</h2>;
}
