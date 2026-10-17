import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/case-study/Blocks";
import styles from "@/components/case-study/CaseStudy.module.css";
import { Toc } from "@/components/case-study/Toc";
import { Contact } from "@/components/sections/Contact";
import { caseStudies, getCaseStudy } from "@/content/projects";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  const { caseStudy } = project;
  const url = `/work/${project.slug}`;
  return {
    title: `${caseStudy.title} · ${project.name}`,
    description: caseStudy.dek,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: caseStudy.title, description: caseStudy.dek },
    twitter: { card: "summary_large_image", title: caseStudy.title, description: caseStudy.dek },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const position = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(position + 1) % caseStudies.length];
  const tocItems = caseStudy.sections.map(({ id, title }) => ({ id, title }));

  return (
    <>
      <article className={styles.article} aria-labelledby="case-title">
        <header className={`container ${styles.header}`}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/#work">← Selected work</Link>
          </nav>
          <p className="label">{caseStudy.eyebrow}</p>
          <h1 id="case-title" className={styles.title}>
            {caseStudy.title}
          </h1>
          <p className={styles.dek}>{caseStudy.dek}</p>

          <dl className={styles.facts}>
            <div>
              <dt>Project</dt>
              <dd>{project.name}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{caseStudy.role}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{caseStudy.team}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>
                {caseStudy.timeline}
                {caseStudy.status ? <span className={styles.status}>{caseStudy.status}</span> : null}
              </dd>
            </div>
            <div className={styles.factsWide}>
              <dt>Stack</dt>
              <dd>{project.stack.join(" · ")}</dd>
            </div>
            {project.links?.length ? (
              <div className={styles.factsWide}>
                <dt>Links</dt>
                <dd>
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener">
                      {link.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </header>

        <div className={`container ${styles.layout}`}>
          <Toc items={tocItems} />
          <div className={styles.body}>
            {caseStudy.sections.map((section, i) => (
              <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-h`}>
                <h2 id={`${section.id}-h`} className={styles.sectionTitle}>
                  <span className={styles.sectionIndex}>{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
          </div>
        </div>

        <nav aria-label="Next case study" className={`container ${styles.next}`}>
          <Link href={`/work/${next.slug}`} className={styles.nextLink}>
            <span className="label">Next case study</span>
            <span className={styles.nextTitle}>
              {next.caseStudy.title} <span aria-hidden="true">→</span>
            </span>
            <span className={styles.nextMeta}>{next.name}</span>
          </Link>
        </nav>
      </article>
      <Contact index="→" />
    </>
  );
}
