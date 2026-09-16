import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import HeroVisualPanel from '../components/HeroVisualPanel'
import Section from '../components/Section'
import { projects } from '../data/projects'
import { fade, rise, stagger } from '../lib/motion'

const WebGLHero = lazy(() => import('../components/WebGLHero'))

// Placeholder entries have no write-up, so this counts only real case studies.
const SHIPPED_COUNT = projects.filter((project) => project.story?.length).length

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: `${SHIPPED_COUNT}`, label: 'Projects Shipped' },
  { value: '2', label: 'Disciplines' },
]

interface HeroProps {
  isLoaded?: boolean
}

export default function Hero({ isLoaded = true }: HeroProps) {
  const reduced = useReducedMotion()
  const item = reduced ? fade : rise

  return (
    <Section
      id="hero"
      reveal={false}
      fullBleed
      contentClassName="
        mx-auto flex w-full max-w-7xl flex-1
        flex-col
        px-6 sm:px-8 lg:px-12
      "
      paddingClassName="
        pt-24 pb-8
        sm:pt-28 sm:pb-10
        lg:pt-32 lg:pb-10
      "
      className="
        relative isolate flex min-h-dvh
        flex-col overflow-hidden
        bg-white text-slate-900
        transition-colors duration-300
        dark:bg-slate-950 dark:text-slate-100
      "
    >
      {/* ======================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none absolute inset-0 -z-30
          bg-[linear-gradient(to_right,#a3a3a31f_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a31f_1px,transparent_1px)]
          bg-[size:4rem_4rem]
          dark:bg-[linear-gradient(to_right,#7373731f_1px,transparent_1px),linear-gradient(to_bottom,#7373731f_1px,transparent_1px)]
        "
      />

      {/* ======================================================
          WEBGL BACKGROUND
      ====================================================== */}

      <Suspense fallback={null}>
        <WebGLHero />
      </Suspense>

      {/* ======================================================
          HERO CONTENT
      ====================================================== */}

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isLoaded ? 'show' : 'hidden'}
        className="relative z-10 flex flex-1 flex-col"
      >
        {/* ==================================================
            MAIN HERO
        ================================================== */}

        <div
          className="
            my-auto grid grid-cols-1
            items-center gap-10 py-6
            text-center
            lg:grid-cols-12 lg:gap-x-16
            lg:text-left
          "
        >
          {/* ================================================
              LEFT: COPY
          ================================================ */}

          <div className="relative flex flex-col items-center lg:col-span-7 lg:items-start">
            {/* Soft ambient glow behind the copy - same technique as the
                visual panel's glow, just lower-key so it reads as depth
                rather than another decoration. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-24 -z-10 h-72 w-72 rounded-full bg-slate-400/10 blur-3xl dark:bg-slate-100/5"
            />

            {/* ================================================
                EYEBROW
            ================================================ */}

            <motion.div
              variants={item}
              className="
                text-eyebrow-sm mb-6 flex
                flex-wrap items-center justify-center
                gap-x-3 gap-y-2
                sm:text-eyebrow
                lg:justify-start
              "
            >
              <span className="text-emerald-600 dark:text-emerald-400">00</span>

              <span className="h-px w-8 shrink-0 bg-slate-400/60 sm:w-10 dark:bg-slate-600/70" />

              <span className="whitespace-nowrap text-slate-700 dark:text-slate-300">
                UI/UX Designer
              </span>

              <span className="hidden h-1 w-1 shrink-0 rounded-full bg-slate-400 sm:block dark:bg-slate-600" />

              <span className="whitespace-nowrap text-slate-700 dark:text-slate-300">
                Full-Stack Developer
              </span>
            </motion.div>

            {/* ================================================
                HEADLINE
            ================================================ */}

            {/* One scale that only ever grows with the viewport. The previous
                lg clamp topped out at 56px while the base clamp reached 76px,
                so the headline shrank on wide screens. */}
            <motion.h1
              variants={item}
              className="
                text-balance
                text-[clamp(2.25rem,8.5vw,3.25rem)]
                font-black
                uppercase
                leading-[0.95]
                tracking-[-0.03em]
                text-slate-900
                lg:text-[clamp(2.75rem,4vw,4.25rem)]
                dark:text-white
              "
            >
              I Design & Build
              <br />

              <span
                className="
                  italic
                  text-sky-600
                  dark:text-sky-400
                "
              >
                Digital
              </span>{' '}
              Experiences.
            </motion.h1>

            {/* ================================================
                INTRO
            ================================================ */}

            <motion.p
              variants={item}
              className="
                mt-5 max-w-xl
                text-base leading-relaxed
                text-slate-600
                sm:text-lg
                dark:text-slate-400
              "
            >
              Designing intuitive digital experiences and building high-performing
              web and mobile applications for startups, businesses, and modern
              brands.
            </motion.p>

            {/* ================================================
                ACTION BUTTONS
            ================================================ */}

            <motion.div
              variants={item}
              className="
                mt-10 flex w-full max-w-md
                flex-col items-center gap-4
                sm:flex-row
              "
            >
              {/* SEE MY WORK */}

              <a
                href="#projects"
                className="
                  group relative flex w-full
                  items-center justify-between gap-3
                  overflow-hidden
                  rounded-xl border border-slate-900
                  bg-slate-900
                  px-6 py-4
                  text-eyebrow
                  text-white shadow-lg shadow-slate-900/20
                  transition-all
                  hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl
                  sm:w-auto sm:flex-1
                  dark:border-white
                  dark:bg-white
                  dark:text-slate-950
                  dark:shadow-none
                  dark:hover:bg-slate-200
                "
              >
                {/* Continuous sweep, same technique as the project cards */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-y-0 left-0 w-1/3
                    animate-shimmer
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    dark:via-slate-900/10
                  "
                />

                <span className="relative whitespace-nowrap">See My Work</span>

                <svg
                  className="
                    relative h-4 w-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>

              {/* LET'S WORK */}

              <a
                href="#contact"
                className="
                  group flex w-full
                  items-center justify-center gap-2
                  whitespace-nowrap
                  rounded-xl border border-slate-200
                  bg-white/70
                  px-6 py-4
                  text-eyebrow
                  text-slate-900
                  backdrop-blur-md transition-all
                  hover:-translate-y-0.5 hover:border-cyan-500/50 hover:text-cyan-700
                  sm:w-auto sm:flex-1
                  dark:border-slate-700
                  dark:bg-slate-900/60
                  dark:text-slate-100
                  dark:hover:border-cyan-400/50 dark:hover:text-cyan-300
                "
              >
                Let&apos;s Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            {/* ================================================
                STATS
            ================================================ */}

            <motion.dl
              variants={item}
              className="
                mt-9 flex items-stretch
                divide-x divide-slate-200/80
                dark:divide-slate-800
              "
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 text-center first:pl-0 sm:px-8 sm:first:pl-0 lg:text-left"
                >
                  <dt
                    className="
                      text-3xl font-extrabold
                      tracking-[-0.03em]
                      text-slate-900
                      sm:text-4xl
                      dark:text-white
                    "
                  >
                    {stat.value}
                  </dt>

                  <dd
                    className="
                      text-eyebrow-sm mt-2
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ================================================
              RIGHT: VISUAL PANEL (design + code cards)
          ================================================ */}

          <motion.div
            variants={item}
            className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center"
          >
            <HeroVisualPanel />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
