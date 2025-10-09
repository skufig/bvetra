// src/components/BottomNav.tsx
import React from 'react'
import Link from 'next/link'
import { FiHome, FiCalendar, FiMessageSquare, FiUser, FiPhone } from 'react-icons/fi'

export default function BottomNav({ onOpenBooking, onOpenChat, phone = '+375291234567', lang = 'ru' }:
  { onOpenBooking?: () => void; onOpenChat?: () => void; phone?: string; lang?: 'ru' | 'en' }) {
  const isEn = lang === 'en'
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9998] bg-white dark:bg-[#071018] border-t md:hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center text-xs text-gray-600">
            <FiHome size={18} />
            <span>{isEn ? 'Home' : 'Главная'}</span>
          </button>

          <button onClick={onOpenBooking} className="flex flex-col items-center text-xs text-gray-600">
            <FiCalendar size={18} />
            <span>{isEn ? 'Booking' : 'Бронь'}</span>
          </button>

          <button onClick={onOpenChat} className="flex flex-col items-center text-xs text-gray-600">
            <FiMessageSquare size={18} />
            <span>{isEn ? 'Chat' : 'Чат'}</span>
          </button>

          <button onClick={() => { /* open profile modal via Footer state; Footer passes modal control */ }} className="flex flex-col items-center text-xs text-gray-600">
            <FiUser size={18} />
            <span>{isEn ? 'Profile' : 'Профиль'}</span>
          </button>

          <a href={`tel:${phone}`} className="flex flex-col items-center text-xs text-gray-600">
            <FiPhone size={18} />
            <span>{isEn ? 'Call' : 'Звонок'}</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
