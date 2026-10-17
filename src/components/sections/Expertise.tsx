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
          {expertise.map((area, i) => (
            <li key={area.title} className={styles.area}>
              <p className={styles.areaIndex}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className={styles.areaTitle}>{area.title}</h3>
              <p className={styles.areaSummary}>{area.summary}</p>
              <ul className={styles.areaTools} role="list" aria-label="Tools">
                {area.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <Link href={area.evidence.href} className={styles.areaEvidence}>
                <span className={styles.areaEvidenceLabel}>Evidence</span>
                <span className={styles.areaEvidenceTarget}>
                  <span className="visually-hidden">{area.title}: </span>
                  {area.evidence.label}
                  <span className={styles.areaArrow} aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
