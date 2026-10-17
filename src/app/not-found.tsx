import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: "var(--space-9)", display: "grid", gap: "var(--space-5)" }}>
      <p className="label">404</p>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-5)" }}>This page doesn&rsquo;t exist.</h1>
      <p style={{ color: "var(--ink-2)", maxWidth: "50ch" }}>
        The link may be out of date. The selected work and case studies are on the home page.
      </p>
      <div>
        <Button href="/#work" arrow>
          Back to selected work
        </Button>
      </div>
    </section>
  );
}
