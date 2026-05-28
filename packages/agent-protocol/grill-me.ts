import { z } from "zod";

export const grillMeRequestSchema = z.object({
  business_type: z.string().optional(),
  goal: z.string().optional(),
  constraints: z.array(z.string()).optional(),
  model_stack: z.array(z.string()).optional(),
  prior_answers: z.record(z.string(), z.string()).optional(),
});

export type GrillMeRequest = z.infer<typeof grillMeRequestSchema>;

export interface GrillMeResponse {
  status: "complete" | "needs_more_info";
  student_profile?: {
    business_type: string;
    goal: string;
    skill_level: string;
  };
  recommended_track?: string;
  training_path?: string[];
  success_criteria?: string[];
  failure_modes?: string[];
  recommended_certificate?: string;
  clarifying_questions?: string[];
}

const TRACK_SIGNALS: Record<string, string[]> = {
  "documentary-prompt-specialist": [
    "documentary",
    "journalism",
    "interview",
    "nonfiction",
    "true story",
    "observational",
  ],
  "anime-scene-specialist": [
    "anime",
    "manga",
    "cel-shad",
    "japanese animation",
    "sakuga",
  ],
  "ugc-content-agent": [
    "ugc",
    "tiktok",
    "instagram",
    "social",
    "influencer",
    "testimonial",
    "product review",
  ],
  "music-video-prompt-specialist": [
    "music video",
    "mv",
    "song",
    "band",
    "visual album",
    "rhythm",
  ],
  "product-brand-film-specialist": [
    "product",
    "brand",
    "commercial",
    "advertising",
    "hero shot",
    "luxury",
  ],
};

function detectTrack(input: GrillMeRequest): string | undefined {
  const text = [
    input.business_type ?? "",
    input.goal ?? "",
    ...(input.constraints ?? []),
  ]
    .join(" ")
    .toLowerCase();

  for (const [track, signals] of Object.entries(TRACK_SIGNALS)) {
    if (signals.some((s) => text.includes(s))) return track;
  }
  return undefined;
}

export function processGrillMe(request: GrillMeRequest): GrillMeResponse {
  const detectedTrack = detectTrack(request);
  const hasEnoughContext = request.business_type && request.goal;

  if (!hasEnoughContext) {
    return {
      status: "needs_more_info",
      clarifying_questions: [
        "What type of content do you or your clients primarily produce? (e.g., documentaries, anime, social media, music videos, brand films)",
        "What is the primary goal for this training? (e.g., produce better video prompts, win AI film festival, grow brand content)",
        "What AI model stack are you working with?",
        "Are there any content constraints or restrictions we should know about?",
      ],
    };
  }

  if (!detectedTrack) {
    return {
      status: "needs_more_info",
      clarifying_questions: [
        "Which creative specialty fits your primary use case: documentary, anime, UGC/social, music video, or product/brand film?",
        "Is the end goal cinematic quality or fast social content?",
      ],
    };
  }

  return {
    status: "complete",
    student_profile: {
      business_type: request.business_type ?? "creative agency",
      goal: request.goal ?? "improve AI video prompt quality",
      skill_level: "beginner",
    },
    recommended_track: detectedTrack,
    training_path: [
      `${detectedTrack}/foundations`,
      `${detectedTrack}/craft`,
      `${detectedTrack}/advanced`,
      `${detectedTrack}/eval`,
    ],
    success_criteria: [
      "Complete all required modules",
      "Pass 3 evaluated exercises with score ≥ 75%",
      "Demonstrate safe, non-deceptive prompt engineering",
    ],
    failure_modes: [
      "Incomplete prompt structure",
      "Missing required shot or mood specifications",
      "Unsafe content patterns detected",
    ],
    recommended_certificate: detectedTrack,
  };
}
