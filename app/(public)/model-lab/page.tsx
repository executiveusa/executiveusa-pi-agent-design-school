import type { Metadata } from "next";
import { getAllTasks } from "@/packages/model-scout/scout";

export const metadata: Metadata = {
  title: "Model Lab — PI Agent Design School",
  description: "AI model recommendations for video, image, audio, and text generation tasks.",
};

export default function ModelLabPage() {
  const tasks = getAllTasks();

  return (
    <main style={{ fontFamily: "var(--font-system)", padding: "var(--section-pad) 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <a href="/" style={{ fontSize: "0.8rem", color: "var(--color-fog)", textDecoration: "none", display: "block", marginBottom: "3rem" }}>← Home</a>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-fog)", marginBottom: "1rem", textTransform: "uppercase" }}>Model Lab</p>
      <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "3rem" }}>
        Right model. Right task.
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        {tasks.map((task) => (
          <div key={task.slug} style={{ borderTop: "1px solid var(--color-mist)", paddingTop: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "1rem" }}>{task.name}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {task.models.slice(0, 3).map((model) => (
                <div key={model.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem" }}>{model.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-fog)" }}>{model.provider}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-accent)" }}>
                      {Math.round(model.taskFitScore * 100)}%
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--color-fog)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {model.costPosture}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={`/api/model-scout/tasks/${task.slug}`}
              style={{ display: "block", marginTop: "1rem", fontSize: "0.75rem", color: "var(--color-fog)", textDecoration: "none", fontFamily: "var(--font-mono)" }}
            >
              /api/model-scout/tasks/{task.slug}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
