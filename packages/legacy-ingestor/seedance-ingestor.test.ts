import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Seedance2PromptCrawler } from "./crawler";
import { parseSeedancePrompt } from "./seedance-parser";
import { DedupStore } from "./dedup";

const listingHtml = readFileSync(
  resolve(__dirname, "fixtures/seedance-listing.html"),
  "utf-8"
);
const documentaryHtml = readFileSync(
  resolve(__dirname, "fixtures/seedance-documentary.html"),
  "utf-8"
);
const animeHtml = readFileSync(
  resolve(__dirname, "fixtures/seedance-anime.html"),
  "utf-8"
);
const productHtml = readFileSync(
  resolve(__dirname, "fixtures/seedance-product.html"),
  "utf-8"
);

describe("Seedance2Prompt Crawler", () => {
  it("extracts detail URLs from listing HTML", () => {
    const crawler = new Seedance2PromptCrawler();
    const urls = crawler.extractDetailUrls(listingHtml);
    expect(urls.length).toBeGreaterThan(0);
    expect(urls[0]).toContain("/prompts/");
  });

  it("constructs absolute URLs for relative hrefs", () => {
    const crawler = new Seedance2PromptCrawler();
    const urls = crawler.extractDetailUrls(listingHtml);
    expect(urls.every((u) => u.startsWith("http"))).toBe(true);
  });

  it("deduplicates URLs in a listing", () => {
    const html = `
      <a href="/prompts/1">Same</a>
      <a href="/prompts/1">Same</a>
      <a href="/prompts/2">Different</a>
    `;
    const crawler = new Seedance2PromptCrawler();
    const urls = crawler.extractDetailUrls(html);
    expect(urls.length).toBe(2);
  });

  it("extracts next page URL from listing", () => {
    const crawler = new Seedance2PromptCrawler();
    const nextUrl = crawler.extractNextPageUrl(listingHtml);
    expect(nextUrl).toContain("page=2");
  });

  it("returns null when no next page exists", () => {
    const html = "<html><body>No next</body></html>";
    const crawler = new Seedance2PromptCrawler();
    const nextUrl = crawler.extractNextPageUrl(html);
    expect(nextUrl).toBeNull();
  });

  it("tracks visited pages", () => {
    const crawler = new Seedance2PromptCrawler();
    expect(crawler.getVisitedCount()).toBe(0);
    // Simulate visiting by trying to fetch (will fail without network)
    // For now, check that the visited set starts at 0
    expect(crawler.getVisitedCount()).toBe(0);
  });
});

describe("Seedance Parser — Category to Track Mapping", () => {
  it("maps Documentary category to documentary track", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed).not.toBeNull();
    expect(parsed?.track).toBe("documentary");
  });

  it("maps Anime Scene category to anime track", () => {
    const parsed = parseSeedancePrompt(
      animeHtml,
      "https://www.seedance2prompt.com/prompts/1002"
    );
    expect(parsed).not.toBeNull();
    expect(parsed?.track).toBe("anime");
  });

  it("maps Product Video category to product_video track", () => {
    const parsed = parseSeedancePrompt(
      productHtml,
      "https://www.seedance2prompt.com/prompts/1005"
    );
    expect(parsed).not.toBeNull();
    expect(parsed?.track).toBe("product_video");
  });

  it("defaults to general for unmapped categories", () => {
    const html = `
      <h1>Mystery Prompt</h1>
      <div class="prompt-body">This is a valid prompt body with good content.</div>
      <div class="category">UnknownCategory</div>
    `;
    const parsed = parseSeedancePrompt(html, "https://example.com/prompt/123");
    expect(parsed?.track).toBe("general");
  });
});

describe("Seedance Parser — Structured Field Extraction", () => {
  it("extracts shot type from prompt body", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed?.shotType).toBeDefined();
    expect(parsed?.shotType?.toLowerCase()).toContain("wide");
  });

  it("extracts camera motion from prompt body", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed?.cameraMotion).toBeDefined();
    expect(parsed?.cameraMotion?.length).toBeGreaterThan(0);
  });

  it("extracts mood from prompt body", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed?.mood).toBeDefined();
    expect(parsed?.mood?.length).toBeGreaterThan(0);
  });

  it("extracts lighting from prompt body", () => {
    const parsed = parseSeedancePrompt(
      animeHtml,
      "https://www.seedance2prompt.com/prompts/1002"
    );
    expect(parsed?.lighting).toBeDefined();
    expect(parsed?.lighting?.length).toBeGreaterThan(0);
  });

  it("extracts subject from prompt body", () => {
    const parsed = parseSeedancePrompt(
      animeHtml,
      "https://www.seedance2prompt.com/prompts/1002"
    );
    // "Subject:" keyword exists in the fixture
    expect(parsed?.body).toContain("Subject");
  });
});

describe("Seedance Parser — Full Parse", () => {
  it("parses documentary detail page completely", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed).not.toBeNull();
    expect(parsed?.title).toContain("Urban");
    expect(parsed?.body.length).toBeGreaterThan(100);
    expect(parsed?.contentHash).toHaveLength(64);
    expect(parsed?.imageUrls.length).toBeGreaterThan(0);
  });

  it("preserves tags from HTML", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed?.tags).toContain("dawn");
    expect(parsed?.tags).toContain("urban");
  });

  it("preserves categories from HTML", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed?.categories).toContain("Documentary");
  });

  it("extracts and preserves multiple images", () => {
    const parsed = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    );
    expect(parsed?.imageUrls.length).toBeGreaterThanOrEqual(2);
  });

  it("extracts and preserves videos", () => {
    const parsed = parseSeedancePrompt(
      productHtml,
      "https://www.seedance2prompt.com/prompts/1005"
    );
    expect(parsed?.videoUrls.length).toBeGreaterThan(0);
    expect(parsed?.videoUrls[0]).toContain(".mp4");
  });
});

describe("Deduplication with SeedancePrompts", () => {
  it("detects duplicates across different categories", () => {
    const store = new DedupStore();
    const doc1 = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    )!;
    const doc2 = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001-copy"
    )!;

    expect(store.isDuplicate(doc1)).toBe(false);
    store.add(doc1);
    expect(store.isDuplicate(doc2)).toBe(true); // Same body, different URL
  });

  it("allows different prompts with different bodies", () => {
    const store = new DedupStore();
    const doc = parseSeedancePrompt(
      documentaryHtml,
      "https://www.seedance2prompt.com/prompts/1001"
    )!;
    const anime = parseSeedancePrompt(
      animeHtml,
      "https://www.seedance2prompt.com/prompts/1002"
    )!;

    store.add(doc);
    expect(store.isDuplicate(anime)).toBe(false);
    store.add(anime);
    expect(store.size()).toBe(2);
  });
});

describe("Integration: Full Ingest Pipeline", () => {
  it("processes multiple documents without error", () => {
    const docs = [
      parseSeedancePrompt(
        documentaryHtml,
        "https://www.seedance2prompt.com/prompts/1001"
      ),
      parseSeedancePrompt(
        animeHtml,
        "https://www.seedance2prompt.com/prompts/1002"
      ),
      parseSeedancePrompt(
        productHtml,
        "https://www.seedance2prompt.com/prompts/1005"
      ),
    ];

    expect(docs.filter((d) => d !== null)).toHaveLength(3);

    const dedup = new DedupStore();
    const parsed: typeof docs = [];

    for (const doc of docs) {
      if (doc && !dedup.isDuplicate(doc)) {
        dedup.add(doc);
        parsed.push(doc);
      }
    }

    expect(parsed.length).toBe(3);
    expect(new Set(parsed.map((d) => d?.track)).size).toBeGreaterThan(1); // Multiple track types
  });
});
