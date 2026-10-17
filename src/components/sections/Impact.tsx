import { SectionHeader } from "@/components/ui/SectionHeader";
import { metrics, productReach } from "@/content/career";
import type { Attribution, Metric } from "@/content/types";
import styles from "./sections.module.css";

const attributionLabel: Record<Attribution, string> = {
  individual: "Individual",
  team: "Team of two",
  product: "Product-level",
};

function MetricCard({ metric, variant }: { metric: Metric; variant?: "reach" }) {
  return (
    <li className={variant === "reach" ? styles.reachCard : styles.metric}>
      <p className={styles.metricValue}>{metric.value}</p>
      <p className={styles.metricLabel}>{metric.label}</p>
      <p className={styles.metricDetail}>{metric.detail}</p>
      <p className={styles.metricSource}>
        <span className={styles.attribution} data-kind={metric.attribution}>
          {attributionLabel[metric.attribution]}
        </span>
        <span>{metric.source}</span>
      </p>
    </li>
  );
}

export function Impact() {
  return (
    <section id="impact" className={styles.section} aria-labelledby="impact-title">
      <div className="container">
        <SectionHeader
          id="impact-title"
          index="02"
          label="Engineering impact"
          title="Numbers, with their source attached."
          intro="Every number below is either something I measured or clearly marked as a product-level figure reported by the company. I don't present product-wide outcomes as my individual result."
        />

        <ul className={styles.metrics} role="list">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </ul>

        <div className={styles.reach}>
          <div className={styles.reachIntro}>
            <p className="label">Product reach</p>
            <p>
              The scale of the products I build frontend for. These figures come from the company; they describe
              reach, not my individual contribution.
            </p>
          </div>
          <ul className={styles.reachList} role="list">
            {productReach.map((metric) => (
              <MetricCard key={metric.label} metric={metric} variant="reach" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
