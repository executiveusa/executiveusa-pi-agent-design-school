import { Seedance2PromptCrawler } from "./crawler";
import { parseSeedancePrompt } from "./seedance-parser";
import { DedupStore } from "./dedup";
import { writePromptsToDb } from "./db-writer";
import { exportPromptsToJsonl } from "./jsonl-exporter";
import { randomUUID } from "crypto";
import { mkdirSync } from "fs";
import { resolve } from "path";
import type { IngestReport } from "./types";
import type { SeedancePrompt } from "./seedance-parser";

const isDryRun = process.argv.includes("--dry-run");
const maxPages = parseInt(process.argv.find((a) => a.startsWith("--max-pages="))?.split("=")[1] ?? "10", 10);

async function run() {
  const report: IngestReport = {
    runId: randomUUID(),
    dryRun: isDryRun,
    startedAt: new Date().toISOString(),
    completedAt: "",
    pagesVisited: 0,
    promptsFound: 0,
    promptsNew: 0,
    promptsDuplicate: 0,
    promptsFailed: 0,
    errors: [],
  };

  console.log(
    `PI Agent Design School — Legacy Ingestor [${isDryRun ? "DRY RUN" : "LIVE"}]`
  );
  console.log(`Run ID: ${report.runId}`);
  console.log(`Target: https://www.seedance2prompt.com/prompts`);
  console.log(
    "Note: Polite crawl rate (1 req/s). Owner-authorized content migration."
  );
  console.log("");

  if (isDryRun) {
    console.log(`DRY RUN MODE: No writes will be performed.`);
    console.log(`Max pages to crawl: ${maxPages}`);
  }

  const dedup = new DedupStore();
  const crawler = new Seedance2PromptCrawler();
  const parsedPrompts: SeedancePrompt[] = [];

  try {
    // Crawl listing pages
    console.log(`\n[1/3] Crawling listing pages (max ${maxPages} pages)...`);
    const listingPages = await crawler.crawlListings(1, maxPages);
    report.pagesVisited = listingPages.length;
    console.log(`Crawled ${listingPages.length} listing pages`);

    // Extract detail URLs from listings
    console.log(`\n[2/3] Extracting detail URLs from listings...`);
    const detailUrls: string[] = [];
    for (const page of listingPages) {
      const urls = crawler.extractDetailUrls(page.html);
      detailUrls.push(...urls);
    }
    console.log(`Found ${detailUrls.length} detail URLs`);

    // Crawl detail pages
    console.log(`\n[3/3] Crawling detail pages...`);
    const detailPages = await crawler.crawlDetailPages(detailUrls);
    report.pagesVisited += detailPages.length;
    console.log(`Crawled ${detailPages.length} detail pages`);

    // Parse all pages
    console.log(`\nParsing all detail pages...`);
    for (const page of detailPages) {
      const parsed = parseSeedancePrompt(page.html, page.sourceUrl);
      if (!parsed) {
        report.promptsFailed++;
        continue;
      }

      if (dedup.isDuplicate(parsed)) {
        report.promptsDuplicate++;
      } else {
        dedup.add(parsed);
        parsedPrompts.push(parsed);
        report.promptsNew++;
      }
    }
    report.promptsFound = report.promptsNew + report.promptsDuplicate;

    console.log(`\n=== Parse Summary ===`);
    console.log(`Total pages visited: ${report.pagesVisited}`);
    console.log(`Prompts found: ${report.promptsFound}`);
    console.log(`  - New: ${report.promptsNew}`);
    console.log(`  - Duplicates: ${report.promptsDuplicate}`);
    console.log(`  - Failed: ${report.promptsFailed}`);

    // Export to JSONL
    console.log(`\nExporting to JSONL...`);
    mkdirSync(resolve(__dirname, "../../data"), { recursive: true });
    const jsonlPath = resolve(__dirname, "../../data/seedance_prompts.jsonl");
    exportPromptsToJsonl(parsedPrompts, jsonlPath);

    // Write to DB if live mode
    if (!isDryRun) {
      console.log(`\nWriting to database...`);
      const dbResult = await writePromptsToDb(parsedPrompts);
      report.promptsNew = dbResult.newCount;
      report.promptsDuplicate = dbResult.duplicateCount;
      report.promptsFailed = dbResult.failedCount;
      console.log(`Database write complete:`);
      console.log(`  - Inserted: ${dbResult.newCount}`);
      console.log(`  - Skipped (duplicate): ${dbResult.duplicateCount}`);
      console.log(`  - Failed: ${dbResult.failedCount}`);
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    report.errors.push(msg);
    console.error("Pipeline error:", error);
  }

  report.completedAt = new Date().toISOString();
  console.log("\n=== Final Report ===");
  console.log(JSON.stringify(report, null, 2));
}

run().catch((e) => {
  console.error("Ingestor failed:", e);
  process.exit(1);
});
