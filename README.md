# Bvetra Starter — Next.js + TypeScript + Tailwind

This is a full starter project scaffold tailored to the TЗ provided. It contains:
- Next.js + TypeScript scaffold
- Tailwind CSS setup + design tokens
- Reusable components: Header, Footer, Modal, UnifiedForm, MobileMenu
- Pages: index, vacancies, en copies, 404
- API route `/api/submit` for Bitrix24 webhook proxy

## Quickstart
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local` based on `.env.example` and set your `BITRIX_WEBHOOK_URL`.
3. Run development server:
```bash
npm run dev
```
4. Open http://localhost:3000

## Deploy
Recommended: Vercel (automatic Next.js support). Ensure environment variable `BITRIX_WEBHOOK_URL` is set in deployment settings.
