import styles from "./visuals.module.css";

/** Illustration of the thinking stream: labels become steps, text reveals on a time budget. */
export function ThinkingVisual() {
  return (
    <div className={styles.thinking} aria-hidden="true">
      <div className={styles.bubble}>
        <p className={styles.bubbleHead}>
          <span className={styles.bulb} />
          Thinking
        </p>
        <ol className={styles.chips}>
          <li data-state="done">Reading the room</li>
          <li data-state="done">Choosing a palette</li>
          <li data-state="active">Placing furniture</li>
        </ol>
        <p className={styles.stream}>
          Keeping the window wall clear, a low sofa faces the light<span className={styles.caret} />
        </p>
      </div>
      <div className={styles.budget}>
        <span style={{ flexGrow: 1 }} />
        <span style={{ flexGrow: 1 }} />
        <span style={{ flexGrow: 2 }} data-current />
        <span style={{ flexGrow: 4 }} data-pending />
      </div>
      <p className={styles.budgetLabel}>
        <span>time budget · weighted per step</span>
        <span>14.5 s</span>
      </p>
    </div>
  );
}
