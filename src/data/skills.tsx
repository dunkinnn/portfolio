import type { ComponentType } from 'react'
import {
  ChartColumn,
  Clapperboard,
  Code2,
  Database,
  FileSpreadsheet,
  Palette,
  PenTool,
  Webhook,
} from 'lucide-react'
import {
  SiAndroidstudio,
  SiComposer,
  SiCss,
  SiCplusplus,
  SiDart,
  SiFigma,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMariadb,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiNpm,
  SiOpenjdk,
  SiPhp,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVite,
  SiWebflow,
  SiWix,
  SiWordpress,
} from 'react-icons/si'

export interface Tech {
  label: string
  // Either a react-icons brand icon or a lucide-react generic icon (used as
  // a stand-in where no brand icon exists - see comments below).
  Icon: ComponentType<{ className?: string; color?: string }>
  // Official brand color where we have the real logo; a reasonable
  // brand-adjacent color otherwise.
  color: string
}

// Curated to what's actually been confirmed as real - not a generic
// "everything a developer might know" template. Add to this list as you
// pick up more tools; don't pad it with things you don't actually use.
// Shared by the Skills section (ticker) and the full skills page.
export const skillGroups: { title: string; items: Tech[] }[] = [
  {
    title: 'Frontend',
    items: [
      { label: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { label: 'CSS3', Icon: SiCss, color: '#1572B6' },
      { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { label: 'React', Icon: SiReact, color: '#61DAFB' },
      { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { label: 'Vite', Icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    title: 'Design & Prototyping',
    items: [
      { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
      { label: 'Framer', Icon: SiFramer, color: '#0055FF' },
      // No Canva app icon available (the icon set only has the unrelated
      // HTML5 <canvas> mark) - generic palette icon tinted Canva's teal.
      { label: 'Canva', Icon: Palette, color: '#00C4CC' },
      // No Adobe icons available - generic pen-tool icon tinted Adobe red.
      { label: 'Adobe', Icon: PenTool, color: '#FF0000' },
      { label: 'Alight Motion', Icon: Clapperboard, color: '#7C3AED' },
    ],
  },
  {
    title: 'Backend & Database',
    items: [
      { label: 'PHP', Icon: SiPhp, color: '#777BB4' },
      { label: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
      { label: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      // No brand icon for Oracle's Java in this set - OpenJDK's logo stands
      // in, tinted with Java's traditional orange.
      { label: 'Java', Icon: SiOpenjdk, color: '#EA2D2E' },
      { label: 'C++', Icon: SiCplusplus, color: '#00599C' },
      { label: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { label: 'MariaDB', Icon: SiMariadb, color: '#003545' },
      { label: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      // No Microsoft SQL Server icon available - generic database icon.
      { label: 'Microsoft SQL Server', Icon: Database, color: '#CC2927' },
      { label: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
      { label: 'API Integration', Icon: Webhook, color: '#0EA5E9' },
    ],
  },
  {
    title: 'Mobile',
    items: [
      { label: 'Flutter', Icon: SiFlutter, color: '#02569B' },
      { label: 'Dart', Icon: SiDart, color: '#0175C2' },
      { label: 'Android Studio', Icon: SiAndroidstudio, color: '#3DDC84' },
    ],
  },
  {
    title: 'CMS & Marketing',
    items: [
      { label: 'WordPress', Icon: SiWordpress, color: '#21759B' },
      { label: 'Webflow', Icon: SiWebflow, color: '#146EF5' },
      { label: 'Wix', Icon: SiWix, color: '#0C6EFC' },
    ],
  },
  {
    title: 'Data Analysis',
    items: [
      { label: 'Data Visualization', Icon: ChartColumn, color: '#0EA5E9' },
      { label: 'Excel', Icon: FileSpreadsheet, color: '#217346' },
    ],
  },
  {
    title: 'Tools & Version Control',
    items: [
      { label: 'Git', Icon: SiGit, color: '#F05032' },
      { label: 'GitHub', Icon: SiGithub, color: '#181717' },
      // No official VS Code icon available - generic code-brackets icon.
      { label: 'VS Code', Icon: Code2, color: '#007ACC' },
      { label: 'Composer', Icon: SiComposer, color: '#885630' },
      { label: 'npm', Icon: SiNpm, color: '#CB3837' },
    ],
  },
]

export function SkillPill({ label, Icon, color }: Tech) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" color={color} />
      {label}
    </span>
  )
}
