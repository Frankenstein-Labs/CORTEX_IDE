import * as path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@cortex\/contracts$/,
        replacement: path.resolve(import.meta.dirname, "./contracts/src/index.ts"),
      },
      {
        find: /^@cortex\/shared\/(.*)$/,
        replacement: `${path.resolve(import.meta.dirname, "./shared/src")}/$1.ts`,
      },
      {
        find: /^~\//,
        replacement: `${path.resolve(import.meta.dirname, "./src")}/`,
      },
    ],
  },
  test: {
    // The app spans the UI source, the vendored contracts/shared runtime modules,
    // and the perf harnesses; keep every unit suite in one project.
    include: [
      "src/**/*.test.{ts,tsx}",
      "perf/**/*.test.{ts,tsx}",
      "contracts/src/**/*.test.ts",
      "shared/src/**/*.test.ts",
    ],
    exclude: [
      "node_modules",
      "dist",
      "src/**/*.browser.{ts,tsx}",
      "src/**/*.browser.test.{ts,tsx}",
    ],
  },
});
