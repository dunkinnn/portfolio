import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// Floating button that appears once the page has been scrolled down a bit,
// and jumps back to the top of whichever page is currently showing.
// Plain "#top" anchor - browsers scroll to the document top for that
// fragment even with no matching element, so this needs no scroll logic of
// its own and picks up prefers-reduced-motion for free via index.css.
export default function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The footer carries its own "Back to top" link and ends with the wordmark,
  // which this button would otherwise sit on top of. Stand down once the
  // footer is on screen - there is a better control there by then.
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !footerInView

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          // z-30: stays below the mobile nav drawer and its backdrop (z-40/z-50).
          className="fixed bottom-6 right-6 z-30 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg shadow-slate-900/10 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-black/30 dark:hover:border-sky-400/40 dark:hover:text-sky-300 sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
