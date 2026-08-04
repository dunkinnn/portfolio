import { useTheme } from '../lib/useTheme'

/** Sun/moon switch that flips the root `dark` class. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`group relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition duration-300 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white ${className}`}
    >
      {/* Sun - visible in dark mode, offering the switch to light */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 opacity-0 transition-all duration-300 motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>

      {/* Moon - visible in light mode */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-[18px] w-[18px] rotate-0 scale-100 opacity-100 transition-all duration-300 motion-reduce:transition-none dark:-rotate-90 dark:scale-0 dark:opacity-0"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}
