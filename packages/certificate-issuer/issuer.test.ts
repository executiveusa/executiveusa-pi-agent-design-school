import { describe, it, expect } from "vitest";
import { issueCertificate } from "./issuer";
import { hashCertificate, verifyCertificateHash } from "./hasher";
import type { EvalResult } from "../eval-harness/types";

const mockEvalResult: EvalResult = {
  runId: "run-001",
  status: "pass",
  scores: {
    prompt_body_length: { key: "prompt_body_length", label: "Length", score: 0.2, maxScore: 0.2, passed: true },
    shot_type_present: { key: "shot_type_present", label: "Shot type", score: 0.15, maxScore: 0.15, passed: true },
    mood_present: { key: "mood_present", label: "Mood", score: 0.15, maxScore: 0.15, passed: true },
    truth_sensitive: { key: "truth_sensitive", label: "Truth", score: 0.25, maxScore: 0.25, passed: true },
    subject_present: { key: "subject_present", label: "Subject", score: 0.15, maxScore: 0.15, passed: true },
    safety_clean: { key: "safety_clean", label: "Safety", score: 0.1, maxScore: 0.1, passed: true },
  },
  totalScore: 1.0,
  passThreshold: 0.75,
  missingRequirements: [],
  unsafeBehaviors: [],
  remediation: [],
  evaluatedAt: "2026-05-28T00:00:00Z",
};

const SECRET = "test-secret-do-not-use-in-prod";
const BASE_URL = "https://piagentdesignschool.com";

describe("Certificate Issuer", () => {
  it("issues a valid certificate with correct structure", () => {
    const cert = issueCertificate({
      agentId: "agent-test-001",
      track: "documentary-prompt-specialist",
      trackName: "Documentary Prompt Specialist",
      evalResult: mockEvalResult,
      baseUrl: BASE_URL,
      issuerSecret: SECRET,
    });

    expect(cert.certificateId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    expect(cert.agentId).toBe("agent-test-001");
    expect(cert.track).toBe("documentary-prompt-specialist");
    expect(cert.status).toBe("valid");
    expect(cert.verifyUrl).toContain(cert.certificateId);
    expect(cert.hash).toBeTruthy();
    expect(cert.issuer.name).toBe("PI Agent Design School");
  });

  it("produces a deterministic hash for the same inputs", () => {
    const input = {
      agentId: "agent-abc",
      track: "anime-scene-specialist",
      scoresJson: '{"total":0.9}',
      issuedAt: "2026-05-28T12:00:00Z",
    };
    const h1 = hashCertificate(input, SECRET);
    const h2 = hashCertificate(input, SECRET);
    expect(h1).toBe(h2);
  });

  it("verifies a valid hash", () => {
    const input = {
      agentId: "agent-xyz",
      track: "ugc-content-agent",
      scoresJson: '{"total":0.8}',
      issuedAt: "2026-05-28T12:00:00Z",
    };
    const hash = hashCertificate(input, SECRET);
    expect(verifyCertificateHash(input, hash, SECRET)).toBe(true);
  });

  it("rejects a tampered hash", () => {
    const input = {
      agentId: "agent-xyz",
      track: "ugc-content-agent",
      scoresJson: '{"total":0.8}',
      issuedAt: "2026-05-28T12:00:00Z",
    };
    const hash = hashCertificate(input, SECRET);
    const tamperedHash = hash.slice(0, -4) + "0000";
    expect(verifyCertificateHash(input, tamperedHash, SECRET)).toBe(false);
  });

  it("produces different hashes for different inputs", () => {
    const base = {
      agentId: "agent-A",
      track: "documentary-prompt-specialist",
      scoresJson: '{"total":0.9}',
      issuedAt: "2026-05-28T12:00:00Z",
    };
    const modified = { ...base, agentId: "agent-B" };
    expect(hashCertificate(base, SECRET)).not.toBe(
      hashCertificate(modified, SECRET)
    );
  });
});
