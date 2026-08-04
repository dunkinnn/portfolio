import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

// Contact section, form submission wiring comes in a later phase.
export default function Contact() {
  return (
    <Section
      id="contact"
      fullBleed
      className="border-t border-slate-200 bg-slate-50 text-center transition-colors duration-300 dark:border-white/5 dark:bg-slate-900"
    >
      <SectionHeading className="flex flex-col items-center">Contact</SectionHeading>
      <Reveal delay={120}>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
          Reach me at{' '}
          <a
            href="mailto:you@example.com"
            className="group relative inline-block text-slate-900 transition-colors duration-300 hover:text-cyan-600 dark:text-slate-50 dark:hover:text-cyan-300"
          >
            you@example.com
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:scale-x-110"
            />
          </a>
          .
        </p>
      </Reveal>
    </Section>
  )
}
