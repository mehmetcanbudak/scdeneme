"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingBag, User, Search, ChevronDown, MapPin, Clock, Phone, Leaf, Shield, Droplets, Zap, Sprout, CheckCircle } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import HeroHeader from "@/components/hero-header"

export default function Tesisler() {
  // Enable transparent navigation for hero section
  useNavigationTransparency(true)



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

  const sustainablePractices = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Biyolojik Mücadele",
      description: "Zararlı böcekleri doğal yollarla kontrol altına alarak, pestisit kullanımını tamamen ortadan kaldırıyoruz.",
      features: ["Faydalı böcekler", "Doğal düşmanlar", "Biyolojik preparatlar"]
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      title: "İyi Tarım Uygulamaları",
      description: "Uluslararası standartlarda üretim yaparak, güvenli ve kaliteli gıda üretimi sağlıyoruz.",
      features: ["GAP sertifikası", "Kalite kontrol", "Sürdürülebilir yöntemler"]
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      title: "Pestisitsiz Üretim",
      description: "Hiçbir kimyasal pestisit kullanmadan, tamamen doğal yöntemlerle üretim yapıyoruz.",
      features: ["Organik sertifika", "Doğal koruma", "Güvenli ürünler"]
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Modern Teknoloji",
      description: "Hidroponik sistemler ve akıllı sera teknolojileri ile verimli üretim gerçekleştiriyoruz.",
      features: ["Hidroponik sistem", "Akıllı sera", "Otomatik sulama"]
    }
  ]

  const productionFeatures = [
    {
      title: "Organik Sertifikalar",
      description: "Tüm üretim süreçlerimiz uluslararası organik tarım standartlarına uygun olarak sertifikalandırılmıştır.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    },
    {
      title: "Laboratuvar Testleri",
      description: "Her hasat öncesi ve sonrası detaylı laboratuvar analizleri ile ürün kalitesi garanti altına alınmaktadır.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    },
    {
      title: "Çevre Dostu Ambalaj",
      description: "Sürdürülebilir ve geri dönüştürülebilir ambalajlama çözümleri kullanılmaktadır.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    },
    {
      title: "Sıfır Atık Politikası",
      description: "Üretim süreçlerinde oluşan atıklar kompost yapılarak tekrar tarımda kullanılmaktadır.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation is now handled by the shared Navigation component */}

      <HeroHeader
        slides={[
          {
            title: "",
            subtitle: "",
            buttonText: "",
            video: "/skycrops.mp4",
          }
        ]}
        onScrollToNext={scrollToContent}
        singleImage={true}
        showDots={false}
        showButton={false}
        customHeight="80vh"
      />

      <main id="main-content" className="py-12 px-6 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">Sürdürülebilir Tarım Tesislerimiz</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Biyolojik mücadele, iyi tarım uygulamaları ve pestisitsiz üretim ile doğaya ve insan sağlığına saygılı tarım yapıyoruz.
            </p>
          </div>

          {/* Sustainable Practices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {sustainablePractices.map((practice, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {practice.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">{practice.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{practice.description}</p>
                    <ul className="space-y-2">
                      {practice.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Production Facility */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Üretim Tesisimiz</h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Modern sera teknolojisi ile geleneksel tarım yöntemlerini birleştiren üretim tesisimizde, 
                her ürün en yüksek kalite standartlarında yetiştirilmektedir. Biyolojik mücadele yöntemleri 
                ve pestisitsiz üretim teknikleri kullanarak, doğaya ve insan sağlığına zarar vermeden üretim yapıyoruz.
              </p>
            </div>

            {/* Facility Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Üretim Alanı</h3>
                <p className="text-gray-600 leading-relaxed">
                  650 metrekare net üretim alanımızda 84 adet 8 katlı dikey tarım ünitesiyle yıl boyunca üretim ve hasat yapıyoruz. 
                  Bu sayede yıl boyunca taze ürünleri tüketiciyle buluşturuyoruz.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Teknoloji</h3>
                <p className="text-gray-600 leading-relaxed">
                  Üstün Farmicca büyütme ledleri, iklim kontrol, gübre dozajlama ve enerji yönetim teknolojisi sayesinde 
                  bitkilerimiz doğal ortamlarında olduğu kadar mutlu ve sağlıklı büyüyor.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Paketleme ve Sevkiyat</h3>
                <p className="text-gray-600 leading-relaxed">
                  Üretim alanıyla bütünleşik, hijyenik paketleme ve sevkiyat alanı sebzelerin üretim tesisinden çıktıktan sonra 
                  mümkün olan en hızlı sürede tüketiciyle buluşmasını sağlıyor. Şehir içinde yerleşik üretim tesisimizden toplanan 
                  ürünler zaman kaybetmeden tazeliklerini koruyarak sofralara ulaşıyor.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Yeşil Enerji</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kurulu 1 mW güneş panelleri ve yağmur hasadı, kullandığımız enerji yönetim teknolojileri sayesinde doğaya saygı 
                  en önemli prensibimiz. Skycrops'ta yetiştirilen sebzeler geleneksel tarım yöntemlerine göre %94 daha az su 
                  tüketerek su kaynaklarının verimli kullanıyoruz.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <img
                  src="/organic-farming-greenhouse-vegetables.png"
                  alt="Üretim tesisi"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-6 text-gray-700">Kalite ve Güvenlik Standartları</h3>
                <div className="space-y-4">
                  {productionFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technology Showcase */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-4 text-gray-700 text-center">Kullandığımız Teknolojiler</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="text-sm font-medium text-gray-700">Hidroponik Sistem</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">💧</div>
                  <div className="text-sm font-medium text-gray-700">Akıllı Sulama</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🌡️</div>
                  <div className="text-sm font-medium text-gray-700">İklim Kontrolü</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-700">IoT Sensörler</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
