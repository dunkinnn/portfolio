// Node runtime (the default). Edge was dropped because vercel dev did not
// inject the env var into edge functions locally.
// The API key comes from .env in dev, or the Vercel dashboard once deployed.
interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
  company?: string
}

// Best-effort per-instance rate limit; a speed bump against bots.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()

  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS
  )

  recent.push(now)
  hits.set(ip, recent)

  return recent.length > MAX_PER_WINDOW
}

export default async function handler(
  request: Request
): Promise<Response> {
  // Only allow POST
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed' },
      { status: 405 }
    )
  }

  // Get Resend API key
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')

    return Response.json(
      { error: 'Server not configured.' },
      { status: 500 }
    )
  }

  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ??
    'unknown'

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests.' },
      { status: 429 }
    )
  }

  // Parse request body
  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return Response.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const {
    name,
    email,
    subject,
    message,
    company,
  } = payload

  // Honeypot
  if (company) {
    return Response.json({ ok: true })
  }

  // Required fields
  if (!name || !email || !message) {
    return Response.json(
      { error: 'Missing name, email, or message.' },
      { status: 400 }
    )
  }

  // Length limits
  if (
    name.length > 100 ||
    email.length > 200 ||
    message.length > 5000
  ) {
    return Response.json(
      { error: 'Field too long.' },
      { status: 400 }
    )
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: 'Invalid email.' },
      { status: 400 }
    )
  }

  // Send email through Resend
  const resendResponse = await fetch(
    'https://api.resend.com/emails',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'angeloubulauan04@gmail.com',
        reply_to: email,
        subject: subject
          ? `${subject} - from ${name}`
          : `New message from ${name}`,
        text: `From: ${name} <${email}>

${message}`,
      }),
    }
  )

  if (!resendResponse.ok) {
    const detail = await resendResponse.text()

    console.error('Resend error:', detail)

    return Response.json(
      { error: 'Failed to send message.' },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}