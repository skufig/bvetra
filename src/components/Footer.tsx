import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} Bvetra — корпоративные трансферы. Все права защищены.
      </div>
    </footer>
  )
}