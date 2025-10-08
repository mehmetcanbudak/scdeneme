"use client";

import { useEffect } from "react";
import { useFooterColor } from "@/contexts/footer-color-context";

/**
 * Hook to set footer background color for the current page
 * @param color - The background color for the footer (hex, rgb, or tailwind color)
 */
export function useFooterColorSetter(color: string) {
	const { setFooterColor } = useFooterColor();

	useEffect(() => {
		setFooterColor(color);

		// Reset to default when component unmounts
		return () => {
			setFooterColor("#E7EBDE");
		};
	}, [color, setFooterColor]);
}
