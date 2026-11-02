import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { projects } from '../../config/projects'

export default function SiteFooter() {
  return <footer className="site-footer" role="contentinfo" aria-label="Site footer">
    <div className="footer-content">
      <div className="footer-identity"><p className="footer-brand">PrepSpace<span>.</span></p><p>Your space. Your pace.<br />Your next breakthrough.</p></div>
      <nav className="footer-links" aria-label="Explore PrepSpace"><h2>Explore</h2><Link to="/">Overview</Link><Link to="/topics">Browse topics</Link><Link to="/bookmarks">Saved bookmarks</Link><Link to="/recent">Reading history</Link></nav>
      <nav className="footer-links" aria-label="Srinivasan's projects"><h2>More projects</h2>{projects.map((project) => <a key={project.url} href={project.url} target="_blank" rel="noopener noreferrer">{project.title}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</nav>
      <nav className="footer-links" aria-label="GitHub resources"><h2>Connect</h2><a href="https://github.com/Srini-05" target="_blank" rel="noopener noreferrer">GitHub profile<ArrowUpRight size={13} aria-hidden="true" /></a><a href="https://github.com/Srini-05/prepspace" target="_blank" rel="noopener noreferrer">Source code<ArrowUpRight size={13} aria-hidden="true" /></a><a href="https://github.com/Srini-05/prepspace/issues" target="_blank" rel="noopener noreferrer">Report an issue<ArrowUpRight size={13} aria-hidden="true" /></a></nav>
    </div>
    <div className="footer-bottom"><span>Copyright {new Date().getFullYear()} Srinivasan</span><p>Made with love from <a href="https://github.com/Srini-05" target="_blank" rel="noopener noreferrer">Srinivasan</a><Heart size={14} aria-hidden="true" /></p></div>
  </footer>
}