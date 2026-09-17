import { useSyncExternalStore } from 'react'

// Minimal client-side router for the few full pages this site has, without
// pulling in react-router. Uses real paths (/skills, /project, ...) instead
// of #/hash routes so they work as normal shareable, refreshable URLs -
// vercel.json rewrites any unmatched path back to index.html so a direct
// visit or refresh lands here instead of 404ing.
//
// Distinct from the in-page section anchors (#about, #contact, ...), which
// are left alone to the browser's default same-page hash-scroll behavior.
//
// The listeners live at module scope rather than inside the hook, so several
// components can read the route at once. Per-hook listeners meant every extra
// caller intercepted the same click and pushed its own history entry, which
// took one Back press per mounted caller to undo.

// Routes are compared with ===, so a trailing slash would miss every one of
// them and land on the home page instead. The build emits each route as a
// directory index, which is exactly the shape that invites a trailing slash,
// so it is stripped once here rather than at each comparison.
function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

function samePath(a: string, b: string) {
  return normalize(a) === normalize(b)
}

let currentPath = normalize(window.location.pathname)
const subscribers = new Set<() => void>()
let listening = false

function emit(rawNext: string) {
  const next = normalize(rawNext)
  if (next === currentPath) return
  currentPath = next
  subscribers.forEach((notify) => notify())
}

// Back/forward browser navigation.
function onPopState() {
  emit(window.location.pathname)
}

// Intercept clicks on same-origin links so page-to-page navigation is
// instant (no full reload) - same-page section anchors are left untouched.
function onClick(e: MouseEvent) {
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
  emit(url.pathname)

  if (url.hash) {
    // Wait for the new page to render before scrolling to the target.
    requestAnimationFrame(() => {
      document.getElementById(url.hash.slice(1))?.scrollIntoView()
    })
  } else {
    window.scrollTo(0, 0)
  }
}

// Attached on the first subscriber and left in place for the app's lifetime;
// there is always at least one route reader mounted.
function subscribe(notify: () => void) {
  if (!listening) {
    listening = true
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
  }

  subscribers.add(notify)
  return () => {
    subscribers.delete(notify)
  }
}

function getSnapshot() {
  return currentPath
}

/** Returns the current pathname, re-rendering on navigation. */
export function useRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
