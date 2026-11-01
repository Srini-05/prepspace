import { List, ChevronDown } from 'lucide-react'
import { jumpToHeading } from '../../utils/markdownUtils'

export default function TableOfContents({ headings, active, progress }) {
  const outline = headings.filter((heading) => heading.depth <= 3)
  const links = <nav aria-label="On this page">{outline.map((heading) => <button key={heading.id} className={active === heading.id ? 'active' : ''} style={{ paddingLeft: `${(heading.depth - 1) * 11 + 12}px` }} aria-current={active === heading.id ? 'location' : undefined} onClick={() => jumpToHeading(heading.id)}>{heading.title}</button>)}{!outline.length && <p className="muted text-xs">No sections in this document.</p>}</nav>
  return <aside className="toc"><div className="desktop-toc"><div className="toc-label"><List size={14} /><span>ON THIS PAGE</span></div>{links}<div className="toc-progress"><span>Reading progress</span><strong>{Math.round(progress)}%</strong><div><span style={{ width: `${progress}%` }} /></div></div></div><details className="mobile-toc"><summary><List size={15} /> On this page <ChevronDown size={15} /></summary>{links}</details></aside>
}