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
      const sysMsg: Msg = {
        id: 'sys-1',
        role: 'system',
        text: isEn ? 'You are a helpful assistant for Bvetra website.' : 'Вы помощник сайта Bvetra.'
      }
      setMessages([sysMsg])
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, isEn])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, messages })
      })
      const json = await res.json()
      const replyText =
        res.ok && json?.reply
          ? json.reply
          : isEn
            ? 'Sorry, something went wrong'
            : 'Извините, ошибка'

      const assistantMsg: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: replyText }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      const errMsg: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: isEn ? 'Network error' : 'Ошибка сети' }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Фон для закрытия */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Модальное окно */}
      <div className="relative w-full max-w-xl md:max-w-3xl bg-white dark:bg-[#061018] rounded-xl shadow-2xl flex flex-col transition-transform transform-gpu animate-slideUpDown outline-none focus:outline-none mx-4">
        {/* Заголовок и закрытие */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">{isEn ? 'Assistant' : 'Помощник'}</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#0b1116]" aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        {/* Сообщения */}
        <div ref={listRef} className="flex-1 p-3 overflow-auto space-y-3 max-h-[60vh] md:max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          {messages.map(m => (
            <div
              key={m.id}
              className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto bg-indigo-50' : m.role === 'assistant' ? 'bg-gray-100' : 'sr-only'} p-2 rounded`}
            >
              <div className="text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>

        {/* Ввод и кнопки */}
        <div className="p-3 border-t flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder={isEn ? 'Ask about services or create a booking...' : 'Спросите о сервисах или оформите бронь...'}
            className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiSend /> {isEn ? 'Send' : 'Отправить'}
          </button>
        </div>

        {/* Быстрые команды */}
        <div className="p-3 border-t bg-gray-50 flex flex-wrap gap-2 md:gap-4">
          <button
            onClick={() => {
              const cmd = isEn ? 'Create booking' : 'Оформить бронь'
              setInput(cmd)
              sendMessage(cmd)
            }}
            className="px-3 py-2 rounded border text-sm hover:bg-gray-100"
          >
            {isEn ? 'Create booking' : 'Оформить бронь'}
          </button>
          <button
            onClick={() => {
              const cmd = isEn ? 'Show fleet' : 'Показать автопарк'
              setInput(cmd)
              sendMessage(cmd)
            }}
            className="px-3 py-2 rounded border text-sm hover:bg-gray-100"
          >
            {isEn ? 'Fleet' : 'Автопарк'}
          </button>
        </div>
      </div>
    </div>
  )
}