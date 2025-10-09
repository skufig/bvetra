  // src/components/Footer.tsx
import React, { useEffect, useState } from 'react'
import { FiPhone, FiMail, FiClock, FiInstagram } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import { SiViber, SiWhatsapp } from 'react-icons/si'
import BookingModal from './BookingModal'
import ChatModal from './ChatModal'
import ProfileModal from './ProfileModal'
import BottomNav from './BottomNav'

export default function Footer({ langProp }: { langProp?: 'ru' | 'en' }) {
  const [lang, setLang] = useState<'ru' | 'en'>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
      return (langProp as 'ru' | 'en') || (stored === 'en' ? 'en' : 'ru')
    } catch {
      return (langProp as 'ru' | 'en') || 'ru'
    }
  })
  useEffect(() => {
    if (langProp && langProp !== lang) {
      setLang(langProp)
      try {
        localStorage.setItem('lang', langProp)
      } catch {}
    }
  }, [langProp])

  const isEn = lang === 'en'
  const [openBooking, setOpenBooking] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  const CONTACT_PHONE = '+375291234567'
  const CONTACT_EMAIL = 'support@bvetra.example'
  const WORK_HOURS = '08:00 — 22:00'

  return (
    <>
      <footer className="bg-white dark:bg-[#071018] border-t">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-3">
            <h2 className="font-extrabold text-2xl leading-tight text-transparent bg-clip-text fire-gradient animate-fire">
              Быстрее Ветра
            </h2>
            <p className="text-sm text-gray-500 max-w-sm">
              {isEn
                ? 'Corporate transfers — reliable, comfortable, punctual.'
                : 'Корпоративные трансферы — надёжно, комфортно, вовремя.'}
            </p>

            <div className="mt-6 space-y-4">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="block w-full text-2xl md:text-3xl font-medium text-[color:var(--text)] hover:underline"
              >
                <div className="flex items-center gap-4">
                  <FiPhone size={28} />
                  <span>{CONTACT_PHONE}</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block w-full text-2xl md:text-3xl font-medium text-[color:var(--text)] hover:underline"
              >
                <div className="flex items-center gap-4">
                  <FiMail size={28} />
                  <span>{CONTACT_EMAIL}</span>
                </div>
              </a>

              <div className="block w-full text-2xl md:text-3xl font-medium text-[color:var(--muted)]">
                <div className="flex items-center gap-4">
                  <FiClock size={28} />
                  <span>{WORK_HOURS}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation (2x2 grid) */}
          <div>
            <h4 className="font-semibold mb-3">{isEn ? 'Navigation' : 'Навигация'}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left py-3 hover:underline">
                {isEn ? 'Home' : 'Главная'}
              </button>
              <button onClick={() => setOpenBooking(true)} className="text-left py-3 hover:underline">
                {isEn ? 'Booking' : 'Бронь'}
              </button>

              <button onClick={() => setOpenChat(true)} className="text-left py-3 hover:underline">
                {isEn ? 'Chat' : 'Чат'}
              </button>
              <button onClick={() => setOpenProfile(true)} className="text-left py-3 hover:underline">
                {isEn ? 'Profile' : 'Профиль'}
              </button>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2">{isEn ? 'Company' : 'Компания'}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>{isEn ? 'About' : 'О компании'}</li>
                <li>{isEn ? 'Careers' : 'Карьера'}</li>
                <li>{isEn ? 'Contacts' : 'Контакты'}</li>
              </ul>
            </div>
          </div>

          {/* App & Support */}
          <div>
            <h4 className="font-semibold mb-3">{isEn ? 'App & Links' : 'Приложение и ссылки'}</h4>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-3 rounded border text-left">App Store</button>
              <button className="px-4 py-3 rounded border text-left">Google Play</button>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2">{isEn ? 'Support' : 'Поддержка'}</h5>
              <div className="text-sm text-gray-600 space-y-2">
                <div>{isEn ? 'FAQ' : 'FAQ'}</div>
                <div>{isEn ? 'Terms' : 'Условия'}</div>
                <div>{isEn ? 'Privacy' : 'Политика'}</div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3">{isEn ? 'Social' : 'Соцсети'}</h4>

            <div className="flex flex-col gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-2xl">
                <FiInstagram size={28} /> <span className="text-lg">{isEn ? 'Instagram' : 'Instagram'}</span>
              </a>

              <a href="https://t.me" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-2xl">
                <FaTelegramPlane size={28} /> <span className="text-lg">{isEn ? 'Telegram' : 'Telegram'}</span>
              </a>

              <a href="#" className="flex items-center gap-3 text-2xl">
                <SiViber size={28} /> <span className="text-lg">{isEn ? 'Viber' : 'Viber'}</span>
              </a>

              <a href="#" className="flex items-center gap-3 text-2xl">
                <SiWhatsapp size={28} /> <span className="text-lg">{isEn ? 'WhatsApp' : 'WhatsApp'}</span>
              </a>
            </div>

            <div className="mt-8 text-xs text-gray-500">© {new Date().getFullYear()} Быстрее Ветра</div>
          </div>
        </div>
      </footer>

      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} lang={lang} />
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} lang={lang} />
      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} />

      <BottomNav onOpenBooking={() => setOpenBooking(true)} onOpenChat={() => setOpenChat(true)} phone={CONTACT_PHONE} lang={lang} />
    </>
  )
}
