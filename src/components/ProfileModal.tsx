// src/components/ProfileModal.tsx
import React from 'react'

export default function ProfileModal({ open, onClose }: { open: boolean; onClose: ()=>void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="bg-white dark:bg-[#0b0a09] p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold mb-4">Профиль</h3>
        <p className="text-sm text-gray-600 mb-4">В разработке</p>
        <button onClick={onClose} className="px-4 py-2 rounded border">Закрыть</button>
      </div>
    </div>
  )
}
