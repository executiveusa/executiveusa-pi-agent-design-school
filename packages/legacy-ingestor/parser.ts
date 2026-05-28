import { createHash } from "crypto";
import type { ParsedPrompt } from "./types";

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function contentHash(body: string): string {
  return createHash("sha256").update(normalizeText(body)).digest("hex");
}

export function parsePromptHtml(
  html: string,
  sourceUrl: string
): ParsedPrompt | null {
  const titleMatch =
    html.match(/<h1[^>]*>([^<]+)<\/h1>/i) ??
    html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? normalizeText(titleMatch[1] ?? "") : "";

  const bodyMatch =
    html.match(/<div[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ??
    html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i) ??
    html.match(/<p[^>]*class="[^"]*body[^"]*"[^>]*>([\s\S]*?)<\/p>/i);

  const rawBody = bodyMatch ? bodyMatch[1] ?? "" : "";
  const body = normalizeText(rawBody.replace(/<[^>]+>/g, " "));

  if (!title || !body || body.length < 10) return null;

  const idMatch =
    sourceUrl.match(/\/prompts\/(\d+)/) ??
    sourceUrl.match(/[?&]id=(\d+)/) ??
    sourceUrl.match(/\/([a-z0-9-]+)\/?$/i);
  const legacyId = idMatch ? (idMatch[1] ?? "") : sourceUrl;

  const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)];
  const imageUrls = imgMatches
    .map((m) => m[1] ?? "")
    .filter((u) => u && !u.includes("logo") && !u.includes("avatar"));

  const videoMatches = [...html.matchAll(/src="([^"]+\.mp4[^"]*)"/gi)];
  const videoUrls = videoMatches.map((m) => m[1] ?? "").filter(Boolean);

  const categoryMatches = [
    ...html.matchAll(/class="[^"]*category[^"]*"[^>]*>([^<]+)</gi),
  ];
  const categories = categoryMatches.map((m) =>
    normalizeText(m[1] ?? "")
  ).filter(Boolean);

  const tagMatches = [
    ...html.matchAll(/class="[^"]*tag[^"]*"[^>]*>([^<]+)</gi),
  ];
  const tags = tagMatches.map((m) =>
    normalizeText(m[1] ?? "")
  ).filter(Boolean);

  return {
    legacyId,
    sourceUrl,
    title,
    body,
    language: "en",
    categories,
    tags,
    imageUrls,
    videoUrls,
    contentHash: contentHash(body),
  };
}
