import { defineConfig, loadEnv, type Plugin, type PluginOption, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import JavaScriptObfuscator from 'javascript-obfuscator'

// Set OBFUSCATE=false in .env to skip this; it roughly doubles bundle size.
function obfuscateBundle(): Plugin {
  return {
    name: 'obfuscate-bundle',
    apply: 'build',
    // Must run after Vite's minifier or the mangling gets undone.
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || !fileName.endsWith('.js')) continue

        const out = JavaScriptObfuscator.obfuscate(chunk.code, {
          compact: true,
          identifierNamesGenerator: 'hexadecimal',
          stringArray: true,
          stringArrayThreshold: 0.75,
          stringArrayEncoding: ['base64'],
          // These four break WebGL shaders or tank runtime speed. Leave off.
          controlFlowFlattening: false,
          deadCodeInjection: false,
          selfDefending: false,
          debugProtection: false,
        })

        chunk.code = out.getObfuscatedCode()
      }
    },
  }
}

// Runs api/contact.ts inside the Vite dev server so `pnpm dev` serves the
// contact form end to end. Dev only - production uses the real Vercel function.
function apiRoutes(env: Record<string, string>): Plugin {
  return {
    name: 'api-routes',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          // This runs in Node, so the key never reaches the browser bundle.
          if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY

          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)

          const headers = new Headers()
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value)
            else if (Array.isArray(value)) headers.set(key, value.join(', '))
          }

          const request = new Request('http://localhost/api/contact', {
            method: req.method ?? 'GET',
            headers,
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          })

          const mod = await server.ssrLoadModule('/api/contact.ts')
          const response: Response = await mod.default(request)

          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (err) {
          server.config.logger.error(`api/contact failed: ${String(err)}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Dev API route crashed.', detail: String(err) }))
        }
      })
    },
  }
}

// Canonical origin for every absolute URL the build emits. One constant so a
// custom domain is a one-line change here, not a find-and-replace.
const SITE_URL = 'https://angelou-bulauan.vercel.app'

// Static routes, in the order App.tsx matches them. Project pages are added
// from the project data at build time.
const STATIC_PAGES = [
  {
    route: '/',
    // Homepage keeps index.html's own title and description.
    title: null,
    description: null,
  },
  {
    route: '/projects',
    title: 'Projects - Angelou Bulauan',
    description:
      'Case studies from Angelou Bulauan: web platforms, mobile apps and interface design, each with the stack, the role and what the work involved.',
  },
  {
    route: '/skills',
    title: 'Skills and Tools - Angelou Bulauan',
    description:
      'The languages, frameworks, design tools and databases Angelou Bulauan actually works in - frontend, backend, mobile, design and SEO.',
  },
  {
    route: '/experience',
    title: 'Experience - Angelou Bulauan',
    description:
      'Freelance development, UI/UX design and internship experience of Angelou Bulauan, with what each role involved.',
  },
  {
    route: '/contact',
    title: 'Contact - Angelou Bulauan',
    description:
      'Get in touch with Angelou Bulauan, a full-stack developer and UI/UX designer in Isabela, Philippines, available for freelance and remote work.',
  },
]

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Matches a meta tag by one of its attributes and swaps its content value.
// Tolerant of the multi-line form index.html uses, since [^>] matches newlines.
function setMeta(html: string, attr: string, name: string, value: string) {
  const re = new RegExp(`(<meta[^>]*\\b${attr}="${name}"[^>]*content=")[^"]*(")`)
  return html.replace(re, `$1${escapeAttr(value)}$2`)
}

/**
 * A single-page app serves one index.html for every route, so every page
 * carries the homepage's title, description and canonical - twelve URLs that
 * look like one page to a crawler, and nothing that can rank for a project
 * name. This writes a copy of index.html per route with its own metadata,
 * plus a sitemap listing them. The body stays client-rendered; only the head
 * differs, which is the half that search results and link previews read.
 */
function seoPages(): Plugin {
  return {
    name: 'seo-pages',
    apply: 'build',
    // After the bundle is on disk, so dist/index.html exists to copy from.
    enforce: 'post',
    async closeBundle() {
      const { createServer } = await import('vite')
      const { mkdir, readFile, writeFile } = await import('node:fs/promises')
      const { dirname, join, resolve } = await import('node:path')

      const dist = resolve(process.cwd(), 'dist')
      const template = await readFile(join(dist, 'index.html'), 'utf8')

      // projects.ts imports its cover images, which plain Node cannot load -
      // a throwaway Vite server resolves them the same way the app does.
      const server = await createServer({
        configFile: false,
        appType: 'custom',
        logLevel: 'silent',
        server: { middlewareMode: true },
      })

      let projects: {
        href: string
        title: string
        summary?: string
        description: string
      }[] = []

      try {
        ;({ projects } = await server.ssrLoadModule('/src/data/projects.ts'))
      } finally {
        await server.close()
      }

      const pages = [
        ...STATIC_PAGES,
        ...projects.map((project) => ({
          route: project.href,
          title: `${project.title} - Angelou Bulauan`,
          description: project.summary ?? project.description,
        })),
      ]

      for (const page of pages) {
        const url = `${SITE_URL}${page.route === '/' ? '/' : page.route}`

        let html = template
        html = html.replace(/(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/, `$1${url}$2`)
        html = setMeta(html, 'property', 'og:url', url)

        if (page.title) {
          html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
          html = setMeta(html, 'property', 'og:title', page.title)
          html = setMeta(html, 'name', 'twitter:title', page.title)
        }

        if (page.description) {
          html = setMeta(html, 'name', 'description', page.description)
          html = setMeta(html, 'property', 'og:description', page.description)
          html = setMeta(html, 'name', 'twitter:description', page.description)
        }

        // "/" is dist/index.html; every other route is a directory index, which
        // is what Vercel serves for the extensionless path.
        const file = page.route === '/' ? join(dist, 'index.html') : join(dist, page.route, 'index.html')
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, html)
      }

      const today = new Date().toISOString().slice(0, 10)
      const urls = pages
        .map(
          (page) =>
            `  <url>\n    <loc>${SITE_URL}${page.route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
        )
        .join('\n')

      await writeFile(
        join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )

      this.info?.(`seo-pages: wrote ${pages.length} routes and sitemap.xml`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads every var, including non-VITE_ ones like RESEND_API_KEY.
  const env = loadEnv(mode, process.cwd(), '')

  // react() and tailwindcss() each return an array of plugins, not a single
  // Plugin, so the array needs Vite's PluginOption type (which allows
  // nested arrays) rather than Plugin[].
  const plugins: PluginOption[] = [react(), tailwindcss(), apiRoutes(env), seoPages()]
  if (env.OBFUSCATE !== 'false') plugins.push(obfuscateBundle())

  return { plugins }
})
