"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";

/**
 * Production Video Section Component
 * Displays information about production technology with video
 *
 * @returns {React.ReactElement} The production video section component
 */
const ProductionVideoSection: React.FC = memo(() => {
	return (
		<div className="py-12 sm:py-16 bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left - Info */}
					<div className="space-y-6">
						<h2 className="text-3xl font-light text-gray-800">
							Sera Teknolojisi ile Üretim
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed">
							En modern sera teknolojileri kullanarak, controlled environment
							agriculture (CEA) sistemleriyle ürünlerimizi yetiştiriyoruz. Bu
							sayede yıl boyunca aynı kalitede, taze ve besleyici ürünler
							sunabiliyoruz.
						</p>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
								<div>
									<h4 className="font-medium text-gray-800">Su Tasarrufu</h4>
									<p className="text-gray-600">
										Geleneksel tarıma göre %95 daha az su kullanımı
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
								<div>
									<h4 className="font-medium text-gray-800">
										Pestisit Kullanmıyoruz
									</h4>
									<p className="text-gray-600">
										Kapalı sistem sayesinde zararlılardan doğal koruma
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
								<div>
									<h4 className="font-medium text-gray-800">
										Yıl Boyu Üretim
									</h4>
									<p className="text-gray-600">
										Mevsim şartlarından bağımsız sürekli hasat
									</p>
								</div>
							</div>
						</div>
						<Button className="bg-gray-600 hover:bg-gray-700 text-white">
							<Play className="w-4 h-4 mr-2" />
							Üretim Sürecini İzle
						</Button>
					</div>

					{/* Right - Video/Picture */}
					<div className="relative">
						<div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
							<img
								src="/fresh-vegetables-and-greens-in-modern-greenhouse.png"
								alt="Modern sera üretimi"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<button
									type="button"
									className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
								>
									<Play className="w-8 h-8 text-gray-600 ml-1" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

ProductionVideoSection.displayName = "ProductionVideoSection";

export default ProductionVideoSection;
