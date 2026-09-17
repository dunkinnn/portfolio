import { motion } from 'framer-motion'
import { dateRange, duration, initials, roles } from '../data/experience'
import { stagger, useRiseVariant } from '../lib/motion'
import { PAGE_SHELL } from '../lib/pageShell'

// Standalone page at /experience, linked from the Experience section's
// "View details" - same pattern as Skills' "View all" -> /skills. Shows
// each role's full detail (type, period, location, summary, highlights),
// unlike the condensed date/title/company rows on the home page.
export default function ExperiencePage() {
  const item = useRiseVariant()

  return (
    <div className={PAGE_SHELL}>
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:px-8 lg:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
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
                {/* Role first: the job title is what a reader is scanning
                    for, the employer and engagement type qualify it. */}
                <h2 className="font-semibold text-slate-900 dark:text-slate-50">{role.title}</h2>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {role.company} &middot; {role.type}
                </p>

                {/* Rebuilt rather than printed raw: an ongoing role leaves
                    the duration out of `period` so it cannot go stale, and
                    `duration` counts it from the start date instead. */}
                <p className="text-eyebrow-sm mt-3 text-slate-400 dark:text-slate-500">
                  {dateRange(role.period)} &middot; {duration(role.period)}
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
