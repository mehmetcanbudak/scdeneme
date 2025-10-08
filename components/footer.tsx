"use client";

import { useFooterColor } from "@/contexts/footer-color-context";
import type { FooterSection } from "@/lib/navigation-config";
import { FOOTER_POLICY_LINKS, FOOTER_SECTIONS } from "@/lib/navigation-config";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface FooterProps {
	className?: string;
	showLogo?: boolean;
	copyrightText?: string;
}

interface FooterLinkProps {
	href: string;
	label: string;
	external?: boolean;
	ariaLabel?: string;
	type?: "link" | "email" | "tel";
	className?: string;
	textColorClass?: string;
	textHoverClass?: string;
	textFocusClass?: string;
}

/**
 * Footer link component with proper external link handling
 */
const FooterLink = memo(function FooterLink({
	href,
	label,
	external = false,
	ariaLabel,
	type = "link",
	className,
	textColorClass = "text-gray-600",
	textHoverClass = "hover:text-gray-800",
	textFocusClass = "focus:text-gray-800",
}: FooterLinkProps) {
	const isExternal = external || href.startsWith("http");
	const isSpecialType = type === "email" || type === "tel";

	const linkClassName = useMemo(
		() =>
			className ||
			`block text-base ${textColorClass} ${textHoverClass} transition-colors duration-200 ${textFocusClass} focus:outline-none focus:underline`,
		[className, textColorClass, textHoverClass, textFocusClass],
	);

	const linkProps = useMemo(
		() => ({
			href,
			className: linkClassName,
			"aria-label": ariaLabel,
			...(isExternal &&
				!isSpecialType && {
					target: "_blank",
					rel: "noopener noreferrer",
				}),
		}),
		[href, linkClassName, ariaLabel, isExternal, isSpecialType],
	);

	if (isExternal && !isSpecialType) {
		return <a {...linkProps}>{label}</a>;
	}

	return <Link {...linkProps}>{label}</Link>;
});

/**
 * Footer component with sticky reveal animation
 * Features:
 * - Responsive grid layout for navigation sections
 * - Large logo display at bottom
 * - Sticky reveal animation effect
 * - Accessible navigation with ARIA labels
 * - Support for external links, email, and phone links
 */
const Footer = memo(function Footer({
	className = "",
	showLogo = true,
	copyrightText = "© 2025 Skycrops. Tüm hakları saklıdır.",
}: FooterProps) {
	const { footerColor } = useFooterColor();
	const DEFAULT_FOOTER_HEIGHT = 500;
	const footerRef = useRef<HTMLDivElement | null>(null);
	const [footerHeight, setFooterHeight] = useState(DEFAULT_FOOTER_HEIGHT);

	// Determine if footer should use white text (for red/pink backgrounds)
	const isRedBackground = footerColor === "#DC4F34";
	const isPinkBackground = footerColor === "#DF626B";
	const shouldUseWhiteText = isRedBackground || isPinkBackground;
	const textColorClass = shouldUseWhiteText ? "text-white" : "text-gray-600";
	const textHoverClass = shouldUseWhiteText
		? "hover:text-gray-200"
		: "hover:text-gray-800";
	const textFocusClass = shouldUseWhiteText
		? "focus:text-gray-200"
		: "focus:text-gray-800";
	const titleColorClass = shouldUseWhiteText ? "text-white" : "text-gray-800";
	const borderColorClass = shouldUseWhiteText
		? "border-gray-400"
		: "border-gray-300";

	useEffect(() => {
		const node = footerRef.current;
		if (!node) {
			return;
		}

		const updateHeight = () => {
			const currentNode = footerRef.current;
			if (!currentNode) {
				return;
			}
			const measuredHeight = Math.round(
				currentNode.getBoundingClientRect().height,
			);
			if (measuredHeight) {
				setFooterHeight((prev) =>
					prev !== measuredHeight ? measuredHeight : prev,
				);
			}
		};

		updateHeight();

		if (typeof ResizeObserver !== "undefined") {
			const observer = new ResizeObserver(updateHeight);
			observer.observe(node);
			return () => {
				observer.disconnect();
			};
		}

		if (typeof window !== "undefined") {
			window.addEventListener("resize", updateHeight);
			return () => {
				window.removeEventListener("resize", updateHeight);
			};
		}
	}, []);

	const stickyOffset = useMemo(
		() => `max(0px, calc(100vh - ${footerHeight}px))`,
		[footerHeight],
	);

	/**
	 * Renders a footer section with links
	 */
	const renderFooterSection = useCallback(
		(section: FooterSection, index: number) => (
			<div key={`${section.title}-${index}`} className="space-y-4">
				<h3
					className={`text-xl md:text-2xl font-medium leading-snug ${titleColorClass} uppercase tracking-wide`}
				>
					{section.title}
				</h3>
				<nav className="space-y-2" aria-label={`${section.title} menüsü`}>
					{section.links.map((link, linkIndex) => {
						const uniqueKey = `${section.title}-${link.href}-${linkIndex}`;

						// Special rendering for address section
						if (section.title === "Adres") {
							return (
								<a
									key={uniqueKey}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className={`block text-base ${textColorClass} ${textHoverClass} transition-colors duration-200 ${textFocusClass} focus:outline-none focus:underline`}
									aria-label={link.ariaLabel}
								>
									<div className="space-y-1">
										<div>Çorlu 1 OSB</div>
										<div>Bülent Ecevit Caddesi No:13/1</div>
										<div>PK: 59860 – Tekirdağ, Türkiye</div>
									</div>
								</a>
							);
						}

						return (
							<FooterLink
								key={uniqueKey}
								href={link.href}
								label={link.label}
								external={link.external}
								ariaLabel={link.ariaLabel}
								type={link.type}
								textColorClass={textColorClass}
								textHoverClass={textHoverClass}
								textFocusClass={textFocusClass}
							/>
						);
					})}
				</nav>
			</div>
		),
		[textColorClass, textHoverClass, textFocusClass, titleColorClass],
	);

	const footerSections = useMemo(
		() =>
			FOOTER_SECTIONS.map((section, index) =>
				renderFooterSection(section, index),
			),
		[renderFooterSection],
	);

	const policyLinks = useMemo(
		() => (
			<nav
				className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6"
				aria-label="Politika menüsü"
			>
				{FOOTER_POLICY_LINKS.map((link, index) => (
					<Link
						key={`${link.href}-${index}`}
						href={link.href}
						className={`text-sm ${textColorClass} ${textHoverClass} transition-colors duration-200 ${textFocusClass} focus:outline-none focus:underline`}
					>
						{link.label}
					</Link>
				))}
			</nav>
		),
		[textColorClass, textHoverClass, textFocusClass],
	);

	return (
		<div
			className="relative"
			style={{
				height: `${footerHeight}px`,
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			}}
		>
			<div
				className="relative"
				style={{
					height: `calc(100vh + ${footerHeight}px)`,
					top: "-100vh",
				}}
			>
				<div className="sticky left-0 right-0" style={{ top: stickyOffset }}>
					<footer
						ref={footerRef}
						className={`py-6 sm:py-8 px-4 sm:px-6 border-t overflow-x-hidden transition-colors duration-300 ${className}`}
						style={{ backgroundColor: footerColor }}
						role="contentinfo"
						aria-label="Site footer"
					>
						<div className="mx-4 sm:mx-8 md:mx-12">
							{/* Footer Content Wrapper */}
							<div className="flex flex-col space-y-6 sm:space-y-8">
								{/* Navigation Sections */}
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
									{footerSections}
								</div>

								{/* Logo Section */}
								{showLogo && (
									<div className="flex items-center justify-center py-2">
										<Link
											href="/"
											aria-label="SkyCrops ana sayfasına git"
											className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E7EBDE] focus-visible:ring-gray-500/40 transition-opacity hover:opacity-80"
										>
											<Image
												src="/skycrops-logo.svg"
												alt="SkyCrops Logo"
												width={300}
												height={100}
												className="w-full max-w-md md:max-w-2xl h-auto"
												unoptimized
												priority={false}
											/>
										</Link>
									</div>
								)}

								{/* Copyright and policies section */}
								<div
									className={`border-t ${borderColorClass} pt-4 sm:pt-6 mt-auto`}
								>
									<div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
										{/* Copyright */}
										<p
											className={`text-sm ${textColorClass} text-center md:text-left`}
										>
											{copyrightText}
										</p>

										{/* Policy links */}
										{policyLinks}
									</div>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
});

export default Footer;
