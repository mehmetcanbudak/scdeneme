"use client";

import { memo, useEffect, useState } from "react";
import LoadingScreen from "./loading-screen";

/**
 * Initial site loader component
 * Shows on first visit and fades out when the site is loaded
 *
 * @returns {React.ReactElement | null} The initial loader component or null
 */
const InitialLoader = memo(function InitialLoader() {
	const [isLoading, setIsLoading] = useState(true);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		// Check if this is the first load
		const hasLoaded = sessionStorage.getItem("skycrops-loaded");

		if (hasLoaded) {
			// If already loaded in this session, don't show loader
			setIsLoading(false);
			return;
		}

		// Minimum display time of 1.5 seconds for the animation to play
		const minDisplayTime = 1500;
		const startTime = Date.now();

		const handleLoad = () => {
			const elapsedTime = Date.now() - startTime;
			const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

			setTimeout(() => {
				// Start fade out animation
				setIsFading(true);

				// Remove loader after fade out completes
				setTimeout(() => {
					setIsLoading(false);
					sessionStorage.setItem("skycrops-loaded", "true");
				}, 500); // Match this with the fade-out duration
			}, remainingTime);
		};

		// Wait for the page to be fully loaded
		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);
			return () => window.removeEventListener("load", handleLoad);
		}
	}, []);

	if (!isLoading) {
		return null;
	}

	return (
		<div
			className={`fixed inset-0 z-[9999] bg-white transition-opacity duration-500 ${
				isFading ? "opacity-0" : "opacity-100"
			}`}
		>
			<LoadingScreen fullScreen={false} className="h-full" />
		</div>
	);
});

export default InitialLoader;
