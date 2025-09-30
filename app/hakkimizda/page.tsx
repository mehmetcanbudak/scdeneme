"use client";
import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { usePageBackground } from "@/contexts/page-background-context";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import Image from "next/image";
import { memo, useCallback, useEffect, useId } from "react";

const Hakkimizda = memo(function Hakkimizda() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	// Set the background color for this page
	const { setBackgroundColor } = usePageBackground();

	// Generate unique ID for main content
	const mainContentId = useId();

	useEffect(() => {
		setBackgroundColor("#AD3911");
	}, [setBackgroundColor]);

	const _slides = [
		{
			title: "HAKKIMIZDA",
			subtitle: "DOĞAL VE SAĞLIKLI",
			buttonText: "",
			image: "/agricultural-figures-with-plants-and-sun.png",
		},
	];

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

	return (
		<div className="min-h-screen relative bg-[#AD3911]">
			<HeroHeader
				slides={[
					{
						title: "",
						subtitle: "",
						buttonText: "",
						image: "/hakkimizda.png",
					},
				]}
				onScrollToNext={scrollToContent}
				singleImage={true}
				showDots={false}
				customHeight="65vh"
				mediaFit="cover"
				backgroundColor="#E74B14"
			/>

			<main id={mainContentId} className="py-12 relative z-10">
				<div className="mx-12">
					{/* Page Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							Hakkımızda
						</h1>
						<p className="text-lg text-gray-600">
							Taze sebze deneyiminin hikayesi
						</p>
						<div className="mt-8 flex justify-center">
							<Button asChild>
								<a href="/collections/all">Shop All</a>
							</Button>
						</div>
					</div>

					{/* Content */}
					<div className="bg-white p-8 rounded-lg shadow-sm mb-8">
						{/* Misyonumuz Section */}
						<div className="mb-16">
							<h2 className="text-3xl font-medium mb-8 text-gray-700 text-center">
								Misyonumuz
							</h2>
							<p className="text-gray-600 leading-relaxed text-lg mb-8 text-center max-w-4xl mx-auto">
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

						{/* Vizyonumuz Section */}
						<div className="mb-16">
							<h2 className="text-3xl font-medium mb-8 text-gray-700 text-center">
								Vizyonumuz
							</h2>
							<p className="text-gray-600 leading-relaxed text-lg mb-8 text-center max-w-4xl mx-auto">
								Skycrops olarak vizyonumuz; sürdürülebilir tarımda Türkiye'den
								dünyaya uzanan bir öncü olmak, gıda güvenliğini artıran
								yenilikçi çözümler üretmek ve geleceğin şehirlerinde sağlıklı
								yaşamın kaynağı haline gelmektir. Amacımız, dikey tarım
								teknolojilerini sürekli geliştirerek hem ülkemizde hem de global
								ölçekte insanlara daha sağlıklı, güvenilir ve erişilebilir
								ürünler sunmaktır.
							</p>
						</div>

						{/* Neden Dikey Tarım Section */}
						<div className="mb-16">
							<h2 className="text-3xl font-medium mb-12 text-gray-700 text-center">
								Neden Dikey Tarım
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
								{/* Ürün Kalitesi */}
								<div className="text-center">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
										<span className="text-2xl">🌿</span>
									</div>
									<h3 className="text-xl font-medium mb-4 text-gray-700">
										Ürün Kalitesi
									</h3>
									<ul className="text-gray-600 space-y-2 text-left">
										<li>
											• <strong>Daha sağlıklı:</strong> Pestisitsiz ve güvenilir
											üretim
										</li>
										<li>
											• <strong>Daha taze:</strong> Hasat edildiği gün sofrada
										</li>
										<li>
											• <strong>Daha lezzetli:</strong> Yüksek besin değerini
											korur
										</li>
									</ul>
								</div>

								{/* Çevre Dostu */}
								<div className="text-center">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
										<span className="text-2xl">🌍</span>
									</div>
									<h3 className="text-xl font-medium mb-4 text-gray-700">
										Çevre Dostu
									</h3>
									<ul className="text-gray-600 space-y-2 text-left">
										<li>
											• <strong>Daha az su tüketimi:</strong> Klasik tarıma göre
											%90 su tasarrufu
										</li>
										<li>
											• <strong>Daha düşük karbon ayak izi:</strong> Şehir içi
											üretim ile daha az lojistik ve karbon ayak izi
										</li>
									</ul>
								</div>

								{/* Geleceğin Tarımı */}
								<div className="text-center">
									<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
										<span className="text-2xl">🚀</span>
									</div>
									<h3 className="text-xl font-medium mb-4 text-gray-700">
										Geleceğin Tarımı
									</h3>
									<ul className="text-gray-600 space-y-2 text-left">
										<li>
											• <strong>Gıda güvenliği:</strong> İklim krizine ve artan
											nüfusa karşı sürdürülebilir çözüm
										</li>
										<li>
											• <strong>Her zaman, her yerde üretim:</strong> Her mevsim
											ve her şehirde kontrollü koşullarda yetiştirme
										</li>
										<li>
											• <strong>Yüksek verim & tam izlenebilirlik:</strong>{" "}
											Modern teknolojilerle güvenilir üretim
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Yaşayan Sebzeler Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
							<div>
								<h2 className="text-2xl font-medium mb-6 text-gray-700">
									Yaşayan Sebzeler
								</h2>
								<p className="text-gray-600 leading-relaxed mb-6">
									Skycrops, sağlıklı yaşamın ve taze lezzetlerin kapılarını
									aralayan bir dikey tarım tesisi. Doğallıktan uzaklaşmadan,
									kapalı ortamda, dış dünyanın negatif etkilerinden uzakta
									üretilen besleyici yeşilliklerimiz, sofralarınıza lezzet ve
									tazelik getiriyor.
								</p>
								<p className="text-gray-600 leading-relaxed">
									Geleceğin tarım yöntemlerini bugün uygulayarak, sizleri
									sağlıklı bir yaşam için doğal ve taze alternatiflerle
									buluşturmayı hedefliyor. Sağlıklı yaşamın anahtarı,
									Skycrops'un yeşilliklerinde gizli.
								</p>
							</div>
							<div className="relative">
								<Image
									src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
									alt="Modern sera tarımı"
									width={400}
									height={320}
									className="w-full h-80 rounded-lg"
									loading="lazy"
								/>
							</div>
						</div>

						{/* Taze, Sağlıklı Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
							<div className="relative order-2 md:order-1">
								<Image
									src="/organic-farming-greenhouse-vegetables.png"
									alt="Organik tarım"
									width={400}
									height={320}
									className="w-full h-80 rounded-lg"
									loading="lazy"
								/>
							</div>
							<div className="order-1 md:order-2">
								<h2 className="text-2xl font-medium mb-6 text-gray-700">
									Taze, Sağlıklı
								</h2>
								<p className="text-gray-600 leading-relaxed mb-6">
									Şehir içi sağlıklı tarım modeliyle üretimde ürünler uzun
									nakliye sürecinde kalmak, soğuk hava depolarına girmek yerine
									hasat edildikten kısa süre sonra sofralara ulaşır. Temiz bir
									ortamda suda büyüyen ürünler toz, toprak ve zararlılara maruz
									kalmaz. Temizlenmesi zahmetsizdir.
								</p>
							</div>
						</div>

						{/* Güvenli Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
							<div>
								<h2 className="text-2xl font-medium mb-6 text-gray-700">
									Güvenli
								</h2>
								<p className="text-gray-600 leading-relaxed mb-6">
									Skycrops'ta ürünleri dış dünyanın negatif etkilerine kapalı
									üretim ortamında, optimum koşullarda gerçekleştirdiğimiz için
									hiç bir tarımsal ilaç ve hormon kullanmıyoruz. Özenle
									seçtiğimiz tohumlardan filizlendirdiğimiz bitkiler büyümeleri
									için gerekli besinler dışında hiçbir yabancı maddeye maruz
									kalmadan sağlıkla büyüyor. Bu yüzden Skycrops'ta yetişen
									ürünler tamamıyla güvenli!
								</p>
							</div>
							<div className="relative">
								<Image
									src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
									alt="Modern sera tarımı"
									width={400}
									height={320}
									className="w-full h-80 rounded-lg"
									loading="lazy"
								/>
							</div>
						</div>

						{/* Lezzetli Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
							<div className="relative order-2 md:order-1">
								<Image
									src="/organic-farming-greenhouse-vegetables.png"
									alt="Organik tarım"
									width={400}
									height={320}
									className="w-full h-80 rounded-lg"
									loading="lazy"
								/>
							</div>
							<div className="order-1 md:order-2">
								<h2 className="text-2xl font-medium mb-6 text-gray-700">
									Lezzetli
								</h2>
								<p className="text-gray-600 leading-relaxed mb-6">
									Skycrops'ta bitkiler biyolojilerine en uygun koşullarda
									yetişir. İhtiyaçları olan besinleri, doğru ısı, nem ve ışık
									yoğunluğunda alırlar. Skycrops olarak birinci önceliğimiz
									"mutlu bitkiler" yetiştirmek. Tohumlarını özenle seçip, özenle
									yetiştirdiğimiz ürünler; seçkin restoran ve şefler tarafından
									tercih edilen, dünya genelinde en çok beğenilen ve keyifle
									tüketilen türlerdir.
								</p>
							</div>
						</div>

						{/* Çevre Dostu Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
							<div>
								<h2 className="text-2xl font-medium mb-6 text-gray-700">
									Çevre Dostu
								</h2>
								<p className="text-gray-600 leading-relaxed mb-6">
									Skycrops'ta en büyük önceliğimiz doğaya saygı ve
									sürdürülebilirlik. Geleneksel tarım yöntemlerine göre %90'a
									varan oranlarda daha az su tüketiyoruz. Gelişmiş enerji
									yönetim teknolojileri sayesinde verimliğimiz dünya
									standartlarının üzerinde. Gübre ve pestisitlerle toprağı
									kirletmiyoruz.
								</p>
							</div>
							<div className="relative">
								<Image
									src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
									alt="Modern sera tarımı"
									width={400}
									height={320}
									className="w-full h-80 rounded-lg"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
});

export default Hakkimizda;
