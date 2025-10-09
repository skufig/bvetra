// components/BottomNav.tsx
import React from 'react'
import Link from 'next/link'
import { FiHome, FiPhone, FiMessageSquare, FiUser, FiCalendar } from 'react-icons/fi'

type Props = {
  onOpenBooking?: () => void
  onOpenChat?: () => void
  phone?: string
  isEn?: boolean
}

export default function BottomNav({ onOpenBooking, onOpenChat, phone = '+375291234567', isEn = false }: Props) {
  return (
    <nav aria-label="Bottom navigation" className="fixed bottom-0 left-0 right-0 z-50 bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border-t md:hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link href="/#top"><a className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]"><FiHome size={18} /><span className="text-[11px]">{isEn ? 'Home' : 'Главная'}</span></a></Link>

          <button onClick={onOpenBooking} className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]"><FiCalendar size={18} /><span className="text-[11px]">{isEn ? 'Booking' : 'Бронь'}</span></button>

          <button onClick={onOpenChat} className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]"><FiMessageSquare size={18} /><span className="text-[11px]">{isEn ? 'Chat' : 'Чат'}</span></button>

          <Link href="/profile"><a className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]"><FiUser size={18} /><span className="text-[11px]">{isEn ? 'Profile' : 'Профиль'}</span></a></Link>

          <a href={`tel:${phone}`} className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]"><FiPhone size={18} /><span className="text-[11px]">{isEn ? 'Call' : 'Звонок'}</span></a>
        </div>
      </div>
    </nav>
  )
}
