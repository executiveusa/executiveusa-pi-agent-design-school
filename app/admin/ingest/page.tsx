export default function IngestConsolePage() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "2rem", maxWidth: "900px" }}>
      <a href="/admin" style={{ fontSize: "0.8rem", color: "gray", textDecoration: "none", display: "block", marginBottom: "2rem" }}>← Admin</a>
      <h1 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Ingest Console</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Legacy content ingestion from seedance2prompt.com. Owner-authorized migration.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ border: "1px solid #e0e0e0", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Dry Run</h2>
          <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "1rem" }}>
            Crawl and report without writing to the database.
          </p>
          <code style={{ fontSize: "0.8rem", display: "block", background: "#f5f5f5", padding: "0.5rem" }}>
            pnpm run ingest:dry-run
          </code>
        </div>
        <div style={{ border: "1px solid #e0e0e0", padding: "1.5rem", opacity: 0.6 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Live Ingest</h2>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Requires DATABASE_URL and human approval before execution.
          </p>
        </div>
      </div>
    </main>
  );
}
