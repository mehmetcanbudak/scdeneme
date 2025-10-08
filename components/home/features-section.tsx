import type React from "react";
import { memo } from "react";

/**
 * Props for the FeaturesSection component
 */
interface FeaturesSectionProps {
	className?: string;
}

/**
 * Features section component displaying company highlights
 * Shows four key features of the company in a grid layout
 *
 * @param {FeaturesSectionProps} props - Component props
 * @returns {React.ReactElement} The features section component
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = memo(
	({ className = "" }) => {
		return (
			<section
				id="biz-ne-yapiyoruz-section"
				className={`py-16 md:py-20 lg:py-24 bg-[#E7EBDE] relative z-10 overflow-x-hidden ${className}`}
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 text-gray-800">
							Biz Ne Yapıyoruz
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mt-12">
							<div className="text-center">
								<div className="w-72 h-72 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center relative">
									<div className="w-64 h-64 rounded-full border-4 border-blue-500 flex items-center justify-center">
										<img
											src="/biz_skycrops.svg"
											alt="Biz Skycrops Icon"
											className="w-48 h-48 object-contain"
										/>
									</div>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 leading-snug">
									Biz Skycrops
								</h3>
								<p className="text-base text-gray-600 leading-relaxed">
									Modern dikey tarım teknolojisiyle geleceğin tarımını
									şekillendiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-72 h-72 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center relative">
									<div className="w-64 h-64 rounded-full border-4 border-blue-500 flex items-center justify-center">
										<img
											src="/kapali_alan.svg"
											alt="Kapalı Alan Dikey Tarım Icon"
											className="w-48 h-48 object-contain"
										/>
									</div>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 leading-snug">
									Kapalı Alanda Dikey Tarım
								</h3>
								<p className="text-base text-gray-600 leading-relaxed">
									Kontrollü ortamda sürdürülebilir ve verimli üretim
									gerçekleştiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-72 h-72 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center relative">
									<div className="w-64 h-64 rounded-full border-4 border-blue-500 flex items-center justify-center">
										<img
											src="/pestisit.svg"
											alt="Pestisitsiz Hormonsuz Icon"
											className="w-48 h-48 object-contain"
										/>
									</div>
									{/* X overlay to indicate no pesticides */}
									<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
										<div className="w-48 h-48 flex items-center justify-center">
											<svg
												className="w-48 h-48 text-red-600"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
											</svg>
										</div>
									</div>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 leading-snug">
									Pestisitsiz Hormonsuz
								</h3>
								<p className="text-base text-gray-600 leading-relaxed">
									Kimyevi müdahale olmadan doğal yöntemlerle sağlıklı ürünler
									yetiştiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-72 h-72 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center relative">
									<div className="w-64 h-64 rounded-full border-4 border-blue-500 flex items-center justify-center">
										<img
											src="/taptaze.svg"
											alt="Taptaze Icon"
											className="w-48 h-48 object-contain"
										/>
									</div>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 leading-snug">
									Taptaze Yeşillikleri Ulaştırıyoruz
								</h3>
								<p className="text-base text-gray-600 leading-relaxed">
									Hasattan dakikalar sonra kapınıza kadar taze ürünlerimizi
									getiriyoruz
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	},
);

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
