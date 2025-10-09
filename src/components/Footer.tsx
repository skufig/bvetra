// src/components/Footer.tsx

import React from 'react'

// Объявление интерфейса для пропсов компонента ContactItem
interface ContactItemProps {
  icon: React.ReactNode
  content: string
  href?: string
  isMuted?: boolean
}

// Компонент ContactItem
function ContactItem({ icon, content, href, isMuted }: ContactItemProps) {
  const className = `flex items-center gap-3 text-sm ${
    isMuted
      ? 'text-gray-500 dark:text-gray-400'
      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer'
  }`

  if (href) {
    return (
      <a href={href} className={className}>
        {icon}
        {content}
      </a>
    )
  }

  return (
    <div className={className}>
      {icon}
      {content}
    </div>
  )
}

// Основной компонент Footer
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-6 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Контакты</h2>
        <div className="flex justify-center space-x-6">
          {/* Используйте иконки по необходимости */}
          <ContactItem
            icon={<span className="material-icons">phone</span>}
            content="+7 (999) 000-00-00"
          />
          <ContactItem
            icon={<span className="material-icons">email</span>}
            content="info@example.com"
            href="mailto:info@example.com"
          />
          <ContactItem
            icon={<span className="material-icons">location_on</span>}
            content="г. Москва"
            href="https://maps.google.com/?q=г. Москва"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer