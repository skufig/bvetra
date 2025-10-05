import type { NextApiRequest, NextApiResponse } from 'next'

const BITRIX_WEBHOOK_URL = process.env.BITRIX_WEBHOOK_URL || ''

const CUSTOM_FIELD_MAP: Record<string,string> = {
  // add mappings for UF_CRM_... if needed, e.g. 'experience': 'UF_CRM_1681234567'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow','POST')
    return res.status(405).json({ ok:false, error:'Method not allowed' })
  }
  if (!BITRIX_WEBHOOK_URL) {
    return res.status(500).json({ ok:false, error:'BITRIX_WEBHOOK_URL not configured' })
  }

  const { type, fields } = req.body as { type?: string; fields?: Record<string,any> }
  const bitrixFields: Record<string, any> = {
    TITLE: `Заявка с сайта — ${type || 'Site'}`,
    NAME: fields?.name || '',
    PHONE: fields?.phone ? [{ VALUE: fields.phone, VALUE_TYPE: 'WORK' }] : [],
    COMMENTS: fields?.message || fields?.about || ''
  }

  if (fields?.service) bitrixFields.COMMENTS = `${bitrixFields.COMMENTS || ''}\nУслуга: ${fields.service}`
  Object.keys(fields || {}).forEach(k=> { if (CUSTOM_FIELD_MAP[k]) bitrixFields[CUSTOM_FIELD_MAP[k]] = fields[k] })

  try {
    const url = BITRIX_WEBHOOK_URL.includes('crm.lead.add') ? BITRIX_WEBHOOK_URL : BITRIX_WEBHOOK_URL.replace(/\/$/,'') + '/crm.lead.add.json'
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ fields: bitrixFields, params: { REGISTER_SONET_EVENT: 'Y' } }) })
    const data = await r.json()
    if (!r.ok || data.error) {
      console.error('Bitrix error', data)
      return res.status(500).json({ ok:false, error:data })
    }
    res.status(200).json({ ok:true, data })
  } catch (err) {
    console.error('Submit error', err)
    res.status(500).json({ ok:false, error:err })
  }
}