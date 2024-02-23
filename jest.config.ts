import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "babel",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "./app/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/__tests__/**",
    "!./app/layout.tsx",
    "!./app/page.tsx",
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "./app/_utils/fetcher.ts",
    "./app/_urls/",
  ],
  testPathIgnorePatterns: ["utils"],
};

export default createJestConfig(config);
