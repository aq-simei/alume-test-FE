import { defineConfig } from "vitest/config";
import path from "path"; // Add this import
import "@testing-library/jest-dom/vitest";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../../src"),
    },
  },
  test: {
    environment: "jsdom", // Use jsdom for DOM testing
    globals: true, // Enable global APIs like `describe`, `it`, etc.
    setupFiles: [
      path.resolve(__dirname, "./setupTests.ts"), // Correct the path
      path.resolve(__dirname, "./setupMocks.ts")  // Correct the path
    ],
  },
});
