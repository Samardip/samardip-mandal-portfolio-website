import styles from "./figures.module.css";

const BUDGET_S = 14.5;
const weights = [1, 1, 2, 4, 4];
const total = weights.reduce((sum, w) => sum + w, 0);

export function ThinkingPacing() {
  return (
    <div className={styles.pacing}>
      <p className={styles.pacingNote}>
        If every step had the same number of characters, the default {BUDGET_S} s budget would split like this:
      </p>
      <ol className={styles.pacingBar}>
        {weights.map((w, i) => {
          const seconds = (BUDGET_S * w) / total;
          return (
            <li key={i} style={{ flexGrow: w }} data-weight={w}>
              <span className={styles.pacingStep}>Step {i + 1}{i === weights.length - 1 ? "+" : ""}</span>
              <span className={styles.pacingWeight}>×{w}</span>
              <span className={styles.pacingSeconds}>{seconds.toFixed(1)} s</span>
            </li>
          );
        })}
      </ol>
      <p className={styles.pacingAxis} aria-hidden="true">
        <span>0 s</span>
        <span>{BUDGET_S} s</span>
      </p>
    </div>
  );
}
