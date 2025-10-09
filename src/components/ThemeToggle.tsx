import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button aria-label="Toggle theme" onClick={toggle} className="px-3 py-1 rounded-md border">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
