import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="inline-flex items-center space-x-2">
      <button
        aria-label="Русский"
        onClick={() => setLang('ru')}
        className={`px-2 py-1 rounded ${lang==='ru' ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
      >
        RU
      </button>
      <button
        aria-label="English"
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded ${lang==='en' ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
      >
        EN
      </button>
    </div>
  )
}
