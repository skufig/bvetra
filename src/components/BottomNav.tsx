import React from 'react'
import Link from 'next/link'

type Props = {
  onOpenBooking?: () => void
  phone?: string
  isEn?: boolean
}

export default function BottomNav({ onOpenBooking, phone = '+375291234567', isEn = false }: Props) {
  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border-t shadow-lg md:hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link href="/#top">
            <a className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]" aria-label="Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11L12 4l9 7v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-[color:var(--muted)] text-[11px]">{isEn ? 'Home' : 'Главная'}</span>
            </a>
          </Link>

          <button onClick={onOpenBooking} className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]" aria-label="Booking">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M7 3v4M17 3v4M5 11h14v8H5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-[11px]">{isEn ? 'Booking' : 'Бронь'}</span>
          </button>

          <Link href="/chat">
            <a className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]" aria-label="Chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H8l-5 3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-[11px]">{isEn ? 'Chat' : 'Чат'}</span>
            </a>
          </Link>

          <Link href="/profile">
            <a className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]" aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M16 3.13A4 4 0 1 1 8 3.13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-[11px]">{isEn ? 'Profile' : 'Профиль'}</span>
            </a>
          </Link>

          <a href={`tel:${phone}`} className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)]" aria-label="Call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.06.42 2.09.9 3.03a2 2 0 0 1-.45 2.11L8.09 10.91a16.06 16.06 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.94.48 1.97.78 3.03.9A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-[11px]">{isEn ? 'Call' : 'Звонок'}</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
