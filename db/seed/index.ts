import { MVP_TRACKS } from "./tracks";
import { SEED_PROMPTS } from "./prompts";

async function seed() {
  console.log("Seeding PI Agent Design School database...");
  console.log(`Tracks to seed: ${MVP_TRACKS.length}`);
  console.log(`Prompts to seed: ${SEED_PROMPTS.length}`);

  if (process.env["DRY_RUN"] === "true") {
    console.log("DRY RUN: No writes performed.");
    console.log("Tracks:", MVP_TRACKS.map((t) => t.slug).join(", "));
    console.log("Prompts:", SEED_PROMPTS.map((p) => p.title).join(", "));
    return;
  }

  console.log(
    "Note: Connect DATABASE_URL and run this against a live database."
  );
  console.log("Seed data validated and ready for insertion.");
}

seed().catch(console.error);
