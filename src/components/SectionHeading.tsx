interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  /** Two-digit index, e.g. "01" - renders beside the label. */
  number?: string
  /** Oversized background word; defaults to the label itself. */
  watermark?: string
}

/**
 * Divider-style section header: a small "01 -- Label" tag layered over an
 * oversized, cropped watermark of the same label. No container background -
 * the label and watermark sit directly on the page. Both the label and the
 * watermark start at the content column's left edge so the heading lines up
 * with the grid underneath it.
 */
export default function SectionHeading({
  children,
  className = '',
  number,
  watermark,
}: SectionHeadingProps) {
  return (
    <div
      className={`relative flex h-24 min-w-0 items-center overflow-hidden sm:h-28 md:h-32 ${className}`}
    >
      {/* Oversized watermark of the section name. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-black uppercase leading-none tracking-[-0.04em] text-slate-900/[0.05] dark:text-white/[0.045]"
        style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
      >
        {watermark ?? children}
      </span>

      {/* Foreground label. */}
      <div className="relative z-10 flex items-center gap-3">
        {number && (
          <span className="text-eyebrow text-emerald-600 dark:text-emerald-400">{number}</span>
        )}
        <span className="h-px w-8 bg-slate-400/60 sm:w-10 dark:bg-slate-600/70" />
        <h2 className="text-eyebrow text-slate-700 dark:text-slate-300">{children}</h2>
      </div>
    </div>
  )
}
