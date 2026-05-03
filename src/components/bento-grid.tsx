import type { ReactNode } from "react";
import Link from "next/link";
import { CircleHelp, ClipboardList, Cog, Film } from "lucide-react";
import styles from "./bento-grid.module.css";

interface BentoItemProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  className?: string;
}

const BentoItem = ({
  href,
  icon,
  title,
  description,
  linkText,
  className = "",
}: BentoItemProps) => (
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
        icon={<Cog size={28} strokeWidth={1.8} />}
        title="Industrial Dispensers"
        description="Automated desiccant insertion and packing-line support for recurring sachet programs."
        linkText="View Automation Catalog ->"
        className={styles.large}
      />
      <BentoItem
        href="/documents"
        icon={<ClipboardList size={28} strokeWidth={1.8} />}
        title="Compliance & Standards"
        description="Request ISO 9001:2015, SDS, COA, DMF-free, and product specification support for buyer review."
        linkText="Get Documents"
        className={styles.standard}
      />
      <BentoItem
        href="/faq"
        icon={<CircleHelp size={28} strokeWidth={1.8} />}
        title="Technical Expert FAQ"
        description="Chemistry and logistics questions answered by industrial experts."
        linkText="Read FAQ"
        className={styles.standard}
      />
      <BentoItem
        href="/videos"
        icon={<Film size={28} strokeWidth={1.8} />}
        title="Technical Demonstration Vault"
        description="9 in-depth scientific demonstrations covering adsorption capacity and maritime deployment."
        linkText="Watch Video Demos ->"
        className={styles.wide}
      />
    </section>
  );
};
