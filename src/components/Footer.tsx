// components/Footer.tsx
import React, { useState } from 'react'
import { FiInstagram, FiMail, FiPhone, FiClock, FiChevronUp } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import BookingModal from './BookingModal'
import ChatModal from './ChatModal'
import BottomNav from './BottomNav'

type Props = { isEn?: boolean }

export default function Footer({ isEn = false }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const L = isEn
    ? {
        brand: 'Bvetra',
        subtitle: 'Corporate transfers',
        phone: '+375291234567',
        email: 'support@bvetra.example',
        appStore: 'App Store',
        googlePlay: 'Google Play',
        subscribe: 'Subscribe',
        thanks: 'Thanks',
        home: 'Home',
        booking: 'Booking',
        chat: 'Chat',
        profile: 'Profile',
      }
    : {
        brand: 'Bvetra',
        subtitle: 'Корпоративные трансферы',
        phone: '+375291234567',
        email: 'support@bvetra.example',
        appStore: 'App Store',
        googlePlay: 'Google Play',
        subscribe: 'Подписаться',
        thanks: 'Спасибо',
        home: 'Главная',
        booking: 'Бронь',
        chat: 'Чат',
        profile: 'Профиль',
      }

  function handleCall() {
    if (typeof window !== 'undefined') window.location.href = `tel:${L.phone}`
  }
  function handleEmail() {
    if (typeof window !== 'undefined') window.location.href = `mailto:${L.email}`
  }

  function submitNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'subscribe_newsletter', email } }))
  }

  return (
    <>
      <footer className="mt-12 border-t bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] text-[color:var(--muted)]">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand / Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded flex items-center justify-center bg-[color:var(--primary)]/10 text-[color:var(--primary)] font-bold">Bv</div>
              <div>
                <div className="text-[color:var(--text)] font-semibold">{L.brand}</div>
                <div className="text-sm text-[color:var(--muted)]">{L.subtitle}</div>
              </div>
            </div>

            <div className="text-sm text-[color:var(--muted)] space-y-2">
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                <button onClick={handleCall} className="text-[color:var(--text)] hover:underline" aria-label="Call">
                  {L.phone}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                <button onClick={handleEmail} className="text-[color:var(--text)] hover:underline" aria-label="Email">
                  {L.email}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]">
                <FiClock className="w-4 h-4" />
                <div>08:00 — 22:00</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
                <FiInstagram />
              </a>
              <a href="https://t.me" aria-label="Telegram" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
                <FaTelegramPlane />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[color:var(--text)] font-semibold mb-3">{isEn ? 'Navigation' : 'Навигация'}</h4>
            <ul className="space-y-2 text-sm text-[color:var(--muted)]">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">
                  {L.home}
                </button>
              </li>
              <li>
                <button onClick={() => setModalOpen(true)} className="hover:underline">
                  {L.booking}
                </button>
              </li>
              <li>
                <button onClick={() => setChatOpen(true)} className="hover:underline">
                  {L.chat}
                </button>
              </li>
              <li>
                <button onClick={() => alert(isEn ? 'Profile (in progress)' : 'Профиль (в разработке)')} className="hover:underline">
                  {L.profile}
                </button>
              </li>
            </ul>

            <div className="mt-4">
              <h5 className="text-[color:var(--text)] font-medium mb-2">{isEn ? 'Mobile app' : 'Мобильное приложение'}</h5>
              <div className="flex gap-2">
                <a href="#" aria-label="App Store" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[color:var(--surface-1)] border hover:border-[color:var(--primary)]/18 text-xs">
                  {L.appStore}
                </a>
                <a href="#" aria-label="Google Play" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[color:var(--surface-1)] border hover:border-[color:var(--primary)]/18 text-xs">
                  {L.googlePlay}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & legal */}
          <div className="md:col-span-2">
            <h4 className="text-[color:var(--text)] font-semibold mb-3">{isEn ? 'Subscribe & Legal' : 'Подписка и информация'}</h4>

            <form onSubmit={submitNewsletter} className="flex gap-3 items-start sm:items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEn ? 'Your email' : 'Ваш e-mail'}
                className="px-4 py-2 rounded-lg border w-full sm:w-auto sm:flex-1 bg-[color:var(--bg)] text-[color:var(--text)]"
                required
              />
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary btn-lift">
                {subscribed ? (isEn ? 'Thanks' : 'Спасибо') : (isEn ? 'Subscribe' : 'Подписаться')}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[color:var(--muted)]">
              <button className="hover:underline"> {isEn ? 'Terms' : 'Условия'} </button>
              <button className="hover:underline"> {isEn ? 'Privacy' : 'Политика'} </button>
              <button className="hover:underline"> {isEn ? 'FAQ' : 'Вопросы'} </button>
              <button className="hover:underline"> {isEn ? 'Support' : 'Поддержка'} </button>
            </div>

            <div className="mt-6 text-xs text-[color:var(--muted)]">
              © {new Date().getFullYear()} {L.brand} — {isEn ? 'All rights reserved.' : 'корпоративные трансферы. Все права защищены.'}
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} isEn={isEn} />
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} isEn={isEn} />

      {/* Bottom fixed nav for mobile */}
      <BottomNav
        onOpenBooking={() => setModalOpen(true)}
        onOpenChat={() => setChatOpen(true)}
        phone={L.phone}
        isEn={isEn}
      />
    </>
  )
}
