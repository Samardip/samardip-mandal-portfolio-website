import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { expertise } from "@/content/career";
import styles from "./sections.module.css";

export function Expertise() {
  return (
    <section id="expertise" className={styles.sectionAlt} aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeader
          id="expertise-title"
          index="03"
          label="Technical expertise"
          title="Capabilities, each with a pointer to where I used it."
          intro="No skill bars. Every area links to the project that shows it."
        />
        <ul className={styles.expertise} role="list">
          {expertise.map((area) => (
            <li key={area.title} className={styles.area}>
              <h3 className={styles.areaTitle}>{area.title}</h3>
              <p className={styles.areaSummary}>{area.summary}</p>
              <p className={styles.areaTools}>{area.tools.join(" · ")}</p>
              <Link href={area.evidence.href} className={styles.areaEvidence}>
                <span className="visually-hidden">{area.title}: </span>
                Evidence: {area.evidence.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
