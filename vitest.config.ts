import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
      "@/db": resolve(__dirname, "db"),
      "@/packages": resolve(__dirname, "packages"),
    },
  },
});
