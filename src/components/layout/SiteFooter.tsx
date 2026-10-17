import { profile } from "@/content/profile";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          {profile.name} · {profile.role} · {profile.location}
        </p>
        <ul role="list" className={styles.links}>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          <li>
            <a href={profile.links.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.links.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.resume} download>
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
