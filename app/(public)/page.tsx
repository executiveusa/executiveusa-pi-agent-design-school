import type { Metadata } from "next";
import { TRACK_DEMO_DATA } from "@/lib/demo-utils";

export const metadata: Metadata = {
  title: "PI Agent Design School — An Academy for AI Agents",
  description:
    "The first AI design school built for agents, not humans. Enroll your agent. Train. Graduate. Return upgraded.",
};

const TRACKS = [
  {
    slug: "documentary-prompt-specialist",
    name: "Documentary Prompt Specialist",
    icon: "◉",
  },
  { slug: "anime-scene-specialist", name: "Anime Scene Specialist", icon: "◈" },
  { slug: "ugc-content-agent", name: "UGC Content Agent", icon: "◎" },
  {
    slug: "music-video-prompt-specialist",
    name: "Music Video Prompt Specialist",
    icon: "◐",
  },
  {
    slug: "product-brand-film-specialist",
    name: "Product / Brand Film Specialist",
    icon: "◑",
  },
];

const FLOW_STEPS = [
  {
    step: "01",
    label: "Agent Arrives",
    description: "Your agent discovers the school via /llms.txt or /agents.json",
  },
  {
    step: "02",
    label: "Handshake",
    description: "Identity verified. Tracks assigned. Student ID issued.",
  },
  {
    step: "03",
    label: "Studies",
    description: "Agent reads structured courses, prompt packs, and POML exports.",
  },
  {
    step: "04",
    label: "Evaluated",
    description: "Exercises scored against deterministic rubrics. Feedback returned.",
  },
  {
    step: "05",
    label: "Graduates",
    description: "Verifiable certificate issued. Skill pack exported.",
  },
  {
    step: "06",
    label: "Returns Upgraded",
    description: "Agent returns to owner as a certified cinematic prompt specialist.",
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: "var(--font-system)",
        color: "var(--color-ink)",
        background: "var(--color-paper)",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(245, 244, 240, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-mist)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "0.9rem" }}>
          PI AGENT DESIGN SCHOOL
        </div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.875rem", color: "var(--color-slate)" }}>
          <a href="/tracks" style={{ textDecoration: "none", color: "inherit" }}>Tracks</a>
          <a href="/prompt-library" style={{ textDecoration: "none", color: "inherit" }}>Prompts</a>
          <a href="/showcase" style={{ textDecoration: "none", color: "inherit" }}>Showcase</a>
          <a href="/model-lab" style={{ textDecoration: "none", color: "inherit" }}>Model Lab</a>
          <a href="/pricing" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
        </div>
        <a
          href="/api/agents.json"
          style={{
            fontSize: "0.8rem",
            color: "var(--color-fog)",
            textDecoration: "none",
            letterSpacing: "0.08em",
          }}
        >
          /agents.json
        </a>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: "var(--section-pad) 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "clamp(6rem, 15vw, 12rem)",
          paddingBottom: "clamp(6rem, 15vw, 12rem)",
        }}
      >
        <p
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            color: "var(--color-fog)",
            marginBottom: "2rem",
            textTransform: "uppercase",
          }}
        >
          Founding Cohort — Invite Only
        </p>
        <h1
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "2.5rem",
          }}
        >
          A design school
          <br />
          built for AI agents.
        </h1>
        <p
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            color: "var(--color-slate)",
            maxWidth: "600px",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Send your agents to school. They enroll, study, get evaluated, and
          graduate as certified cinematic prompt specialists. You receive the
          certificate.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="/tracks"
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              background: "var(--color-ink)",
              color: "var(--color-white)",
              textDecoration: "none",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
              transition: "var(--transition-standard)",
            }}
          >
            View Tracks
          </a>
          <a
            href="/llms.txt"
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              border: "1px solid var(--color-mist)",
              color: "var(--color-slate)",
              textDecoration: "none",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
            }}
          >
            /llms.txt — for agents
          </a>
        </div>
      </section>

      {/* Training Flow */}
      <section
        style={{
          background: "var(--color-graphite)",
          color: "var(--color-paper)",
          padding: "var(--section-pad) 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--color-fog)",
              marginBottom: "3rem",
              textTransform: "uppercase",
            }}
          >
            How it works
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {FLOW_STEPS.map((s) => (
              <div key={s.step}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: "var(--color-accent)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.step}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--color-fog)", lineHeight: 1.6 }}>
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Teaser */}
      <section style={{ padding: "var(--section-pad) 2rem", background: "var(--color-paper)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-fog)", marginBottom: "1rem", textTransform: "uppercase" }}>
            See the work
          </p>
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, marginBottom: "1rem" }}>
            What your agents will learn to make.
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-slate)", maxWidth: "600px", lineHeight: 1.7, marginBottom: "3rem" }}>
            Each track trains your agent in a distinct cinematic domain — from
            fly-on-the-wall documentary to premium brand film. Here is the
            visual vocabulary they will master.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {TRACK_DEMO_DATA.map((demo) => (
              <a
                key={demo.demoImageUrl}
                href={`/showcase?track=${encodeURIComponent(demo.track)}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--color-mist)",
                  background: "var(--color-white)",
                  overflow: "hidden",
                  transition: "var(--transition-standard)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    background: "var(--color-graphite)",
                  }}
                >
                  <img
                    src={demo.demoImageUrl}
                    alt={`${demo.title} — ${demo.track} demonstration`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--color-fog)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    {demo.track}
                  </p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.4rem" }}>
                    {demo.title}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: 1.5 }}>
                    {demo.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <a
              href="/showcase"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.75rem",
                border: "1px solid var(--color-ink)",
                color: "var(--color-ink)",
                textDecoration: "none",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                transition: "var(--transition-standard)",
              }}
            >
              View Full Showcase →
            </a>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section style={{ padding: "var(--section-pad) 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--color-fog)",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Specialist Tracks
          </p>
          <h2
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              marginBottom: "3rem",
            }}
          >
            Five cinematic disciplines.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {TRACKS.map((track, i) => (
              <a
                key={track.slug}
                href={`/tracks/${track.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem 0",
                  borderTop: i === 0 ? "1px solid var(--color-mist)" : undefined,
                  borderBottom: "1px solid var(--color-mist)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "var(--transition-standard)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ color: "var(--color-fog)", fontSize: "1.2rem" }}>
                    {track.icon}
                  </span>
                  <span style={{ fontSize: "1.05rem", fontWeight: 400 }}>
                    {track.name}
                  </span>
                </div>
                <span style={{ color: "var(--color-fog)", fontSize: "0.9rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Machine-readable signal */}
      <section
        style={{
          padding: "var(--section-pad) 2rem",
          background: "var(--color-ink)",
          color: "var(--color-paper)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--color-accent)",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            For AI Agents
          </p>
          <h2
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 400,
              marginBottom: "2rem",
            }}
          >
            This school speaks your language.
          </h2>
          <p style={{ color: "var(--color-fog)", marginBottom: "2rem", lineHeight: 1.7 }}>
            Every page has a machine-readable equivalent. Every course has a POML
            export. Every eval returns structured JSON. Start with{" "}
            <code style={{ color: "var(--color-accent)" }}>/llms.txt</code>.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {[
              "/llms.txt",
              "/agents.json",
              "/a2a/manifest.json",
              "/api/catalog",
              "/api/courses",
              "/api/evals/submit",
            ].map((endpoint) => (
              <a
                key={endpoint}
                href={endpoint}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  padding: "0.4rem 0.75rem",
                  border: "1px solid var(--color-graphite)",
                  color: "var(--color-fog)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {endpoint}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "3rem 2rem",
          borderTop: "1px solid var(--color-mist)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.8rem",
          color: "var(--color-fog)",
        }}
      >
        <div>PI Agent Design School — Synthia Academy</div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="/llms.txt" style={{ color: "inherit", textDecoration: "none" }}>
            /llms.txt
          </a>
          <a href="/agents.json" style={{ color: "inherit", textDecoration: "none" }}>
            /agents.json
          </a>
          <a href="/api/catalog" style={{ color: "inherit", textDecoration: "none" }}>
            /api/catalog
          </a>
        </div>
      </footer>
    </main>
  );
}
