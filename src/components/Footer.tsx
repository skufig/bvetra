import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function copyPhone() {
    const phone = '+375 (29) 123-45-67'
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(phone)
      window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'copy_phone', label: phone } }))
      alert('Номер скопирован в буфер: ' + phone)
    }
  }

  function submitNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // клиентская имитация подписки — интегрируйте API вместо этого
    setSubscribed(true)
    window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'subscribe_newsletter', email } }))
  }

  return (
    <footer className="mt-12 border-t bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] text-[color:var(--muted)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Replace with AnimatedLogo import if available */}
            <div className="w-12 h-8 rounded flex items-center justify-center bg-[color:var(--primary)]/10 text-[color:var(--primary)] font-bold">
              Bv
            </div>
            <div>
              <div className="text-[color:var(--text)] font-semibold">Bvetra</div>
              <div className="text-sm text-[color:var(--muted)]">Корпоративные трансферы</div>
            </div>
          </div>

          <div className="text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 6h18M3 12h12M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <button onClick={copyPhone} className="text-sm text-[color:var(--text)] hover:underline" aria-label="Скопировать телефон">
                +375 (29) 123-45-67
              </button>
            </div>
            <div className="mt-2 text-xs text-[color:var(--muted)]">support@bvetra.example</div>
            <div className="mt-2 text-xs text-[color:var(--muted)]">Режим работы: 08:00 — 22:00</div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            {/* Social icons */}
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18.5" cy="5.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" fill="currentColor" />
              </svg>
            </a>

            <a href="https://t.me" aria-label="Telegram" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M22 4L2 12l5 2 2 6 3-4 5 4 5-18z" fill="currentColor" />
              </svg>
            </a>

            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-[color:var(--primary)]/12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 4h4v16H4zM6 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v2h.1c.6-1.1 2-2.3 4.1-2.3 4.4 0 5.2 2.9 5.2 6.7V20h-4v-5.1c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V20h-4V9z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick navigation */}
        <div>
          <h4 className="text-[color:var(--text)] font-semibold mb-3">Навигация</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#about"><a className="hover:underline">О компании</a></Link></li>
            <li><Link href="/#services"><a className="hover:underline">Услуги</a></Link></li>
            <li><Link href="/#fleet"><a className="hover:underline">Автопарк</a></Link></li>
            <li><Link href="/vacancies"><a className="hover:underline">Вакансии</a></Link></li>
            <li><Link href="/contacts"><a className="hover:underline">Контакты</a></Link></li>
          </ul>

          <div className="mt-4">
            <h5 className="text-[color:var(--text)] font-medium mb-2">Мобильное приложение</h5>
            <div className="flex gap-2">
              <a href="#" aria-label="App Store" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border hover:border-[color:var(--primary)]/18">
                <Image src="/icons/apple.svg" alt="App Store" width={18} height={18} />
                <span className="text-xs">App Store</span>
              </a>
              <a href="#" aria-label="Google Play" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] border hover:border-[color:var(--primary)]/18">
                <Image src="/icons/google-play.svg" alt="Google Play" width={18} height={18} />
                <span className="text-xs">Google Play</span>
              </a>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 md:hidden" role="navigation" aria-label="Footer mobile nav">
              {/* Mobile app bottom nav preview */}
              <button className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)] p-2 rounded hover:bg-[color:var(--primary)]/8" aria-label="Главная">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11L12 4l9 7v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Главная</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)] p-2 rounded hover:bg-[color:var(--primary)]/8" aria-label="Бронирования">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M7 3v4M17 3v4M5 11h14v8H5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Бронь</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)] p-2 rounded hover:bg-[color:var(--primary)]/8" aria-label="Чат с водителем">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H8l-5 3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Чат</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-xs text-[color:var(--muted)] p-2 rounded hover:bg-[color:var(--primary)]/8" aria-label="Профиль">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M16 3.13A4 4 0 1 1 8 3.13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Профиль</span>
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter & Legal */}
        <div className="md:col-span-2">
          <h4 className="text-[color:var(--text)] font-semibold mb-3">Подписка и юридическая информация</h4>

          <form onSubmit={submitNewsletter} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш e-mail"
              className="px-4 py-2 rounded-lg border w-full sm:w-auto sm:flex-1 bg-[color:var(--bg)] text-[color:var(--text)]"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold btn-primary btn-lift"
              aria-label="Подписаться на рассылку"
            >
              {subscribed ? 'Спасибо' : 'Подписаться'}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[color:var(--muted)]">
            <Link href="/terms"><a className="hover:underline">Условия использования</a></Link>
            <Link href="/privacy"><a className="hover:underline">Политика конфиденциальности</a></Link>
            <Link href="/faq"><a className="hover:underline">Вопросы и ответы</a></Link>
            <Link href="/support"><a className="hover:underline">Поддержка</a></Link>
          </div>

          <div className="mt-6 text-xs text-[color:var(--muted)]">
            © {new Date().getFullYear()} Bvetra — корпоративные трансферы. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
                  }
