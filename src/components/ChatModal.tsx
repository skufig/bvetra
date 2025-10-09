import React, { useEffect, useRef, useState } from 'react'
import { FiX, FiSend, FiLoader } from 'react-icons/fi'

type Props = { open: boolean; onClose: () => void; lang?: 'ru' | 'en' }

type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string }

export default function ChatModal({ open, onClose, lang = 'ru' }: Props) {
  const isEn = lang === 'en'
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  // Общий статус проекта
  const [status, setStatus] = useState<'connected' | 'connecting' | 'error'>('connected')
  const [messageCount, setMessageCount] = useState(0)

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
      setStatus('connected') // или подключение
      setMessageCount(0)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, isEn])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    setMessageCount(prev => prev + 1)
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

      {/* Основное окно с "мощным" дизайном */}
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-2xl flex flex-col transition-transform transform-gpu animate-slideUpDown outline-none focus:outline-none mx-4 border-4 border-indigo-500/50">
        {/* Заголовок + статус */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-400' : status === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-500'}`}></div>
            <h3 className="text-xl font-semibold text-white">{isEn ? 'Powerful Assistant' : 'Мощный помощник'}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#0b1116]" aria-label="Close">
            <FiX size={20} className="text-white" />
          </button>
        </div>

        {/* Статистика */}
        <div className="px-4 py-2 flex justify-between items-center bg-gray-800 text-gray-200 text-sm border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{isEn ? 'Online' : 'Онлайн'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>{messageCount} messages</span>
            </div>
          </div>
          {/* Можно добавить прогресс или другую информацию */}
        </div>

        {/* Сообщения */}
        <div ref={listRef} className="flex-1 p-4 overflow-auto space-y-3 max-h-[60vh] md:max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          {messages.map(m => (
            <div
              key={m.id}
              className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200' : m.role === 'assistant' ? 'bg-gray-100' : 'sr-only'} p-2 rounded shadow-md`}
            >
              <div className="text-sm whitespace-pre-wrap text-gray-800">{m.text}</div>
            </div>
          ))}
        </div>

        {/* Ввод */}
        <div className="p-4 border-t flex flex-col md:flex-row gap-2 md:gap-4 items-center bg-gray-900 rounded-b-xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder={isEn ? 'Ask about services or create a booking...' : 'Спросите о сервисах или оформите бронь...'}
            className="flex-1 px-4 py-3 rounded-full border-2 border-indigo-500 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg transition duration-300"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <FiLoader className="animate-spin" />
            ) : (
              <>
                <FiSend /> {isEn ? 'Send' : 'Отправить'}
              </>
            )}
          </button>
        </div>

        {/* Быстрые команды */}
        <div className="p-4 border-t bg-gray-950 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              const cmd = isEn ? 'Create booking' : 'Оформить бронь'
              setInput(cmd)
              sendMessage(cmd)
            }}
            className="px-4 py-2 rounded-full border border-indigo-500 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transform transition"
          >
            {isEn ? 'Create booking' : 'Оформить бронь'}
          </button>
          <button
            onClick={() => {
              const cmd = isEn ? 'Show fleet' : 'Показать автопарк'
              setInput(cmd)
              sendMessage(cmd)
            }}
            className="px-4 py-2 rounded-full border border-indigo-500 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transform transition"
          >
            {isEn ? 'Fleet' : 'Автопарк'}
          </button>
        </div>
      </div>
    </div>
  )
}