import { useEffect, useState } from 'react'
import { topics } from '../../config/topics'
import { LibraryContext } from '../../hooks/useLibrary'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const validBookmarks = (value) => Array.isArray(value) && value.every((item) => item && ['topicId', 'headingId', 'title', 'file'].every((key) => typeof item[key] === 'string'))
const validRecent = (value) => Array.isArray(value) && value.every((item) => item && typeof item.id === 'string' && Number.isFinite(item.openedAt))
const validPreferences = (value) => value && ['dark', 'light'].includes(value.theme) && [15, 17, 19, 21].includes(value.fontSize) && ['standard', 'wide'].includes(value.width) && typeof value.revision === 'boolean'

export function LibraryProvider({ children }) {
  const [documents, setDocuments] = useState({})
  const [retry, setRetry] = useState(0)
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [], validBookmarks)
  const [recent, setRecent] = useLocalStorage('recent', [], validRecent)
  const [preferences, setPreferences] = useLocalStorage('preferences', { theme: 'dark', fontSize: 17, width: 'standard', revision: false }, validPreferences)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme
    document.documentElement.style.colorScheme = preferences.theme
  }, [preferences.theme])

  useEffect(() => {
    const controller = new AbortController()
    topics.forEach(async (topic) => {
      try {
        const { fetchMarkdown } = await import('../../utils/markdownUtils')
        const document = await fetchMarkdown(topic, { signal: controller.signal })
        if (!controller.signal.aborted) setDocuments((previous) => ({ ...previous, [topic.id]: { ...document, status: 'ready' } }))
      } catch (error) {
        if (!controller.signal.aborted) setDocuments((previous) => ({ ...previous, [topic.id]: { status: 'error', error: error.message } }))
      }
    })
    return () => controller.abort()
  }, [retry])

  useEffect(() => {
    function onKey(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((previous) => !previous)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function toggleBookmark(topic, heading) {
    setBookmarks((previous) => previous.some((item) => item.topicId === topic.id && item.headingId === heading.id)
      ? previous.filter((item) => item.topicId !== topic.id || item.headingId !== heading.id)
      : [...previous, { topicId: topic.id, headingId: heading.id, title: heading.title, file: topic.file }])
  }

  function markOpened(id) {
    setRecent((previous) => [{ id, openedAt: Date.now() }, ...previous.filter((item) => item.id !== id)].slice(0, 10))
  }

  return <LibraryContext.Provider value={{ topics, documents, bookmarks, setBookmarks, recent: recent.filter((item) => topics.some((topic) => topic.id === item.id)), markOpened, toggleBookmark, preferences, setPreferences, searchOpen, setSearchOpen, retryLoad: () => { setDocuments({}); setRetry((value) => value + 1) } }}>{children}</LibraryContext.Provider>
}
