import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
  return { plugins: [react(), tailwindcss(), apiRoutes(env)] }
})
