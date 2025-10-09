import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Lang = 'ru' | 'en'
type LangContext = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LangContext | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bvetra_lang')
      if (saved === 'en' || saved === 'ru') setLang(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('bvetra_lang', lang)
    } catch {}
  }, [lang])

  const toggle = () => setLang(prev => (prev === 'ru' ? 'en' : 'ru'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
