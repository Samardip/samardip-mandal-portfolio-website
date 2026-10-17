import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/content/projects";
import { ProjectBrief, ProjectFeature } from "./ProjectFeature";
import styles from "./Work.module.css";

export function SelectedWork() {
  const [flagship, second, third, ...briefs] = projects;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          index="01"
          label="Selected work"
          title="Evidence first."
          intro="Three case studies with the decisions behind them, then two more products for breadth. Each one says what I owned, and where I didn't own it."
        />

        <div className={styles.features}>
          <ProjectFeature project={flagship} layout="flagship" />
          <ProjectFeature project={second} layout="reverse" />
          <ProjectFeature project={third} layout="standard" />
        </div>

        <h3 className={styles.alsoTitle}>
          <span className="label">Also shipped</span>
        </h3>
        <div className={styles.briefs}>
          {briefs.map((project) => (
            <ProjectBrief key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
