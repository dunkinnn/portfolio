import smartplateCover from '../assets/smartplate-cover.png'
import landrecordsCover from '../assets/landrecords-cover.png'
import maisnutriCover from '../assets/maisnutri-cover.png'
import uiuxDesignCover from '../assets/C2WAD.png'
import volterraCover from '../assets/volterra-cover.png'
import volterraDesignSystem from '../assets/volterra-design-system.png'

export interface Project {
  href: string
  eyebrow: string
  status?: string
  title: string
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
   * Long-form write-up for the detail page, shown under the cover. No project
   * uses it right now - every one leads with its `description` instead - but
   * the template still renders it for any project that gets one later.
   */
  story?: string[]
  // Optional second image on the detail page for a design-system sheet
  // (palette, type scale, components) alongside the main mockup.
  designSystemImageUrl?: string
}

// Every card links to its own detail page at /project/<slug> (see
// pages/ProjectPage.tsx, a generic template that looks up the project by
// matching its href). Shared by the condensed Projects section (homepage)
// and the full listing page (/projects).
export const projects: Project[] = [
  {
    href: '/project/corn-leaf-nutrient-deficiency-detector',
    eyebrow: 'Mobile App',
    status: 'Project Based',
    title: 'Corn Leaf Nutrient Deficiency Detector',
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
  {
    href: '/project/project-coming-soon',
    eyebrow: 'New project',
    status: 'Coming soon',
    title: 'Project Coming Soon',
    description: 'Case study coming soon.',
    tags: ['UI/UX Design', 'Figma'],
  },
]
