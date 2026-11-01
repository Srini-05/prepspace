import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Library, Bookmark, Clock3, ChevronDown, Search, ArrowUpRight, Circle } from 'lucide-react'
import { useLibrary } from '../../hooks/useLibrary'
import { TopicIcon } from '../common/Controls'

export default function Sidebar({ onNavigate }) {
  const { topics, bookmarks } = useLibrary()
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState([])
  const categories = [...new Set(topics.map((topic) => topic.category))]
  const overview = [['/', Home, 'Home'], ['/topics', Library, 'All topics', topics.length], ['/bookmarks', Bookmark, 'Bookmarks', bookmarks.length], ['/recent', Clock3, 'Recently viewed']]
  return <div className="sidebar-inner">
    <div className="workspace-label"><span className="workspace-avatar">P</span><div>Personal workspace<small>Your knowledge, connected</small></div><ChevronDown size={14} /></div>
    <nav aria-label="Main navigation">
      <p className="eyebrow nav-label">Overview</p>
      {overview.map(([to, Icon, title, count]) => <NavLink key={to} to={to} end onClick={onNavigate} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icon size={17} />{title}{count !== undefined && <span className="nav-count">{count}</span>}</NavLink>)}
      <div className="nav-divider" />
      <div className="flex items-center justify-between nav-label"><p className="eyebrow">Your topics</p><span className="muted text-xs">{topics.length}</span></div>
      <label className="sidebar-filter"><Search size={14} /><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter topics..." aria-label="Filter topics" /></label>
      {categories.map((category) => {
        const matches = topics.filter((topic) => topic.category === category && `${topic.title} ${topic.category}`.toLowerCase().includes(filter.toLowerCase()))
        if (!matches.length) return null
        const open = expanded.includes(category)
        return <div className="category-group" key={category}><button className="category-toggle" aria-expanded={open} onClick={() => setExpanded((previous) => open ? previous.filter((item) => item !== category) : [...previous, category])}><ChevronDown size={13} className={open ? '' : 'rotate-closed'} />{category}<span>{matches.length}</span></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">{matches.map((topic) => <NavLink to={`/topic/${topic.id}`} key={topic.id} onClick={onNavigate} className={({ isActive }) => `nav-item topic-nav ${isActive ? 'active' : ''}`}><TopicIcon name={topic.icon} size={16} /><span>{topic.title}</span></NavLink>)}</motion.div>}</AnimatePresence></div>
      })}
      {!topics.length && <div className="sidebar-empty"><span className="sidebar-empty-line" /><p>No topics yet</p></div>}
      {!!topics.length && !topics.some((topic) => `${topic.title} ${topic.category}`.toLowerCase().includes(filter.toLowerCase())) && <p className="sidebar-empty">No matching topics</p>}
    </nav>
    <div className="sidebar-bottom"><div className="workspace-status"><Circle size={7} fill="currentColor" /> Personal library <ArrowUpRight size={14} /></div><p>Your knowledge.<br />Your next breakthrough.</p><span className="version">PREPSPACE <span>v1.0</span></span></div>
  </div>
}
