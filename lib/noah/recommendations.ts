import type { NoahContext, NoahRecommendation, ScoreBreakdown } from "./types";

// ── Scoring weights ───────────────────────────────────────────────────────────
// Must sum to 1.0. Adjust here to change Noah's decision-making philosophy.

const WEIGHTS = {
  strategicImportance: 0.30,
  longTermValue:       0.25,
  momentum:            0.20,
  dependencies:        0.15,
  userFocus:           0.10,
} as const;

// ── Static project knowledge ──────────────────────────────────────────────────
// These are Noah's baseline assessments, grounded in the company's mission
// and roadmap. They represent informed professional judgment, not preference.

interface ProjectKnowledge {
  strategicImportance: number;
  dependencies:        number;
  baseMomentum:        number;
  longTermValue:       number;
  whyItMatters:        string;
  whyNowDefault:       string;
  whyNowIfFocused:     string; // used when user has been actively selecting this project
  nextAction:          string;
}

const PROJECT_KNOWLEDGE: Record<string, ProjectKnowledge> = {
  "Mission Control": {
    strategicImportance: 10,
    dependencies:        9,
    baseMomentum:        9,
    longTermValue:       10,
    whyItMatters:   "Het fundament van alles wat je bouwt. Elk uur hier werkt door in alle andere projecten.",
    whyNowDefault:  "Phase 1 is bijna klaar. Afmaken nu versnelt alles daarna.",
    whyNowIfFocused:"Je hebt hier de afgelopen tijd momentum opgebouwd. Doorzetten.",
    nextAction:     "Definieer wat Phase 2 (Projects) er concreet uit gaat zien.",
  },
  "AYA": {
    strategicImportance: 9,
    dependencies:        4,
    baseMomentum:        7,
    longTermValue:       10,
    whyItMatters:   "De kern van jouw missie. Financiële autonomie voor iedereen begint hier.",
    whyNowDefault:  "De architectuur die je in Mission Control opbouwt, is direct herbruikbaar in AYA.",
    whyNowIfFocused:"Je bent hier actief mee bezig. Geen betere tijd dan nu.",
    nextAction:     "Definieer het volgende productmijlpaal en toets het aan de kernmissie.",
  },
  "Website": {
    strategicImportance: 7,
    dependencies:        5,
    baseMomentum:        6,
    longTermValue:       7,
    whyItMatters:   "Jouw publieke gezicht. Hier ontdekken mensen wie Manuela Fun is en wat ze kan.",
    whyNowDefault:  "Voortgang publiceren creëert extern momentum en geloofwaardigheid.",
    whyNowIfFocused:"Je hebt dit onlangs aandacht gegeven. Één extra stap heeft nu het meeste effect.",
    nextAction:     "Publiceer één concreet bewijs van voortgang — hoe klein ook.",
  },
  "Menskompas": {
    strategicImportance: 7,
    dependencies:        3,
    baseMomentum:        5,
    longTermValue:       8,
    whyItMatters:   "Diepgaand werk over menselijke groei. Potentieel voor impact op grote schaal.",
    whyNowDefault:  "Dit soort werk gedijt bij aandacht die niet wordt opgeëist door urgentie.",
    whyNowIfFocused:"Je hebt hier recent energie in gestoken. Goed moment om dat vast te houden.",
    nextAction:     "Zet de eerstvolgende stap in de inhoudsontwikkeling.",
  },
  "Kwetsbaar Evenwicht": {
    strategicImportance: 7,
    dependencies:        2,
    baseMomentum:        5,
    longTermValue:       8,
    whyItMatters:   "Betekenisvol werk vraagt ruimte. Dit project beloont langetermijndenken.",
    whyNowDefault:  "Creatief werk gedijt bij regelmatige, ongestoorde aandacht.",
    whyNowIfFocused:"Je bent er al mee bezig. Momentum is kostbaar — gebruik het.",
    nextAction:     "Zet een uur apart voor ongestoord, diep werk.",
  },
  "Podcast": {
    strategicImportance: 6,
    dependencies:        3,
    baseMomentum:        5,
    longTermValue:       7,
    whyItMatters:   "Een podcastkanaal bouwt een publiek op over tijd. Consistentie is alles.",
    whyNowDefault:  "Regelmatige publicatie heeft meer waarde dan perfecte afleveringen.",
    whyNowIfFocused:"Je hebt dit recent aandacht gegeven. Doorzetten versterkt het ritme.",
    nextAction:     "Plan de volgende opname of publiceer een uitstaande aflevering.",
  },
  "House of Navutiita": {
    strategicImportance: 6,
    dependencies:        2,
    baseMomentum:        4,
    longTermValue:       8,
    whyItMatters:   "Een cultureel project met langetermijnwaarde en persoonlijke betekenis.",
    whyNowDefault:  "Kleine, regelmatige aandacht houdt dit project in beweging.",
    whyNowIfFocused:"Je hebt dit onlangs opgepakt. Continuïteit heeft hier meer waarde dan intensiteit.",
    nextAction:     "Identificeer één tastbare volgende stap — hoe concreet mogelijk.",
  },
  "AI Business": {
    strategicImportance: 8,
    dependencies:        6,
    baseMomentum:        6,
    longTermValue:       9,
    whyItMatters:   "De wereld beweegt snel. Een strategische positie in AI is nu te nemen — straks minder.",
    whyNowDefault:  "Het momentum in de AI-markt is op dit moment uitzonderlijk. Timing telt hier.",
    whyNowIfFocused:"Je hebt al richting gekozen. Doorzetten terwijl het marktmoment open staat.",
    nextAction:     "Definieer het eerste concrete aanbod of experiment.",
  },
};

// ── Scoring engine ────────────────────────────────────────────────────────────

function scoreProject(project: string, ctx: NoahContext): ScoreBreakdown {
  const knowledge = PROJECT_KNOWLEDGE[project];
  if (!knowledge) {
    return { strategicImportance: 5, dependencies: 5, momentum: 5, userFocus: 0, longTermValue: 5, total: 5 };
  }

  const userFocus = ctx.memory.projects.includes(project) ? 10 : 0;

  // Momentum gets a boost if this is the active-phase project
  const isPhaseProject = project === "Mission Control" && ctx.activePhase.phase === 1;
  const momentum = Math.min(10, knowledge.baseMomentum + (isPhaseProject ? 1 : 0));

  const total =
    knowledge.strategicImportance * WEIGHTS.strategicImportance +
    knowledge.longTermValue       * WEIGHTS.longTermValue +
    momentum                      * WEIGHTS.momentum +
    knowledge.dependencies        * WEIGHTS.dependencies +
    userFocus                     * WEIGHTS.userFocus;

  return {
    strategicImportance: knowledge.strategicImportance,
    dependencies:        knowledge.dependencies,
    momentum,
    userFocus,
    longTermValue:       knowledge.longTermValue,
    total,
  };
}

// ── Language layer ────────────────────────────────────────────────────────────
// These functions produce the human-readable parts of the recommendation.
// This is the layer that gets replaced when Claude or OpenAI is connected —
// the scoring above stays unchanged.

function buildWhyNow(project: string, score: ScoreBreakdown, ctx: NoahContext): string {
  const knowledge = PROJECT_KNOWLEDGE[project];
  if (!knowledge) return "De timing is goed voor dit project.";
  return score.userFocus > 0
    ? knowledge.whyNowIfFocused
    : knowledge.whyNowDefault;
}

// ── Public API ────────────────────────────────────────────────────────────────

export function generateRecommendations(ctx: NoahContext): NoahRecommendation[] {
  const scored = ctx.allProjects
    .map((project) => {
      const score = scoreProject(project, ctx);
      const knowledge = PROJECT_KNOWLEDGE[project];
      return { project, score, knowledge };
    })
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, 3);

  return scored.map(({ project, score, knowledge }) => ({
    project,
    whyItMatters: knowledge?.whyItMatters ?? "Een belangrijk project.",
    whyNow:       buildWhyNow(project, score, ctx),
    nextAction:   knowledge?.nextAction ?? "Identificeer de volgende stap.",
    score,
  }));
}
