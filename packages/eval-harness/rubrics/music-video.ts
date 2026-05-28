import type { Rubric } from "../types";

export const musicVideoRubric: Rubric = {
  rubricId: "music-video-v1",
  track: "music-video-prompt-specialist",
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
      key: "camera_motion_present",
      label: "Camera motion described",
      weight: 0.2,
      required: true,
      checkType: "presence",
      checkConfig: { field: "camera_motion", minItems: 1 },
    },
    {
      key: "mood_present",
      label: "Mood / energy specified",
      weight: 0.2,
      required: true,
      checkType: "presence",
      checkConfig: { field: "mood", minItems: 1 },
    },
    {
      key: "rhythm_reference",
      label: "Rhythm or tempo reference",
      weight: 0.2,
      required: false,
      checkType: "pattern",
      checkConfig: {
        patterns: [
          "bpm",
          "beat",
          "rhythm",
          "tempo",
          "on the drop",
          "on bar",
          "downbeat",
        ],
      },
    },
    {
      key: "visual_motif",
      label: "Visual motif described",
      weight: 0.15,
      required: false,
      checkType: "pattern",
      checkConfig: {
        patterns: ["motif", "recurring", "symbol", "visual theme", "leitmotif"],
      },
    },
    {
      key: "safety_clean",
      label: "No unsafe content",
      weight: 0.1,
      required: true,
      checkType: "safety",
      checkConfig: { forbiddenPatterns: ["violence against", "explicit"] },
    },
  ],
};
