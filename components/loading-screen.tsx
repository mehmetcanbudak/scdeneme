"use client";

import { memo } from "react";
import Image from "next/image";

interface LoadingScreenProps {
	fullScreen?: boolean;
	className?: string;
}

/**
 * Loading screen component with Skycrops logo animation
 * Used for initial site load and page transitions
 *
 * @param {LoadingScreenProps} props - Component props
 * @returns {React.ReactElement} The loading screen component
 */
const LoadingScreen = memo(function LoadingScreen({
	fullScreen = true,
	className = "",
}: LoadingScreenProps) {
	return (
		<div
			className={`${
				fullScreen ? "fixed inset-0 z-[9999]" : "relative"
			} flex items-center justify-center bg-white ${className}`}
			aria-live="polite"
			aria-busy="true"
			role="status"
		>
			<div className="flex flex-col items-center justify-center">
				{/* Animated Logo */}
				<div className="animate-logo-entrance animate-logo-loading">
					<Image
						src="/skycrops-logo.svg"
						alt="Skycrops Loading"
						width={400}
						height={150}
						className="w-full max-w-xs md:max-w-md h-auto"
						priority
						unoptimized
					/>
				</div>

				{/* Screen reader text */}
				<span className="sr-only">Yükleniyor...</span>
			</div>
		</div>
	);
});

export default LoadingScreen;
