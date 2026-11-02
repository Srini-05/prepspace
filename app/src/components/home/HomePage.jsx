import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Search, Command, Library, Bookmark, Folder, Clock3, BookOpen, ScrollText, Radar, Radio } from 'lucide-react'
import { useLibrary } from '../../hooks/useLibrary'
import { EmptyState, TopicIcon } from '../common/Controls'
import { projects } from '../../config/projects'

const projectIcons = { ScrollText, Radar, Radio }

function TopicCard({ topic, index }) {
  const { documents } = useLibrary()
  const document = documents[topic.id]
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.035, 0.2) }} whileHover={{ y: -3 }} className={`topic-card accent-${index % 3}`}><Link to={`/topic/${topic.id}`}><div className="topic-card-top"><span className="topic-icon"><TopicIcon name={topic.icon} /></span><ArrowUpRight size={17} /></div><span className="topic-category">{topic.category}</span><h3>{topic.title}</h3><p>{topic.description}</p><div className="topic-card-footer"><Clock3 size={13} /><span>{document?.status === 'ready' ? `${document.minutes} min read` : document?.status === 'error' ? 'Unavailable' : 'Loading notes...'}</span><span className="card-open">Open topic <ArrowRight size={13} /></span></div></Link></motion.div>
}

export default function HomePage({ view = 'home' }) {
  const { topics, bookmarks, recent, setSearchOpen } = useLibrary()
  const [category, setCategory] = useState('All topics')
  const [filter, setFilter] = useState('')
  const categories = [...new Set(topics.map((topic) => topic.category))]
  const recentTopics = recent.map((item) => ({ ...topics.find((topic) => topic.id === item.id), openedAt: item.openedAt }))
  const lastTopic = recentTopics[0]
  const displayed = (view === 'recent' ? recentTopics : topics).filter((topic) => (category === 'All topics' || topic.category === category) && `${topic.title} ${topic.description}`.toLowerCase().includes(filter.toLowerCase()))
  return <div className="home-page">
    {view === 'home' ? <>
      <section className="home-hero">
        <div className="hero-text"><p className="eyebrow hero-eyebrow"><span /> A little more prepared, every day</p><h1>Your next interview<br />starts <span>here.</span></h1><p className="hero-description">Everything you've learned, organized and ready<br className="desktop-break" /> when you need it.</p><button className="hero-search" onClick={() => setSearchOpen(true)}><Search size={18} /><span>What do you want to explore?</span><kbd><Command size={12} /> K</kbd></button><a className="explore-link" href="#library" onClick={(event) => { event.preventDefault(); document.getElementById('library')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>Explore topics <ArrowRight size={15} /></a></div>
        <div className="hero-caption"><span className="caption-line" /> YOUR NEXT CHAPTER</div>
      </section>
      <section className="library-stats" aria-label="Library statistics">{[[Library, topics.length, 'Topics in your library'], [Folder, categories.length, 'Knowledge categories'], [Bookmark, bookmarks.length, 'Saved sections'], [Clock3, recent.length, 'Recently opened']].map(([Icon, count, label]) => <div key={label} className="stat"><div><Icon size={16} /><span>{label}</span></div><strong>{String(count).padStart(2, '0')}</strong></div>)}</section>
      {lastTopic && <section className="continue-section"><div className="section-heading"><h2>Pick up where you left off</h2><span className="eyebrow">Continue learning</span></div><Link to={`/topic/${lastTopic.id}`} className="continue-row"><span className="topic-icon"><TopicIcon name={lastTopic.icon} /></span><div><h3>{lastTopic.title}</h3><p>{lastTopic.description}</p><small>Opened {new Date(lastTopic.openedAt).toLocaleString()}</small></div><span className="continue-action">Continue reading <ArrowRight size={17} /></span></Link></section>}
    </> : <header className="collection-heading"><p className="eyebrow">Your workspace</p><h1>{view === 'recent' ? 'Recently viewed' : 'Your knowledge library'}</h1><p>{view === 'recent' ? 'Right where you left things.' : 'One place for everything worth knowing.'}</p></header>}
    <section id="library" className="library-section">
      <div className="section-heading"><div className="flex items-center gap-3"><h2>{view === 'recent' ? 'Recent topics' : 'Explore your library'}</h2><span className="count-badge">{displayed.length}</span></div>{view === 'home' && <Link to="/topics" className="text-link">View all topics <ArrowUpRight size={14} /></Link>}</div>
      <div className="library-toolbar"><div className="category-filters" aria-label="Category filters">{['All topics', ...categories].map((item) => <button key={item} aria-pressed={category === item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="library-filter"><Search size={15} /><input placeholder="Find a topic..." aria-label="Find a topic" value={filter} onChange={(event) => setFilter(event.target.value)} /></label></div>
      {displayed.length ? <div className="topic-grid">{displayed.map((topic, index) => <TopicCard key={topic.id} topic={topic} index={index} />)}</div> : <div className="library-empty"><span className="empty-corner top-left" /><span className="empty-corner bottom-right" /><EmptyState icon={BookOpen} title={topics.length ? view === 'recent' ? 'A fresh start' : 'No matching topics' : 'Your next chapter is unwritten'} detail={topics.length ? view === 'recent' ? 'No topics opened yet.' : 'Try a different title or category.' : 'No topics in your library yet.'} /><span className="empty-footnote">{topics.length ? 'YOUR PERSONAL KNOWLEDGE LIBRARY' : '0 TOPICS · ENDLESS POSSIBILITIES'}</span></div>}
    </section>
    {view === 'home' && recentTopics.length > 0 && <section className="recent-section"><div className="section-heading"><h2>Recently viewed</h2><Link to="/recent" className="text-link">View history <ArrowUpRight size={14} /></Link></div>{recentTopics.slice(0, 3).map((topic) => <Link className="recent-row" to={`/topic/${topic.id}`} key={topic.id}><TopicIcon name={topic.icon} size={17} /><span>{topic.title}</span><small>{new Date(topic.openedAt).toLocaleDateString()}</small><ArrowUpRight size={15} /></Link>)}</section>}
    {view === 'home' && <section className="creator-projects" aria-labelledby="creator-projects-heading"><div className="section-heading"><h2 id="creator-projects-heading">More by Srinivasan</h2><a className="text-link" href="https://github.com/Srini-05" target="_blank" rel="noopener noreferrer">Explore GitHub<ArrowUpRight size={14} aria-hidden="true" /></a></div><div className="creator-project-grid">{projects.map((project) => {
      const Icon = projectIcons[project.icon]
      return <article className="creator-project" key={project.url}><Icon size={22} aria-hidden="true" /><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} project`}>View project<ArrowUpRight size={15} aria-hidden="true" /></a></article>
    })}</div></section>}
  </div>
}