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

import gLogoImg from './assets/G.png'
import elouTextImg from './assets/elou.png'

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
        <Nav />
        <Hero isLoaded={heroVisible} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    )
  }

  // Rendered alongside every route, not just the homepage, since the
  // sub-pages (skills, experience, project, projects) can run long too.
  return (
    <>
      <IntroLoader
        gLogoSrc={gLogoImg}
        elouTextSrc={elouTextImg}
        onComplete={() => setHeroVisible(true)}
      />
      {page}
      <ScrollToTop />
    </>
  )
}

export default App
