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
  'w-full rounded-xl border border-slate-200/80 bg-white/50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 shadow-sm backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/10'

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
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-blue-50/80 via-white to-slate-50 py-10 sm:py-16 text-slate-900 transition-colors duration-300 dark:border-slate-800/80 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 dark:text-slate-100"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] sm:h-[400px] w-[300px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl" />

      <SectionHeading number="05">Contact</SectionHeading>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-6 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch"
      >
        {/* Left Column */}
        <motion.div variants={item} className="flex flex-col gap-4 sm:gap-6 lg:h-full">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Let&apos;s work{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300">
                together.
              </span>
            </h3>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3">
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
                  className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-colors duration-200 hover:border-cyan-500/50 hover:shadow-md ${cardClassName}`}
                >
                  <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {row.label}
                    </span>
                    <span className="block truncate text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                      {row.value}
                    </span>
                  </span>

                  {isEmail ? (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy email address"
                      className="rounded-lg p-1.5 sm:p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      )}
                    </button>
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Quick status badges */}
          <div className="grid gap-2.5 sm:gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:flex-1">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 p-3 sm:p-4 lg:h-full ${cardClassName}`}
            >
              <motion.span
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
              >
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.span>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Quick response
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                  Replies within 24 hrs
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 p-3 sm:p-4 lg:h-full ${cardClassName}`}
            >
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Available for work
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                  Freelance & full-time
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div variants={item} className={`flex flex-col p-4 sm:p-8 lg:h-full ${cardClassName}`}>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                Send a message
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                Fill out the form and I&apos;ll get back to you soon.
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4 lg:flex-1">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
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
                <label htmlFor="email" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
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
              <label htmlFor="subject" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
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

            <div className="flex flex-col lg:flex-1">
              <label htmlFor="message" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                placeholder="Tell me about your project or idea..."
                className={`${inputClassName} resize-none lg:flex-1`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'sending'}
                className="flex-1 xs:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 dark:focus:ring-offset-slate-900"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleClear}
                className="flex-1 xs:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
              >
                <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Clear Form
              </motion.button>
            </div>

            {/* Live Feedback */}
            <div aria-live="polite" className="mt-1">
              <AnimatePresence mode="wait">
                {status === 'sent' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-2.5 sm:p-3 text-[11px] sm:text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  >
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                    <span>Message sent successfully! I will reply shortly.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-2.5 sm:p-3 text-[11px] sm:text-xs font-medium text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                    <span>Failed to send. Please try again or email directly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 dark:text-slate-500">
              <Lock className="h-3 w-3 shrink-0" />
              Your information is secure and only used to respond.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </Section>
  )
}