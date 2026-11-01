import { createElement, memo } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Bookmark } from 'lucide-react'
import { toText } from 'hast-util-to-text'
import { useLibrary } from '../../hooks/useLibrary'
import { contentUrl, headingPrefix, jumpToHeading, preserveCode, safePlugins } from '../../utils/markdownUtils'
import CodeBlock from './CodeBlock'

function Heading({ level, id, children, node, topic }) {
  const { bookmarks, toggleBookmark } = useLibrary()
  const title = toText({ ...node, children: node.children.filter((child) => !child.properties?.className?.includes('heading-anchor')) })
  const saved = bookmarks.some((item) => item.topicId === topic.id && item.headingId === id)
  return createElement(`h${level}`, { id, className: 'article-heading' }, children, <button className={`heading-bookmark ${saved ? 'saved' : ''}`} aria-label={`${saved ? 'Remove bookmark' : 'Bookmark'}: ${title}`} aria-pressed={saved} title={saved ? 'Remove bookmark' : 'Bookmark section'} onClick={() => toggleBookmark(topic, { id, title })}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>)
}

function resolveRelative(value, topic) {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return value
  return new URL(value, new URL(contentUrl(topic.file), document.baseURI)).href
}

function findLinkedTopic(href, topic, topics) {
  const topicUrl = new URL(contentUrl(topic.file), document.baseURI)
  const contentRoot = new URL('.', new URL(contentUrl('/content/link-root.md'), document.baseURI))
  const candidates = [new URL(href, topicUrl), new URL(href, contentRoot)]
    .map((url) => { url.hash = ''; return url.href })
  const rootRelativePath = new URL(href, contentRoot).pathname.slice(contentRoot.pathname.length)
  const linkedTopicId = rootRelativePath.split('/')[0]
  return topics.find((item) => candidates.includes(new URL(contentUrl(item.file), document.baseURI).href) || item.id === linkedTopicId)
}

function MarkdownRenderer({ source, topic }) {
  const { topics } = useLibrary()
  const components = {
    pre: CodeBlock,
    table: ({ children }) => <div className="table-scroll" tabIndex={0}><table>{children}</table></div>,
    img: ({ src, alt, title }) => <img src={resolveRelative(src, topic)} alt={alt || ''} title={title} loading="lazy" />,
    a: ({ href = '', children, className, ...props }) => {
      if (href.startsWith('#')) {
        let id
        try { id = decodeURIComponent(href.slice(1)) } catch { id = href.slice(1) }
        const headingId = id.startsWith(headingPrefix) ? id : `${headingPrefix}${id}`
        return <a href={`#/topic/${topic.id}?section=${encodeURIComponent(headingId)}`} className={className} aria-label={props['aria-label']} onClick={(event) => { event.preventDefault(); jumpToHeading(document.getElementById(headingId) ? headingId : `user-content-${id}`) }}>{children}</a>
      }
      const url = resolveRelative(href, topic)
      const target = findLinkedTopic(href, topic, topics)
      if (target) {
        const fragment = url.split('#')[1]
        return <Link to={`/topic/${target.id}${fragment ? `?section=${encodeURIComponent(`${headingPrefix}${decodeURIComponent(fragment)}`)}` : ''}`}>{children}</Link>
      }
      return <a href={url} target={/^https?:/.test(url || '') ? '_blank' : undefined} rel="noopener noreferrer" className={className}>{children}</a>
    },
  }
  for (const level of [1, 2, 3, 4, 5, 6]) components[`h${level}`] = (props) => <Heading {...props} level={level} topic={topic} />
  return <ReactMarkdown remarkPlugins={[remarkGfm, preserveCode]} rehypePlugins={[...safePlugins, [rehypeHighlight, { detect: false }], [rehypeAutolinkHeadings, { behavior: 'prepend', properties: { className: ['heading-anchor'], ariaLabel: 'Link to section' }, content: { type: 'text', value: '#' } }]]} components={components}>{source}</ReactMarkdown>
}

export default memo(MarkdownRenderer)