import Image from "next/image";

export interface DemoShowcaseProps {
  track: string;
  title: string;
  demoImageUrl?: string;
  demoVideoUrl?: string;
  description?: string;
  featured?: boolean;
}

export function DemoShowcase({
  track,
  title,
  demoImageUrl,
  demoVideoUrl,
  description,
  featured = false,
}: DemoShowcaseProps) {
  const containerClass = featured
    ? "col-span-full lg:col-span-2 row-span-2"
    : "col-span-1";

  return (
    <div
      className={`${containerClass} relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-300 bg-blue-500/20 rounded-full mb-2">
            {track.toUpperCase()}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Media */}
        <div className="flex-1 min-h-[200px] lg:min-h-[300px] relative bg-black/30 rounded-lg overflow-hidden mb-4 border border-slate-700/50">
          {demoVideoUrl ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={demoVideoUrl} type="video/mp4" />
            </video>
          ) : demoImageUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={demoImageUrl}
                alt={`${title} demonstration`}
                fill
                className="object-cover"
                unoptimized={demoImageUrl.endsWith(".svg")}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-sm">Demo coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-400">
          <span className="inline-block">
            {demoVideoUrl
              ? "▶ Video Demo"
              : demoImageUrl
                ? "🖼 Image Reference"
                : "Placeholder"}
          </span>
        </div>
      </div>
    </div>
  );
}

export interface DemoGridProps {
  demos: DemoShowcaseProps[];
  title?: string;
  subtitle?: string;
}

export function DemoGrid({
  demos,
  title = "Demonstration Gallery",
  subtitle,
}: DemoGridProps) {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {demos.map((demo, idx) => (
            <DemoShowcase key={idx} {...demo} featured={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
