"use client";

import HeroHeader from "@/components/hero-header";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";

/**
 * Ciftlik page component - Farm information page
 */
const Ciftlik = React.memo(() => {
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
				title: "ÇİFTLİK",
				subtitle: "",
				buttonText: "",
				image: "/agricultural-figures-with-plants-and-sun.png",
				mobileImage: "/agricultural-figures-with-plants-and-sun.png",
				mobileAlt: "Çiftlik hero görseli",
			},
		],
		[],
	);

	/**
	 * Feature list for sustainable farming
	 */
	const features = useMemo(
		() => [
			"Organik gübre kullanımı",
			"Su tasarrufu teknolojileri",
			"Doğal haşere kontrolü",
		],
		[],
	);

	return (
		<div className="min-h-screen bg-white relative">
			{/* Navigation is now handled by the shared Navigation component */}

			<HeroHeader
				slides={heroSlides}
				onScrollToNext={scrollToContent}
				showDots={false}
				showButton={false}
				singleImage={true}
				customHeight="100vh"
			/>

			{/* Main content with id and bg-white */}
			<main
				id="main-content"
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-white"
			>
				<div className="mx-auto max-w-7xl">
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
									{features.map((feature, index) => (
										<li key={index} className="flex items-center">
											<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
											{feature}
										</li>
									))}
								</ul>
							</div>
							<div>
								<div className="relative w-full h-80 rounded-lg overflow-hidden">
									<Image
										src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
										alt="Sürdürülebilir Tarım"
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
});
Ciftlik.displayName = "Ciftlik";

export default Ciftlik;
