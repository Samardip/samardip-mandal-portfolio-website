import { RichText } from "@/components/ui/RichText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/content/career";
import styles from "./sections.module.css";

export function Principles() {
  return (
    <section id="principles" className={styles.section} aria-labelledby="principles-title">
      <div className="container">
        <SectionHeader
          id="principles-title"
          index="05"
          label="How I work"
          title="Principles I can point to in shipped code."
        />
        <ol className={styles.principles} role="list">
          {principles.map((principle, i) => (
            <li key={principle.title} className={`${styles.principle} reveal`}>
              <span className={styles.principleIndex}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>
                <RichText text={principle.body} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
