import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedLogo from './AnimatedLogo'

type Props = { onOpenModal?: () => void; isEn?: boolean }

export default function Header({ onOpenModal, isEn }: Props) {
  // Translations
  const t = {
    ru: {
      about: 'О нас',
      services: 'Услуги',
      fleet: 'Автопарк',
      vacancies: 'Вакансии',
      order: 'Заказать трансфер',
      lang: 'EN',
      closeMenu: 'Закрыть меню',
      openMenu: 'Открыть меню'
    },
    en: {
      about: 'About',
      services: 'Services',
      fleet: 'Fleet',
      vacancies: 'Vacancies',
      order: 'BOOK TRANSFER',
      lang: 'RU',
      closeMenu: 'Close menu',
      openMenu: 'Open menu'
    }
  }
  const locale = isEn ? 'en' : 'ru'
  const L = t[locale as 'ru'|'en']

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
  const firstFocusable = useRef<HTMLElement | null>(null)
  const lastFocusable = useRef<HTMLElement | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal init: add observer for elements with [data-reveal]
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!els.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Focus trap + outside click + escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!mobileOpen) return
      if (e.key === 'Escape') closeDrawer()
      if (e.key === 'Tab') {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])') || []
        if (!focusable.length) return
        firstFocusable.current = focusable[0]
        lastFocusable.current = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === firstFocusable.current) {
          e.preventDefault()
          lastFocusable.current?.focus()
        } else if (!e.shiftKey && document.activeElement === lastFocusable.current) {
          e.preventDefault()
          firstFocusable.current?.focus()
        }
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (!drawerRef.current) return
      if (mobileOpen && !drawerRef.current.contains(e.target as Node)) closeDrawer()
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClickOutside)
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    }
  }, [mobileOpen])

  function openDrawer() {
    const overlay = overlayRef.current
    const drawer = drawerRef.current
    if (closeTimeoutRef.current) { window.clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null }
    setMobileOpen(true)
    overlay?.classList.add('open')
    drawer?.classList.add('open')
    // focus first focusable after open
    setTimeout(() => {
      const focusable = drawer?.querySelector<HTMLElement>('a,button')
      focusable?.focus()
    }, 40)
    try { document.body.style.overflow = 'hidden' } catch {}
  }
  function closeDrawer() {
    const overlay = overlayRef.current
    const drawer = drawerRef.current
    if (!drawer) { setMobileOpen(false); try { document.body.style.overflow = '' } catch {}; return }
    drawer.classList.add('closing')
    overlay?.classList.remove('open')
    closeTimeoutRef.current = window.setTimeout(() => {
      drawer.classList.remove('closing')
      drawer.classList.remove('open')
      setMobileOpen(false)
      try { document.body.style.overflow = '' } catch {}
    }, 260)
  }

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'shadow header-glass' : ''}`} aria-label="Site header">
        <div className={`mx-auto max-w-6xl px-4 ${scrolled ? 'py-2' : 'py-4'} flex items-center justify-between transition-[padding] duration-300`}>
          <div className="flex items-center gap-4">
            <Link href="/" prefetch>
              <a className="flex items-center gap-3 focus:outline-none" aria-label="Bvetra — Home">
                <AnimatedLogo className="w-14 h-10" />
                <span className={`${prefersReduced ? '' : 'motion-fadeInUp'} font-bold text-lg tracking-tight`}>Bvetra</span>
              </a>
            </Link>

            <nav className="hidden md:flex gap-6 text-sm" aria-label="Main navigation">
              <a href="#about" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]" data-reveal>{L.about}</a>
              <a href="#services" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]" data-reveal>{L.services}</a>
              <a href="#fleet" className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]" data-reveal>{L.fleet}</a>
              <Link href="/vacancies" prefetch><a className="px-2 py-1 rounded hover:text-graphite focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]" data-reveal>{L.vacancies}</a></Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <button
              onClick={onOpenModal}
              className="hidden sm:inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold btn-primary btn-lift"
              style={{ minWidth: 160 }}
              aria-haspopup="dialog"
              aria-label={L.order}
            >
              <span className="shimmer" aria-hidden="true" />
              <svg width="18" height="12" viewBox="0 0 24 16" fill="none" aria-hidden="true" focusable="false">
                <path d="M2 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6h12l2 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7" cy="12" r="1.6" fill="currentColor" />
                <circle cx="15" cy="12" r="1.6" fill="currentColor" />
              </svg>
              <span>{L.order}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(d => !d)}
              className="px-3 py-2 rounded-full btn-ghost"
              aria-pressed={dark}
              aria-label={dark ? 'Switch to light' : 'Switch to dark'}
            >
              {dark ? '🌜' : '☀️'}
            </button>

            <Link href={langHref} prefetch><a className="px-2 py-1 rounded hover:bg-[color:var(--primary)]/8 text-sm" aria-label="Switch language">{L.lang}</a></Link>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded focus:outline-none"
              onClick={() => (mobileOpen ? closeDrawer() : openDrawer())}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? L.closeMenu : L.openMenu}
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
            <button onClick={() => setDark(d => !d)} className="p-2 rounded btn-ghost" aria-label="Toggle theme">{dark ? '🌜' : '☀️'}</button>
            <button onClick={closeDrawer} className="p-2 rounded" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-3 mb-4">
          <a href="#about" onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12" tabIndex={0}>{L.about}</a>
          <a href="#services" onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12" tabIndex={0}>{L.services}</a>
          <a href="#fleet" onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12" tabIndex={0}>{L.fleet}</a>
          <Link href="/vacancies" prefetch><a onClick={closeDrawer} className="px-3 py-2 rounded hover:bg-[color:var(--primary)]/12" tabIndex={0}>{L.vacancies}</a></Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-[rgba(0,0,0,0.04)] flex items-center justify-between">
          <div className="text-sm text-[color:var(--muted)]">© Bvetra</div>
          <Link href={langHref}><a onClick={closeDrawer} className="px-3 py-2 rounded"> {L.lang} </a></Link>
        </div>
      </div>
    </>
  )
}
