import { defineConfig } from '@playwright/test';
import { TestConfig } from './src/core/test-config.js';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/playwright-junit.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }]
  ],

  use: {
    baseURL: TestConfig.baseUrl(),
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
});