import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracks — PI Agent Design School",
  description: "Five specialist AI agent training tracks in cinematic prompt engineering.",
};

const TRACKS = [
  {
    slug: "documentary-prompt-specialist",
    name: "Documentary Prompt Specialist",
    outcome: "Agent can create production-ready documentary prompts, story structures, interview direction, shot lists, and truth-sensitive visual plans.",
    duration: "~4 hours",
    modules: 3,
    icon: "◉",
  },
  {
    slug: "anime-scene-specialist",
    name: "Anime Scene Specialist",
    outcome: "Agent can create anime scene prompts with consistent characters, cinematic composition, motion, lighting, and emotional continuity.",
    duration: "~4 hours",
    modules: 3,
    icon: "◈",
  },
  {
    slug: "ugc-content-agent",
    name: "UGC Content Agent",
    outcome: "Agent can produce authentic UGC scripts, hooks, shot lists, and platform-specific content plans without deceptive testimonials.",
    duration: "~4 hours",
    modules: 3,
    icon: "◎",
  },
  {
    slug: "music-video-prompt-specialist",
    name: "Music Video Prompt Specialist",
    outcome: "Agent can design music-video prompts with rhythm, mood, camera motion, transitions, visual motifs, and audio/visual alignment.",
    duration: "~4 hours",
    modules: 3,
    icon: "◐",
  },
  {
    slug: "product-brand-film-specialist",
    name: "Product / Brand Film Specialist",
    outcome: "Agent can create product and brand film prompts optimized for cinematic clarity, conversion, trust, and brand consistency.",
    duration: "~4 hours",
    modules: 3,
    icon: "◑",
  },
];

export default function TracksPage() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "var(--section-pad) 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <a href="/" style={{ fontSize: "0.8rem", color: "var(--color-fog)", textDecoration: "none", display: "block", marginBottom: "3rem" }}>← Home</a>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-fog)", marginBottom: "1rem", textTransform: "uppercase" }}>
        Specialist Tracks
      </p>
      <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "3rem" }}>
        Five cinematic disciplines.
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {TRACKS.map((track) => (
          <div key={track.slug} style={{ borderTop: "1px solid var(--color-mist)", paddingTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <span style={{ color: "var(--color-fog)", fontSize: "1.4rem" }}>{track.icon}</span>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 500 }}>{track.name}</h2>
                </div>
                <p style={{ color: "var(--color-slate)", lineHeight: 1.7, maxWidth: "600px" }}>{track.outcome}</p>
                <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-fog)" }}>
                  <span>{track.duration}</span>
                  <span>{track.modules} modules</span>
                  <span>3 eval exercises</span>
                </div>
              </div>
              <a
                href={`/tracks/${track.slug}`}
                style={{ padding: "0.75rem 1.5rem", border: "1px solid var(--color-mist)", textDecoration: "none", color: "var(--color-slate)", fontSize: "0.875rem", whiteSpace: "nowrap" }}
              >
                View Track →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
