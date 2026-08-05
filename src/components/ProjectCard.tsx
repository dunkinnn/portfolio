import type { MouseEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { EASE } from '../lib/motion'

interface ProjectCardProps {
  eyebrow: string
  title: string
  description: string
  tags: string[]
  // Optional until real screenshots exist - falls back to a placeholder box.
  imageUrl?: string
  href: string
  ctaLabel?: string
  className?: string
  // Shorter image, tighter padding/type scale - for tight spots like Hero
  // where the card sits next to other content instead of owning a grid cell.
  compact?: boolean
}

// Tags that carry meaning beyond "part of the stack" get their own color so
// they read as a status/role at a glance instead of blending into the pile
// of tech tags.
function tagStyle(tag: string) {
  const lower = tag.toLowerCase()
  if (lower === 'ongoing') {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300'
  }
  if (lower.includes('ui/ux') || lower.includes('design')) {
    return 'border-violet-500/30 bg-violet-500/10 text-violet-600 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300'
  }
  return 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-400'
}

export default function ProjectCard({
  eyebrow,
  title,
  description,
  tags,
  imageUrl,
  href,
  ctaLabel = 'View project',
  className = '',
  compact = false,
}: ProjectCardProps) {
  const reduced = useReducedMotion()

  // Cursor position within the card, for the tilt and the spotlight.
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}px ${glowY}px, rgba(56,189,248,0.12), transparent 70%)`

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    if (reduced) return
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8)
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const handleLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const initial = title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.a
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-sky-400/30 dark:hover:shadow-sky-400/10 ${className}`}
    >
      {/* Ambient corner glow, always-on accent that brightens on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Spotlight that tracks the cursor across the card */}
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Image Preview Area - swap in a real screenshot via imageUrl once you have one */}
      <div className={`relative w-full overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-950/60 ${compact ? 'h-52' : 'h-72'}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.14),transparent_60%)] transition-transform duration-700 ease-out group-hover:scale-110" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/[0.06]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-md border border-slate-300 px-3 py-1.5 font-mono text-xs text-slate-400 dark:border-slate-800 dark:text-slate-600">
                project screenshot
              </span>
            </div>
          </>
        )}
      </div>

      <div className={`relative z-10 flex flex-1 flex-col ${compact ? 'p-4' : 'p-5'}`}>
        <div className="flex items-center gap-2.5">
          {!compact && (
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-xs font-bold text-white shadow-md shadow-sky-500/20 ring-1 ring-white/20">
              {initial}
            </div>
          )}
          <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
            {eyebrow}
          </span>
        </div>

        <h3 className={`mt-3 font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300 ${compact ? 'text-base' : 'text-lg'}`}>
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium ${tagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`mt-auto flex items-center gap-1 text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white ${compact ? 'pt-4' : 'pt-5'}`}>
          {ctaLabel}
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}
