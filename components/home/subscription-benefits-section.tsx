import Image from "next/image";
import type React from "react";
import { memo } from "react";

/**
 * Props for the SubscriptionBenefitsSection component
 */
interface SubscriptionBenefitsSectionProps {
	className?: string;
}

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
 * Subscription Benefits section component
 * Displays three key benefits of the Skycrops subscription program
 *
 * @param {SubscriptionBenefitsSectionProps} props - Component props
 * @returns {React.ReactElement} The subscription benefits section component
 */
const SubscriptionBenefitsSection: React.FC<SubscriptionBenefitsSectionProps> =
	memo(({ className = "" }) => {
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
				icon: "/farmımızda_yetisen_sebzeler/abone_olun_bize_bırakin.svg",
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
		];

		return (
			<section
				className={`py-16 md:py-20 bg-[#E7EBDE] relative z-10 ${className}`}
			>
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
					<div className="space-y-6 md:space-y-8">
						{benefits.map((benefit, index) => (
							<div
								key={`${benefit.title}-${index}`}
								className={`${benefit.backgroundColor} ${benefit.borderColor} border-2 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300`}
							>
								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
									{/* Icon */}
									<div className="flex-shrink-0">
										<div className="w-60 h-60 sm:w-72 sm:h-72 md:w-84 md:h-84 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center">
											<Image
												src={benefit.icon}
												alt={benefit.iconAlt}
												width={240}
												height={240}
												className="w-36 h-36 sm:w-42 sm:h-42 md:w-48 md:h-48 object-contain"
											/>
										</div>
									</div>

									{/* Content */}
									<div className="flex-1">
										<h3 className="text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 text-gray-800">
											{benefit.title}
										</h3>
										<p className="text-base leading-relaxed text-gray-800">
											{benefit.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	});

SubscriptionBenefitsSection.displayName = "SubscriptionBenefitsSection";

export default SubscriptionBenefitsSection;
