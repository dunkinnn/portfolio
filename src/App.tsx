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
import { useRoute } from './lib/useRoute'

function App() {
  const path = useRoute()

  // The full pages this site has, reached via Skills' "View all",
  // Experience's "View details", Hero's featured project card, and the
  // Projects section's cards / "All projects" link. Anything else
  // (including plain section anchors like #about) falls through to the
  // normal single-page layout. vercel.json rewrites any unmatched path to
  // index.html so these resolve on a direct visit or refresh too.
  if (path === '/skills') {
    return <SkillsPage />
  }
  if (path === '/experience') {
    return <ExperiencePage />
  }
  if (path === '/project') {
    return <ProjectPage />
  }
  if (path === '/projects') {
    return <AllProjectsPage />
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
