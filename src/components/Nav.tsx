import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
// Imported rather than referenced as "/logo.png" so Vite fingerprints and
// bundles it; files under src/assets are not served from the site root.
import logoUrl from '../assets/logo.png'
import { useActiveSection } from '../lib/useActiveSection'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
]

// Module-level so the array identity is stable across renders.
const sectionIds = links.map((link) => link.href.slice(1))

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)

  // Tighten the nav shell once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the panel, and a resize past the lg breakpoint makes it
  // redundant since the inline links come back.
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const wide = window.matchMedia('(min-width: 1024px)')
    const onWide = () => wide.matches && setOpen(false)

    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  // The drawer sits above the page content, so stop the page scrolling
  // underneath it while it's open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    // Fixed and flush to the viewport edge - a full-width bar rather than a
    // floating pill, so it reads as a classic sticky nav.
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      <header
        className={`w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          scrolled
            ? 'border-slate-200 bg-white/90 shadow-md shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0F172A]/95 dark:shadow-2xl dark:shadow-black/40'
            : 'border-slate-200/60 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur-md dark:border-slate-800/60 dark:bg-[#0F172A]/70 dark:shadow-black/10'
        }`}
      >
        {/* Content stays inside the same column the rest of the page uses,
            even though the bar's background now spans edge to edge. */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-8 lg:px-10">
          {/* Brand mark */}
          <a href="#hero" className="group flex items-center" aria-label="Home">
            <img
              src={logoUrl}
              alt="Home"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-10 text-sm font-medium text-slate-500 lg:flex lg:gap-14 dark:text-slate-400">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1)

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative py-1 transition-colors duration-200 hover:text-slate-900 dark:hover:text-white ${
                    isActive ? 'text-slate-900 dark:text-white' : ''
                  }`}
                >
                  {link.label}
                  {/* Underline wipes in on hover/focus, and stays put for the active section */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-[#2340FF] to-cyan-400 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          {/* Theme switch, CTA and the small-screen menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden rounded-full bg-[#2340FF] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2340FF]/25 transition duration-300 hover:bg-[#1f37e0] hover:shadow-[#2340FF]/40 hover:scale-[1.02] active:scale-[0.98] sm:block"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition duration-300 hover:border-slate-300 hover:text-slate-900 lg:hidden dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
            >
              {/* Two bars that cross into an X; explicit transforms so the
                  open and closed states cannot fight over --tw-translate-y. */}
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span
                  className={`absolute inset-x-0 top-1/2 h-px bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    open ? '[transform:rotate(45deg)]' : '[transform:translateY(-4px)]'
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-px bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    open ? '[transform:rotate(-45deg)]' : '[transform:translateY(4px)]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Small-screen drawer, slides in from the right over a backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />

            <motion.nav
              id="mobile-nav"
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[82vw] max-w-xs flex-col border-l border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 lg:hidden dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-black/40"
            >
              <div className="flex items-center justify-between">
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition duration-300 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-4 dark:border-slate-800">
                {links.map((link) => {
                  const isActive = activeSection === link.href.slice(1)

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-slate-100 text-slate-900 dark:bg-slate-800/60 dark:text-white'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 block rounded-xl bg-[#2340FF] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1f37e0]"
              >
                Contact
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}