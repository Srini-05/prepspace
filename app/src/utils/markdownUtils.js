import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import { toText } from 'hast-util-to-text'
import { visit } from 'unist-util-visit'

export const headingPrefix = 'section-'
const schema = { ...defaultSchema, attributes: { ...defaultSchema.attributes, code: [...defaultSchema.attributes.code, 'dataOriginalCode'] } }
export const safePlugins = [rehypeRaw, [rehypeSanitize, schema], [rehypeSlug, { prefix: headingPrefix }]]

export function preserveCode() {
  return (tree) => visit(tree, 'code', (node) => {
    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, dataOriginalCode: node.value } }
  })
}

export function analyzeMarkdown(source) {
  const processor = unified().use(remarkParse).use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw).use(rehypeSanitize).use(rehypeSlug, { prefix: headingPrefix })
  const tree = processor.runSync(processor.parse(source))
  const headings = []
  const sections = [{ id: '', title: 'Introduction', content: '' }]
  visit(tree, (node) => {
    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
      const heading = { id: node.properties.id, title: toText(node), depth: Number(node.tagName[1]) }
      headings.push(heading)
      sections.push({ ...heading, content: '' })
    }
    if (node.type === 'text') sections.at(-1).content += `${node.value} `
  })
  const text = toText(tree)
  return {
    headings,
    sections: sections.filter((section) => section.content.trim() || section.id),
    minutes: source.trim() ? Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220)) : 0,
  }
}

export function contentUrl(file, base = import.meta.env?.BASE_URL ?? './') {
  if (!/^\/?content\/[\w./-]+\.md$/.test(file) || file.split('/').includes('..')) {
    throw new Error('Topic files must be Markdown files inside public/content/.')
  }
  return `${base}${file.replace(/^\//, '')}`
}

export async function fetchMarkdown(topic, { signal, fetcher = fetch } = {}) {
  const response = await fetcher(contentUrl(topic.file), { signal })
  if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
    throw new Error(`The notes for ${topic.title} could not be loaded.`)
  }
  const source = await response.text()
  if (/^\s*(<!doctype html|<html[\s>])/i.test(source)) throw new Error('The server returned a page instead of Markdown.')
  return { source, ...analyzeMarkdown(source) }
}

export function jumpToHeading(id) {
  const element = document.getElementById(id)
  if (!element) return
  element.closest('details')?.setAttribute('open', '')
  element.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  element.setAttribute('tabindex', '-1')
  element.focus({ preventScroll: true })
  element.classList.remove('section-flash')
  requestAnimationFrame(() => element.classList.add('section-flash'))
}
