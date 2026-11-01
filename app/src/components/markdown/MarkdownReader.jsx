import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link, useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock3, Zap, RotateCcw, AlertCircle, FileText } from 'lucide-react'
import { useLibrary } from '../../hooks/useLibrary'
import { EmptyState, TopicIcon } from '../common/Controls'
import { jumpToHeading } from '../../utils/markdownUtils'
import TableOfContents from '../layout/TableOfContents'
import MarkdownRenderer from './MarkdownRenderer'
import '../../styles/markdown.css'

function Article({ topic, data }) {
  const { topics, preferences, setPreferences, markOpened } = useLibrary()
  const { scrollRef } = useOutletContext()
  const [params] = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(data.headings[0]?.id || '')
  const articleRef = useRef(null)
  const recordOpened = useEffectEvent(markOpened)
  const section = params.get('section')
  const topicIndex = topics.findIndex((item) => item.id === topic.id)

  useEffect(() => { recordOpened(topic.id) }, [topic.id])
  useEffect(() => {
    if (section) {
      const timer = setTimeout(() => jumpToHeading(section), 80)
      return () => clearTimeout(timer)
    }
  }, [section, topic.id])

  useEffect(() => {
    const root = scrollRef.current
    const article = articleRef.current
    if (!root || !article) return
    const elements = [...article.querySelectorAll('h1, h2, h3')]
    function update() {
      const bounds = article.getBoundingClientRect()
      const viewport = root.getBoundingClientRect()
      const distance = Math.max(0, bounds.height - root.clientHeight)
      setProgress(distance === 0 ? 100 : Math.min(100, Math.max(0, (viewport.top - bounds.top) / distance * 100)))
      const current = elements.filter((element) => element.getClientRects().length && element.getBoundingClientRect().top <= viewport.top + 110).at(-1)
      if (current) setActive(current.id)
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)
      if (visible[0]) setActive(visible[0].target.id)
    }, { root, rootMargin: '0px 0px -65% 0px', threshold: 0 })
    elements.forEach((element) => observer.observe(element))
    const resize = new ResizeObserver(update)
    resize.observe(article)
    resize.observe(root)
    root.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); resize.disconnect(); root.removeEventListener('scroll', update) }
  }, [scrollRef, topic.id, data])

  return <div className={`reader-page ${preferences.revision ? 'revision-mode' : ''} width-${preferences.width}`} style={{ '--reading-font-size': `${preferences.fontSize}px` }}>
    <div className="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
    <div className="article-column">
      <header className="article-header"><Link className="back-link" to="/topics"><ArrowLeft size={14} /> All topics</Link><div className="article-category"><TopicIcon name={topic.icon} size={19} />{topic.category}</div><h1>{topic.title}</h1><p>{topic.description}</p><div className="article-meta"><span><Clock3 size={14} /> {data.minutes} min read</span><span>{data.headings.length} sections</span><button className={preferences.revision ? 'active' : ''} aria-pressed={preferences.revision} onClick={() => setPreferences((previous) => ({ ...previous, revision: !previous.revision }))}><Zap size={14} /> Quick revision</button></div></header>
      {preferences.revision && <nav className="revision-navigation" aria-label="Quick revision sections">{data.headings.filter((heading) => heading.depth <= 2).map((heading) => <button key={heading.id} onClick={() => jumpToHeading(heading.id)}>{heading.title}</button>)}</nav>}
      <article ref={articleRef} className="markdown-body" aria-label={`${topic.title} notes`}><MarkdownRenderer source={data.source} topic={topic} /></article>
      {!data.source.trim() && <EmptyState icon={FileText} title="No notes in this file yet" detail="This topic is registered, but its Markdown file is empty." />}
      <nav className="topic-navigation" aria-label="Adjacent topics">{topics[topicIndex - 1] ? <Link to={`/topic/${topics[topicIndex - 1].id}`}><ArrowLeft size={17} /><span><small>Previous topic</small>{topics[topicIndex - 1].title}</span></Link> : <span />}{topics[topicIndex + 1] && <Link to={`/topic/${topics[topicIndex + 1].id}`}><span><small>Next topic</small>{topics[topicIndex + 1].title}</span><ArrowRight size={17} /></Link>}</nav>
    </div>
    <TableOfContents headings={data.headings} active={active} progress={progress} />
  </div>
}

export default function MarkdownReader() {
  const { topicId } = useParams()
  const { topics, documents, retryLoad } = useLibrary()
  const topic = topics.find((item) => item.id === topicId)
  const data = documents[topicId]
  if (!topic) return <EmptyState icon={AlertCircle} title="Topic not found" detail="This topic is not registered in your library."><Link to="/topics" className="action-button">Browse topics <ArrowRight size={15} /></Link></EmptyState>
  if (!data) return <div className="loading-state" role="status"><span className="loading-dot" />Opening your notes...</div>
  if (data.status === 'error') return <EmptyState icon={AlertCircle} title="Notes couldn't be loaded" detail={data.error}><button className="action-button" onClick={retryLoad}><RotateCcw size={15} /> Try again</button></EmptyState>
  return <Article key={topic.id} topic={topic} data={data} />
}