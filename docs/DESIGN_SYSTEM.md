# Design System

## The standard

Aman Hotel × Apple × Executive Office.

Every design decision is held against this standard. Not trendy. Not minimal for its own sake. Calm, premium, and purposeful.

---

## Philosophy: Calm Computing

Mission Control practices calm computing.

Calm computing means the interface does not demand attention — it receives it when offered. Nothing blinks. Nothing pulses without meaning. Nothing competes for focus.

The interface should feel like entering a well-designed room. Quiet. Oriented. Ready.

---

## Principles

**Premium** — Every element earns its place. Spacing is generous. Typography is considered. Nothing is crowded.

**Elegant** — Complexity is hidden. Interactions are smooth. Transitions are slow and deliberate.

**Minimal** — If an element does not carry meaning, it is removed. Decoration for its own sake does not belong here.

**Soft** — Edges are not harsh. Contrast is high enough to read, low enough to rest. The eye is not strained.

**Warm** — The palette leans warm-neutral. The tone is human, not clinical. This is a space for a person, not a machine.

**No visual noise** — No gradients that shout. No shadows that dramatize. No animations that entertain. Everything is in service of clarity.

---

## Color

### Base palette

| Name | Value | Use |
|------|-------|-----|
| Background light | `#F8F7F5` | Main workspace |
| Background dark | `#19171A` | Noah panel |
| Text primary | `#181614` | Headings, key content |
| Text secondary | `#68645F` | Body text, descriptions |
| Text muted | `#908A84` | Labels, captions |
| Text faint | `#B8B4AE` | Footer, decorative text |

### Accent

| Name | Value | Use |
|------|-------|-----|
| Gold | `#A88A3A` | Primary accent — crosshair, gold line, interactive gold |
| Green | `#3DE88A` | Status indicator — Noah live |

### Noah panel

All colors on the dark panel use `rgba(237,233,228, α)` for consistency and warmth.

---

## Typography

### Typefaces

| Role | Font | Use |
|------|------|-----|
| Serif | Playfair Display | Headings, greetings, names |
| Sans | Geist | All UI text, labels, body |

### Scale

Labels and system text: `0.58–0.68rem`, uppercase, tracked wide (`0.16–0.22em`).
Body text: `0.875–0.9375rem`, line-height `1.75–1.9`.
Headings: `clamp(3.5rem, 6.5vw, 5.5rem)` for the primary greeting.

### Rules

- No bold for decoration. Bold carries meaning.
- Uppercase only for labels and system identifiers.
- Letter-spacing widens as font size decreases.
- No centered body text. Center only for ceremonial moments (welcome screen).

---

## Spacing

Spacing is generous. The page breathes.

Base unit: `0.25rem` (4px).
Comfortable gaps: `1rem` to `1.75rem`.
Section separation: `2rem` to `3.25rem`.
Page padding: `2.5rem–4rem` horizontal, `2.25rem–2.5rem` vertical.

---

## Motion

**Slow and deliberate.** Motion is not decoration.

- Fade transitions: `0.45s–1.4s ease`
- Enter animations: fade + subtle translateY (12–20px)
- Hover: `opacity 0.25–0.5s ease` — never scale unless it carries meaning
- Welcome sequence: CSS keyframes only, no JavaScript timers for visual pacing

---

## Components

### Buttons

Three button types:

1. **Dark primary** — `#181614` background, `#EDE9E4` text. For the primary action.
2. **Ghost** — Near-white background, gold border tint. For secondary/ambient actions.
3. **Text** — No background, no border. For tertiary actions (reset, cancel).

All buttons: `border-radius: 0.75rem`. No sharp corners.

### Cards

Full-bleed image cards with a gradient overlay. Dark cinematic overlay (`rgba(6,5,10, α)`).
Border-radius: `0.75rem`. Shadow: `0 4px 20px rgba(20,18,16,0.18)`.

### Overlays

Dark backdrop: `rgba(25,23,26,0.76)` with `backdrop-filter: blur(5px)`.
Card: light `#F8F7F5`, `border-radius: 1.25rem`, generous padding.
Entrance: opacity fade + spring scale (`cubic-bezier(0.34, 1.26, 0.64, 1)`).

### Inputs

Light background: transparent with `#DDDBD6` border. Focus: gold border tint.
Dark background (Noah panel): `rgba(255,255,255,0.06)` with `rgba(237,233,228,0.18)` border.

---

## The crosshair

The Mission Control logo is a crosshair — a precision instrument symbol.

It represents: focus, targeting, intentionality.
Color: gold `#A88A3A`.
It appears only in the header. It does not repeat.

---

## Design library

Visual references, persona boards, and design assets live in `docs/design/`.

| Folder | Contents |
|--------|----------|
| `docs/design/noah/` | Noah persona board, visual identity documentation |
| `docs/design/mission-control/` | UI references, screen compositions |
| `docs/design/inspiration/` | Mood references, aesthetic direction |

### Noah visual identity

Noah has a defined visual identity with three modes (Executive, Reflective, Creative), a canonical age range (40–55), and a world-citizen ethnicity that is deliberately ambiguous.

Full specification: [`docs/design/noah/README.md`](design/noah/README.md)
Canonical reference image: `docs/design/noah/noah-persona-board.png`

All Noah portraits used in Mission Control must conform to this specification.
