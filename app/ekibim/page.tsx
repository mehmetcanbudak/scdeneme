"use client";

import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";
import { ChevronDown } from "lucide-react";

export default function Ekibim() {
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

	return (
		<div className="min-h-screen bg-white relative">
			{/* Navigation is now handled by the shared Navigation component */}

			{/* Hero section with first slide image */}
			<section className="relative h-[52.5vh] overflow-visible z-10">
				<div className="absolute inset-0">
					<img
						src="/agricultural-figures-with-plants-and-sun.png"
						alt="Ekibimiz"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/40"></div>
				</div>

				<div className="relative z-10 h-full flex items-center justify-center text-center text-white">
					<div className="max-w-4xl mx-auto px-6">
						<div className="mb-8">
							<h1 className="text-5xl md:text-7xl font-light mb-8 tracking-wide">
								EKİBİMİZ
							</h1>
						</div>
					</div>
				</div>
			</section>

			{/* Scroll down arrow button */}
			<div className="relative z-[999] -mt-4">
				<div className="flex justify-center">
					<button
						onClick={scrollToContent}
						className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
					>
						<ChevronDown className="w-5 h-5 text-gray-600" />
					</button>
				</div>
			</div>

			{/* Main content with id and bg-white */}
			<main id="main-content" className="py-12 px-6 relative z-10 bg-white">
				<div className="mx-12">
					{/* Page Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-gray-800">
							Ekibimiz
						</h1>
						<p className="text-lg text-gray-600">
							Deneyimli ve tutkulu tarım uzmanları
						</p>
					</div>

					{/* Team Members */}
					<div className="bg-white p-8 rounded-lg shadow-sm">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{
									name: "Ahmet Yılmaz",
									role: "Baş Agronom",
									image:
										"/fresh-vegetables-and-greens-in-modern-greenhouse.png",
									description:
										"15 yıllık deneyimi ile organik tarım konusunda uzman",
								},
								{
									name: "Fatma Demir",
									role: "Sera Yöneticisi",
									image: "/organic-farming-greenhouse-vegetables.png",
									description:
										"Modern sera teknolojileri ve sürdürülebilir üretim uzmanı",
								},
								{
									name: "Mehmet Kaya",
									role: "Kalite Kontrol",
									image: "/fresh-leafy-greens-and-herbs-in-baskets.png",
									description:
										"Ürün kalitesi ve güvenliği konusunda sertifikalı uzman",
								},
							].map((member, index) => (
								<div key={index} className="text-center">
									<div className="relative mb-6 overflow-hidden rounded-lg w-full h-48 mx-auto">
										<img
											src={member.image || "/placeholder.svg"}
											alt={member.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<h3 className="text-xl font-medium mb-2">{member.name}</h3>
									<p className="text-gray-600 font-medium mb-4">
										{member.role}
									</p>
									<p className="text-gray-600 text-sm">{member.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
