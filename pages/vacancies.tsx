import Head from 'next/head'
import React from 'react'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import UnifiedForm from '../src/components/UnifiedForm'

export default function Vacancies() {
  return (
    <>
      <Head>
        <title>Вакансии — Bvetra</title>
        <meta name="description" content="Вакансии водителя. Отклик на вакансию." />
      </Head>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-graphite">Вакансия: Водитель</h1>
        <p className="mt-3 text-gray-700">Требования: опыт вождения от 2 лет, медсправка, аккуратность.</p>

        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Отклик на вакансию</h2>
          <UnifiedForm type="vacancy" submitButtonText="Откликнуться на вакансию" />
        </div>
      </main>
      <Footer />
    </>
  )
}