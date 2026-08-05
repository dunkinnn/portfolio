import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { initials, roles } from '../data/experience'
import { stagger, useRiseVariant } from '../lib/motion'

// Standalone page at #/experience, linked from the Experience section's
// "View details" - same pattern as Skills' "View all" -> #/skills. Shows
// each role's full detail (type, period, location, summary, highlights),
// unlike the condensed date/title/company rows on the home page.
export default function ExperiencePage() {
  const item = useRiseVariant()

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </a>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Experience
        </h1>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          Every role, in detail.
        </p>

        <motion.div variants={stagger} initial="hidden" animate="show" className="mt-10">
          {roles.map((role, i) => (
            <motion.div
              key={role.title + role.company}
              variants={item}
              className="relative flex items-start gap-4 py-8"
            >
              {/* Connects this badge to the next one. Rows vary in height
                  (summary/highlights differ per role), so this is anchored
                  to this row's own box rather than a fixed offset: it starts
                  at this row's badge center (top-[3.75rem] = row py-8 + half
                  the badge height) and runs to bottom-[-3.75rem] - past this
                  row's own bottom edge by exactly the next row's top-padding
                  + half-badge, landing precisely on the next badge's center
                  regardless of how tall this row's content is. No line after
                  the last role - nothing to connect to. */}
              {i < roles.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-[3.75rem] bottom-[-3.75rem] w-px bg-slate-200 dark:bg-white/10"
                />
              )}

              {/* Stand-in for a company logo. Opaque fill (matches the page
                  background) so it sits on top of the connecting line
                  instead of the line showing through it. */}
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                {initials(role.company)}
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-50">{role.company}</h2>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {role.type}
                </p>

                <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-50">{role.title}</h3>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {role.period}
                </p>
                <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-300/80">{role.location}</p>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{role.summary}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                  {role.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
