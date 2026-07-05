# Roadmap

Mission Control is built in phases. Each phase is complete before the next begins.

Features within a phase are not fixed. They are a direction.

---

## Phase 1 — Executive Office

**Goal:** Mission Control works as a daily planning tool. Manuela can arrive, receive a briefing, set her focus for the day, and record what she thinks and decides.

**Scope:**

- Welcome sequence and Executive Office UI
- Daily briefing overlay with Noah's proposal
- Project selection (up to 3 per day)
- Idea capture
- Decision recording
- localStorage persistence (day-scoped)
- Architecture documentation

**Status:** In progress

---

## Phase 2 — Projects

**Goal:** Each project becomes a living space inside Mission Control. Manuela can navigate into a project, see its current state, review its history, and work within it.

**Scope:**

- Project detail pages
- Project status and momentum tracking
- Open items per project
- Ideas and decisions linked to projects
- Project history
- All 8 projects accessible (AYA, Mission Control, Menskompas, Website, Kwetsbaar Evenwicht, Podcast, House of Navutiita, AI Business)

**Status:** Not started

---

## Phase 3 — Noah Brain

**Goal:** Noah becomes genuinely intelligent. He has real memory, understands Manuela's work in depth, and provides briefings that reflect actual context — not static placeholders.

**Scope:**

- Claude API integration (Noah's voice and reasoning)
- Long-term memory (server-side persistence)
- Knowledge base (Manuela explicitly teaches Noah)
- Dynamic briefing generation based on real project state
- Noah references prior decisions and ideas
- Conversational briefing (back-and-forth, not one-way)

**Status:** Not started

---

## Phase 4 — AI Team

**Goal:** Noah is not alone. Manuela has a team of specialized AI agents — each with a defined role, working under Noah's coordination.

**Scope:**

- Specialized agents per domain (writing, research, strategy, operations)
- Agent-to-agent coordination through Noah
- Manuela delegates to agents; Noah tracks outcomes
- Human team members can be added alongside AI agents
- Team briefings — not just individual briefings

**Status:** Not started

---

## Principles that govern the roadmap

**One phase at a time.** Phase 2 does not begin until Phase 1 is solid.

**No feature creep within a phase.** A phase has a goal. Everything added is measured against that goal.

**The interface leads.** Infrastructure follows the experience, not the other way around.

**Noah grows with the product.** In Phase 1 Noah is simulated. In Phase 3 he is real. The experience should feel consistent across both.
