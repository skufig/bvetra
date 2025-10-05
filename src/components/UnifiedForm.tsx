import React, { useState } from 'react'

type FormType = 'modal'|'contact'|'vacancy'
type Props = { type?: FormType; onSuccess?: () => void; defaultValues?: Record<string, any>; serviceOptions?: string[]; submitButtonText?: string }

const defaultServiceOptions = ['Пассажирский трансфер', 'Корпоративная аренда', 'Другие услуги']

export default function UnifiedForm({ type='modal', onSuccess, defaultValues={}, serviceOptions=defaultServiceOptions, submitButtonText }: Props) {
  const [form, setForm] = useState({
    category: defaultValues.category ?? (type === 'modal' ? 'Заказать трансфер' : ''),
    name: defaultValues.name ?? '',
    phone: defaultValues.phone ?? '',
    message: defaultValues.message ?? '',
    service: defaultValues.service ?? serviceOptions[0],
    experience: defaultValues.experience ?? '',
    about: defaultValues.about ?? ''
  })
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string|null>(null)
  const [errorText, setErrorText] = useState<string|null>(null)

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim()) e.name = 'Укажите имя'
    if (!form.phone.trim() || !/^\+?[0-9\-\s()]{6,}$/.test(form.phone)) e.phone = 'Введите корректный телефон'
    if (type === 'vacancy' && !form.experience.trim()) e.experience = 'Укажите стаж'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const change = (k:string,v:any)=>{ setForm(s=>({...s,[k]:v})); setErrors(prev=>({...prev,[k]:''})) }

  const handleSubmit = async (e?:React.FormEvent) => {
    e?.preventDefault()
    if (!validate()) return
    setLoading(true); setErrorText(null)
    try {
      const payload = {
        type: type === 'modal' ? form.category || 'Modal' : type === 'contact' ? 'Contact' : 'Vacancy',
        fields: { name: form.name, phone: form.phone, message: form.message, service: form.service, experience: form.experience, about: form.about, category: form.category }
      }
      const res = await fetch('/api/submit', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok || !data.ok) { setErrorText('Ошибка отправки. Попробуйте позже'); console.error('Submit error', data) }
      else { setSuccess('Заявка отправлена'); if (onSuccess) onSuccess(); setForm({ category: defaultValues.category ?? (type === 'modal' ? 'Заказать трансфер' : ''), name:'', phone:'', message:'', service:serviceOptions[0], experience:'', about:'' }) }
    } catch (err) { console.error(err); setErrorText('Ошибка сети. Попробуйте позже') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'modal' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Категория</label>
          <select value={form.category} onChange={e=>change('category',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2">
            <option>Заказать трансфер</option>
            <option>Стать водителем</option>
            <option>Другое</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Имя</label>
        <input value={form.name} onChange={e=>change('name',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" placeholder="Иван Иванов" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Телефон</label>
        <input value={form.phone} onChange={e=>change('phone',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" placeholder="+7 (___) ___-__-__" inputMode="tel" />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>

      {type === 'contact' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Услуга</label>
          <select value={form.service} onChange={e=>change('service',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2">
            {serviceOptions.map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
      )}

      {type === 'vacancy' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Стаж (лет)</label>
            <input value={form.experience} onChange={e=>change('experience',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" placeholder="Например: 3" />
            {errors.experience && <p className="mt-1 text-xs text-red-600">{errors.experience}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Расскажите о себе (опционально)</label>
            <textarea value={form.about} onChange={e=>change('about',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" rows={4} />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Сообщение (опционально)</label>
        <textarea value={form.message} onChange={e=>change('message',e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" rows={3} />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-semibold bg-graphite text-white disabled:opacity-60" disabled={loading}>
          {loading ? 'Отправка...' : submitButtonText ?? (type === 'vacancy' ? 'Откликнуться' : 'Отправить')}
        </button>
        {success && <p className="text-sm text-green-600">{success}</p>}
        {errorText && <p className="text-sm text-red-600">{errorText}</p>}
      </div>
    </form>
  )
}