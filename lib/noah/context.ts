import type { MemorySnapshot, BuildOrder, RoadmapPhase, NoahContext } from "./types";
import { VISIONARY } from "./visionary";

export const ALL_PROJECTS = [
  "AYA",
  "Mission Control",
  "Menskompas",
  "Website",
  "Kwetsbaar Evenwicht",
  "Podcast",
  "House of Navutiita",
  "AI Business",
];

// Lower number = higher priority
export const PROJECT_PRIORITY: Record<string, number> = {
  "Mission Control":    1,
  "AYA":                2,
  "Website":            3,
  "Menskompas":         4,
  "Kwetsbaar Evenwicht":5,
  "Podcast":            6,
  "House of Navutiita": 7,
  "AI Business":        8,
};

export const BUILD_ORDERS: BuildOrder[] = [
  { number: 1,  title: "Executive Office landing page",        status: "done" },
  { number: 2,  title: "Dutch translation + Noah sidebar",     status: "done" },
  { number: 3,  title: "Typography, images, spacing polish",   status: "done" },
  { number: 4,  title: "Noah portrait, visual refinement",     status: "done" },
  { number: 5,  title: "Welcome animation sequence",           status: "done" },
  { number: 6,  title: "Precision Light design",               status: "done" },
  { number: 7,  title: "Daily briefing flow + project picker", status: "done" },
  { number: 8,  title: "localStorage memory",                  status: "done" },
  { number: 9,  title: "Architecture documentation",           status: "done" },
  { number: 10, title: "Company documentation",                status: "done" },
  { number: 11, title: "Noah Brain",                           status: "in-progress" },
];

export const ROADMAP: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Executive Office",
    goal: "Mission Control werkt als dagelijks planningsinstrument.",
    status: "in-progress",
  },
  {
    phase: 2,
    title: "Projects",
    goal: "Elk project wordt een levende ruimte in Mission Control.",
    status: "not-started",
  },
  {
    phase: 3,
    title: "Noah Brain",
    goal: "Noah wordt echt intelligent.",
    status: "not-started",
  },
  {
    phase: 4,
    title: "AI Team",
    goal: "Noah staat er niet alleen voor.",
    status: "not-started",
  },
];

function getTimeOfDay(): "morning" | "afternoon" | "evening" {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

function getToday(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

export function buildNoahContext(memory: MemorySnapshot): NoahContext {
  const recentCompletions = BUILD_ORDERS.filter((b) => b.status === "done").slice(-3);
  const activePhase = ROADMAP.find((r) => r.status === "in-progress") ?? ROADMAP[0];

  return {
    date: getToday(),
    timeOfDay: getTimeOfDay(),
    memory,
    recentCompletions,
    activePhase,
    allProjects: ALL_PROJECTS,
    visionary: VISIONARY,
  };
}
