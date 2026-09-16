/** The wordmark's letters, shared by the Wordmark component and the intro. */
export const WORDMARK_LETTERS = ['G', 'E', 'L', 'O', 'U']

/**
 * Tracking is added after the last letter too, so any block using it needs the
 * same value pulled back off its right edge to stay optically centred.
 */
export const WORDMARK_CLASS =
  "-mr-[0.38em] font-semibold uppercase tracking-[0.38em] [font-variation-settings:'opsz'_32]"
