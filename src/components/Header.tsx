import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedLogo from './AnimatedLogo'

type Props = { onOpenModal?: () => void; isEn?: boolean }

export default function Header({ onOpenModal, isEn }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [scrolled, setScrolled] = useState(false)
  const langHref = isEn ? '/' : '/en'
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on outside click or Escape
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!drawerRef.current) return
      if (mobileOpen && !drawerRef.current.contains(e.target as Node)) closeDrawer()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', onKey)
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    }
  }, [mobileOpen])

  function openDrawer() {
    if (closeTimeoutRef.current) { window.clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null }
    setMobileOpen(true)
    // prevent body scroll when drawer open
    try { document.body.style.overflow = 'hidden' } catch {}
  }
  function closeDrawer() {
    // trigger closing animation by toggling a class; we use CSS .closing state
    const el = drawerRef.current
    if (!el) { setMobileOpen(false); try { document.body.style.overflow = '' } catch {} ; return }
    el.classList.add('closing')
    // wait for animation then fully close
    closeTimeoutRef.current = window.setTimeout(() => {
      el.classList.remove('closing')
      setMobileOpen(false)
      try { document.body.style.overflow = '' } catch {}
    }, 260)
  }

  // hide transfer button on small screens via CSS (Tailwind responsive)
  // make desktop button adaptive: use padding and max-width, keep it subtle
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'shadow header-glass' : ''}`} aria-label="Site header">
      <div className={`mx-auto max-w-6xl px-4 ${scrolled ? 'py-2' : 'py-4'} flex items-center justify-between transition-[padding] duration-300`}>
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="flex items-center gap-3 focus:outline-none" aria-label="Bvetra — Главная">
              <AnimatedLogo className="w-10 h-6" />
              <span className={`${prefersReduced ? '' : 'motion-fadeInUp'} font-bold text-lg`}>Bvetra</span>
            </a>
          </Link>

          <nav className="hidden md:flex gap-4 text-sm" aria-label="Main navigation">
            <a href="#about" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--primary)]">О нас</a>
            <a href="#services" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--primary)]">Услуги</a>
            <a href="#fleet" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--primary)]">Автопарк</a>
            <Link href="/vacancies"><a className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--primary)]">Вакансии</a></Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop-only transfer button: hidden on small screens */}
          <button
            onClick={onOpenModal}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text)',
              minWidth: 150,
              justifyContent: 'center'
            }}
            aria-haspopup="dialog"
            aria-label="Заказать трансфер"
          >
            <svg width="16" height="12" viewBox="0 0 24 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M2 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6h12l2 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="12" r="1.6" fill="currentColor" />
              <circle cx="15" cy="12" r="1.6" fill="currentColor" />
            </svg>
            <span>ЗАКАЗАТЬ ТРАНСФЕР</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(d => !d)}
            className="px-3 py-2 rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1"
            aria-pressed={dark}
            aria-label={dark ? 'Переключиться в светлую тему' : 'Переключиться в тёмную тему'}
            title={dark ? 'Светлая тема' : 'Тёмная тема'}
          >
            {dark ? '🌜' : '☀️'}
          </button>

          <Link href={langHref}><a className="px-2 py-1 rounded hover:bg-gray-100 text-sm">{isEn ? 'RU' : 'EN'}</a></Link>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2"
            onClick={() => (mobileOpen ? closeDrawer() : openDrawer())}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer (slide-in from right) */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AnimatedLogo className="w-10 h-6" />
            <span className="font-bold">Bvetra</span>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 rounded focus:outline-none"
            aria-label="Закрыть меню"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <a href="#about" onClick={closeDrawer} className="px-2 py-2 rounded hover:bg-[color:var(--primary)]/10">О нас</a>
          <a href="#services" onClick={closeDrawer} className="px-2 py-2 rounded hover:bg-[color:var(--primary)]/10">Услуги</a>
          <a href="#fleet" onClick={closeDrawer} className="px-2 py-2 rounded hover:bg-[color:var(--primary)]/10">Автопарк</a>
          <Link href="/vacancies"><a onClick={closeDrawer} className="px-2 py-2 rounded hover:bg-[color:var(--primary)]/10">Вакансии</a></Link>
        </nav>

        <div className="mt-auto pt-4 border-t flex items-center justify-between">
          {/* Transfer button intentionally omitted on mobile, per request */}
          <div />
          <div className="flex items-center gap-3">
            <button onClick={() => { setDark(d => !d); }} className="px-3 py-2 rounded">
              {dark ? '🌜' : '☀️'}
            </button>
            <Link href={langHref}><a onClick={closeDrawer} className="px-2 py-1 rounded"> {isEn ? 'RU' : 'EN'} </a></Link>
          </div>
        </div>
      </div>
    </header>
  )
}
