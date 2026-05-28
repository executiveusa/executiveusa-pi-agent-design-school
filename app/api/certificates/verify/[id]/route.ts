import { NextRequest, NextResponse } from "next/server";
import { verifyCertificateHash } from "@/packages/certificate-issuer/hasher";

const MOCK_CERTIFICATES: Record<string, {
  certificateId: string;
  agentId: string;
  track: string;
  trackName: string;
  scores: { total: number; breakdown: Record<string, number> };
  issuedAt: string;
  hash: string;
  status: "valid" | "revoked";
  verifyUrl: string;
}> = {
  "demo-cert-001": {
    certificateId: "demo-cert-001",
    agentId: "agent-demo-001",
    track: "documentary-prompt-specialist",
    trackName: "Documentary Prompt Specialist",
    scores: {
      total: 0.91,
      breakdown: {
        prompt_body_length: 1.0,
        shot_type_present: 1.0,
        mood_present: 1.0,
        truth_sensitive: 1.0,
        subject_present: 1.0,
        safety_clean: 1.0,
      },
    },
    issuedAt: "2026-05-28T00:00:00Z",
    hash: "demo-hash-placeholder",
    status: "valid",
    verifyUrl: `${process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://piagentdesignschool.com"}/api/certificates/verify/demo-cert-001`,
  },
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cert = MOCK_CERTIFICATES[id];
  if (!cert) {
    return NextResponse.json(
      { error: "Certificate not found", code: "not_found" },
      { status: 404 }
    );
  }

  if (cert.status === "revoked") {
    return NextResponse.json(
      {
        error: "Certificate has been revoked",
        code: "revoked",
        certificate_id: id,
        revoked: true,
      },
      { status: 422 }
    );
  }

  return NextResponse.json(cert);
}
