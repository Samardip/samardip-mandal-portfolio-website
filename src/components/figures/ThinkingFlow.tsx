import styles from "./figures.module.css";

const stages = [
  { title: "WebSocket", body: "Agent thoughts arrive as markdown with **bold** step labels." },
  { title: "Redux store", body: "Stored with the conversation; only the latest thoughts message may stream." },
  { title: "Paced reveal", body: "Delay per character = remaining time × step weight ÷ remaining weight." },
  { title: "Progress steps", body: "Bold labels become steps: done, active, then a collapsed summary." },
];

export function ThinkingFlow() {
  return (
    <div className={styles.flow}>
      <ol className={styles.stages}>
        {stages.map((stage, i) => (
          <li key={stage.title} className={styles.stage}>
            <span className={styles.stageIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.stageTitle}>{stage.title}</span>
            <span className={styles.stageBody}>{stage.body}</span>
          </li>
        ))}
      </ol>
      <p className={styles.sideStore}>
        <span className={styles.sideLabel}>localStorage</span>
        Reveal position saved per photo after each step, so a reload resumes mid-stream instead of restarting.
      </p>
    </div>
  );
}
