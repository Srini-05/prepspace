import { useEffect, useRef } from 'react'
import { BookOpen, Code2, Layers, Database, Network, Shield, Cloud, Terminal, BrainCircuit, Library, X } from 'lucide-react'
import { motion } from 'framer-motion'

const icons = { BookOpen, Code2, Layers, Database, Network, Shield, Cloud, Terminal, BrainCircuit, Library }

export function TopicIcon({ name, ...props }) {
  const Icon = icons[name] || BookOpen
  return <Icon size={20} strokeWidth={1.6} {...props} />
}

export function IconButton({ label, children, className = '', ...props }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} {...props}>{children}</button>
}

export function EmptyState({ title, detail, icon: Icon = Library, children }) {
  return <div className="empty-state"><span className="empty-icon"><Icon size={28} strokeWidth={1.2} /></span><h3>{title}</h3>{detail && <p>{detail}</p>}{children}</div>
}

export function Modal({ title, onClose, children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    dialog.showModal()
    return () => { dialog.close(); previous?.focus() }
  }, [])
  return <motion.dialog ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`modal ${className}`} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <motion.div initial={{ opacity: 0, y: className.includes('mobile-drawer') ? 0 : 8, x: className.includes('mobile-drawer') ? -30 : 0 }} animate={{ opacity: 1, y: 0, x: 0 }} className="modal-body">
      <div className="modal-heading"><h2>{title}</h2><IconButton label="Close dialog" onClick={onClose}><X size={18} /></IconButton></div>
      {children}
    </motion.div>
  </motion.dialog>
}