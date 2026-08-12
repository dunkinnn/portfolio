import { useEffect, useState } from 'react'

// Minimal client-side router for the few full pages this site has, without
// pulling in react-router. Uses real paths (/skills, /project, ...) instead
// of #/hash routes so they work as normal shareable, refreshable URLs -
// vercel.json rewrites any unmatched path back to index.html so a direct
// visit or refresh lands here instead of 404ing.
//
// Distinct from the in-page section anchors (#about, #contact, ...), which
// are left alone to the browser's default same-page hash-scroll behavior.

function samePath(a: string, b: string) {
  return a.replace(/\/$/, '') === b.replace(/\/$/, '')
}

/** Returns the current pathname, re-rendering on navigation. */
export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  // Back/forward browser navigation.
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Intercept clicks on same-origin links so page-to-page navigation is
  // instant (no full reload) - same-page section anchors are left untouched.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const isCurrentPage = samePath(url.pathname, window.location.pathname)
      if (isCurrentPage && url.hash) return // same-page anchor, let the browser scroll
      if (isCurrentPage && !url.hash) return // link to exactly where we are

      e.preventDefault()
      window.history.pushState(null, '', url.pathname + url.hash)
      setPath(url.pathname)

      if (url.hash) {
        // Wait for the new page to render before scrolling to the target.
        requestAnimationFrame(() => {
          document.getElementById(url.hash.slice(1))?.scrollIntoView()
        })
      } else {
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return path
}
