export default function NotFound() {
  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "var(--section-pad) 2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "3rem", fontWeight: 400, marginBottom: "1rem" }}>404</h1>
      <p style={{ color: "var(--color-slate)", marginBottom: "2rem" }}>Page not found.</p>
      <a href="/" style={{ color: "var(--color-ink)", fontSize: "0.9rem" }}>← Return home</a>
    </main>
  );
}
