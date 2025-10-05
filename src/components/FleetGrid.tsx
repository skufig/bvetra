import React from 'react'

const cars = [
  { name: 'Toyota Camry', desc: 'Бизнес-класс', img: '/images/car1.webp' },
  { name: 'Mercedes E', desc: 'Премиум', img: '/images/car2.webp' },
  { name: 'Ford Transit', desc: 'Минивэн', img: '/images/car3.webp' },
  { name: 'Volkswagen Polo', desc: 'Эконом', img: '/images/car4.webp' },
]

export default function FleetGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-4">
      {cars.map(c=> (
        <div key={c.name} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center">
          <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
            <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-graphite">{c.name}</h3>
            <p className="text-gray-700 text-sm">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}