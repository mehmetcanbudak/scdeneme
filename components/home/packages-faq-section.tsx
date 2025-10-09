import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { memo } from "react";

/**
 * Benefit card interface
 */
interface BenefitCard {
	icon: string;
	iconAlt: string;
	title: string;
	description: string;
	backgroundColor: string;
	borderColor: string;
}

/**
 * Props for the PackagesFAQSection component
 */
interface PackagesFAQSectionProps {
	packageImage?: string;
	className?: string;
}

/**
 * Packages FAQ section component
 * Displays package image and FAQ accordion side by side
 *
 * @param {PackagesFAQSectionProps} props - Component props
 * @returns {React.ReactElement} The packages FAQ section component
 */
const PackagesFAQSection: React.FC<PackagesFAQSectionProps> = memo(
	({ packageImage = "/bundle4.png", className = "" }) => {
		const benefits: BenefitCard[] = [
			{
				icon: "/farmımızda_yetisen_sebzeler/her_hafta_taze_cesitler.svg",
				iconAlt: "Her Hafta Farklı Çeşitler",
				title: "HER HAFTA FARKLI ÇEŞİTLER",
				description:
					"Skycrops abonelik programıyla sofranıza her hafta farklı tatlar geliyor. Programımızda yalnızca 2 maral çeşidi sabit kalıyor; diğer tüm ürünler haftadan haftaya değişiyor. Böylece her kutuda 8 adet yeşillik ile hem tanıdık lezzetleri koruyor hem de yeni tatlarla mutfağınıza sürprizler ekliyoruz. Roka, fesleğen, maydanoz, semizotu ve daha niceleri...",
				backgroundColor: "bg-[#fbf9d5]",
				borderColor: "border-[#fbf9d5]",
			},
			{
				icon: "/abone_olun_bize_bırakin.svg",
				iconAlt: "Abone Olun",
				title: "Abone olun, gerisini bize bırakın",
				description:
					"Tek yapmanız gereken size en uygun abonelik planını seçmek. İster her hafta, ister iki haftada bir sepetiniz kapınıza gelsin",
				backgroundColor: "bg-[#e9f2dd]",
				borderColor: "border-[#e9f2dd]",
			},
			{
				icon: "/farmımızda_yetisen_sebzeler/dogal_ve_guvenilir.svg",
				iconAlt: "Doğal ve Güvenilir Üretim",
				title: "Doğal ve güvenilir üretim",
				description:
					"Pestisitsiz, %90 daha az suyla yetiştirilen yeşilliklerimiz kontrollü koşullarda üretilir ve sofranıza en yüksek tazelikle ulaşır.",
				backgroundColor: "bg-[#759f72]",
				borderColor: "border-[#7BA785]",
			},
			{
				icon: "/farmımızda_yetisen_sebzeler/dogal_ve_guvenilir.svg",
				iconAlt: "Doğal ve Güvenilir Üretim",
				title: "Doğal ve güvenilir üretim",
				description:
					"Pestisitsiz, %90 daha az suyla yetiştirilen yeşilliklerimiz kontrollü koşullarda üretilir ve sofranıza en yüksek tazelikle ulaşır.",
				backgroundColor: "bg-[#D4A574]",
				borderColor: "border-[#D4A574]",
			},
		];

		return (
			<section
				className={`py-16 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}
			>
				<div className="mx-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black">
							Abonelik Paketimiz Hakkında
						</h2>
						<p className="text-base leading-relaxed">
							En taze sebzellerimizin özenle seçilmiş koleksiyonları, sağlıklı
							yaşamınız için mükemmel paketler şeklinde
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
						{/* Package Image - Left Side */}
						<div className="flex items-center justify-center">
							<div className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
								<Image
									src={packageImage}
									alt="Taze Yeşillikler Paketi"
									width={600}
									height={800}
									className="w-full h-auto object-cover rounded-product shadow-md"
								/>
							</div>
						</div>

						{/* Benefits Grid - Right Side */}
						<div className="space-y-4">
							{/* Benefits Cards in 2x2 Grid */}
							<div className="flex flex-col gap-6">
								{benefits.map((benefit, index) => (
									<div
										key={`${benefit.title}-${index}`}
										className={`${benefit.backgroundColor} border-2 border-black rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
									>
										<div className="flex items-start gap-6">
											{/* Icon */}
											<div className="w-16 h-16 rounded-full bg-white border-2 border-gray-800 flex items-center justify-center flex-shrink-0">
												<Image
													src={benefit.icon}
													alt={benefit.iconAlt}
													width={40}
													height={40}
													className="w-10 h-10 object-contain"
												/>
											</div>
											{/* Content */}
											<div>
												<h4 className="text-base font-bold leading-tight mb-2 text-black">
													{benefit.title}
												</h4>
												<p className="text-sm leading-relaxed text-black">
													{benefit.description}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Subscribe Button */}
							<div className="mt-6 text-center">
								<Link href="/abonelik/taze-yesillikler-paketi">
									<Button className="w-full sm:w-auto px-8 py-3">
										Abone Ol
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	},
);

PackagesFAQSection.displayName = "PackagesFAQSection";

export default PackagesFAQSection;
