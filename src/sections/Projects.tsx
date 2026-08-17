import React from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { stagger, useRiseVariant, EASE } from '../lib/motion'
import { projects, type Project } from '../data/projects'

export function ProjectCard({
  href,
  eyebrow,
  status,
  title,
  description,
  tags,
  imageUrl,
  metric,
  className = '',
  fullDescription = false,
}: Project & { className?: string; fullDescription?: boolean }) {
  const reduced = useReducedMotion()

  // 3D Tilt & Cursor Glow setup
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}px ${glowY}px, rgba(56,189,248,0.12), transparent 75%)`

  const handleCardMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    if (reduced) return
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 6)
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 6)
  }

  const handleCardLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  // Derive domain label for browser header
  const domainLabel = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 12)

  return (
    <motion.a
      href={href}
      onMouseMove={handleCardMove}
      onMouseLeave={handleCardLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-1.5 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-sky-500/40 hover:shadow-sky-500/10 dark:border-slate-800/80 dark:bg-slate-900/40 dark:shadow-indigo-500/5 dark:hover:border-sky-500/30 dark:hover:shadow-sky-500/15 ${className}`}
    >
      {/* Dynamic Cursor Glow Overlay */}
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
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors group-hover:bg-rose-400/80 dark:bg-slate-700/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors group-hover:bg-amber-400/80 dark:bg-slate-700/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors group-hover:bg-emerald-400/80 dark:bg-slate-700/80" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white/80 px-2 py-0.5 font-mono text-[10px] text-slate-400 dark:border-slate-800/80 dark:bg-slate-950/80 dark:text-slate-500">
            <svg className="h-2.5 w-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {domainLabel}.app
          </div>
        </div>

        {/* Screenshot Image Container - sized to the image itself (no fixed
            aspect ratio) so the whole photo shows with no letterboxing;
            the placeholder box below still needs a fixed height since it
            has no intrinsic size of its own. */}
        <div
          className={`relative overflow-hidden bg-slate-100 dark:bg-slate-900/60 ${imageUrl ? '' : 'aspect-[16/9]'}`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              onError={(e) => {
                // Gracefully handle missing local image paths
                e.currentTarget.style.display = 'none'
              }}
              className="block w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            // No screenshot yet - placeholder until a real one is added.
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-md border border-slate-300 px-3 py-1.5 font-mono text-xs text-slate-400 dark:border-slate-800 dark:text-slate-600">
                project coming soon
              </span>
            </div>
          )}

          {/* Ambient Glow & Shimmer */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-indigo-500/5 to-purple-500/10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/[0.04]" />

          {/* Clickable affordance - always visible (not hover-only, so it
              still reads on touch devices), no label text needed. */}
          <div className="pointer-events-none absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-slate-900/60 text-white opacity-80 shadow-md backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="flex flex-1 flex-col p-4 pt-4">
        <div className="flex items-center justify-between gap-2">
          {/* Eyebrow & Status Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-600 dark:border-sky-400/20 dark:text-sky-300">
            {status && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />}
            {eyebrow}
          </div>

          {/* Metric Tag */}
          {metric && (
            <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {metric}
            </span>
          )}
        </div>

        <h3 className="mt-2.5 text-base font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
          {title}
        </h3>

        <p
          className={`mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 ${fullDescription ? '' : 'line-clamp-2'}`}
        >
          {description}
        </p>

        {/* Footer with Tags */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800/60">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-slate-200/80 bg-slate-100/80 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  )
}

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
          href="/projects"
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
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Homepage shows at most 6 cards; the rest live on /projects. */}
        {projects.slice(0, 6).map((project) => (
          <motion.div key={project.title} variants={item} className="h-full">
            <ProjectCard {...project} className="h-full w-full" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}