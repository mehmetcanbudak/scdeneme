"use client"
import { memo, useCallback } from "react"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import HeroHeader from "@/components/hero-header"

const Hakkimizda = memo(function Hakkimizda() {
  // Enable transparent navigation for hero section
  useNavigationTransparency(true)

  const slides = [
    {
      title: "HAKKIMIZDA",
      subtitle: "DOĞAL VE SAĞLIKLI",
      buttonText: "",
      image: "/agricultural-figures-with-plants-and-sun.png",
    },
  ]

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

  const values = [
    {
      icon: "🌱",
      title: "Organik Üretim",
      description: "Sadece organik ve doğal yöntemler kullanıyoruz"
    },
    {
      icon: "🥬",
      title: "Tazelik",
      description: "Her üründe en yüksek tazelik standartlarını koruyoruz"
    },
    {
      icon: "🌍",
      title: "Sürdürülebilirlik",
      description: "Çevre dostu üretim ve adil ticaret ilkelerine bağlıyız"
    }
  ]

  return (
    <div className="min-h-screen bg-white relative">
      <HeroHeader
        slides={[
          {
            title: "",
            subtitle: "",
            buttonText: "",
            image: "/pattern.png",
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
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
              Hakkımızda
            </h1>
            <p className="text-lg text-gray-600">
              Taze sebze deneyiminin hikayesi
            </p>
          </div>

          {/* Content */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            {/* Hikayemiz Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl font-medium mb-6 text-gray-700">Yaşayan Sebzeler</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                Skycrops, sağlıklı yaşamın ve taze lezzetlerin kapılarını aralayan bir dikey tarım tesisi. Doğallıktan uzaklaşmadan, kapalı ortamda, dış dünyanın negatif etkilerinden uzakta üretilen besleyici yeşilliklerimiz, sofralarınıza lezzet ve tazelik getiriyor. 
                </p>
                <p className="text-gray-600 leading-relaxed">
                Skycrops, geleceğin tarım yöntemlerini bugün uygulayarak, sizleri sağlıklı bir yaşam için doğal ve taze alternatiflerle buluşturmayı hedefliyor. Sağlıklı yaşamın anahtarı, Skycrops'un yeşilliklerinde gizli.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
                  alt="Modern sera tarımı"
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Misyonumuz Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative order-2 md:order-1">
                <img
                  src="/organic-farming-greenhouse-vegetables.png"
                  alt="Organik tarım"
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-medium mb-6 text-gray-700">Taze, Sağlıklı</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                Sehir içi sağlıklı tarım konseptiyle üretim modelinde ürünler uzun nakliye süreçlerine, soğuk hava depolarına girmek yerine hasat edildikten kısa süre sonra sofralara ulaşır. Kökleriyle birlikte hasat edilen ve satışa sürülen yeşillikler, evinize geldiğinde canlıdır, uygun koşullar sağlandığında büyümeye devam ederler. Temiz bir ortamda suda büyüyen ürünler toz, toprak ve zararlılara maruz kalmaz. Temizlenmesi zahmetsizdir. 
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl font-medium mb-6 text-gray-700">Güvenli</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                Skycrops'ta ürünleri, dış dünyanın negatif etkilerine kapalı üretim ortamında, optimum koşullarda gerçekleştirdiğimiz için hiç bir tarımsal ilaç ve hormon kullanmıyoruz. Özenle seçtiğimiz tohumlardan filizlendirdiğimiz bitkiler büyümeleri için gerekli besinler dışında hiçbir yabancı maddeye maruz kalmadan sağlıkla büyüyor. Bu yüzden Skycrops'ta yetişen ürünler tamamıyla güvenli!                </p>
              </div>
              <div className="relative">
                <img
                  src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
                  alt="Modern sera tarımı"
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Misyonumuz Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative order-2 md:order-1">
                <img
                  src="/organic-farming-greenhouse-vegetables.png"
                  alt="Organik tarım"
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-medium mb-6 text-gray-700">Lezzetli</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                Skycrops'ta bitkiler biyolojilerine en uygun koşullarda yetişir. İhtiyaçları olan besinleri, doğru ısı, nem ve ışık yoğunluğunda alırlar. Skycrops olarak birinci önceliğimiz "mutlu bitkiler" yetiştirmek. Yetiştirdiğimiz ve tohum aşamasında seçtiğimiz  ürünler, seçkin restoran ve şefler tarafından tercih edilen, dünya genelinde en çok beğenilen ve keyifle tüketilen türlerdir.                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl font-medium mb-6 text-gray-700">Çevre Dostu</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                Skycrops'ta en büyük önceliğimiz doğaya saygı ve sürdürülebilirlik. Geleneksel tarım yöntemlerine göre %97'ye varan oranlarda daha az su tüketiyoruz. Skycrops, enerjisinin önemli bir bölümünü tesisimizdeki güneş panellerinden alıyor. Farmicca'nın gelişmiş enerji yönetim teknolojileri sayesinde verimliğimiz dünya standartlarının üzerinde. Gübre ve pestisitlerle toprağı kirletmiyoruz.</p>
              </div>
              <div className="relative">
                <img
                  src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
                  alt="Modern sera tarımı"
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Değerlerimiz Section */}
            <div className="text-center">
              <h2 className="text-2xl font-medium mb-8 text-gray-700">Değerlerimiz</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl" role="img" aria-label={value.title}>
                        {value.icon}
                      </span>
                    </div>
                    <h3 className="font-medium mb-3 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
})

export default Hakkimizda
