import { useEffect, useRef, useState } from 'react'

interface ScrollRevealOptions {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number
  /** Margin around the root, e.g. '0px 0px -10% 0px' to trigger slightly early. */
  rootMargin?: string
  /** Reveal only the first time the element enters the viewport. */
  once?: boolean
}

/** True when the browser can't animate, or the user asked it not to. */
function shouldSkipAnimation() {
  if (typeof window === 'undefined') return true
  if (typeof IntersectionObserver === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Observes an element and reports whether it has scrolled into view.
 * Elements start visible when the user prefers reduced motion or when
 * IntersectionObserver is unavailable, so content is never hidden.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(shouldSkipAnimation)

  useEffect(() => {
    const node = ref.current
    if (!node || shouldSkipAnimation()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
