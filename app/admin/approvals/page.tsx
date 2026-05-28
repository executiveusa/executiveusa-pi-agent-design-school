export default function ApprovalsPage() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "2rem", maxWidth: "900px" }}>
      <a href="/admin" style={{ fontSize: "0.8rem", color: "gray", textDecoration: "none", display: "block", marginBottom: "2rem" }}>← Admin</a>
      <h1 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Approvals Queue</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        All publish, payment, social, and production actions require human approval.
      </p>
      <div style={{ border: "1px solid #e0e0e0", padding: "2rem", textAlign: "center", color: "#999" }}>
        No pending approvals.
      </div>
    </main>
  );
}
