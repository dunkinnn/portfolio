import type { MouseEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Download } from 'lucide-react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import profileUrl from '../assets/profile.png'
import { EASE, fade, rise, stagger } from '../lib/motion'

// Drop the PDF at public/angelou-bulauan-cv.pdf and this starts working.
const CV_URL = '/angelou-bulauan-cv.pdf'

// TODO replace the GitHub placeholder with the real profile URL.
const socials = [
  { label: 'GitHub', href: '#', Icon: FaGithub },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/angelou-bulauan-125401338/',
    Icon: FaLinkedin,
  },
  { label: 'Facebook', href: 'https://www.facebook.com/angelou.bulauan', Icon: FaFacebook },
]

export default function About() {
  const reduced = useReducedMotion()
  const item = reduced ? fade : rise

  // Spotlight & Tilt parameters
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(240px circle at ${glowX}px ${glowY}px, rgba(163,163,163,0.16), transparent 80%)`

  const handlePortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    if (reduced) return
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 4)
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 4)
  }

  const handlePortraitLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <Section
      id="about"
      reveal={false}
      fullBleed
      paddingClassName="py-12 md:py-16"
      className="border-t border-slate-200/80 bg-slate-50/50 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/40"
    >
      <SectionHeading number="01" watermark="About - Me">
        About
      </SectionHeading>

      <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-12">
        {/* LEFT: Interactive Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-5 flex flex-col"
          style={{ perspective: 1000 }}
        >
          <motion.div
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex-1 min-h-[380px] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-100/60 p-2 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-slate-300/20 dark:border-white/10 dark:from-slate-900/80 dark:to-slate-950/80 dark:shadow-none dark:hover:border-white/20"
          >
            {/* Interactive Glow Overlay */}
            <motion.div
              aria-hidden="true"
              style={{ background: glow }}
              className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-40 rounded-3xl"
            />

            {/* Live Indicator Badge */}
            <div className="text-eyebrow-sm absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1.5 text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for projects
            </div>

            {/* Inner Image Mask */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-slate-100 dark:bg-slate-900">
              <img
                src={profileUrl}
                alt="Angelou Bulauan"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-25" />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Content & Metric Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-center gap-8 lg:col-span-7"
        >
          <div>
            <motion.div variants={item} className="text-eyebrow mb-3 inline-flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <span className="h-px w-6 bg-sky-500/50" />
              Who am I?
            </motion.div>

            <motion.h3
              variants={item}
              className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl dark:text-white"
            >
              Hi, I&apos;m Angelou Bulauan.
            </motion.h3>

            <motion.p
              variants={item}
              className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
            >
              I&apos;m a Full-Stack Developer and UI/UX designer based in the Philippines. I
              design and build digital products, working from Figma to production.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
            >
              I focus on how products work—not just how they look. I design around clear
              interactions, then turn those ideas into clean, maintainable code with solid
              component structure, sensible state management, SEO optimization, and interfaces
              built to handle real-world use.
            </motion.p>
          </div>

          {/* CV download and social links */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <a
              href={CV_URL}
              download
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>

            <div className="flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  title={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-600 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-sky-400/40 dark:hover:text-sky-400"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}