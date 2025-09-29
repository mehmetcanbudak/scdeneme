"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "./navigation-context";

export interface HeroSlide {
	id?: string;
	title: string;
	subtitle: string;
	buttonText?: string;
	buttonAction?: () => void;
	image?: string;
	video?: string;
	alt?: string;
}

export interface HeroButton {
	text: string;
	onClick?: () => void;
	variant?: "outline" | "default" | "ghost";
	size?: "sm" | "default" | "lg";
}

interface HeroHeaderProps {
	slides: HeroSlide[];
	onScrollToNext?: () => void;
	showDots?: boolean;
	showButton?: boolean;
	singleImage?: boolean;
	customHeight?: string;
	autoPlay?: boolean;
	autoPlayInterval?: number;
	className?: string;
	contentClassName?: string;
	overlayClassName?: string;
	showScrollButton?: boolean;
	mediaFit?: "cover" | "contain";
	backgroundColor?: string;
}

const HeroHeader = memo(function HeroHeader({
	slides,
	onScrollToNext,
	showDots = true,
	showButton = true,
	singleImage = false,
	customHeight = "100vh",
	autoPlay = true,
	autoPlayInterval = 5000,
	className = "",
	contentClassName = "",
	overlayClassName = "",
	showScrollButton = true,
	mediaFit = "cover",
	backgroundColor = "transparent",
}: HeroHeaderProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(autoPlay && !singleImage);
	const navigation = useNavigation();

	// Validate slides prop
	const validSlides = useMemo(() => {
		if (!Array.isArray(slides) || slides.length === 0) {
			console.warn("HeroHeader: slides prop must be a non-empty array");
			return [
				{
					title: "Welcome",
					subtitle: "Default slide",
					buttonText: "Learn More",
					image: "/placeholder.svg",
					alt: "Default hero image",
				},
			];
		}
		return slides;
	}, [slides]);

	const totalSlides = validSlides.length;
	const isMobileSidebarOpen = navigation?.isMobileSidebarOpen || false;

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
				marginLeft: "calc(50% - 50vw)",
				marginRight: "calc(50% - 50vw)",
			}}
			role="banner"
			aria-label="Hero section"
		>
			{/* Background media */}
			<div
				className="absolute inset-0"
				style={{
					backgroundColor,
					width: "100vw",
					left: "50%",
					right: "50%",
					marginLeft: "-50vw",
					marginRight: "-50vw",
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
						aria-hidden="true"
						onError={(e) => {
							console.warn("Video failed to load:", currentSlideData.video);
							// Fallback to image if video fails
							const target = e.target as HTMLVideoElement;
							target.style.display = "none";
						}}
					/>
				) : (
					<img
						key={currentSlideData.image || currentSlideData.title}
						src={currentSlideData.image || "/placeholder.svg"}
						alt={currentSlideData.alt || currentSlideData.title}
						className={`w-full h-full ${mediaFitClass} transition-opacity duration-1000`}
						loading={currentSlide === 0 ? "eager" : "lazy"}
						onError={(e) => {
							console.warn("Image failed to load:", currentSlideData.image);
							const target = e.target as HTMLImageElement;
							target.src = "/placeholder.svg";
						}}
					/>
				)}
				{/* Overlay */}
				<div
					className={`absolute inset-0 bg-black/25 ${overlayClassName}`}
					aria-hidden="true"
				/>
			</div>

			{/* Content */}
			<div
				className={`relative z-10 h-full flex items-center justify-center text-center text-white ${contentClassName}`}
			>
				<div className="max-w-5xl mx-auto px-6">
					<div className="mb-8">
						{/* Subtitle */}
						{currentSlideData.subtitle && (
							<h2 className="text-sm uppercase tracking-[0.3em] mb-4 opacity-90 font-medium animate-fade-in">
								{currentSlideData.subtitle}
							</h2>
						)}

						{/* Title */}
						<h1 className="text-4xl md:text-6xl font-light mb-8 tracking-wide leading-tight animate-fade-in">
							{currentSlideData.title}
						</h1>

						{/* Button */}
						{showButton && currentSlideData.buttonText && (
							<Button
								type="button"
								size="lg"
								onClick={handleButtonClick}
								className="px-8 py-3 uppercase tracking-widest transition-all duration-300 animate-fade-in"
								aria-label={`${currentSlideData.buttonText} - ${currentSlideData.title}`}
							>
								{currentSlideData.buttonText}
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Navigation dots */}
			{showDots && hasMultipleSlides && (
				<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
					<div
						className="flex space-x-2"
						role="tablist"
						aria-label="Slide navigation"
					>
						{validSlides.map((_, index) => (
							<button
								key={index}
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

			{/* Scroll down button */}
			{showScrollButton && onScrollToNext && !isMobileSidebarOpen && (
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
					<button
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
