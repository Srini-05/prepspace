import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PanelLeft, Search, Moon, Sun, SlidersHorizontal, ChevronRight, Command, Layers } from 'lucide-react'
import { useLibrary } from '../../hooks/useLibrary'
import { IconButton, Modal } from '../common/Controls'
import Sidebar from './Sidebar'
import SiteFooter from './SiteFooter'

const SearchDialog = lazy(() => import('../search/SearchDialog'))

export default function AppLayout() {
  const { topics, preferences, setPreferences, setSearchOpen, searchOpen } = useLibrary()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const mainRef = useRef(null)
  const topic = topics.find((item) => location.pathname === `/topic/${item.id}`)
  const context = topic?.title || ({ '/': 'Home', '/topics': 'All topics', '/bookmarks': 'Bookmarks', '/recent': 'Recently viewed' }[location.pathname] || 'Library')
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
    document.title = `${context} | PrepSpace`
  }, [location.pathname, context])

  return <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); mainRef.current?.focus() }}>Skip to content</a>
    <header className="app-header">
      <Link to="/" className="brand"><span className="brand-icon"><Layers size={21} /></span><span>PrepSpace<span className="brand-dot">.</span></span></Link>
      <div className="header-context"><IconButton label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="desktop-toggle" onClick={() => setCollapsed(!collapsed)}><PanelLeft size={18} /></IconButton><IconButton label="Open navigation" className="mobile-toggle" onClick={() => setMobileOpen(true)}><PanelLeft size={19} /></IconButton><span className="breadcrumb-parent">Workspace</span><ChevronRight size={13} className="breadcrumb-parent" /><span className="current-context">{context}</span></div>
      <button className="header-search" onClick={() => setSearchOpen(true)}><Search size={16} /><span>Search your knowledge...</span><kbd><Command size={11} /> K</kbd></button>
      <div className="header-actions"><IconButton label="Search" className="mobile-search" onClick={() => setSearchOpen(true)}><Search size={19} /></IconButton><IconButton label={`Switch to ${preferences.theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setPreferences((previous) => ({ ...previous, theme: previous.theme === 'dark' ? 'light' : 'dark' }))}>{preferences.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</IconButton><IconButton label="Reading settings" onClick={() => setSettingsOpen(true)}><SlidersHorizontal size={18} /></IconButton><span className="profile-avatar" title="Personal workspace">P</span></div>
    </header>
    <aside className="desktop-sidebar" inert={collapsed}><Sidebar /></aside>
    <main id="main-content" tabIndex={-1} ref={mainRef} className="main-scroll">
      <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="page"><div className="page-content"><Outlet context={{ scrollRef: mainRef }} /></div><SiteFooter /></motion.div></AnimatePresence>
    </main>
    <AnimatePresence>{mobileOpen && <Modal title="Workspace" className="mobile-drawer" onClose={() => setMobileOpen(false)}><Sidebar onNavigate={() => setMobileOpen(false)} /></Modal>}</AnimatePresence>
    {settingsOpen && <Modal title="Reading settings" onClose={() => setSettingsOpen(false)}><div className="settings-fields"><label>Text size <span>{preferences.fontSize}px</span><input type="range" min="15" max="21" step="2" value={preferences.fontSize} onChange={(event) => setPreferences((previous) => ({ ...previous, fontSize: Number(event.target.value) }))} /></label><label>Reading width<select value={preferences.width} onChange={(event) => setPreferences((previous) => ({ ...previous, width: event.target.value }))}><option value="standard">Standard</option><option value="wide">Wide</option></select></label><label className="toggle-row">Quick revision<input type="checkbox" role="switch" checked={preferences.revision} onChange={(event) => setPreferences((previous) => ({ ...previous, revision: event.target.checked }))} /></label></div></Modal>}
    <AnimatePresence>{searchOpen && <Suspense fallback={null}><SearchDialog onClose={() => setSearchOpen(false)} /></Suspense>}</AnimatePresence>
  </div>
}