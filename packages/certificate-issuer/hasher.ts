import { createHmac } from "crypto";

export interface CertificateHashInput {
  agentId: string;
  track: string;
  scoresJson: string;
  issuedAt: string;
}

export function hashCertificate(
  input: CertificateHashInput,
  secret: string
): string {
  const payload = [
    input.agentId,
    input.track,
    input.scoresJson,
    input.issuedAt,
  ].join("|");

  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function verifyCertificateHash(
  input: CertificateHashInput,
  expectedHash: string,
  secret: string
): boolean {
  const computed = hashCertificate(input, secret);
  return computed === expectedHash;
}
