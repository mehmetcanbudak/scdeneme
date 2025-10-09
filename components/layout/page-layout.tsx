"use client";

import { ReactNode } from "react";
import { memo } from "react";

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
	header?: ReactNode;
	footer?: ReactNode;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl";
	padding?: "none" | "sm" | "md" | "lg";
	background?: string;
}

const PageLayout = memo(function PageLayout({
	children,
	className = "",
	header,
	footer,
	maxWidth = "7xl",
	padding = "lg",
	background,
}: PageLayoutProps) {
	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"7xl": "max-w-7xl",
	};

	const paddingClasses = {
		none: "",
		sm: "px-4 sm:px-6",
		md: "px-4 sm:px-6 lg:px-8",
		lg: "px-4 sm:px-6 lg:px-8",
	};

	const backgroundClass = background ? `bg-[${background}]` : "";

	return (
		<div className={`min-h-screen ${backgroundClass} ${className}`}>
			{header && (
				<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div
						className={`${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} mx-auto`}
					>
						{header}
					</div>
				</header>
			)}

			<main
				className={`${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} mx-auto`}
			>
				{children}
			</main>

			{footer && (
				<footer className="w-full border-t bg-background">
					<div
						className={`${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} mx-auto`}
					>
						{footer}
					</div>
				</footer>
			)}
		</div>
	);
});

export default PageLayout;
