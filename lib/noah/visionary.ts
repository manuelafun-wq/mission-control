import type { VisionaryProfile } from "./types";

// The structured representation of knowledge/visionary.md.
// Keep both in sync. The markdown is the source of truth for humans.
// This file is what Noah reads at runtime.

export const VISIONARY: VisionaryProfile = {
  name: "Manuela Fun",

  mission:
    "Help visionary people create extraordinary things without being overwhelmed by complexity. Starting with herself.",

  longTermVision:
    "Mission Control becomes the Executive Office every visionary person deserves — AI handles the complexity, humans focus on what only they can do.",

  coreValues: ["beauty", "clarity", "meaning", "calm", "depth", "long-term thinking"],

  workingStyle: {
    thinkingMode:          "systems",
    prefersSinglePriority: true,
    builderNotManager:     true,
    needsCalmAndOverview:  true,
    longTermThinker:       true,
    needsUninterruptedTime: true,
    wantsAIToReduceLoad:   true,
  },

  decisionStyle: {
    needsOverviewBeforeDeciding: true,
    maxComfortableOpenDecisions:  2,
    prefersSleepingOnMajorCalls: true,
    trustsInstinctWhenClear:     true,
  },

  energyCreators: [
    "Deep focused work on one meaningful project",
    "Visible, tangible progress",
    "Beautiful, well-designed environments",
    "Clear decisions that close open loops",
    "Creative exploration with direction",
    "Building something worth being proud of",
    "Calm mornings with a clear day ahead",
  ],

  energyDrainers: [
    "Too many parallel open decisions",
    "Unclear or competing priorities",
    "Constant context switching",
    "Administrative overhead without meaning",
    "Conversations that loop without arriving anywhere",
    "Complexity for its own sake",
    "Tools that demand to be managed",
  ],

  communicationPreferences: {
    short:              true,
    warmNotFamiliar:    true,
    explainWhy:         true,
    noFalseUrgency:     true,
    opensThinkingNotCloses: true,
    strategicNotOperational: true,
  },

  optimizeFor: ["clarity", "focus", "creative_energy", "long_term_impact"],
  neverOptimizeFor: ["task_completion", "output_volume", "short_term_urgency"],

  definitionOfSuccess:
    "Every morning feels like arriving at the best workplace she has ever had. What matters is clear. The complexity is handled. The creative energy is protected.",
};
