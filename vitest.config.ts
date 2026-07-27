import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Vitest needs the same "@/..." alias tsconfig gives the app, otherwise any
// test that reaches a module importing "@/..." fails to resolve - which is why
// coverage had been limited to leaf modules in src/lib with no alias imports.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
