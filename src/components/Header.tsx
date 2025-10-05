import Link from 'next/link'
import React from 'react'

type Props = { onOpenModal?: () => void; isEn?: boolean }

export default function Header({ onOpenModal, isEn }: Props) {
  const langHref = isEn ? '/' : '/en'
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/"><a className="text-graphite font-bold text-lg">Bvetra</a></Link>
          <nav className="hidden md:flex gap-4 text-sm text-gray-700">
            <a href="#about">О нас</a>
            <a href="#services">Услуги</a>
            <a href="#fleet">Автопарк</a>
            <Link href="/vacancies"><a>Вакансии</a></Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onOpenModal} className="rounded-2xl bg-gold px-4 py-2 font-semibold text-graphite">ЗАКАЗАТЬ ТРАНСФЕР</button>
          <Link href={langHref}><a className="px-2 py-1 rounded hover:bg-gray-100 text-sm">{isEn ? 'RU' : 'EN'}</a></Link>
        </div>
      </div>
    </header>
  )
}