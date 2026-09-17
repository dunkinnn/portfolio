import Contact from '../sections/Contact'

// Standalone page at /contact, reached from the nav's Contact button and the
// footer's sitemap. It renders the same section the home page carries at
// #contact, in full - so the form, every channel and the status cards all
// behave identically here.
//
// That means this content lives at two URLs; the seo-pages plugin in
// vite.config.ts gives each route its own canonical, which settles it.
export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      {/* The numbered divider is suppressed below, so this is the page's only
          heading. Visually hidden: the section's own copy already says what
          the page is, and a second visible title would just repeat it. */}
      <h1 className="sr-only">Contact Angelou Bulauan</h1>

      {/* pb-16 pt-28 is what /projects, /skills and /experience use, so every
          sub-page starts at the same height. It has to be padding INSIDE the
          section, not a gap above it: a wrapper with top padding left ~80px of
          the page background (slate-950) above the section's gradient, which
          starts at the lighter slate-900 - a visible black band across the
          top. */}
      <Contact paddingClassName="pb-16 pt-28" showHeading={false} />
    </div>
  )
}
