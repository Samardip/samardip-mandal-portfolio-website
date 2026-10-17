import styles from "./figures.module.css";

type Props = { compact?: boolean };

/** Top-down schematic: walls facing the camera are cut away, plus the hysteresis band that prevents flicker. */
export function WallFade({ compact = false }: Props) {
  return (
    <div className={compact ? styles.wallCompact : styles.wall}>
      <svg viewBox="0 0 360 300" className={styles.svgAlways} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="wf-cone" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="360" height="300" fill="var(--paper)" />
        <g stroke="var(--rule)" strokeWidth="1">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={30 + i * 30} y1="20" x2={30 + i * 30} y2="280" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="20" y1={40 + i * 30} x2="340" y2={40 + i * 30} />
          ))}
        </g>

        <path d="M28 288 L150 120 L250 210 Z" fill="url(#wf-cone)" />

        <rect x="120" y="96" width="70" height="30" rx="4" fill="var(--paper-3)" stroke="var(--ink-3)" />
        <circle cx="210" cy="170" r="30" fill="none" stroke="var(--ink-3)" strokeDasharray="3 3" />
        <rect x="246" y="78" width="40" height="40" rx="3" fill="var(--paper-3)" stroke="var(--ink-3)" />

        <line x1="90" y1="60" x2="310" y2="60" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
        <line x1="310" y1="60" x2="310" y2="240" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
        <line x1="90" y1="240" x2="310" y2="240" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.28" strokeDasharray="2 10" />
        <line x1="90" y1="60" x2="90" y2="240" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.28" strokeDasharray="2 10" />

        <g transform="translate(28 288) rotate(-42)">
          <rect x="-11" y="-8" width="22" height="16" rx="3" fill="var(--ink)" />
          <path d="M11 -5 L19 -9 L19 9 L11 5 Z" fill="var(--ink)" />
        </g>

        {!compact ? (
          <g className={styles.wallLabels}>
            <text x="314" y="54" textAnchor="end">visible</text>
            <text x="200" y="262" textAnchor="middle" fill="var(--accent-ink)">faded · facing camera</text>
            <text x="52" y="282">camera</text>
          </g>
        ) : null}
      </svg>

      {!compact ? (
        <div className={styles.hysteresis}>
          <p className="label">Facing score → wall state</p>
          <svg viewBox="0 0 300 150" className={styles.svgAlways} aria-hidden="true" focusable="false">
            <line x1="20" y1="120" x2="290" y2="120" stroke="var(--ink-3)" />
            <line x1="20" y1="20" x2="20" y2="120" stroke="var(--ink-3)" />
            <text x="24" y="138" className={styles.axisText}>0</text>
            <text x="101" y="138" textAnchor="middle" className={styles.axisText}>0.3</text>
            <text x="155" y="138" textAnchor="middle" className={styles.axisText}>0.5</text>
            <text x="286" y="138" textAnchor="end" className={styles.axisText}>1</text>
            <text x="26" y="34" className={styles.axisText}>cut</text>
            <text x="26" y="112" className={styles.axisText}>shown</text>
            <line x1="101" y1="20" x2="101" y2="120" stroke="var(--rule)" strokeDasharray="2 3" />
            <line x1="155" y1="20" x2="155" y2="120" stroke="var(--rule)" strokeDasharray="2 3" />
            <path d="M40 100 H155 V44 H280" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <path d="M280 40 H101 V100 H40" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" />
            <path d="M151 76 l4 -8 l4 8" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <path d="M97 64 l4 8 l4 -8" fill="none" stroke="var(--accent)" strokeWidth="2" />
          </svg>
          <p className={styles.hysteresisNote}>
            Cut once the score passes 0.5; restore only below 0.3. Walls in between keep their last state.
          </p>
        </div>
      ) : null}
    </div>
  );
}
