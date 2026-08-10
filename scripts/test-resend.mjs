// Standalone Resend check - bypasses Vercel and the API route entirely.
// Run from the project root: node scripts/test-resend.mjs
import { readFileSync, existsSync } from 'node:fs'

const candidates = ['.env', '.env.local']
const found = candidates.filter((f) => existsSync(f))
console.log('env files present:', found.length ? found.join(', ') : 'NONE')

if (!found.length) {
  console.error('No .env or .env.local in this folder. Are you in the project root?')
  process.exit(1)
}

const text = readFileSync(found[0], 'utf8')
const match = text.match(/^\s*RESEND_API_KEY\s*=\s*(.+?)\s*$/m)

if (!match) {
  console.error(`No RESEND_API_KEY line found in ${found[0]}`)
  process.exit(1)
}

const key = match[1].trim()
console.log(`read from: ${found[0]}`)
console.log(`key length: ${key.length} | starts with re_: ${key.startsWith('re_')}`)

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'angeloubulauan04@gmail.com',
    subject: 'Resend direct test',
    text: 'If you received this, Node + your key + Resend all work.',
  }),
})

console.log(`\nHTTP ${res.status}`)
console.log(await res.text())
