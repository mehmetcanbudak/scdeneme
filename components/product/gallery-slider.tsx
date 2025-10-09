"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";

/**
 * Gallery item interface
 */
interface GalleryItem {
	image: string;
	title: string;
	description: string;
	benefits: string[];
}

/**
 * Props for GallerySlider component
 */
interface GallerySliderProps {
	/** Array of gallery items to display */
	items: GalleryItem[];
}

/**
 * Gallery Slider Component
 * Horizontal scrolling gallery with navigation buttons
 *
 * @param {GallerySliderProps} props - Component props
 * @returns {React.ReactElement} The gallery slider component
 */
const GallerySlider: React.FC<GallerySliderProps> = memo(({ items }) => {
	const galleryScrollRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);

	/**
	 * Scroll gallery left
	 */
	const scrollLeft = useCallback(() => {
		const galleryContainer = galleryScrollRef.current;
		if (galleryContainer) {
			galleryContainer.scrollBy({
				left: -320,
				behavior: "smooth",
			});
		}
	}, []);

	/**
	 * Scroll gallery right
	 */
	const scrollRight = useCallback(() => {
		const galleryContainer = galleryScrollRef.current;
		if (galleryContainer) {
			galleryContainer.scrollBy({
				left: 320,
				behavior: "smooth",
			});
		}
	}, []);

	/**
	 * Handle scroll event
	 */
	const handleScroll = useCallback(() => {
		const galleryContainer = galleryScrollRef.current;
		if (galleryContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = galleryContainer;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	}, []);

	return (
		<div className="py-12 sm:py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-white">
						Paket İçeriği
					</h2>
					<p className="text-base leading-relaxed text-white/80">
						Taze yeşillikler paketimizde bulunan organik ürünler
					</p>
				</div>

				<div className="relative">
					<div
						ref={galleryScrollRef}
						className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 horizontal-scroll"
						onScroll={handleScroll}
						style={{ scrollBehavior: "smooth" }}
					>
						{items.map((item, index) => (
							<div
								key={`gallery-${item.title}-${index}`}
								className="flex-shrink-0 w-72 sm:w-80"
							>
								<div className="bg-[#FDFBE2] rounded-3xl overflow-hidden shadow-sm border border-black h-full hover:shadow-md transition-all duration-300">
									<div className="relative overflow-hidden">
										<img
											src={item.image}
											alt={item.title}
											className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src = "/placeholder.svg";
											}}
										/>
									</div>
									<div className="p-6">
										<h3 className="font-medium mb-2 text-gray-800 text-lg">
											{item.title}
										</h3>
										<p className="text-gray-600 text-sm mb-4">
											{item.description}
										</p>
										<div className="space-y-2">
											<h4 className="font-medium text-gray-800 text-sm">
												Besin Değerleri:
											</h4>
											<div className="flex flex-wrap gap-2">
												{item.benefits.map((benefit, benefitIndex) => (
													<span
														key={`benefit-${item.title}-${benefit}-${benefitIndex}`}
														className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Scroll Buttons */}
					{showLeftButton && (
						<div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-30">
							<button
								type="button"
								onClick={scrollLeft}
								className="w-12 h-12 rounded-full bg-[#FDFBE2] shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-black"
							>
								<ChevronLeft className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					)}

					{showRightButton && (
						<div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-30">
							<button
								type="button"
								onClick={scrollRight}
								className="w-12 h-12 rounded-full bg-[#FDFBE2] shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-black"
							>
								<ChevronRight className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

GallerySlider.displayName = "GallerySlider";

export default GallerySlider;
