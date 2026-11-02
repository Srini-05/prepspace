import { Fragment, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { ArrowDown, ArrowUp, CornerDownLeft, FileText, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLibrary } from '../../hooks/useLibrary'
import { EmptyState, Modal, TopicIcon } from '../common/Controls'
import '../../styles/search.css'

function Highlight({ text, query }) {
  if (!query.trim()) return text
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.split(new RegExp(`(${escaped})`, 'ig')).map((part, index) => part.toLowerCase() === query.trim().toLowerCase() ? <mark key={index}>{part}</mark> : part)
}

export default function SearchDialog({ onClose }) {
  const { topics, documents } = useLibrary()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const deferredQuery = useDeferredValue(query)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const entries = useMemo(() => topics.flatMap((topic) => [
    { topic, id: '', title: topic.title, content: topic.description },
    ...(documents[topic.id]?.sections || []).map((section) => ({ topic, ...section })),
  ]), [topics, documents])
  const index = useMemo(() => new Fuse(entries, { keys: [{ name: 'title', weight: 3 }, { name: 'topic.title', weight: 2 }, 'topic.description', 'topic.category', 'content'], threshold: 0.35, ignoreLocation: true, includeMatches: true }), [entries])
  const found = deferredQuery.trim() ? index.search(deferredQuery.trim()).slice(0, 40).map(({ item, matches }) => ({ ...item, matches })) : entries.filter((entry) => !entry.id).slice(0, 12)
  const topicOrder = [...new Set(found.map((result) => result.topic.id))]
  const results = topicOrder.flatMap((id) => found.filter((result) => result.topic.id === id))
  const selectedIndex = Math.min(selected, Math.max(0, results.length - 1))
  const failed = topics.filter((topic) => documents[topic.id]?.status === 'error').length
  const loading = topics.some((topic) => !documents[topic.id])

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { document.getElementById(`search-option-${selectedIndex}`)?.scrollIntoView({ block: 'nearest' }) }, [selectedIndex])

  function open(result) {
    if (!result) return
    navigate(`/topic/${result.topic.id}${result.id ? `?section=${encodeURIComponent(result.id)}` : ''}`)
    onClose()
  }
  function onKey(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((previous) => Math.max(0, Math.min(results.length - 1, previous + (event.key === 'ArrowDown' ? 1 : -1))))
    }
    if (event.key === 'Enter') { event.preventDefault(); open(results[selectedIndex]) }
  }

  return <Modal title="Search your knowledge" onClose={onClose} className="search-dialog">
    <div className="search-input-row"><Search size={20} /><input ref={inputRef} role="combobox" aria-label="Search topics and notes" aria-autocomplete="list" aria-expanded="true" aria-controls="search-results" aria-activedescendant={results.length ? `search-option-${selectedIndex}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0) }} onKeyDown={onKey} placeholder="Search topics, questions, or a line of code..." autoComplete="off" /></div>
    <div className="search-results" role="listbox" id="search-results" aria-label="Search results" aria-busy={loading || query !== deferredQuery}>
      {results.map((result, resultIndex) => {
        const contentMatch = result.matches?.find((match) => match.key === 'content')
        const start = Math.max(0, (contentMatch?.indices[0]?.[0] || 0) - 45)
        const snippet = `${start ? '...' : ''}${result.content.slice(start, start + 155)}`
        return <Fragment key={`${result.topic.id}:${result.id}`}>
          {results[resultIndex - 1]?.topic.id !== result.topic.id && <div className="search-group"><TopicIcon name={result.topic.icon} size={13} />{result.topic.title}<span>{result.topic.category}</span></div>}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(resultIndex * 0.015, 0.1) }}><button role="option" id={`search-option-${resultIndex}`} aria-selected={selectedIndex === resultIndex} tabIndex={-1} className="search-result" onMouseMove={() => setSelected(resultIndex)} onClick={() => open(result)}><FileText size={17} /><span><strong><Highlight text={result.title} query={deferredQuery} /></strong><small><Highlight text={snippet} query={deferredQuery} /></small></span><CornerDownLeft size={15} /></button></motion.div>
        </Fragment>
      })}
    </div>
    {!results.length && <EmptyState icon={Search} title={!topics.length ? 'A fresh page awaits' : loading ? 'Indexing your notes...' : 'No matches found'} detail={!topics.length ? 'No topics in your library yet.' : loading ? undefined : 'Try a different term or topic.'} />}
    {!!failed && <p className="search-notice" role="status">{failed} topic {failed === 1 ? 'file is' : 'files are'} unavailable. Results include titles only for those topics.</p>}
    <div className="search-footer"><span><kbd><ArrowUp size={10} /><ArrowDown size={10} /></kbd> Navigate</span><span><kbd><CornerDownLeft size={10} /></kbd> Open</span><span><kbd>esc</kbd> Close</span><small>{results.length} results</small></div>
  </Modal>
}
