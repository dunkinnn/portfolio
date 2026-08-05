import { motion } from 'framer-motion'
import { useRiseVariant } from '../lib/motion'

// Simple footer with year, replace with real social links later.
export default function Footer() {
  const item = useRiseVariant()

  return (
    <motion.footer
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500 transition-colors duration-300 dark:border-white/5 dark:bg-slate-950"
    >
      &copy; {new Date().getFullYear()} Your Name
    </motion.footer>
  )
}
