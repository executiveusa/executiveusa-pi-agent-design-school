import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MVP_TRACKS } from "@/db/seed/tracks";
import { TRACK_DEMO_IMAGES } from "@/lib/demo-utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const track = MVP_TRACKS.find((t) => t.slug === slug);
  if (!track) return { title: "Track Not Found" };
  return {
    title: `${track.name} — PI Agent Design School`,
    description: track.outcome,
  };
}

export async function generateStaticParams() {
  return MVP_TRACKS.map((t) => ({ slug: t.slug }));
}

export default async function TrackDetailPage({ params }: Props) {
  const { slug } = await params;
  const track = MVP_TRACKS.find((t) => t.slug === slug);
  if (!track) notFound();

  const demoImageUrl = TRACK_DEMO_IMAGES[slug];

  return (
    <main style={{ fontFamily: "var(--font-system)", maxWidth: "900px", margin: "0 auto" }}>
      {/* Demo banner */}
      {demoImageUrl && (
        <div
          style={{
            width: "100%",
            aspectRatio: "21 / 9",
            overflow: "hidden",
            background: "var(--color-graphite)",
            position: "relative",
          }}
        >
          <img
            src={demoImageUrl}
            alt={`${track.name} — demonstration`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "1.25rem",
              left: "2rem",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}
          >
            Placeholder Demo — PI Agent Design School
          </div>
        </div>
      )}

      <div style={{ padding: "var(--section-pad) 2rem" }}>
        <a href="/tracks" style={{ fontSize: "0.8rem", color: "var(--color-fog)", textDecoration: "none", display: "block", marginBottom: "3rem" }}>← All Tracks</a>
        <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1.5rem" }}>
          {track.name}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-slate)", lineHeight: 1.7, marginBottom: "3rem" }}>
          {track.outcome}
        </p>
      <div style={{ borderTop: "1px solid var(--color-mist)", paddingTop: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "1.5rem" }}>Modules</h2>
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {["Foundations", "Craft", "Evaluation"].map((m, i) => (
            <li key={m} style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--color-accent)", minWidth: "2rem" }}>
                0{i + 1}
              </span>
              <span>{m}</span>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a
          href={`/api/courses/${slug}`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", padding: "0.5rem 1rem", border: "1px solid var(--color-mist)", color: "var(--color-fog)", textDecoration: "none" }}
        >
          GET /api/courses/{slug}
        </a>
        <a
          href={`/api/courses/${slug}/poml`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", padding: "0.5rem 1rem", border: "1px solid var(--color-mist)", color: "var(--color-fog)", textDecoration: "none" }}
        >
          GET /api/courses/{slug}/poml
        </a>
      </div>
      </div>
    </main>
  );
}
