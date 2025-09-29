"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		// Scroll to top when pathname changes (route change)
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		// Scroll to top on initial page load
		window.scrollTo(0, 0);
	}, []);

	return null;
}
