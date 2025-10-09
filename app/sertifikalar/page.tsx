"use client";

import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import {
	Award,
	Bug,
	Droplets,
	FileText,
	Shield,
	Sprout,
	Sun,
	Trees,
} from "lucide-react";
import React, { useCallback, useMemo } from "react";

/**
 * Sustainable practice card data interface
 */
interface PracticeData {
	icon: React.ReactNode;
	title: string;
	description: string;
	features: string[];
}

/**
 * Certificate card data interface
 */
interface CertificateData {
	title: string;
	description: string;
}

/**
 * Analysis report card data interface
 */
interface AnalysisReportData {
	title: string;
	description: string;
}

/**
 * PracticeCard component - Displays a sustainable practice with features
 */
const PracticeCard = React.memo<{ practice: PracticeData }>(({ practice }) => {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-start space-x-4">
				<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
					{practice.icon}
				</div>
				<div>
					<h3 className="text-xl font-semibold mb-3 text-gray-800">
						{practice.title}
					</h3>
					<p className="text-gray-600 mb-4">{practice.description}</p>
					<ul className="text-sm text-gray-600 space-y-2">
						{practice.features.map((feature, idx) => (
							<li key={idx}>• {feature}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
});
PracticeCard.displayName = "PracticeCard";

/**
 * CertificateCard component - Displays a certificate with image placeholder
 */
const CertificateCard = React.memo<{
	certificate: CertificateData;
	onView: () => void;
}>(({ certificate, onView }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
			<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
				<div className="text-center p-4">
					<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
					<p className="text-sm text-gray-500">Sertifika Görseli</p>
				</div>
			</div>
			<div className="p-6">
				<h3 className="font-semibold text-lg mb-2 text-gray-800">
					{certificate.title}
				</h3>
				<p className="text-gray-600 text-sm mb-4">{certificate.description}</p>
				<Button className="w-full" onClick={onView}>
					<FileText className="w-4 h-4 mr-2" />
					İncele
				</Button>
			</div>
		</div>
	);
});
CertificateCard.displayName = "CertificateCard";

/**
 * AnalysisReportCard component - Displays an analysis report
 */
const AnalysisReportCard = React.memo<{
	report: AnalysisReportData;
	onView: () => void;
}>(({ report, onView }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
			<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
				<div className="text-center p-4">
					<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
					<p className="text-sm text-gray-500">Analiz Raporu</p>
				</div>
			</div>
			<div className="p-6">
				<h3 className="font-semibold text-lg mb-2 text-gray-800">
					{report.title}
				</h3>
				<p className="text-gray-600 text-sm mb-4">{report.description}</p>
				<Button className="w-full" onClick={onView}>
					<FileText className="w-4 h-4 mr-2" />
					İncele
				</Button>
			</div>
		</div>
	);
});
AnalysisReportCard.displayName = "AnalysisReportCard";

/**
 * Sertifikalar page component - Certificates and analysis reports page
 */
export default function Sertifikalar() {
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
	 * Handles certificate view button click
	 */
	const handleViewCertificate = useCallback(() => {
		// Placeholder for certificate view logic
		console.log("View certificate");
	}, []);

	/**
	 * Handles analysis report view button click
	 */
	const handleViewReport = useCallback(() => {
		// Placeholder for report view logic
		console.log("View report");
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
				image: "/iso.png",
				mobileImage: "/iso.png",
				mobileAlt: "Sertifikalar hero görseli",
			},
		],
		[],
	);

	/**
	 * Sustainable practices data array
	 */
	const sustainablePractices = useMemo<PracticeData[]>(
		() => [
			{
				icon: <Bug className="w-6 h-6 text-green-600" />,
				title: "Biyolojik Mücadele",
				description:
					"Zararlı böceklerle mücadelede kimyasal pestisitler yerine doğal yöntemler kullanıyoruz. Faydalı böcekler, doğal düşmanlar ve biyolojik preparatlar ile ekosistem dengesini koruyoruz.",
				features: [
					"Faydalı böcek salımı (parazitoid ve predatör)",
					"Feromon tuzakları ile zararlı popülasyon kontrolü",
					"Doğal bitki ekstraktları kullanımı",
					"Biyolojik mücadele ajanları",
				],
			},
			{
				icon: <Award className="w-6 h-6 text-green-600" />,
				title: "İyi Tarım Uygulamaları",
				description:
					"Global Gap standartlarına uygun olarak, çevre dostu ve sürdürülebilir tarım yöntemleri uyguluyoruz. Her aşamada kalite kontrolü yaparak güvenli gıda üretimi sağlıyoruz.",
				features: [
					"Toprak sağlığı ve verimlilik yönetimi",
					"Su kaynaklarının verimli kullanımı",
					"İşçi sağlığı ve güvenliği",
					"Ürün izlenebilirliği",
				],
			},
			{
				icon: <Shield className="w-6 h-6 text-yellow-600" />,
				title: "Pestisitsiz Üretim",
				description:
					"Kimyasal pestisit kullanmadan, doğal yöntemlerle üretim yapıyoruz. Ürünlerimiz hiçbir işleme tabi tutulmadan, dalından taze olarak gönderiliyor.",
				features: [
					"Sıfır kimyasal pestisit kullanımı",
					"Doğal büyüme ve olgunlaşma",
					"Mumlama ve koruyucu işlem yok",
					"Dalından taze gönderim",
				],
			},
			{
				icon: <Droplets className="w-6 h-6 text-green-600" />,
				title: "Su Yönetimi",
				description:
					"Su kaynaklarını verimli kullanarak, damla sulama sistemleri ile su tasarrufu sağlıyoruz. Su kalitesi sürekli olarak izlenmekte ve analiz edilmektedir.",
				features: [
					"Damla sulama sistemleri",
					"Su tasarrufu teknolojileri",
					"Su kalitesi analizi",
					"Yağmur suyu toplama",
				],
			},
		],
		[],
	);

	/**
	 * Certificates data array
	 */
	const certificates = useMemo<CertificateData[]>(
		() => [
			{
				title: "Global Gap Sertifikası",
				description:
					"Uluslararası kalite standartları onaylı üretim sertifikası",
			},
			{
				title: "İyi Tarım Uygulamaları",
				description: "Tarım ve Orman Bakanlığı onaylı iyi tarım sertifikası",
			},
			{
				title: "Organik Tarım Sertifikası",
				description: "Organik üretim standartlarına uygunluk belgesi",
			},
			{
				title: "HACCP Sertifikası",
				description: "Gıda güvenliği yönetim sistemi belgesi",
			},
			{
				title: "ISO 22000 Sertifikası",
				description: "Gıda güvenliği yönetim sistemi standardı",
			},
			{
				title: "TSE Sertifikası",
				description: "Türk Standartları Enstitüsü kalite belgesi",
			},
		],
		[],
	);

	/**
	 * Analysis reports data array
	 */
	const analysisReports = useMemo<AnalysisReportData[]>(
		() => [
			{
				title: "Portakal Analiz Raporu",
				description: "Portakal ürünlerimizin detaylı analiz sonuçları",
			},
			{
				title: "Mandalina Analiz Raporu",
				description: "Mandalina ürünlerimizin detaylı analiz sonuçları",
			},
			{
				title: "Limon Analiz Raporu",
				description: "Limon ürünlerimizin detaylı analiz sonuçları",
			},
			{
				title: "Avokado Analiz Raporu",
				description: "Avokado ürünlerimizin detaylı analiz sonuçları",
			},
			{
				title: "Nar Analiz Raporu",
				description: "Nar ürünlerimizin detaylı analiz sonuçları",
			},
			{
				title: "Greyfurt Analiz Raporu",
				description: "Greyfurt ürünlerimizin detaylı analiz sonuçları",
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
							Sertifikalar ve Analizler
						</h1>
						<p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
							İçiniz rahat olsun, meyvemiz temiz, kontrolümüz altında
						</p>
					</div>

					{/* Quality Assurance Section */}
					<div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-8 mb-16">
						<div className="grid md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Bug className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Biyolojik Mücadele
								</h3>
								<p className="text-gray-600 text-sm">
									Zararlılarla biyolojik mücadele yöntemleri kullanarak doğal
									üretim
								</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Award className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									İyi Tarım Uygulamaları
								</h3>
								<p className="text-gray-600 text-sm">
									Global Gap sertifikaları ile onaylanmış kalite standartları
								</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="w-8 h-8 text-yellow-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Pestisitsiz Üretim
								</h3>
								<p className="text-gray-600 text-sm">
									Hiçbir işleme tabi tutulmadan dalından taze gönderim
								</p>
							</div>
						</div>
					</div>

					{/* Enhanced Description Section */}
					<div className="text-center mb-16">
						<div className="max-w-4xl mx-auto">
							<p className="text-lg text-gray-700 leading-relaxed mb-6">
								Zararlılarla biyolojik mücadele, iyi tarım uygulamaları, Global
								Gap sertifikaları ve Skycrops'in üretim anlayışıyla;
								meyvelerinizi mevsiminde dalından toplayıp, mumlama yapmadan,
								hiç bir işleme tabi tutmadan gönderiyoruz. Kendi bahçenizdeki
								meyve ağaçlarından, dalından koparıp yercesine taze haliyle size
								ulaştırmak için çok emek veriyoruz.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed mb-6">
								Pestisitsiz, iyi tarım uygulamaları ve biyolojik mücadele
								uygulamalarıyla yetiştirdiğimiz, dalında olgunlaştığı haliyle
								toplanıp paketlenen meyvelerimizin, iç rahatlığıyla kabuğundan
								çekirdeğine kadar her dilimin tadını çıkarın.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed">
								Sertifikalarımız ve üretim süreçlerimiz hakkında daha fazla
								bilgi almak için aşağıdaki belgelerimizi inceleyebilirsiniz.
							</p>
						</div>
					</div>

					{/* Sustainable Practices Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Sürdürülebilir Tarım Uygulamalarımız
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
							{sustainablePractices.map((practice, index) => (
								<PracticeCard key={index} practice={practice} />
							))}
						</div>
					</div>

					{/* Certificates Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							2024-2025 Üretim Sezonu
							<br />
							<span className="text-2xl">Analiz Raporları ve Belgelerimiz</span>
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{certificates.map((certificate, index) => (
								<CertificateCard
									key={index}
									certificate={certificate}
									onView={handleViewCertificate}
								/>
							))}
						</div>
					</div>

					{/* Analysis Reports Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Ürün Analiz Raporları
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{analysisReports.map((report, index) => (
								<AnalysisReportCard
									key={index}
									report={report}
									onView={handleViewReport}
								/>
							))}
						</div>
					</div>

					{/* Environmental Impact Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Çevresel Etki ve Sürdürülebilirlik
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Trees className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Biyoçeşitlilik
								</h3>
								<p className="text-gray-600 text-sm">
									Doğal ekosistemleri koruyarak biyoçeşitliliği destekliyoruz
								</p>
							</div>

							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Sun className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Güneş Enerjisi
								</h3>
								<p className="text-gray-600 text-sm">
									Tesislerimizde yenilenebilir enerji kaynakları kullanıyoruz
								</p>
							</div>

							<div className="text-center">
								<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Sprout className="w-8 h-8 text-yellow-600" />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-800">
									Toprak Sağlığı
								</h3>
								<p className="text-gray-600 text-sm">
									Organik gübreler ile toprak verimliliğini artırıyoruz
								</p>
							</div>
						</div>
					</div>

					{/* Quality Commitment Section */}
					<div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-8 text-white text-center">
						<h2 className="text-3xl font-light mb-6">Kalite Taahhüdümüz</h2>
						<p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
							Skycrops olarak, müşterilerimize en yüksek kalitede ürün sunmak
							için sürekli olarak kendimizi geliştiriyor ve en güncel kalite
							standartlarını takip ediyoruz. Tüm üretim süreçlerimiz
							uluslararası standartlarda belgelendirilmiş olup, her aşamada
							kalite kontrolü yapılmaktadır.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								Biyolojik Mücadele
							</span>
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								Pestisitsiz Üretim
							</span>
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								Global Gap
							</span>
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								İyi Tarım
							</span>
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								Organik Üretim
							</span>
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								Su Yönetimi
							</span>
							<span className="px-4 py-2 bg-white/20 rounded-full text-sm">
								Biyoçeşitlilik
							</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
