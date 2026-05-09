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
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const textClassName = [styles.text, mode === "bubble" ? styles.bubble : "", className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {words.map((word, index) => (
        <span className={styles.line} key={`${word}-${index}`}>
          <span
            className={styles.word}
            style={{ animationDelay: `${delay + index * 0.045}s` }}
          >
            {word}
          </span>
          {index < words.length - 1 ? <span className={styles.wordSpace}> </span> : null}
        </span>
      ))}
    </>
  );

  if (as === "h1") {
    return <h1 className={textClassName}>{content}</h1>;
  }

  if (as === "p") {
    return <p className={textClassName}>{content}</p>;
  }

  return <h2 className={textClassName}>{content}</h2>;
}
