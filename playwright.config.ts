import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  globalSetup:    './utils/globalSetup.ts',
  globalTeardown: './utils/globalTeardown.ts',

  // Global timeouts
  timeout: 30_000,          // each test must finish within 30 seconds
  expect: {
    timeout: 8_000,         // each expect() must pass within 8 seconds
  },

  reporter: [['html'], ['list']],
  use: {
    baseURL:         'http://localhost:5173',
    headless:        false,
    actionTimeout:   10_000, 
    navigationTimeout: 15_000, 
    trace:           'on-first-retry',
    screenshot:      'only-on-failure',
    video:           'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});