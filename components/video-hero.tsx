"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "./navigation-context";

interface Slide {
	title: string;
	subtitle: string;
	buttonText: string;
	image: string;
}

interface VideoHeroProps {
	slides?: Slide[];
	onScrollToNext?: () => void;
	customHeight?: string;
	showDots?: boolean;
	showButton?: boolean;
	singleImage?: boolean;
}

const VideoHero = memo(function VideoHero({
	slides = [],
	onScrollToNext,
	customHeight = "100vh",
	showButton = true,
}: VideoHeroProps) {
	const { isMobileSidebarOpen } = useNavigation();
	const videoElRef = useRef<HTMLVideoElement>(null);
	const fallbackRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleScrollToNext = useCallback(() => {
		if (onScrollToNext) {
			onScrollToNext();
		}
	}, [onScrollToNext]);

	// Intersection Observer for lazy loading
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: "50px" },
		);

		const target = (videoElRef.current as Element) || (fallbackRef.current as Element);
		if (target) {
			observer.observe(target);
		}

		return () => observer.disconnect();
	}, []);

	// Load video when in view
	useEffect(() => {
		if (isInView && !isLoaded) {
			setIsLoaded(true);
		}
	}, [isInView, isLoaded]);

	const currentSlideData = slides[0] || {
		title: "SKYCROPS",
		subtitle: "MODERN TARIM",
		buttonText: "",
		image: "",
	};

	return (
		<div
			className="relative"
			style={{
				height: customHeight || "100vh",
			}}
		>
			{/* Hero Section */}
			<section className="relative h-full overflow-visible z-10">
				<div className="absolute inset-0">
					{isLoaded ? (
						<video
							ref={videoElRef}
							autoPlay
							loop
							muted
							playsInline
							className="w-full h-full object-cover"
							preload="metadata"
						>
							<source src="/skycrops-web.mp4" type="video/mp4" />
							<source src="/skycrops-compressed.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					) : (
						<div
							ref={fallbackRef}
							className="w-full h-full bg-gray-900 animate-pulse"
						/>
					)}
					<div className="absolute inset-0 bg-black/50"></div>
				</div>

				<div className="relative z-10 h-full flex items-center justify-center text-center text-white">
					<div className="max-w-5xl mx-auto px-6">
						<div className="mb-8">
							<h2 className="text-sm uppercase tracking-[0.3em] mb-4 opacity-90 font-medium">
								{currentSlideData.subtitle}
							</h2>
							<h1 className="text-4xl md:text-6xl font-light mb-8 tracking-wide leading-tight">
								{currentSlideData.title}
							</h1>
							{showButton && currentSlideData.buttonText && (
								<Button
									variant="outline"
									size="lg"
									className="bg-transparent border-white text-white hover:bg-white hover:text-black px-8 py-3 uppercase tracking-widest transition-all duration-300"
								>
									{currentSlideData.buttonText}
								</Button>
							)}
						</div>
					</div>
				</div>

				{/* Scroll down arrow button */}
				{onScrollToNext && !isMobileSidebarOpen && (
					<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
						<button
							onClick={handleScrollToNext}
							type="button"
							className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-110"
							aria-label="Aşağı kaydır"
						>
							<ChevronDown className="w-5 h-5 text-black" />
						</button>
					</div>
				)}
			</section>
		</div>
	);
});

export default VideoHero;
