import type { MouseEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import profileUrl from '../assets/profile.png'
import { EASE, fade, rise, stagger } from '../lib/motion'

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '12+', label: 'Projects Shipped' },
  { value: '2', label: 'Disciplines, One Workflow' },
]

export default function About() {
  const reduced = useReducedMotion()
  const item = reduced ? fade : rise

  // Spotlight & Tilt parameters
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(300px circle at ${glowX}px ${glowY}px, rgba(56, 189, 248, 0.18), transparent 80%)`

  const handlePortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    if (reduced) return
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8)
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const handlePortraitLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <Section
      id="about"
      reveal={false}
      fullBleed
      paddingClassName="py-6 md:py-10"
      className="border-t border-slate-200/80 bg-slate-50/50 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/40"
    >
      <SectionHeading number="01">About</SectionHeading>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        {/* LEFT: Interactive Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-5 flex flex-col"
          style={{ perspective: 1000 }}
        >
          <motion.div
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex-1 min-h-[380px] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-100/60 p-2 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:border-slate-300 hover:shadow-2xl dark:border-white/10 dark:from-slate-900/80 dark:to-slate-950/80 dark:shadow-none dark:hover:border-white/20"
          >
            {/* Interactive Glow Overlay */}
            <motion.div
              aria-hidden="true"
              style={{ background: glow }}
              className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl"
            />

            {/* Live Indicator Badge */}
            <div className="absolute top-5 left-5 z-30 flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for projects
            </div>

            {/* Inner Image Mask */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-slate-100 dark:bg-slate-900">
              <img
                src={profileUrl}
                alt="Angelou Bulauan"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Content & Metric Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <div>
            <motion.div variants={item} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3">
              <span className="h-px w-6 bg-sky-500/50" />
              Background & Focus
            </motion.div>

            <motion.h3
              variants={item}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
            >
              Hi, I&apos;m Angelou Bulauan.
            </motion.h3>

            <motion.p
              variants={item}
              className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
            >
              I&apos;m a full-stack developer and UI/UX designer based in the Philippines. I spend
              most of my time in the space between Figma and the browser — turning interface
              decisions into working product, and letting what&apos;s technically possible shape
              the design.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
            >
              My process starts with the interaction, not the visual polish — how something
              should behave before how it should look. That habit carries into the build: clean
              component structure, sensible state, and interfaces that hold up once real content
              and edge cases show up.
            </motion.p>
          </div>

          {/* Metric Grid Cards */}
          <motion.dl
            variants={item}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
              >
                <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-sky-500/5 blur-xl group-hover:bg-sky-500/10 transition-colors" />
                <dt className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </Section>
  )
}