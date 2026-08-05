// Vercel Edge Function - not part of the Vite app, so it isn't covered by
// tsconfig.app.json/tsconfig.node.json; Vercel builds this file separately
// at deploy time. Requires a RESEND_API_KEY environment variable set in the
// Vercel project settings (never commit the key itself).
export const config = { runtime: 'edge' }

interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const { name, email, subject, message } = (await request.json()) as ContactPayload

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing name, email, or message.' }, { status: 400 })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // resend.dev's shared sandbox sender - works without verifying a
      // domain. Swap for an address on your own verified domain once
      // you've set one up in the Resend dashboard.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'angeloubulauan04@gmail.com',
      reply_to: email,
      // Subject field is optional in the form - fall back to a generic line.
      subject: subject ? `${subject} - from ${name}` : `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  })

  if (!resendResponse.ok) {
    const detail = await resendResponse.text()
    console.error('Resend error:', detail)
    return Response.json({ error: 'Failed to send message.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
