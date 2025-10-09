import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BookingModal from './BookingModal'
import BottomNav from './BottomNav'

type Props = { isEn?: boolean }

export default function Footer({ isEn = false }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const t = {
    ru: {
      brand: 'Bvetra',
      subtitle: 'Корпоративные трансферы',
      copy: '©',
      phone: '+375291234567',
      email: 'support@bvetra.example',
      openModal: 'Заказать трансфер',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      subscribe: 'Подписаться',
      thanks: 'Спасибо'
    },
    en: {
      brand: 'Bvetra',
      subtitle: 'Corporate transfers',
      copy: '©',
      phone: '+375291234567',
      email: 'support@bvetra.example',
      openModal: 'Book transfer',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      subscribe: 'Subscribe',
      thanks: 'Thanks'
    }
  }
  const L = isEn ? t.en : t.ru

  function handleCall() {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${L.phone}`
      window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'call_click', phone: L.phone } }))
    }
  }

  function handleEmail() {
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${L.email}`
      window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'email_click', email: L.email } }))
    }
  }

  function submitNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    // Example: dispatch event, real integration with backend recommended
    window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'subscribe_newsletter', email } }))
  }

  return (
    <>
      <footer className="bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border-t">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded flex items-center justify-center bg-[color:var(--primary)]/10 text-[color:var(--primary)] font-bold">Bv</div>
              <div>
                <div className="text-[color:var(--text)] font-semibold">{L.brand}</div>
                <div className="text-sm text-[color:var(--muted)]">{L.subtitle}</div>
              </div>
            </div>

            <div className="text-sm text-[color:var(--muted)] space-y-1">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 6h18M3 12h12M3 18h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button onClick={handleCall} className="text-[color:var(--text)] hover:underline" aria-label="Call">
                  {L.phone}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button onClick={handleEmail} className="text-[color:var(--text)] hover:underline" aria-label="Email">
                  {L.email}
                </button>
              </div>

              <div className="text-xs text-[color:var(--muted)]">08:00 — 22:00</div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://t.me" aria-label="Telegram" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 4L2 12l5 2 2 6 3-4 5 4 5-18z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[color:var(--text)] font-semibold mb-3">{isEn ? 'Navigation' : 'Навигация'}</h4>
            <ul className="space-y-2 text-sm text-[color:var(--muted)]">
              <li><Link href="/#top"><a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{isEn ? 'Home' : 'Главная'}</a></Link></li>
              <li><button onClick={() => setModalOpen(true)} className="hover:underline">{isEn ? 'Booking' : 'Бронь'}</button></li>
              <li><Link href="/chat"><a>{isEn ? 'Chat' : 'Чат'}</a></Link></li>
              <li><Link href="/profile"><a>{isEn ? 'Profile' : 'Профиль'}</a></Link></li>
            </ul>

            <div className="mt-4">
              <h5 className="text-[color:var(--text)] font-medium mb-2">{isEn ? 'Mobile app' : 'Мобильное приложение'}</h5>
              <div className="flex gap-2">
                <a href="#" aria-label="App Store" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border hover:border-[color:var(--primary)]/18">
                  <span className="text-xs">{L.appStore}</span>
                </a>
                <a href="#" aria-label="Google Play" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border hover:border-[color:var(--primary)]/18">
                  <span className="text-xs">{L.googlePlay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Legal */}
          <div className="md:col-span-2">
            <h4 className="text-[color:var(--text)] font-semibold mb-3">{isEn ? 'Subscribe & Legal' : 'Подписка и юридическая информация'}</h4>

            <form onSubmit={(e) => { e.preventDefault(); submitNewsletter(e as any) }} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEn ? 'Your email' : 'Ваш e-mail'}
                className="px-4 py-2 rounded-lg border w-full sm:w-auto sm:flex-1 bg-[color:var(--bg)] text-[color:var(--text)]"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold btn-primary btn-lift"
              >
                {subscribed ? (isEn ? 'Thanks' : 'Спасибо') : (isEn ? 'Subscribe' : 'Подписаться')}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[color:var(--muted)]">
              <Link href="/terms"><a className="hover:underline">{isEn ? 'Terms' : 'Условия использования'}</a></Link>
              <Link href="/privacy"><a className="hover:underline">{isEn ? 'Privacy' : 'Политика конфиденциальности'}</a></Link>
              <Link href="/faq"><a className="hover:underline">{isEn ? 'FAQ' : 'Вопросы и ответы'}</a></Link>
              <Link href="/support"><a className="hover:underline">{isEn ? 'Support' : 'Поддержка'}</a></Link>
            </div>

            <div className="mt-6 text-xs text-[color:var(--muted)]">
              {L.copy} {new Date().getFullYear()} {L.brand} — {isEn ? 'All rights reserved.' : 'корпоративные трансферы. Все права защищены.'}
            </div>
          </div>
        </div>
      </footer>

      {/* Booking modal */}
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} isEn={isEn} />

      {/* Bottom navigation (fixed) */}
      <BottomNav onOpenBooking={() => setModalOpen(true)} phone={L.phone} isEn={isEn} />
    </>
  )
}
