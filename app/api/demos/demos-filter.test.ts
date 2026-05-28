import { describe, it, expect } from "vitest";
import { GET } from "./route";
import { NextRequest } from "next/server";

function makeRequest(url: string): NextRequest {
  return new NextRequest(url);
}

describe("GET /api/demos — no filter", () => {
  it("returns all 6 demos when no filter is supplied", async () => {
    const req = makeRequest("http://localhost/api/demos");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(body.demos)).toBe(true);
    expect(body.demos.length).toBe(6);
    expect(body.total).toBe(6);
  });

  it("includes showcase_url in the root response", async () => {
    const req = makeRequest("http://localhost/api/demos");
    const res = await GET(req);
    const body = await res.json();
    expect(body.showcase_url).toBe("/showcase");
  });

  it("each demo has required fields", async () => {
    const req = makeRequest("http://localhost/api/demos");
    const res = await GET(req);
    const body = await res.json();

    for (const demo of body.demos) {
      expect(demo.track).toBeDefined();
      expect(demo.track_name).toBeDefined();
      expect(demo.description).toBeDefined();
      expect(demo.demo_image_url).toBeDefined();
      expect(demo.learn_url).toBeDefined();
      expect(demo.showcase_url).toBeDefined();
    }
  });
});

describe("GET /api/demos — track filter", () => {
  it("filters to documentary only", async () => {
    const req = makeRequest("http://localhost/api/demos?track=documentary");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(1);
    expect(body.demos[0].track).toBe("documentary");
    expect(body.total).toBe(1);
  });

  it("filters to anime only", async () => {
    const req = makeRequest("http://localhost/api/demos?track=anime");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(1);
    expect(body.demos[0].track).toBe("anime");
  });

  it("filters to ugc only", async () => {
    const req = makeRequest("http://localhost/api/demos?track=ugc");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(1);
    expect(body.demos[0].track).toBe("ugc");
  });

  it("filters to music_video only", async () => {
    const req = makeRequest("http://localhost/api/demos?track=music_video");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(1);
    expect(body.demos[0].track).toBe("music_video");
  });

  it("filters to product_video only", async () => {
    const req = makeRequest("http://localhost/api/demos?track=product_video");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(1);
    expect(body.demos[0].track).toBe("product_video");
  });

  it("returns empty demos for non-existent track", async () => {
    const req = makeRequest("http://localhost/api/demos?track=nonexistent");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(0);
    expect(body.total).toBe(0);
  });

  it("filter is case-insensitive", async () => {
    const req = makeRequest("http://localhost/api/demos?track=DOCUMENTARY");
    const res = await GET(req);
    const body = await res.json();

    expect(body.demos.length).toBe(1);
    expect(body.demos[0].track).toBe("documentary");
  });
});

describe("GET /api/demos — JSONL format", () => {
  it("returns JSONL when format=jsonl is requested", async () => {
    const req = makeRequest("http://localhost/api/demos?format=jsonl");
    const res = await GET(req);

    expect(res.headers.get("content-type")).toContain("application/x-ndjson");

    const text = await res.text();
    const lines = text.trim().split("\n");
    expect(lines.length).toBe(6);

    for (const line of lines) {
      const parsed = JSON.parse(line);
      expect(parsed.track).toBeDefined();
      expect(parsed.demo_image_url).toBeDefined();
    }
  });

  it("JSONL can be filtered by track", async () => {
    const req = makeRequest("http://localhost/api/demos?track=anime&format=jsonl");
    const res = await GET(req);
    const text = await res.text();
    const lines = text.trim().split("\n");

    expect(lines.length).toBe(1);
    const parsed = JSON.parse(lines[0] ?? "{}");
    expect(parsed.track).toBe("anime");
  });
});
