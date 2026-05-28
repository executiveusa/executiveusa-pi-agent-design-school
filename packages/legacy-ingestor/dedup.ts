import type { ParsedPrompt } from "./types";

export class DedupStore {
  private hashes = new Set<string>();
  private urls = new Set<string>();

  isDuplicate(prompt: ParsedPrompt): boolean {
    return this.hashes.has(prompt.contentHash) || this.urls.has(prompt.sourceUrl);
  }

  add(prompt: ParsedPrompt): void {
    this.hashes.add(prompt.contentHash);
    this.urls.add(prompt.sourceUrl);
  }

  size(): number {
    return this.hashes.size;
  }
}
