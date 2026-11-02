import { test, expect } from '@playwright/test'
import { topics } from '../../src/config/topics.js'
import { projects } from '../../src/config/projects.js'

const addedTopicIds = ['typescript', 'spring-security', 'rest-api-design', 'postgresql', 'docker', 'kubernetes', 'aws', 'git-github', 'low-level-design', 'software-testing', 'ci-cd', 'owasp-top-10', 'kafka', 'redis']

const fixtures = [
  { id: 'reader-test', title: 'Reader test', category: 'Testing', description: 'Browser-only Markdown fixture', icon: 'Code2', file: '/content/reader-test.md' },
  { id: 'second-test', title: 'Second test', category: 'Reference', description: 'Navigation fixture', icon: 'Layers', file: '/content/second-test.md' },
  { id: 'missing-test', title: 'Missing test', category: 'Testing', description: 'Failure fixture', icon: 'BookOpen', file: '/content/missing-test.md' },
  { id: 'empty-test', title: 'Empty test', category: 'Testing', description: 'Empty fixture', icon: 'BookOpen', file: '/content/empty-test.md' },
]
const code = 'const answer = 42;\nconsole.log(answer);'
const source = [
  '# Reader test', 'Original **bold** and *italic* content with `inline code`.',
  '## Repeated heading', '```javascript\n' + code + '\n```',
  '| Column | Value |\n| --- | --- |\n| Original | Preserved |',
  '> A blockquote.', '- [x] Completed task\n- [ ] Pending task',
  '1. First\n2. Second\n   - Nested', '---',
  '<details><summary>Interview question?</summary>\n\nOriginal answer.\n\n### Nested answer\n\nNested content.\n</details>',
  '## Repeated heading', 'A duplicate heading with its own anchor.',
  '<script>window.__unsafe = true</script><img src="invalid" onerror="window.__unsafe = true" />',
  '[Internal link](#repeated-heading-1)', '[Other topic](second-test.md)',
  ...Array.from({ length: 16 }, (_, index) => `## Section ${index + 1}\n\n${'Original paragraph for scroll verification. '.repeat(18)}`),
  '## Unique needle', 'Searchable interview question with uniqueneedle.',
  '#### Fourth level\n##### Fifth level\n###### Sixth level',
].join('\n\n')

async function seed(page, { missing = true } = {}) {
  await page.route('**/src/config/topics.js*', (route) => route.fulfill({ contentType: 'application/javascript', body: `export const topics = ${JSON.stringify(fixtures)};` }))
  await page.route('**/content/*.md', (route) => {
    const url = route.request().url()
    if (url.endsWith('missing-test.md') && missing) return route.fulfill({ status: 404, body: 'Not found' })
    return route.fulfill({ contentType: 'text/markdown', body: url.endsWith('reader-test.md') ? source : url.endsWith('empty-test.md') ? '' : '# Second test\n\nOriginal second topic.' })
  })
}

test('imported library, command shortcut, themes and persisted settings', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Your next interview starts here.' })).toBeVisible()
  const categoryCount = new Set(topics.map((topic) => topic.category)).size
  await expect(page.locator('.stat strong')).toHaveText([String(topics.length).padStart(2, '0'), String(categoryCount).padStart(2, '0'), '00', '00'])
  await expect(page.locator('.topic-card')).toHaveCount(topics.length)
  await expect(page.locator('.topic-card h3')).toHaveText(topics.map((topic) => topic.title))
  await page.keyboard.press('Meta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('combobox')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'Reading settings' }).click()
  await page.getByRole('combobox').selectOption('wide')
  await page.getByRole('switch', { name: 'Quick revision' }).check()
  await page.getByRole('button', { name: 'Close dialog' }).click()
  await page.reload()
  await page.getByRole('button', { name: 'Reading settings' }).click()
  await expect(page.getByRole('combobox')).toHaveValue('wide')
  await expect(page.getByRole('switch')).toBeChecked()
})

test('creator projects and the shared footer work on desktop and mobile', async ({ page }) => {
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const section = page.getByRole('region', { name: 'More by Srinivasan' })
    await section.scrollIntoViewIfNeeded()
    await expect(section.getByRole('article')).toHaveCount(3)
    for (const project of projects) {
      const link = section.getByRole('link', { name: `View ${project.title} project`, exact: true })
      await expect(link).toHaveAttribute('href', project.url)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(section).toContainText(project.description)
    }
    const footer = page.getByRole('contentinfo', { name: 'Site footer' })
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toContainText('Made with love from Srinivasan')
    await expect(footer.getByRole('navigation')).toHaveCount(3)
    expect(await page.locator('#main-content').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    await footer.getByRole('link', { name: 'Browse topics', exact: true }).click()
    await expect(page).toHaveURL(/#\/topics$/)
    await page.goto('/#/topic/typescript')
    await expect(page.locator('.markdown-body')).toBeVisible()
    await expect(footer).toHaveCount(1)
    await expect(page.getByRole('region', { name: 'More by Srinivasan' })).toHaveCount(0)
  }
})

test('real Markdown guides render and the Linux index navigates to its preserved relative guide', async ({ page }) => {
  await page.goto('/#/topic/linux')
  await expect(page.locator('.markdown-body')).toContainText('Linux is an open-source operating system kernel.')
  await expect(page.locator('.markdown-body summary')).toHaveCount(63)
  await expect(page.locator('.toc nav button')).toContainText(['Linux Interview Preparation', 'Contents', 'Level 1: Linux Basics'])
  await page.getByRole('link', { name: '4. Networking' }).click()
  await expect(page).toHaveURL(/topic\/networking/)
  await expect(page.locator('.markdown-body')).toContainText('A computer network is a group of connected devices')
})

test('global search indexes real question-and-answer text', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Meta+k')
  await page.getByRole('combobox').fill('partition prevents nodes from communicating')
  await expect(page.getByRole('option').first()).toBeVisible()
  await expect(page.locator('.search-group').filter({ hasText: 'Distributed Systems' })).toBeVisible()
  await expect(page.locator('.search-result').filter({ hasText: 'Level 2: Scale, Availability, and Reliability' })).toBeVisible()
})

test('all registered Markdown topics load through the shared reader', async ({ page }) => {
  for (const topic of topics) {
    await page.goto(`/#/topic/${topic.id}`)
    await expect(page.locator('.markdown-body')).toBeVisible()
    await expect(page.locator('.article-header h1')).toHaveText(topic.title)
    await expect(page.locator('.markdown-body h1').first()).toBeVisible()
  }
})

test('new guides expose twelve expandable answers, practice labs and references', async ({ page }) => {
  for (const id of addedTopicIds) {
    await page.goto(`/#/topic/${id}`)
    const disclosures = page.locator('.markdown-body details')
    await expect(disclosures).toHaveCount(12)
    await disclosures.first().locator('summary').click()
    await expect(disclosures.first()).toHaveAttribute('open', '')
    await expect(disclosures.first().getByText('Answer:', { exact: true })).toBeVisible()
    await expect(page.locator('.markdown-body')).toContainText('Practice Lab')
    await expect(page.locator('.markdown-body')).toContainText('Quick Revision')
    await expect(page.locator('.markdown-body')).toContainText('References')
  }
})

test('reader preserves rendering, exact code copying, sanitized disclosures and anchors', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await seed(page)
  await page.goto('/#/topic/reader-test')
  await expect(page.locator('.markdown-body strong')).toHaveText('bold')
  await expect(page.locator('.hljs-keyword').first()).toBeVisible()
  await expect(page.locator('.table-scroll td').first()).toHaveText('Original')
  await expect(page.locator('.markdown-body input[type=checkbox]')).toHaveCount(2)
  await page.getByRole('button', { name: 'Copy code', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Copied!' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(code)
  await page.locator('.markdown-body summary').click()
  await expect(page.getByText('Original answer.', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => window.__unsafe)).toBeUndefined()
  const ids = await page.locator('.article-heading').evaluateAll((nodes) => nodes.map((node) => node.id))
  expect(new Set(ids).size).toBe(ids.length)
  await page.getByRole('link', { name: 'Internal link', exact: true }).click()
  await expect(page.locator('#section-repeated-heading-1')).toBeFocused()
  await page.getByRole('link', { name: 'Other topic', exact: true }).click()
  await expect(page).toHaveURL(/topic\/second-test/)
})

test('bookmarks survive reload, reopen the section and can be removed', async ({ page }) => {
  await seed(page)
  await page.goto('/#/topic/reader-test')
  await page.locator('#section-repeated-heading').hover()
  await page.getByRole('button', { name: 'Bookmark: Repeated heading', exact: true }).first().click()
  await page.getByRole('link', { name: /^Bookmarks/ }).click()
  await expect(page.locator('.bookmark-row')).toHaveCount(1)
  await page.reload()
  await expect(page.locator('.bookmark-row')).toHaveCount(1)
  await page.locator('.bookmark-row a').click()
  await expect(page.locator('#section-repeated-heading')).toBeFocused()
  await page.getByRole('link', { name: /^Bookmarks/ }).click()
  await page.getByRole('button', { name: 'Remove bookmark: Repeated heading' }).click()
  await expect(page.getByText('Nothing saved. Yet.')).toBeVisible()
})

test('search finds content, groups results and keyboard opens the matching heading', async ({ page }) => {
  await seed(page)
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.getByRole('combobox').fill('uniqueneedle')
  await expect(page.getByRole('option')).toHaveCount(1)
  await expect(page.locator('.search-result mark')).toHaveText('uniqueneedle')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/section=section-unique-needle/)
  await expect(page.locator('#section-unique-needle')).toBeFocused()
  await page.keyboard.press('Control+k')
  await page.getByRole('combobox').fill('nonsensicalzzzzzz')
  await expect(page.getByText('No matches found')).toBeVisible()
  await page.keyboard.press('Escape')
})

test('article progress, revision, recent history and adjacent-topic navigation', async ({ page }) => {
  await seed(page)
  await page.goto('/#/topic/reader-test')
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  await page.getByRole('button', { name: 'Quick revision', exact: true }).click()
  await expect(page.locator('.reader-page')).toHaveClass(/revision-mode/)
  await page.locator('#main-content').evaluate((element) => { element.scrollTop = element.scrollHeight })
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  await page.getByRole('link', { name: 'Next topic Second test' }).click()
  await expect(page.locator('.markdown-body')).toContainText('Original second topic.')
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page.locator('.continue-row')).toContainText('Second test')
  await expect(page.locator('.recent-row')).toHaveCount(2)
})

test('missing files, retry, empty documents and unknown topics', async ({ page }) => {
  await seed(page)
  await page.goto('/#/topic/missing-test')
  await expect(page.getByText("Notes couldn't be loaded")).toBeVisible()
  await page.route('**/content/missing-test.md', (route) => route.fulfill({ contentType: 'text/markdown', body: '# Recovered' }))
  await page.getByRole('button', { name: 'Try again' }).click()
  await expect(page.locator('.markdown-body')).toContainText('Recovered')
  await page.goto('/#/topic/empty-test')
  await expect(page.getByText('No notes in this file yet')).toBeVisible()
  await page.goto('/#/topic/not-registered')
  await expect(page.getByText('Topic not found', { exact: true })).toBeVisible()
})

test('mobile drawer, responsive reader, TOC and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seed(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Reader test', exact: true }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('.markdown-body')).toBeVisible()
  await page.locator('.mobile-toc summary').click()
  await page.locator('.mobile-toc').getByRole('button', { name: 'Unique needle', exact: true }).click()
  await expect(page.locator('#section-unique-needle')).toBeFocused()
  expect(await page.locator('body').evaluate((element) => element.scrollWidth <= innerWidth)).toBe(true)
  expect(await page.locator('#main-content').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  await page.screenshot({ path: 'test-results/mobile-reader.png' })
})

test('clipboard denial is handled and invalid local storage does not crash', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('prepspace:preferences', '{broken')
    localStorage.setItem('prepspace:bookmarks', JSON.stringify([null]))
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Denied') } } })
  })
  await seed(page)
  await page.goto('/#/topic/reader-test')
  await page.getByRole('button', { name: 'Copy code', exact: true }).click()
  await expect(page.getByText('Copy failed. Select code to copy.')).toBeVisible()
})

test('category filtering and sidebar collapse reflect registry data', async ({ page }) => {
  await seed(page)
  await page.goto('/#/topics')
  await expect(page.locator('.topic-card')).toHaveCount(4)
  await expect(page.locator('.category-toggle[aria-expanded="false"]')).toHaveCount(2)
  await expect(page.locator('.category-toggle').first()).toHaveCSS('font-size', '11px')
  await page.locator('.category-toggle').filter({ hasText: 'Reference' }).click()
  await expect(page.locator('.category-toggle[aria-expanded="true"]')).toHaveCount(1)
  await expect(page.locator('.topic-card')).toHaveCount(1)
  await page.getByRole('textbox', { name: 'Find a topic' }).fill('absent')
  await expect(page.getByText('No matching topics')).toBeVisible()
  await page.getByRole('button', { name: 'Collapse sidebar' }).click()
  await expect(page.locator('.app-shell')).toHaveClass(/sidebar-collapsed/)
})

test('desktop, tablet and mobile surfaces fit without runtime errors', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of [1440, 900, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Your next interview starts here.' })).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    expect(await page.locator('#main-content').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    expect(await page.locator('body').evaluate((element) => element.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `test-results/home-${width}.png` })
  }
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await page.screenshot({ path: 'test-results/mobile-light.png' })
  expect(errors).toEqual([])
})
