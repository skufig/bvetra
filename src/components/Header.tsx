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
  const [showTop, setShowTop] = useState(false)
  const langHref = isEn ? '/' : '/en'
  const mobileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 8)
      setShowTop(y > 320)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!mobileRef.current) return
      if (mobileOpen && !mobileRef.current.contains(e.target as Node)) setMobileOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'shadow header-glass' : ''}`} aria-label="Site header">
      <div className={`mx-auto max-w-6xl px-4 ${scrolled ? 'py-2' : 'py-4'} flex items-center justify-between transition-[padding] duration-300`}>
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="flex items-center gap-3 focus:outline-none" aria-label="Bvetra — Главная">
              <AnimatedLogo className="w-10 h-10" />
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
          <button
            onClick={onOpenModal}
            className="rounded-2xl px-4 py-2 font-semibold text-graphite"
            style={{ backgroundColor: 'var(--primary)' }}
            aria-haspopup="dialog"
            aria-label="Заказать трансфер"
          >
            ЗАКАЗАТЬ ТРАНСФЕР
          </button>

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

          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2"
            onClick={() => setMobileOpen(s => !s)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" ref={mobileRef} className={`md:hidden bg-white dark:bg-[color:var(--glass)] border-t overflow-hidden transition-[max-height] duration-300 ${mobileOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="px-4 py-3 flex flex-col gap-3 text-sm">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block">О нас</a>
          <a href="#services" onClick={() => setMobileOpen(false)} className="block">Услуги</a>
          <a href="#fleet" onClick={() => setMobileOpen(false)} className="block">Автопарк</a>
          <Link href="/vacancies"><a onClick={() => setMobileOpen(false)} className="block">Вакансии</a></Link>

          <div className="pt-2 border-t mt-2 flex items-center justify-between">
            <button onClick={() => { onOpenModal?.(); setMobileOpen(false) }} className="rounded-2xl px-3 py-2 font-semibold text-graphite" style={{ backgroundColor: 'var(--primary)' }}>ЗАКАЗАТЬ ТРАНСФЕР</button>
            <button onClick={() => { setDark(d => !d); setMobileOpen(false) }} className="px-2 py-1 rounded">{dark ? '🌜' : '☀️'}</button>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })}
        aria-label="Наверх"
        className={`fixed right-4 bottom-6 z-40 rounded-full bg-graphite text-white p-3 shadow-lg transition-opacity duration-300 ${showTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        ↑
      </button>
    </header>
  )
}
