import type { ModelProfile } from "../types";

export const videoModels: ModelProfile[] = [
  {
    id: "wan-2.1",
    name: "Wan 2.1",
    provider: "Alibaba / HuggingFace",
    taskCategory: "text-to-video",
    taskFitScore: 0.88,
    costPosture: "free",
    safetyNotes:
      "Standard safety filters. Avoid prompts with real person names.",
    promptTips:
      "Use cinematic language. Specify camera motion explicitly. Include lighting and mood.",
    tags: ["text-to-video", "open-weight", "cinematic"],
  },
  {
    id: "sora",
    name: "Sora",
    provider: "OpenAI",
    taskCategory: "text-to-video",
    taskFitScore: 0.92,
    costPosture: "high",
    safetyNotes:
      "Strict safety filtering. No violence, explicit content, or real persons without consent.",
    promptTips:
      "Detailed cinematic prompts perform best. Specify aspect ratio, duration, and style reference.",
    tags: ["text-to-video", "flagship", "cinematic", "long-form"],
  },
  {
    id: "kling-2.0",
    name: "Kling 2.0",
    provider: "Kuaishou",
    taskCategory: "text-to-video",
    taskFitScore: 0.85,
    costPosture: "medium",
    safetyNotes: "Standard filters. Strong character consistency.",
    promptTips:
      "Excellent for anime-style and character-consistent video. Use character description blocks.",
    tags: ["text-to-video", "character-consistency", "anime-compatible"],
  },
  {
    id: "runway-gen4",
    name: "Runway Gen-4",
    provider: "Runway",
    taskCategory: "image-to-video",
    taskFitScore: 0.9,
    costPosture: "high",
    safetyNotes: "Strict content policy. API access required.",
    promptTips:
      "Works best with high-quality reference images. Camera motion direction is key.",
    tags: ["image-to-video", "professional", "camera-control"],
  },
  {
    id: "hailuo-minimax",
    name: "Hailuo MiniMax",
    provider: "MiniMax",
    taskCategory: "text-to-video",
    taskFitScore: 0.83,
    costPosture: "low",
    safetyNotes: "Moderate safety filtering.",
    promptTips: "Good for cinematic panning shots and product video.",
    tags: ["text-to-video", "product-video", "affordable"],
  },
];
