import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
} & Omit<ComponentProps<"a">, "href">;

function isInternal(href: string) {
  return href.startsWith("/") && !href.endsWith(".pdf");
}

export function Button({ href, variant = "primary", children, arrow = false, className, ...rest }: Props) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
