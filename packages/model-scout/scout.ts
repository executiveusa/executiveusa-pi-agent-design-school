import { videoModels } from "./profiles/video";
import { imageModels } from "./profiles/image";
import type { ModelProfile, ModelScoutTask } from "./types";

const TASK_MAP: Record<string, ModelScoutTask> = {
  video: {
    slug: "video",
    name: "Text-to-Video / Image-to-Video",
    models: videoModels,
  },
  image: {
    slug: "image",
    name: "Image Generation",
    models: imageModels,
  },
  audio: {
    slug: "audio",
    name: "Audio / Music Generation",
    models: [
      {
        id: "suno-v4",
        name: "Suno v4",
        provider: "Suno AI",
        taskCategory: "music-generation",
        taskFitScore: 0.9,
        costPosture: "low",
        safetyNotes: "No explicit lyrics. Commercial use on paid plans.",
        promptTips: "Use genre, mood, BPM, and instrumentation in prompts.",
        tags: ["music-generation", "audio"],
      },
      {
        id: "udio",
        name: "Udio",
        provider: "Udio",
        taskCategory: "music-generation",
        taskFitScore: 0.87,
        costPosture: "low",
        safetyNotes: "Content policy applies.",
        promptTips: "Style and emotion descriptors work best.",
        tags: ["music-generation", "audio"],
      },
    ],
  },
  text: {
    slug: "text",
    name: "Text Generation / LLMs",
    models: [
      {
        id: "claude-sonnet-4-6",
        name: "Claude Sonnet 4.6",
        provider: "Anthropic",
        taskCategory: "text-generation",
        taskFitScore: 0.95,
        costPosture: "medium",
        safetyNotes: "Strong safety guidelines. Follows Constitutional AI.",
        promptTips:
          "Use structured prompts with clear role and task definition. Excellent for eval judging.",
        tags: ["text-generation", "reasoning", "safe"],
      },
    ],
  },
  embeddings: {
    slug: "embeddings",
    name: "Embeddings",
    models: [
      {
        id: "text-embedding-3-small",
        name: "text-embedding-3-small",
        provider: "OpenAI",
        taskCategory: "embeddings",
        taskFitScore: 0.88,
        costPosture: "low",
        safetyNotes: "Standard.",
        promptTips: "Normalize text before embedding for consistent results.",
        tags: ["embeddings", "semantic-search"],
      },
    ],
  },
  multimodal: {
    slug: "multimodal",
    name: "Multimodal Reasoning",
    models: [
      {
        id: "gemini-2.0-flash",
        name: "Gemini 2.0 Flash",
        provider: "Google",
        taskCategory: "multimodal",
        taskFitScore: 0.9,
        costPosture: "low",
        safetyNotes: "Standard Google safety filters.",
        promptTips: "Strong at image + text reasoning. Use for eval judging.",
        tags: ["multimodal", "fast", "reasoning"],
      },
    ],
  },
};

export function getModelsForTask(taskSlug: string): ModelScoutTask | undefined {
  return TASK_MAP[taskSlug];
}

export function getAllTasks(): ModelScoutTask[] {
  return Object.values(TASK_MAP);
}

export function getTopModels(taskSlug: string, limit = 5): ModelProfile[] {
  const task = TASK_MAP[taskSlug];
  if (!task) return [];
  return [...task.models]
    .sort((a, b) => b.taskFitScore - a.taskFitScore)
    .slice(0, limit);
}
