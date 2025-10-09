import Head from 'next/head'
import React, { useState } from 'react'
import Header from '../../src/components/Header'
import Modal from '../../src/components/Modal'
import UnifiedForm from '../../src/components/UnifiedForm'
import Footer from '../../src/components/Footer'
import ServicesGrid from '../../src/components/ServicesGrid'
import FleetGrid from '../../src/components/FleetGrid'

export default function HomeEn() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Head>
        <title>Bvetra — corporate transfers</title>
        <meta name="description" content="Corporate transfers and car rental for businesses" />
      </Head>

      <Header onOpenModal={() => setOpen(true)} />


      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="pt-6 pb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-graphite">Reliable corporate transfers</h1>
              <p className="mt-4 text-gray-700">Professional drivers, wide fleet, flexible rates.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setOpen(true)} className="btn-accent">ORDER TRANSFER</button>
                <a href="#contacts" className="btn-primary">Contacts</a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
              <img src="/images/hero-car.webp" alt="car" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        <section id="about" className="py-8">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-3 text-gray-700">We provide transfer services for corporate clients...</p>
        </section>

        <section id="services" className="py-8">
          <h2 className="text-2xl font-semibold">Services</h2>
          <ServicesGrid />
        </section>

        <section id="fleet" className="py-8">
          <h2 className="text-2xl font-semibold">Fleet</h2>
          <FleetGrid />
        </section>

        <section id="contacts" className="py-8">
          <h2 className="text-2xl font-semibold">Contacts</h2>
          <div className="grid md:grid-cols-2 gap-6 items-start mt-4">
            <div className="space-y-2 text-gray-700">
              <p>Phone: +7 (999) 000-00-00</p>
              <p>Email: info@example.com</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <UnifiedForm type="contact" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Modal open={open} onClose={() => setOpen(false)} title="Submit request">
        <UnifiedForm type="modal" onSuccess={() => setOpen(false)} />
      </Modal>

      <button aria-label="quick-apply" onClick={() => setOpen(true)} className="fixed right-4 bottom-4 rounded-full bg-gold p-3 shadow-lg">Submit</button>
    </>
  )
}