export type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

export const hiddenByDirection: Record<Direction, string> = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  none: 'scale-[0.98]',
}

export const shownState = 'opacity-100 translate-x-0 translate-y-0 scale-100'

/** Shared transition classes so reveals feel identical everywhere. */
export const revealTransition =
  'transition-[opacity,transform,color,background-color,border-color] duration-700 ease-out motion-reduce:transition-none'

/** Builds the class string for an element that reveals on scroll. */
export function revealClasses(isVisible: boolean, direction: Direction = 'up') {
  return `${revealTransition} ${
    isVisible ? shownState : `opacity-0 ${hiddenByDirection[direction]}`
  }`
}
