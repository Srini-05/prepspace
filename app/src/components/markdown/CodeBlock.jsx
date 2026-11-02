import { useEffect, useRef, useState } from 'react'
import { Check, Copy, AlertCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { toText } from 'hast-util-to-text'

export default function CodeBlock({ children, node }) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)
  const codeNode = node.children.find((child) => child.tagName === 'code')
  const language = codeNode?.properties?.className?.find((name) => name.startsWith('language-'))?.replace('language-', '') || 'text'
  const original = codeNode?.properties?.dataOriginalCode ?? toText(node)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    try { await navigator.clipboard.writeText(original); setStatus('copied') }
    catch { setStatus('error') }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 2600)
  }
  return <div className="code-block"><div className="code-toolbar"><span>{language}</span><button onClick={copy} aria-label={status === 'copied' ? 'Copied!' : 'Copy code'} title="Copy code"><AnimatePresence mode="wait" initial={false}><motion.span key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{status === 'copied' ? <Check size={14} /> : status === 'error' ? <AlertCircle size={14} /> : <Copy size={14} />}</motion.span></AnimatePresence><span aria-live="polite">{status === 'copied' ? 'Copied!' : status === 'error' ? 'Copy failed. Select code to copy.' : 'Copy'}</span></button></div><pre tabIndex={0}>{children}</pre></div>
}