import smartplateCover from '../assets/smartplate-cover.png'
import landrecordsCover from '../assets/landrecords-cover.png'
import maisnutriCover from '../assets/maisnutri-cover.png'
import uiuxDesignCover from '../assets/C2WAD.png'
import volterraCover from '../assets/volterra-cover.png'
import volterraDesignSystem from '../assets/volterra-design-system.png'
import helixCover from '../assets/helix-cover.png'
import helixBefore from '../assets/helix-before.png'

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
  tags: string[]
  // Optional until a screenshot is added - card falls back to a placeholder.
  imageUrl?: string
  metric?: string
  /**
   * The deployed site. A discriminated union so a 'live' entry cannot exist
   * without a url - the alternative, an optional url alongside a status flag,
   * lets a dead "Visit site" button ship.
   */
  live?: { status: 'live'; url: string } | { status: 'coming-soon' }
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
    description:
      'Website redesign for a Sydney construction firm, built in Wix with custom HTML and CSS - a brand-led layout across services, portfolio and testimonials, plus an SEO setup so the work is findable.',
    tags: ['UI/UX Design', 'Wix', 'HTML', 'CSS', 'SEO Optimization'],
    imageUrl: helixCover,
    metric: 'Redesign + SEO',
    live: { status: 'coming-soon' },
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
    description:
      'Flutter app that spots nitrogen, phosphorus, and potassium deficiencies in a corn leaf entirely offline - a YOLOv8 detector and an EfficientNetB0 classifier run on-device, then a recommendation screen returns the matching fertilizer, rate, and timing.',
    tags: ['Flutter', 'Dart', 'TensorFlow Lite', 'YOLOv8', 'EfficientNetB0', 'PostgreSQL'],
    imageUrl: maisnutriCover,
    metric: 'On-device AI',
  },
  {
    href: '/project/landkoto-land-record-management-system',
    eyebrow: 'Web App',
    status: 'Project Based',
    title: 'LandKoTo: Land Record Management System',
    shortTitle: 'LandKoTo',
    description:
      "One web platform replacing an assessor's office's Excel sheets and paper folders - property records, document storage, an interactive map, automated certificates, and an audit trail that keeps ownership history traceable.",
    tags: ['UI/UX Design', 'PHP', 'MySQL', 'Bootstrap'],
    imageUrl: landrecordsCover,
    metric: 'Centralized GIS',
  },
  {
    href: '/project/smart-plate-ai-meal-planning-app',
    eyebrow: 'Mobile App',
    status: 'Project Based',
    title: 'Smart Plate: AI Meal Planning App',
    shortTitle: 'Smart Plate',
    description:
      'Mobile app that generates the meal plan rather than just logging it - dietary preferences and health goals in, a personalized plan, shopping list, and real-time nutritional breakdowns out, with alerts when calories or nutrients drift off target.',
    tags: ['UI/UX Design', 'Flutter', 'Dart', 'PostgreSQL'],
    imageUrl: smartplateCover,
    metric: 'Real-time AI',
  },
  {
    href: '/project/volterra-electric',
    eyebrow: 'UI/UX Design',
    status: 'Personal project',
    title: 'Volterra Electric',
    description:
      'Self-directed concept brand for an electrical contractor - a landing page taken all the way through to a documented design system, with palette, type scale, and pixel-level component specs proven out in a live sandbox.',
    tags: ['UI/UX Design', 'Design System', 'Figma'],
    imageUrl: volterraCover,
    designSystemImageUrl: volterraDesignSystem,
  },
  {
    href: '/project/c2wad-delivery-app',
    eyebrow: 'UI/UX Design',
    status: 'Personal project',
    title: 'C2WAD Delivery App',
    description:
      'Self-directed Figma concept for a food delivery app designed as a complete loop - browsing and ordering, live tracking, payments, notifications, support, and rewards, built as high-fidelity screens with their real states.',
    tags: ['UI/UX Design', 'Figma'],
    imageUrl: uiuxDesignCover,
  },
]
