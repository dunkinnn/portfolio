import { useState, useRef } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Clock,
  Lock,
  RotateCcw,
  Send,
  Mail,
  Calendar,
  Phone,
  Check,
  Copy,
  Loader2,
  AlertCircle
} from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { stagger, useRiseVariant } from '../lib/motion'

const REAL_EMAIL = 'angeloubulauan04@gmail.com'
const PHONE_NUMBER = '+639970710157'
const LINKEDIN_URL = 'https://www.linkedin.com/in/angelou-bulauan-125401338/'
const CALENDLY_URL = 'https://calendly.com/'

// lucide-react dropped brand icons (LinkedIn, GitHub, etc.) in v1 - this
// project is on ^1.28.0, so there's no `Linkedin` export to import. Same
// brand path Hero.tsx's socials row already uses, wrapped to match the
// `{ className }` signature the other rows' lucide icons use.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.06c.53-.95 1.83-1.95 3.76-1.95C21.6 8.69 22 11.1 22 14.24V21h-4v-5.99c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9z" />
    </svg>
  )
}

const contactRows = [
  {
    label: 'Email me',
    value: REAL_EMAIL,
    href: `mailto:${REAL_EMAIL}`,
    external: false,
    icon: Mail,
  },
  {
    label: 'Call or text',
    value: '+63 997 071 0157',
    href: `tel:${PHONE_NUMBER}`,
    external: false,
    icon: Phone,
  },
  {
    label: 'Book a call',
    value: 'Pick a time that works for you',
    href: CALENDLY_URL,
    external: true,
    icon: Calendar,
  },
  {
    label: 'LinkedIn',
    value: LINKEDIN_URL.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: LINKEDIN_URL,
    external: true,
    icon: LinkedInIcon,
  },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClassName =
  'w-full rounded-xl border border-slate-200/80 bg-white/50 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/10'

const cardClassName =
  'rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60'

export default function Contact() {
  const item = useRiseVariant()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(REAL_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const handleClear = () => {
    formRef.current?.reset()
    setStatus('idle')
  }

  return (
    <Section
      id="contact"
      reveal={false}
      fullBleed
      // Divider restored (previous change removed it to merge with
      // Experience - undone) and a distinct blue-tinted background instead
      // of the shared bg-slate-50/50 tint, so Contact reads as its own
      // closing section again rather than continuing the block above it.
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-blue-50/80 via-white to-slate-50 py-16 text-slate-900 transition-colors duration-300 dark:border-slate-800/80 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 dark:text-slate-100"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl" />

      <SectionHeading number="05">Contact</SectionHeading>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch"
      >
        {/* Left Column: Heading, Contact Cards, Availability. Neither
            mt-auto nor justify-between worked - both just relocated the
            stretched extra height into an empty gap somewhere, which still
            reads as a gap. Instead the Quick response/Available row below
            is flex-1 and its cards are h-full, so the extra height grows
            those two cards themselves (taller cards, content vertically
            centered) rather than leaving visible empty space anywhere. */}
        <motion.div variants={item} className="flex h-full flex-col gap-6">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Let&apos;s work{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300">
                together.
              </span>
            </h3>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {contactRows.map((row) => {
              const Icon = row.icon
              const isEmail = row.href.startsWith('mailto:')

              return (
                <motion.a
                  key={row.label}
                  href={row.href}
                  target={row.external ? '_blank' : undefined}
                  rel={row.external ? 'noreferrer noopener' : undefined}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex items-center gap-4 p-4 transition-colors duration-200 hover:border-cyan-500/50 hover:shadow-md ${cardClassName}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {row.label}
                    </span>
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                      {row.value}
                    </span>
                  </span>

                  {/* Copy button feature for email row */}
                  {isEmail ? (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy email address"
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Quick status badges - flex-1 + h-full on each card absorbs the
              extra stretched height as taller cards (content re-centers via
              items-center) instead of leaving a gap above this row. */}
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex h-full items-center gap-3 p-4 ${cardClassName}`}
            >
              <motion.span
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
              >
                <Clock className="h-4 w-4" />
              </motion.span>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Quick response
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Replies within 24 hrs
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex h-full items-center gap-3 p-4 ${cardClassName}`}
            >
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Available for work
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Freelance & full-time
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form. h-full + lg:items-stretch on the
            parent grid makes this match the left column's height (heading
            through the Quick response/Available cards) instead of just
            hugging its own content. */}
        <motion.div variants={item} className={`flex h-full flex-col p-6 sm:p-8 ${cardClassName}`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              <Send className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Send a message
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fill out the form and I&apos;ll get back to you soon.
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project inquiry / Feedback"
                className={inputClassName}
              />
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project or idea..."
                className={`${inputClassName} flex-1 resize-none`}
              />
            </div>

            {/* Action Buttons & Status Notifications */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 dark:focus:ring-offset-slate-900"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98, rotate: -8 }}
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear
              </motion.button>
            </div>

            {/* Accessible Live Feedback */}
            <div aria-live="polite" className="mt-1">
              <AnimatePresence mode="wait">
                {status === 'sent' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Message sent successfully! I will reply shortly.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-xs font-medium text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Failed to send. Please try again or email directly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <Lock className="h-3 w-3" />
              Your information is secure and only used to respond.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </Section>
  )
}