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
    <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Фон для закрытия */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />
      
      {/* Модальное окно */}
      <div className="relative w-full max-w-xl md:max-w-3xl bg-white dark:bg-[#061018] rounded-xl shadow-lg z-10 mx-auto my-4 outline-none focus:outline-none overflow-hidden">
        {/* Заголовок и кнопка закрытия */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">{L.title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#0b1116] transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Основная форма */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
          className="p-4 flex flex-col md:flex-row gap-4"
        >
          {/* Основная часть формы */}
          <div className="flex-1 w-full flex flex-col gap-4">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={L.name}
                className="p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={L.phone}
                className="p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Откуда и Куда */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder={L.from}
                className="p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={L.to}
                className="p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Дата, время и авто */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              {/* Дата и время */}
              <div className="flex-1">
                <label className="block mb-1 text-xs text-gray-500">{L.date} & {L.time}</label>
                <DatePicker
                  selected={datetime}
                  onChange={(d) => setDatetime(d)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  placeholderText={isEn ? 'Select date and time' : 'Выберите дату и время'}
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  required
                />
              </div>

              {/* Выбор авто */}
              <div className="flex-1 md:col-span-2">
                <label className="block mb-1 text-xs text-gray-500">{L.car}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700 rounded">
                  {CARS.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCar(c)}
                      className={`p-3 rounded border cursor-pointer transition duration-200 ${
                        selectedCar.id === c.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium">{c.title}</div>
                      {c.subtitle && <div className="text-xs text-gray-500">{c.subtitle}</div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Примечания */}
            <div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={L.notes}
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                rows={3}
              />
            </div>

            {/* Подтверждение и способ связи */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              {/* Согласие */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="accent-indigo-500"
                />
                <span>{L.agreeText}</span>
              </label>

              {/* Предпочтительный способ связи */}
              <div className="ml-auto flex items-center gap-2">
                <label className="text-sm text-gray-500">{L.preferContact}:</label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value as 'phone' | 'email')}
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                >
                  <option value="phone">{isEn ? 'Phone' : 'Телефон'}</option>
                  <option value="email">{isEn ? 'Email' : 'Эл. почта'}</option>
                </select>
              </div>
            </div>

            {/* Кнопки отправки */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={loading || !agree}
                className={`w-full md:w-auto px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition`}
              >
                {loading ? (
                  <div className="border-2 border-white border-t-transparent w-5 h-5 rounded-full animate-spin mr-2" />
                ) : (
                  L.submit
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
              >
                {isEn ? 'Close' : 'Закрыть'}
              </button>
            </div>
            {/* Уведомления */}
            <div className="mt-2 flex flex-col space-y-2">
              {success && (
                <div className="flex items-center text-green-600 text-sm gap-2">
                  <FiCheck />
                  {L.success}
                </div>
              )}
              {error && <div className="text-red-600 text-sm">{error}</div>}
            </div>
          </div>

          {/* Боковая панель с информацией */}
          <aside className="md:col-span-1 bg-gray-50 dark:bg-[#071217] p-4 rounded-lg flex flex-col gap-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
            <div>
              <div className="text-xs text-gray-500 mb-1">{selectedCar.subtitle}</div>
              <div className="font-semibold text-lg">{selectedCar.title}</div>
            </div>
            <div className="text-sm text-gray-600 flex flex-col gap-2">
              <div>• {isEn ? 'Meet & greet' : 'Встреча с табличкой'}</div>
              <div>• {isEn ? 'Luggage assistance' : 'Помощь с багажом'}</div>
              <div>• {isEn ? 'Waiting included' : 'Время ожидания включено'}</div>
            </div>
            <div className="mt-auto text-xs text-gray-500">{isEn ? 'Price available on request' : 'Цена по запросу'}</div>
          </aside>
        </form>
      </div>
    </div>
  )
}