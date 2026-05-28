import { documentaryRubric } from "./rubrics/documentary";
import { animeRubric } from "./rubrics/anime";
import { ugcRubric } from "./rubrics/ugc";
import { musicVideoRubric } from "./rubrics/music-video";
import { productBrandRubric } from "./rubrics/product-brand";
import type { Rubric } from "./types";

export { scoreSubmission } from "./scorer";
export * from "./types";

const RUBRICS: Record<string, Rubric> = {
  "documentary-prompt-specialist": documentaryRubric,
  "anime-scene-specialist": animeRubric,
  "ugc-content-agent": ugcRubric,
  "music-video-prompt-specialist": musicVideoRubric,
  "product-brand-film-specialist": productBrandRubric,
};

export function getRubric(trackSlug: string): Rubric | undefined {
  return RUBRICS[trackSlug];
}

export function listRubrics(): Rubric[] {
  return Object.values(RUBRICS);
}
