import Contact from '../sections/Contact'

// Standalone page at /contact, reached from the nav's Contact button and the
// footer's sitemap. It renders the same section the home page carries at
// #contact, in full - so the form, every channel and the status cards all
// behave identically here.
//
// NOTE: that means this content lives at two URLs. Search engines treat that
// as duplicate content; a canonical tag would settle it, which needs either
// a per-route <link rel="canonical"> written at runtime or prerendering.
export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      {/* The section carries a divider-style h2 ("05 - Contact"), which is
          right mid-page but leaves this route with no h1 at all. A visually
          hidden one gives the page a proper title for screen readers and
          search engines without altering what the section looks like. */}
      <h1 className="sr-only">Contact Angelou Bulauan</h1>

      {/* The nav clearance is padding INSIDE the section, not a gap above it.
          A wrapper with top padding left ~80px of the page background
          (slate-950) sitting above the section's gradient, which starts at the
          lighter slate-900 - a visible black band across the top. */}
      <Contact paddingClassName="pb-16 pt-32 md:pb-24 md:pt-36" />
    </div>
  )
}
