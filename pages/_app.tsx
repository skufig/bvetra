// pages/_app.tsx (пример добавления Footer)
import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Footer from '../src/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    } catch {}
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
