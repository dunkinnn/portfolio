export interface Role {
  title: string
  company: string
  type: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

// Reverse-chronological: most recent role first. Shared by the condensed
// Experience section (homepage) and the full detail page (#/experience).
export const roles: Role[] = [
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    type: 'Project-Based',
    period: 'May 2024 - Present · 2 yrs 3 mos',
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
  {
    title: 'UI/UX Designer',
    company: 'Educate Learning Center',
    type: 'Freelance',
    period: 'Dec 2025 - Jan 2026 · 2 mos',
    location: 'Doha, Qatar · Remote',
    summary:
      'Created intuitive, user-centered designs for web and mobile applications, collaborating with the team to turn ideas into responsive, accessible, and visually consistent experiences.',
    highlights: [
      'Designed user-centered interfaces that improved usability and accessibility across web and mobile platforms.',
      'Created wireframes, prototypes, and responsive UI designs using Figma to support a smooth design-to-development workflow.',
      'Enhanced user experience by simplifying navigation, improving layouts, and maintaining a consistent visual design across screens.',
      'Collaborated with developers to ensure accurate implementation of designs while maintaining usability and design consistency.',
    ],
  },
]

// Per reference: date range in a fixed-width left column, role info on the
// right. Only the dates (not the "· 5 mos" duration suffix already baked
// into `period`) belong in that column.
export function dateRange(period: string) {
  return period.split(' · ')[0]
}

// The "5 mos" / "2 yrs 3 mos" half of `period` - unused by `dateRange`
// above, shown instead as a small pill on the row's trailing edge.
export function duration(period: string) {
  return period.split(' · ')[1] ?? ''
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
