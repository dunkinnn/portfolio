import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, Layers } from 'lucide-react'
import { skillGroups, SkillPill } from '../data/skills'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { EASE } from '../lib/motion'

// The compact view the icon toggle switches to - a quick static glance,
// not the exhaustive list (that's what "View all" -> #/skills is for).
// Swap which three by editing this array.
const FEATURED_GROUPS = ['Frontend', 'Backend & Database', 'Design & Prototyping']
const compactGroups = skillGroups.filter((group) => FEATURED_GROUPS.includes(group.title))

// Every skill is in the ticker, but spread across 3 rows rather than one
// row per category (7 rows was too tall) - round-robin distribution rather
// than grouped, so all 3 rows end up roughly the same length.
const allTech = skillGroups.flatMap((group) => group.items)
const tickerRows: (typeof allTech)[] = [[], [], []]
allTech.forEach((tech, i) => tickerRows[i % 3].push(tech))

export default function Skills() {
  const [compact, setCompact] = useState(false)

  return (
    <Section
      id="skills"
      reveal={false}
      fullBleed
      paddingClassName="py-6 md:py-10"
      // Same tint as About and Projects, no top border - all three read as
      // one continuous block instead of separate tiled sections.
      className="bg-slate-50/50 backdrop-blur-md transition-colors duration-300 dark:bg-slate-950/40"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading number="03">Skills</SectionHeading>

        <div className="flex shrink-0 items-center gap-3">
          {/* Toggles the compact 3-category view in place - unrelated to
              the "View all" link above. */}
          <button
            type="button"
            onClick={() => setCompact((value) => !value)}
            aria-label={compact ? 'Show scrolling view' : 'Show a quick grouped view'}
            title={compact ? 'Show scrolling view' : 'Show a quick grouped view'}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-cyan-500/40 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-400 dark:hover:text-cyan-300"
          >
            {compact ? <Layers className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </button>

          {/* Navigates to the full page - separate from the icon toggle below. */}
          <a
            href="#/skills"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 transition-colors duration-300 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            <span>All Skills</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {compact ? (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-8 space-y-6"
          >
            {compactGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                  {group.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {group.items.map((tech) => (
                    <SkillPill key={tech.label} {...tech} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="ticker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-8 space-y-3"
          >
            {tickerRows.map((row, i) => (
              <div
                key={i}
                className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
              >
                {/* Row content is duplicated once so the -50% loop point
                    lines up with an identical second copy - the seam is
                    invisible. Spacing is a trailing margin on every item
                    rather than a `gap` on this container: with `gap`, the
                    two copies are separated by one extra "connecting" gap
                    that isn't inside either copy, so -50% lands half a gap
                    short of the real seam and stutters on every loop. */}
                <div
                  className="animate-marquee flex w-max"
                  style={{
                    animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
                    animationDuration: `${28 + i * 6}s`,
                  }}
                >
                  {[...row, ...row].map((tech, j) => (
                    <div key={`${tech.label}-${j}`} className="mr-2.5">
                      <SkillPill {...tech} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
