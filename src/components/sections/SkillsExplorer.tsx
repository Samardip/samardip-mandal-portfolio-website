"use client";

import { useId, useState } from "react";
import type { SkillGroup } from "@/content/career";
import styles from "./sections.module.css";

const ALL = "All";

export function SkillsExplorer({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(ALL);
  const [query, setQuery] = useState("");
  const searchId = useId();

  const total = groups.reduce((sum, group) => sum + group.skills.length, 0);
  const needle = query.trim().toLowerCase();

  const visible = groups
    .filter((group) => active === ALL || group.title === active)
    .map((group) => ({
      ...group,
      skills: needle ? group.skills.filter((skill) => skill.toLowerCase().includes(needle)) : group.skills,
    }))
    .filter((group) => group.skills.length > 0);

  const shown = visible.reduce((sum, group) => sum + group.skills.length, 0);

  function reset() {
    setActive(ALL);
    setQuery("");
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <label htmlFor={searchId} className="visually-hidden">
          Search skills
        </label>
        <div className={styles.search}>
          <span className={styles.searchIcon} aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills, e.g. WebSockets"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className={styles.filters} role="group" aria-label="Filter by category">
          {[ALL, ...groups.map((group) => group.title)].map((title) => {
            const count =
              title === ALL ? total : (groups.find((group) => group.title === title)?.skills.length ?? 0);
            return (
              <button
                key={title}
                type="button"
                className={styles.filter}
                aria-pressed={active === title}
                onClick={() => setActive(title)}
              >
                {title}
                <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className={styles.skillsStatus} aria-live="polite">
        Showing {shown} of {total} skills
        {active !== ALL || needle ? (
          <button type="button" className={styles.clear} onClick={reset}>
            Clear filters
          </button>
        ) : null}
      </p>

      {visible.length ? (
        <ul className={styles.skillGrid} role="list">
          {visible.map((group) => (
            <li key={group.title} className={styles.skillCard}>
              <div className={styles.skillCardHead}>
                <h3 className={styles.skillTitle}>{group.title}</h3>
                <span className={styles.skillCount}>{group.skills.length}</span>
              </div>
              <ul role="list" className={styles.skillList}>
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Highlight text={skill} needle={needle} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.skillsEmpty}>
          <p>No skills match &ldquo;{query}&rdquo;.</p>
          <button type="button" className={styles.clear} onClick={reset}>
            Show all skills
          </button>
        </div>
      )}
    </div>
  );
}

function Highlight({ text, needle }: { text: string; needle: string }) {
  if (!needle) return text;
  const start = text.toLowerCase().indexOf(needle);
  if (start === -1) return text;
  const end = start + needle.length;
  return (
    <>
      {text.slice(0, start)}
      <mark>{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}
