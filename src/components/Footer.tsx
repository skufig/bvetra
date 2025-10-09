// src/components/Footer.tsx
import React, { useState, useEffect } from 'react'
import { FiPhone, FiMail, FiClock, FiInstagram } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import BookingModal from './BookingModal'
import ChatModal from './ChatModal'
import ProfileModal from './ProfileModal'
import BottomNav from './BottomNav'

export default function Footer() {
  const [lang, setLang] = useState<'ru'|'en'>('ru')
  useEffect(()=>{ try{ const l = localStorage.getItem('lang'); if(l==='en' || l==='ru') setLang(l) }catch{} },[])
  const isEn = lang==='en'
  const [openBooking, setOpenBooking] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  function switchLang(to:'ru'|'en'){ setLang(to); try{ localStorage.setItem('lang', to) }catch{} }

  return (
    <>
      <footer className="bg-white dark:bg-[#061018] border-t">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">Bv</div>
              <div>
                <div className="font-semibold">Bvetra</div>
                <div className="text-sm text-gray-500">{isEn ? 'Corporate transfers' : 'Корпоративные трансферы'}</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2"><FiPhone/> <a href="tel:+375291234567" className="hover:underline">+375 29 123-45-67</a></div>
              <div className="flex items-center gap-2"><FiMail/> <a href="mailto:support@bvetra.example" className="hover:underline">support@bvetra.example</a></div>
              <div className="flex items-center gap-2 text-xs"><FiClock/> 08:00 — 22:00</div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <a className="p-2 rounded hover:bg-gray-100"><FiInstagram/></a>
              <a className="p-2 rounded hover:bg-gray-100"><FaTelegramPlane/></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{isEn ? 'Navigation' : 'Навигация'}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="hover:underline">{isEn ? 'Home' : 'Главная'}</button></li>
              <li><button onClick={()=>setOpenBooking(true)} className="hover:underline">{isEn ? 'Booking' : 'Бронь'}</button></li>
              <li><button onClick={()=>setOpenChat(true)} className="hover:underline">{isEn ? 'Chat' : 'Чат'}</button></li>
              <li><button onClick={()=>setOpenProfile(true)} className="hover:underline">{isEn ? 'Profile' : 'Профиль'}</button></li>
            </ul>

            <div className="mt-4 flex gap-2">
              <button onClick={()=>switchLang('ru')} className={`px-3 py-1 rounded ${lang==='ru' ? 'bg-indigo-600 text-white' : 'border'}`}>RU</button>
              <button onClick={()=>switchLang('en')} className={`px-3 py-1 rounded ${lang==='en' ? 'bg-indigo-600 text-white' : 'border'}`}>EN</button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{isEn ? 'App' : 'Приложение'}</h4>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 rounded border text-sm">App Store</button>
              <button className="px-4 py-2 rounded border text-sm">Google Play</button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{isEn ? 'Support' : 'Поддержка'}</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div>FAQ</div>
              <div>Terms</div>
              <div>Privacy</div>
            </div>
            <div className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} Bvetra</div>
          </div>
        </div>
      </footer>

      <BookingModal open={openBooking} onClose={()=>setOpenBooking(false)} lang={lang} />
      <ChatModal open={openChat} onClose={()=>setOpenChat(false)} lang={lang} />
      <ProfileModal open={openProfile} onClose={()=>setOpenProfile(false)} />

      <BottomNav onOpenBooking={()=>setOpenBooking(true)} onOpenChat={()=>setOpenChat(true)} phone="+375291234567" />
    </>
  )
}
