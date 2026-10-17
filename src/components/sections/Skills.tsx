import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/content/career";
import { SkillsExplorer } from "./SkillsExplorer";
import styles from "./sections.module.css";

export function Skills() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          index="04"
          label="Skills"
          title="The full toolkit."
          intro="Everything I've used in production work. Search for a tool, or filter by what it's for."
        />
        <SkillsExplorer groups={skillGroups} />
      </div>
    </section>
  );
}
