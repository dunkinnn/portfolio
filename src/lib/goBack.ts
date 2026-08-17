import type { MouseEvent } from 'react'

// Click handler for "Back to home" links. Uses real browser back navigation
// instead of pushing a new /#hero entry, so returning from a sub-page
// restores the scroll position the home page was left at (e.g. mid-way
// through Projects) rather than always jumping to the hero section at top.
export function goBack(e: MouseEvent) {
  e.preventDefault()
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = '/'
  }
}
