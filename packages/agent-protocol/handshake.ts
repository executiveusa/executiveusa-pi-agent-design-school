import { randomUUID } from "crypto";
import { z } from "zod";

export const handshakeRequestSchema = z.object({
  agent_id: z.string().min(1),
  owner_id: z.string().min(1),
  capabilities: z.array(z.string()).default([]),
  constraints: z.array(z.string()).optional(),
  business_context: z.string().optional(),
  desired_tracks: z.array(z.string()).min(1),
  model_stack: z.array(z.string()).optional(),
  safety_profile: z.enum(["standard", "strict", "minimal"]).default("standard"),
  token: z.string().min(1),
});

export type HandshakeRequest = z.infer<typeof handshakeRequestSchema>;

export interface HandshakeResponse {
  status: "accepted" | "rejected";
  student_id: string;
  assigned_tracks: string[];
  required_modules: string[];
  estimated_training_time_hours: number;
  eval_requirements: string[];
  graduation_output_type: string;
  access_scope: string;
  reason?: string;
}

const VALID_TRACKS = new Set([
  "documentary-prompt-specialist",
  "anime-scene-specialist",
  "ugc-content-agent",
  "music-video-prompt-specialist",
  "product-brand-film-specialist",
]);

export function processHandshake(
  request: HandshakeRequest,
  validTokens: Set<string>
): HandshakeResponse {
  if (!validTokens.has(request.token)) {
    return {
      status: "rejected",
      student_id: "",
      assigned_tracks: [],
      required_modules: [],
      estimated_training_time_hours: 0,
      eval_requirements: [],
      graduation_output_type: "",
      access_scope: "none",
      reason: "Invalid or expired invite token.",
    };
  }

  const validDesiredTracks = request.desired_tracks.filter((t) =>
    VALID_TRACKS.has(t)
  );

  if (validDesiredTracks.length === 0) {
    return {
      status: "rejected",
      student_id: "",
      assigned_tracks: [],
      required_modules: [],
      estimated_training_time_hours: 0,
      eval_requirements: [],
      graduation_output_type: "",
      access_scope: "none",
      reason: `No valid tracks requested. Available: ${[...VALID_TRACKS].join(", ")}`,
    };
  }

  const studentId = randomUUID();

  return {
    status: "accepted",
    student_id: studentId,
    assigned_tracks: validDesiredTracks,
    required_modules: validDesiredTracks.flatMap((t) => [
      `${t}/foundations`,
      `${t}/craft`,
      `${t}/eval`,
    ]),
    estimated_training_time_hours: validDesiredTracks.length * 4,
    eval_requirements: validDesiredTracks.map((t) => `${t}-eval-v1`),
    graduation_output_type: "certificate+skill-pack",
    access_scope: "invite",
  };
}
