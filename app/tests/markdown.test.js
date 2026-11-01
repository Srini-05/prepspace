import test from 'node:test'
import assert from 'node:assert/strict'
import { analyzeMarkdown, contentUrl, fetchMarkdown } from '../src/utils/markdownUtils.js'

test('outline handles duplicate, formatted, nested and Unicode headings', () => {
  const result = analyzeMarkdown('# Title\n## **Repeat**\n## Repeat\n<details><summary>Question?</summary>\n\n### Réseau\n\nAnswer\n</details>')
  assert.deepEqual(result.headings.map(({ id }) => id), ['section-title', 'section-repeat', 'section-repeat-1', 'section-réseau'])
  assert.ok(result.sections.some(({ content }) => content.includes('Answer')))
})

test('HTML is sanitized and fenced headings are not outline entries', () => {
  const result = analyzeMarkdown('# Safe\n<script>alert(1)</script>\n\n```js\n# not a heading\n```')
  assert.equal(result.headings.length, 1)
  assert.ok(!result.sections.some(({ content }) => content.includes('alert(1)')))
})

test('empty documents and nested deployment paths', () => {
  assert.equal(analyzeMarkdown('').minutes, 0)
  assert.equal(contentUrl('/content/topic.md', '/prepspace/'), '/prepspace/content/topic.md')
  assert.throws(() => contentUrl('/content/../secret.md'))
})

test('missing files and static hosting HTML fallbacks are rejected', async () => {
  const topic = { title: 'Test', file: '/content/test.md' }
  await assert.rejects(fetchMarkdown(topic, { fetcher: async () => new Response('missing', { status: 404 }) }))
  await assert.rejects(fetchMarkdown(topic, { fetcher: async () => new Response('<html></html>', { headers: { 'content-type': 'text/html' } }) }))
  const result = await fetchMarkdown(topic, { fetcher: async () => new Response('# Original\n\nExact source.\n') })
  assert.equal(result.source, '# Original\n\nExact source.\n')
})