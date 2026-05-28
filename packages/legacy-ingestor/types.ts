export interface RawPromptPage {
  sourceUrl: string;
  fetchedAt: string;
  html: string;
  statusCode: number;
}

export interface ParsedPrompt {
  legacyId: string;
  sourceUrl: string;
  title: string;
  body: string;
  language: string;
  categories: string[];
  tags: string[];
  imageUrls: string[];
  videoUrls: string[];
  contentHash: string;
}

export interface IngestReport {
  runId: string;
  dryRun: boolean;
  startedAt: string;
  completedAt: string;
  pagesVisited: number;
  promptsFound: number;
  promptsNew: number;
  promptsDuplicate: number;
  promptsFailed: number;
  errors: string[];
}
