import { Code2 } from 'lucide-react'

interface CodeToken {
  text: string
  className: string
}

interface CodeLine {
  indent?: number
  tokens: CodeToken[]
}

// Hand-picked editor-theme colors (not the site's monochrome tokens) so
// the code card reads as an actual syntax-highlighted snippet.
const CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { text: 'const ', className: 'text-[#c792ea]' },
      { text: 'stack ', className: 'text-slate-200' },
      { text: '= ', className: 'text-slate-500' },
      { text: '[', className: 'text-slate-500' },
      { text: "'React'", className: 'text-[#c3e88d]' },
      { text: ', ', className: 'text-slate-500' },
      { text: "'Flutter'", className: 'text-[#c3e88d]' },
      { text: '];', className: 'text-slate-500' },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: 'export default function ', className: 'text-[#c792ea]' },
      { text: 'Angelou', className: 'text-[#82aaff]' },
      { text: '() {', className: 'text-slate-500' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'return ', className: 'text-[#c792ea]' },
      { text: '<FullStackDev', className: 'text-[#89ddff]' },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: 'design', className: 'text-[#f78c6c]' },
      { text: '="UI/UX" ', className: 'text-[#c3e88d]' },
      { text: 'code', className: 'text-[#f78c6c]' },
      { text: '="clean" ', className: 'text-[#c3e88d]' },
      { text: '/>;', className: 'text-[#89ddff]' },
    ],
  },
  { tokens: [{ text: '}', className: 'text-slate-500' }] },
]

/**
 * The hero's right-column visual: a mock design-tool card with a code card
 * tucked under its bottom-right corner, one availability badge on the top
 * edge and one capability pill on the bottom edge.
 *
 * The whole cluster floats as a single unit rather than each piece carrying
 * its own float duration and delay. Independently-timed floats meant the
 * gaps between the pieces changed every frame, so the composition read as
 * loose debris and satellites could drift into one another; moving the
 * animation to the wrapper keeps every offset fixed and the cluster reads
 * as one object. Overhangs are kept inside a 1.5rem margin on each side so
 * nothing spills into the copy column or past the section edge.
 *
 * Purely decorative - aria-hidden and pointer-events-none. The float
 * utility in index.css already no-ops under prefers-reduced-motion.
 */
export default function HeroVisualPanel() {
  return (
    <div
      aria-hidden="true"
      className="animate-float pointer-events-none relative w-full max-w-md px-5"
    >
      {/* Single ambient glow behind the cluster. */}
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-slate-400/10 blur-3xl dark:bg-slate-100/5" />

      {/* ============ DESIGN CARD (anchor) ============ */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:ring-white/10">
        {/* top-edge sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/20" />

        {/* window chrome */}
        <div className="mb-4 flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="ml-1 h-5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* fake nav row - the CTA carries a hovering cursor, standing in for
            a live design-tool session without adding another loose piece */}
        <div className="mb-5 flex items-center justify-between">
          <span className="h-2 w-14 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <span className="h-2 w-7 rounded-full bg-slate-200 dark:bg-slate-800" />
            <span className="h-2 w-7 rounded-full bg-slate-200 dark:bg-slate-800" />
            <span className="relative h-5 w-14 rounded-full bg-slate-900 dark:bg-white">
              <svg
                viewBox="0 0 16 16"
                className="absolute -bottom-1.5 -right-1.5 h-4 w-4 fill-sky-600 stroke-white drop-shadow dark:fill-sky-400 dark:stroke-slate-950"
                strokeWidth="1"
              >
                <path d="M1 1l5.6 13.2 2.1-5.3 5.3-2.1z" />
              </svg>
            </span>
          </div>
        </div>

        {/* fake headline */}
        <div className="mb-2 h-4 w-4/5 rounded-full bg-slate-800 dark:bg-slate-100" />
        <div className="mb-4 h-4 w-3/5 rounded-full bg-slate-300 dark:bg-slate-600" />

        {/* fake paragraph */}
        <div className="mb-1.5 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mb-1.5 h-1.5 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mb-5 h-1.5 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />

        {/* token swatches - the row stops short of the right edge so the
            code card's corner has somewhere to sit without covering them */}
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-slate-900 dark:bg-white" />
          <span className="h-6 w-6 rounded-lg bg-[#F24E1E]" />
          <span className="h-6 w-6 rounded-lg bg-slate-400 dark:bg-slate-500" />
          <span className="h-6 w-6 rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* ============ TOP EDGE: AVAILABILITY BADGE ============
          Pinned to the card's own top-right corner, overlapping the edge by
          half its height so it reads as attached rather than adrift. */}
      <div className="absolute -top-3 right-2 z-20 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95 dark:ring-white/10">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-eyebrow-sm whitespace-nowrap text-slate-700 dark:text-slate-200">
          Available for Work
        </span>
      </div>

      {/* ============ BOTTOM-LEFT: CAPABILITY PILL ============
          One pill, not a stack of two - the second only ever repeated what
          the code card already says. Hidden below xl, where the column is too
          narrow for it and the code card to share the bottom edge. */}
      <div className="absolute -bottom-4 left-0 z-20 hidden items-center gap-2 xl:flex rounded-full border border-slate-200/80 bg-white/95 py-1.5 pl-1.5 pr-3.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95 dark:ring-white/10">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 dark:bg-white">
          <Code2 className="h-3 w-3 text-white dark:text-slate-950" strokeWidth={2} />
        </span>
        <span className="text-eyebrow-sm whitespace-nowrap text-slate-700 dark:text-slate-200">
          Design + Build
        </span>
      </div>

      {/* ============ BOTTOM-RIGHT: CODE CARD ============
          Overlaps the design card's corner squarely instead of sitting at an
          angle, so the two cards read as a deliberate stack. */}
      <div className="absolute -bottom-10 -right-5 z-10 w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-3.5 font-mono text-[10px] leading-relaxed shadow-2xl ring-1 ring-white/5">
        {/* top-edge sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative mb-3 flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-eyebrow-sm truncate text-slate-400">Full-Stack</span>
        </div>

        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre"
            style={{ paddingLeft: `${(line.indent ?? 0) * 0.9}rem` }}
          >
            {line.tokens.length === 0
              ? ' '
              : line.tokens.map((token, j) => (
                  <span key={j} className={token.className}>
                    {token.text}
                  </span>
                ))}
          </div>
        ))}
      </div>
    </div>
  )
}
