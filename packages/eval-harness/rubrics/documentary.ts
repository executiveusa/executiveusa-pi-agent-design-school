import type { Rubric } from "../types";

export const documentaryRubric: Rubric = {
  rubricId: "documentary-v1",
  track: "documentary-prompt-specialist",
  version: "1.0",
  passThreshold: 0.75,
  criteria: [
    {
      key: "prompt_body_length",
      label: "Prompt completeness",
      description: "Prompt body must be at least 50 characters",
      weight: 0.2,
      required: true,
      checkType: "length",
      checkConfig: { min: 50 },
    },
    {
      key: "shot_type_present",
      label: "Shot type specified",
      description: "Must include a recognizable shot type",
      weight: 0.15,
      required: true,
      checkType: "presence",
      checkConfig: { field: "shot_type" },
    },
    {
      key: "mood_present",
      label: "Mood / tone present",
      description: "Must specify at least one mood or tone",
      weight: 0.15,
      required: true,
      checkType: "presence",
      checkConfig: { field: "mood", minItems: 1 },
    },
    {
      key: "truth_sensitive",
      label: "No fabricated testimony",
      description:
        "Prompt must not contain fabricated testimonials or staged interview directions",
      weight: 0.25,
      required: true,
      checkType: "safety",
      checkConfig: {
        forbiddenPatterns: [
          "fabricated",
          "fake testimony",
          "staged interview",
          "scripted response",
        ],
      },
    },
    {
      key: "subject_present",
      label: "Subject specified",
      description: "Should identify the documentary subject",
      weight: 0.15,
      required: false,
      checkType: "presence",
      checkConfig: { field: "subject", minItems: 1 },
    },
    {
      key: "safety_clean",
      label: "No unsafe content",
      description: "No harmful, exploitative, or illegal content",
      weight: 0.1,
      required: true,
      checkType: "safety",
      checkConfig: {
        forbiddenPatterns: ["exploit", "illegal", "harmful", "violence against"],
      },
    },
  ],
};
