import { useSyncExternalStore } from 'react'

// Minimal client-side "router" for the one full page this site has, without
// pulling in react-router for a single route. Distinct from the in-page
// section anchors (#about, #projects, ...) by using a leading slash
// (#/skills) - so normal anchor scrolling is unaffected.
function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getSnapshot() {
  return window.location.hash
}

/** Returns the current URL hash, re-rendering on change. */
export function useHashRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, () => '')
}
