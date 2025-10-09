"use client";

import Image from "next/image";
import { memo } from "react";

/**
 * What We Do Section Component
 * Displays the "Biz Ne Yapıyoruz" section with 4 feature cards
 *
 * @returns {React.ReactElement} The what we do section component
 */
const WhatWeDoSection = memo(function WhatWeDoSection() {
	return (
		<section className="py-16 bg-[#E7EBDE]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-[#FDFBE2] rounded-3xl shadow-sm border border-black p-8 sm:p-12 lg:p-16 hover:shadow-md transition-shadow">
					<div className="mb-12 sm:mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-black text-center">
							Biz Ne Yapıyoruz
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20 mt-12 justify-items-center">
							<div className="text-center">
								<div className="w-60 h-60 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center relative">
									<Image
										src="/biz_skycrops.svg"
										alt="Biz Skycrops Icon"
										width={192}
										height={192}
										className="w-full h-full object-contain"
										quality={85}
									/>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-black leading-snug">
									Biz Skycrops
								</h3>
								<p className="text-base text-black leading-relaxed">
									Modern dikey tarım teknolojisiyle geleceğin tarımını
									şekillendiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-60 h-60 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center relative">
									<Image
										src="/kapalı ortam .svg"
										alt="Kapalı Alan Dikey Tarım Icon"
										width={192}
										height={192}
										className="w-full h-full object-contain"
										quality={85}
									/>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-black leading-snug">
									Kapalı Alanda Dikey Tarım
								</h3>
								<p className="text-base text-black leading-relaxed">
									Kontrollü ortamda sürdürülebilir ve verimli üretim
									gerçekleştiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-60 h-60 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center relative">
									<Image
										src="/pestisitsiz yeni.svg"
										alt="Pestisitsiz Hormonsuz Icon"
										width={192}
										height={192}
										className="w-full h-full object-contain"
										quality={85}
									/>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-black leading-snug">
									Pestisitsiz Hormonsuz
								</h3>
								<p className="text-base text-black leading-relaxed">
									Kimyevi müdahale olmadan doğal yöntemlerle sağlıklı ürünler
									yetiştiriyoruz
								</p>
							</div>
							<div className="text-center">
								<div className="w-60 h-60 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center relative">
									<Image
										src="/taptaze yeşillikler.svg"
										alt="Taptaze Icon"
										width={192}
										height={192}
										className="w-full h-full object-contain"
										quality={85}
									/>
								</div>
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-black leading-snug">
									Taptaze Yeşillikleri Ulaştırıyoruz
								</h3>
								<p className="text-base text-black leading-relaxed">
									Hasattan dakikalar sonra kapınıza kadar taze ürünlerimizi
									getiriyoruz
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
});

export default WhatWeDoSection;
