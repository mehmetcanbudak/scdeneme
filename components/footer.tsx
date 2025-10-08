"use client";

import type { FooterSection } from "@/lib/navigation-config";
import { FOOTER_POLICY_LINKS, FOOTER_SECTIONS } from "@/lib/navigation-config";
import { useFooterColor } from "@/contexts/footer-color-context";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useMemo } from "react";

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
}: FooterLinkProps) {
	const isExternal = external || href.startsWith("http");
	const isSpecialType = type === "email" || type === "tel";

	const linkClassName = useMemo(
		() =>
			className ||
			"block text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline",
		[className],
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
	/**
	 * Renders a footer section with links
	 */
	const renderFooterSection = useCallback(
		(section: FooterSection, index: number) => (
			<div key={`${section.title}-${index}`} className="space-y-4">
				<h3 className="text-xl md:text-2xl font-medium leading-snug text-gray-800 uppercase tracking-wide">
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
									className="block text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline"
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
							/>
						);
					})}
				</nav>
			</div>
		),
		[],
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
						className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline"
					>
						{link.label}
					</Link>
				))}
			</nav>
		),
		[],
	);

	return (
		<div
			className="relative h-[500px]"
			style={{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			}}
		>
			<div className="relative h-[calc(100vh+500px)] -top-[100vh]">
				<div className="h-[500px] sticky top-[calc(100vh-500px)]">
					<footer
						className={`h-full py-6 sm:py-8 px-4 sm:px-6 border-t overflow-x-hidden transition-colors duration-300 ${className}`}
						style={{ backgroundColor: footerColor }}
						role="contentinfo"
						aria-label="Site footer"
					>
						<div className="mx-4 sm:mx-8 md:mx-12 h-full">
							{/* Footer Content Wrapper */}
							<div className="flex flex-col h-full space-y-6 sm:space-y-8">
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
								<div className="border-t border-gray-300 pt-4 sm:pt-6 mt-auto">
									<div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
										{/* Copyright */}
										<p className="text-sm text-gray-600 text-center md:text-left">
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
