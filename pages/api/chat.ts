// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type ReqBody = {
  message: string
  messages?: Array<{ role: string; content: string }>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  const body = req.body as ReqBody
  if (!body || !body.message) return res.status(400).json({ ok: false })

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) return res.status(500).json({ ok: false, message: 'OpenAI key not configured' })

  try {
    // Build a concise prompt: system + history + user message
    const systemPrompt =
      'You are a helpful assistant for Bvetra website. Help users navigate, answer questions about services and fleet, and assist in creating booking requests by asking required fields. Be concise and friendly.'
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(body.messages || []).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: body.message }
    ]

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 700,
        temperature: 0.2
      })
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error('OpenAI error', resp.status, text)
      return res.status(500).json({ ok: false, message: 'OpenAI error' })
    }

    const data = await resp.json()
    const reply = data.choices?.[0]?.message?.content || 'Извините, нет ответа'
    return res.status(200).json({ ok: true, reply })
  } catch (e) {
    console.error('chat error', e)
    return res.status(500).json({ ok: false, message: 'Server error' })
  }
}
