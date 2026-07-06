export interface MemorySnapshot {
  projects: string[];
  ideas: string[];
  decisions: string[];
}

export interface BuildOrder {
  number: number;
  title: string;
  status: "done" | "in-progress" | "not-started";
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  goal: string;
  status: "done" | "in-progress" | "not-started";
}

export interface NoahContext {
  date: string;
  timeOfDay: "morning" | "afternoon" | "evening";
  memory: MemorySnapshot;
  recentCompletions: BuildOrder[];
  activePhase: RoadmapPhase;
  allProjects: string[];
}

// Internal scoring breakdown — not surfaced in the briefing, but useful for
// debugging and for the future AI layer to understand what drove the ranking.
export interface ScoreBreakdown {
  strategicImportance: number; // 0–10
  dependencies:        number; // 0–10
  momentum:            number; // 0–10
  userFocus:           number; // 0–10
  longTermValue:       number; // 0–10
  total:               number; // weighted composite
}

export interface NoahRecommendation {
  project:      string;
  whyItMatters: string; // what makes this project important
  whyNow:       string; // why today is the right moment
  nextAction:   string; // one concrete thing to do
  score:        ScoreBreakdown;
}

export interface NoahBriefing {
  greeting:        string;
  observations:    string[];
  recommendations: NoahRecommendation[];
  closingQuestion: string;
}
