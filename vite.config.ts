/// <reference types="vitest/config"/>
import path from "node:path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

export default defineConfig({
  base: "/dreams",
  plugins: [
    react(),
    visualizer({
      filename: "bundle-stats.html",
      open: true,
    }),
    checker({
      typescript: true,
      oxlint: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/__tests__/setupTest.ts",
    coverage: {
      provider: "v8",
    },
  },
});
