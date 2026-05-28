export default function AdminDashboard() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "2rem" }}>
      <h1 style={{ fontWeight: 600, marginBottom: "2rem" }}>Admin Dashboard</h1>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <a href="/admin/ingest" style={{ color: "inherit", textDecoration: "none" }}>→ Ingest Console</a>
        <a href="/admin/prompts" style={{ color: "inherit", textDecoration: "none" }}>→ Prompt Management</a>
        <a href="/admin/courses" style={{ color: "inherit", textDecoration: "none" }}>→ Course Management</a>
        <a href="/admin/approvals" style={{ color: "inherit", textDecoration: "none" }}>→ Approvals (Publish, Social, Payment)</a>
      </nav>
    </main>
  );
}
