import styles from "./visuals.module.css";

/** Schematic of the widget running on a partner listing page. Annotations describe the real architecture. */
export function EmbedVisual() {
  return (
    <div className={styles.embed} aria-hidden="true">
      <div className={styles.browser}>
        <div className={styles.chrome}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>partner-portal / listing</span>
        </div>
        <div className={styles.page}>
          <div className={styles.host}>
            <div className={styles.hostPhoto} />
            <div className={styles.hostLines}>
              <i style={{ width: "70%" }} />
              <i style={{ width: "45%" }} />
              <i style={{ width: "85%" }} />
              <i style={{ width: "60%" }} />
            </div>
            <span className={styles.hostButton}>Reimagine this room</span>
          </div>

          <div className={styles.frame}>
            <div className={styles.frameHead}>
              <span className={styles.brandDot} />
              <span>Partner brand</span>
              <span className={styles.lang}>PL</span>
            </div>
            <div className={styles.frameRoom}>
              <div className={styles.compare} />
            </div>
            <div className={styles.pills}>
              <span data-active>Japandi</span>
              <span>Modern</span>
              <span>Classic</span>
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.annotations} role="list">
        <li style={{ left: "6%", top: "86%" }}>
          <b>widget.js</b> ~9 KB gz<span className={styles.annDetail}> · host page</span>
        </li>
        <li style={{ right: "6%", top: "86%" }} data-accent>
          <b>iframe</b> widget origin<span className={styles.annDetail}> · Preact</span>
        </li>
        <li style={{ left: "38%", top: "4%" }}>
          <b>reih:init</b>
          <span className={styles.annDetail}>postMessage</span>
        </li>
      </ul>
    </div>
  );
}
