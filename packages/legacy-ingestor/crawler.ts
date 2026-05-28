import type { RawPromptPage } from "./types";

const BASE_URL = "https://www.seedance2prompt.com";
const RATE_LIMIT_MS = 1000; // 1 req/sec

export class Seedance2PromptCrawler {
  private lastFetchTime = 0;
  private visited = new Set<string>();

  async politeDelay(): Promise<void> {
    const elapsed = Date.now() - this.lastFetchTime;
    if (elapsed < RATE_LIMIT_MS) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS - elapsed));
    }
  }

  async fetchPage(url: string, retries = 3): Promise<RawPromptPage | null> {
    if (this.visited.has(url)) return null;
    this.visited.add(url);

    await this.politeDelay();
    this.lastFetchTime = Date.now();

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "PI-Agent-Design-School/1.0 (+https://piagentdesignschool.com)",
          },
        });

        if (!response.ok) {
          if (attempt < retries) {
            await new Promise((r) =>
              setTimeout(r, 1000 * Math.pow(2, attempt - 1))
            );
            continue;
          }
          return null;
        }

        const html = await response.text();
        return {
          sourceUrl: url,
          fetchedAt: new Date().toISOString(),
          html,
          statusCode: response.status,
        };
      } catch (error) {
        if (attempt === retries) {
          console.error(`Failed to fetch ${url}:`, error);
          return null;
        }
        await new Promise((r) =>
          setTimeout(r, 1000 * Math.pow(2, attempt - 1))
        );
      }
    }
    return null;
  }

  extractDetailUrls(listingHtml: string): string[] {
    const urls: string[] = [];
    const linkMatches = [
      ...listingHtml.matchAll(
        /<a[^>]+href=["']([^"']*\/prompts\/\d+[^"']*)["']/gi
      ),
    ];

    for (const match of linkMatches) {
      const href = match[1];
      if (href) {
        const absoluteUrl = href.startsWith("http")
          ? href
          : `${BASE_URL}${href.startsWith("/") ? "" : "/"}${href}`;
        urls.push(absoluteUrl);
      }
    }

    return [...new Set(urls)];
  }

  extractNextPageUrl(listingHtml: string): string | null {
    const match = listingHtml.match(
      /<a[^>]+href=["']([^"']*page=\d+[^"]*)["'][^>]*>(?:Next|next)/i
    );
    if (match && match[1]) {
      const href = match[1];
      return href.startsWith("http")
        ? href
        : `${BASE_URL}${href.startsWith("/") ? "" : "/"}${href}`;
    }
    return null;
  }

  async crawlListings(
    startPage = 1,
    maxPages = 1000
  ): Promise<RawPromptPage[]> {
    const allPages: RawPromptPage[] = [];
    let pageNum = startPage;

    while (pageNum <= startPage + maxPages - 1) {
      const listingUrl =
        pageNum === 1
          ? `${BASE_URL}/prompts`
          : `${BASE_URL}/prompts?page=${pageNum}`;

      console.log(`Fetching listing page ${pageNum}...`);
      const page = await this.fetchPage(listingUrl);
      if (!page) {
        console.log(`Failed to fetch page ${pageNum}, stopping.`);
        break;
      }

      allPages.push(page);

      const nextUrl = this.extractNextPageUrl(page.html);
      if (!nextUrl) {
        console.log("No next page found, crawl complete.");
        break;
      }

      pageNum++;
    }

    return allPages;
  }

  async crawlDetailPages(
    detailUrls: string[]
  ): Promise<RawPromptPage[]> {
    const allPages: RawPromptPage[] = [];

    for (const url of detailUrls) {
      console.log(`Fetching detail: ${url}`);
      const page = await this.fetchPage(url);
      if (page) {
        allPages.push(page);
      }
    }

    return allPages;
  }

  getVisitedCount(): number {
    return this.visited.size;
  }
}
