import React from 'react'

const services = [
  { title: 'Трансфер в аэропорт', desc: 'Быстрый и комфортный трансфер.' },
  { title: 'Корпоративная аренда', desc: 'Автомобили по договору.' },
  { title: 'Долгосрочная аренда', desc: 'Гибкие условия.' },
  { title: 'Экскурсии и мероприятия', desc: 'Профессиональные водители.' },
]

export default function ServicesGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-4">
      {services.map(s=> (
        <div key={s.title} className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-graphite">{s.title}</h3>
          <p className="mt-2 text-gray-700">{s.desc}</p>
        </div>
      ))}
    </div>
  )
}