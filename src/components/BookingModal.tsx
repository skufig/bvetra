// src/components/BookingModal.tsx
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { FiX, FiCheck } from 'react-icons/fi'
import 'react-datepicker/dist/react-datepicker.css'

type Props = { open: boolean; onClose: () => void; lang?: 'ru' | 'en' }

type Car = { id: string; title: string; subtitle?: string }

const CARS: Car[] = [
  { id: '42442', title: 'BMW 7 Series', subtitle: 'Premium business' },
  { id: '42448', title: 'Mercedes-Benz S-Class', subtitle: 'Premium' },
  { id: '42436', title: 'VIP Fleet', subtitle: 'Group options' }
]

export default function BookingModal({ open, onClose, lang = 'ru' }: Props) {
  const isEn = lang === 'en'
  const L = {
    title: isEn ? 'Transfer booking' : 'Заявка на трансфер',
    submit: isEn ? 'Send booking' : 'Отправить заявку',
    success: isEn ? 'Booking sent — we will contact you' : 'Заявка отправлена — мы свяжемся с вами',
    required: isEn ? 'Please fill required fields' : 'Пожалуйста, заполните обязательные поля',
    preferContact: isEn ? 'Preferred contact' : 'Предпочтительный способ связи',
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
    priceHint: isEn ? 'Price on request' : 'Цена по запросу'
  }

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [datetime, setDatetime] = useState<Date | null>(null)
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(false)
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [selectedCar, setSelectedCar] = useState<Car>(CARS[0])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (!open) {
      setName(''); setPhone(''); setEmail(''); setFrom(''); setTo(''); setDatetime(null); setNotes('')
      setAgree(false); setContactMethod('phone'); setSelectedCar(CARS[0]); setLoading(false); setError(null); setSuccess(false)
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setError(null)
    if (!name || !phone || !from || !to || !datetime || !agree) {
      setError(L.required)
      return
    }
    setLoading(true)
    try {
      const isoDate = datetime.toISOString()
      const payload = { name, phone, email, from, to, datetime: isoDate, notes, carId: selectedCar.id, contactMethod, carTitle: selectedCar.title }
      const res = await fetch('/api/booking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.message || 'Network error')
      setSuccess(true)
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
      <div className="relative w-full max-w-4xl mx-4 bg-white dark:bg-[#061018] rounded-t-xl md:rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{L.title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#0b1116]"><FiX /></button>
        </div>

        <form ref={formRef} onSubmit={(e)=>{ e.preventDefault(); handleSubmit() }} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder={L.name} className="p-3 rounded border w-full" required />
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={L.phone} className="p-3 rounded border w-full" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input value={from} onChange={(e)=>setFrom(e.target.value)} placeholder={L.from} className="p-3 rounded border w-full" required />
              <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder={L.to} className="p-3 rounded border w-full" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
              <div>
                <label className="text-xs text-gray-500 block mb-1">{L.date} & {L.time}</label>
                <DatePicker
                  selected={datetime}
                  onChange={(d) => setDatetime(d)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  className="w-full p-3 rounded border"
                  placeholderText={isEn ? 'Select date and time' : 'Выберите дату и время'}
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">{L.car}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CARS.map(c => (
                    <button key={c.id} type="button" onClick={()=>setSelectedCar(c)} className={`p-3 rounded border text-left ${selectedCar.id===c.id ? 'border-indigo-500 bg-indigo-50' : ''}`}>
                      <div className="font-medium">{c.title}</div>
                      <div className="text-xs text-gray-500">{c.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder={L.notes} className="p-3 rounded border w-full" rows={3} />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                <span>{L.agreeText}</span>
              </label>

              <div className="ml-auto flex items-center gap-2">
                <label className="text-sm text-gray-500 mr-2">{L.preferContact}:</label>
                <select value={contactMethod} onChange={(e)=>setContactMethod(e.target.value as any)} className="p-2 rounded border">
                  <option value="phone">{isEn ? 'Phone' : 'Телефон'}</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading || !agree} className="px-4 py-2 rounded bg-indigo-600 text-white">
                {loading ? (isEn ? 'Sending…' : 'Отправка…') : (isEn ? L.submit : L.submit)}
              </button>
              <button type="button" onClick={onClose} className="px-4 py-2 rounded border">{isEn ? 'Close' : 'Закрыть'}</button>
              {success && <div className="text-sm text-green-600 flex items-center gap-2"><FiCheck /> {L.success}</div>}
              {error && <div className="text-sm text-red-600">{error}</div>}
            </div>
          </div>

          <aside className="md:col-span-1 bg-gray-50 dark:bg-[#071217] p-4 rounded-lg flex flex-col gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">{selectedCar.subtitle}</div>
              <div className="font-semibold">{selectedCar.title}</div>
            </div>

            <div className="text-sm text-gray-600">
              <div>• {isEn ? 'Meet & greet' : 'Встреча с табличкой'}</div>
              <div>• {isEn ? 'Luggage assistance' : 'Помощь с багажом'}</div>
              <div>• {isEn ? 'Waiting included' : 'Время ожидания включено'}</div>
            </div>

            <div className="mt-auto text-xs text-gray-500"> {isEn ? 'Price available on request' : 'Цена по запросу'} </div>
          </aside>
        </form>
      </div>
    </div>
  )
                                                           }
