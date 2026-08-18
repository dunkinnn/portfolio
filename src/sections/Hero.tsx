import { motion, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, type ComponentType } from 'react'
import {
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlinePaintBrush,
  HiOutlineCircleStack,
  HiOutlineCheckCircle,
  HiOutlineArrowUpRight,
} from 'react-icons/hi2'
import Section from '../components/Section'
import { fade, rise, stagger } from '../lib/motion'

const WebGLHero = lazy(() => import('../components/WebGLHero'))

export interface ServiceItem {
  id: string
  title: string
  badge: string
  description: string
  Icon: ComponentType<{ className?: string }>
  tags: string[]
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    title: 'Cross-Platform Mobile Apps',
    badge: 'Flutter & Android',
    description:
      'Building performant iOS & Android apps with smooth UI, offline storage, and API integrations.',
    Icon: HiOutlineDevicePhoneMobile,
    tags: ['Flutter', 'REST APIs', 'State Management'],
  },
  {
    id: '02',
    title: 'Full-Stack Web Systems',
    badge: 'React & Backend',
    description:
      'Engineered admin dashboards, client portals, and responsive websites built for speed.',
    Icon: HiOutlineGlobeAlt,
    tags: ['React', 'PHP/Node', 'Tailwind CSS'],
  },
  {
    id: '03',
    title: 'UI/UX & Product Design',
    badge: 'Figma to Code',
    description:
      'Designing clean, modern executive-level interfaces and interactive prototypes before coding.',
    Icon: HiOutlinePaintBrush,
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    id: '04',
    title: 'Database & API Architecture',
    badge: 'SQL & Infrastructure',
    description:
      'Structuring reliable databases, secure authentication, and optimized data workflows.',
    Icon: HiOutlineCircleStack,
    tags: ['PostgreSQL', 'MySQL', 'API Design'],
  },
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
      contentClassName="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      paddingClassName="pt-20 pb-12 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-sky-500/30 selection:text-sky-800 dark:selection:text-sky-200 transition-colors duration-300"
    >
      {/* BACKGROUND GRAPHICS */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-20 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-400/20 via-indigo-400/15 to-transparent dark:from-sky-500/15 dark:via-indigo-500/10 blur-[100px] sm:blur-[140px] lg:blur-[160px]" />

      <Suspense fallback={null}>
        <WebGLHero />
      </Suspense>

      {/* HERO CONTENT */}
      <div className="relative z-10 my-auto w-full pt-6 sm:pt-12 pb-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isLoaded ? 'show' : 'hidden'}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* STATUS BADGE */}
          <motion.div variants={item} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 px-3 py-1 text-[11px] sm:text-xs md:text-[13px] font-mono text-emerald-700 dark:text-emerald-300 shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Freelance & Project Roles</span>
            </div>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            variants={item}
            className="w-full font-extrabold tracking-tight"
          >
            <span className="block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              BUILDING DIGITAL PRODUCTS
            </span>
            <span className="mt-1 block text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 dark:from-sky-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent leading-tight sm:leading-none">
              From Wireframe to Production Code.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={item}
            className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300 px-2 sm:px-0"
          >
            I help businesses, teams, and clients turn ideas into functional mobile apps,
            responsive web platforms, and tailored user interfaces.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-6 sm:mt-8 flex w-full flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <a
              href="#projects"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-6 py-3.5 sm:px-7 sm:py-3 text-sm sm:text-[15px] font-bold text-white dark:text-slate-950 shadow-md dark:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all hover:brightness-110 hover:shadow-lg dark:hover:shadow-[0_0_35px_rgba(56,189,248,0.4)]"
            >
              <span>View Past Work</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/80 px-6 py-3.5 sm:px-7 sm:py-3 text-sm sm:text-[15px] font-semibold text-slate-800 dark:text-slate-200 backdrop-blur-xl transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            >
              Hire for a Project
            </a>
          </motion.div>
        </motion.div>

        {/* SERVICES PIPELINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto mt-12 sm:mt-16 w-full max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60 p-4 sm:p-6 lg:p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors duration-300">
            <div className="pointer-events-none absolute inset-0 opacity-15">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(56,189,248,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.15) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            <div className="relative z-10 mb-6 sm:mb-8 flex flex-row items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <HiOutlineCheckCircle className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                <span>What I Can Build For You</span>
              </div>

              <div className="flex items-center font-mono text-[9px] sm:text-[10px] text-slate-500 shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-emerald-700 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  <span className="hidden xs:inline">ACCEPTING NEW PROJECTS</span>
                  <span className="xs:hidden">AVAILABLE</span>
                </span>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {SERVICES.map((service, index) => {
                const IconComponent = service.Icon
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/40 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:bg-white dark:hover:bg-slate-900/90 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 text-sky-600 dark:text-sky-400 shadow-sm dark:shadow-inner group-hover:border-sky-500/30 group-hover:bg-sky-50 dark:group-hover:bg-slate-950 group-hover:text-sky-600 dark:group-hover:text-white transition-colors shrink-0">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 truncate">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="mt-4 sm:mt-5 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-200 dark:border-slate-800/60">
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-200/60 dark:bg-slate-950/80 px-2 py-0.5 font-mono text-[9px] text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-800/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-500/0 to-transparent transition-all duration-500 group-hover:via-sky-500/60" />
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-between gap-3 sm:gap-4 border-t border-slate-200/80 dark:border-slate-800/60 pt-4 sm:pt-5 text-center md:flex-row md:text-left">
              <p className="font-mono text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 max-w-xl">
                Have an existing code base or a new project idea? Let's discuss scope and deliverables.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 shrink-0"
              >
                <span>Start a conversation</span>
                <HiOutlineArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}