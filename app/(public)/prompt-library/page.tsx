import type { Metadata } from "next";
import { SEED_PROMPTS } from "@/db/seed/prompts";
import { TRACK_DEMO_IMAGES } from "@/lib/demo-utils";

// Map seed prompt track strings to slugs used by TRACK_DEMO_IMAGES
const TRACK_STRING_TO_SLUG: Record<string, string> = {
  documentary: "documentary-prompt-specialist",
  anime: "anime-scene-specialist",
  ugc: "ugc-content-agent",
  music_video: "music-video-prompt-specialist",
  product_video: "product-brand-film-specialist",
  brand_film: "product-brand-film-specialist",
};

export const metadata: Metadata = {
  title: "Prompt Library — PI Agent Design School",
  description: "Structured, versioned cinematic prompt library. Search by track, shot type, mood, and model compatibility.",
};

export default function PromptLibraryPage() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "var(--section-pad) 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <a href="/" style={{ fontSize: "0.8rem", color: "var(--color-fog)", textDecoration: "none", display: "block", marginBottom: "3rem" }}>← Home</a>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-fog)", marginBottom: "1rem", textTransform: "uppercase" }}>Prompt Library</p>
      <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "3rem" }}>
        Structured. Versioned. Attributed.
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {SEED_PROMPTS.map((prompt, i) => {
          const trackSlug = TRACK_STRING_TO_SLUG[prompt.track] ?? null;
          const demoImageUrl = trackSlug ? TRACK_DEMO_IMAGES[trackSlug] : null;

          return (
            <div
              key={i}
              style={{
                borderTop: i === 0 ? "1px solid var(--color-mist)" : undefined,
                borderBottom: "1px solid var(--color-mist)",
                padding: "2rem 0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
                {/* Demo thumbnail */}
                {demoImageUrl && (
                  <a
                    href={trackSlug ? `/tracks/${trackSlug}` : "/showcase"}
                    style={{ flexShrink: 0, display: "block", textDecoration: "none" }}
                    aria-label={`View ${prompt.track} track demo`}
                  >
                    <img
                      src={demoImageUrl}
                      alt={`${prompt.track} track demonstration`}
                      style={{
                        width: "120px",
                        height: "68px",
                        objectFit: "cover",
                        display: "block",
                        border: "1px solid var(--color-mist)",
                        opacity: 0.8,
                      }}
                    />
                  </a>
                )}

                {/* Text content */}
                <div style={{ flex: 1, minWidth: "0" }}>
                  <h2 style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.5rem" }}>{prompt.title}</h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-slate)", lineHeight: 1.6, maxWidth: "600px" }}>
                    {prompt.agentReadableSummary}
                  </p>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem", border: "1px solid var(--color-mist)", color: "var(--color-fog)" }}>
                      {prompt.track}
                    </span>
                    {prompt.shotType && (
                      <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem", border: "1px solid var(--color-mist)", color: "var(--color-fog)" }}>
                        {prompt.shotType}
                      </span>
                    )}
                    {prompt.mood.slice(0, 2).map((m) => (
                      <span key={m} style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem", border: "1px solid var(--color-mist)", color: "var(--color-fog)" }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* API link */}
                <a
                  href={`/api/prompts/seed-${i + 1}`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-fog)", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  /api/prompts/seed-{i + 1}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
