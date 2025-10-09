"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useHeaderColor } from "@/hooks/use-header-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useId, useMemo } from "react";

interface ContentSectionProps {
	title: string;
	content: string | string[];
	imageSrc: string;
	imageAlt: string;
	imagePosition?: "left" | "right";
}

/**
 * Content section with image component
 */
const ContentSection = memo(function ContentSection({
	title,
	content,
	imageSrc,
	imageAlt,
	imagePosition = "right",
}: ContentSectionProps) {
	const isLeft = imagePosition === "left";
	const contentArray = Array.isArray(content) ? content : [content];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
			<div
				className={`relative ${isLeft ? "order-2 md:order-1" : "order-2 md:order-2"}`}
			>
				<Image
					src={imageSrc}
					alt={imageAlt}
					width={400}
					height={320}
					className="w-full h-64 sm:h-80 rounded-lg object-cover"
					loading="lazy"
				/>
			</div>
			<div className={isLeft ? "order-1 md:order-2" : "order-1 md:order-1"}>
				<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black">
					{title}
				</h2>
				{contentArray.map((paragraph, index) => (
					<p
						key={`${title}-${paragraph.slice(0, 20)}-${index}`}
						className="text-base leading-relaxed mb-6"
					>
						{paragraph}
					</p>
				))}
			</div>
		</div>
	);
});

interface FeatureCardProps {
	icon?: string;
	iconSrc?: string;
	iconAlt?: string;
	title: string;
	items: string[];
	bgColor: string;
}

/**
 * Feature card component
 */
const FeatureCard = memo(function FeatureCard({
	icon,
	iconSrc,
	iconAlt,
	title,
	items,
	bgColor,
}: FeatureCardProps) {
	return (
		<div className="text-center">
			<div
				className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}
			>
				{iconSrc ? (
					<Image
						src={iconSrc}
						alt={iconAlt || title}
						width={32}
						height={32}
						className="w-8 h-8 object-contain"
						unoptimized
					/>
				) : (
					<span className="text-2xl">{icon}</span>
				)}
			</div>
			<h3 className="text-2xl md:text-3xl font-semibold leading-snug mb-4 text-black">
				{title}
			</h3>
			<ul className="text-base leading-relaxed space-y-2 text-left">
				{items.map((item, index) => (
					<li key={`${title}-${item.slice(0, 20)}-${index}`}>{item}</li>
				))}
			</ul>
		</div>
	);
});

/**
 * Hakkimizda (About) page component
 * Features:
 * - Hero section with transparent navigation
 * - Mission and vision statements
 * - Feature cards for vertical farming benefits
 * - Content sections with images
 * - Responsive layout
 */
const Hakkimizda = memo(function Hakkimizda() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set header color for about page
	useHeaderColor("#DC4F34");

	// Set footer color to match page background
	useFooterColorSetter("#DC4F34");

	const mainContentId = useId();

	/**
	 * Scroll to main content section
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
	 * Hero slides configuration
	 */
	const heroSlides = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "",
				image: "/hakkimizda.png",
				mobileImage: "/hakkimizda_mobile.svg",
				mobileAlt: "Skycrops'ın Hakkımızda sayfası mobil görseli",
			},
		],
		[],
	);

	/**
	 * Feature cards data
	 */
	const featureCards = useMemo(
		() => [
			{
				iconSrc: "/urun_kalitesi.svg",
				iconAlt: "Ürün Kalitesi",
				title: "Ürün Kalitesi",
				bgColor: "bg-green-100",
				items: [
					"• Daha sağlıklı: Pestisitsiz ve güvenilir üretim",
					"• Daha taze: Hasat edildiği gün sofrada",
					"• Daha lezzetli: Yüksek besin değerini korur",
				],
			},
			{
				iconSrc: "/cevre_dostu.svg",
				iconAlt: "Çevre Dostu",
				title: "Çevre Dostu",
				bgColor: "bg-green-100",
				items: [
					"• Daha az su tüketimi: Klasik tarıma göre %90 su tasarrufu",
					"• Daha düşük karbon ayak izi: Şehir içi üretim ile daha az lojistik ve karbon ayak izi",
				],
			},
			{
				iconSrc: "/gelecegin_tarimi.svg",
				iconAlt: "Geleceğin Tarımı",
				title: "Geleceğin Tarımı",
				bgColor: "bg-purple-100",
				items: [
					"• Gıda güvenliği: İklim krizine ve artan nüfusa karşı sürdürülebilir çözüm",
					"• Her zaman, her yerde üretim: Her mevsim ve her şehirde kontrollü koşullarda yetiştirme",
					"• Yüksek verim & tam izlenebilirlik: Modern teknolojilerle güvenilir üretim",
				],
			},
		],
		[],
	);

	return (
		<div className="min-h-screen relative bg-[#DC4F34]">
			{/* Hero Section */}
			<HeroHeader
				slides={heroSlides}
				singleImage={true}
				showDots={false}
				customHeight="100vh"
				mediaFit="contain"
				backgroundColor="#DC4F34"
			/>

			{/* Main Content */}
			<main
				id={mainContentId}
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-8 sm:mb-12">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-black">
							Hakkımızda
						</h1>
					</div>

					{/* Misyonumuz Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<div className="mb-12 sm:mb-16">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black text-center">
								Misyonumuz
							</h2>
							<p className="text-lg leading-relaxed mb-8 text-center max-w-4xl mx-auto">
								Skycrops olarak misyonumuz; doğaya ve insana saygılı, en yüksek
								besin değerine ve tazeliğe sahip yeşillikleri yılın her günü
								tüketicilerle buluşturmaktır. Türkiye'de geliştirdiğimiz
								yenilikçi dikey tarım teknolojileri sayesinde suyu, enerjiyi ve
								alanı verimli kullanarak sürdürülebilir gıda üretimini mümkün
								kılıyoruz. Amacımız; sağlıklı, pestisitsiz ve güvenilir ürünler
								sunarken aynı zamanda geleceğin tarım modellerine öncülük
								etmektir.
							</p>
						</div>
					</div>

					{/* Vizyonumuz Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<div className="mb-12 sm:mb-16">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black text-center">
								Vizyonumuz
							</h2>
							<p className="text-lg leading-relaxed mb-8 text-center max-w-4xl mx-auto">
								Skycrops olarak vizyonumuz; sürdürülebilir tarımda Türkiye'den
								dünyaya uzanan bir öncü olmak, gıda güvenliğini artıran
								yenilikçi çözümler üretmek ve geleceğin şehirlerinde sağlıklı
								yaşamın kaynağı haline gelmektir. Amacımız, dikey tarım
								teknolojilerini sürekli geliştirerek hem ülkemizde hem de global
								ölçekte insanlara daha sağlıklı, güvenilir ve erişilebilir
								ürünler sunmaktır.
							</p>
						</div>
					</div>

					{/* Neden Dikey Tarım Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<div className="mb-12 sm:mb-16">
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black text-center">
								Neden Dikey Tarım
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
								{featureCards.map((card) => (
									<FeatureCard
										key={card.title}
										title={card.title}
										items={card.items}
										bgColor={card.bgColor}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Yaşayan Sebzeler Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<ContentSection
							title="Yaşayan Sebzeler"
							content={[
								"Skycrops, sağlıklı yaşamın ve taze lezzetlerin kapılarını aralayan bir dikey tarım tesisi. Doğallıktan uzaklaşmadan, kapalı ortamda, dış dünyanın negatif etkilerinden uzakta üretilen besleyici yeşilliklerimiz, sofralarınıza lezzet ve tazelik getiriyor.",
								"Geleceğin tarım yöntemlerini bugün uygulayarak, sizleri sağlıklı bir yaşam için doğal ve taze alternatiflerle buluşturmayı hedefliyor. Sağlıklı yaşamın anahtarı, Skycrops'un yeşilliklerinde gizli.",
							]}
							imageSrc="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
							imageAlt="Modern sera tarımı"
							imagePosition="right"
						/>
					</div>

					{/* Taze, Sağlıklı Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<ContentSection
							title="Taze, Sağlıklı"
							content="Şehir içi sağlıklı tarım modeliyle üretimde ürünler uzun nakliye sürecinde kalmak, soğuk hava depolarına girmek yerine hasat edildikten kısa süre sonra sofralara ulaşır. Temiz bir ortamda suda büyüyen ürünler toz, toprak ve zararlılara maruz kalmaz. Temizlenmesi zahmetsizdir."
							imageSrc="/organic-farming-greenhouse-vegetables.png"
							imageAlt="Organik tarım"
							imagePosition="left"
						/>
					</div>

					{/* Güvenli Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<ContentSection
							title="Güvenli"
							content="Skycrops'ta ürünleri dış dünyanın negatif etkilerine kapalı üretim ortamında, optimum koşullarda gerçekleştirdiğimiz için hiç bir tarımsal ilaç ve hormon kullanmıyoruz. Özenle seçtiğimiz tohumlardan filizlendirdiğimiz bitkiler büyümeleri için gerekli besinler dışında hiçbir yabancı maddeye maruz kalmadan sağlıkla büyüyor. Bu yüzden Skycrops'ta yetişen ürünler tamamıyla güvenli!"
							imageSrc="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
							imageAlt="Modern sera tarımı"
							imagePosition="right"
						/>
					</div>

					{/* Lezzetli Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<ContentSection
							title="Lezzetli"
							content="Skycrops'ta bitkiler biyolojilerine en uygun koşullarda yetişir. İhtiyaçları olan besinleri, doğru ısı, nem ve ışık yoğunluğunda alırlar. Skycrops olarak birinci önceliğimiz mutlu bitkiler yetiştirmek. Tohumlarını özenle seçip, özenle yetiştirdiğimiz ürünler; seçkin restoran ve şefler tarafından tercih edilen, dünya genelinde en çok beğenilen ve keyifle tüketilen türlerdir."
							imageSrc="/organic-farming-greenhouse-vegetables.png"
							imageAlt="Organik tarım"
							imagePosition="left"
						/>
					</div>

					{/* Çevre Dostu Section */}
					<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow mb-8">
						<ContentSection
							title="Çevre Dostu"
							content="Skycrops'ta en büyük önceliğimiz doğaya saygı ve sürdürülebilirlik. Geleneksel tarım yöntemlerine göre %90'a varan oranlarda daha az su tüketiyoruz. Gelişmiş enerji yönetim teknolojileri sayesinde verimliğimiz dünya standartlarının üzerinde. Gübre ve pestisitlerle toprağı kirletmiyoruz."
							imageSrc="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
							imageAlt="Modern sera tarımı"
							imagePosition="right"
						/>
					</div>
				</div>
			</main>
		</div>
	);
});

export default Hakkimizda;
