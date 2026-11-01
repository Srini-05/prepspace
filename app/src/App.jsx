import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { LibraryProvider } from './components/common/LibraryProvider'
import AppLayout from './components/layout/AppLayout'
import HomePage from './components/home/HomePage'
import BookmarksPage from './components/bookmarks/BookmarksPage'
import { EmptyState } from './components/common/Controls'

const MarkdownReader = lazy(() => import('./components/markdown/MarkdownReader'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <HashRouter>
        <LibraryProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="topics" element={<HomePage view="topics" />} />
              <Route path="recent" element={<HomePage view="recent" />} />
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="topic/:topicId" element={<Suspense fallback={<div className="loading-state" role="status">Opening your notes...</div>}><MarkdownReader /></Suspense>} />
              <Route path="*" element={<EmptyState title="Page not found" detail="This address is not in your library." />} />
            </Route>
          </Routes>
        </LibraryProvider>
      </HashRouter>
    </MotionConfig>
  )
}
