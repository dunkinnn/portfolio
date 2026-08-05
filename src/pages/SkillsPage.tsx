import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { skillGroups, SkillPill } from '../data/skills'
import { stagger, useRiseVariant } from '../lib/motion'

// Standalone page at #/skills, linked from the Skills section's "View all".
// Every category laid out at once, unlike the ticker/compact views on the
// home page.
export default function SkillsPage() {
  const item = useRiseVariant()

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </a>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Full Tech Stack
        </h1>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          Comprehensive list of tools and technologies I use.
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-10 space-y-8"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={item}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                {group.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {group.items.map((tech) => (
                  <SkillPill key={tech.label} {...tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
