import { defineConfig, devices } from "@playwright/test";

// Browser-level checks that vitest cannot make: real mobile emulation, keyboard
// focus, forced-colors, and container layout. Kept deliberately narrow - these
// are expensive compared to the pure-logic tests in src, so only behaviour that
// genuinely needs a DOM belongs here.
//
// channel: "msedge" uses the Edge already installed on this machine instead of
// downloading Playwright's own ~150MB Chromium.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],

  // The default 30s is a production-server budget, and webServer below runs the
  // DEV server, which compiles each route on first request. Two projects in
  // parallel hitting a cold route made a different test fail on every run - the
  // click landed before the chunk existed. Against `next start` the same suite
  // is 13/13 in about a minute, so the code was never the problem; the budget
  // was. A flaky suite is worse than no suite: it teaches you to ignore red.
  timeout: 90_000,

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Edge"], channel: "msedge", viewport: { width: 1440, height: 900 } },
    },
    {
      // Real device emulation - the thing headless screenshots at a narrow
      // window size cannot give, because they lay out wide and crop.
      name: "mobile",
      use: { ...devices["Pixel 7"], channel: "msedge" },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
