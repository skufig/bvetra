import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, message } = req.body || {}
  if (!email || !message) return res.status(400).json({ error: 'Missing fields' })

  // Configure transporter via environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  })

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'no-reply@example.com',
      to: process.env.CONTACT_EMAIL || process.env.FROM_EMAIL,
      subject: `Website contact from ${name || email}`,
      text: message,
      html: `<p><strong>From:</strong> ${name || 'unknown'} &lt;${email}&gt;</p><p>${message}</p>`
    })
    return res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('Mail error', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
