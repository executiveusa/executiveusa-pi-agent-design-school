import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parsePromptHtml } from "./parser";
import { DedupStore } from "./dedup";

const listingHtml = readFileSync(
  resolve(__dirname, "fixtures/listing.html"),
  "utf-8"
);
const detailHtml = readFileSync(
  resolve(__dirname, "fixtures/detail.html"),
  "utf-8"
);

describe("Legacy Ingestor — Parser", () => {
  it("parses a detail page and extracts title and body", () => {
    const result = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    );
    expect(result).not.toBeNull();
    expect(result?.title).toContain("Documentary Street Market");
    expect(result?.body.length).toBeGreaterThan(30);
    expect(result?.contentHash).toHaveLength(64);
  });

  it("preserves legacy ID from URL", () => {
    const result = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    );
    expect(result?.legacyId).toBe("101");
  });

  it("extracts categories and tags", () => {
    const result = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    );
    expect(result?.categories).toContain("Documentary");
    expect(result?.tags).toContain("close-up");
  });

  it("extracts image URLs", () => {
    const result = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    );
    expect(result?.imageUrls.length).toBeGreaterThan(0);
  });

  it("returns null for pages without meaningful content", () => {
    const result = parsePromptHtml("<html><body></body></html>", "https://example.com");
    expect(result).toBeNull();
  });
});

describe("Legacy Ingestor — DedupStore", () => {
  it("detects duplicate by content hash", () => {
    const store = new DedupStore();
    const prompt1 = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    )!;
    const prompt2 = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101-copy"
    )!;

    expect(store.isDuplicate(prompt1)).toBe(false);
    store.add(prompt1);
    expect(store.isDuplicate(prompt2)).toBe(true);
  });

  it("detects duplicate by source URL", () => {
    const store = new DedupStore();
    const prompt = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    )!;
    store.add(prompt);
    expect(store.isDuplicate(prompt)).toBe(true);
  });

  it("tracks unique prompts correctly", () => {
    const store = new DedupStore();
    const prompt1 = parsePromptHtml(
      detailHtml,
      "https://www.seedance2prompt.com/prompts/101"
    )!;
    store.add(prompt1);
    expect(store.size()).toBe(1);
  });
});
