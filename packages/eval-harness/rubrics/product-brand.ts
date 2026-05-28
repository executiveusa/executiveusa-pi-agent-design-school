import type { Rubric } from "../types";

export const productBrandRubric: Rubric = {
  rubricId: "brand-film-v1",
  track: "product-brand-film-specialist",
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
      key: "product_featured",
      label: "Product / brand featured",
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
      required: true,
      checkType: "presence",
      checkConfig: { field: "lighting", minItems: 1 },
    },
    {
      key: "brand_tone",
      label: "Brand tone communicated",
      weight: 0.15,
      required: false,
      checkType: "pattern",
      checkConfig: {
        patterns: [
          "tone",
          "brand",
          "luxury",
          "minimal",
          "premium",
          "authentic",
          "trust",
        ],
      },
    },
    {
      key: "safety_clean",
      label: "No unsafe content",
      weight: 0.1,
      required: true,
      checkType: "safety",
      checkConfig: {
        forbiddenPatterns: ["misleading claim", "false advertising"],
      },
    },
  ],
};
