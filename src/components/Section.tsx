import { useScrollReveal } from '../lib/useScrollReveal'
import { revealClasses, type Direction } from '../lib/reveal'

interface SectionProps {
  id: string
  className?: string
  children: React.ReactNode
  /** Set false for sections that manage their own animations (e.g. Hero). */
  reveal?: boolean
  direction?: Direction
  /**
   * Let the section background span the full viewport width while keeping
   * the content itself inside the shared max-width column.
   */
  fullBleed?: boolean
  /** Overrides the inner content column on full-bleed sections. */
  contentClassName?: string
}

// Shared wrapper for consistent section spacing and max width.
export default function Section({
  id,
  className = '',
  children,
  reveal = true,
  direction = 'up',
  fullBleed = false,
  contentClassName = 'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10',
}: SectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  // Full-bleed sections drop the max width so their background reaches the
  // viewport edges; the inner wrapper restores the column for the content.
  const base = fullBleed
    ? `w-full scroll-mt-28 py-20 ${className}`
    : `mx-auto w-full max-w-5xl scroll-mt-28 px-6 py-20 ${className}`

  // Deliberately not `relative`, so absolutely positioned children still
  // resolve against the outer section and can cover the full bleed area.
  const content = fullBleed ? (
    <div className={contentClassName}>{children}</div>
  ) : (
    children
  )

  if (!reveal) {
    return (
      <section id={id} className={base}>
        {content}
      </section>
    )
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`${base} ${revealClasses(isVisible, direction)}`}
    >
      {content}
    </section>
  )
}
