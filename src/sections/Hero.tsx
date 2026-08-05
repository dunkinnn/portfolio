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

const WebGLHero = lazy(() => import('../components/WebGLHero'))

const socials = [
  {
    label: 'GitHub',
    // TODO: paste your GitHub profile URL here
    href: 'https://github.com',
    icon: (
      <path
        fill="currentColor"
        d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"
      />
    ),
  },
  {
    label: 'LinkedIn',
    // TODO: paste your LinkedIn profile URL here (recovered from a stray
    // target attribute below - double-check it's still correct)
    href: 'https://www.linkedin.com/in/angelou-bulauan-125401338/',
    icon: (
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.06c.53-.95 1.83-1.95 3.76-1.95C21.6 8.69 22 11.1 22 14.24V21h-4v-5.99c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9z"
      />
    ),
  },
  {
    label: 'Email',
    // TODO: replace with your real email address
    href: 'mailto:you@example.com',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth={1.75} />
        <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
]

export default function Hero() {
  const reduced = useReducedMotion()
  const item = reduced ? fade : rise

  // Cursor position within the card, for the tilt and the spotlight.
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(260px circle at ${glowX}px ${glowY}px, rgba(56,189,248,0.10), transparent 70%)`

  const handleCardMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    if (reduced) return
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 9)
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 9)
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

      {/* Gridlines now live in WebGLHero so they share the cursor uniform */}

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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 motion-reduce:animate-none"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400"></span>
              </span>
              Available for full-stack & UI/UX roles
            </motion.div>

            {/* Main Headline */}
            {/* line-height set inline, not via `leading-*` - each responsive
                text-size utility (sm:text-6xl, lg:text-7xl) bundles its own
                line-height and wins the cascade over a `leading-*` class at
                that breakpoint, clipping descenders again. Inline style
                always wins regardless of breakpoint. */}
            <h1
              style={{ lineHeight: 1.30 }}
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

            {/* Socials - own row below the CTAs. Fill in the real links in the
                `socials` array above (GitHub, LinkedIn, email). */}
            <motion.div variants={item} className="mt-3 flex items-center gap-1">
              {socials.map((social) => {
                const external = !social.href.startsWith('mailto:')
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                    >
                      {social.icon}
                    </svg>
                  </a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Glassmorphic Stats/Code Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="lg:col-span-5"
            style={{ perspective: 1000 }}
          >
            <motion.a
              href="#projects"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-indigo-500/10 dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-indigo-500/5 dark:hover:border-slate-700 dark:hover:shadow-indigo-500/20"
            >
              {/* Spotlight that tracks the cursor across the card */}
              <motion.div
                aria-hidden="true"
                style={{ background: glow }}
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Preview slot - swap this div for an <img> once you have a screenshot */}
              <div className="relative aspect-[2/1] overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950/60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.12),transparent_60%)] transition-transform duration-700 ease-out group-hover:scale-110" />

                {/* Skeleton sweep - drop this along with the slot once a real image lands */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/[0.06]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-md border border-slate-300 px-3 py-1.5 font-mono text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-600">
                    project screenshot
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Featured work
                </div>

                <h2 className="mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
                  Project Title
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  One line on the outcome - what changed, and by how much. Replace with a real result.
                </p>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Figma'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-500 dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
                    View case study
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue - absolute so it pins to the fold rather than adding height */}
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