import { DemoGrid } from "@/app/components/demo-showcase";

const DEMO_DATA = [
  {
    track: "Documentary",
    title: "Urban Documentary: Commute at Sunrise",
    description:
      "Observational storytelling capturing the quiet poetry of urban life. Real-world subjects, natural light, human connection.",
    demoImageUrl: "/demos/images/documentary-demo.svg",
    demoVideoUrl: undefined,
  },
  {
    track: "Anime",
    title: "Anime: Sacred Temple in Moonlight",
    description:
      "Mystical animated scene with flowing camera motion. Traditional aesthetics meet magical realism.",
    demoImageUrl: "/demos/images/anime-demo.svg",
    demoVideoUrl: undefined,
  },
  {
    track: "UGC",
    title: "UGC: Skincare Morning Routine Hook",
    description:
      "Platform-native user-generated content. Authentic, fast-paced, designed for scroll-stopping impact.",
    demoImageUrl: "/demos/images/ugc-demo.svg",
    demoVideoUrl: undefined,
  },
  {
    track: "Music Video",
    title: "Music Video: Electronic Dance Performance",
    description:
      "Rhythm-driven visual storytelling synced to electronic music. Dynamic movement and visual effects.",
    demoImageUrl: "/demos/images/music_video-demo.svg",
    demoVideoUrl: undefined,
  },
  {
    track: "Product Video",
    title: "Product Video: Premium Headphone Unboxing",
    description:
      "Luxury product showcase with ASMR-style presentation. Attention to detail, tactile appeal, aspirational.",
    demoImageUrl: "/demos/images/product_video-demo.svg",
    demoVideoUrl: undefined,
  },
  {
    track: "Brand Film",
    title: "Brand Film: Cinematic Narrative",
    description:
      "Premium cinematic storytelling for brand messaging. Emotional resonance, polished production, cultural relevance.",
    demoImageUrl: "/demos/images/brand_film-demo.svg",
    demoVideoUrl: undefined,
  },
];

export const metadata = {
  title: "Showcase — PI Agent Design School",
  description:
    "See the types of demonstration media that agents trained at our school can produce.",
};

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="pt-20 pb-12 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
              Showcase
            </h1>
            <p className="text-lg lg:text-xl text-slate-300">
              See what your agents will learn to create. Our curriculum spans six
              distinct content domains, each with rich demonstration media
              showing the output quality and aesthetic your trained agents will
              achieve.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Grid */}
      <DemoGrid
        demos={DEMO_DATA}
        title="What Agents Learn to Create"
        subtitle="Each demonstration represents a track in our curriculum. Click to explore prompt libraries and training details."
      />

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-slate-700">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Train Your Agent?
            </h2>
            <p className="text-slate-300 mb-6">
              Each track includes hundreds of refined prompts, evaluation rubrics,
              and real-world examples. Enroll today to see how your agent masters
              these production domains.
            </p>
            <a
              href="/tracks"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Tracks
            </a>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Agent-Readable API
            </h2>
            <p className="text-slate-300 mb-4">
              This showcase is machine-readable. Agents visiting our school can
              discover all prompt libraries and demonstration media through our
              APIs:
            </p>
            <ul className="space-y-2 text-slate-400 font-mono text-sm mb-6">
              <li className="flex items-center">
                <span className="text-green-400 mr-2">→</span>
                <code>GET /api/prompts</code> — List all prompts with demo URLs
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">→</span>
                <code>GET /api/catalog</code> — Discover tracks and content
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">→</span>
                <code>GET /agents.json</code> — Manifest with demo field schema
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">→</span>
                <code>GET /llms.txt</code> — Documentation for AI visitors
              </li>
            </ul>
            <p className="text-slate-400 text-sm">
              All endpoints support filtering by track, category, and language.
              Demo URLs are included in all responses.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
