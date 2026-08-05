
# Activity log

## 2026-08-05 — Hero's card shrunk back down; section height fixed again

**Changed** `src/components/ProjectCard.tsx`, `src/sections/Hero.tsx`

- The redesigned `ProjectCard` (taller `aspect-[16/10]` image, icon badge,
  tags row, CTA row) made Hero's card noticeably taller than before, which
  grew the section past the viewport and pushed/overlapped the next
  section - same failure mode fixed earlier this project under a different
  cause. Added a `compact` prop to `ProjectCard` (shorter `aspect-[2/1]`
  image, `p-4` instead of `p-5`, icon badge hidden, smaller title, tighter
  spacing) and passed it from Hero's usage only - the Projects grid keeps
  the full-size card.
- Also reapplied the section-height fix from earlier in the project:
  `min-h-dvh` -> `min-h-[88dvh]` and the layout wrapper's `pt-16` -> `pt-10`,
  so there's headroom before the card's height can push the section past
  the fold again.

## 2026-08-05 — ProjectCard redesigned with more visual polish

**Changed** `src/components/ProjectCard.tsx`

- The plain version (basic border, flat tag pills) read as an unstyled
  data dump per user feedback. Rebuilt it with the interactive/visual
  language already used elsewhere on the site: cursor-tracked spotlight +
  tilt-on-hover (same pattern as Hero used to have), an always-on ambient
  corner glow that brightens on hover, a gradient icon badge (sky-to-indigo,
  title initials) next to the eyebrow, and a real "View project" CTA row
  with an animated arrow pinned to the bottom via `mt-auto`.
- Tag pills are now color-coded by meaning instead of all looking the same:
  "Ongoing" -> amber, "UI/UX Design" -> violet, everything else (tech
  stack) -> neutral slate. Matching is by substring/exact match in a small
  `tagStyle()` helper, so any future tag automatically gets the right color
  without touching the render logic.
- Image area bumped to `aspect-[16/10]` with a hover zoom on real images;
  the placeholder (no `imageUrl` yet) keeps the shimmer-sweep animation.

## 2026-08-05 — "Ongoing" now visible; UI/UX role added for two projects

**Changed** `src/sections/Projects.tsx`

- The `status: 'Ongoing'` field on each project was never actually rendered
  - the current `ProjectCard` component has no status prop, it only shows
  the `tags` list. Folded `'Ongoing'` into `tags` (first entry) for all
  three projects so it's visible again, same fix already applied to Hero's
  card earlier this session.
- Added a `'UI/UX Design'` tag to LandKoTo and Smart Plate (not the corn
  project) - the user is also the UI/UX designer on those two, on top of
  full-stack developer.

## 2026-08-05 — Projects grid back to plain equal-sized cards

**Changed** `src/sections/Projects.tsx`

- Dropped the bento sizing (`span` field, `lg:col-span-2`/`lg:row-span-*`,
  `lg:auto-rows-*`) again - back to a plain `grid-cols-1 sm:grid-cols-2
  lg:grid-cols-3` with all three project cards the same size.

## 2026-08-05 — ProjectCard rebuilt to the user-provided component

**Changed** `src/components/ProjectCard.tsx`, `src/sections/Hero.tsx`

- Replaced the tilt/spotlight `ProjectCard` from earlier this session with
  the simpler component the user wrote directly: plain `<a>` (no framer
  motion), eyebrow/title/description on top, a real `<img>` preview area,
  tags at the bottom. Only deviation from what was pasted: `imageUrl` is
  optional and falls back to the existing placeholder box, so cards without
  a real screenshot yet (Hero's card) don't render a broken `<img>`.
- Updated Hero.tsx's call site to match the new prop set (no more `status`/
  `ctaLabel` props - folded "Ongoing" into the `tags` array instead, since
  this design doesn't have a separate status pill).
- Projects.tsx was already updated (by the user, outside this session) to
  call the new component with `imageUrl` paths like
  `/images/corn-app-mockup.png` - those files don't exist in `public/` yet,
  so those three cards will show broken images until real screenshots are
  added there.

## 2026-08-05 — Projects grid back to a bento layout, using ProjectCard

**Changed** `src/components/ProjectCard.tsx`, `src/sections/Projects.tsx`

- Brought the bento sizing back (corn project as a `lg:col-span-2
  lg:row-span-2` featured tile, the other two as normal 1x1 cells) on top
  of the shared `ProjectCard` from last turn, instead of the plain 3-equal
  grid.
- `ProjectCard` now takes an optional `className` prop for bento sizing and
  fills its grid cell (`flex h-full flex-col`); its content area is
  `flex-1 flex-col` with the tags/CTA row pinned to the bottom via
  `mt-auto` so extra height in a taller cell (like the 2x2 featured tile)
  turns into breathing room above the CTA instead of a cropped or
  awkwardly stretched image.
- Re-added `lg:auto-rows-[25rem]` to the grid so `row-span-2` has a fixed
  unit to actually span two of.

## 2026-08-05 — Projects grid now reuses Hero's featured card UI

**Added** `src/components/ProjectCard.tsx`
**Changed** `src/sections/Hero.tsx`, `src/sections/Projects.tsx`

- Extracted Hero's featured project card (tilt-on-hover, cursor spotlight,
  full-bleed `aspect-[2/1]` preview with shimmer sweep, eyebrow + status
  pill, title, description, tags + "View project" CTA all in one card) into
  a shared `ProjectCard` component. The tilt/spotlight motion values had to
  move with it - hooks can't be reused across multiple mapped elements from
  a single parent, they need their own component instance per card.
- Hero.tsx now renders `<ProjectCard>` instead of ~70 lines of inline JSX;
  removed the now-unused tilt/spotlight state and handlers from `Hero()`.
- Projects.tsx dropped its old bento-grid card design (avatar initial,
  separate badge/stack rows, fixed `lg:auto-rows-*` height, 2x2 featured
  span) in favor of three `ProjectCard`s in a plain 3-column grid, each
  with an `eyebrow` category label ("Mobile app"/"Web app") and "Ongoing"
  status pill instead of the old "Featured" pill - the corn project is no
  longer visually distinguished from the other two in this grid (it's
  still marked as Hero's featured pick separately).
- LandKoTo and Smart Plate still have no dedicated project page, so their
  `href` is `#` for now, same placeholder as before.

## 2026-08-05 — Projects grid preview image resized for better UX

**Changed** `src/sections/Projects.tsx`

- The preview slot added last turn was a small `h-28` box that read as an
  afterthought rather than a real image area. Switched it to match Hero's
  card treatment: `aspect-[16/9]`, full-bleed edge-to-edge via `-mx-6`
  (breaking the card's horizontal padding), plus the same hover-zoom and
  shimmer-sweep effects Hero's preview slot has. Bumped the grid's fixed
  card height (`lg:auto-rows-*`) from 25rem to 33rem to fit the larger
  image without crowding the rest of the card.

## 2026-08-05 — Preview image added to Projects grid cards

**Changed** `src/sections/Projects.tsx`

- Added a placeholder preview slot (same pattern as Hero's featured card -
  radial-gradient background, "project screenshot" label, swap for a real
  `<img>` later) between the description and the stack-tags row, so each
  card now reads title -> description -> image -> stack -> "View project",
  matching the order used on Hero's card.
- Bumped the grid's fixed card height (`lg:auto-rows-*`) from 19rem to
  25rem to fit the added image without crowding the other rows.

## 2026-08-05 — Stack tags split out into their own row above the CTA

**Changed** `src/sections/Projects.tsx`

- The top pill row mixed status badges (Featured/Ongoing) with tech stack
  tags (PHP, Flutter, etc), all styled the same way. Split them: `badges`
  now holds only status pills (top row, unchanged), and a new `stack` field
  renders as its own row of mono-font tags directly above the "View
  project"/links row at the bottom, matching the tag style already used on
  Hero's featured card.
- Bumped the grid's fixed card height (`lg:auto-rows-*`) from 17rem to
  19rem to fit the extra row without crowding the line-clamped title/
  description.

## 2026-08-05 — Corn project link relabeled "View project"

**Changed** `src/sections/Hero.tsx`, `src/sections/Projects.tsx`

- The corn detector's link/CTA said "Case study" / "View case study",
  implying Angelou authored a research case study. She clarified her role
  was building the mobile app and integrating the trained model, not
  writing up the research - so the label overstated it. Relabeled to
  "View project" in both Hero's featured card and the Projects grid entry.
  `#/project` page text was already scoped correctly ("My role is building
  the Flutter mobile app and integrating both trained models...") - no
  change needed there.

## 2026-08-05 — Projects cards resized to fit the new content

**Changed** `src/sections/Projects.tsx`

- LandKoTo/Smart Plate's longer titles, descriptions, and 4-badge rows
  risked overflowing the grid's fixed `lg:auto-rows-[14rem]` card height
  (the article has `overflow-hidden`, so overflow would silently clip
  content instead of growing). Bumped the row height to `17rem` and added
  `lg:line-clamp-2` on the title / `lg:line-clamp-3` on the description as a
  hard cap, so any future project card degrades gracefully instead of
  clipping mid-word. Clamping is `lg:`-scoped only - below that breakpoint
  cards use natural auto height, where there's no overflow risk to begin
  with. Title/icon row switched from `items-center` to `items-start` so a
  wrapped 2-line title aligns with the icon instead of drifting off-center.

## 2026-08-05 — Two more real projects added to Projects grid

**Changed** `src/sections/Projects.tsx`

- Replaced the remaining two placeholders ("Project Two"/"Project Three")
  with real projects, both marked "Ongoing" (full-stack developer role,
  confirmed with user):
  - LandKoTo: web-based land record management system for LGU San Pablo
    (PHP, MySQL, Bootstrap) - centralizes property records, document
    storage, form generation, and property mapping in place of the
    Assessor's Office's manual Excel/paper workflow.
  - Smart Plate: AI-powered meal planning mobile app (Flutter, Dart) -
    generates personalized meal plans, automated grocery lists, and
    real-time nutritional insights.
- Neither has a live site or dedicated case-study page yet, so `links` is
  empty for both (unlike the corn project's "Case study" link to `#/project`).

## 2026-08-05 — Corn project marked "Ongoing" and added to Projects grid

**Changed** `src/sections/Hero.tsx`, `src/pages/ProjectPage.tsx`, `src/sections/Projects.tsx`

- Added an amber "Ongoing" status pill next to the "Featured work" eyebrow on
  both the Hero card and the `#/project` page (matches the existing pill
  style used elsewhere, e.g. About's "Available for projects" badge).
- Projects.tsx: replaced the first placeholder ("Project One") with the real
  corn nutrient deficiency detector entry (Featured + Ongoing badges, Flutter
  and TensorFlow Lite tags, "Case study" link to `#/project`). Extended the
  badge-styling logic to special-case "Ongoing" with amber styling, same
  pattern as the existing "Featured" case. Project Two/Three remain
  placeholders.

## 2026-08-05 — Featured project is now the corn nutrient deficiency app

**Changed** `src/sections/Hero.tsx`, `src/pages/ProjectPage.tsx`

- Replaced the placeholder featured-project content (Hero card + `#/project`
  page) with the real project: a mobile app for a CS thesis at Isabela State
  University - Cabagan that detects nitrogen/phosphorus/potassium
  deficiencies in corn leaves. Pipeline is YOLOv8 (detection) +
  EfficientNetB0 (classification), exported to TensorFlow Lite for on-device
  inference in a Flutter app, plus a rule-based fertilizer recommendation
  screen. Angelou's role: mobile app development and trained-model
  integration.
- Hero card tags: Flutter, TensorFlow Lite, YOLOv8. Full page adds Dart and
  EfficientNetB0, plus a three-paragraph case study (problem, approach, role).
- Still needs: a real screenshot/preview image once the app UI exists (both
  files still show the placeholder preview slot).

## 2026-08-05 — Hero's featured project card navigates to its own page

**Added** `src/pages/ProjectPage.tsx`
**Changed** `src/App.tsx`, `src/sections/Hero.tsx`

- Hero's featured work card linked to `#projects` (scrolled to the Projects
  section); now links to `#/project`, a standalone page
  (`src/pages/ProjectPage.tsx`) - same pattern as Skills' `#/skills` and
  Experience's `#/experience`. Wired into `App.tsx` alongside those routes.
- The new page reuses the card's existing placeholder content (title,
  outcome line, tags, preview slot) plus a longer case-study paragraph and
  a "See all projects" link back to `#projects`. Both the card and page are
  still placeholders - flagged with a comment to keep them in sync once
  real project details replace them.

## 2026-08-05 — About tightened after the Academic Background card

**Changed** `src/sections/About.tsx`

- The Academic Background card added earlier made the section noticeably
  taller, so tightened spacing throughout to bring it back down: section
  `paddingClassName` `py-6 md:py-10` to `py-5 md:py-8`; heading-to-grid gap
  `mt-8` to `mt-6`, column gap `gap-8` to `gap-6`; both bio paragraphs'
  `mt-5`/`mt-4` to `mt-3`; Academic Background card `mt-6`/`p-5` to
  `mt-5`/`p-4`; stat tiles' gap `mt-8` to `mt-5` and `p-5` to `p-4`.

## 2026-08-05 — Removed GoHighLevel

**Changed** `src/data/skills.tsx`

- Dropped the GoHighLevel entry from CMS & Marketing, along with its now
  -unused `GoHighLevelIcon` wrapper component and the `gohighlevelLogo`
  import (would otherwise be a `noUnusedLocals` error). `src/assets/
  gohighlevel.svg` itself is left in place, unreferenced - Vite only bundles
  what's imported, so an unused file in `src/assets` doesn't affect the
  build.

## 2026-08-05 — Added Webflow and Wix to CMS & Marketing

**Changed** `src/data/skills.tsx`

- Added Webflow and Wix to the CMS & Marketing group. Verified `SiWebflow`
  and `SiWix` both exist in the installed `react-icons` package (grepped
  `node_modules/.pnpm/react-icons@5.7.0_react@19.2.8/.../si/index.d.ts`
  directly - the root `node_modules/react-icons` symlink itself keeps
  returning an I/O error in this sandbox, same as earlier sessions) before
  using them, per the standing practice since the earlier `SiCss3` crash.

## 2026-08-05 — Contact: height-matching scoped to lg, safe on mobile

**Changed** `src/sections/Contact.tsx`

- The height-matching classes added for the two-column layout (`h-full` on
  both column wrappers, `flex-1`/`h-full` on the Quick response/Available
  cards, `flex-1` on the form and the message field) only make sense once
  the columns sit side by side at `lg`. Below `lg` the columns stack
  vertically via the grid's default single-column behavior, so there's no
  shared row height to match - left unscoped, that height/flex chain had no
  definite size to resolve against on narrow screens, which is the kind of
  thing that can silently collapse a flex item to zero height. Rescoped
  every one of those classes to `lg:` (`lg:h-full`, `lg:flex-1`), so mobile
  gets plain natural stacking with no height gymnastics at all.

## 2026-08-05 — Added academic background to About

**Changed** `src/sections/About.tsx`

- Added an "Academic Background" card (graduation cap icon, degree, major,
  school, dates) between the bio paragraphs and the stat tiles: BS in
  Information Technology, major in Web and Mobile App Development, Isabela
  State University, August 2022 - July 2026. Styled to match the existing
  stat-tile card treatment (rounded-2xl border, backdrop blur).

## 2026-08-05 — Contact: extra height grows the badge cards, not a gap

**Changed** `src/sections/Contact.tsx`

- `justify-between` still left a visible gap right above the Quick
  response/Available row (just distributed across two gaps instead of one).
  Replaced the approach entirely: that row's grid is now `flex-1` (claims
  the leftover height in the column) and each of its two cards is `h-full`
  with `items-center` moved onto the card itself (removed the extra inner
  wrapper div), so the leftover height makes the cards themselves taller
  with their content re-centered - no empty gap anywhere in the column.

## 2026-08-05 — Contact: extra height spread evenly instead of one big gap

**Changed** `src/sections/Contact.tsx`

- `mt-auto` on the Quick response/Available row fixed the bottom alignment
  but dumped all the stretched extra height into a single large gap right
  above that row - looked like an unintended empty space. Swapped for
  `justify-between` on the left column's flex container (`gap-6` stays as
  the floor), which spreads the extra height evenly across both gaps
  (header-to-rows, rows-to-badges) instead of concentrating it in one spot.

## 2026-08-05 — Contact: Quick response/Available cards pinned to the bottom

**Changed** `src/sections/Contact.tsx`

- The previous `lg:items-stretch` fix did equalize the two columns' actual
  box heights, but it wasn't visible - the left column's flex wrapper has
  no border/background of its own (only its individual child cards do), so
  the extra stretched height just became invisible empty space below the
  "Available for work" card instead of a visible bottom edge lining up with
  the form panel. Added `mt-auto` to the Quick response/Available badges row
  so it's pushed to the very bottom of the column instead, landing flush
  with the form card's bottom edge.

## 2026-08-05 — Contact: form card height matches the left column

**Changed** `src/sections/Contact.tsx`

- The two-column grid used `lg:items-start`, so each column only grew to
  its own content's height - the form card and the left column
  (heading through the Quick response/Available cards) didn't line up.
  Switched to `lg:items-stretch` and gave both column wrappers `h-full`, so
  the shorter one now stretches to match the taller.
- The form itself (`flex flex-1 flex-col`) and the message field/textarea
  (`flex flex-1 flex-col` / `flex-1`) absorb whatever extra height that
  stretch adds, so it grows the message box rather than leaving a dead gap
  under the Send/Clear buttons.

## 2026-08-05 — Contact: divider back, new background, card animations

**Changed** `src/sections/Contact.tsx`

- Undid the previous change - restored the `border-t` divider. Contact
  reads as its own closing section again rather than continuing the block
  above it.
- Replaced the flat `bg-slate-50/50`/`bg-slate-950` tint with a soft
  blue-tinted gradient (`from-blue-50/80 via-white to-slate-50` light,
  `from-slate-900 via-slate-950 to-slate-950` dark) - ties into the site's
  existing blue/cyan accent system rather than a neutral gray.
- Added hover motion to the interactive cards: each contact row
  (`motion.a`) lifts and scales slightly on hover/tap, the Quick
  response/Available badges lift on hover with the clock icon getting a
  small rotate+scale, and the Clear button now matches the Send button's
  existing `whileHover`/`whileTap` with an added counter-rotate on tap
  (echoing the reset icon).

## 2026-08-05 — Contact divider removed to connect it to Experience

**Changed** `src/sections/Contact.tsx`

- Dropped the `border-t` divider - Contact's background tint
  (`bg-slate-50/50` light / `bg-slate-950` dark) already matches Experience
  directly above it, so removing the border makes the whole run from About
  through Contact read as one continuous block.

## 2026-08-05 — Added phone number to Contact

**Changed** `src/sections/Contact.tsx`

- Added a "Call or text" row (`tel:+639970710157`, displayed as
  "+63 997 071 0157") to `contactRows`, using lucide's `Phone` icon -
  between the email and Calendly rows, so contact rows read Email, Phone,
  Book a call, LinkedIn.

## 2026-08-05 — Fixed two type errors in Contact.tsx

**Changed** `src/sections/Contact.tsx`

- `Linkedin` isn't exported by `lucide-react` - the installed version
  (`^1.28.0`) dropped brand icons (LinkedIn, GitHub, etc.) in its v1
  release, same class of gap hit earlier with `react-icons/si` on the
  Skills page. Replaced with a local `LinkedInIcon` component using the
  same brand SVG path Hero.tsx's socials row already has, wrapped to match
  the `{ className }` signature the other rows' lucide icons use so
  `contactRows` didn't need restructuring.
- `handleCopyEmail`'s parameter was typed `React.MouseEvent`, but the file
  never imports a `React` namespace (only named imports, per
  `verbatimModuleSyntax`) - would have been a second error. Added
  `MouseEvent` to the existing `import type { FormEvent }` from 'react' line
  and used that instead.

**Changed** `src/sections/Contact.tsx`, `api/contact.ts`

- Rebuilt around a reference screenshot's structure (own colors/content,
  not a copy): column 1 is the heading + intro + a list of contact rows
  (icon box, label/value, arrow) - Email, Book a call (Calendly, already
  added in an earlier edit), LinkedIn. Column 2 holds supporting cards
  (Quick response / usually-replies-in-24h, and an availability badge).
  Column 3 is the form. Collapses to a single stack below `lg`.
  - Restored the `number="05"` on `SectionHeading` - an unrelated earlier
    edit to this file had dropped it.
- Form gained a Subject field and a "Clear form" button (via a `formRef`),
  alongside the existing Send button and status messages, plus a small
  privacy note ("Your information is only used to reply to you.").
- `api/contact.ts`: `ContactPayload` gained an optional `subject`, used to
  build a more specific email subject line when provided, falling back to
  "New message from {name}" otherwise.

## 2026-08-05 — Contact: "Let's work together" heading, LinkedIn link, form label

**Changed** `src/sections/Contact.tsx`

- Added a "Let's work together." heading above the existing intro paragraph.
- Added a row of icon links (Email, LinkedIn) below the intro text, reusing
  the same icon paths and `_blank`/`rel` handling as Hero's socials row,
  minus GitHub. `LINKEDIN_URL` flagged with the same TODO comment as
  Hero.tsx's copy to double-check the profile URL.
- Added a "Send a message" label above the form fields.
- Response-time messaging ("Response time: ~24 hours") was already present
  in the availability card from an earlier bento-grid rebuild - no change
  needed there.

## 2026-08-05 — Contact: reverted to the shared content width

**Changed** `src/sections/Contact.tsx`

- Undid the previous change - the narrower `max-w-2xl` override wasn't what
  was wanted. Removed `contentClassName` entirely so Contact falls back to
  `Section`'s shared default (`max-w-7xl px-6 sm:px-8 lg:px-10`), identical
  to About/Projects/Skills/Experience.

## 2026-08-05 — Contact: real form wired to Resend via a Vercel Edge Function

**Added** `api/contact.ts`, `.env.example`
**Changed** `src/sections/Contact.tsx`, `.gitignore`

- Replaced the placeholder `you@example.com` mailto-only text with a real
  form (name, email, message) that POSTs to `/api/contact`, plus a mailto
  fallback below it using the real address (angeloubulauan04@gmail.com) for
  anyone who'd rather use their own mail client.
- `api/contact.ts` is a Vercel Edge Function (`export const config = {
  runtime: 'edge' }`) - deliberately outside `src/` and not part of either
  tsconfig project (Vercel builds it separately at deploy time, same as any
  Vite+Vercel project's `/api` folder). Validates the payload, then calls
  Resend's REST API directly via `fetch` rather than adding the `resend`
  npm package as a dependency - one HTTP call doesn't need an SDK. Sender is
  Resend's shared `onboarding@resend.dev` sandbox address (works without
  verifying a domain first) - swap once a real domain is verified in the
  Resend dashboard.
- Needs a `RESEND_API_KEY` environment variable set in the Vercel project's
  settings - never committed. Added `.env.example` documenting the variable
  and `.env`/`.env.local` to `.gitignore`.
- No Calendly link yet (none provided) - only the email form/fallback for
  now.

## 2026-08-05 — Dropped SectionHeading's underline accent

**Changed** `src/components/SectionHeading.tsx`

- Removed the animated gradient underline bar below the label - the number
  badge is enough of an accent on its own now. Kept the outer/inner div
  split (rather than merging into one flex element) so Contact's
  `className="flex flex-col items-center"` override still composes safely
  instead of fighting with the badge row's own `flex items-center` classes.

## 2026-08-05 — Section number as a small badge instead of inline text

**Changed** `src/components/SectionHeading.tsx`

- Didn't like the muted monospace "01 — About" inline prefix from the
  previous change. Replaced with a small bordered square badge
  (`h-6 w-6 rounded-md border`, blue-tinted to match the label) to the left
  of the label, label itself unchanged (still the bold blue uppercase
  eyebrow style).

## 2026-08-05 — Numbered prefixes on every section heading

**Changed** `src/components/SectionHeading.tsx`, `src/sections/About.tsx`,
`src/sections/Projects.tsx`, `src/sections/Skills.tsx`,
`src/sections/Experience.tsx`, `src/sections/Contact.tsx`

- `SectionHeading` takes an optional `number` prop, rendered as a small
  muted monospace prefix before the label ("01 — About") - matches the
  page's section order: About 01, Projects 02, Skills 03, Experience 04,
  Contact 05. Hero has no numbered heading (it isn't one of the numbered
  sections in the reference).

## 2026-08-05 — Experience rows: fixed mobile layout

**Changed** `src/sections/Experience.tsx`

- The 3-column grid (`10rem` date + flexible content + `auto` duration
  pill) had no responsive fallback - on a phone-width viewport there was no
  room left for the content column at all. Rows now stack (`flex-col`)
  below `sm`: date and the duration pill share a top line
  (`flex justify-between`), with the title/company/location block
  underneath. The grid layout only applies from `sm` up, unchanged from
  before.
- The date/duration pair is wrapped in a `div` that becomes `sm:contents`
  at the grid breakpoint, so on wider screens its two children drop straight
  into the grid as normal columns instead of staying nested - `sm:order-3`
  on the pill keeps it in the trailing column rather than landing next to
  the date.

## 2026-08-05 — Duration pill fills the empty right side of each row

**Added** `duration()` in `src/data/experience.tsx`
**Changed** `src/sections/Experience.tsx`

- Rows left a lot of empty space on the right since the date column is
  fixed-width and the content column caps at `max-w-xl`. Added a third
  `auto` grid column holding a small pill with the duration half of
  `period` ("2 yrs 3 mos", "5 mos", "2 mos") - data that was already being
  computed via `dateRange()` splitting on `period` but the second half was
  going unused. Pill lands flush against the row's right edge since the
  `minmax(0,_1fr)` content column absorbs the rest of the width.

## 2026-08-05 — Freelance role: real start date, project-based description, data viz

**Changed** `src/data/experience.tsx`

- `period` set from the actual start date given ("05/08/2024"). Initially
  read as day/month (5 Aug 2024); clarified as month/day instead (May 8
  2024). Now "May 2024 - Present · 2 yrs 3 mos" (month-level duration
  against today, Aug 2026 - same counting convention as the other roles'
  "5 mos"/"2 mos").
- Rewrote `summary` to describe project-based freelance work for individual
  clients (rather than reading like one continuous job), and added a
  highlight for data visualization dashboards/reporting work, since that's
  part of what this role actually covers.

## 2026-08-05 — Full Stack Developer start date pushed back to 2 yrs 2 mos

**Changed** `src/data/experience.tsx`

- `period` was "Apr 2026 - Present · 5 mos" - changed to "Jun 2024 -
  Present · 2 yrs 2 mos" so the ongoing duration reads 2 years 2 months as
  of today (Aug 2026).

## 2026-08-05 — Full Stack Developer role relabeled to freelance/project-based

**Changed** `src/data/experience.tsx`

- "Self-Employed / Freelance" didn't match how this work actually happens
  (project-based freelancing, not a standing self-employment arrangement) -
  changed to company "Freelance" / type "Project-Based".
- `initials()` only handled multi-word company names ("SDO Cagayan" to
  "SC"); a single word like "Freelance" has no second word to pull a letter
  from and was collapsing to one character. Added a single-word fallback
  that takes that word's own first two letters ("Freelance" to "FR")
  instead, so every badge stays two characters.

## 2026-08-05 — Fixed the connecting line hanging past the last badge

**Changed** `src/pages/ExperiencePage.tsx`

- The single container-spanning line (`top-[3.75rem] bottom-[3.75rem]`) from
  the previous fix assumed every row was the same height, which isn't true -
  summary/highlight text length varies per role - so it landed short of some
  badges and past others (visibly hanging below the last one, "EL").
- Replaced it with one line per row instead of one for the whole list: each
  row draws its own tail from its badge's center (`top-[3.75rem]`) to
  `bottom-[-3.75rem]` - past its own box by exactly the next row's
  padding-top + half-badge, landing on the next badge's center no matter how
  tall this row's content is. The last row renders no line at all, since
  there's no badge after it to reach.

## 2026-08-05 — Fixed the connecting line poking out above the first badge

**Changed** `src/pages/ExperiencePage.tsx`

- The line spanned the full `top-0 bottom-0` of the list container, but the
  first badge's center sits `3.75rem` down from there (row `py-8` + half the
  badge height) - so a stray segment showed above the top badge. Line now
  starts/ends at `top-[3.75rem]`/`bottom-[3.75rem]` instead, flush with the
  first and last badges' own centers.

## 2026-08-05 — Experience detail page: connecting line through the badges

**Changed** `src/pages/ExperiencePage.tsx`

- Added a vertical thread running behind every company badge, per a
  reference: an absolutely positioned line (`left-7`, half the badge's own
  56px width, so it lines up with the badge's center) spans the full role
  list. Dropped the `divide-y` row separators in favor of this connecting
  line.
- Badges got an opaque background matching the page (`bg-white` /
  `dark:bg-slate-950`) and `relative z-10`, so the line appears to run
  behind each one rather than showing through the initials.

## 2026-08-05 — Moved the logo-badge card style to the View details page

**Changed** `src/sections/Experience.tsx`, `src/pages/ExperiencePage.tsx`

- Undid the previous change on the homepage section - reverted to the
  date-column / title / company / type / location row layout.
  - The initials-badge card design (company + type, then title + period,
    both in small uppercase monospace) moved to `#/experience`
    (`ExperiencePage.tsx`) instead, ahead of that role's existing
    location/summary/highlights detail, replacing the old dotted-timeline
    layout there.

## 2026-08-05 — Experience: card rows with a logo placeholder, per reference

**Added** `initials()` in `src/data/experience.tsx`
**Changed** `src/sections/Experience.tsx`

- Rebuilt each row per a reference screenshot: a square initials badge
  (first letter of the company's first two words - "Self-Employed" to "SE",
  "SDO Cagayan" to "SC" - stands in for a logo) beside a stacked block of
  company name + employment type, then job title + period, both the
  type and period lines in small uppercase monospace. Replaced the earlier
  date-column/title/company/location row layout entirely.
- Location no longer shows on the condensed homepage cards (not in the
  reference) - still shown on the `#/experience` full detail page.

## 2026-08-05 — Experience visually connected to Skills

**Changed** `src/sections/Experience.tsx`

- Dropped the `border-t` divider and swapped the solid `bg-white`/
  `dark:bg-slate-950` background for the same `bg-slate-50/50`/
  `dark:bg-slate-950/40` tint About, Projects, and Skills already share -
  Experience now reads as part of that same continuous block instead of a
  separately tiled section. Contact keeps its own `border-t`/background, so
  the run ends there as before.

## 2026-08-05 — Experience: "View details" navigates to a full page

**Added** `src/data/experience.tsx`, `src/pages/ExperiencePage.tsx`
**Changed** `src/sections/Experience.tsx`, `src/App.tsx`

- "View details" (header link, styled like Skills' "View all") now
  navigates to a standalone page at `#/experience`
  (`src/pages/ExperiencePage.tsx`) instead of expanding rows in place -
  matches the Skills "View all" -> `#/skills` pattern exactly. Wired into
  `App.tsx` alongside the existing `#/skills` route.
- The homepage section shows only the condensed rows now (date, title,
  company, location) - no inline expand/collapse or per-row state. Role
  data (`Role` type, `roles`, the `dateRange()` helper) moved to
  `src/data/experience.tsx` as a single source shared by both the section
  and the new page, same pattern as `src/data/skills.tsx`.

## 2026-08-05 — Experience: "View details" moved to the section header

**Changed** `src/sections/Experience.tsx`

- Replaced the per-row "View details" buttons (one toggle per role, multiple
  could be open at once) with a single header-level control, same layout
  Skills uses for "View all" - `SectionHeading` on the left, the text link
  on the right in a `flex items-end justify-between` row. One `expanded`
  boolean now shows or hides every role's summary/highlights at once rather
  than tracking a `Set` of open rows.
- Row grid dropped back to two columns (date, content) now that there's no
  per-row button needing its own trailing column.

## 2026-08-05 — Experience: "View details" moved to its own right-hand column

**Changed** `src/sections/Experience.tsx`

- Row grid gained a third `auto`-width column
  (`grid-cols-[6.5rem_1fr_auto] sm:grid-cols-[9rem_1fr_auto]`) so "View
  details" sits to the right of the row, aligned with the date/title/company
  content, instead of stacking below the location line inside the middle
  column.

## 2026-08-05 — Experience: two-column rows with a "View details" expand

**Changed** `src/sections/Experience.tsx`

- Rebuilt per a reference: fixed-width date-range column on the left (just
  the dates, not the "· 5 mos" suffix already baked into `period` - split
  off via a small `dateRange()` helper), title/company/location stacked on
  the right, rows separated by `divide-y` instead of the old left-border
  timeline with dot markers.
  - Company and type render together on one line ("Self-Employed ·
    Freelance"); location gets a cyan tint per the reference.
- Each row's summary + highlight bullets are now hidden by default behind a
  "View details" toggle (arrow icon rotates, label flips to "Hide details"),
  animated open/closed with `AnimatePresence` + a height/opacity transition.
  Rows expand independently via a `Set<string>` of open row keys, not a
  single active row - considered a separate `#/experience` page for this
  (the pattern already used for Skills' "View all"), but an inline
  expand/collapse per row is a smaller, more direct fit for "view details"
  on an individual role than a full page navigation.

## 2026-08-05 — Experience: reverted the condensed-rows + full-history-page redesign

**Removed** `src/pages/ExperiencePage.tsx`, `src/data/experience.tsx`
**Changed** `src/sections/Experience.tsx`, `src/App.tsx`

- Undid the previous change. Experience is back to a single timeline with
  the full detail (title, company, type, period, location, summary,
  highlights) inline per role, no separate `#/experience` page or condensed
  year/title/company rows. Role data moved back inline in
  `src/sections/Experience.tsx` rather than a shared `src/data/` file.

## 2026-08-05 — Real work experience

**Changed** `src/sections/Experience.tsx`

- Replaced the single placeholder role with three real ones, most recent
  first: Full Stack Developer (Self-Employed, Freelance, Apr 2026-Present),
  Student Intern (SDO Cagayan, Feb-Jun 2026), UI/UX Designer (Educate
  Learning Center, Freelance, Dec 2025-Jan 2026).
- `Role` gained `type` (Freelance/Internship) and `location` fields, plus
  `highlights: string[]` for the bullet points each role has - the old shape
  only had a single `summary` string with no room for a list. Rendered as a
  `<ul className="list-disc">` under the summary paragraph.

## 2026-08-05 — Section order and nav link fixes

**Changed** `src/App.tsx`, `src/components/Nav.tsx`

- Swapped Skills and Experience, then swapped back per follow-up - final
  order is Hero, About, Projects, Skills, Experience, Contact, matching the
  original page order.
- Nav `links` array reordered to match (About, Projects, Skills, Experience).
  Also renamed the Skills link's label from "Tools & Workflow" (a leftover
  from an earlier version of that section) to "Skills", matching the
  section's actual `SectionHeading` text.

## 2026-08-05 — GoHighLevel: real logo, plus MariaDB/Node.js additions

**Changed** `src/data/skills.tsx`

- Added MariaDB (Backend & Database), Node.js (Backend & Database), and
  GoHighLevel (CMS & Marketing) to the skill list.
- GoHighLevel initially fell back to a generic lucide icon (no brand icon
  exists for it in any icon set used here), but the actual logo doesn't
  match GoHighLevel's real mark. User sourced and saved the real file to
  `src/assets/gohighlevel.svg`. Added a small `GoHighLevelIcon` wrapper
  component that renders it as an `<img>` while still matching the same
  `Icon: ComponentType<{ className?, color? }>` shape every other entry
  uses, so `SkillPill` needed no changes. The `color` field is unused for
  this one entry since the real mark is multi-color, not a tintable glyph.

## 2026-08-05 — Added Android Studio

**Changed** `src/data/skills.tsx`

- Added to the Mobile group, alongside Flutter and Dart. Shows up in the
  ticker automatically (it flattens every group); Mobile isn't one of the
  three groups shown in the compact toggle view, same as Flutter/Dart
  already weren't.

## 2026-08-05 — Skills ticker: 3 rows, not 7

**Changed** `src/sections/Skills.tsx`

- The ticker had grown to one row per category (7 rows, too tall). All
  skills are still in it - flattened and redistributed round-robin across
  exactly 3 rows instead of grouped by category, so row count stays fixed
  at 3 regardless of how many categories exist.

## 2026-08-05 — Skills: three separate controls now, ticker/compact/full page

**Added** `src/data/skills.tsx`, `src/lib/useHashRoute.ts`, `src/pages/SkillsPage.tsx`
**Changed** `src/sections/Skills.tsx`, `src/App.tsx`

Went back and forth on this a few times this session - landed on three
distinct pieces rather than one toggle doing everything:

- The ticker (default view on the page) now loops through **all 7**
  categories, not a 3-category subset.
- The grid/layers icon button toggles, in place, to a compact static view
  showing only **3** categories (Frontend, Backend & Database, Design &
  Prototyping - edit `FEATURED_GROUPS` in `Skills.tsx` to change which
  three) - a quick glance, separate from the icon's earlier meaning.
- "View all" is its own link, unrelated to the icon toggle, and navigates to
  a standalone page at `#/skills` (`src/pages/SkillsPage.tsx`) that lays out
  every category at once. No router dependency added -
  `src/lib/useHashRoute.ts` is a ~15 line hook
  (`useSyncExternalStore` + a `hashchange` listener), since this site only
  needed the one extra page.
- Skill data (`skillGroups`, `Tech` type, `SkillPill`) lives in
  `src/data/skills.tsx` as a single source of truth for all three views.
- Skill data (groups, `Tech` type, the `SkillPill` component) now lives in
  `src/data/skills.tsx` as a single source of truth, since both views in
  `Skills.tsx` read from it.

## 2026-08-05 — Skills: ticker back as default, "Full Tech Stack" moved behind View all

**Changed** `src/sections/Skills.tsx`, `src/index.css`

- Reversed the previous simplification - the scrolling ticker is the default
  view on the page again (re-added the `animate-marquee` keyframes/utility
  to `index.css`), with a "View all" text link (styled like Projects'
  "View all projects") that reveals the full categorized list instead.
- The header itself swaps content depending on which view is showing: the
  small `SectionHeading` "Skills" eyebrow while the ticker is up, or the
  "Full Tech Stack" heading + "Comprehensive list of tools and technologies
  I use." subtitle once expanded - rather than showing both stacked at once.
  "View all" becomes "Show less" with a flipped arrow to collapse back.

## 2026-08-05 — Skills simplified to a static "Full Tech Stack" list

**Changed** `src/sections/Skills.tsx`, `src/index.css`

- Dropped the scrolling ticker and grouped/ticker toggle per explicit
  request - just a static categorized list now, no animation, no button.
  Removed the now-unused `animate-marquee` keyframes/utility from
  `index.css`.
- Added a proper heading ("Full Tech Stack") and subtitle ("Comprehensive
  list of tools and technologies I use.") in place of the small `SectionHeading`
  eyebrow used elsewhere on the site - deliberate one-off deviation per
  request, not applied anywhere else.
- Curated the list against a reference structure (Frontend / Design &
  Prototyping / Backend & Database / Mobile / CMS / Data Analysis / Tools &
  Version Control), keeping only entries confirmed as real across this
  conversation - dropped unconfirmed reference items (TypeScript, Python,
  Rust, C, Cobol, PostgreSQL, SEO/Analytics/AdSense/MailChimp, Tauri, and
  the AI API entries) since none of those were ever mentioned as actual
  skills.

## 2026-08-05 — Skills: added Supabase, Excel, data viz, VS Code, Composer, npm, Laravel

**Changed** `src/sections/Skills.tsx`

- Added a new "Data & Productivity" group (Excel, Data Visualization).
- Added to Backend & Database: Supabase, Laravel, Composer, npm.
- Added VS Code to Design & Tools.
- Git and GitHub were already present, so no duplicates added for those.
- Verified every new icon name against the installed `react-icons` package
  before using it (after the earlier `SiCss3` crash, not trusting memory for
  these). Excel and VS Code don't have brand icons in this set (Microsoft
  trademark exclusions, same pattern as the earlier Java/Adobe gaps) - both
  use a generic lucide icon tinted with a close brand color instead.

## 2026-08-05 — Skills: real stack, fixed CSS3 icon crash, marquee stutter fix

**Changed** `src/sections/Skills.tsx`

- `SiCss3` doesn't exist in the installed `react-icons` version (it's `SiCss`
  now) - the bad import resolved to `undefined`, and rendering it as a
  component crashed the whole page, not just Skills. Verified every icon
  name against the actually-installed package this time instead of relying
  on memory.
- Replaced the placeholder tech list with the real one: PHP, Java (no brand
  icon available for Oracle's Java in this icon set, so OpenJDK's logo
  stands in), C++, MySQL, MongoDB, Microsoft SQL Server, Git, API
  integration, Flutter, Dart, Figma, Framer, Canva, Adobe, Alight Motion,
  WordPress, GitHub, plus the existing frontend basics. Four category
  groups now: Frontend, Backend & Database, Mobile, Design & Tools.
  Microsoft SQL Server, Canva, Adobe, and Alight Motion don't have icons in
  this set, so they use a generic lucide icon tinted with a brand-adjacent
  color instead - swap for a real logo asset if you want the exact mark.
- Fixed a marquee stutter: the looping row was duplicated for a seamless
  `-50%` loop, but spacing came from the container's `gap`, which adds one
  extra "connecting" gap between the two copies that isn't inside either
  copy - so `-50%` landed half a gap short of the real seam and hitched
  every cycle. Moved spacing to a trailing margin on each item instead, so
  the two copies are identical widths and the loop point is exact.

## 2026-08-05 — Skills rebuilt: scrolling ticker + grouped toggle

**Changed** `src/sections/Skills.tsx`, `src/index.css`, `package.json`

- Replaced the static bento grid with two views: a self-scrolling ticker
  (three rows, alternating direction, looping) as the default, and a static
  grid grouped by category (Frontend / Backend & Database / Tools & Design),
  toggled via a button in the header. Crossfades between the two with Framer
  Motion `AnimatePresence`.
- Added real brand-colored icons via `react-icons/si` (Simple Icons) instead
  of the earlier generic hand-drawn SVGs, since matching each tool's actual
  logo was the point this time. New dependency - **run `pnpm install`**
  before starting the dev server, it won't be there yet.
- Marquee loop added as a new `animate-marquee` utility in `index.css`, same
  pattern as the existing shimmer/scroll-cue keyframes. Each row's item list
  is duplicated once so the `-50%` loop point lands on an identical copy -
  no visible seam. Respects `prefers-reduced-motion` for free via the
  existing global media query that caps all animation durations.
- Tech list (HTML5, CSS3, JavaScript, TypeScript, Tailwind, Vite, React,
  Node.js, Python, MySQL, PostgreSQL, Git, GitHub, Figma, Framer) is a
  placeholder built from what was already in the project plus common
  additions - edit the `groups` array to match your real stack.

## 2026-08-05 — Projects back to a bento grid

**Changed** `src/sections/Projects.tsx`

- Replaced the fanned/stacked card carousel (click a card to bring it to front)
  with a static bento grid - same card content (badge pills, icon, title,
  description, links), no click-to-reorder state. The carousel had a
  persistent stacking bug (a background card would occasionally render on top
  of or bleed through the active one) that didn't reproduce consistently
  enough to pin down with certainty, so simplifying back to a grid removes the
  z-index/ordering complexity entirely rather than continuing to chase it.
- First project spans a 2x2 featured cell (`lg:col-span-2 lg:row-span-2`),
  matching the pattern already used in `Skills.tsx`.
- Section background still matches About's tint with no top border, so the
  two sections read as one continuous block.

## 2026-08-04 — Hero socials moved below CTAs, email added, link placeholders marked

**Changed** `src/sections/Hero.tsx`

- Social icons (GitHub, LinkedIn) previously sat inline after the two CTA buttons,
  separated by a vertical divider. Moved to their own row below both buttons; the
  divider no longer applies and was removed.
- Added Email as a third entry (`mailto:` link, generic outline envelope icon - the
  GitHub/LinkedIn icons are filled brand marks, so each social's `icon` field now
  holds its own JSX rather than a shared `path` string with one shared fill).
- Added `// TODO` comments directly on the `href` line for GitHub, LinkedIn, and
  Email in the `socials` array marking where to paste the real values.
- Fixed a bug: every social link's `target` attribute was hardcoded to the literal
  string `"https://www.linkedin.com/in/angelou-bulauan-125401338/"` instead of
  `"_blank"` - invalid on `target`, and applied to GitHub's link too. That URL is
  the user's real LinkedIn profile, so it's now the LinkedIn entry's `href` instead
  (flagged for the user to double-check). `target`/`rel` are now only set for
  non-`mailto:` links, since `target="_blank"` doesn't apply to mail links.

## 2026-08-04 — About section audit fixes

**Changed** `src/sections/About.tsx`

- "Hi, I'm Angelou." was a `<p>` styled to look like a heading, immediately after the
  section's real `<h2>` ("About" via SectionHeading) - broke the document's heading outline
  for screen reader users navigating by heading. Now an `<h3>`.
- Stat tiles were three plain `<div>`s; converted the wrapping element to `<dl>` with
  `<dt>`/`<dd>` per tile (value as `dt`, label as `dd`) - a screen reader now announces them
  as a set of value/label pairs rather than unrelated paragraphs. Tailwind's preflight already
  zeroes `dl`/`dd` margins, so no default browser indent to strip.
- Restored, then removed again at the user's request: no résumé link on the site for now.
  There's currently no résumé file to point it at, so an empty `href="#"` placeholder wasn't
  worth keeping around. Revisit once there's an actual file - nav bar was the recommended
  placement (visible at every scroll position) rather than buried in About.

## 2026-08-04 — One transition system for every section, tilt on the portrait

**Added** `src/lib/motion.ts`

- Shared `EASE`, `stagger`, `rise`, `fade` and a `useRiseVariant()` hook (picks `rise`, or
  `fade` under `prefers-reduced-motion`). Hero, About and Skills each had their own slightly
  different copies of these same four things (staggerChildren 0.08-0.1, rise duration
  0.5-0.7, travel 16-18px) - close enough to look accidental rather than intentional.
  Consolidated to one canonical set every section now imports.

**Rewrote** `src/sections/Projects.tsx`, `src/sections/Experience.tsx`,
`src/sections/Contact.tsx`, `src/sections/Footer.tsx`

- These four were still on the older CSS-transition system (`useScrollReveal` +
  `revealClasses`), the one Hero/About/Skills had already moved off of. Migrated all four to
  the same Framer Motion `whileInView` + `stagger`/`rise` pattern, so every section on the
  page now animates in with identical timing and easing rather than two different systems
  sitting side by side.
- Experience keeps a bespoke `slideLeft` variant (items travel in from the left instead of
  rising) since a timeline reads better as a left-to-right sequence than a stack - built on
  the shared `EASE` rather than a one-off value.
- Fixed a latent bug this migration would otherwise have introduced: Projects' cards and
  Skills' bento cards used Tailwind's `hover:-translate-y-*` for their hover lift. Framer
  Motion sets `transform` as an inline style once a component has `variants`, which wins over
  a CSS class at equal specificity - so the Tailwind hover class would have silently stopped
  working. Replaced with `whileHover={{ y: ... }}` on the motion component itself, the same
  approach Hero.tsx's card already used.
- `Section` is now called with `reveal={false}` everywhere, since each section animates its
  own content directly rather than relying on Section's built-in wrapper-level reveal.

**Changed** `src/sections/About.tsx`

- Added the same cursor-tracking 3D tilt (`useMotionValue`/`useSpring` on `rotateX`/`rotateY`)
  and radial spotlight (`useMotionTemplate`) to the portrait image that Hero.tsx's featured
  project card already has. Tilt is skipped under reduced motion; the spotlight still tracks,
  since it isn't motion.
- Swapped its local `EASE`/`stagger`/`rise`/`fade` for the new shared module.

**Changed** `src/sections/Hero.tsx`

- Same swap to the shared module. Its local `rise` (18px travel, 0.7s) and `stagger`
  (0.09/0.15) were the values the shared constants were based on, so this is a very small
  timing tweak (16px/0.6s, 0.08/0.1) rather than a visible change.

**Note:** `src/components/Reveal.tsx`, `src/lib/reveal.ts` and `src/lib/useScrollReveal.ts`
are no longer imported by any section - only `Section.tsx` still uses them, for its optional
`reveal={true}` default that nothing currently opts into. Left in place rather than deleted,
since `Section` remains a generically reusable component for any future section that wants a
simple CSS reveal instead of managing its own Framer Motion.

## 2026-08-04 — Nav flush to the top edge

**Changed** `src/components/Nav.tsx`

- Outer wrapper `top-4` (floating, 16px gap) to `top-0`, and dropped the `max-w-7xl`/`px-4`
  cap so the header's background spans the full viewport width.
- Header lost its `rounded-2xl` and all-around border in favour of a single `border-b` -
  reads as a classic full-width sticky bar rather than a floating pill.
- Content (logo, links, theme toggle, CTA, hamburger) moved into a new inner wrapper with
  `mx-auto max-w-7xl px-6 sm:px-8 lg:px-10` - the same column every other section uses - so
  the content still lines up with the page even though the bar itself is edge-to-edge.
- Net effect: the nav's bottom edge moved up by the 16px that used to be `top-4`, so Hero's
  existing top padding clears it with a little more room than before rather than less.

## 2026-08-04 — Portrait stretched to match the full bio column, take three

**Changed** `src/sections/About.tsx`

- Grid `items-start` to `lg:items-stretch`, portrait wrapper gets `lg:h-full`, and the card
  drops its fixed `aspect-[4/5]` at `lg` in favour of `lg:aspect-auto lg:h-full` - matching
  the full right column (heading through the three stat tiles) at desktop width, as
  explicitly requested. Mobile keeps the fixed `aspect-[4/5]` since the columns stack.
- `object-top` stays on the image so cropping favours the head over the centre of the frame.

## 2026-08-04 — Portrait shrunk again

**Changed** `src/sections/About.tsx`

- Portrait column `lg:col-span-4` to `lg:col-span-3`, bio column `lg:col-span-8` to
  `lg:col-span-9`. Added `max-w-xs` (320px) to the portrait card so it stops growing past a
  sensible size even inside its now-narrower column on very wide screens.

## 2026-08-04 — Simplified: smaller portrait, top-aligned with the text

**Changed** `src/sections/About.tsx`

- Dropped the height-matching approach entirely rather than continuing to fight it. Portrait
  column `lg:col-span-5` to `lg:col-span-4`, bio column `lg:col-span-7` to `lg:col-span-8` -
  the photo takes up less of the row so it stops competing with the text for visual weight.
  Grid already had `items-start`, so both columns simply align at the top edge with a fixed,
  modest `aspect-[4/5]` card - no dynamic sizing.

## 2026-08-04 — Reverted the height-matched portrait

**Changed** `src/sections/About.tsx`

- The previous change (image stretched via `lg:items-stretch`/`lg:h-full` to match the bio
  column's height) looked broken in practice: the source photo has a lot of white padding
  around the subject, so stretching it taller just made that empty space more obvious rather
  than filling the frame.
- Reverted to a fixed `aspect-[4/5]` (back to independent of the sibling column's height),
  and added `object-top` so any cropping favours the head rather than the centre of the frame.

## 2026-08-04 — Portrait height matched to the bio column

**Changed** `src/sections/About.tsx`

- Grid gained `lg:items-stretch` (was `items-start` everywhere, including desktop), and the
  portrait wrapper `lg:h-full`. The inner card drops its fixed `aspect-[5/4]` at `lg` in favour
  of `lg:aspect-auto lg:h-full`, so on desktop it fills exactly however tall the bio column
  ("Hi, I'm Angelou" through the three stat tiles) happens to render - rather than a fixed
  ratio that only matched by coincidence.
- Mobile keeps `aspect-[5/4]` since the columns stack and there is no sibling height to match.
- Image `object-contain` to `object-cover`, since a stretched non-fixed-ratio container needs
  the photo to fill it rather than letterbox.
- Added explicit `w-full` on the image card - it was already block-level and full width by
  default, but this makes the intent explicit rather than incidental.

## 2026-08-04 — Bento layout for Skills, matched in About

**Rewrote** `src/sections/Skills.tsx`

- Replaced the flat pill wrap with a bento grid: three cards - "Core stack" (React,
  TypeScript, Tailwind CSS) spanning 2 columns and 2 rows on large screens, "Build tool"
  (Vite) and "Runtime" (Node.js) as single cells beside it. Same five real skills as before,
  just grouped for the layout rather than invented.
- Icons are generic (brackets, bolt, a simple node/cube mark) rather than brand logos, to
  avoid reproducing trademarked marks.
- Migrated off the old `useScrollReveal`/`revealClasses` pattern onto Framer Motion
  (`stagger`/`rise`/`fade`, `useReducedMotion`) to match Hero.tsx and About.tsx.
- `paddingClassName="py-16"`.

**Changed** `src/sections/About.tsx`

- Stat row's `border-y` strip became three individual card tiles using the same border,
  radius and background as the Skills bento cards, so the two sections read as one visual
  language rather than two different patterns for similar content.

## 2026-08-04 — Dropped résumé CTA, trimmed further

**Changed** `src/sections/About.tsx`

- Removed the "Download résumé" button entirely - the section now ends at the stat row.
- `paddingClassName` `py-12` to `py-10`, header-to-grid gap `mt-6` to `mt-5`, stat row
  `mt-6`/`py-5` to `mt-5`/`py-4`.
- No change needed to the portrait's `aspect-[5/4]` - with the CTA row gone the two columns
  land close to the same height on their own.

## 2026-08-04 — Removed duplicate CTAs, tightened further

**Changed** `src/sections/About.tsx`

- Removed the "Let's work together" button and the floating "Open to freelance work" badge.
  Both repeated something already on the page one screen up: the button went to the same
  `#contact` as the hero's primary CTA (and the nav's Contact button, and the dedicated
  Contact section below), and the badge signalled the same availability as the hero's
  "Available for full-stack & UI/UX roles" pill.
- "Download résumé" is now the section's only CTA and picked up the primary button style
  (dark fill) since it no longer sits next to another action.
- `paddingClassName` `py-14` to `py-12`, header-to-grid gap `mt-8` to `mt-6`, mobile column
  gap `gap-10` to `gap-8` - less content overall, so less surrounding space.

## 2026-08-04 — About section shorter, take two

**Changed** `src/components/Section.tsx`

- Added an optional `paddingClassName` prop (default `'py-20'`) so a single section's
  top/bottom padding can be overridden without touching the shared default every other
  section reads. Previously `py-20` was hardcoded into `base`, and appending a conflicting
  utility via `className` would not have reliably won the cascade (same-specificity
  Tailwind classes resolve by stylesheet order, not by position in the class attribute).

**Changed** `src/sections/About.tsx`

- `paddingClassName="py-14"` - top/bottom padding down from 80px to 56px each side.
- Portrait photo `aspect-square` to `aspect-[5/4]`, a wider/shorter crop.
- Header-to-grid gap `mt-10` to `mt-8`, column gap `gap-12` to `gap-10` on mobile.

## 2026-08-04 — Real profile photo in the About card

**Changed** `src/sections/About.tsx`

- Imported `src/assets/profile.png` as a module (same pattern as `logoUrl` in Nav.tsx) and
  replaced the monogram/"your photo here" placeholder with an `<img>`, `object-cover` filling
  the existing square card. The radial tint overlay was removed since it was styling for the
  placeholder state and would otherwise wash out a real photo.

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
