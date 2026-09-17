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
  Check,
  Copy,
  Loader2,
  AlertCircle
} from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { stagger, useRiseVariant } from '../lib/motion'

import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  REAL_EMAIL,
  WHATSAPP_URL,
} from '../data/contact'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.06c.53-.95 1.83-1.95 3.76-1.95C21.6 8.69 22 11.1 22 14.24V21h-4v-5.99c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
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
    label: 'WhatsApp',
    value: '+63 997 071 0157',
    href: WHATSAPP_URL,
    external: true,
    icon: WhatsAppIcon,
  },
  {
    label: 'LinkedIn',
    value: LINKEDIN_URL.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: LINKEDIN_URL,
    external: true,
    icon: LinkedInIcon,
  },
  {
    label: 'Facebook',
    value: FACEBOOK_URL.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: FACEBOOK_URL,
    external: true,
    icon: FacebookIcon,
  },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClassName =
  'w-full rounded-xl border border-slate-200/80 bg-white/50 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/10'

const cardClassName =
  'rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60'

interface ContactProps {
  /**
   * Overrides the section's vertical padding. The /contact route needs extra
   * room at the top to clear the fixed nav, and it has to come from inside the
   * section: padding added above it would expose the page background over the
   * section's lighter gradient, which reads as a black band.
   */
  paddingClassName?: string
}

export default function Contact({
  paddingClassName = 'py-16 md:py-24',
}: ContactProps) {
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
          company: data.get('company'),
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
      paddingClassName={paddingClassName}
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-blue-50/80 via-white to-slate-50 text-slate-900 transition-colors duration-300 dark:border-slate-800/80 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 dark:text-slate-100"
    >
      <SectionHeading number="05">Contact</SectionHeading>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-8 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch"
      >
        {/* Left Column */}
        <motion.div variants={item} className="flex flex-col gap-4 sm:gap-6 lg:h-full">
          <div>
            <h3 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl dark:text-white">
              Let&apos;s work{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300">
                together.
              </span>
            </h3>
            <p className="mt-3 text-base text-slate-600 sm:text-lg dark:text-slate-400">
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
                    <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {row.label}
                    </span>
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
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
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:mt-auto">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 p-3 sm:p-4 ${cardClassName}`}
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
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Replies within 24 hrs
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 p-3 sm:p-4 ${cardClassName}`}
            >
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Available for work
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
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
              <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Send a message
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fill out the form and I&apos;ll get back to you soon.
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4 lg:flex-1">
            {/* Honeypot - hidden from humans, bots fill it and get silently dropped. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
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
            <div className="flex flex-col items-stretch gap-2.5 pt-1 sm:flex-row sm:items-center sm:gap-3 sm:pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-offset-slate-900"
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
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200/80 sm:flex-none px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
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
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-2.5 sm:p-3 text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
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
                    className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-2.5 sm:p-3 text-xs font-medium text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                    <span>Failed to send. Please try again or email directly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <Lock className="h-3 w-3 shrink-0" />
              Your information is secure and only used to respond.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </Section>
  )
}