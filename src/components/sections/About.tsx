import { SectionHeader } from "@/components/ui/SectionHeader";
import { achievements, education } from "@/content/career";
import styles from "./sections.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHeader id="about-title" index="07" label="About" title="The short version." />
        <div className={styles.about}>
          <div className={styles.aboutText}>
            <p>
              I&rsquo;m a frontend engineer in Bengaluru. I studied computer science at RCC Institute of Information
              Technology and spent much of college on competitive programming.
            </p>
            <p>
              Since 2022 I&rsquo;ve worked at small product companies, where a frontend engineer owns a feature from
              the API contract to the last edge case on a phone. At Styldod that has meant AI products, where most of
              the experience is waiting, streaming and recovering, and where the details decide whether people trust
              what they see.
            </p>
            <p>
              I work best close to product and design, and I try to leave a codebase easier to change than I found
              it.
            </p>
          </div>
          <dl className={styles.aboutFacts}>
            <div>
              <dt className="label">Education</dt>
              <dd>
                {education.degree}
                <br />
                <span className={styles.muted}>
                  {education.school} · {education.period} · {education.grade}
                </span>
              </dd>
            </div>
            <div>
              <dt className="label">Competitive programming</dt>
              <dd>
                <ul className={styles.plainList} role="list">
                  {achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
