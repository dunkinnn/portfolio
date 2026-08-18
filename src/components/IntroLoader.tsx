import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntroLoaderProps {
  onComplete?: () => void
  gLogoSrc: string
  elouTextSrc: string
}

export default function IntroLoader({
  onComplete,
  gLogoSrc,
  elouTextSrc,
}: IntroLoaderProps) {
  const [stage, setStage] = useState<'pulse' | 'revealLogo' | 'sliding' | 'done'>('pulse')
  const hasTriggeredComplete = useRef(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage('revealLogo')
    }, 1200)

    const timer2 = setTimeout(() => {
      setStage('sliding')
    }, 3200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="intro-loader"
          initial={{ y: '0%' }}
          animate={stage === 'sliding' ? { y: '-100%' } : { y: '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onUpdate={(latest) => {
            // Check if y reached or passed -70% during slide-up
            if (stage === 'sliding' && !hasTriggeredComplete.current) {
              const currentY = typeof latest.y === 'string' ? parseFloat(latest.y) : 0
              if (currentY <= -70) {
                hasTriggeredComplete.current = true
                if (onComplete) onComplete()
              }
            }
          }}
          onAnimationComplete={() => {
            if (stage === 'sliding') {
              setStage('done')
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950 text-white selection:bg-none pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            {stage === 'pulse' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0, transition: { duration: 0.3 } }}
                className="relative flex h-20 w-20 items-center justify-center"
              >
                <motion.span
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full border-2 border-sky-400/60"
                />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400 border-r-indigo-500"
                />
                <div className="h-6 w-6 rounded-full bg-white" />
              </motion.div>
            )}

            {(stage === 'revealLogo' || stage === 'sliding') && (
              <motion.div
                className="flex items-center justify-center gap-1 sm:gap-2"
                initial={{ opacity: 1 }}
                animate={{ scale: [0.95, 1, 1.02] }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                <motion.img
                  src={gLogoSrc}
                  alt="G Logo"
                  initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                />

                <motion.img
                  src={elouTextSrc}
                  alt="elou Text"
                  initial={{
                    opacity: 0,
                    x: -25,
                    clipPath: 'inset(0% 100% 0% 0%)',
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    clipPath: 'inset(0% 0% 0% 0%)',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.45,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}