import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads every var, including non-VITE_ ones like RESEND_API_KEY.
  const env = loadEnv(mode, process.cwd(), '')

  const plugins: Plugin[] = [react(), tailwindcss(), apiRoutes(env)]
  if (env.OBFUSCATE !== 'false') plugins.push(obfuscateBundle())

  return { plugins }
})
