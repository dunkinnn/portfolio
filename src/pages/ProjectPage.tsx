import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { stagger, useRiseVariant } from '../lib/motion'
import { projects } from '../data/projects'

// Standalone page at /project, linked from Hero's featured work card.
// Real project: freelance-built mobile app detecting corn leaf nutrient
// deficiencies, commissioned by a client's research team.
const project = projects.find((p) => p.title.includes('Corn Leaf'))!

export default function ProjectPage() {
  const item = useRiseVariant()

  return (
    <div className="min-h-screen w-full bg-white text-slate-600 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
        <a
          href="/#hero"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </a>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <motion.div variants={item} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Featured work
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Ongoing
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            Corn Leaf Nutrient Deficiency Detector
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
          >
            A mobile app that lets farmers photograph a corn leaf and get an on-device diagnosis—nitrogen,
            phosphorus, or potassium deficiency—with matching fertilizer guidance.
          </motion.p>

          {/* Adjusted height using aspect-[2/1] to match the Hero card aspect ratio */}
          <motion.div
            variants={item}
            className="relative mt-8 aspect-[2/1] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-indigo-500/5"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              onError={(e) => {
                // Gracefully handle missing local image paths
                e.currentTarget.style.display = 'none'
              }}
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.12),transparent_60%)]" />
          </motion.div>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
            {['Flutter', 'Dart', 'TensorFlow Lite', 'YOLOv8', 'EfficientNetB0', 'PostgreSQL'].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-500 dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              Corn is one of the most widely grown crops in the Philippines, and Isabela—where
              this project is based—produces more of it than any other province. Nitrogen,
              phosphorus, and potassium deficiencies can cut yield by 30–50%, but the visible
              symptoms usually do not show up until well after the window for correcting them has
              passed, leaving farmers to diagnose leaves by eye in the field.
            </p>
            <p>
              I was brought on as a freelance developer to build the mobile half of this project.
              The app runs two trained models entirely on-device: a YOLOv8 detector that localizes
              the affected region on a leaf, and an EfficientNetB0 classifier that identifies which
              nutrient is deficient. My role covered building the Flutter app and integrating both
              models, exported to TensorFlow Lite, so detection and classification work without
              needing internet connectivity.
            </p>
            <p>
              On top of the detection pipeline, the app includes a rule-based recommendation
              screen: once a deficiency is classified, it surfaces the matching fertilizer type,
              application rate, and timing guidance, logging the results for later reference.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}