"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "./navigation-context";

/**
 * Hero slide interface with required fields and optional enhancements
 */
export interface HeroSlide {
	/** Unique identifier for the slide */
	id?: string;
	/** Main title text displayed prominently */
	title: string;
	/** Subtitle text displayed below the title */
	subtitle: string;
	/** Text for the call-to-action button */
	buttonText?: string;
	/** Action to perform when button is clicked */
	buttonAction?: () => void;
	/** Desktop image source */
	image?: string;
	/** Mobile-optimized image source */
	mobileImage?: string;
	/** Video source (alternative to images) */
	video?: string;
	/** Alt text for desktop image */
	alt?: string;
	/** Alt text for mobile image */
	mobileAlt?: string;
	/** Logo image source */
	logo?: string;
}

export interface HeroButton {
	text: string;
	onClick?: () => void;
	variant?: "outline" | "default" | "ghost";
	size?: "sm" | "default" | "lg";
}

/**
 * HeroHeader component props interface
 */
interface HeroHeaderProps {
	/** Array of hero slides to display */
	slides: HeroSlide[];
	/** @deprecated No longer used - scroll arrows are disabled by default */
	onScrollToNext?: () => void;
	/** Show navigation dots for multiple slides */
	showDots?: boolean;
	/** Show call-to-action buttons on slides */
	showButton?: boolean;
	/** Display as single image (no carousel) */
	singleImage?: boolean;
	/** Custom height for the hero section */
	customHeight?: string;
	/** Enable auto-play for carousel */
	autoPlay?: boolean;
	/** Interval between auto-play transitions (ms) */
	autoPlayInterval?: number;
	/** Additional CSS classes for the container */
	className?: string;
	/** Additional CSS classes for content area */
	contentClassName?: string;
	/** @deprecated Not used in current implementation */
	overlayClassName?: string;
	/** @deprecated Scroll arrows are disabled by default - use for backward compatibility only */
	showScrollButton?: boolean;
	/** How media should fit within the container */
	mediaFit?: "cover" | "contain";
	/** Background color for the hero section */
	backgroundColor?: string;
}

const HeroHeader = memo(function HeroHeader({
	slides,
	onScrollToNext,
	showDots = false,
	showButton = false,
	singleImage = true,
	customHeight = "100vh",
	autoPlay = false,
	autoPlayInterval = 5000,
	className = "",
	contentClassName = "",
	showScrollButton = false,
	mediaFit = "contain",
	backgroundColor = "transparent",
}: HeroHeaderProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(autoPlay && !singleImage);
	const isMobile = useIsMobile();
	const navigation = useNavigation();

	// Validate slides prop with better error handling
	const validSlides = useMemo(() => {
		if (!Array.isArray(slides)) {
			console.error("HeroHeader: slides prop must be an array");
			return [];
		}

		if (slides.length === 0) {
			console.warn(
				"HeroHeader: slides array is empty, component will not render",
			);
			return [];
		}

		// Validate each slide has required fields (allow empty strings for image-only slides)
		const validatedSlides = slides.filter((slide, index) => {
			if (typeof slide.title !== "string") {
				console.warn(`HeroHeader: slide ${index} title must be a string`);
				return false;
			}
			if (typeof slide.subtitle !== "string") {
				console.warn(`HeroHeader: slide ${index} subtitle must be a string`);
				return false;
			}
			return true;
		});

		if (validatedSlides.length === 0) {
			console.error("HeroHeader: no valid slides found");
			return [];
		}

		return validatedSlides;
	}, [slides]);

	const totalSlides = validSlides.length;
	const isMobileSidebarOpen = navigation?.isMobileSidebarOpen || false;

	// Early return if no valid slides
	if (totalSlides === 0) {
		return (
			<div
				className="flex items-center justify-center bg-gray-100 text-gray-500"
				style={{ height: customHeight }}
			>
				<p>No valid slides to display</p>
			</div>
		);
	}

	const handleSlideChange = useCallback(
		(index: number) => {
			if (index >= 0 && index < totalSlides) {
				setCurrentSlide(index);
				setProgress(0);
			}
		},
		[totalSlides],
	);

	const handleScrollToNext = useCallback(() => {
		onScrollToNext?.();
	}, [onScrollToNext]);

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % totalSlides);
		setProgress(0);
	}, [totalSlides]);

	const prevSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
		setProgress(0);
	}, [totalSlides]);

	const togglePlayPause = useCallback(() => {
		setIsPlaying((prev) => !prev);
	}, []);

	// Auto-play functionality
	useEffect(() => {
		if (singleImage || !isPlaying || totalSlides <= 1) return;

		const progressIncrement = 100 / (autoPlayInterval / 100); // Update every 100ms

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					nextSlide();
					return 0;
				}
				return prev + progressIncrement;
			});
		}, 100);

		return () => clearInterval(interval);
	}, [totalSlides, singleImage, isPlaying, autoPlayInterval, nextSlide]);

	// Pause auto-play when mobile sidebar is open
	useEffect(() => {
		if (isMobileSidebarOpen) {
			setIsPlaying(false);
		} else if (autoPlay && !singleImage) {
			setIsPlaying(true);
		}
	}, [isMobileSidebarOpen, autoPlay, singleImage]);

	const currentSlideData = validSlides[currentSlide] || validSlides[0];
	const resolvedImage =
		isMobile && currentSlideData.mobileImage
			? currentSlideData.mobileImage
			: currentSlideData.image;
	const resolvedAlt =
		isMobile && currentSlideData.mobileAlt
			? currentSlideData.mobileAlt
			: currentSlideData.alt || currentSlideData.title;
	const hasMultipleSlides = totalSlides > 1;
	const mediaFitClass =
		mediaFit === "contain" ? "object-contain" : "object-cover";

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!hasMultipleSlides) return;

			switch (event.key) {
				case "ArrowLeft":
					prevSlide();
					break;
				case "ArrowRight":
					nextSlide();
					break;
				case " ":
					event.preventDefault();
					togglePlayPause();
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [hasMultipleSlides, prevSlide, nextSlide, togglePlayPause]);

	const handleButtonClick = useCallback(() => {
		if (currentSlideData.buttonAction) {
			currentSlideData.buttonAction();
		}
	}, [currentSlideData]);

	return (
		<header
			className={`relative w-full ${className}`}
			style={{
				height: customHeight,
				backgroundColor,
				minWidth: "100vw",
				//marginLeft: "calc(50% - 50vw)",
				//marginRight: "calc(50% - 50vw)",
			}}
		>
			{/* Background media */}
			<div
				className="absolute inset-0"
				style={{
					backgroundColor,
					width: "100vw",
					left: "0%",
					right: "0%",
					marginLeft: "0vw",
					marginRight: "0vw",
				}}
			>
				{currentSlideData.video ? (
					<video
						key={currentSlideData.video}
						src={currentSlideData.video}
						className={`w-full h-full ${mediaFitClass} transition-opacity duration-1000`}
						autoPlay
						muted
						loop
						playsInline
						onError={(e) => {
							console.warn("Video failed to load:", currentSlideData.video);
							// Fallback to image if video fails
							const target = e.target as HTMLVideoElement;
							target.style.display = "none";
						}}
					/>
				) : (
					<Image
						key={
							resolvedImage || currentSlideData.image || currentSlideData.title
						}
						src={resolvedImage || "/placeholder.svg"}
						alt={resolvedAlt}
						fill
						className={`${mediaFitClass} transition-opacity duration-1000`}
						priority={currentSlide === 0}
						quality={85}
						sizes="100vw"
						onError={(e) => {
							console.warn("Image failed to load:", currentSlideData.image);
							const target = e.target as HTMLImageElement;
							target.src = "/placeholder.svg";
						}}
					/>
				)}
				{/* Overlay */}
				{/* <div
					className={`absolute inset-0 bg-black/25 ${overlayClassName}`}
					aria-hidden="true"
				/> */}
			</div>

			{/* Content */}
			<div
				className={`relative z-10 h-full flex items-center justify-center text-center text-white ${contentClassName}`}
			>
				<div className="max-w-5xl mx-auto px-6">
					<div className="mb-8">
						{/* Logo or Text Content */}
						{currentSlideData.logo ? (
							<div className="flex items-center justify-center mb-8 animate-logo-entrance">
								<Image
									src={currentSlideData.logo}
									alt={currentSlideData.alt || currentSlideData.title}
									width={800}
									height={400}
									className="w-full max-w-md md:max-w-2xl h-auto"
									priority={currentSlide === 0}
									quality={85}
								/>
							</div>
						) : (
							<>
								{/* Subtitle */}
								{currentSlideData.subtitle && (
									<h2 className="text-4xl md:text-6xl uppercase tracking-[0.3em] mb-4 opacity-90 font-medium animate-fade-in">
										{currentSlideData.subtitle}
									</h2>
								)}

								{/* Title */}
								<h1 className="text-16xl md:text-24xl font-light mb-8 tracking-wide leading-tight animate-fade-in">
									{currentSlideData.title}
								</h1>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Button positioned above scroll arrow */}
			{showButton && currentSlideData.buttonText && !isMobileSidebarOpen && (
				<div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20">
					<Button
						type="button"
						size="lg"
						onClick={handleButtonClick}
						className="px-8 py-3 uppercase tracking-widest transition-all duration-300 animate-fade-in"
						aria-label={`${currentSlideData.buttonText} - ${currentSlideData.title}`}
					>
						{currentSlideData.buttonText}
					</Button>
				</div>
			)}

			{/* Navigation dots */}
			{showDots && hasMultipleSlides && (
				<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
					<div
						className="flex space-x-2"
						role="tablist"
						aria-label="Slide navigation"
					>
						{validSlides.map((slide, index) => (
							<button
								key={`slide-${slide.title}-${index}`}
								type="button"
								onClick={() => handleSlideChange(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
									index === currentSlide
										? "bg-white scale-110"
										: "bg-white/50 hover:bg-white/70"
								}`}
								aria-label={`Go to slide ${index + 1}`}
								role="tab"
								aria-selected={index === currentSlide}
							>
								<span className="sr-only">Slide {index + 1}</span>
							</button>
						))}
					</div>

					{/* Progress bar */}
					{isPlaying && !singleImage && (
						<div className="w-full h-1 bg-white/20 rounded-full mt-4 overflow-hidden">
							<div
								className="h-full bg-white transition-all duration-100 ease-linear"
								style={{ width: `${progress}%` }}
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
			)}

			{/* Scroll down button - DEPRECATED: Scroll arrows are disabled by default */}
			{showScrollButton && !isMobileSidebarOpen && (
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
					<button
						type="button"
						onClick={handleScrollToNext}
						className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-1000 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent animate-bounce"
						aria-label="Sonraki bölüme git"
					>
						<ChevronDown className="w-5 h-5 text-gray-600" />
					</button>
				</div>
			)}

			{/* Screen reader content */}
			<div className="sr-only">
				<p>
					Slide {currentSlide + 1} of {totalSlides}
				</p>
				{hasMultipleSlides && (
					<p>
						Use left and right arrow keys to navigate slides, spacebar to
						pause/play
					</p>
				)}
			</div>
		</header>
	);
});

export default HeroHeader;
