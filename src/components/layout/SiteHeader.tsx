import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            SM
          </span>
          <span className={styles.name}>{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          <ul role="list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={profile.resume} className={styles.resume} download>
            Résumé
          </a>
          <Link href="/#contact" className={styles.contact}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
