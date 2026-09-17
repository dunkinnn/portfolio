import { motion } from 'framer-motion'
import { ProjectCard } from '../sections/Projects'
import { projects } from '../data/projects'
import { stagger, useRiseVariant } from '../lib/motion'
import { PAGE_SHELL } from '../lib/pageShell'

// Standalone page at /projects, linked from the Projects section's "All
// projects" link - same pattern as Skills' "View all" -> /skills. Lists
// every project at once (each card still links to its own /project/<slug>
// detail page), reusing ProjectCard so cards look identical to the home
// page grid.
export default function AllProjectsPage() {
  const item = useRiseVariant()

  return (
    <div className={PAGE_SHELL}>
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:px-8 lg:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          All Projects
        </h1>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          Everything I have built, in one place.
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item} className="h-full">
              <ProjectCard {...project} className="h-full w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
