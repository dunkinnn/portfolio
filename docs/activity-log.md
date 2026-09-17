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

## 2026-09-16 - Footer: filled the centre gap

The brand block was capped at `max-w-sm` inside a wide grid column, which left a
dead strip across the middle of the footer at desktop width.

- Added a "Selected work" column between the brand block and Sitemap: deep links
  to the four real case studies, read from `projects` and filtered on
  `imageUrl`, which is what separates a real project from the coming-soon
  placeholder.
- `Project` gained an optional `shortTitle`, set on the three projects whose
  full titles are too long for a footer column (Corn Leaf Detector, LandKoTo,
  Smart Plate). Falls back to `title`.
- Grid is now four columns across at `lg` so they fill the row evenly, three at
  `sm`, and two on a phone - stacking all three made the footer a very long
  scroll.

Also from this pass, before the gap fix:

- Dropped the oversized GELOU watermark entirely.
- Visit counter restored in the bottom bar. It reads in a lazy `useState`
  initialiser rather than an effect, so there is no second render and no
  `set-state-in-effect` lint suppression; the module-level guard means a client
  side navigation does not count as a new visit. Verified: 3 navigations leave
  it at 1, a reload takes it to 2.

### Footer mark sized up

The footer wordmark went from `text-base` to `text-3xl sm:text-4xl` - 36px at
desktop, 30px on a phone - so it anchors the band as a brand mark rather than
reading as a label. It renders 190px wide in a 331px column, so there is still
room around it. The paragraph under it gained a little air (`mt-4` to `mt-5`).

This is a real element at full opacity, not a return of the oversized watermark
that was dropped earlier.

## 2026-09-16 - Contact channels, form buttons, Home link

- **Book a call removed** from the Contact section's rows and the footer's
  Elsewhere column. `CALENDLY_URL` deleted from `data/contact.ts` since nothing
  referenced it any more, along with the now-unused `Calendar` import.
- **"Call or text" is now WhatsApp**, pointing at `wa.me`. `WHATSAPP_URL` is
  derived from `PHONE_NUMBER` in `data/contact.ts` by stripping non-digits,
  because wa.me rejects the plus sign and spaces. Added a WhatsApp glyph beside
  the existing inline LinkedIn and Facebook marks; the `Phone` import and the
  direct `PHONE_NUMBER` import in Contact went with the old row.
- **Nav gained Home**, pointing at `/#hero` rather than `/`: the router ignores
  a link to the current path with no hash, so a bare `/` would have triggered a
  full page reload from the home page. `isActiveLink` treats any `/#` link as
  owning the home page.

### The form buttons were never going to sit side by side

Send message and Clear Form were laid out with `flex-col xs:flex-row`, and
`xs` is not a breakpoint in this project - Tailwind v4 has no `xs` by default
and the theme never defines one. Every `xs:` variant in `Contact.tsx` was inert,
so the buttons were permanently stacked and the quick-status cards were
permanently one-up. Four `xs:` variants replaced with `sm:`. The buttons now
share a row from 640px up and stack on a phone, which is what that layout
wanted all along.

## 2026-09-17 - Contact page

New route `/contact` rendering `ContactPage`, which reuses the `Contact`
section in full - same form, channels and status cards as the home page.

- `Nav`'s Contact button (bar and drawer) and the footer's sitemap link now
  point at `/contact` instead of `/#contact`. The home page still carries the
  section at `#contact`, so that anchor keeps working for anyone scrolling.
- The section carries a divider-style `h2` ("05 - Contact"), which left the
  route with no `h1`. Added a visually hidden one so the page has a title for
  screen readers and search engines without changing what the section looks
  like. The other sub-pages have a real `h1`; this one is a stand-in.
- Wrapper padding `pt-20` puts the section's top border below the 61px nav
  rather than tucked under it.

Known trade-offs, accepted deliberately when choosing to keep both copies:

- The same content now lives at `/contact` and `/#contact`. Search engines read
  that as duplicate content. A `<link rel="canonical">` would settle it, but
  this is a client-rendered SPA with no per-route head management, so it needs
  either runtime head updates or prerendering.
- The "05" in the heading refers to the home page's numbered section run
  (01 About ... 05 Contact), which does not exist on a standalone page. Left as
  is because the ask was to keep the section in full.

### Fix: black band across the top of /contact

The `pt-20` wrapper I used to push the section clear of the fixed nav was
showing 80px of the page background above it. Sampled at x=720: rgb(15,15,15)
down to y~70, then the section's gradient starting at rgb(29,29,29) - the page
is slate-950 (#101010) and the section's dark gradient starts at slate-900
(#1e1e1e), so the gap read as a black stripe under the nav.

Nav clearance now comes from inside the section instead. `Contact` takes an
optional `paddingClassName` (defaulting to the `py-16 md:py-24` it always had),
and `/contact` passes `pb-16 pt-32 md:pb-24 md:pt-36`. The gradient runs to the
very top of the page, under the translucent nav, with no exposed background.
Section top is now 0 and the heading sits at 202px, well clear of the 61px bar.

## 2026-09-17 - Helix Group replaces the placeholder

The `Project Coming Soon` entry is gone; the Helix Group site takes its slot at
the front of the list.

- `src/assets/helix-cover.png` - the supplied mockup, already 1500x1000 to match
  every other cover, flattened RGBA to RGB (1.25MB).
- Entry: slug `/project/helix-group`, eyebrow `Web Design`, status
  `Client project`, focus `Redesign + SEO`, stack UI/UX Design / Wix / HTML /
  CSS / SEO Optimization.
- Description written from what the user confirmed (redesign plus SEO setup,
  Wix with custom HTML and CSS, live client work) and what the mockup itself
  shows (Sydney construction firm; services, portfolio and testimonials pages).
- No `project coming soon` placeholder renders anywhere now.

Knock-on: the footer's Selected work column takes the first four projects with a
cover, so Helix Group entering the list pushed Volterra Electric out of it.

Still open: it is live client work with no link on the site. `Project` has no
`liveUrl` field yet, so there is nowhere to put the URL.

## 2026-09-17 - Helix Group before / after

`Project` gained an optional `beforeAfter: { before, after, caption? }` - one
object rather than two loose fields, so a lone "before" with no "after" cannot
be expressed. `ProjectPage` renders it between the write-up and the
design-system sheet: two equal figures side by side from `sm` up, labels
underneath, stacked on a phone, with the caption capped at 68ch.

- `src/assets/helix-before.png` - the supplied old-site mockup, already
  1500x1000 and composed the same way as the new one, so the pair compares
  like for like rather than a flat screenshot against an angled mockup.
- `after` reuses `helixCover`, so the new-site shot is stored once.
- Caption describes only what both images actually show: dark palette to light,
  company name in the hero replaced by what the firm does, dense paragraphs and
  a plain services list broken into scannable sections.

Verified at 1440 and 390, both themes: both images load, labels read
Before / After, figures share a row at 396px each on desktop and stack on
mobile, alt text distinguishes the two.

Note on weight: the two Helix mockups are 2.6MB of PNG between them, on top of
the other five covers. Worth converting the covers to WebP or JPEG before this
ships anywhere that matters - the case study pages pull a full-size PNG each.

## 2026-09-17 - Live site link

`Project` gained an optional `live` field, typed as a discriminated union:

    live?: { status: 'live'; url: string } | { status: 'coming-soon' }

A union rather than an optional `url` beside a status flag, so a 'live' entry
without a url is not expressible - that is the shape that ships a dead "Visit
site" button.

Rendered at the top of the case study's meta rail, above Type/Status/Focus:

- `status: 'live'` - a solid "Visit site" button opening in a new tab.
- `status: 'coming-soon'` - a dashed, non-interactive `span` reading "Live site
  coming soon". Deliberately not an anchor, so there is nothing to click and
  no dead href in the markup.

Helix Group is set to `coming-soon` pending deployment. Swap to
`{ status: 'live', url: '...' }` when it is up; nothing else needs touching.

Verified: the control renders as a SPAN, not a link; the page has zero dead
links; projects without a `live` field show no control at all.

## 2026-09-17 - Helix eyebrow, and a card header that could not take a long one

Helix Group's eyebrow is now `Web Design & Development` (was `Web Design`). It
shows on the card pill and the case study's Type row.

The longer label exposed a latent bug in the card header. That row was
`flex items-center justify-between gap-2` with no wrapping rules, so once the
pill outgrew the space both labels broke mid-phrase - "WEB DESIGN &" /
"DEVELOPMENT" beside "REDESIGN + / SEO". Measured: pill height 34px against the
22px of a single line, at 1440, 1280, 1100, 700 and 390. It only held together
at 900, where the grid happens to give the card more room.

Fixed at the layout rather than by shortening the text: the row is now
`flex-wrap` with `gap-x-2 gap-y-2`, and both the pill and the metric carry
`whitespace-nowrap`. The row wraps as a whole - the metric drops to its own line
when the card is too narrow for both - and neither label ever splits internally.

Verified across 1440/1280/1100/900/700/390: pill height stays 22px everywhere.
The other five cards are untouched (row height 22px, unchanged) since their
eyebrows were always short enough to share the line.

## 2026-09-17 - Removed the metric label

`metric` is gone from `Project` and from all four projects that carried one
(Redesign + SEO, On-device AI, Centralized GIS, Real-time AI).

It fed two places, so both went:

- The card header's green tag, top right.
- The case study meta rail's "Focus" row. The rail is now Type / Status /
  Stack. Worth knowing: the ask named the card labels, and this row used the
  same strings, so it went with them - one line in `ProjectPage` to bring back
  if it was wanted there.

With only the eyebrow pill left in the card header, the flex-wrap row added in
the previous pass had nothing left to wrap, so it was removed and the pill
renders directly. It needed `w-fit`: as a direct child of the card's `flex-col`,
`inline-flex` alone would have stretched it to the full card width. It keeps
`whitespace-nowrap` so a long eyebrow still cannot split mid-phrase.

Verified on /projects: none of the four strings appear anywhere, all six pills
render on one 22px line, and the rail shows only Type and Status.

## 2026-09-17 - Extra meta rows

`Project` gained `details?: { label: string; value: string }[]` - free-form
rows appended after Type and Status in the case study's meta rail. Generic, so
any project can carry its own without another named field each time.

Helix Group now reads Type / Status / Industry / Location / Pages / Stack.

Every added value is either visible in the supplied mockups or already
confirmed, nothing inferred:

- Industry "Construction" - the site's own copy says residential, commercial,
  industrial and renovation construction.
- Location "Sydney, NSW" - printed on the new site and in its hero copy.
- Pages - the six nav destinations, identical across the old and new mockups.

Deliberately NOT added, because they cannot be derived and inventing them on a
client-facing page would be a lie: the year, the project duration, and any
result (traffic, ranking, enquiries). Those are the two or three rows most
likely to win work, so they are worth supplying.

Verified at 1440 and 390: five rows render, values right-aligned, the Pages row
wraps to two lines at the rail's 288px and does not overflow. The other five
projects still show only Type / Status.

### Rail rows settled

Pages and Location removed; a Delivered row added. The Helix rail is now
Type / Status / Industry / Delivered / Stack.

    Type        Web Design & Development
    Status      Client project
    Industry    Construction
    Delivered   Redesign, build & SEO setup

Every row fits on a single 20px line at both 1440 and 390, so nothing wraps.
The `details` field stays generic, so the other projects can take their own
rows whenever there is something to put there.

Still missing, and still the rows most likely to win work: a date and a result.
Neither can be derived from the mockups.
