import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // Apply stored theme early on client to avoid flash
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    } catch {}
  }, [])

  return <Component {...pageProps} />
}
