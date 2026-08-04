
# Activity log

## 2026-08-04 — Reduced About section height

**Changed** `src/sections/About.tsx`

- Portrait card `aspect-[4/5]` to `aspect-square`. At the current column width the 4:5 ratio
  worked out to roughly 600px tall - well past the bio column's natural height - so the
  section's overall height was being set by the portrait, not the content next to it.
  Square keeps the two columns close to balanced.
- Tightened the stat row and CTA row spacing (`mt-8` to `mt-6`, stat row `py-6` to `py-5`).

## 2026-08-04 — Matched side margins to the hero across all sections

**Changed** `src/components/Section.tsx`

- Default `contentClassName` changed from `mx-auto w-full max-w-5xl px-6` to
  `mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10` — the same value Hero.tsx already passed
  explicitly. Every full-bleed section (About, Skills, Projects, Experience, Contact) reads
  this default, so they all now share the hero's column width and side padding at every
  breakpoint instead of each maxing out at a narrower 5xl.

**Changed** `src/sections/About.tsx`

- Removed its own `contentClassName="mx-auto w-full max-w-5xl px-6"` override, since it now
  matches the shared default and duplicating it would drift out of sync later.

## 2026-08-04 — Removed redundant hero bio

**Changed** `src/sections/Hero.tsx`

- Removed the bio paragraph ("I'm Angelou Bulauan, a Full Stack Web & Mobile Developer...").
  The same introduction now lives in the About section immediately below, so it was repeated
  on first scroll.

## 2026-08-04 — About section redesign

**Rewrote** `src/sections/About.tsx`

- Two-column layout: a portrait card (`lg:col-span-5`) and bio/stats/CTA (`lg:col-span-7`),
  stacking to one column below `lg`. Previously a single placeholder sentence.
- Portrait is a placeholder card matching the hero's project-preview pattern: giant translucent
  monogram, radial tint, "your photo here" label in the same mono/border style. Swap the div for
  an `<img>` once a real photo exists.
- Floating "Open to freelance work" badge overlaps the portrait's bottom-left corner, same pill
  shape and pulsing dot as the hero's availability pill.
- Bio copy, the three stats (5+ years / 20+ projects / 2 disciplines) and the résumé link are
  all placeholder content, marked with comments - replace with real figures and an actual
  résumé href.
- Entrance animation mirrors Hero.tsx's pattern: `useReducedMotion` picks between a `rise` and
  `fade` variant, right column staggers via Framer Motion `variants`, portrait animates in
  separately from the left. Uses `whileInView` rather than the `useScrollReveal`-based `Reveal`
  component Hero doesn't use either, so `reveal={false}` is passed to `Section`.
- `contentClassName` kept at the shared `max-w-5xl px-6` rather than widening the container, so
  About's column stays the same width as Skills/Projects/Experience/Contact below it.

## 2026-08-04 — Mobile and tablet nav

**Changed** `src/components/Nav.tsx`

- Inline links moved from `md:flex` to `lg:flex`. At 768-1023px four labels including
  "Tools & Workflow" were too cramped, so tablets now get the panel as well.
- Menu button is `lg:hidden`, two bars crossing into an X. The transforms are written as
  arbitrary `[transform:...]` values rather than Tailwind translate/rotate utilities, because
  those both set `--tw-translate-y` and the open/closed states would fight over it.
- Panel is an `AnimatePresence` dropdown below the floating shell, matching its radius,
  border and blur. Closes on link click, on Escape, and when a resize crosses the lg breakpoint.
- Contact CTA is hidden below `sm` in the bar and repeated inside the panel, so the bar does
  not overflow on narrow phones.

## 2026-08-04 — Nav drawer moved to the side

**Changed** `src/components/Nav.tsx`

- Replaced the dropdown panel with a right-side drawer: `fixed inset-y-0 right-0`,
  `w-[82vw] max-w-xs`, sliding in on `x` from `100%`. Backdrop is a separate
  `motion.div` at `z-40` with the drawer at `z-50`, both inside the same
  `AnimatePresence` so they animate in and out together.
- Body scroll is locked while open (`document.body.style.overflow = 'hidden'`,
  restored on close) since the drawer now overlays page content rather than
  pushing it down.
- Backdrop click closes the drawer, in addition to the existing Escape key and
  lg-breakpoint-resize handlers.
- Contact link is now pinned to the bottom of the drawer with `mt-auto` and shown
  regardless of viewport width, rather than only appearing below `sm`.

## 2026-08-04 — Contact moved above the links

**Changed** `src/components/Nav.tsx`

- Contact now sits directly under the drawer header, above the nav links, which sit below a
  hairline divider. Replaces the earlier `mt-auto` bottom-pinned placement.

## 2026-08-04 — Hero audit fixes

**Changed** `src/components/WebGLHero.tsx`

- IntersectionObserver on the canvas host flips `frameloop` between `always` and `never`.
  Previously `useFrame` ran at 60fps for the whole session, including while the hero was
  scrolled out of view.

**Changed** `src/sections/Hero.tsx`

- `useReducedMotion` now picks between the `rise` and a new `fade` variant, so the entrance
  no longer travels for users who asked for less motion. It only guarded the card tilt before.
- Pill's `animate-ping` gets `motion-reduce:animate-none`.
- Added GitHub and LinkedIn links to the action row, inline SVG with `aria-label` and
  `rel="noreferrer noopener"`. Placeholder hrefs - swap for real profiles.
- Added a scroll cue anchored to `#about`. Positioned `absolute` so it pins to the fold
  instead of adding height and re-triggering the overflow problem.
- Dropped `text-balance` from the `h1`. It was a no-op once the headline was split into two
  `block` spans - there is nothing to balance across a forced line break.
- Removed `animate-pulse` from the preview placeholder; the shimmer already carries it, and
  two competing loops read as a broken loading state.

**Changed** `src/index.css`

- Added the `scroll-cue` keyframes and utility.

## 2026-08-04 — Dark and light mode

**Added** `src/lib/useTheme.ts`

- Module-level store read through `useSyncExternalStore`, so Nav and WebGLHero both react to a
  toggle without threading a provider through the tree.
- `setTheme` writes the `dark` class on `<html>` and persists to localStorage in a try/catch
  (private mode can throw on write).

**Added** `src/components/ThemeToggle.tsx`

- Sun/moon icons cross-fade with rotate + scale, driven purely by the `dark:` variant.
- Inline SVGs rather than lucide-react, matching the arrow icons already in Hero.

**Changed** `src/index.css`

- `@custom-variant dark (&:where(.dark, .dark *))`. Tailwind v4 defaults the `dark:` variant to
  `prefers-color-scheme`, which cannot be toggled; this rebinds it to the class.
- `html` / `html.dark` set both `background-color` and `color-scheme` so form controls and
  scrollbars follow the theme.

**Changed** `index.html`

- Inline script sets the class before first paint to avoid a flash of the wrong theme. Dark is
  the default; light is opt-in and remembered.

**Changed** `src/components/WebGLHero.tsx`

- New `PALETTE` with per-theme colours, and a `light` flag on the field.
- Light mode switches the particles from `AdditiveBlending` to `NormalBlending`. Additive only
  ever brightens, so on a white background the particles were invisible. Colours darken to
  match, and grid opacity rises from 0.5 to 0.7.

**Changed** everything else

- Nav, App, Hero, About, Projects, Skills, Experience, Contact, Footer, SectionHeading, Logo:
  light values are now the base with `dark:` counterparts, rather than dark-only hardcoded slate.
- Section backgrounds carry `transition-colors duration-300` so toggling fades rather than snaps.

## 2026-08-04 — Cursor-reactive gridlines

**Changed** `src/components/WebGLHero.tsx`

- Added a fullscreen plane with its own grid shader, rendered behind the particles
  (`renderOrder: -1`, `z: -0.01`) inside the same group.
- The grid material is handed the *same* uniforms object as the particle material, so
  `uMouse`, `uAspect` and `uRadius` are shared by reference. The two layers cannot drift
  out of sync because there is only one set of values.
- Lines are drawn with `fract` + `fwidth` for 1px antialiased edges at 64px cells, matching
  the CSS grid this replaced. Same `pow(1.0 - smoothstep(...), 1.6)` falloff as the particles.
- Grid blends normally (not additive) so it reads as lines rather than glow, except near the
  cursor where it lerps toward `uColorHot`.
- New `gridColor` prop, default `#1e293b` (the previous CSS colour).

**Changed** `src/sections/Hero.tsx`

- Removed the static CSS gridline layer. The dot matrix at `-z-30` is untouched and still
  sits behind the canvas.

## 2026-08-04 — Hero fold, featured project card, nav scrollspy

**Added** `src/lib/useActiveSection.ts`

- IntersectionObserver over the nav's section ids, with `rootMargin: '-45% 0px -50% 0px'`
  so only the section crossing the middle of the viewport is intersecting.
- Returns `''` while above the first tracked section, so nothing is highlighted over the hero.

**Changed** `src/components/Nav.tsx`

- Links now take a persistent underline and `text-white` when their section is active.
  `sectionIds` is derived at module level to keep the hook's dependency array stable.

**Changed** `src/sections/Hero.tsx`

- `min-h-dvh` to `min-h-[88dvh]` and inner padding `py-16` to `py-10`, so the top of the
  next section is visible at the fold rather than the viewport ending on empty background.
- Replaced the `architecture.config.js` card with a featured project card: preview image
  slot, title, outcome line, stack tags, and a "View case study" link to `#projects`.
  Content is placeholder; the preview slot is a plain div to be swapped for an `<img>`.

## 2026-08-04 — WebGL particle hero background

**Added** `src/components/WebGLHero.tsx`

- React Three Fiber `<Canvas>` (orthographic, `zoom: 1`, so world units are CSS pixels).
- Single `THREE.Points` system with a custom `ShaderMaterial`, additive blending, `depthWrite: false`.
- Particle positions live in normalised local space `[-0.5, 0.5]`; the mesh is scaled to
  `viewport.width / viewport.height` each frame, so resizing never rebuilds the geometry.
- Cursor repulsion runs in the vertex shader: distance is aspect-corrected so the influence
  stays circular, with a tangential swirl term and a brightness/size boost near the pointer.
- Pointer is tracked on `window` (not the canvas) because the hero content sits above it.
- Particle count is derived once from the initial canvas area, clamped to 1200–7000.
- `prefers-reduced-motion` disables drift via the `uMotion` uniform; the field renders static.
- Geometry and material are disposed on unmount.

**Changed** `src/sections/Hero.tsx`

- Swapped `<InteractiveBackground />` for `<WebGLHero />`. Same className API and the same
  `absolute inset-0 -z-10` layering, so no other markup changed.
- Added `isolate` to the section className. This was a pre-existing bug: `relative` with
  `z-index: auto` does not create a stacking context, so the `-z-10` / `-z-20` / `-z-30`
  background layers escaped to the root stacking context and painted behind the opaque
  `bg-slate-950` on the App wrapper. The grid, the ambient glow and the particle canvas were
  all invisible. `isolation: isolate` scopes them to the section.

**Removed** `src/components/WebGLHero.jsx` (empty placeholder; project is TypeScript).

### Notes

- `src/components/InteractiveBackground.tsx` is still in the tree but is now unreferenced.
  Its neighbour-linking loop was O(n^2) on the CPU; the shader version drops the lines and
  approximates the effect with a proximity glow instead. Delete it once the new hero is signed off.
- Colours default to `#38bdf8` / `#818cf8` / `#e0f2fe` to match the previous sky-400 palette,
  and are overridable via props.
