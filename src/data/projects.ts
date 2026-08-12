import smartplateCover from '../assets/smartplate-cover.png'
import landrecordsCover from '../assets/landrecords-cover.png'
import maisnutriCover from '../assets/maisnutri-cover.png'

export interface Project {
  href: string
  eyebrow: string
  status?: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
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
    eyebrow: 'Mobile app',
    status: 'Ongoing',
    title: 'Corn Leaf Nutrient Deficiency Detector',
    description:
      'Mobile app for a CS thesis that detects nitrogen, phosphorus, and potassium deficiencies in corn leaves on-device, using YOLOv8 detection and an EfficientNetB0 classifier.',
    tags: ['Flutter', 'TensorFlow Lite', 'YOLOv8'],
    imageUrl: maisnutriCover,
    metric: 'On-device AI',
  },
  {
    href: '/projects',
    eyebrow: 'Web app',
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
    eyebrow: 'Mobile app',
    status: 'Ongoing',
    title: 'Smart Plate: AI Meal Planning App',
    description:
      'AI-powered mobile app that generates personalized meal plans and real-time nutritional insights.',
    tags: ['UI/UX Design', 'Flutter', 'Dart'],
    imageUrl: smartplateCover,
    metric: 'Real-time AI',
  },
]
