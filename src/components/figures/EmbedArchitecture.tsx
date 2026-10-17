import styles from "./figures.module.css";

const flows = [
  "Partner code calls reihWidget.open(); the loader (~9 KB gzipped) shows a branded loading card.",
  "The loader creates a session with the partner's public key. The backend checks the page's Origin against that partner's allowlist.",
  "The loader opens a full-screen iframe on the widget's own origin, passing the session and the parent origin in the URL.",
  "Loader and app talk only through typed reih:* postMessage events, with origins checked on both sides.",
  "Inside the iframe, the app loads the partner's UI module and locale on demand, and receives live generation status over a WebSocket.",
];

export function EmbedArchitecture() {
  return (
    <div className={styles.svgFigure}>
      <svg viewBox="0 0 880 470" className={styles.svg} aria-hidden="true" focusable="false">
        <defs>
          <marker id="ea-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" />
          </marker>
        </defs>

        <rect x="16" y="16" width="384" height="284" rx="10" className={styles.zone} />
        <text x="36" y="40" className={styles.zoneLabel}>PARTNER PAGE · HOST ORIGIN</text>
        <rect x="480" y="16" width="384" height="284" rx="10" className={styles.zoneAccent} />
        <text x="500" y="40" className={styles.zoneLabelAccent}>WIDGET ORIGIN · IFRAME</text>
        <rect x="16" y="352" width="848" height="104" rx="10" className={styles.zone} />
        <text x="36" y="376" className={styles.zoneLabel}>BACKEND</text>

        <rect x="48" y="56" width="320" height="48" rx="6" className={styles.node} />
        <text x="64" y="85" className={styles.nodeText}>Partner code</text>
        <text x="352" y="85" textAnchor="end" className={styles.mono}>reihWidget.open()</text>

        <rect x="48" y="152" width="320" height="120" rx="6" className={styles.nodeStrong} />
        <text x="64" y="180" className={styles.nodeTitle}>Loader · widget.js</text>
        <text x="64" y="204" className={styles.mono}>~9 KB gzipped · ES2019 IIFE</text>
        <text x="64" y="232" className={styles.nodeText}>Session · iframe lifecycle</text>
        <text x="64" y="254" className={styles.nodeText}>postMessage bridge · config merge</text>

        <rect x="512" y="56" width="320" height="216" rx="6" className={styles.nodeStrong} />
        <text x="528" y="84" className={styles.nodeTitle}>Iframe app</text>
        <text x="816" y="84" textAnchor="end" className={styles.mono}>Preact + Vite</text>
        <rect x="528" y="100" width="288" height="66" rx="5" className={styles.inner} />
        <text x="542" y="124" className={styles.nodeText}>Shared core</text>
        <text x="542" y="148" className={styles.mono}>session · messages · i18n · analytics</text>
        <rect x="528" y="180" width="288" height="76" rx="5" className={styles.innerAccent} />
        <text x="542" y="204" className={styles.nodeText}>Tenant UI · lazy-loaded by slug</text>
        <text x="542" y="228" className={styles.mono}>default · otodom</text>
        <text x="542" y="246" className={styles.mono}>+ locale chunk on demand</text>

        <rect x="48" y="388" width="320" height="52" rx="6" className={styles.node} />
        <text x="64" y="412" className={styles.nodeText}>Session API</text>
        <text x="64" y="430" className={styles.mono}>public key + Origin allowlist</text>

        <rect x="512" y="388" width="320" height="52" rx="6" className={styles.node} />
        <text x="528" y="412" className={styles.nodeText}>WebSocket</text>
        <text x="528" y="430" className={styles.mono}>generation status · chat</text>

        <line x1="208" y1="104" x2="208" y2="150" className={styles.edge} markerEnd="url(#ea-arrow)" />
        <line x1="208" y1="272" x2="208" y2="386" className={styles.edge} markerEnd="url(#ea-arrow)" />
        <text x="222" y="322" className={styles.edgeLabel}>① create session</text>
        <line x1="368" y1="186" x2="510" y2="186" className={styles.edge} markerEnd="url(#ea-arrow)" />
        <text x="440" y="176" textAnchor="middle" className={styles.edgeLabel}>② load iframe</text>
        <line x1="370" y1="240" x2="510" y2="240" className={styles.edgeAccent} markerStart="url(#ea-arrow)" markerEnd="url(#ea-arrow)" />
        <text x="440" y="230" textAnchor="middle" className={styles.edgeLabelAccent}>③ reih:* events</text>
        <line x1="672" y1="274" x2="672" y2="386" className={styles.edge} markerStart="url(#ea-arrow)" markerEnd="url(#ea-arrow)" />
        <text x="686" y="322" className={styles.edgeLabel}>④ live status</text>
      </svg>

      <ol className={styles.flowList}>
        {flows.map((flow, i) => (
          <li key={i}>
            <span className={styles.flowIndex}>{i + 1}</span>
            <span>{flow}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
