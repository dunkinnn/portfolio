interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

/** Eyebrow-style section title with an animated underline accent. */
export default function SectionHeading({
  children,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="mt-2 block h-px w-16 animate-grow-x bg-gradient-to-r from-blue-500 to-cyan-400"
      />
    </div>
  )
}
