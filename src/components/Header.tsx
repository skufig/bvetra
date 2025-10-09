import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedLogo from './AnimatedLogo'

type Props = { onOpenModal?: () => void; isEn?: boolean }

export default function Header({ onOpenModal, isEn }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })
  const [scrolled, setScrolled] = useState(false)
  const langHref = isEn ? '/' : '/en'
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!drawerRef.current || !overlayRef.current) return
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
    if (overlayRef.current) overlayRef.current.classList.add('open')
    if (drawerRef.current) drawerRef.current.classList.add('open')
    try { document.body.style.overflow = 'hidden' } catch {}
  }
  function closeDrawer() {
    const el = drawerRef.current
    const overlay = overlayRef.current
    if (!el) { setMobileOpen(false); try { document.body.style.overflow = '' } catch {} ; return }
    el.classList.add('closing')
    if (overlay) overlay.classList.remove('open')
    closeTimeoutRef.current = window.setTimeout(() => {
      el.classList.remove('closing')
      el.classList.remove('open')
      setMobileOpen(false)
      try { document.body.style.overflow = '' } catch {}
    }, 260)
  }

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'shadow header-glass' : ''}`} aria-label="Site header">
        <div className={`mx-auto max-w-6xl px-4 ${scrolled ? 'py-2' : 'py-4'} flex items-center justify-between transition-[padding] duration-300`}>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-3 focus:outline-none" aria-label="Bvetra — Главная">
                <AnimatedLogo className="w-12 h-8" />
                <span className={`${prefersReduced ? '' : 'motion-fadeInUp'} font-bold text-lg tracking-tight`}>Bvetra</span>
              </a>
            </Link>

            <nav className="hidden md:flex gap-6 text-sm" aria-label="Main navigation">
              <a href="#about" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]">О нас</a>
              <a href="#services" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]">Услуги</a>
              <a href="#fleet" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]">Автопарк</a>
              <Link href="/vacancies"><a className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]">Вакансии</a></Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop CTA: refined, adaptive, subtle elevation. Hidden on small screens. */}
            <button
              onClick={onOpenModal}
              className="hidden sm:inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold btn-primary"
              style={{ minWidth: 160 }}
              aria-haspopup="dialog"
              aria-label="Заказать трансфер"
            >
              <svg width="18" height="12" viewBox="0 0 24 16" fill="none" aria-hidden="true" focusable="false">
                <path d="M2 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6h12l2 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7" cy="12" r="1.6" fill="currentColor" />
                <circle cx="15" cy="12" r="1.6" fill="currentColor" />
              </svg>
              <span>Заказать трансфер</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(d => !d)}
              className="px-3 py-2 rounded-full btn-ghost"
              aria-pressed={dark}
              aria-label={dark ? 'Переключиться в светлую тему' : 'Переключиться в тёмную тему'}
            >
              {dark ? '🌜' : '☀️'}
            </button>

            <Link href={langHref}><a className="px-2 py-1 rounded hover:bg-[color:var(--primary)]/8 text-sm">{isEn ? 'RU' : 'EN'}</a></Link>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded focus:outline-none"
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
      </header>

      {/* Drawer overlay */}
      <div ref={overlayRef} className={`drawer-overlay ${mobileOpen ? 'open' : ''}`} onClick={closeDrawer} />

      {/* Mobile drawer */}
      <div id="mobile-menu" ref={drawerRef} className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!mobileOpen}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AnimatedLogo className="w-12 h-8" />
            <span className="font-bold text-lg">Bvetra</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setDark(d => !d)} className="p-2 rounded btn-ghost" aria-label="Переключить тему">
              {dark ? '🌜' : '☀️'}
            </button>
            <button onClick={closeDrawer} className="p-2 rounded" aria-label="Закрыть меню">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-3 mb-4">
          <a href="#about" onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12">О нас</a>
          <a href="#services" onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12">Услуги</a>
          <a href="#fleet" onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12">Автопарк</a>
          <Link href="/vacancies"><a onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12">Вакансии</a></Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-[rgba(0,0,0,0.04)] flex items-center justify-between">
          <div className="text-sm text-[color:var(--muted)]">© Bvetra</div>
          <Link href={langHref}><a onClick={closeDrawer} className="px-3 py-2 rounded"> {isEn ? 'RU' : 'EN'} </a></Link>
        </div>
      </div>
    </>
  )
            }
