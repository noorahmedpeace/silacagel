import Image from "next/image";
import { customerReferences, type CustomerReference } from "@/lib/customer-references";
import { testimonialFor } from "@/lib/customer-testimonials";
import styles from "./supply-wall.module.css";

/*
 * Three vertically scrolling columns of customer cards.
 *
 * Every field on a card is real: the company name, its industry and its logo
 * come from customer-references.ts, and the link goes to the company's own
 * site so a buyer can verify it.
 *
 * What a card deliberately does NOT carry is a quotation. Nobody in this list
 * has been asked for a testimonial, so attributing praise to GSK or Lucky
 * Textile would be putting words in a real company's mouth — and the
 * permission granted was to name them as customers, not to write statements on
 * their behalf. The line under each name is DryGelWorld's own factual
 * description of the supply relationship, which is checkable and is also what
 * a procurement reader actually wants: proof this supplier serves their sector.
 */

const SUPPLY_LINE: Record<string, string> = {
  pharma: "Desiccant supply for pharmaceutical and nutraceutical packaging",
  textile: "Desiccant supply for textile, apparel and leather export",
  food: "Container desiccants for rice and food export cargo",
  medical: "Desiccant supply for medical and healthcare packaging",
  industrial: "Silica gel and desiccant supply for industrial packaging",
};

function sectorFor(industry: string) {
  const i = industry.toLowerCase();
  if (i.includes("medical") || i.includes("healthcare")) return "medical";
  if (i.includes("pharma") || i.includes("nutraceutical") || i.includes("biopharma")) return "pharma";
  if (i.includes("textile") || i.includes("apparel") || i.includes("spinning") || i.includes("leather")) return "textile";
  if (i.includes("rice") || i.includes("food")) return "food";
  return "industrial";
}

/** Logo files too small to render cleanly at the card's mark size. */
const LOW_RES_LOGOS = new Set(["/customer-logos/intex.png"]);

function Card({ customer, clone }: { customer: CustomerReference; clone: boolean }) {
  const showLogo = customer.logo && !LOW_RES_LOGOS.has(customer.logo);
  // A quotation appears only once that customer has signed off on the exact
  // wording. Until then the card shows what was supplied, which is DryGelWorld's
  // own statement and needs nobody's approval.
  const testimonial = testimonialFor(customer.name);
  const body = (
    <>
      <span className={styles.mark} aria-hidden="true">
        {showLogo ? (
          <Image src={customer.logo as string} alt="" width={54} height={36} />
        ) : (
          customer.initials
        )}
      </span>
      {testimonial ? (
        <blockquote className={styles.quote}>
          <p>{testimonial.quote}</p>
        </blockquote>
      ) : (
        <p className={styles.supply}>{SUPPLY_LINE[sectorFor(customer.industry)]}</p>
      )}
      <footer className={styles.foot}>
        <strong className={styles.name}>
          {testimonial?.person ? `${testimonial.person}, ` : ""}
          {customer.name}
        </strong>
        <span className={styles.industry}>
          {testimonial?.role ? `${testimonial.role} · ` : ""}
          {customer.industry}
        </span>
      </footer>
    </>
  );

  const shared = {
    className: `${styles.card}${clone ? ` ${styles.clone}` : ""}`,
    "aria-hidden": clone || undefined,
  };

  // No confirmed website: render as a plain card, not an anchor. An <a> without
  // an href is a dead target for keyboard users, and on a wall whose whole
  // purpose is "look them up yourself" a fake link is worse than none.
  //
  // The state is stated rather than implied. Hover is the only other signal and
  // a touch user has none, so without this label the five unlinked companies
  // would be indistinguishable from the twenty-seven linked ones on a phone —
  // the same reasoning the sector grid on this page already follows.
  if (!customer.href) {
    return (
      <li {...shared}>
        <div className={styles.plain}>
          {body}
          <span className={styles.noSite}>No public website</span>
        </div>
      </li>
    );
  }

  return (
    <li {...shared}>
      <a
        className={styles.link}
        href={customer.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={clone ? -1 : undefined}
      >
        {body}
        <span className={styles.visit}>Visit site</span>
      </a>
    </li>
  );
}

function Column({
  items,
  speed,
  className,
}: {
  items: CustomerReference[];
  speed: number;
  className?: string;
}) {
  return (
    <div className={`${styles.column}${className ? ` ${className}` : ""}`}>
      {/* The list is rendered twice so the loop is seamless. The second pass is
          decoration: hidden from assistive tech and out of the tab order, so a
          screen reader does not announce all 33 companies twice. */}
      <ul className={styles.track} style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items].map((customer, i) => (
          <Card
            key={`${customer.name}-${i}`}
            customer={customer}
            clone={i >= items.length}
          />
        ))}
      </ul>
    </div>
  );
}

export function SupplyWall() {
  const all = customerReferences;
  const per = Math.ceil(all.length / 3);
  const columns = [all.slice(0, per), all.slice(per, per * 2), all.slice(per * 2)];

  return (
    <div className={styles.wall} aria-label="Companies DryGelWorld supplies">
      <Column items={columns[0]} speed={64} />
      <Column items={columns[1]} speed={78} className={styles.md} />
      <Column items={columns[2]} speed={70} className={styles.lg} />
    </div>
  );
}
