import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

// Module-level store so every consumer re-renders on a toggle without a provider.
const listeners = new Set<() => void>()

let current: Theme =
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSnapshot(): Theme {
  return current
}

export function setTheme(next: Theme) {
  if (next === current) return
  current = next
  document.documentElement.classList.toggle('dark', next === 'dark')
  try {
    localStorage.setItem('theme', next)
  } catch {
    // Storage can be unavailable in private mode; the class still applies.
  }
  listeners.forEach((listener) => listener())
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'dark' as Theme)
  return {
    theme,
    isDark: theme === 'dark',
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }
}
