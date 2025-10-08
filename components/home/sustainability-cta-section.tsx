import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type React from "react";
import { memo, useId } from "react";

/**
 * Props for the SustainabilityCTASection component
 */
interface SustainabilityCTASectionProps {
	className?: string;
}

/**
 * Sustainability CTA section component
 * Displays a call-to-action for sustainable agriculture subscription
 *
 * @param {SustainabilityCTASectionProps} props - Component props
 * @returns {React.ReactElement} The sustainability CTA section component
 */
const SustainabilityCTASection: React.FC<SustainabilityCTASectionProps> = memo(
	({ className = "" }) => {
		const router = useRouter();
		const sectionId = useId();

		return (
			<section
				id={sectionId}
				className={`py-16 bg-[#E7EBDE] relative z-10 ${className}`}
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Subscription CTA Button */}
					<div className="text-center">
						<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-8 max-w-2xl mx-auto hover:shadow-md transition-shadow">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
								Sürdürülebilir Tarıma Hemen Katılın!
							</h3>
							<p className="text-gray-600 mb-6 leading-relaxed">
								Skycrops abonelik sistemiyle dikey tarım ürünleri ile sağlıklı
								yaşamın keyfini çıkarın.
							</p>
							<p className="text-gray-600 mb-8 leading-relaxed">
								Çevre dostu üretim ile taze ürünler her hafta kapınızda!
							</p>
							<Button
								onClick={() => router.push("/abonelik/taze-yesillikler-paketi")}
								className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full border border-gray-300 transition-all duration-300 hover:shadow-lg"
							>
								Şimdi Abone Ol
							</Button>
						</div>
					</div>
				</div>
			</section>
		);
	},
);

SustainabilityCTASection.displayName = "SustainabilityCTASection";

export default SustainabilityCTASection;
