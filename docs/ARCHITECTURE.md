# Architecture

Mission Control is organized around the things a Visionary actually needs to run her work — not the things that feel important to track.

---

## Layers

```
┌─────────────────────────────────────────┐
│               Frontend                  │
│         Executive Office UI             │
├─────────────────────────────────────────┤
│                 Noah                    │
│         Chief of Staff layer            │
├───────────┬─────────────┬───────────────┤
│ Projects  │    Team     │   Knowledge   │
├───────────┼─────────────┼───────────────┤
│   Ideas   │  Decisions  │   Briefings   │
├─────────────────────────────────────────┤
│               Settings                  │
└─────────────────────────────────────────┘
```

---

## Responsibilities

### Frontend

The interface layer. Renders the Executive Office experience — welcome sequence, daily briefing, project overview, Noah panel.

Responsible for: visual design, interaction, animation, state display.
Not responsible for: business logic, data storage, AI reasoning.

---

### Noah

The intelligence layer. Noah is not a chatbot. He is a structured AI agent with a defined role, memory, and set of responsibilities.

Responsible for: daily briefing preparation, surfacing decisions, remembering context, asking the right questions, summarizing progress.
Not responsible for: making decisions, initiating action, operating outside his defined boundaries.

See `NOAH.md` for full specification.

---

### Projects

The mission layer. Projects are the active fronts of Manuela's work — the things she is building, moving, or watching.

Each project has: a name, a description, a current status, a set of open items, and a history.

Projects are not tasks. They are ongoing missions with direction and momentum.

---

### Team

The people layer. The humans (and eventually AI agents) who are part of Manuela's ecosystem.

Each team member has: a role, active responsibilities, and a communication status with Manuela.

Phase 2+.

---

### Knowledge

The context layer. The things Manuela knows that Noah should also know — frameworks, principles, constraints, preferences, reference material.

Knowledge is what separates a generic AI assistant from one that actually understands the work.

Phase 3+.

---

### Ideas

The capture layer. Ideas arrive at inconvenient times. Mission Control gives them a home.

An idea has: a text, a timestamp, a project association (optional), and a status (new / considered / acted on / archived).

Ideas are not tasks. They are seeds.

---

### Decisions

The record layer. Decisions made by Manuela are recorded so that Noah can reference them, and so that Manuela does not have to remember.

A decision has: a text, a date, a project association (optional), and context.

This is one of the most important layers. Decisions made without a record are decisions that will need to be made again.

---

### Briefings

The daily rhythm layer. Each day, Noah prepares a briefing — a structured summary of what is in motion, what needs attention, and what he proposes for the day.

A briefing has: a date, a proposed plan, a list of open items, and the decisions made during it.

Briefings are the primary interaction between Manuela and Noah.

---

### Settings

The configuration layer. Manuela's preferences, Noah's parameters, and system-level configuration.

Responsible for: user profile, notification preferences, Noah behavior settings, data management.
