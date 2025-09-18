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

  const facilityFeatures = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "1. Sürdürülebilir ve İlaçsız Üretim Yöntemleri",
      description: "Geleceğin tarımını inşa ederken, doğaya ve insan sağlığına verdiğimiz değeri üretimimizin her aşamasında gösteriyoruz.",
      content: [
        {
          subtitle: "Pestisitsiz Üretim",
          text: "Ürünlerimizin hiçbir aşamasında pestisit kullanılmamaktadır. Üretim alanımıza bir ameliyathane titizliğiyle yaklaşarak zararlı böcek ve hastalıkların tesise girişini tamamen engelliyoruz."
        },
        {
          subtitle: "İyi Tarım Uygulamaları",
          text: "Türkiye'nin ilk İyi Tarım Uygulamaları (İTU) belgesi alan dikey tarım tesisi olmanın gururunu yaşıyoruz. Bu belge, üretim süreçlerimizin ulusal standartlara uygunluğunu ve gıda güvenliğini garanti eder."
        },
        {
          subtitle: "Özel Besin Çözeltisi",
          text: "Bitkilerin büyümesi için gerekli olan tüm makro ve mikro elementleri bir araya getirerek her ürün grubuna özel besin çözeltileri hazırlıyoruz. Besinlerimizi kendimiz formüle etmemiz bitkilerin doğal gelişimini desteklerken ürünlerimizde hiçbir kimyasal kullanılmamasını sağlıyor."
        }
      ]
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "2. Akıllı ve Yüksek Teknolojili Üretim",
      description: "Dikey tarım tesisimiz, dünyanın en gelişmiş iklim kontrollü üretim alanları arasında yer almaktadır. Çok katlı hidroponik sistemler ile kaynakları verimli kullanıyor ve maksimum verim elde ediyoruz.",
      content: [
        {
          subtitle: "Gelişmiş Teknoloji",
          text: "Fide dolaplarımız sayesinde üretim süreçlerimizi tohumdan hasada kadar tesisimizde yönetiyoruz. Bu durum her bitkinin en hassas gelişim aşamalarında bile optimum koşullara sahip olmasını sağlıyor."
        },
        {
          subtitle: "Akıllı Sistemler",
          text: "Büyüme sürecini optimize eden özel LED aydınlatmalar, ideal ortamı sağlayan akıllı iklimlendirme ve iklim kontrol sistemleri, besin çözeltilerini ve pH dengesini otomatik yöneten gelişmiş besleme teknolojileri tesisimizin temel bileşenlerindendir."
        },
        {
          subtitle: "Bulut Tabanlı Yönetim",
          text: "Bulut tabanlı yazılımımız sayesinde tesis uzaktan izlenip yönetilebilmektedir. Akıllı sensörler nem, sıcaklık, CO₂ ve besin değerlerini sürekli takip eder; bu veriler doğrultusunda alınan kararlarla süreçler optimize edilir."
        }
      ],
      conclusion: "Tüm bu teknolojiler sayesinde bitkilerimizin her gelişim evresinde en sevdikleri koşulları oluşturarak, en yüksek tazelik ve besin değerine ulaşmalarını sağlıyoruz."
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      title: "3. Üretim ve Lojistik Alanımız",
      description: "Şehir merkezine yakın konumumuz, ürünlerin tazeliğini koruyarak sofralarınıza en hızlı şekilde ulaşmasını sağlar.",
      content: [
        {
          subtitle: "Üretim Alanı",
          text: "650 m² net üretim alanında, 84 adet 8 katlı dikey tarım ünitesi ile yıl boyunca kesintisiz üretim ve hasat yapıyoruz."
        },
        {
          subtitle: "Hijyenik Paketleme ve Sevkiyat",
          text: "Üretim alanıyla entegre paketleme bölümümüz ürünlerin taze ve hızlı bir şekilde sevkiyatını mümkün kılar."
        }
      ]
    },
    {
      icon: <Droplets className="w-8 h-8 text-green-600" />,
      title: "4. Çevre Dostu ve Sürdürülebilir Yaklaşım",
      description: "Sürdürülebilirlik ilkemiz tesisimizin her detayında kendini gösterir.",
      content: [
        {
          subtitle: "Su Tasarrufu",
          text: "Geleneksel tarıma göre %90 daha az su tüketerek su kaynaklarının korunmasına büyük katkı sağlıyoruz."
        },
        {
          subtitle: "Atık Yönetimi",
          text: "Üretim sürecinde çıkan tüm bitkisel atıkları çevremizdeki hayvan çiftlikleriyle paylaşarak döngüsel ekonomiye katkıda bulunuyoruz."
        }
      ]
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
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">Tesisimiz</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              Teknolojik, Sürdürülebilir ve Güvenli Üretim
            </p>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Tarımın köklü yöntemlerini geleceğin teknolojileriyle harmanlayarak sürdürülebilir gıda üretiminde yeni bir model oluşturuyoruz. Tohumdan sofraya tüm üretim süreçlerini kendi bünyesinde yöneten tam entegre dikey tarım tesisimiz, kaynakları en verimli şekilde kullanırken yüksek kalite ve gıda güvenliği standartlarını bir araya getiriyor.
            </p>
          </div>

          {/* Facility Features */}
          <div className="space-y-8 mb-12">
            {facilityFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                <div className="ml-12 space-y-6">
                  {feature.content.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-gray-200 pl-4">
                      <h4 className="font-semibold text-gray-700 mb-2">{item.subtitle}:</h4>
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                  {feature.conclusion && (
                    <div className="mt-6">
                      <p className="text-gray-600 leading-relaxed">{feature.conclusion}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

    </div>
  )
}
