"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingBag, User, Search, ChevronDown, Heart, Leaf, Shield, Zap, Apple, Droplets, Sun, Users, Award, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import HeroHeader from "@/components/hero-header"

export default function Saglik() {
  // Enable transparent navigation for hero section
  useNavigationTransparency(true)

  const scrollToContent = () => {
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
  }

  const heroSlides = [
    {
      title: "",
      subtitle: "",
      buttonText: "",
      image: "/fresh-mixed-vegetables-display.png",
    }
  ]

  const healthBenefits = [
    {
      title: "Vitamin ve Mineral Deposu",
      description: "Organik ürünlerimiz, doğal yollarla yetiştirildiği için vitamin ve mineral açısından zengindir. Özellikle C vitamini, potasyum ve antioksidanlar bakımından yüksek değerlere sahiptir.",
      icon: Apple,
      color: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Antioksidan Zengini",
      description: "Pestisit kullanılmadan yetiştirilen meyvelerimiz, doğal antioksidanlar açısından zengindir. Bu antioksidanlar vücudunuzu serbest radikallerden korur ve yaşlanma sürecini yavaşlatır.",
      icon: Shield,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Doğal Enerji Kaynağı",
      description: "Organik meyveler, doğal şekerler ve kompleks karbonhidratlar içerir. Bu sayede uzun süreli enerji sağlar ve kan şekerinizi dengede tutar.",
      icon: Zap,
      color: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Bağışıklık Sistemi Güçlendirici",
      description: "C vitamini ve diğer besin maddeleri açısından zengin olan ürünlerimiz, bağışıklık sisteminizi güçlendirir ve hastalıklara karşı koruma sağlar.",
      icon: Heart,
      color: "bg-pink-100",
      iconColor: "text-pink-600"
    }
  ]

  const nutritionFacts = [
    {
      product: "Portakal",
      vitaminC: "53.2 mg",
      fiber: "2.4 g",
      potassium: "181 mg",
      calories: "47 kcal"
    },
    {
      product: "Mandalina",
      vitaminC: "26.7 mg",
      fiber: "1.8 g",
      potassium: "166 mg",
      calories: "53 kcal"
    },
    {
      product: "Limon",
      vitaminC: "29.1 mg",
      fiber: "2.8 g",
      potassium: "138 mg",
      calories: "29 kcal"
    },
    {
      product: "Avokado",
      vitaminC: "10.0 mg",
      fiber: "6.7 g",
      potassium: "485 mg",
      calories: "160 kcal"
    }
  ]

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation is now handled by the shared Navigation component */}

      <HeroHeader
        slides={heroSlides}
        onScrollToNext={scrollToContent}
        singleImage={true}
        showDots={false}
        customHeight="80vh"
      />

      <main id="main-content" className="py-12 px-6 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-gray-800">Sağlık</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Organik tarımın sağlığınıza faydaları ve beslenme değerleri hakkında detaylı bilgi edinin
            </p>
          </div>

          {/* Health Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center text-gray-800">Organik Ürünlerin Sağlık Faydaları</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {healthBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${benefit.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Nutrition Facts Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center text-gray-800">Beslenme Değerleri</h2>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nutritionFacts.map((fact, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">{fact.product}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">C Vitamini:</span>
                        <span className="font-medium">{fact.vitaminC}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lif:</span>
                        <span className="font-medium">{fact.fiber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Potasyum:</span>
                        <span className="font-medium">{fact.potassium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kalori:</span>
                        <span className="font-medium">{fact.calories}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Organic Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center text-gray-800">Neden Organik Ürün Seçmelisiniz?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Doğal Yetiştirme</h3>
                <p className="text-gray-600 text-sm">Kimyasal gübre ve pestisit kullanılmadan, doğal yöntemlerle yetiştirilir</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Çiftçi Sağlığı</h3>
                <p className="text-gray-600 text-sm">Zararlı kimyasallara maruz kalmayan çiftçiler tarafından üretilir</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Kalite Garantisi</h3>
                <p className="text-gray-600 text-sm">Sertifikalı organik üretim standartlarına uygun kalite</p>
              </div>
            </div>
          </div>

          {/* Daily Health Tips */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center text-gray-800">Günlük Sağlık İpuçları</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Güne Başlarken</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      Sabah aç karnına bir bardak ılık su için
                    </li>
                    <li className="flex items-center">
                      <Apple className="w-4 h-4 mr-2 text-green-600" />
                      Kahvaltıda taze meyve tüketin
                    </li>
                    <li className="flex items-center">
                      <Leaf className="w-4 h-4 mr-2 text-green-600" />
                      Yeşil yapraklı sebzeleri günlük menünüze ekleyin
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Gün Boyunca</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Droplets className="w-4 h-4 mr-2 text-blue-600" />
                      Günde en az 8 bardak su için
                    </li>
                    <li className="flex items-center">
                      <Sun className="w-4 h-4 mr-2 text-yellow-600" />
                      Güneş ışığından yararlanın
                    </li>
                    <li className="flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-600" />
                      Düzenli egzersiz yapın
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-light mb-6">Sağlıklı Yaşam İçin Hemen Başlayın</h2>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              Organik ürünlerimizle sağlıklı beslenme alışkanlığı kazanın. 
              Dalından taze, pestisitsiz ve doğal ürünlerimizi deneyin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/abonelik">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-600">
                  <Apple className="w-4 h-4 mr-2" />
                  Ürünleri İncele
                </Button>
              </Link>
              <Link href="/abonelik">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Abone Ol
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}


