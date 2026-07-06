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

export interface VisionaryProfile {
  name: string;
  mission: string;
  longTermVision: string;
  coreValues: string[];
  workingStyle: {
    thinkingMode:           "systems" | "tasks";
    prefersSinglePriority:  boolean;
    builderNotManager:      boolean;
    needsCalmAndOverview:   boolean;
    longTermThinker:        boolean;
    needsUninterruptedTime: boolean;
    wantsAIToReduceLoad:    boolean;
  };
  decisionStyle: {
    needsOverviewBeforeDeciding:  boolean;
    maxComfortableOpenDecisions:  number;
    prefersSleepingOnMajorCalls: boolean;
    trustsInstinctWhenClear:     boolean;
  };
  energyCreators: string[];
  energyDrainers: string[];
  communicationPreferences: {
    short:                   boolean;
    warmNotFamiliar:         boolean;
    explainWhy:              boolean;
    noFalseUrgency:          boolean;
    opensThinkingNotCloses:  boolean;
    strategicNotOperational: boolean;
  };
  optimizeFor:      string[];
  neverOptimizeFor: string[];
  definitionOfSuccess: string;
}

export interface NoahContext {
  date: string;
  timeOfDay: "morning" | "afternoon" | "evening";
  memory: MemorySnapshot;
  recentCompletions: BuildOrder[];
  activePhase: RoadmapPhase;
  allProjects: string[];
  visionary: VisionaryProfile;
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
