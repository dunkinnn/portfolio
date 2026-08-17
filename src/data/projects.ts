import smartplateCover from '../assets/smartplate-cover.png'
import landrecordsCover from '../assets/landrecords-cover.png'
import maisnutriCover from '../assets/maisnutri-cover.png'
import uiuxDesignCover from '../assets/C2WAD.png'
import volterraCover from '../assets/volterra-cover.png'

export interface Project {
  href: string
  eyebrow: string
  status?: string
  title: string
  description: string
  tags: string[]
  // Optional until a screenshot is added - card falls back to a placeholder.
  imageUrl?: string
  metric?: string
}

// All cards route to the /projects listing page (see AllProjectsPage) rather
// than individual case-study pages, since only the featured corn project has
// one of those (/project, linked from Hero instead). Shared by the
// condensed Projects section (homepage) and the full listing page
// (/projects).
export const projects: Project[] = [
  {
    href: '/projects',
    eyebrow: 'Mobile App',
    status: 'Ongoing',
    title: 'Corn Leaf Nutrient Deficiency Detector',
    description:
      'Freelance-built mobile app that detects nitrogen, phosphorus, and potassium deficiencies in corn leaves on-device, using YOLOv8 detection and an EfficientNetB0 classifier.',
    tags: ['Flutter', 'TensorFlow Lite', 'YOLOv8', 'PostgreSQL'],
    imageUrl: maisnutriCover,
    metric: 'On-device AI',
  },
  {
    href: '/projects',
    eyebrow: 'Web App',
    status: 'Ongoing',
    title: 'LandKoTo: Land Record Management System',
    description:
      'Web-based land record system replacing manual Excel and paper files with centralized property records and mapping.',
    tags: ['UI/UX Design', 'PHP', 'MySQL', 'Bootstrap'],
    imageUrl: landrecordsCover,
    metric: 'Centralized GIS',
  },
  {
    href: '/projects',
    eyebrow: 'Mobile App',
    status: 'Ongoing',
    title: 'Smart Plate: AI Meal Planning App',
    description:
      'AI-powered mobile app that generates personalized meal plans and real-time nutritional insights.',
    tags: ['UI/UX Design', 'Flutter', 'Dart', 'PostgreSQL'],
    imageUrl: smartplateCover,
    metric: 'Real-time AI',
  },
  {
    href: '/projects',
    eyebrow: 'UI/UX Design',
    status: 'Coming soon',
    title: 'Volterra Electric',
    description:
      'Landing Page design for an electrical contractor, built around a bold, trust-focused layout with clear calls to action.',
    tags: ['UI/UX Design', 'Figma'],
    imageUrl: volterraCover,
  },
  {
    href: '/projects',
    eyebrow: 'UI/UX Design',
    status: 'Coming soon',
    title: 'C2WAD Delivery App',
    description:
      'Designed a user-friendly food delivery mobile app in Figma, covering ordering, delivery tracking, payments, notifications, support, and rewards',
    tags: ['UI/UX Design', 'Figma'],
    imageUrl: uiuxDesignCover,
  },
  {
    href: '/projects',
    eyebrow: 'New project',
    status: 'Coming soon',
    title: 'Project Coming Soon',
    description: 'Case study coming soon.',
    tags: ['UI/UX Design', 'Figma'],
  },
]
