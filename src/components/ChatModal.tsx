// src/components/ChatModal.tsx
import React, { useEffect, useRef, useState } from 'react'
import { FiX, FiSend } from 'react-icons/fi'

type Props = { open: boolean; onClose: () => void; lang?: 'ru' | 'en' }

type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string }

export default function ChatModal({ open, onClose, lang = 'ru' }: Props) {
  const isEn = lang === 'en'
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      setMessages([])
      setInput('')
    } else {
      const sys: Msg = {
        id: 'sys-1',
        role: 'system',
        text: isEn ? 'You are a helpful assistant for Bvetra website.' : 'Вы помощник сайта Bvetra.'
      }
      setMessages([sys])
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, isEn])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim()) return

    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, messages })
      })
      const json = await res.json()
      const replyText: string =
        res.ok && json && typeof json.reply === 'string'
          ? json.reply
          : isEn
          ? 'Sorry, something went wrong'
          : 'Извините, ошибка'

      const assistantMsg: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: replyText }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      const errMsg: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: isEn ? 'Network error' : 'Ошибка сети' }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-[#061018] rounded-t-xl md:rounded-xl shadow-2xl overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="font-semibold">{isEn ? 'Assistant' : 'Помощник'}</div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <FiX />
          </button>
        </div>

        <div ref={listRef} className="p-3 h-72 overflow-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] ${
                m.role === 'user' ? 'ml-auto bg-indigo-50 p-2 rounded' : m.role === 'assistant' ? 'bg-gray-100 p-2 rounded' : 'sr-only'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex gap-2 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage(input)
            }}
            placeholder={isEn ? 'Ask about services or create a booking...' : 'Спросите о сервисах или оформите бронь...'}
            className="flex-1 px-3 py-2 rounded border"
          />
          <button onClick={() => sendMessage(input)} disabled={loading} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-600 text-white">
            <FiSend /> {isEn ? 'Send' : 'Отправить'}
          </button>
        </div>

        <div className="p-3 border-t bg-gray-50 flex gap-2">
          <button
            onClick={() => {
              const cmd = isEn ? 'Create booking' : 'Оформить бронь'
              setInput(cmd)
              sendMessage(cmd)
            }}
            className="px-3 py-2 rounded border text-sm"
          >
            {isEn ? 'Create booking' : 'Оформить бронь'}
          </button>
          <button
            onClick={() => {
              const cmd = isEn ? 'Show fleet' : 'Показать автопарк'
              setInput(cmd)
              sendMessage(cmd)
            }}
            className="px-3 py-2 rounded border text-sm"
          >
            {isEn ? 'Fleet' : 'Автопарк'}
          </button>
        </div>
      </div>
    </div>
  )
}
