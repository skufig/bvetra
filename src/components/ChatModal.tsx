// components/ChatModal.tsx
import React, { useEffect, useRef, useState } from 'react'
import { FiX, FiSend } from 'react-icons/fi'

type Props = { open: boolean; onClose: () => void; isEn?: boolean }

type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string }

export default function ChatModal({ open, onClose, isEn = false }: Props) {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      setMessages([])
      setInput('')
    } else {
      // initial system prompt (assistant will act as site assistant)
      const sys: Msg = { id: 'sys-1', role: 'system', text: isEn ? 'You are a helpful assistant for Bvetra website. Help users navigate, answer questions and help create bookings. If user asks to book, ask required fields and offer to submit booking.' : 'Вы помощник сайта Bvetra. Помогайте с навигацией и оформлением заявок. Если пользователь хочет забронировать, запросите данные и предложите отправить заявку.' }
      setMessages([sys])
    }
  }, [open, isEn])

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight }) }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim()) return
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages((s) => [...s, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, messages }),
      })
      const json = await res.json()
      if (res.ok && json.reply) {
        const assistant: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: json.reply }
        setMessages((s) => [...s, assistant])
        // if assistant suggests to create booking and user confirms, the assistant can instruct user to type "Create booking" — or use quick action
      } else {
        const assistant: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: isEn ? 'Sorry, something went wrong.' : 'Извините, произошла ошибка.' }
        setMessages((s) => [...s, assistant])
      }
    } catch (e) {
      setMessages((s) => [...s, { id: `a-${Date.now()}`, role: 'assistant', text: isEn ? 'Network error' : 'Ошибка сети' }])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-70 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 bg-[color:var(--bg)] dark:bg-[color:var(--surface-1)] rounded-t-xl md:rounded-xl shadow-elevated overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="font-semibold">{isEn ? 'Assistant' : 'Помощник'}</div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-[color:var(--primary)]/12"><FiX /></button>
        </div>

        <div ref={listRef} className="p-3 h-72 overflow-auto space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[90%] ${m.role === 'user' ? 'ml-auto bg-[color:var(--primary)]/10 text-[color:var(--text)] p-2 rounded-lg' : m.role === 'assistant' ? 'bg-[color:var(--surface-1)] p-2 rounded-lg' : 'sr-only'}`}>
              <div className="text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex gap-2 items-center">
          <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ sendMessage(input) } }} placeholder={isEn ? 'Ask me about the site or create a booking...' : 'Спросите меня о сайте или оформите бронь...'} className="flex-1 px-3 py-2 rounded border" />
          <button onClick={() => sendMessage(input)} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary btn-lift">
            <FiSend /> {loading ? (isEn ? '...' : '...') : (isEn ? 'Send' : 'Отправить')}
          </button>
        </div>
      </div>
    </div>
  )
}
