"use client";

import { useEffect, useState } from "react";
import styles from "./CopyEmail.module.css";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
      <span className="visually-hidden" aria-live="polite">
        {copied ? "Email address copied to clipboard" : "Copy email address"}
      </span>
    </button>
  );
}
