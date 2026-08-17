import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { stagger, useRiseVariant } from '../lib/motion'
import { projects } from '../data/projects'
import { useRoute } from '../lib/useRoute'
import { goBack } from '../lib/goBack'

// Generic case-study page for any project, reached at /project/<slug> from
// its card in the Projects section, the "All projects" page, or Hero's
// featured card. Looks up the project by matching its href against the
// current URL, so every project gets the same detail view. Falls back to
// the card's short description when a project has no full write-up yet
// (see Project.story in data/projects.ts).
export default function ProjectPage() {
  const path = useRoute()
  const item = useRiseVariant()
  const project = projects.find((p) => p.href === path)

  if (!project) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white text-slate-600 antialiased dark:bg-slate-950 dark:text-slate-300">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">Project not found</p>
          <a
            href="/projects"
            className="mt-3 inline-block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
          >
            Back to all projects
          </a>
        </div>
      </div>
    )
  }

  const paragraphs = project.story?.length ? project.story : [project.description]

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
        <a
          href="/"
          onClick={goBack}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </a>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <motion.div variants={item} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              {project.eyebrow}
            </div>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {project.status}
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
          >
            {project.description}
          </motion.p>

          {/* Sized to the image itself (no fixed aspect ratio) so the whole
              photo shows with no letterboxing; the placeholder box still
              needs a fixed height (aspect-[2/1]) since it has no intrinsic
              size of its own. */}
          <motion.div
            variants={item}
            className={`relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-indigo-500/5 ${project.imageUrl ? '' : 'aspect-[2/1]'}`}
          >
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                onError={(e) => {
                  // Gracefully handle missing local image paths
                  e.currentTarget.style.display = 'none'
                }}
                className="block w-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-md border border-slate-300 px-3 py-1.5 font-mono text-xs text-slate-400 dark:border-slate-800 dark:text-slate-600">
                  project coming soon
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.12),transparent_60%)]" />
          </motion.div>

          {project.tags.length > 0 && (
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-500 dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div variants={item} className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          {project.designSystemImageUrl && (
            <motion.div variants={item} className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                Design System
              </h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-indigo-500/5">
                <img
                  src={project.designSystemImageUrl}
                  alt={`${project.title} design system`}
                  onError={(e) => {
                    // Gracefully handle missing local image paths
                    e.currentTarget.style.display = 'none'
                  }}
                  className="block w-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
