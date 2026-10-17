import { SectionHeader } from "@/components/ui/SectionHeader";
import { metrics, productReach } from "@/content/career";
import type { Attribution, Metric } from "@/content/types";
import styles from "./sections.module.css";

const attributionLabel: Record<Attribution, string> = {
  individual: "Individual",
  team: "Team of two",
  product: "Product-level",
};

function Bars({ bars }: { bars: NonNullable<Metric["bars"]> }) {
  const max = Math.max(...bars.map((bar) => bar.value));
  return (
    <ul className={styles.bars} role="list">
      {bars.map((bar) => (
        <li key={bar.label}>
          <span className={styles.barLabel}>{bar.label}</span>
          <span className={styles.barTrack} aria-hidden="true">
            <span className={styles.barFill} style={{ width: `${(bar.value / max) * 100}%` }} />
          </span>
          <span className={styles.barValue}>{bar.display}</span>
        </li>
      ))}
    </ul>
  );
}

function Tile({ metric, className }: { metric: Metric; className?: string }) {
  return (
    <li className={[styles.tile, className].filter(Boolean).join(" ")}>
      <div className={styles.tileHead}>
        <p className={styles.metricValue}>{metric.value}</p>
        <p className={styles.metricLabel}>{metric.label}</p>
      </div>
      <p className={styles.metricDetail}>{metric.detail}</p>
      {metric.bars ? <Bars bars={metric.bars} /> : null}
      {metric.chips ? (
        <ul className={styles.metricChips} role="list">
          {metric.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      ) : null}
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
  const [feature, ...rest] = metrics;

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

        <ul className={styles.bento} role="list">
          <Tile metric={feature} className={styles.tileFeature} />
          {rest.map((metric) => (
            <Tile key={metric.label} metric={metric} />
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
              <Tile key={metric.label} metric={metric} className={styles.tileReach} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
