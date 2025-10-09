/**
 * Custom hook for navbar scroll behavior
 * Handles scroll detection and transparency state with optimized performance
 */

import { useNavigation } from "@/components/navigation-context";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { UseNavbarScrollReturn } from "./navbar.types";

const SCROLL_THRESHOLD = 50;

/**
 * Throttle function using requestAnimationFrame for smooth 60fps performance
 * More efficient than setTimeout-based throttling
 */
function throttleRAF<T extends (...args: any[]) => any>(
	func: T,
): (...args: Parameters<T>) => void {
	let rafId: number | null = null;
	let lastArgs: Parameters<T> | null = null;

	return function (this: any, ...args: Parameters<T>) {
		lastArgs = args;

		if (rafId === null) {
			rafId = requestAnimationFrame(() => {
				if (lastArgs) {
					func.apply(this, lastArgs);
				}
				rafId = null;
				lastArgs = null;
			});
		}
	};
}

/**
 * Hook to manage navbar scroll state and transparency
 * @returns {UseNavbarScrollReturn} Scroll state and transparency flag
 */
export function useNavbarScroll(): UseNavbarScrollReturn {
	const [isScrolled, setIsScrolled] = useState(false);
	const navigationContext = useNavigation();
	const throttledScrollRef = useRef<(() => void) | null>(null);

	if (!navigationContext) {
		throw new Error("useNavbarScroll must be used within a NavigationProvider");
	}

	const { isTransparent } = navigationContext;

	// Handle scroll events with RAF throttling
	const handleScroll = useCallback(() => {
		const scrollY = window.scrollY;
		setIsScrolled(scrollY > SCROLL_THRESHOLD);
	}, []);

	// Set up scroll listener with RAF throttling
	useEffect(() => {
		if (!throttledScrollRef.current) {
			throttledScrollRef.current = throttleRAF(handleScroll);
		}

		const throttledHandler = throttledScrollRef.current;
		window.addEventListener("scroll", throttledHandler, { passive: true });

		// Initial check
		handleScroll();

		return () => {
			window.removeEventListener("scroll", throttledHandler);
		};
	}, [handleScroll]);

	// Determine if navbar should be transparent
	const shouldBeTransparent = useMemo(
		() => isTransparent && !isScrolled,
		[isTransparent, isScrolled],
	);

	return {
		isScrolled,
		shouldBeTransparent,
	};
}
