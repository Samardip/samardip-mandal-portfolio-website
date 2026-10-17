import Link from "next/link";
import { WallFade } from "@/components/figures/WallFade";
import { EmbedVisual } from "@/components/visuals/EmbedVisual";
import { ThinkingVisual } from "@/components/visuals/ThinkingVisual";
import type { Project } from "@/content/types";
import styles from "./Work.module.css";

type Props = {
  project: Project;
  layout: "flagship" | "reverse" | "standard";
};

function Visual({ project }: { project: Project }) {
  switch (project.visual) {
    case "embed":
      return <EmbedVisual />;
    case "thinking":
      return <ThinkingVisual />;
    case "walls":
      return (
        <div className={styles.wallVisual}>
          <WallFade compact />
        </div>
      );
    default:
      return null;
  }
}

export function ProjectFeature({ project, layout }: Props) {
  const href = `/work/${project.slug}`;
  const titleId = `${project.slug}-title`;

  return (
    <article id={project.slug} className={`${styles.feature} ${styles[layout]} reveal`} aria-labelledby={titleId}>
      <div className={styles.featureText}>
        <p className={styles.meta}>
          <span className={styles.metaIndex}>{project.index}</span>
          <span className="label">{project.context}</span>
        </p>
        <h3 id={titleId} className={styles.featureTitle}>
          <Link href={href}>{project.name}</Link>
        </h3>
        <p className={styles.roleLine}>
          {project.period} · {project.role}
        </p>

        <dl className={styles.story}>
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>My part</dt>
            <dd>{project.ownership}</dd>
          </div>
          <div>
            <dt>Hard part</dt>
            <dd>{project.challenge}</dd>
          </div>
          {layout === "flagship" ? (
            <div>
              <dt>Decisions</dt>
              <dd>
                <ul className={styles.decisions}>
                  {project.decisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          <div>
            <dt>Result</dt>
            <dd>{project.result}</dd>
          </div>
        </dl>

        <ul className={styles.stack} role="list" aria-label="Technology">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <p className={styles.featureLinks}>
          <Link href={href} className={styles.readMore}>
            Read the case study <span aria-hidden="true">→</span>
          </Link>
          {project.links?.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener" className={styles.external}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      </div>

      <figure className={styles.featureVisual}>
        <Visual project={project} />
        <figcaption className={styles.visualCaption}>
          {project.visual === "thinking"
            ? "Illustration: step labels are examples; the weighting is real."
            : project.visual === "walls"
              ? "Schematic: walls facing the camera fade out."
              : "Schematic: the widget on a partner listing page."}
        </figcaption>
      </figure>
    </article>
  );
}

export function ProjectBrief({ project }: { project: Project }) {
  return (
    <article id={project.slug} className={`${styles.brief} reveal`} aria-labelledby={`${project.slug}-title`}>
      <p className={styles.meta}>
        <span className={styles.metaIndex}>{project.index}</span>
        <span className="label">{project.period}</span>
      </p>
      <h3 id={`${project.slug}-title`} className={styles.briefTitle}>
        {project.name}
      </h3>
      <p className={styles.briefContext}>{project.context}</p>
      <p className={styles.briefBody}>{project.ownership}</p>
      <ul className={styles.briefList}>
        {project.decisions.map((decision) => (
          <li key={decision}>{decision}</li>
        ))}
      </ul>
      <p className={styles.briefResult}>{project.result}</p>
      <ul className={styles.stack} role="list" aria-label="Technology">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.links?.length ? (
        <p className={styles.featureLinks}>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener" className={styles.external}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      ) : null}
    </article>
  );
}
