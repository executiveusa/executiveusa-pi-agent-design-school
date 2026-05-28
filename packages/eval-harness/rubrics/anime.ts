import type { Rubric } from "../types";

export const animeRubric: Rubric = {
  rubricId: "anime-v1",
  track: "anime-scene-specialist",
  version: "1.0",
  passThreshold: 0.75,
  criteria: [
    {
      key: "prompt_body_length",
      label: "Prompt completeness",
      weight: 0.15,
      required: true,
      checkType: "length",
      checkConfig: { min: 50 },
    },
    {
      key: "character_consistency",
      label: "Character description consistent",
      weight: 0.25,
      required: true,
      checkType: "presence",
      checkConfig: { field: "subject", minItems: 1 },
    },
    {
      key: "shot_type_present",
      label: "Shot type specified",
      weight: 0.15,
      required: true,
      checkType: "presence",
      checkConfig: { field: "shot_type" },
    },
    {
      key: "lighting_present",
      label: "Lighting described",
      weight: 0.2,
      required: false,
      checkType: "presence",
      checkConfig: { field: "lighting", minItems: 1 },
    },
    {
      key: "mood_present",
      label: "Emotional tone present",
      weight: 0.15,
      required: true,
      checkType: "presence",
      checkConfig: { field: "mood", minItems: 1 },
    },
    {
      key: "safety_clean",
      label: "No unsafe content",
      weight: 0.1,
      required: true,
      checkType: "safety",
      checkConfig: {
        forbiddenPatterns: ["explicit", "gore", "minors in", "nsfw"],
      },
    },
  ],
};
