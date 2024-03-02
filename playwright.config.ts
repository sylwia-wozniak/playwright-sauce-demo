import { defineConfig, devices } from '@playwright/test';
import * as process from 'process';
require('dotenv').config();

export default defineConfig({
  testDir: 'playwright/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL,
    trace: 'on',
    testIdAttribute: 'data-test',
  },

  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/, fullyParallel: true },
    {
      name: "admin",
      dependencies: ["setup"],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "app",
      dependencies: ["setup"],
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
});
