import type { NoahContext, NoahRecommendation } from "./types";
import { PROJECT_PRIORITY } from "./context";

const ENDORSEMENT_REASONS: Record<string, string> = {
  "Mission Control":    "De basis van alles wat je bouwt. Elk uur hier werkt door in alle andere projecten.",
  "AYA":                "De kern van jouw missie. Dit verdient dagelijkse aandacht.",
  "Website":            "Jouw publieke gezicht. Hier leren mensen jou kennen.",
  "Menskompas":         "Groeiend momentum. Goed moment om door te pakken.",
  "Kwetsbaar Evenwicht":"Diep werk vereist ongestoorde focus. Vandaag is een goed moment.",
  "Podcast":            "Consistentie is het geheim van een goed podcastkanaal.",
  "House of Navutiita": "Een langetermijnproject dat regelmatig aandacht verdient.",
  "AI Business":        "De wereld beweegt snel. Vaart houden is hier essentieel.",
};

const DEFAULT_REASONS: Record<string, string> = {
  "Mission Control":    "Phase 1 is bijna klaar. Dit is het moment om het fundament af te maken.",
  "AYA":                "De kern van jouw missie. Dit project verdient dagelijkse aandacht.",
  "Website":            "Jouw publieke gezicht. De verbinding tussen jou en de wereld.",
  "Menskompas":         "Klaar om verder te groeien.",
  "Kwetsbaar Evenwicht":"Een project dat diepte vraagt.",
  "Podcast":            "Een kanaal dat consistentie beloont.",
  "House of Navutiita": "Langetermijnwerk dat nu aandacht verdient.",
  "AI Business":        "Een strategisch project in een snel bewegende markt.",
};

export function selectRecommendations(ctx: NoahContext): NoahRecommendation[] {
  const { memory, allProjects } = ctx;

  if (memory.projects.length > 0) {
    return memory.projects.slice(0, 3).map((project) => ({
      project,
      reason: ENDORSEMENT_REASONS[project] ?? "Een bewuste keuze voor vandaag.",
    }));
  }

  const prioritized = [...allProjects].sort(
    (a, b) => (PROJECT_PRIORITY[a] ?? 99) - (PROJECT_PRIORITY[b] ?? 99)
  );

  return prioritized.slice(0, 3).map((project) => ({
    project,
    reason: DEFAULT_REASONS[project] ?? "Een logische keuze in de huidige fase.",
  }));
}
