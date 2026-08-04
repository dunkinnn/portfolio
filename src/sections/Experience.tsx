import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { revealClasses } from '../lib/reveal'
import { useScrollReveal } from '../lib/useScrollReveal'

interface Role {
  title: string
  company: string
  period: string
  summary: string
}

const roles: Role[] = [
  {
    title: 'Role Title',
    company: 'Company',
    period: '20XX - Present',
    summary: 'Placeholder summary of responsibilities and impact.',
  },
]

// Work history, replace with real roles.
export default function Experience() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <Section
      id="experience"
      fullBleed
      className="border-t border-slate-200 bg-white transition-colors duration-300 dark:border-white/5 dark:bg-slate-950"
    >
      <SectionHeading>Experience</SectionHeading>
      <div
        ref={ref}
        className="mt-8 space-y-8 border-l border-slate-200 pl-6 dark:border-white/10"
      >
        {roles.map((role, index) => (
          <div
            key={role.title + role.company}
            style={{ transitionDelay: `${index * 120}ms` }}
            className={`${revealClasses(isVisible, 'left')} group relative`}
          >
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full border border-slate-300 bg-white transition-all duration-300 group-hover:border-cyan-500 group-hover:bg-cyan-400/80 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] dark:border-slate-700 dark:bg-slate-950 dark:group-hover:border-cyan-400 dark:group-hover:shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            />
            <h3 className="font-medium text-slate-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-slate-50 dark:group-hover:text-cyan-300">
              {role.title} <span className="text-slate-500">- {role.company}</span>
            </h3>
            <p className="text-sm text-slate-500">{role.period}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{role.summary}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
