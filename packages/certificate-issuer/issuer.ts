import { randomUUID } from "crypto";
import { hashCertificate } from "./hasher";
import type { EvalResult } from "../eval-harness/types";

export interface CertificateInput {
  agentId: string;
  ownerId?: string;
  track: string;
  trackName: string;
  evalResult: EvalResult;
  baseUrl: string;
  issuerSecret: string;
}

export interface Certificate {
  certificateId: string;
  agentId: string;
  ownerId?: string;
  track: string;
  trackName: string;
  scores: {
    total: number;
    breakdown: Record<string, number>;
  };
  issuedAt: string;
  hash: string;
  status: "valid" | "revoked";
  verifyUrl: string;
  issuer: {
    name: string;
    url: string;
  };
}

export function issueCertificate(input: CertificateInput): Certificate {
  const certificateId = randomUUID();
  const issuedAt = new Date().toISOString();

  const breakdown: Record<string, number> = {};
  for (const [key, score] of Object.entries(input.evalResult.scores)) {
    breakdown[key] = score.score / (score.maxScore || 1);
  }

  const scores = {
    total: input.evalResult.totalScore,
    breakdown,
  };

  const scoresJson = JSON.stringify(scores);

  const hash = hashCertificate(
    {
      agentId: input.agentId,
      track: input.track,
      scoresJson,
      issuedAt,
    },
    input.issuerSecret
  );

  return {
    certificateId,
    agentId: input.agentId,
    ownerId: input.ownerId,
    track: input.track,
    trackName: input.trackName,
    scores,
    issuedAt,
    hash,
    status: "valid",
    verifyUrl: `${input.baseUrl}/api/certificates/verify/${certificateId}`,
    issuer: {
      name: "PI Agent Design School",
      url: input.baseUrl,
    },
  };
}
