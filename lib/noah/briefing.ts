import type { NoahContext, NoahBriefing } from "./types";
import { selectRecommendations } from "./recommendations";

// AI-ready entry point.
// When Claude or OpenAI is connected, replace the body of this function
// with an API call. The signature — and every caller — stays the same.
export async function generateBriefing(ctx: NoahContext): Promise<NoahBriefing> {
  return compose(ctx);
}

function compose(ctx: NoahContext): NoahBriefing {
  return {
    greeting:        buildGreeting(ctx.timeOfDay),
    observations:    buildObservations(ctx),
    recommendations: selectRecommendations(ctx),
    closingQuestion: buildClosingQuestion(ctx),
  };
}

function buildGreeting(timeOfDay: "morning" | "afternoon" | "evening"): string {
  const map = {
    morning:   "Goedemorgen, Manuela.",
    afternoon: "Goedemiddag, Manuela.",
    evening:   "Goedenavond, Manuela.",
  };
  return map[timeOfDay];
}

function buildObservations(ctx: NoahContext): string[] {
  const obs: string[] = [];
  const { memory, recentCompletions, activePhase } = ctx;

  const latest = recentCompletions.at(-1);
  if (latest) {
    obs.push(`Builder heeft "${latest.title}" afgerond. Mission Control groeit.`);
  }

  obs.push(`We zitten in Phase ${activePhase.phase}: ${activePhase.title}. ${activePhase.goal}`);

  if (memory.decisions.length > 0) {
    const n = memory.decisions.length;
    obs.push(`Je hebt ${n} beslissing${n > 1 ? "en" : ""} staan. Vandaag is een goed moment om er een af te ronden.`);
  }

  if (memory.ideas.length > 0) {
    const n = memory.ideas.length;
    obs.push(`Er ${n === 1 ? "staat" : "staan"} ${n} idee${n === 1 ? "" : "ën"} klaar.`);
  }

  return obs.slice(0, 2);
}

function buildClosingQuestion(ctx: NoahContext): string {
  const { memory } = ctx;

  if (memory.decisions.length > 0) {
    return "Welke beslissing wil je vandaag nemen?";
  }
  if (memory.ideas.length > 0) {
    return "Welk idee wil je vandaag in beweging brengen?";
  }
  if (memory.projects.length > 0) {
    return "Is er iets dat je aandacht nodig heeft voordat we beginnen?";
  }
  return "Waar wil je vandaag de meeste waarde creëren?";
}
