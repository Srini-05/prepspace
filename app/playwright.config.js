import { defineConfig, devices } from '@playwright/test'
import { fileURLToPath } from 'node:url'

process.env.PLAYWRIGHT_BROWSERS_PATH ||= fileURLToPath(new URL('./node_modules/.cache/playwright', import.meta.url))

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4174', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 4174 --strictPort', url: 'http://127.0.0.1:4174', reuseExistingServer: !process.env.CI },
})