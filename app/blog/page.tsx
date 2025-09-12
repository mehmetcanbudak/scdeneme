"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, User, Search, Calendar, ArrowRight, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency"
import HeroHeader from "@/components/hero-header"

export default function Blog() {
  // Enable transparent navigation for hero section
  useNavigationTransparency(true)
  
  const [showBlogLeftButton, setShowBlogLeftButton] = useState(false)
  const [showBlogRightButton, setShowBlogRightButton] = useState(true)
  const [showPressLeftButton, setShowPressLeftButton] = useState(false)
  const [showPressRightButton, setShowPressRightButton] = useState(true)
  
  const blogScrollRef = useRef<HTMLDivElement>(null)
  const pressScrollRef = useRef<HTMLDivElement>(null)



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

  // Blog scroll functions
  const scrollBlogLeft = () => {
    const blogContainer = blogScrollRef.current
    if (blogContainer) {
      blogContainer.scrollBy({
        left: -320,
        behavior: "smooth",
      })
    }
  }

  const scrollBlogRight = () => {
    const blogContainer = blogScrollRef.current
    if (blogContainer) {
      blogContainer.scrollBy({
        left: 320,
        behavior: "smooth",
      })
    }
  }

  const handleBlogScroll = () => {
    const blogContainer = blogScrollRef.current
    if (blogContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = blogContainer
      setShowBlogLeftButton(scrollLeft > 0)
      setShowBlogRightButton(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Press scroll functions
  const scrollPressLeft = () => {
    const pressContainer = pressScrollRef.current
    if (pressContainer) {
      pressContainer.scrollBy({
        left: -320,
        behavior: "smooth",
      })
    }
  }

  const scrollPressRight = () => {
    const pressContainer = pressScrollRef.current
    if (pressContainer) {
      pressContainer.scrollBy({
        left: 320,
        behavior: "smooth",
      })
    }
  }

  const handlePressScroll = () => {
    const pressContainer = pressScrollRef.current
    if (pressContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = pressContainer
      setShowPressLeftButton(scrollLeft > 0)
      setShowPressRightButton(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const blogPosts = [
    {
      title: "Organik Tarımın Geleceği: Sürdürülebilir Sebze Üretimi",
      excerpt:
        "Modern sera teknolojileri ile organik tarımın nasıl birleştiğini ve gelecekte nasıl şekilleneceğini keşfedin.",
      date: "15 Mart 2024",
      image: "/organic-farming-greenhouse-vegetables.png",
      readTime: "5 dk okuma",
      slug: "organik-tarimin-gelecegi",
    },
    {
      title: "Taze Sebzelerin Sağlığa Faydaları",
      excerpt: "Günlük diyetinizde taze sebzelerin önemini ve hangi vitaminleri içerdiğini öğrenin.",
      date: "12 Mart 2024",
      image: "/fresh-vegetables-and-greens-in-modern-greenhouse.png",
      readTime: "4 dk okuma",
      slug: "taze-sebzelerin-sagliga-faydalari",
    },
    {
      title: "Yeşil Yaprakların Gücü: Vitamin ve Mineral Deposu",
      excerpt: "Roka, marul, ıspanak gibi yeşil yaprakların besleyici değerleri ve faydaları hakkında bilgi edinin.",
      date: "10 Mart 2024",
      image: "/fresh-leafy-greens-and-herbs-in-baskets.png",
      readTime: "6 dk okuma",
      slug: "yesil-yapraklarin-gucu",
    },
    {
      title: "Aromatik Bitkilerin Kullanım Alanları",
      excerpt: "Fesleğen, maydanoz ve diğer aromatik bitkilerin mutfakta ve günlük yaşamda kullanımı.",
      date: "8 Mart 2024",
      image: "/fresh-herbs-and-aromatic-plants.png",
      readTime: "3 dk okuma",
      slug: "aromatik-bitkilerin-kullanim-alanlari",
    },
    {
      title: "Sera Tarımında Teknoloji ve İnovasyon",
      excerpt: "Modern sera sistemlerinin nasıl çalıştığını ve teknolojinin tarıma katkılarını inceleyin.",
      date: "5 Mart 2024",
      image: "/daily-harvest-fresh-vegetables.png",
      readTime: "7 dk okuma",
      slug: "sera-tariminda-teknoloji",
    },
    {
      title: "Mevsimlik Sebze Rehberi: Ne Zaman Ne Yenir?",
      excerpt: "Hangi sebzelerin hangi mevsimde en taze ve lezzetli olduğunu öğrenin.",
      date: "2 Mart 2024",
      image: "/fresh-mixed-vegetables-display.png",
      readTime: "5 dk okuma",
      slug: "mevsimlik-sebze-rehberi",
    },
  ]

  const pressArticles = [
    {
      title: "İl Tarım Müdürlüğü Kadınlar Günü Kutlaması",
      excerpt:
        "Tekirdağ Valiliği İl Tarım ve Orman Müdürlüğü'ne katılımımız verilecek destek ve 8 Mart Dünya Kadınlar Günü'nü kutlanan için teşekkür ederiz.",
      date: "8 Mart 2024",
      image: "/press-womens-day.png",
      readTime: "3 dk okuma",
      slug: "il-tarim-mudurlugu-kadinlar-gunu",
    },
    {
      title: "Wageningen Üniversitesi Dikey Tarım Programı",
      excerpt: "Wageningen Üniversitesi ve Araştırma Merkezi Dikey Tarım Programına Katıldık.",
      date: "5 Mart 2024",
      image: "/press-university-program.png",
      readTime: "4 dk okuma",
      slug: "wageningen-universitesi-dikey-tarim",
    },
    {
      title: "Anadolu Ajansı Skycrops'ta",
      excerpt: "Anadolu Ajansı Skycrops'ta.",
      date: "2 Mart 2024",
      image: "/press-anadolu-agency.png",
      readTime: "2 dk okuma",
      slug: "anadolu-ajansi-skycrops",
    },
  ]

  return (
    <div className="min-h-screen bg-white relative">
      {/* Fixed header with transparent/scrolled states */}
      {/* This header block is removed as per the new_code */}

      <HeroHeader
        slides={[
          {
            title: "",
            subtitle: "",
            buttonText: "",
            image: "/thelettuceguy.png",
          }
        ]}
        onScrollToNext={scrollToContent}
        singleImage={true}
        showDots={false}
        customHeight="80vh"
      />

      {/* Main content with id and bg-white */}
      <main id="main-content" className="py-12 px-6 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">Blog</h1>
            <p className="text-lg text-gray-600">Ekibimizce yazılan blog yazılarımız.</p>
          </div>

          {/* Featured Post */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-6">Son Makale</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {blogPosts[0].date}
                  </div>
                  <span className="text-sm text-gray-600">{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-medium mb-4 text-gray-700 leading-tight">{blogPosts[0].title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
                <Link href={`/blog/${blogPosts[0].slug}`}>
                  <Button className="bg-gray-600 hover:bg-gray-700 text-white uppercase tracking-widest text-xs">
                    DEVAMINI OKU
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Blog</h2>
              <p className="text-gray-600">Sağlıklı yaşam ve taze sebzeler hakkında güncel içerikler</p>
            </div>

            <div className="relative">
              <div
                ref={blogScrollRef}
                className="flex space-x-6 overflow-x-auto pb-4 horizontal-scroll"
                onScroll={handleBlogScroll}
                style={{
                  scrollBehavior: "smooth",
                }}
              >
                {blogPosts.slice(1).map((post, index) => (
                  <Link href={`/blog/${post.slug}`} key={index} className="flex-shrink-0 w-80">
                    <article className="bg-white rounded-lg overflow-hidden group cursor-pointer h-full border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-medium mb-3 text-gray-800 leading-tight group-hover:text-gray-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                        <div className="flex items-center text-sm font-medium uppercase tracking-widest group-hover:text-gray-600 transition-colors">
                          DEVAMINI OKU
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {showBlogLeftButton && (
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-30">
                  <button
                    onClick={scrollBlogLeft}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}

              {showBlogRightButton && (
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-30">
                  <button
                    onClick={scrollBlogRight}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Basında Biz</h2>
              <p className="text-gray-600">Medyada yer alan haberlerimiz ve etkinliklerimiz</p>
            </div>

            <div className="relative">
              <div
                ref={pressScrollRef}
                className="flex space-x-6 overflow-x-auto pb-4 horizontal-scroll"
                onScroll={handlePressScroll}
                style={{
                  scrollBehavior: "smooth",
                }}
              >
                {pressArticles.map((article, index) => (
                  <Link href={`/blog/${article.slug}`} key={index} className="flex-shrink-0 w-80">
                    <article className="bg-white rounded-lg overflow-hidden group cursor-pointer h-full border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {article.date}
                          </div>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="font-medium mb-3 text-gray-800 leading-tight group-hover:text-gray-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                        <div className="flex items-center text-sm font-medium uppercase tracking-widest group-hover:text-gray-600 transition-colors">
                          DEVAMINI OKU
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {showPressLeftButton && (
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-30">
                  <button
                    onClick={scrollPressLeft}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}

              {showPressRightButton && (
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-30">
                  <button
                    onClick={scrollPressRight}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
