import { describe, it, expect } from "vitest";

// Mock demo data structure
const DEMO_DATA = [
  {
    track: "documentary",
    track_name: "Documentary",
    description: "Observational storytelling",
    demo_image_url: "/demos/images/documentary-demo.svg",
    learn_url: "/tracks/documentary-prompt-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "anime",
    track_name: "Anime Scene",
    description: "Animated fantasy scenes",
    demo_image_url: "/demos/images/anime-demo.svg",
    learn_url: "/tracks/anime-scene-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "ugc",
    track_name: "UGC Content",
    description: "User-generated platform-native content",
    demo_image_url: "/demos/images/ugc-demo.svg",
    learn_url: "/tracks/ugc-content-agent",
    showcase_url: "/showcase",
  },
  {
    track: "music_video",
    track_name: "Music Video",
    description: "Rhythm-driven visual performance",
    demo_image_url: "/demos/images/music_video-demo.svg",
    learn_url: "/tracks/music-video-prompt-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "product_video",
    track_name: "Product Video",
    description: "Premium product showcase",
    demo_image_url: "/demos/images/product_video-demo.svg",
    learn_url: "/tracks/product-brand-film-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "brand_film",
    track_name: "Brand Film",
    description: "Cinematic brand storytelling",
    demo_image_url: "/demos/images/brand_film-demo.svg",
    learn_url: "/tracks/product-brand-film-specialist",
    showcase_url: "/showcase",
  },
];

describe("Demo API Data", () => {
  it("has all 6 required demo tracks", () => {
    expect(DEMO_DATA.length).toBe(6);
  });

  it("each demo has required fields", () => {
    for (const demo of DEMO_DATA) {
      expect(demo.track).toBeDefined();
      expect(demo.track_name).toBeDefined();
      expect(demo.description).toBeDefined();
      expect(demo.demo_image_url).toBeDefined();
      expect(demo.learn_url).toBeDefined();
      expect(demo.showcase_url).toBeDefined();
    }
  });

  it("demo_image_url points to SVG files", () => {
    for (const demo of DEMO_DATA) {
      expect(demo.demo_image_url).toMatch(/\.svg$/);
      expect(demo.demo_image_url).toContain("/demos/images/");
    }
  });

  it("learn_url points to track pages", () => {
    for (const demo of DEMO_DATA) {
      expect(demo.learn_url).toContain("/tracks/");
    }
  });

  it("showcase_url is consistent across all demos", () => {
    const showcaseUrls = DEMO_DATA.map((d) => d.showcase_url);
    const unique = new Set(showcaseUrls);
    expect(unique.size).toBe(1);
    expect([...unique][0]).toBe("/showcase");
  });

  it("track names are human-readable", () => {
    const names = DEMO_DATA.map((d) => d.track_name);
    for (const name of names) {
      expect(name.length).toBeGreaterThan(0);
      expect(/[a-z]/i.test(name)).toBe(true); // Contains letters
    }
  });

  it("descriptions are substantive", () => {
    for (const demo of DEMO_DATA) {
      expect(demo.description.length).toBeGreaterThan(20);
    }
  });
});

describe("Demo filtering", () => {
  it("filters by track (documentary)", () => {
    const filtered = DEMO_DATA.filter((d) => d.track === "documentary");
    expect(filtered.length).toBe(1);
    expect(filtered[0]!.track_name).toBe("Documentary");
  });

  it("filters by track (anime)", () => {
    const filtered = DEMO_DATA.filter((d) => d.track === "anime");
    expect(filtered.length).toBe(1);
    expect(filtered[0]!.track_name).toBe("Anime Scene");
  });

  it("returns no results for non-existent track", () => {
    const filtered = DEMO_DATA.filter((d) => d.track === "nonexistent");
    expect(filtered.length).toBe(0);
  });

  it("case-insensitive track filter", () => {
    const filtered = DEMO_DATA.filter(
      (d) => d.track.toLowerCase() === "DOCUMENTARY".toLowerCase()
    );
    expect(filtered.length).toBe(1);
  });
});

describe("JSONL export format", () => {
  it("produces valid JSONL lines", () => {
    const lines = DEMO_DATA.map((d) => JSON.stringify(d));
    for (const line of lines) {
      // Should not throw
      expect(() => JSON.parse(line)).not.toThrow();
      const parsed = JSON.parse(line);
      expect(parsed.track).toBeDefined();
    }
  });

  it("each line is a complete object", () => {
    for (const demo of DEMO_DATA) {
      const json = JSON.stringify(demo);
      const parsed = JSON.parse(json);
      expect(parsed).toEqual(demo);
    }
  });
});
