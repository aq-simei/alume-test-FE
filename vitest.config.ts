import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Add this line to enable global `it` and `expect`
    environment: "jsdom", // Ensure the test environment is set to jsdom
    alias: {
      "@": path.resolve(__dirname, "./src"), // Resolve @/ to ./src
    },
  },
});
