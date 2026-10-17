import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
};

export function SectionHeader({ index, label, title, intro, id }: Props) {
  return (
    <header className={styles.header}>
      <p className={styles.kicker}>
        <span className={styles.index}>{index}</span>
        <span className="label">{label}</span>
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </header>
  );
}
