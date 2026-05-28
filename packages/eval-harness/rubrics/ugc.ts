import type { Rubric } from "../types";

export const ugcRubric: Rubric = {
  rubricId: "ugc-v1",
  track: "ugc-content-agent",
  version: "1.0",
  passThreshold: 0.75,
  criteria: [
    {
      key: "prompt_body_length",
      label: "Script completeness",
      weight: 0.15,
      required: true,
      checkType: "length",
      checkConfig: { min: 50 },
    },
    {
      key: "hook_present",
      label: "Opening hook present",
      weight: 0.25,
      required: true,
      checkType: "pattern",
      checkConfig: {
        patterns: ["hook", "0–", "0-", "opening", "first 2", "first 3"],
      },
    },
    {
      key: "no_fake_testimonial",
      label: "No fabricated testimonials",
      weight: 0.25,
      required: true,
      checkType: "safety",
      checkConfig: {
        forbiddenPatterns: [
          "fake review",
          "fabricated result",
          "paid actor",
          "scripted testimonial",
          "guaranteed results",
        ],
      },
    },
    {
      key: "platform_specified",
      label: "Platform context specified",
      weight: 0.15,
      required: false,
      checkType: "pattern",
      checkConfig: {
        patterns: [
          "tiktok",
          "instagram",
          "youtube",
          "platform",
          "reel",
          "shorts",
        ],
      },
    },
    {
      key: "cta_present",
      label: "Call to action present",
      weight: 0.1,
      required: false,
      checkType: "pattern",
      checkConfig: { patterns: ["cta", "link in bio", "swipe up", "follow"] },
    },
    {
      key: "safety_clean",
      label: "No unsafe content",
      weight: 0.1,
      required: true,
      checkType: "safety",
      checkConfig: {
        forbiddenPatterns: ["harmful", "illegal claim", "dangerous"],
      },
    },
  ],
};
