// components/BookingModal.tsx
import React, { useEffect, useState } from 'react'
import { FiX, FiCheck } from 'react-icons/fi'

type Props = {
  open: boolean
  onClose: () => void
  isEn?: boolean
}

export default function BookingModal({ open, onClose, isEn = false }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const L = isEn
    ? {
        title: 'Transfer booking',
        submit: 'Send booking',
        success: 'Booking sent — we will contact you',
        required: 'Please fill required fields',
        agreeText: 'I consent to data processing',
        cancel: 'Cancel',
      }
    : {
        title: 'Заявка на трансфер',
        submit: 'Отправить заявку',
        success: 'Заявка отправлена — мы свяжемся с вами',
        required: 'Пожалуйста, заполните обязательные поля',
        agreeText: 'Подтверждаю согласие на обработку данных',
        cancel: 'Отмена',
      }

  useEffect(() => {
    if (!open) {
      // reset
      setName(''); setPhone(''); setEmail(''); setFrom(''); setTo(''); setDate(''); setTime(''); setNotes(''); setAgree(false)
      setLoading(false); setSuccess(false); setError(null)
    }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name || !phone || !from || !to || !date) {
      setError(L.required)
      return
    }
    setLoading(true)
    try {
      const payload = { name, phone, email, from, to, date, time, notes }
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.message || 'Network error')
      setSuccess(true)
      window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'booking_submitted', payload } }))
      // keep modal open to show success; auto-close after short delay
      setTimeout(() => { setLoading(false); onClose() }, 1600)
    } catch (err: any) {
      setError(err.message || 'Error')
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-60 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-[color:var(--bg)] dark:bg-[color:var(--surface-1)] rounded-t-xl md:rounded-xl shadow-elevated overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{L.title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-[color:var(--primary)]/12"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder={isEn ? 'Name' : 'Имя'} className="p-3 rounded border w-full" required />
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={isEn ? 'Phone' : 'Телефон'} className="p-3 rounded border w-full" required />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="p-3 rounded border w-full" />
          <input value={from} onChange={(e)=>setFrom(e.target.value)} placeholder={isEn ? 'From' : 'Откуда'} className="p-3 rounded border w-full" required />
          <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder={isEn ? 'To' : 'Куда'} className="p-3 rounded border w-full" required />
          <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="p-3 rounded border w-full" required />
          <input value={time} onChange={(e)=>setTime(e.target.value)} type="time" className="p-3 rounded border w-full" />
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder={isEn ? 'Notes' : 'Примечания'} className="p-3 rounded border w-full md:col-span-2" rows={4} />

          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-[color:var(--muted)]">{L.agreeText}</span>
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" disabled={loading || !agree} className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary btn-lift">
              {loading ? (isEn ? 'Sending...' : 'Отправка...') : (isEn ? L.submit : L.submit)}
            </button>

            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full border">{isEn ? 'Cancel' : L.cancel}</button>

            {success && <div className="text-sm text-green-600 flex items-center gap-2"><FiCheck /> {L.success}</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  )
}
