import type { CSSProperties } from "react";
import styles from "./figures.module.css";

type Lane = 0 | 1 | 2;
type Step = { from: Lane; to: Lane; label: string; accent?: boolean };

const lanes = ["Host page · loader", "Iframe app", "Backend"];

const steps: Step[] = [
  { from: 0, to: 0, label: "open() · branded loading card" },
  { from: 0, to: 2, label: "create session · public key + Origin" },
  { from: 2, to: 0, label: "session id + organization config" },
  { from: 0, to: 1, label: "load iframe · ?origin=<parent>" },
  { from: 1, to: 0, label: "reih:ready", accent: true },
  { from: 0, to: 1, label: "reih:init · merged config", accent: true },
  { from: 0, to: 1, label: "reih:theme · fonts, colors", accent: true },
  { from: 1, to: 2, label: "WebSocket · session" },
  { from: 1, to: 0, label: "reih:close / reih:destroy", accent: true },
];

export function EmbedHandshake() {
  return (
    <div className={styles.sequence}>
      <div className={styles.lanes} aria-hidden="true">
        {lanes.map((lane) => (
          <span key={lane} className={styles.laneHead}>
            {lane}
          </span>
        ))}
      </div>
      <ol className={styles.steps}>
        {steps.map((step, i) => {
          const start = Math.min(step.from, step.to);
          const end = Math.max(step.from, step.to);
          const self = step.from === step.to;
          const reverse = step.to < step.from;
          return (
            <li
              key={i}
              className={styles.step}
              style={
                {
                  gridColumn: `${start + 1} / ${end + 2}`,
                  "--span": end - start + 1,
                } as CSSProperties
              }
              data-self={self || undefined}
              data-reverse={reverse || undefined}
              data-accent={step.accent || undefined}
            >
              <span className="visually-hidden">
                {lanes[step.from]} to {lanes[step.to]}:{" "}
              </span>
              <span className={styles.stepLabel}>{step.label}</span>
              <span className={styles.stepLine} aria-hidden="true" />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
