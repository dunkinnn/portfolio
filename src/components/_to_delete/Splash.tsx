import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A role, not a name - a name alone doesn't tell a visitor what you can
// build for them; this does. Matches the "full-stack developer and UI/UX
// designer" line from About, trimmed to fit comfortably on one line even
// on narrow phones.
const TAGLINE = 'Full-Stack Developer'
const LOGO_SLIDE_S = 0.7 // logo draw-in + slide-into-place duration
const TYPE_GAP_S = 0.15 // pause between the logo settling and typing starting
const TYPE_DELAY_S = LOGO_SLIDE_S + TYPE_GAP_S
const TYPE_DURATION_S = TAGLINE.length * 0.06 // scales automatically if the copy changes
const HOLD_MS = 2300 // total time up before the fade-out starts

// First-load intro, gated to once per browser session via sessionStorage so
// refreshing or navigating between /skills, /project, etc. within the same
// visit does not replay it. Skipped entirely under prefers-reduced-motion.
// Reuses the monogram path from components/Logo.tsx as a line-draw animation
// (Logo itself renders a static <path>, not a motion one, so this draws the
// same path directly rather than trying to animate through that component).
// Sequence: the logo draws in while sliding into place from the left, then
// the tagline types itself out beside it with a blinking caret.
export default function Splash() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return sessionStorage.getItem('splash_shown') !== '1'
    } catch {
      // Private browsing can throw on sessionStorage access.
      return false
    }
  })

  // Lock page scroll while the splash covers the screen.
  useEffect(() => {
    if (!visible) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [visible])

  // Auto-dismiss, marking the session so it doesn't replay on this visit.
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      setVisible(false)
      try {
        sessionStorage.setItem('splash_shown', '1')
      } catch {
        // Private browsing can throw on sessionStorage access.
      }
    }, HOLD_MS)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] grid place-items-center bg-white dark:bg-slate-950"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-3 px-6 text-center sm:flex-row sm:gap-4 sm:text-left">
            <motion.svg
              viewBox="0 0 200 160"
              className="h-12 w-12 shrink-0 text-slate-900 sm:h-14 sm:w-14 dark:text-white"
              fill="none"
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: LOGO_SLIDE_S, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.path
                d="M 40 130 C 25 130 15 115 25 95 C 40 65 80 20 130 20 C 175 20 185 50 150 80 C 120 105 70 120 40 120 C 25 120 20 105 35 90 C 50 75 80 60 110 50 M 110 50 C 130 45 155 45 160 55 C 168 70 145 95 120 115 C 100 130 95 135 115 135 C 135 135 150 120 155 110"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: LOGO_SLIDE_S, ease: [0.65, 0, 0.35, 1] }}
              />
            </motion.svg>

            <span
              className="inline-block max-w-full overflow-hidden border-r-2 border-slate-900 pr-1 align-bottom text-xl font-semibold whitespace-nowrap text-slate-900 sm:text-2xl md:text-3xl dark:border-white dark:text-white"
              style={{
                width: 0,
                animation: `typing ${TYPE_DURATION_S}s steps(${TAGLINE.length}, end) ${TYPE_DELAY_S}s forwards, caret-blink 0.8s step-end ${TYPE_DELAY_S}s infinite`,
              }}
            >
              {TAGLINE}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
