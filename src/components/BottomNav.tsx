// src/components/BottomNav.tsx
import React from 'react'
import { FiHome, FiCalendar, FiMessageSquare, FiUser, FiPhone } from 'react-icons/fi'
import Link from 'next/link'

export default function BottomNav({ onOpenBooking, onOpenChat, phone = '+375291234567' }:{ onOpenBooking?: ()=>void; onOpenChat?: ()=>void; phone?: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9998] bg-white dark:bg-[#071018] border-t md:hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link href="/#top"><a className="flex flex-col items-center text-xs text-gray-600"><FiHome size={18}/><span>Home</span></a></Link>
          <button onClick={onOpenBooking} className="flex flex-col items-center text-xs text-gray-600"><FiCalendar size={18}/><span>Book</span></button>
          <button onClick={onOpenChat} className="flex flex-col items-center text-xs text-gray-600"><FiMessageSquare size={18}/><span>Chat</span></button>
          <Link href="/profile"><a className="flex flex-col items-center text-xs text-gray-600"><FiUser size={18}/><span>Profile</span></a></Link>
          <a href={`tel:${phone}`} className="flex flex-col items-center text-xs text-gray-600"><FiPhone size={18}/><span>Call</span></a>
        </div>
      </div>
    </nav>
  )
}
