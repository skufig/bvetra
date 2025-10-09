// src/components/BookingModal.tsx
import React, { useEffect, useState } from 'react'
import { FiX, FiCheck, FiChevronDown } from 'react-icons/fi'

type Props = { open: boolean; onClose: () => void; lang?: 'ru' | 'en' }

type Car = { id: string; title: string; subtitle?: string; img?: string }

const CARS: Car[] = [
  { id: '42442', title: 'BMW 7 Series', subtitle: 'Premium business' },
  { id: '42443', title: 'Mixed fleet', subtitle: 'Group cars' },
  { id: '42448', title: 'Mercedes-Benz', subtitle: 'Premium' },
  // Добавьте остальные по необходимости
]

export default function BookingModal({ open, onClose, lang = 'ru' }: Props) {
  const isEn = lang === 'en'
  const L = {
    title: isEn ? 'Transfer booking' : 'Заявка на трансфер',
    submit: isEn ? 'Send booking' : 'Отправить заявку',
    success: isEn ? 'Booking sent — we will contact you' : 'Заявка отправлена — мы свяжемся с вами',
    required: isEn ? 'Please fill required fields' : 'Пожалуйста, заполните обязательные поля',
    preferContact: isEn ? 'Preferred contact method' : 'Предпочтительный способ связи',
    phone: isEn ? 'Phone' : 'Телефон',
    email: 'Email',
    name: isEn ? 'Name' : 'Имя',
    from: isEn ? 'From' : 'Откуда',
    to: isEn ? 'To' : 'Куда',
    date: isEn ? 'Date' : 'Дата',
    time: isEn ? 'Time' : 'Время',
    car: isEn ? 'Select car' : 'Выберите авто',
    notes: isEn ? 'Notes' : 'Примечания',
    agreeText: isEn ? 'I consent to data processing' : 'Подтверждаю согласие на обработку данных',
    cancel: isEn ? 'Cancel' : 'Отмена',
    choose: isEn ? 'Choose' : 'Выбрать',
    priceHint: isEn ? 'Price on request' : 'Цена по запросу'
  }

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(false)
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [selectedCar, setSelectedCar] = useState<Car | null>(CARS[0])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setName(''); setPhone(''); setEmail(''); setFrom(''); setTo(''); setDate(''); setTime(''); setNotes('')
      setAgree(false); setContactMethod('phone'); setSelectedCar(CARS[0]); setLoading(false); setError(null); setSuccess(false)
    } else {
      // prevent header overlap: focus trap and scroll lock
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name || !phone || !from || !to || !date || !selectedCar || !agree) {
      setError(L.required)
      return
    }
    setLoading(true)
    try {
      const payload = {
        name, phone, email, from, to, date, time, notes,
        carId: selectedCar.id, carTitle: selectedCar.title, contactMethod
      }
      const res = await fetch('/api/booking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.message || 'Network error')
      setSuccess(true)
      // optionally clear fields after success
      setTimeout(() => { setLoading(false); onClose() }, 1400)
    } catch (err: any) {
      setError(err.message || 'Error')
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-3xl mx-4 bg-white dark:bg-[#0b0a09] rounded-t-xl md:rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{L.title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#111]"><FiX/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 grid grid-cols-1 gap-3">
            <div className="flex gap-2">
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder={L.name} className="flex-1 p-3 rounded border" required />
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={L.phone} className="w-40 p-3 rounded border" required />
            </div>

            <div className="flex gap-2">
              <input value={from} onChange={(e)=>setFrom(e.target.value)} placeholder={L.from} className="flex-1 p-3 rounded border" required />
              <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder={L.to} className="flex-1 p-3 rounded border" required />
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <label className="text-xs text-gray-500">{L.date}</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full p-3 rounded border" required />
              </div>

              <div className="w-36">
                <label className="text-xs text-gray-500">{L.time}</label>
                <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="w-full p-3 rounded border" />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500">{L.car}</label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CARS.map(c => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setSelectedCar(c)}
                    className={`p-2 rounded border text-left w-full ${selectedCar?.id===c.id ? 'border-indigo-500 ring-1 ring-indigo-200' : ''}`}
                  >
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-gray-500">{c.subtitle}</div>
                    <div className="text-xs text-gray-400 mt-1">{L.priceHint}</div>
                  </button>
                ))}
              </div>
            </div>

            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder={L.notes} className="p-3 rounded border w-full" rows={3} />

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                <span>{L.agreeText}</span>
              </label>

              <div className="flex items-center gap-2 ml-auto">
                <label className="text-sm text-gray-500 mr-2">{L.preferContact}:</label>
                <select value={contactMethod} onChange={(e)=>setContactMethod(e.target.value as any)} className="p-2 rounded border">
                  <option value="phone">{isEn ? 'Phone' : 'Телефон'}</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
          </div>

          <aside className="md:col-span-1 bg-gray-50 dark:bg-[#071015] p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{selectedCar?.subtitle}</div>
                <div className="font-semibold">{selectedCar?.title}</div>
              </div>
              <div className="text-sm text-indigo-600 font-semibold">—</div>
            </div>

            <div className="text-xs text-gray-500">Пример услуги</div>
            <ul className="text-sm space-y-1">
              <li>• {isEn ? 'Meet & greet' : 'Встреча с табличкой'}</li>
              <li>• {isEn ? 'Luggage assistance' : 'Помощь с багажом'}</li>
              <li>• {isEn ? 'Waiting time included' : 'Время ожидания включено'}</li>
            </ul>

            <div className="mt-auto">
              {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
              {success && <div className="text-sm text-green-600 mb-2"><FiCheck/> {L.success}</div>}

              <div className="flex gap-2">
                <button type="submit" onClick={(e)=>{ /* delegate submit via form */ }} form="booking-form" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded" >
                  {loading ? (isEn ? 'Sending…' : 'Отправка…') : (isEn ? L.submit : L.submit)}
                </button>
                <button type="button" onClick={onClose} className="px-4 py-2 rounded border">{isEn ? 'Close' : 'Закрыть'}</button>
              </div>
            </div>
          </aside>

          {/* Hidden form submit to integrate aside button */}
          <button type="submit" form="booking-form" className="hidden" />
        </form>
      </div>
    </div>
  )
}
