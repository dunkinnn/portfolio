import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { revealClasses } from '../lib/reveal'
import { useScrollReveal } from '../lib/useScrollReveal'

const skills = ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Node.js']

// Tech stack list, edit to match your actual skills.
export default function Skills() {
  const { ref, isVisible } = useScrollReveal<HTMLUListElement>()

  return (
    <Section
      id="skills"
      fullBleed
      className="border-t border-slate-200 bg-slate-50 transition-colors duration-300 dark:border-white/5 dark:bg-slate-900"
    >
      <SectionHeading>Skills</SectionHeading>
      <ul ref={ref} className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <li
            key={skill}
            style={{ transitionDelay: `${index * 70}ms` }}
            className={`${revealClasses(isVisible)} rounded-full border border-slate-200 bg-white px-4 py-1 text-sm text-slate-600 hover:border-cyan-500/40 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:bg-slate-950 dark:hover:text-slate-100`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  )
}
