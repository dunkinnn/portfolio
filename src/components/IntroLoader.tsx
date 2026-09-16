import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WORDMARK_CLASS, WORDMARK_LETTERS } from '../lib/wordmark'

interface IntroLoaderProps {
  onComplete?: () => void
}

const SHOWN_KEY = 'intro_shown'

// sessionStorage persists per-tab for the browser session, so this plays
// once when a tab first opens the site and is skipped on every navigation
// or refresh within that same tab after that.
function hasShownThisTab() {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === '1'
  } catch {
    // Private browsing can throw on sessionStorage access.
    return false
  }
}

function markShownThisTab() {
  try {
    sessionStorage.setItem(SHOWN_KEY, '1')
  } catch {
    // Private browsing can throw on sessionStorage access.
  }
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stage, setStage] = useState<'pulse' | 'revealLogo' | 'sliding' | 'done'>(() =>
    hasShownThisTab() ? 'done' : 'pulse',
  )
  const hasTriggeredComplete = useRef(stage === 'done')

  useEffect(() => {
    // Already shown this tab - skip the animation and signal ready right away.
    if (stage === 'done') {
      onComplete?.()
      return
    }

    const timer1 = setTimeout(() => {
      setStage('revealLogo')
    }, 1200)

    const timer2 = setTimeout(() => {
      setStage('sliding')
    }, 3200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="intro-loader"
          initial={{ y: '0%' }}
          animate={stage === 'sliding' ? { y: '-100%' } : { y: '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onUpdate={(latest) => {
            // Check if y reached or passed -70% during slide-up
            if (stage === 'sliding' && !hasTriggeredComplete.current) {
              const currentY = typeof latest.y === 'string' ? parseFloat(latest.y) : 0
              if (currentY <= -70) {
                hasTriggeredComplete.current = true
                markShownThisTab()
                if (onComplete) onComplete()
              }
            }
          }}
          onAnimationComplete={() => {
            if (stage === 'sliding') {
              setStage('done')
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950 text-white selection:bg-none pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            {stage === 'pulse' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0, transition: { duration: 0.3 } }}
                className="relative flex h-20 w-20 items-center justify-center"
              >
                <motion.span
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full border-2 border-sky-400/60"
                />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400 border-r-indigo-500"
                />
                <div className="h-6 w-6 rounded-full bg-white" />
              </motion.div>
            )}

            {(stage === 'revealLogo' || stage === 'sliding') && (
              <div className="flex flex-col items-center gap-5">
                {/* Same negative margin as the Wordmark component: tracking is
                    added after the last letter too, and it would otherwise
                    push the block off centre. */}
                <div
                  aria-label="Gelou"
                  className={`${WORDMARK_CLASS} flex text-3xl sm:text-5xl`}
                >
                  {WORDMARK_LETTERS.map((letter, i) => (
                    <motion.span
                      key={letter}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px w-44 origin-center bg-white/25 sm:w-64"
                />

                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="text-eyebrow-sm text-white/45"
                >
                  Full-Stack Developer
                </motion.span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}