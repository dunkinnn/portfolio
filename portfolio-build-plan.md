# Portfolio Site — Build Plan

Stack: TypeScript, React, Vite, Tailwind CSS, Vercel, Resend (contact form).

## Phase 1: Foundation
- Scaffold: `npm create vite@latest` (react-ts template)
- Install Tailwind, configure `tailwind.config.ts`
- ESLint + Prettier, base folder structure (`src/components`, `src/sections`, `src/lib`)
- Git init, `.gitignore`, first commit
- `docs/activity-log.md` started

## Phase 2: Content & Structure
- Sections: Hero, About, Projects (case studies), Skills/Tech Stack, Experience, Contact, Footer
- Content draft: bio, 3-5 project write-ups (problem, role, stack, outcome), resume PDF link
- Wireframe/section order sign-off before building components

## Phase 3: Components & Styling
- Build sections as components, mobile-first Tailwind layout
- Reusable primitives (Button, Card, SectionWrapper)

## Phase 4: Animation
- Tailwind transitions for hover/focus states
- CSS keyframes for small entrance effects
- Intersection Observer for scroll-reveal on sections
- View Transitions API — optional, progressive enhancement only (no hard dependency)

## Phase 5: Contact Form
- Decide: static form service vs. Resend
- If Resend: Vercel serverless function (`/api/contact`) to send mail, keep API key server-side only, never in client bundle
- Client-side validation + basic spam guard (honeypot or rate limit)

## Phase 6: Deployment
- Vercel project, connect repo, env vars (Resend key) set in Vercel dashboard only
- Custom domain (if any)
- Preview deploys per branch/PR

## Phase 7: Polish & QA
- Responsive check (mobile/tablet/desktop)
- Lighthouse pass: performance, accessibility, SEO
- Meta tags, favicon, OG image
- Cross-browser check on animations

## Notes
- No customer/personal data or credentials committed; Resend key lives in Vercel env vars only
- Commit after each phase, atomic messages, no auto-push
- Review existing files before any refactor once repo is connected
