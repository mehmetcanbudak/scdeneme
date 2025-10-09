"use client";

import { useNavigation } from "@/components/navigation-context";
import { useEffect } from "react";

export function useHeaderColor(color: string = "#B2A79D") {
	const { setHeaderBgColor } = useNavigation();

	useEffect(() => {
		setHeaderBgColor(color);

		// Cleanup: reset to default color when component unmounts
		return () => setHeaderBgColor("#B2A79D");
	}, [color, setHeaderBgColor]);
}
