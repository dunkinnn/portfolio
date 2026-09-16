# Activity log

## 2026-09-16 - Layout, typography and hero cluster pass

Scope: polish pass. `src/components/WebGLHero.tsx` was not touched.

### Typography

- `index.html`: load Inter (variable, 300-900 + italic) and JetBrains Mono from
  Google Fonts, with preconnect.
- `src/index.css`: `--font-sans` / `--font-mono` theme tokens, so Tailwind's
  `font-sans` / `font-mono` and the preflight body face both resolve to them.
- `src/index.css`: base rules for optical sizing, font features, `text-wrap:
  balance` on headings and `text-wrap: pretty` on body copy.
- New `text-eyebrow` and `text-eyebrow-sm` utilities replace the ad-hoc mono
  label styling that was spread across the codebase as eight different
  size/tracking combinations (8px, 9px, 10px, 11px, xs, with four tracking
  values). Applied in Hero, About, Projects, Skills, Experience, Contact,
  Footer, ProjectCard, ProjectPage, SkillsPage, ExperiencePage.
- Hero headline: the old `lg:` clamp capped at 56px while the base clamp
  reached 76px, so the headline shrank as the viewport widened. Replaced with
  one scale that only grows.
- Project card body copy 12px -> 14px, titles 16px -> 18px.

### Layout

- `Section`: default padding `py-20` -> `py-14 md:py-20`; default gutters
  `lg:px-10` -> `lg:px-12`; `scroll-mt-28` -> `scroll-mt-24`.
- About / Projects / Skills / Experience shared one tinted band but carried
  four different padding values (`py-5 md:py-8`, `py-10 md:py-16`,
  `py-6 md:py-10`, `py-10 md:py-16`). All now `py-12 md:py-16`.
- Contact set its padding inside `className`, colliding with `Section`'s own
  default padding class. Moved onto `paddingClassName`.
- Nav and Footer gutters aligned to the same `px-6 sm:px-8 lg:px-12` column.
- The "All projects" / "All Skills" / "View details" links were `items-end`
  against a ~112px heading block, so they sat well below the label they belong
  to. Now `items-center`.
- About's right column used `justify-between` against the portrait's height,
  leaving a dead gap between the copy and the CV row. Now `justify-center`
  with a fixed gap.
- Footer logo was cropped square by `h-8 w-8` + `object-cover`; now
  `h-8 w-auto object-contain`.
- Hero stats centre on mobile (the captions wrap at phone width), left-align
  from `lg`. Eyebrow separator dot hidden below `sm`, where the two roles wrap
  onto separate lines anyway.

### Section headings

- About, Projects, Skills and Experience each carried a private copy of the
  same heading component. All four now use the shared `SectionHeading`, which
  gained an optional `watermark` prop (About's watermark reads "About - Me"
  while its label reads "About").
- Heading label and watermark now start at the content column's left edge; they
  were indented `pl-5 sm:pl-7` / `left-5 sm:left-7` and did not line up with the
  grid underneath.
- Contact was the only section with no heading, so the numbered run stopped at
  04. Added "05 - Contact".

### Hero visual panel

The cluster read as scattered debris: four satellites (mobile card, badge, two
stacked skill pills, code card), each with its own float duration and delay, so
the gaps between the pieces changed every frame and satellites could drift into
one another.

- The wrapper floats as a single unit; the pieces no longer animate
  individually, so every offset between them is fixed.
- Dropped the top-left mobile card (only its corner was ever visible) and the
  second skill pill (it repeated what the code card already says).
- Dropped the cursor's "Angelou" name label, which was positioned to clip
  against the design card's `overflow-hidden` edge.
- Code card: was `w-56` at `-rotate-3` with 10.5px type, which clipped its own
  longest lines at the card border. Now `w-60`, no rotation, 10px type, and
  `overflow-hidden` as a backstop.
- The remaining capability pill is hidden below `xl`, where the column is too
  narrow for it and the code card to share the bottom edge.
- Float amplitude 12px -> 8px.

### Verification

- `tsc -b` clean.
- `eslint src` reports only the two pre-existing errors in `WebGLHero.tsx` and
  `data/skills.tsx`, both untouched by this pass.
- Production build + screenshots checked at 390px, 1024px and 1440px in both
  themes.

Note: `npm run build` cannot run in the Linux side of this session because
`node_modules` holds Windows native binaries (rollup, oxide). Build verified in
a clean Linux copy of `src` instead. Run `npm run build` on Windows as usual.

## 2026-09-16 - Logo replaced with a text wordmark

The blue 3D `logo.png` did not sit with the monochrome, Inter-based design.
Replaced with a typographic mark.

- New `src/components/Wordmark.tsx`: GELOU in wide-tracked (0.38em) uppercase
  Inter, semibold, pinned to the display optical grade. Size and color come
  from the caller. Tracking opens to 0.46em on hover of the enclosing `group`.
- New `src/lib/wordmark.ts` holds the letters and the shared class string.
  These live outside the component file because exporting constants alongside a
  component trips `react-refresh/only-export-components`.
- Letter-spacing applies after the last glyph too, so every block using the mark
  carries `-mr-[0.38em]` to cancel the trailing gap and stay optically flush.
- `Nav` (bar + mobile drawer) and `Footer` now render the wordmark instead of
  `logo.png`. The footer variant carries a "Full-Stack Developer" mono caption
  under the name.
- `IntroLoader` no longer takes `gLogoSrc` / `elouTextSrc`. The reveal is now a
  per-letter stagger, a hairline rule drawing under it, then the role caption
  fading up - same beats and timing as the old two-image reveal.
- Deleted `src/components/Logo.tsx`. It was an unreferenced scribble-path SVG
  and having two logo components would be confusing. Recoverable from git.
- Added `public/favicon.svg`: a monochrome rounded tile with a white G, listed
  ahead of `favicon.png` in `index.html`.

Still carrying the old blue mark, left alone for now:
`public/favicon.png`, `public/apple-touch-icon.png` (also used as the og:image),
and the now-unused `src/assets/logo.png`, `logo1-3.png`, `G.png`, `elou.png`.

## 2026-09-16 - Nav links point at pages

- `links` is now `/projects`, `/skills`, `/experience`. About is gone: it only
  exists as a home page section, which the brand mark leads back to.
- Active state comes from the route instead of scroll position. A project case
  study (`/project/<slug>`) counts as being under Projects. `aria-current` is
  now `"page"` rather than `"true"`.
- `Nav` moved out of the home page branch in `App.tsx` and now renders on every
  route. The sub-pages had no nav of their own, so pointing the nav at them
  would otherwise have made each one a dead end - the only way out was the
  "Back to home" link. Those links are still there; they use real browser back,
  so they restore where you were on the home page.
- The sub-pages' inner container went from `py-16` to `pb-16 pt-28` so their
  content clears the fixed nav, and their gutter now matches the site's
  `lg:px-12`.
- Brand mark is `/#hero` rather than `#hero`, and the Contact CTA (bar and
  drawer) is `/#contact` rather than `#contact`, so both work from a sub-page.
  `/#hero` also avoids a full page reload when clicked on the home page: the
  router deliberately ignores a link to the exact current path with no hash,
  which would have let the browser reload.

### Router fix this required

`useRoute` attached its popstate and click listeners inside the hook, so every
component calling it intercepted the same link click and pushed its own history
entry. With only `App` calling it that was invisible, but `ProjectPage` already
called it too, so leaving a case study took two Back presses. Adding `Nav` as a
third caller would have made it three.

The listeners now live at module scope behind a `useSyncExternalStore`
subscription, installed once on the first subscriber. Verified: from
`/projects` to `/skills`, one Back press returns to `/projects`.

- Deleted `src/lib/useActiveSection.ts`. Nothing uses it now that the nav's
  active state comes from the route. Recoverable from git.

## 2026-09-16 - Removed the "Back to home" links

The nav is on every page now, so the link under each sub-page heading was a
second way to do the same thing.

- Removed from `SkillsPage`, `ExperiencePage`, `AllProjectsPage` and
  `ProjectPage`, along with the `ArrowLeft` and `goBack` imports each one
  carried for it.
- The headings lost the `mt-8` that was only there to clear the link, so each
  page now opens on its `h1` under the nav's `pt-28`.
- Deleted `src/lib/goBack.ts`. That helper existed only for these four links.
  Its trick - real browser back, so returning to the home page restores the
  scroll position rather than jumping to the hero - is now only available via
  the browser's own Back button. Recoverable from git if you want it back.
- `ProjectPage`'s "Back to all projects" link is untouched; that one is the
  recovery path on an unknown slug, not a duplicate of the nav.

## 2026-09-16 - Project case study layout

The template was one flat column at `max-w-7xl`, so on a desktop the write-up
ran ~150 characters per line, the cover image filled 1184px and towered over
everything, and the eyebrow and status badge sat at opposite ends of an
otherwise empty row.

- Container narrowed to `max-w-6xl`; heading `max-w-4xl`, lead `max-w-3xl`.
- Body is now a two-column grid from `lg` up: the write-up capped at `68ch`
  beside a meta rail that sticks at `top-28`. The rail carries Type, Status,
  Focus (the card's `metric`) and the Stack pills, all of which used to sit in
  the main flow. It is first in the DOM and `lg:order-2`, so on a phone the
  stack reads right under the cover and the write-up follows.
- The eyebrow/status row is gone - both values live in the rail now.
- Title up to `text-4xl sm:text-5xl` at the site's display tracking; cover and
  design-system sheet to `rounded-3xl`; design-system sheet sits below the grid
  at full container width.
- Back button ("All projects" -> `/projects`) above the title. The case study is
  the only page nested under a nav destination, so it is the only one that gets
  one; the other sub-pages are top-level nav targets.
- A project with no `story` no longer prints its `description` twice. The old
  fallback put the description in the body as well as the lead, which the new
  header made obvious - the write-up block is simply skipped now.

### Follow-up: cover image size

The cover still spanned the full container at 1056x704 and pushed the write-up
off the first screen. Every cover asset is exactly 1500x1000, so the fix was
structural rather than a crop or a height cap - no letterboxing, nothing
trimmed:

- The cover moved inside the grid's content column, so the meta rail now sits
  beside it instead of below it. The image renders at 766x511 (down from
  1056x704) and the space to its right is used rather than empty.
- The write-up and the design-system sheet share that same column, so the page
  has one left edge and one right edge throughout. Volterra's page went from
  4056px to 3238px tall; Smart Plate's from 1619px to 1419px.
- The placeholder box's `aspect-[2/1]` became `aspect-[3/2]` to match the real
  covers, so a project without a screenshot reserves the right shape.
- The rail is no longer DOM-first: the cover has to come first on a phone. The
  mobile order is now cover, write-up, meta.

## 2026-09-16 - LandKoTo copy

Condensed the three-paragraph write-up into a single-sentence lead and dropped
the long version.

- `description` is now one sentence covering the whole story: what it replaces
  (Excel sheets and paper folders in an assessor's office) and what it adds
  (records, document storage, map, certificates, audit trail).
- `story` removed. `ProjectPage` already skips the write-up block when a project
  has none, so the page is title, lead, cover and the meta rail.
- `description` also feeds the project cards, where it clamps to two lines on
  the home page and shows in full on `/projects`.

Detail that did not survive the cut, in case it should come back somewhere:
the capstone/college-research-group framing, the front end + PHP/MySQL split of
the work, and the three access roles (assessor, support staff, landowner).

## 2026-09-16 - Same treatment for every project

Applied the LandKoTo pattern across the board: each project leads with one
sentence carrying the whole story, and `story` is gone everywhere.

New leads written from each project's own write-up:

- Corn Leaf Detector - offline-first framing, both models named, plus the
  fertilizer recommendation screen the old description left out.
- Smart Plate - leads on "generates the plan rather than logging it", the
  distinction the write-up drew against existing apps.
- Volterra Electric - landing page through to a documented design system. The
  palette/type/component specifics are not lost: the design-system sheet still
  renders under the cover and shows all of it.
- C2WAD - the complete loop, with all seven flows named.
- LandKoTo - unchanged from the previous pass.
- Project Coming Soon - unchanged, still has no story.

Page lengths at 1280px: Corn Leaf 1028px, Smart Plate 980px, C2WAD 980px,
Volterra 2720px (its design-system sheet). Each is now roughly one screen plus
the cover.

`Project.story` stays on the interface and `ProjectPage` still renders it. No
project uses it, so both are currently unexercised - kept deliberately so a
future case study only needs the data, not a template change.

Detail dropped from the write-ups, recoverable from git:

- Corn Leaf: Isabela as the top corn-producing province, the 30-50% yield loss
  figure, symptoms appearing after the correction window, the freelance role
  covering the Flutter app and TFLite model integration.
- Smart Plate: the capstone/college-research-group framing, the Flutter +
  Dart/PostgreSQL split, the named diets (vegetarian, vegan, gluten-free,
  keto), plans not being hand-editable, the admin role over the food database.
- Volterra: the practice-project framing and the exact token values, though the
  sheet still shows the latter.
- C2WAD: the practice-project framing and the plan to formalize its visual
  language into a design system next.

## 2026-09-16 - Project page column matched to the rest of the site

The case study page was the only one at `max-w-6xl`. Every other page - home
sections, nav, footer, and the Skills / Experience / All Projects pages - is
`max-w-7xl`. The gutters were always identical (`px-6 sm:px-8 lg:px-12`); the
narrower container was the whole difference, insetting the content an extra
64px on each side and leaving it out of line with the nav directly above it.

- `ProjectPage` container is now `max-w-7xl`.
- The meta rail went from `14rem` to `18rem` and the column gap from `lg:gap-16`
  to `lg:gap-20`, so the extra container width lands in the rail and the gutter
  rather than in the cover. At 1440 the cover is 814x543, against 766x511
  before - the widening is 6%, not the 15% it would have been.

Verified at 1440: nav mark, hero headline, section headings, project grid,
footer mark and all four sub-pages' content all start at x=128.

## 2026-09-16 - Footer on every page

The footer was rendered inside the home page branch only, so the four sub-pages
just stopped at the end of their content. It now sits in `App.tsx`'s shared
fragment next to `Nav`, after `{page}`.

- It renders outside the page wrappers now, which is where `antialiased` was
  set, so the footer element carries it directly.
- The visitor counter's guard moved from a `useRef` to module scope. The ref was
  per-mount, and the footer remounts on every client-side navigation, so on
  every page it would have counted a fresh visit each time someone moved between
  pages. Verified: the count stays at 1 across three navigations, where the ref
  version would have reached 4.

Verified at 1440: exactly one `<footer>` per route, mark aligned at x=128 on all
five pages, light and dark.
