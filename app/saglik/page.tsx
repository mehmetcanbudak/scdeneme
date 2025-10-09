"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import type { LucideIcon } from "lucide-react";
import {
	Apple,
	Award,
	Clock,
	Droplets,
	Heart,
	Leaf,
	Shield,
	Sun,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";

/**
 * Health benefit card data interface
 */
interface HealthBenefit {
	title: string;
	description: string;
	icon: LucideIcon;
	color: string;
	iconColor: string;
}

/**
 * Nutrition fact data interface
 */
interface NutritionFact {
	product: string;
	vitaminC: string;
	fiber: string;
	potassium: string;
	calories: string;
}

/**
 * Health tip item interface
 */
interface TipItem {
	icon: LucideIcon;
	text: string;
	iconColor: string;
}

/**
 * BenefitCard component - Displays a health benefit with icon and description
 */
const BenefitCard = React.memo<{ benefit: HealthBenefit; index: number }>(
	({ benefit }) => {
		const IconComponent = benefit.icon;
		return (
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
				<div className="flex items-start space-x-4">
					<div
						className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}
					>
						<IconComponent className={`w-6 h-6 ${benefit.iconColor}`} />
					</div>
					<div>
						<h3 className="text-xl font-semibold mb-3 text-gray-800">
							{benefit.title}
						</h3>
						<p className="text-gray-600 leading-relaxed">
							{benefit.description}
						</p>
					</div>
				</div>
			</div>
		);
	},
);
BenefitCard.displayName = "BenefitCard";

/**
 * NutritionCard component - Displays nutrition facts for a product
 */
const NutritionCard = React.memo<{ fact: NutritionFact }>(({ fact }) => {
	return (
		<div className="bg-white rounded-lg p-6 text-center shadow-sm">
			<h3 className="text-lg font-semibold mb-4 text-gray-800">
				{fact.product}
			</h3>
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
	);
});
NutritionCard.displayName = "NutritionCard";

/**
 * TipListItem component - Displays a single health tip with icon
 */
const TipListItem = React.memo<{ tip: TipItem }>(({ tip }) => {
	const IconComponent = tip.icon;
	return (
		<li className="flex items-center">
			<IconComponent className={`w-4 h-4 mr-2 ${tip.iconColor}`} />
			{tip.text}
		</li>
	);
});
TipListItem.displayName = "TipListItem";

/**
 * Saglik page component - Health benefits and nutrition information page
 */
export default function Saglik() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	/**
	 * Scrolls smoothly to the main content section
	 */
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

	/**
	 * Hero slides configuration
	 */
	const heroSlides = useMemo(
		() => [
			{
				title: "",
				subtitle: "",
				buttonText: "",
				image: "/fresh-mixed-vegetables-display.png",
				mobileImage: "/fresh-mixed-vegetables-display.png",
				mobileAlt: "Sağlık hero görseli",
			},
		],
		[],
	);

	/**
	 * Health benefits data array
	 */
	const healthBenefits = useMemo<HealthBenefit[]>(
		() => [
			{
				title: "Vitamin ve Mineral Deposu",
				description:
					"Organik ürünlerimiz, doğal yollarla yetiştirildiği için vitamin ve mineral açısından zengindir. Özellikle C vitamini, potasyum ve antioksidanlar bakımından yüksek değerlere sahiptir.",
				icon: Apple,
				color: "bg-red-100",
				iconColor: "text-red-600",
			},
			{
				title: "Antioksidan Zengini",
				description:
					"Pestisit kullanılmadan yetiştirilen meyvelerimiz, doğal antioksidanlar açısından zengindir. Bu antioksidanlar vücudunuzu serbest radikallerden korur ve yaşlanma sürecini yavaşlatır.",
				icon: Shield,
				color: "bg-green-100",
				iconColor: "text-green-600",
			},
			{
				title: "Doğal Enerji Kaynağı",
				description:
					"Organik meyveler, doğal şekerler ve kompleks karbonhidratlar içerir. Bu sayede uzun süreli enerji sağlar ve kan şekerinizi dengede tutar.",
				icon: Zap,
				color: "bg-yellow-100",
				iconColor: "text-yellow-600",
			},
			{
				title: "Bağışıklık Sistemi Güçlendirici",
				description:
					"C vitamini ve diğer besin maddeleri açısından zengin olan ürünlerimiz, bağışıklık sisteminizi güçlendirir ve hastalıklara karşı koruma sağlar.",
				icon: Heart,
				color: "bg-pink-100",
				iconColor: "text-pink-600",
			},
		],
		[],
	);

	/**
	 * Nutrition facts data array
	 */
	const nutritionFacts = useMemo<NutritionFact[]>(
		() => [
			{
				product: "Portakal",
				vitaminC: "53.2 mg",
				fiber: "2.4 g",
				potassium: "181 mg",
				calories: "47 kcal",
			},
			{
				product: "Mandalina",
				vitaminC: "26.7 mg",
				fiber: "1.8 g",
				potassium: "166 mg",
				calories: "53 kcal",
			},
			{
				product: "Limon",
				vitaminC: "29.1 mg",
				fiber: "2.8 g",
				potassium: "138 mg",
				calories: "29 kcal",
			},
			{
				product: "Avokado",
				vitaminC: "10.0 mg",
				fiber: "6.7 g",
				potassium: "485 mg",
				calories: "160 kcal",
			},
		],
		[],
	);

	/**
	 * Morning health tips
	 */
	const morningTips = useMemo<TipItem[]>(
		() => [
			{
				icon: Clock,
				text: "Sabah aç karnına bir bardak ılık su için",
				iconColor: "text-green-600",
			},
			{
				icon: Apple,
				text: "Kahvaltıda taze meyve tüketin",
				iconColor: "text-green-600",
			},
			{
				icon: Leaf,
				text: "Yeşil yapraklı sebzeleri günlük menünüze ekleyin",
				iconColor: "text-green-600",
			},
		],
		[],
	);

	/**
	 * Daily health tips
	 */
	const dailyTips = useMemo<TipItem[]>(
		() => [
			{
				icon: Droplets,
				text: "Günde en az 8 bardak su için",
				iconColor: "text-green-600",
			},
			{
				icon: Sun,
				text: "Güneş ışığından yararlanın",
				iconColor: "text-yellow-600",
			},
			{
				icon: Heart,
				text: "Düzenli egzersiz yapın",
				iconColor: "text-red-600",
			},
		],
		[],
	);

	return (
		<div className="min-h-screen bg-white relative">
			{/* Navigation is now handled by the shared Navigation component */}

			<HeroHeader
				slides={heroSlides}
				singleImage={true}
				showDots={false}
				customHeight="100vh"
			/>

			<main
				id="main-content"
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-white"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-gray-800">
							Sağlık
						</h1>
						<p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
							Organik tarımın sağlığınıza faydaları ve beslenme değerleri
							hakkında detaylı bilgi edinin
						</p>
					</div>

					{/* Health Benefits Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Organik Ürünlerin Sağlık Faydaları
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
							{healthBenefits.map((benefit, index) => (
								<BenefitCard key={index} benefit={benefit} index={index} />
							))}
						</div>
					</div>

					{/* Nutrition Facts Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Beslenme Değerleri
						</h2>

						<div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-4 sm:p-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
								{nutritionFacts.map((fact, index) => (
									<NutritionCard key={index} fact={fact} />
								))}
							</div>
						</div>
					</div>

					{/* Why Choose Organic Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Neden Organik Ürün Seçmelisiniz?
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Leaf className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Doğal Yetiştirme
								</h3>
								<p className="text-gray-600 text-sm">
									Kimyasal gübre ve pestisit kullanılmadan, doğal yöntemlerle
									yetiştirilir
								</p>
							</div>

							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Users className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Çiftçi Sağlığı
								</h3>
								<p className="text-gray-600 text-sm">
									Zararlı kimyasallara maruz kalmayan çiftçiler tarafından
									üretilir
								</p>
							</div>

							<div className="text-center">
								<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Award className="w-8 h-8 text-yellow-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Kalite Garantisi
								</h3>
								<p className="text-gray-600 text-sm">
									Sertifikalı organik üretim standartlarına uygun kalite
								</p>
							</div>
						</div>
					</div>

					{/* Daily Health Tips */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Günlük Sağlık İpuçları
						</h2>

						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
								<div>
									<h3 className="text-xl font-semibold mb-4 text-gray-800">
										Güne Başlarken
									</h3>
									<ul className="space-y-2 text-gray-600">
										{morningTips.map((tip, index) => (
											<TipListItem key={index} tip={tip} />
										))}
									</ul>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-4 text-gray-800">
										Gün Boyunca
									</h3>
									<ul className="space-y-2 text-gray-600">
										{dailyTips.map((tip, index) => (
											<TipListItem key={index} tip={tip} />
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Call to Action */}
					<div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-6 sm:p-8 text-white text-center">
						<h2 className="text-2xl sm:text-3xl font-light mb-6">
							Sağlıklı Yaşam İçin Hemen Başlayın
						</h2>
						<p className="text-base sm:text-lg mb-6 opacity-90 max-w-3xl mx-auto">
							Organik ürünlerimizle sağlıklı beslenme alışkanlığı kazanın.
							Dalından taze, pestisitsiz ve doğal ürünlerimizi deneyin.
						</p>
						<div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
							<Link href="/abonelik">
								<Button
									variant="inverseOutline"
									className="text-white w-full sm:w-auto"
								>
									<Apple className="w-4 h-4 mr-2" />
									Ürünleri İncele
								</Button>
							</Link>
							<Link href="/abonelik">
								<Button
									variant="inverseOutline"
									className="text-white w-full sm:w-auto"
								>
									<Heart className="w-4 h-4 mr-2" />
									Abone Ol
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
