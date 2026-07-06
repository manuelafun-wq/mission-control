"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { generateBriefing } from "@/lib/noah/briefing";
import { buildNoahContext } from "@/lib/noah/context";
import type { NoahBriefing } from "@/lib/noah/types";

// ── Icons ─────────────────────────────────────────────────────────────────────

const CrosshairIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <circle cx="19" cy="19" r="12" stroke="#A88A3A" strokeWidth="1.2" />
    <circle cx="19" cy="19" r="2.5" fill="#A88A3A" />
    <line x1="19" y1="2"  x2="19" y2="10" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="19" y1="28" x2="19" y2="36" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="2"  y1="19" x2="10" y2="19" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="28" y1="19" x2="36" y2="19" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="9"  y1="22" x2="15" y2="22" />
  </svg>
);

const ChevronRight = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-5.26L4 11l5.91-1.74L12 2z" />
  </svg>
);

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"      x2="12" y2="5" />
    <line x1="12" y1="19"     x2="12" y2="22" />
    <line x1="4.22" y1="4.22"   x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78"  x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const UsersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 1 7 7c0 3-1.8 5.4-4 6.7V17H9v-1.3C6.8 14.4 5 12 5 9a7 7 0 0 1 7-7z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const projects = [
  { name: "AYA",             subtitle: "Financiële autonomie voor iedereen", image: "/images/project-aya.jpg", alt: "Bergzonsopgang",      Icon: SunIcon    },
  { name: "Mission Control", subtitle: "Jouw Executive Office",              image: "/images/project-mc.jpg",  alt: "Stille natuur",       Icon: PeopleIcon },
  { name: "Website",         subtitle: "Manuela Fun",                        image: "/images/project-web.jpg", alt: "Moderne architectuur", Icon: GlobeIcon  },
];

const ALL_PROJECTS = [
  "AYA",
  "Mission Control",
  "Menskompas",
  "Website",
  "Kwetsbaar Evenwicht",
  "Podcast",
  "House of Navutiita",
  "AI Business",
];

const todaySummary = [
  { Icon: CheckCircleIcon, count: "1", text: "beslissing wacht op jou" },
  { Icon: UsersIcon,       count: "2", text: "collega's wachten op input" },
  { Icon: LightbulbIcon,   count: "1", text: "nieuw idee" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPlan(list: string[]): string {
  if (list.length === 0) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} en ${list[1]}`;
  return `${list.slice(0, -1).join(", ")} en ${list[list.length - 1]}`;
}

// ── localStorage memory ───────────────────────────────────────────────────────

function getToday(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

const MC = {
  date:      "mc_date",
  projects:  "mc_projects",
  ideas:     "mc_ideas",
  decisions: "mc_decisions",
} as const;

function useMissionMemory() {
  const [projects,  setProjects]  = useState<string[]>([]);
  const [ideas,     setIdeas]     = useState<string[]>([]);
  const [decisions, setDecisions] = useState<string[]>([]);
  const [loaded,    setLoaded]    = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(MC.date) === getToday()) {
        setProjects(JSON.parse(localStorage.getItem(MC.projects)  || "[]"));
        setIdeas(   JSON.parse(localStorage.getItem(MC.ideas)     || "[]"));
        setDecisions(JSON.parse(localStorage.getItem(MC.decisions) || "[]"));
      }
    } catch {}
    setLoaded(true);
  }, []);

  function store(key: string, value: string[]) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  const savePlan = (p: string[]) => {
    setProjects(p);
    try {
      localStorage.setItem(MC.date, getToday());
      localStorage.setItem(MC.projects, JSON.stringify(p));
    } catch {}
  };

  const addIdea = (text: string) => {
    const next = [...ideas, text];
    setIdeas(next);
    store(MC.ideas, next);
  };

  const addDecision = (text: string) => {
    const next = [...decisions, text];
    setDecisions(next);
    store(MC.decisions, next);
  };

  const resetToday = () => {
    setProjects([]);
    setIdeas([]);
    setDecisions([]);
    try { Object.values(MC).forEach((k) => localStorage.removeItem(k)); } catch {}
  };

  return { projects, ideas, decisions, loaded, savePlan, addIdea, addDecision, resetToday };
}

// ── Memory section (lives in Noah panel) ─────────────────────────────────────

function MemorySection({
  projects, ideas, decisions, onAddIdea, onAddDecision, onReset,
}: {
  projects:      string[];
  ideas:         string[];
  decisions:     string[];
  onAddIdea:     (text: string) => void;
  onAddDecision: (text: string) => void;
  onReset:       () => void;
}) {
  const [ideaText,       setIdeaText]       = useState("");
  const [decisionText,   setDecisionText]   = useState("");
  const [addingIdea,     setAddingIdea]     = useState(false);
  const [addingDecision, setAddingDecision] = useState(false);
  const [confirmReset,   setConfirmReset]   = useState(false);

  useEffect(() => {
    if (!confirmReset) return;
    const t = setTimeout(() => setConfirmReset(false), 3000);
    return () => clearTimeout(t);
  }, [confirmReset]);

  const submitIdea = () => {
    const t = ideaText.trim();
    if (t) onAddIdea(t);
    setIdeaText("");
    setAddingIdea(false);
  };

  const submitDecision = () => {
    const t = decisionText.trim();
    if (t) onAddDecision(t);
    setDecisionText("");
    setAddingDecision(false);
  };

  const mid    = "rgba(237,233,228,0.62)";
  const bright = "#EDE9E4";

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.125rem" }}>
        <p
          className="font-medium"
          style={{ fontSize: "0.59rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,233,228,0.32)" }}
        >
          Opgeslagen door Noah
        </p>
        <button
          onClick={() => {
            if (confirmReset) { onReset(); setConfirmReset(false); }
            else setConfirmReset(true);
          }}
          style={{
            fontSize: "0.68rem",
            color: confirmReset ? "#E87A6A" : "rgba(237,233,228,0.2)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: confirmReset ? 500 : 400,
            padding: 0,
            transition: "color 0.2s",
          }}
        >
          {confirmReset ? "Zeker?" : "Reset"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {/* Today plan */}
        <p style={{ fontSize: "0.8125rem", color: projects.length > 0 ? mid : "rgba(237,233,228,0.25)", lineHeight: 1.7, fontStyle: projects.length > 0 ? "normal" : "italic" }}>
          {projects.length > 0 ? formatPlan(projects) : "Nog niet gepland."}
        </p>

        {/* Ideas */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8125rem", color: mid }}>
              Ideeën
              {ideas.length > 0 && (
                <span style={{ color: bright, fontWeight: 600, marginLeft: "0.35rem" }}>({ideas.length})</span>
              )}
            </span>
            {!addingIdea && (
              <button
                onClick={() => { setAddingIdea(true); setAddingDecision(false); setDecisionText(""); }}
                style={{ fontSize: "0.72rem", color: "#A88A3A", background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0 }}
              >
                + toevoegen
              </button>
            )}
          </div>
          {addingIdea && (
            <input
              autoFocus
              className="mc-input-dark"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")  submitIdea();
                if (e.key === "Escape") { setAddingIdea(false); setIdeaText(""); }
              }}
              onBlur={() => {
                if (ideaText.trim()) submitIdea();
                else { setAddingIdea(false); setIdeaText(""); }
              }}
              placeholder="Typ je idee → Enter"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.5rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(237,233,228,0.18)",
                borderRadius: "0.5rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.8125rem",
                color: "rgba(237,233,228,0.9)",
                boxSizing: "border-box",
              }}
            />
          )}
        </div>

        {/* Decisions */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8125rem", color: mid }}>
              Beslissingen
              {decisions.length > 0 && (
                <span style={{ color: bright, fontWeight: 600, marginLeft: "0.35rem" }}>({decisions.length})</span>
              )}
            </span>
            {!addingDecision && (
              <button
                onClick={() => { setAddingDecision(true); setAddingIdea(false); setIdeaText(""); }}
                style={{ fontSize: "0.72rem", color: "#A88A3A", background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0 }}
              >
                + toevoegen
              </button>
            )}
          </div>
          {addingDecision && (
            <input
              autoFocus
              className="mc-input-dark"
              value={decisionText}
              onChange={(e) => setDecisionText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")  submitDecision();
                if (e.key === "Escape") { setAddingDecision(false); setDecisionText(""); }
              }}
              onBlur={() => {
                if (decisionText.trim()) submitDecision();
                else { setAddingDecision(false); setDecisionText(""); }
              }}
              placeholder="Typ je beslissing → Enter"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.5rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(237,233,228,0.18)",
                borderRadius: "0.5rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.8125rem",
                color: "rgba(237,233,228,0.9)",
                boxSizing: "border-box",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared overlay backdrop ───────────────────────────────────────────────────

function Overlay({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(25,23,26,0.76)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}
    >
      {children}
    </div>
  );
}

function OverlayCard({ visible, wide, children }: { visible: boolean; wide?: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#F8F7F5",
        borderRadius: "1.25rem",
        padding: "2.75rem 3.25rem",
        maxWidth: wide ? "48rem" : "38rem",
        width: "90%",
        boxShadow: "0 24px 80px rgba(0,0,0,0.32)",
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "transform 0.48s cubic-bezier(0.34,1.26,0.64,1)",
      }}
    >
      {children}
    </div>
  );
}

function OverlayHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.875rem",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid #DDDBD6",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#3DE88A",
          boxShadow: "0 0 8px rgba(61,232,138,0.65)",
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontSize: "0.59rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#908A84",
          fontWeight: 500,
        }}
      >
        Noah · Chief of Staff
      </p>
    </div>
  );
}

// ── Morning Brief layout ──────────────────────────────────────────────────────

function MorningBrief({ briefing }: { briefing: NoahBriefing }) {
  const [rec] = briefing.recommendations;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "1.875rem",
          color: "#181614",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          fontWeight: 400,
        }}
      >
        {briefing.greeting}
      </h2>

      {/* Observations — meaning, not activity */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {briefing.observations.map((obs, i) => (
          <p key={i} style={{ fontSize: "0.9375rem", color: "#68645F", lineHeight: 1.8 }}>
            {obs}
          </p>
        ))}
      </div>

      {/* Single recommendation */}
      {rec && (
        <>
          <div style={{ height: 1, background: "#EEECEA" }} />
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "#908A84", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Focus vandaag op
            </p>
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.5rem",
                color: "#181614",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              {rec.project}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ fontSize: "0.875rem", color: "#3A3530", lineHeight: 1.8 }}>
                {rec.whyItMatters}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#68645F", lineHeight: 1.8 }}>
                {rec.whyNow}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "#908A84", lineHeight: 1.75, fontStyle: "italic" }}>
                {rec.longTermValue}
              </p>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#A88A3A", marginTop: "0.875rem", lineHeight: 1.6 }}>
              → {rec.nextAction}
            </p>
          </div>
        </>
      )}

      <div style={{ height: 1, background: "#EEECEA" }} />

      <p style={{ fontSize: "0.9375rem", color: "#68645F", lineHeight: 1.8 }}>
        {briefing.closingQuestion}
      </p>
    </div>
  );
}

// ── Deep Brief layout ─────────────────────────────────────────────────────────

function DeepBrief({ briefing }: { briefing: NoahBriefing }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.375rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "1.875rem",
          color: "#181614",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          fontWeight: 400,
        }}
      >
        {briefing.greeting}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {briefing.observations.map((obs, i) => (
          <p key={i} style={{ fontSize: "0.9375rem", color: "#68645F", lineHeight: 1.8 }}>
            {obs}
          </p>
        ))}
      </div>

      <div>
        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#181614", letterSpacing: "0.04em", marginBottom: "1rem" }}>
          Mijn aanbeveling voor vandaag:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {briefing.recommendations.map(({ project, whyItMatters, whyNow, nextAction }) => (
            <div key={project} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A88A3A", flexShrink: 0, marginTop: "0.45rem" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <p style={{ fontSize: "0.9375rem", color: "#2A2724", fontWeight: 500, lineHeight: 1.3 }}>{project}</p>
                <p style={{ fontSize: "0.8125rem", color: "#68645F", lineHeight: 1.75 }}>{whyItMatters} {whyNow}</p>
                <p style={{ fontSize: "0.75rem", color: "#A88A3A", lineHeight: 1.6, marginTop: "0.1rem" }}>→ {nextAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "0.9375rem", color: "#68645F", lineHeight: 1.8 }}>
        {briefing.closingQuestion}
      </p>
    </div>
  );
}

// ── Briefing Overlay ──────────────────────────────────────────────────────────

function BriefingOverlay({
  briefing,
  onAccept,
  onChooseOther,
}: {
  briefing: NoahBriefing | null;
  onAccept: () => void;
  onChooseOther: () => void;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <Overlay visible={visible}>
      <OverlayCard visible={visible}>
        <OverlayHeader />

        {briefing === null ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minHeight: "14rem", justifyContent: "center" }}>
            <div style={{ width: "55%", height: "2rem", borderRadius: "0.5rem", background: "#EEECEA" }} />
            <div style={{ width: "88%", height: "1rem", borderRadius: "0.5rem", background: "#EEECEA" }} />
            <div style={{ width: "72%", height: "1rem", borderRadius: "0.5rem", background: "#EEECEA" }} />
            <div style={{ width: "80%", height: "1rem", borderRadius: "0.5rem", background: "#EEECEA", marginTop: "0.5rem" }} />
          </div>
        ) : briefing.mode === "morning" ? (
          <MorningBrief briefing={briefing} />
        ) : (
          <DeepBrief briefing={briefing} />
        )}

        <div style={{ display: "flex", gap: "0.875rem", marginTop: "2.25rem" }}>
          <button
            onClick={onAccept}
            disabled={briefing === null}
            style={{
              flex: 1,
              background: briefing === null ? "#EEECEA" : "#181614",
              color: briefing === null ? "#B8B4AE" : "#EDE9E4",
              borderRadius: "0.75rem",
              padding: "0.9rem 1.25rem",
              fontSize: "0.9375rem",
              fontWeight: 500,
              border: "none",
              cursor: briefing === null ? "default" : "pointer",
              transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => { if (briefing) e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Laten we beginnen
          </button>
          <button
            onClick={onChooseOther}
            style={{
              flex: 1,
              background: "transparent",
              color: "#68645F",
              borderRadius: "0.75rem",
              padding: "0.9rem 1.25rem",
              fontSize: "0.9375rem",
              border: "1px solid #DDDBD6",
              cursor: "pointer",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#EEECEA"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Ik kies iets anders
          </button>
        </div>
      </OverlayCard>
    </Overlay>
  );
}

// ── Project Picker ────────────────────────────────────────────────────────────

function ProjectPicker({ onConfirm }: { onConfirm: (projects: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const toggle = (project: string) => {
    setSelected((prev) => {
      if (prev.includes(project)) return prev.filter((p) => p !== project);
      if (prev.length >= 3) return prev;
      return [...prev, project];
    });
  };

  const canConfirm = selected.length > 0;

  return (
    <Overlay visible={visible}>
      <OverlayCard visible={visible} wide>
        <OverlayHeader />

        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "1.625rem",
            color: "#181614",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            fontWeight: 400,
            marginBottom: "0.625rem",
          }}
        >
          Waar wil je vandaag aan werken?
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#908A84", marginBottom: "1.875rem" }}>
          Kies maximaal 3 projecten.
          {selected.length > 0 && (
            <span style={{ color: "#A88A3A", fontWeight: 500, marginLeft: "0.5rem" }}>
              {selected.length} gekozen
            </span>
          )}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.625rem",
            marginBottom: "1.875rem",
          }}
        >
          {ALL_PROJECTS.map((project) => {
            const isSelected = selected.includes(project);
            const isDisabled = !isSelected && selected.length >= 3;

            return (
              <button
                key={project}
                onClick={() => !isDisabled && toggle(project)}
                style={{
                  padding: "0.875rem 1.125rem",
                  borderRadius: "0.75rem",
                  border: isSelected ? "1.5px solid #A88A3A" : "1px solid #DDDBD6",
                  background: isSelected ? "rgba(168,138,58,0.07)" : "transparent",
                  color: isDisabled ? "#C8C4BE" : "#2A2724",
                  fontSize: "0.9375rem",
                  fontWeight: isSelected ? 500 : 400,
                  textAlign: "left",
                  cursor: isDisabled ? "default" : "pointer",
                  opacity: isDisabled ? 0.4 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "border-color 0.2s, background 0.2s, opacity 0.2s",
                }}
              >
                <span
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    border: isSelected ? "none" : "1.5px solid #CCCAC6",
                    background: isSelected ? "#A88A3A" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  {isSelected && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {project}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => canConfirm && onConfirm(selected)}
          style={{
            width: "100%",
            background: canConfirm ? "#181614" : "#EEECEA",
            color: canConfirm ? "#EDE9E4" : "#B8B4AE",
            borderRadius: "0.75rem",
            padding: "0.95rem 1.5rem",
            fontSize: "0.9375rem",
            fontWeight: 500,
            border: "none",
            cursor: canConfirm ? "pointer" : "default",
            letterSpacing: "0.01em",
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => { if (canConfirm) e.currentTarget.style.opacity = "0.82"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          {canConfirm
            ? `Dag plannen →`
            : "Kies een project om door te gaan"}
        </button>
      </OverlayCard>
    </Overlay>
  );
}

// ── Screen 2: Executive Office ────────────────────────────────────────────────

function ExecutiveOffice() {
  const [visible, setVisible] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [projectPickerOpen, setProjectPickerOpen] = useState(false);
  const [briefing, setBriefing] = useState<NoahBriefing | null>(null);
  const memory = useMissionMemory();
  const todayPlan = memory.projects.length > 0 ? memory.projects : null;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const openBriefing = () => {
    setBriefing(null);
    setBriefingOpen(true);
    const ctx = buildNoahContext({
      projects:  memory.projects,
      ideas:     memory.ideas,
      decisions: memory.decisions,
    });
    generateBriefing(ctx).then(setBriefing);
  };

  const handleAccept = () => {
    setBriefingOpen(false);
    if (briefing) {
      memory.savePlan(briefing.recommendations.map((r) => r.project));
    }
  };

  const handleChooseOther = () => {
    setBriefingOpen(false);
    setProjectPickerOpen(true);
  };

  const handlePlanConfirmed = (selected: string[]) => {
    setProjectPickerOpen(false);
    memory.savePlan(selected);
  };

  return (
    <>
      <div
        className="flex flex-1"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* ── Left: Main Content ── */}
        <div className="flex-1 flex flex-col px-16 pt-10 pb-10" style={{ minWidth: 0 }}>

          {/* Logo */}
          <header className="flex items-center gap-4" style={{ marginBottom: "3.25rem" }}>
            <CrosshairIcon />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <p className="font-medium uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.16em", color: "#181614" }}>
                Mission Control
              </p>
              <p className="font-light uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#908A84" }}>
                Executive Office
              </p>
            </div>
          </header>

          {/* Greeting */}
          <div style={{ marginBottom: "2.25rem" }}>
            <h1
              className="font-normal"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#181614",
                marginBottom: "1.25rem",
              }}
            >
              Goedemorgen,<br />Manuela.
            </h1>
            <div style={{ width: 48, height: 1, background: "#A88A3A", marginBottom: "1.1rem" }} />

            {/* Status line — switches when plan is set */}
            {todayPlan ? (
              <p className="font-light" style={{ color: "#68645F", fontSize: "1rem", lineHeight: 1.75, letterSpacing: "0.02em" }}>
                Vandaag werken we aan:{" "}
                <span style={{ color: "#181614", fontWeight: 500 }}>
                  {formatPlan(todayPlan)}
                </span>
                .
              </p>
            ) : (
              <p className="font-light" style={{ color: "#68645F", fontSize: "1rem", lineHeight: 1.75, letterSpacing: "0.02em" }}>
                Noah heeft je dag voorbereid.
              </p>
            )}
          </div>

          {/* Begin briefing button */}
          <button
            onClick={openBriefing}
            className="flex items-center justify-center gap-3 transition-all duration-500 hover:opacity-75"
            style={{
              background: "rgba(248,247,245,0.92)",
              border: "1px solid rgba(168,138,58,0.2)",
              borderRadius: "0.75rem",
              boxShadow: "0 1px 10px rgba(24,22,20,0.06), inset 0 0 0 0.5px rgba(168,138,58,0.07)",
              padding: "0.9rem 2rem",
              color: "#2A2724",
              fontSize: "0.9375rem",
              fontWeight: 400,
              letterSpacing: "0.01em",
              marginBottom: "2.5rem",
            }}
          >
            <span style={{ color: "#A88A3A", display: "flex" }}>
              <MicIcon />
            </span>
            {todayPlan ? "Plan bijstellen" : "Begin briefing"}
          </button>

          {/* Proposal section */}
          <div className="flex flex-col flex-1" style={{ gap: "1rem" }}>
            <p className="font-medium uppercase" style={{ fontSize: "0.62rem", color: "#908A84", letterSpacing: "0.2em" }}>
              Mijn voorstel voor vandaag
            </p>

            {/* Project cards */}
            <div className="grid grid-cols-3 gap-4">
              {projects.map(({ name, subtitle, image, alt, Icon }) => {
                const slug = name.toLowerCase().replace(/\s+/g, "-");
                const cardInner = (
                  <>
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1440px) 28vw, 300px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(6,5,10,0.88) 0%, rgba(6,5,10,0.3) 55%, transparent 100%)" }}
                    />
                    <div className="absolute top-3 left-3">
                      <Icon />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                      <div>
                        <p className="font-medium text-white" style={{ fontSize: "0.9rem", lineHeight: 1.3 }}>{name}</p>
                        <p className="font-light" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.56)", lineHeight: 1.4, marginTop: "0.2rem" }}>{subtitle}</p>
                      </div>
                      <div
                        className="flex items-center justify-center rounded-full bg-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{ width: 28, height: 28 }}
                      >
                        <ChevronRight color="#181614" />
                      </div>
                    </div>
                  </>
                );

                return name === "Mission Control" ? (
                  <Link
                    key={name}
                    href={`/projects/${slug}`}
                    className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-0.5"
                    style={{ height: "12.5rem", boxShadow: "0 4px 20px rgba(20,18,16,0.18)", display: "block" }}
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <div
                    key={name}
                    className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-0.5"
                    style={{ height: "12.5rem", boxShadow: "0 4px 20px rgba(20,18,16,0.18)" }}
                  >
                    {cardInner}
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="w-full flex items-center rounded-xl transition-all duration-500 hover:opacity-84"
                style={{
                  background: "#181614",
                  padding: "0.95rem 1.5rem",
                  color: "#EDE9E4",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  gap: "0.75rem",
                }}
              >
                <SparkleIcon />
                <span style={{ flex: 1, textAlign: "center" }}>Laten we beginnen</span>
                <ChevronRight color="rgba(237,233,228,0.45)" />
              </button>
              <button
                className="w-full flex items-center rounded-xl transition-all duration-500"
                style={{
                  background: "transparent",
                  border: "1px solid #DDDBD6",
                  padding: "0.95rem 1.5rem",
                  color: "#68645F",
                  fontSize: "0.9375rem",
                  gap: "0.75rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F0EFEC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ flex: 1, textAlign: "center" }}>Ik wil vandaag iets anders</span>
                <ChevronRight color="#908A84" />
              </button>
            </div>

            {/* Footer */}
            <p
              className="text-center font-light uppercase tracking-widest mt-auto"
              style={{ fontSize: "0.58rem", color: "#B8B4AE", letterSpacing: "0.28em" }}
            >
              Focus&nbsp;&nbsp;•&nbsp;&nbsp;Overzicht&nbsp;&nbsp;•&nbsp;&nbsp;Voortgang
            </p>
          </div>
        </div>

        {/* ── Right: Noah panel ── */}
        <div
          className="flex flex-col flex-shrink-0 noah-panel"
          style={{ width: "20rem", background: "#19171A", padding: "2.25rem 2.5rem 2.5rem" }}
        >
          <div className="flex items-center gap-2.5" style={{ marginBottom: "2.5rem" }}>
            <span
              className="rounded-full flex-shrink-0"
              style={{ width: 7, height: 7, background: "#3DE88A", boxShadow: "0 0 10px rgba(61,232,138,0.75)" }}
            />
            <p className="font-medium uppercase" style={{ fontSize: "0.59rem", color: "rgba(237,233,228,0.4)", letterSpacing: "0.2em" }}>
              Noah is ready
            </p>
          </div>

          <div className="flex flex-col items-center" style={{ gap: "1.25rem", marginBottom: "2rem" }}>
            <div
              className="relative overflow-hidden rounded-full"
              style={{ width: 148, height: 148, boxShadow: "0 0 0 1px rgba(237,233,228,0.14), 0 12px 48px rgba(0,0,0,0.55)" }}
            >
              <Image src="/images/noah-v3.jpg" alt="Noah, Chief of Staff" fill className="object-cover" style={{ objectPosition: "65% 15%" }} sizes="148px" />
            </div>
            <div className="text-center">
              <h2
                className="font-normal"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.875rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  color: "#EDE9E4",
                  marginBottom: "0.5rem",
                }}
              >
                Noah
              </h2>
              <p className="font-light uppercase" style={{ fontSize: "0.59rem", color: "rgba(237,233,228,0.36)", letterSpacing: "0.2em" }}>
                Chief of Staff
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(237,233,228,0.08)", marginBottom: "1.75rem" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.75rem" }}>
            <p className="font-light" style={{ fontSize: "0.875rem", color: "rgba(237,233,228,0.72)", lineHeight: 1.9 }}>
              Ik bewaak focus, overzicht en voortgang.<br />
              Jij bepaalt de richting.
            </p>
            <p className="font-light" style={{ fontSize: "0.875rem", color: "rgba(237,233,228,0.36)", lineHeight: 1.9 }}>
              Samen zorgen we dat de juiste<br />dingen gebeuren.
            </p>
          </div>

          <div style={{ height: 1, background: "rgba(237,233,228,0.08)", marginBottom: "1.75rem" }} />

          <div>
            <p className="font-medium uppercase" style={{ fontSize: "0.59rem", color: "rgba(237,233,228,0.32)", letterSpacing: "0.2em", marginBottom: "1.25rem" }}>
              Vandaag in het kort
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1.1rem", color: "rgba(237,233,228,0.38)" }}>
              {todaySummary.map(({ Icon, count, text }) => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <Icon />
                  <span className="font-semibold" style={{ fontSize: "0.875rem", minWidth: "0.75rem", color: "#EDE9E4" }}>{count}</span>
                  <span className="font-light" style={{ fontSize: "0.875rem", color: "rgba(237,233,228,0.62)", lineHeight: 1.5 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {memory.loaded && (
            <>
              <div style={{ height: 1, background: "rgba(237,233,228,0.08)", margin: "1.75rem 0 1.5rem" }} />
              <MemorySection
                projects={memory.projects}
                ideas={memory.ideas}
                decisions={memory.decisions}
                onAddIdea={memory.addIdea}
                onAddDecision={memory.addDecision}
                onReset={memory.resetToday}
              />
            </>
          )}
        </div>
      </div>

      {/* ── Overlays ── */}
      {briefingOpen && (
        <BriefingOverlay
          briefing={briefing}
          onAccept={handleAccept}
          onChooseOther={handleChooseOther}
        />
      )}
      {projectPickerOpen && (
        <ProjectPicker onConfirm={handlePlanConfirmed} />
      )}
    </>
  );
}

// ── Screen 1: Welcome Sequence ────────────────────────────────────────────────

export default function Home() {
  const [exiting, setExiting] = useState(false);
  const [showOffice, setShowOffice] = useState(false);

  const begin = () => {
    setExiting(true);
    setTimeout(() => setShowOffice(true), 1300);
  };

  if (showOffice) return <ExecutiveOffice />;

  return (
    <main
      className="flex-1 flex items-center justify-center"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 1.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "22rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Phase 1 — Identity */}
        <div
          className="anim-logo"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.875rem",
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "2.75rem",
              letterSpacing: "-0.02em",
              color: "#181614",
              fontWeight: 400,
            }}
          >
            Mission Control
          </h1>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#908A84", fontWeight: 300 }}>
            Executive Office
          </p>
        </div>

        {/* Phase 2 — Greeting + action */}
        <div
          className="anim-greeting"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                color: "#181614",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Goedemorgen, Manuela.
            </h1>
            <p style={{ fontSize: "1rem", color: "#68645F", fontWeight: 300, letterSpacing: "0.02em", lineHeight: 1.75 }}>
              Noah heeft je dag voorbereid.
            </p>
          </div>

          <button
            onClick={begin}
            style={{
              background: "#181614",
              border: "1px solid rgba(168,138,58,0.22)",
              boxShadow: "0 4px 28px rgba(0,0,0,0.2)",
              color: "#EDE9E4",
              borderRadius: "0.875rem",
              padding: "1.15rem 3rem",
              fontSize: "1.05rem",
              fontWeight: 400,
              letterSpacing: "0.015em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.875rem",
              cursor: "pointer",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1";  e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ color: "#A88A3A", display: "flex" }}><MicIcon /></span>
            Begin briefing
          </button>
        </div>
      </div>
    </main>
  );
}
