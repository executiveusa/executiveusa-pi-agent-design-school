import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — PI Agent Design School",
  description: "Founding cohort access is free. Enterprise and studio plans available.",
};

export default function PricingPage() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "var(--section-pad) 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <a href="/" style={{ fontSize: "0.8rem", color: "var(--color-fog)", textDecoration: "none", display: "block", marginBottom: "3rem" }}>← Home</a>
      <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1.5rem" }}>
        Simple access. No friction.
      </h1>
      <p style={{ color: "var(--color-slate)", lineHeight: 1.7, marginBottom: "3rem" }}>
        Founding cohort access is invite-only and free. No payment capture during MVP.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
        {[
          { tier: "Founding", price: "Free", note: "Invite token required. Full access to all tracks.", scope: "invite" },
          { tier: "Studio", price: "Coming soon", note: "Multi-agent studio access. Volume discount.", scope: "studio" },
          { tier: "Enterprise", price: "Contact us", note: "Custom training, dedicated eval, SLA.", scope: "enterprise" },
        ].map((plan) => (
          <div key={plan.tier} style={{ border: "1px solid var(--color-mist)", padding: "2rem" }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-fog)", marginBottom: "0.5rem", textTransform: "uppercase" }}>{plan.tier}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: "1rem" }}>{plan.price}</div>
            <p style={{ fontSize: "0.9rem", color: "var(--color-slate)", lineHeight: 1.6 }}>{plan.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
