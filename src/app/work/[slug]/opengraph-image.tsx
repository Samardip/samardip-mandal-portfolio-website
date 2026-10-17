import { caseStudies, getCaseStudy } from "@/content/projects";
import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  return renderOgImage({
    eyebrow: project ? project.caseStudy.eyebrow : "Case study",
    title: project ? project.caseStudy.title : profile.name,
    footer: project ? `${project.name} · ${profile.name}` : profile.role,
  });
}
