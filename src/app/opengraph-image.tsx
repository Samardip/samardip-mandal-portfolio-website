import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${profile.name}: frontend engineer for AI products`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({
    eyebrow: `${profile.name} · ${profile.role}`,
    title: "Frontend for AI products that run in real time, inside other people's websites, and in 3D.",
    footer: "React · Next.js · TypeScript · Bengaluru",
  });
}
