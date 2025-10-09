import Head from 'next/head'
import React from 'react'
import Header from '../../src/components/Header'
import Footer from '../../src/components/Footer'
import UnifiedForm from '../../src/components/UnifiedForm'

export default function VacanciesEn() {
  return (
    <>
      <Head>
        <title>Vacancies — Bvetra</title>
        <meta name="description" content="Driver vacancies. Apply now." />
      </Head>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-graphite">Vacancy: Driver</h1>
        <p className="mt-3 text-gray-700">Requirements: driving experience from 2 years...</p>

        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Apply</h2>
          <UnifiedForm type="vacancy" submitButtonText="Apply now" />
        </div>
      </main>
      <Footer />
    </>
  )
}