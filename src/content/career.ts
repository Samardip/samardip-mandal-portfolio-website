import type { Metric } from "./types";

export const metrics: Metric[] = [
  {
    value: "~9 KB",
    label: "Embed loader, gzipped",
    detail: "The only code that runs on a partner's page until a visitor opens the widget. It's 26.3 KB minified.",
    attribution: "team",
    source: "Measured from a production build, Oct 2026",
    bars: [
      { label: "Minified", value: 26.3, display: "26.3 KB" },
      { label: "Gzipped", value: 9, display: "~9 KB" },
    ],
  },
  {
    value: "5",
    label: "Products shipped at Styldod",
    detail: "All since January 2025, including two apps I set up from scratch.",
    attribution: "individual",
    source: "From commit history",
    chips: ["Smart Media Module", "REimagineHome core app", "Embed SDK", "DormTok", "Room Studio"],
  },
  {
    value: "5",
    label: "Widget locales",
    detail: "Only the requested locale is downloaded, and en-US is the inline fallback.",
    attribution: "individual",
    source: "From the widget source",
    chips: ["en-US", "en-GB", "de", "es-ES", "pl-PL"],
  },
  {
    value: "8",
    label: "Typed host–widget messages",
    detail: "One shared contract, with origin checks on both sides and an origin-and-source check on the host page.",
    attribution: "individual",
    source: "From the widget source",
  },
];

export const productReach: Metric[] = [
  {
    value: "2M+",
    label: "REimagineHome users",
    detail: "Reach of the product I build frontend for. This is not an individual result.",
    attribution: "product",
    source: "Company-reported",
  },
  {
    value: "3M+",
    label: "AI generations",
    detail: "Product-level generation volume for REimagineHome. This is not an individual result.",
    attribution: "product",
    source: "Company-reported",
  },
];

export type ExpertiseArea = {
  title: string;
  summary: string;
  tools: string[];
  evidence: { label: string; href: string };
};

export const expertise: ExpertiseArea[] = [
  {
    title: "Frontend architecture",
    summary:
      "Monorepos with shared types, per-tenant UI modules on a shared core, and config merge rules that are explicit instead of a deep spread.",
    tools: ["npm workspaces", "Code splitting", "Typed contracts"],
    evidence: { label: "Embed SDK", href: "/work/embed-sdk#architecture" },
  },
  {
    title: "React and Next.js",
    summary:
      "Production Next.js apps from scratch to launch, plus a Preact app small enough to embed in other sites.",
    tools: ["React", "Next.js (App Router)", "Preact", "Vite"],
    evidence: { label: "Room Studio", href: "/work/photos-to-3d#responsibilities" },
  },
  {
    title: "TypeScript and JavaScript",
    summary:
      "TypeScript for new codebases and shared contracts, and years of work in a large JavaScript codebase.",
    tools: ["TypeScript", "JavaScript (ES2019+)", "tsc project references"],
    evidence: { label: "Message contract", href: "/work/embed-sdk#architecture" },
  },
  {
    title: "State and data",
    summary:
      "Server state with React Query, app and workflow state with Redux Toolkit, event streams with RxJS, and GraphQL where the backend called for it.",
    tools: ["Redux Toolkit", "React Query", "RxJS", "Apollo GraphQL", "REST"],
    evidence: { label: "Smart Media Module", href: "/#work" },
  },
  {
    title: "Real-time systems",
    summary:
      "WebSocket-driven generation status, polling and long-polling fallbacks, reconnection states, and de-duplicating messages that arrive twice.",
    tools: ["WebSockets", "Long polling", "Job pipelines"],
    evidence: { label: "Reliability fixes", href: "/work/ai-design-studio#reliability" },
  },
  {
    title: "AI product interfaces",
    summary:
      "Agent reasoning streams, chat-driven design, quality checks and generation states: the parts of an AI product users actually wait on.",
    tools: ["Streaming UI", "Chat UX", "Generation states"],
    evidence: { label: "Designing for the wait", href: "/work/ai-design-studio" },
  },
  {
    title: "Performance",
    summary:
      "Small host-side bundles, locales and tenant UIs loaded on demand, frame-rate-independent animation, and rendering only while something is changing.",
    tools: ["Bundle size", "Lazy loading", "Render on demand"],
    evidence: { label: "Wall fade", href: "/work/photos-to-3d#approach" },
  },
  {
    title: "3D and graphics",
    summary:
      "Camera behavior and material handling in a shared Three.js engine. Earlier, interactive 3D data visualization with A-Frame.",
    tools: ["Three.js", "A-Frame"],
    evidence: { label: "Room Studio", href: "/work/photos-to-3d" },
  },
  {
    title: "Reliability and observability",
    summary:
      "Sentry triage and noise filtering, polyfills for older browsers, handling mislabelled image formats, and product analytics instrumentation.",
    tools: ["Sentry", "PostHog", "Google Tag Manager", "Clarity"],
    evidence: { label: "Real devices", href: "/work/ai-design-studio#reliability" },
  },
];

export type SkillGroup = { title: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js (App Router)", "Preact", "React Native"],
  },
  {
    title: "Styling and UI",
    skills: ["Material UI", "Emotion", "SCSS", "Tailwind CSS", "CSS Modules", "Responsive, mobile-first UI"],
  },
  {
    title: "State and data",
    skills: [
      "Redux Toolkit",
      "React Query (TanStack Query)",
      "RxJS",
      "REST",
      "GraphQL (Apollo Client)",
      "WebSockets",
      "Polling and long polling",
    ],
  },
  {
    title: "3D and graphics",
    skills: ["Three.js", "A-Frame"],
  },
  {
    title: "SDKs and platform",
    skills: [
      "iframe SDKs",
      "postMessage",
      "Multi-tenant white-label config",
      "i18n (next-intl)",
      "npm workspaces",
      "Code splitting",
      "PWA",
    ],
  },
  {
    title: "Build and deploy",
    skills: ["Vite", "esbuild", "tsup", "Rollup", "Vercel", "Git"],
  },
  {
    title: "Observability and analytics",
    skills: ["Sentry", "PostHog", "Google Tag Manager", "Microsoft Clarity"],
  },
  {
    title: "Auth and payments",
    skills: ["AWS Cognito", "Paddle", "Cloudflare Turnstile", "Firebase push notifications"],
  },
];

export type Principle = { title: string; body: string };

export const principles: Principle[] = [
  {
    title: "Design for the wait.",
    body: "AI products spend a lot of their time working. Pacing the agent's reasoning, showing a branded loading card before the iframe is ready, and an honest \"reconnecting\" state all do more for perceived quality than another feature.",
  },
  {
    title: "Isolate what you don't control.",
    body: "On a partner's page I'd rather pay for an iframe and a typed message contract than debug someone else's global CSS. A contract can be reviewed and versioned; a host page can't.",
  },
  {
    title: "Make defaults safe and overrides explicit.",
    body: "Uploads in the widget need an explicit opt-in from the host. Fonts change only when the host sets one deliberately. Unknown languages fall back to en-US. Each override is a decision someone made on purpose.",
  },
  {
    title: "Real devices are messy.",
    body: "HEIC files labelled as JPEG, browsers missing `findLast`, Google Translate rewriting the DOM. Some of my most useful work has been finding these in Sentry and fixing them properly.",
  },
  {
    title: "Measure before you claim.",
    body: "The bundle size on this site comes from a real build. Where I don't have a number, I describe the decision and its trade-off instead of making one up.",
  },
];

export type Role = {
  title: string;
  period: string;
  note?: string;
};

export type Job = {
  company: string;
  location: string;
  period: string;
  roles: Role[];
  summary: string;
  highlights: string[];
};

export const jobs: Job[] = [
  {
    company: "Styldod",
    location: "Bengaluru",
    period: "Jan 2025 – Present",
    roles: [
      { title: "Member of Technical Staff, Frontend", period: "Current", note: "Promoted" },
      { title: "Software Development Engineer I, Frontend", period: "Joined Jan 2025" },
    ],
    summary:
      "AI products for real estate and interior design. My scope grew from a single editor to frontend work across five products, including setting up new apps from scratch.",
    highlights: [
      "2025: built the Smart Media Module compliance editor, then joined the REimagineHome core app (thinking stream, quality check, pricing, reliability).",
      "2026: built the Embed SDK prototype and co-built production; bootstrapped DormTok; set up Room Studio (photos to 3D).",
      "Lead frontend architecture and code reviews across these products, and mentor engineers on the team.",
    ],
  },
  {
    company: "Global IDs",
    location: "Kolkata",
    period: "Jun 2023 – Dec 2024",
    roles: [{ title: "Software Developer", period: "Jun 2023 – Dec 2024" }],
    summary: "Enterprise data management and visualization.",
    highlights: [
      "Built an interactive 3D data-visualization interface with React and A-Frame.",
      "Refactored legacy frontend modules into reusable React components, and consolidated metadata visualizations into a single dashboard.",
    ],
  },
  {
    company: "Tale Wallet (NFTVerse)",
    location: "Bengaluru",
    period: "Sep 2022 – May 2023",
    roles: [{ title: "Associate Software Engineer", period: "Sep 2022 – May 2023" }],
    summary: "Cross-chain crypto wallet and NFT marketplace.",
    highlights: [
      "Built the React frontend of the wallet on Algorand, plus an NFT marketplace that works on web and mobile as a PWA.",
      "Built Android apps with React Native and TypeScript, with Firebase notifications.",
    ],
  },
];

export const earlier =
  "Before that: Programmer Analyst Trainee at Cognizant (2022), and frontend internships at Tekie and Kritin Digital Solutions (2021–22).";

export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "RCC Institute of Information Technology, Kolkata",
  period: "2018 – 2022",
  grade: "CGPA 8.98 / 10",
};

export const achievements = [
  "CodeChef 4★, max rating 1803",
  "Google Code Jam 2021, qualified",
];
