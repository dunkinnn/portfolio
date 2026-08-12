import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { ProjectCard } from '../sections/Projects'
import { projects } from '../data/projects'
import { stagger, useRiseVariant } from '../lib/motion'

// Standalone page at /projects, linked from the Projects section's "All
// projects" link and from every project card - same pattern as Skills'
// "View all" -> /skills. Lists every project at once, reusing ProjectCard
// so cards look identical to the home page grid.
export default function AllProjectsPage() {
  const item = useRiseVariant()

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <a
          href="/#hero"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </a>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
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
              <ProjectCard {...project} className="h-full w-full" fullDescription />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
