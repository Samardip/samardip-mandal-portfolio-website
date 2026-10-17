export type Link = { label: string; href: string };

export type FigureKey =
  | "embed-architecture"
  | "embed-handshake"
  | "embed-precedence"
  | "thinking-flow"
  | "thinking-pacing"
  | "wall-fade";

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; figure: FigureKey; caption: string }
  | {
      type: "decision";
      title: string;
      chose: string;
      over?: string;
      because: string;
      cost: string;
    }
  | { type: "code"; label: string; code: string }
  | { type: "note"; title?: string; text: string };

export type CaseStudySection = {
  id: string;
  title: string;
  blocks: Block[];
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  dek: string;
  role: string;
  team: string;
  timeline: string;
  status?: string;
  sections: CaseStudySection[];
};

export type ProjectVisual = "embed" | "thinking" | "walls";

export type Project = {
  slug: string;
  index: string;
  name: string;
  context: string;
  period: string;
  role: string;
  problem: string;
  ownership: string;
  challenge: string;
  decisions: string[];
  result: string;
  stack: string[];
  links?: Link[];
  visual?: ProjectVisual;
  caseStudy?: CaseStudy;
};

export type Attribution = "individual" | "team" | "product";

export type Metric = {
  value: string;
  label: string;
  detail: string;
  attribution: Attribution;
  source: string;
  bars?: { label: string; value: number; display: string }[];
  chips?: string[];
};
