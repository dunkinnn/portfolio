import { revealClasses } from '../lib/reveal'
import { useScrollReveal } from '../lib/useScrollReveal'

// Simple footer with year, replace with real social links later.
export default function Footer() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <footer
      ref={ref}
      className={`${revealClasses(isVisible)} border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500 transition-colors duration-300 dark:border-white/5 dark:bg-slate-950`}
    >
      &copy; {new Date().getFullYear()} Your Name
    </footer>
  )
}
