import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { stagger, useRiseVariant } from '../lib/motion'
import { projects } from '../data/projects'
import { useRoute } from '../lib/useRoute'

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

  // Only the full write-up goes in the body. The old fallback to
  // `description` printed the same sentence twice now that the header
  // carries it as the lead.
  const paragraphs = project.story ?? []

  // Status, then whatever the project adds, then Type - pulled out of the body
  // so the write-up keeps a readable measure instead of running the full page
  // width. A list value renders one line per entry.
  const meta = [
    { label: 'Status', value: project.status },
    ...(project.details ?? []),
    { label: 'Type', value: project.eyebrow },
  ].filter(
    (row): row is { label: string; value: string | string[] } =>
      Array.isArray(row.value) ? row.value.length > 0 : Boolean(row.value),
  )

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-28 sm:px-8 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* A case study is the one page nested under a nav destination, so
              it gets a way back up to the listing. */}
          <motion.div variants={item}>
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 py-2 pl-3 pr-4 text-eyebrow-sm text-slate-600 backdrop-blur-sm transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All projects
            </a>
          </motion.div>

          {/* ================= HEADER ================= */}

          <motion.h1
            variants={item}
            className="mt-8 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl dark:text-white"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-500 dark:text-slate-400"
          >
            {project.description}
          </motion.p>

          {/* ================= BODY =================
              Cover, write-up and any design-system sheet share one column,
              with the meta rail beside them. Every cover is 1500x1000, so at
              this column width the image lands around 500px tall instead of
              the ~700px it filled when it spanned the whole container and
              pushed the write-up off the first screen. */}

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
            <div className="min-w-0">
              {/* The placeholder box needs a fixed height (aspect-[3/2],
                  matching the real covers) since it has no intrinsic size. */}
              <motion.div
                variants={item}
                className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-indigo-500/5 ${project.imageUrl ? '' : 'aspect-[3/2]'}`}
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
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(163,163,163,0.16),transparent_60%)]" />
              </motion.div>

              {paragraphs.length > 0 && (
                <motion.div
                  variants={item}
                  className="mt-12 max-w-[68ch] space-y-5 text-base leading-relaxed text-slate-600 lg:text-lg dark:text-slate-400"
                >
                  {paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </motion.div>
              )}

              {/* ================= BEFORE / AFTER ================= */}

              {project.beforeAfter && (
                <motion.div variants={item} className="mt-16">
                  <h2 className="text-eyebrow text-slate-400 dark:text-slate-600">
                    Before &amp; after
                  </h2>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6">
                    {(
                      [
                        { label: 'Before', src: project.beforeAfter.before },
                        { label: 'After', src: project.beforeAfter.after },
                      ] as const
                    ).map((shot) => (
                      <figure key={shot.label} className="m-0">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60">
                          <img
                            src={shot.src}
                            alt={`${project.title}, ${shot.label.toLowerCase()} the redesign`}
                            onError={(e) => {
                              // Gracefully handle missing local image paths
                              e.currentTarget.style.display = 'none'
                            }}
                            className="block w-full"
                          />
                        </div>
                        <figcaption className="text-eyebrow-sm mt-3 text-slate-400 dark:text-slate-600">
                          {shot.label}
                        </figcaption>
                      </figure>
                    ))}
                  </div>

                  {project.beforeAfter.caption && (
                    <p className="mt-5 max-w-[68ch] text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.beforeAfter.caption}
                    </p>
                  )}
                </motion.div>
              )}

              {project.designSystemImageUrl && (
                <motion.div variants={item} className="mt-16">
                  <h2 className="text-eyebrow text-slate-400 dark:text-slate-600">Design System</h2>
                  <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-indigo-500/5">
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
            </div>

            {/* ================= META RAIL ================= */}

            <motion.aside variants={item} className="lg:sticky lg:top-28 lg:self-start">
              {/* Deployed site. Rendered as a dashed, non-interactive chip
                  until there is a url - a "Visit site" button that goes
                  nowhere is worse than saying it is not up yet. */}
              {project.live && (
                <div className="mb-6">
                  {project.live.status === 'live' ? (
                    <a
                      href={project.live.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                      Visit site
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="text-eyebrow-sm inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-slate-400 dark:border-slate-700 dark:text-slate-500">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      Live site coming soon
                    </span>
                  )}
                </div>
              )}

              <dl className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800/80 dark:border-slate-800/80">
                {meta.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-eyebrow-sm text-slate-400 dark:text-slate-600">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm font-medium text-slate-900 dark:text-slate-200">
                      {Array.isArray(row.value)
                        ? row.value.map((entry) => (
                            <span key={entry} className="block">
                              {entry}
                            </span>
                          ))
                        : row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {project.tags.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-eyebrow-sm text-slate-400 dark:text-slate-600">Stack</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] tracking-tight text-slate-600 dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
