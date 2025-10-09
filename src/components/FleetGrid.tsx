import React from 'react'
import Image from 'next/image'

const cars = [
  { id: '42442', name: 'BMW 7 Series', desc: 'Премиум / Бизнес', img: '/images/42442.jpg' },
  { id: '42443', name: 'BMW / Mercedes / BMW', desc: 'Группа авто (салон)', img: '/images/42443.jpg' },
  { id: '42444', name: 'BMW 7 Series', desc: 'Премиум', img: '/images/42444.jpg' },
  { id: '42445', name: 'BMW (rear)', desc: 'Премиум', img: '/images/42445.jpg' },
  { id: '42446', name: 'Интерьер (консоль)', desc: 'Водитель / Комфорт', img: '/images/42446.jpg' },
  { id: '42447', name: 'Две роскошные седаны', desc: 'Премиум', img: '/images/42447.jpg' },
  { id: '42448', name: 'Mercedes Benz', desc: 'Премиум', img: '/images/42448.jpg' },
  { id: '42449', name: 'Mercedes front', desc: 'Премиум', img: '/images/42449.jpg' },
  { id: '42450', name: 'BMW (фото 50)', desc: 'Премиум', img: '/images/42450.jpg' },
  { id: '42451', name: 'Седан у офиса', desc: 'Бизнес', img: '/images/42451.jpg' },
  { id: '42432', name: 'BMW (cobblestone)', desc: 'Премиум', img: '/images/42432.jpg' },
  { id: '42433', name: 'Marriott + седаны', desc: 'Премиум', img: '/images/42433.jpg' },
  { id: '42434', name: 'Mercedes front (34)', desc: 'Премиум', img: '/images/42434.jpg' },
  { id: '42435', name: 'BMW front (35)', desc: 'Премиум', img: '/images/42435.jpg' },
  { id: '42436', name: 'Три седана', desc: 'Премиум', img: '/images/42436.jpg' },
  { id: '42437', name: 'BMW 7 Series (37)', desc: 'Премиум', img: '/images/42437.jpg' },
  { id: '42438', name: 'BMW (38)', desc: 'Премиум', img: '/images/42438.jpg' },
  { id: '42439', name: 'Restaurant • lounge + седаны', desc: 'Премиум', img: '/images/42439.jpg' },
  { id: '42440', name: 'Два BMW', desc: 'Премиум', img: '/images/42440.jpg' },
  { id: '42441', name: 'BMW 7 Series (41)', desc: 'Премиум', img: '/images/42441.jpg' },
]

export default function FleetGrid() {
  return (
    <section aria-labelledby="fleet-title" className="mt-8">
      <h2 id="fleet-title" className="text-2xl font-bold mb-4 motion-fadeInUp">Наш автопарк</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((c) => (
          <article
            key={c.id}
            data-reveal
            className="relative bg-[color:var(--surface-1)] dark:bg-[color:var(--surface-2)] rounded-2xl overflow-hidden border border-transparent hover:border-[color:var(--primary)]/18 transition-transform duration-300 hover:-translate-y-2 shadow-sm"
            aria-label={`${c.name} — ${c.desc}`}
          >
            <div className="flex items-center gap-4 p-4">
              <div className="w-32 h-22 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-[#0b0a09]">
                <Image
                  src={c.img}
                  alt={`${c.name} — ${c.desc}`}
                  width={320}
                  height={200}
                  className="object-cover w-full h-full"
                  priority={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[color:var(--text)] leading-tight">{c.name}</h3>
                <p className="text-sm text-[color:var(--muted)] mt-1">{c.desc}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[color:var(--primary)]/8 text-[color:var(--primary)]">
                    <svg width="14" height="10" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-90">
                      <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {c.desc}
                  </span>

                  <button
                    className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold btn-primary btn-lift"
                    onClick={() => window.dispatchEvent(new CustomEvent('openTransferModal', { detail: { car: c.name } }))}
                    aria-label={`Заказать ${c.name}`}
                  >
                    <span className="shimmer" aria-hidden />
                    Заказать
                  </button>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[rgba(0,0,0,0.04)] to-transparent dark:from-[rgba(0,0,0,0.32)] rounded-b-2xl" />
          </article>
        ))}
      </div>
    </section>
  )
}
