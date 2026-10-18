export type Domain = {
  slug: string;
  name: string;
  description: string;
  accent: string;
  // Domain-specific questions. Empty until the questions are received.
  extraFields: never[];
};

// TODO: replace the placeholder descriptions when received.
// Accent colors are a first pick for Harshavi to adjust.
export const domains = [
  {
    slug: "events",
    name: "Events",
    description: "Plan and run E-Cell events, talks and competitions.",
    accent: "#fbbf24",
    extraFields: [],
  },
  {
    slug: "technical",
    name: "Technical",
    description: "Build the websites and tools that E-Cell runs on.",
    accent: "#38bdf8",
    extraFields: [],
  },
  {
    slug: "design",
    name: "Design",
    description: "Create posters, branding and the look of every E-Cell event.",
    accent: "#e879f9",
    extraFields: [],
  },
  {
    slug: "media",
    name: "Media",
    description: "Shoot photos and videos and tell the E-Cell story.",
    accent: "#fb7185",
    extraFields: [],
  },
  {
    slug: "publicity",
    name: "Publicity",
    description: "Spread the word on campus and on social media.",
    accent: "#4ade80",
    extraFields: [],
  },
] as const satisfies readonly Domain[];

export type DomainSlug = (typeof domains)[number]["slug"];

export function getDomain(slug: string) {
  return domains.find((d) => d.slug === slug);
}
