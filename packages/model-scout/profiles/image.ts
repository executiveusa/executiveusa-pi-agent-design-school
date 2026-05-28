import type { ModelProfile } from "../types";

export const imageModels: ModelProfile[] = [
  {
    id: "flux-1-pro",
    name: "FLUX.1 Pro",
    provider: "Black Forest Labs",
    taskCategory: "image-generation",
    taskFitScore: 0.93,
    costPosture: "medium",
    safetyNotes: "Standard safety filters. No NSFW.",
    promptTips:
      "Extremely prompt-following. Use detailed descriptive language. Works with negative prompts.",
    tags: ["image-generation", "flagship", "photorealistic", "cinematic"],
  },
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL",
    provider: "Stability AI / Open Weight",
    taskCategory: "image-generation",
    taskFitScore: 0.82,
    costPosture: "free",
    safetyNotes: "Safety checker configurable. Self-hosted deployments vary.",
    promptTips:
      "Use artist style references. Negative prompts are important for quality.",
    tags: ["image-generation", "open-weight", "customizable"],
  },
  {
    id: "imagen-3",
    name: "Imagen 3",
    provider: "Google",
    taskCategory: "image-generation",
    taskFitScore: 0.88,
    costPosture: "medium",
    safetyNotes: "Strict safety filtering. No real persons.",
    promptTips:
      "Excellent for product photography and editorial style. Clean, precise output.",
    tags: ["image-generation", "editorial", "product"],
  },
];
