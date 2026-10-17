export const profile = {
  name: "Samardip Mandal",
  shortName: "Samardip",
  role: "Frontend Engineer",
  currentTitle: "Member of Technical Staff, Frontend",
  company: "Styldod",
  location: "Bengaluru, India",
  email: "samardipmandal.kgp@gmail.com",
  resume: "/Samardip_Mandal_Resume.pdf",
  links: {
    github: "https://github.com/Samardip",
    linkedin: "https://www.linkedin.com/in/samardipmandal/",
  },
  description:
    "Frontend engineer building AI product experiences in React, Next.js and TypeScript: an embeddable AI widget for real-estate portals, real-time agentic chat, and a photos-to-3D room studio.",
  focus: ["React", "Next.js", "TypeScript", "WebSockets", "Three.js"],
} as const;

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Impact", href: "/#impact" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
] as const;
