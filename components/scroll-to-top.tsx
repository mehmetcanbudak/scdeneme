"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
	const _pathname = usePathname();

	useEffect(() => {
		// Scroll to top when pathname changes (route change)
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		// Scroll to top on initial page load
		window.scrollTo(0, 0);
	}, []);

	return null;
}
