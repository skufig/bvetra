import React, { useEffect, useState } from 'react'

type Props = { open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }

export default function Modal({ open, onClose, title, children }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || !open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, mounted, onClose])

  if (!mounted || !open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl mx-4 md:mx-0 bg-white rounded-2xl shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            {title ? <h3 className="text-xl font-semibold text-graphite">{title}</h3> : <div/>}
            <button aria-label="close" onClick={onClose} className="ml-4 rounded-full p-1 hover:bg-gray-100">✕</button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}