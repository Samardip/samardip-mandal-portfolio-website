import { SectionHeader } from "@/components/ui/SectionHeader";
import { earlier, jobs } from "@/content/career";
import styles from "./sections.module.css";

export function Experience() {
  return (
    <section id="experience" className={styles.sectionAlt} aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          index="05"
          label="Experience"
          title="From a single editor to frontends across five products."
          intro="Four years at product companies where frontend engineers own whole features."
        />
        <ol className={styles.jobs} role="list">
          {jobs.map((job) => (
            <li key={job.company} className={styles.job}>
              <div className={styles.jobHead}>
                <h3 className={styles.jobCompany}>{job.company}</h3>
                <p className={styles.jobMeta}>
                  {job.location} · {job.period}
                </p>
              </div>
              <div className={styles.jobBody}>
                <ol className={styles.roles} role="list">
                  {job.roles.map((role) => (
                    <li key={role.title} className={styles.role}>
                      <span className={styles.roleTitle}>{role.title}</span>
                      <span className={styles.rolePeriod}>
                        {role.note ? <span className={styles.promoted}>{role.note}</span> : null}
                        {role.period}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className={styles.jobSummary}>{job.summary}</p>
                <ul className={styles.jobHighlights}>
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.earlier}>{earlier}</p>
      </div>
    </section>
  );
}
