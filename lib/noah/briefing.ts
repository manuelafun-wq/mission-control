import type { NoahContext, NoahBriefing, BriefingMode, VisionaryProfile } from "./types";
import { generateRecommendations } from "./recommendations";

// AI-ready entry point.
// When Claude or OpenAI is connected, replace the body of this function
// with an API call using ctx and mode as inputs.
// The signature — and every caller — stays the same.
export async function generateBriefing(
  ctx: NoahContext,
  mode: BriefingMode = "morning"
): Promise<NoahBriefing> {
  return mode === "morning" ? composeMorning(ctx) : composeDeep(ctx);
}

// ── Morning Brief ─────────────────────────────────────────────────────────────

function composeMorning(ctx: NoahContext): NoahBriefing {
  return {
    mode:            "morning",
    greeting:        buildGreeting(ctx.timeOfDay, ctx.visionary),
    observations:    buildMorningObservations(ctx),
    recommendations: generateRecommendations(ctx, 1),
    closingQuestion: buildClosingQuestion(ctx),
  };
}

function buildMorningObservations(ctx: NoahContext): string[] {
  const obs: string[] = [];
  const { memory, activePhase, visionary } = ctx;

  // Observation 1: Strategic system context.
  // Systems thinker needs to see the big picture before anything else.
  if (activePhase.phase === 1) {
    obs.push(
      "Mission Control wordt het fundament voor alles wat daarna komt. " +
      "Wat hier gebouwd wordt, versnelt elk volgend project."
    );
  } else {
    obs.push(
      `${activePhase.title} is de actieve fase. ` +
      "De beslissingen die nu worden genomen, bepalen de richting van alles daarna."
    );
  }

  // Observation 2: Focus state — framed for a builder, not a manager.
  if (memory.projects.length > 0) {
    const top = memory.projects[0];
    const verb = visionary.workingStyle.builderNotManager ? "bouwt aan" : "werkt aan";
    obs.push(
      `Je sterkste energie gaat momenteel naar ${top}. ` +
      "Continuïteit heeft hier meer waarde dan intensiteit."
    );
  } else {
    obs.push(
      "Vandaag start met een open agenda. " +
      "Dat is een krachtige positie — je kiest bewust waar je energie naartoe gaat."
    );
  }

  // Observation 3: Open items — framed around cognitive load and creative space.
  const openDecisions = memory.decisions.length;
  const maxComfortable = visionary.decisionStyle.maxComfortableOpenDecisions;

  if (openDecisions > maxComfortable) {
    obs.push(
      `Er staan ${openDecisions} beslissingen open — meer dan jij prettig vindt. ` +
      "Eén beslissing nemen vandaag schept ruimte voor de rest."
    );
  } else if (openDecisions > 0) {
    obs.push(
      "Er is een openstaande beslissing. " +
      "Een beslissing uitstellen kost stille energie. Nemen schept ruimte."
    );
  } else if (memory.ideas.length > 0) {
    obs.push(
      "Er liggen ideeën klaar die nog niet tot actie zijn geworden. " +
      "Sommige zijn waarschijnlijk rijper dan ze lijken."
    );
  } else {
    obs.push(
      "De agenda is vrij van openstaande punten. " +
      "Gebruik deze helderheid — ze is zeldzamer dan ze lijkt."
    );
  }

  return obs.slice(0, 3);
}

// ── Deep Brief ────────────────────────────────────────────────────────────────

function composeDeep(ctx: NoahContext): NoahBriefing {
  return {
    mode:            "deep",
    greeting:        buildGreeting(ctx.timeOfDay, ctx.visionary),
    observations:    buildDeepObservations(ctx),
    recommendations: generateRecommendations(ctx, 3),
    closingQuestion: buildClosingQuestion(ctx),
  };
}

function buildDeepObservations(ctx: NoahContext): string[] {
  const obs: string[] = [];
  const { memory, recentCompletions, activePhase } = ctx;

  const latest = recentCompletions.at(-1);
  if (latest) {
    obs.push(`Builder heeft "${latest.title}" afgerond. Mission Control groeit.`);
  }

  if (memory.decisions.length > 0) {
    const n = memory.decisions.length;
    obs.push(
      `Je hebt ${n} openstaande beslissing${n > 1 ? "en" : ""}. ` +
      `Vandaag is een goed moment om er een af te ronden.`
    );
  } else if (memory.ideas.length > 0) {
    const n = memory.ideas.length;
    obs.push(`Er ${n === 1 ? "staat" : "staan"} ${n} idee${n === 1 ? "" : "ën"} klaar om te bewegen.`);
  } else {
    obs.push(`We zitten in Phase ${activePhase.phase}: ${activePhase.title}. ${activePhase.goal}`);
  }

  return obs.slice(0, 2);
}

// ── Shared ────────────────────────────────────────────────────────────────────

function buildGreeting(
  timeOfDay: "morning" | "afternoon" | "evening",
  visionary: VisionaryProfile
): string {
  const firstName = visionary.name.split(" ")[0];
  return {
    morning:   `Goedemorgen, ${firstName}.`,
    afternoon: `Goedemiddag, ${firstName}.`,
    evening:   `Goedenavond, ${firstName}.`,
  }[timeOfDay];
}

function buildClosingQuestion(ctx: NoahContext): string {
  const { memory, visionary } = ctx;

  // If there are too many open decisions, help her pick one — don't add another question.
  if (memory.decisions.length > visionary.decisionStyle.maxComfortableOpenDecisions) {
    return "Welke van de openstaande beslissingen wil je als eerste nemen?";
  }

  if (memory.decisions.length > 0) return "Welke beslissing wil je vandaag nemen?";

  // For a long-term thinker, ask about impact — not about tasks.
  if (visionary.workingStyle.longTermThinker) {
    if (memory.projects.length > 0) return "Is er iets dat je aandacht nodig heeft voordat we beginnen?";
    return "Waar wil je vandaag de meeste langetermijnwaarde creëren?";
  }

  if (memory.ideas.length > 0) return "Welk idee wil je vandaag in beweging brengen?";
  return "Waar wil je vandaag de meeste waarde creëren?";
}
