import type React from "react";
import { memo, useRef, useState, useCallback, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Vegetable item interface
 */
interface Vegetable {
	name: string;
	subtitle: string;
	image: string;
}

/**
 * Props for the VegetablesSection component
 */
interface VegetablesSectionProps {
	className?: string;
}

/**
 * Vegetables section component
 * Displays vegetables in a horizontal scrollable layout with auto-scroll for all screen sizes
 *
 * @param {VegetablesSectionProps} props - Component props
 * @returns {React.ReactElement} The vegetables section component
 */
const VegetablesSection: React.FC<VegetablesSectionProps> = memo(({ className = "" }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);
	const [isUserInteracting, setIsUserInteracting] = useState(false);

	/**
	 * Vegetables data with memoization
	 */
	const vegetables: Vegetable[] = useMemo(
		() => [
			{ name: "KIVIRCIK", subtitle: "TAZE YAPRAKLAR", image: "/kivircik.png" },
			{ name: "FESLEĞEN", subtitle: "AROMATIK BİTKİ", image: "/feslegen.png" },
			{ name: "MAYDANOZ", subtitle: "VİTAMİN DEPOSU", image: "/maydanoz.png" },
			{
				name: "LOLLO ROSSO",
				subtitle: "KIRMIZI YAPRAK",
				image: "/lollo-rosso.png",
			},
			{ name: "REYHAN", subtitle: "AROMATIK NANE", image: "/reyhan.png" },
			{ name: "ROKA", subtitle: "ACIMSI LEZZET", image: "/roka.png" },
			{ name: "KEKİK", subtitle: "AROMATIK OT", image: "/kekik.png" },
			{
				name: "YAĞLI YAPRAK",
				subtitle: "TAZE YEŞİLLİK",
				image: "/yagli-yaprak.png",
			},
		],
		[],
	);

	/**
	 * Handle scroll event
	 */
	const handleScroll = useCallback(() => {
		const container = scrollRef.current;
		if (container) {
			const { scrollLeft, scrollWidth, clientWidth } = container;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	}, []);

	/**
	 * Scroll left
	 */
	const scrollLeft = useCallback(() => {
		setIsUserInteracting(true);
		const container = scrollRef.current;
		if (container) {
			container.scrollBy({
				left: -300,
				behavior: "smooth",
			});
		}
		setTimeout(() => {
			setIsUserInteracting(false);
		}, 2000);
	}, []);

	/**
	 * Scroll right
	 */
	const scrollRight = useCallback(() => {
		setIsUserInteracting(true);
		const container = scrollRef.current;
		if (container) {
			container.scrollBy({
				left: 300,
				behavior: "smooth",
			});
		}
		setTimeout(() => {
			setIsUserInteracting(false);
		}, 2000);
	}, []);

	/**
	 * Handle touch/mouse start
	 */
	const handleInteractionStart = useCallback(() => {
		setIsUserInteracting(true);
	}, []);

	/**
	 * Handle touch/mouse end
	 */
	const handleInteractionEnd = useCallback(() => {
		setTimeout(() => {
			setIsUserInteracting(false);
		}, 2000);
	}, []);

	// Initialize scroll state
	useEffect(() => {
		handleScroll();
	}, [handleScroll]);

	// Auto-scroll when user is not interacting
	useEffect(() => {
		const container = scrollRef.current;
		if (!container || isUserInteracting) return;

		const scrollWidth = container.scrollWidth;
		const clientWidth = container.clientWidth;
		let scrollPosition = container.scrollLeft;

		const autoScroll = () => {
			if (isUserInteracting) return;

			scrollPosition += 1;
			if (scrollPosition >= scrollWidth - clientWidth) {
				scrollPosition = 0;
			}
			container.scrollLeft = scrollPosition;
		};

		const interval = setInterval(autoScroll, 30);
		return () => clearInterval(interval);
	}, [isUserInteracting]);

	return (
		<section
			id="vegetables-section"
			className={`py-16 bg-[#E7EBDE] relative z-10 ${className}`}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 md:mb-6 text-gray-800">
						Farmımızda Yetişen Sebzeler
					</h2>
					<p className="text-base leading-relaxed mt-4">
						1 ay içiinde farmımızda yetiştirdiğimiz bütün çesitler evinize
						ulaşmış olacak.
					</p>
				</div>
			</div>

			{/* Horizontal scrollable vegetables for all screen sizes */}
			<div className="relative w-full px-16">
				<div
					ref={scrollRef}
					className="flex space-x-8 overflow-x-auto pb-4 px-6 scrollbar-hide"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
					onScroll={handleScroll}
					onTouchStart={handleInteractionStart}
					onTouchEnd={handleInteractionEnd}
					onMouseDown={handleInteractionStart}
					onMouseUp={handleInteractionEnd}
				>
					{vegetables.concat(vegetables).concat(vegetables).map((vegetable, index) => (
						<div
							key={`${vegetable.name}-${index}`}
							className="flex-shrink-0 text-center group cursor-pointer w-32 sm:w-36 md:w-40"
						>
							<div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto">
								<img
									src={vegetable.image || "/placeholder.svg"}
									alt={vegetable.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									draggable={false}
								/>
							</div>
							<h3 className="text-xl md:text-2xl font-medium leading-snug mb-1 tracking-wide">
								{vegetable.name}
							</h3>
							<p className="text-sm text-gray-600 uppercase tracking-widest">
								{vegetable.subtitle}
							</p>
						</div>
					))}
				</div>

				{/* Navigation Buttons */}
				{showLeftButton && (
					<div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30">
						<button
							onClick={scrollLeft}
							type="button"
							className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
							aria-label="Scroll left"
						>
							<ChevronLeft className="w-5 h-5 text-gray-600" />
						</button>
					</div>
				)}

				{showRightButton && (
					<div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30">
						<button
							onClick={scrollRight}
							type="button"
							className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
							aria-label="Scroll right"
						>
							<ChevronRight className="w-5 h-5 text-gray-600" />
						</button>
					</div>
				)}
			</div>
		</section>
	);
});

VegetablesSection.displayName = "VegetablesSection";

export default VegetablesSection;
