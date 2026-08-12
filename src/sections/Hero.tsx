import type { MouseEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import Section from '../components/Section'
import { lazy, Suspense } from 'react'
import { EASE, fade, rise, stagger } from '../lib/motion'
import { projects } from '../data/projects'

const WebGLHero = lazy(() => import('../components/WebGLHero'))

// Maisnutri (Corn Leaf Nutrient Deficiency Detector) - the CS thesis mobile
// app - is the featured work shown here, linking through to its full case
// study at #/project.
const featured = projects.find((p) => p.title.includes('Corn Leaf'))!

export default function Hero() {
  const reduced = useReducedMotion()
  const item = reduced ? fade : rise

  // Cursor position within the card, for tilt and spotlight
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(320px circle at ${glowX}px ${glowY}px, rgba(56,189,248,0.12), transparent 75%)`

  const handleCardMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    if (reduced) return
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8)
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const handleCardLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <Section
      id="hero"
      reveal={false}
      fullBleed
      contentClassName="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10"
      className="relative isolate flex min-h-dvh flex-col items-center justify-center [justify-content:safe_center] overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
    >
      {/* Background Layer 1: Radial Spotlight Matrix */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)] opacity-60 dark:bg-[radial-gradient(#334155_1px,transparent_1px)] dark:opacity-30" />

      {/* Background Layer 2: Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400/20 via-indigo-400/20 to-purple-400/15 blur-[160px] dark:from-sky-500/10 dark:via-indigo-500/15 dark:to-purple-500/10" />

      {/* WebGL Canvas Overlay */}
      <Suspense fallback={null}>
        <WebGLHero />
      </Suspense>

      {/* Asymmetric Split Layout Wrapper */}
      <div className="relative z-10 w-full pb-4 pt-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Main Typography & CTA (7 Cols) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-left lg:col-span-7"
          >
            {/* Live Availability Pill */}
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-semibold text-sky-700 backdrop-blur-md dark:border-sky-500/20 dark:text-sky-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
              </span>
              Available for full-stack & UI/UX roles
            </motion.div>

            {/* Main Headline */}
            <h1
              style={{ lineHeight: 1.35 }}
              className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
            >
              <motion.span variants={item} className="block">
                Architecting Ideas.
              </motion.span>
              <motion.span
                variants={item}
                className="block bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-300 dark:to-violet-300"
              >
                Engineering Reality.
              </motion.span>
            </h1>

            {/* Actions */}
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-white/5 dark:hover:bg-slate-100"
              >
                Let's Build Together
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="rounded-xl border border-slate-300 bg-white/60 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-md transition-all hover:border-slate-400 hover:bg-white hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:text-white"
              >
                View Works
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Redesigned Glassmorphic Featured Work Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="lg:col-span-5"
            style={{ perspective: 1000 }}
          >
            <motion.a
              href="/project"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="group relative block overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-1.5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-sky-500/40 hover:shadow-sky-500/10 dark:border-slate-800/80 dark:bg-slate-900/40 dark:shadow-indigo-500/5 dark:hover:border-sky-500/30 dark:hover:shadow-sky-500/15"
            >
              {/* Dynamic Mouse Spotlight overlay */}
              <motion.div
                aria-hidden="true"
                style={{ background: glow }}
                className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Mac-style Window Frame Shell */}
              <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/80">
                
                {/* Header Bar */}
                <div className="flex h-9 items-center justify-between border-b border-slate-200/60 bg-slate-100/60 px-3.5 dark:border-slate-800/80 dark:bg-slate-900/80">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700/80 group-hover:bg-rose-400/80 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700/80 group-hover:bg-amber-400/80 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700/80 group-hover:bg-emerald-400/80 transition-colors" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white/80 px-2 py-0.5 text-[10px] font-mono text-slate-400 dark:border-slate-800/80 dark:bg-slate-950/80 dark:text-slate-500">
                    <svg className="h-2.5 w-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    maisnutri.app
                  </div>
                </div>

                {/* Screenshot / Visual Preview Area */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-900/60">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    onError={(e) => {
                      // Gracefully handle missing local image paths
                      e.currentTarget.style.display = 'none'
                    }}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Ambient glow & shimmer */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-indigo-500/5 to-purple-500/10" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/[0.04]" />
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="p-4 pt-4">
                <div className="flex items-center justify-between">
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-600 dark:border-sky-400/20 dark:text-sky-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                    Featured Project
                  </div>

                  {/* Metric Tag */}
                  <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {featured.metric}
                  </span>
                </div>

                <h2 className="mt-2.5 text-base font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
                  {featured.title}
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                  {featured.description}
                </p>

                {/* Tags & Action Link Footer */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800/60">
                  <div className="flex flex-wrap gap-1.5">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-200/80 bg-slate-100/80 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-600 transition-transform group-hover:translate-x-0.5 dark:text-sky-400">
                    Case Study
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* Scroll Cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-slate-200 transition-colors">
          01 // SCROLL
        </span>

        <div className="relative flex h-10 w-6 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50/50 backdrop-blur-sm group-hover:border-sky-500/50 dark:border-slate-800/80 dark:bg-slate-900/50 dark:group-hover:border-sky-400/50 transition-colors">
          <div className="relative h-6 w-0.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-sky-500 to-transparent dark:via-sky-400"
            />
          </div>
        </div>
      </motion.a>
    </Section>
  )
}