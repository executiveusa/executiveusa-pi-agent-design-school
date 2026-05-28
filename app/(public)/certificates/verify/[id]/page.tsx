import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Verification — PI Agent Design School",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CertificateVerifyPage({ params }: Props) {
  const { id } = await params;

  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "var(--section-pad) 2rem", maxWidth: "700px", margin: "0 auto" }}>
      <a href="/" style={{ fontSize: "0.8rem", color: "var(--color-fog)", textDecoration: "none", display: "block", marginBottom: "3rem" }}>← Home</a>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-fog)", marginBottom: "1rem", textTransform: "uppercase" }}>
        Certificate Verification
      </p>
      <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 400, marginBottom: "2rem" }}>
        Verify graduation certificate.
      </h1>
      <div style={{ border: "1px solid var(--color-mist)", padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--color-fog)", marginBottom: "1rem" }}>
          Certificate ID
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", wordBreak: "break-all" }}>{id}</div>
      </div>
      <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Verification is handled by the machine-readable endpoint below. The response includes
        certificate metadata and hash verification status without exposing private training data.
      </p>
      <a
        href={`/api/certificates/verify/${id}`}
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent)", textDecoration: "none" }}
      >
        GET /api/certificates/verify/{id}
      </a>
    </main>
  );
}
