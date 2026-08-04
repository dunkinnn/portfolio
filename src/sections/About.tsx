import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

// Placeholder figures - swap for real numbers.
const stats = [
  { value: '5+', label: 'Years building' },
  { value: '20+', label: 'Projects shipped' },
  { value: '2', label: 'Disciplines, one workflow' },
]

// Short bio and background summary.
export default function About() {
  const reduced = useReducedMotion()
  const item = reduced ? fade : rise

  return (
    <Section
      id="about"
      reveal={false}
      fullBleed
      className="border-t border-slate-200 bg-slate-50 transition-colors duration-300 dark:border-white/5 dark:bg-slate-900"
    >
      <SectionHeading>About</SectionHeading>

      <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
        {/* LEFT: Portrait card - swap the placeholder div for an <img> once you have a photo */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-5"
        >
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-indigo-500/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.14),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="select-none text-[10rem] font-extrabold leading-none text-slate-100 dark:text-slate-900/80">
                  A
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-md border border-slate-300 px-3 py-1.5 font-mono text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-600">
                  your photo here
                </span>
              </div>
            </div>

            {/* Floating status badge, overlapping the portrait's bottom edge */}
            <div className="absolute -bottom-5 left-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to freelance work
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Bio, stats, CTA */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-7"
        >
          <motion.p
            variants={item}
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
          >
            Hi, I&apos;m Angelou.
          </motion.p>

          {/* Placeholder bio - replace with your background, focus area, and what you're looking for. */}
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
          >
            I&apos;m a full-stack developer and UI/UX designer based in the Philippines. I spend
            most of my time in the space between Figma and the browser — turning interface
            decisions into working product, and letting what&apos;s technically possible shape
            the design.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
          >
            My process starts with the interaction, not the visual polish — how something
            should behave before how it should look. That habit carries into the build: clean
            component structure, sensible state, and interfaces that hold up once real content
            and edge cases show up.
          </motion.p>

          {/* Stat row - placeholder figures, replace with real numbers */}
          <motion.div
            variants={item}
            className="mt-6 grid grid-cols-3 gap-4 border-y border-slate-200 py-5 dark:border-slate-800"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:shadow-white/5 dark:hover:bg-slate-100"
            >
              Let&apos;s work together
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* Placeholder href - point this at your actual résumé file */}
            <a
              href="#"
              className="rounded-xl border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur-md transition-all hover:border-slate-400 hover:bg-white hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:text-white"
            >
              Download résumé
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
