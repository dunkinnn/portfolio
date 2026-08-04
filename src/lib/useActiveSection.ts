import { useEffect, useState } from 'react'

/**
 * Reports which section id is currently crossing the middle of the viewport.
 * Returns an empty string while the user is above the first tracked section.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (!nodes.length) return

    // A thin band across the middle of the viewport, so exactly one section
    // is normally intersecting at a time.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}
