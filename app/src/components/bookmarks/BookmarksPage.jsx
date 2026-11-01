import { Link } from 'react-router-dom'
import { Bookmark, ArrowUpRight, Trash2 } from 'lucide-react'
import { useLibrary } from '../../hooks/useLibrary'
import { EmptyState, IconButton } from '../common/Controls'

export default function BookmarksPage() {
  const { bookmarks, setBookmarks, topics } = useLibrary()
  return <div className="home-page"><header className="collection-heading"><p className="eyebrow">Your workspace</p><h1>Worth coming back to.</h1><p>Your bookmarked sections, all in one place.</p></header><div className="section-heading"><h2>Saved sections</h2><span className="count-badge">{bookmarks.length}</span></div>{bookmarks.length ? <div className="bookmark-list">{bookmarks.map((bookmark) => <div className="bookmark-row" key={`${bookmark.topicId}:${bookmark.headingId}`}><Bookmark size={18} /><Link to={`/topic/${bookmark.topicId}?section=${encodeURIComponent(bookmark.headingId)}`}><h3>{bookmark.title}</h3><p>{topics.find((topic) => topic.id === bookmark.topicId)?.title || 'Unavailable topic'}</p></Link><ArrowUpRight size={16} /><IconButton label={`Remove bookmark: ${bookmark.title}`} onClick={() => setBookmarks((previous) => previous.filter((item) => item.topicId !== bookmark.topicId || item.headingId !== bookmark.headingId))}><Trash2 size={17} /></IconButton></div>)}</div> : <EmptyState icon={Bookmark} title="Nothing saved. Yet." detail="Your bookmarked sections will be here." />}</div>
}
