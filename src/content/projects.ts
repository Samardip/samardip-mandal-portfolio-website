import { caseStudySlugs } from "./slugs";
import type { Project } from "./types";

const embedSdk: Project = {
  slug: "embed-sdk",
  index: "01",
  name: "REimagineHome Embed",
  context: "Embeddable AI staging widget for real-estate portals",
  period: "May – Aug 2026",
  role: "Frontend engineer · co-built with one other engineer",
  problem:
    "Real-estate portals want AI virtual staging on their listing pages without building an AI pipeline, a chat interface or a generation queue of their own.",
  ownership:
    "Built the first prototype alone, then co-built the production monorepo. Main author of the typed host–widget message contract, the config merge, the iframe lifecycle, the tenant registry, locale loading and analytics.",
  challenge:
    "The widget runs on pages we don't control. It has to look native in each partner's brand and language without breaking, or being broken by, the host page.",
  decisions: [
    "Moved from a Shadow DOM prototype to a sandboxed iframe on our own origin",
    "Kept the host-page loader to ~9 KB gzipped; the Preact app loads only when opened",
    "Typed, namespaced postMessage contract with origin and source checks on both sides",
    "Shared logic with per-tenant UI modules, lazy-loaded by organization slug",
  ],
  result:
    "Shipped a white-label default UI and a custom Otodom UI in Polish, with five locales and per-partner branding driven by configuration.",
  stack: ["TypeScript", "Preact", "Vite", "esbuild / tsup", "postMessage", "WebSockets", "npm workspaces"],
  links: [
    {
      label: "Otodom widget demo",
      href: "https://otodom-reimagine-widget.vercel.app/listing/property-4",
    },
  ],
  visual: "embed",
  caseStudy: {
    eyebrow: "Case study · Embeddable SDK",
    title: "A white-label AI widget for pages we don't control",
    dek: "Real-estate portals add REimagineHome Embed with one script tag and a publishable key. Their visitors get AI virtual staging in a full-screen widget that looks native on the partner's site. This is how we kept it small, isolated and configurable.",
    role: "Frontend engineer. Built the prototype alone, then co-built production with one other engineer.",
    team: "2 frontend engineers, backend team, partner integrations",
    timeline: "May – Aug 2026",
    sections: [
      {
        id: "context",
        title: "Context and problem",
        blocks: [
          {
            type: "p",
            text: "Portals want buyers to see a listing's rooms restyled by AI. They don't want to build an AI pipeline, a chat interface or a generation queue to get it. With REimagineHome Embed, a partner adds a script tag and a publishable key and passes in the listing's photos. Visitors then pick a style or chat with an AI designer and get staged images back.",
          },
          {
            type: "p",
            text: "For the frontend, the hard part is that the widget lives on a site we don't own. It has to wear the partner's brand and language, and it can't break the partner's page or be broken by it.",
          },
        ],
      },
      {
        id: "constraints",
        title: "Constraints and requirements",
        blocks: [
          {
            type: "list",
            items: [
              "Unknown host pages: any framework, any global CSS, any third-party script.",
              "A small footprint on the partner's page. The full app should download only when a visitor opens it.",
              "Per-partner branding, fonts, copy and features, without forking the app for each partner.",
              "Messaging between two origins, where neither side can trust incoming messages blindly.",
              "Clean teardown: closing must restore the host page and still deliver the final analytics events.",
              "Desktop and mobile, plus one partner (Otodom) that needed a fully custom UI in Polish.",
            ],
          },
        ],
      },
      {
        id: "responsibilities",
        title: "My responsibilities",
        blocks: [
          {
            type: "p",
            text: "I built the first prototype alone in May 2026: a Preact widget bundled with Rollup, with chat, a compare slider and WebSocket integration. From June to August I co-built the production monorepo with one other engineer. In the production code I was the main author of:",
          },
          {
            type: "list",
            items: [
              "The typed message contract shared by the loader and the app, and most of the loader's postMessage bridge.",
              "The config merge that combines organization settings with host-page overrides.",
              "The iframe lifecycle: URL construction, open and close animation, scroll lock and Escape handling.",
              "The tenant registry and, together with my teammate, the Otodom tenant UI.",
              "On-demand locale loading and the analytics module.",
            ],
          },
          {
            type: "note",
            title: "Credit where it's due",
            text: "My teammate owned most of the WebSocket client: reconnection with backoff and jitter, heartbeats, and recovery when the browser comes back online. He also wrote much of the loader's setup code.",
          },
        ],
      },
      {
        id: "architecture",
        title: "Architecture and decisions",
        blocks: [
          {
            type: "figure",
            figure: "embed-architecture",
            caption:
              "The loader runs on the partner's page and creates a session. It then opens an iframe on the widget's own origin. The two sides talk only through typed postMessage events. Generation progress reaches the app over a WebSocket.",
          },
          {
            type: "decision",
            title: "Iframe over Shadow DOM",
            chose: "A thin loader on the host page that opens a full-screen iframe served from our own origin.",
            over: "Rendering the widget into a Shadow DOM root on the host page. My prototype started this way, and I removed it.",
            because:
              "Shadow DOM isolates styles, but not scripts, storage or network. The widget's API calls, WebSocket and images would still run inside the partner's page. The iframe moved all of that onto the widget's origin.",
            cost: "Messaging across origins, an extra document to load, and coordinating scroll and focus between two windows.",
          },
          {
            type: "decision",
            title: "A thin loader and a separate app",
            chose:
              "A loader built with esbuild as a minified ES2019 IIFE. It only creates the session and the iframe. The Preact + Vite app loads inside the iframe.",
            over: "Shipping the whole widget as a single script on the host page.",
            because:
              "Partners pay for the loader on every page view, but the app downloads only when a visitor opens the widget. A branded loading card appears right away while the session is being created.",
            cost: "Two build pipelines, plus a shared package that both have to stay in sync with.",
          },
          {
            type: "figure",
            figure: "embed-handshake",
            caption:
              "Startup handshake. The app asks for its config only once it has booted, so the loader never posts into a frame that isn't listening yet.",
          },
          {
            type: "decision",
            title: "A typed, namespaced message contract",
            chose:
              "Every message is defined once in a shared package, prefixed `reih:`, and checked with an `isReihMessage` guard. The loader accepts messages only from the app's origin and only from its own iframe's window. The app accepts messages only from the parent origin.",
            because:
              "The loader passes the parent origin explicitly in the iframe URL, because the referrer can be stripped. Without that, the app couldn't reliably target or validate its messages.",
            cost: "The contract is effectively a public API. The loader is published to npm, so message changes have to stay backward compatible.",
          },
          {
            type: "code",
            label: "Loader-side guard (simplified)",
            code: `const onMessage = (event: MessageEvent) => {
  if (event.origin !== appOrigin) return;
  if (event.source !== iframe.contentWindow) return;
  if (!isReihMessage(event.data)) return;

  switch (event.data.type) {
    case "reih:ready":   return postToApp(buildInit(config));
    case "reih:close":   return close();
    case "reih:destroy": return destroy();
    case "reih:error":   return config.onError?.(event.data);
  }
};`,
          },
          {
            type: "decision",
            title: "Organization defaults, host overrides",
            chose:
              "The organization's dashboard settings are the defaults, and a partner can override them per page. The merge rules are explicit, not just a deep spread.",
            because:
              "A deep spread produces surprising results. With these rules, a partner who sets only a color doesn't wipe out the organization's font, and uploads can't be switched on by accident.",
            cost: "Every new field needs a merge rule decided for it, not just a default value.",
          },
          {
            type: "figure",
            figure: "embed-precedence",
            caption:
              "How the init payload is built. Later layers win, with the exceptions listed.",
          },
          {
            type: "decision",
            title: "Shared logic, per-tenant UI",
            chose:
              "A registry that lazy-loads a tenant's UI module by organization slug and falls back to the default UI. All tenants share the session, messaging, i18n and analytics core.",
            over: "Configuration only, or forking the app for each large partner.",
            because:
              "Otodom needed layouts that config alone couldn't express. A fork, though, would split every bug fix in two. Code-splitting also means a partner never downloads another partner's interface.",
            cost: "Tenant modules have to stay thin. Anything shared belongs in the core, which takes discipline in code review.",
          },
        ],
      },
      {
        id: "performance",
        title: "Performance and reliability",
        blocks: [
          {
            type: "list",
            items: [
              "Only en-US ships in the main bundle. Each other locale is a separate chunk, fetched once and cached. `pl` resolves to `pl-PL`, and unknown languages fall back to en-US.",
              "Tenant UIs are code-split, so each partner downloads only its own interface.",
              "Closing waits for the slide-out `transitionend` event, with a timer as a fallback, so a missed event can't leave the host page scroll-locked. The previous `overflow` value is restored.",
              "Analytics events sent during teardown use `fetch` with `keepalive`, so they still complete after the iframe is removed.",
              "Fixed a race where switching photos during a generation left the new photo unloaded and the old style still selected.",
              "In the prototype, the WebSocket connects only after the widget has loaded, not as soon as the script runs.",
            ],
          },
        ],
      },
      {
        id: "validation",
        title: "Testing and validation",
        blocks: [
          {
            type: "p",
            text: "To be honest, the widget doesn't have an automated test suite yet. We validated it with:",
          },
          {
            type: "list",
            items: [
              "A demo host page inside the monorepo that embeds the built loader exactly the way a partner would.",
              "TypeScript project references (`tsc -b`) that type-check the loader, the app and the shared contract together.",
              "An environment badge in non-production builds, so QA always knows which backend they're testing against.",
              "Integration checks by the team inside React, Next.js and Angular host apps.",
            ],
          },
          {
            type: "p",
            text: "What I would add first: contract tests for every message type, and a Playwright suite against the demo host covering open, close, destroy and language switching.",
          },
        ],
      },
      {
        id: "results",
        title: "Results and lessons",
        blocks: [
          {
            type: "list",
            items: [
              "Shipped a custom Otodom tenant UI in Polish alongside the default white-label UI.",
              "Five locales. Branding, fonts, copy and feature flags come from configuration, so only partners who need a custom layout require new code.",
              "Loader size measured from a production build: 26.3 KB minified, about 9 KB gzipped.",
            ],
          },
          {
            type: "p",
            text: "Lesson: when you don't control the page, isolation is worth paying for. The cost moves into the message contract, and a contract can be typed, reviewed and versioned. Bugs caused by a host page's CSS or scripts can't.",
          },
        ],
      },
    ],
  },
};

const aiDesignStudio: Project = {
  slug: "ai-design-studio",
  index: "02",
  name: "REimagineHome agentic design chat",
  context: "Core AI interior-design app",
  period: "Apr 2025 – Aug 2026",
  role: "Frontend engineer · one of the main contributors",
  problem:
    "Users redesign rooms by chatting with an AI designer. Each generation takes time, and the agent's reasoning arrives as one block of text.",
  ownership:
    "Built the thinking-stream interface end to end, plus the photo quality-check flow, pricing and upgrade flows, voice input, and a run of production reliability fixes.",
  challenge:
    "Make the wait readable. The reveal has to finish in step with the generation, whatever the length of the text, and survive reloads and back-to-back generations.",
  decisions: [
    "Pace the reveal to a total time budget, not a fixed typing speed",
    "First steps reveal fast, later steps slower, using per-step weights",
    "Bold labels in the agent's output become live progress steps",
    "Reveal position saved per photo, so a reload resumes the stream mid-way",
  ],
  result:
    "Shipped as part of the core chat experience. The time budget is configurable, so it can be retuned per AI model without code changes.",
  stack: ["Next.js", "JavaScript", "Redux Toolkit", "React Query", "RxJS", "WebSockets", "Sentry", "MUI"],
  links: [{ label: "reimaginehome.ai", href: "https://www.reimaginehome.ai" }],
  visual: "thinking",
  caseStudy: {
    eyebrow: "Case study · AI product interface",
    title: "Designing for the wait",
    dek: "REimagineHome's core app lets people redesign their rooms by chatting with an AI designer. A generation takes time. I built the interface that turns the agent's reasoning into something people can follow while they wait, and I spent much of the rest of my time keeping the app steady on real users' devices.",
    role: "Frontend engineer on the core app, one of the main contributors",
    team: "Frontend, backend, AI and QA teams",
    timeline: "Apr 2025 – Aug 2026",
    sections: [
      {
        id: "context",
        title: "Context and problem",
        blocks: [
          {
            type: "p",
            text: "In REimagineHome 2.0, users upload photos of a room and redesign it through a chat with an AI agent. While a generation runs, the backend sends the agent's reasoning, its \"thoughts\", over a WebSocket. The thoughts are markdown, and each step starts with a bold label.",
          },
          {
            type: "p",
            text: "Showing that block all at once is unreadable, and it leaves the rest of the wait empty. Typing it out at a fixed speed doesn't work either: depending on the length of the text, it finishes long before the image or lags well behind it.",
          },
        ],
      },
      {
        id: "constraints",
        title: "Constraints",
        blocks: [
          {
            type: "list",
            items: [
              "Text length varies a lot from one generation to the next.",
              "Different AI models generate at different speeds.",
              "Users reload, switch tabs, or start a new generation in the middle of a stream.",
              "The chat already handles uploads, generations, shoppable bundles and follow-ups, so the stream can't take over the conversation.",
            ],
          },
        ],
      },
      {
        id: "responsibilities",
        title: "My responsibilities",
        blocks: [
          {
            type: "p",
            text: "I wrote the thinking-stream component end to end: pacing, progress steps, persistence, scrolling, and how it fits into the chat. Over 16 months on the core app I also built:",
          },
          {
            type: "list",
            items: [
              "The photo quality-check flow: an AI quality report, per-photo flags, and a batch \"Fix all\" pipeline.",
              "Pricing tiers, upgrade popups and Paddle checkout, protected by Cloudflare Turnstile.",
              "Voice input in the chat, disabled while an image is generating.",
              "Shoppable product bundles in the chat, and an onboarding flow.",
              "A steady stream of production fixes, covered under reliability below.",
            ],
          },
        ],
      },
      {
        id: "approach",
        title: "Approach and decisions",
        blocks: [
          {
            type: "figure",
            figure: "thinking-flow",
            caption:
              "Thoughts arrive over the WebSocket and land in the Redux store. The component reveals them on a schedule and saves its position after each step.",
          },
          {
            type: "decision",
            title: "Pace to a time budget, not a typing speed",
            chose:
              "Give the whole stream a total duration, read from an environment variable (default 14.5 seconds). After each character, the next delay is the remaining time multiplied by the current step's weight, divided by the sum of the remaining weights.",
            over: "A constant number of milliseconds per character.",
            because:
              "The delay is recomputed from wall-clock time on every tick. Timer drift corrects itself, and the stream ends on budget however long the text is. Because the budget lives in configuration, it can be tuned to each model's speed without changing code.",
            cost: "The budget is an estimate of generation time. If a model slows down, someone has to retune it.",
          },
          {
            type: "figure",
            figure: "thinking-pacing",
            caption:
              "Per-step weights. The first two steps reveal fastest, so users see activity immediately; later steps slow down to fill the wait.",
          },
          {
            type: "code",
            label: "Delay after each character (simplified)",
            code: `const weight = (step: number) => (step <= 2 ? 1 : step === 3 ? 2 : 4);

function nextDelay(text: string, shown: number, startedAt: number, budgetMs: number) {
  const remainingMs = Math.max(0, budgetMs - (Date.now() - startedAt));
  const remainingWeight = sumWeightsFrom(text, shown); // weight of every char still to show
  return (remainingMs * weight(stepAt(text, shown))) / remainingWeight;
}`,
          },
          {
            type: "decision",
            title: "Turn labels into progress",
            chose:
              "Parse the bold labels out of the revealed text and show them as steps: finished steps get a check mark, the current one is highlighted. When the stream ends, it collapses into an expandable summary.",
            because:
              "Users can see how far the agent has got without reading every word, and the finished conversation stays compact.",
            cost: "The UI relies on the model keeping its bold-label format. Text without labels falls back to a generic \"Thinking…\" state.",
          },
          {
            type: "decision",
            title: "Survive reloads and new generations",
            chose:
              "Save the reveal position to localStorage for each photo, and resume from it on reload. Only the latest thoughts message in a conversation is allowed to stream.",
            because:
              "Before these fixes, a reload during generation restarted or dropped the stream. Starting a new generation could also set several old messages streaming at once.",
            cost: "Small, per-photo localStorage state that has to be cleared once the stream finishes.",
          },
          {
            type: "note",
            title: "The honest framing",
            text: "This is a perceived-latency decision. The text is the model's real output; only the pace at which it appears is controlled. Auto-scroll follows the stream unless the user has scrolled away to read something else.",
          },
        ],
      },
      {
        id: "quality-check",
        title: "Quality check and \"Fix all\"",
        blocks: [
          {
            type: "p",
            text: "Real-estate photos often have problems the AI can fix. I built the flow end to end: the AI flags photos, a quality report lists them, and \"Fix all\" sends them for repair in one batch.",
          },
          {
            type: "list",
            items: [
              "Polling while the batch runs, with a separate processing state for each photo.",
              "Credit checks before the batch starts, with a purchase prompt when the user doesn't have enough credits.",
              "Guards so a photo that is already processing or already fixed is never sent again.",
              "Navigation to the chat is blocked from the report while a generation is running.",
            ],
          },
        ],
      },
      {
        id: "reliability",
        title: "Reliability on real devices",
        blocks: [
          {
            type: "list",
            items: [
              "Added a Sentry `beforeSend` filter to cut browser noise, then fixed the real errors that became visible.",
              "Polyfilled `findLast` and `findLastIndex` for older browsers.",
              "Detected HEIC photos mislabelled as JPEG, and checked that a blob URL actually renders before showing it.",
              "Fixed generations appearing twice when the WebSocket and the polling fallback both delivered the same output.",
              "Added an inline \"reconnecting\" status, and skipped media fetches while the browser is offline.",
              "Fixed scroll-to-latest breaking when users ran the page through Google Translate.",
            ],
          },
        ],
      },
      {
        id: "validation",
        title: "Testing and validation",
        blocks: [
          {
            type: "p",
            text: "Validation was manual QA on staging with the QA team, followed by Sentry monitoring in production. There are no automated tests for this feature. The pacing and label helpers are pure, exported functions, so they're the obvious first candidates for unit tests.",
          },
        ],
      },
      {
        id: "results",
        title: "Results and lessons",
        blocks: [
          {
            type: "p",
            text: "The thinking stream shipped as part of the core chat for both free-trial and paid users. REimagineHome reports more than 2 million users. That's a product-level number, and I don't attribute engagement changes to this feature, because I don't have an experiment I can cite.",
          },
          {
            type: "p",
            text: "Lesson: in AI products, the wait is part of the interface. Pacing, progress and recovery from a reload matter as much as the result that comes at the end.",
          },
        ],
      },
    ],
  },
};

const photosTo3d: Project = {
  slug: "photos-to-3d",
  index: "03",
  name: "Room Studio: photos to 3D",
  context: "REimagineHome's photos-to-3D flow",
  period: "Sep 2026 – present",
  role: "Frontend engineer · set up the app, contributor to the shared 3D engine",
  problem:
    "Users upload photos of a room, the backend reconstructs it in 3D, and they explore and redesign it in the browser.",
  ownership:
    "Set up the Next.js + TypeScript app, Cognito sign-in, the upload and analysis flow, and the room-to-3D job pipeline. Contributed the camera's wall cut-away to the shared Three.js engine.",
  challenge:
    "In orbit view, walls between the camera and the room hide it. Hiding them instantly makes walls pop, and a single threshold makes walls near the edge flicker.",
  decisions: [
    "Each wall gets its own material, so it can fade independently",
    "Hysteresis: cut past one threshold, restore past a looser one",
    "Frame-rate-independent easing, k = 1 − e^(−12·dt)",
    "The engine keeps rendering only until every wall has settled",
  ],
  result: "In active development. The pipeline loads generated rooms into the viewer, and walls now fade smoothly instead of popping while orbiting.",
  stack: ["Next.js App Router", "TypeScript", "Three.js", "Redux Toolkit", "WebSockets", "AWS Cognito"],
  visual: "walls",
  caseStudy: {
    eyebrow: "Case study · 3D interface",
    title: "Making a 3D room camera feel calm",
    dek: "Room Studio turns photos of a room into a 3D model that users can explore and redesign. I set up the app and the generation pipeline, and then solved a small but very visible problem: walls getting in the way of the camera.",
    role: "Frontend engineer. Set up the app; contributor to the shared 3D engine.",
    team: "Frontend engineers sharing one Three.js engine, plus backend and 3D pipeline teams",
    timeline: "Sep 2026 – present",
    status: "In active development",
    sections: [
      {
        id: "context",
        title: "Context",
        blocks: [
          {
            type: "p",
            text: "Users upload photos of a room. The backend analyzes them and reconstructs the room, and the browser shows it as a 3D model that users can orbit and redesign. The product hasn't launched yet, so this page describes engineering decisions rather than outcomes.",
          },
        ],
      },
      {
        id: "responsibilities",
        title: "My responsibilities",
        blocks: [
          {
            type: "list",
            items: [
              "Set up the Next.js (App Router) + TypeScript project.",
              "Cognito sign-in: Google, email and password, and password reset.",
              "The upload and photo-analysis pages, and the project dashboard.",
              "The room-to-3D job pipeline: API client, Redux slice, WebSocket message routing, and loading generated rooms from the scene package.",
              "Camera work in the shared Three.js engine, including the wall cut-away described below.",
            ],
          },
        ],
      },
      {
        id: "problem",
        title: "The wall problem",
        blocks: [
          {
            type: "p",
            text: "In orbit (\"dollhouse\") view, the walls nearest the camera block the room. The first version hid any wall standing between the camera and the room. That worked, but walls popped in and out. Walls close to the threshold also flickered as the camera moved, because every small movement flipped the decision.",
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "figure",
            figure: "wall-fade",
            caption:
              "Walls facing the camera fade out; the rest stay visible. A wall is cut once its facing score passes 0.5, and comes back only after it drops below 0.3. That gap is what stops the flicker.",
          },
          {
            type: "decision",
            title: "Hysteresis instead of a single threshold",
            chose:
              "Two thresholds for each test. A wall is cut once its facing score passes 0.5, and restored only when it drops below 0.3. The \"behind the camera\" test works the same way, with a ±0.05 margin.",
            because: "A wall sitting right at the boundary no longer flips state every frame.",
            cost: "Two numbers to tune instead of one, and the cut-away reacts slightly later.",
          },
          {
            type: "decision",
            title: "Fade, with easing that ignores frame rate",
            chose:
              "Each wall's opacity moves toward its target by k = 1 − e^(−12·dt) every frame. Each wall has its own materials, so walls fade independently, and sub-walls follow their parent wall.",
            because: "The fade feels the same at 30 fps and at 120 fps, and walls no longer pop.",
            cost: "Materials have to be cloned per wall, and their original look kept so it can be restored.",
          },
          {
            type: "code",
            label: "Per-frame wall fade (simplified)",
            code: `const k = 1 - Math.exp(-dt * 12);           // same feel at any frame rate
for (const wall of walls) {
  const target = cut.has(wall.id) ? 0 : 1;
  let f = fade.get(wall.id) ?? 1;
  f += (target - f) * k;
  if (Math.abs(target - f) < 0.005) f = target; else stillFading = true;
  setWallOpacity(wall.id, f);
}`,
          },
          {
            type: "decision",
            title: "Pay the transparency cost only while fading",
            chose:
              "A material switches to transparent only while its opacity is below 1, and stops writing depth below 50%. The camera exposes a `fading` flag, so the engine keeps rendering until every wall has settled, then stops.",
            because:
              "Three.js recompiles a material's shader when it switches between opaque and transparent, so a settled scene should stay opaque. Rendering only while something is changing keeps an idle studio from using the GPU.",
            cost: "More state to manage: the original look of every material and the fade progress of every wall.",
          },
        ],
      },
      {
        id: "validation",
        title: "Validation and next steps",
        blocks: [
          {
            type: "p",
            text: "Validation so far: TypeScript checks and manual review across the generated rooms. Before launch I want to measure frame rate during orbiting on mid-range phones, and add tests for the pipeline's job states.",
          },
        ],
      },
    ],
  },
};

const dormtok: Project = {
  slug: "dormtok",
  index: "04",
  name: "DormTok",
  context: "Social platform for AI room-makeover videos",
  period: "Jul – Aug 2026",
  role: "Frontend engineer · bootstrapped the app, co-built with a teammate",
  problem: "A consumer product built around AI-generated dorm-room makeover videos, with shoppable product registries for the room.",
  ownership:
    "Bootstrapped the Next.js + TypeScript app and built upload, credits and WebSocket integration, Cognito route guards with token refresh, and the registry flow with Amazon and Walmart checkout.",
  challenge: "Fast consumer iteration: pricing tiers, sign-up guards and checkout changed week to week.",
  decisions: [
    "HEIC/HEIF photos converted to PNG in the browser during upload",
    "Device ID moved from localStorage to cookies, so it survives sign-in",
    "Polling for registry and bundle status, with cached responses bypassed while a status is pending",
  ],
  result: "Shipped publicly, with Google Tag Manager and Clarity analytics and a password-protected internal analytics dashboard.",
  stack: ["Next.js", "TypeScript", "React Query", "Redux Toolkit", "WebSockets", "Cognito"],
  links: [{ label: "dormtok.reimaginehome.ai", href: "https://dormtok.reimaginehome.ai" }],
};

const smartMedia: Project = {
  slug: "smart-media-module",
  index: "05",
  name: "Smart Media Module",
  context: "AI listing-photo compliance editor",
  period: "Mar – Jul 2025",
  role: "Frontend engineer (SDE I)",
  problem: "Real-estate agents need listing photos that are compliant and marketing-ready, with AI doing the edits.",
  ownership:
    "Built the compliance editor: a draw and erase mask toolbar, generation-workflow state, and selection of AI outputs for review.",
  challenge: "Long-running AI workflows where WebSocket updates could be missed.",
  decisions: [
    "Long-polling fallback for WebSocket media updates, so long-running workflows still complete",
    "Generation workflow modelled in a Redux reducer, with an explicit processing state for each output",
  ],
  result: "My first product at Styldod, and the foundation of the real-time patterns I reused later.",
  stack: ["Next.js", "Redux Toolkit", "GraphQL (Apollo)", "WebSockets", "MUI"],
};

export const projects: Project[] = [embedSdk, aiDesignStudio, photosTo3d, dormtok, smartMedia];

export const caseStudies = projects.filter(
  (project): project is Project & { caseStudy: NonNullable<Project["caseStudy"]> } =>
    (caseStudySlugs as readonly string[]).includes(project.slug) && Boolean(project.caseStudy),
);

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
