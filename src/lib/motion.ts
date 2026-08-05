import { useReducedMotion } from 'framer-motion'

/** Shared easing curve so every entrance on the site decelerates the same way. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Reveals children one after another rather than as a single block. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/** Standard fade-and-rise entrance for a single element. */
export const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Same entrance but without travel, for prefers-reduced-motion. */
export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

/**
 * Picks `rise` normally, or `fade` when the user has asked for reduced motion,
 * so every section only has to write this check once.
 */
export function useRiseVariant() {
  const reduced = useReducedMotion()
  return reduced ? fade : rise
}
