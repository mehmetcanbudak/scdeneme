"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingBag, User, Search, Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import HeroHeader from "@/components/hero-header"

export default function Iletisim() {
  // Enable transparent navigation for hero section
  useNavigationTransparency(true)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const scrollToContent = useCallback(() => {
    const contentSection = document.querySelector("#main-content")
    if (contentSection) {
      const headerHeight = 64
      const elementPosition = contentSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen relative bg-white">
      
      {/* Navigation is now handled by the shared Navigation component */}

      <HeroHeader
        slides={[
          {
            title: "",
            subtitle: "",
            buttonText: "",
            image: "/ssbg.png",
          }
        ]}
        onScrollToNext={scrollToContent}
        singleImage={true}
        showDots={false}
        customHeight="80vh"
      />

      <main id="main-content" className="py-12 px-6 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">İletişim</h1>
            <p className="text-lg text-gray-700">
              Sorularınız için bizimle iletişime geçin. Size hızlıca dönüş yapacağız.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-medium mb-6 text-gray-700">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      İsim *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Adınız ve soyadınız"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white placeholder:text-gray-500 text-gray-800"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white placeholder:text-gray-500 text-gray-800"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Mesajınızın konusu"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white placeholder:text-gray-500 text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Mesajınızı detaylı bir şekilde yazın..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white placeholder:text-gray-500 text-gray-800 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 font-medium transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Mesaj Gönder
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-medium mb-6 text-gray-700">İletişim Bilgileri</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Adres</h3>
                    <a 
                      href="https://share.google/cDKuEwHtK70zb8SgS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 transition-colors leading-relaxed"
                    >
                      Çorlu 1 OSB
                      <br />
                      Bülent Ecevit Caddesi No:13/1
                      <br />
                      PK: 59860 – Tekirdağ, Türkiye
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Telefon</h3>
                    <a href="tel:+902826854383" className="text-gray-600 hover:text-gray-800 transition-colors">
                      +90 282 685 43 83
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">E-posta</h3>
                    <a href="mailto:info@skycrops.farm" className="text-gray-600 hover:text-gray-800 transition-colors">
                      info@skycrops.farm
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Çalışma Saatleri</h3>
                    <p className="text-gray-600">
                      Pazartesi - Cuma: 9:00 AM - 6:00 PM
                      <br />
                      Cumartesi: 9:00 AM - 4:00 PM
                      <br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
