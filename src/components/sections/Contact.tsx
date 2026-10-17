import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { profile } from "@/content/profile";
import styles from "./sections.module.css";

type Props = { headingLevel?: "h2" | "h3"; index?: string };

export function Contact({ headingLevel = "h2", index = "08" }: Props) {
  const Heading = headingLevel;
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={`container ${styles.contactInner}`}>
        <p className={styles.contactKicker}>
          <span className={styles.contactIndex}>{index}</span>
          <span>Contact</span>
        </p>
        <Heading id="contact-title" className={styles.contactTitle}>
          Hiring for senior frontend, frontend platform or AI product work?
        </Heading>
        <p className={styles.contactLede}>
          Email is the quickest way to reach me. If something here is relevant to what your team needs, I&rsquo;m
          happy to walk through the code and the trade-offs in more detail.
        </p>

        <div className={styles.emailRow}>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>
          <CopyEmail email={profile.email} />
        </div>

        <ul className={styles.contactLinks} role="list">
          <li>
            <Button href={profile.links.linkedin} variant="inverse" target="_blank" rel="me noopener" arrow>
              LinkedIn
            </Button>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="me noopener" className={styles.contactLink}>
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={profile.resume} download className={styles.contactLink}>
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
