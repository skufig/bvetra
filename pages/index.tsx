import Head from 'next/head'
import React, { useState } from 'react'
import Header from '../src/components/Header'
import Modal from '../src/components/Modal'
import UnifiedForm from '../src/components/UnifiedForm'
import Footer from '../src/components/Footer'
import ServicesGrid from '../src/components/ServicesGrid'
import FleetGrid from '../src/components/FleetGrid'

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Head>
        <title>Bvetra — корпоративные трансферы</title>
        <meta name="description" content="Корпоративные трансферы и аренда автомобилей для бизнеса" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onOpenModal={() => setOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="pt-6 pb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-graphite">Надёжные корпоративные трансферы</h1>
              <p className="mt-4 text-gray-700">Профессиональные водители, широкий автопарк, гибкие тарифы.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setOpen(true)} className="btn-accent">ЗАКАЗАТЬ ТРАНСФЕР</button>
                <a href="#contacts" className="btn-primary">Контакты</a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
              <img src="/images/hero-car.webp" alt="car" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        <section id="about" className="py-8">
          <h2 className="text-2xl font-semibold">О нас</h2>
          <p className="mt-3 text-gray-700">Мы предоставляем трансферные услуги для корпоративных клиентов...</p>
        </section>

        <section id="services" className="py-8">
          <h2 className="text-2xl font-semibold">Услуги</h2>
          <ServicesGrid />
        </section>

        <section id="fleet" className="py-8">
          <h2 className="text-2xl font-semibold">Автопарк</h2>
          <FleetGrid />
        </section>

        <section id="drivers" className="py-8">
          <h2 className="text-2xl font-semibold">Водители</h2>
          <p className="mt-2 text-gray-700">Опытные водители, строгое соответствие требованиям.</p>
        </section>

        <section id="vacancies" className="py-8">
          <h2 className="text-2xl font-semibold">Вакансии</h2>
          <p className="mt-2 text-gray-700">Открыта вакансия водителя. <a href="/vacancies" className="text-gold underline">Подробнее</a></p>
        </section>

        <section id="contacts" className="py-8">
          <h2 className="text-2xl font-semibold">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-6 items-start mt-4">
            <div className="space-y-2 text-gray-700">
              <p>Телефон: +7 (999) 000-00-00</p>
              <p>Email: info@example.com</p>
              <p>Адрес: г. Москва</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <UnifiedForm type="contact" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Modal open={open} onClose={() => setOpen(false)} title="Оставить заявку">
        <UnifiedForm type="modal" onSuccess={() => setOpen(false)} />
      </Modal>

      <button aria-label="quick-apply" onClick={() => setOpen(true)} className="fixed right-4 bottom-4 rounded-full bg-gold p-3 shadow-lg">Оставить заявку</button>
    </>
  )
}