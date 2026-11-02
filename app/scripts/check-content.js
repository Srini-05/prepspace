import { access, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { topics } from '../src/config/topics.js'
import { analyzeMarkdown, contentUrl } from '../src/utils/markdownUtils.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'

const ids = new Set()
const files = new Set()
const titles = new Set()
const sources = new Map()
const markdown = unified().use(remarkParse)
const normalize = (text) => text.normalize('NFKC').toLowerCase().replace(/^[\d\s\p{P}\p{S}]+/u, '').replace(/[^\p{L}\p{N}]/gu, '')
for (const topic of topics) {
  for (const key of ['id', 'title', 'description', 'category', 'icon', 'file']) {
    if (typeof topic[key] !== 'string' || !topic[key].trim()) throw new Error(`Missing ${key} in topic registry.`)
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id) || ids.has(topic.id)) throw new Error(`Invalid or duplicate topic ID: ${topic.id}`)
  const title = normalize(topic.title)
  if (titles.has(title)) throw new Error(`Duplicate topic title: ${topic.title}`)
  titles.add(title)
  const path = fileURLToPath(new URL(`../public/${contentUrl(topic.file, '')}`, import.meta.url))
  if (files.has(path)) throw new Error(`Duplicate Markdown file: ${topic.file}`)
  ids.add(topic.id)
  files.add(path)
  await access(path)
  const source = await readFile(path, 'utf8')
  const digest = createHash('sha256').update(source.replace(/\s+/g, ' ').trim()).digest('hex')
  if (sources.has(digest)) throw new Error(`Duplicate guide content: ${topic.file} and ${sources.get(digest)}`)
  sources.set(digest, topic.file)
  const data = analyzeMarkdown(source)
  const questions = new Set()
  for (const question of data.questions) {
    const key = normalize(question)
    if (!key) continue
    if (questions.has(key)) throw new Error(`Duplicate question in ${topic.file}: ${question}`)
    questions.add(key)
  }
  if (new Set(data.headings.map((heading) => heading.id)).size !== data.headings.length) throw new Error(`Duplicate headings in ${topic.file}`)
  const localLinks = []
  visit(markdown.parse(source), 'link', (link) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(link.url) || !/\.md(?:[?#]|$)/i.test(link.url)) return
    const destinations = [
      new URL(link.url, `https://prepspace.invalid${topic.file}`),
      new URL(link.url, 'https://prepspace.invalid/content/'),
    ]
    if (destinations.some((destination) => !destination.pathname.startsWith('/content/'))) {
      throw new Error(`Markdown link escapes public/content/: ${topic.file} -> ${link.url}`)
    }
    const linkedFiles = destinations.map((destination) => fileURLToPath(new URL(`../public${destination.pathname}`, import.meta.url)))
    const rootRelativePath = destinations[1].pathname.slice('/content/'.length)
    const linkedTopic = topics.find((candidate) => candidate.id === rootRelativePath.split('/')[0])
    if (linkedTopic) linkedFiles.push(fileURLToPath(new URL(`../public/${contentUrl(linkedTopic.file, '')}`, import.meta.url)))
    localLinks.push({ linkedFiles, href: link.url })
  })
  for (const link of localLinks) {
    let exists = false
    for (const linkedFile of link.linkedFiles) {
      try { await access(linkedFile); exists = true; break }
      catch { continue }
    }
    if (!exists) throw new Error(`Broken Markdown link in ${topic.file}: ${link.href}`)
  }
  console.log(`${topic.title}: ${data.headings.length} headings, ${data.minutes} min read`)
}
console.log(`Validated ${topics.length} registered topics, unique titles, guide content, questions, headings, and local Markdown links. Content validation does not modify Markdown files.`)