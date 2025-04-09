import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    video: 'on', 
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure', 
    viewport: { width: 1280, height: 720 }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
