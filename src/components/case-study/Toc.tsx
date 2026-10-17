"use client";

import { useEffect, useState } from "react";
import styles from "./CaseStudy.module.css";

type Item = { id: string; title: string };

/** The active section is the last one whose top has passed 30% of the viewport. */
function findActive(ids: string[]) {
  const threshold = window.innerHeight * 0.3;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) return ids[ids.length - 1];
  let active = ids[0];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= threshold) active = id;
  }
  return active;
}

export function Toc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const ids = items.map((item) => item.id);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(findActive(ids)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className={styles.toc}>
      <p className="label">On this page</p>
      <ol role="list">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setActive(item.id)}
            >
              <span className={styles.tocIndex}>{String(i + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
