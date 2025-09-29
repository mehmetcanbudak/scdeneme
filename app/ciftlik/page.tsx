"use client";

import HeroHeader from "@/components/hero-header";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { useCallback } from "react";

export default function Ciftlik() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

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

	return (
		<div className="min-h-screen bg-white relative">
			{/* Navigation is now handled by the shared Navigation component */}

			<HeroHeader
				slides={[
					{
						title: "ÇİFTLİK",
						subtitle: "",
						buttonText: "",
						image: "/agricultural-figures-with-plants-and-sun.png",
					},
				]}
				onScrollToNext={scrollToContent}
				showDots={false}
				showButton={false}
				singleImage={true}
				customHeight="52.5vh"
			/>

			{/* Main content with id and bg-white */}
			<main id="main-content" className="py-12 px-6 relative z-10 bg-white">
				<div className="mx-12">
					{/* Page Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							Çiftliğimiz
						</h1>
						<p className="text-lg text-gray-600">
							Modern teknoloji ile sürdürülebilir tarım
						</p>
					</div>

					{/* Farm Features */}
					<div className="bg-white p-8 rounded-lg shadow-sm mb-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
							<div>
								<h2 className="text-3xl font-light mb-6 text-gray-700">
									Sürdürülebilir Tarım
								</h2>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Modern sera teknolojisi ile doğal yöntemleri harmanlayarak, en
									taze ve sağlıklı sebzeleri yetiştiriyoruz. Çevre dostu üretim
									yöntemlerimiz ile hem doğayı koruyor hem de size en kaliteli
									ürünleri sunuyoruz.
								</p>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-center">
										<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
										Organik gübre kullanımı
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
										Su tasarrufu teknolojileri
									</li>
									<li className="flex items-center">
										<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
										Doğal haşere kontrolü
									</li>
								</ul>
							</div>
							<div>
								<img
									src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
									alt="Sürdürülebilir Tarım"
									className="w-full h-80 object-cover rounded-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
