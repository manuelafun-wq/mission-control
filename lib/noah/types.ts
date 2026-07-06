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

export interface ScoreBreakdown {
  strategicImportance: number;
  dependencies:        number;
  momentum:            number;
  userFocus:           number;
  longTermValue:       number;
  total:               number;
}

export interface NoahRecommendation {
  project:       string;
  whyItMatters:  string; // the strategic importance, one sentence
  whyNow:        string; // why today specifically
  longTermValue: string; // what compounding impact this creates over time
  nextAction:    string; // one concrete thing to do
  score:         ScoreBreakdown;
}

export type BriefingMode = "morning" | "deep";

export interface NoahBriefing {
  mode:            BriefingMode;
  greeting:        string;
  observations:    string[];    // max 3 in morning, max 2 in deep
  recommendations: NoahRecommendation[]; // 1 in morning, 3 in deep
  closingQuestion: string;
}
