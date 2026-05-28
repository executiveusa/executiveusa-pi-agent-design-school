import { parsePromptHtml } from "./parser";
import { DedupStore } from "./dedup";
import { randomUUID } from "crypto";
import type { IngestReport } from "./types";

const isDryRun = process.argv.includes("--dry-run");

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
    console.log("DRY RUN MODE: No writes will be performed.");
    console.log("Would crawl listing pages and extract prompt detail URLs.");
    console.log("Would parse each detail page and extract structured data.");
    console.log("Would deduplicate by content hash and source URL.");
    console.log("Would normalize into JSONL and PostgreSQL records.");
    report.completedAt = new Date().toISOString();
    console.log("\nDry-run report:", JSON.stringify(report, null, 2));
    return;
  }

  const dedup = new DedupStore();
  console.log(
    "Live mode: Connect DATABASE_URL to enable writes. Fetching is disabled in this scaffold."
  );
  report.completedAt = new Date().toISOString();
  console.log("Report:", JSON.stringify(report, null, 2));
}

run().catch((e) => {
  console.error("Ingestor failed:", e);
  process.exit(1);
});
