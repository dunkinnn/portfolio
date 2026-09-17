import smartplateCover from '../assets/smartplate-cover.png'
import landrecordsCover from '../assets/landrecords-cover.png'
import maisnutriCover from '../assets/maisnutri-cover.png'
import uiuxDesignCover from '../assets/C2WAD.png'
import volterraCover from '../assets/volterra-cover.png'
import volterraDesignSystem from '../assets/volterra-design-system.png'
import helixCover from '../assets/helix-cover.png'
import helixBefore from '../assets/helix-before.png'
import educateCover from '../assets/educate-cover.png'

export interface Project {
  href: string
  eyebrow: string
  status?: string
  title: string
  /** Short form for tight spots like the footer's work column. */
  shortTitle?: string
  /**
   * One sentence carrying the whole project. Shown as the lead on the detail
   * page and on every card - clamped to two lines on the home page, in full
   * on /projects.
   */
  description: string
  /**
   * One short line for the card - the cards are a grid to scan, not a place to
   * read a paragraph. The full `description` still leads the detail page.
   */
  summary?: string
  tags: string[]
  // Optional until a screenshot is added - card falls back to a placeholder.
  imageUrl?: string
  /**
   * Extra rows for the case study's meta rail, rendered between Status and
   * Type. A list value stacks on its own lines - a role split across several
   * hats, say. Keep values short, the rail is narrow.
   */
  details?: { label: string; value: string | string[] }[]
  /**
   * Destinations shown as buttons at the top of the meta rail - a deployed
   * site, a Figma file, a repo. A discriminated union so an entry cannot carry
   * a label without a url; the alternative, an optional url, lets a dead
   * button ship. Use the `comingSoon` arm to name a destination that is not
   * ready yet - it renders as a dashed chip with nothing to click. Use the
   * `note` arm for work that has no public destination at all (internal or
   * client-owned); it renders the label verbatim in the same dashed chip.
   */
  links?: Array<
    | { label: string; url: string }
    | { label: string; comingSoon: true }
    | { label: string; note: true }
  >
  /**
   * Long-form write-up for the detail page, shown under the cover. No project
   * uses it right now - every one leads with its `description` instead - but
   * the template still renders it for any project that gets one later.
   */
  story?: string[]
  // Optional second image on the detail page for a design-system sheet
  // (palette, type scale, components) alongside the main mockup.
  designSystemImageUrl?: string
  /**
   * Paired shots for a redesign, rendered side by side under the write-up.
   * One object rather than two loose fields so a lone "before" is impossible.
   * Both images want the same framing and aspect ratio - the comparison is the
   * point, and mismatched crops undercut it.
   */
  beforeAfter?: {
    before: string
    after: string
    /** Optional line under the pair, e.g. what changed and why. */
    caption?: string
  }
}

// Every card links to its own detail page at /project/<slug> (see
// pages/ProjectPage.tsx, a generic template that looks up the project by
// matching its href). Shared by the condensed Projects section (homepage)
// and the full listing page (/projects).
export const projects: Project[] = [
  {
    href: '/project/helix-group',
    eyebrow: 'Web Design & Development',
    status: 'Client project',
    title: 'Helix Group',
    summary: 'Wix redesign and SEO setup for a Sydney construction firm.',
    description:
      'Website redesign for a Sydney construction firm, built in Wix with custom HTML and CSS - a brand-led layout across services, portfolio and testimonials, plus an SEO setup so the work is findable.',
    tags: ['UI/UX Design', 'Wix', 'HTML', 'CSS', 'SEO Optimization'],
    imageUrl: helixCover,
    details: [
      { label: 'Industry', value: 'Construction' },
      { label: 'Platform', value: 'Wix' },
      { label: 'Role', value: ['Web Designer', 'Front-End Developer', 'SEO Specialist'] },
      { label: 'Timeline', value: '3 weeks' },
    ],
    links: [{ label: 'Live site', comingSoon: true }],
    beforeAfter: {
      before: helixBefore,
      after: helixCover,
      caption:
        'The original led with the company name over a photo and ran dark throughout, with long unbroken paragraphs and the services stacked as a plain list. The redesign leads on what Helix actually does, lightens the palette, and breaks the services and project work into sections that can be scanned.',
    },
  },
  {
    href: '/project/corn-leaf-nutrient-deficiency-detector',
    eyebrow: 'Mobile App',
    status: 'Project Based',
    title: 'Corn Leaf Nutrient Deficiency Detector',
    shortTitle: 'Corn Leaf Detector',
    summary: 'Offline Flutter app that reads nutrient deficiency straight off a corn leaf.',
    description:
      'Flutter app that spots nitrogen, phosphorus, and potassium deficiencies in a corn leaf entirely offline - a YOLOv8 detector and an EfficientNetB0 classifier run on-device, then a recommendation screen returns the matching fertilizer, rate, and timing.',
    tags: ['Flutter', 'Dart', 'TensorFlow Lite', 'YOLOv8', 'EfficientNetB0', 'PostgreSQL'],
    imageUrl: maisnutriCover,
    details: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Role', value: 'Mobile Developer' },
      { label: 'Timeline', value: '3 weeks' },
    ],
    links: [{ label: 'Private client work', note: true }],
  },
  {
    href: '/project/landkoto-land-record-management-system',
    eyebrow: 'Web App',
    status: 'Project Based',
    title: 'LandKoTo: Land Record Management System',
    shortTitle: 'LandKoTo',
    summary: "Web platform replacing an assessor's office's paper and spreadsheet records.",
    description:
      "One web platform replacing an assessor's office's Excel sheets and paper folders - property records, document storage, an interactive map, automated certificates, and an audit trail that keeps ownership history traceable.",
    tags: ['UI/UX Design', 'Figma', 'PHP', 'MySQL', 'Bootstrap'],
    imageUrl: landrecordsCover,
    details: [
      { label: 'Platform', value: 'Web' },
      { label: 'Role', value: ['UI/UX Designer', 'Front-End Developer', 'Back-End Developer'] },
      { label: 'Timeline', value: '1 month' },
    ],
    links: [{ label: 'Internal system', note: true }],
  },
  {
    href: '/project/smart-plate-ai-meal-planning-app',
    eyebrow: 'Mobile App',
    status: 'Project Based',
    title: 'Smart Plate: AI Meal Planning App',
    shortTitle: 'Smart Plate',
    summary: 'Meal plans, shopping lists and nutrition tracking built around your goals.',
    description:
      'Mobile app that generates the meal plan rather than just logging it - dietary preferences and health goals in, a personalized plan, shopping list, and real-time nutritional breakdowns out, with alerts when calories or nutrients drift off target.',
    tags: ['UI/UX Design', 'Figma', 'Flutter', 'Dart', 'PostgreSQL'],
    imageUrl: smartplateCover,
    details: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Role', value: ['UI/UX Designer', 'Front-End Developer', 'Back-End Developer'] },
      { label: 'Timeline', value: '3 weeks' },
    ],
    links: [{ label: 'Not publicly available', note: true }],
  },
  {
    href: '/project/volterra-electric',
    eyebrow: 'UI/UX Design',
    status: 'Personal project',
    title: 'Volterra Electric',
    summary: 'Concept landing page for an electrical contractor, plus its design system.',
    description:
      'Self-directed concept brand for an electrical contractor - a landing page taken all the way through to a documented design system, with palette, type scale, and pixel-level component specs proven out in a live sandbox.',
    tags: ['UI/UX Design', 'Design System', 'Figma'],
    imageUrl: volterraCover,
    designSystemImageUrl: volterraDesignSystem,
    details: [
      { label: 'Platform', value: 'Figma' },
      { label: 'Role', value: 'UI/UX Designer' },
      { label: 'Timeline', value: '1 day' },
    ],
    links: [
      {
        label: 'View in Figma',
        url: 'https://www.figma.com/design/VihS53uilqRq21kQHLS0fY/Volterra-Landing-Page?m=auto',
      },
    ],
  },
  {
    href: '/project/c2wad-delivery-app',
    eyebrow: 'UI/UX Design',
    status: 'Personal project',
    title: 'C2WAD Delivery App',
    summary: 'Figma concept for a food delivery app, from browsing to rewards.',
    description:
      'Self-directed Figma concept for a food delivery app designed as a complete loop - browsing and ordering, live tracking, payments, notifications, support, and rewards, built as high-fidelity screens with their real states.',
    tags: ['UI/UX Design', 'Figma'],
    imageUrl: uiuxDesignCover,
    details: [
      { label: 'Platform', value: 'Figma' },
      { label: 'Role', value: 'UI/UX Designer' },
      { label: 'Timeline', value: '2 days' },
    ],
    links: [
      {
        label: 'View in Figma',
        url: 'https://www.figma.com/design/NxriOm6kFnQlUr37vcGyQl/C2WAD---DELIVERY-APP?m=auto',
      },
    ],
  },
  {
    href: '/project/educate-learning-center',
    eyebrow: 'UI/UX Design',
    status: 'Project Based',
    title: 'Educate Learning Center',
    shortTitle: 'Educate Portal',
    summary: 'Student portal concept for a language centre - courses, exams, certificates.',
    description:
      "Figma design for a language learning centre's student portal - learners enrol per course and work through it at their own level, a proficiency breakdown scores grammar, vocabulary, reading and writing separately, and graded exam sessions unlock a certificate once the set is passed, with a paid upgrade tier above the free courses.",
    tags: ['UI/UX Design', 'Figma'],
    imageUrl: educateCover,
    details: [
      { label: 'Platform', value: 'Figma' },
      { label: 'Role', value: 'UI/UX Designer' },
    ],
    links: [{ label: 'Client-owned design', note: true }],
  },
]


