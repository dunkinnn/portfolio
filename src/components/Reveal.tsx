import { useScrollReveal } from '../lib/useScrollReveal'
import { revealClasses, type Direction } from '../lib/reveal'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Direction the element travels from as it fades in. */
  direction?: Direction
  /** Delay in milliseconds, useful for staggering siblings. */
  delay?: number
}

/**
 * Fades and slides its children in the first time they scroll into view.
 * Falls back to fully visible when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${revealClasses(isVisible, direction)} ${className}`}
    >
      {children}
    </div>
  )
}
