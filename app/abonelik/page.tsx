"use client";

import HeroHeader from "@/components/hero-header";
import BasicAccordion from "@/components/smoothui/ui/BasicAccordion";
import FeatureCard from "@/components/subscription/feature-card";
import {
	type DeliveryDay,
	type Product,
	type SubscriptionInterval,
} from "@/components/subscription/product-selector";
import SubscriptionProductPreview from "@/components/subscription/subscription-product-preview";
import WeeklyProgram from "@/components/subscription/weekly-program";
import { Button } from "@/components/ui/button";
import { Grid, Section, SectionHeader } from "@/components/ui/page-layout";
import {
	BenefitCard,
	CTASection,
	TestimonialCard,
} from "@/components/ui/subscription-components";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { apiClient } from "@/lib/api-client";
import { Award, Leaf, Shield, Truck, X } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import type React from "react";
import { memo, useCallback, useEffect, useId, useMemo, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Benefit interface
 */
interface Benefit {
	icon: React.ReactNode;
	title: string;
	description: string;
}

/**
 * Testimonial interface
 */
interface Testimonial {
	name: string;
	comment: string;
	rating: number;
	image: string;
}

/**
 * FAQ item interface
 */
interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

/**
 * Feature interface
 */
interface Feature {
	emoji: string;
	title: string;
	description: string;
}

/**
 * Subscription landing page component
 * Main page for subscription offerings and product display
 *
 * @returns {React.ReactElement} The subscription landing page component
 */
const Abonelik: React.FC = memo(() => {
	const router = useRouter();
	const mainContentId = useId();

	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set footer color to match page background
	useFooterColorSetter("#DF626B");

	// State for product data from API
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// State for interactive elements
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(2);
	const [selectedInterval, setSelectedInterval] =
		useState<SubscriptionInterval | null>(null);
	const [purchaseType, setPurchaseType] = useState<"subscription" | "one_time">(
		"subscription",
	);
	const [deliveryDayStock, setDeliveryDayStock] = useState<
		Record<number, number>
	>({});

	/**
	 * Delivery days configuration with memoization
	 */
	const deliveryDays: DeliveryDay[] = useMemo(
		() => [
			{ id: 1, name: "Pazartesi", shortName: "Pzt", alwaysInactive: true },
			{ id: 2, name: "Salı", shortName: "Sal", alwaysInactive: false },
			{ id: 3, name: "Çarşamba", shortName: "Çar", alwaysInactive: false },
			{ id: 4, name: "Perşembe", shortName: "Per", alwaysInactive: false },
			{ id: 5, name: "Cuma", shortName: "Cum", alwaysInactive: false },
			{ id: 6, name: "Cumartesi", shortName: "Cmt", alwaysInactive: false },
			{ id: 7, name: "Pazar", shortName: "Paz", alwaysInactive: true },
		],
		[],
	);

	/**
	 * Features data with memoization
	 */
	const features: Feature[] = useMemo(
		() => [
			{
				emoji: "🌿",
				title: "Her hafta farklı çeşitler",
				description:
					"Skycrops abonelik programıyla sofranıza her hafta farklı tatlar geliyor. Programımızda yalnızca 2 marul çeşidi sabit kalıyor; diğer tüm ürünler haftadan haftaya değişiyor. Böylece her kutuda 8 adet yeşillik ile hem tanıdık lezzetleri koruyor hem de yeni tatlarla mutfağınıza sürprizler ekliyoruz. Roka, fesleğen, maydanoz, semizotu ve daha niceleri…",
			},
			{
				emoji: "📦",
				title: "Abone olun, gerisini bize bırakın",
				description:
					"Tek yapmanız gereken size en uygun abonelik planını seçmek. İster her hafta, ister iki haftada bir sepetiniz kapınıza gelsin.",
			},
			{
				emoji: "🛡️",
				title: "Doğal ve güvenilir üretim",
				description:
					"Pestisitsiz, %90 daha az suyla yetiştirilen yeşilliklerimiz kontrollü koşullarda üretilir ve sofranıza en yüksek tazelikle ulaşır.",
			},
			{
				emoji: "⚡",
				title: "Daha taze, daha pratik",
				description:
					"Hasat edildiği gün paketlenen yeşillikler, alışveriş zahmetini ortadan kaldırır ve sofranıza maksimum lezzetle gelir.",
			},
		],
		[],
	);

	/**
	 * Benefits data with memoization
	 */
	const benefits: Benefit[] = useMemo(
		() => [
			{
				icon: <Leaf className="w-8 h-8 text-green-600" />,
				title: "Doğal ve Organik",
				description:
					"Kapalı ortamda, hiçbir kimyasal ve pestisit kullanmadan yetiştirilen taze ürünler",
			},
			{
				icon: <Shield className="w-8 h-8 text-green-600" />,
				title: "Çevre Dostu",
				description:
					"Dikey tarım ile %97 daha az su kullanımı ve güneş enerjisi",
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
		],
		[],
	);

	/**
	 * Testimonials data with memoization
	 */
	const testimonials: Testimonial[] = useMemo(
		() => [
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
		],
		[],
	);

	/**
	 * FAQ items data with memoization
	 */
	const faqItems: FAQItem[] = useMemo(
		() => [
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
		],
		[],
	);

	/**
	 * Scroll to content handler
	 */
	const scrollToContent = useCallback(() => {
		const contentSection = document.getElementById(mainContentId);
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
	}, [mainContentId]);

	/**
	 * Navigate to product detail page
	 */
	const handleSubscribeClick = useCallback(() => {
		router.push("/abonelik/taze-yesillikler-paketi");
	}, [router]);

	// Fetch product data from API
	const fetchProduct = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await apiClient.getProductBySlug(
				"taze-yesillikler-paketi",
				{
					populate: "*",
				},
			);

			if (response.error) {
				setError(response.error.message);
				return;
			}

			if (response.data) {
				const productData = response.data as Product;
				setProduct(productData);

				// Set default subscription interval if subscription is enabled
				if (
					productData.subscription_intervals &&
					productData.subscription_intervals.length > 0
				) {
					setSelectedInterval(productData.subscription_intervals[0]);
					setPurchaseType("subscription");
				}
			}
		} catch (err) {
			setError("Ürün bilgileri yüklenirken bir hata oluştu");
			console.error("Error fetching product:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch delivery day stock
	const fetchDeliveryDayStock = useCallback(async () => {
		try {
			const response = await apiClient.getDeliveryDayStock();
			if (response.data) {
				setDeliveryDayStock(response.data);
			}
		} catch (err) {
			console.error("Error fetching delivery day stock:", err);
		}
	}, []);

	useEffect(() => {
		fetchProduct();
		fetchDeliveryDayStock();
	}, [fetchProduct, fetchDeliveryDayStock]);

	// Reset quantity when delivery day changes to prevent stock issues
	useEffect(() => {
		const dayStock = deliveryDayStock[selectedDeliveryDay] ?? 0;
		if (quantity > dayStock) {
			setQuantity(Math.min(1, dayStock));
		}
	}, [selectedDeliveryDay, deliveryDayStock, quantity]);

	// Get product images
	const getProductImages = () => {
		if (!product) return [];

		const images: string[] = [];

		// Add single image if exists
		if (product.image) {
			const imageUrl =
				typeof product.image === "string"
					? product.image
					: product.image.url ||
						product.image.formats?.large?.url ||
						product.image.formats?.medium?.url ||
						product.image.formats?.small?.url;

			if (imageUrl) {
				images.push(
					imageUrl.startsWith("http") ? imageUrl : `${API_BASE_URL}${imageUrl}`,
				);
			}
		}

		// Add multiple images if exists
		if (product.images && Array.isArray(product.images)) {
			product.images.forEach((img) => {
				const imageUrl =
					typeof img === "string"
						? img
						: img.url ||
							img.formats?.large?.url ||
							img.formats?.medium?.url ||
							img.formats?.small?.url;

				if (imageUrl) {
					images.push(
						imageUrl.startsWith("http")
							? imageUrl
							: `${API_BASE_URL}${imageUrl}`,
					);
				}
			});
		}

		return images.length > 0 ? images : ["/placeholder.svg"];
	};

	// Format price
	const formatPrice = (price: number, currency: string = "TRY") => {
		return new Intl.NumberFormat("tr-TR", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(price);
	};

	// Get current price based on selection
	const getCurrentPrice = () => {
		if (!product) return 0;

		if (purchaseType === "subscription" && selectedInterval) {
			return selectedInterval.price;
		}

		return product.sale_price || product.price;
	};

	// Get discount information
	const getDiscountInfo = () => {
		if (!product) return null;

		if (purchaseType === "subscription" && selectedInterval) {
			const originalPrice = product.price;
			const discountedPrice = selectedInterval.price;
			const discountAmount = originalPrice - discountedPrice;
			const discountPercentage = (discountAmount / originalPrice) * 100;

			return {
				hasDiscount: discountAmount > 0,
				originalPrice,
				discountedPrice,
				discountAmount,
				discountPercentage: Math.round(discountPercentage),
			};
		}

		if (product.sale_price && product.sale_price < product.price) {
			const discountAmount = product.price - product.sale_price;
			const discountPercentage = (discountAmount / product.price) * 100;

			return {
				hasDiscount: true,
				originalPrice: product.price,
				discountedPrice: product.sale_price,
				discountAmount,
				discountPercentage: Math.round(discountPercentage),
			};
		}

		return {
			hasDiscount: false,
			originalPrice: product.price,
			discountedPrice: product.price,
			discountAmount: 0,
			discountPercentage: 0,
		};
	};

	// Error state
	if (error) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center pt-24">
				<div className="text-center">
					<div className="text-red-600 mb-4">
						<X className="w-12 h-12 mx-auto" />
					</div>
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
						Bir Hata Oluştu
					</h2>
					<p className="text-base leading-relaxed mb-6">{error}</p>
					<Button
						onClick={() => window.location.reload()}
						className="bg-gray-600 hover:bg-gray-700"
					>
						Tekrar Dene
					</Button>
				</div>
			</div>
		);
	}

	// Loading state for main content
	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center pt-24">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Ürün yükleniyor...</p>
				</div>
			</div>
		);
	}

	// Error state if no product
	if (!product) {
		notFound();
	}

	const images = getProductImages();
	const discountInfo = getDiscountInfo();

	return (
		<div className="min-h-screen bg-[#DF626B] relative">
			<HeroHeader
				slides={[
					{
						title: "",
						subtitle: "",
						buttonText: "",
						buttonAction: () =>
							router.push("/abonelik/taze-yesillikler-paketi"),
						image: "/abonelik.png",
						mobileImage: "/abonelik.png",
						mobileAlt: "Abonelik hero görseli",
					},
				]}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="100vh"
			/>

			{/* Main content */}
			<main id={mainContentId} className="relative z-10 bg-[#DF626B]">
				{/* Hero Content Section */}
				<Section className="py-20 bg-[#DF626B]">
					{/* Main Hero Title */}
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-white">
							Her Hafta Taptaze Yeşillikler
							<span className="block text-white/90 font-semibold">
								Kapınızda!
							</span>
						</h1>
						<p className="text-lg leading-relaxed max-w-4xl mx-auto text-white/80">
							Skycrops abonelik sistemiyle tanışın: Şehirde yaşarken en taze, en
							lezzetli ve en sağlıklı yeşilliklere zahmetsizce ulaşmanın en
							kolay yolu.
						</p>
						<div className="mt-8">
							<Button
								onClick={() => router.push("/abonelik/taze-yesillikler-paketi")}
								className="px-10 py-4 text-lg"
							>
								Hemen Abone Ol
							</Button>
						</div>
					</div>

					{/* Subscription Package - Moved below hero title */}
					<div className="mb-16">
						<SubscriptionProductPreview
							product={product}
							loading={loading}
							selectedImage={selectedImage}
							onImageSelect={setSelectedImage}
							images={images}
							deliveryDays={deliveryDays}
							deliveryDayStock={deliveryDayStock}
							onAddToCart={() =>
								router.push("/abonelik/taze-yesillikler-paketi")
							}
						/>
					</div>

					{/* Content Grid */}
					<div className="grid lg:grid-cols-2 gap-16 items-start">
						{/* Left Column - Key Features */}
						<div className="space-y-12">
							{features.map((feature) => (
								<FeatureCard
									key={feature.title}
									emoji={feature.emoji}
									title={feature.title}
									description={feature.description}
								/>
							))}
						</div>

						{/* Right Column - Weekly Programs */}
						<div className="lg:sticky lg:top-8">
							<WeeklyProgram
								onViewPlans={() =>
									router.push("/abonelik/taze-yesillikler-paketi")
								}
							/>
						</div>
					</div>
				</Section>

				{/* Benefits Section */}
				<Section className="bg-[#DF626B]">
					<SectionHeader
						title="Neden Skycrops?"
						subtitle="Dikey tarımın avantajlarını yaşayın"
					/>
					<Grid cols={4}>
						{benefits.map((benefit, index) => (
							<BenefitCard
								key={benefit.title}
								icon={benefit.icon}
								title={benefit.title}
								description={benefit.description}
							/>
						))}
					</Grid>
				</Section>

				{/* FAQ Section */}
				<Section className="bg-[#DF626B]">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-white">
								Sıkça Sorulan Sorular
							</h2>
							<p className="text-base leading-relaxed text-white/80">
								Merak ettiklerinizin cevapları
							</p>
						</div>

						<BasicAccordion
							items={faqItems.map((item) => ({
								id: item.id,
								title: item.question,
								content: (
									<div className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
										{item.answer}
									</div>
								),
							}))}
							allowMultiple={true}
							defaultExpandedIds={[]}
							className="bg-white shadow-sm border border-gray-100"
						/>
					</div>
				</Section>

				{/* Testimonials Section */}
				<Section className="bg-[#DF626B]">
					<SectionHeader
						title="Müşteri Yorumları"
						subtitle="Mutlu müşterilerimizin deneyimleri"
					/>
					<Grid cols={4}>
						{testimonials.map((testimonial, index) => (
							<TestimonialCard
								key={testimonial.name}
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
});

Abonelik.displayName = "Abonelik";

export default Abonelik;
