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
  description: string
  tags: string[]
  // Optional until a screenshot is added - card falls back to a placeholder.
  imageUrl?: string
  metric?: string
  // Full write-up shown on the project's detail page; falls back to the
  // short description above when a project does not have one yet.
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
    status: 'Ongoing',
    title: 'Corn Leaf Nutrient Deficiency Detector',
    description:
      'Freelance-built mobile app that detects nitrogen, phosphorus, and potassium deficiencies in corn leaves on-device, using YOLOv8 detection and an EfficientNetB0 classifier.',
    tags: ['Flutter', 'Dart', 'TensorFlow Lite', 'YOLOv8', 'EfficientNetB0', 'PostgreSQL'],
    imageUrl: maisnutriCover,
    metric: 'On-device AI',
    story: [
      'Corn is one of the most widely grown crops in the Philippines, and Isabela-where this project is based-produces more of it than any other province. Nitrogen, phosphorus, and potassium deficiencies can cut yield by 30-50%, but the visible symptoms usually do not show up until well after the window for correcting them has passed, leaving farmers to diagnose leaves by eye in the field.',
      'I was brought on as a freelance developer to build the mobile half of this project. The app runs two trained models entirely on-device: a YOLOv8 detector that localizes the affected region on a leaf, and an EfficientNetB0 classifier that identifies which nutrient is deficient. My role covered building the Flutter app and integrating both models, exported to TensorFlow Lite, so detection and classification work without needing internet connectivity.',
      'On top of the detection pipeline, the app includes a rule-based recommendation screen: once a deficiency is classified, it surfaces the matching fertilizer type, application rate, and timing guidance, logging the results for later reference.',
    ],
  },
  {
    href: '/project/landkoto-land-record-management-system',
    eyebrow: 'Web App',
    status: 'Ongoing',
    title: 'LandKoTo: Land Record Management System',
    description:
      'Web-based land record system replacing manual Excel and paper files with centralized property records and mapping.',
    tags: ['UI/UX Design', 'PHP', 'MySQL', 'Bootstrap'],
    imageUrl: landrecordsCover,
    metric: 'Centralized GIS',
    story: [
      'LandKoTo was built for a local government assessor\'s office that was still running land records through Excel sheets and physical folders - tax declarations, land titles, and property details spread across separate files, with title books that had to be searched by hand whenever a record was needed. When a property changed hands, the previous owner\'s name was simply overwritten, so there was no trail of past ownership to fall back on.',
      'I worked on this as a capstone system for a college research group, focused on the front end and the PHP/MySQL data layer. The goal was to move that whole workflow into one web-based platform: land information management, document and image storage, an interactive map of property locations, automated form and certificate generation, and a full audit trail so record changes - including ownership transfers - stay traceable instead of disappearing.',
      'Access is role-based: assessors get full control over records, assessments, documents, and user accounts; support staff can manage records and documents but not the audit trail or user management; and landowners get a lighter self-service view of their own property, documents, and certificates.',
    ],
  },
  {
    href: '/project/smart-plate-ai-meal-planning-app',
    eyebrow: 'Mobile App',
    status: 'Ongoing',
    title: 'Smart Plate: AI Meal Planning App',
    description:
      'AI-powered mobile app that generates personalized meal plans and real-time nutritional insights.',
    tags: ['UI/UX Design', 'Flutter', 'Dart', 'PostgreSQL'],
    imageUrl: smartplateCover,
    metric: 'Real-time AI',
    story: [
      'Eating well usually comes down to planning ahead, but most people either do not have the time to plan meals themselves or do not have the nutrition background to put together a balanced plan. Existing apps are good at tracking what you already ate - Smart Plate was built to handle the harder part: generating the plan itself.',
      'I worked on this as a capstone project for a college research group, contributing the Flutter front end and the Dart/PostgreSQL data layer. Users set their dietary preferences and health goals - including vegetarian, vegan, gluten-free, and keto paths - and the app generates a personalized meal plan around them, along with a shopping list and real-time nutritional breakdowns for each meal.',
      'The app keeps users on track with calorie and nutrient alerts when they are running over or under their targets. By design, meal plans are not hand-edited - users pick from the alternatives the system offers instead - while an admin role manages the underlying food database and keeps the AI recommendations accurate over time.',
    ],
  },
  {
    href: '/project/volterra-electric',
    eyebrow: 'UI/UX Design',
    status: 'Personal project',
    title: 'Volterra Electric',
    description:
      'Self-directed concept project: a landing page and full design system for a fictional electrical contractor brand, built to practice pairing a UI design with a documented token system.',
    tags: ['UI/UX Design', 'Design System', 'Figma'],
    imageUrl: volterraCover,
    designSystemImageUrl: volterraDesignSystem,
    story: [
      'Volterra Electric is a self-directed practice project, not client work - I built it to go through the full process of designing a brand landing page and then formalizing it into a reusable design system, the way I would for a real handoff to developers.',
      'The palette centers on a primary orange (#F5A624) for CTAs and highlights, paired with a near-black background (#1E1E1E) and a supporting range of off-white, muted blue-gray, and charcoal tones for text, secondary panels, and shadows - a look meant to read as bold and trustworthy for a contractor brand.',
      'Typography runs on a two-weight display pairing (75px Extra Bold / 75px Medium) for hero headlines, with a defined scale below it for kickers, body text, buttons, nav links, and stat callouts, each with its own size, weight, and use case documented.',
      'Components are specified down to the pixel: primary and secondary buttons (8px corner radius, 51px height, exact fill/stroke/text values), a 40x40px avatar frame, and 92px horizontal section padding, then proven out in a live component sandbox that compiles the token set into a working navigation header.',
    ],
  },
  {
    href: '/project/c2wad-delivery-app',
    eyebrow: 'UI/UX Design',
    status: 'Coming soon',
    title: 'C2WAD Delivery App',
    description:
      'Designed a user-friendly food delivery mobile app in Figma, covering ordering, delivery tracking, payments, notifications, support, and rewards',
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
