import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import { useRiseVariant } from '../lib/motion'
import logo from '../assets/logo.png'

// Vector human avatar icons representing visitors
const visitorIcons = [
  {
    bg: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/20 dark:text-indigo-300',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    bg: 'bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 dark:text-sky-300',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    bg: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 dark:text-emerald-300',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const item = useRiseVariant()
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const counted = useRef(false)

  useEffect(() => {
    // StrictMode runs effects twice in dev; count once per real page load.
    if (counted.current) return
    counted.current = true

    // Per-browser tally. countapi.xyz shut down, so there is no shared count.
    // Deliberate one-time sync from localStorage (an external system) on
    // mount, guarded above against StrictMode's double-invoke - not the
    // "derived state" case this lint rule is meant to catch, and this
    // decorative footer badge has no perf sensitivity to the extra render.
    try {
      const stored = Number.parseInt(localStorage.getItem('visitor_count') ?? '', 10)
      const next = Number.isFinite(stored) ? stored + 1 : 1
      localStorage.setItem('visitor_count', String(next))
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisitorCount(next)
    } catch {
      // Private browsing can throw on localStorage access.
      setVisitorCount(null)
    }
  }, [])

  const overflowCount = visitorCount !== null ? Math.max(0, visitorCount - visitorIcons.length) : 34

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/50 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/60">
      <Section
        id="footer"
        reveal={false}
        fullBleed
        contentClassName="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10"
        paddingClassName="py-4"
        className="text-slate-900 dark:text-slate-100"
      >
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-between gap-3 md:flex-row"
        >
          {/* Left Side: Logo & Status Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl transition-transform hover:scale-105"
            >
              <img src={logo} alt="Logo" className="h-full w-full object-cover" />
            </a>
          </div>

          {/* Center: Copyright Notice */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-500">
            &copy; 2026 Designed &amp; Built with Precision.
          </p>

          {/* Right Side: Total Visitors Stack */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
              Visitors:
            </span>

            <div className="flex items-center -space-x-2 overflow-hidden p-0.5">
              {visitorIcons.map((avatar, idx) => (
                <div
                  key={idx}
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200/80 ring-2 ring-white transition-transform hover:z-10 hover:scale-110 dark:border-slate-800 dark:ring-slate-950 ${avatar.bg}`}
                >
                  {avatar.icon}
                </div>
              ))}

              <div className="relative z-0 flex h-6 min-w-[2rem] items-center justify-center rounded-full border border-slate-800/20 bg-slate-900 px-2 font-mono text-[11px] font-bold text-sky-400 shadow-md ring-2 ring-white dark:border-slate-700/50 dark:bg-slate-900 dark:ring-slate-950">
                +{overflowCount}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    </footer>
  )
}