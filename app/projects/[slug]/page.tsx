"use client";

import { use } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = "Planning" | "Building" | "Testing" | "Live";

interface ActivityItem {
  date:   string;
  title:  string;
  status: "done" | "in-progress";
}

interface ProjectData {
  name:               string;
  tagline:            string;
  overview:           string;
  status:             Status;
  statusNote:         string;
  noahRecommendation: string;
  nextStep:           string;
  openDecisions:      string[];
  builderStatus:      string;
  recentActivity:     ActivityItem[];
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const PROJECTS: Record<string, ProjectData> = {
  "mission-control": {
    name:    "Mission Control",
    tagline: "Je Executive Office. Gebouwd om te groeien.",
    overview:
      "Mission Control is geen productivity app. Het is de werkruimte van een Visionary — " +
      "een plek waar AI de complexiteit beheert zodat jij je kunt richten op wat alleen jij kunt doen. " +
      "Phase 1 bouwt het fundament: de dagelijkse briefing, Noah's geheugen, en de projectstructuur. " +
      "Elk uur dat hier geïnvesteerd wordt, werkt door in alle andere projecten.",
    status:     "Building",
    statusNote: "Phase 1 is actief. Builder werkt aan Noah Brain en de eerste Project Rooms. Het fundament is gelegd.",
    noahRecommendation:
      "Mission Control is het enige project dat alle andere projecten versnelt. " +
      "Elk uur hier geïnvesteerd heeft een multiplicerend effect op alles wat daarna komt. " +
      "Maak Phase 1 af voordat je uitbreidt.",
    nextStep:
      "Definieer wat Phase 2 (Projects) er concreet uit gaat zien. " +
      "Welke projecten krijgen als eerste een eigen Project Room?",
    openDecisions: [
      "Wanneer is Phase 1 officieel klaar? Wat zijn de exacte criteria?",
      "Welke projecten krijgen als eerste een eigen Project Room in Phase 2?",
    ],
    builderStatus:
      "Bezig met Build Order #15: Project Room (v1). " +
      "De eerste dedicated werkruimte voor Mission Control zelf.",
    recentActivity: [
      { date: "Vandaag",         title: "Build Order #15: Project Room (v1)",            status: "in-progress" },
      { date: "Gisteren",        title: "Build Order #14: Visionary Profile",             status: "done" },
      { date: "Gisteren",        title: "Build Order #13: Morning Brief v2",              status: "done" },
      { date: "2 dagen geleden", title: "Build Order #12: Executive Reasoning Engine",    status: "done" },
      { date: "2 dagen geleden", title: "Build Order #11: Noah Brain layer",              status: "done" },
      { date: "3 dagen geleden", title: "Build Order #10: Company documentation",         status: "done" },
      { date: "3 dagen geleden", title: "Build Order #9: Architecture documentation",     status: "done" },
    ],
  },
};

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<Status, { bg: string; text: string; dot: string }> = {
  Planning: { bg: "rgba(168,138,58,0.08)", text: "#A88A3A",  dot: "#A88A3A"  },
  Building: { bg: "rgba(61,232,138,0.08)", text: "#2A9B61",  dot: "#3DE88A"  },
  Testing:  { bg: "rgba(99,102,241,0.08)", text: "#5B5FD9",  dot: "#6366F1"  },
  Live:     { bg: "rgba(24,22,20,0.06)",   text: "#181614",  dot: "#181614"  },
};

// ── Components ────────────────────────────────────────────────────────────────

function CrosshairIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="12" stroke="#A88A3A" strokeWidth="1.2" />
      <circle cx="19" cy="19" r="2.5" fill="#A88A3A" />
      <line x1="19" y1="2"  x2="19" y2="10" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19" y1="28" x2="19" y2="36" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2"  y1="19" x2="10" y2="19" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="19" x2="36" y2="19" stroke="#A88A3A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "0.59rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: "#908A84",
      marginBottom: "0.875rem",
    }}>
      {children}
    </p>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "1rem",
      padding: "1.75rem 2rem",
      border: "1px solid #EEECEA",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "#181614", fontWeight: 400 }}>
          Project niet gevonden.
        </p>
        <Link href="/" style={{ color: "#A88A3A", fontSize: "0.9375rem", marginTop: "1rem", display: "inline-block" }}>
          ← Terug naar Mission Control
        </Link>
      </div>
    );
  }

  const statusStyle = STATUS_STYLE[project.status];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F5" }}>

      {/* ── Header ── */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem 3.5rem",
        borderBottom: "1px solid #EEECEA",
        background: "#F8F7F5",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "#908A84",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#181614"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#908A84"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Executive Office
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <CrosshairIcon />
          <div>
            <p style={{ fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "#181614" }}>
              Mission Control
            </p>
            <p style={{ fontSize: "0.56rem", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.14em", color: "#908A84" }}>
              Executive Office
            </p>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: "3.5rem 3.5rem 3rem" }}>
        {/* Status badge */}
        <div style={{ marginBottom: "1.25rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: statusStyle.bg,
            borderRadius: "6rem",
            padding: "0.35rem 0.875rem",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: statusStyle.text,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusStyle.dot }} />
            {project.status}
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
          fontWeight: 400,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "#181614",
          marginBottom: "1.25rem",
        }}>
          {project.name}
        </h1>

        <div style={{ width: 40, height: 1, background: "#A88A3A", marginBottom: "1rem" }} />

        <p style={{ fontSize: "1rem", color: "#68645F", fontWeight: 300, letterSpacing: "0.02em" }}>
          {project.tagline}
        </p>
      </section>

      {/* ── Body: two columns ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 22rem",
        gap: "1.5rem",
        padding: "0 3.5rem 4rem",
        alignItems: "start",
      }}>

        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* 1. Project Overview */}
          <Card>
            <SectionLabel>Project Overview</SectionLabel>
            <p style={{ fontSize: "0.9375rem", color: "#3A3530", lineHeight: 1.9 }}>
              {project.overview}
            </p>
          </Card>

          {/* 5. Open Decisions */}
          <Card>
            <SectionLabel>Open Decisions</SectionLabel>
            {project.openDecisions.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "#B8B4AE", fontStyle: "italic" }}>
                Geen open beslissingen.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {project.openDecisions.map((decision, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "1.5px solid #DDDBD6",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6rem",
                      color: "#908A84",
                      fontWeight: 600,
                      marginTop: "0.1rem",
                    }}>
                      {i + 1}
                    </span>
                    <p style={{ fontSize: "0.9375rem", color: "#3A3530", lineHeight: 1.75 }}>
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* 7. Recent Activity */}
          <Card>
            <SectionLabel>Recent Activity</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {project.recentActivity.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "0.875rem 0",
                    borderBottom: i < project.recentActivity.length - 1 ? "1px solid #F0EEEB" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                    <span style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: item.status === "in-progress" ? "#3DE88A" : "#DDDBD6",
                      flexShrink: 0,
                      boxShadow: item.status === "in-progress" ? "0 0 8px rgba(61,232,138,0.6)" : "none",
                    }} />
                    <p style={{
                      fontSize: "0.875rem",
                      color: item.status === "in-progress" ? "#181614" : "#68645F",
                      fontWeight: item.status === "in-progress" ? 500 : 400,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {item.title}
                    </p>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#B8B4AE", flexShrink: 0 }}>
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* ── Right column (sidebar) ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* 2. Current Status */}
          <Card>
            <SectionLabel>Current Status</SectionLabel>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: statusStyle.dot,
                boxShadow: project.status === "Building" ? "0 0 10px rgba(61,232,138,0.5)" : "none",
              }} />
              <p style={{ fontSize: "1rem", fontWeight: 500, color: "#181614" }}>{project.status}</p>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#68645F", lineHeight: 1.8 }}>
              {project.statusNote}
            </p>
          </Card>

          {/* 3. Noah's Recommendation */}
          <div style={{
            background: "#19171A",
            borderRadius: "1rem",
            padding: "1.75rem 2rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.125rem" }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#3DE88A",
                boxShadow: "0 0 8px rgba(61,232,138,0.65)",
              }} />
              <p style={{
                fontSize: "0.59rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(237,233,228,0.4)",
              }}>
                Noah
              </p>
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(237,233,228,0.82)", lineHeight: 1.9 }}>
              {project.noahRecommendation}
            </p>
          </div>

          {/* 4. Next Step */}
          <Card style={{ borderLeft: "3px solid #A88A3A" }}>
            <SectionLabel>Next Step</SectionLabel>
            <p style={{ fontSize: "0.9375rem", color: "#2A2724", lineHeight: 1.8 }}>
              {project.nextStep}
            </p>
          </Card>

          {/* 6. Builder */}
          <Card>
            <SectionLabel>Builder</SectionLabel>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3DE88A",
                boxShadow: "0 0 8px rgba(61,232,138,0.6)",
                flexShrink: 0,
                marginTop: "0.45rem",
              }} />
              <p style={{ fontSize: "0.875rem", color: "#68645F", lineHeight: 1.8 }}>
                {project.builderStatus}
              </p>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
