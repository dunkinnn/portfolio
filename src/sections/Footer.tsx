import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Eye } from 'lucide-react'
import Wordmark from '../components/Wordmark'
import { useRiseVariant } from '../lib/motion'
import { projects } from '../data/projects'
import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  LOCATION,
  REAL_EMAIL,
  WHATSAPP_URL,
} from '../data/contact'

const sitemap = [
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
]

const elsewhere = [
  { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { label: 'Facebook', href: FACEBOOK_URL, external: true },
  { label: 'WhatsApp', href: WHATSAPP_URL, external: true },
  { label: 'Email', href: `mailto:${REAL_EMAIL}` },
]

// Deep links to the case studies. A cover image is what separates a real
// project from the "coming soon" placeholder, so it doubles as the filter.
const selectedWork = projects
  .filter((project) => project.imageUrl)
  .slice(0, 4)
  .map((project) => ({
    label: project.shortTitle ?? project.title,
    href: project.href,
  }))

const YEAR = 2026
const VIEWS_KEY = 'visitor_count'

// Module scope, not a ref: the footer renders on every route, so it remounts
// on each client-side navigation. A per-mount guard would count a new visit
// every time someone moved between pages.
let counted = false

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-eyebrow-sm text-slate-400 dark:text-slate-600">{children}</h2>
}

function FooterLink({
  href,
  label,
  external,
}: {
  href: string
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className="group inline-flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
    >
      {label}
      {external && (
        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
      )}
    </a>
  )
}

/**
 * Reads the tally, and bumps it once per page load.
 *
 * NOTE: this lives in the visitor's own localStorage, so it counts this
 * browser's visits rather than the site's audience - every visitor sees their
 * own number, starting at 1. A shared count needs a store behind an API route,
 * which this project does not have yet.
 *
 * Runs as a lazy `useState` initialiser rather than in an effect: the value is
 * read once at mount and never changes afterwards, so an effect would only add
 * a second render. The module-level guard covers StrictMode's double-invoke.
 */
function readVisitCount(): number | null {
  try {
    const stored = Number.parseInt(localStorage.getItem(VIEWS_KEY) ?? '', 10)
    if (counted) return Number.isFinite(stored) ? stored : null

    counted = true
    const next = Number.isFinite(stored) ? stored + 1 : 1
    localStorage.setItem(VIEWS_KEY, String(next))
    return next
  } catch {
    // Private browsing can throw on localStorage access.
    return null
  }
}

export default function Footer() {
  const item = useRiseVariant()
  const [views] = useState(readVisitCount)

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/50 antialiased backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/60">
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-7xl px-6 pb-8 pt-14 sm:px-8 md:pt-16 lg:px-12"
      >
        {/* ================= TOP BAND =================
            Identity on the left, three link columns filling the rest of the
            row. Below lg the columns drop under the brand block and share a
            row of their own. */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          {/* ---------- LEFT: who and where ---------- */}
          <div className="col-span-2 max-w-sm sm:col-span-3 lg:col-span-1 lg:max-w-none">
            <a href="/#hero" className="group inline-flex" aria-label="Home">
              <Wordmark className="text-3xl text-slate-900 sm:text-4xl dark:text-white" />
            </a>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Full-Stack Developer, UI/UX Designer and SEO Specialist, building
              web platforms and mobile apps from {LOCATION}.
            </p>

            <a
              href={`mailto:${REAL_EMAIL}`}
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 [overflow-wrap:anywhere] transition-colors hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
            >
              {REAL_EMAIL}
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="mt-5 flex w-fit items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/70 py-1.5 pl-3 pr-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-eyebrow-sm text-slate-700 dark:text-slate-300">
                Available for work
              </span>
            </div>
          </div>

          {/* ---------- RIGHT: the link columns ---------- */}
          <div>
            <ColumnHeading>Selected work</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {selectedWork.map((link) => (
                <li key={link.href}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Sitemap</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {sitemap.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Elsewhere</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            &copy; {YEAR} Angelou Bulauan. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {views !== null && (
              <span
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
                title="Visits recorded in this browser"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                {views.toLocaleString()} {views === 1 ? 'visit' : 'visits'}
              </span>
            )}

            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-eyebrow-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
