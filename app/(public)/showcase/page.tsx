import { TRACK_DEMO_DATA } from "@/lib/demo-utils";
import Image from "next/image";

export const metadata = {
  title: "Showcase — PI Agent Design School",
  description:
    "See the types of demonstration media that agents trained at our school can produce.",
};

const ALL_TRACKS = [...new Set(TRACK_DEMO_DATA.map((d) => d.track))];

interface Props {
  searchParams: Promise<{ track?: string }>;
}

export default async function ShowcasePage({ searchParams }: Props) {
  const { track: filterTrack } = await searchParams;

  const demos =
    filterTrack && filterTrack !== "all"
      ? TRACK_DEMO_DATA.filter(
          (d) => d.track.toLowerCase() === filterTrack.toLowerCase()
        )
      : TRACK_DEMO_DATA;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Nav back */}
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <a
          href="/"
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors no-underline"
        >
          ← PI Agent Design School
        </a>
      </div>

      {/* Hero */}
      <section className="pt-12 pb-8 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest text-slate-500 uppercase mb-4">
              Demonstration Gallery
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
              Showcase
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              See what your agents will learn to create. Our curriculum spans six
              distinct content domains, each with demonstration media showing the
              output quality and aesthetic your trained agents will achieve.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar — HTML form, works without JS */}
      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <form method="GET" action="/showcase" className="flex flex-wrap gap-2 items-center">
            <a
              href="/showcase"
              className={`px-4 py-2 text-sm rounded-full border transition-colors no-underline ${
                !filterTrack || filterTrack === "all"
                  ? "bg-white text-slate-900 border-white font-semibold"
                  : "border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200"
              }`}
            >
              All Tracks
            </a>
            {ALL_TRACKS.map((track) => (
              <a
                key={track}
                href={`/showcase?track=${encodeURIComponent(track)}`}
                className={`px-4 py-2 text-sm rounded-full border transition-colors no-underline ${
                  filterTrack?.toLowerCase() === track.toLowerCase()
                    ? "bg-blue-500 text-white border-blue-500 font-semibold"
                    : "border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200"
                }`}
              >
                {track}
              </a>
            ))}
          </form>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {demos.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-lg mb-2">No demos found for this filter.</p>
              <a href="/showcase" className="text-blue-400 hover:text-blue-300 text-sm">
                Clear filter →
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo, idx) => (
                <a
                  key={demo.demoImageUrl + idx}
                  href={`/tracks/${demo.trackSlug}`}
                  className="group block no-underline bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-slate-800 overflow-hidden">
                    <Image
                      src={demo.demoImageUrl}
                      alt={`${demo.title} — ${demo.track} demonstration`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 text-xs font-semibold tracking-wider bg-slate-900/80 text-blue-300 rounded">
                      {demo.track.toUpperCase()}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-300 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {demo.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-5 pb-4 flex items-center text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    <span>View track</span>
                    <span className="ml-auto">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready to Train Your Agent?
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Each track includes hundreds of refined prompts, evaluation rubrics,
            and real-world examples. Enroll today and your agent returns upgraded.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/tracks"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors no-underline"
            >
              Explore Tracks
            </a>
            <a
              href="/api/demos"
              className="inline-block px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 font-mono text-sm rounded-lg transition-colors no-underline"
            >
              GET /api/demos
            </a>
          </div>
        </div>
      </section>

      {/* API Docs */}
      <section className="py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-xl font-bold text-white mb-4">
            Agent-Readable API
          </h2>
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
            This showcase is machine-readable. Agents can discover all prompt
            libraries and demonstrations through these endpoints:
          </p>
          <ul className="space-y-2 text-slate-500 font-mono text-xs">
            {(
              [
                ["GET /api/demos", "All track demos with metadata (?track= filter)"],
                ["GET /api/demos?format=jsonl", "JSONL export for bulk consumption"],
                ["GET /api/prompts", "All prompts with demo_image_url / demo_video_url"],
                ["GET /api/catalog", "Full catalog with track demo URLs"],
                ["GET /agents.json", "Manifest with demo field schema"],
                ["GET /llms.txt", "Documentation for AI visitors"],
              ] as [string, string][]
            ).map(([endpoint, desc]) => (
              <li key={endpoint} className="flex gap-3 items-baseline">
                <a
                  href={endpoint.replace("GET ", "")}
                  className="text-blue-400 hover:text-blue-300 shrink-0 no-underline"
                >
                  {endpoint}
                </a>
                <span>— {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
