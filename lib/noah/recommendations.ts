import type { NoahContext, NoahRecommendation, ScoreBreakdown } from "./types";

// ── Scoring weights ───────────────────────────────────────────────────────────

const WEIGHTS = {
  strategicImportance: 0.30,
  longTermValue:       0.25,
  momentum:            0.20,
  dependencies:        0.15,
  userFocus:           0.10,
} as const;

// ── Static project knowledge ──────────────────────────────────────────────────

interface ProjectKnowledge {
  strategicImportance: number;
  dependencies:        number;
  baseMomentum:        number;
  longTermValue:       number;
  whyItMatters:        string;
  whyNowDefault:       string;
  whyNowIfFocused:     string;
  longTermValueText:   string;
  nextAction:          string;
}

const PROJECT_KNOWLEDGE: Record<string, ProjectKnowledge> = {
  "Mission Control": {
    strategicImportance: 10,
    dependencies:        9,
    baseMomentum:        9,
    longTermValue:       10,
    whyItMatters:      "Mission Control is het fundament. Alles wat je hier bouwt, versnelt elk ander project.",
    whyNowDefault:     "Phase 1 is bijna klaar. Dit is het moment om het fundament af te maken.",
    whyNowIfFocused:   "Je hebt hier de afgelopen tijd momentum opgebouwd. Doorzetten heeft nu het meeste rendement.",
    longTermValueText: "Elke verbetering hier werkt door in alle acht projecten tegelijk. De samengestelde waarde is enorm.",
    nextAction:        "Definieer wat Phase 2 (Projects) er concreet uit gaat zien.",
  },
  "AYA": {
    strategicImportance: 9,
    dependencies:        4,
    baseMomentum:        7,
    longTermValue:       10,
    whyItMatters:      "AYA is de kern van jouw missie. Financiële autonomie voor iedereen begint hier.",
    whyNowDefault:     "De architectuur die je in Mission Control opbouwt, is direct herbruikbaar in AYA.",
    whyNowIfFocused:   "Je bent hier actief mee bezig. Geen betere tijd dan nu om door te pakken.",
    longTermValueText: "AYA heeft het potentieel om de meeste mensen te bereiken van alles wat je bouwt.",
    nextAction:        "Definieer het volgende productmijlpaal en toets het aan de kernmissie.",
  },
  "Website": {
    strategicImportance: 7,
    dependencies:        5,
    baseMomentum:        6,
    longTermValue:       7,
    whyItMatters:      "Jouw website is het publieke bewijs van wie je bent en wat je doet.",
    whyNowDefault:     "Voortgang zichtbaar maken creëert externe geloofwaardigheid en trekt de juiste mensen aan.",
    whyNowIfFocused:   "Je hebt hier recent energie ingestoken. Eén stap verder heeft nu het meeste zichtbare effect.",
    longTermValueText: "Een sterke online aanwezigheid samengesteld over tijd. Elke publicatie voegt vertrouwen toe.",
    nextAction:        "Publiceer één concreet bewijs van voortgang — hoe klein ook.",
  },
  "Menskompas": {
    strategicImportance: 7,
    dependencies:        3,
    baseMomentum:        5,
    longTermValue:       8,
    whyItMatters:      "Menskompas gaat over menselijke groei op een schaal die persoonlijk aanvoelt.",
    whyNowDefault:     "Dit soort werk gedijt bij aandacht die niet wordt opgeëist door urgentie.",
    whyNowIfFocused:   "Je hebt hier recent energie in gestoken. Goed moment om dat vast te houden.",
    longTermValueText: "Diepgaand werk over menselijke ontwikkeling heeft een lange halfwaardetijd. Het blijft relevant.",
    nextAction:        "Zet de eerstvolgende stap in de inhoudsontwikkeling.",
  },
  "Kwetsbaar Evenwicht": {
    strategicImportance: 7,
    dependencies:        2,
    baseMomentum:        5,
    longTermValue:       8,
    whyItMatters:      "Kwetsbaar Evenwicht vraagt ruimte. Het beloont langetermijndenken en consequente aandacht.",
    whyNowDefault:     "Creatief werk gedijt bij regelmatige, ongestoorde aandacht — niet bij sporadische momenten.",
    whyNowIfFocused:   "Je bent er al mee bezig. Momentum is kostbaar — gebruik het.",
    longTermValueText: "Betekenisvol creatief werk met een lange doorwerking. De impact verschijnt niet direct, maar is blijvend.",
    nextAction:        "Zet een uur apart voor ongestoord, diep werk.",
  },
  "Podcast": {
    strategicImportance: 6,
    dependencies:        3,
    baseMomentum:        5,
    longTermValue:       7,
    whyItMatters:      "Een podcastkanaal bouwt een publiek op over tijd. Consistentie is het enige dat telt.",
    whyNowDefault:     "Regelmatige publicatie heeft meer waarde dan perfecte afleveringen.",
    whyNowIfFocused:   "Je hebt dit recent aandacht gegeven. Doorzetten versterkt het ritme.",
    longTermValueText: "Elk gepubliceerde aflevering samengesteld over maanden en jaren. Het publiek groeit als je het bijhoudt.",
    nextAction:        "Plan de volgende opname of publiceer een uitstaande aflevering.",
  },
  "House of Navutiita": {
    strategicImportance: 6,
    dependencies:        2,
    baseMomentum:        4,
    longTermValue:       8,
    whyItMatters:      "House of Navutiita heeft culturele en persoonlijke betekenis die niet gehaast kan worden.",
    whyNowDefault:     "Kleine, regelmatige aandacht houdt dit project in beweging zonder het te forceren.",
    whyNowIfFocused:   "Je hebt dit onlangs opgepakt. Continuïteit heeft hier meer waarde dan intensiteit.",
    longTermValueText: "Cultureel werk dat gebouwd wordt over jaren. De waarde neemt toe naarmate het groeide.",
    nextAction:        "Identificeer één tastbare volgende stap — hoe concreet mogelijk.",
  },
  "AI Business": {
    strategicImportance: 8,
    dependencies:        6,
    baseMomentum:        6,
    longTermValue:       9,
    whyItMatters:      "De wereld beweegt snel. Een strategische positie in AI is nu te nemen — straks minder.",
    whyNowDefault:     "Het momentum in de AI-markt is op dit moment uitzonderlijk. Timing telt hier.",
    whyNowIfFocused:   "Je hebt al richting gekozen. Doorzetten terwijl het marktmoment open staat.",
    longTermValueText: "Vroeg positioneren in een markt die nog opengaat, creëert een voorsprong die moeilijk in te halen is.",
    nextAction:        "Definieer het eerste concrete aanbod of experiment.",
  },
};

// ── Scoring engine ────────────────────────────────────────────────────────────

function scoreProject(project: string, ctx: NoahContext): ScoreBreakdown {
  const k = PROJECT_KNOWLEDGE[project];
  if (!k) {
    return { strategicImportance: 5, dependencies: 5, momentum: 5, userFocus: 0, longTermValue: 5, total: 5 };
  }

  const userFocus  = ctx.memory.projects.includes(project) ? 10 : 0;
  const isActive   = project === "Mission Control" && ctx.activePhase.phase === 1;
  const momentum   = Math.min(10, k.baseMomentum + (isActive ? 1 : 0));

  const total =
    k.strategicImportance * WEIGHTS.strategicImportance +
    k.longTermValue        * WEIGHTS.longTermValue +
    momentum               * WEIGHTS.momentum +
    k.dependencies         * WEIGHTS.dependencies +
    userFocus              * WEIGHTS.userFocus;

  return {
    strategicImportance: k.strategicImportance,
    dependencies:        k.dependencies,
    momentum,
    userFocus,
    longTermValue:       k.longTermValue,
    total,
  };
}

// ── Language layer ────────────────────────────────────────────────────────────
// Replaced by AI when connected — scoring above does not change.

function buildWhyNow(project: string, score: ScoreBreakdown, ctx: NoahContext): string {
  const k = PROJECT_KNOWLEDGE[project];
  if (!k) return "De timing is goed voor dit project.";
  return score.userFocus > 0 ? k.whyNowIfFocused : k.whyNowDefault;
}

// ── Public API ────────────────────────────────────────────────────────────────

export function generateRecommendations(ctx: NoahContext, limit = 3): NoahRecommendation[] {
  return ctx.allProjects
    .map((project) => {
      const score = scoreProject(project, ctx);
      const k     = PROJECT_KNOWLEDGE[project];
      return { project, score, k };
    })
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, limit)
    .map(({ project, score, k }) => ({
      project,
      whyItMatters:    k?.whyItMatters    ?? "Een belangrijk project.",
      whyNow:          buildWhyNow(project, score, ctx),
      longTermValue:   k?.longTermValueText ?? "Langetermijnwaarde die zich samengesteld opbouwt.",
      nextAction:      k?.nextAction      ?? "Identificeer de volgende stap.",
      score,
    }));
}
