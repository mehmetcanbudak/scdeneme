"use client";

import { ReactNode, useCallback, useEffect, useRef } from "react";
import { memo } from "react";
import { ChevronDown } from "lucide-react";

interface HeroSlide {
	title?: string;
	subtitle?: string;
	buttonText?: string;
	buttonAction?: () => void;
	image: string;
	mobileImage?: string;
	mobileAlt?: string;
	logo?: string;
	alt: string;
	mediaFit?: "cover" | "contain";
}

interface HeroSectionProps {
	slides: HeroSlide[];
	singleImage?: boolean;
	showDots?: boolean;
	showButton?: boolean;
	showScrollIndicator?: boolean;
	customHeight?: string;
	backgroundColor?: string;
	mediaFit?: "cover" | "contain";
	className?: string;
	onSlideChange?: (index: number) => void;
}

const HeroSection = memo(function HeroSection({
	slides,
	singleImage = false,
	showDots = true,
	showButton = true,
	showScrollIndicator = true,
	customHeight = "100vh",
	backgroundColor,
	mediaFit = "cover",
	className = "",
	onSlideChange,
}: HeroSectionProps) {
	const currentSlideRef = useRef(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Auto-advance slides
	useEffect(() => {
		if (slides.length > 1 && !singleImage) {
			intervalRef.current = setInterval(() => {
				currentSlideRef.current = (currentSlideRef.current + 1) % slides.length;
				onSlideChange?.(currentSlideRef.current);
			}, 5000); // Change slide every 5 seconds
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [slides.length, singleImage, onSlideChange]);

	const handleSlideClick = useCallback(
		(index: number) => {
			currentSlideRef.current = index;
			onSlideChange?.(index);
		},
		[onSlideChange],
	);

	const handleScrollToNext = useCallback(() => {
		const nextSection = document.querySelector("[data-section='next']");
		if (nextSection) {
			const headerHeight = 64;
			const elementPosition =
				nextSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}, []);

	const currentSlide = slides[currentSlideRef.current];

	return (
		<section
			className={`relative overflow-hidden ${className}`}
			style={{ height: customHeight }}
		>
			{/* Background */}
			<div
				className="absolute inset-0 z-0"
				style={{ backgroundColor: backgroundColor || "transparent" }}
			>
				{/* Desktop Image */}
				<div className="hidden md:block absolute inset-0">
					<img
						src={currentSlide.image}
						alt={currentSlide.alt}
						className={`w-full h-full object-${mediaFit}`}
						loading="eager"
						fetchPriority="high"
					/>
				</div>

				{/* Mobile Image */}
				<div className="md:hidden absolute inset-0">
					<img
						src={currentSlide.mobileImage || currentSlide.image}
						alt={currentSlide.mobileAlt || currentSlide.alt}
						className={`w-full h-full object-${mediaFit}`}
						loading="eager"
						fetchPriority="high"
					/>
				</div>
			</div>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/20 z-10" />

			{/* Content */}
			<div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Logo */}
					{currentSlide.logo && (
						<div className="mb-8">
							<img
								src={currentSlide.logo}
								alt={currentSlide.alt}
								className="h-16 sm:h-20 object-contain"
								loading="lazy"
							/>
						</div>
					)}

					{/* Title */}
					{currentSlide.title && (
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
							{currentSlide.title}
						</h1>
					)}

					{/* Subtitle */}
					{currentSlide.subtitle && (
						<p className="text-xl sm:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
							{currentSlide.subtitle}
						</p>
					)}

					{/* Button */}
					{showButton &&
						currentSlide.buttonText &&
						currentSlide.buttonAction && (
							<button
								onClick={currentSlide.buttonAction}
								className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg sm:text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								{currentSlide.buttonText}
							</button>
						)}
				</div>
			</div>

			{/* Navigation Dots */}
			{showDots && slides.length > 1 && (
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => handleSlideClick(index)}
							className={`w-3 h-3 rounded-full transition-all duration-200 ${
								index === currentSlideRef.current
									? "bg-white scale-125"
									: "bg-white/50 hover:bg-white/75"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}

			{/* Scroll Indicator */}
			{showScrollIndicator && (
				<button
					onClick={handleScrollToNext}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 group"
					aria-label="Scroll to next section"
				>
					<ChevronDown className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-200 animate-bounce" />
				</button>
			)}
		</section>
	);
});

export default HeroSection;
