import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.main}>
          <p className={styles.kicker}>
            <span className={styles.status} aria-hidden="true" />
            <span className="label">
              {profile.role} · AI products · {profile.location}
            </span>
          </p>

          <h1 id="hero-title" className={styles.title}>
            Frontend for AI products that run <em>in real time</em>, <em>inside other people&rsquo;s websites</em>,
            and <em>in&nbsp;3D</em>.
          </h1>

          <p className={styles.lede}>
            I&rsquo;m {profile.name}, {profile.currentTitle} at {profile.company}, promoted from SDE&nbsp;I. Since
            January 2025 I&rsquo;ve shipped frontend for five AI products in React, Next.js and TypeScript. They
            include an embeddable staging widget used on real-estate portals, an agentic design chat, and a
            photos-to-3D room studio.
          </p>

          <div className={styles.actions}>
            <Button href="#work" arrow>
              View selected work
            </Button>
            <Button href={profile.resume} variant="secondary" download>
              Download résumé
            </Button>
            <Button href={`mailto:${profile.email}`} variant="ghost">
              {profile.email}
            </Button>
          </div>
        </div>

        <aside className={styles.index} aria-label="At a glance">
          <dl className={styles.facts}>
            <div>
              <dt className="label">Now</dt>
              <dd>
                {profile.currentTitle}, {profile.company}
              </dd>
            </div>
            <div>
              <dt className="label">Before</dt>
              <dd>Global IDs · Tale Wallet (NFTVerse)</dd>
            </div>
            <div>
              <dt className="label">Focus</dt>
              <dd className={styles.focus}>
                {profile.focus.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          </dl>

          <p className="label">Selected work</p>
          <ol className={styles.work} role="list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={project.caseStudy ? `/work/${project.slug}` : `/#${project.slug}`}>
                  <span className={styles.workIndex}>{project.index}</span>
                  <span className={styles.workName}>{project.name}</span>
                  <span className={styles.workMeta}>{project.caseStudy ? "Case study" : project.period}</span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
