"use client";

import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	Calendar,
	Clock,
	Search,
	ShoppingBag,
	User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

// Blog posts data
const blogPosts = [
	{
		title: "Organik Tarımın Geleceği: Sürdürülebilir Sebze Üretimi",
		excerpt:
			"Modern sera teknolojileri ile organik tarımın nasıl birleştiğini ve gelecekte nasıl şekilleneceğini keşfedin.",
		date: "15 Mart 2024",
		image: "/organic-farming-greenhouse-vegetables.png",
		readTime: "5 dk okuma",
		slug: "organik-tarimin-gelecegi",
		content: `
      <p>Organik tarım, günümüzde sürdürülebilir gıda üretiminin temel taşlarından biri haline gelmiştir. Modern sera teknolojileri ile birleşen organik tarım, hem çevreye duyarlı hem de verimli üretim imkanları sunmaktadır.</p>
      
      <h2>Modern Sera Teknolojileri</h2>
      <p>Günümüzün sera sistemleri, iklim kontrolü, otomatik sulama ve besin yönetimi gibi gelişmiş teknolojiler kullanarak organik üretimi desteklemektedir. Bu sistemler sayesinde:</p>
      <ul>
        <li>Su kullanımı %90'a kadar azaltılabilir</li>
        <li>Pestisit kullanımına gerek kalmaz</li>
        <li>Yıl boyunca üretim yapılabilir</li>
        <li>Ürün kalitesi ve verimi artar</li>
      </ul>
      
      <h2>Sürdürülebilirlik ve Gelecek</h2>
      <p>Organik tarımın geleceği, teknoloji ile doğanın mükemmel uyumunda yatmaktadır. Skycrops olarak, bu vizyonu hayata geçirmek için sürekli araştırma ve geliştirme çalışmaları yürütüyoruz.</p>
      
      <p>Gelecekte organik tarım, şehir içi üretim alanları, dikey tarım sistemleri ve yapay zeka destekli üretim yöntemleri ile daha da gelişecektir.</p>
    `,
		author: "Skycrops Ekibi",
		category: "Tarım",
	},
	{
		title: "Taze Sebzelerin Sağlığa Faydaları",
		excerpt:
			"Günlük diyetinizde taze sebzelerin önemini ve hangi vitaminleri içerdiğini öğrenin.",
		date: "12 Mart 2024",
		image: "/fresh-vegetables-and-greens-in-modern-greenhouse.png",
		readTime: "4 dk okuma",
		slug: "taze-sebzelerin-sagliga-faydalari",
		content: `
      <p>Taze sebzeler, sağlıklı bir yaşamın vazgeçilmez unsurlarıdır. Günlük diyetimizde yer alan taze sebzeler, vücudumuzun ihtiyaç duyduğu vitamin, mineral ve antioksidanları sağlar.</p>
      
      <h2>Temel Vitaminler ve Mineraller</h2>
      <p>Taze sebzelerin içerdiği başlıca besin öğeleri:</p>
      <ul>
        <li><strong>Vitamin C:</strong> Bağışıklık sistemini güçlendirir</li>
        <li><strong>Folat:</strong> Hücre yenilenmesi için gereklidir</li>
        <li><strong>Potasyum:</strong> Kalp sağlığını destekler</li>
        <li><strong>Lif:</strong> Sindirim sistemini düzenler</li>
      </ul>
      
      <h2>Günlük Tüketim Önerileri</h2>
      <p>Sağlık uzmanları, günde en az 5 porsiyon sebze ve meyve tüketilmesini önermektedir. Skycrops'un taze sebzeleri ile bu hedefi kolayca ulaşabilirsiniz.</p>
    `,
		author: "Beslenme Uzmanı",
		category: "Sağlık",
	},
	{
		title: "Yeşil Yaprakların Gücü: Vitamin ve Mineral Deposu",
		excerpt:
			"Roka, marul, ıspanak gibi yeşil yaprakların besleyici değerleri ve faydaları hakkında bilgi edinin.",
		date: "10 Mart 2024",
		image: "/fresh-leafy-greens-and-herbs-in-baskets.png",
		readTime: "6 dk okuma",
		slug: "yesil-yapraklarin-gucu",
		content: `
      <p>Yeşil yapraklı sebzeler, doğanın bize sunduğu en değerli besin kaynaklarından biridir. Roka, marul, ıspanak ve diğer yeşil yapraklar, vitamin ve mineral açısından gerçek birer hazinedir.</p>
      
      <h2>Yeşil Yaprakların Besin Değerleri</h2>
      <p>Yeşil yapraklı sebzelerin içerdiği önemli besin öğeleri:</p>
      <ul>
        <li><strong>Demir:</strong> Kan yapımı için gerekli</li>
        <li><strong>Kalsiyum:</strong> Kemik sağlığını destekler</li>
        <li><strong>Vitamin K:</strong> Kan pıhtılaşması için önemli</li>
        <li><strong>Antioksidanlar:</strong> Hücreleri korur</li>
      </ul>
      
      <h2>Tüketim Şekilleri</h2>
      <p>Yeşil yaprakları çiğ salata olarak, smoothie'lerde veya hafif pişirerek tüketebilirsiniz. Her yöntem farklı besin değerleri sunar.</p>
    `,
		author: "Skycrops Ekibi",
		category: "Beslenme",
	},
	{
		title: "Aromatik Bitkilerin Kullanım Alanları",
		excerpt:
			"Fesleğen, maydanoz ve diğer aromatik bitkilerin mutfakta ve günlük yaşamda kullanımı.",
		date: "8 Mart 2024",
		image: "/fresh-herbs-and-aromatic-plants.png",
		readTime: "3 dk okuma",
		slug: "aromatik-bitkilerin-kullanim-alanlari",
		content: `
      <p>Aromatik bitkiler, mutfağımızın vazgeçilmez unsurlarıdır. Fesleğen, maydanoz, dereotu gibi taze otlar, yemeklerimize lezzet katmanın yanı sıra sağlık açısından da birçok fayda sağlar.</p>
      
      <h2>Mutfakta Kullanım</h2>
      <p>Aromatik bitkilerin mutfaktaki kullanım alanları:</p>
      <ul>
        <li>Salatalarda taze olarak</li>
        <li>Soslar ve çorbalar için</li>
        <li>Et ve balık yemeklerinde</li>
        <li>Çay ve içeceklerde</li>
      </ul>
      
      <h2>Sağlık Faydaları</h2>
      <p>Aromatik bitkiler, antioksidan özellikleri sayesinde bağışıklık sistemini güçlendirir ve sindirim sistemini destekler.</p>
    `,
		author: "Mutfak Uzmanı",
		category: "Mutfak",
	},
	{
		title: "Sera Tarımında Teknoloji ve İnovasyon",
		excerpt:
			"Modern sera sistemlerinin nasıl çalıştığını ve teknolojinin tarıma katkılarını inceleyin.",
		date: "5 Mart 2024",
		image: "/daily-harvest-fresh-vegetables.png",
		readTime: "7 dk okuma",
		slug: "sera-tariminda-teknoloji",
		content: `
      <p>Modern sera tarımı, teknoloji ve tarımın mükemmel birleşimini temsil eder. Skycrops olarak, en son teknolojileri kullanarak sürdürülebilir ve verimli üretim gerçekleştiriyoruz.</p>
      
      <h2>Teknolojik İnovasyonlar</h2>
      <p>Sera tarımında kullandığımız başlıca teknolojiler:</p>
      <ul>
        <li>Otomatik iklim kontrol sistemleri</li>
        <li>Akıllı sulama ve beslenme sistemleri</li>
        <li>LED aydınlatma teknolojisi</li>
        <li>Sensör tabanlı izleme sistemleri</li>
      </ul>
      
      <h2>Geleceğin Tarımı</h2>
      <p>Yapay zeka ve IoT teknolojileri ile sera tarımı daha da gelişecek ve sürdürülebilir gıda üretiminin temelini oluşturacaktır.</p>
    `,
		author: "Teknoloji Uzmanı",
		category: "Teknoloji",
	},
	{
		title: "Mevsimlik Sebze Rehberi: Ne Zaman Ne Yenir?",
		excerpt:
			"Hangi sebzelerin hangi mevsimde en taze ve lezzetli olduğunu öğrenin.",
		date: "2 Mart 2024",
		image: "/fresh-mixed-vegetables-display.png",
		readTime: "5 dk okuma",
		slug: "mevsimlik-sebze-rehberi",
		content: `
      <p>Mevsiminde tüketilen sebzeler, hem daha lezzetli hem de daha besleyicidir. Bu rehber ile hangi sebzeleri hangi mevsimde tüketmeniz gerektiğini öğrenebilirsiniz.</p>
      
      <h2>İlkbahar Sebzeleri</h2>
      <ul>
        <li>Roka ve tere</li>
        <li>Taze soğan</li>
        <li>Radika</li>
        <li>Kuzu kulağı</li>
      </ul>
      
      <h2>Yaz Sebzeleri</h2>
      <ul>
        <li>Domates</li>
        <li>Salatalık</li>
        <li>Biber</li>
        <li>Marul</li>
      </ul>
      
      <h2>Sonbahar ve Kış</h2>
      <p>Sonbahar ve kış aylarında ise lahana, ıspanak ve kök sebzeler öne çıkar. Skycrops sera sistemleri sayesinde yıl boyunca taze sebze üretimi yapabilmektedir.</p>
    `,
		author: "Tarım Uzmanı",
		category: "Rehber",
	},
];

// Press articles data
const pressArticles = [
	{
		title: "İl Tarım Müdürlüğü Kadınlar Günü Kutlaması",
		excerpt:
			"Tekirdağ Valiliği İl Tarım ve Orman Müdürlüğü'ne katılımımız verilecek destek ve 8 Mart Dünya Kadınlar Günü'nü kutlanan için teşekkür ederiz.",
		date: "8 Mart 2024",
		image: "/press-womens-day.png",
		readTime: "3 dk okuma",
		slug: "il-tarim-mudurlugu-kadinlar-gunu",
		content: `
      <p>8 Mart Dünya Kadınlar Günü vesilesiyle Tekirdağ Valiliği İl Tarım ve Orman Müdürlüğü tarafından düzenlenen özel etkinliğe katılım sağladık.</p>
      
      <h2>Etkinlik Detayları</h2>
      <p>Etkinlikte, tarım sektöründe çalışan kadınların başarıları ve katkıları öne çıkarıldı. Skycrops olarak, kadın çalışanlarımızın şirketimize olan değerli katkılarını vurguladık.</p>
      
      <h2>Destekler ve İş Birlikleri</h2>
      <p>İl Tarım Müdürlüğü ile sürdürdüğümüz iş birliği kapsamında, sürdürülebilir tarım projelerimiz hakkında bilgi paylaşımında bulunduk.</p>
      
      <p>Bu önemli günde bizleri ağırlayan İl Tarım ve Orman Müdürlüğü'ne teşekkürlerimizi sunuyoruz.</p>
    `,
		author: "Skycrops Medya",
		category: "Basın",
	},
	{
		title: "Wageningen Üniversitesi Dikey Tarım Programı",
		excerpt:
			"Wageningen Üniversitesi ve Araştırma Merkezi Dikey Tarım Programına Katıldık.",
		date: "5 Mart 2024",
		image: "/press-university-program.png",
		readTime: "4 dk okuma",
		slug: "wageningen-universitesi-dikey-tarim",
		content: `
      <p>Hollanda'nın prestijli Wageningen Üniversitesi ve Araştırma Merkezi tarafından düzenlenen Dikey Tarım Programına katılım sağladık.</p>
      
      <h2>Program İçeriği</h2>
      <p>Program kapsamında, dikey tarım teknolojileri, sürdürülebilir üretim yöntemleri ve gelecek nesil sera sistemleri hakkında eğitim aldık.</p>
      
      <h2>Uluslararası İş Birlikleri</h2>
      <p>Wageningen Üniversitesi ile kurduğumuz akademik iş birliği, Skycrops'un teknolojik altyapısını güçlendirmekte ve araştırma-geliştirme çalışmalarımıza katkı sağlamaktadır.</p>
      
      <h2>Gelecek Projeler</h2>
      <p>Bu program sayesinde edindiğimiz bilgi ve deneyimleri, Türkiye'deki dikey tarım projelerimizde uygulamaya geçireceğiz.</p>
    `,
		author: "Skycrops Medya",
		category: "Eğitim",
	},
	{
		title: "Anadolu Ajansı Skycrops'ta",
		excerpt: "Anadolu Ajansı Skycrops'ta.",
		date: "2 Mart 2024",
		image: "/press-anadolu-agency.png",
		readTime: "2 dk okuma",
		slug: "anadolu-ajansi-skycrops",
		content: `
      <p>Anadolu Ajansı ekibi, Skycrops tesislerimizi ziyaret ederek modern sera tarımı ve sürdürülebilir üretim süreçlerimiz hakkında röportaj gerçekleştirdi.</p>
      
      <h2>Ziyaret Programı</h2>
      <p>Ziyaret kapsamında, AA muhabirleri sera tesislerimizi gezerek üretim süreçlerimizi yakından inceledi. Teknolojik altyapımız ve organik üretim yöntemlerimiz hakkında detaylı bilgi verildi.</p>
      
      <h2>Medya Görünürlüğü</h2>
      <p>Bu ziyaret, Skycrops'un sürdürülebilir tarım alanındaki öncü rolünü ulusal medyada duyurma fırsatı sağladı.</p>
      
      <p>Anadolu Ajansı ekibine gösterdiği ilgi için teşekkür ederiz.</p>
    `,
		author: "Skycrops Medya",
		category: "Medya",
	},
];

// Combine all articles
const allArticles = [...blogPosts, ...pressArticles];

export default function BlogArticle({ params }: { params: { slug: string } }) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Find the article by slug
	const article = allArticles.find((article) => article.slug === params.slug);

	if (!article) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-white relative">
			{/* Header */}
			<header className="bg-white shadow-sm relative z-10">
				<nav className="flex items-center justify-between px-6 py-4">
					<div className="flex items-center space-x-8">
						<Link
							href="/"
							className="text-2xl font-light tracking-wider text-gray-700"
						>
							skycrops
						</Link>
						<div className="hidden md:flex space-x-6 text-sm uppercase tracking-wide">
							<Link
								href="/hakkimizda"
								className="hover:opacity-70 transition-colors text-gray-600"
							>
								HAKKIMIZDA
							</Link>
							<Link
								href="/abonelik"
								className="hover:opacity-70 transition-colors text-gray-600"
							>
								ÜRÜNLER
							</Link>
							<Link
								href="/abonelik"
								className="hover:opacity-70 transition-colors text-gray-600"
							>
								ABONELİK
							</Link>
							<Link
								href="/tesisler"
								className="hover:opacity-70 transition-colors text-gray-600"
							>
								TESİSLER
							</Link>
							<Link
								href="/blog"
								className="hover:opacity-70 transition-colors text-gray-800 font-medium"
							>
								BLOG
							</Link>
							<Link
								href="/iletisim"
								className="hover:opacity-70 transition-colors text-gray-600"
							>
								İLETİŞİM
							</Link>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<div className="text-sm uppercase tracking-wide">
							<span className="text-gray-600">🇹🇷</span>
						</div>
						<Search className="w-5 h-5 text-gray-600" />
						<User className="w-5 h-5 text-gray-600" />
						<ShoppingBag className="w-5 h-5 text-gray-600" />
					</div>
				</nav>
			</header>

			<main className="py-12 px-6 relative z-10">
				<div className="max-w-4xl mx-auto">
					{/* Back to Blog */}
					<div className="mb-8">
						<Link
							href="/blog"
							className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Blog'a Dön
						</Link>
					</div>

					{/* Article Header */}
					<div className="bg-white p-8 rounded-lg shadow-sm mb-8">
						<div className="mb-6">
							<img
								src={article.image || "/placeholder.svg"}
								alt={article.title}
								className="w-full h-96 object-cover rounded-lg"
							/>
						</div>

						<div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
							<div className="flex items-center">
								<Calendar className="w-4 h-4 mr-2" />
								{article.date}
							</div>
							<div className="flex items-center">
								<Clock className="w-4 h-4 mr-2" />
								{article.readTime}
							</div>
							<span>Yazar: {article.author}</span>
						</div>

						<h1 className="text-3xl md:text-4xl font-medium mb-6 text-gray-800 leading-tight">
							{article.title}
						</h1>

						<p className="text-lg text-gray-600 leading-relaxed mb-8">
							{article.excerpt}
						</p>
					</div>

					{/* Article Content */}
					<div className="bg-white p-8 rounded-lg shadow-sm">
						<div
							className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: article.content }}
						/>
					</div>

					{/* Back to Blog Footer */}
					<div className="mt-12 text-center">
						<Link href="/blog">
							<Button className="uppercase tracking-widest text-xs">
								<ArrowLeft className="w-4 h-4 mr-2" />
								TÜM YAZILAR
							</Button>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
