import Link from "next/link";
import styles from "./bento-grid.module.css";
import { Reveal } from "./reveal";

interface BentoItemProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  linkText: string;
  className?: string;
}

const BentoItem = ({ href, icon, title, description, linkText, className = "" }: BentoItemProps) => (
  <Link href={href} className={`${styles.bentoCard} ${className}`}>
    <div className={styles.bentoIcon}>{icon}</div>
    <div className={styles.bentoContent}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={styles.bentoLink}>{linkText}</span>
    </div>
  </Link>
);

export const BentoGrid = () => {
  return (
    <section className={styles.bentoContainer}>
      <BentoItem 
        href="/dispensers"
        icon="⚙️"
        title="Industrial Dispensers"
        description="DT-1200 & DT-1500 high-speed automated machinery engineered for pharma and food-grade desiccant deployment."
        linkText="View Automation Catalog →"
        className={styles.large}
      />
      <BentoItem 
        href="/documents"
        icon="📋"
        title="Compliance & Standards"
        description="Access full FDA, ISO 9001, and REACH documentation for global procurement."
        linkText="Get Documents"
        className={styles.standard}
      />
      <BentoItem 
        href="/faq"
        icon="❓"
        title="Technical Expert FAQ"
        description="Chemistry and logistics questions answered by industrial experts."
        linkText="Read FAQ"
        className={styles.standard}
      />
      <BentoItem 
        href="/videos"
        icon="🎬"
        title="Technical Demonstration Vault"
        description="9 in-depth scientific demonstrations covering adsorption capacity and maritime deployment."
        linkText="Watch Video Demos →"
        className={styles.wide}
      />
    </section>
  );
};
