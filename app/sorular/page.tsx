"use client";

import {
	Award,
	Clock,
	FileText,
	HelpCircle,
	Leaf,
	Shield,
	Users,
} from "lucide-react";
import Link from "next/link";
import HeroHeader from "@/components/hero-header";
import { Button } from "@/components/ui/button";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";

export default function Sorular() {
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
			image: "/organic-farming-greenhouse-vegetables.png",
		},
	];

	const faqData = [
		{
			question: "Ürünleriniz gerçekten organik mi?",
			answer:
				"Evet, tüm ürünlerimiz organik tarım standartlarına uygun olarak üretilmektedir. Global Gap sertifikalarımız ve iyi tarım uygulamalarımız ile kalitemizi garanti ediyoruz.",
			icon: Leaf,
		},
		{
			question: "Teslimat süreleri ne kadar?",
			answer:
				"Ürünleriniz sipariş verildikten sonra 24-48 saat içerisinde dalından taze olarak toplanıp kargoya verilmektedir. Kargo süresi bölgenize göre 1-3 iş günü arasında değişmektedir.",
			icon: Clock,
		},
		{
			question: "Pestisit kullanıyor musunuz?",
			answer:
				"Hayır, hiçbir kimyasal pestisit kullanmıyoruz. Zararlılarla mücadelede biyolojik yöntemler ve doğal preparatlar kullanarak üretim yapıyoruz.",
			icon: Shield,
		},
		{
			question: "Abonelik sistemi nasıl çalışır?",
			answer:
				"Abonelik sistemi ile düzenli olarak taze ürünler alabilirsiniz. Haftalık, iki haftalık veya aylık periyotlarda seçim yapabilir, istediğiniz zaman duraklatabilir veya iptal edebilirsiniz.",
			icon: Users,
		},
		{
			question: "Hangi bölgelere teslimat yapıyorsunuz?",
			answer:
				"Şu anda İstanbul, Ankara, İzmir, Bursa, Antalya ve çevre illere teslimat yapmaktayız. Yeni bölgeler eklenmektedir.",
			icon: Award,
		},
		{
			question: "Ürün kalitesi nasıl garanti ediliyor?",
			answer:
				"Her ürün dalından toplandıktan sonra kalite kontrolünden geçirilmekte, sadece en kaliteli ürünler paketlenmektedir. Memnun kalmadığınız ürünler için iade garantisi sunuyoruz.",
			icon: FileText,
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
							Sıkça Sorulan Sorular
						</h1>
						<p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
							Müşterilerimizin en çok merak ettiği konular ve detaylı cevapları
						</p>
					</div>

					{/* FAQ Grid */}
					<div className="grid md:grid-cols-2 gap-8 mb-16">
						{faqData.map((faq, index) => {
							const IconComponent = faq.icon;
							const colorClasses = [
								{ bg: "bg-green-100", text: "text-green-600" },
								{ bg: "bg-green-100", text: "text-green-600" },
								{ bg: "bg-yellow-100", text: "text-yellow-600" },
								{ bg: "bg-purple-100", text: "text-purple-600" },
								{ bg: "bg-red-100", text: "text-red-600" },
								{ bg: "bg-indigo-100", text: "text-indigo-600" },
							];
							const colorClass = colorClasses[index % colorClasses.length];
							return (
								<div
									key={index}
									className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex items-start space-x-4">
										<div
											className={`w-12 h-12 ${colorClass.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
										>
											<IconComponent className={`w-6 h-6 ${colorClass.text}`} />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-3 text-gray-800">
												{faq.question}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{faq.answer}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Contact Section */}
					<div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-8 text-white text-center">
						<h2 className="text-3xl font-light mb-6">
							Başka Sorularınız mı Var?
						</h2>
						<p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
							Burada bulamadığınız bilgiler için bizimle iletişime geçebilir,
							uzman ekibimizden detaylı bilgi alabilirsiniz.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button variant="inverseOutline" className="text-white">
								<HelpCircle className="w-4 h-4 mr-2" />
								İletişime Geç
							</Button>
							<Link href="/iletisim">
								<Button variant="inverseOutline" className="text-white">
									<FileText className="w-4 h-4 mr-2" />
									Detaylı Bilgi
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
