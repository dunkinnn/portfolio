interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  /** Two-digit index, e.g. "01" - renders as a small badge beside the label. */
  number?: string
}

/** Eyebrow-style section title, optionally preceded by a numbered badge. */
export default function SectionHeading({
  children,
  className = '',
  number,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {number && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-blue-500/30 font-mono text-[11px] font-medium text-blue-600 dark:border-blue-400/40 dark:text-blue-400">
            {number}
          </span>
        )}
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {children}
        </h2>
      </div>
    </div>
  )
}
