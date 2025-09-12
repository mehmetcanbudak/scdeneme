"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Leaf, Truck, Shield, Award, Check, Star } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import HeroHeader from "@/components/hero-header"
import { useSubscriptions } from "@/contexts/subscription-context"
import { apiClient } from "@/lib/api-client"
import { 
  PageHeader,
  Section,
  ContentCard,
  Grid,
  SectionHeader
} from "@/components/ui/page-layout"
import {
  SubscriptionPackage,
  BenefitCard,
  TestimonialCard,
  FAQSection,
  CTASection
} from "@/components/ui/subscription-components"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dynamic-spirit-b1c4404b11.strapiapp.com'

export default function Abonelik() {
  const router = useRouter()

  // Enable transparent navigation for hero section
  useNavigationTransparency(true)

  // Get subscription plans from backend
  const { plans, isLoading: plansLoading } = useSubscriptions()

  // State for images
  const [sebzePaketiImage, setSebzePaketiImage] = useState<string>("/skycrops-package-product.png")
  const [tazeYesilliklerImage, setTazeYesilliklerImage] = useState<string>("/skycrops-package-product.png")
  const [isImageLoading, setIsImageLoading] = useState(false)

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

  // Fetch product images from API
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        setIsImageLoading(true)

        // Fetch products with populate to get images
        const response = await apiClient.getProducts({
          populate: '*',
        })

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const products = response.data as any[]

          // Find Taze Yeşillikler Paketi for the subscription section
          const tazeYesilliklerPaketi = products.find(p => p.name === 'Taze Yeşillikler Paketi')
          if (tazeYesilliklerPaketi) {
            let imageUrl = null

            // Check if product has images array
            if (tazeYesilliklerPaketi.images && Array.isArray(tazeYesilliklerPaketi.images) && tazeYesilliklerPaketi.images.length > 0) {
              imageUrl = tazeYesilliklerPaketi.images[0].url
            } else if (tazeYesilliklerPaketi.image && tazeYesilliklerPaketi.image.url) {
              // Fallback to single image field
              imageUrl = tazeYesilliklerPaketi.image.url
            }

            if (imageUrl) {
              const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`
              setTazeYesilliklerImage(fullImageUrl)
            }
          }

          // Find Sebze Paketleri for the main subscription package
          const sebzePaketi = products.find(p => p.name === 'Sebze Paketleri' || p.name === 'Taze Yeşillikler Paketi')
          if (sebzePaketi) {
            let imageUrl = null

            // Check if product has images array
            if (sebzePaketi.images && Array.isArray(sebzePaketi.images) && sebzePaketi.images.length > 0) {
              imageUrl = sebzePaketi.images[0].url
            } else if (sebzePaketi.image && sebzePaketi.image.url) {
              // Fallback to single image field
              imageUrl = sebzePaketi.image.url
            }

            if (imageUrl) {
              const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`
              setSebzePaketiImage(fullImageUrl)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product images:', error)
        // Keep the default images on error
      } finally {
        setIsImageLoading(false)
      }
    }

    fetchProductImages()
  }, [])

  // Subscription packages from Skycrops content
  const subscriptionPackages = [
    {
      id: 1,
      name: "Çok küçük bir paket için büyük bir adım!",
      description: "Skycrops'tan taze, dikey tarım ürünleri ile sağlıklı yaşam",
      image: "/bundle4.png", // Use custom bundle image for this section
      originalPrice: "450.00",
      discountedPrice: "299.00",
      badge: "MİKRO PAKET",
      features: [
        "Haftada bir teslim",
        "Taze, doğal ve organik ürünler",
        "Plastik ambalaj kullanmıyoruz",
        "Dikey tarım teknolojisi",
        "Şehir içi üretim tesisi",
        "Yıl boyu taze ürün çeşitliliği"
      ],
      weeklyItems: [
        "500 gr Kıvırcık (dikey tarım)",
        "300 gr Fesleğen",
        "300 gr Maydanoz",
        "500 gr Lollo Rosso",
        "300 gr Reyhan",
        "400 gr Roka"
      ]
    }
  ]

  const benefits = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Doğal ve Organik",
      description: "Kapalı ortamda, hiçbir kimyasal ve pestisit kullanmadan yetiştirilen taze ürünler"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Çevre Dostu",
      description: "Dikey tarım ile %97 daha az su kullanımı ve güneş enerjisi"
    },
    {
      icon: <Truck className="w-8 h-8 text-yellow-600" />,
      title: "Hızlı Teslimat",
      description: "Şehir içi üretim sayesinde hasattan kısa sürede sofraya ulaşım"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Teknoloji Odaklı",
      description: "Gelişmiş dikey tarım teknolojisi ile optimum koşullarda üretim"
    }
  ]

  const testimonials = [
    {
      name: "Merve K.",
      comment: "Skycrops aboneliği ile evimize gelen taze kıvırcık ve roka harika! Çocuklarım dikey tarım ürünlerini çok seviyor.",
      rating: 5,
      image: "/testimonial-1.jpg"
    },
    {
      name: "Ahmet B.",
      comment: "Dikey tarım teknolojisine destek olmak ve aynı zamanda taze yeşillikler almak mükemmel. Hizmet kalitesi çok iyi!",
      rating: 5,
      image: "/testimonial-2.jpg"
    },
    {
      name: "Selin Y.",
      comment: "Kapalı ortam üretim sistemi ve çevre dostu yaklaşımı için tercih ettim. Ürünler gerçekten taze ve pestisit içermiyor.",
      rating: 5,
      image: "/testimonial-3.jpg"
    },
    {
      name: "Kemal D.",
      comment: "Geleceğin tarım teknolojisini desteklemek ve doğal ürünler tüketmek için harika bir fırsat. Kesinlikle tavsiye ederim.",
      rating: 5,
      image: "/testimonial-4.jpg"
    }
  ]

  const faqItems = [
    {
      id: "faq-1",
      question: "Aboneliğimi nasıl iptal edebilirim?",
      answer: "Aboneliğinizi dilediğiniz zaman müşteri hizmetlerimizden iptal edebilirsiniz. İptal işlemi bir sonraki teslimat döneminden itibaren geçerli olur."
    },
    {
      id: "faq-2",
      question: "Teslimat nasıl yapılıyor?",
      answer: "Teslimatlarımız haftada bir, size en uygun gün ve saatte yapılmaktadır. Taze ve organik ürünleriniz özenle paketlenerek kapınıza kadar getirilir."
    },
    {
      id: "faq-3",
      question: "Hangi bölgelere teslimat yapıyorsunuz?",
      answer: "Şu anda İstanbul'un tüm ilçelerine teslimat yapıyoruz. Diğer şehirlere de yakında hizmet vermeyi planlıyoruz."
    },
    {
      id: "faq-4",
      question: "Ürünler gerçekten organik mi?",
      answer: "Evet, tüm ürünlerimiz kapalı ortam dikey tarım sistemi ile hiçbir kimyasal gübre veya pestisit kullanılmadan yetiştirilmiştir. Üretim sertifikalarımızı web sitemizden inceleyebilirsiniz."
    },
    {
      id: "faq-5",
      question: "Paket içeriği değişebilir mi?",
      answer: "Evet, paket içeriği mevsime göre değişiklik gösterebilir. Her zaman mevsiminin en taze ve kaliteli ürünlerini size sunmaya çalışıyoruz."
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
            buttonAction: () => router.push("/abonelik/taze-yesillikler-paketi"),
            image: "/derleme.png",
          }
        ]}
        onScrollToNext={scrollToContent}
        singleImage={true}
        showDots={false}
        customHeight="80vh"
      />

      {/* Main content */}
      <main id="main-content" className="relative z-10 bg-white">
        
        {/* Hero Text Section */}
        <Section className="py-20 bg-gray-50">
          <div className="text-center">
            <ContentCard className="max-w-4xl mx-auto text-center p-12">
              <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
                Çok küçük bir paket için büyük bir adım!
              </h1>
              <p className="text-lg text-gray-700">
                Dikey tarım ürünleri ile sağlıklı yaşamın keyfini çıkarın. Geleceğin tarım teknolojisini destekleyin, çevreyi koruyun.
              </p>
              <Button
                onClick={() => router.push("/abonelik/taze-yesillikler-paketi")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 text-lg rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Hemen Abone Ol
              </Button>
            </ContentCard>
          </div>
        </Section>

        {/* Subscription Package */}
        <Section>
          <SectionHeader 
            title="Abonelik Paketimiz"
            subtitle="Dikey tarım ürünleri ile sağlıklı yaşam"
          />
          <div className="max-w-3xl mx-auto">
            {subscriptionPackages.map((pkg) => (
              <SubscriptionPackage
                key={pkg.id}
                {...pkg}
                onButtonClick={() => router.push("/abonelik/taze-yesillikler-paketi")}
              />
            ))}
          </div>
        </Section>

        {/* Benefits Section */}
        <Section className="bg-gray-50">
          <SectionHeader 
            title="Neden Skycrops?"
            subtitle="Dikey tarımın avantajlarını yaşayın"
          />
          <Grid cols={4}>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </Grid>
        </Section>

        {/* FAQ Section */}
        <Section>
          <FAQSection
            title="Sıkça Sorulan Sorular"
            subtitle="Merak ettiklerinizin cevapları"
            items={faqItems}
          />
        </Section>

        {/* Testimonials Section */}
        <Section className="bg-gray-50">
          <SectionHeader 
            title="Müşteri Yorumları"
            subtitle="Mutlu müşterilerimizin deneyimleri"
          />
          <Grid cols={4}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                comment={testimonial.comment}
                rating={testimonial.rating}
              />
            ))}
          </Grid>
        </Section>

        {/* CTA Section */}
        <CTASection
          title="Sürdürülebilir Tarıma Hemen Katılın!"
          subtitle="Skycrops abonelik sistemiyle dikey tarım ürünleri ile sağlıklı yaşamın keyfini çıkarın. Çevre dostu üretim ile taze ürünler her hafta kapınızda!"
          buttonText="Şimdi Abone Ol"
          onButtonClick={() => router.push("/abonelik/taze-yesillikler-paketi")}
        />
      </main>
    </div>
  )
}