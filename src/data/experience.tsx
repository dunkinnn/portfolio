export interface Role {
  title: string
  company: string
  type: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

// Ordered by most recent end date, so the ongoing role leads and the
// internship closes the list. Shared by the condensed Experience section
// (homepage) and the full detail page (#/experience).
export const roles: Role[] = [
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    type: 'Project-Based',
    period: 'May 2024 - Present',
    location: 'Isabela, Cagayan Valley, Philippines · Remote',
    summary:
      'Take on freelance web development projects on a project basis for individual clients - most recently a web-based Land Records Management System to streamline property record management and administrative workflows, alongside data visualization work to make client data easier to act on.',
    highlights: [
      'Developed a secure platform for managing land ownership records, property transactions, and digital documentation.',
      'Built role-based authentication and user access control to ensure secure data management.',
      'Designed responsive user interfaces and implemented backend functionality using PHP, JavaScript, MySQL, HTML, and CSS.',
      'Built data visualization dashboards and reports so clients can make sense of their records and operations data.',
      'Automated document generation, email notifications, and reporting to improve operational efficiency.',
      'Collaborated throughout the development lifecycle, from system planning and database design to deployment and testing.',
    ],
  },
  {
    title: 'UI/UX Designer',
    company: 'Freelance',
    type: 'Project-Based',
    period: 'Dec 2025 - Sep 2026 · 10 mos',
    location: 'Isabela, Cagayan Valley, Philippines · Remote',
    summary:
      "Design work taken from first screen to handoff - a language learning centre's student portal in Doha designed end to end in Figma, alongside self-directed concept work carried through to a documented design system.",
    highlights: [
      "Designed a language learning centre's student portal end to end - the course catalogue and enrolment, per-skill progress, graded exam sessions leading to a certificate, and the paid upgrade tier.",
      'Built a proficiency breakdown that scores grammar, vocabulary, reading, and writing separately, rather than reducing a learner to one number.',
      "Structured that portal's exams around sessions - each attempt graded and dated, the set unlocking a certificate - so learners can see what is left before they qualify.",
      'Held self-directed work to the same standard: Volterra carried from brand and landing page through to a documented design system with palette, type scale, and pixel-level component specs.',
      'Designed C2WAD as a full delivery loop - browsing, ordering, live tracking, payments, notifications, support, and rewards - rather than the three screens a concept usually stops at.',
      'Drew every screen in its real states - empty, loading, partial progress, mixed grades - so handoff needed no guesswork about the in-between cases.',
    ],
  },
  {
    title: 'Student Intern',
    company: 'SDO Cagayan',
    type: 'Internship',
    period: 'Feb 2026 - Jun 2026 · 5 mos',
    location: 'Tuguegarao, Cagayan Valley, Philippines · On-site',
    summary:
      'Supported IT operations and contributed to the development and maintenance of internal digital systems at the Schools Division Office of Cagayan.',
    highlights: [
      'Assisted in developing and maintaining web-based applications using PHP, MySQL, HTML, CSS, and JavaScript.',
      'Designed and improved user interfaces to enhance usability and accessibility.',
      'Organized and maintained digital records, ensuring accurate documentation and efficient data management.',
      'Provided technical support by troubleshooting hardware, software, and system-related issues.',
      'Collaborated with the ICT team to improve internal workflows and support daily operations.',
    ],
  },
]

// Per reference: date range in a fixed-width left column, role info on the
// right. Only the dates (not the "· 5 mos" duration suffix already baked
// into `period`) belong in that column.
export function dateRange(period: string) {
  return period.split(' · ')[0]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "May 2024" -> a month count, so two labels can be subtracted.
function monthIndex(label: string) {
  const [name, year] = label.trim().split(/\s+/)
  const month = MONTHS.indexOf(name.slice(0, 3))
  return month < 0 || !year ? null : Number(year) * 12 + month
}

// Counts both end months, matching how the finished periods are written by
// hand above: Feb 2026 - Jun 2026 reads as 5 mos, not 4.
function spanLabel(months: number) {
  const yrs = Math.floor(months / 12)
  const mos = months % 12
  const parts: string[] = []
  if (yrs) parts.push(`${yrs} ${yrs === 1 ? 'yr' : 'yrs'}`)
  if (mos) parts.push(`${mos} ${mos === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ')
}

// The "5 mos" / "2 yrs 5 mos" half of `period` - unused by `dateRange`
// above, shown instead as a small pill on the row's trailing edge. A finished
// role states its own; an ongoing one omits it and is counted from its start
// date, because a hardcoded figure for a role still running is wrong a month
// later.
export function duration(period: string) {
  const [range, stated] = period.split(' · ')
  if (stated) return stated

  const start = monthIndex(range.split(' - ')[0])
  if (start === null) return ''

  const now = new Date()
  return spanLabel(now.getFullYear() * 12 + now.getMonth() - start + 1)
}

// First letter of the first two words (splitting on spaces and hyphens, so
// "SDO Cagayan" becomes "SC") - stands in for a company logo. A single-word
// name (e.g. "Freelance") has no second word to take a letter from, so it
// falls back to that word's own first two letters ("FR") instead of just one.
export function initials(company: string) {
  const words = company.split(/[\s-]+/).filter(Boolean)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}
