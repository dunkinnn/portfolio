/**
 * Outer wrapper for the standalone routes (/projects, /skills, /experience).
 * The gradient is the one the Contact section paints, lifted here so the
 * sub-pages share one background instead of each repeating the class list -
 * change it once and every page follows.
 *
 * Contact keeps painting its own, because on the home page it has to start
 * where that section starts rather than at the top of the document.
 */
export const PAGE_SHELL =
  'min-h-screen w-full bg-gradient-to-b from-blue-50/80 via-white to-slate-50 ' +
  'text-slate-600 antialiased transition-colors duration-300 ' +
  'dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 dark:text-slate-300'
