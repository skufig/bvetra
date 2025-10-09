// pages/_app.tsx (пример добавления Footer)
import '../src/polyfills';
import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'
import { LanguageProvider } from '../src/context/LanguageContext'
import { ThemeProvider } from '../src/context/ThemeContext'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    } catch {}
  }, [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
