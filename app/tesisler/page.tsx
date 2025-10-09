"use client";

import HeroHeader from "@/components/hero-header";
import { useFooterColorSetter } from "@/hooks/use-footer-color";
import { useHeaderColor } from "@/hooks/use-header-color";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import type React from "react";
import { memo, useCallback, useId, useMemo } from "react";

interface FacilityFeature {
	icon?: React.ReactNode;
	title: string;
	description: string;
	content: Array<{
		subtitle: string;
		text: string;
	}>;
	conclusion?: string;
}

interface FacilityFeatureCardProps {
	feature: FacilityFeature;
}

/**
 * Facility feature card component
 */
const FacilityFeatureCard = memo(function FacilityFeatureCard({
	feature,
}: FacilityFeatureCardProps) {
	return (
		<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-6 sm:p-8 hover:shadow-md transition-shadow">
			<div className="flex items-start gap-4 mb-6">
				{feature.icon && <div className="flex-shrink-0">{feature.icon}</div>}
				<div>
					<h3 className="text-2xl md:text-3xl font-semibold leading-snug mb-3 text-gray-800">
						{feature.title}
					</h3>
					<p className="text-base leading-relaxed">{feature.description}</p>
				</div>
			</div>
			<div className={`space-y-6 ${feature.icon ? "ml-0 sm:ml-12" : ""}`}>
				{feature.content.map((item, idx) => (
					<div
						key={`${item.subtitle}-${idx}`}
						className="border-l-2 border-gray-200 pl-4"
					>
						<h4 className="text-xl md:text-2xl font-medium leading-snug mb-2">
							{item.subtitle}:
						</h4>
						<p className="text-base leading-relaxed">{item.text}</p>
					</div>
				))}
				{feature.conclusion && (
					<div className="mt-6">
						<p className="text-base leading-relaxed">{feature.conclusion}</p>
					</div>
				)}
			</div>
		</div>
	);
});

/**
 * Tesisler (Facilities) page component
 * Features:
 * - Hero section with transparent navigation
 * - Detailed facility information
 * - Responsive layout
 * - Memoized components for performance
 */
export default function Tesisler() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set header color for facilities page
	useHeaderColor("#F1C2C4");

	// Set footer color to match page background
	useFooterColorSetter("#F1C2C4");

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
	 * Facility features data
	 */
	const facilityFeatures = useMemo<FacilityFeature[]>(
		() => [
			{
				title: "1. Sürdürülebilir ve İlaçsız Üretim Yöntemleri",
				description:
					"Geleceğin tarımını inşa ederken, doğaya ve insan sağlığına verdiğimiz değeri üretimimizin her aşamasında gösteriyoruz.",
				content: [
					{
						subtitle: "Pestisitsiz Üretim",
						text: "Ürünlerimizin hiçbir aşamasında pestisit kullanılmamaktadır. Üretim alanımıza bir ameliyathane titizliğiyle yaklaşarak zararlı böcek ve hastalıkların tesise girişini tamamen engelliyoruz.",
					},
					{
						subtitle: "İyi Tarım Uygulamaları",
						text: "Türkiye'nin ilk İyi Tarım Uygulamaları (İTU) belgesi alan dikey tarım tesisi olmanın gururunu yaşıyoruz. Bu belge, üretim süreçlerimizin ulusal standartlara uygunluğunu ve gıda güvenliğini garanti eder.",
					},
					{
						subtitle: "Özel Besin Çözeltisi",
						text: "Bitkilerin büyümesi için gerekli olan tüm makro ve mikro elementleri bir araya getirerek her ürün grubuna özel besin çözeltileri hazırlıyoruz. Besinlerimizi kendimiz formüle etmemiz bitkilerin doğal gelişimini desteklerken ürünlerimizde hiçbir kimyasal kullanılmamasını sağlıyor.",
					},
				],
			},
			{
				title: "2. Akıllı ve Yüksek Teknolojili Üretim",
				description:
					"Dikey tarım tesisimiz, dünyanın en gelişmiş iklim kontrollü üretim alanları arasında yer almaktadır. Çok katlı hidroponik sistemler ile kaynakları verimli kullanıyor ve maksimum verim elde ediyoruz.",
				content: [
					{
						subtitle: "Gelişmiş Teknoloji",
						text: "Fide dolaplarımız sayesinde üretim süreçlerimizi tohumdan hasada kadar tesisimizde yönetiyoruz. Bu durum her bitkinin en hassas gelişim aşamalarında bile optimum koşullara sahip olmasını sağlıyor.",
					},
					{
						subtitle: "Akıllı Sistemler",
						text: "Büyüme sürecini optimize eden özel LED aydınlatmalar, ideal ortamı sağlayan akıllı iklimlendirme ve iklim kontrol sistemleri, besin çözeltilerini ve pH dengesini otomatik yöneten gelişmiş besleme teknolojileri tesisimizin temel bileşenlerindendir.",
					},
					{
						subtitle: "Bulut Tabanlı Yönetim",
						text: "Bulut tabanlı yazılımımız sayesinde tesis uzaktan izlenip yönetilebilmektedir. Akıllı sensörler nem, sıcaklık, CO₂ ve besin değerlerini sürekli takip eder; bu veriler doğrultusunda alınan kararlarla süreçler optimize edilir.",
					},
				],
				conclusion:
					"Tüm bu teknolojiler sayesinde bitkilerimizin her gelişim evresinde en sevdikleri koşulları oluşturarak, en yüksek tazelik ve besin değerine ulaşmalarını sağlıyoruz.",
			},
			{
				title: "3. Üretim ve Lojistik Alanımız",
				description:
					"Şehir merkezine yakın konumumuz, ürünlerin tazeliğini koruyarak sofralarınıza en hızlı şekilde ulaşmasını sağlar.",
				content: [
					{
						subtitle: "Üretim Alanı",
						text: "650 m² net üretim alanında, 84 adet 8 katlı dikey tarım ünitesi ile yıl boyunca kesintisiz üretim ve hasat yapıyoruz.",
					},
					{
						subtitle: "Hijyenik Paketleme ve Sevkiyat",
						text: "Üretim alanıyla entegre paketleme bölümümüz ürünlerin taze ve hızlı bir şekilde sevkiyatını mümkün kılar.",
					},
				],
			},
			{
				title: "4. Çevre Dostu ve Sürdürülebilir Yaklaşım",
				description:
					"Sürdürülebilirlik ilkemiz tesisimizin her detayında kendini gösterir.",
				content: [
					{
						subtitle: "Su Tasarrufu",
						text: "Geleneksel tarıma göre %90 daha az su tüketerek su kaynaklarının korunmasına büyük katkı sağlıyoruz.",
					},
					{
						subtitle: "Atık Yönetimi",
						text: "Üretim sürecinde çıkan tüm bitkisel atıkları çevremizdeki hayvan çiftlikleriyle paylaşarak döngüsel ekonomiye katkıda bulunuyoruz.",
					},
				],
			},
		],
		[],
	);

	/**
	 * Hero slides configuration
	 */
	const heroSlides = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "",
				image: "/tesisler.png",
				mobileImage: "/tesisler.png",
				mobileAlt: "Tesislerimiz hero görseli",
			},
		],
		[],
	);

	return (
		<div className="min-h-screen bg-[#F1C2C4] relative">
			{/* Hero Section */}
			<HeroHeader
				slides={heroSlides}
				singleImage={true}
				showDots={false}
				showButton={false}
				customHeight="100vh"
			/>

			{/* Main Content */}
			<main
				id={mainContentId}
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F1C2C4]"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
							Tesisimiz
						</h1>
						<p className="text-lg leading-relaxed max-w-3xl mx-auto mb-4">
							Teknolojik, Sürdürülebilir ve Güvenli Üretim
						</p>
						<p className="text-base leading-relaxed max-w-4xl mx-auto">
							Tarımın köklü yöntemlerini geleceğin teknolojileriyle
							harmanlayarak sürdürülebilir gıda üretiminde yeni bir model
							oluşturuyoruz. Tohumdan sofraya tüm üretim süreçlerini kendi
							bünyesinde yöneten tam entegre dikey tarım tesisimiz, kaynakları
							en verimli şekilde kullanırken yüksek kalite ve gıda güvenliği
							standartlarını bir araya getiriyor.
						</p>
					</div>

					{/* Facility Features */}
					<div className="space-y-8 mb-12">
						{facilityFeatures.map((feature, index) => (
							<FacilityFeatureCard
								key={`${feature.title}-${index}`}
								feature={feature}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
