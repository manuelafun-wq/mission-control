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

export interface NoahRecommendation {
  project: string;
  reason: string;
}

export interface NoahBriefing {
  greeting: string;
  observations: string[];
  recommendations: NoahRecommendation[];
  closingQuestion: string;
}
