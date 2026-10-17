import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Principles } from "@/components/sections/Principles";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Skills } from "@/components/sections/Skills";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.currentTitle,
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.links.linkedin, profile.links.github],
  knowsAbout: ["React", "Next.js", "TypeScript", "Frontend architecture", "WebSockets", "Three.js"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <SelectedWork />
      <Impact />
      <Expertise />
      <Skills />
      <Principles />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
