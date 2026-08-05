import { motion } from 'framer-motion'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { dateRange, duration, roles } from '../data/experience'
import { stagger, useRiseVariant } from '../lib/motion'

// Condensed date / title / company / location rows - full detail (type,
// summary, highlights) lives on the "View details" page at #/experience,
// same pattern as Skills' "View all" -> #/skills.
export default function Experience() {
  const item = useRiseVariant()

  return (
    <Section
      id="experience"
      reveal={false}
      fullBleed
      paddingClassName="py-10 md:py-16"
      // Same tint as About, Projects and Skills, no top border - the whole
      // run of sections reads as one continuous block.
      className="bg-slate-50/50 backdrop-blur-md transition-colors duration-300 dark:bg-slate-950/40"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading number="04">Experience</SectionHeading>

        <a
          href="#/experience"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 transition-colors duration-300 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
        >
          <span>View details</span>
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

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 divide-y divide-slate-200 dark:divide-white/10"
      >
        {roles.map((role) => (
          <motion.div
            key={role.title + role.company}
            variants={item}
            // Below sm, the 3-column grid (10rem date + auto pill, both
            // fixed-ish widths) has no room left for the content column on a
            // phone-width viewport, so it stacks instead: date + duration on
            // one line, then the content block underneath. Grid only kicks
            // in from sm up, where there's width to spare.
            className="flex flex-col gap-1.5 py-6 sm:grid sm:grid-cols-[10rem_minmax(0,_1fr)_auto] sm:items-start sm:gap-8 md:grid-cols-[12rem_minmax(0,_1fr)_auto] md:gap-12"
          >
            <div className="flex items-center justify-between gap-3 sm:contents">
              <span className="text-sm text-slate-400 dark:text-slate-500">{dateRange(role.period)}</span>

              {/* Fills the empty space the wide row otherwise leaves on the
                  right - the duration half of `period` that `dateRange`
                  drops. `sm:contents` un-wraps this on the grid layout so it
                  lands in its own trailing column instead of next to the date. */}
              <span className="shrink-0 whitespace-nowrap rounded-full border border-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:order-3">
                {duration(role.period)}
              </span>
            </div>

            <div className="max-w-xl">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">{role.title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                {role.company} &middot; {role.type}
              </p>
              <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-300/80">{role.location}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}