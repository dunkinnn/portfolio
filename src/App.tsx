import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import IntroLoader from './components/IntroLoader'

import gLogoImg from './assets/G.png'
import elouTextImg from './assets/elou.png'

function App() {
  const [heroVisible, setHeroVisible] = useState(false)

  return (
    <>
      <IntroLoader
        gLogoSrc={gLogoImg}
        elouTextSrc={elouTextImg}
        onComplete={() => setHeroVisible(true)}
      />

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
    </>
  )
}

export default App