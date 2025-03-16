import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  test: {
    globals: true, // Add this line to enable global `it` and `expect`
    environment: "jsdom", // Ensure the test environment is set to jsdom
    setupFiles: ["./src/lib/test-utils/test.setup.ts"],
  }
})
