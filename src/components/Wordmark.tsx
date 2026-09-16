import { WORDMARK_CLASS } from '../lib/wordmark'

interface WordmarkProps {
  className?: string
  /** Small mono caption set under the name. */
  caption?: string
}

/**
 * Text wordmark: GELOU in wide-tracked uppercase Inter, pinned to the display
 * optical grade so it stays tight at large sizes.
 *
 * Letter-spacing is added after every glyph including the last, which leaves a
 * trailing gap that makes the block look off-centre next to anything else; the
 * negative right margin cancels exactly that much. Hovering opens the tracking
 * a little further, which is the one piece of movement the mark has.
 *
 * Size and color come from the caller, so the same component serves the nav,
 * the mobile drawer and the footer.
 */
export default function Wordmark({ className = '', caption }: WordmarkProps) {
  return (
    <span className={`inline-flex flex-col items-start gap-1.5 leading-none ${className}`}>
      <span
        className={`${WORDMARK_CLASS} transition-[letter-spacing] duration-500 ease-out group-hover:tracking-[0.46em] motion-reduce:transition-none`}
      >
        Gelou
      </span>

      {caption && (
        <span className="text-eyebrow-sm text-slate-400 dark:text-slate-500">{caption}</span>
      )}
    </span>
  )
}
