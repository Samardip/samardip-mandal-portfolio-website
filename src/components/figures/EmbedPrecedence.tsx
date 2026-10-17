import styles from "./figures.module.css";

const layers = [
  {
    name: "Host page overrides",
    source: "window.reihWidgetConfig · per page",
    fields: "branding, colors, copy, language, media, mode",
  },
  {
    name: "Organization config",
    source: "partner dashboard · returned with the session",
    fields: "logo, colors, fonts, sections, default language, feature flags",
  },
  {
    name: "Built-in defaults",
    source: "shipped in the app",
    fields: "en-US strings, default UI, uploads off",
  },
];

const exceptions = [
  ["Typography", "Host wins only when it sets an explicit font family, so a partner who changes a color keeps the org's font."],
  ["Uploads", "On only when the host opts in with `allowUpload: true`, or the organization enables it."],
  ["Copy sections", "Host text wins only when it's non-empty; blank strings never erase organization copy."],
  ["Language", "Host language, then the organization's default, then en-US."],
];

export function EmbedPrecedence() {
  return (
    <div className={styles.precedence}>
      <ol className={styles.layers} aria-label="Layers, highest priority first">
        {layers.map((layer, i) => (
          <li key={layer.name} className={styles.layer} data-top={i === 0 || undefined}>
            <span className={styles.layerRank}>{i === 0 ? "wins" : i === 1 ? "default" : "fallback"}</span>
            <span className={styles.layerName}>{layer.name}</span>
            <span className={styles.layerSource}>{layer.source}</span>
            <span className={styles.layerFields}>{layer.fields}</span>
          </li>
        ))}
      </ol>
      <dl className={styles.exceptions}>
        {exceptions.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>
              {detail.split(/(`[^`]+`)/g).map((part, i) =>
                part.startsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : part,
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
