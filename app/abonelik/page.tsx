"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { Grid, Section, SectionHeader } from "@/components/ui/page-layout";
import {
	BenefitCard,
	CTASection,
	FAQSection,
	TestimonialCard,
} from "@/components/ui/subscription-components";
import { useSubscriptions } from "@/contexts/subscription-context";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { apiClient } from "@/lib/api-client";
import { Award, Leaf, Minus, Plus, Shield, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	"https://dynamic-spirit-b1c4404b11.strapiapp.com";

export default function Abonelik() {
	const router = useRouter();

	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Get subscription plans from backend
	const { plans, isLoading: plansLoading } = useSubscriptions();

	// State for images
	const [sebzePaketiImage, setSebzePaketiImage] = useState<string>(
		"/skycrops-package-product.png",
	);
	const [tazeYesilliklerImage, setTazeYesilliklerImage] = useState<string>(
		"/skycrops-package-product.png",
	);
	const [isImageLoading, setIsImageLoading] = useState(false);

	// State for interactive elements
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedPurchaseOption, setSelectedPurchaseOption] = useState<
		"subscription" | "oneTime"
	>("subscription");
	const [quantity, setQuantity] = useState(1);
	const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(1);
	const [deliveryFrequency, setDeliveryFrequency] = useState<
		"oneTime" | "weekly" | "biweekly"
	>("weekly");

	// Delivery days configuration
	const deliveryDays = [
		{ id: 1, name: "Pazartesi", shortName: "Pzt" },
		{ id: 2, name: "Salı", shortName: "Sal" },
		{ id: 3, name: "Çarşamba", shortName: "Çar" },
		{ id: 4, name: "Perşembe", shortName: "Per" },
		{ id: 5, name: "Cuma", shortName: "Cum" },
		{ id: 6, name: "Cumartesi", shortName: "Cmt" },
		{ id: 7, name: "Pazar", shortName: "Paz" },
	];

	const scrollToContent = useCallback(() => {
		const contentSection = document.querySelector("#main-content");
		if (contentSection) {
			const headerHeight = 64;
			const elementPosition =
				contentSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}, []);

	// Fetch product images from API
	useEffect(() => {
		const fetchProductImages = async () => {
			try {
				setIsImageLoading(true);

				// Fetch products with populate to get images
				const response = await apiClient.getProducts({
					populate: "*",
				});

				if (
					response.data &&
					Array.isArray(response.data) &&
					response.data.length > 0
				) {
					const products = response.data as any[];

					// Find Taze Yeşillikler Paketi for the subscription section
					const tazeYesilliklerPaketi = products.find(
						(p) => p.name === "Taze Yeşillikler Paketi",
					);
					if (tazeYesilliklerPaketi) {
						let imageUrl = null;

						// Check if product has images array
						if (
							tazeYesilliklerPaketi.images &&
							Array.isArray(tazeYesilliklerPaketi.images) &&
							tazeYesilliklerPaketi.images.length > 0
						) {
							imageUrl = tazeYesilliklerPaketi.images[0].url;
						} else if (
							tazeYesilliklerPaketi.image &&
							tazeYesilliklerPaketi.image.url
						) {
							// Fallback to single image field
							imageUrl = tazeYesilliklerPaketi.image.url;
						}

						if (imageUrl) {
							const fullImageUrl = imageUrl.startsWith("http")
								? imageUrl
								: `${API_BASE_URL}${imageUrl}`;
							setTazeYesilliklerImage(fullImageUrl);
						}
					}

					// Find Sebze Paketleri for the main subscription package
					const sebzePaketi = products.find(
						(p) =>
							p.name === "Sebze Paketleri" ||
							p.name === "Taze Yeşillikler Paketi",
					);
					if (sebzePaketi) {
						let imageUrl = null;

						// Check if product has images array
						if (
							sebzePaketi.images &&
							Array.isArray(sebzePaketi.images) &&
							sebzePaketi.images.length > 0
						) {
							imageUrl = sebzePaketi.images[0].url;
						} else if (sebzePaketi.image && sebzePaketi.image.url) {
							// Fallback to single image field
							imageUrl = sebzePaketi.image.url;
						}

						if (imageUrl) {
							const fullImageUrl = imageUrl.startsWith("http")
								? imageUrl
								: `${API_BASE_URL}${imageUrl}`;
							setSebzePaketiImage(fullImageUrl);
						}
					}
				}
			} catch (error) {
				console.error("Error fetching product images:", error);
				// Keep the default images on error
			} finally {
				setIsImageLoading(false);
			}
		};

		fetchProductImages();
	}, []);

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
				"Yıl boyu taze ürün çeşitliliği",
			],
			weeklyItems: [
				"500 gr Kıvırcık (dikey tarım)",
				"300 gr Fesleğen",
				"300 gr Maydanoz",
				"500 gr Lollo Rosso",
				"300 gr Reyhan",
				"400 gr Roka",
			],
		},
	];

	const benefits = [
		{
			icon: <Leaf className="w-8 h-8 text-green-600" />,
			title: "Doğal ve Organik",
			description:
				"Kapalı ortamda, hiçbir kimyasal ve pestisit kullanmadan yetiştirilen taze ürünler",
		},
		{
			icon: <Shield className="w-8 h-8 text-blue-600" />,
			title: "Çevre Dostu",
			description: "Dikey tarım ile %97 daha az su kullanımı ve güneş enerjisi",
		},
		{
			icon: <Truck className="w-8 h-8 text-yellow-600" />,
			title: "Hızlı Teslimat",
			description:
				"Şehir içi üretim sayesinde hasattan kısa sürede sofraya ulaşım",
		},
		{
			icon: <Award className="w-8 h-8 text-purple-600" />,
			title: "Teknoloji Odaklı",
			description:
				"Gelişmiş dikey tarım teknolojisi ile optimum koşullarda üretim",
		},
	];

	const testimonials = [
		{
			name: "Merve K.",
			comment:
				"Skycrops aboneliği ile evimize gelen taze kıvırcık ve roka harika! Çocuklarım dikey tarım ürünlerini çok seviyor.",
			rating: 5,
			image: "/testimonial-1.jpg",
		},
		{
			name: "Ahmet B.",
			comment:
				"Dikey tarım teknolojisine destek olmak ve aynı zamanda taze yeşillikler almak mükemmel. Hizmet kalitesi çok iyi!",
			rating: 5,
			image: "/testimonial-2.jpg",
		},
		{
			name: "Selin Y.",
			comment:
				"Kapalı ortam üretim sistemi ve çevre dostu yaklaşımı için tercih ettim. Ürünler gerçekten taze ve pestisit içermiyor.",
			rating: 5,
			image: "/testimonial-3.jpg",
		},
		{
			name: "Kemal D.",
			comment:
				"Geleceğin tarım teknolojisini desteklemek ve doğal ürünler tüketmek için harika bir fırsat. Kesinlikle tavsiye ederim.",
			rating: 5,
			image: "/testimonial-4.jpg",
		},
	];

	const faqItems = [
		{
			id: "faq-1",
			question: "Paket içeriğini neden ben seçemiyorum?",
			answer:
				"Her ürünün büyüme süresi ve verimlilik miktarı farklılık göstermektedir. Örneğin, bazı yeşillikler daha kısa sürede hasada gelirken, bazı çeşitlerin olgunlaşması daha uzun zaman almaktadır. Ayrıca aynı üretim alanından elde edilen demet sayısı da her tür için değişmektedir.\n\nBu sebeplerle paket içeriğini bireysel tercihlere göre belirlemek, üretim planlamasında ciddi operasyonel zorluklar yaratır ve ürünlerin düzenli ve sürdürülebilir şekilde ulaştırılmasını engelleyebilir.\n\nSkycrops olarak biz, bu süreci titizlikle yönetiyor ve paketlerinizi her hafta dengeli, çeşitli ve taptaze ürünlerle hazırlıyoruz. Böylece abonelerimiz hiçbir planlama yapmadan, güvenle sofralarında farklı lezzetleri deneyimleyebiliyor.",
		},
		{
			id: "faq-2",
			question: "Ürünler nasıl paketleniyor?",
			answer:
				"Yeşilliklerimiz kontrollü ve hijyenik koşullarda yetiştirildiği için yıkanmasına gerek kalmaz. Hasat edildiği gün tazeliğini kaybetmeden ayıklanır, özenle paketlenir ve özel ambalajlarla sofranıza ulaşır.",
		},
		{
			id: "faq-3",
			question: "Teslimat günümü değiştirebilir miyim?",
			answer:
				"Teslimatlar belirli günlerde planlanmaktadır. Abonelik başlangıcında size en uygun günü seçebilirsiniz. Sonrasında gün değişikliği ihtiyacınız olursa hesabınızdan değişiklik yapabilirsiniz.",
		},
		{
			id: "faq-4",
			question: "Aboneliğimi dondurabilir miyim?",
			answer:
				"Evet. İstediğinizde ara verebilir, dilediğiniz zaman kaldığınız yerden devam edebilirsiniz.",
		},
		{
			id: "faq-5",
			question: "Abonelik planımı değiştirebilir miyim?",
			answer:
				"Evet. Aboneliğinizi haftalık ya da iki haftada bir olacak şekilde değiştirebilirsiniz. Değişiklik sonrasında planınız hızlıca güncellenir ve teslimatlar yeni planınıza göre devam eder.",
		},
		{
			id: "faq-6",
			question: "Tek seferlik satın alma yapabiliyor muyum?",
			answer:
				"Evet. Abonelik dışında tek seferlik satın alma da yapabilirsiniz. Böylece ürünlerimizi denemek isterseniz önce tek kutu sipariş verebilir, sonrasında dilerseniz aboneliğe geçebilirsiniz. Düzenli tazelik isteyenler için abonelik öneriyoruz; ancak tek seferlik siparişlerle de Skycrops lezzetini deneyimlemeniz mümkün.",
		},
		{
			id: "faq-7",
			question: "Ürünler kargoda zarar görürse ne yapılır?",
			answer:
				"Nadiren de olsa taşıma sırasında ürünlerde zarar oluşabilir. Böyle bir durumda hemen bizimle iletişime geçmenizi rica ederiz. Fotoğraf paylaşmanızın ardından size en kısa sürede yeni ürün gönderimi yapılır.",
		},
		{
			id: "faq-8",
			question: "Neden Skycrops ürünlerine güvenmeliyim?",
			answer:
				"Skycrops olarak tüm ürünlerimizi kontrollü, kapalı ve hijyenik koşullarda, pestisit kullanılmadan üretiyoruz. Üretimimiz, resmi olarak aldığımız İyi Tarım Uygulamaları Belgesi ile de tescillenmiş durumda.\n\nBu belge, gıda güvenliği, çevreye duyarlılık ve sürdürülebilirlik kriterlerine uygun üretim yaptığımızı kanıtlar. Yani sofranıza gelen her yeşillik, hem sağlıklı hem de güvenilir bir şekilde yetiştirilmiştir.",
		},
	];

	return (
		<div className="min-h-screen bg-white relative">
			<HeroHeader
				slides={[
					{
						title: "",
						subtitle: "",
						buttonText: "",
						buttonAction: () =>
							router.push("/abonelik/taze-yesillikler-paketi"),
						image: "/derleme.png",
					},
				]}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="65vh"
			/>

			{/* Main content */}
			<main id="main-content" className="relative z-10 bg-white">
				{/* Hero Content Section */}
				<Section className="py-20 bg-gray-50">
					<div className="mx-12">
						{/* Main Hero Title */}
						<div className="text-center mb-16">
							<h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide text-gray-800 leading-tight">
								Her Hafta Taptaze Yeşillikler
								<span className="block text-gray-600 font-medium">
									Kapınızda!
								</span>
							</h1>
							<p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
								Skycrops abonelik sistemiyle tanışın: Şehirde yaşarken en taze,
								en lezzetli ve en sağlıklı yeşilliklere zahmetsizce ulaşmanın en
								kolay yolu.
							</p>
							<div className="mt-8">
								<Button
									onClick={() =>
										router.push("/abonelik/taze-yesillikler-paketi")
									}
									className="px-10 py-4 text-lg"
								>
									Hemen Abone Ol
								</Button>
							</div>
						</div>

						{/* Content Grid */}
						<div className="grid lg:grid-cols-2 gap-16 items-start">
							{/* Left Column - Key Features */}
							<div className="space-y-12">
								{/* Her Hafta Farklı Çeşitler */}
								<div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
									<div className="flex items-start space-x-4 mb-6">
										<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<span className="text-2xl">🌿</span>
										</div>
										<div>
											<h3 className="text-2xl font-medium text-gray-800 mb-3">
												Her hafta farklı çeşitler
											</h3>
											<p className="text-gray-600 leading-relaxed">
												Skycrops abonelik programıyla sofranıza her hafta farklı
												tatlar geliyor. Programımızda yalnızca 2 marul çeşidi
												sabit kalıyor; diğer tüm ürünler haftadan haftaya
												değişiyor. Böylece her kutuda 8 adet yeşillik ile hem
												tanıdık lezzetleri koruyor hem de yeni tatlarla
												mutfağınıza sürprizler ekliyoruz. Roka, fesleğen,
												maydanoz, semizotu ve daha niceleri…
											</p>
										</div>
									</div>
								</div>

								{/* Abone Olun */}
								<div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
									<div className="flex items-start space-x-4 mb-6">
										<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<span className="text-2xl">📦</span>
										</div>
										<div>
											<h3 className="text-2xl font-medium text-gray-800 mb-3">
												Abone olun, gerisini bize bırakın
											</h3>
											<p className="text-gray-600 leading-relaxed">
												Tek yapmanız gereken size en uygun abonelik planını
												seçmek. İster her hafta, ister iki haftada bir sepetiniz
												kapınıza gelsin.
											</p>
										</div>
									</div>
								</div>

								{/* Doğal ve Güvenilir */}
								<div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
									<div className="flex items-start space-x-4 mb-6">
										<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<span className="text-2xl">🛡️</span>
										</div>
										<div>
											<h3 className="text-2xl font-medium text-gray-800 mb-3">
												Doğal ve güvenilir üretim
											</h3>
											<p className="text-gray-600 leading-relaxed">
												Pestisitsiz, %90 daha az suyla yetiştirilen
												yeşilliklerimiz kontrollü koşullarda üretilir ve
												sofranıza en yüksek tazelikle ulaşır.
											</p>
										</div>
									</div>
								</div>

								{/* Daha Taze, Daha Pratik */}
								<div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
									<div className="flex items-start space-x-4 mb-6">
										<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<span className="text-2xl">⚡</span>
										</div>
										<div>
											<h3 className="text-2xl font-medium text-gray-800 mb-3">
												Daha taze, daha pratik
											</h3>
											<p className="text-gray-600 leading-relaxed">
												Hasat edildiği gün paketlenen yeşillikler, alışveriş
												zahmetini ortadan kaldırır ve sofranıza maksimum
												lezzetle gelir.
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Right Column - Weekly Programs */}
							<div className="lg:sticky lg:top-8">
								<div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
									<div className="text-center mb-8">
										<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
											<span className="text-3xl">📅</span>
										</div>
										<h3 className="text-3xl font-medium text-gray-800 mb-4">
											Örnek Haftalık Programlar
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Aboneliğinizle birlikte her hafta sofranıza farklı
											kombinasyonlarda 8 adet taptaze yeşillik gelir.
										</p>
									</div>

									{/* Example Weeks */}
									<div className="space-y-6">
										{/* Week 1 */}
										<div className="bg-gray-50 rounded-lg p-6">
											<h4 className="font-medium text-gray-800 mb-3 flex items-center">
												<span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
													1
												</span>
												Örnek Hafta
											</h4>
											<p className="text-sm text-gray-600 leading-relaxed">
												2 adet kıvırcık ile birlikte endivyen, arugula,
												maydanoz, frenk soğanı, tere ve kekik
											</p>
										</div>

										{/* Week 2 */}
										<div className="bg-gray-50 rounded-lg p-6">
											<h4 className="font-medium text-gray-800 mb-3 flex items-center">
												<span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
													2
												</span>
												Örnek Hafta
											</h4>
											<p className="text-sm text-gray-600 leading-relaxed">
												2 adet kıvırcık, kale, roka, maydanoz, frenk soğanı,
												mizuna ve fesleğen
											</p>
										</div>

										{/* Week 3 */}
										<div className="bg-gray-50 rounded-lg p-6">
											<h4 className="font-medium text-gray-800 mb-3 flex items-center">
												<span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
													3
												</span>
												Örnek Hafta
											</h4>
											<p className="text-sm text-gray-600 leading-relaxed">
												Kıvırcık, endivyen veya yağlı yaprak, semizotu, dereotu,
												maydanoz, kuzu kulağı, amarant ve kale
											</p>
										</div>

										{/* Week 4 */}
										<div className="bg-gray-50 rounded-lg p-6">
											<h4 className="font-medium text-gray-800 mb-3 flex items-center">
												<span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
													4
												</span>
												Örnek Hafta
											</h4>
											<p className="text-sm text-gray-600 leading-relaxed">
												Kıvırcık, kale veya lolorosso, roka, maydanoz, frenk
												soğanı, kırmızı damarlı kuzu kulağı, mor fesleğen ve
												tere
											</p>
										</div>
									</div>

									<div className="mt-8 text-center">
										<Button
											onClick={() =>
												router.push("/abonelik/taze-yesillikler-paketi")
											}
											className="w-full px-8 py-3"
										>
											Abonelik Planlarını İncele
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Section>

				{/* Subscription Package */}
				<Section className="py-20">
					<div className="mx-12">
						{/* Main Product Layout */}
						<div className="grid lg:grid-cols-2 gap-16 items-start">
							{/* Left Column - Product Image */}
							<div className="relative">
								<div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
									<img
										src={
											[
												"/bundle4.png",
												sebzePaketiImage,
												"/fresh-vegetables-and-greens-in-modern-greenhouse.png",
												"/organic-farming-greenhouse-vegetables.png",
											][selectedImage]
										}
										alt="Taze Yeşillikler Paketi"
										className="w-full h-full object-cover"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = "/bundle4.png";
										}}
									/>
								</div>

								{/* Thumbnail Images */}
								<div className="flex space-x-3 mt-4 overflow-x-auto">
									{[
										"/bundle4.png",
										sebzePaketiImage,
										"/fresh-vegetables-and-greens-in-modern-greenhouse.png",
										"/organic-farming-greenhouse-vegetables.png",
									].map((img, index) => (
										<button
											key={index}
											onClick={() => setSelectedImage(index)}
											className={`flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
												selectedImage === index
													? "border-gray-600"
													: "border-gray-200 hover:border-gray-400"
											}`}
										>
											<img
												src={img}
												alt={`Product view ${index + 1}`}
												className="w-full h-full object-cover"
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.src = "/bundle4.png";
												}}
											/>
										</button>
									))}
								</div>
							</div>

							{/* Right Column - Product Info */}
							<div className="space-y-6">
								<div>
									<h1 className="text-3xl md:text-4xl font-light mb-2 text-gray-800">
										Taze Yeşillikler Paketi
									</h1>
									<p className="text-gray-600 text-lg italic leading-relaxed">
										Dikey tarım ürünleri ile sağlıklı yaşamın keyfini çıkarın.
										Her hafta 8 adet özenle seçilmiş taptaze yeşillik kapınıza
										gelir.
									</p>
								</div>

								{/* Purchase Options */}
								<div className="space-y-3">
									{/* Subscription Option */}
									<div
										className={`p-4 rounded-lg border-2 transition-colors ${
											selectedPurchaseOption === "subscription"
												? "border-gray-600 bg-gray-50"
												: "border-gray-200"
										}`}
									>
										<button
											onClick={() => setSelectedPurchaseOption("subscription")}
											className="w-full text-left"
											type="button"
										>
											<div className="flex items-center justify-between mb-3">
												<div>
													<div className="font-medium text-gray-800">
														Abonelik
													</div>
													<div className="text-sm text-gray-600">
														Düzenli teslimat ile %35 tasarruf et
													</div>
												</div>
												<div className="text-right">
													<div className="text-lg font-medium text-red-600">
														₺299.00
													</div>
													<div className="text-sm text-gray-500 line-through">
														₺450.00
													</div>
												</div>
											</div>
										</button>

										{/* Subscription Details - Only show when selected */}
										{selectedPurchaseOption === "subscription" && (
											<div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
												{/* Subscription Benefits */}
												<div className="space-y-2 text-sm text-gray-700">
													<div>
														+ %35 indirim ilk üç siparişte, sonrasında %20
														indirim
													</div>
													<div>+ Ücretsiz teslimat</div>
													<div>
														+ İstediğiniz zaman duraklatın veya iptal edin
													</div>
													<div>+ Abonelik yaptığınızda özel hediyeler</div>
												</div>

												{/* Delivery Frequency Selector */}
												<div>
													<select
														value={deliveryFrequency}
														onChange={(e) =>
															setDeliveryFrequency(
																e.target.value as
																	| "oneTime"
																	| "weekly"
																	| "biweekly",
															)
														}
														className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
													>
														<option value="weekly">Haftada bir</option>
														<option value="biweekly">2 haftada bir</option>
													</select>
												</div>

												{/* Quantity Selector */}
												<div className="flex items-center justify-between">
													<span className="text-sm font-medium text-gray-700">
														Adet:
													</span>
													<div className="flex items-center space-x-3">
														<button
															type="button"
															onClick={() =>
																setQuantity(Math.max(1, quantity - 1))
															}
															className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
															disabled={quantity <= 1}
														>
															<Minus className="w-3 h-3" />
														</button>
														<span className="w-12 text-center font-medium">
															{quantity}
														</span>
														<button
															type="button"
															onClick={() =>
																setQuantity(Math.min(10, quantity + 1))
															}
															className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
															disabled={quantity >= 10}
														>
															<Plus className="w-3 h-3" />
														</button>
													</div>
												</div>

												{/* Delivery Day Selector */}
												<div>
													<div className="flex items-center justify-between mb-2">
														<span className="text-sm font-medium text-gray-700">
															Teslimat Günü:
														</span>
														<span className="text-xs text-gray-500">
															{
																deliveryDays.find(
																	(d) => d.id === selectedDeliveryDay,
																)?.name
															}
														</span>
													</div>
													<div className="grid grid-cols-7 gap-1">
														{deliveryDays.map((day) => (
															<button
																key={day.id}
																type="button"
																onClick={() => setSelectedDeliveryDay(day.id)}
																className={`p-2 text-xs rounded border transition-colors ${
																	selectedDeliveryDay === day.id
																		? "border-gray-600 bg-gray-600 text-white"
																		: "border-gray-200 hover:border-gray-300 text-gray-700"
																}`}
															>
																{day.shortName}
															</button>
														))}
													</div>
												</div>

												{/* Summary */}
												<div className="bg-gray-50 p-3 rounded text-sm">
													<p className="text-gray-700">
														<strong>{quantity} adet</strong> ürün,{" "}
														<strong>
															{deliveryFrequency === "weekly"
																? "her hafta"
																: deliveryFrequency === "biweekly"
																	? "2 haftada bir"
																	: "tek seferlik"}
														</strong>{" "}
														<strong>
															{
																deliveryDays.find(
																	(d) => d.id === selectedDeliveryDay,
																)?.name
															}
														</strong>{" "}
														günleri teslimat edilecek.
													</p>
												</div>
											</div>
										)}
									</div>

									{/* Buy Once Option - Never expands */}
									<div
										className={`p-4 rounded-lg border-2 transition-colors ${
											selectedPurchaseOption === "oneTime"
												? "border-gray-600 bg-gray-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<button
											onClick={() => setSelectedPurchaseOption("oneTime")}
											className="w-full text-left"
											type="button"
										>
											<div className="flex items-center justify-between">
												<div>
													<div className="font-medium text-gray-800">
														Tek Seferlik Satın Al
													</div>
													<div className="text-sm text-gray-600">
														Şimdi satın al, istediğin zaman tekrar sipariş ver
													</div>
												</div>
												<div className="text-right">
													<div className="text-lg font-medium text-gray-800">
														₺450.00
													</div>
												</div>
											</div>
										</button>
									</div>
								</div>

								{/* Add to Cart Button */}
								<Button
									onClick={() =>
										router.push("/abonelik/taze-yesillikler-paketi")
									}
									className="w-full py-4 text-lg"
								>
									Sepete Ekle
								</Button>

								{/* Product Details Link */}
								<div className="text-center">
									<button className="text-gray-600 hover:text-gray-800 underline text-sm transition-colors">
										Ürün detaylarını gör
									</button>
								</div>
							</div>
						</div>
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
	);
}
