"use client";

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
import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";

export default function Sertifikalar() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	const scrollToContent = () => {
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
	};

	const heroSlides = [
		{
			title: "",
			subtitle: "",
			buttonText: "",
			image: "/iso.png",
		},
	];

	return (
		<div className="min-h-screen bg-white relative">
			{/* Navigation is now handled by the shared Navigation component */}

			<HeroHeader
				slides={heroSlides}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="65vh"
			/>

			<main id="main-content" className="py-12 px-6 relative z-10 bg-white">
				<div className="mx-12">
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

						<div className="grid md:grid-cols-2 gap-8">
							{/* Biological Control */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Bug className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-3 text-gray-800">
											Biyolojik Mücadele
										</h3>
										<p className="text-gray-600 mb-4">
											Zararlı böceklerle mücadelede kimyasal pestisitler yerine
											doğal yöntemler kullanıyoruz. Faydalı böcekler, doğal
											düşmanlar ve biyolojik preparatlar ile ekosistem dengesini
											koruyoruz.
										</p>
										<ul className="text-sm text-gray-600 space-y-2">
											<li>• Faydalı böcek salımı (parazitoid ve predatör)</li>
											<li>
												• Feromon tuzakları ile zararlı popülasyon kontrolü
											</li>
											<li>• Doğal bitki ekstraktları kullanımı</li>
											<li>• Biyolojik mücadele ajanları</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Good Agricultural Practices */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Award className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-3 text-gray-800">
											İyi Tarım Uygulamaları
										</h3>
										<p className="text-gray-600 mb-4">
											Global Gap standartlarına uygun olarak, çevre dostu ve
											sürdürülebilir tarım yöntemleri uyguluyoruz. Her aşamada
											kalite kontrolü yaparak güvenli gıda üretimi sağlıyoruz.
										</p>
										<ul className="text-sm text-gray-600 space-y-2">
											<li>• Toprak sağlığı ve verimlilik yönetimi</li>
											<li>• Su kaynaklarının verimli kullanımı</li>
											<li>• İşçi sağlığı ve güvenliği</li>
											<li>• Ürün izlenebilirliği</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Pesticide-Free Production */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Shield className="w-6 h-6 text-yellow-600" />
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-3 text-gray-800">
											Pestisitsiz Üretim
										</h3>
										<p className="text-gray-600 mb-4">
											Kimyasal pestisit kullanmadan, doğal yöntemlerle üretim
											yapıyoruz. Ürünlerimiz hiçbir işleme tabi tutulmadan,
											dalından taze olarak gönderiliyor.
										</p>
										<ul className="text-sm text-gray-600 space-y-2">
											<li>• Sıfır kimyasal pestisit kullanımı</li>
											<li>• Doğal büyüme ve olgunlaşma</li>
											<li>• Mumlama ve koruyucu işlem yok</li>
											<li>• Dalından taze gönderim</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Water Management */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Droplets className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-3 text-gray-800">
											Su Yönetimi
										</h3>
										<p className="text-gray-600 mb-4">
											Su kaynaklarını verimli kullanarak, damla sulama
											sistemleri ile su tasarrufu sağlıyoruz. Su kalitesi
											sürekli olarak izlenmekte ve analiz edilmektedir.
										</p>
										<ul className="text-sm text-gray-600 space-y-2">
											<li>• Damla sulama sistemleri</li>
											<li>• Su tasarrufu teknolojileri</li>
											<li>• Su kalitesi analizi</li>
											<li>• Yağmur suyu toplama</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Certificates Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							2024-2025 Üretim Sezonu
							<br />
							<span className="text-2xl">Analiz Raporları ve Belgelerimiz</span>
						</h2>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{/* Certificate Item 1 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Sertifika Görseli</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Global Gap Sertifikası
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Uluslararası kalite standartları onaylı üretim sertifikası
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Certificate Item 2 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Sertifika Görseli</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										İyi Tarım Uygulamaları
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Tarım ve Orman Bakanlığı onaylı iyi tarım sertifikası
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Certificate Item 3 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Sertifika Görseli</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Organik Tarım Sertifikası
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Organik üretim standartlarına uygunluk belgesi
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Certificate Item 4 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Sertifika Görseli</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										HACCP Sertifikası
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Gıda güvenliği yönetim sistemi belgesi
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Certificate Item 5 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Sertifika Görseli</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										ISO 22000 Sertifikası
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Gıda güvenliği yönetim sistemi standardı
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Certificate Item 6 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Sertifika Görseli</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										TSE Sertifikası
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Türk Standartları Enstitüsü kalite belgesi
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Analysis Reports Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Ürün Analiz Raporları
						</h2>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{/* Analysis Report Item 1 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Analiz Raporu</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Portakal Analiz Raporu
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Portakal ürünlerimizin detaylı analiz sonuçları
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Analysis Report Item 2 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Analiz Raporu</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Mandalina Analiz Raporu
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Mandalina ürünlerimizin detaylı analiz sonuçları
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Analysis Report Item 3 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Analiz Raporu</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Limon Analiz Raporu
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Limon ürünlerimizin detaylı analiz sonuçları
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Analysis Report Item 4 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Analiz Raporu</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Avokado Analiz Raporu
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Avokado ürünlerimizin detaylı analiz sonuçları
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Analysis Report Item 5 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Analiz Raporu</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Nar Analiz Raporu
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Nar ürünlerimizin detaylı analiz sonuçları
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>

							{/* Analysis Report Item 6 */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-4">
										<FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Analiz Raporu</p>
									</div>
								</div>
								<div className="p-6">
									<h3 className="font-semibold text-lg mb-2 text-gray-800">
										Greyfurt Analiz Raporu
									</h3>
									<p className="text-gray-600 text-sm mb-4">
										Greyfurt ürünlerimizin detaylı analiz sonuçları
									</p>
									<Button className="w-full">
										<FileText className="w-4 h-4 mr-2" />
										İncele
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Environmental Impact Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-light mb-8 text-center text-gray-800">
							Çevresel Etki ve Sürdürülebilirlik
						</h2>

						<div className="grid md:grid-cols-3 gap-6">
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
