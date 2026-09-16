import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import SkillsPage from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'
import ProjectPage from './pages/ProjectPage'
import AllProjectsPage from './pages/AllProjectsPage'
import ScrollToTop from './components/ScrollToTop'
import IntroLoader from './components/IntroLoader'
import { useRoute } from './lib/useRoute'

function App() {
  const path = useRoute()
  const [heroVisible, setHeroVisible] = useState(false)

  // The full pages this site has, reached via Skills' "View all",
  // Experience's "View details", every project card's own /project/<slug>
  // detail page, and the Projects section's "All projects" link. Anything
  // else (including plain section anchors like #about) falls through to
  // the normal single-page layout. vercel.json rewrites any unmatched path
  // to index.html so these resolve on a direct visit or refresh too.
  let page
  if (path === '/skills') {
    page = <SkillsPage />
  } else if (path === '/experience') {
    page = <ExperiencePage />
  } else if (path.startsWith('/project/')) {
    page = <ProjectPage />
  } else if (path === '/projects') {
    page = <AllProjectsPage />
  } else {
    page = (
      <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
        <Hero isLoaded={heroVisible} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </div>
    )
  }

  // Rendered alongside every route, not just the homepage. The nav's links
  // point at the sub-pages, so it has to be present on them too or those
  // pages become dead ends; the footer gives every page the same ending
  // instead of stopping dead after the content; and the sub-pages can run
  // long enough to want the back-to-top button.
  return (
    <>
      <IntroLoader onComplete={() => setHeroVisible(true)} />
      <Nav />
      {page}
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
