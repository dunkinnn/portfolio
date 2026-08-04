import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { revealClasses } from '../lib/reveal'
import { useScrollReveal } from '../lib/useScrollReveal'

interface Project {
  title: string
  description: string
  stack: string
}

const projects: Project[] = [
  { title: 'Project One', description: 'Placeholder description - problem, role, outcome.', stack: 'React, TypeScript' },
  { title: 'Project Two', description: 'Placeholder description - problem, role, outcome.', stack: 'React, TypeScript' },
  { title: 'Project Three', description: 'Placeholder description - problem, role, outcome.', stack: 'React, TypeScript' },
]

// Case-study grid, replace placeholder entries with real projects.
export default function Projects() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <Section
      id="projects"
      fullBleed
      className="border-t border-slate-200 bg-white transition-colors duration-300 dark:border-white/5 dark:bg-slate-950"
    >
      <SectionHeading>Projects</SectionHeading>
      <div ref={ref} className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.title}
            style={{ transitionDelay: `${index * 110}ms` }}
            className={`${revealClasses(isVisible)} group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-900/70`}
          >
            {/* Soft glow that fades in on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <h3 className="font-medium text-slate-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-slate-50 dark:group-hover:text-cyan-300">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
              {project.stack}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
