import { motion } from 'framer-motion'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { EASE, stagger, useRiseVariant } from '../lib/motion'

interface Project {
  title: string
  description: string
  // Small pill tags shown above the title (category, ranking, stack, etc).
  badges: string[]
  // Placeholder avatar letters - swap for a real app icon/screenshot.
  initial: string
  links: { label: string; href: string }[]
  // Bento cell size at the lg breakpoint - first entry is the featured project.
  span: string
}

const projects: Project[] = [
  {
    title: 'Project One',
    description: 'Placeholder description - problem, role, outcome.',
    badges: ['Featured', 'React', 'TypeScript'],
    initial: 'P1',
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Case study', href: '#' },
    ],
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    title: 'Project Two',
    description: 'Placeholder description - problem, role, outcome.',
    badges: ['React', 'TypeScript'],
    initial: 'P2',
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Case study', href: '#' },
    ],
    span: '',
  },
  {
    title: 'Project Three',
    description: 'Placeholder description - problem, role, outcome.',
    badges: ['React', 'TypeScript'],
    initial: 'P3',
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Case study', href: '#' },
    ],
    span: '',
  },
]

export default function Projects() {
  const item = useRiseVariant()

  return (
    <Section
      id="projects"
      reveal={false}
      fullBleed
      paddingClassName="py-10 md:py-16"
      className="bg-slate-50/50 backdrop-blur-md transition-colors duration-300 dark:bg-slate-950/40"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionHeading number="02">Projects</SectionHeading>
        </div>

        <a
          href="#"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 transition-colors duration-300 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
        >
          <span>All projects</span>
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
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[14rem]"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/5 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-sky-400/40 dark:hover:shadow-sky-400/5 ${project.span}`}
          >
            {/* Ambient Corner Glow on Hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <div>
              {/* Top Bar: Badge Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.badges.map((badge) => {
                  const isFeatured = badge.toLowerCase() === 'featured'
                  return (
                    <span
                      key={badge}
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        isFeatured
                          ? 'border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300'
                          : 'border border-slate-200/60 bg-slate-100/60 text-slate-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400'
                      }`}
                    >
                      {badge}
                    </span>
                  )
                })}
              </div>

              {/* Title & Icon Header */}
              <div className="mt-5 flex items-center gap-3.5">
                <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-sky-500/20 ring-1 ring-white/20">
                  {project.initial}
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
            </div>

            {/* Bottom Links CTA Pair */}
            <div className="relative z-10 mt-6 flex flex-wrap gap-2 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group/link inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-50 hover:text-sky-600 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-sky-400/50 dark:hover:bg-slate-800 dark:hover:text-sky-300"
                >
                  <span>{link.label}</span>
                  <svg
                    className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}