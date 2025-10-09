// pages/api/booking.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type BookingPayload = {
  name: string
  phone: string
  email?: string
  from: string
  to: string
  date: string
  time?: string
  notes?: string
}

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SITE_OWNER_EMAIL = process.env.SITE_OWNER_EMAIL
const FROM_EMAIL = process.env.FROM_EMAIL || `no-reply@${process.env.VERCEL_URL || 'example.com'}`
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const BITRIX_WEBHOOK_URL = process.env.BITRIX_WEBHOOK_URL

async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('SMTP not configured, skipping email')
    return
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })
  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html
    })
  } catch (e) {
    console.error('sendMail error', e)
  }
}

async function notifyTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram not configured')
    return
  }
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' })
  })
}

async function notifyBitrix(payload: BookingPayload) {
  if (!BITRIX_WEBHOOK_URL) {
    console.warn('Bitrix not configured')
    return
  }
  try {
    await fetch(BITRIX_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка: ${payload.name} ${payload.from} → ${payload.to}`,
          NAME: payload.name,
          PHONE: [{ VALUE: payload.phone, VALUE_TYPE: 'WORK' }],
          EMAIL: payload.email ? [{ VALUE: payload.email, VALUE_TYPE: 'WORK' }] : [],
          COMMENTS: `Дата: ${payload.date} ${payload.time || ''}\nПримечания: ${payload.notes || ''}`
        },
        params: { REGISTER_SONET_EVENT: 'Y' }
      })
    })
  } catch (e) {
    console.error('Bitrix notify error', e)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' })
  try {
    const body = req.body as BookingPayload
    if (!body || !body.name || !body.phone || !body.from || !body.to || !body.date) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' })
    }

    const html = `
      <h2>Новая заявка на трансфер</h2>
      <p><strong>Имя:</strong> ${body.name}</p>
      <p><strong>Телефон:</strong> ${body.phone}</p>
      <p><strong>Email:</strong> ${body.email || '—'}</p>
      <p><strong>Маршрут:</strong> ${body.from} → ${body.to}</p>
      <p><strong>Дата / Время:</strong> ${body.date} ${body.time || ''}</p>
      <p><strong>Примечания:</strong> ${body.notes || '—'}</p>
      <hr/>
      <p>Отправлено с сайта: ${process.env.VERCEL_URL || 'local'}</p>
    `
    const text = `Новая заявка: ${body.name} | ${body.phone} | ${body.email || '-'} | ${body.from} → ${body.to} | ${body.date} ${body.time || ''}`

    if (SITE_OWNER_EMAIL) await sendMail({ to: SITE_OWNER_EMAIL, subject: `Новая заявка: ${body.name}`, html, text })
    if (body.email) await sendMail({ to: body.email, subject: 'Подтверждение заявки — Bvetra', html: `<p>Здравствуйте ${body.name},</p><p>Ваша заявка принята.</p>`, text: 'Ваша заявка принята.' })

    const tgText = `<b>Новая заявка</b>\nИмя: ${body.name}\nТелефон: ${body.phone}\nМаршрут: ${body.from} → ${body.to}\nДата: ${body.date} ${body.time || ''}`
    await notifyTelegram(tgText)
    await notifyBitrix(body)

    return res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('Booking error', err)
    return res.status(500).json({ ok: false, message: err.message || 'Server error' })
  }
}
