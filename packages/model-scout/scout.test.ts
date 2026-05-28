import { describe, it, expect } from "vitest";
import { getModelsForTask, getAllTasks, getTopModels } from "./scout";

describe("Model Scout", () => {
  it("returns video models for task=video", () => {
    const task = getModelsForTask("video");
    expect(task).toBeDefined();
    expect(task?.slug).toBe("video");
    expect(task?.models.length).toBeGreaterThan(0);
  });

  it("returns image models for task=image", () => {
    const task = getModelsForTask("image");
    expect(task?.models.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown task", () => {
    expect(getModelsForTask("unknown-task")).toBeUndefined();
  });

  it("returns all tasks with correct structure", () => {
    const tasks = getAllTasks();
    expect(tasks.length).toBeGreaterThan(3);
    for (const task of tasks) {
      expect(task.slug).toBeTruthy();
      expect(task.name).toBeTruthy();
      expect(Array.isArray(task.models)).toBe(true);
    }
  });

  it("getTopModels returns sorted by taskFitScore descending", () => {
    const models = getTopModels("video", 3);
    expect(models.length).toBeLessThanOrEqual(3);
    for (let i = 0; i < models.length - 1; i++) {
      expect((models[i]?.taskFitScore ?? 0)).toBeGreaterThanOrEqual(
        models[i + 1]?.taskFitScore ?? 0
      );
    }
  });

  it("each model profile has required fields", () => {
    const task = getModelsForTask("video")!;
    for (const m of task.models) {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.provider).toBeTruthy();
      expect(m.taskFitScore).toBeGreaterThan(0);
      expect(["free", "low", "medium", "high"]).toContain(m.costPosture);
    }
  });
});
