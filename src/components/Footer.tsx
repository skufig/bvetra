import React, { useEffect, useState } from 'react'
import { FiPhone, FiMail, FiClock, FiInstagram, FiHome, FiMessageCircle, FiUser } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import { SiViber, SiWhatsapp } from 'react-icons/si'
import BookingModal from './BookingModal'
import ChatModal from './ChatModal'
import ProfileModal from './ProfileModal'
import BottomNav from './BottomNav'

// Константы
const CONTACT_INFO = {
  phone: '+375291234567',
  email: 'support@bvetra.example',
  workHours: '08:00 — 22:00',
  address: 'г. Москва'
} as const

const SOCIAL_LINKS = [
  { icon: FiInstagram, name: 'Instagram', href: 'https://instagram.com' },
  { icon: FaTelegramPlane, name: 'Telegram', href: 'https://t.me' },
  { icon: SiViber, name: 'Viber', href: '#' },
  { icon: SiWhatsapp, name: 'WhatsApp', href: '#' }
] as const

const NAVIGATION_LINKS = {
  ru: [
    { label: 'Главная', icon: FiHome, action: 'home' },
    { label: 'Бронь', action: 'booking' },
    { label: 'Чат', icon: FiMessageCircle, action: 'chat' },
    { label: 'Профиль', icon: FiUser, action: 'profile' }
  ],
  en: [
    { label: 'Home', icon: FiHome, action: 'home' },
    { label: 'Booking', action: 'booking' },
    { label: 'Chat', icon: FiMessageCircle, action: 'chat' },
    { label: 'Profile', icon: FiUser, action: 'profile' }
  ]
} as const

const COMPANY_LINKS = {
  ru: ['О компании', 'Карьера', 'Контакты'],
  en: ['About', 'Careers', 'Contacts']
} as const

const SUPPORT_LINKS = {
  ru: ['FAQ', 'Условия', 'Политика'],
  en: ['FAQ', 'Terms', 'Privacy']
} as const

export default function Footer({ langProp }: { langProp?: 'ru' | 'en' }) {
  const [lang, setLang] = useState<'ru' | 'en'>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
      return langProp || (stored === 'en' ? 'en' : 'ru')
    } catch {
      return langProp || 'ru'
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

  // Общие стили
  const sectionTitle = "font-semibold mb-4 text-lg text-gray-900 dark:text-white"
  const linkStyle = "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
  const buttonStyle = "w-full text-left py-2 hover:underline transition-all text-gray-700 dark:text-gray-300"

  const handleNavigation = (action: string) => {
    switch (action) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' })
        break
      case 'booking':
        setOpenBooking(true)
        break
      case 'chat':
        setOpenChat(true)
        break
      case 'profile':
        setOpenProfile(true)
        break
    }
  }

  return (
    <>
      {/* Основной футер */}
      <footer className="bg-white dark:bg-[#071018] border-t border-gray-200 dark:border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Контент */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Брендинг и контакты */}
            <div className="space-y-6">
              <h2 className="font-extrabold text-2xl lg:text-3xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 mb-2 animate-fire">
                Быстрее Ветра
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                {isEn ? 'Corporate transfers — reliable, comfortable, punctual.' : 'Корпоративные трансферы — надёжно, комфортно, вовремя.'}
              </p>
              {/* Контакты */}
              <div className="space-y-3">
                <ContactItem icon={FiPhone} content={CONTACT_INFO.phone} href={`tel:${CONTACT_INFO.phone}`} />
                <ContactItem icon={FiMail} content={CONTACT_INFO.email} href={`mailto:${CONTACT_INFO.email}`} />
                <ContactItem icon={FiClock} content={CONTACT_INFO.workHours} isMuted />
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>📍</span>
                  <span>{CONTACT_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <div className="space-y-8">
              <h4 className={sectionTitle}>{isEn ? 'Navigation' : 'Навигация'}</h4>
              <div className="grid grid-cols-2 gap-2">
                {NAVIGATION_LINKS[lang].map((item, index) => (
                  <button key={index} onClick={() => handleNavigation(item.action)} className={buttonStyle}>
                    {item.label}
                  </button>
                ))}
              </div>
              {/* Компания */}
              <div>
                <h5 className="font-medium mb-3 text-gray-900 dark:text-white">{isEn ? 'Company' : 'Компания'}</h5>
                <ul className="space-y-2">
                  {COMPANY_LINKS[lang].map((link, index) => (
                    <li key={index}>
                      <span className={linkStyle}>{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Приложение и Поддержка */}
            <div className="space-y-8">
              <h4 className={sectionTitle}>{isEn ? 'App & Links' : 'Приложение и ссылки'}</h4>
              <div className="flex flex-col gap-3 max-w-xs">
                <button className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  App Store
                </button>
                <button className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Google Play
                </button>
              </div>
              {/* Поддержка */}
              <div>
                <h5 className="font-medium mb-3 text-gray-900 dark:text-white">{isEn ? 'Support' : 'Поддержка'}</h5>
                <div className="space-y-2">
                  {SUPPORT_LINKS[lang].map((link, index) => (
                    <div key={index} className={linkStyle}>{link}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Соцсети */}
            <div className="space-y-6">
              <h4 className={sectionTitle}>{isEn ? 'Social' : 'Соцсети'}</h4>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} icon={social.icon} name={social.name} href={social.href} />
                ))}
              </div>
              {/* Копирайт */}
              <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-300 dark:border-gray-700">
                © {new Date().getFullYear()} Быстрее Ветра
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальные окна */}
      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} lang={lang} />
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} lang={lang} />
      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} />

      {/* Нижняя навигация */}
      <BottomNav onOpenBooking={() => setOpenBooking(true)} onOpenChat={() => setOpenChat(true)} phone={CONTACT_INFO.phone} lang={lang} />
    </>
  )
}

// Вспомогательные компоненты
function ContactItem({ icon: Icon, content, href, isMuted }: ContactItemProps) {
  const className = `flex items-center gap-3 text-sm ${
    isMuted ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer'
  }`
  const contentElement = (
    <>
      <Icon size={16} />
      <span>{content}</span>
    </>
  )
  if (href && !isMuted) {
    return (
      <a href={href} className={className}>
        {contentElement}
      </a>
    )
  }
  return (
    <div className={className}>
      {contentElement}
    </div>
  )
}

function SocialLink({ icon: Icon, name, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
      <span className="text-sm">{name}</span>
    </a>
  )
}