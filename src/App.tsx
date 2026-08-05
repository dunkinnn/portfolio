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
import { useHashRoute } from './lib/useHashRoute'

function App() {
  const hash = useHashRoute()

  // The full pages this site has, reached via Skills' "View all",
  // Experience's "View details", and Hero's featured project card.
  // Anything else (including plain section anchors like #about) falls
  // through to the normal single-page layout.
  if (hash === '#/skills') {
    return <SkillsPage />
  }
  if (hash === '#/experience') {
    return <ExperiencePage />
  }
  if (hash === '#/project') {
    return <ProjectPage />
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
