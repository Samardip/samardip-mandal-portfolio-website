import type { ReactNode } from "react";
import { EmbedArchitecture } from "@/components/figures/EmbedArchitecture";
import { EmbedHandshake } from "@/components/figures/EmbedHandshake";
import { EmbedPrecedence } from "@/components/figures/EmbedPrecedence";
import { ThinkingFlow } from "@/components/figures/ThinkingFlow";
import { ThinkingPacing } from "@/components/figures/ThinkingPacing";
import { WallFade } from "@/components/figures/WallFade";
import { RichText } from "@/components/ui/RichText";
import type { Block, FigureKey } from "@/content/types";
import styles from "./CaseStudy.module.css";

const figures: Record<FigureKey, () => ReactNode> = {
  "embed-architecture": () => <EmbedArchitecture />,
  "embed-handshake": () => <EmbedHandshake />,
  "embed-precedence": () => <EmbedPrecedence />,
  "thinking-flow": () => <ThinkingFlow />,
  "thinking-pacing": () => <ThinkingPacing />,
  "wall-fade": () => <WallFade />,
};

function decisionNumbers(blocks: Block[]) {
  const numbers = new Map<number, number>();
  blocks.forEach((block, i) => {
    if (block.type === "decision") numbers.set(i, numbers.size + 1);
  });
  return numbers;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  const decisions = decisionNumbers(blocks);

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className={styles.paragraph}>
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "figure":
            return (
              <figure key={i} className={styles.figure}>
                <div className={styles.figureBody}>{figures[block.figure]()}</div>
                <figcaption className={styles.figcaption}>{block.caption}</figcaption>
              </figure>
            );
          case "decision": {
            return (
              <article key={i} className={`${styles.decision} reveal`}>
                <header className={styles.decisionHead}>
                  <span className={styles.decisionIndex}>
                    Decision {String(decisions.get(i) ?? 0).padStart(2, "0")}
                  </span>
                  <h3 className={styles.decisionTitle}>{block.title}</h3>
                </header>
                <dl className={styles.decisionBody}>
                  <div>
                    <dt>Chose</dt>
                    <dd>
                      <RichText text={block.chose} />
                    </dd>
                  </div>
                  {block.over ? (
                    <div>
                      <dt>Over</dt>
                      <dd>
                        <RichText text={block.over} />
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Because</dt>
                    <dd>
                      <RichText text={block.because} />
                    </dd>
                  </div>
                  <div data-cost>
                    <dt>Cost</dt>
                    <dd>
                      <RichText text={block.cost} />
                    </dd>
                  </div>
                </dl>
              </article>
            );
          }
          case "code":
            return (
              <figure key={i} className={styles.code}>
                <figcaption className={styles.codeLabel}>{block.label}</figcaption>
                <pre tabIndex={0}>
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "note":
            return (
              <aside key={i} className={styles.note}>
                {block.title ? <p className={styles.noteTitle}>{block.title}</p> : null}
                <p>
                  <RichText text={block.text} />
                </p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
